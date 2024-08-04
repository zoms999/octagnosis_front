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
						v-for="(item, idx) in RsltItems"
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
		<div v-show="RsltItems[0].activeYn == 'Y'">
			<UserInfo :ListItem="ListItem"></UserInfo>
		</div>
		<div v-show="RsltItems[1].activeYn == 'Y'">
			<RsltTedcy1 :ListItem="ListItem"></RsltTedcy1>
		</div>
		<div v-show="RsltItems[2].activeYn == 'Y'">
			<RsltTedcy2 :ListItem="ListItem"></RsltTedcy2>
		</div>
		<div v-show="RsltItems[3].activeYn == 'Y'">
			<RsltThink :ListItem="ListItem"></RsltThink>
		</div>
		<div v-show="RsltItems[4].activeYn == 'Y'">
			<RsltTedcyJob :ListItem="ListItem"></RsltTedcyJob>
		</div>
		<div v-show="RsltItems[5].activeYn == 'Y'">
			<RsltAbility :ListItem="ListItem"></RsltAbility>
		</div>
		<div v-show="RsltItems[6].activeYn == 'Y'">
			<RsltAbilityJob :ListItem="ListItem"></RsltAbilityJob>
		</div>
		<div v-show="RsltItems[7].activeYn == 'Y'">
			<RsltStudy :ListItem="ListItem"></RsltStudy>
		</div>
		<div v-show="RsltItems[8].activeYn == 'Y'">
			<RsltSubjt :ListItem="ListItem"></RsltSubjt>
		</div>
		<div v-show="RsltItems[9].activeYn == 'Y'">
			<RsltJobDuty :ListItem="ListItem"></RsltJobDuty>
		</div>
		<div v-show="RsltItems[10].activeYn == 'Y'">
			<RsltPrefer :ListItem="ListItem"></RsltPrefer>
		</div>
	</template>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, inject, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';

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

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');
const router = useRouter();

// Props / Emit  ****************************

const Emit = defineEmits(['showPnl']);
const Props = defineProps({
	ListItem: { type: Object },
});

// Hook  ************************************

// Model / Data  ****************************

const Parm = ref({
	srchStr: '',
});

const RsltItems = ref([
	{ id: '1', cate1: 'Y', cate2: 'Y', activeYn: 'Y', tit: '개인정보' },
	{ id: '2', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '성향진단' },
	{ id: '3', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '성향분석' },
	{ id: '4', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '사고력' },
	{ id: '5', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '성향적합직업학과' },
	{ id: '6', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '역량진단' },
	{ id: '7', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '역량적합직업학과' },
	{ id: '8', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '학습' },
	{ id: '9', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '교과목' },
	{ id: '10', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '직무' },
	{ id: '11', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '선호도' },
]);

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

// Etc  *************************************
</script>

<style lang="scss" scoped></style>
