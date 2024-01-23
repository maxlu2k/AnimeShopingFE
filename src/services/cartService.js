
import axios from "@/router/axios";
import Cookies from 'js-cookie';
axios.defaults.headers.common['Referrer-Policy'] = 'no-referrer'

const API_URL = 'http://localhost:8000/api/';
const accessToken = Cookies.get('access_token');
const userName = Cookies.get('_user')

export default {
  
  getCart(userName) {
    return axios.get('v1/cart/'+ userName);
  },
  getAddress(userName) {
    return axios.get('v1/bill/find-address/'+ userName);
  },

addToCart(product){
  return axios.post('v1/cart/create', product);
},
  createProduct(product) {
    return axios.post('products', product, {
      headers: {"Access-Control-Allow-Origin": "*"}
    });
  },

  updateCart(id, amount) {
    return axios.put('v1/cart/update/' + id +"?amount="+ amount);
  },

  deleteCart(id) {
    return axios.delete('v1/cart/' + id);
  },
  deleteAllCart(userName){
    return axios.delete('v1/cart/list/delete/' + userName
    );
  },
  createPay(data){
    return axios.post('create-pay',data
    );
  },
  getPay(id){
    return axios.get('find-pay?id='+ id);
  },
  count(username){
    return axios.get('v1/cart/count?username='+ userName);
  },
  saveBill(data){
    return axios.post( "v1/bill/save", data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    })
  },
  getVoucher(voucherCode,username, total){

    return axios.post( "v1/bill/applyVoucher?voucherCode="+voucherCode+"&username="+username+"&total="+total,"", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + accessToken,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    })
  },
  updateVoucher(code, username, status){
    return axios.post( "v1/bill/update/voucher?code="+code+"&username="+username +"&status="+ status, "",{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + accessToken,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    })
  },
  getDiscount(total){
    return axios.post( "v1/bill/discount-bill?total="+total,"")
  },
  getStatusBill(status, page, page_size) {
    return axios.get(API_URL_BILL + '/status?page='+page+'&page_size='+page_size+'&status='+ status, {
      headers: {"Access-Control-Allow-Origin": "*"}
    });
  },
  registerAndBill(data) {
    return axios.post('auth/register-bill',data, {
      headers: {"Access-Control-Allow-Origin": "*"}
    });
  },
  getAll(params) {
    return axios.get("products/getAll", "",{ params: params });
  },
  getOneProduct(id) {
    return axios.get("products/detail_product", {
      params: { id: id },
    });
  },
  getNonOrder(id) {
    return axios.get("products/title", { params: { id: id } });
  },
  getManufacturer() {
    return axios.get("http://localhost:8000/api/manufacturer", {
    });
  },
};