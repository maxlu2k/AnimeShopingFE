<template>
    <div>
        <v-dialog v-model="props.dialog" width="1200" @click:outside="close" persistent>
            <v-card>
                <v-card-title>
                    <p class="text-h5 text-center my-5 text-info font-weight-bold">{{ action }}</p>
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field readonly v-model="props.item.figure" label="Tên mô hình" variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.height" label="Chiều cao" item-title="name" item-value="value"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.weight" label="Chiều rộng" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.material" label="Chất liệu" item-title="name"
                                item-value="value" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.ratio" label="Tỉ lệ" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.recommendedAge" label="Độ tuổi yêu cầu" item-title="name"
                                item-value="value" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.accessoriesIncluded" label="Phụ kiện đi kèm"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.categoryName" label="Danh mục" item-title="name"
                                item-value="value" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.manufacturerName" label="Nhà cung cấp"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field readonly v-model="props.item.seriesName" label="Seri" item-title="name" item-value="value"
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" >
                            <v-carousel hide-delimiter-background show-arrows="hover">
                                <v-carousel-item v-for="(i, ind) in props.item.listImage"
                                    :src="`${BASE_URL}products/show?url=${i.url}`" :placeholder="props.item.figure"
                                    style="height: auto;" cover></v-carousel-item>
                                <!-- <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                                        style="height: auto;" cover></v-carousel-item>

                                        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
                                        style="height: auto;" cover></v-carousel-item>
                                        
                                        <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                                        style="height: auto;" cover></v-carousel-item> -->
                            </v-carousel>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-textarea readonly v-model="props.item.description" label="Mô tả" variant="outlined">
                                <template v-slot:prepend>
                                    <span>Mô tả</span>
                                    <!-- <p>Mô tả</p> -->
                                </template>
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <!-- <v-row>
                                    <v-radio-group v-model="props.item.status" inline>
                                        <v-radio label="Khả dụng" value="1"></v-radio>
                                        <v-radio label="Không khả dụng" value="0"></v-radio>
                                    </v-radio-group>
                                </v-row> -->
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click.prevent="close">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import { nextTick } from 'vue'
import { BASE_URL } from '@/router/axios'
const action = "Thông tin sản phẩm";
const props = defineProps({
    item: {
        type: Object,
        default: {}
    },
    dialog: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits({
    closeDialog: null,
});
const close = () => {
    nextTick(() => {
        emits('closeDialog', false);
        // item.value = Object.assign({}, defaultItem.value);
    })
}
</script>