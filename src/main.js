import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import dayjs from './plugins/dayjs';
import globalComponents from './plugins/global-components';
import globalDirective from './plugins/global-directive';
import globalFunction from './plugins/global-function';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// DataTables Vue 3 컴포넌트 추가
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import DataTablesButtons from 'datatables.net-buttons-bs5';

// DataTables 초기화
DataTable.use(DataTablesCore);
DataTable.use(DataTablesButtons);

const app = createApp(App);
app.use(globalComponents);
app.use(globalDirective);
app.use(globalFunction);
app.use(router);
app.use(dayjs);
app.use(createPinia());
app.component('VueDatePicker', VueDatePicker);
app.component('DataTable', DataTable);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';

/* 2023.03.16 : Jake / 추후 삭제  
console.log('MODE : ', import.meta.env.MODE);
console.log('BASE_URL : ', import.meta.env.BASE_URL);
console.log('PROD : ', import.meta.env.PROD);
console.log('DEV : ', import.meta.env.DEV);
console.log('VITE_APP_API_URL : ', import.meta.env.VITE_APP_API_URL);
*/
