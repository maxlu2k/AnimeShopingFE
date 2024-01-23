<template>
  <div class="card" style="margin-top: 20px">
    <div class="card-header">Phân quyền</div>
    <v-table class="table table-border">
      <thead class="bg-success" style="font-variant: small-caps">
        <tr>
          <th>Tài Khoản</th>
          <th v-for="role in roles" :key="role.id" class="text-center">
            {{ role.roleName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(acc, index) in accounts?.data" :key="acc.id">
          <td>{{ acc.userName }}</td>
          <th v-for="role in roles" :key="role.roleID" class="text-center">
            <input
              :checked="authority_of(acc, role)"
              v-on:change="authority_changed(acc, role, index)"
              type="checkbox"
            />
          </th>
        </tr>
      </tbody>
    </v-table>
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
            '-' +
            accounts?.endIndex +
            ' of ' +
            accounts?.totalRecords
          }}
        </p>
        <div class="col col-md-2" v-if="accounts != null">
          <CFormSelect
            :options="options"
            class="ms-3"
            style="max-width: 100px; max-height: 40px"
            :model-value="pageSize + ''"
            v-model:model-value="pageSize"
            @update:modelValue="getData"
          />
        </div>
      </div>
  </div>
</template>
<script setup>
import {onMounted, ref } from 'vue'
import Axios from '@/router/axios'
// import { TodayDateV2 } from '@/commons/util'
import check from '@/commons/jwt'
import { useToast } from 'vue-toastification'
// import { useRouter } from 'vue-router'

let roles = ref(null)
const toast = useToast()
let accountRole = ref(null)
let accounts = ref(null)
let pageSize = ref(5)
let page = ref(1)
const options = ref([
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
])

const onClickHandler = (page) => {
  // console.log(role)
  init()
}

const getData = async () => {
  let statusReq = await check(Axios)
  if (statusReq == false) {
    toast.warning('Session login already expired')
    rounter.push({ path: '/pages/login' })
    return
  }
  Axios.get('/account/getAll', {
    params: {
      page: page.value - 1,
      size: pageSize.value,
    },
  })
    .then(function (resp) {
      accounts.value = resp.data
      console.log(resp.data)
    })
    .catch(function (rejected) {
      alert('Có lỗi xảy ra' + rejected)
      console.log(rejected)
    })
}

const init = async () => {
  let statusReq = await check(Axios)
  if (statusReq == false) {
    toast.warning('Session login already expired')
    rounter.push({ path: '/pages/login' })
    return
  }
  Axios.get('/account/role')
    .then((resp) => {
      roles.value = resp.data
      console.log(resp.data)
    })
    .catch((rejected) => {
      alert('Có lỗi xẩy ra ' + rejected)
      console.log(rejected)
    })

  Axios.get('/account/account-role').then((resp) => {
    accountRole.value = resp.data
    console.log(resp.data)
  })

  Axios.get('/account/getAll', {
    params: {
      page: page.value - 1,
      size: pageSize.value,
    },
  })
    .then(function (resp) {
      accounts.value = resp.data
      console.log(resp.data)
    })
    .catch(function (rejected) {
      alert('Có lỗi xảy ra' + rejected)
      console.log(rejected)
    })
}

function authority_of(acc, role) {
  return acc?.accountRoleEntities?.some((element) => element.roleId === role.id)
  // return true
}

async function getAuthori(id){
  let temp = null;
 await Axios.get('/account/accountRole/'+id).then(resp => {
    temp = resp.data;
    console.log(resp.data)
  })
  return temp;
}




async function authority_changed(acc, role, index) {
  var count = 0
  let index2 = accounts.value.data.findIndex(i=>{return i.userName == acc.userName});
  console.log(index);
  console.log(index2);

  if (authority_of(acc, role)) {
    console.log('revoke')
    let i = acc?.accountRoleEntities?.findIndex((element) => element.roleId === role.id);
    await revoke_authority(acc.accountRoleEntities[i].id)
    console.log("revoke success");
   let a = await getAuthori(acc.userName);
   console.log(accounts.value.data[index]);
   console.log(index);
     accounts.value.data[index].accountRoleEntities = a;
   console.log(accounts.value.data[index]);

    // console.log(i);
    console.log(acc);
  } else {
    console.log('grant')
   await grant_authority({roleId:role.id,userName:acc.userName });
   console.log("grant success");
   let a = await getAuthori(acc.userName);
   console.log(accounts.value.data[index]);
   console.log(index);
     accounts.value.data[index].accountRoleEntities = a;
   console.log(accounts.value.data[index]);
  //  accounts.value?.data[index]?.accountRoleEntities = await getAuthori(acc.userName)
  }
  // accountRole.value.forEach((element) => {
  //   if (element.userName === acc.userName && element.roleId === role.id) {
  //       revoke_authority(element.id);
  //       return;
  //   }
  // })
  // var authority = authority_of(acc, role);
  // if(!authority){

  //     authority = { roleId: role.id, userName: acc.userName }
  //     grant_authority(authority)

  // }
}

async function grant_authority(authority) {
  let statusReq = await check(Axios)
  if (statusReq == false) {
    toast.warning('Session login already expired')
    rounter.push({ path: '/pages/login' })
    return
  }
  await Axios.post(`/account/accountRole`, authority)
    .then((resp) => {
      console.log(resp.data)
      toast.success('Cấp quyền sử dụng thành công!')
    })
    .catch((error) => {
      toast.warning('Cấp quyền sử dụng thất bại!')

      console.log('Error', error)
    })
}

async function revoke_authority(authority) {
  let statusReq = await check(Axios)
  if (statusReq == false) {
    toast.warning('Session login already expired')
    rounter.push({ path: '/pages/login' })
    return
  }
  await Axios.delete(`/account/accountRole?id=` + authority)
    .then((resp) => {
      console.log(resp.data)
      toast.success('Thu hồi quyền sử dụng thành công!')
    })
    .catch((error) => {
      toast.warning('Thu hồi quyền sử dụng thất bại!')
      console.log('Error', error)
    })
}

onMounted(() => {
  init()
})
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