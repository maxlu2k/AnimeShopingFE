<script setup>
import Navbar from "@/views/User/Navbar.vue";
import DefaultFooter from "@/views/User/FooterDefault.vue";
import { onMounted, onUnmounted } from "vue";

const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});

onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});
</script>
<template>
  <div class="container top-0">
    <div class="row">
      <div class="col-12">
        <Navbar />
      </div>
    </div>
  </div>
  <div class="container-fluid my-5 bg-white" style="padding-top: 100px">
    <div class="container">
      <H1>Giới thiệu về Japan Figure</H1>
      <br />
      <br />
      <img
        src="https://file.hstatic.net/1000160337/file/3_cfb62bd4f74441d1a31516fd7f01b404_1024x1024.png"
        alt=""
      />
      <br />
      <br />
      <br />
      <h1>► Figure là gì ?</h1>
      <br />
      Là mô hình, là tượng, là bất kỳ cách gọi nào liên quan đến những tạo tác
      3D cầm nắm được trên tay, mô phỏng lại nhân vật trong bức vẽ, phim,
      truyện, game... Thông thường figure mang hình dạng con người, đôi khi là
      động vật, thực vật, quái vật, yêu tinh, thần thánh, thậm chí là sinh vật
      ngoài tinh...nhân vật nào được điêu khắc thành 3D thì được gọi chung là
      figure.

      <br />
      <br />
      <img
        src="https://file.hstatic.net/1000160337/file/174511079_122365829947044_6358189466528913061_n_7aa27ccc8693492e95e9680f39213119_grande.jpg"
        alt=""
      />
      <br />
      <br />

      <h1>Japan Figure là gì ?</h1>

      <br />
      <ul>
        <li>
          Là những figure được các họa sĩ Nhật Bản sáng tạo, vẽ minh họa, điêu
          khắc và hoàn thiện thiết kế đầu tiên - prototype tại Nhật Bản.
        </li>
        <li>
          Sau đó phần lớn thiết kế này được gửi đi sản xuất hàng loạt tại Trung
          Quốc. Nên sản phẩm cuối cùng bạn cầm trên tay có chữ “Made in China”
          là chuyện rất bình thường.
        </li>
        <li>
          Vì xuất xứ từ Nhật nên hiển nhiên Japan figure mang đậm văn hóa Nhật
          từ Anime, Manga, Game, Light novel, J-pop cho đến ca sĩ ảo, streamer
          ảo v…v…
        </li>
      </ul>

      <br />

      <img
        src="https://file.hstatic.net/1000160337/file/259390986_222666446662325_216773720752986953_n_903bd702c93841a0b5832dbbc9ac1199_grande.jpg"
        alt=""
      />
      <br />
      <br />
      <br />
      Với công nghệ của Nhật và quy trình sản xuất được giám sát nghiêm ngặt,
      những sản phẩm figure được hoàn thành rất có hồn của nhân vật gốc, chi
      tiết sắc bén, màu sắc sống động, đóng gói hỉnh chu.

      <br />
      Nhờ đó, figure Nhật Bản đã làm mãn lòng fan hâm mộ trên toàn thế giới. Tới
      đây hẳn bạn đang thắc mắc: "Làm thế nào để phân biệt được hàng Nhật và
      hàng nhái từ Trung Quốc?” Yên tâm nhé Japan Figure đã chuẩn bị sẵn cho bạn
      1 số mẹo phân biệt cực ký hữu ích.
      <br />
      <h1>►Japan Figure</h1>
      <br />
      Là nơi chuyên cung cấp figure chính hãng của Nhật Bản tại Việt Nam
      <br />
      <br />
      Japan Figure là thiên đường với những bạn quan tâm, theo đuổi vẻ đẹp toàn
      vẹn, đam mê figure cao cấp và đây mê hoặc của Nhật Bản. Nếu nhu cầu của
      bạn chỉ dừng lại ở figure chất lượng thấp, hàng nhái, giả, không có bản
      quyền… thì rất tiếc Japan Figure không phải là nơi phù hợp dành cho bạn.
      Từ tháng 8/2012, sau 11 năm phục vụ, Japan Figure rất vui nhận được sự ủng
      hộ đông đảo từ người sưu tầm trên khắp VN.
    </div>
  </div>
  <DefaultFooter />
</template>