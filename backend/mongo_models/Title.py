from mongoengine import Document
from mongoengine.fields import DictField

class Titlelist(Document):
     title= DictField()