<template>
    <v-container fluid style="background-color: #EEEEEE;">
        <v-row class="justify-center align-center" style="height: 100vh;">
            <v-col cols="12" md="4">
                <v-card class="mx-auto" elevation="12">
                    <v-card-text>
                        <p class="message_page_register">{{ message }}</p>
                        <RouterLink :to="{ name: 'login' }" class="page_login__link">Đăng nhập</RouterLink>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { confirm } from '@/services/authService'
import { useRoute } from 'vue-router';
const message = ref("Xác thực tài khoản thất bại do mã xác nhân không đúng hoặc phiên xác nhận đã hết hạn");
const router = useRoute();
onMounted(async () => {
    const token = router.query.token;
    if (token) {
        await confirm(token).then((resp) => {
            if (resp.data.infor_response.code == 200) {
                message.value = "Xác thực tài khoản thành công"
            }
        })
    }
})
</script>
<style>
.message_page_register{
    font-size: 20px;
    font-weight: bold;
    color:rgb(228, 22, 22);
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