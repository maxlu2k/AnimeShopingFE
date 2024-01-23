<template>
    <v-container fluid style="background-color: #EEEEEE;">
        <v-row class="justify-center align-center" style="height: 100vh;">
            <v-col cols="12" md="4">
                <v-card class="mx-auto" elevation="12">
                    <v-card-title primary-title class="text-center my-10 page_login__title">
                        Đăng kí tài khoản
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="item.userName" label="Tên đăng nhập" id="username__login"
                                        variant="outlined" :rules="usernameValidate"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="item.email" label="Email" id="email__login" variant="outlined"
                                        :rules="emailValidate"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="item.fullname" label="Họ và tên" id="fullName__login"
                                        variant="outlined" :rules="fullnameValidate"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="item.phone" label="Số điện thoại" id="phone__login"
                                        variant="outlined" :rules="phoneValidate"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="item.password" label="Mật khẩu" id="register_pass__login"
                                        variant="outlined" :rules="passwordValidate" type="password"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-text class="justify-center">
                        <v-row class="ma-0">
                            <v-btn class="col-12 col-md-12 mb-5" color="primary" size="large" @click="submitForm">Đăng kí</v-btn>
                            <v-divider></v-divider>
                            <RouterLink :to="{ name: 'login' }" class="col-12 text-center page_login__link">Đăng nhập
                            </RouterLink>
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
import { register } from '@/services/authService'
import { setCookie, readCookie } from '@/util/cookies';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
const auth = authStore();
const form = ref(null);
const item = ref({});
const toast = useToast();
const router = useRouter();
const usernameValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập tài khoản"
    },
    (value) => {
        if (value.length < 5 || value.length > 30) {
            return "Tài khoản từ 5 đến 30 kí tự"
        } return true
    }
];
const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passwordValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập mật khẩu"
    },
    (value) => {
        if (value.length < 5 || value.length > 30) {
            return "Mật khẩu từ 5 đến 30 kí tự"
        } return true
    }
];
const fullnameValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập họ tên"
    },
    (value) => {
        if (value.length < 5 || value.length > 50) {
            return "Họ tên từ 5 đến 50 kí tự"
        } return true
    }
];
const phoneValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập số điện thoại"
    },
    (value) => {
        if (value.match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)) {
            return true;
        }
        return "Số điện thoại không hợp lệ"
    }
];

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
const validate = async () => {
    const { valid } = await form.value.validate();
    return valid;
}
const submitForm = async () => {
    const tmp = await validate();
    if (!tmp) {
        return;
    }
    item.value.url = window.location.href+"/confirm";
    register(item.value).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            auth.logout();
            toast.success("Chúng tôi đã gửi email cho bạn. Vui lòng xác nhận email");
            item.value = {};
        } else {
            toast.warning("Tài khoản hoặc email đã được sử dụng");
        }
    })

}

</script>
<style>
.page_login__title {
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
}
</style>