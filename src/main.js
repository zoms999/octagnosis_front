import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import dayjs from './plugins/dayjs';

const app = createApp(App);
app.use(dayjs);
app.use(createPinia());
app.use(router);

app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';
