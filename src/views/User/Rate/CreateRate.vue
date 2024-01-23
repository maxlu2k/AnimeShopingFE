<script scope>
import NavbarDefault from "@/views/User/Navbar.vue";
import FooterDefault from "@/views/User/FooterDefault.vue";
import Axios from "@/services/RateService";
import "vue-awesome/icons/star";
import "vue-awesome/icons/star-o";
import Icon from "../../../../node_modules/vue-awesome/components/Icon";
import check from '@/commons/jwt';
import { useToast } from "vue-toastification";
import router from '@/router'
import "bootstrap/dist/js/bootstrap.min.js";
// import ProductService from "../../../../views/common/service/product_service";
const toast = useToast();
export default {
  components: { NavbarDefault, FooterDefault, Icon },
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
        nameUrl: [],
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
    // getBillDetail(id){

    // }
    // // getDetail(id) {
    // //   ProductService.getOneProduct(id).then((response) => {
    // //     this.product = response.data;
    // //     console.log(this.product);
    // //   });
    // // },
    // // rateProduct(rating) {
    // //   this.product.rating = rating
    // // },
    // ,
    detail(id) {
      check(Axios);
      Axios.get("v1/bill/detailbill/" + id, 
       ).then((ressponse) => {
        if(ressponse.data.data.isRate==true){
          const toast = useToast();
                toast.error("Sản Phẩm đã được đánh giá !");
                // window.location.href = `/`;
        }else{
          this.Product = ressponse.data;
        console.log(this.Product);
        }
       
      }).catch(err=>{
          console.log(err);
           const toast = useToast();
                toast.error("Lỗi truy cập !");
                // window.location.href = `/`;
        })
    },
    isImage(file) {
      return (
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png") ||
        file.endsWith(".gif")
      );
    },
    showConfirm(){
    if(confirm("Bạn có chắc chắn muốn sửa đánh giá này ?")){
      this.save();
    }
    },
    handleFileUpload(event) {
      const files = event.target.files;
      const MAX_SIZE = 50 * 1024 * 1024;
      this.ratee.imgs = files;
      const images = [];
      let previewFile = document.querySelector("#preview-img");
      if (files.length > 0) {
        if (files.length > 6) {
          const toast = useToast();
          toast.error("chọn tối đa 6 file");
       
          this.ratee.imgs = [];
          event.target.value = null;
          previewFile.style.display = "";
        } else {
          previewFile.style.display = "flex";
        }
      } else {
        previewFile.style.display = "";
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
          previewFile.style.display = "";
          return;
        }
        if (file.size > MAX_SIZE) {
          this.ratee.imgs = [];
          event.target.value = null;
          const toast = useToast();
          toast.error("File tải lên có kích thước lớn hơn 50MB. Vui lòng chọn lại !");
      
          previewFile.style.display = "";
          return;
        }
        this.getFileSize(file)
          .then((r) => {
            console.log(r);
          })
          .catch((erro) => {
            console.log(erro);
            return;
          });
        // console.log(fileSize)
        // if(fileSize>50){
        //   alert("file phải có kích thước nhỏ hơn 50MB");
        //   return;
        // }

        const url = URL.createObjectURL(file);
        const image = { name: file.name, url, type: file.type };
        images.push(image);
      }
      console.log(images);
      this.ratee.nameUrl = images;
    },
    getFileSize(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileSizeInBytes = reader.result.byteLength;
          const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
          resolve(fileSizeInMegabytes);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
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
   async save() {
      var rate = {};
      rate.rate = this.ratee.stars;
      rate.comment = this.ratee.comment;
      rate.productID = this.Product.data.productId;
      var id = this.$route.params.id;
      rate.detailBillID = id;

     
      if (this.ratee.color === "true") {
        rate.color = true;
      } else {
        rate.color = false;
      }
      if (this.ratee.material === "true") {
        rate.material = true;
      } else {
        rate.material = false;
      }

      if (this.ratee.lackOfAccessories === "true") {
        rate.lackOfAccessories = true;
      } else {
        rate.lackOfAccessories = false;
      }

      if (this.ratee.wrongProduct === "true") {
        rate.wrongProduct = true;
      } else {
        rate.wrongProduct = false;
      }
     await check(Axios);
     await Axios.post("rate/craete", rate)
        .then((response) => {
         
          console.log(response.data);
          return response.data;
        })
        .then(async ( res) => {
          if (this.ratee.imgs.length > 0) {
            const formData = new FormData();
            var files = this.ratee.imgs;
            for (let i = 0; i < files.length; i++) {
              console.log(files[i]);
              formData.append("files", files[i]);
            }
           await Axios.post("rate/upload", formData)
              .then((re) => {
                console.log(re.data);
                return { data: re.data, id: res.id };
              })
              .then(async (response) => {
                var id = response.id;
                var arrUrl = response.data;
                var list = [];
                for (let i = 0; i < this.ratee.imgs.length; i++) {
                  var rateImg = {};
                  rateImg.rateID = id;
                  rateImg.url = arrUrl[i];
                  rateImg.name = this.ratee.imgs[i].name;
                  list.push(rateImg);
                }
               await Axios.post("rate/create-img", list).then((repos) => {
                  console.log(repos.data);
                });
                console.log(this.ratee);
              });
              
           
          }
        })
        toast.success("Đánh giá thành công !");
        router.push(`/products/detail/`+this.Product.data.productId);
    },
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

  <div class="card">
    <div class="card-header row title card-set">Đánh giá Sản Phẩm</div>
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <img style="width: 300px;" :src="'http://127.0.0.1:8000/api/rate/show?url=' +Product.data.urlProduct" />
        </div>
        <div class="col-9">
          <div class="card-title card-text-set">Tên Sản Phẩm : {{ Product.data.nameProduct }}</div>
          <div class="card-text">PHÂN LOẠI: {{ Product.data.categoty }}</div>
        </div>
      </div>
      <div class="row mb-3 mt-3 align-items-center">
        <div class="col-3" style="font-weight: 400; font-size: 25px">
          Chất lượng sản phẩm :
        </div>
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
                <div class="imgs" id="preview-img">
                  <div
                    class="list-video-img"
                    v-for="(img, key) in this.ratee.nameUrl"
                    :key="key"
                  >
                    <img  style="    margin-left: 5px;"
                      v-if="isImage(img.name)"
                      :src="img.url"
                      alt="avatar"
                      width="200"
                      height="200"
                    />
                    <video  style="    margin-left: 5px;"
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
                      src="@/assets/img/camera.png"
                      style="width: 24px; height: 24px"
                      alt=""
                    />
                    <div class="file-text">Thêm hình ảnh (6/6)</div>
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
          <div class="mt-3" style="font-weight: 400; font-size: 25px">
            Sản Phẩm :
          </div>
          <div class="form-check d-flex align-items-center mt-3">
            <label class="form-check-label label-1" for="1"
              >Về chất liệu :</label
            >
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
            <label class="form-check-label label-1" for="2">Về màu sắc :</label>
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
            <label class="form-check-label label-1" for="3"
              >Về phụ kiện :</label
            >
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
            <label class="form-check-label label-1" for="3">Đúng mô tả :</label>
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
        <button type="button" class="btn btn-secondary">Trở lại</button>
        <button type="button" class="btn btn-primary" v-on:click="showConfirm()">
          Xác nhận
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

.card-set {
  margin: 0;
}
.active {
  color: $active-color;
}
</style>

