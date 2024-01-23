<template>
    <v-container fluid>
        <v-btn color="success" class="ma-5 my-3" @click="router.go(-1)">Quay lại</v-btn>
        <v-card class="ma-5" elevation="4">
            <v-card-title>
                <p class="text-center my-5 text-info font-weight-bold text-h5">
                    Thông tin voucher
                </p>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field :model-value="discount.voucherReq?.name" readonly label="Tên voucher"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field
                            :model-value="discount.voucherReq?.discountType == 0 ? discount.voucherReq?.discountAmount + '%' : discount.voucherReq?.discountAmount + ' VND'"
                            readonly label="Mức giảm giá" variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field :model-value="formatDate(discount.voucherReq?.discountStart)" readonly label="Bắt đầu"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field :model-value="formatDate(discount.voucherReq?.discountEnd)" readonly label="Kết thúc"
                            variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6" sm="12">
                        <v-text-field :model-value="discount.voucherReq?.status == 1 && new Date(discount.voucherReq?.discountEnd) > new Date() ? 'Khả dụng' :
                            (discount.voucherReq?.status
                                ==
                                0 ? 'Không khả dụng' : 'Hết hạn')" readonly label="Trạng thái"
                            variant="outlined"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card class="ma-5">
            <v-card-title>
                <V-row>
                    <v-col cols="12" md="5">
                        <v-text-field label="Tên đăng nhập" v-model="filter.username" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-text-field label="Họ tên" v-model="filter.fullname" variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2" class="d-flex justify-space-evenly align-center ">
                        <v-btn class="align-self-stretch" color="primary" @click="filterHandler" >Lọc</v-btn>
                        <v-btn class="align-self-stretch" color="primary" @click="clear">Khôi phục</v-btn>
                    </v-col>
                </V-row>
            </v-card-title>
            <v-card-text>
                <v-table fixed-header hover density="comfortable" class="custom-table " loading
                    loading-text="Loading... Please wait">
                    <thead>
                        <tr>
                            <th class="text-center">
                                STT
                            </th>
                            <th class="text-center">
                                Hành động
                            </th>
                            <th class="text-center">
                                Mã voucher
                            </th>
                            <th class="text-center">
                                Trạng thái
                            </th>
                            <th class="text-center">
                                Tài khoản
                            </th>
                            <th class="text-center">
                                Chi tiết
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="discount == null || discount.voucherAccountReq?.data?.length == 0">
                            <td colspan="20" class="text-center">Không có dữ liệu</td>
                        </tr>
                        <tr v-else v-for="(item, index) in discount.voucherAccountReq?.data" :key="item.username">
                            <td class="text-center">{{ discount.voucherAccountReq?.beginIndex + 1 + index }}</td>
                            <td class="text-center" style="text-align: center;">
                                <v-checkbox class="d-inline-flex" @change="checking(item, index)"
                                    :model-value="item.active || item.active == null" :checked="item.active != false"
                                    :disabled="item.active == null"></v-checkbox>
                            </td>
                            <td class="text-center">
                                {{ item.active ? item.code : '' }}
                            </td>
                            <td class="text-center">
                                {{ item.active == null ? 'Đã sử dung' : (item.active ? 'Có thể sử dụng' : 'Chưa áp dụng') }}
                            </td>
                            <td class="text-center">
                                {{ item.username }}
                            </td>
                            <td class="text-center">
                                <v-btn prepend-icon="mdi-information" color="indigo" @click="infor(item.username)">Chi
                                    tiết</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
        <v-sheet v-if="discount != null">
            <VRow class="mx-0 align-center" v-if="discount?.voucherAccountReq?.data.length != 0">
                <VCol md="6" sm="12" xs="12">
                    <vue-awesome-paginate class="col d-flex align-self-center align-items-center w-100 "
                        :total-items="v = discount.voucherAccountReq?.totalRecords || 0"
                        :items-per-page="discount.voucherAccountReq?.pageSize || 1" :max-pages-shown="5" v-model="page"
                        :on-click="onClickHandler" />
                </VCol>
                <VCol md="4" sm="12" xs="12" class="d-flex align-end align-md-center">
                    <span v-if="properties != null" class="current_page_message">{{
                        (discount.voucherAccountReq?.beginIndex + 1) + "-" + (discount.voucherAccountReq?.endIndex) + " of "
                        +
                        (discount.voucherAccountReq?.totalRecords) }}
                    </span>
                </VCol>
                <VCol md="2" sm="12" xs="12">
                    <!-- <select class="ms-3 custom_select" >
                    <option v-for="item in [10,20,30,50]" :value="item">{{ item }}</option>
              </select> -->
                    <VSelect outlined :items="[5, 10, 20, 30]" @update:model-value="logger" v-model="pageSize" />
                </VCol>

            </VRow>
        </v-sheet>
        <v-dialog v-model="dialog" width="600">
            <v-card>
                <v-card-title primary-title>
                    Thông tin khách hàng
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="user.userName" label="Tên đăng nhập"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="user.fullname" label="Họ tên "></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="user.email" label="Email"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="user.phone" label="Số điện thoại"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn color="primary" @click="dialog = false">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script setup>
import { onMounted, watch, ref, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Axios from '@/router/axios';
import { useToast } from 'vue-toastification';
import { formatDate } from '@/util/dateformat';
import { getVoucherById, disableVoucher, applyVoucher, getUser } from '@/services/discount/voucherService';
const route = useRoute();
const router = useRouter();
const discount = ref({});
const properties = ref(null);
const user = ref({});
const toast = useToast();
let pageSize = ref(5);
let page = ref(1);
const dialog = ref(false);
const filter = ref({
    username: "",
    fullname: ""
})
const getData = async () => {
    await getVoucherById(route.params.id, {
        page: page.value,
        size: pageSize.value
    }, filter.value).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            discount.value = resp.data.data;
        } else {
            toast.warning("Có lỗi xảy ra")
        }
    }).catch((err) => {

    })
}


const checking = async (item, index) => {
    if (item.active) {
        await disableVoucher(item).then(
            (resp) => {
                if (resp.data.infor_response.code == 200) {
                    discount.value.voucherAccountReq.data[index] = resp.data.data;
                }
                else {
                    toast.warning("Có lỗi xảy ra");
                    discount.value.voucherAccountReq.data[index].active = !inputData.active;
                }
            }
        ).catch(
            (err) => {
                toast.error("error", err.message);
            })
    }
    else {
        await applyVoucher(item).then(
            (resp) => {
                if (resp.data.infor_response.code == 200) {
                    discount.value.voucherAccountReq.data[index] = resp.data.data;
                }
                else {
                    toast.warning("Có lỗi xảy ra");
                    discount.value.voucherAccountReq.data[index].active = !inputData.active;
                }
            }
        ).catch(
            (err) => {
                toast.error("error", err.message);
            });
    }

}
const infor = async (username) => {
    await getUser(username).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            user.value = resp.data.data;
            dialog.value = true;
        }
    }).catch((err) => {
        toast.error("Có lỗi xay ra");
    })
}
watch(() => dialog.value, (newVal) => {
    if (!newVal) {
        user.value = {};
    }
})
const clear = () => {
    filter.value = {
        username: "",
        fullname: ""
    };
    getData();
}
const onClickHandler = () => {
    getData();
}
const filterHandler = () => {
    getData();
}
const logger = () => {
    nextTick(() => {
        page.value = 1;
        getData();
    })
}
onMounted(async () => {
    await getData();
})
</script>