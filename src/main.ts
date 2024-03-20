import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// Vuetify
import 'vuetify/styles';
import {installVuetify} from '@/plugins/vuetify';

// ApexCharts
import VueApexCharts from "vue3-apexcharts";

import App from './App.vue';
import router from './router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
installVuetify(app);

app.use(VueApexCharts);

app.mount('#app');
