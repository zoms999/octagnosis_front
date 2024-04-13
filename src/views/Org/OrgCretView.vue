<template>
	<div class="TitPage">
		<div>기관 <span>></span><span>등록</span></div>
		<div></div>
	</div>
	<OrgForm
		ProcType="C"
		:ObjOrg="Org"
		:ObjAcunt="Acunt"
		:ObjOrgTurn="OrgTurn"
		@Go="Go"
		@GoBack="GoBack"
	>
	</OrgForm>
	<br /><br />
</template>

<script setup>
import { useRouter } from 'vue-router';
import OrgForm from '@/components/Org/OrgForm.vue';
import { ref } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

// Props / Emit  ****************************

// Data *************************************

const router = useRouter();
const { vAlert, vSuccess } = useAlert();
const { userMngrId } = storeToRefs(useAuthStore());

const Org = ref({
	orgId: '0',
	bizNum: '',
	corpNum: '',
	ceoNm: '',
	zip: '',
	addr1: '',
	addr2: '',
	addr3: '',
	addr4: '',
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
	insId: userMngrId,
	insDt: '',
	uptId: '',
	uptDt: '',
});

const OrgTurn = ref({
	orgId: '',
	turnId: '',
	useYn: 'Y',
	turnNum: '1',
	turnReqCnt: '0',
	turnUseCnt: '0',
	turnConnCd: '',
	insId: userMngrId,
	insDt: '',
	uptId: '',
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
	uptId: '',
	uptDt: '',

	pwConfirm: '',
	oldPw: '',
	newPw: '',
	newPwConfirm: '',
});

// Axios	***********************************

const { data, error, loading, execute, execUrl, reqUrl } = useAxios(
	'',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case '/api/Org/CretOrg':
					vSuccess('기관이 등록되었습니다.');
					//Go();
					break;
				case '/api/Org/ChangePw':
					vSuccess('비밀번호가 변경되었습니다.');
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

// Show/Hide	******************************************

// Route	**********************************************

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
