<template>
	<div class="ActionBtn">
		<div></div>
		<div>
			<!--
			<button
				type="button"
				class="btn btn-primary"
				@click="submitForm"
				:disabled="editLoading"
			>
				<template v-if="editLoading">
					<span
						class="spinner-grow spinner-grow-sm"
						role="status"
						aria-hidden="true"
					></span>
					<span class="visually-hidden">Loading...</span>
				</template>
				<template v-else> 수정 </template>
			</button>
			-->
			<button type="button" class="btn btn-primary ms-2" @click="popupTestRslt">
				인쇄
			</button>

			<button
				type="button"
				class="btn btn-primary ms-2"
				@click="Emit('showPnl', 'RsltList')"
			>
				목록
			</button>
		</div>
	</div>
	<div class="SrchBox">
		<div class="row">
			<div class="col-12">
				<ul class="nav nav-tabs">
					<li
						class="nav-item mx-1"
						v-for="(item, idx) in ShowRsltItems"
						:key="item.id"
					>
						<a
							class="nav-link fs110"
							:class="{ active: item.activeYn == 'Y' }"
							aria-current="page"
							href="#"
							@click="goTab(item)"
							>{{ item.tit }}</a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<AppError v-if="error" :message="error.message"></AppError>
	<template v-else>
		<div
			v-show="RsltItems[0].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '1').length > 0"
		>
			<UserInfo :ListItem="ListItem"></UserInfo>
		</div>
		<div
			v-show="RsltItems[1].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '2').length > 0"
		>
			<RsltTedcy1 :ListItem="ListItem"></RsltTedcy1>
		</div>
		<div
			v-show="RsltItems[2].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '3').length > 0"
		>
			<RsltTedcy2 :ListItem="ListItem"></RsltTedcy2>
		</div>
		<div
			v-show="RsltItems[3].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '4').length > 0"
		>
			<RsltThink :ListItem="ListItem"></RsltThink>
		</div>
		<div
			v-show="RsltItems[4].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '5').length > 0"
		>
			<RsltTedcyJob :ListItem="ListItem"></RsltTedcyJob>
		</div>
		<div
			v-show="RsltItems[5].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '6').length > 0"
		>
			<RsltAbility :ListItem="ListItem"></RsltAbility>
		</div>
		<div
			v-show="RsltItems[6].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '7').length > 0"
		>
			<RsltAbilityJob :ListItem="ListItem"></RsltAbilityJob>
		</div>
		<div
			v-show="RsltItems[7].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '8').length > 0"
		>
			<RsltStudy :ListItem="ListItem"></RsltStudy>
		</div>
		<div
			v-show="RsltItems[8].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '9').length > 0"
		>
			<RsltSubjt :ListItem="ListItem"></RsltSubjt>
		</div>
		<div
			v-show="RsltItems[9].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '10').length > 0"
		>
			<RsltJobDuty :ListItem="ListItem"></RsltJobDuty>
		</div>
		<div
			v-show="RsltItems[10].activeYn == 'Y'"
			v-if="ShowRsltItems.filter(o => o.id == '11').length > 0"
		>
			<RsltPrefer :ListItem="ListItem"></RsltPrefer>
		</div>
	</template>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, inject, defineEmits, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useBase64Utils } from '@/plugins/base64.js';

import UserInfo from '@/components/TestRslt/UserInfo.vue';
import RsltTedcy1 from '@/components/TestRslt/RsltTedcy1.vue';
import RsltTedcy2 from '@/components/TestRslt/RsltTedcy2.vue';
import RsltThink from '@/components/TestRslt/RsltThink.vue';
import RsltTedcyJob from '@/components/TestRslt/RsltTedcyJob.vue';
import RsltAbility from '@/components/TestRslt/RsltAbility.vue';
import RsltAbilityJob from '@/components/TestRslt/RsltAbilityJob.vue';
import RsltStudy from '@/components/TestRslt/RsltStudy.vue';
import RsltSubjt from '@/components/TestRslt/RsltSubjt.vue';
import RsltJobDuty from '@/components/TestRslt/RsltJobDuty.vue';
import RsltPrefer from '@/components/TestRslt/RsltPrefer.vue';

const { encodeBase64 } = useBase64Utils();

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');
const router = useRouter();

let windowRef = null;

// Props / Emit  ****************************

const Props = defineProps({
	ListItem: { type: Object },
});

const Emit = defineEmits(['showPnl']);

// Hook  ************************************

onMounted(() => {
	console.log('Props.ListItem.ProdtId', Props.ListItem.ProdtId);
	switch (Props.ListItem.ProdtId) {
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

const Parm = ref({
	srchStr: '',
});

const RsltItems = ref([
	{ id: '1', activeYn: 'Y', tit: '개인정보', TempProdtId: 10001 },
	{ id: '2', activeYn: 'N', tit: '성향진단', TempProdtId: 10002 },
	{ id: '3', activeYn: 'N', tit: '성향분석', TempProdtId: 10003 },
	{ id: '4', activeYn: 'N', tit: '사고력', TempProdtId: 10004 },
	{ id: '5', activeYn: 'N', tit: '성향적합직업학과', TempProdtId: 10005 },
	{ id: '6', activeYn: 'N', tit: '역량진단', TempProdtId: 10006 },
	{ id: '7', activeYn: 'N', tit: '역량적합직업학과', TempProdtId: 10007 },
	{ id: '8', loadYn: 'Y', activeYn: 'N', tit: '학습', TempProdtId: 10008 },
	{ id: '9', loadYn: 'Y', activeYn: 'N', tit: '교과목', TempProdtId: 10009 },
	{ id: '10', loadYn: 'Y', activeYn: 'N', tit: '직무', TempProdtId: 10010 },
	{ id: '11', loadYn: 'Y', activeYn: 'N', tit: '선호도', TempProdtId: 10011 },
]);

const ShowRsltItems = ref([]);

const Modal = ref({
	OrgTurn: false,
});

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

const ShowHide = (type, showHide, acuntId) => {
	switch (type) {
		case 'OrgTurn':
			Modal.value.OrgTurn = showHide;
			OrgId.value = acuntId;
			if (showHide == false) {
				getOrgList(CurPage.value);
			}
			break;
	}
};

const goTab = item => {
	RsltItems.value.forEach(o => {
		if (o.id == item.id) {
			o.activeYn = 'Y';
			// 탭변경
		} else {
			o.activeYn = 'N';
		}
	});
};

const popupTestRslt = () => {
	const Parm = {
		PersnNm: Props.ListItem.PersnNm,
		AnsPrgrsId: Props.ListItem.AnsPrgrsId,
		ProdtId: RsltItems.value.find(o => o.activeYn == 'Y').TempProdtId,
		PersnId: Props.ListItem.PersnId,
	};
	const parm = encodeBase64(JSON.stringify(Parm));
	let uri = `TestRsltAll?p=${parm}`;

	if (windowRef != null && !windowRef.closed) {
		windowRef.focus();
		return;
	}

	const width = screen.width;
	const height = screen.height;
	let left = (screen.width - width) / 2;
	let top = (screen.height - height) / 2;
	let attr = `top=${top}, left=${left}, width=${width}, height=${height}, resizable=yes,status=no,scrollbars=yes`;

	windowRef = window.open(uri, '', attr);
};
// Etc  *************************************
</script>

<style lang="scss" scoped></style>
