import axios from "axios";
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        // var date = new Date();
        // date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var date = new Date(days);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const check = async (Axios) => {
    const access_token = readCookie('access_token');
    const refresh_token = readCookie('refresh_token');
    if (access_token != null) {
        Axios.defaults.headers.common['Authorization'] ="Bearer "+ access_token;
        return true;
    }
    else if (refresh_token != null) {
        let tmp = true;
        await axios.post("http://localhost:8000/api/auth/refresh", { "refresh_token": refresh_token }).then((resp) => {
            setCookie("access_token", resp.data.data.access_token, resp.data.data.access_token_expired);
            Axios.defaults.headers.common['Authorization'] ="Bearer "+ resp.data.data.access_token;        
            tmp= true;
        })
        .catch((err) => {
            tmp= false;
        })
        return tmp;
    } else {
        return false;
    }
}
export default check;