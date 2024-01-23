<script setup>
import SlideShow from "@/views/detail/slideshow.vue";
import Info from "@/views/detail/info.vue";
</script>
<template>
  <navbar-default />
  <header-default />
  <div class="row container" style="margin-left: auto; margin-right: auto">
    <div class="col-12" style="background-color: ecebe8a6">
      <el-breadcrumb class="mt-3 mb-3" style="margin-left: 2%" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="col-6">
      <SlideShow :product="product" />
    </div>
    <div class="col-6">
      <Info :product="product" />
    </div>
  </div>
  <Rate/>
  <FooterDefault />
</template>
<script>
import NavbarDefault from "@/views/User/Navbar.vue";
import HeaderDefault from "@/views/User/Header.vue";
import FooterDefault from "@/views/User/FooterDefault.vue";
import Rate from "@/views/User/Rate/DisplayRate.vue";
import Axios from "@/router/axios";
export default {
  components: {
    NavbarDefault,
    HeaderDefault,
    FooterDefault,
    Rate
  },
  data() {
    return {
      name: "",
      product: [],
      id: null,
      products: null,
      cate: null,
    };
  },
  async mounted() {
    this.id = this.$route.params.id;
    await this.getDetail(this.id);
  },
  methods: {
    async getDetail(id) {
      const res =  await Axios.get("/products/detail", {
        params: { id: id },
      })
      this.product = res.data;
    },
    // getList() {
    //   const params = this.getRequestParams(4, this.cate);
    //   ProductService.getAll(params).then((response) => {
    //     this.products = response.data.data.data;
    //   });
    // },
    // getRequestParams(size, category) {
    //   let params = {};
    //   if (size) {
    //     params["size"] = size;
    //   }
    //   if (category) {
    //     params["category"] = category;
    //   }
    //   return params;
    // },
  },
};
</script>
