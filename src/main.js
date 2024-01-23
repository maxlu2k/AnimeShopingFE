/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/js/dist/tooltip';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.js';
// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import VueApexCharts from "vue3-apexcharts";
import mitt from 'mitt';
const pinia = createPinia()
const emitter = mitt()
const app = createApp(App)
app.provide('emitter', emitter)
app.use(VueApexCharts);
app.use(pinia)
app.use(VueAwesomePaginate)
app.use(ElementPlus);
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    pauseOnHover: false,
    newestOnTop: true
  });
app.component('VueDatePicker', VueDatePicker);
registerPlugins(app)

app.mount('#app')
