<template>
    <v-app-bar color="primary-darken-1" class="dashboard_header">
        <!-- <v-row> -->
        <v-icon icon="mdi-format-list-bulleted" class="btn_list ms-5" @click="toggle"></v-icon>
        <!-- </v-row> -->
    </v-app-bar>
</template>
<script setup>
import { useCounterStore } from '@/stores/showSideBar';
const store = useCounterStore();
const toggle = ()=>{
    store.setShow(!store.isShow);
}
</script>
<style scoped>
.btn_list:hover {
    cursor: pointer;
}
</style>