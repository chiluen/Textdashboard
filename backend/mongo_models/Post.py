from mongoengine import Document
from mongoengine.fields import StringField, IntField, DateTimeField

class Postinfo(Document):
    author = StringField()
    title = StringField()
    date = StringField()
    content = StringField()
    pushnum = IntField()
    classification = StringField()