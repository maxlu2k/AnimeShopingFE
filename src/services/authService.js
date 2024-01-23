import axios from "axios";
import Cookies from 'js-cookie';
// const accessToken = Cookies.get('access_token');
const BASE_URL = 'http://localhost:8000/api/';
const Axios = axios.create({
    baseURL: BASE_URL, headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + accessToken,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    }
});

const login = (obj) => {
    return Axios.post("auth/login", obj);
}
const changePassword = (obj) => {
    return Axios.post("auth/change-password", obj);
}
const forgetPasswordConfirm = (obj) => {
    return Axios.post("auth/confirm-password", obj);
}
const confirm = (token) => {
    return Axios.get("auth/register/"+token);
}
const register = (obj) => {
    return Axios.post("auth/register", obj);
}
const forgetPassword = (email) => {
    return Axios.get("auth/forget-password", {
        params:{
            email:email
        }
    });
}
export { login, changePassword, register,confirm,forgetPassword,forgetPasswordConfirm }