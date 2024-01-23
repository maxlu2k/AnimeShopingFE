<template>
  <div class="main" style="background-color: white">
    <h2>Product Ratings</h2>
    <div class="star">
      <div>
        <div>
          <div class="rate">
            <h1>{{ start }}</h1>
            <span style="margin-left: 20px; margin-top: 8px"> out of 5</span>
          </div>

          <div class="rating">
            <ul class="listttt">
              <li
                :key="star"
                v-for="star in maxStars"
                :class="{ active: star <= stars }"
                class="img-star"
              >
                <icon scale="2" :name="star <= stars ? 'star' : 'star-o'" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="button-start">
        <button
          class="button-select"
          v-auto-style:border="''"
          id="0"
          v-on:click="getByStar(0)"
        >
          All <span class="toltalstar">({{ totalstars.all }})</span>
        </button>
        <button
          class="button-select"
          v-auto-style:border="''"
          id="5"
          v-on:click="getByStar(5)"
        >
          5 Star <span class="toltalstar">({{ totalstars.five }})</span>
        </button>
        <button
          class="button-select"
          v-auto-style:border="''"
          id="4"
          v-on:click="getByStar(4)"
        >
          4 Star <span class="toltalstar">({{ totalstars.four }})</span>
        </button>
        <button
          class="button-select"
          v-auto-style:border="''"
          id="3"
          v-on:click="getByStar(3)"
        >
          3 Star <span class="toltalstar">({{ totalstars.three }})</span>
        </button>
        <button
          class="button-select"
          v-auto-style:border="''"
          id="2"
          v-on:click="getByStar(2)"
        >
          2 Star <span class="toltalstar">({{ totalstars.two }})</span>
        </button>
        <button
          class="button-select"
          v-auto-style:border="''"
          id="1"
          v-on:click="getByStar(1)"
        >
          1 Star <span class="toltalstar">({{ totalstars.one }})</span>
        </button>
      </div>
    </div>

    <section class="reviews" v-if="this.ListRatesCurrent.length > 0">
      <div class="">
        <div class="row d-flex">
          <div class="col-md-12 col-lg-10">
            <div class="text-dark">
              <h3>Review this product</h3>
              <div class="p-4" v-for="r in paginatedItems" :key="r.id">
                <div v-if="r">
                  <h5 class="mb-3" style="font-size: medium">
                    Ngày Đánh Giá : {{ r.createDate }}
                  </h5>

                  <div class="flex-start">
                    <div class="avatar">
                      <img
                        class="rounded-circle shadow-1-strong me-3"
                        src="https://www.invert.vn/media/uploads/uploads/2022/12/06172901-11.jpeg"
                        width="60"
                        height="60"
                      />
                    </div>

                    <div class="rate-container" style="margin: 0.5rem">
                      <h6 class="fw-bold mb-1">{{ r.createBy }}</h6>
                      <div class="rate-parent">
                        <div class="rate-item rate-basis_size">
                          <div class="d-flex align-items-center mb-3">
                            <div class="rateIcon row col-12">
                              <ul
                                class="iconStar row col-12"
                                style="
                                  margin-top: 0px;
                                  margin-left: 0.1rem;
                                  column-gap: 0.5rem;
                                "
                              >
                                <li
                                  v-for="star in maxStars"
                                  :key="star"
                                  :class="{ active: star <= r.rate }"
                                  class="icon-img-star defaultSet"
                                >
                                  <icon
                                    class="startchild scaleDefault"
                                    scale="2"
                                    :name="star <= r.rate ? 'star' : 'star-o'"
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div class="d-flex align-items-center mb-3">
                            <p class="mb-0">
                              chất liệu :
                              <span class="">{{
                                r.material == true ? "Tốt" : "Không Tốt"
                              }}</span>
                            </p>
                          </div>

                          <div class="d-flex align-items-center mb-3">
                            <p class="mb-0">
                              Màu sắc :
                              <span class="">{{
                                r.color == true ? "giống" : "Không giống"
                              }}</span>
                            </p>
                          </div>

                          <div class="d-flex align-items-center mb-3">
                            <p class="mb-0">
                              Phụ kiện :
                              <span class="">{{
                                r.lackOfAccessories == true ? "Đủ" : "Không Đủ"
                              }}</span>
                            </p>
                          </div>

                          <div class="d-flex align-items-center mb-3">
                            <p class="mb-0">
                              Mô tả :
                              <span class="">{{
                                r.wrongProduct == true ? "Đúng" : "Không Đúng"
                              }}</span>
                            </p>
                          </div>
                        </div>
                        <div class="rate-item item-right">
                          <div
                            class="img-parent"
                            v-for="(item, index) in r.imgs"
                            :key="index"
                          >
                            <img
                              v-if="isImage(item.name)"
                              v-on:click="showelement('abc' + r.id, index)"
                              class="img-item"
                              :src="
                                'http://127.0.0.1:8000/api/rate/show?url=' +
                                item.url
                              "
                              alt="avatar"
                              width="150"
                              height="150"
                            />
                            <video
                              class="img-item"
                              v-else
                              controls
                              width="150"
                              height="150"
                              v-on:click="showelement('abc' + r.id, index)"
                            >
                              <source
                                :src="
                                  'http://127.0.0.1:8000/api/rate/show?url=' +
                                  item.url
                                "
                              />
                            </video>
                          </div>
                        </div>
                      </div>
                      <div class="comment">
                        <p style="font-size: 15px; width: 100%">
                          Bình Luận : {{ r.comment }}
                        </p>
                        <div
                          style=""
                          class="stardust-dropdown stardust-dropdown--open"
                        >
                          <div
                            :id="'edit' + r.id"
                            class="stardust-dropdown__item-body"
                            v-auto-style:opacity="0"
                          >
                            <div
                              class="shopee-product-rating__report-menu-dropdown"
                            >
                              <button
                                v-if="r.createBy == username && r.rightToEdit == false "
                                class="btn btn-danger"
                                v-on:click="updateRate(r.id)"
                              >
                                sửa
                              </button>
                              <button
                                v-if="r.createBy != username"
                                v-on:click="showConfirm(r.id)"
                                style="margin-left: 2px"
                                class="btn btn-danger"
                              >
                                báo cáo
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          class="stardust-dropdown__item-header"
                          v-on:click="toggleDropdown('edit' + r.id)"
                        >
                          <div>
                            <svg
                              width="4px"
                              height="16px"
                              viewBox="0 0 4 16"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <defs></defs>
                              <g
                                stroke="none"
                                stroke-width="1"
                                fill-rule="evenodd"
                              >
                                <g
                                  transform="translate(-1301.000000, -550.000000)"
                                  fill="#CCCCCC"
                                >
                                  <g
                                    transform="translate(155.000000, 92.000000)"
                                  >
                                    <g
                                      transform="translate(40.000000, 184.000000)"
                                    >
                                      <g
                                        transform="translate(0.000000, 161.000000)"
                                      >
                                        <g>
                                          <g
                                            transform="translate(50.000000, 2.000000)"
                                          >
                                            <path
                                              d="M1058,122.2 C1056.895,122.2 1056,123.096 1056,124.2 C1056,125.306 1056.895,126.202 1058,126.202 C1059.104,126.202 1060,125.306 1060,124.2 C1060,123.096 1059.104,122.2 1058,122.2 M1058,116.6 C1056.895,116.6 1056,117.496 1056,118.6 C1056,119.706 1056.895,120.602 1058,120.602 C1059.104,120.602 1060,119.706 1060,118.6 C1060,117.496 1059.104,116.6 1058,116.6 M1058,111 C1056.895,111 1056,111.896 1056,113 C1056,114.106 1056.895,115.002 1058,115.002 C1059.104,115.002 1060,114.106 1060,113 C1060,111.896 1059.104,111 1058,111"
                                            ></path>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-auto-style:display="'none'"
                    :id="'abc' + r.id"
                    class="carousel slide"
                    data-bs-ride="carousel"
                    data-bs-interval="100000"
                  >
                    <div class="carousel-inner">
                      <div
                        class="carousel-item"
                        v-for="(item, index) in r.imgs"
                        :key="index"
                        :class="{ active: index === activeIndex }"
                      >
                        <img
                          v-if="isImage(item.name)"
                          :src="
                            'http://127.0.0.1:8000/api/rate/show?url=' +
                            item.url
                          "
                          class="d-block w-100"
                          :alt="item.name"
                        />
                        <video v-else controls width="500" height="500">
                          <source
                            :src="
                              'http://127.0.0.1:8000/api/rate/show?url=' +
                              item.url
                            "
                          />
                        </video>
                      </div>
                    </div>
                    <button
                      class="carousel-control-prev"
                      type="button"
                      :data-bs-target="'#abc' + r.id"
                      data-bs-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                      class="carousel-control-next"
                      type="button"
                      :data-bs-target="'#abc' + r.id"
                      data-bs-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div>

                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav aria-label=" navigation " v-if="this.ListRatesCurrent.length > 0">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage <= 1 }">
            <a
              class="page-link page-next"
              style="width: 80px"
              @click="currentPage == 1 ? 1 : currentPage--"
              >Previous</a
            >
          </li>

          <li
            style="width: 50px"
            class="page-item"
            v-for="item in displayedPages"
            :key="item"
          >
            <a
              class="page-link"
              :class="{ 'bg-secondary text-light': currentPage == item }"
              @click="currentPage = item"
              >{{ item }}</a
            >
          </li>

          <li class="page-item" :class="{ disabled: currentPage >= pageCount }">
            <a
              class="page-link page-next"
              style="width: 80px"
              @click="currentPage == pageCount ? pageCount : currentPage++"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </section>
    <section class="reviews" v-if="this.ListRatesCurrent.length == 0">
      <div class="zero-rate">Không có đánh giá nào !</div>
    </section>
  </div>
</template>
    <script>
import Axios from "@/services/RateService";
import "vue-awesome/icons/star";
import "vue-awesome/icons/star-o";
import Icon from "vue-awesome/components/Icon.vue";

// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import check from "@/commons/jwt";
import { useToast } from "vue-toastification";
export default {
  components: { Icon },
  props: {
    grade: {
      type: Number,
      required: true,
    },
    maxStars: {
      type: Number,
      default: 5,
    },
    hasCounter: {
      type: Boolean,
      default: true,
    },
  },
  directives: {
    "auto-style": {
      mounted(el, binding) {
        el.style[binding.arg] = binding.value;
      },
    },
  },

  data() {
    return {
      listRates: [],
      username: null,
      isOpen: false,
      ListRatesCurrent: [],
      currentPage: 1,
      itemsPerPage: 3,
      prodcutID: 0,
      stars: 0,
      view: true,
      start: 0,
      items: ["a", "b"],
      color: "",
      activeIndex: 0,
      totalstars: {
        all: 0,
        five: 0,
        four: 0,
        three: 0,
        two: 0,
        one: 0,
      },
    };
  },

  methods: {
    fetchData(event) {
      console.log(event);
      this.currentPage = 1;
    },
    showConfirm(id) {
      if (confirm("Bạn có chắc chắn muốn báo xáo đánh giá này ?")) {
        this.report(id);
      }
    },
    report(id) {
      var report1 = {};
      report1.id = 1;
      report1.totalReport = 1;
      report1.rateID = id;
      check(Axios);
      Axios.post("/report/add", report1)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .then((res) => {
          var report = {};
          report.id = null;
          report.reportRateId = res.id;
          Axios.post("/report/add-detail", report)
            .then((res) => {
              const toast = useToast();
              if (res.data.infor_response?.message == "Ban da report roi!") {
                toast.error("Bạn Đã Báo cáo rồi !");
              } else {
                console.log(res.data);

                toast.success("Báo Cáo thành công !");
                return res.data;
              }
            })
            .catch((err) => {
              const toast = useToast();
              toast.error("Loi !");
            });
        });
    },
    updateRate(id) {
      window.location.href = `/update-rate/` + id;
    },
    toggleDropdown(id) {
      check(Axios);
      Axios.get("/rate/getUsername")
        .then((res) => {
          this.username = res.data;
        })
        .catch((err) => {
          console.log(err);
          this.username = null;
        });
      var element = document.getElementById(id);
      var value = element.style.opacity == 0 ? "opacity:1 " : "opacity:0 ";
      element.setAttribute("style", value);
      if (element.classList.contains("stardust-dropdown__item-body--open")) {
        element.classList.remove("stardust-dropdown__item-body--open");
      } else {
        element.classList.add("stardust-dropdown__item-body--open");
      }
    },
    getRateByProductId() {
      Axios.get("rate/get-by-productid?product-id=" + this.prodcutID).then(
        (response) => {
          const data = [];
          response.data.forEach((element) => {
            element.createDate = this.formatDate(element.createDate);
            data.push(element);
          });
          console.log(data);
          this.listRates = data;
          this.ListRatesCurrent = data;
          var arr = data;
          const totalstar = {
            all: 0,
            five: 0,
            four: 0,
            three: 0,
            two: 0,
            one: 0,
          };
          arr.forEach((element) => {
            totalstar.all++;
            if (element.rate == 5) {
              totalstar.five++;
            }
            if (element.rate == 4) {
              totalstar.four++;
            }
            if (element.rate == 3) {
              totalstar.three++;
            }
            if (element.rate == 2) {
              totalstar.two++;
            }
            if (element.rate == 1) {
              totalstar.one++;
            }
          });
          this.totalstars = totalstar;
        }
      );
    },
    isImage(file) {
      return (
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png") ||
        file.endsWith(".gif")
      );
    },
    getStart() {
      Axios.get("product-rate/start?id=" + this.prodcutID).then((response) => {
        console.log(response.data);
        this.start = response.data;
        console.log(this.start);

        this.stars = response.data;
      });
    },
    rate(star) {
      if (typeof star === "number" && star <= this.maxStars && star >= 0)
        this.stars = this.stars === star ? star - 1 : star;
    },
    getByStar(start) {
      var arr = this.listRates;
      this.currentPage = 1;
      var arrID = [0, 1, 2, 3, 4, 5];
      arrID.forEach((e) => {
        if (e == start) {
          var element = document.getElementById(start);
          element.setAttribute("style", "border: 2px solid red;");
        } else {
          element = document.getElementById(e);
          element.setAttribute("style", "border:none");
        }
      });
      if (start == 0) {
        this.ListRatesCurrent = this.listRates;
        return;
      }
      var newArr = [];
      arr.forEach((element) => {
        if (element.rate === start) {
          newArr.push(element);
        }
      });
      this.ListRatesCurrent = newArr;
    },
    showelement(id, index) {
      var element = document.getElementById(id);
      var value =
        element.style.display == "none" ? "display: block;" : "display: none;";

      element.setAttribute("style", value);
      if (value === "display: none;") {
      }

      const carouselItems = document.querySelectorAll(
        `#${id} .carousel-inner .carousel-item`
      );

      carouselItems.forEach((item, indexx) => {
        if (indexx === index) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      //   // Thêm class active vào item được chọn
      //  this.activeIndex = index;
    },
    formatDate(date) {
      const dateObj = new Date(date);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false, // sử dụng định dạng 24 giờ
        timeZone: "Asia/Ho_Chi_Minh", // chỉ định múi giờ của Việt Nam
      };
      // sử dụng phương thức toLocaleDateString() để định dạng ngày
      const formattedDate = dateObj.toLocaleDateString("vi-VN", options);
      return formattedDate;
    },
  },
  computed: {
    view: true,
    pageCount() {
      console.log(Math.ceil(this.ListRatesCurrent.length / this.itemsPerPage));
      return Math.ceil(this.ListRatesCurrent.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.ListRatesCurrent.slice(startIndex, endIndex);
    },
    displayedPages() {
      var pages = [];
      var pageStart = this.currentPage - 2;
      if (pageStart < 1) pageStart = 1;
      var pageEnd = pageStart + 4;
      console.log(this.pageCount);
      if (pageEnd > this.pageCount) pageEnd = this.pageCount;
      for (var i = pageStart; i <= pageEnd; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  created: function () {
    this.prodcutID = this.$route.params.id;
    // checkAccount();
    console.log(this.listRates);
    this.getRateByProductId(), this.getStart();
  },
  name: "Listrate",
};
</script>
  <style scoped>
.main {
  background-color: #fffbf8;
  font-size: 30px;
  margin-top: 35px;
  padding: 2%;
}

html:not([dir="rtl"]) .pagination {
  padding-left: 5%;
  /* margin-right: 0px; */
}
.rate h1 {
  font-size: 65px;
}
.rate {
  display: inline-flex;

  justify-content: around;
}
.img-star {
  position: relative;
  top: 20px;
  width: 4%;
  left: 10px;
}
.icon-img-star {
  display: flex;
}
.button-start {
  position: relative;
  bottom: 45px;
  left: 35%;
  font-size: 70%;
}
.star {
  font-style: normal;
  background-color: antiquewhite;
  border-radius: 20px;
  padding: 30px;
  color: red;
  font-size: 50px;
}
.flex-start {
  display: flex;
  width: 80%;
}
.shopee-product-rating__report-menu-dropdown {
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  padding: 0.75rem 1.625rem;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.8);
  text-transform: capitalize;
  white-space: nowrap;
}
.col-lg-10 {
  flex: 0 0 auto;
  width: 100%;
  border-top: none;
  margin-top: 20px;
  font-size: 40%;
}
.comment {
  background-color: bisque;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  display: flex;
}
.card {
  --cui-card-border-width: none;
}
.button-select {
  border: none;
  width: 10%;
  margin-left: 5px;
  border-radius: 5px;
  font-size: 60%;

  background-color: rgb(255, 255, 255);
}

.fw-bold {
  font-size: 25px;
}
.rate-parent {
  display: flex;
  width: 100%;
}
.rate-item {
  flex: 1;
}
.item-right {
  flex: 3;
  justify-content: flex-end;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-wrap: wrap-reverse;
  width: 10%;
  flex-basis: 50px;
  margin-bottom: 10px;
}
.img-item {
  margin-left: 5px;
  height: 130px;
  width: 130px;
  transition: transform 0.2s;
  padding-top: 10px;
}
.img-parent {
  height: 130px;
}
.img-item:hover {
  transform: scale(1.5);
}
.zero-rate {
  padding: 5%;
  color: red;
  font-size: revert;
  font-style: revert;
}
.avatar {
  flex: 0.5;
}
.rate-container {
  flex: 11;
}
.page-next {
  width: 70px;
}
.lightbox div {
  width: 100ww;
  height: 100vh;
  background-color: #000;
  opacity: 0.7;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
.page-item .page-link,
.page-item span {
  border-radius: 50% !important;
  width: 100%;
  color: brown;
}

.lightbox img {
  position: fixed;
  left: 35%;
  height: 60%;
  top: 300px;
  display: none;
}
.toltalstar {
  font-size: 70%;
  color: red;
}
.carosel {
  width: 40%;
  margin-left: 7%;
  margin-top: 1%;
}
.carousel-control-next-icon {
  border: 1px solid #fffbf8;
  background-color: #000;

  color: #000;
  padding: 15%;
}
.carousel-inner {
  margin-left: 9%;
}
.carousel-control-next-icon:hover {
  transform: scale(1.5);
}

.carousel-control-prev-icon {
  border: 1px solid #fffbf8;
  background-color: #000;

  color: #000;
  padding: 15%;
}
.carousel-control-prev-icon:hover {
  transform: scale(1.5);
}
.carousel {
  width: 50% !important;
  margin-left: 15%;
  margin-top: 3%;
}
.rateIcon {
  display: flex;
}

.rate-basis_size {
  flex-basis: 1%;
}
.icon-img-star.defaultSet {
  display: unset;
  width: unset;
  padding: unset;
}
.startchild.scaleDefault {
  width: 20px !important;
  height: 20px !important;
}

.pagination {
  display: flex;
}

.page-item {
  margin: 0 1px;
  padding: 1px;
  cursor: pointer;
}

.page-item.active {
  background-color: #007bff;
  color: #fff;
}

.page-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
  
  <style scoped lang="scss">
$active-color: #f3d23e;

.rating {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 22px;
  color: #a7a8a8;
  position: relative;
  top: 5px;
  width: 4%;
  left: 10px;
}
.listttt {
  margin: 0 0 5px 0;
  padding: 0;
  width: 1000px;
  display: inline-flex;
  justify-content: around;
  list-style-type: none;
  &:hover {
    .star {
      margin-left: 2px;
      color: $active-color;
    }
  }
}

.active {
  color: $active-color;
}
</style>
  