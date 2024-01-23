<template>
    <div id="information">
      <h4 style="color: black; margin-top: 2%">
        {{ product?.figure }}
      </h4>
      <div class="row">
        <div class="col-4">
          <h4 style="color: #ff0000; margin-top: 2%">
            {{ product?.priceSales }}
          </h4>
          <del style="font-size: small;" v-if="product?.priceSales!=product?.priceNew">{{ product?.priceNew}}</del>
        </div>
      </div>
  
      <hr />
      <div class="hr"></div>
      <div class="row" style="height: 50px">
        <div class="col-3">
          <el-input-number
            v-model="num"
            @change="handleChange"
            :min="1"
            :max="product?.quantity"
            size="large"
            style="width: 110%; height: 50px; font-weight: 600"
          ></el-input-number>
        </div>
        <button class="col-4 text button-effect" 
         @click="addToCard(product?.id, product?.productDiscounts, product?.priceSales, product?.typeOrder, product?.figure, product?.listImage[0].url), product?.quantity" >
         THÊM VÀO GIỎ HÀNG</button>
      </div>
      <h5 v-if="product?.quantity<=10" style="color: #dea554; margin-top: 2%">Đã bán gần hết</h5>
      <br />
      <div class="product-deliverly" style="margin-left: -5%">
        <ul class="infoList-deliverly">
          <li class="row">
            <span class="col-1">
              <img
                class="ls-is-cached img1"
                data-src="//theme.hstatic.net/1000160337/1000885200/14/product_deliverly_1_ico.png?v=299"
                src="//theme.hstatic.net/1000160337/1000885200/14/product_deliverly_1_ico.png?v=299"
                alt="Sản phẩm chính hãng từ Nhật Bản.
   Trước khi bạn đặt mua: vui lòng check lại giá hiện tại với admin, vì khả năng giá đã thay đổi so với lần cập nhật gần nhất, hoặc hết hàng, hết suất order. Do giới hạn số lượng, figure Nhật sẽ hiếm dần theo thời gian, dẫn tới giá tăng."
              />
            </span>
            <span class="col-11">
              <i class="fa fa-check"></i>
              <strong> Sản phẩm chính hãng từ Nhật Bản.</strong><br />
              <i class="fa fa-check"></i>
              <strong> Trước khi bạn đặt mua:</strong> vui lòng check lại giá hiện
              tại với admin, vì khả năng giá đã thay đổi so với lần cập nhật gần
              nhất, hoặc hết hàng, hết suất order. Do giới hạn số lượng, figure
              Nhật sẽ hiếm dần theo thời gian, dẫn tới giá tăng.
            </span>
          </li>
          <br />
          
          <br />
          <li class="row">
            <span class="col-1">
              <img
                class="ls-is-cached img3"
                data-src="//theme.hstatic.net/1000160337/1000885200/14/product_deliverly_3_ico.png?v=299"
                src="//theme.hstatic.net/1000160337/1000885200/14/product_deliverly_3_ico.png?v=299"
              />
            </span>
            <span class="col-11">
              <i class="fa fa-check"></i> Giao hàng tận nơi<br />
              <i class="fa fa-check"></i> Vui lòng kiểm tra sản phẩm khi nhận bưu
              kiện
            </span>
          </li>
        </ul>
      </div>
      <div class="hr" />
      <div class="" style="margin-left: 4%">
        <div class="panel-group opened">
          <div @click="showInfor" class="panel-title" id="select1">
            <h4 class="strong" id="info-title">Thông tin sản phẩm</h4>
            <div class="icon-plus">
              <i class="bi bi-dash-lg"></i>
            </div>
            <div id="plus1" class="icon-plus closs">
              <i class="bi bi-plus-lg"></i>
            </div>
          </div>
          <div id="info1" class="panel-description open">
            <div class="description-productdetail">
              <p class="item-detailsection-title">
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif">
                      <strong
                        ><span style="font-size: 11pt"
                          ><span style="font-family: 'Arial', sans-serif"
                            ></span
                          ></span
                        ></strong
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p class="item-detailsection-title">
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333">{{
                            product?.figure
                            
                    }}</span></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt" ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Nhân vật: {{ product?.figure }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Series: {{ product?.seriesID }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Hãng sản xuất: {{ product?.manufacturerName }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Kích thước: {{ product?.height }}cm</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Số Lượng: {{ product?.quantity }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Danh Mục: {{ product?.categoryName }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Nhà Sản Xuất: {{ product?.manufacturerName }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Bộ Phim: {{ product?.seriesName }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Mô Tả: {{ product?.description }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Độ Tuổi Yêu Cầu: {{ product?.recommendedAge }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Sản phẩm đi kèm: {{ product?.accessoriesIncluded }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Giới tính: {{ product?.gender }}</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            >Phát hành: 12/2022</span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
            </div>
          </div>
        </div>
        <div class="hr2"></div>
        <div class="panel-group opened">
          <div @click="showInfor2" class="panel-title" id="select1">
            <h4 class="strong" id="info-title2">
              CÁCH SỞ HỮU FIGURE DỄ DÀNG VÀ LIÊN TỤC
            </h4>
            <div class="icon-plus">
              <i class="bi bi-dash-lg"></i>
            </div>
            <div id="plus2" class="icon-plus open">
              <i class="bi bi-plus-lg"></i>
            </div>
          </div>
          <div id="info2" class="panel-description closs">
            <div class="description-productdetail">
              <p class="item-detailsection-title">
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif">
                      <strong
                        ><span style="font-size: 11pt"
                          ><span style="font-family: 'Arial', sans-serif"
                            ><span style="color: #339966"
                              >Champion, một cách siêu đơn giản giúp bạn lụm $
                              hàng ngày</span
                            ></span
                          ></span
                        ></strong
                      ></span
                    ></span
                  ></span
                >
              </p>
              <p>
                <span style="font-size: 12pt"
                  ><span
                    ><span style="font-family: 'Times New Roman', serif"
                      ><span style="font-size: 11pt"
                        ><span style="font-family: 'Arial', sans-serif"
                          ><span style="color: #333333"
                            ><strong>Hướng dẫn tại đây</strong></span
                          ></span
                        ></span
                      ></span
                    ></span
                  ></span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useToast } from 'vue-toastification';
  import Cookies from 'js-cookie';
  const toast = useToast();
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
      name: {
        type: String,
        default: null,
      },
    },
    data() {
      return {
        radio: "1",
        num: 1,
        id: null,
        
      };
    },
    created() {
      // this.id = this.$route.params.id;
      // console.log(this.id);
      // this.getDetail(this.id);
      console.log(this.$props)
    },
    methods: {
      // getDetail(id) {
      //   // const x = await ProductService.getDetail(id)
      //   // this.product = x.data.result;
      //   // console.log(x);
      //   ProductService.getOneProduct(id).then((response) => {
      //     this.product = response.data;
      //     console.log(this.product);
      //   });
      // },
  
      addToCard(id, productDiscounts, priceSale, typeOrder, productName, url, quantity) {
        const userName = Cookies.get('_user')
       
        if (userName) {
            const data = {
              userName: userName,
              amount: this.num,
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
  
      showInfor() {
        if (document.getElementById("plus1").classList.contains("open")) {
          document.getElementById("plus1").classList.remove("open");
          document.getElementById("plus1").classList.add("closs");
        } else {
          document.getElementById("plus1").classList.add("open");
          document.getElementById("plus1").classList.remove("closs");
        }
  
        if (document.getElementById("info1").classList.contains("open")) {
          document.getElementById("info1").classList.remove("open");
          document.getElementById("info1").classList.add("closs");
        } else {
          document.getElementById("info1").classList.add("open");
          document.getElementById("info1").classList.remove("closs");
        }
        if (document.getElementById("info-title").classList.contains("def")) {
          document.getElementById("info-title").classList.remove("def");
          document.getElementById("info-title").classList.add("strong");
        } else {
          document.getElementById("info-title").classList.add("def");
          document.getElementById("info-title").classList.remove("strong");
        }
      },
      showInfor2() {
        if (document.getElementById("plus2").classList.contains("open")) {
          document.getElementById("plus2").classList.remove("open");
          document.getElementById("plus2").classList.add("closs");
        } else {
          document.getElementById("plus2").classList.add("open");
          document.getElementById("plus2").classList.remove("closs");
        }
  
        if (document.getElementById("info2").classList.contains("open")) {
          document.getElementById("info2").classList.remove("open");
          document.getElementById("info2").classList.add("closs");
        } else {
          document.getElementById("info2").classList.add("open");
          document.getElementById("info2").classList.remove("closs");
        }
        if (document.getElementById("info-title2").classList.contains("def")) {
          document.getElementById("info-title2").classList.remove("def");
          document.getElementById("info-title2").classList.add("strong");
        } else {
          document.getElementById("info-title2").classList.add("def");
          document.getElementById("info-title2").classList.remove("strong");
        }
      },
    },
  };
  </script>
  
  <style>
  #information {
    width: 100%;
    height: 610px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  #information::-webkit-scrollbar {
    display: none;
  }
  .img1 {
    margin-top: 120%;
    margin-left: -10%;
  }
  .img2 {
    margin-top: 120%;
    margin-left: -10%;
  }
  .img3 {
    margin-top: 106%;
    margin-left: -10%;
  }
  .product-deliverly .infoList-deliverly li {
    list-style: none;
  }
  .message {
    width: 30px;
    margin-right: 5%;
  }
  .open {
    display: block;
  }
  .closs {
    display: none;
  }
  .panel-title {
    position: relative;
  }
  .icon-plus {
    position: absolute;
    /* z-index: 2; */
    top: 0px;
    left: 90%;
  }
  .hr {
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
  }
  .hr2 {
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-right: auto;
    border-style: inset;
    border-width: 1px;
    margin-left: -5%;
  }
  .def {
    font-weight: 400;
  }
  .strong {
    font-weight: 300;
  }
  .button-effect {
    position: relative;
    display: inline-block;
    z-index: 1;
    overflow: hidden;
    padding: 12px 28px;
    line-height: normal;
    margin-left: 5%;
    color: #fff;
    padding-top: 2%;
    background-color: #fff;
    border: 1px solid #ed1c24;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    letter-spacing: 1px;
    outline: none;
    text-transform: uppercase;
    -webkit-transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
      border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transition: color 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
      border 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
  .button-effect:before {
    content: "";
    display: block;
    background-color: #ed1c24;
    position: absolute;
    left: -2px;
    top: 0;
    right: -2px;
    bottom: 0;
    z-index: -1;
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
    -webkit-transform-origin: left center;
    transform-origin: left center;
    -webkit-transition: -webkit-transform 0.45s
      cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transition: -webkit-transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transition: transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    transition: transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86),
      -webkit-transform 0.45s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  }
  .button-effect:hover {
    border-color: #ed1c24;
    color: #ed1c24;
  }
  .button-effect:hover:before {
    -webkit-transform-origin: right center;
    transform-origin: right center;
    -webkit-transform: scale(0, 1);
    transform: scale(0, 1);
  }
  </style>
  