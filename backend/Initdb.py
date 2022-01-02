from mongoengine import connect
import os
from dotenv import load_dotenv
import datetime
from datetime import datetime,timezone,timedelta
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TextClassificationPipeline,
)
import torch
import json

from mongo_models.Post import Postinfo
from mongo_models.Title import Titlelist
from mongo_models.User import Userinfo
from src.Crawl import Crawler

if __name__ == "__main__":
    load_dotenv()
    connect(host = os.getenv("MONGO_URL"))
    Initnumber = 5 #抓5篇即可
    
    #-----把目前的資料都清除-----#
    Postinfo.drop_collection()
    Titlelist.drop_collection()
    Userinfo.drop_collection()
    print("Clear the db")

    #-----重新設定User-----#
    
    #User
    latest = datetime.utcnow().replace(tzinfo=timezone.utc).astimezone(timezone(timedelta(hours=8))).strftime("%Y-%m-%d %H:%M") #台灣時間
    u = Userinfo(dataNum=Initnumber, latest=latest)
    u.save()

    #-----抓5篇左右最新的文章，更新Postinfo-----#
    model = AutoModelForSequenceClassification.from_pretrained("./src/ChineseSequenceClassification")
    tokenizer = AutoTokenizer.from_pretrained("./src/ChineseSequenceClassification")
    pipeline = TextClassificationPipeline(
        model=model, tokenizer=tokenizer, device=0 if torch.cuda.is_available() else -1
    )

    with open('./config.json') as f:
        config = json.load(f)

    labeltable = config["labeltable"]
    c = Crawler(crawlnumber= Initnumber)
    data = c.main()
    data = data[:Initnumber] 

    for index, per_data in enumerate(data):
        classification = labeltable[pipeline(per_data["title"])[0]['label']] #Classfiy by huggingface model
        p = Postinfo(author = per_data["author"],
                     title = per_data["title"],
                     date = per_data["date"],
                     content = per_data["content"],
                     pushnum = per_data["pushnum"],
                     classification = classification)
        p.save()
    
    #-----根據Postinfo，更新Hot title-----#
    dic = {}
    sortdata = sorted(data, key=lambda d: d['pushnum'])
    for i in range(5):
        dic[str(i)] = sortdata[i]["title"]

    k = Titlelist(title=dic)
    k.save()
    print("#####Finish Init Database, can start to use Dashboard#####")


    
    