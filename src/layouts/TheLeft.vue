<template>
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
				<img src="@/assets/img/PointWhite_8.png" class="Dot" />{{ item.MenuNm }}
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
	{ MenuId: '7', MenuNm: '문의글', Lvl: 1, Src: '', ActiveYn: false },
	{ MenuId: '8', MenuNm: '검사결과', Lvl: 1, Src: '', ActiveYn: false },
	{ MenuId: '9', MenuNm: '기관용', Lvl: 2, Src: '', ActiveYn: false },
	{ MenuId: '10', MenuNm: '개인용', Lvl: 2, Src: '', ActiveYn: false },
	{ MenuId: '11', MenuNm: '문항관리', Lvl: 1, Src: '', ActiveYn: false },
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
.Menu > div {
	font-size: 1.2rem;
	cursor: pointer;
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
	color: yellow;
}
</style>
