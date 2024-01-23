<script scope>
import Axios from "@/services/RateService";
import "vue-awesome/icons/star";
import "vue-awesome/icons/star-o";
import Icon from "../../../../node_modules/vue-awesome/components/Icon";
import NavbarDefault from "@/views/User/Navbar.vue";
import FooterDefault from "@/views/User/FooterDefault.vue";
import check from '@/commons/jwt';

import { useToast } from "../../../../node_modules/vue-toastification";
export default {
  components: {NavbarDefault, FooterDefault , Icon},
  data() {
    return {
      Product: {
        id: null,
        nameProduct: null,
        productId: null,
        urlProduct: null,
      },
      ratee: {
        stars: 5,
        rateId: null,
        nameUrl: [],
        urlProduct: "",
        category: "",
        nameProduct: "",
        imgs: [],
        material: "true",
        color: "true",
        lackOfAccessories: "true",
        wrongProduct: "true",
        comment: "",
      },
    };
  },
  created: function () {
    var id = this.$route.params.id;
    this.detail(id);
  },
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

  methods: {
    rateProduct(rating) {
      this.product.rating = rating;
    },
    getProductById(id) {
      check(Axios);
      Axios.get("/rate/getById?rate-id=" + id)
        .then((response) => {
          const data = response.data;
          this.ratee.rateId = data.id;
          this.ratee.color = data.color;
          this.ratee.comment = data.comment;
          this.ratee.wrongProduct = data.wrongProduct;
          this.ratee.lackOfAccessories = data.lackOfAccessories;
          this.ratee.material = data.material;
          this.ratee.stars = data.rate;
          this.Product.productId = data.productID;
          data.imgs.forEach((element) => {
            this.ratee.imgs.push(element);
          });
          return data.detailBillID;
        })
        .then((res) => {
          check(Axios);
          Axios.get("v1/bill/detailbill/" + res)
            .then((ressponse) => {
              this.ratee.category = ressponse.data.data.categoty;
              this.ratee.nameProduct = ressponse.data.data.nameProduct;
              this.ratee.urlProduct = ressponse.data.data.urlProduct;
              console.log(this.ratee);
            })
            .catch((err) => {
              const toast = useToast();
              toast.error("Lỗi truy cập !");
              window.location.href = `/`;
            });
        })
        .catch((err) => {
          console.log(err);
          const toast = useToast();
          toast.error("lỗi truy cập !");
          window.location.href = `/`;
        });
    },
    isImage(file) {
      return (
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png") ||
        file.endsWith(".gif")
      );
    },
    handleFileUpload(event) {
      const files = event.target.files;
      const MAX_SIZE = 50 * 1024 * 1024;
      this.ratee.imgs = files;
      const images = [];
      let previewFile = document.querySelector("#preview-img1");
      let newPreviewFile = document.querySelector("#preview-img");
      if (files.length > 0) {
        if (files.length > 6) {
          const toast = useToast();
          toast.error("chọn tối đa 6 file");

          this.ratee.imgs = [];
          event.target.value = null;
        }
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file);
        if (
          !file.type.startsWith("image/") &&
          !file.type.startsWith("video/")
        ) {
          this.ratee.imgs = [];
          event.target.value = null;
          const toast = useToast();
          toast.error("File tải lên không phải là ảnh. Vui lòng chọn lại !");
          return;
        }
        if (file.size > MAX_SIZE) {
          this.ratee.imgs = [];
          event.target.value = null;
          const toast = useToast();
          toast.error(
            "File tải lên có kích thước lớn hơn 50MB. Vui lòng chọn lại !"
          );
          return;
        }

        const url = URL.createObjectURL(file);
        const image = { name: file.name, url, type: file.type };
        images.push(image);
        previewFile.style.display = "none";
        newPreviewFile.style.display = "flex";
      }
      console.log(images);
      this.ratee.nameUrl = images;
    },
    rate(star) {
      if (typeof star === "number" && star <= this.maxStars && star >= 0)
        if (star == 1) {
          this.ratee.stars = 1;
        } else {
          this.ratee.stars = this.ratee.stars === star ? star - 1 : star;
        }
    },
    playVideo() {
      const video = this.$refs.myVideo;
      if (video.paused) {
        video.play();
      }
    },
    showConfirm(){
    if(confirm("Bạn có chắc chắn muốn sửa đánh giá này ?")){
      this.save();
    }
    },
    save() {
      var rate = {};
      rate.rate = this.ratee.stars;
      rate.comment = this.ratee.comment;
      rate.id = this.ratee.rateId;
      if (this.ratee.color == "true") {
        rate.color = true;
      } else {
        rate.color = false;
      }
      if (this.ratee.material == "true") {
        rate.material = true;
      } else {
        rate.material = false;
      }

      if (this.ratee.lackOfAccessories == "true") {
        rate.lackOfAccessories = true;
      } else {
        rate.lackOfAccessories = false;
      }

      if (this.ratee.wrongProduct == "true") {
        rate.wrongProduct = true;
      } else {
        rate.wrongProduct = false;
      }
      check(Axios);
      Axios.put("rate/update", rate)
        .then((response) => {
          return response.data;
        })
        .then((res) => {
          const formData = new FormData();
          var files = this.ratee.imgs;
          for (let i = 0; i < files.length; i++) {
            console.log(files[i]);
            formData.append("files", files[i]);
          }
          check(Axios);
          Axios.post("rate/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((re) => {
              console.log(re.data);
              return { data: re.data, id: res.id };
            })
            .then((response) => {
              var id = response.id;
              var arrUrl = response.data;
              var list = [];
              for (let i = 0; i < this.ratee.imgs.length; i++) {
                var rateImg = {};
                rateImg.rateID = id;
                rateImg.id = null;
                rateImg.url = arrUrl[i];
                rateImg.name = this.ratee.imgs[i].name;
                list.push(rateImg);
              }
              check(Axios);
              Axios.put("rate/update-img", list).then((repos) => {
                console.log(repos.data);
                const toast = useToast();
                toast.success("Update  thành công");
                window.location.href =
                  `/products/detail/` + this.Product.productId;
              });

              console.log(this.ratee);
            });
        });
    },
  },
  created: function () {
    var id = this.$route.params.id;
    this.getProductById(id), console.log(this.ratee);
  },
};
</script>
<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault />
      </div>
    </div>
  </div>
  <Header />
  <div class="card">
    <div class="card-header row title card-set"><h3>Đánh giá Sản Phẩm</h3></div>
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
            class="img-thumbnail"
          />
        </div>
        <div class="col-9">
          <div class="card-title card-text-set">
            Tên Sản Phẩm : {{ ratee.nameProduct }}
          </div>
          <div class="card-text">Danh Mục : {{ ratee.category }}</div>
        </div>
      </div>
      <div class="row mb-3 mt-3 align-items-center">
        <div class="col-3">Chất lượng sản phẩm :</div>
        <div class="col-9">
          <div class="rating d-flex align-items-center">
            <ul class="list-star mr-3">
              <li
                :key="star"
                v-for="star in maxStars"
                :class="{ active: star <= ratee.stars }"
                @click="rate(star)"
                class="sta set-up-stars"
              >
                <icon
                  style="height: 26px; width: 26px"
                  scale="2"
                  :name="star <= ratee.stars ? 'star' : 'star-o'"
                />
              </li>
            </ul>
            <span v-if="hasCounter" class="position-star-text"
              >{{ ratee.stars }} of {{ maxStars }}</span
            >
          </div>
        </div>
      </div>

      <div>
        <div class="form-wrapper">
          <div class="form__review">
            <textarea
              class="form-control row rate ui-text__modifier"
              v-model="ratee.comment"
              aria-label="With textarea"
              placeholder="Hãy để lại phần nhận xét của bạn về sản phẩm nhé ! (200 ký tự)" maxlength="200"
            ></textarea>
          </div>
          <div class="custom-file">
            <div class="img-group">
              <div>
                <div class="imgs" id="preview-img1">
                  <div
                    class="list-video-img"
                    v-for="(img, key) in this.ratee.imgs"
                    :key="key"
                  >
                    <img
                      v-if="isImage(img.name)"
                      :src="
                        'http://127.0.0.1:8000/api/rate/show?url=' + img.url
                      "
                      alt="avatar"
                      width="200"
                      height="200"
                    />
                    <video
                      ref="myVideo"
                      v-else
                      controls
                      width="200"
                      height="200"
                    >
                      <source
                        :src="
                          'http://127.0.0.1:8000/api/rate/show?url=' + img.url
                        "
                        :type="img.type"
                      />
                    </video>
                  </div>
                </div>
                <div class="imgs" id="preview-img">
                  <div
                    class="list-video-img"
                    v-for="(img, key) in this.ratee.nameUrl"
                    :key="key"
                  >
                    <img
                      v-if="isImage(img.name)"
                      :src="img.url"
                      alt="avatar"
                      width="200"
                      height="200"
                    />
                    <video
                      ref="myVideo"
                      v-else
                      controls
                      width="200"
                      height="200"
                    >
                      <source :src="img.url" :type="img.type" />
                    </video>
                  </div>
                </div>
                <div>
                  <div
                    onclick="document.getElementById('customFile').click()"
                    class="d-flex align-items-center wrapper-image"
                  >
                    <img
                      src="@/assets/camera.png"
                      style="width: 24px; height: 24px"
                      alt=""
                    />
                    <div class="file-text">Tải hình ảnh mới(6/6)</div>
                  </div>
                  <input
                    type="file"
                    class="custom-file-input form-control"
                    id="customFile"
                    name="files[]"
                    multiple
                    @change="handleFileUpload"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rate-boolean">
          <div class="mt-3">Sản Phẩm</div>
          <div class="form-check d-flex align-items-center mt-3">
            <label class="form-check-label" for="1">Về chất liệu :</label>
            <div class="form-check radio">
              <input
                class="form-check-input"
                value="true"
                v-model="ratee.material"
                type="radio"
                name="material"
                id="material"
              />
              <label class="form-check-label" for="material">
                Đúng chất liệu
              </label>
            </div>
            <div class="form-check radio">
              <input
                class="form-check-input"
                value="false"
                v-model="ratee.material"
                type="radio"
                name="material"
                id="material2"
              />
              <label class="form-check-label" for="material2">
                Không đúng chất liệu
              </label>
            </div>
          </div>
          <div class="form-check d-flex align-items-center mt-3">
            <label class="form-check-label" for="2">Về màu sắc :</label>
            <div class="form-check radio">
              <input
                class="form-check-input"
                value="true"
                v-model="ratee.color"
                type="radio"
                name="color"
                id="color"
              />
              <label class="form-check-label" for="color"> Đúng màu sắc </label>
            </div>
            <div class="form-check radio">
              <input
                class="form-check-input"
                value="false"
                v-model="ratee.color"
                type="radio"
                name="color"
                id="color2"
              />
              <label class="form-check-label" for="color2">
                Không đúng màu sắc
              </label>
            </div>
          </div>
          <div class="form-check d-flex align-items-center mt-3">
            <label class="form-check-label" for="3">Về phụ kiện :</label>
            <div class="form-check radio">
              <input
                class="form-check-input"
                value="true"
                v-model="ratee.lackOfAccessories"
                type="radio"
                name="lackOfAccessories"
                id="lackOfAccessories"
              />
              <label class="form-check-label" for="lackOfAccessories">
                Đầy đủ
              </label>
            </div>
            <div class="form-check radio">
              <input
                class="form-check-input"
                value="false"
                v-model="ratee.lackOfAccessories"
                type="radio"
                name="lackOfAccessories"
                id="lackOfAccessories2"
              />
              <label class="form-check-label" for="lackOfAccessories2">
                Thiếu phụ kiện
              </label>
            </div>
          </div>
          <div class="form-check d-flex align-items-center mt-3">
            <label class="form-check-label" for="3">Đúng mô tả :</label>
            <div class="form-check radio">
              <input
                class="form-check-input"
                value="true"
                v-model="ratee.wrongProduct"
                type="radio"
                name="wrongProduct"
                id="wrongProduct"
              />
              <label class="form-check-label" for="wrongProduct">
                Đúng mô tả
              </label>
            </div>
            <div class="form-check radio">
              <input
                class="form-check-input"
                value="false"
                v-model="ratee.wrongProduct"
                type="radio"
                name="wrongProduct"
                id="wrongProduct2"
              />
              <label class="form-check-label" for="wrongProduct2">
                không đúng với mô tả
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        class="d-flex align-items-center justify-content-end"
        style="column-gap: 1rem"
      >
        <RouterLink
          :to="{ path: '/products/detail/' + Product.productId }"
          class="btn btn-primary"
          rel="tooltip"
          title="Designed and Coded by Creative Tim"
          data-placement="bottom"
          >Trở lại</RouterLink
        >
        <button type="button" class="btn btn-primary" v-on:click="showConfirm()">
          Lưu thay Đổi
        </button>
      </div>
    </div>
  </div>
  <FooterDefault />
</template>
  
<style>
.custom-file-input {
  margin-top: 10px;
  display: none;
}

textarea {
  width: 20px;
}
</style>



<style scoped lang="scss">
$active-color: #f3d23e;

.rating {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 30px;
  color: #a7a8a8;
  text-align: center;
  margin-left: 10%;
}
.list-video-img {
  display: flex;
  display: inline-block;
}

.row-one {
}
.rate-boolean {
}
.rate {
  margin-top: 10px;
  height: 100px;
}
.cell-one {
  margin-left: 5%;
}

.card-body {
  background-color: aliceblue;
}
.card {
  width: 80%;
  margin-left: 10%;
  margin-top: 50px;
}
.list-sta {
  margin: 0 0 5px 0;
  padding: 0;
  list-style-type: none;
  &:hover {
    .sta {
      color: $active-color;
    }
  }
}

.action {
  margin-left: 90%;
  width: 100px;
  margin-top: 10px;
}

.img-group {
  display: flex;
  flex-direction: column;
}
.imgs {
  margin-top: 10px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: auto;
  display: block;
  flex-wrap: wrap;
}

.img {
  padding: 2px;
}
.label {
  font-size: 20px;
}

.sta {
  display: inline-block;
  margin-top: 3%;
  padding-left: 0;
  width: 100px;

  cursor: pointer;
  &:hover {
    & ~ .sta {
      &:not(.active) {
        color: inherit;
      }
    }
  }
}
.radio {
  width: 15%;
}
.label-1 {
  padding-right: 10px;
  width: 10%;
  font-weight: 600;
}

.card-text-set {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.position-star-text {
  position: relative;
  top: 3px;
}

.set-up-stars {
  width: 30px;
  height: 30px;
  margin: 0;
}

.list-star {
  margin: 0 0.75rem 0 0;
}

.customFile {
}

.ui-text__modifier {
  overflow: hidden;
  resize: none;
  padding: 1rem;
  margin: 0;
  border: 0;
  line-height: 1.25rem;
  font-size: 1rem;
  width: 100%;
  color: rgba(0, 0, 0, 0.87);
  height: 150px;
  box-shadow: unset;
}

.file-text {
  margin-left: 6px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 400;
  color: #ee4d2d;
}

.form-wrapper {
  background-color: #f1eded;
  padding: 0.5rem;
  border-radius: 3px;
}

.form__review {
  border: 1px solid rgba(0, 0, 0, 0.26);
  border-radius: 4px;
  margin-bottom: 1rem;
}

.wrapper-image {
  border: 1px solid #ee4d2d;
  cursor: pointer;
  justify-content: center;
  width: 145px;
}

#preview-img {
  margin-bottom: 1rem;
  margin-top: 0;
  padding: 0.5rem;
  display: none;
}
#preview-img1 {
  margin-bottom: 1rem;
  margin-top: 0;
  padding-top: 10px;
  padding: 0.5rem;
}

.card-set {
  margin: 0;
}
.active {
  color: $active-color;
}
</style>

