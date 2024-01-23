<template>
  <v-container class="statis">
    <v-sheet elevation="8">
      <v-row no-gutters class="">
        <v-col cols="6">
          <div id="chart">
            <apexchart
              type="donut"
              width="450"
              :options="chartOptionPie"
              :series="seriePie"
            ></apexchart>
          </div>
        </v-col>
        <v-col cols="3">
          <v-row el class="">
            <p class="mt-5 fs-6 font-weight-bold" style="color: #454995">
              Chọn năm:
              <VueDatePicker
                class="datePicker float-start"
                v-model="selectedYear"
                year-picker
                placeholder="Select year"
                @update:model-value="show()"
              />
            </p>
          </v-row>
          <v-row class="">
            <p class="fs-6 font-weight-bold" style="color: #454995">
              Chọn ngày:
              <VueDatePicker
                class="datePicker float-start"
                v-model="date"
                range
                format="yyyy-MM-dd"
                placeholder="Select by date"
                :enable-time-picker="false"
                @update:model-value="showDate()"
              ></VueDatePicker>
            </p>
          </v-row>
        </v-col>
        <div cols="3">
          <div id="app" class="">
            <div class="dropdown">
              <button class="dropbtn">{{ selectedHand }}</button>
              <div class="dropdown-content">
                <a href="#" v-on:click="handleClick('Hôm nay')">Hôm nay</a>
                <a href="#" v-on:click="handleClick('Hôm qua')">Hôm qua</a>
                <a href="#" v-on:click="handleClick('7 ngày trước')"
                  >7 ngày trước</a
                >
                <a href="#" v-on:click="handleClick('1 tháng trước')"
                  >1 tháng trước</a
                >
                <a href="#" v-on:click="handleClick('1 năm trước')"
                  >1 năm trước</a
                >
                <a href="#" v-on:click="handleClick('2 năm trước')"
                  >2 năm trước</a
                >
              </div>
            </div>
          </div>
        </div>
      </v-row>
    </v-sheet>
    <br />

    <div
      data-bs-spy="scroll"
      data-bs-target="#navbar-example2"
      data-bs-offset="0"
      class="scrollspy-example"
      tabindex="0"
    ></div>
    <hr />
    <v-card elevation="8">
      <v-card-title style="color: #454995"
        ><b class="fs-7">THỐNG KÊ THEO THÁNG</b>
      </v-card-title>
      <div id="chart">
        <apexchart
          type="area"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </v-card>
    <br />
    <v-sheet elevation="8">
      <v-row no-gutters class="">
        <v-col cols="6">
          <v-card-title style="color: #454995"
            ><b class="fs-7">THỐNG KÊ THEO NGÀY</b>
          </v-card-title>
        </v-col>
        <v-col cols="6">
          <VueDatePicker
            class="datePickerMonth float-end mt-2 mr-2 font-weight-bold"
            v-model="month"
            month-picker
            format="yyyy-MM"
            placeholder="Select by month"
            @update:model-value="showMonth()"
          ></VueDatePicker>
          <p
            class="float-end mt-2 mr-2 fs-6 font-weight-bold"
            style="color: #454995"
          >
            Chọn tháng năm:
          </p>
        </v-col>
      </v-row>
      <div id="chart">
        <apexchart
          type="bar"
          height="350"
          :options="chartOptionsBar"
          :series="seriesBar"
        ></apexchart>
      </div>
    </v-sheet>
    <br />
    <v-sheet class="mt-5" elevation="8">
      <v-card-title style="color: #454995"
        ><b class="fs-7">SẢN PHẨM ĐÃ BÁN</b>
      </v-card-title>
      <v-table class="text-left">
        <thead color="dark">
          <tr class="">
            <th scope="col">STT</th>
            <th scope="col">Tên mô hình</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Ngày update</th>
            <th scope="col">Người tạo</th>
            <th scope="col">Số lượng (sp)</th>
            <th scope="col">Đơn giá (₫)</th>
            <th scope="col">Thành tiền (₫)</th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="(item, index) in paginatedItems" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ item.figure }}</td>
            <td>{{ item.createDate }}</td>
            <td>{{ item.updateDate }}</td>
            <td>{{ item.createBy }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.priceSale }}</td>
            <td>{{ item.priceMo }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-sheet class="limit float-start text-center mt-1">
        <p
          class="font-weight-bold"
          style="color: #454995; margin: 0px; padding: 0px"
        >
          Size:
          <select
            style="border: 1px solid black; border-radius: 8px"
            v-model="selectedOption"
            @change="selectComboTop"
          >
            <!-- itemA -->
            <option value="A">5</option>
            <option value="B">10</option>
            <option value="C">20</option>
          </select>
        </p>
      </v-sheet>
      <nav aria-label=" navigation " v-if="this.ListRatesCurrent.length > 0">
        <ul class="pagination text-center font-weight-bold">
          <li
            class="rounded-pill page-item"
            :class="{ disabled: currentPage <= 1 }"
          >
            <a
              class="rounded-pill page-link page-next"
              style="width: 80px"
              @click="currentPage == 1 ? 1 : currentPage--"
              >Previous</a
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
              @click="currentPage == pageCount ? pageCount : currentPage++"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </v-sheet>
    <br />
  </v-container>
</template>
<script>
import numeral from "numeral";
import moment from "moment";
import check from "@/commons/jwt";
import axios from "@/router/axios.js";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

import { ref } from "vue";
export default {
  data() {
    const toast = useToast();
    const router = useRouter();
    const date = ref();
    const endDate = new Date();
    const startDate = new Date();
    date.value = [startDate, endDate];
    const value = 5;
    const month = ref({
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
    return {
      selectedYear: null,
      chartData: {},
      chartArena: {},
      date: [],
      month,
      arrMoney: [],
      revenue: 0,
      revenueCost: 0,
      revenueExpense: 0,
      selectedDate: null,
      list: [],
      selectedOption: "C",
      value,
      selectedHand: "Hôm nay",
      options: {},
      series: [],
      chartOptions: {},
      chartOptionPie: {},
      seriePie: [],
      series2: [],
      chartOptions2: {},
      chartOptionsBar: {},
      seriesBar: [],
      start_date: "2021-02-16",
      end_date: "2021-06-17", //biến test
      labels: [],
      monthlyData: [],
      ListRatesCurrent: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  created() {
    // this.refresh()
    // this.handleClick("Hôm nay");
    this.showMonth();
    this.chartAnother();
    this.chartAnotheraa();
  },
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
    formatMoney(val) {
      return numeral(val).format("0.0");
    },
    chartAnother() {
      (this.series = [
        {
          name: "Doanh thu",
          // type: 'column',
          data: [0, 0, 0],
          // 6000000, 5000000, 4000000, 5000000, 5000000, 6000000, 8000000,
          //   7000000, 4000000, 6000000, 7000000, 7000000,
          // data: doanhThu,
        },
        {
          name: "Giá vốn",
          // type: 'area',
          // data: loiNhuan,
          data: [0, 0, 0],
        },
        {
          name: "Lợi nhuận",
          // type: 'line',
          // data: giaVon,
          data: [0, 0, 0],
        },
        {
          name: "Số lượng bán",
          // data: soLuongBan,
          data: [0, 0, 0],
        },
      ]),
        (this.chartOptions = {
          chart: {
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "date",
            categories: [
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 4",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ],
          },
          tooltip: {
            y: [
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return val + " sp";
                },
              },
            ],
          },
        });
    },
    chartAnotheraa() {
      this.seriesBar = [
        {
          name: "Doanh thu",
          // type: 'column',
          data: [
            2000000, 3000000, 5000000, 3000000, 2000000, 3000000, 1000000,
            2000000, 4000000, 5000000, 2000000, 1000000,
          ],
          // data: doanhThu,
        },
        {
          name: "Giá vốn",
          // type: 'area',
          // data: loiNhuan,
          data: [
            2000000, 3000000, 5000000, 3000000, 2000000, 3000000, 1000000,
            2000000, 4000000, 5000000, 2000000, 1000000,
          ],
        },
        {
          name: "Lợi nhuận",
          // type: 'line',
          // data: giaVon,
          data: [
            2000000, 3000000, 5000000, 3000000, 2000000, 3000000, 1000000,
            2000000, 4000000, 5000000, 2000000, 1000000,
          ],
        },
        {
          name: "Số lượng bán",
          // data: soLuongBan,
          data: [1, 2, 3, 4, 2, 4, 5, 3, 5, 5, 6, 6],
        },
      ];
      this.chartOptionsBar = {
        chart: {
          type: "bar",
          height: 500,
          stacked: true,
          toolbar: {
            show: false,
          },
          autoSelected: "zoomin",
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
        },
        yaxis: {
          title: {
            text: "VNĐ",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: [
            {
              formatter: function (val) {
                return numeral(val).format("0,0") + " VNĐ";
              },
            },
            {
              formatter: function (val) {
                return numeral(val).format("0,0") + " VNĐ";
              },
            },
            {
              formatter: function (val) {
                return numeral(val).format("0,0") + " VNĐ";
              },
            },
            {
              formatter: function (val) {
                return val + " sp";
              },
            },
          ],
        },
      };
    },
    chartBarDefault() {
      this.seriesBar = [
        {
          name: "Doanh thu",
          // type: 'column',
          data: [0],
        },
        {
          name: "Giá vốn",
          // type: 'area',
          data: [0],
        },
        {
          name: "Lợi nhuận",
          // type: 'line',
          data: [0],
        },
        {
          name: "Số lượng bán",
          // type: 'line',
          data: [0],
        },
      ];
      //[2000000, 3000000, 5000000, 3000000, 2000000, 3000000, 1000000, 2000000, 4000000, 5000000, 2000000, 1000000],
      // [1, 2, 3, 4, 2, 3, 1, 2, 4, 5, 2, 1, 2, 3, 4, 1, 5, 2, 5, 2, 2, 3, 4,5, 2, 1, 4, 5, 2, 5, 0,]
      this.chartOptionsBar = {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
          },
          zoom: { enabled: true },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          tickPlacement: "on",
          tickAmount: 25,
          categories: ["-"],
        },
        yaxis: {
          title: {
            text: "$",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          shared: true,
          intersect: true,
        },
      };
    },
    showMonth() {
      if (this.month == null) {
        this.chartBarDefault();
        this.ListRatesCurrent = [];
        // alert('lỗi')
      } else {
        const monthYear = `${this.month.year}-${this.month.month + 1}`;
        const date = new Date(`${monthYear}-01`);
        const firstDay = date.getDate();
        const lastDay = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();
        const yearStart = this.month.year;
        const monthStart = (this.month.month + 1).toString().padStart(2, "0");
        const dayStart = firstDay.toString().padStart(2, "0");
        const yearEnd = this.month.year;
        const monthEnd = (this.month.month + 1).toString().padStart(2, "0");
        const dayEnd = lastDay.toString().padStart(2, "0");
        const startDate = `${yearStart}-${monthStart}-${dayStart}`;
        const endDate = `${yearEnd}-${monthEnd}-${dayEnd}`;
        // console.log(startDate + ' ngày đầu')
        // console.log(endDate + ' ngày cuói')
        this.chartBarApex(startDate, endDate);
        this.tableDetail(startDate, endDate);
        // this.itemsPerPage = 1;
        this.selectedYear = null;
        this.date = null;
        this.handleClick("Chọn");
      }
    },
    convertDate(convDate) {
      const unixTimestamp = convDate;
      const dateObj = new Date(unixTimestamp * 1000); // lưu ý rằng giá trị Unix timestamp được tính bằng số giây, cần nhân cho 1000 để chuyển sang số miligiây
      const dateString = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;
      // console.log(dateString) // kết quả: "2021-04-20"
    },
    async chartBarApex(a, b) {
      let statusReq = await check(axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/pages/login" });
        return;
      }
      const start = new Date(this.start_date);
      const end = new Date(this.end_date);
      const startApi = start.toISOString().slice(0, 10);
      const endApi = end.toISOString().slice(0, 10);
      // console.log(startApi)
      // console.log(endApi)
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const label = `${year}-${month}-${day}`;
        this.labels.push({
          date: label,
          sumPriceSales: 0,
          sumPriceProfit: 0,
          sumPriceCost: 0,
        });
      }
      let doanhThu = [];
      let giaVon = [];
      let loiNhuan = [];
      let cacNgay = [];
      let soLuongBan = [];
      axios
        .get(`/stats/getAllDay?startDate=${a}&endDate=${b}`)
        .then((res) => {
          res.data.forEach((item) => {
            const index = this.labels.findIndex(
              (label) =>
                label.date === moment(item.dateColum).format("YYYY-MM-DD")
            );
            if (index !== -1) {
              (this.labels[index].sumPriceSales = item.sumPriceSales),
                (this.labels[index].sumPriceProfit = item.sumPriceProfit),
                (this.labels[index].sumPriceCost = item.sumPriceCost);
            }
          });
          res.data.forEach((item) => {
            // ngayGoc.push(moment(item.dateColum).format('YYYY-MM-DD'))
            doanhThu.push(item.sumPriceSales);
            cacNgay.push(moment(item.dateColum).format("YYYY-MM-DD"));
            giaVon.push(item.sumPriceCost);
            loiNhuan.push(item.sumPriceProfit);
            soLuongBan.push(item.amount);
          });
          // doanhThu = res.data.map((item) => {
          //   return numeral(item.sumPriceSales).format('0.0')
          // })
          // console.log(doanhThu)
          // this.labels.forEach((item) => {
          //   doanhThu.push(item.sumPriceSales)
          //   cacNgay.push(item.date)
          //   giaVon.push(item.sumPriceCost)
          //   loiNhuan.push(item.sumPriceProfit)
          // })

          // console.log(doanhThu + ' doanh thu +++++')
          // console.log(giaVon + ' giá vốn -------')
          // console.log(loiNhuan + ' Lợi nhuận +++++')
          //.....
          this.seriesBar = [
            {
              name: "Doanh thu",
              // type: 'column',
              data: doanhThu,
            },
            {
              name: "Giá vốn",
              // type: 'area',
              data: loiNhuan,
            },
            {
              name: "Lợi nhuận",
              // type: 'line',
              data: giaVon,
            },
            {
              name: "Số lượng bán",
              data: soLuongBan,
            },
          ];
          this.chartOptionsBar = {
            chart: {
              type: "bar",
              height: 500,
              stacked: true,
              toolbar: {
                show: false,
              },
              autoSelected: "zoomin",
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded",
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: true,
              width: 2,
              colors: ["transparent"],
            },
            xaxis: {
              categories: cacNgay,
            },
            yaxis: {
              title: {
                text: "VNĐ",
              },
            },
            fill: {
              opacity: 1,
            },
            tooltip: {
              shared: true,
              intersect: false,
              y: [
                {
                  formatter: function (val) {
                    return numeral(val).format("0,0") + " VNĐ";
                  },
                },
                {
                  formatter: function (val) {
                    return numeral(val).format("0,0") + " VNĐ";
                  },
                },
                {
                  formatter: function (val) {
                    return numeral(val).format("0,0") + " VNĐ";
                  },
                },
                {
                  formatter: function (val) {
                    return val + " sp";
                  },
                },
              ],
            },
          };
        })
        .catch((error) => {
          alert(error);
        });
    },

    chartBarApexDefault() {
      this.seriesBar = [
        {
          name: "Doanh thu",
          type: "column",
          data: [0, 0, 0, 0, 0, 0],
        },
        {
          name: "Số lượng bán",
          type: "column",
          data: [0, 0, 0, 0, 0, 0],
        },
      ];
      this.chartOptionsBar = {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: [0, 2],
        },
        title: {
          text: "VND",
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: ["", ""],
        xaxis: {
          type: "date",
        },
        yaxis: [
          {
            title: {
              text: "",
            },
          },
          {
            opposite: true,
            title: {
              text: "SỐ LƯỢNG BÁN",
            },
          },
        ],
        tooltip: {
          enabled: true,
          shared: true,
          intersect: true,
        },
      };
    },
    // chartArenaApex() {
    //   this.chartArena = {
    //     labels: [
    //       'Tổng Doanh Thu',
    //       'Tổng Giá Vốn',
    //       'Tổng Lợi Nhuận',
    //       'Số lượng',
    //     ],
    //     datasets: [
    //       {
    //         backgroundColor: ['#008ffb', '#00e396', '#feb019', '#ff4560'],
    //         data: [0, 0, 0, 0],
    //       },
    //     ],
    //   }
    // },

    //biểu đồ pie donut
    chartArenaApex(pieData) {
      (this.seriePie = pieData),
        (this.chartOptionPie = {
          chart: {
            width: 450,
            type: "donut",
          },
          labels: [
            "Tông doanh thu",
            "Tổng giá vốn",
            "Tổng lợi nhuận",
            "Tổng sản phẩm bán",
          ],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  value: {
                    show: true,
                    formatter: function (val) {
                      return numeral(val).format("0,0");
                    },
                  },
                },
              },
            },
          },
          dataLabels: {
            enabled: true,
          },
          tooltip: {
            y: [
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return val + " Sản phẩm";
                },
              },
            ],
          },
        });
    },
    chartLineApex(priceArray, cost, expense, amountq) {
      (this.series = [
        {
          name: "Doanh Thu",
          data: priceArray,
        },
        {
          name: "Giá vốn",
          data: cost,
        },
        {
          name: "Lợi nhuận",
          data: expense,
        },
        {
          name: "Số lượng bán",
          data: amountq,
        },
      ]),
        (this.chartOptions = {
          chart: {
            toolbar: {
              show: true,
            },
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "month",
            categories: [
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 4",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ],
          },
          tooltip: {
            y: [
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return val + " sp";
                },
              },
            ],
          },
        });
    },
    chartApex() {
      (this.series = [
        {
          name: "Doanh Thu",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Giá vốn",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "Lợi nhuận",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ]),
        (this.chartOptions = {
          chart: {
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: [
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 4",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ],
          },
          tooltip: {
            y: [
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return numeral(val).format("0,0") + " VNĐ";
                },
              },
              {
                formatter: function (val) {
                  return val + " sp";
                },
              },
            ],
          },
        });
    },
    addDays(theDate, days) {
      return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    },
    handleClick: function (chooses) {
      if (chooses == "Hôm qua") {
        this.selectedHand = chooses;
        const startDate = this.addDays(new Date(), 0)
          .toISOString()
          .slice(0, 10);
        const endDate = this.addDays(new Date(), 0).toISOString().slice(0, 10);
        console.log(startDate + "  Hôm qua  " + endDate);
        this.selectedYear = null;
        this.date = null;
        this.chooseDate(startDate, endDate);
        this.tableDetail(startDate, endDate);
        // this.chartBarApex(startDate, endDate)
      } else if (chooses == "Hôm nay") {
        this.selectedHand = chooses;
        const startDate = this.addDays(new Date(), +1)
          .toISOString()
          .slice(0, 10);
        const endDate = this.addDays(new Date(), +1).toISOString().slice(0, 10);
        console.log(startDate + "  Hôm nay  " + endDate);
        this.selectedYear = null;
        this.date = null;
        this.chooseDate(startDate, endDate);
        this.tableDetail(startDate, endDate);
        // this.chartBarApex(startDate, endDate)
      } else if (chooses == "7 ngày trước") {
        this.selectedHand = chooses;
        const startDate = this.addDays(new Date(), -6)
          .toISOString()
          .slice(0, 10);
        const endDate = this.addDays(new Date(), -6).toISOString().slice(0, 10);
        console.log(startDate + "  7 ngày trước  " + endDate);
        this.selectedYear = null;
        this.date = null;
        this.chooseDate(startDate, endDate);
        this.tableDetail(startDate, endDate);
        // this.chartBarApex(startDate, endDate)
      } else if (chooses == "1 tháng trước") {
        this.selectedHand = chooses;
        const day = new Date();
        day.setMonth(new Date().getMonth() - 1);
        const startDate = day.toISOString().slice(0, 10);
        const endDate = day.toISOString().slice(0, 10);
        console.log(startDate + "  1 tháng trước  " + endDate);
        this.selectedYear = null;
        this.date = null;
        this.chooseDate(startDate, endDate);
        this.tableDetail(startDate, endDate);
        // this.chartBarApex(startDate, endDate)
      } else if (chooses == "1 năm trước") {
        this.selectedHand = chooses;
        const startDate = this.addDays(new Date(), -364)
          .toISOString()
          .slice(0, 10);
        const endDate = this.addDays(new Date(), -364)
          .toISOString()
          .slice(0, 10);
        console.log(startDate + "  1 năm trước  " + endDate);
        this.selectedYear = null;
        this.date = null;
        this.chooseDate(startDate, endDate);
        this.tableDetail(startDate, endDate);
        // this.chartBarApex(startDate, endDate)
      } else if (chooses == "2 năm trước") {
        this.selectedHand = chooses;
        const startDate = this.addDays(new Date(), -729)
          .toISOString()
          .slice(0, 10);
        const endDate = this.addDays(new Date(), -729)
          .toISOString()
          .slice(0, 10);
        console.log(startDate + "  2 năm trước  " + endDate);
        this.selectedYear = null;
        this.date = null;
        this.chooseDate(startDate, endDate);
        this.tableDetail(startDate, endDate);
        // this.chartBarApex(startDate, endDate)
      } else {
        this.errorShow();
      }
    },

    //-----------------------------------------------------------------------------------------------------------------------------------------
    async show() {
      let statusReq = await check(axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/pages/login" });
        return;
      }
      let priceArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let cost = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let expense = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let amountq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const te = this.selectedYear;
      this.date = null;
      axios
        .get("/stats/doanhThuChonNam", { params: { year: te } })
        .then((res) => {
          if (res.data[0] == null) {
            this.errorShow(); //hiển thị khi data null
            this.ListRatesCurrent = [];
          } else {
            const responseData = res.data;
            const monthlyData = [];
            console.log(responseData);
            for (let i = 1; i <= 12; i++) {
              const filteredData = responseData.filter(
                (data) => data.thang === i
              );

              if (filteredData.length > 0) {
                const doanhThuTong = filteredData.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.doanhThu,
                  0
                );
                const giaVonTong = filteredData.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.giaVon,
                  0
                );
                const giaLoiNhuan = filteredData.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.loiNhuan,
                  0
                );
                const soLuongSp = filteredData.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.slDaBan,
                  0
                );
                monthlyData.push({
                  month: i,
                  doanhThuTong,
                  giaLoiNhuan,
                  giaVonTong,
                  soLuongSp,
                });
              }
            }
            this.monthlyData = monthlyData;
            console.log(this.monthlyData);
            this.monthlyData.forEach((item) => {
              let month = item.month - 1;
              priceArray[month] = item.doanhThuTong;
              cost[month] = item.giaVonTong;
              expense[month] = item.giaLoiNhuan;
              amountq[month] = item.soLuongSp;
              console.log(month);
            });
            // console.log("doanh thu theo 12 tháng");
            // console.log(priceArray);
            const sum = priceArray.reduce((total, current) => {
              return total + current;
            }, 0);
            // console.log("Tổng doanh thu gộp 12 tháng " + sum);
            const sumCost = cost.reduce((total, current) => {
              return total + current;
            }, 0);
            const sumExpense = expense.reduce((total, current) => {
              return total + current;
            }, 0);
            const sumAmountq = amountq.reduce((total, current) => {
              return total + current;
            }, 0);
            const dataArena = [sum, sumCost, sumExpense, sumAmountq];
            this.chartArenaApex(dataArena);
            this.chartLineApex(priceArray, cost, expense, amountq);

            const startDateNotFm = new Date(this.selectedYear, 0, 1);
            startDateNotFm.setDate(startDateNotFm.getDate() + 1);
            const endDateNotFm = new Date(this.selectedYear, 11, 31);
            endDateNotFm.setDate(endDateNotFm.getDate() + 1);
            const startDate = startDateNotFm.toISOString().slice(0, 10);
            const endDate = endDateNotFm.toISOString().slice(0, 10);
            this.tableDetail(startDate, endDate);
            console.log(startDate + " Show " + endDate);
            this.selectedHand = "Chọn";
            this.month = null;
            this.chartBarDefault();
          }
          //.....
        })
        .catch((error) => {
          this.errorShow();
          alert("lỗi ---" + error);
        });
    },

    //-----------------------------------------------------------------------------------------------------------------------------------------
    async showDate() {
      let statusReq = await check(axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/pages/login" });
        return;
      }
      let priceArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let cost = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let expense = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let amountq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (this.date == null) {
        this.errorShow();
        this.ListRatesCurrent = [];
      } else if (this.date[1] == null) {
        this.errorShow();
        this.ListRatesCurrent = [];
      } else {
        this.selectedYear = null;
        const oldateA = new Date(this.date[0]);
        oldateA.setDate(oldateA.getDate() + 1); //cộng thêm một ngày
        const oldateB = new Date(this.date[1]);
        oldateB.setDate(oldateB.getDate() + 1); //cộng thêm một ngày
        const a = oldateA.toISOString().slice(0, 10);
        const b = oldateB.toISOString().slice(0, 10);
        axios
          .get(`/stats/doanhthu?startDate=${a}&endDate=${b}`)
          .then((res) => {
            if (res.data[0] == null) {
              this.errorShow();
              // console.log('Không có dữ liệu trong khoảng chọn')
            } else {
              const responseData = res.data;
              const monthlyData = [];

              for (let i = 1; i <= 12; i++) {
                const filteredData = responseData.filter(
                  (data) => data.thang === i
                );

                if (filteredData.length > 0) {
                  const doanhThuTong = filteredData.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.doanhThu,
                    0
                  );
                  const giaVonTong = filteredData.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.giaVon,
                    0
                  );
                  const giaLoiNhuan = filteredData.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.loiNhuan,
                    0
                  );
                  const soLuongSp = filteredData.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.slDaBan,
                    0
                  );

                  monthlyData.push({
                    month: i,
                    doanhThuTong,
                    giaLoiNhuan,
                    giaVonTong,
                    soLuongSp,
                  });
                }
              }

              this.monthlyData = monthlyData;
              console.log(this.monthlyData);
              this.monthlyData.forEach((item) => {
                let month = item.month - 1;
                priceArray[month] = item.doanhThuTong;
                cost[month] = item.giaVonTong;
                expense[month] = item.giaLoiNhuan;
                amountq[month] = item.soLuongSp;
              });
              console.log(priceArray);
              const sum = priceArray.reduce((total, current) => {
                return total + current;
              }, 0);
              const sumCost = cost.reduce((total, current) => {
                return total + current;
              }, 0);
              const sumExpense = expense.reduce((total, current) => {
                return total + current;
              }, 0);
              const sumAmountq = amountq.reduce((total, current) => {
                return total + current;
              }, 0);
              const dataArena = [sum, sumCost, sumExpense, sumAmountq];
              console.log(dataArena);
              this.chartArenaApex(dataArena);
              this.chartLineApex(priceArray, cost, expense, amountq);
              this.selectedHand = "Chọn";
              this.tableDetail(a, b);
              this.month = null;
              this.chartBarDefault();
              // this.chartBarApex(a, b);
            }
          })
          .catch((error) => {
            this.errorShow();
            alert("Lỗi: " + error);
          });
      }
    },
    errorShow() {
      this.selectedHand = "Chọn";
      this.chartOptionPie = {};
      (this.seriePie = []), this.chartApex();
      // this.chartBarApexDefault()
      this.list = null;
      console.log("lỗi combobox");
    },
    async tableDetail(a, b) {
      let statusReq = await check(axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/pages/login" });
        return;
      }
      axios
        .get(`/stats/inDetail?startDate=${a}&endDate=${b}`)
        .then((response) => {
          const data = response.data;
          // this.list = data;
          this.ListRatesCurrent = data;
          this.ListRatesCurrent.forEach((item) => {
            const date2 = new Date(item.createDate);
            const year = date2.getFullYear();
            const month = ("0" + (date2.getMonth() + 1)).slice(-2);
            const day = ("0" + date2.getDate()).slice(-2);
            const hours = ("0" + date2.getHours()).slice(-2);
            const minutes = ("0" + date2.getMinutes()).slice(-2);
            const seconds = ("0" + date2.getSeconds()).slice(-2);
            item.createDate = `${year}-${month}-${day} || ${hours}:${minutes}:${seconds}`;
            //
            const date3 = new Date(item.updateDate);
            const year1 = date3.getFullYear();
            const month1 = ("0" + (date3.getMonth() + 1)).slice(-2);
            const day1 = ("0" + date3.getDate()).slice(-2);
            const hours1 = ("0" + date3.getHours()).slice(-2);
            const minutes1 = ("0" + date3.getMinutes()).slice(-2);
            const seconds1 = ("0" + date3.getSeconds()).slice(-2);
            item.updateDate = `${year1}-${month1}-${day1} || ${hours1}:${minutes1}:${seconds1}`;
            console.log(item.updateDate);
            console.log(item.createDate);
            item.priceSale = numeral(item.priceSale).format("0,0");
            item.priceMo = numeral(item.priceMo).format("0,0");
          });

          // console.log('Giá trị a là: ' + a)
          // console.log('Giá trị b là: ' + b)
        })
        .catch((error) => {
          // console.log('Lỗi ---' + error)
        });
    },
    selectComboTop() {
      switch (this.selectedOption) {
        case "A":
          this.value = 5;
          this.itemsPerPage = 5; //itemA
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
      this.$emit("option-selected", this.value);
      if (this.selectedYear != null) {
        // alert('Chọn theo năm ' + this.selectedYear)
        this.show();
      } else if (this.date != null) {
        // alert('Chọn khoảng ngày ' + this.date)
        this.showDate();
      } else if (this.selectedHand === "Hôm nay") {
        this.handleClick("Hôm nay");
        // Do something
      } else if (this.selectedHand === "Hôm qua") {
        this.handleClick("Hôm qua");
        // Do something
      } else if (this.selectedHand === "7 ngày trước") {
        this.handleClick("7 ngày trước");
        // Do something
      } else if (this.selectedHand === "1 tháng trước") {
        this.handleClick("1 tháng trước");
        // Do something
      } else if (this.selectedHand === "1 năm trước") {
        this.handleClick("1 năm trước");
        // Do something
      } else if (this.selectedHand === "2 năm trước") {
        this.handleClick("2 năm trước");
      } else {
        // console.log('không có giá trị nào được chọn')
      }
    },
    handleChartClick() {
      // Handle chart click event
      // // console.log(`Clicked on column ${index}`)
      this.$router.push("/Stats/TopSale");
    },
    async chooseDate(a, b) {
      let statusReq = await check(axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/pages/login" });
        return;
      }
      let priceArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let cost = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let expense = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let amountq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      axios
        .get(`/stats/doanhthu?startDate=${a}&endDate=${b}`)
        .then((res) => {
          if (res.data[0] == null) {
            this.errorShow();
            // console.log('Không có dữ liệu trong khoảng chọn')
          } else {
            const responseData = res.data;
            const monthlyData = [];

            for (let i = 1; i <= 12; i++) {
              const filteredData = responseData.filter(
                (data) => data.thang === i
              );

              if (filteredData.length > 0) {
                const doanhThuTong = filteredData.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.doanhThu,
                  0
                );
                const giaVonTong = filteredData.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.giaVon,
                  0
                );
                const giaLoiNhuan = filteredData.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.loiNhuan,
                  0
                );
                const soLuongSp = filteredData.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.slDaBan,
                  0
                );

                monthlyData.push({
                  month: i,
                  doanhThuTong,
                  giaLoiNhuan,
                  giaVonTong,
                  soLuongSp,
                });
              }
            }

            this.monthlyData = monthlyData;
            console.log(this.monthlyData);
            this.monthlyData.forEach((item) => {
              let month = item.month - 1;
              priceArray[month] = item.doanhThuTong;
              cost[month] = item.giaVonTong;
              expense[month] = item.giaLoiNhuan;
              amountq[month] = item.soLuongSp;
            });
            console.log(priceArray);
            const sum = priceArray.reduce((total, current) => {
              return total + current;
            }, 0);
            const sumCost = cost.reduce((total, current) => {
              return total + current;
            }, 0);
            const sumExpense = expense.reduce((total, current) => {
              return total + current;
            }, 0);
            const sumAmountq = amountq.reduce((total, current) => {
              return total + current;
            }, 0);
            const dataArena = [sum, sumCost, sumExpense, sumAmountq];
            console.log(dataArena);
            this.chartArenaApex(dataArena);
            this.chartLineApex(priceArray, cost, expense, amountq);
            // this.selectedHand = "Chọn";
            this.tableDetail(a, b);
            console.log(a);
            console.log(b);
            console.log(this.tableDetail(a, b));
            this.month = null;
            this.chartBarDefault();
            // this.chartBarApex(a, b);
          }
        })
        .catch((error) => {
          this.chartArenaApex();
          this.chartApex();
          // this.chartBarApexDefault()
          alert("Lỗi: " + error);
        });
    },
  },
};
</script>
<style>
.statis .datePicker {
  max-width: 280px;
}
.statis .datePickerMonth {
  max-width: 180px;
}
.statis .btRefresh:hover {
  background-color: #3d00ff;
  color: white;
}
.statis .btRefresh {
  border: 1px solid #3d00ff;
  color: #3d00ff;
}
.statis .limit {
  margin-left: 10px;
}
.statis .chartArenaClass {
  max-width: 400px;
}
.statis #app {
  margin-top: 45px;
}
.statis .dropbtn {
  width: 200px;
  border-radius: 8px;
  background-color: white;
  color: #3d00ff;
  padding: 6px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.statis .dropdown {
  border-radius: 8px;
  border: 2px solid #3d00ff;
  position: relative;
  display: inline-block;
}

.statis .dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.statis .dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  max-height: 60px;
  display: block;
}

.statis .dropdown-content a:hover {
  background-color: #f1f1f1;
}

.statis .dropdown:hover .dropdown-content {
  display: block;
}

.statis .dropdown:hover .dropbtn {
  color: #f1f1f1;
  background-color: #3d00ff;
}
.statis .boder_li {
  border-radius: 8px;
}
</style>
