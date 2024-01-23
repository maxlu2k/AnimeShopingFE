
<template>
  <div>
      <div>
        <navbar-default />
      </div>
    <div>
      <!-- <img src="http://localhost:8000/api/products/show?url=FB_IMG_1597322739785 - Copy123.jpg" alt="nunu"> -->
    </div>
    <div class="mb-4">
      <!-- <img v-bind:src="'/src/assets/img/' + type + '.jpg'" /> -->
    </div>
    <div class="filter container mb-5 my-4">
      <div class="row my-4">
        <div class="col-md-9 col-sm-12 col-xs-12">
          <h1 class="title mb-5" style="margin: 0; font-size: 30px">
            Tìm kiếm
          </h1>
          <p>Kết quả tìm kiếm cho: "{{ searchKey }}"</p>
        </div>

      </div>
    </div>
    <div class="collection-listproduct" id="collection-body">
      <div class="container">
        <div class="wraplist-collection">
          <div class="row listProduct-row listProduct-resize listProduct-filter">
            <div class="col-md-3 col-sm-4 col-xs-6 product-loop" v-for="(product, index) in listProduct" :key="index">
              <div class="product-inner">
                <div class="proloop-image">
                  <div class="product--image">
                    <div class="prod-img first-image">
                      <picture>
                        <source media="(max-width: 480px)"
                          :src="'http://localhost:8000/api/products/show?url=' + product.listImage[0].url" alt="nunu" />
                        <source media="(min-width: 481px)"
                          :src="'http://localhost:8000/api/products/show?url=' + product.listImage[0].url" alt="nunu" />
                        <img class="img-loop lazyloaded"
                          :src="'http://localhost:8000/api/products/show?url=' + product.listImage[0].url" alt="nunu"
                          style="width: 100%; height: 410px; object-fit: cover;" />
                      </picture>
                    </div>
                    <div class="prod-img second-image hovered-img">
                      <picture>
                        <source media="(max-width: 480px)"
                          :src="'http://localhost:8000/api/products/show?url=' + product.listImage[1].url" alt="nunu" />
                        <source media="(min-width: 481px)"
                          :src="'http://localhost:8000/api/products/show?url=' + product.listImage[1].url" alt="nunu" />
                        <img class="img-loop lazyloaded"
                          :src="'http://localhost:8000/api/products/show?url=' + product.listImage[1].url"
                          alt=' One and Only " SLAM DUNK " Hanamichi Sakuragi '
                          style="    width: 100%; height: 410px; object-fit: cover;" />
                      </picture>

                    </div>
                  </div>
                  <a href="http://127.0.0.1:5173/products/detail" class="proloop-link quickview-product"
                    data-handle="http://127.0.0.1:5173/products/detail" title="One and Only "></a>
                </div>

                <div class="proloop-detail">
                  <h3>
                    <RouterLink :to="{ path: '/products/detail/' + product.id }" class="title title-detail" rel="tooltip"
                      title="Designed and Coded by Creative Tim" data-placement="bottom">
                      {{ product.figure }}
                    </RouterLink>
                  </h3>
                  <p class="proloop--price">
                  <div v-if="product.priceSales == 0">
                    <span class="price fw-bold title">{{
                      product.price
                    }}</span>
                  </div>
                  <div>
                    <span class="price fw-bold title">
                      {{ product.priceSales }}
                      <del style="font-size: small;" v-if="product.priceSales != product.priceNew">{{product.priceNew}}</del>
                    </span>
                  </div>
                  </p>
                </div>

                <div class="proloop-actions">
                  <div class="proloop-actions__inner">
                    <div class="actions-primary">
                      <button type="submit" class="button btn-proloop-cart add-to-cart" title="Thêm vào giỏ"
                        @click="addToCard(product.id, product.productDiscounts, product.priceSales, product.typeOrder, product.figure, product.listImage[0].url), product.quantity">
                        <span class="btnico me-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -13 456.75885 456">
                            <path
                              d="m150.355469 322.332031c-30.046875 0-54.402344 24.355469-54.402344 54.402344 0 30.042969 24.355469 54.398437 54.402344 54.398437 30.042969 0 54.398437-24.355468 54.398437-54.398437-.03125-30.03125-24.367187-54.371094-54.398437-54.402344zm0 88.800781c-19 0-34.402344-15.402343-34.402344-34.398437 0-19 15.402344-34.402344 34.402344-34.402344 18.996093 0 34.398437 15.402344 34.398437 34.402344 0 18.996094-15.402344 34.398437-34.398437 34.398437zm0 0">
                            </path>
                            <path
                              d="m446.855469 94.035156h-353.101563l-7.199218-40.300781c-4.4375-24.808594-23.882813-44.214844-48.699219-48.601563l-26.101563-4.597656c-5.441406-.96875-10.632812 2.660156-11.601562 8.097656-.964844 5.441407 2.660156 10.632813 8.101562 11.601563l26.199219 4.597656c16.53125 2.929688 29.472656 15.871094 32.402344 32.402344l35.398437 199.699219c4.179688 23.894531 24.941406 41.324218 49.199219 41.300781h210c22.0625.066406 41.546875-14.375 47.902344-35.5l47-155.800781c.871093-3.039063.320312-6.3125-1.5-8.898438-1.902344-2.503906-4.859375-3.980468-8-4zm-56.601563 162.796875c-3.773437 12.6875-15.464844 21.367188-28.699218 21.300781h-210c-14.566407.039063-27.035157-10.441406-29.5-24.800781l-24.699219-139.398437h336.097656zm0 0">
                            </path>
                            <path
                              d="m360.355469 322.332031c-30.046875 0-54.402344 24.355469-54.402344 54.402344 0 30.042969 24.355469 54.398437 54.402344 54.398437 30.042969 0 54.398437-24.355468 54.398437-54.398437-.03125-30.03125-24.367187-54.371094-54.398437-54.402344zm0 88.800781c-19 0-34.402344-15.402343-34.402344-34.398437 0-19 15.402344-34.402344 34.402344-34.402344 18.996093 0 34.398437 15.402344 34.398437 34.402344 0 18.996094-15.402344 34.398437-34.398437 34.398437zm0 0">
                            </path>
                          </svg>
                        </span>
                        <span>Thêm vào giỏ</span>
                      </button>
                    </div>

                    <div class="actions-secondary">
                      <button type="submit" class="button btn-proloop-checkout"
                       title="Mua ngay">
                        <span class="btnico me-2">
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                            y="0px" viewBox="0 0 321.2 321.2" style="enable-background: new 0 0 321.2 321.2"
                            xml:space="preserve">
                            <g>
                              <g>
                                <path
                                  d="M306.4,313.2l-24-223.6c-0.4-3.6-3.6-6.4-7.2-6.4h-44.4V69.6c0-38.4-31.2-69.6-69.6-69.6c-38.4,0-69.6,31.2-69.6,69.6 v13.6H46c-3.6,0-6.8,2.8-7.2,6.4l-24,223.6c-0.4,2,0.4,4,1.6,5.6c1.2,1.6,3.2,2.4,5.2,2.4h278c2,0,4-0.8,5.2-2.4 C306,317.2,306.8,315.2,306.4,313.2z M223.6,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4 C217.2,126.4,220,123.6,223.6,123.6z M106,69.6c0-30.4,24.8-55.2,55.2-55.2c30.4,0,55.2,24.8,55.2,55.2v13.6H106V69.6z M98.8,123.6c3.6,0,6.4,2.8,6.4,6.4c0,3.6-2.8,6.4-6.4,6.4c-3.6,0-6.4-2.8-6.4-6.4C92.4,126.4,95.2,123.6,98.8,123.6z M30,306.4 L52.4,97.2h39.2v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2 V97.2h110.4v13.2c-8,2.8-13.6,10.4-13.6,19.2c0,11.2,9.2,20.4,20.4,20.4c11.2,0,20.4-9.2,20.4-20.4c0-8.8-5.6-16.4-13.6-19.2V97.2 H270l22.4,209.2H30z">
                                </path>
                              </g>
                            </g>
                          </svg>
                        </span>
                        <span>Mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center;">
      <el-pagination style="margin-left: 39%; margin-top: 3%;" background layout="prev, pager, next" :page-count="count"
        :page-size="size" :page-sizes="sizes" @current-change="handlePageChange" hide-on-single-page>
      </el-pagination>
    </div>

    <div class="row">
      <div class="d-flex flex-column w-100 text-center mt-5">
        <h3>Follow Shop Anime Figure on Instagram</h3>
        <p>@ShopAnime.vn</p>
        <div class="row">
          <div class="col-md-2 p-0">
            <img src="https://theme.hstatic.net/1000160337/1000885200/14/gallery_item_1_img.jpg?v=298" alt=""
              class="w-100 h-auto" />
          </div>
          <div class="col-md-2 p-0">
            <img src="https://theme.hstatic.net/1000160337/1000885200/14/gallery_item_2_img.jpg?v=298" alt=""
              class="w-100 h-auto" />
          </div>
          <div class="col-md-2 p-0">
            <img src="https://theme.hstatic.net/1000160337/1000885200/14/gallery_item_3_img.jpg?v=298" alt=""
              class="w-100 h-auto" />
          </div>
          <div class="col-md-2 p-0">
            <img src="https://theme.hstatic.net/1000160337/1000885200/14/gallery_item_4_img.jpg?v=298" alt=""
              class="w-100 h-auto" />
          </div>
          <div class="col-md-2 p-0">
            <img src="https://theme.hstatic.net/1000160337/1000885200/14/gallery_item_5_img.jpg?v=298" alt=""
              class="w-100 h-auto" />
          </div>
          <div class="col-md-2 p-0">
            <img src="https://theme.hstatic.net/1000160337/1000885200/14/gallery_item_6_img.jpg?v=298" alt=""
              class="w-100 h-auto" />
          </div>
        </div>
      </div>
    </div>
    <!-- <FooterDefault /> -->
  </div>
</template>

<script>
import NavbarDefault from "@/views/User/Navbar.vue";
import HeaderDefault from "@/views/User/Header.vue";
import cart_service from "@/services/cartService";
import Cookies from 'js-cookie';
import qs from 'qs';
import { useToast } from 'vue-toastification';
import axios from "axios";
export default {

  name: "collection",
  components: { NavbarDefault, HeaderDefault },
  data() {
    return {
      type: null,
      sort: 10,
      listProduct: null,
      count: 0,
      size: 12, //36
      sizes: [2, 4, 6],
      page: 1,

      category: null,
      nameCategory: null,
      manufacturer: null,
      priceRange: null,
      ratio: null,

      manufacturers: [],
      categoryIds: [],
      name: '',
      available: true,
      manufacturerIds: null,
      selectedPrices: [],
      sortField: null,
      sortOrder: null,
      searchKey : '',

      productId: '',
      amount: '',
      productDiscounts: '',
      priceSale: 0,
      typeOrder: 0,
      items: [],

      ratioIds: null,
      idCategory: 0
    };
  },
  watch: {
    $route(to, from) {
      this.type = this.$route.params.type;
      this.idCategory = this.$route.params.id;
      this.nameCategory = this.$route;
    },
  },
  mounted(){
    this.getAll()
  },
  methods: {
    addToCard(id, productDiscounts, priceSale, typeOrder, productName, url, quantity) {
      const toast = useToast();
      const userName = Cookies.get('_user')

      if (userName) {
          const data = {
            userName: userName,
            amount: 1,
            productId: id,
            productDiscounts: productDiscounts,
            priceSale: priceSale,
            typeOrder: typeOrder,
            totalPrice: 0,
          }
          cart_service.addToCart(data).then((response) => {
            if (response.data.infor_response.code == 200) {
              this.items = response.data.data
              toast.success("Thêm vào giỏ hàng thành công");
            }
            else {
              toast.warning("Thêm vào giỏ hàng thất bại 11");
            }
          }).catch((err) => {
            toast.error(err.message);
          })
    
      }
      else {
        if (quantity <= 0) {
          toast.warning("Thêm vào giỏ hàng thất bại, sản phẩm đã hết hàng");
        }
        else {
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
            });
          }
          Cookies.set("cart", JSON.stringify(cart), { expires: 3 });
        }

      }

    },

    getAll() {
      const urlParams = new URLSearchParams(window.location.search);
      this.searchKey = urlParams.get('key');
      const params = {
        page: this.page,
        size: this.size,
        name: this.searchKey,
        available: 1,
      };
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });

      const queryString = qs.stringify(params, { indices: false });
      const url = `http://localhost:8000/api/products/getAll?${queryString}`;
      axios.get(url).then((res) => {
        if (res.data.infor_response.code == 200) {
          this.listProduct = res.data.data.data;
          this.count = res.data.data.totalPages;
          console.log(this.count)
        } if (res.data.infor_response.code == 404) {
          this.listProduct = [];
        }
      })
        .catch((error) => {
          console.log(error);
        });
    },
    handlePageChange(value) {
        this.page = value;
        this.getAll();
      },
  },

};
</script>

<style scoped>
@import "@/assets/css/collection.css";
</style>
