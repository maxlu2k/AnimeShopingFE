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
  <div class="container-fluid my-5 bg-white" style="padding-top: 100px">
    <div class="container">
      <p style="margin-bottom: 40px;"> Bạn đang có {{ count }} sản phẩm trang giỏ hàng</p>
      <div class="row">
        <div class="col-8 mb-5">
          <div class="border border-1 mb-3"></div>
          <div class="mb-3" v-for="(item, index) in cart" :key="index">
            <div class="row ">
              <div class="col-2">
                <div class="col-sm-9 p-0">
                  <img :src="'http://localhost:8000/api/products/show?url=' + item.url
                    " alt="" class="img-fluid rounded" />
                </div>

              </div>
              <div class="col-8 mb-3">
                <div class="row mb-2">
                  <h6 class="card-text">{{ item.productName }}</h6>
                </div>
                <div class="col-sm-9 p-0">
                  <div class="input-group quantity" style="width: 120px">
                    <div class="input-group-btn">
                      <button class="btn btn-minus border border-1" @click="decrement(index)">
                        <i class="fa fa-minus"></i>
                      </button>
                    </div>
                    <input type="text " class="form-control text-center" :value="item.amount" disabled />
                    <div class="input-group-btn">
                      <button class="btn btn-plus border border-1" @click="increment(index)">
                        <i class="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  {{ formatPrice(item.priceSales) }} VND
                </div>
              </div>
              <div class="col-2">
                <button class="btn btn-lg" @click="deleteCart(item.id, item.productId)">
                  <i class="bi bi-trash"></i>
                </button>
              </div>

              <div class="row">
                <div class="col-6">
                  <div class="col-sm-9 p-0" style="color: red; font-weight: bold">
                    Thành tiền:
                  </div>
                </div>
                <div class="col-3">
                </div>
                <div class="col-3 mb-3" style="color: red; font-weight: bold">
                  {{ formatPrice(item.priceSales * item.amount) }} VND
                </div>
              </div>
            </div>
            <div class="border border-1"></div>
          </div>

          <div v-if="cart.length <= 0">
            <span>Không có sản phẩm nào trong giỏ hàng</span>
          </div>
        </div>
        <div class="col-4 bg-white border border-1 h-50">
          <h5 class="section-title position-relative text-uppercase mb-3 my-3">
            <span class="pr-3">Thông tin đơn hàng</span>
          </h5>
          <div class="bg-white p-30 mb-5">
            <div class="border-bottom pb-2">
              <div class="d-flex justify-content-between mb-3">
                <h6>Tổng tiền</h6>
                <h6>{{ formatPrice(cart.totalPrice) }}</h6>
              </div>
            </div>
            <div class="pt-2">
              <div class="d-flex justify-content-between mt-2 border-bottom" style="
                                              font-size: 10px;
                                              font-family: Arial, Helvetica, sans-serif;">
                <h6>
                  Phí vận chuyển nằm ở trang thanh toán bạn cũng có thể nhập mã
                  giảm giá ở trang thanh toán
                </h6>
              </div>
              <router-link to="/checkout" v-if="cart.length != 0" class="btn btn-danger my-3">
                Thanh toán
              </router-link>
              <router-link to="/home" v-if="cart.length == 0" class="btn btn-danger my-3">
                Thanh toán
              </router-link>

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
import Cookies from "js-cookie";
import router from '@/router'
const userName = Cookies.get("_user");

export default {
  data() {
    return {
      discount: 0,
      total: 0,
      count: 0,
      cart: [],
      detailCart: [],
    };
  },

  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },

    increment(index) {
      if (this.cart[index].amount <= this.cart[index].amountProduct && this.cart[index].amount < 10) {
        this.cart[index].amount++;
        this.updateCart(this.cart[index].id, this.cart[index].amount);
        const cartCookie = Cookies.get('cart');
        if (cartCookie) {
          Cookies.set('cart', JSON.stringify(this.cart));
          this.cart.totalPrice = 0;
          for (let index = 0; index < this.cart.length; index++) {
            this.cart.totalPrice +=
              this.cart[index].priceSales * this.cart[index].amount;
          }
        }
      }

    },

    decrement(index) {
      if (this.cart[index].amount <= this.cart[index].amountProduct && this.cart[index].amount > 1) {
        this.cart[index].amount--;
        this.updateCart(this.cart[index].id, this.cart[index].amount);
        const cartCookie = Cookies.get('cart');
        if (cartCookie) {
          Cookies.set('cart', JSON.stringify(this.cart));
          this.cart.totalPrice = 0;
          for (let index = 0; index < this.cart.length; index++) {
            this.cart.totalPrice +=
              this.cart[index].priceSales * this.cart[index].amount;
          }
        }
      }
    },
    countCart() {
      const userName = Cookies.get('_user')
      if (userName) {
        cart_service.count(userName).then(response => {
          this.count = response.data
          if (isNaN(this.count)) {
            this.count = 0
          }
        });

      } else {
        const cart = JSON.parse(Cookies.get("cart") || "[]");
        let count = cart.length;
        this.count = count
      }
    },
    payment() {
      if (!userName) {
        router.push('/login')
      } else {
        router.push('/checkout')
      }

    },
    loadCart() {
      const cartCookie = Cookies.get("cart");
      if (cartCookie) {
        this.cart = JSON.parse(cartCookie);
        this.cart.totalPrice = 0;
        for (let index = 0; index < this.cart.length; index++) {
          if (typeof this.cart[index].priceSales === 'number' && typeof this.cart[index].amount === 'number') {
            this.cart.totalPrice += this.cart[index].priceSales * this.cart[index].amount;
          }
        }
      } else {
        
        cart_service
          .getCart(userName)
          .then((response) => {
            if (response.data.infor_response.code === 200) {
              this.cart = response.data.data.items;
              this.cart.totalPrice = 0;
              for (let index = 0; index < this.cart.length; index++) {
                this.cart.totalPrice +=
                  this.cart[index].priceSales * this.cart[index].amount;
              }
            } else {
              this.cart = []
              this.cart.totalPrice = 0;
            }

          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    deleteCart(id, productId) {
      const cartCookie = Cookies.get("cart");
      if (cartCookie) {
        this.cart = JSON.parse(cartCookie);
        const index = this.cart.findIndex(item => item.productId === productId);
        if (index !== -1) {
          this.cart.splice(index, 1);
          Cookies.set('cart', JSON.stringify(this.cart));
          this.cart.totalPrice = 0;
          for (let index = 0; index < this.cart.length; index++) {
            this.cart.totalPrice +=
              this.cart[index].priceSales * this.cart[index].amount;
          }
        }
      }
      else {
        cart_service.deleteCart(id)
          .then(() => {
            this.loadCart();
            this.countCart();
          })
          .catch((error) => {
            console.log(error);
          });

      }
    },

    updateCart(id, amount) {
      if (userName) {
        cart_service
          .updateCart(id, amount)
          .then((response) => {
            this.detailCart = response.data;
            this.cart.totalPrice = 0;
            for (let index = 0; index < this.cart.length; index++) {
              this.cart.totalPrice +=
                this.cart[index].priceSales * this.cart[index].amount;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

    },
  },
  mounted() {
    this.loadCart();
    this.countCart();

    const cartCookie = Cookies.get('cart');
    if (cartCookie) {
      this.cart = JSON.parse(cartCookie);
      this.cart.totalPrice = 0;
      for (let index = 0; index < this.cart.length; index++) {
        this.cart.totalPrice +=
          this.cart[index].priceSales * this.cart[index].amount;
      }
    }
  },

};
</script>
