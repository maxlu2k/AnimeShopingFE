<template>
  <v-card>
    <v-dialog v-model="props.show" scrollable max-width="800">

      <v-card>
        <v-card-title class="text-center py-3">HE</v-card-title>
        <v-card-text>
          <v-form v-model="valid" @submit.prevent>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field v-model.trim="item.name" :rules="rules" label="Product name"></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-select label="Category" v-model="item.category" item-title="name" item-value="id"
                  :items="categories.value" clearable :rules="categoryNotNull"></v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-select label="Material" v-model="item.material" item-title="name" item-value="id"
                  :items="materials.value" clearable :rules="materialNotNull"></v-select>
                <!-- return-object -->
              </v-col>
              <v-col cols="12" md="6">
                <v-select label="Ratio" v-model="item.ratio" item-title="name" item-value="id" :items="ratios.value"
                  clearable :rules="ratioNotNull"></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-select label="Type" v-model="item.typeProduct" item-title="name" item-value="id" :items="types.value"
                  clearable :rules="typeProductNotNull"></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-select label="Properties" multiple v-model="item.properties" item-title="name" item-value="id"
                  clearable :items="properties.value" :rules="propertyNotNull"></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-radio-group v-model="item.available" inline>
                  <v-radio label="Avaiable" :value="true"></v-radio>
                  <v-radio label="Non-avaiable" :value="false"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea clearable label="Description" v-model="item.description"></v-textarea>
              </v-col>
            </v-row>
          </v-form>
          <!-- <v-card-actions>
          </v-card-actions> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">
              Cancel
            </v-btn>
            <!-- <v-btn color="blue-darken-1" variant="text" @click="saveToDb">
              Save
            </v-btn> -->
            <v-btn type="submit" @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script setup>
import { inject, ref } from 'vue';
import { getAllCategory } from '@/services/categoryService';
import { getAllMaterial } from '@/services/materialSerivice';
import { getAllProperty } from '@/services/propertyService';
import { getAllRatio } from '@/services/ratioService';
import { getAllType } from '@/services/typeService';
import { onMounted } from 'vue';
import { nextTick } from 'vue';
import { watch } from 'vue';
import { useToast } from 'vue-toastification';
// props and emits
const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  },
  editItem: {
    type: Object,
    required: false,
    default: null
  }
});
const emits = defineEmits({
  closeDialog: null,
  openDialog: null,
  submitForm: null
});
// properties
let materials = [];
let categories = [];
let ratios = [];
let types = [];
let properties = [];
// item
let defaultItem = ref({
  id: null,
  name: "",
  category: null,
  material: null,
  ratio: null,
  typeProduct: null,
  properties: null,
  available: false,
  description: "",
});
let item = ref({
  id: null,
  name: "",
  category: null,
  material: null,
  ratio: null,
  typeProduct: null,
  properties: null,
  available: false,
  description: "",
})
// valid
const toast = useToast();
let valid = ref(false);

let rules = [
  (value) => {
    if (value) return true;
    return "Name product must not be null"
  },
  (value) => {
    if (value.length > 1 && value.length < 100) {
      return true
    }
    return "Name product must be at least 3 characters and largest 100 characters.";
  }
];
const categoryNotNull = [
  (value) => {
    if (value) return true;
    return "Category must not be null"
  }
];
const materialNotNull = [
  (value) => {
    if (value) return true;
    return "Material must not be null"
  }
];
const ratioNotNull = [
  (value) => {
    if (value) return true;
    return "Ratio must not be null"
  }
];
const typeProductNotNull = [
  (value) => {
    if (value) return true;
    return "Type product must not be null"
  }
];
const propertyNotNull = [
  (value) => {
    if (value) return true;
    return "Property must not be null"
  }
];
// function
const emitter = inject('emitter');
let submit = () => {
  console.log(valid.value);
  if (valid.value) {
    emits('submitForm', item.value);
    close();
    item.value = Object.assign({}, defaultItem.value);
  }
  return;
}
const close = () => {
  nextTick(() => {
    emits('closeDialog', false);
    item.value = Object.assign({}, defaultItem.value);
  })
}
watch(() => props.editItem, (newvalue, oldvalue) => {
  // console.log(props.editItem);
  console.log(oldvalue);
  console.log(newvalue);
  newvalue.available = newvalue.available == 1;
  if (newvalue.id) {
    console.log("logger");
    item.value = Object.assign({}, newvalue);
  }
  else {
    item.value = Object.assign({}, defaultItem.value)
  }
})
onMounted(async () => {
  // const initDataPromies =  [
  //   getAllCategory().then(resp => {
  //     categories.value = resp.data;
  //   }),
  //   getAllMaterial().then(resp => {

  //     console.log(resp.data);
  //     materials.value = resp.data;
  //   }),
  //   getAllProperty().then(resp => {
  //     console.log(resp.data);
  //     properties.value = resp.data;
  //   }),
  //   getAllRatio().then(resp => {

  //     console.log(resp.data);
  //     ratios.value = resp.data;
  //   }),
  //   getAllType().then(resp => {

  //     console.log(resp.data);
  //     types.value = resp.data;
  //   }),

  // ];
  let isSuccess = true;
  let initDataPromies = [
    getAllCategory().then(resp => {
      categories.value = resp.data;
    }).catch((err) => {
      isSuccess = false;
    }),
    getAllMaterial().then(resp => {
      materials.value = resp.data;
    }).catch((err) => {
      isSuccess = false;
    }),
    getAllProperty().then(resp => {
      properties.value = resp.data;
    }).catch((err) => {
      isSuccess = false;
    }),
    getAllRatio().then(resp => {
      ratios.value = resp.data;
    }).catch((err) => {
      isSuccess = false;
    }),
    getAllType().then(resp => {
      types.value = resp.data;
    }).catch((err) => {
      isSuccess = false;
    })];
  Promise.all(initDataPromies).then(([...arg]) => {
    if (!isSuccess) {
      console.log(arg);
      toast.error("Error networking");
    }
  }).catch(([...args]) => {

  })
  // await Promise.all(initDataPromies);
  // console.log("logger");
})
</script>