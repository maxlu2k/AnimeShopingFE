<template>
    <v-container fluid style="background-color: #EEEEEE;">
        <v-row class="justify-center align-center" style="height: 100vh;">
            <v-col cols="12" md="4">
                <v-card class="mx-auto" elevation="12"  >
                    <v-card-title primary-title class="text-center my-10 page_login__title">
                        Quên mật khẩu
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="item.email" label="Email" id="email__login" variant="outlined" :rules="emailValidate"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-text class="justify-center">
                        <v-row class="ma-0">
                            <v-btn class="col-12 col-md-12 mb-5" color="primary" size="large" @click="submitForm">Quên mật khẩu</v-btn>
                            <v-divider></v-divider>
                            <RouterLink :to="{ name: 'login' }"  class="col-12 text-center page_login__link">Đăng nhập</RouterLink>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import authStore from '@/stores/auth';
import { ref } from 'vue';
import {forgetPassword} from '@/services/authService'
import { setCookie,readCookie } from '@/util/cookies';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
const auth = authStore();
const form = ref(null);
const item = ref({});
const toast = useToast();
const router = useRouter();
const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const emailValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập email"
    },
    (value) => {
        if (!value.match(re)) {
            return "Email không hợp lệ"
        } return true
    }
];
const validate = async () =>{
    const {valid} = await form.value.validate(); 
    return valid;
}
const submitForm = () =>{
    if(!validate()){
        return;
    }
    forgetPassword(item.value.email).then((resp)=>{
        if(resp.data.infor_response.code == 200){
            toast.success("Chúng tôi đã gửi email cho bạn. Vui lòng xác nhận email");
            // router.push({name:"HomeUser"});
        }else{
            toast.warning("Vui lòng xác nhận email");
        }
    })

}

</script>
<style>
.page_login__title{
    font-size: 2rem;
    font-weight: bolder;
}
.page_login__link {
    font-size: 1.2rem;
    text-decoration: none;
}

.page_login__link:hover {
    text-decoration: underline;
    color: red;
}</style>