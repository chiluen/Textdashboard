"""
Usage:
c = Crawler()
data = c.main()

data = {'author':author,
        'title':title,
        'date':date,
        'content':content
        'pushnum': int}
"""

import requests
from bs4 import BeautifulSoup
import time

class Crawler():
    def __init__(self, crawlnumber=3):
        self.prefix = 'https://www.ptt.cc'
        self.process_page = 'https://www.ptt.cc/bbs/Gossiping/index.html' #目前正在處理的main page
        self.data = [] #用json格式，把標題，作者，推文數，內容記下來
        self.rs = None
        self.crawlnumber = crawlnumber

    def connect(self):
        payload = {
        'from': '/bbs/Gossiping/index.html',
        'yes': 'yes'
        }

        rs = requests.session()
        self.rs = rs
        self.rs.post('https://www.ptt.cc/ask/over18',data=payload)

    def getperpage(self, href):
        res = self.rs.get(href)
        soup = BeautifulSoup(res.text, "html.parser")

        header = soup.find_all('span','article-meta-value')
        author = header[0].text
        title = header[2].text
        date = header[3].text

        main_container = soup.find(id='main-container')
        all_text = main_container.text
        pre_text = all_text.split('--')[0]
        texts = pre_text.split('\n')
        contents = texts[2:]
        contents = [sentence for sentence in contents if sentence != '']
        content = '\n'.join(contents)

        data = {'author':author,
                'title':title,
                'date':date,
                'content':content}

        return data
    def main(self):
        self.connect()
        while len(self.data) <= self.crawlnumber:
            page_href = []
            page_pushnum = []#推文數
            res = self.rs.get(self.process_page)
            soup = BeautifulSoup(res.text, "html.parser")
            self.process_page = self.prefix + soup.select('.btn-group.btn-group-paging .btn.wide')[1]['href'] #上一頁
            #-----根據目前的目錄，抓出每篇貼文的href-----#
            for entry in soup.select('.r-ent'):
                if "八卦板板規" in entry.select('.title')[0].text: #首頁會有這種不相干的文章
                    break
                try: #有時候會有None-type的問題
                    page_href.append(entry.select_one('.title a')['href'])
                    page_pushnum.append(entry.select_one('.nrec').text if entry.select_one('.nrec').text else "0")
                except:
                    pass
            #-----抓取每一個文章訊息-----#
            for i in range(len(page_href)):
                data = self.getperpage(self.prefix + page_href[i])
                try:
                    data['pushnum'] = int(page_pushnum[i])
                except:
                    data['pushnum'] = 100
                self.data.append(data)
                time.sleep(0.5)
            print(f'Finish {len(self.data)} posts')
        print(f'Crawl {len(self.data)} posts')
        return self.data