
<style scoped>
th {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: large;
}
</style>
<template>
  <div class="container my-3">
    <div class="row px-xl-5 py-5 bg-white border-0 rounded">
      <div class="row g-3 justify-content-between">
        <div class="col-4">
          <input type="search" id="phone" class="form-control border border-1" v-model="search"
            placeholder="Tìm kiếm mã hoá đơn" aria-labelledby="phone" />
        </div>
        <div class="col-4">
          <input type="search" id="phone" class="form-control border border-1" v-model="searchPhone"
            placeholder="Tìm kiếm số điện thoại" aria-labelledby="phone" />
        </div>
        <div class="col-3">
          <button class="btn btn-success" @click="loadItems()" type="submit">
            Tìm kiếm
          </button>
          <button class="btn btn-danger " style="margin-left:20px ;" @click="clearInput()" type="submit">
            Hiển thị
          </button>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-md-4 ">
          <label for="" class=" my-2">Từ ngày</label>
          <div class="col-12">
            <input type="date" v-model="from" class="form-control datetimepicker-input" placeholder="Từ ngày"
              data-target="#date1" data-toggle="datetimepicker" />
          </div>
        </div>
        <div class="col-md-4">
          <label for="" class=" my-2">Đến ngày</label>
          <div class="col-12">
            <input type="date" v-model="to" class="form-control datetimepicker-input" placeholder="Đến ngày"
              data-target="#date2" data-toggle="datetimepicker" />
          </div>

        </div>
      </div>
      <div class="row mt-5">

        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{ active: tabPaneActiveKey === 1 }"
              @click="() => { tabPaneActiveKey = 1 }">Tất cả</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{ active: tabPaneActiveKey === 2 }"
              @click="() => { tabPaneActiveKey = 2 }">Chờ xác nhận</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{ active: tabPaneActiveKey === 3 }"
              @click="() => { tabPaneActiveKey = 3 }">Xác nhận</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{ active: tabPaneActiveKey === 8 }"
              @click="() => { tabPaneActiveKey = 8 }">Nhà vận chuyển</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{ active: tabPaneActiveKey === 4 }"
              @click="() => { tabPaneActiveKey = 4 }">Đang vận chuyển</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{ active: tabPaneActiveKey === 5 }"
              @click="() => { tabPaneActiveKey = 5 }">Đã giao</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{ active: tabPaneActiveKey === 6 }"
              @click="() => { tabPaneActiveKey = 6 }">Huỷ đơn hàng</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{ active: tabPaneActiveKey === 9 }"
              @click="() => { tabPaneActiveKey = 9 }">GHN huỷ đơn</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{ active: tabPaneActiveKey === 7 }"
              @click="() => { tabPaneActiveKey = 7 }">Trả hàng</a>
          </li>

        </ul>
        <div class="tab-content">
          <div class="tab-pane active" role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">
            <table class="table bg-white border border-1 my-5 rounded"
              style="font-family: Arial, Helvetica, sans-serif; color: black; ">
              <thead>
                <tr class="table-primary text-center" style="font-size: 18px; text-align: center;">
                  <th class="border">STT</th>
                  <th class="border" @click="sortTable('codeBill')">
                    Mã đơn hàng <i class="bi bi-arrow-down-up"></i>
                  </th>
                  <th class="border" @click="sortTable('createDate')">
                    Ngày đặt <i class="bi bi-arrow-down-up"></i>
                  </th>
                  <th class="border" @click="sortTable('total')">
                    Tổng tiền <i class="bi bi-arrow-down-up"></i>
                  </th>
                  <th class="border" @click="sortTable('customerMoney')">
                    Tổng đã trả <i class="bi bi-arrow-down-up"></i>
                  </th>
                  <th class="border" @click="sortTable('paymentMethod')">
                    Hình thức <i class="bi bi-arrow-down-up"></i>
                  </th>
                  <th class="border" @click="sortTable('status')">
                    Trạng thái <i class="bi bi-arrow-down-up"></i>
                  </th>
                  <th colspan="3" class="border text-center">Hành động</th>
                </tr>
              </thead>
              <tbody v-if="showTable">
                <tr v-for="(bill, index) in items" :key="index">
                  <th class="border text-center align-middle" scope="row">{{ beginIndex + index + 1 }}</th>
                  <td class="border text-center align-middle" >
                    {{ bill.codeBill }}
                  </td>
                  <td class="border text-center align-middle">{{ bill.createDate }}</td>
                  <td class="border text-center align-middle">{{ formatPrice(bill.total + bill.transportFee) }}</td>
                  <td class="border text-center align-middle">{{ formatPrice(bill.customerMoney) }}</td>
                  <td class="border text-center align-middle" v-if="bill.paymentMethod == 'CARD'">Chuyển khoản</td>
                  <td class="border text-center align-middle" v-if="bill.paymentMethod == 'MONEY'">Nhận hàng</td>
                  <td class="border text-center align-middle">{{ bill.statusName }}</td>
                  <td class="text-center align-middle">

                    <a class="mx-2 btn " v-if="bill.status == 'CHO_XAC_NHAN' || bill.status == 'HOA_DON_CHO' ||  bill.status == 'HUY_GHN'" 
                      @click="dialogXacNhan(bill.id, bill.total + bill.transportFee, bill.customerMoney, bill.codeBill, bill.paymentMethod, bill.refund)">Xác nhận
                      <i class="bi bi-check-square-fill"></i>
                    </a>
                    <a class="mx-2 btn " v-if="bill.status == 'CHO_XAC_NHAN' || bill.status == 'HOA_DON_CHO' || bill.status == 'HUY_GHN'"
                      @click="huyModal(bill.id, bill.total + bill.transportFee, bill.customerMoney - bill.refund, bill.codeBill, bill.paymentMethod)">Huỷ
                      <i class="bi bi-x-lg"></i>
                    </a>
                    <a class="mx-2 btn " v-if="bill.status == 'DA_TAO_DON' || bill.status == 'XAC_NHAN'" 
                      @click="updateStatus(bill.id, 'DANG_VAN_CHUYEN')">
                     Vận chuyển <i class="bi bi-truck-flatbed"></i>
                    </a>
                    <a v-if="bill.status == 'DANG_VAN_CHUYEN'" type="submit" v-on:click="updateStatus(bill.id, 'DA_GIAO')"
                      role="button"> Đã giao
                    </a>
                    <a v-if="bill.status == 'XAC_NHAN'" class="m-3 btn" type="submit" v-on:click="inhoadon(bill.id)"> Xuất HĐ
                    </a>
                    <a
                    type="submit"
                    class="mr-2"
                    @click="findByIdDetailBill(bill.id)"
                    data-toggle="tooltip"
                    title="Chi tiết"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </a>
                    <Span v-if="bill.status == 'HUY'" class="text-center align-middle " style="color: red;">
                      Đơn hàng đã bị huỷ
                    </Span>
                    <Span v-if="bill.status == 'DA_GIAO'" class="text-center align-middle " style="color: green;">
                      Đơn hàng đã được giao thành công
                    </Span>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="this.showAlert">
                <Span>Không có thông tin</Span>
              </tbody>
            </table>
            <div class="row my-5">
              <div class="col-2" style="width: 150px">
                <select class="form-select border border-1" v-model="pageSize" @change="onPageSizeChange">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div class="col-8">
                <nav>
                  <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                      <a class="page-link" @click="goToPage(currentPage - 1)">
                       Pre
                      </a>

                    </li>
                    <li class="page-item" v-for="page in pageCount" :key="page" :class="{ active: page === currentPage }">
                      <a class="page-link" @click="goToPage(page)">{{
                        page
                      }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <a class="page-link" @click="goToPage(currentPage + 1)">
                       Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
  <!--Confirm Xác nhận -->

  <template>
    <div class="text-center">
      <v-dialog v-model="xacnhan" width="500">
        <v-card>
          <v-card-text>
            Bạn có muốn xác nhận đơn hàng này ?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="xacnhan = false">
              Đóng
            </v-btn>
            <button class="btn btn-success" @click="updateStatus(id, 'XAC_NHAN')">
              Xác nhận
            </button>
          </v-card-actions>

        </v-card>
      </v-dialog>
    </div>
  </template>

  <!--Confirm Huỷ  -->

  <template>
    <div class="text-center">
      <v-dialog v-model="huy" width="500">
        <v-card>
          <v-card-text>
            Bạn có muốn huỷ đơn hàng này ?
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="huy = false">
              Đóng
            </v-btn>
            <button class="btn btn-success" @click="updateStatus(id, 'HUY')">
              Đồng ý
            </button>
          </v-card-actions>

        </v-card>
      </v-dialog>
    </div>
  </template>
</template>

<script>
import axios from "axios";
import router from '@/router'
import { TodayDateV3, TodayDateV4, TodayDateV5, TodayDateV6 } from "@/commons/util";
import Axios from "@/router/axios";
import check from '@/commons/jwt';
import { useToast } from "vue-toastification";
import Cookies from 'js-cookie';
const userName = Cookies.get('_user')
const accessToken = Cookies.get('access_token');
const toast = useToast();
export default {

  data() {
    return {
      items: [],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      totalPages: 0,
      search: "",
      searchPhone: "",
      status: "",
      from: "",
      to: "",
      context: null,
      detailBill: [],
      sortKey: "",
      sortDir: "asc",
      idBill: 0,
      billId: '',
      infor_response: null,
      showAlert: false,
      showTable: false,
      xlDemo: false,
      transpost: false,
      selectedTab: '',
      tabPaneActiveKey: 1,
      beginIndex: null,
      customerMoney: false,
      customerMoneyError: '',
      weightError: '',
      lenghtError: '',
      heightError: '',
      widthError: '',
      totalCustomer: null,
      totalCustomerEnter: null,
      disabled: true,

      address: "",
      billCode: "",
      dateTime: "",
      fullName: "",
      phoneNumber: "",
      street: "",
      ward: "",
      district: "",
      city: "",
      lenght: 0,
      weight: 0,
      totalWeight: 0,
      width: 0,
      height: 0,
      required_note: "",
      content: "",
      cod_amount: 0,
      delivery: "",
      statusCodeGHN: "",
      statusCodeCreateTransponse: "",
      isTabChanged: false,
      vnp_TransactionType: 0,

      xacnhan: false,
      idBillXacNhan: null,
      huy: false,
      idBillHuy: null,
      totalPay: 0,
      customerPay: 0,
      codeBillPay: '',
      paymentMethod: '',
      refundPay : 0,


    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalCount / this.pageSize);
    },
    displayedItems() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.items.slice(start, end);
    },
    formatPriceInput() {
      const value = this.totalCustomerEnter.replace(/\D/g, '')
      this.totalCustomerEnter = parseInt(value)
      this.totalCustomer = this.totalCustomerEnter
      this.totalCustomerEnter = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    },
  },
  mounted() {
    this.loadItems();
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    // this.$store.commit('currentPage', 1);
    this.isTabChanged = true;
    next();
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
    findByIdDetailBill(id) {
      router.push({
        name: "detail-bill", params: {
          id: id
        }
      });
    },
    inhoadon(id) {
      const apiUrl = "http://localhost:8000/api/v1/bill/export/" + id;
      window.open(apiUrl)
    },
    confirmModal(id) {
      this.customerMoney = true;
      this.billId = id;
    },
    huyModal(id, total, customer, code, paymentMethod) {
      this.huy = true;
      this.totalPay = total
      this.customerPay = customer
      this.billId = id
      this.codeBillPay = code
      this.paymentMethod = paymentMethod
    },
    dialogXacNhan(id, total, customer, code, paymentMethod, refundPay) {
      this.xacnhan = true;
      this.totalPay = total
      this.customerPay = customer
      this.billId = id
      this.codeBillPay = code
      this.paymentMethod = paymentMethod
      this.refundPay = refundPay
    },

    updateDetailBill(id) {
      this.disabled = false;
    },
    getPay(amount, totalPay, customerPay) {
      Axios.get('find-pay?code=' + this.codeBillPay).then(res => {
        if (res.data.infor_response.code == 200) {
          if (totalPay == customerPay) {
            this.vnp_TransactionType = "02"
          } 
          if(this.paymentMethod == 'MONEY'){
            this.vnp_TransactionType = "02"
          }
          else {
            this.vnp_TransactionType = "03"
          }
          const vnp_TransactionNo = res.data.data.transactionNo
          const vnp_TxnRef = res.data.data.codeBill
          const payDate = res.data.data.payDate

          Axios.post('vnpay/refund-vnpay?vnp_TransactionType=' + this.vnp_TransactionType
            + '&vnp_Amount=' + amount + '&vnp_TxnRef=' + vnp_TxnRef + '&vnp_TransactionNo=' + vnp_TransactionNo +
            '&vnp_CreateBy=' + userName + '&vnp_TransactionDate=' + payDate, '').then(response => {
              if(response.data.paymentUrl == '00'){
                this.updateBill(this.billId,amount)
                toast.success('Đã hoàn tiền thành công cho hoá đơn' + vnp_TxnRef)
              }
              
            }).catch(error => {
              console.error(error);
            });

        }
      });
    },
    updateBill(id,customerPay) {
      Axios.post('v1/bill/update-refund?id='+ id +"&refund="+ customerPay, "")
    },

    updateStatus(id, status) {

      if (status == 'HUY') {
        this.huy = false
        if (this.customerPay > 0 && this.customerPay) {
          this.getPay(this.customerPay, this.totalPay, this.customerPay)
          id = this.billId
        }

      } if (status == 'XAC_NHAN') {
        if(this.customerPay  + this.refundPay > this.totalPay){
          const amount = parseFloat(this.customerPay - this.totalPay) 
          this.getPay(amount, this.totalPay, this.customerPay)
        }
        this.xacnhan = false
        id = this.billId
      }

      const apiUrl = "http://localhost:8000/api/v1/bill/" + id;
      axios
        .post(apiUrl, status, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        })
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
            this.loadItems();
            // this.items = response.data.data.data;
            // this.totalCount = response.data.data.totalRecords;
            // this.items.map((item) => {
            //   item.createDate = TodayDateV3(new Date(item.createDate));
            //   return item;
            // });
          }
        })
        .catch((error) => {
        });
    },
    //validate

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
    async loadItems() {
      let statusReq = await check(Axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: '/pages/login' });
        return;
      }
      const apiUrl = "v1/bill/status";
      if (this.tabPaneActiveKey === 1) {
        this.status = ''
      }
      else if (this.tabPaneActiveKey === 2) {
        this.status = 'CHO_XAC_NHAN'
      }
      else if (this.tabPaneActiveKey === 3) {
        this.status = 'XAC_NHAN'
      }
      else if (this.tabPaneActiveKey === 4) {
        this.status = 'DANG_VAN_CHUYEN'
      }
      else if (this.tabPaneActiveKey === 5) {
        this.status = 'DA_GIAO'
      }
      else if (this.tabPaneActiveKey === 6) {
        this.status = 'HUY'
      }
      else if (this.tabPaneActiveKey === 7) {
        this.status = 'TRA_HANG'
      }
      else if (this.tabPaneActiveKey === 8) {
        this.status = 'DA_TAO_DON'
      }
       else {
        this.status = 'HUY_GHN'
      }
      const params = {
        page: this.currentPage,
        size: this.pageSize,
        status: this.status,
        to: TodayDateV5(this.to),
        from: TodayDateV4(this.from),
        search: this.search,
        phone: this.searchPhone

      };
      if (this.isTabChanged == true) {
        this.currentPage = 1;
        this.isTabChanged = false;
      }
      Axios
        .get(apiUrl, {
          params
        })
        .then((response) => {
          if ((response.data.infor_response.code === 200)) {
            this.items = response.data.data.data;
            this.totalCount = response.data.data.totalRecords;
            this.totalPages = response.data.data.totalPages;
            this.beginIndex = response.data.data.beginIndex;
            let items = response.data.data.data.map(item => {
              item.createDate = TodayDateV3(new Date(item.createDate));
              return item;
            });
            this.showAlert = false;
            this.showTable = true;
          }
          if (response.data.infor_response.code === 404) {
            this.showAlert = true;
            this.showTable = false;
          }
        })
        .catch((error) => {
          this.showAlert = true;
          this.showTable = false;
        });
    },
    clearInput() {
      this.from = null;
      this.search = null;
      this.to = ''
      this.from = ''
      this.loadItems()
    },

    detail(id) {
      Axios.get("v1/bill/" + id)
        .then((response) => {
          if ((response.data.infor_response = 200)) {
            this.detailBill = response.data.data;
            this.detailBillResponses = this.detailBill.detailBillResponses;
            this.detailBillResponses.map((item) => {
              this.weight += item.weight;
            });
            this.idBill = this.detailBill.id;
            this.dateTime = TodayDateV6(new Date(this.detailBill.createDate));
          }
        })
        .catch((error) => { });
    },
    goToPage(page) {
      if (page >= 1 && page <= this.pageCount) {
        this.currentPage = page;
        this.loadItems();
      }
    },
    onPageSizeChange(event) {
      const pageSize = event.target.value;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.loadItems();
    },
    onCgangeStatus(event) {
      const status = event.target.value;
      this.status = status;
      this.loadItems();
    },
    onContext(ctx) {
      this.context = ctx;
    },
    sortTable(column) {
      if (this.sortKey === column) {
        this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
      }
      else {
        this.sortKey = column;
        this.sortDir = "asc";
      }
      this.items.sort((a, b) => {
        let modifier = 1;
        if (this.sortDir === "desc")
          modifier = -1;
        if (a[this.sortKey] < b[this.sortKey])
          return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey])
          return 1 * modifier;
        return 0;
      });
    },
    onChangeStatusTranspost(event) {
      const status = event.target.value;
      this.required_note = status;
    },
    detailTransponst(id) {
      this.xlDemo = true;
      axios
        .get("http://localhost:8000/api/v1/bill/" + id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        })
        .then((response) => {
          if ((response.data.infor_response = 200)) {
            this.detailBill = response.data.data;
            this.detailBillResponses = this.detailBill.detailBillResponses;
            for (let index = 0; index < this.detailBillResponses.length; index++) {
              this.weight += this.detailBillResponses[index].weight
            }

            if (this.detailBill.customerMoney === 0) {
              this.cod_amount = this.detailBill.total
            } else {
              this.cod_amount = 0
            }
            this.idBill = this.detailBill.id;
            this.address = this.detailBill.address;
            this.billCode = this.detailBill.codeBill;
            this.dateTime = TodayDateV3(new Date(this.detailBill.createDate));

          }
        })
        .catch((error) => { });
    },

    createTransport() {

      this.validatHeight()
      this.validatLenght()
      this.validatWeight()
      this.validatWidth()
      if (this.heightError || this.weightError || this.lenghtError || this.widthError) {
        return;
      }

      const addressArray = this.address.split(",");
      this.city = addressArray[addressArray.length - 1].trim();
      this.district = addressArray[addressArray.length - 2].trim();
      this.ward = addressArray[addressArray.length - 3].trim();
      this.items = this.detailBill.detailBillResponses;
      const data = {
        to_name: this.fullName,
        to_phone: this.phoneNumber,
        to_address: this.address,
        to_ward_name: this.ward,
        to_district_name: this.district,
        to_province_name: this.city,
        fullName: this.fullName,
        address: this.fullAddress,
        phoneNumber: this.phoneNumber,
        length: parseFloat(this.lenght),
        width: parseFloat(this.width),
        height: parseFloat(this.height),
        service_type_id: 2,
        payment_type_id: 1,
        required_note: "CHOXEMHANGKHONGTHU",
        content: this.content,
        cod_amount: this.cod_amount,
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
            this.saveDellivery(this.idBill, response.data.data.order_code);
            this.updateStatus(this.idBill, 'DA_TAO_DON');
            this.transpost = false
            this.loadItems();

          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    findIdGHN(code) {
      const data = {
        order_code: code.toString()
      };
      axios
        .post("https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail", data, {
          headers: {
            token: "c157a694-916b-11ed-9dc6-f64f768dbc22",
          },
        }).then((response) => {
          response.data.order_code;
          if (response.data.code = 200) {
            this.statusCodeGHN = response.data.data.status;
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
      const apiUrl = "http://localhost:8000/api/v1/bill/save-delivery";
      axios
        .post(apiUrl, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        })
        .then((response) => {
          if ((response.data.infor_response.code = 200)) {
            this.items = response.data.data.data;
          }
        })
        .catch((error) => {
        });
    },
    findDellivery(idBill) {
      const apiUrl = "http://localhost:8000/api/v1/bill/find-delivery/" + idBill;
      axios
        .get(apiUrl, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        })
        .then((response) => {
          console.log(response.data.infor_response.code + " dòng 627");
          if ((response.data.infor_response.code = 200)) {
            this.delivery = response.data.data.deliveryId;
            this.findIdGHN(this.delivery);
          }
        })
        .catch((error) => {
        });
    },



    billOfLadingDetails(id) {
      axios
        .get("http://localhost:8000/api/v1/bill/" + id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        })
        .then((response) => {
          if ((response.data.infor_response = 200)) {
            this.detailBill = response.data.data;
            this.detailBillResponses = this.detailBill.detailBillResponses;
            this.detailBillResponses.map((item) => {
              this.weight += item.weight;
            });
            this.idBill = this.detailBill.id;
            this.address = this.detailBill.address;
            this.billCode = this.detailBill.codeBill;
            this.dateTime = TodayDateV3(new Date(this.detailBill.createDate));
            this.fullName = this.detailBill.fullName;
            this.phoneNumber = this.detailBill.phoneNumber;
            this.findDellivery(this.idBill);
          }
        })
        .catch((error) => { });
    },
  },
  watch: {
    tabPaneActiveKey: function () {
      if (this.tabPaneActiveKey === 1) {
        this.status = ''
        this.currentPage = 1
      }
      else if (this.tabPaneActiveKey === 2) {
        this.status = 'CHO_XAC_NHAN'
        this.currentPage = 1
      }
      else if (this.tabPaneActiveKey === 3) {
        this.status = 'XAC_NHAN'
        this.currentPage = 1
      }
      else if (this.tabPaneActiveKey === 4) {
        this.status = 'DANG_VAN_CHUYEN'
        this.currentPage = 1
      }
      else if (this.tabPaneActiveKey === 5) {
        this.status = 'DA_GIAO'
        this.currentPage = 1
      }
      else if (this.tabPaneActiveKey === 6) {
        this.status = 'HUY'
        this.currentPage = 1
      }
      else if (this.tabPaneActiveKey === 7) {
        this.status = 'TRA_HANG'
        this.currentPage = 1
      }
      else if (this.tabPaneActiveKey === 8) {
        this.status = 'DA_TAO_DON'
        this.currentPage = 1
      }
       else {
        this.status = 'HUY_GHN'
        this.currentPage = 1
      }
      this.loadItems();
    }

  },

};
</script>
