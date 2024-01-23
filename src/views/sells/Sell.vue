<template>
    <v-container fluid>
        <v-sheet class="ma-5" elevation="4" :rounded="true">
            <!-- <p>Filter</p> -->
            <VRow class="ma-1 pt-3" elevation="4">
                <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                    <v-text-field v-model.trim="filter.maHD" label="Mã hóa đơn" clearable variant="outlined"></v-text-field>
                </v-col>
                <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                    <v-text-field v-model.trim="filter.clientName" label="Tên khách hàng" clearable
                        variant="outlined"></v-text-field>
                    <!-- <v-select v-model="filter.status" :items="opFilter" item-title="name" item-value="value"
                         variant="outlined"></v-select> -->
                </v-col>
                <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                    <VueDatePicker v-model="filter.from" locale="vi" :enable-time-picker="true" :teleport="true"
                        placeholder="Từ ngày"></VueDatePicker>
                </v-col>
                <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                    <VueDatePicker v-model="filter.to" locale="vi" :enable-time-picker="true" :teleport="true"
                        placeholder="Đến ngày"></VueDatePicker>
                </v-col>
            </VRow>
            <VRow class="ma-1 pb-5 pt-5 justify-center">
                <v-btn color="primary" class="me-5" @click="filters">
                    Tìm kiếm
                </v-btn>
                <v-btn variant="outlined" color="primary" @click="reset">
                    Đặt lại
                </v-btn>
            </VRow>
        </v-sheet>
        <v-sheet class="ma-5">
            <VRow class="ma-1 mb-0">
                <!-- <h2 class="v-col-12 text-center">Product</h2> -->
                <VCol class="d-flex">
                    <v-btn class="ms-auto" color="primary" prepend-icon="mdi-plus-box-outline" @click="newHandler"
                        rounded="lg">
                        New
                    </v-btn>
                </VCol>
                <!-- <VCol class="d-flex">
                    <v-btn class="me-auto" color="success" @click="newHandler">Tạo mới</v-btn>
                </VCol> -->
            </VRow>
            <v-row>
                <v-col cols="12" md="12" class="h-100">
                    <v-card class="h-100" elevation="4">
                        <v-card-title class="text-center text-h4 font-weight-bold" size="">
                            Danh sách hóa đơn chờ
                        </v-card-title>
                        <v-card-text>
                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th class="text-center">Mã HD</th>
                                        <th class="text-center">Chủ HD</th>
                                        <th class="text-center">Tên đăng nhập</th>
                                        <th class="text-center">Ngày tạo</th>
                                        <th class="text-center">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="bills == null || bills?.data?.length == 0">
                                        <td colspan="20" class="text-center">Không có dữ liệu</td>
                                    </tr>
                                    <tr v-else v-for="(item, index) in bills?.data">
                                        <td class="text-center">{{ bills.beginIndex + 1 + index }}</td>
                                        <td class="text-center">{{ item.codeBill }}</td>
                                        <td class="text-center">{{ item.fullName }}</td>
                                        <td class="text-center">{{ item.username }}</td>
                                        <td class="text-center">{{ formatDate(item.createDate) }}</td>
                                        <td class="text-center d-flex justify-center align-center">
                                            <v-btn color="cyan-lighten-4 me-4" @click="edit(item)">Cập nhật</v-btn>
                                            <v-btn color="red-accent-3 me-4" @click="cancelBill(item.id, index)">Hủy đơn</v-btn>
                                            <v-btn color="red-accent-3" @click="infor(item.id)">Chi tiết</v-btn>
                                        </td>

                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                    </v-card>
                </v-col>
                <!-- <v-col cols="12" md="6">
                    <v-card class=" pa-5">
                        <h2 class="text-center text-info">
                            Thông tin đơn hàng
                        </h2>
                        <v-form class="mt-15">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="Mã đơn hàng" readonly="" variant="outlined" ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="Ngày tạo" variant="outlined" ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col class="d-flex algin-center">
                                    <v-radio-group v-model="inline" inline>
                                        <v-radio label="Chưa có tài khoản" value="radio-2"></v-radio>
                                        <v-radio label="Đã có tài khoản" value="radio-1"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex align-center">
                                <v-col cols="12" md="8">
                                    <v-text-field label="Tên đăng nhập" variant="outlined" ></v-text-field>
                                </v-col>
                                <v-col cols="6" md="4">
                                    <v-btn color="info">Kiểm tra</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="Tên đầy đủ" variant="outlined" ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="Số điện thoại" variant="outlined" ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="Email" variant="outlined" ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="Địa chỉ" variant="outlined" ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card>
                </v-col> -->
            </v-row>
        </v-sheet>
        <v-sheet>
            <VRow>
                <v-dialog v-model="dialog" width="1200" persistent>
                    <v-card>
                        <v-card-title>
                            <p class="text-h5 text-center my-5 text-info font-weight-bold">{{ action }}</p>
                        </v-card-title>

                        <v-card-text>
                            <v-form @submit.prevent ref="form">

                                <v-row>
                                    <v-col class="d-flex algin-center">
                                        <v-radio-group v-model="isHaveAccount" inline>
                                            <v-radio label="Chưa có tài khoản" :true-value="false"
                                            :false-value="true"></v-radio>
                                        <v-radio label="Đã có tài khoản" :true-value="true" :false-value="false"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex align-center" v-if="isHaveAccount">
                                <v-col cols="12" md="8">
                                    <v-text-field label="Tên đăng nhập" v-model="item.username"
                                    variant="outlined"></v-text-field>
                                    <p class="text-red">{{ err_ms }}</p>
                                </v-col>
                                <v-col cols="6" md="4">
                                    <v-btn color="info" @click="checking()">Kiểm tra</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field label="Tên đầy đủ" :disabled="isHaveAccount" v-model="item.fullName"  :rules="nameValidate"
                                    variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="Số điện thoại" :disabled="isHaveAccount" v-model="item.phoneNumber"
                                    variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field label="Email" :disabled="isHaveAccount" v-model="item.email"
                                    variant="outlined"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <!-- <v-text-field label="Địa chỉ" :disabled="isHaveAccount" v-model="item.address"
                                        variant="outlined"></v-text-field> -->
                                    </v-col>
                                    <!-- <v-row class="ma-0">
                                        
                                        <v-col cols="12" md="4">
                                            <v-select
                                            :items="provides"
                                            v-model="provide"
                                            label="Tỉnh thành"
                                            item-title="ProvinceName"
                                            item-value="ProvinceID"
                                            @update:model-value="changeProvide"
                                            return-object
                                            :rules="provideValidate"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-select
                                        :items="districts"
                                        v-model="district"
                                        label="Quận huyện"
                                        item-title="DistrictName"
                                        item-value="DistrictID"
                                        @update:model-value="changeDistrict"
                                        return-object
                                        :rules="districtValidate"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-select
                                        :items="wards"
                                        v-model="ward"
                                        label="Xã phường"
                                        item-title="WardName"
                                        item-value="WardCode"
                                        return-object
                                        :rules="wardValidate"
                                        ></v-select>
                                    </v-col>
                                </v-row> -->
                            </v-row>
                        </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="saveToDb">
                                Save
                            </v-btn>
                            
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </VRow>
        </v-sheet>
        <v-sheet v-if="bills != null">
            <VRow class="mx-0 align-center" v-if="bills?.data?.length != 0">
                <VCol md="6" sm="12" xs="12">
                    <vue-awesome-paginate v-if="bills != null" :total-items="bills.totalRecords || 0"
                        :items-per-page="bills.pageSize || 1" :max-pages-shown="5" v-model="page"
                        :on-click="onClickHandler" />
                </VCol>
                <VCol md="4" sm="12" xs="12" class="d-flex align-end align-md-center">
                    <span v-if="bills != null" class="current_page_message">{{
                        (bills?.beginIndex + 1) + "-" + (bills?.endIndex) + " of " +
                        (bills?.totalRecords) }}
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
    </v-container>
</template>
<script setup>
import { ref } from 'vue';
import { save, update, getAll, cancel, getAccount,getByUsername } from '@/services/sell/offlineSellService'
import { onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { formatDate } from '@/util/dateformat';
import { nextTick } from 'vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
// variable
const form = ref(null);
const nameValidate = [
    (val)=>{
        if(val) return true;
        return "Vui lòng nhập họ tên"
    },
    (val) => {
        if(val.length < 5 || val.length > 50 ) return "Họ tên từ 5 đến 50 kí tự";
        return true;
    }
]
const isHaveAccount = ref(false)
const filter = ref({
    from: null,
    to: null,
    maHD: null,
    clientName: null
});
const provides = ref([]);
const provide = ref(null);
const district = ref(null);
const districts = ref([]);
const ward = ref(null);
const wards = ref([]);
const router = useRouter();
const err_ms = ref("");
const bills = ref(null);
const page = ref(1);
const pageSize = ref(5);
const dialog = ref(false);
const action = ref("");
const item = ref({});
const defaultItem = ref({
    id: null,
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
    username: null,
});
const tmp = ref({
    id: null,
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
    username: null,
});
const toast = useToast();
// function
// element function
const newHandler = () => {
    action.value = 'Tạo mới hóa đơn';
    dialog.value = true;
    item.value = Object.assign({}, defaultItem.value);
}
const close = () => {
    dialog.value = false;
    isHaveAccount.value = false;
    item.value = Object.assign({}, defaultItem.value);
    tmp.value = Object.assign({}, defaultItem.value);
}
const edit = (i) => {
    // console.log(i);
    action.value = "Cập nhật thông tin hóa đơn";
    item.value = Object.assign({}, i);
    // console.log(item.value);
    dialog.value = true;
    if (i.username != null && i.username != '') {
        isHaveAccount.value = true;
        tmp.value = Object.assign({}, i);
        // console.log(tmp.value);
    }
}
const cancelBill = async (id, index) => {
    if (!confirm("Bạn có thực sử muốn hủy hóa đơn này không?")) {
        return;
    }
    await cancel(id).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            bills.value.data.splice(index, 1);
            toast.success("Hủy đơn hàng thành công")
        }
    }).catch((err) => {

    })
}
const checking = async () => {
    const account = null;
    await getAccount(item.value.username).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            item.value.fullName = resp.data.data.fullname;
            // item.value.address = resp.data.data.address;
            item.value.phoneNumber = resp.data.data.phone;
            item.value.email = resp.data.data.email;
            // console.log(item.value);
            // console.log(resp.data.data);
        } else {
            assignObject(item,defaultItem);
            toast.warning("Không tìm thấy tên đăng nhập này");
        }
    }).catch((err) => {

    })
}
const onClickHandler = () => {
    getData();
}
const logger = () => {
    nextTick(() => {
        page.value = 1;
        getData();
    })
}
const filters = () => {
    getData();
}
const reset = () => {
    filter.value = Object.assign({}, {
        from: null,
        to: null,
        maHD: null,
        clientName: null
    })
    getData();
}
const infor = (id) =>{
    router.push({name:"sell-product-detail",params:{
        id:id
    }});
}
// background function
const getData = async () => {
    await getAll(filter.value, page.value, pageSize.value).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            bills.value = resp.data.data;
        }
        else {
            toast.warning("Có lỗi xảy ra");
        }
    }).catch((err) => {
        toast.error("Lỗi kết nối")

    })
}
const getProvide = async () =>{
    // console.log("fetch");
    const url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
    await axios.get(url,{
        headers:{
            token:token
        }
    }).then(resp=>{
        if(resp.data.code ==200){
            provides.value = resp.data.data;
        }
        else{
            // console.log(resp);
        }
    }).catch(err=>{
        // console.log(err);
    })
}

const getWard = async () =>{
    const url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward";
    await axios.get(url,{
        headers:{
            token:token
        },
        params:{
            district_id:district.value.DistrictID
        }
    }).then(resp=>{
        if(resp.data.code ==200){
            wards.value = resp.data.data;
        }
        else{
            // console.log(resp);
        }
    }).catch(err=>{
        // console.log(err);
    })
}
const getDistrict = async () =>{
    const url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";
    await axios.get(url,{
        headers:{
            token:token
        },
        params:{
            province_id:provide.value.ProvinceID
        }
    }).then(resp=>{
        if(resp.data.code ==200){
            districts.value = resp.data.data;
        }
        else{
            // console.log(resp);
        }
    }).catch(err=>{
        // console.log(err);
    })
}
const saveToDb = async () => {
    const {valid} = await form.value.validate();
    if(!valid){
        return;
    }
    if(item.value.username){
            let isZ = false;
            await getByUsername(item.value.username).then((resp)=>{
                console.log(resp.data);
                if(resp.data.infor_response.code == 200){
                    if(resp.data.data){
                        isZ = true;
                        // console.log("exists");
                    }
                }
            })
            if(isZ){
                toast.warning("Đã tồn tại hóa đơn");
                return;
            }
        }
    // const address =` ${ward.value.WardName}, ${district.value.DistrictName}, ${provide.value.ProvinceName}`;
    // console.log(address)
    if (!item.value.id) {
        await save(item.value).then((resp) => {
            getData();
            toast.success("Thêm hóa đơn thành công");
        }).catch((err) => {

        }).finally(() => {
            close();
        })
    }
    else {
        if(!isHaveAccount){
            item.value.username = null;
            // console.log("a");
        }
        // console.log(item.value);
        await update(item.value).then((resp) => {
            const index = bills.value.data.findIndex((i, ind) => {
                return i.id == item.value.id;
            });
            bills.value.data[index] = resp.data.data;
            toast.success("Cập nhật hóa đơn thành công");
        }).catch((err) => {

        }).finally(() => {
            close();
        })
    }
}
const assignObject = (origin, dest) => {
    // console.log(origin.value);
    // console.log(dest.value);
    origin.value.username = dest.value.username;
    origin.value.fullName = dest.value.fullName;
    origin.value.address = dest.value.address;
    origin.value.phoneNumber = dest.value.phoneNumber;
    origin.value.email = dest.value.email;
}
const changeProvide = async () =>{
    if(provide.value != null){
        district.value = null;
        ward.value = null;
        await getDistrict();
    }
}
const changeDistrict = async () =>{
    if(district.value != null){
        ward.value = null;
        await getWard();
    }
}
// 
watch(() => isHaveAccount.value, (newVal, oldVal) => {
    if (newVal) {
        if (tmp.value.id == null) {
            assignObject(tmp, item);
            item.value.username = null;
            assignObject(item, defaultItem);
        }
        else {
            assignObject(item, tmp);
        }
    } else {
        assignObject(item, tmp);
        if (tmp.value.id != null) {
            assignObject(item, defaultItem);
        }
    }
})
onMounted( async () => {
    // await getProvide();
    await getData();
})
</script>