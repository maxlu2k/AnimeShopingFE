import axios from "axios";
import Cookies from 'js-cookie';
const accessToken = Cookies.get('access_token');
const BASE_URL = 'http://localhost:8000/api/';
const Axios = axios.create({
    baseURL: BASE_URL, headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    }
});
// Axios.interceptors.request.use(config => {
//     config.headers['Authorization'] = 'Bearer your_token_here';
//     return config;
// });
export default Axios;
export { BASE_URL }
