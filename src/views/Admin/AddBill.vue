<template>
  <v-container fluid>
    <div class="row">
      <v-btn class="col-1 ma-5 mt-0" color="success" @click="back">
        Quay lại
      </v-btn>
      <div class="col-9"></div>
      <v-btn class="col-1 ma-5 mt-0" color="success" @click="updateBill()">
        cập nhật
      </v-btn>
    </div>

    <v-card class="ma-5 mt-0">
      <v-sheet class="ma-3">
        <v-row class="">
          <v-col cols="12" md="6">
            <v-card class="fill-height pb-3" elevation="4">
              <v-card-title primary-title>
                <h2 class="text-center text-info">Thông tin giỏ hàng</h2>
              </v-card-title>
              <v-card-text>
                <v-table fixed-header height="300">
                  <thead>
                    <tr class="table-primary">
                      <th style="font-size: 15px; text-align: center" scope="col">
                        STT
                      </th>
                      <th style="font-size: 15px; text-align: center" scope="col">
                        Tên sản phẩm
                      </th>
                      <th style="font-size: 15px; text-align: center" scope="col">
                        Số lượng
                      </th>
                      <th style="font-size: 15px; text-align: center" scope="col">
                        Cập nhật số lượng
                      </th>
                      <th style="font-size: 15px; text-align: center" scope="col">
                        Giá mua
                      </th>
                      <th style="font-size: 15px; text-align: center" scope="col">
                        Tổng
                      </th>
                      <th v-if="detailBill.status == 'CHO_XAC_NHAN' ||
                        detailBill.status == 'XAC_NHAN'
                        " style="font-size: 15px" scope="col">
                        Xoá
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(detail, i) in detailBill.detailBillResponses" :key="i"
                      style="text-align: center; font-size: 12px">
                      <th scope="row">{{ i + 1 }}</th>
                      <td style="width: 300px">{{ detail.productName }}</td>
                      <td v-if="detailBill.status == 'CHO_XAC_NHAN' ||
                        detailBill.status == 'XAC_NHAN'
                        ">
                        {{ detail.amount }}
                      </td>
                      <td v-if="detailBill.status == 'CHO_XAC_NHAN' ||
                        detailBill.status == 'XAC_NHAN'
                        ">
                        <input type="text" style="width: 80px" class="form-control text-center" id="quantitySp"
                          :disabled="disabled" v-model="amounts[i]" @blur="updateAmountDetail(detail.id, amounts[i])" />
                      </td>
                      <td v-if="!(
                        detailBill.status == 'CHO_XAC_NHAN' ||
                        detailBill.status == 'XAC_NHAN'
                      )
                        ">
                        {{ detail.amount }}
                      </td>
                      <td>{{ formatVND(detail.priceSale) }}</td>
                      <td>{{ formatVND(detail.priceSale * detail.amount) }}</td>
                      <td>
                        <a @click="
                          confirmDelete(
                            detail.id,
                            detail.productId,
                            detail.amount
                          )
                          "><i class="bi bi-trash" style="font-size: 15px"></i></a>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <div class="row mt-5 mb-3">
                  <p style="font-size: medium; font-weight: 600" class="col-3">
                    Phí vận chuyển
                  </p>
                  <div class="col-6"></div>
                  <div class="col-3" v-if="totalPrice < 15000000" style="font-weight: 600">
                    {{ formatVND(phiVanChuyen) }}
                  </div>
                  <div v-if="totalPrice >= 15000000" class="col-3" style="font-weight: 600">
                    0 đ
                  </div>
                </div>
                <div class="row mb-3">
                  <p style="font-size: medium; font-weight: 600" class="col-3">
                    Tổng tiền sản phẩm
                  </p>
                  <div class="col-6"></div>
                  <div class="col-3" style="font-weight: 600">
                    {{ formatVND(totalPrice) }}
                  </div>
                </div>
                <div class="row mb-3">
                  <p style="font-size: medium; font-weight: 600" class="col-3">
                    Tổng tiền
                  </p>
                  <div class="col-6"></div>
                  <div v-if="totalPrice < 15000000" class="col-3" style="font-weight: 600">
                    {{ formatVND(totalPrice + detailBill.transportFee) }}
                  </div>
                  <div v-if="totalPrice >= 15000000" class="col-3" style="font-weight: 600">
                    {{ formatVND(totalPrice) }}
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="" elevation="4">
              <v-card-title>
                <h2 class="text-center text-info">Thông tin đơn hàng</h2>
              </v-card-title>
              <v-card-text>
                <div class="row"></div>

                <v-form class="mt-15">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field readonly="" v-model="detailBill.codeBill"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field readonly="" v-model="dateTime">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="detailBill.fullName"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="detailBill.phoneNumber"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field readonly="">{{
                        detailBill.email
                      }}</v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="detailBill.address"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <div class="col-md-3 form-group mx-5">
                      <select class="form-select text-sm-start" style="
                          padding-left: 5px;
                          border: 1px solid;
                          border-color: #dee2e6;
                        " placeholder="Tỉnh / Thành phố" v-model="selectedCity" required id="city"
                        @change="getDistricts(selectedCity), validateCity" @blur="validateCity">
                        <option value="" selected>Tỉnh/ thành phố</option>
                        <option v-for="city in cities" :value="city.ProvinceID" :key="city.ProvinceID">
                          {{ city.ProvinceName }}
                        </option>
                      </select>
                      <!-- <label style="color: red;" v-if="cityError">{{ cityError }}</label> -->
                    </div>

                    <div class="col-md-3 form-group mx-5">
                      <select class="form-select" style="
                          padding-left: 5px;
                          border: 1px solid;
                          border-color: #dee2e6;
                        " placeholder="Quận / Huyện" v-model="selectedDistrict" id="districts"
                        @change="getWards(selectedDistrict), validateDistricts" required @blur="validateDistricts">
                        <option value="" selected>Quận/ Huyện</option>
                        <option v-for="district in districts" :value="district.DistrictID" :key="district.DistrictID">
                          {{ district.DistrictName }}
                        </option>
                      </select>
                      <!-- <label style="color: red;" v-if="districtsError">{{ districtsError }}</label> -->
                    </div>

                    <div class="col-md-3 form-group mb-5 ml-5">
                      <select class="form-select align-middle" style="
                          padding-left: 5px;
                          border: 1px solid;
                          border-color: #dee2e6;
                        " placeholder="Phường / Xã" v-model="selectedWard" id="ward" @change="validateSelectedWard"
                        required @blur="validateSelectedWard">
                        <option value="" selected>Xã/ phường</option>
                        <option class="d-flex justify-content-between align-items-center text-start" v-for="ward in wards"
                          :value="ward.WardCode" :key="ward.WardCode">
                          {{ ward.WardName }}
                        </option>
                      </select>
                      <!-- <label style="color: red;" v-if="selectedWardError">{{ selectedWardError
                                            }}</label> -->
                    </div>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
      <v-card class="ma-3" elevation="4">
        <v-card-title primary-title>
          <v-sheet elevation="4" :rounded="true">
            <VRow class="ma-1 pt-3" elevation="4">
              <v-col class="pb-0 col-6" cols="12" md="6" sm="12" xs="12">
                <v-text-field v-model.trim="name" label="Tên sản phẩm" clearable variant="outlined"></v-text-field>
              </v-col>
              <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                <v-select v-model="categoryIds" label="Danh mục" :items="categories" item-title="name" multiple
                  item-value="id" clearable variant="outlined"></v-select>
              </v-col>
              <v-col class="pb-0" cols="12" md="6" sm="12" xs="12">
                <v-select v-model="seriId" label="Seri" :items="series" item-title="name" multiple item-value="id"
                  clearable variant="outlined"></v-select>
              </v-col>
            </VRow>
            <VRow class="ma-1 pb-5 pt-5">
              <div class="col-9"></div>
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
            <v-col cols="12" md="3" sm="4" class="w-100" v-for="item in products?.data">
              <v-card class="fill-height">
                <v-carousel style="height: auto !important" hide-delimiter-background show-arrows="hover">
                  <v-carousel-item v-for="(i, ind) in item.listImage"
                    :src="`http://localhost:8000/api/products/show?url=${i.url}`" :placeholder="item.figure"
                    style="height: auto" cover></v-carousel-item>
                </v-carousel>
                <v-card-text>
                  <div class="product_name">{{ item.figure }}</div>

                  <div class="mt-3">
                    <span class="product_money me-4">
                      {{ formatVND(item.priceSales) }}
                    </span>
                    <span class="product_money" v-if="item.priceSales != item.priceNew"
                      style="text-decoration: line-through">
                      {{ formatVND(item.priceNew) }}
                    </span>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-btn v-if="item.quantity > 0" active color="orange" @click="
                    addBill(
                      item.id,
                      item.quantity,
                      item.price,
                      item.priceSales,
                      item.productDiscounts,
                      1
                    )
                    ">
                    Thêm vào giỏ hàng
                  </v-btn>
                  <v-btn v-if="item.quantity <= 0" disabled color="orange">
                    Thêm vào giỏ hàng
                  </v-btn>

                  <v-btn color="orange" @click="detail(item)"> Chi tiết </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-sheet v-if="products != null" class="row">
            <div class="row my-5">
              <div class="col-8">
                <nav>
                  <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                      <a class="page-link" @click="goToPage(currentPage - 1)">
                        <CIcon :icon="cilList" size="l" />Pre
                      </a>
                    </li>
                    <li class="page-item" v-for="page in pageCount" :key="page" :class="{ active: page === currentPage }">
                      <a class="page-link" @click="goToPage(page)">{{
                        page
                      }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === products.totalPages }">
                      <a class="page-link" @click="goToPage(currentPage + 1)">
                        <CIcon :icon="cilList" size="l" />Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="col-2 mx-5" style="width: 150px">
                <select class="form-select border border-1" v-model="pageSize" @change="onPageSizeChange">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-card>
    <ProductDialog :item="item" :dialog="dialog" @close-dialog="close" />
  </v-container>

  <!-- COnfirm  -->
  <template>
    <div class="text-center">
      <v-dialog v-model="del" width="500">
        <v-card>
          <v-card-text>
            Bạn có chắc chắn muốn xoá sản phẩm này ra khỏi đơn hàng này
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="del = false"> Huỷ bỏ </v-btn>
            <v-btn color="primary" text @click="deleteDetail"> Đồng ý </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { formatVND } from "@/util/moneyformat";
import { BASE_URL } from "@/router/axios";
import ProductDialog from "@/views/sells/ProductDialog.vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const back = () => {
  router.go(-1);
};
</script>
<script>
import { ref } from "vue";
import axios from "axios";
import {
  getAll,
  getAllCategory,
  getAllSeri,
} from "@/services/sell/productService";
import { TodayDateV6 } from "@/commons/util";

import { useToast } from "vue-toastification";
import qs from "qs";
const toast = useToast();

import Axios from "@/router/axios";

const page = ref(1);
const items = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
const item = ref(null);
const dialog = ref(false);
const xlDemo = ref(false);
const orderWaiting = ref({});
// const action = "Thông tin sản phẩm";

export default {
  name: "Bill",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sizes: [2, 4, 6],
      size: 12,
      detailBill: [],
      dateTime: "",
      products: null,
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      totalPages: 0,
      name: "",
      manufacturerIds: null,
      filter: null,
      categories: null,
      categoryIds: null,
      series: null,
      seriId: null,
      username: "",
      cities: [],
      selectedCity: "",
      districts: [],
      selectedDistrict: "",
      wards: [],
      selectedWard: "",
      address: "",
      addressDistrict: "",
      addressWards: "",
      addressCity: "",
      serviceId: null,
      detailBillResponses: [],

      del: false,
      detailId: null,
      productId: null,
      amountProduct: 0,
      updateAmount: 0,
      amounts: [],
      amountCopy: 0,
      totalPrice: 0,
      totalAfterDiscount: 0,
      phiVanChuyen: 0,
      totalWeight: 0,
      height: 0,
      maxHeight: 0,
      addressCode: null,
    };
  },
  methods: {
    getAll() {
      const params = {
        page: this.currentPage,
        size: this.pageSize,
        categoryIds: this.categoryIds,
        ratio: "",
        minPrice: "",
        maxPrice: "",
        seriesID: this.seriId,
        name: this.name,
        available: 1,
        manufacturerID: this.manufacturerIds,
        sortBy: this.sortField,
        sortDirection: this.sortOrder,
      };
      Object.keys(params).forEach((key) => {
        if (!params[key]) delete params[key];
      });

      const queryString = qs.stringify(params, { indices: false });
      const url = `products/getAll?${queryString}`;
      Axios.get(url)
        .then((res) => {
          if (res.data.infor_response.code == 200) {
            this.products = res.data.data;
            this.totalCount = res.data.data.totalRecords;
          }
          if (res.data.infor_response.code == 404) {
            this.products = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handlePageChange(value) {
      this.currentPage = value;
      this.getAll();
    },
    onPageSizeChange(event) {
      const pageSize = event.target.value;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.getAll();
    },

    back() {
      router.go(-1);
    },
    detail(i) {
      item.value = Object.assign({}, i);
      dialog.value = true;
    },
    async getCategory() {
      await getAllCategory()
        .then((resp) => {
          this.categories = resp.data;
          this.categoryIds = this.categories.id;
        })
        .catch((err) => { });
    },

    async getSeri() {
      await getAllSeri()
        .then((resp) => {
          this.series = resp.data;
          this.seriId = this.series.id;
        })
        .catch((err) => { });
    },
    billDetail() {
      Axios.get("v1/bill/" + this.$route.params.id)
        .then((response) => {
          if (response.data.infor_response.code == 200) {
            this.detailBill = response.data.data;
            this.dateTime = TodayDateV6(new Date(this.detailBill.createDate));
            this.username = response.data.data.username;
            this.phiVanChuyen = this.detailBill.transportFee;

            this.detailBill.detailBillResponses.map((item) => {
              this.totalPrice += item.priceSale * item.amount;
              this.totalWeight += item.weight * item.amount;
              this.height = item.height;
              return item;
            });

            const arr = this.detailBill.addressCode.split(", ");
            const city = arr[arr.length - 1];
            const district = arr[1];
            const ward = arr[0];
            this.feeShip(city, district, ward);

          }
        })
        .catch((error) => { });
    },

    onClickHandler() {
      this.getData();
    },
    logger() {
      nextTick(() => {
        page.value = 1;
        this.getAll();
      });
    },
    filters() {
      page.value = 1;
      this.getAll();
    },
    reset() {
      this.name = "";
      this.categoryIds = "";
      this.seriId = "";
      this.getAll();
    },
    goToPage(page) {
      if (page >= 1 && page <= this.pageCount) {
        this.currentPage = page;
        this.getAll();
      }
    },
    addBill(productId, quantity, price, priceSale, discountId, amount) {
      const apiUrl =
        "v1/bill/" +
        this.$route.params.id +
        "/orderwait?username=" +
        this.username;
      if (amount > quantity) {
        toast.warning("Đã vượt quá số lượng");
        return;
      }
      const data = {
        price: price,
        priceSale: priceSale,
        amount: amount,
        productId: productId,
        discountId: discountId,
      };
      Axios.post(apiUrl, data, {})
        .then((response) => {
          if (response.data.infor_response.code == 200) {
            toast.success(
              "Thêm vào đơn hàng: " + this.detailBill.codeBill + " thành công"
            );
            this.totalPrice = 0;
            this.phiVanChuyen = 0;
            this.billDetail();
          } else {
            toast.warning("Thêm sản phẩm đơn hàng thất bại");
          }
        })
        .catch((error) => { });
    },
    updateBill() {
      const city = this.cities.find(
        (city) => city.ProvinceID === this.selectedCity
      );
      const district = this.districts.find(
        (district) => district.DistrictID === this.selectedDistrict
      );
      const ward = this.wards.find(
        (ward) => ward.WardCode === this.selectedWard
      );
      if (city == null || district == null) {
        this.address = this.detailBill.address;
        this.addressCode = this.detailBill.addressCode;
      } else {
        this.address = ` ${this.detailBill.address}, ${ward.WardName}, ${district.DistrictName}, ${city.ProvinceName}`;
        this.addressCode = ` ${ward.WardCode}, ${district.DistrictID}, ${city.ProvinceID}`;
      }
      if (this.totalPrice >= 15000000) {
        this.phiVanChuyen = 0
      }

      const id = this.$route.params.id;
      const apiUrl = "v1/bill/update-bill";
      const data = {
        id: id,
        username: this.username,
        fullName: this.detailBill.fullName,
        address: this.address,
        phoneNumber: this.detailBill.phoneNumber,
        addressCode: this.addressCode,
        total: this.totalPrice,
        addressCode: this.addressCode,
        transportFee: this.phiVanChuyen,
      };
      Axios.post(apiUrl, data, {})
        .then((response) => {
          if (response.data.infor_response.code == 200) {
            toast.success("Cập nhật thông tin đơn hàng thành công: ");
            this.totalPrice = 0;
            this.cities = [],
              this.districts = [],
              this.wards = [],
              this.getCities();
            this.billDetail();
            this.amounts = [];
            this.phiVanChuyen = response.data.transportFee;
          } else {
            toast.warning("Cập nhật đơn hàng thất bại");
          }
        })
        .catch((error) => {
          toast.error("Cập nhật đơn hàng thất bại");
        });
    },
    async updateAmountDetail(id, amount) {
      var quantitySp = document.getElementById("quantitySp");
      const detail = this.detailBill.detailBillResponses.find(
        (detail) => detail.id === id
      );
      if (!detail) {
        return;
      }
      if (!amount) {
        quantitySp.style.borderColor = "";
        return;
      }
      if (amount > detail.amountProduct || amount <= 0 || isNaN(amount)) {
        quantitySp.style.borderColor = "red";
        return;
      }
      if (parseInt(amount) === parseInt(detail.amount)) {
        this.amounts = [];
        return;
      }
      const amountChange = amount - detail.amount;

      const apiUrl = `v1/bill/update-amount?id=${detail.id}&productId=${detail.productId}&amount=${amountChange}&amountNew=${amount}`;
      await Axios.post(apiUrl)
        .then((response) => {
          if (response.data.infor_response.code === 200) {
            this.totalPrice = 0;
            this.phiVanChuyen = 0;
            this.billDetail();
            this.amounts = [];
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    feeShip(selectCity, selectedDistrict, selectedWard) {
      const dataServices = {
        shop_id: 3685860,
        from_district: 3440,
        to_district: parseInt(selectedDistrict),
      };

      axios
        .post(
          "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
          dataServices,
          {
            headers: {
              token: "c157a694-916b-11ed-9dc6-f64f768dbc22",
            },
          }
        )
        .then((response) => {
          if (response.data.code == 200) {
            this.serviceId = response.data.data[0].service_id;
            const data = {
              from_district_id: 3440,
              service_id: this.serviceId,
              to_district_id: parseInt(selectedDistrict),
              to_ward_code: selectedWard,
              height: parseFloat(this.height),
              length: 20,
              weight: parseFloat(this.totalWeight),
              width: 20,
              insurance_value: parseFloat(this.totalPrice),
              coupon: null,
            };
            axios
              .post(
                "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                data,
                {
                  headers: {
                    token: "c157a694-916b-11ed-9dc6-f64f768dbc22",
                    ShopId: "3685860",
                  },
                }
              )
              .then((response) => {
                this.phiVanChuyen = response.data.data.total;
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getDistricts(cityId) {
      axios
        .get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${cityId}`,
          {
            headers: {
              token: "c157a694-916b-11ed-9dc6-f64f768dbc22",
            },
          }
        )
        .then((response) => {
          this.districts = response.data.data;
          this.selectedDistrict = "";
          this.wards = [];
          this.districts.map((item) => {
            this.addressDistrict = item.DistrictName;
            return item;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getWards(districtId) {
      const city = this.cities.find(
        (city) => city.ProvinceID === this.selectedCity
      );
      axios
        .get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
          {
            headers: {
              token: "c157a694-916b-11ed-9dc6-f64f768dbc22",
            },
          }
        )
        .then((response) => {
          this.wards = response.data.data;
          this.selectedWard = "";

          this.feeShip(
            city.ProvinceID,
            districtId,
            response.data.data[0].WardCode
          );
          this.wards.map((item) => {
            return item;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCities() {
      axios
        .get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              token: "c157a694-916b-11ed-9dc6-f64f768dbc22",
            },
          }
        )
        .then((response) => {
          this.cities = response.data.data;
          this.cities.map((item) => {
            return item;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteDetail() {
      const apiUrl =
        "v1/bill/delete/" +
        this.detailId +
        "/" +
        this.productId +
        "?amount=" +
        this.amountProduct;
      Axios.post(apiUrl, "", {})
        .then((response) => {
          toast.success("Bạn đã xoá sản phẩm ra đơn hàng");
          this.del = false;

          this.totalPrice = 0;
          this.phiVanChuyen = 0;
          this.billDetail();
          this.amounts = [];
        })
        .catch((error) => {
          toast.warning("Xoá sản phẩm thất bại");
        });
    },
    confirmDelete(id, productId, amount) {
      this.del = true;
      this.productId = productId;
      this.detailId = id;
      this.amountProduct = amount;
    },
  },
  mounted() {
    this.getAll(),
      this.getCategory(),
      this.getSeri(),
      this.billDetail(),
      this.getCities();
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalCount / this.pageSize);
    },
    detailById() {
      return (id) => {
        return this.detailBill.detailBillResponses.find(
          (detail) => detail.id === id
        );
      };
    },
  },
  watch: {
    "detailById(id).amount"(newVal) {
      this.amountCopy = newVal; // Gán giá trị mới vào biến amountCopy
    },
  },
};
</script>
<style>
.product_money,
.product_name {
  font-size: larger;
}

.product_name {
  font-weight: unset;
}

.product_money {
  font-weight: bolder;
}

tr>th {
  font-weight: bold !important;
}
</style>
