<template>
  <div>
    <div>
      <navbar-default />
    </div>
    <div>
      <header-default />
    </div>
    <!-- <div style="text-align: center;">
        <el-pagination style="margin-left: 39%; margin-top: 3%;" background layout="prev, pager, next" :page-count="count"
          :page-size="size" :page-sizes="sizes" @current-change="handlePageChange" hide-on-single-page>
        </el-pagination>
      </div> -->
    <div class="container-fluid my-5 bg-white" style="padding-top: 100px">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 table-responsive mb-5">
            <h3>Danh sách khuyến mại</h3>
            <table class="table border" border>
              <thead>
                <tr>
                  <th class="text-center" scope="col">#</th>
                  <th class="text-center" scope="col">Tên khuyến mại</th>
                  <th class="text-center" scope="col">Mức giảm giá</th>
                  <th class="text-center" scope="col">Giảm giá tối đa</th>
                  <th class="text-center" scope="col">Yêu cầu tối thiểu</th>
                  <th class="text-center" scope="col">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="discounts != null">
                  <th class="text-center" scope="row">{{ index }}</th>
                  <td class="text-center">{{ discounts?.discountName }}</td>
                  <td class="text-center">
                    {{
                      discounts?.discountType == 1
                        ? Number(discounts?.discountAmount) + " VND"
                        : Number(discounts?.discountAmount) + " %"
                    }}
                  </td>
                  <td class="text-center">
                    {{
                      discounts?.discountType == 1
                        ? Number(discounts?.discountAmount) + " VND"
                        : Number(discounts?.maxPrice) + " VND"
                    }}
                  </td>
                  <td class="text-center">
                    {{ discounts?.minPrice + " VND" }}
                  </td>
                  <td class="text-center">
                    {{
                      discounts?.discountStart + " - " + discounts?.discountEnd
                    }}
                  </td>
                </tr>
                <tr v-else class="text-center">
                  <td colspan="10">Không có khuyến mại</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 table-responsive mb-5">
            <h3>Danh sách voucher</h3>
            <table class="table border">
              <thead>
                <tr>
                  <th class="text-center" scope="col">#</th>
                  <th class="text-center" scope="col">Tên khuyến mại</th>
                  <th class="text-center" scope="col">Mức giảm giá</th>
                  <th class="text-center" scope="col">mã giảm giá</th>
                  <th class="text-center" scope="col">Giảm giá tối đa</th>
                  <th class="text-center" scope="col">Yêu cầu tối thiểu</th>
                  <th class="text-center" scope="col">Thời gian</th>
                  <th class="text-center" scope="col">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="vouchers" v-for="(item, index) in vouchers">
                  <th class="text-center" scope="row">{{ index }}</th>
                  <td class="text-center">{{ item.nameVoucher }}</td>
                  <td class="text-center">{{ item.voucherCode }}</td>
                  <td class="text-center">
                    {{
                      item.discountType == 1
                        ? Number(item.discountAmount) + " VND"
                        : Number(item.discountAmount) + " %"
                    }}
                  </td>
                  <td class="text-center">
                    {{
                      item.discountType == 1
                        ? Number(item.discountAmount) + " VND"
                        : Number(item.maxPrice) + " VND"
                    }}
                  </td>
                  <td class="text-center">{{ item.minPrice + " VND" }}</td>
                  <td class="text-center">
                    {{ formatDate(item.from) + " - " + formatDate(item.to) }}
                  </td>
                  <td
                    class="text-center text-bold"
                    :class="getColor(item.status, item.from, item.to)"
                  >
                    {{
                      isExperied(item.from, item.to)
                        ? item.status == null
                          ? "Đã sử dụng"
                          : item.status
                          ? "Cóthể sử dụng"
                          : "Hết hạn"
                        : "Hết hạn"
                    }}
                  </td>
                </tr>

                <tr v-else class="text-center">
                  <td colspan="10">Không có voucher</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <FooterDefault />
  </div>
</template>
<script setup>
import NavbarDefault from "@/views/User/Navbar.vue";
import HeaderDefault from "@/views/User/Header.vue";
import FooterDefault from "@/views/User/FooterDefault.vue";
import { formatDate } from "@/util/dateformat";
import { ref } from "vue";
import Axios from "@/router/axios";

const discounts = ref(null);
const vouchers = ref(null);
const init = async () => {
  let statusReq = await check(Axios);
  if (statusReq == false) {
    toast.warning("Session login already expired");
    rounter.push({ name: "login" });
    return;
  }
  Axios.get("/discount-bill/get-current")
    .then((resp) => {
      discounts.value = resp.data.data[0];
    })
    .catch((err) => {});
  let token = readCookie("refresh_token");
  if (token) {
    let t = {
      token: token,
    };
    console.log(t);
    Axios.post("/voucher/get", t)
      .then((resp) => {
        vouchers.value = resp.data.data;
      })
      .catch((err) => {});
  }
  console.log(token);
};
const isExperied = (from, to) => {
  if (new Date() > new Date(from) && new Date() < new Date(to)) {
    return true;
  }
  return false;
};

const getColor = (st, from, to) => {
  if (!isExperied(from, to)) {
    return { "text-danger": true };
  }
  if (st) {
    console.log(st);
    return { "text-success": true };
  }
  return { "text-danger": true };
};
</script>
