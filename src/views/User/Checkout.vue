
<script setup>
import { onMounted, onUnmounted } from "vue";
import NavbarDefault from "@/views/User/Navbar.vue";
import FooterDefault from "@/views/User/FooterDefault.vue";

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
</script>

<template>
  <div class="container top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault />
      </div>
    </div>
  </div>

  <div class="container-fluid my-5 bg-white" style="padding-top: 20px">
    <div class="container">
      <div class="row px-xl-5">
        <div class="col-lg-7">
          <div class="p-30 mb-5">
            <form>
              <div class="row">
                <div class="col-md-12 mb-5" v-if="userName">
                  <select class="form-select text-sm-start" v-model="selectAddress" @change="changAddress(selectAddress)"
                    style="
                      padding-left: 5px;
                      border: 1px solid;
                      border-color: #dee2e6;
                    ">
                    <option value="" selected>Thêm địa chỉ mới ...</option>
                    <option v-for="city in listAddress.data" :value="city.address" :key="city.id">
                      {{ city.phoneNumber }}-{{ city.address }}
                    </option>
                  </select>
                </div>
                <div class="col-md-12 mb-5">
                  <input class="form-control" style="
                      padding-left: 5px;
                      border: 1px solid;
                      border-color: #dee2e6;
                    " id="fullName" v-model="fullName" @blur="validateFullName" type="text" placeholder=" Họ tên"
                    required />
                  <label style="color: red" v-if="fullNameError">{{
                    fullNameError
                  }}</label>
                </div>
                <div class="col-md-8 form-group mb-5">
                  <input class="form-control" style="
                      padding-left: 5px;
                      border: 1px solid;
                      border-color: #dee2e6;
                    " id="email" v-model="email" type="text" placeholder=" Email" required @blur="validateEmail" />
                  <label v-if="emailError" style="color: red">
                    {{ emailError }}</label>
                </div>
                <div class="col-md-4 form-group mb-5">
                  <input class="form-control" style="
                      padding-left: 5px;
                      border: 1px solid;
                      border-color: #dee2e6;
                    " id="phoneNumber" v-model="phoneNumber" type="text" placeholder=" Số điện thoại" required
                    @blur="validatePhoneNumber" />
                  <label style="color: red" v-if="phoneNumberError">{{
                    phoneNumberError
                  }}</label>
                </div>
                <div class="col-md-12 form-group mb-5">
                  <input class="form-control" style="
                      padding-left: 5px;
                      border: 1px solid;
                      border-color: #dee2e6;
                    " v-model="address" type="text" placeholder=" Địa chỉ" required id="address"
                    @blur="validateAddress" />
                  <label style="color: red" v-if="addressError">{{
                    addressError
                  }}</label>
                </div>

                <div class="col-md-4 form-group">
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
                  <label style="color: red" v-if="cityError">{{
                    cityError
                  }}</label>
                </div>

                <div class="col-md-4 form-group">
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
                  <label style="color: red" v-if="districtsError">{{
                    districtsError
                  }}</label>
                </div>

                <div class="col-md-4 form-group mb-5">
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
                  <label style="color: red" v-if="selectedWardError">{{
                    selectedWardError
                  }}</label>
                </div>

                <div class="col-md-12 form-group mb-5">
                  <label>Ghi chú</label>
                  <textarea class="form-control border border-1" style="
                      padding-left: 5px;
                      border: 1px solid;
                      border-color: #dee2e6;
                    " id="exampleFormControlTextarea1" v-model="note" rows="3"></textarea>
                </div>

                <label>Phương thức vận chuyển</label>
                <ul class="col-md-12 form-group list-group px-2 mb-5">
                  <li class="list-group-item">
                    <div class="form-check">
                      <input class="form-check-input" v-model="transportFee" type="radio" checked name="gh" id="gh"
                        value="giaohang" />
                      <label class="form-check-label" for="gh" style="color: black">
                        Giao hàng tận nơi
                      </label>
                      <label style="margin-left: 300px">
                        {{ formatPrice(phiVanChuyen) }}
                      </label>
                    </div>
                  </li>
                </ul>

                <label class="">Phương thức thanh toán</label>
                <ul class="col-md-12 form-group list-group px-2">
                  <li class="list-group-item">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" v-model="paymentMethod" name="exampleRadios" checked
                        id="exampleRadios2" value="MONEY" data-bs-toggle="collapse" data-bs-target="#collapseExample1"
                        aria-controls="collapseExample1" />
                      <label class="form-check-label" for="exampleRadios2" style="color: black">
                        Thanh toán khi nhận hàng
                      </label>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" v-model="paymentMethod" name="exampleRadios"
                        id="exampleRadios3" value="CARD" data-bs-toggle="collapse" data-bs-target="#collapseExample1"
                        aria-controls="collapseExample3" />
                      <label class="form-check-label" for="exampleRadios3" style="color: black">
                        Thanh toán ví điện tử VNPay
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>

        <div class="col-lg-5 bg-white border-left border-1">
          <div class="p-30 mb-5">
            <table class="table table-hover table-borderless table-white">
              <tbody class="align-middle">
                <tr v-for="(item, index) in cart" :key="index">
                  <td class="align-middle">
                    <img :src="'http://localhost:8000/api/products/show?url=' +
                      item.url
                      " alt="" style="width: 50px" />
                    <span class="badge bg-secondary position-absolute translate-middle badge rounded-pill">{{ item.amount
                    }}</span>
                  </td>
                  <td class="align-middle text-wrap">{{ item.productName }}</td>
                  <td class="align-middle text-wrap" style="font-size: smaller">
                    {{ formatPrice(item.priceSales * item.amount) }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-between mb-3">
              <input type="text" v-model="voucher" class="form-control mr-2" style="
                  padding-left: 5px;
                  border: 1px solid;
                  border-color: #dee2e6;
                " id="voucher" placeholder="Coupon Code" />
              <button style="margin-left: 5px; width: 150px; margin-top: 10px" class="btn btn-primary" type="submit"
                @click="applyVoucher()">
                Voucher
              </button>
            </div>
            <label v-if="voucherError" style="color: red">{{
              voucherError
            }}</label>

            <div class="border-bottom py-4 pb-2">
              <div class="d-flex justify-content-between mb-3">
                <h6>Giá</h6>
                <h6>{{ formatPrice(totalBeforDiscount) }}</h6>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <h6>Giảm giá</h6>
                <h6>{{ formatPrice(feeApplyVoucher + priceDiscount) }}</h6>
              </div>
              <div class="d-flex justify-content-between">
                <h6 class="font-weight-medium">Phí vận chuyển</h6>
                <h6 v-if="totalAfterDiscount < 15000000" class="font-weight-medium">
                  {{ formatPrice(phiVanChuyen) }}
                </h6>
                <h6 v-if="totalAfterDiscount >= 15000000" class="font-weight-medium">
                  0 đ
                </h6>
              </div>
            </div>
            <div class="pt-2">
              <div class="d-flex justify-content-between mt-2">
                <h5>Tổng tiền</h5>
                <h5 v-if="totalAfterDiscount < 15000000">
                  {{ formatPrice(totalAfterDiscount + phiVanChuyen) }}
                </h5>
                <h5 v-if="totalAfterDiscount >= 15000000">
                  {{ formatPrice(totalAfterDiscount) }}
                </h5>
              </div>
            </div>
          </div>
          <button class="btn btn-primary" type="submit" @click="submitData()">
            Thanh toán
          </button>

          <div class="border-bottom py-4 pb-2">
            <div class="justify-content-between mb-3">
              <h6>Với hình thức thanh toán khi nhận hàng</h6>
              <p>
                Với các đơn hàng từ 0 đến 20.000.000 VNĐ khách hàng sẽ phải
                thanh toán trước 30% tổng giá trị đơn hàng.
              </p>
              <p>
                Và đơn hàng lớn hơn 20.000.000 VNĐ khách hàng sẽ phải thanh toán
                trước 50% tổng giá trị đơn hàng.
              </p>
            </div>
          </div>

          <div v-if="infor_response == 200" class="border-bottom py-4 pb-2">
            <div class="justify-content-between mb-3">
              <h6>Giảm giá với các hoá đơn</h6>
              <p>Từ ngày {{ startDate }} đến ngày {{ endDate }}</p>
              <p>
                Khi khách hàng mua hàng với tổng giá trị đơn hàng lớn hơn
                {{ formatPrice(minPrice) }}
              </p>
              <p>Sẽ được giảm ngay {{ formatPrice(priceDiscount) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterDefault />
</template>

<script>
import cart_service from "@/services/cartService";
import axios from "axios";
import { useToast } from "vue-toastification";
import Axios from "@/router/axios";
import check from "@/commons/jwt";
import Cookies from "js-cookie";
import router from "@/router";
import {
  isNull,
  isValid,
  smaller,
  larger,
  SmallOrEqual,
  largerOrEqual,
  TodayDateV2,
  TodayDateV3,
  isBlank,
} from "@/commons/util";
const userName = Cookies.get("_user");

const toast = useToast();

export default {
  data() {
    return {
      paid: false,
      total: 0,
      count: 0,
      cart: [],
      discountBill: [],
      detailCart: [],
      cities: [],
      selectedCity: "",
      districts: [],
      selectedDistrict: "",
      wards: [],
      selectedWard: "",
      fullAddress: "",
      voucher: "",
      feeApplyVoucher: 0,
      startDate: "",
      endDate: "",
      infor_response: "",
      minPrice: 0,
      priceDiscount: 0,
      paymentVNP: null,
      voucherError: "",

      phoneNumber: "",
      fullNameError: "",
      emailError: "",
      phoneNumberError: "",
      addressError: "",
      selectedWardError: "",
      cityError: "",
      districtsError: "",
      totalAfterDiscount: 0,
      totalBeforDiscount: 0,

      transportFee: 0,
      customerMoney: 0,
      discount: 0,
      paymentMethod: "MONEY",
      note: "",
      fullName: "",
      address: "",
      phoneNumber: "",
      discountId: 0,
      username: "",
      email: "",
      totalWeight: 0,
      height: 0,
      maxHeight: 0,
      phiVanChuyen: 0,
      detailBillRequests: [],
      gest_user: "",

      getShops: [],
      shopsCode: null,
      listAddress: [],
      selectAddress: "",
      addressCode: "",
    };
  },
  mounted() {
    // this.init()
    this.getCities();
    this.getDiscount();
    this.getAddress();
    this.loadCart();
  },

  watch: {
    // selectAddress(newVal) {
    //   const selectedCity = this.listAddress.data.find(city => city.address === newVal);
    //   if (selectedCity) {
    //     const arr = selectedCity.addressCode.split(", ");
    //     const city = arr[arr.length - 1];
    //     const district = arr[1];
    //     const ward = arr[0];
    //     // Cập nhật giá trị của phoneNumber và address từ selectedCity
    //     this.phoneNumber = selectedCity.phoneNumber;
    //     this.address = selectedCity.address;
    //     this.fullName = selectedCity.fullName
    //     this.email = selectedCity.email
    //     this.selectedCity = city
    //     this.selectedDistrict = district
    //     this.getDistricts(this.selectedCity)
    //     this.selectedWard = ward
    //     this.getWards(this.selectedDistrict)
    //   } else {
    //     this.phoneNumber = null;
    //     this.address = null;
    //     this.fullName = null
    //     this.email = null
    //     this.cities()
    //     this.selectedCity = null
    //     this.selectedDistrict = null
    //     this.selectedWard = null
    //   }
    // },
  },

  methods: {
    async init() {
      let statusReq = await check(Axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/login" });
        return;
      } else {
        router.push("/checkout");
      }
    },
    async upload() {
      const formData = new FormData();
      var files = this.imgUrl;
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        formData.append("files", files[i]);
      }
      Axios.post("producs/upload", formData, {}).then((res) => {
        console.log(res.data);
      });
    },
    changAddress(newVal) {
      const selectedCity = this.listAddress.data.find(
        (city) => city.address === newVal
      );
      if (selectedCity) {
        const arr = selectedCity.addressCode.split(", ");
        const city = arr[arr.length - 1];
        const district = arr[1];
        const ward = arr[0];
        // Cập nhật giá trị của phoneNumber và address từ selectedCity
        this.phoneNumber = selectedCity.phoneNumber;
        this.address = selectedCity.address;
        this.fullName = selectedCity.fullName;
        this.email = selectedCity.email;
        this.selectedCity = city;
        this.selectedDistrict = district;
        this.getDistricts(this.selectedCity);
        this.selectedWard = ward;
        this.getWards(this.selectedDistrict) 
       
      } else {
        this.phoneNumber = null;
        this.address = null;
        this.fullName = null;
        this.email = null;
        this.cities();
        this.selectedCity = null;
        this.selectedDistrict = null;
        this.selectedWard = null;
      }
    },
    paymentVNPay(amount, vnp_TxnRef) {
      Axios.get("/test-vnpay", {
        params: {
          amount: amount * 100,
          bank_code: "VNBANK",
          vnp_TxnRef: vnp_TxnRef,
          vnp_OrderInfo: "ABC",
        },
      })
        .then((response) => {
          window.open(response.data.paymentUrl, "_blank");
          window.addEventListener("message", (event) => {
            if (event.origin === "https://sandbox.vnpayment.vn") {
              // Lấy url trả về sau khi thanh toán thành công
              let returnUrl = event.data;
              console.log(returnUrl);

              // Chuyển hướng đến url trả về
              window.location.href = returnUrl;
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    validateFullName() {
      var fullName = document.getElementById("fullName");
      if (!this.fullName) {
        this.fullNameError = "Họ tên không được bỏ trống";
        fullName.style.borderColor = "red";
      } else if (this.fullName.length < 3) {
        this.fullNameError = "Họ tên phải có ít nhất 3 ký tự";
        fullName.style.borderColor = "red";
      } else {
        fullName.style.borderColor = "green";
        this.fullNameError = "";
      }
    },
    validateEmail() {
      var email = document.getElementById("email");
      const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (!this.email) {
        this.emailError = "Vui lòng nhập email";
        email.style.borderColor = "red";
      } else if (!emailRegex.test(this.email)) {
        this.emailError = "Email không hợp lệ";
        email.style.borderColor = "red";
      } else {
        email.style.borderColor = "green";
        this.emailError = "";
      }
      if (Cookies.get("gest_user")) {
        Cookies.remove("gest_user");
      }
    },
    validatePhoneNumber() {
      var phoneNumber = document.getElementById("phoneNumber");
      const phoneNumberRegex = /^[0-9]+$/;
      if (!this.phoneNumber) {
        this.phoneNumberError = "Vui lòng nhập số điện thoại";
        phoneNumber.style.borderColor = "red";
      } else if (!phoneNumberRegex.test(this.phoneNumber)) {
        this.phoneNumberError = "Số điện thoại không hợp lệ";
        phoneNumber.style.borderColor = "red";
      } else {
        this.phoneNumberError = "";
        phoneNumber.style.borderColor = "green";
      }
    },
    validateAddress() {
      var address = document.getElementById("address");
      if (!this.address) {
        this.addressError = "Địa chỉ không được bỏ trống";
        address.style.borderColor = "red";
      } else {
        this.addressError = "";
        address.style.borderColor = "green";
      }
    },
    validateCity() {
      var city = document.getElementById("city");
      if (this.selectedCity === "") {
        city.style.borderColor = "red";
        this.cityError = "Vui lòng chọn thành phố";
      } else {
        city.style.borderColor = "green";
        this.cityError = "";
      }
    },
    validateDistricts() {
      var districts = document.getElementById("districts");
      if (this.selectedDistrict === "") {
        districts.style.borderColor = "red";
        this.districtsError = "Vui lòng chọn huyện";
      } else {
        districts.style.borderColor = "green";
        this.districtsError = "";
      }
    },
    validateSelectedWard() {
      var ward = document.getElementById("ward");
      if (this.selectedWard === "") {
        ward.style.borderColor = "red";
        this.selectedWardError = "Vui lòng chọn xã / phường";
      } else {
        ward.style.borderColor = "green";
        this.selectedWardError = "";
      }
    },
    validateVoucher() {
      var ward = document.getElementById("voucher");
      if (this.voucherError === "") {
        ward.style.borderColor = "red";
        this.voucherError = "Voucher không tồn tại hoặc đã hết hạn";
      } else {
        ward.style.borderColor = "green";
        this.voucherError = "";
      }
    },

    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },

    loadCart() {
      const cartCookie = Cookies.get("cart");
      if (cartCookie) {
        this.cart = JSON.parse(cartCookie);
        this.cart.totalPrice = 0;
        for (let index = 0; index < this.cart.length; index++) {
          if (
            typeof this.cart[index].priceSales === "number" &&
            typeof this.cart[index].amount === "number"
          ) {
            this.cart.totalPrice +=
              this.cart[index].priceSales * this.cart[index].amount;
            this.total = this.cart.totalPrice;
          }
        }
        this.totalAfterDiscount =
          this.total - this.priceDiscount - this.feeApplyVoucher;
        this.totalBeforDiscount = this.total;
      } else {
        cart_service
          .getCart(userName)
          .then((response) => {
            this.cart = response.data.data.items;
            let maxHeight = 0;
            for (
              let index = 0;
              index < response.data.data.items.length;
              index++
            ) {
              const currentItem = response.data.data.items[index];
              this.total += currentItem.amount * currentItem.priceSales;
              this.totalWeight += currentItem.weight * currentItem.amount;
              this.height = currentItem.height;
              if (currentItem.height > maxHeight) {
                maxHeight = currentItem.height;
              }
            }
            this.totalAfterDiscount =
              this.total - this.priceDiscount - this.feeApplyVoucher;
            this.totalBeforDiscount = this.total;
            this.height = maxHeight;
            this.getDiscount(this.total);
            this.cart.amount = this.count;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    applyVoucher() {
      var ward = document.getElementById("voucher");
      cart_service
        .getVoucher(this.voucher, userName, this.totalAfterDiscount)
        .then((response) => {
          this.feeApplyVoucher = response.data;
          if (this.feeApplyVoucher == 0) {
            ward.style.borderColor = "red";
            this.voucherError = "Voucher không tồn tại hoặc đã hết hạn";
          }
          if(this.voucher == ''){
            ward.style.borderColor = "green";
            this.voucherError = "";
          }
              ward.style.borderColor = "green";
              this.voucherError = "";
              this.totalAfterDiscount =
              this.totalBeforDiscount - this.priceDiscount - this.feeApplyVoucher;
         
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAddress() {
      cart_service
        .getAddress(userName)
        .then((response) => {
          this.listAddress = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ///update/voucher

    getDiscount(total) {
      if (isNaN(total)) {
        total = 0;
      }
      cart_service
        .getDiscount(total)
        .then((response) => {
          this.infor_response = response.data.infor_response.code;
          console.log(this.infor_response);
          if (this.infor_response == 200) {
            this.discountBill = response.data.data;
            this.startDate = TodayDateV3(
              new Date(this.discountBill.discountStart)
            );
            this.endDate = TodayDateV3(new Date(this.discountBill.discountEnd));
            this.minPrice = this.discountBill.minPrice;
            this.priceDiscount = this.discountBill.priceDiscount;
          } else {
            this.discountBill = [];
            this.priceDiscount = 0;
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
          this.wards = [];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getWards(districtId) {
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
          this.feeShip(districtId, response.data.data[0].WardCode);
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async submitData() {
      const toast = useToast();
      this.validateFullName();
      this.validateEmail();
      this.validatePhoneNumber();
      this.validateAddress();
      if (this.voucherError) {
        return;
      }
      if (
        this.fullNameError ||
        this.emailError ||
        this.phoneNumberError ||
        this.addressError ||
        this.selectedWardError ||
        this.cityError ||
        this.districtsError
      ) {
        return;
      }

      const city = this.cities.find(
        (city) => city.ProvinceID === this.selectedCity
      );
      const district = this.districts.find(
        (district) => district.DistrictID === this.selectedDistrict
      );
      const ward = this.wards.find(
        (ward) => ward.WardCode === this.selectedWard
      );
      console.log(this.selectedWard);

      if (city == null) {
        this.addressCode = this.listAddress.addressCode;
        this.fullAddress = this.address;
      } else {
        // this.address = ` ${this.detailBill.address}, ${ward.WardName}, ${district.DistrictName}, ${city.ProvinceName}`;
        this.validateSelectedWard();
        this.validateCity();
        this.validateDistricts();
        if (this.selectedWardError || this.cityError || this.districtsError) {
          return;
        }
        this.fullAddress = ` ${this.address}, ${ward.WardName}, ${district.DistrictName}, ${city.ProvinceName}`;
        this.addressCode = ` ${ward.WardCode}, ${district.DistrictID}, ${city.ProvinceID}`;
      }

      const dataUser = {
        userName: this.email.split("@")[0],
        email: this.email,
        phone: this.phoneNumber,
        password: "imsi00",
        fullname: this.fullName,
      };

      if (!userName) {
        await cart_service.registerAndBill(dataUser).then((response) => {
          this.gest_user = response.data.data.userName;

          this.setCookie("gest_user", this.gest_user, 3);
          this.username = this.gest_user;
        });
      }
      if (userName) {
        this.username = userName;
      }
      if (this.totalAfterDiscount >= 15000000) {
        this.phiVanChuyen = 0;
      }
      const data = {
        createDate: TodayDateV3(new Date()),
        transportFee: this.phiVanChuyen,
        customerMoney: this.customerMoney,
        discount: this.priceDiscount + this.feeApplyVoucher,
        paymentMethod: this.paymentMethod,
        note: this.note,
        fullName: this.fullName,
        address: this.fullAddress,
        phoneNumber: this.phoneNumber,
        discountId: this.discountId,
        username: this.username,
        email: this.email,
        voucherCode: this.voucher,
        total: this.totalAfterDiscount,
        addressCode: this.addressCode,
        detailBillRequests: this.cart.map((item) => {
          return {
            productId: item.productId,
            amount: item.amount,
            price: item.price,
            priceSale: item.priceSales,
          };
        }),
      };
      cart_service
        .saveBill(data)
        .then((response) => {
          if (response.data.infor_response.code === 200) {
            this.paymentVNP = response.data.data;
            let totalPay = parseFloat(
              this.paymentVNP.total + this.paymentVNP.transportFee
            );
            if (this.paymentVNP.paymentMethod == "CARD") {
              this.paymentVNPay(totalPay, this.paymentVNP.codeBill);
            }
            if (
              this.paymentVNP.paymentMethod == "MONEY" &&
              this.paymentVNP.total <= 20000000
            ) {
              let totalPayMoney = totalPay * 0.3;
              this.paymentVNPay(totalPayMoney, this.paymentVNP.codeBill);
            }
            if (
              this.paymentVNP.paymentMethod == "MONEY" &&
              this.paymentVNP.total > 20000000
            ) {
              let totalPayMoney = totalPay * 0.5;
              this.paymentVNPay(totalPayMoney, this.paymentVNP.codeBill);
            }
            this.fullName = "";
            (this.fullAddress = ""),
              (this.phoneNumber = ""),
              (this.email = ""),
              toast.success("Bạn đã đặt hàng thành công");
            this.discount = [];
            cart_service.deleteAllCart(userName);
            Cookies.remove("cart");
          } else {
            toast.warning("Đặt hàng không thành công thất bại");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
    async registerAndBill(email, phone, fullname) {
      const _user = Cookies.get("gest_user");
      const data = {
        userName: email,
        email: email,
        phone: phone,
        password: "imsi00",
        fullname: fullname,
      };
      if (!userName) {
        await cart_service.registerAndBill(data).then((response) => {
          var userName = response.data.data.userName;
          this.setCookie("gest_user", userName, 3);
        });
      }
    },
    setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      console.log(name, value, days);
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    feeShip(selectedDistrict, selectedWard) {
      let maxHeight = 0;

      const cartCookie = Cookies.get("cart");
      if (cartCookie) {
        this.cart = JSON.parse(cartCookie);
        this.cart.totalPrice = 0;
        for (let index = 0; index < this.cart.length; index++) {
          if (
            typeof this.cart[index].priceSales === "number" &&
            typeof this.cart[index].amount === "number"
          ) {
            this.cart.totalPrice +=
              this.cart[index].priceSales * this.cart[index].amount;
            this.total = this.cart.totalPrice;
            this.totalWeight +=
              this.cart[index].weight * this.cart[index].amount;
            this.height = this.cart[index].height;
            if (this.cart[index].height > maxHeight) {
              maxHeight = this.cart[index].height;
            }
          }
        }
      } else {
        cart_service
          .getCart(userName)
          .then((response) => {
            this.cart = response.data.data.items;
            for (
              let index = 0;
              index < response.data.data.items.length;
              index++
            ) {
              const currentItem = response.data.data.items[index];
              this.total += currentItem.amount * currentItem.priceSales;
              this.totalWeight += currentItem.weight * currentItem.amount;
              this.height = currentItem.height;
              if (currentItem.height > maxHeight) {
                maxHeight = currentItem.height;
              }
            }
            this.height = maxHeight;
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
              to_district_id: parseFloat(selectedDistrict),
              to_ward_code: selectedWard,
              height: parseFloat(this.height),
              length: 20,
              weight: parseFloat(this.totalWeight),
              width: 20,
              insurance_value: 500000,
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
                if (response.data.code == 200) {
                  this.phiVanChuyen = response.data.data.total;
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.getDiscount(this.total);
      this.cart.amount = this.count;
    },
  },
};
</script>
