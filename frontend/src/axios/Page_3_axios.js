import instance from './api'

/*拿回postinfo的data */
const getpost = async()=>{
    const data = await instance.get('/Page3/data')
    return data.data
}
export {getpost}