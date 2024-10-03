<template>
	<div class="left-menu">
		<div class="mt-3">
			<div v-for="item in MenuList" :key="item.MenuId" class="Menu">
				<div
					:class="{
						Lvl1: item.Lvl == 1,
						Lvl2: item.Lvl == 2,
						Lvl3: item.Lvl == 3,
						Active: item.ActiveYn,
					}"
					@click="Go(item)"
				>
					<img src="@/assets/img/PointWhite_8.png" class="Dot" />{{
						item.MenuNm
					}}
				</div>
			</div>
		</div>
		<hr
			class="w90p"
			style="
				border: 1px solid #ffffff;
				margin: 20px auto;
				background-color: #ffffff;
			"
		/>
		<div class="copyright">
			Copyright © 한국진로적성센터. All Rights Reserved.
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

/********************************/
const router = useRouter();
const MenuList = ref({});

MenuList.value = [
	{ MenuId: '1', MenuNm: 'HOME', Lvl: 1, Src: 'home', ActiveYn: true },
	{
		MenuId: '2',
		MenuNm: '기업정보',
		Lvl: 1,
		Src: 'Compy',
		ActiveYn: false,
	},
	{
		MenuId: '3',
		MenuNm: '매니저관리',
		Lvl: 1,
		Src: 'ManagerList',
		ActiveYn: false,
	},
	{ MenuId: '4', MenuNm: '계정관리', Lvl: 1, Src: '', ActiveYn: false },
	{ MenuId: '5', MenuNm: '기관', Lvl: 2, Src: 'OrgList', ActiveYn: false },
	{ MenuId: '6', MenuNm: '개인', Lvl: 2, Src: 'PersonalList', ActiveYn: false },
	/*{ MenuId: '7', MenuNm: '문의글', Lvl: 1, Src: '', ActiveYn: false }, */
	{ MenuId: '8', MenuNm: '검사결과', Lvl: 1, Src: '', ActiveYn: false },
	{
		MenuId: '9',
		MenuNm: '기관용',
		Lvl: 2,
		Src: 'TestRsltOrgList',
		ActiveYn: false,
	},
	{
		MenuId: '10',
		MenuNm: '개인용',
		Lvl: 2,
		Src: 'TestRsltPayList',
		ActiveYn: false,
	},
	{
		MenuId: '11',
		MenuNm: '검사문항',
		Lvl: 1,
		Src: 'TestMain',
		ActiveYn: false,
	},
	{
		MenuId: '12',
		MenuNm: '검사상품',
		Lvl: 1,
		Src: 'ProdtMain',
		ActiveYn: false,
	},
	{
		MenuId: '13',
		MenuNm: '결제관리',
		Lvl: 1,
		Src: 'PayMent',
		ActiveYn: false,
	},
];

/********************************/
const BefMenu = ref(null);
const Go = item => {
	if (BefMenu.value != null) BefMenu.value.ActiveYn = false;
	BefMenu.value = item;
	BefMenu.value.ActiveYn = true;
	router.push({
		name: item.Src,
	});
};

//Go(MenuList.value[0]);
</script>

<style scoped>
.left-menu {
	background-color: #2c3e50; /* 어두운 회색빛 파란색 */
	height: 100%; /* 전체 높이를 차지하도록 설정 */
	padding: 20px; /* 내부 여백 추가 */
}

.Menu > div {
	font-size: 1.2rem;
	cursor: pointer; /* 모든 메뉴 항목에 포인터 커서 적용 */
	color: #ffffff;
	transition: all 0.3s ease; /* 부드러운 전환 효과 추가 */
}

.Menu > div:hover {
	background-color: rgba(255, 255, 255, 0.1); /* 호버 시 배경색 변경 */
	padding-left: 5px; /* 호버 시 살짝 들여쓰기 */
	cursor: pointer; /* 호버 시 손 모양 커서로 변경 */
}

.Menu > div .Dot {
	margin: -2px 10px 0 0;
}

.Menu > div.Lvl1 {
	font-size: 1.2rem;
	margin: 2px 0 10px 20px;
}

.Menu > div.Lvl2 {
	font-size: 1.05rem;
	margin: 2px 0 8px 40px;
}

.Menu > div.Lvl3 {
	margin: 2px 0 8px 70px;
}

.copyright {
	font-size: 0.9rem;
	padding: 10px;
	color: rgb(220, 220, 220);
}

.Active {
	color: #ffd700;
	cursor: default; /* 활성 메뉴 항목에 기본 커서 적용 */
}

/* 커서 스타일 제거 (더 이상 필요하지 않음) */
/* .Menu > div:not(.Active) {
	cursor: pointer;
}

.Menu > div.Active {
	cursor: default;
} */
</style>
