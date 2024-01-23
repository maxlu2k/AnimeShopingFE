import axios from '@/router/axios.js'
import { formatDateV2,formatDateV3 } from '@/util/dateformat';
import qs from 'qs'

const getAll = (filter, page, size) => {
    return axios.get('/discount/get-all', {
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
const getDiscountById = (id,filter, obj) => {
    return axios.get(`/discount/${id}`, {
        params: {
            page: obj.page - 1,
            size: obj.size,
            name:filter.name,
            categories:filter.categories
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" })
        }
    });
}
const getById = (id) => {
    return axios.get(`/discount/get/${id}`);
}

const save = (obj) => {
    return axios.post(`/discount/new`, obj);
}
const update = (obj) => {
    return axios.put(`/discount/update`, obj);
}
const saveAll = (obj) => {
    return axios.post("/discount/product/save-all", obj);
}
const removeAll = (obj) => {
    return axios.post("/discount/product/remove-all", obj);
}
const saveProductDiscount = (obj) =>{
    return axios.post("/discount/product/save", obj);
}
const removeProductDiscount = (obj) =>{
    return axios.post("/discount/product/remove", obj);
}
export { getAll, getById, save, update, getDiscountById, saveAll, removeAll,saveProductDiscount,removeProductDiscount }
