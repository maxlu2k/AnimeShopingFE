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

  <div class="container-fluid my-3 bg-white">
    <div class="row py-4 border-bottom border-1">
      <span class="text-center fs-2 fw-bold" style="color: blueviolet">Tài khoản của bạn</span>
    </div>
    <div class="container">
      <div class="row px-xl-5 py-5 border-0 rounded">
        <div class="col-3 me-3 border border-1 rounded mx-0 px-0 mt-0" style="height: 350px">
          <div class="card-head border-1 border-bottom bg-gray-200">
            <div class="row ms-5 mt-0">
              <button class="btn text-center mt-3" style="
                  width: 80px;
                  height: 80px;
                  background-color: blueviolet;
                  border-radius: 100%;
                ">
                <span class="text-center" style="color: white">Tài khoản</span>
              </button>
            </div>

            <div class="row ms-3 mb-3">
              <span style="color: rgb(red, green, blue); font-size: 15px">{{
                userName
              }}</span>
              <span style="font-size: 14px"></span>
            </div>
          </div>
          <div class="card-body bg-white" style="color: black">
            <div class="d-flex">
              <div class="nav flex-column nav-pills me-3 bg-white align-items-baseline" id="v-pills-tab" role="tablist"
                aria-orientation="vertical">
                <a class="" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="submit"
                  role="tab" aria-controls="v-pills-home" aria-selected="true">Danh sách đơn hàng</a>
                <!-- <a class="" id="v-pills-infor-tab" data-bs-toggle="pill" data-bs-target="#v-pills-infor" type="submit"
                  role="tab" aria-controls="v-pills-infor" aria-selected="true">Thông tin tài khoản</a> -->
              </div>
            </div>
          </div>
        </div>

        <div class="col-8 tab-content ml-5" id="v-pills-tabContent">
          <div class="row tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
            <div class="row g-3 justify-content-between"></div>
            <table class="table bg-white border border-1 my-5 rounded" style="
                font-family: Arial, Helvetica, sans-serif;
                color: black;
                border-radius: rounded;
              ">
              <thead>
                <tr class="table-primary text-center" style="font-size: 14px">
                  <th class="border">STT</th>
                  <th class="border" @click="sortTable('codeBill')">
                    Mã <i class="bi bi-arrow-down-up"></i>
                  </th>
                  <th class="border" @click="sortTable('createDate')">
                    Ngày đặt<i class="bi bi-arrow-down-up"></i>
                  </th>
                  <th class="border" @click="sortTable('total')">
                    Tổng tiền<i class="bi bi-arrow-down-up"></i>
                  </th>
                  <th class="border" @click="sortTable('customerMoney')">
                    Tổng thanh toán<i class="bi bi-arrow-down-up"></i>
                  </th>

                  <th class="border" @click="sortTable('status')">
                    Trạng thái<i class="bi bi-arrow-down-up"></i>
                  </th>
                  <th class="border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(bill, index) in items" :key="index" style="font-size: 14px">
                  <th class="border" scope="row">{{ index + 1 }}</th>
                  <td class="border">{{ bill.codeBill }}</td>
                  <td class="border">{{ bill.createDate }}</td>
                  <td class="border">
                    {{ formatPrice(bill.total + bill.transportFee) }}
                  </td>
                  <td class="border">{{ formatPrice(bill.customerMoney) }}</td>
                  <td class="border">{{ bill.statusName }}</td>
                  <td class="border" style="justify-content: center; text-align: center">
                    <a type="submit" v-if="bill.paymentMethod == 'CARD' &&
                      bill.customerMoney == 0 &&
                      bill.status == 'CHO_XAC_NHAN'
                      " @click="paymentVNPay(bill.total, bill.codeBill)" data-toggle="tooltip"
                      title="Thanh toán qua VNPAY">
                      <i class="bi bi-credit-card-2-front-fill"></i>
                    </a>
                    <a type="submit" v-if="bill.paymentMethod == 'MONEY' &&
                      bill.total > 20000000 &&
                      bill.customerMoney == 0 &&
                      bill.status == 'CHO_XAC_NHAN'
                      " @click="
    paymentVNPay(
      bill.total * 0.5 - bill.customerMoney,
      bill.codeBill
    )
    " data-toggle="tooltip" title="Thanh toán qua VNPAY">
                      <i class="bi bi-credit-card-2-front-fill"></i>
                    </a>
                    <a type="submit" v-if="bill.paymentMethod == 'MONEY' &&
                      bill.total <= 20000000 &&
                      bill.customerMoney < 0 &&
                      bill.status == 'CHO_XAC_NHAN'
                      " @click="
    paymentVNPay(
      bill.total * 0.3 - bill.customerMoney,
      bill.codeBill
    )
    " data-toggle="tooltip" title="Thanh toán qua VNPAY">
                      <i class="bi bi-credit-card-2-front-fill"></i>
                    </a>
                    <a type="submit" class="mr-2" @click="detail(bill.id)" data-toggle="tooltip" title="Chi tiết">
                      <i class="bi bi-pencil-square"></i>
                    </a>
                    <a class="mx-2 btn" v-if="bill.status == 'CHO_XAC_NHAN' ||
                      bill.status == 'HOA_DON_CHO'
                      " data-toggle="tooltip" title="Huỷ" @click="
    huyModal(
      bill.id,
      bill.total + bill.transportFee,
      bill.customerMoney - bill.refund,
      bill.codeBill,
      bill.paymentMethod
    )
    ">Huỷ
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row my-5">
              <div class="col-2" style="width: 150px">
                <select class="form-select border border-1" v-model="pageSize" @change="onPageSizeChange">
                  <option value="5">5</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div class="col-8">
                <nav>
                  <ul class="pagination">
                    <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                      <a class="page-link" href="#" @click="goToPage(currentPage - 1)"><i
                          class="bi bi-chevron-bar-left"></i></a>
                    </li>
                    <li class="page-item" v-for="page in pageCount" :key="page" :class="{ active: page === currentPage }">
                      <a class="page-link" href="#" @click="goToPage(page)">{{
                        page
                      }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage >= pageCount }">
                      <a class="page-link" href="#" @click="goToPage(currentPage + 1)"><i
                          class="bi bi-chevron-bar-right"></i></a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          <div class="row tab-pane fade" id="v-pills-infor" role="tabpanel" aria-labelledby="v-pills-infor-tab">
            <div class="row g-3 justify-content-between">hihi</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DefaultFooter />

  <!-- Xem chi tiết -->
  <template>
    <v-dialog v-model="xlDemo" width="900" persistent>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Chi tiết hoá đơn
        </v-card-title>

        <v-card-text>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-12">
                <div class="bg-white border border-top-1 p-4 mb-3">
                  <div class="mb-4">
                    <div class="row">
                      <h6 class="text-uppercase font-weight-bold col-6">
                        Thông tin đặt hàng
                      </h6>
                      <div class="col-4"></div>
                      <button class="btn btn-success col-2" v-if="this.detailBill.status == 'HUY'"
                        @click="salesCancel(detailBill.id)">
                        Mua lại
                      </button>
                    </div>

                    <div class="mb-3">
                      <div class="row">
                        <p>
                          Mã đơn hàng: {{ billCode }}, đặt lúc : {{ dateTime }}
                        </p>
                        <p>Địa chỉ: {{ address }}</p>
                        <p>
                          Tổng tiền: {{ formatPrice(this.detailBill.total) }}
                        </p>
                        <p>
                          Phí vận chuyển:
                          {{ formatPrice(this.detailBill.transportFee) }}
                        </p>
                        <p>
                          Hoàn tiền: {{ formatPrice(this.detailBill.refund) }}
                        </p>
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
                          <tr v-for="(
                              detail, i
                            ) in detailBill.detailBillResponses" :key="i" class="rounded border border-1">
                            <th scope="row">{{ i + 1 }}</th>
                            <td style="max-width: 250px">
                              {{ detail.productName }}
                            </td>
                            <td>{{ detail.amount }}</td>
                            <td>{{ formatPrice(detail.priceSale) }}</td>
                            <td>
                              {{
                                formatPrice(detail.priceSale * detail.amount)
                              }}
                            </td>
                            <td>
                              <RouterLink v-if="detail.rate == false && status == 'DA_GIAO'
                                  " :to="{ path: '/create-rate/' + detail.id }" class="btn btn-primary" rel="tooltip"
                                title="Designed and Coded by Creative Tim" data-placement="bottom"
                                @click="xlDemo = false">
                                Đánh Giá
                              </RouterLink>
                              <a style="color: red" class="text-wrap" v-if="detail.rate == true">
                                Sản phẩm này đã được đánh giá
                              </a>
                              <a style="color: red" class="text-wrap" v-if="status != 'DA_GIAO'">Không được đánh giá</a>
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
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="xlDemo = false"> Đóng </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

  <!--Confirm Huỷ  -->

  <template>
    <div class="text-center">
      <v-dialog v-model="huy" width="500">
        <v-card>
          <v-card-text> Bạn có muốn huỷ đơn hàng này ? </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="huy = false"> Đóng </v-btn>
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
import Cookies from "js-cookie";
import Axios from "@/router/axios";
import { useToast } from "vue-toastification";
const userName = Cookies.get("_user");
const userNameGest = Cookies.get("gest_user");
const accessToken = Cookies.get("access_token");
import cart_service from "@/services/cartService";
const toast = useToast();
import router from "@/router";

export default {
  data() {
    return {
      items: [],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      search: "",
      status: "",
      from: "",
      to: "",
      context: null,
      detailBill: [],
      sortKey: "",
      sortDir: "asc",
      address: "",
      billCode: "",
      dateTime: "",
      fullName: "",
      phoneNumber: "",
      beginIndex: null,
      totalCustomer: 0,
      xlDemo: false,
      huy: false,
      totalPay: 0,
      customerPay: 0,
      codeBillPay: "",
      paymentMethod: "",
      refundPay: 0,
      billId: "",
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
  },
  mounted() {
    this.loadItems();
    this.paymentSuccess();
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
    huyModal(id, total, customer, code, paymentMethod) {
      this.huy = true;
      this.totalPay = total;
      this.customerPay = customer;
      this.billId = id;
      this.codeBillPay = code;
      this.paymentMethod = paymentMethod;
    },
    updateStatus(id, status) {
      console.log(this.customerPay)
      this.huy = false;
      this.getPay(this.customerPay);
      id = this.billId;
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
            if (status == "HUY") {
              toast.success("Huỷ đơn hàng thành công");
              this.huy = false;
            }
            this.loadItems();
            this.items = response.data.data.data;
            this.canel = false;
            this.transpost = true;
          }
        })
        .catch((error) => { });
    },
    salesCancel(id) {
      this.addListToCard();
      setTimeout(() => {
        router.push({
          name: "shopping-cart",
          params: {
            id: id,
          },
        });
      }, 1000);
    },
    getPay(amount) {
      axios
        .get("http://localhost:8000/api/find-pay?code=" + this.codeBillPay)
        .then((res) => {
          if (res.data.infor_response.code == 200) {
            this.vnp_TransactionType = "02";
            const vnp_TransactionNo = res.data.data.transactionNo;
            const vnp_TxnRef = res.data.data.codeBill;
            const payDate = res.data.data.payDate;

            axios
              .post(
                "http://localhost:8000/api/vnpay/refund-vnpay?vnp_TransactionType=" +
                this.vnp_TransactionType +
                "&vnp_Amount=" +
                amount +
                "&vnp_TxnRef=" +
                vnp_TxnRef +
                "&vnp_TransactionNo=" +
                vnp_TransactionNo +
                "&vnp_CreateBy=" +
                userName +
                "&vnp_TransactionDate=" +
                payDate,
                ""
              )
              .then((response) => {
                this.updateBill(this.billId, amount);
                toast.success(
                  "Đã hoàn tiền thành công cho hoá đơn" + vnp_TxnRef
                );
              })
              .catch((error) => {
                console.error(error);
              });
          }
        });
    },
    updateBill(id, customerPay) {
      axios.post(
        "http://localhost:8000/api/v1/bill/update-refund?id=" +
        id +
        "&refund=" +
        customerPay,
        ""
      );
    },
    paymentSuccess() {
      const params = new URLSearchParams(window.location.search);
      const vnp_ResponseCode = params.get("vnp_ResponseCode");
      const vnp_TransactionNo = params.get("vnp_TransactionNo");
      const vnp_Amount = params.get("vnp_Amount");
      const vnp_TxnRef = params.get("vnp_TxnRef");
      const vnp_PayDate = params.get("vnp_PayDate");
      // Xử lý các tham số trả về
      if (vnp_ResponseCode === "00") {
        console.log(
          `Thanh toán thành công, mã giao dịch: ${vnp_TransactionNo}, mã tham chiếu: ${vnp_TxnRef}`
        );
        const apiUrl =
          "http://localhost:8000/api/v1/bill/xac_nhan/" +
          vnp_TxnRef +
          "?customer=" +
          vnp_Amount / 100;
        Axios.post(apiUrl, "CHO_XAC_NHAN", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        })
          .then((response) => {
            if (response.data.infor_response.code == 200) {
              this.totalCustomer = "response.data.data.customerMoney";
              const dataPay = {
                codeBill: vnp_TxnRef,
                transactionNo: vnp_TransactionNo,
                payDate: vnp_PayDate,
              };
              cart_service.createPay(dataPay);
              this.loadItems();
            } else {
            }
          })
          .catch((error) => { });
      } else {
        console.log(`Thanh toán thất bại, mã lỗi: ${vnp_ResponseCode}`);
      }
    },

    paymentVNPay(amount, vnp_TxnRef) {
      console.log(amount);
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
        })
        .catch((error) => { });
    },
    async loadItems() {
      var user = null;
      if (userNameGest && !userName) {
        user = userNameGest;
      }
      if (!userNameGest && userName) {
        user = userName;
      }
      if (userNameGest && userName) {
        user = userName;
      }

      const apiUrl = "v1/bill/username";
      const params = {
        page: this.currentPage,
        size: this.pageSize,
        status: this.status,
        to: TodayDateV2(this.to),
        from: TodayDateV2(this.from),
        search: user,
      };
      await Axios.get(apiUrl, {
        params,
      })
        .then((response) => {
          if (response.data.infor_response.code === 200) {
            this.beginIndex = response.data.data.beginIndex;
            this.items = response.data.data.data;
            this.totalCount = response.data.data.totalRecords;
            this.items.map((item) => {
              item.createDate = TodayDateV3(new Date(item.createDate));
              return item;
            });
          }
        })
        .catch((error) => { });
    },
    // detail(id) {
    //   this.$router.push({ name: 'detailOrderInfor', params: { id: id } })
    // },
    detail(id) {
      this.xlDemo = true;
      axios
        .get("http://localhost:8000/api/v1/bill/" + id)
        .then((response) => {
          if ((response.data.infor_response = 200)) {
            this.detailBill = response.data.data;
            this.address = this.detailBill.address;
            this.billCode = this.detailBill.codeBill;
            this.status = this.detailBill.status;
            this.dateTime = TodayDateV3(new Date(this.detailBill.createDate));
            this.fullName = this.detailBill.fullName;
            this.phoneNumber = this.detailBill.phoneNumber;
          }
        })
        .catch((error) => { });
    },
    addListToCard() {
      this.detailBill.detailBillResponses.map((item) => {
        axios
          .get(
            "http://localhost:8000/api/products/detail_product?id=" +
            item.productId
          )
          .then((res) => {
            this.addToCard(
              res.data.data.id,
              res.data.data.productDiscounts,
              res.data.data.priceSales,
              0,
              res.data.data.figure,
              res.data.data.listImage[0].url,
              res.data.data.quantity,
              res.data.data.height,
              res.data.data.weight
            );
            cart_service.getCart(userName);
          })
          .catch((error) => { });
      });
    },
    addToCard(
      id,
      productDiscounts,
      priceSale,
      typeOrder,
      productName,
      url,
      quantity,
      height,
      weight
    ) {
      const toast = useToast();

      if (userName) {
        const data = {
          userName: userName,
          amount: 1,
          productId: id,
          productDiscounts: productDiscounts,
          priceSale: priceSale,
          typeOrder: typeOrder,
          totalPrice: 0,
        };
        cart_service
          .addToCart(data)
          .then((response) => {
            if (response.data.infor_response.code == 200) {
              this.items = response.data.data;
              toast.success("Thêm vào giỏ hàng thành công");
            } else {
              toast.warning("Thêm vào giỏ hàng thất bại 11");
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } else {
        if (quantity <= 0) {
          toast.warning("Thêm vào giỏ hàng thất bại, sản phẩm đã hết hàng");
        } else {
          const cart = JSON.parse(Cookies.get("cart") || "[]");
          const index = cart.findIndex((i) => i.productId === id);
          toast.success("Thêm vào giỏ hàng thành công");
          if (index > -1) {
            cart[index].amount++;
          } else {
            cart.push({
              productId: id,
              url: url,
              productName: productName,
              amount: 1,
              productDiscounts: productDiscounts,
              priceSales: priceSale,
              typeOrder: typeOrder,
              totalPrice: 0,
              height: height,
              weight: weight,
              amountProduct: quantity,
            });
          }
          Cookies.set("cart", JSON.stringify(cart), { expires: 3 });
        }
      }
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
      } else {
        this.sortKey = column;
        this.sortDir = "asc";
      }
      this.items.sort((a, b) => {
        let modifier = 1;
        if (this.sortDir === "desc") modifier = -1;
        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
        return 0;
      });
    },
  },
};
</script>
