<template>
    <v-container fluid style="background-color: #EEEEEE;">
        <v-row class="justify-center align-center" style="height: 100vh;">
            <v-col cols="12" md="4">
                <v-card class="mx-auto" elevation="12">
                    <v-card-title primary-title class="text-center my-10 page_login__title">
                        Đổi mật khẩu
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="item.newPassword" label="Mật khẩu mới" id="new_password__login"
                                        variant="outlined" :rules="newPasswordValidate" type="password"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="item.confirm" label="Mật khẩu xác nhận"
                                        id="confirm_password__login" variant="outlined" :rules="confirmPasswordValidate"
                                        type="password"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-text class="justify-center">
                        <v-row class="ma-0">
                            <v-btn class="col-12 col-md-12 mb-5" color="primary" size="large" @click="submitForm">Đổi mật khẩu
                                </v-btn>
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
import { onMounted, ref } from 'vue';
import { forgetPasswordConfirm } from '@/services/authService'
import { setCookie, readCookie } from '@/util/cookies';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
const auth = authStore();
const form = ref(null);
const item = ref({});
const toast = useToast();
const route = useRoute();
const token = ref(null);
const newPasswordValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập mật khẩu mới"
    },
    (value) => {
        if (value.length < 5 || value.length > 30) {
            return "Mật khẩu từ 5 đến 30 kí tự"
        } return true
    }
];
const confirmPasswordValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập mật khẩu xác nhận"
    }, (value) => {
        if (item.value.newPassword != value) {
            return "Mật khẩu xác nhận không khớp"
        }
        return true;
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
    item.value.token = token.value;
    forgetPasswordConfirm(item.value).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            auth.logout();
            toast.success("Đổi mật khẩu thành công");
            item.value = {};
        } else {
            toast.warning("Tài khoản hoặc mật khẩu không chính xác");
        }
    })

}
onMounted(()=>{
    token.value = route.query.token;
})
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