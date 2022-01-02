import instance from './api'

const getuserprofile = async()=>{
    const {data:{dataNum, latest}} = await instance.get('/Page1/userprofile');
    return {dataNum, latest}
}

const getclassification = async(num)=>{
    //num為 "all" 或 "partial_forbar"
    const data = await instance.get('/Page1/classification', { params: { number: num } });
    return data.data
}

const gethottitle = async()=>{
    const data = await instance.get('/Page1/hottitle')
    return data.data
}

export {getuserprofile, getclassification, gethottitle}