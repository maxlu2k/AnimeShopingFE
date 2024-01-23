<template >
    <div class="container-fluid" style="background-color: #f5f5f5; position: relative;">
        <div class="row py-1 px-xl-5 mx-auto" style="
        justify-content: center;
        color: red;
        font-size: small;
        font-weight: 700;
      ">
            Miễn phí vận chuyển toàn quốc với đơn hàng trên 15.000.000 VND
        </div>
    </div>

    <div class="container-fluid" style="background-color: #ffffff;">
        <div class="container row align-items-center py-3 px-xl-5 d-none d-lg-flex mx-auto">
            <div class="col-lg-2 col-2">
                <a href="" class="text-decoration-none">
                    <img src="/src/assets/logo-v1.png" alt="" srcset="" width="80px" height="80px"
                        style="width: 80px; height: 80px;" class="rounded-circle border">
                </a>
            </div>
            <div class="col-lg-7 col-7 text-left ">
                <form action="" class="dropdown row col-lg-12">
                    <div class="input-group mb-3">
                        <input type="text" v-model="name" id="search" class="form-control col-12"
                            placeholder="Nhập tên sản phẩm cần tìm" @keyup="getFind()" @blur="validateSearch"
                            aria-label="Nhập tên sản phẩm cần tìm" aria-describedby="button-addon2">
                        <button class="btn btn-outline-secondary col-2 " type="button" id="button-addon2"
                            @click="getSearch()">Tìm kiếm</button>
                        <div v-if="products === null && name === ''"></div>
                        <div v-if="products != null && name != ''" class="row dropdown-content"
                            style="margin-top: 50px; min-width: 700px;">
                            <RouterLink v-for="x in products" :key="x.id" :to="{ path: '/products/detail/' + x.id }"
                                rel="tooltip" data-placement="bottom">
                                {{ x.figure }}
                            </RouterLink>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-lg-3 col-3 text-right">
                <div class="row">
                    <div class="col-6 row" v-if="isLogin">
                        <p class="m-0" style="font-size: 13px;">Tài khoản của<i class="bi bi-person"
                                style="font-size: 25px;"></i></p>
                        <div class="m-0 dropdown" style="font-size: 13px;text-align: center;" >
                            {{userLogin}}
                            <i class="bi bi-chevron-down dropbtn"></i>
                            <div class="dropdown-content">
                                Thông tin tài khoản
                                <div class="hr">
                                </div>
                                <RouterLink :to="{ path: '/infor/' }" rel="tooltip" data-placement="bottom">
                                    Tài khoản của tôi
                                </RouterLink>
                                <RouterLink :to="{ name: 'logout' }" rel="tooltip" data-placement="bottom">
                                    Đăng xuất
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 row" v-else>
                        <RouterLink :to="{name:'login'}" style="color: black;text-decoration: none;">
                            <p class="m-0" style="font-size: 13px;">Đăng nhập<i class="bi bi-person"
                                style="font-size: 25px;"></i></p>
                        </RouterLink>
                        <!-- <div class="m-0 dropdown" style="font-size: 13px;text-align: center;">Phùng Thị Liên
                            <i class="bi bi-chevron-down dropbtn"></i>
                            <div class="dropdown-content">
                                Thông tin tài khoản
                                <div class="hr">
                                </div>
                                <RouterLink :to="{ path: '/infor/' }" rel="tooltip" data-placement="bottom">
                                    Tài khoản của tôi
                                </RouterLink>
                                <RouterLink :to="{ name: 'logout' }" rel="tooltip" data-placement="bottom">
                                    Đăng xuất
                                </RouterLink>
                            </div>
                        </div> -->
                    </div>
                    <router-link to="/shopping-cart" class="col-2">
                        <el-badge :value="num" class="item">
                            <i class="col-2 bi bi-cart4" style="font-size: 25px;"></i>
                        </el-badge>
                    </router-link>

                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid mx-0  border-bottom" style="">
        <nav class="navbar navbar-expand-lg box-shadow border-1">
            <div class="container">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" style="color: black;">
                        <li class="nav-item mr-5">
                            <RouterLink class="nav-link active " aria-current="page" :to="{ path: '/home' }" rel="tooltip"
                                data-placement="bottom">
                                Trang chủ
                            </RouterLink>
                        </li>
                        <li class="nav-item mr-5">
                            <a class="nav-link" href="/about">Giới thiệu</a>
                        </li>
                        <!-- <li class="nav-item dropdown m-auto mr-5">
                            <div class="dropdown">
                                <button class="dropbtn">
                                    <a href="javascript:void(0)" style="text-decoration: none;">Sản phẩm</a>
                                </button>
                                <div class="dropdown-content" style="min-width: 250px;">
                                    <RouterLink
                                        :to="{ path: '/collections/' + ChangeToSlug(category.name) + '/' + category.id }"
                                        rel="tooltip" data-placement="bottom" v-for="category in categories"
                                        :key="category.id">
                                        {{ category.name }}
                                    </RouterLink>
                                    <div class="hr"></div>
                                </div>
                            </div>
                        </li> -->
                        <li class="nav-item">
                            <RouterLink :to="{name:'uu-dai'}" class="nav-link">Ưu đãi</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink :to="{name:'infor'}" class="nav-link">Thông tin đơn hàng</RouterLink>
                        </li>
                        <li class="nav-item" v-if="isLogin && tmp">
                            <RouterLink :to="{name:'dashboard'}" class="nav-link">Quản lý</RouterLink>
                        </li>
                        <!-- <li class="nav-item" v-if="getRole">
                            <RouterLink :to="{name:'dashboard'}" class="nav-link">Quản lý</RouterLink>
                        </li> -->
                    </ul>

                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import Axios from '@/router/axios';
import router from '@/router';
import Cookies from 'js-cookie';
import cart_service from "@/services/cartService";
import { ChangeToSlug } from "@/commons/Hstring";
import authStore from '@/stores/auth';
export default {
    data() {
        return {
            tmp:false,
            auth : authStore(),
            categories: null,
            products: [],
            name: null,
            ChangeToSlug,
            num: 0,
            searchError: null,
        };
    },
    mounted() {
        this.getCategories();
        this.countCart();
        this.getRole();
    },
    computed:{
        isLogin(){
            return !!Cookies.get('_user')
        },
        isManager(){
            return this.getRole();
        }
        ,
        userLogin(){
            return Cookies.get('_user')
        }
    },
    // created(){
    //     this.countCart()
    // },
    methods: {
        async getRole(){
            const arr = await this.auth.getUserRole();
            this.tmp = arr.some((item)=>{
                console.log(item);
                return item == 'ADMIN' || item == 'USER'
            });
        },
        getCategories() {
            Axios.get('/categories').then(response => {
                this.categories = response.data;
            });
        },
        getFind() {
            Axios.get("products/getAll?name=" + this.name).then((response) => {
                if (response.data.infor_response.code == 200 && this.name != '') {
                    this.products = response.data.data.data;
                } else {
                    this.products = []
                }

            });
        },
        getSearch() {
            if (this.name == '') {
                this.validateSearch()
                return
            } else {
                router.push('/search?key=' + this.name)
            }

        },
        validateSearch() {
            var search = document.getElementById("search");
            if (!this.name) {
                search.style.borderColor = "red"
            } else {
                search.style.borderColor = "green"
            }
        },
        countCart() {
            const userName = Cookies.get('_user')
            if (userName) {
                cart_service.count(userName).then(response => {
                    this.num = response.data
                    if (isNaN(this.num)) {
                        this.num = 0
                    }
                });

            } else {
                const cart = JSON.parse(Cookies.get("cart") || "[]");
                let count = cart.length;
                this.num = count
            }
        },
    }

};
</script>

<style>
ul.navbar-nav li a {
    color: black;
    font-size: medium;

}


.icons a {
    font-size: 20px;
    margin-right: 10px;
}

.hr {
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-right: auto;
    border-style: inset;
    margin-left: 0;
    border-width: 1px;
}

.dropbtn {
    background-color: white;
    color: #252a2b;
    padding: 0px;
    border: none;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    background-color: #fff;
}

.dropdown-content a {
    color: #252a2b;
    padding: 8px 16px;
    max-height: 30px;
    text-decoration: none;
    display: block;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.dropdown:hover .dropbtn {
    color: black;
}

/* .item:hover .wrapper,
  .item:hover ~ .wrapper */
.dropdown-header {
    display: block;
    padding: 0.5rem 1.5rem;
    margin-bottom: 0;
    font-size: 0.875rem;
    color: #6c757d;
    white-space: nowrap;
}

.dropdown-item-text {
    display: block;
    padding: 0.25rem 1.5rem;
    color: #212529;
}
</style>
