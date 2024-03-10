<template>
	<div class="d-flex justify-content-between">
		<div class="TopLeft">
			<img src="@/assets/img/logo1.png" class="logo" />
		</div>
		<div class="TopRight">
			<div class="d-flex">
				<div class="me-3">홍길동님 안녕하세요</div>
				<div><span class="material-icons mt-1 fs170"> logout </span></div>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.TopRight {
	background-color: transparent;
	height: 40px;
	margin: 20px 30px !important;
}

.logo {
	width: 220px;
	margin: 20px 0 0 20px;
}
</style>
