import axios from '@/router/axios.js'
const getAll = async (param)=>{
    return axios.get('/stats/start2',{params:param});
}
export {getAll}
