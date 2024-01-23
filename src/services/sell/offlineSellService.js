import Axios from "@/router/axios";
import { formatDateV2, formatDateV3 } from "@/util/dateformat";

const save = (obj) => {
    return Axios.post('v1/bill/new-waiting-bill', obj);
}
const update = (obj) => {
    return Axios.post('v1/bill/update-waiting-bill', obj);
}
const cancel = (id) => {
    return Axios.delete('v1/bill/cancel-waiting-bill', {
        params: {
            id: id
        }
    });
}
const createOrder = (obj) => {
    return Axios.post('v1/bill/save',obj);
}
const paymentOrder = (obj) =>{
    return Axios.post('v1/bill/save-waiting-bill',obj);
}

const getById = (id) => {
    return Axios.get('v1/bill/order-waiting/'+id);
}
const getByUsername = (us) => {
    return Axios.get('v1/bill/get-waiting-bill-by-username',{
        params:{
            username:us
        }
    });
}
const getAll = (filter, page, pageSize) => {
    return Axios.get('v1/bill/get-waiting-bill', {
        params: {
            page: page - 1,
            size: pageSize,
            from: formatDateV2(filter.from),
            to: formatDateV3(filter.to),
            maHd: filter.maHD,
            clientName: filter.clientName
        }
    });
}
const addToCart = (id,obj)=>{
    return Axios.post(`v1/bill/add-to-cart/${id}`,obj);
}

const removeFromCart = (id,obj)=>{
    return Axios.get(`v1/bill/remove-to-cart/${id}`);
}

const checkVoucher = (code,username,total)=>{
    return Axios.post(`v1/bill/applyVoucher`,null,{
        params:{
            voucherCode:code,
            username:username,
            total:total
        }
    });
}
const getAccount = (username) => {
    return Axios.get('voucher-account/user', {
        params: {
            username: username
        }
    });
}
export { save, update, getAll, cancel,getAccount,getById,getByUsername,addToCart,removeFromCart,checkVoucher,createOrder,paymentOrder }