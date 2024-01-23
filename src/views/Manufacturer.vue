<template>
  <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Name </label>
      <br />
      <br />
      <input
        type="text"
        v-model="form.name"
        class="form-control"
      />
    </div>
    <br />
    <table class="table">
      <thead>
        <tr >
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Create Date</th>
          <th scope="col">Update By</th>
          <th scope="col">Create By</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in response" :key="index">
        <tr >
          <td>{{ index }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.createDate }}</td>
          <td>{{ item.updateBy }}</td>
          <td>{{ item.createBy }}</td>
          <td><button @click.prevent="edit(item)" class="btn btn-warning">Edit</button></td>
        </tr>
      </tbody>
    </table>
    <br />
    <button @click.prevent="insert()" class="btn btn-success">Insert</button>
    <button @click.prevent="update(item)" style="margin-left: 10px ;" class="btn btn-primary">Update</button>
  </form>
</template>

<script>
import Axios from "@/router/axios";
import check from "@/commons/jwt";
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router';
const toast = useToast();
const router = useRouter();
export default {
  data() {
    return {
      response: [],
      form: {
        name: "",
      },
    };
  },

  methods: {
    async showAll() {
      Axios.get("manufacturer", {}).then((response) => {
        const data = [];
        response.data.forEach((element) => {
          element.createDate = this.formatDate(element.createDate);
          data.push(element);
        });
        this.response = data;
        console.log(this.response);
      });
    },
    async insert() {
      let statusReq = await check(Axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/pages/login" });
        return;
      }
      Axios.post("manufacturer", this.form).then((response) => {
        console.log(response);
        this.showAll();
      });
    },
    async update(item) {
      let statusReq = await check(Axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/pages/login" });
        return;
      }
      Axios.put("manufacturer", this.form).then((response) => {
        this.form = response.data;
        this.showAll();
      });
    },
    async edit(item) {
      let statusReq = await check(Axios);
      if (statusReq == false) {
        toast.warning("Session login already expired");
        router.push({ path: "/pages/login" });
        return;
      }
      this.form = { ...item };
    },
    formatDate(date) {
      const dateObj = new Date(date);
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false, // sử dụng định dạng 24 giờ
        timeZone: "Asia/Ho_Chi_Minh", // chỉ định múi giờ của Việt Nam
      };
      // sử dụng phương thức toLocaleDateString() để định dạng ngày
      const formattedDate = dateObj.toLocaleDateString("vi-VN", options);
      return formattedDate;
    },
  },
  created: function () {
    this.showAll();
  },

};
</script>
