<template>
  <v-container fluid>
    <v-sheet>
      <VRow>
        <VCol class="d-flex">
          <v-btn class="me-auto" color="success" @click="newAccount"
            >Tạo mới</v-btn
          >
        </VCol>
        <div class="row col-md-5">
          <v-text-field placeholder="Name"></v-text-field>
        </div>
        <!-- <div class="row col-md-2">
          <v-btn
            variant="outlined"
            style="margin-left: 550px"
            color="success"
            @click="newAccount"
            >Create New</v-btn
          >
        </div> -->
      </VRow>
    </v-sheet>
    <!-- Bang dulieu  -->
    <v-table borderd hover>
      <thead>
        <tr>
          <th class="text-left" scope="col">Tài khoản</th>
          <th class="text-left" scope="col">Họ Tên</th>
          <th class="text-left" scope="col">Email</th>
          <th class="text-left" scope="col">SĐT</th>
          <th class="text-left" scope="col">Sinh nhật</th>
          <th class="text-left" scope="col">Vai trò</th>
          <!-- <th scope="col">Hành động</th> -->

          <!-- <th scope="col">HÌNH ẢNH</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in accounts?.data" :key="item.userName">
          <td>{{ item.userName }}</td>
          <td>{{ item.fullname }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ TodayDateV2(new Date(item.birthday)) }}</td>
          <td>
            <!-- {{ item.role === 1 ? 'ADMIN' : item.role === 2 ? 'USER' : 'CLIENT' }} -->
            {{ castIdToName(item.accountRoleEntities) }}
          </td>
          <!-- <td>
            <CButton
              color="yellow"
              @click="edit(item.id)"
              >Edit</CButton
            >
          </td> -->
          <!-- <td
            ><img style="width: 80px" :src="item.urlImg" alt=""
          /></td> -->
        </tr>
      </tbody>
    </v-table>
    <!-- phan trang  -->
    <div class="row mx-0 d-flex align-items-center justify-content-center">
      <vue-awesome-paginate
        v-if="accounts != null"
        class="col col-md-6"
        :total-items="accounts?.totalRecords || 0"
        :items-per-page="accounts?.pageSize || 1"
        :max-pages-shown="5"
        v-model="page"
        :on-click="onClickHandler"
      />
      <p
        v-if="accounts != null"
        class="col col-md-4 current_page_message d-flex justify-content-end align-items-center ms-auto"
      >
        {{
          accounts?.beginIndex +
          1 +
          "-" +
          accounts?.endIndex +
          " of " +
          accounts?.totalRecords
        }}
      </p>
      <div class="col col-md-2" v-if="accounts != null">
        <v-select
          :options="options"
          class="ms-3"
          style="max-width: 100px; max-height: 40px"
          :model-value="pageSize + ''"
          v-model:model-value="pageSize"
          @update:modelValue="getData"
        />
      </div>
    </div>
    <!-- Form nhap lieu -->
    <v-sheet>
      <v-dialog v-model="lgDemo">
        <v-card>
          <v-card-title class="text-h5"> New Account </v-card-title>
          <v-card-text>
            <v-container>
              <v-form @submit.prevent ref="form">
                <div class="row mb-4 mt-3">
                  <div class="col-md-6">
                    <label>Tên đăng nhập</label>
                    <v-text-field
                      :rules="nameValidate"
                      type="text"
                      placeholder="UserName"
                      v-model="account.userName"
                    />
                  </div>
                  <div class="col-md-6">
                    <label>Mật khẩu</label>
                    <v-text-field
                    :rules="passWordValidate"
                      type="password"
                      placeholder="Password"
                      v-model="account.password"
                    />
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-6">
                    <label>Họ và tên</label>
                    <v-text-field
                      :rules="fullNameValidate"
                      type="text"
                      placeholder="Full Name"
                      v-model="account.fullname"
                    />
                  </div>
                  <div class="col-md-6">
                    <label>Email</label>
                    <v-text-field
                    :rules="emailValidate"
                      type="email"
                      placeholder="Email"
                      v-model="account.email"
                    />
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col-md-6">
                    <label>Số điện thoại</label>
                    <v-text-field
                    :rules="phoneValidate"
                      placeholder="Phone"
                      v-model="account.phone"
                    />
                  </div>
                  <div class="col-md-6">
                    <label>Birth Day</label>
                    <v-text-field
                      type="Date"
                      placeholder="Birth Day"
                      v-model="account.birthday"
                    />
                  </div>
                </div>
                <div class="row mb-4">
                  <!-- <div class="col-md-6">
              <CFormLabel>Choose Image</CFormLabel>
              <CFormInput
                type="file"
                id="customFile"
                name="myFile"
                @change="handleFileUpload"
              />
            </div> -->
                </div>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="lgDemo = false"
            >
              Close
            </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="createAccount">
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-sheet>
  </v-container>
</template>
  <script setup>
import { onMounted, ref } from "vue";
import Axios from "@/router/axios";
import { TodayDateV2 } from "@/commons/util";
import check from "@/commons/jwt";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
const toast = useToast();
const rounter = useRouter();
const lgDemo = ref(false);

let accounts = ref(null);
let action = ref("Create Account");
let pageSize = ref(5);
let page = ref(1);
const options = ref([
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
]);
let account = ref({
  userName: null,
  fullname: null,
  email: null,
  phone: null,
  status: null,
  urlImg: null,
  birthday: null,
  role: null,
  // img: [],
});

const nameValidate = [
  (val) => {
    if (val == null) {
      return "Tên đăng nhập từ 1-30 kí tự";
    } else if (val.length > 1 && val.length < 30) {
      return true;
    } else {
      return "Tên đăng nhập từ 1-30 kí tự";
    }
  },
];

const passWordValidate = [
(val) => {
    if (val) return true
      return "Vui lòng nhập mật khẩu !";
    },
    (val) =>{ if (val.length < 5 || val.length > 30) {
      return "Mật khẩu từ 5-30 ký tự !";
    } else {
      return true;
    }
  },
];

const fullNameValidate = [
  (val) => {
    if (val == null) {
      return "Họ và tên từ 1-25 kí tự !";
    } else if (val.length > 1 && val.length < 25) {
      return true;
    } else {
      return "Họ và tên từ 1-25 kí tự !";
    }
  },
];
const mail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const emailValidate = [
  (val) => {
    if (val) return true
      return "Vui lòng nhập email";
    },
    (val) =>{ if (val.match(mail)) {
      return true;
    } else {
      return "Email khong hợp lệ !";
    }
  },
];
const phoneValidate = [
  (val) => {
    if (val) return true;
    return "Vui lòng nhập số điện thoại";
  },
  (val) => {
    if (val.match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)) {
      return true;
    } else {
      return "Số điện thoại không hợp lệ !";
    }
  },
];

const onClickHandler = (page) => {
  getData();
};

// async mounted() {
//   const getCheckAdmin = await checkAdmin()
//     if (getCheckAdmin == false) {
//       this.$router.push({ name: 'Products' })
//     }
// }

function checkAdmin() {
  let check = false;
  const access_token = { access_token: readCookie("access_token") };
  Axios.post("/auth/confirm-isadmin", access_token).then((res) => {
    check = res.data;
    console.log(res.data);
  });
  return check;
}

function castIdToName(namesss) {
  let roles = [];
  namesss.map((item, index) => {
    let role =
      item.roleId === 1 ? "ADMIN" : item.roleId === 2 ? "USER" : "CLIENT";
    roles.push(role);
  });
  return roles.toString();
}

const getData = async () => {
  let statusReq = await check(Axios);
  if (statusReq == false) {
    toast.warning("Session login already expired");
    rounter.push({ path: "/pages/login" });
    return;
  }
  Axios.get("/account/getAll", {
    params: {
      page: page.value - 1,
      size: pageSize.value,
    },
  })
    .then(function (resp) {
      accounts.value = resp.data;
      console.log(resp.data);
    })
    .catch(function (rejected) {
      alert("Có lỗi xảy ra" + rejected);
      console.log(rejected);
    });
};

function newAccount() {
  account.value = {
    userName: null,
    password: null,
    fullname: null,
    email: null,
    phone: null,
    status: null,
    birthday: null,
  };
  lgDemo.value = true;
}

async function createAccount() {
  let statusReq = await check(Axios);
  if (statusReq == false) {
    toast.warning("Session login already expired");
    rounter.push({ path: "/pages/login" });
    return;
  }
  Axios.post("/account/new", account.value)
    .then((resp) => {
      if (resp.data.infor_response?.code == 404) {
        alert(resp.data.infor_response.message);
      } else {
        toast.success("Thêm mới thành công");
        rounter.push({ name: "account" });
        lgDemo.value = false;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

// function edit(index) {
//   account.value = {
//     userName: null,
//     password: null,
//     fullname: null,
//     email: null,
//     phone: null,
//     status: null,
//     birthday: null,
//   }
//   account.value = JSON.parse(JSON.stringify(accounts.value.data.find((item) => item.id == index)));
//   if (account.value.birthday) {
//     // Định dạng lại ngày sinh theo định dạng mong muốn
//     account.value.birthday = moment(account.value.birthday).format('DD-MM-YYYY');
//   }

//   lgDemo.value = true;
// }

onMounted(() => {
  getData();
});
</script>
  <style>
.page-item:hover {
  cursor: pointer;
}

.current_page_message {
  color: #3498db;
  font-weight: bold;
}
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>