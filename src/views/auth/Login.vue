<template>
    <v-container fluid style="background-color: #EEEEEE;">
        <v-row class="justify-center align-center" style="height: 100vh;">
            <v-col cols="12" md="4">
                <v-card class="mx-auto" elevation="12">
                    <v-card-title primary-title class="text-center my-10 page_login__title">
                        Đăng nhập
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="item.username" label="Tên đăng nhập" id="username__login"
                                        variant="outlined" :rules="usernameValidate"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="item.password" label="Mật khẩu" id="password__login"
                                        variant="outlined" :rules="passwordValidate" type="password"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-text class="justify-center">
                        <v-row class="ma-0">
                            <v-btn class="col-12 col-md-12 mb-5" color="primary" size="large" @click="submitForm">Đăng
                                nhập</v-btn>
                            <v-divider></v-divider>
                            <RouterLink :to="{ name: 'register' }" class="col-4 text-center page_login__link">Đăng kí
                            </RouterLink>
                            <RouterLink :to="{ name: 'forget-password' }" class="col-4 text-center page_login__link">Quên
                                mật khẩu</RouterLink>
                            <RouterLink :to="{ name: 'change-password' }" class="col-4 text-center page_login__link">Đổi mật
                                khẩu</RouterLink>
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
import { login } from '@/services/authService'
import { setCookie, readCookie } from '@/util/cookies';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import cart_service from "@/services/cartService";
const auth = authStore();
const form = ref(null);
const item = ref({});
const toast = useToast();
const router = useRouter();
const usernameValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập tài khoản"
    }
];
const passwordValidate = [
    (value) => {
        if (value) return true;
        return "Vui lòng nhập mật khẩu"
    }
];
const validate = async () => {
    const { valid } = await form.value.validate();
    return valid;
}
const submitForm = () => {
    if (!validate()) {
        return;
    }
    login(item.value).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            auth.login(item.value.username, resp.data.data.role, { access: resp.data.data.access_token, experied: resp.data.data.access_token_expired });
            setCookie("refresh_token", resp.data.data.refresh_token, resp.data.data.refresh_token_expired);
            setCookie("access_token", resp.data.data.access_token, resp.data.data.access_token_expired);
            setCookie("_user", item.value.username, resp.data.data.access_token_expired);
            toast.success("Đăng nhập thành công");
            router.push({ name: "HomeUser" });

            const userName = Cookies.get('_user')
            if (userName) {
                const cartCookie = Cookies.get('cart');
                if (cartCookie) {
                    const cart = JSON.parse(cartCookie);
                    if (cart && cart.length > 0) {
                        for (let i = 0; i < cart.length; i++) {
                            const data = {
                                userName: userName,
                                amount: cart[i].amount,
                                productId: cart[i].productId,
                                productDiscounts: cart[i].productDiscounts,
                                priceSale: cart[i].priceSale,
                                typeOrder: cart[i].typeOrder
                            }
                            cart_service.addToCart(data).then((response) => {
                                if (response.data.infor_response.code == 200) {
                                    Cookies.remove("cart");
                                    Cookies.remove("gest_user");
                                }
                            }).catch((err) => {
                                toast.error(err.message);
                            })
                        }
                    }
                }
            }

        } else {
            toast.warning("Tài khoản hoặc mật khẩu không chính xác");
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