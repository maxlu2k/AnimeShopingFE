<template>
    <VCard class="ma-5" elevation="12">
        <VRow class="ma-1 mb-0">
            <h2 class="v-col-12 text-center">Product</h2>

            <VCol class="d-flex">
                <v-btn class="me-auto" color="success" @click="newHandler">New</v-btn>
            </VCol>
        </VRow>
        <VRow class="ma-0">
            <VCol auto>
                <v-table fixed-header hover density="comfortable" class="custom-table" loading
                    loading-text="Loading... Please wait">
                    <thead>
                        <tr>
                            <th class="text-center">
                                #
                            </th>
                            <th class="text-center">
                                Name
                            </th>
                            <th class="text-center">
                                Category
                            </th>
                            <th class="text-center">
                                Material
                            </th>
                            <th class="text-center">
                                Type
                            </th>
                            <th class="text-center">
                                Ratio
                            </th>
                            <th class="text-center">
                                Status
                            </th>
                            <th class="text-center">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="properties == null || properties?.data?.length == 0">
                            <td colspan="20" class="text-center">No data</td>
                        </tr>
                        <tr v-else v-for="(item, index) in properties?.data" :key="item.name">
                            <td class="text-center">{{ properties.beginIndex + 1 + index }}</td>
                            <td class="text-center">{{ item.name }}</td>
                            <td class="text-center">{{ item.category?.name }}</td>
                            <td class="text-center">{{ item.material?.name }}</td>
                            <td class="text-center">{{ item.typeProduct?.name }}</td>
                            <td class="text-center">{{ item.ratio?.name }}</td>
                            <td class="text-center">{{ item.available == 1 ? 'available' : 'non-availale' }}</td>
                            <td class="text-center">
                                <v-icon class="btn_icon" size="small" @click="editItem(item)" title="edit">
                                    mdi-pencil
                                </v-icon>
                                <!-- <v-icon class="btn_icon" size="small" @click="deleteItem(item.id)">
                    mdi-delete
                  </v-icon> -->
                                <v-icon class="btn_icon" size="small" @click="infor(item.id)">
                                    mdi-format-horizontal-align-right
                                </v-icon>
                            </td>

                        </tr>
                    </tbody>
                </v-table>
            </VCol>
        </VRow>
    </VCard>
    <v-container v-if="properties != null">
        <VRow class="mx-0 align-center" v-if="properties?.data?.length != 0">
            <VCol md="6" sm="12" xs="12">
                <vue-awesome-paginate v-if="properties != null" :total-items="properties.totalRecords || 0"
                    :items-per-page="properties.pageSize || 1" :max-pages-shown="5" v-model="page"
                    :on-click="onClickHandler" />
            </VCol>
            <VCol md="4" sm="12" xs="12" class="d-flex align-end align-md-center">
                <span v-if="properties != null" class="current_page_message">{{
                    (properties?.beginIndex + 1) + "-" + (properties?.endIndex) + " of " +
                    (properties?.totalRecords) }}
                </span>
            </VCol>
            <VCol md="2" sm="12" xs="12">
                <!-- <select class="ms-3 custom_select" >
                    <option v-for="item in [10,20,30,50]" :value="item">{{ item }}</option>
              </select> -->
                <VSelect outlined :items="[3, 5, 7, 50]" @update:model-value="logger" v-model="pageSize" />
            </VCol>

        </VRow>
    </v-container>
    <v-card>
        <VRow>
            <ProductForm :show="dialog" @close-dialog="dialog = false" @open-dialog="open" @submit-form="saveToDb"
                :edit-item="currentItem" />
        </VRow>
    </v-card>
    <!-- dialog -->
    <!-- <v-dialog v-model="dialog" max-width="800px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
                <ProductForm />
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                    Cancel
                </v-btn>
                <v-btn type="submit" block class="mt-2">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->
</template>
<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { getAll, save, update } from '@/services/productService'
import { nextTick } from 'vue';
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router';
// const ProductForm = defineAsyncComponent(() => {
// import ('./ProductForm.vue')
// })
import ProductForm from './ProductForm.vue';
let page = ref(1);
const dialog = ref(false);
const toast = useToast();
const router = useRouter();
let pageSize = ref(3);
let properties = ref(null);
let formTitle = ref('');
let currentItem = ref({})
let defaultItem = {
    id: "",
    name: ""
};
const onClickHandler = (p) => {
    getData(page.value - 1, pageSize.value)
};
const initialize = () => {
    getData(0, pageSize.value);
}
const getData = (p, ps) => {
    getAll({ 'page': p, 'size': ps }).then((resp) => {
        if (resp.status == 200) {
            properties.value = resp.data;
        }
    }).catch((err) => {
        toast.error("Error networking");
    })
}
const editItem = (item) => {
    // const item = properties.value.data.find((i) => {
    //     return i.id == id;
    // });
    // console.log(item);
    // item.category = item.category.id;
    // item.material = item.material.id;
    // item.ratio = item.ratio.id;
    // item.typeProduct = item.typeProduct.id;
    // item.properties.forEach((i, index, arr) => {
    //     arr[index] = i.id;
    // });
    // console.log(item);
    currentItem.value = Object.assign({}, item);
    formTitle.value = "Edit material";
    dialog.value = true;
}
const infor = (id) => {
    router.push({ name: 'product-detail', params: { 'id': id } })
    console.log(id);
}
const newHandler = () => {
    formTitle.value = "New material";
    dialog.value = true;
}

const saveToDb = async (item) => {
    console.log(item);
    castObject(item)
    console.log(item);
    item.available = item.available ? 1 : 0;
    if (item.id) {
        console.log(item);
        await update(item).then(resp => {
            const index = properties.value.data.findIndex(i => {
                return i.id == currentItem.value.id;
            })
            properties.value.data[index] = Object.assign({}, resp.data);

        }).catch((err) => {
            toast.error("Error networking");
        })
    } else {
        await save(item).then(resp => {
            getData(page.value - 1, pageSize.value);
        }).catch((err) => {
            toast.error("Error networking");
        })
    }
    close();
    toast.success("Success")
}
const castObject = (obj) => {
    console.log(obj.category.id);
    if (obj.category.id != undefined) {
        obj.category = obj.category.id;
    }
    if (obj.material.id != undefined) {
        obj.material = obj.material.id;
    }
    if (obj.ratio.id != undefined) {
        obj.ratio = obj.ratio.id;
    }
    if (obj.typeProduct.id != undefined) {
        obj.typeProduct = obj.typeProduct.id;
    }
    if (obj.properties[0].id != undefined) {
        obj.properties.forEach((item, index, arr) => {
            arr[index] = item?.id;
        });
    }

}

const edit = () => {
    console.log("save to database : ", obj);
    close();
}
const logger = () => {
    nextTick(() => {
        console.log(pageSize.value);
        getData(0, pageSize.value)
    })
}
const close = () => {
    dialog.value = false;
    // nextTick(() => {
    //     currentItem.value = Object.assign({}, defaultItem.value);
    // })
}
const open = () => {
    dialog.value = true;
}
onMounted(() => {
    initialize();
})
</script>
  
  
<style>
.custom-table {
    border-collapse: separate;
    border-spacing: 0 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
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

.custom_select {
    min-width: 90px;
    border: 1px solid;
    border-radius: 4px;
}

.btn_icon {
    /* margin-left: 1.5rem; */
    padding: 1.5rem;
}

.btn_icon:hover {
    background-color: lightblue;
}
</style>