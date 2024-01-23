import axios from '@/router/axios.js'
import { formatDateV2,formatDateV3 } from '@/util/dateformat';

const getAll = (filter, page, size) => {
    return axios.get('/discount-bill/get-all', {
        params: {
            search: filter.value.search,
            to: formatDateV3(filter.value.to),
            from: formatDateV2(filter.value.from),
            status: filter.value.status,
            page: page.value - 1,
            size: size.value
        }
    });
}
const getDiscountById = (id, obj) => {
    return axios.get(`/discount-bill/${id}`, {
        params: {
            page: obj.page - 1,
            size: obj.size
        }
    });
}
const getById = (id) => {
    return axios.get(`/discount-bill/get/${id}`);
}

const save = (obj) => {
    return axios.post(`/discount-bill/new`, obj);
}
const update = (obj) => {
    return axios.put(`/discount-bill/update`, obj);
}
const saveAll = (obj) => {
    return axios.post("/discount-bill/product/save-all", obj);
}
const removeAll = (obj) => {
    return axios.post("/discount-bill/product/remove-all", obj);
}
const saveProductDiscount = (obj) =>{
    return axios.post("/discount-bill/product/save", obj);
}
const removeProductDiscount = (obj) =>{
    return axios.post("/discount-bill/product/remove", obj);
}
export { getAll, getById, save, update, getDiscountById, saveAll, removeAll,saveProductDiscount,removeProductDiscount }
