<template>
	<div class="main">
		<div class="container-flude">
			<div class="row">
				<div class="col-3">
					<div class="tit">최근등록 개인&멤버</div>
					<div class="box1">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
					<div class="box1">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
					<div class="box1">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
				</div>
				<div class="col-3">
					<div class="tit">최근등록 기관</div>
					<div class="box2">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
					<div class="box2">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
					<div class="box2">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
				</div>
				<div class="col-3">
					<div class="tit">검사완료 개인</div>
					<div class="box3">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
					<div class="box3">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
					<div class="box3">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
				</div>
				<div class="col-3">
					<div class="tit">검사완료 멤버</div>
					<div class="box4">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
					<div class="box4">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
					<div class="box4">
						<div>2024-05-02</div>
						<div>홍길동 (hong)</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
.main {
	padding: 30px;
}

.tit {
	font-size: 1.3rem;
	border: 1px solid #cacaca;
	background-color: #418b89;
	color: #ffffff;
	padding: 5px 5px 5px 10px;
	border-radius: 10px 10px 0px 0px;
}

.box1 {
	border-radius: 5px;
	border: 1px solid #cacaca;
	margin: 10px 0 5px 0;
	padding: 5px 8px 5px 8px;
	border-bottom: 2px solid #cacaca;
	border-right: 2px solid #cacaca;
}
.box1 > div:nth-child(1) {
	font-size: 1.2rem;
	padding: 5px 5px 0px 5px;
}
.box1 > div:nth-child(2) {
	font-size: 1.05rem;
	padding: 5px;
	margin: 0 0 0 20px;
	color: rgb(120, 120, 120);
}

.box2 {
	border-radius: 5px;
	border: 1px solid #cacaca;
	margin: 10px 0 5px 0;
	padding: 5px 8px 5px 8px;
	border-bottom: 2px solid #cacaca;
	border-right: 2px solid #cacaca;
}
.box2 > div:nth-child(1) {
	font-size: 1.2rem;
	padding: 5px 5px 0px 5px;
}
.box2 > div:nth-child(2) {
	font-size: 1.05rem;
	padding: 5px;
	margin: 0 0 0 20px;
	color: rgb(120, 120, 120);
}

.box3 {
	border-radius: 5px;
	border: 1px solid #cacaca;
	margin: 10px 0 5px 0;
	padding: 5px 8px 5px 8px;
	border-bottom: 2px solid #cacaca;
	border-right: 2px solid #cacaca;
}
.box3 > div:nth-child(1) {
	font-size: 1.2rem;
	padding: 5px 5px 0px 5px;
}
.box3 > div:nth-child(2) {
	font-size: 1.05rem;
	padding: 5px;
	margin: 0 0 0 20px;
	color: rgb(120, 120, 120);
}

.box4 {
	border-radius: 5px;
	border: 1px solid #cacaca;
	margin: 10px 0 5px 0;
	padding: 5px 8px 5px 8px;
	border-bottom: 2px solid #cacaca;
	border-right: 2px solid #cacaca;
}
.box4 > div:nth-child(1) {
	font-size: 1.2rem;
	padding: 5px 5px 0px 5px;
}
.box4 > div:nth-child(2) {
	font-size: 1.05rem;
	padding: 5px;
	margin: 0 0 0 20px;
	color: rgb(120, 120, 120);
}
</style>
