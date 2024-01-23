const nav = {

    side_bar: {
        name: "Admin",
        icon: "fa-solid fa-user-secret",
        path: "/manager"
    },
    nav_content: [
        {
            name: "Bán hàng",
            icon:"mdi-account-credit-card-outline",
            path:"/sell-product"
        },
        {
            name : "Quản lý sản phẩm",
            icon : "mdi mdi-cart",
            path: "/product",
        },
        {
            name: "Thuộc tính sản phẩm",
            icon: "mdi-application-parentheses",
            path: "/property",
            children: [
                {
                    name: "Category",
                    // icon: "mdi-chevron-left",
                    path: "/category"
                }, {
                    name: "Manufacturer",
                    // icon: "mdi-chevron-left",
                    path: "/Manufacturer"
                },  {
                    name: "Series",
                    // icon: "mdi-chevron-left",
                    path: "/series"
                },
            ]
        },
        {
            name: "Khuyến mãi",
            icon: "mdi-sale-outline",
            path: "discount",
            children: [
              {
                    name: "Giảm giá",
                    // icon: "mdi-tag-multiple",
                    path: "/discount"
                },
                {
                    name: "Voucher",
                    // icon: "mdi-ticket-percent-outline",
                    path: "/voucher"
                },
                {
                    name: "Khuyến mại",
                    // icon: "mdi-clipboard-list",
                    path: "/discount-bill"
                },
            ]
        },
        //     {
    //         name: "Order",
    //         icon: "mdi-chevron-left",
    //         path: "/order"
    //   },
      {
        name: 'Tài khoản',
        path: '/account',
        icon: 'mdi-account',
        children: [
          {
        name: 'Tài Khoản nhân viên',
        icon: 'mdi-account',
        path: '/account',
          },
          {
        name: 'Phân quyền người dùng',
        icon: 'mdi-lock',
        path: '/authorize'
          }
        ]
      },

        {
            name: "Thống Kê",
            icon: "mdi-finance",
            path: "/statistical",
            children:[
                {
                    name: "Doanh thu",
                    path: "/statistical"
              },
               {
                    name: "Bán chạy",
                    path: "/statis_TopSale"
              }
            ]
        },
        {
            name: "Báo cáo bị đánh giá",
            icon: "mdi-star-check",
            path:"/report-rate"
        },
      {
        name: "Quản lí đơn hàng",
        icon: "mdi-cart-variant",
        path: "/bill-manage/show"
      },
    ],
    nav_footer: {
        name: "Setting",
        icon: "mdi-chevron-left",
        path: "/"
    },
};
export default nav;
