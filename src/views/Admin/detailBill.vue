
<style scoped>
th {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: large;
}
</style>
<template>
  <router-link class="btn btn-success col-1 mx-5 mt-5" to="/bill-manage/show">Quay lại</router-link>
  <div class="container my-3">
    <div class="row px-xl-5 py-5 bg-white border-0 rounded">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2 text-center">
          Chi tiết hoá đơn
        </v-card-title>
        <div class="col-2 mx-5"></div>
        <v-card-text>
          <div class="modal-body">
            <div class="row col-2" style="margin-left: auto;"
              v-if="detailBill.status == 'CHO_XAC_NHAN' || detailBill.status == 'XAC_NHAN'">
              <!-- <button type="button" class="btn btn-success" style="color: aliceblue;" @click="addBill(detailBill.id)">
                <span style="color: aliceblue; margin-right: 10px;">Thêm </span> <i
                  class="bi bi-plus-circle-fill"></i></button> -->
            </div>
            <div class="row">
              <h6 class="mb-5">Người gửi hàng</h6>
              <p>Tên người gửi {{ inforName }}, Số điện thoại : {{ inforPhone }}</p>
              <p>Địa chỉ: {{ inforAddress }}</p>
            </div>
            <div class="row">
              <h6 class="mb-5">Người nhận hàng</h6>
              <p>Mã đơn hàng: {{ detailBill.codeBill }}, đặt lúc : {{ dateTime }} , <span
                  style="color: red; font-weight: 500;">{{ detailBill.statusName }}</span></p>
              <p>Họ tên: {{ detailBill.fullName }} - {{ detailBill.phoneNumber }} - {{ detailBill.email }}</p>
              <p v-if="detailBill.paymentMethod == 'MONEY'">Hình thức thanh toán: Tiền mặt</p>
              <p>Số tiền đã thanh toán: {{ formatPrice(detailBill.customerMoney) }}</p>
              <p v-if="detailBill.paymentMethod == 'CARD'">Hình thức thanh toán: Chuyển khoản</p>
              <p>Đã hoàn trả: {{ formatPrice(detailBill.refund) }}</p>
              <p>Phí vận chuyển: {{ formatPrice(detailBill.transportFee) }}</p>
              <p>Địa chỉ: {{ this.address }}</p>
            </div>
            <table class="table my-5">
              <thead>
                <tr class="table-primary">
                  <th style="font-size: 15px;" scope="col">STT</th>
                  <th style="font-size: 15px;" scope="col">Tên sản phẩm</th>
                  <th style="font-size: 15px;" scope="col">Số lượng</th>
                  <th style="font-size: 15px;" scope="col">Cân nặng, Chiều cao</th>
                  <th style="font-size: 15px;" scope="col">Giá mua</th>
                  <th style="font-size: 15px;" scope="col">Tổng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(detail, i) in detailBill.detailBillResponses" :key="i"
                  style="text-align: center; font-size: 15px;">
                  <th scope="row">{{ i + 1 }}</th>
                  <td style="width: 320px;">{{ detail.productName }}</td>
                  <td>{{ detail.amount }}</td>
                  <td>{{ detail.weight }} Kg , {{ detail.height }} cm</td>
                  <td>{{ formatPrice(detail.priceSale) }}</td>
                  <td>{{ formatPrice(detail.priceSale * detail.amount) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="5" style="font-size: medium; font-weight: 600;">Phí vận chuyển</td>
                  <td style="font-weight: 600;">{{ formatPrice(detailBill.transportFee) }}</td>
                </tr>
                <tr>
                  <td colspan="5" style="font-size: medium; font-weight: 600;">Tổng tiền sản phẩm</td>
                  <td style="font-weight: 600;">{{ formatPrice(detailBill.total) }}</td>
                </tr>
                <tr>
                  <td colspan="5" style="font-size: medium; font-weight: 600;">Tổng tiền </td>
                  <td style="font-weight: 600;">{{ formatPrice(detailBill.total + detailBill.transportFee) }}</td>
                </tr>

              </tfoot>
            </table>
            <div class="row" v-if="detailBill.status == 'XAC_NHAN'">
              <h5 style="color: red; margin-top: 20px;">Thông tin đơn hàng</h5>
              <div class="col-12 border-1 border-top ">
                <div class="row my-3 ">
                  <div class="col">
                    <label class="">Tổng kg</label>
                    <input type="text" class="form-control text-center" v-model="weight" placeholder="Tổng Kg" id="weight"
                      @blur="validatWeight" aria-label="Tổng kilogam">
                  </div>
                  <div class="col">
                    <label class="">Chiều dài (cm)</label>
                    <input type="text" class="form-control text-center" v-model="lenght" placeholder="Chiều dài"
                      id="lenght" @blur="validatLenght" aria-label="Chiều dài">
                  </div>
                  <div class="col">
                    <label class="">Chiều rộng (cm)</label>
                    <input type="text" class="form-control text-center" v-model="width" placeholder="Chiều rộng"
                      id="width" @blur="validatWidth" aria-label="Chiều rộng">
                  </div>
                  <div class="col">
                    <label class="">Chiều cao (cm)</label>
                    <input type="text" class="form-control text-center" v-model="height" placeholder="Chiều cao"
                      id="height" @blur="validatHeight" aria-label="Chiều cao">
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Giá trị đơn hàng</label>
                    <input class="form-control border border-1" disabled id="exampleFormControlTextarea1" rows="3" v-model="insurance_value"/>
                  </div>
                  <div class="mb-3 col-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Số tiền thu hộ</label>
                      <input type="text" class="form-control" id="customer"  @input="formatPriceInput"
                      v-model="totalCustomerEnter">
                  </div>
                  <div class="mb-3 col-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Nội dung đơn hàng</label>
                    <textarea class="form-control border border-1" id="exampleFormControlTextarea1" rows="3"
                      v-model="content"></textarea>
                  </div>

                </div>
                <div class="row ">
                  <div class="col-10"></div>
                  <button class="btn btn-success col-2" @click="createTransport()">
                    Giao hàng nhanh
                  </button>
                </div>
              </div>
            </div>

          </div>
        </v-card-text>
      </v-card>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import router from '@/router'
import { TodayDateV3, TodayDateV4, TodayDateV5, TodayDateV6 } from "@/commons/util";
import Axios from "@/router/axios";
import check from '@/commons/jwt';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import Cookies from 'js-cookie';
const userName = Cookies.get('_user')
const accessToken = Cookies.get('access_token');
const rounter = useRouter();
const toast = useToast();
export default {
  name: 'detail-bill',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      context: null,
      detailBill: [],
      idBill: 0,
      billId: '',

      totalCustomer: null,
      totalCustomerEnter: null,
      huy: false,
      disabled: true,
      inforSender: [],
      inforAddress: '',
      inforName: '',
      inforPhone: '',
      weight: 0,

      customerMoneyError: '',
      weightError: '',
      lenghtError: '',
      heightError: '',
      widthError: '',
      address : '',
      insurance_value: 0

    };
  },
  computed: {
    formatPriceInput() {
      const value = this.totalCustomerEnter.replace(/\D/g, '')
      this.totalCustomerEnter = parseInt(value)
      this.cod_amount = this.totalCustomerEnter
      this.totalCustomerEnter = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    },
  },
  mounted() {
    this.detail()
    this.getInforSender()
  },

  methods: {
    async init() {
      let statusReq = await check(Axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: '/login' });
        return;
      } else {
        router.push('/bill-manage/show')
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    addBill(id) {
      router.push({
        name: "add-bill", params: {
          id: id
        }
      });
    },

    detail() {
      Axios.get("v1/bill/" + this.$route.params.id)
        .then((response) => {
          if ((response.data.infor_response = 200)) {
            this.detailBill = response.data.data;
            this.detailBillResponses = this.detailBill.detailBillResponses;
            this.detailBillResponses.map((item) => {
              this.weight += item.weight;
            });
            this.idBill = this.detailBill.id;
            this.address = this.detailBill.address
            this.dateTime = TodayDateV6(new Date(this.detailBill.createDate));
            this.insurance_value = this.formatPrice(this.detailBill.total + this.detailBill.transportFee) 
          }
        })
        .catch((error) => { });
    },
    getInforSender() {
      const data = {
        offset: 0,
        limit: 50,
        client_phone: "0329891028"
      }
      axios
        .post("https://online-gateway.ghn.vn/shiip/public-api/v2/shop/all", data, {
          headers: {
            token: "c157a694-916b-11ed-9dc6-f64f768dbc22",
          },
        }).then((response) => {
          this.inforSender = response.data.data.shops
          this.inforSender.map(item => {
            this.inforAddress = item.address
            this.inforName = item.name
            this.inforPhone = item.phone
          })

        })
        .catch((error) => {
          console.log(error);
        });
    },
    createTransport() {

      this.validatHeight()
      this.validatLenght()
      this.validatWeight()
      this.validatWidth()
      if (this.heightError || this.weightError || this.lenghtError || this.widthError) {
        return;
      }
      if(this.insurance_value >5000000){
        this.insurance_value = 5000000
      }
      
      const addressArray = this.address.split(",");
      this.city = addressArray[addressArray.length - 1].trim();
      this.district = addressArray[addressArray.length - 2].trim();
      this.ward = addressArray[addressArray.length - 3].trim();
      this.items = this.detailBill.detailBillResponses;
      const data = {
        to_name: this.detailBill.fullName,
        to_phone: this.detailBill.phoneNumber,
        to_address: this.address,
        to_ward_name: this.ward,
        to_district_name: this.district,
        to_province_name: this.city,
        length: parseFloat(this.lenght),
        width: parseFloat(this.width),
        height: parseFloat(this.height),
        insurance_value: parseInt(this.insurance_value),
        service_type_id: 2,
        payment_type_id: 1,
        required_note: "CHOXEMHANGKHONGTHU",
        content: this.content,
        cod_amount: parseFloat(this.cod_amount),
        items: this.items.map((item) => {
          return {
            name: item.productName,
            code: item.id.toString(),
            quantity: parseFloat(item.amount),
            price: item.priceSale,
            length: 10,
            width: 10,
            height: 10,
            category: {
              "level1": "Áo"
            },
          };
        }),
        weight: parseFloat(this.weight),
      };
      axios
        .post("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create", data, {
          headers: {
            token: "c157a694-916b-11ed-9dc6-f64f768dbc22",
            ShopId: "3685860",
          },
        }).then((response) => {
          response.data.order_code;
          if (response.data.code = 200) {
            this.saveDellivery(this.$route.params.id, response.data.data.order_code);
            this.updateStatus(this.$route.params.id, 'DA_TAO_DON');
            this.detail();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveDellivery(idBill, deliveryId) {
      const data = {
        billId: parseInt(idBill),
        deliveryId: deliveryId.toString()
      };
      const apiUrl = "v1/bill/save-delivery";
      Axios
        .post(apiUrl, data)
        .then((response) => {
          if ((response.data.infor_response.code = 200)) {
            this.items = response.data.data.data;
          }
        })
        .catch((error) => {
        });
    },
    updateStatus(id, status) {

      const apiUrl = "http://localhost:8000/api/v1/bill/" + id;
      Axios
        .post(apiUrl, status)
        .then((response) => {
          if ((response.data.infor_response.code = 200)) {
            if (status == 'HUY') {
              toast.success('Huỷ đơn hàng thành công')
              this.huy = false
            }
            if (status == 'DA_GIAO') {
              toast.success('Đơn hàng đã giao thành công')
            }
            if (status == 'DA_TAO_DON') {
              toast.success('Tạo đơn giao cho vận chuyển thành công')
            }
            if (status == 'DANG_VAN_CHUYEN') {
              toast.success('Đơn hàng đang được vận chuyển')
            }
            this.detail()
          }
        })
        .catch((error) => {
        });
    },
    validateTotalCustomer() {
      var nameSp = document.getElementById("customer");
      if (this.totalCustomer == null) {
        this.customerMoneyError = "Tổng tiền không được để trống";
        nameSp.style.borderColor = "red"
      } else
        if (isNaN(this.totalCustomer) || this.totalCustomer < 0) {
          this.customerMoneyError = " Tiền phải là số và lớn hơn hoặc = 0";
          nameSp.style.borderColor = "red"
        }
        else {
          nameSp.style.borderColor = "green"
          this.customerMoneyError = '';


        }
    },
    validatWeight() {
      var nameSp = document.getElementById("weight");
      if (!this.weight) {
        nameSp.style.borderColor = "red"
        this.weightError = 'Trống'
      } else
        if (isNaN(this.weight) || this.weight <= 0) {
          this.weightError = " Tiền phải là số và lớn hơn 0";
          nameSp.style.borderColor = "red"
          this.weightError = 'Là số và >0'
        }
        else {
          nameSp.style.borderColor = "green"
          this.weightError = ''
        }
    },
    validatLenght() {
      var nameSp = document.getElementById("lenght");
      if (!this.lenght) {
        nameSp.style.borderColor = "red"
        this.lenghtError = 'Trống'
      } else
        if (isNaN(this.lenght) || this.lenght <= 0) {
          nameSp.style.borderColor = "red"
          this.lenghtError = 'Là số và >0'
        }
        else {
          nameSp.style.borderColor = "green"
          this.lenghtError = ''
        }
    },
    validatHeight() {
      var nameSp = document.getElementById("height");
      if (!this.height) {
        nameSp.style.borderColor = "red"
        this.heightError = 'Trống'
      } else
        if (isNaN(this.height) || this.height <= 0) {
          nameSp.style.borderColor = "red"
          this.heightError = 'Là số và >0'
        }
        else {
          nameSp.style.borderColor = "green"
          this.heightError = ''
        }
    },
    validatWidth() {
      var nameSp = document.getElementById("width");
      if (!this.width) {
        nameSp.style.borderColor = "red"
        this.widthError = 'Trống'
      } else
        if (isNaN(this.width) || this.width <= 0) {
          nameSp.style.borderColor = "red"
          this.widthError = 'Là số và >0'
        }
        else {
          nameSp.style.borderColor = "green"
          this.widthError = ''
        }
    },

  },

};
</script>
