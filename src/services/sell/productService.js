import Axios from "@/router/axios";
import qs from "qs";

const save = (obj) => {
    return Axios.post('v1/bill/new-waiting-bill', obj);
}
const update = (obj) => {
    return Axios.put('v1/bill/update-waiting-bill', obj);
}
const cancel = (id) => {
    return Axios.delete('v1/bill/cancel-waiting-bill', {
        params: {
            id: id
        }
    });
}
const getAll = (filter, page, pageSize) => {
    // console.log(filter);
    return Axios.get('products/getAll', {
        params: {
            available:1,
            page: page,
            size: pageSize,
            name:filter.nameProduct,
            categoryIds:filter.category,
            seriesID:filter.seri
            // from: filter.from,
            // to: filter.to,
            // maHd: filter.maHD,
            // clientName: filter.clientName
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: "repeat" })
        }
    });
}
const getAllCategory = () =>{
    return Axios.get('categories');
}

const getAllSeri = () =>{
    return Axios.get('series');
}

const getAccount = (username) => {
    return Axios.get('voucher-account/user', {
        params: {
            username: username
        }
    });
}
export { save, update, getAll, cancel,getAccount,getAllCategory,getAllSeri }