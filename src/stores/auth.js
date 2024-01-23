import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { readCookie, setCookie } from "@/util/cookies";
import Axios from "@/router/axios";
import check from "@/commons/jwt";
const authStore = defineStore("auth", () => {
    // state
    const user = ref(null);
    const userRoles = ref([]);
    const token = ref({
        access: null,
        experied: null
    })
    // getter / mutations
    const getUser = computed(() => {
        return user.value;
    })
    const getUserRole = async () => {
        console.log(userRoles.value);
        if (userRoles.value.length != 0) {
            console.log("@@");
            return userRoles.value;
        }
        let sc = await check(Axios);
        if (sc == false) {
            console.log("@2");
            return [];
        }
        let tmp = false;
        await Axios.get('/auth/get-role').then(resp => {
            if (resp.data.infor_response.code == 200) {
                console.log("@3");
                tmp = true;
                userRoles.value = resp.data.data;
            } else {
                tmp = false;
            }
        })
            .catch((err) => {
                tmp = false;
            })
        if (tmp) {
            return userRoles.value;
        }
        return [];
    }
    const gettoken = computed(() => {
        if (new Date().getTime() > token.value.experied) {
            return null
        }
        return userRoles.value;
    })
    // actions
    const login = (username, roles, tk) => {
        user.value = username;
        userRoles.value = roles;
        token.value = tk;
    }
    const logout = () => {
        user.value = null;
        userRoles.value = [];
        token.value = {
            access: null,
            experied: null
        };
        setCookie("refresh_token", "", new Date().getTime());
        setCookie("access_token", "", new Date().getTime());
        setCookie("_user", "", new Date().getTime());
    }
    return { getUser, getUserRole, login, logout, gettoken };
});
export default authStore;