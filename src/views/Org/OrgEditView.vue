<template>
	<div class="TitPage">
		<div>기관 <span>></span><span> 수정</span></div>
		<div></div>
	</div>
	<OrgForm
		ProcType="E"
		v-model:ObjOrg="Org"
		v-model:ObjAcunt="Acunt"
		v-model:ObjOrgTurn="OrgTurn"
		v-model:OrgId="OrgId"
		@Go="Go"
		@GoBack="GoBack"
	>
	</OrgForm>
	<br /><br />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useAxios } from '@/hooks/useAxios';

import OrgForm from '@/components/Org/OrgForm.vue';

// Props / Emit  ****************************

//console.log('111OrgId :  ', route.query.orgId);

// Data *************************************

const router = useRouter();
const route = useRoute();
const { userMngrId } = storeToRefs(useAuthStore());
const OrgId = ref(route.query.orgId);

const { vAlert, vSuccess } = useAlert();

const Org = ref({
	orgId: '0',
	bizNum: '',
	corpNum: '',
	ceoNm: '',
	zip: '',
	roadAddr1: '',
	roadAddr2: '',
	stretAddr1: '',
	stretAddr2: '',
	compyNm: '',
	tel1: '',
	tel2: '',
	fax: '',
	bizType: '',
	bizSectr: '',
	mngerNm1: '',
	mngerPhone1: '',
	mngerEmail1: '',
	mngerNm2: '',
	mngerPhone2: '',
	mngerEmail2: '',
	billEmail: '',
	mngerTeam1: '',
	mngerPosit1: '',
	mngerTeam2: '',
	mngerPosit2: '',
	urlCd: '',
	insId: userMngrId.value,
	insDt: '',
	uptId: userMngrId.value,
	uptDt: '',
});

const OrgTurn = ref({
	orgId: '',
	turnId: '',
	useYn: 'Y',
	turnNum: '',
	turnReqCnt: '0',
	turnUseCnt: '0',
	turnConnCd: '',
	insId: userMngrId.value,
	insDt: '',
	uptId: userMngrId.value,
	uptDt: '',
});

const Acunt = ref({
	acuntId: '',
	userType: 'C00101',
	userId: '',
	pw: '',
	useYn: 'Y',
	regDt: '',
	leaveDt: '',
	expirDt: '',
	termsUse: 'Y',
	termsPersn: 'Y',
	termsEvent: 'Y',
	insId: userMngrId,
	insDt: '',
	uptId: userMngrId,
	uptDt: '',

	pwConfirm: '',

	pwNew: '',
	pwNewConfirm: '',
});

// Axios	***********************************

const Procs = ref({
	GetOrg: { path: '/api/Org/GetOrg', loading: false },
});

const { data, error, loading, execute, execUrl, reqUrl } = useAxios(
	'',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case '/api/Org/GetOrg':
					Org.value = data.value.Org;
					Acunt.value = data.value.Acunt;
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

// Hook 	****************************************

onBeforeMount(async () => {
	let Parm = {
		orgId: OrgId.value,
	};

	Procs.value.GetOrg.loading = true;
	execUrl(Procs.value.GetOrg.path, Parm);
});

// Show/Hide	************************************

// Route	****************************************

const Go = (nm, q) => {
	router.push({ name: nm, query: q });
};
const GoBack = () => {
	window.history.back();
};

// Method	****************************************

// Watch	****************************************
/**
watch(
	() => Org.value.urlCd,
	(newValue, oldValue) => {
		console.log('urlCd 값이 변경되었습니다.');
		console.log('newValue : ', newValue);
		console.log('oldValue : ', oldValue);
		Org.value.urlCd = newValue.replace(/[^a-zA-Z0-9]/g, '');
	},
);
 */
</script>
