<template>
	<div v-if="isAuthenticated" class="LayoutLeft">
		<TheLeft></TheLeft>
	</div>
	<div class="LayoutTop">
		<TheTop></TheTop>
	</div>
	<div class="LayoutMain">
		<RouterView></RouterView>
	</div>
	<AppAlert :items="alerts"></AppAlert>
</template>

<script setup>
import TheLeft from './layouts/TheLeft.vue';
import TheTop from './layouts/TheTop.vue';
import { useAlert } from '@/composables/alert';

import { RouterView, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const { alerts } = useAlert();

const router = useRouter();
const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);

router.beforeEach((to, from, next) => {
	if (!isAuthenticated.value && to.name !== 'login') {
		next({ name: 'login' });
	} else {
		next();
	}
});
</script>
<style scoped>
.LayoutLeft {
	position: absolute;
	width: 250px;
	top: 80px;
	height: calc(100vh - 80px);
	padding: 0 0 0 0;
	background-color: #0d4f8a;
	color: #ffffff;
	box-sizing: border-box;
	border: 0px solid red;
}
.LayoutTop {
	position: absolute;
	width: 100vw;
	height: 80px;
	background-color: #1dafae;
	box-sizing: border-box;
	border: 0px solid red;
}
.LayoutMain {
	position: absolute;
	left: 270px;
	top: 90px;
	width: calc(100vw - 270px);
	height: calc(100vh - 90px);
	background-color: white;
	box-sizing: border-box;
	border: 0px solid red;
	padding: 0 20px 0 0;
	min-width: 1000px;
	overflow: auto;
}
</style>
