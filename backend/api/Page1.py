from flask import Blueprint, request
import json

from mongo_models.User import Userinfo
from mongo_models.Post import Postinfo
from mongo_models.Title import Titlelist

with open('./config.json') as f:
    config = json.load(f)

#-----API-----#
page1Api = Blueprint('page1Api', __name__)

@page1Api.route('userprofile', methods=['GET'])
def returnUserprofile():
    """
    選出最新的User
    """
    LatestInfo = Userinfo.objects().order_by('-latest')[0]
    return {'dataNum':LatestInfo.dataNum,
            'latest':LatestInfo.latest}

@page1Api.route('classification', methods=['GET'])
def returnclassification():
    """
    統計目前Dababase的類別數量
    """
    num = request.args["number"]
    
    if num == "all":
        posts = Postinfo.objects()
    elif num == "partial_forbar":
        posts = Postinfo.objects()
        try:
            posts = posts[len(posts)-config["barnumber"]:]
        except:
            pass

    dic = {"體育":0, "社會":0, "娛樂":0, "教育":0, "財經":0, "家居":0, "科技":0}
    for p in posts:
        dic[p.classification] += 1
    return dic

@page1Api.route('hottitle', methods=['GET'])
def returntitle():
    """
    回傳已經統計好的Hot title
    """
    t = Titlelist.objects()[0]
    return t.title


