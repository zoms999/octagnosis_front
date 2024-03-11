<template>
	<div class="header">
		<div class="d-flex justify-content-between">
			<div class="TopLeft">
				<img src="@/assets/img/logo3.png" class="logo" />
			</div>
			<div class="TopRight">
				<div class="d-flex mt-1">
					<div class="me-3">홍길동님 안녕하세요</div>
					<div><span class="material-icons fs170"> logout </span></div>
				</div>
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
	color: #ffffff;
}

.logo {
	width: 230px;
	margin: 15px 0 0 14px;
}

.header {
	background: linear-gradient(135deg, #1db1ad 0%, #3d7aed 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1db1ad', endColorstr='#3d7aed',GradientType=1 );
}
</style>
