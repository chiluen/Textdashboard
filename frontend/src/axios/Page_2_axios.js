import instance from './api'

/*按下button, 得到呈現文字雲的資料 */
const crawldata = async()=>{
    const data = await instance.post('/Page2/crawl');
    return data
}

export {crawldata}