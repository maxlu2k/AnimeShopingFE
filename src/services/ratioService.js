import axios from '@/router/axios.js'
const getAll = async (param)=>{
    return axios.get('/ratio/get-all',{params:param});
}
const getAllRatio = async ()=>{
    return axios.get('/ratio/get-all-');
}
const getById = (id)=>{
    return axios.get(`/ratio/${id}`);
}

const save = (obj)=>{
    return axios.post(`/ratio/new`,obj);
}
const update = (obj)=>{
    return axios.put(`/ratio/update`,obj);
}
export {getAll,getById,save,update,getAllRatio}
