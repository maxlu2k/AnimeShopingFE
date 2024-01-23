<template>
  <v-container>
    <v-col :xs="12">
      <v-sheet elevation="8" class="mb-4">
        <v-row no-gutters class="">
          <v-col cols="6">
            <v-card-title>
              <b class="float-start fs-7" style="color: #454995">
                Top Best Saler
              </b>
            </v-card-title>
          </v-col>
          <v-col cols="6">
            <VueDatePicker
              class="datePicker float-end float-end mt-2 mr-2 font-weight-bold"
              v-model="date"
              range
              format="yyyy-MM-dd"
              :enable-time-picker="false"
              @update:model-value="getTopSale()"
            ></VueDatePicker>
            <p
              class="float-end mt-2 mr-2 fs-6 font-weight-bold"
              style="color: #454995"
            >
              Chọn tháng năm:
            </p>
          </v-col>
        </v-row>
        <v-card>
          <v-table>
            <thead color="dark text-center">
              <tr class="text-center">
                <th scope="col">#</th>
                <th scope="col">Tên mô hình</th>
                <th scope="col">Số lượng (sp)</th>
                <th scope="col">Đơn giá (₫)</th>
                <th scope="col">Thành tiền (₫)</th>
              </tr>
            </thead>
            <tbody class="text-start">
              <tr v-for="(item, index) in paginatedItems" :key="item.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item.nameFigure }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.priceSale }}</td>
                <td>{{ item.totalPriSale }}</td>
              </tr>
            </tbody>
          </v-table>
          <v-sheet class="limit float-start text-center mt-1 ml-5">
            <p
              class="float-start font-weight-bold mt-2"
              style="color: #454995; margin: 0px; padding: 0px"
            >
              Size:
              <select v-model="selectedOption" @change="getTopSale">
                <option value="A">5</option>
                <option value="B">10</option>
                <option value="C">20</option>
              </select>
            </p>
            <nav
              aria-label=" navigation ml-2"
              v-if="this.ListRatesCurrent.length > 0"
            >
              <ul class="rounded-pill pagination font-weight-bold">
                <li
                  class="rounded-pill page-item"
                  :class="{ disabled: currentPage <= 1 }"
                >
                  <a
                    class="rounded-pill page-link page-next"
                    style="width: 80px"
                    @click="currentPage == 1 ? 1 : currentPage--"
                    >Prev</a
                  >
                </li>

                <li
                  style="width: 50px"
                  class="rounded-pill page-item"
                  v-for="item in displayedPages"
                  :key="item"
                >
                  <a
                    class="rounded-pill page-link"
                    :class="{ 'bg-secondary text-light': currentPage == item }"
                    @click="currentPage = item"
                    >{{ item }}</a
                  >
                </li>

                <li
                  class="rounded-pill page-item"
                  :class="{ disabled: currentPage >= pageCount }"
                >
                  <a
                    class="rounded-pill page-link page-next"
                    style="width: 80px"
                    @click="
                      currentPage == pageCount ? pageCount : currentPage++
                    "
                    >Next</a
                  >
                </li>
              </ul>
            </nav>
          </v-sheet>
        </v-card>
      </v-sheet>
    </v-col>
  </v-container>
</template>
<script>
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker"; //datepicker
import "@vuepic/vue-datepicker/dist/main.css"; //css
import numeral from "numeral";
import moment from "moment";
import check from "@/commons/jwt";
import axios from "@/router/axios.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  components: { VueDatePicker },
  data() {
    const toast = useToast();
    const router = useRouter();
    const date = ref();
    const endDate = new Date();
    const startDate = new Date();
    date.value = [startDate, endDate];
    const value = 5;
    return {
      character: {},
      date,
      tableData: [],
      list: [],
      endDate,
      startDate,
      selectedOption: "A",
      value,
      ListRatesCurrent: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  created() {
    this.getTopSale();
  },
  // async mounted() {
  //   const getCheckAdmin = await checkAdmin();
  //   if (getCheckAdmin == false) {
  //     this.$router.push({ name: "Products" });
  //   }
  // },
  computed: {
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
  methods: {
    checkAdmin() {
      let check = false;
      const access_token = { access_token: readCookie("access_token") };
      axios.post("/auth/confirm-isadmin", access_token).then((res) => {
        check = res.data;
        console.log(res.data);
      });
      return check;
    },
    async getTopSale() {
      let statusReq = await check(axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/pages/login" });
        return;
      }
      switch (this.selectedOption) {
        case "A":
          this.value = 5;
          this.itemsPerPage = 5;
          break;
        case "B":
          this.value = 10;
          this.itemsPerPage = 10;
          break;
        case "C":
          this.value = 20;
          this.itemsPerPage = 20;
          break;
      }
      if (this.date == null) {
        console.log(this.ListRatesCurrent);
        this.ListRatesCurrent = [];
      } else {
        const startDate = this.date[0].toISOString().slice(0, 10);
        const endDate = this.date[1].toISOString().slice(0, 10);
        axios
          .get(`/stats/top?startDate=${startDate}&endDate=${endDate}`)
          .then((response) => {
            const data = response.data;

            this.ListRatesCurrent = data;
            this.ListRatesCurrent.forEach((item) => {
              item.priceSale = numeral(item.priceSale).format("0,0");
              item.totalPriSale = numeral(item.totalPriSale).format("0,0");
            });
            console.log(data);
            console.log(startDate, endDate);
          })
          .catch((error) => {
            console.log("Lỗi ---");
          });
      }
    },
  },
};
</script>
<style>
.limit {
  margin-top: 7px;
}
.datePicker {
  margin-left: 10px;
  max-width: 280px;
}
.imgTop {
  transition: transform 0.2s;
  width: 100px;
}
.imgTop:hover {
  -ms-transform: scale(1.5); /* IE 9 */
  -webkit-transform: scale(1.5); /* Safari 3-8 */
  transform: scale(1.5);
}
</style>

<!-- <template>hello</template> -->
