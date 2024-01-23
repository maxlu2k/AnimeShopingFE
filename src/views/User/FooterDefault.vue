<script setup>
import logoDark from "@/assets/img/logo-ct-dark.png";
defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "Material Kit 2",
      logo: logoDark,
      route: "/"
    })
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-facebook text-lg opacity-8"></i>',
        link: "https://www.facebook.com/CreativeTim/"
      },
      {
        icon: '<i class="fab fa-twitter text-lg opacity-8"></i>',
        link: "https://twitter.com/creativetim"
      },
      {
        icon: '<i class="fab fa-dribbble text-lg opacity-8"></i>',
        link: "https://dribbble.com/creativetim"
      },
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://github.com/creativetimofficial"
      },
      {
        icon: '<i class="fab fa-youtube text-lg opacity-8"></i>',
        link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w"
      }
    ]
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String
    },
    default: () => [
      {
        name: "company",
        items: [
          {
            name: "about us",
            href: "https://www.creative-tim.com/presentation"
          },
          {
            name: "freebies",
            href: "https://www.creative-tim.com/templates/free"
          },
          {
            name: "premium tools",
            href: "https://www.creative-tim.com/templates/premium"
          },
          { name: "blog", href: "https://www.creative-tim.com/blog" }
        ]
      },
      {
        name: "resources",
        items: [
          { name: "illustrations", href: "https://iradesign.io/" },
          {
            name: "bits & snippets",
            href: "https://www.creative-tim.com/bits"
          },
          {
            name: "affiliate program",
            href: "https://www.creative-tim.com/affiliates/new"
          }
        ]
      },
      {
        name: "help & support",
        items: [
          {
            name: "contact us",
            href: "https://www.creative-tim.com/contact-us"
          },
          {
            name: "knowledge center",
            href: "https://www.creative-tim.com/knowledge-center"
          },
          {
            name: "custom development",
            href: "https://services.creative-tim.com/"
          },
          {
            name: "sponsorships",
            href: "https://www.creative-tim.com/sponsorships"
          }
        ]
      },
      {
        name: "legal",
        items: [
          {
            name: "terms & conditions",
            href: "https://www.creative-tim.com/terms"
          },
          {
            name: "privacy policy",
            href: "https://www.creative-tim.com/privacy"
          },
          {
            name: "licenses (EULA)",
            href: "https://www.creative-tim.com/license"
          }
        ]
      }
    ]
  }
});
</script>
<template>
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
  <footer class="footer pt-5 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-3 mb-4 ms-auto">
          <div>
            <h4>Giới thiệu Anime Hà Nội Figure</h4>
          </div>
          <div>
            <p>Giúp các bạn trẻ Việt Nam dễ dàng tiếp cận với mô hình anime figure Nhật Bản</p>
          </div>
        </div>
        <div class="col-md-3 mb-4 ms-auto">
          <div>
            <h4>Thông tin địa chỉ</h4>
          </div>
          <div >
            <p>Địa chỉ: Lê Đức Thộ, Mĩ ĐÌnh 2, Nam Từ Liêm , Hà Nội, Anime-Hà Nội-Figure chưa có không gian trưng bày, bạn vui lòng hẹn trước khi đến .</p>
            <p>Điện thoại: 090 8268 007</p>
            <p>Email: support@japanfigure.vn</p>
          </div>
        </div>
        <div class="col-md-3 mb-4 ms-auto">
          <div>
            <h4>Hỗ trợ khách hàng</h4>
          </div>
          <div>
            <ul>
              <li>Tìm kiếm</li>
              <li>Giới thiệu</li>
            </ul>
          </div>
        </div>
        <div class="col-md-3 mb-4 ms-auto">
          <div>
            <h4>Chăm sóc khách hàng</h4>
          </div>
          <div class="mb-3">
            <h4 class="mb-0">0908268007</h4>
            <a href="#" >support@japanfigure.vn</a>
          </div>
          <div>
            <h4>Follow Anime Hà nội Figure</h4>
          </div>
          <div>
            <p>Giúp các bạn trẻ Việt Nam dễ dàng tiếp cận với mô hình figure Nhật Bản</p>
          </div>
        </div>
        <div class="col-12">
          <div class="text-center">
            <p class="text-dark my-4 text-sm font-weight-normal">
              All rights reserved. Copyright ©
              {{ new Date().getFullYear() }}
              Japan Figure. 
              <a href="https://www.creative-tim.com" target="_blank"
                >Powered by Haravan</a
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
