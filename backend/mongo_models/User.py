from mongoengine import Document
from mongoengine.fields import StringField, IntField, DateTimeField
import datetime

class Userinfo(Document):
    name = StringField(default="chiluen")
    dataNum = IntField(default=0)
    latest = DateTimeField(default=datetime.datetime.utcnow)