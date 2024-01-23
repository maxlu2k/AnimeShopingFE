// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/layouts/dashboard/Dashboard.vue'
import Discount from '@/views/discounts/discount/Discount.vue'
import DiscountDetail from '@/views/discounts/discount/DiscountDetail.vue'
import DiscountBill from '@/views/discounts/discountBill/DiscountBill.vue'
import Voucher from '@/views/discounts/voucher/Voucher.vue'
import VoucherDetail from '@/views/discounts/voucher/VoucherDetail.vue'
import SellProduct from '@/views/sells/Sell.vue'
import SellProductDetail from '@/views/sells/SellDetail.vue'
import HomeUserVue from '@/views/User/HomeUser.vue'
import Login from '@/views/auth/Login.vue'
import authStore from '@/stores/auth'
import ChangePassword from '@/views/auth/ChangePassword.vue'
import Register from '@/views/auth/Register.vue'
import RegisterConfirm from '@/views/auth/RegisterConfirm.vue'
import ForgetPassword from '@/views/auth/ForgetPassword.vue'
import ForgetPasswordConfirm from '@/views/auth/ForgetPasswordConfirm'
import ReportRate from '@/views/User/Rate/RateReport.vue'
import Product from '@/views/Admin/Product.vue'
import Statistical from '@/views/Statistical.vue'
import Account from '@/views/Admin/account/Account.vue'
import PhanQuyen from '@/views/Admin/account/PhanQuyen.vue'
import Statis_TopSale from '@/views/Statis_TopSale.vue'
import Forbiden from '@/views/auth/Forbiden.vue'
import roles from '@/stores/roles'
import UuDai from '@/views/User/UuDai.vue'
const routes = [
  {
    path: '/',
    component: () => import('@/views/User/HomeUser.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/products/detail/:id',
    name: 'product-detail',
    component: () => import('@/views/ProductDetail.vue')
  },
  {
    path : "/forbidden",
    name : "Forbidden",
    component: () => import('@/views/auth/Forbidden.vue')

  },
  {
    path: '/home',
    name: 'HomeUser',
    component: HomeUserVue,
    exact: true,
    // children: [
    //   {
    //     path: '/se',
    //     name: '',
    //     component: () => import('@/views/User/Search.vue'),
    //   },
    // ],
  },
  {
    path:"/about",
    name: "introduce",
    component: () => import('@/views/User/About.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/User/Search.vue'),
    props: (route) => ({ key: route.query.key }),
    exact: true,
  },
  {
    path: "/shopping-cart",
    name: "shopping-cart",
    component: () => import('@/views/User/Sales.vue'),
  },

  {
    path: "/checkout",
    name: "checkout",
    component: () => import('@/views/User/Checkout.vue'),
  },
  {
    path: "/update-rate/:id",
    name: "update-rate",
    component: () => import('@/views/User/Rate/UpdateRate.vue'),
  },

  {
    path:"/create-rate/:id",
    name: "create-rate",
    component: () => import('@/views/User/Rate/CreateRate.vue'),
  },
  {
    path: "/infor",
    name: "infor",
    component: () => import('@/views/User/Infor.vue'),
  },
  {
    path: "/sales-cancel/:id",
    name: "salesCancel",
    component: () => import('@/views/User/SalesCancel.vue'),
  },
  {
    path: '/manager',
    name: 'dashboard',
    component: Dashboard,
    meta: { authorire: [roles.USER, roles.ADMIN] },
    children: [
      {
        path: '/property',
        name: 'property',
        component: () => import('@/views/Property.vue'),
      },
      {
        path: '/manufacturer',
        name: 'manufacturer',
        component: () => import('@/views/Manufacturer.vue'),
      },
      {
        path: '/bill-manage/show',
        name: 'Bill',
        component: () => import('@/views/Admin/BillManager.vue'),
      },
      {
        path: "/add-bill-product/:id",
        name: "add-bill",
        component: () => import('@/views/Admin/AddBill.vue'),
      },
      {
        path: "/detail-bill/:id",
        name: "detail-bill",
        component: () => import('@/views/Admin/detailBill.vue'),
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/Category.vue'),
      },
      {
        path: '/series',
        name: 'series',
        component: () => import('@/views/Series.vue'),
      },
      {
        path: '/product',
        name: 'product',
        component: Product,
      },
      // {
      //   path: '/products/detail/:id',
      //   name: 'product-detail',
      //   component: () => import('@/views/ProductDetail.vue')
      // },
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/Order.vue'),
      },
      {
        path: '/discount',
        name: 'discount',
        meta: { authorire: [roles.USER] },
        component: Discount,
      },
      {
        path: '/discount-bill',
        name: 'discount-bill',
        meta: { authorire: [roles.USER] },
        component: DiscountBill,
      },
      {
        path: '/voucher',
        name: 'voucher',
        meta: { authorire: [roles.USER] },
        component: Voucher,
      },
      {
        path: '/voucher/:id',
        name: 'voucher-detail',
        meta: { authorire: [roles.USER] },
        component: VoucherDetail,
      },
      {
        path: '/discount/:id',
        name: 'discount-detail',
        meta: { authorire: [roles.USER] },
        component: DiscountDetail,
      },
      {
        path: "/sell-product",
        name: "sell-product",
        meta: { authorire: [roles.USER] },
        component: SellProduct
      },
      {
        path: "/sell-product/:id",
        name: "sell-product-detail",
        meta: { authorire: [roles.USER] },
        component: SellProductDetail,
      },
      {

        path: "/report-rate",
        name: "report-rate",
        component: ReportRate
      },
      {
        path: "/account",
        name: "account",
        meta: { authorire: [roles.ADMIN] },
        // component: () => import("@/views/account/Account.vue")
        component: Account
      },
      {
        path:'/authorize',
        name: 'authorize',
        meta: { authorire: [roles.ADMIN] },
        // component: () => import("@/views/account/PhanQuyen.vue")
        component: PhanQuyen
      },
    {
        path: '/statistical',
      name: 'statistical',
        meta: { authorire: [roles.ADMIN] },
        component: Statistical,
      },
      {
        path: '/statis_TopSale',
        name: 'statis_TopSale',
        meta: { authorire: [roles.ADMIN] },
        component: Statis_TopSale,
      },
    ],

  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
  ,
  {
    path: "/change-password",
    name: "change-password",
    component: ChangePassword
  }
  ,
  {
    path: "/register",
    name: "register",
    component: Register
  }
  ,
  {
    path: "/register/confirm",
    name: "registerwithparams",
    props: (route) => ({ token: route.query.token }),
    component: RegisterConfirm
  }
  ,
  {
    path: "/forget-password/confirm",
    name: "forget-password-with-params",
    component: ForgetPasswordConfirm
  }
  ,
  {
    path: "/forget-password",
    name: "forget-password",
    component: ForgetPassword
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: () => {
      authStore().logout();
      return { name: "login" };
    }
  },
  {
    path: "/forbiden",
    name: "forbiden",
    component: Forbiden
  },
  {
    path: "/uu-dai",
    name: "uu-dai",
    component: UuDai
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async(to, from, next) => {
  const obj = to.meta.authorire;
  const currentUser = await authStore().getUserRole();
  // console.log(currentUser);
  if (obj) {
    const checkRole = obj.some((val) => {
      return currentUser.some((cur) => {
        return val == cur;
      })
    });
    // console.log(checkRole);
    if(checkRole){
      next();
    }
    else  {
      return next('/forbiden');
    }
    // console.log("big");
  }
  else{
    next();
  }

})


export default router
