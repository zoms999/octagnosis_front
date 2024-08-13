<template>
	<div class="ActionBtn" :class="{ btnRemove: PrintingYn }">
		<div></div>
		<div>
			<button
				type="button"
				class="btn btn-primary ms-2"
				@click="print1('printableArea')"
			>
				프린터
			</button>
		</div>
	</div>
	<div class="Box1" id="printableArea">
		<AppError v-if="error" :message="error.message"></AppError>
		<template v-else>
			<div
				v-show="RsltItems[0].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '1').length > 0"
			>
				<div class="TabTit">개인정보</div>
				<UserInfo :ListItem="ListItem"></UserInfo>
			</div>
			<div
				v-show="RsltItems[1].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '2').length > 0"
			>
				<div class="TabTit">성향진단</div>
				<RsltTedcy1 :ListItem="ListItem"></RsltTedcy1>
			</div>
			<div
				v-show="RsltItems[2].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '3').length > 0"
			>
				<div class="TabTit">성향분석</div>
				<RsltTedcy2 :ListItem="ListItem"></RsltTedcy2>
			</div>
			<div
				v-show="RsltItems[3].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '4').length > 0"
			>
				<div class="TabTit">사고력</div>
				<RsltThink :ListItem="ListItem"></RsltThink>
			</div>
			<div
				v-show="RsltItems[4].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '5').length > 0"
			>
				<div class="TabTit">성향적합직업학과</div>
				<RsltTedcyJob :ListItem="ListItem"></RsltTedcyJob>
			</div>
			<div
				v-show="RsltItems[5].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '6').length > 0"
			>
				<div class="TabTit">역량진단</div>
				<RsltAbility :ListItem="ListItem"></RsltAbility>
			</div>
			<div
				v-show="RsltItems[6].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '7').length > 0"
			>
				<div class="TabTit">역량적합직업학과</div>
				<RsltAbilityJob :ListItem="ListItem"></RsltAbilityJob>
			</div>
			<div
				v-show="RsltItems[7].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '8').length > 0"
			>
				<div class="TabTit">학습</div>
				<RsltStudy :ListItem="ListItem"></RsltStudy>
			</div>
			<div
				v-show="RsltItems[8].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '9').length > 0"
			>
				<div class="TabTit">교과목</div>
				<RsltSubjt :ListItem="ListItem"></RsltSubjt>
			</div>
			<div
				v-show="RsltItems[9].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '10').length > 0"
			>
				<div class="TabTit">직무</div>
				<RsltJobDuty :ListItem="ListItem"></RsltJobDuty>
			</div>
			<div
				v-show="RsltItems[10].activeYn == 'Y'"
				v-if="ShowRsltItems.filter(o => o.id == '11').length > 0"
			>
				<div class="TabTit">선호도</div>
				<RsltPrefer :ListItem="ListItem"></RsltPrefer>
			</div>
		</template>
	</div>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, inject, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useBase64Utils } from '@/plugins/base64.js';

import UserInfo from '@/components/TestRslt/print/UserInfo.vue';
import RsltTedcy1 from '@/components/TestRslt/print/RsltTedcy1.vue';
import RsltTedcy2 from '@/components/TestRslt/print/RsltTedcy2.vue';
import RsltThink from '@/components/TestRslt/print/RsltThink.vue';
import RsltTedcyJob from '@/components/TestRslt/print/RsltTedcyJob.vue';
import RsltAbility from '@/components/TestRslt/print/RsltAbility.vue';
import RsltAbilityJob from '@/components/TestRslt/print/RsltAbilityJob.vue';
import RsltStudy from '@/components/TestRslt/print/RsltStudy.vue';
import RsltSubjt from '@/components/TestRslt/print/RsltSubjt.vue';
import RsltJobDuty from '@/components/TestRslt/print/RsltJobDuty.vue';
import RsltPrefer from '@/components/TestRslt/print/RsltPrefer.vue';

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');
const router = useRouter();
const { decodeBase64 } = useBase64Utils();
const route = useRoute();

// Props / Emit  ****************************

// Hook  ************************************

onMounted(() => {
	ListItem.value = JSON.parse(decodeBase64(route.query.p));

	console.log('Props.ListItem.ProdtId', ListItem.value.ProdtId);
	switch (ListItem.value.ProdtId) {
		case 6:
		case 7:
		case 8:
			ShowRsltItems.value = RsltItems.value.filter(o =>
				['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].includes(
					o.id,
				),
			);
			break;
		case 9:
			ShowRsltItems.value = RsltItems.value.filter(o =>
				['1', '2', '3', '11'].includes(o.id),
			);
			break;
	}
});

// Model / Data  ****************************

const RsltItems = ref([
	{ id: '1', activeYn: 'Y', tit: '개인정보' },
	{ id: '2', activeYn: 'Y', tit: '성향진단' },
	{ id: '3', activeYn: 'Y', tit: '성향분석' },
	{ id: '4', activeYn: 'Y', tit: '사고력' },
	{ id: '5', activeYn: 'Y', tit: '성향적합직업학과' },
	{ id: '6', activeYn: 'Y', tit: '역량진단' },
	{ id: '7', activeYn: 'Y', tit: '역량적합직업학과' },
	{ id: '8', activeYn: 'Y', tit: '학습' },
	{ id: '9', activeYn: 'Y', tit: '교과목' },
	{ id: '10', activeYn: 'Y', tit: '직무' },
	{ id: '11', activeYn: 'Y', tit: '선호도' },
]);

const ShowRsltItems = ref([]);

const ListItem = ref({});
const PrintingYn = ref(true);

// Html ref  ********************************

// Axios / Route  ***************************

const { data, error, loading, execUrl, reqUrl } = useAxios(
	'',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case '/api/Org/getOrgList':
					break;
				default:
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

// Modal  ***********************************

// Watch  ***********************************

// Method  **********************************

const downPdf = () => {
	//alert('PDF 다운로드 ');
	PrintingYn.value = true;
	print();
};

const print = () => {
	window.print();
};

// Etc  *************************************

let initBody = '';

const print1 = id => {
	const div = document.getElementById(id);

	const beforePrint = () => {
		initBody = document.body.innerHTML;
		document.body.innerHTML = div.innerHTML;
	};

	const afterPrint = () => {
		document.body.innerHTML = initBody;
	};

	window.onbeforeprint = beforePrint;
	window.onafterprint = afterPrint;
	window.print();
};

// Cleanup event listeners when component is destroyed
onMounted(() => {
	window.onbeforeprint = null;
	window.onafterprint = null;
});

onBeforeUnmount(() => {
	window.onbeforeprint = null;
	window.onafterprint = null;
});
</script>

<style scoped>
.TabTit {
	border: 1px solid #cacaca;
	padding: 10px 20px 10px 40px;
	font-size: 1.8rem;
	border-radius: 10px;
	background: #f1f1f3;
	color: rgb(60, 60, 60);
}

.Box1 {
	padding: 10px;
}

.btnRemove {
	display: none;
}
</style>
<style>
body {
	overflow: auto !important;
}
</style>
