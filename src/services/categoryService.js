import axios from '@/router/axios.js'
const getAll = async (param)=>{
    return axios.get('/categories');
}
const getAllCategory = async ()=>{
    return axios.get('/categories/get-all-');
}
const getById = (id)=>{
    return axios.get(`/categories/${id}`);
}

const save = (obj)=>{
    return axios.post(`/categories/new`,obj);
}
const update = (obj)=>{
    return axios.put(`/categories/update`,obj);
}
export {getAll,getById,save,update,getAllCategory}
