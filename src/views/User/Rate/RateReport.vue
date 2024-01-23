<template>
    <div v-if="this.items.length > 0">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Rate ID</th>
              <th>Tên Sản Phẩm</th>
              <th>Sao</th>
              <th>Bình Luận</th>
              <th>Ảnh và Video</th>
              <th>Những người đánh giá</th>
              <th>Tổng số báo cáo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index"  >
              <td>{{ item.rate.id }}</td>
            
              <td>{{ item.productName }}</td>
              <td>{{ item.rate.rate }}</td>
              <td>{{ item.rate.comment }}</td>
              <td  @click="showDetail(item)" data-bs-toggle="modal"
              href="#exampleModalToggle" role="button" ><button class="btn btn-primary">Xem ảnh</button></td>
              <td> <select class="form-control col-9" >
             
                <option v-for="user in item.listUserreport" :key="user" :value="user.create_by">{{
                  user.create_by }}</option>
              </select></td>
              <td>{{ item.toltalreport }}</td>
              <td><button class="btn btn-danger" @click="showConfirm(item.rate.id)" >Xóa</button></td>
            </tr>
          </tbody>
        </table>
        <v-dialog
        size="xl"
        width="1500"
        v-model="xlDemo"
        @close="
          () => {
            xlDemo = false;
          }
        "
      >

      <v-card>
        <div class="modal-header">
          <v-card-title>
            <div style="text-align: center; margin-right: 500px">
              Chi tiết ảnh và video
            </div>
          </v-card-title>
        </div>

        <div class="modal-body">
          <div
          class="img-parent" style="display: inline-flex; margin-left: 5px;" 
          v-for="(item, index) in selectedItem.rate.imgs"
          :key="index"
        >
          <img
            v-if="isImage(item.name)"
            class="img-item"
            :src="
              'http://127.0.0.1:8000/api/rate/show?url=' +
              item.url
            "
            alt="avatar"
            width="150"
            height="150"
          />
          <video
            class="img-item"
            v-else
            controls
            width="150"
            height="150"
          >
            <source
              :src="
                'http://127.0.0.1:8000/api/rate/show?url=' +
                item.url
              "
            />
          </video>
        </div>

        </div>


      </v-card>
    </v-dialog>

 
    </div>
<div v-else style="color: red;
text-align: center;
font-size: x-large;">
  Không có đánh giá nào bị báo cáo !
</div>

</template>
  
  <script>
import Axios from '@/router/axios';
import check from '@/commons/jwt';
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  data() {
    return {
      items: [],
      selectedItem: {},
      xlDemo: false,
    }
  },
  methods: {
    async getAll(){
        let statusReq = await check(Axios)
    if (statusReq == false) {
      toast.warning('Session login already expired')
      rounter.push({ path: '/pages/login' })
      return
    }
      Axios.get('report/get-report-admin')
      .then((response) => {
        this.items = response.data
      })
      .catch((error) => {
        console.error(error)
      })
    },
    showDetail(item) {
      console.log(item);
      this.xlDemo = true;
      this.selectedItem=item;
 
    },
    isImage(file) {
      return (
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".png") ||
        file.endsWith(".gif")
      );
    },
    showConfirm(id){
    if(confirm("Bạn có chắc chắn muốn xóa đánh giá này ?")){
      this.deletee(id);
    }
    },
    async deletee(id){
    let statusReq = await check(Axios)
    if (statusReq == false) {
      toast.warning('Session login already expired')
      rounter.push({ path: '/pages/login' })
      return
    }
    Axios.delete("rate/delete-by-id?id="+id).then(async res=>{
      console.log(res.data);
      toast.success("Xóa đánh giá thành công!");
      return res.data;
    }).then(res=>{
      Axios.delete("report/delete-report-admin?rate-id="+id).then(res=>{
        console.log(res.data);
        this.getAll();
        return res.data;
      }).then(res=>{
        Axios.delete("report/delete-report-detail-admin?report-id="+res.id).then(res=>{
          this.getAll();
          console.log(res.data);
        })
      })
    })
    this.getAll();

    }
    
  },
  created: function () {
    this.getAll()
  },
}
</script>
  