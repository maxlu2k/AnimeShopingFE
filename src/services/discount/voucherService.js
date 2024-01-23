import axios from '@/router/axios.js'
import { formatDateV2,formatDateV3 } from '@/util/dateformat';

const getAll = (filter, page, size) => {
    return axios.get('/voucher/get-all', {
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
    return axios.get(`/voucher/${id}`, {
        params: {
            page: obj.page - 1,
            size: obj.size,
        }
    });
}

const getVoucherById = (id, obj,filter) => {
    return axios.get(`/voucher-account/${id}`, {
        params: {
            page: obj.page - 1,
            size: obj.size,
            username:filter.username,
            fullname:filter.fullname
        }
    });
}
const disableVoucher = (obj) =>{
    return axios.post(`/voucher-account/disable`, obj);
}
const applyVoucher = (obj) =>{
    return axios.post(`/voucher-account/save`, obj);
}
const getUser = (user)=>{
    return axios.get(`/voucher-account/user?username=${user}`);
}
const getById = (id) => {
    return axios.get(`/voucher/get/${id}`);
}

const save = (obj) => {
    return axios.post(`/voucher/new`, obj);
}
const update = (obj) => {
    return axios.put(`/voucher/update`, obj);
}
const saveAll = (obj) => {
    return axios.post("/voucher/product/save-all", obj);
}
const removeAll = (obj) => {
    return axios.post("/voucher/product/remove-all", obj);
}
const saveProductDiscount = (obj) =>{
    return axios.post("/voucher/product/save", obj);
}
const removeProductDiscount = (obj) =>{
    return axios.post("/voucher/product/remove", obj);
}
export { getAll, getById, save, update, getDiscountById, saveAll, removeAll,saveProductDiscount,removeProductDiscount,getVoucherById,disableVoucher,applyVoucher,getUser }
