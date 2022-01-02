from flask import Blueprint
import datetime
from datetime import datetime,timezone,timedelta
import json
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TextClassificationPipeline,
)
import torch

from mongo_models.Post import Postinfo
from mongo_models.User import Userinfo
from mongo_models.Title import Titlelist
from src.Crawl import Crawler
from src.CreateWordcloud import wordclouddata

#-----Init model & Config-----#
model = AutoModelForSequenceClassification.from_pretrained("./src/ChineseSequenceClassification")
tokenizer = AutoTokenizer.from_pretrained("./src/ChineseSequenceClassification")
pipeline = TextClassificationPipeline(
    model=model, tokenizer=tokenizer, device=0 if torch.cuda.is_available() else -1
)
print("Finish init sequence classification model")

with open('./config.json') as f:
    config = json.load(f)

labeltable = config["labeltable"]


#-----API-----#
page2Api = Blueprint('page2Api', __name__)

@page2Api.route('crawl', methods=['POST'])
def Crawl():
    """
    1. 執行爬蟲
    2. 根據爬蟲結果更新Top 5 hot title
    3. 回傳文字雲所需的Dictionary
    """

    #-----Crawl 50+ posts from gossip and store to db-----#
    c = Crawler(crawlnumber=config["crawlnumber"])
    data = c.main() # a list of json file

    #sample_classification = ["體育", "社會", "娛樂", "教育", "財經", "家居", "科技"] #sample data for testing
    for index, per_data in enumerate(data):

        if Postinfo.objects(title=per_data["title"]): #確認database沒有重複資料
            continue

        classification = labeltable[pipeline(per_data["title"])[0]['label']] #Classfiy by huggingface model

        p = Postinfo(author = per_data["author"],
                     title = per_data["title"],
                     date = per_data["date"],
                     content = per_data["content"],
                     pushnum = per_data["pushnum"],
                     classification = classification)
        p.save()

        if(index % 10 == 0):
            print(f"Finish prediction/saving {index} datas")



    #-----Update Top5 hot article-----#
    dic = {}
    sortdata = sorted(data, key=lambda d: d['pushnum'])
    for i in range(5):
        dic[str(i)] = sortdata[i]["title"]

    #若Titlelist還沒有被建立
    if not Titlelist.objects(): 
        k = Titlelist(title=dic)
        k.save()
    else:
        k = Titlelist.objects()[0]
        k.update(title=dic)  

    #-----Update user information-----#
    LatestInfo = Userinfo.objects().order_by('-latest')[0]
    new_dataNum = LatestInfo.dataNum + len(data)
    new_latest = datetime.utcnow().replace(tzinfo=timezone.utc).astimezone(timezone(timedelta(hours=8))).strftime("%Y-%m-%d %H:%M") #台灣時間
    LatestInfo.update(dataNum=new_dataNum, latest=new_latest)
    
    #-----製作文字雲-----#
    data = wordclouddata(data)

    return data
    

    
