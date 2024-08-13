<template>
	<div v-if="isAuthenticated && TopYn" class="LayoutLeft">
		<TheLeft></TheLeft>
	</div>
	<div v-if="TopYn" class="LayoutTop">
		<TheTop></TheTop>
	</div>
	<div class="LayoutMain" :class="{ LayoutMainPosition: !TopYn }">
		<RouterView></RouterView>
	</div>
	<AppAlert></AppAlert>
</template>

<script setup>
import TheLeft from './layouts/TheLeft.vue';
import TheTop from './layouts/TheTop.vue';

import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const router = useRouter();
const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);
const TopYn = ref(true);
const BottomYn = ref(true);

router.beforeEach((to, from, next) => {
	if (to.name == 'TestRsltAll') {
		TopYn.value = false;
		BottomYn.value = false;
	}

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
.LayoutMainPosition {
	position: relative !important;
	left: 0px !important;
	top: 0px !important;
	width: 100% !important;
	height: 100% !important;
	max-width: 1000px;
	margin: auto auto;
}
</style>
