<template>
    <v-container fluid>
        <v-btn class="ma-5 mt-0" color="success" @click="back">
            Quay lại
        </v-btn>
        <v-card class="ma-5 mt-0">
            <v-sheet class="ma-3">
                <v-row class="">
                    <v-col cols="12" md="6">
                        <v-card class="" elevation="4">
                            <v-card-title>
                                <h2 class="text-center text-info">
                                    Thông tin đơn hàng
                                </h2>
                            </v-card-title>
                            <v-card-text>

                                <v-form class="mt-15" ref="form">
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-text-field label="Mã đơn hàng" v-model="bill.codeBill"
                                                readonly=""></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field label="Ngày tạo" v-model="bill.createDate"
                                                readonly></v-text-field>
                                        </v-col>
                                        <!-- </v-row>
                                    <v-row> -->
                                        <v-col cols="12" md="6">
                                            <v-text-field label="Tên đầy đủ" v-model="bill.fullName"
                                                readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field label="Số điện thoại" v-model="bill.phoneNumber"
                                                readonly></v-text-field>
                                        </v-col>
                                        <!-- </v-row>
                                    <v-row> -->

                                        <v-col cols="12" md="6">
                                            <v-text-field label="Email" v-model="bill.email" readonly></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6" class="row align-center">
                                            <v-text-field class="col-8" v-if="bill.username != null" v-model="voucher"
                                                label="voucher"></v-text-field>
                                            <v-btn v-if="bill.username != null" class="col-4"
                                                @click="useVoucher(bill.username)">Kiểm tra</v-btn>
                                        </v-col>
                                        <!-- <v-col cols="12" :md="isShipping ? '6' : '12'">
                                            <v-radio-group inline label="Nhận hàng" v-model="isShipping">
                                                <v-radio label="Tại quầy" :value="false"></v-radio>
                                                <v-radio label="Giao hàng tận nơi" :value="true"></v-radio>
                                            </v-radio-group>
                                        </v-col>
                                        <v-col v-if="isShipping" cols="12" md="6" class="mt-md-4 mt-0">
                                            <v-text-field label="Xã, phố, đường"></v-text-field>
                                        </v-col>
                                        <v-row v-if="isShipping" class="ma-0 col-12">
                                            <v-col cols="12" md="4">
                                                <v-select :items="provides" v-model="provide" label="Tỉnh thành"
                                                    item-title="ProvinceName" item-value="ProvinceID"
                                                    @update:model-value="changeProvide" return-object
                                                    :rules="provideValidate"></v-select>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <v-select :items="districts" v-model="district" label="Quận huyện"
                                                    item-title="DistrictName" item-value="DistrictID"
                                                    @update:model-value="changeDistrict" return-object
                                                    :rules="districtValidate"></v-select>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <v-select :items="wards" v-model="ward" label="Xã phường"
                                                    item-title="WardName" item-value="WardCode" return-object
                                                    :rules="wardValidate"></v-select>
                                            </v-col>
                                        </v-row> -->
                                        <!-- <v-row>
                                            <v-col cols="12" md="6">
                                                <v-radio-group label="Thanh toán" v-model="paymentMethod">
                                                    <v-radio label="Trực tiếp" :value="1"></v-radio>
                                                    <v-radio label="Qua ví VNPay" :value="2"></v-radio>
                                                </v-radio-group>
                                            </v-col>
                                        </v-row> -->
                                        <v-col cols="12" md="6" class="row align-center" v-if="paymentMethod == 1">
                                            <v-text-field class="col-8" v-model="customerMoney"
                                                :rules="customerMoneyValidate" label="Số tiền khách trả"></v-text-field>
                                        </v-col>
                                        <!-- <v-col cols="12" md="6">
                                            <v-text-field label="Địa chỉ"></v-text-field>
                                        </v-col> -->
                                    </v-row>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-row class="ma-0">
                                    <div class="col-8 border-bottom py-4 pb-2">
                                        <div class="d-flex justify-content-between mb-3">
                                            <h6>Giá</h6>
                                            <h6>{{ formatVND(price) }}</h6>
                                        </div>
                                        <div class="d-flex justify-content-between mb-3">
                                            <h6>Giảm giá</h6>
                                            <h6>{{ formatVND(priceSale) }}</h6>
                                        </div>
                                        <!-- <div class="d-flex justify-content-between">
                                            <h6 class="font-weight-medium">Phí vận chuyển</h6>
                                            <h6 class="font-weight-medium">{{ phiVanChuyen }}</h6>
                                        </div> -->
                                        <div class="d-flex justify-content-between mt-2 border-top">
                                            <h5>Tổng tiền</h5>
                                            <h5>{{ formatVND(total_price) }}</h5>
                                        </div>
                                        <div class="d-flex justify-content-between mt-2">
                                            <h5>Tiền dư</h5>
                                            <h5 v-if="repay_money >= 0">{{ formatVND(repay_money) }}</h5>
                                        </div>
                                    </div>
                                    <div class="col-4 align-end d-flex justify-end">
                                        <v-btn class="mb-3" color="primary" variant="outlined" @click="submitForm">Thanh
                                            toán</v-btn>
                                    </div>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card class="fill-height pb-3" elevation="4">
                            <v-card-title primary-title>
                                <h2 class="text-center text-info">
                                    Thông tin giỏ hàng
                                </h2>
                            </v-card-title>
                            <v-card-text>
                                <v-table fixed-header height="500">
                                    <!-- <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Ds</th>
                                        </tr>
                                    </thead> -->
                                    <tbody>
                                        <tr v-if="bill.detailBillResponses?.length <= 0" class="text-center"
                                            style="font-size: 1.5rem;font-weight: bold;color: brown;">
                                            Giỏ hàng trống
                                        </tr>
                                        <tr v-for="(item, indx) in bill.detailBillResponses">
                                            <!-- <td class="align-middle">
                                                <img :src="'http://localhost:8000/api/products/show?url=' + i.url" alt=""
                                                    style="width: 70px;">
                                                <span
                                                    class="badge bg-secondary position-absolute translate-middle badge rounded-pill">{{
                                                        i.amount
                                                    }}</span>
                                            </td>
                                            <td class="align-middle text-wrap">{{ i.productName }}</td>
                                            <td class="align-middle text-wrap" style="font-size: smaller;">
                                                {{ formatVND(i.priceSale * i.amount) }}
                                            </td>
                                            <td>
                                                <input type="text">
                                            </td> -->
                                            <v-row class="ma-0 border-bottom">
                                                <v-col cols="2">
                                                    <div class="col-sm-9 p-0">
                                                        <img :src="'http://localhost:8000/api/products/show?url=' + item.url
                                                            " alt="" class="img-fluid rounded" />
                                                    </div>

                                                </v-col>
                                                <v-col cols="6">
                                                    <div class="row mb-2">
                                                        <h6 class="card-text">{{ item.productName }}</h6>
                                                    </div>
                                                    <div class="col-sm-9 p-0" v-if="item.productStatus == 1">
                                                        <div class="input-group quantity" style="width: 180px">
                                                            <div class="input-group-btn">
                                                                <button class="btn btn-minus border border-1"
                                                                    @click="decrement(item, indx)">
                                                                    <i class="fa fa-minus"></i>
                                                                </button>
                                                            </div>
                                                            <input type="text " class="form-control text-center"
                                                                style="width: 100px;" @blur="hello($event, item, indx)"
                                                                id="form_sell_amout" :value="item.amount" />
                                                            <!-- debounce -->
                                                            <div class="input-group-btn">
                                                                <button class="btn btn-plus border border-1"
                                                                    @click="increment(item, indx)">
                                                                    <i class="fa fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {{ formatVND(item.priceSale) }}
                                                        <br>
                                                    </div>

                                                    <div v-else class="text-h6">
                                                        Sản phẩm đã ngưng cung cấp
                                                    </div>
                                                </v-col>
                                                <v-col cols="4" class="d-flex align-items-start justify-end">
                                                    <button class="btn btn-primary"
                                                        @click="deleteCart(item.id, item.productId, indx)">
                                                        <i class="bi bi-trash"></i>
                                                        Xóa khỏi giỏ hàng
                                                    </button>
                                                </v-col>

                                                <v-row class="ma-0" v-if="item.productStatus == 1">
                                                    <v-col cols="6">
                                                        <div class="col-sm-9 p-0 align-center"
                                                            style="color: red;font-size: 1rem; font-weight: bold">
                                                            Thành tiền:
                                                        </div>
                                                    </v-col>
                                                    <v-col cols="6" class="mb-3 justify-end d-flex"
                                                        style="color: red;font-size: 1rem; font-weight: bold">
                                                        {{ formatVND(item.priceSale * item.amount) }}
                                                    </v-col>
                                                </v-row>
                                            </v-row>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-sheet>
            <v-card class="ma-3" elevation="4">
                <v-card-title primary-title>
                    <!-- <h2 class="text-center text-info">
                        Danh sách sản phẩm
                    </h2> -->
                    <v-sheet elevation="4" :rounded="true">
                        <!-- <p>Filter</p> -->
                        <VRow class="ma-1 pt-3" elevation="4">
                            <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                                <v-text-field v-model.trim="filter.nameProduct" label="Tên sản phẩm" clearable
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                                <!-- <v-text-field v-model.trim="filter.clientName" label="Danh mục" clearable
                                    variant="outlined"></v-text-field> -->
                                <v-select v-model="filter.category" label="Danh mục" :items="categories" item-title="name"
                                    multiple item-value="id" clearable variant="outlined"></v-select>
                            </v-col>
                            <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                                <!-- <v-text-field v-model.trim="filter.clientName" label="Danh mục" clearable
                                    variant="outlined"></v-text-field> -->
                                <v-select v-model="filter.seri" label="Seri" :items="series" item-title="name" multiple
                                    item-value="id" clearable variant="outlined"></v-select>
                            </v-col>
                            <!-- <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                                <VueDatePicker v-model="filter.from" locale="vi" :enable-time-picker="true" :teleport="true"
                                    placeholder="Từ ngày"></VueDatePicker>
                            </v-col>
                            <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                                <VueDatePicker v-model="filter.to" locale="vi" :enable-time-picker="true" :teleport="true"
                                    placeholder="Đến ngày"></VueDatePicker>
                            </v-col> -->
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
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="3" sm="4" class="w-100" v-for="(item) in products?.data">
                            <v-card class="fill-height">
                                <v-carousel style="height: auto !important;" hide-delimiter-background show-arrows="hover">
                                    <v-carousel-item v-for="(i, ind) in item.listImage"
                                        :src="`${BASE_URL}products/show?url=${i.url}`" :placeholder="item.figure"
                                        style="height: auto;" cover></v-carousel-item>
                                    <!-- <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                                        style="height: auto;" cover></v-carousel-item>

                                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
                                        style="height: auto;" cover></v-carousel-item>

                                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                                        style="height: auto;" cover></v-carousel-item> -->
                                </v-carousel>
                                <v-card-text>
                                    <div class="product_name" @click="detail(item)">{{ item.figure }}</div>

                                    <div class="mt-3">
                                        <span class="product_money me-4">
                                            {{ formatVND(item.priceSales) }}
                                        </span>
                                        <span class="product_money" v-if="item.priceSales != item.priceNew"
                                            style="text-decoration: line-through;">
                                            {{ formatVND(item.priceNew) }}
                                        </span>
                                    </div>
                                </v-card-text>

                                <v-card-actions class="flex-wrap">
                                    <v-btn color="orange" @click="addToCartHandler(item)">
                                        Thêm vào giỏ hàng
                                    </v-btn>

                                    <v-btn color="orange" @click="detail(item)">
                                        Chi tiết
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-text>
                    <v-sheet v-if="products != null">
                        <VRow class="mx-0 align-center" v-if="products?.data?.length != 0">
                            <VCol md="6" sm="12" xs="12">
                                <vue-awesome-paginate v-if="products != null" :total-items="products.totalRecords || 0"
                                    :items-per-page="products.pageSize || 1" :max-pages-shown="5" v-model="page"
                                    :on-click="onClickHandler" />
                            </VCol>
                            <VCol md="4" sm="12" xs="12" class="d-flex align-end align-md-center">
                                <span v-if="products != null" class="current_page_message">{{
                                    (products?.beginIndex + 1) + "-" + (products?.endIndex) + " of " +
                                    (products?.totalRecords) }}
                                </span>
                            </VCol>
                            <VCol md="2" sm="12" xs="12">
                                <!-- <select class="ms-3 custom_select" >
                    <option v-for="item in [10,20,30,50]" :value="item">{{ item }}</option>
              </select> -->
                                <VSelect outlined :items="[8, 12, 20, 32]" @update:model-value="logger"
                                    v-model="pageSize" />
                            </VCol>

                        </VRow>
                    </v-sheet>
                </v-card-text>
            </v-card>
        </v-card>
        <ProductDialog :item="item" :dialog="dialog" @close-dialog="close" />
    </v-container>
</template>
<script setup>
import { ref, watch } from 'vue';
import { getAll, getAllCategory, getAllSeri } from '@/services/sell/productService'
import { getById, addToCart, removeFromCart, checkVoucher, createOrder, paymentOrder } from '@/services/sell/offlineSellService';
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';
import { formatVND } from '@/util/moneyformat'
import { BASE_URL } from '@/router/axios'
import ProductDialog from '@/views/sells/ProductDialog.vue';
import { formatDate } from '@/util/dateformat';
import axios from 'axios';
import { nextTick } from 'vue';
import { useToast } from 'vue-toastification';
const form = ref(null);
const voucher = ref("");
const hello = async (i, it, index) => {
    const amout = i.target.value;
    if (isNaN(amout)) {
        document.querySelector('#form_sell_amout').value = it.amount;
        toast.warning("Số lượng không hợp lệ");
    } else {
        if (amout <= 0) {
            toast.warning("Số lượng không hợp lệ");
            document.querySelector('#form_sell_amout').value = it.amount;
        } else {
            // const oldVal = it.amount;
            const tmp = JSON.parse(JSON.stringify(it));
            tmp.amount = amout - 1;
            console.log(amout);
            console.log(tmp);
            const sc = await increment(tmp, index);
            if(sc){
                document.querySelector('#form_sell_amout').value = tmp.amount;
            }else{
                document.querySelector('#form_sell_amout').value = it.amount;
            }
        }
    }

}
const customerMoneyValidate = [
    (value) => {
        if (isNaN(value)) {
            return "Vui lòng nhập tiền khách trả"
        }
        if (value <= 0) {
            return "Vui lòng kiểm tra lại"
        }
        if (value < total_price.value) {
            return "Vui lòng kiểm tra lại"
        }
        return true;
    }
]
const priceSale = ref(0);
const customerMoney = ref(0);

const toast = useToast();
const paymentMethod = ref(1);
const token = "c157a694-916b-11ed-9dc6-f64f768dbc22";
const shop_id = "3685860";
const provideValidate = [
    (val) => {
        if (val) return true;
        return "Vui lòng chọn tỉnh thành"
    }
];
const districtValidate = [
    (val) => {
        if (val) return true;
        return "Vui lòng chọn quận huyện"
    }
];
const wardValidate = [
    (val) => {
        if (val) return true;
        return "Vui lòng chọn xã phường"
    }
]
const provides = ref([]);
const provide = ref(null);
const district = ref(null);
const districts = ref([]);
const ward = ref(null);
const wards = ref([]);
const router = useRouter();
const route = useRoute();
const products = ref(null);
const page = ref(1);
const pageSize = ref(8);
const filter = ref({});
const items = [
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2
];
const bill = ref({

});
const isShipping = ref(false)
const categories = ref(null);
const series = ref(null);
const item = ref(null);
const dialog = ref(false);
// const action = "Thông tin sản phẩm";
const orderWaiting = ref({});
const useVoucher = async (username) => {
    await checkVoucher(voucher.value, username, total_price.value).then((resp) => {
        if (resp.data == 0) {
            toast.warning("Voucher không đúng hoặc không đủ điều kiện áp dụng giảm giá");
        } else {
            priceSale.value = resp.data;
            bill.value.voucherCode = voucher.value;
            bill.value.discount = resp.data;
        }
    }).catch((err) => {

    })
}
const getData = async () => {
    await getAll(filter.value, page.value, pageSize.value).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            products.value = resp.data.data;
            route.query.id;
        }
    }).catch((err) => {

    })
}
const back = () => {
    router.go(-1);
}
const detail = (i) => {
    item.value = Object.assign({}, i);
    dialog.value = true;
}
const close = (val) => {
    dialog.value = false;
    item.value = Object.assign({}, null);
}
const getCurrentBill = async () => {
    await getById(route.params.id).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            bill.value = Object.assign({}, resp.data.data);
            // console.log(bill.value);
        }
    }).catch((err) => {

    })
}
const getCategory = async () => {
    await getAllCategory().then((resp) => {
        categories.value = resp.data;
    }).catch((err) => {

    })
}

const getOrder = async () => {
    await getById(route.params.id).then((resp) => {
        orderWaiting.value = resp.data.data;
    }).catch((err) => {

    })
}
const getSeri = async () => {
    await getAllSeri().then((resp) => {
        series.value = resp.data;
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
    page.value = 1;
    getData();
}
const reset = () => {
    filter.value = Object.assign({}, {
        nameProduct: "",
        category: null,
        seri: null,
    });
}
const deleteCart = async (id, pId, inx) => {
    if (!confirm("Bạn có thực sự muốn xóa sản phẩm này khỏi giỏ hàng không")) {
        return;
    }
    // console.log(id, pId, inx);
    await removeFromCart(id).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            bill.value.detailBillResponses.splice(inx, 1);
        }
    }).catch((err) => {
        toast.error("Lỗi kết nối tới server");
    })
}
const increment = async (it, ind) => {
    let tmp = true;
    it.amount++;
    await addToCart(bill.value.id, it).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            if (resp.data.data) {
                console.log(resp.data.data)
                console.log(bill.value.detailBillResponses);
                bill.value.detailBillResponses[ind] = resp.data.data;
            } else {
                it.amount--;
                toast.info("Sản phẩm tạm thời hết hàng");
                tmp = false;
            }
        } else {
            toast.info("Sản phẩm tạm thời hết hàng");
            tmp = false;
        }
    })
    return tmp;
}

const decrement = async (it, ind) => {
    if (it.amount <= 1) {
        return
    }
    it.amount--;
    await addToCart(bill.value.id, it).then((resp) => {
        if (resp.data.infor_response.code == 200) {
            if (resp.data.data) {
                bill.value.detailBillResponses[ind] = resp.data.data;
            } else {
                toast.info("Sản phẩm tạm thời hết hàng");
            }
        } else {
            toast.info("Sản phẩm tạm thời hết hàng");
        }
    })
}
const submitForm = async () => {

    if (bill.value.detailBillResponses.length < 1) {
        toast.warning("Giỏ hàng trống");
        return;
    }
    const { valid } = await form.value.validate();
    if (!valid) {
        return;
    }
    if (!confirm("Xác nhận thanh toán đơn hàng")) {
        return;
    }
    bill.value.transportFee = 0;
    bill.value.discount = priceSale.value;
    bill.value.total = total_price.value;
    if (voucher.value) {
        bill.value.voucherCode = voucher.value;
    }
    bill.value.address = "Tại quầy";
    console.log(paymentMethod.value);
    if (paymentMethod.value == 1) {
        bill.value.paymentMethod = 'MONEY';
        bill.value.customerMoney = customerMoney.value;
        await paymentOrder(bill.value).then((resp) => {
            if (resp.data.infor_response.code == 200) {
                toast.success("Thanh toán thành công");
                router.push({ name: "sell-product" });
            } else {
                toast.warning("Có lỗi xảy ra");
            }
        })
    }
    else {
        bill.value.paymentMethod = 'CARD';
        bill.value.customerMoney = 0;
        createOrder(bill.value).then((resp) => {
            if (resp.data.infor_response.code == 200) {
                toast.success("Tạo đơn hàng thành công");
                router.push({ name: "Bill" });
            }
        })

    }
    console.log(bill.value);
}
// const getProvide = async () => {
//     console.log("fetch");
//     const url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
//     await axios.get(url, {
//         headers: {
//             token: token
//         }
//     }).then(resp => {
//         if (resp.data.code == 200) {
//             provides.value = resp.data.data;
//         }
//         else {
//             console.log(resp);
//         }
//     }).catch(err => {
//         console.log(err);
//     })
// }

// const getWard = async () => {
//     const url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward";
//     await axios.get(url, {
//         headers: {
//             token: token
//         },
//         params: {
//             district_id: district.value.DistrictID
//         }
//     }).then(resp => {
//         if (resp.data.code == 200) {
//             wards.value = resp.data.data;
//         }
//         else {
//             console.log(resp);
//         }
//     }).catch(err => {
//         console.log(err);
//     })
// }
// const getDistrict = async () => {
//     const url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";
//     await axios.get(url, {
//         headers: {
//             token: token
//         },
//         params: {
//             province_id: provide.value.ProvinceID
//         }
//     }).then(resp => {
//         if (resp.data.code == 200) {
//             districts.value = resp.data.data;
//         }
//         else {
//             console.log(resp);
//         }
//     }).catch(err => {
//         console.log(err);
//     })
// }

// const changeProvide = async () => {
//     if (provide.value != null) {
//         district.value = null;
//         ward.value = null;
//         await getDistrict();
//     }
// }
// const changeDistrict = async () => {
//     if (district.value != null) {
//         ward.value = null;
//         await getWard();
//     }
// }
const addToCartHandler = async (it) => {
    // console.log(bill.value);
    if (!bill.value.id) {
        toast.warning("Hóa đơn không khả dụng")
        return;
    }
    if (it.quantity <= 0) {
        toast.info("Sản phẩm tạm thời hết hàng");
    }
    const index = bill.value.detailBillResponses.findIndex((cuI) => {
        return cuI.productId == it.id;
    })
    if (index == -1) {
        let tmpItem = {
            id: null,
            price: it.price,
            priceSale: it.priceSales,
            amount: 1,
            productId: it.id
        }
        await addToCart(bill.value.id, tmpItem).then((resp) => {
            // console.log(resp.data);
            if (resp.data.infor_response.code == 200) {
                if (resp.data.data) {
                    bill.value.detailBillResponses.push(resp.data.data);
                } else {
                    toast.info("Sản phẩm tạm thời hết hàng");
                }
            } else {
                toast.info("Sản phẩm tạm thời hết hàng");

            }
        })
    } else {
        let tmpItem = Object.assign({}, bill.value.detailBillResponses[index]);
        tmpItem.amount = tmpItem.amount + 1;
        // console.log(tmpItem);
        await addToCart(bill.value.id, tmpItem).then((resp) => {
            // console.log(resp.data);
            if (resp.data.infor_response.code == 200) {
                if (resp.data.data) {
                    bill.value.detailBillResponses[index] = resp.data.data;
                } else {
                    toast.info("Sản phẩm tạm thời hết hàng");
                }
            } else {
                toast.info("Sản phẩm tạm thời hết hàng");
            }
        })
    }
}

// watch(() => isShipping.value, (newVal, oldVal) => {
//     if (newVal) {
//         if (paymentMethod.value != 2) {
//             paymentMethod.value = 0;
//         }
//     } else {
//         if (paymentMethod.value != 2) {
//             paymentMethod.value = 1;
//         }
//     }
// });

const price = computed(() => {
    if (bill.value.detailBillResponses) {
        let priceTotal = bill.value.detailBillResponses.reduce((total, cuI) => {
            // console.log(cuI);
            if (cuI.productStatus == 0) {
                return total += 0
            }
            return total += cuI.priceSale * cuI.amount;
        }, 0)
        return priceTotal;

    }
    return 0;
});
const total_price = computed(() => {
    return price.value - priceSale.value;
})
const repay_money = computed(() => {
    let repay = customerMoney.value - total_price.value;
    if (!repay && repay != 0) {
        return -1;
    }
    if (repay == 0) {
        return 0
    }
    return repay;
})
onMounted(async () => {
    const promises = [
        getCurrentBill(),
        // getProvide(),
        getData(),
        getCategory(),
        getSeri(),
        getOrder(),
    ];
    Promise.all(promises)
})
</script>
<style>
.product_money,
.product_name {
    font-size: larger;
}

.product_name {
    font-weight: unset;
}

.product_name:hover {
    cursor: pointer;
    text-decoration: underline;
}

.product_money {
    font-weight: bolder;
}

tr>th {
    font-weight: bold !important;
}
</style>
