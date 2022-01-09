from flask import Blueprint
from datetime import datetime
import json

from mongo_models.Post import Postinfo

with open('./config.json') as f:
    config = json.load(f)

#-----API-----#
page3Api = Blueprint('page3Api', __name__)

def createjson(date, author, title, content, classification):
    time = date
    return{"time": time, "author": author, "title": title, "content": content, "classification": classification}

@page3Api.route("data", methods=['GET'])
def getdata():
    """
    得到Database裡面的推文資料
    """

    data = Postinfo.objects
    try:
        data = Postinfo.objects[len(data) - config["displaynumber"]:] # a list of json
    except:
        data = Postinfo.objects[:] 

    #-----排序-----#
    data = sorted(data, key=lambda d: datetime.strptime(d.date, '%a %b %d %H:%M:%S %Y'), reverse=True)
    data_dict = {}
    for index, d in enumerate(data):
        data_dict[index] = createjson(d.date, d.author, d.title, d.content, d.classification)
    
    return data_dict
