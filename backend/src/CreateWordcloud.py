import jieba
from typing import List, Dict
from collections import Counter # 次數統計

#-----Init Jieba and stopwords
jieba.set_dictionary('./src/dict.txt.big')
with open('./src/stopwords.txt', 'r') as f:
    stop_words = f.read()
    stop_words = stop_words.split("\n")

def wordclouddata(data: List[Dict]) -> Dict[str, int]:
    overall_list = []
    for per_data in data:
        seg_list = jieba.lcut(per_data["content"], cut_all=False)
        overall_list += seg_list
    dictionary = Counter(seg_list) 
    [dictionary.pop(x, None) for x in stop_words]
    
    return dict(dictionary)