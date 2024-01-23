<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "@/views/User/Navbar.vue";
import FooterDefault from "@/views/User/FooterDefault.vue";

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

  <div class="container-fluid my-5 bg-white ">
    <div class="row py-4 border-bottom border-1">
      <span class="text-center fs-2 fw-bold" style="color: blueviolet;">Thông tin đơn hàng</span>
    </div>
    <div class="container">
      <div class="container-fluid mt-5 pt-3">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 ">
              <div class="section-title mb-0">
                <h4 class="m-0 text-uppercase font-weight-bold">Đơn hàng</h4>
              </div>
              <div class="bg-white border border-top-1 p-4 mb-3">
                <div class="mb-4">
                  <h6 class="text-uppercase font-weight-bold">Thông tin đặt hàng </h6>
                  <div class="mb-3">
                    <div class="row">
                      <p>Mã đơn hàng: {{ billCode }}, đặt lúc : {{ dateTime }}</p>
                      <p>Địa chỉ: {{ address }}</p>
                    </div>
                    <table class="table my-5">
                      <thead>
                        <tr class="table-primary rounded border border-1">
                          <th scope="col">STT</th>
                          <th scope="col">Tên sản phẩm</th>
                          <th scope="col">Số lượng</th>
                          <th scope="col">Giá mua</th>
                          <th scope="col">Tổng tiền</th>
                          <th scope="col">Đánh giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(detail, i) in detailBill.detailBillResponses" :key="i" class="rounded border border-1">
                          <th scope="row">{{ i + 1 }}</th>
                          <td>{{ detail.productName }}</td>
                          <td>{{ detail.amount }}</td>
                          <td>{{ detail.priceSale }}</td>
                          <td>{{ detail.priceSale * detail.amount }}</td>
                          <td >
                            <RouterLink v-if="detail.rate == false && status=='DA_GIAO'"
                            :to="{ path: '/create-rate/' + detail.id }"
                            class="btn btn-primary"
                            rel="tooltip"
                            title="Designed and Coded by Creative Tim"
                            data-placement="bottom"
                            @click="closeModal()"
                          >
                            Đánh Giá
                          </RouterLink>
                           <a style="color: red;" class="text-wrap" v-if="detail.rate == true"> Sản phẩm này đã được đánh giá! </a>
                           <a style="color: red;"  class="text-wrap" v-if="status != 'DA_GIAO' ">Chưa được đánh giá</a>
                        </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                 
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <FooterDefault />
</template>

<script>
import axios from "@/router/axios";
import { isNull, isValid, smaller, larger, SmallOrEqual, largerOrEqual, TodayDateV2, TodayDateV3, isBlank } from "@/commons/util";
import Cookies from 'js-cookie';
const userName = Cookies.get('_user')
const accessToken = Cookies.get('access_token');
export default {
  name: 'Infor',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      items: [],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      search: "",
      status: '',
      from: '',
      to: '',
      context: null,
      detailBill: [],
      sortKey: '',
      sortDir: 'asc',
      address: '',
      billCode: '',

      dateTime: '',
      fullName: '',
      phoneNumber: '',
    };
  },

  methods: {

    detail() {
      axios.get("http://localhost:8000/api/v1/bill/" + this.$route.params.id, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken,
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
      }).then(response => {
        if (response.data.infor_response = 200) {

          this.detailBill = response.data.data;
          console.log("dòng hh" + this.detailBill)
          this.address = this.detailBill.address
          this.billCode = this.detailBill.codeBill
          this.status =  this.detailBill.status
          this.dateTime = TodayDateV3(new Date(this.detailBill.createDate))
          this.fullName = this.detailBill.fullName
          this.phoneNumber = this.detailBill.phoneNumber
        }
      })
        .catch((error) => {
        });
    },

  },
  mounted() {
    this.detail()
  }
}

</script>