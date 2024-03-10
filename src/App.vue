<template>
	<div class="LayoutLeft">
		<TheLeft></TheLeft>
	</div>
	<div class="LayoutTop">
		<TheTop></TheTop>
	</div>
	<div class="LayoutMain">
		<RouterView></RouterView>
	</div>
</template>

<script setup>
import TheLeft from './layouts/TheLeft.vue';
import TheTop from './layouts/TheTop.vue';

import { RouterView } from 'vue-router';

/********************************/
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
	left: 250px;
	top: 80px;
	width: calc(100vw - 250px);
	height: calc(100vh - 80px);
	background-color: white;
	box-sizing: border-box;
	border: 0px solid red;
}
</style>
