<template>
	<div class="TitPage">
		<div>기관 <span>></span><span>등록</span></div>
		<div></div>
	</div>
	<OrgForm
		procType="C"
		v-model:orgId="Org.orgId"
		v-model:bizNum="Org.bizNum"
		v-model:corpNum="Org.corpNum"
		v-model:ceoNm="Org.ceoNm"
		v-model:zip="Org.zip"
		v-model:addr1="Org.addr1"
		v-model:addr2="Org.addr2"
		v-model:addr3="Org.addr3"
		v-model:addr4="Org.addr4"
		v-model:compyNm="Org.compyNm"
		v-model:tel1="Org.tel1"
		v-model:tel2="Org.tel2"
		v-model:fax="Org.fax"
		v-model:bizType="Org.bizType"
		v-model:bizSectr="Org.bizSectr"
		v-model:mngerNm1="Org.mngerNm1"
		v-model:mngerPhone1="Org.mngerPhone1"
		v-model:mngerEmail1="Org.mngerEmail1"
		v-model:mngerNm2="Org.mngerNm2"
		v-model:mngerPhone2="Org.mngerPhone2"
		v-model:mngerEmail2="Org.mngerEmail2"
		v-model:billEmail="Org.billEmail"
		v-model:mngerTeam1="Org.mngerTeam1"
		v-model:mngerPosit1="Org.mngerPosit1"
		v-model:mngerTeam2="Org.mngerTeam2"
		v-model:mngerPosit2="Org.mngerPosit2"
		v-model:urlCd="Org.urlCd"
		v-model:insDt="Org.insDt"
	>
		<template #actions>
			<div></div>
			<div>
				<button
					class="btn btn-primary me-2"
					@click="CretOrg()"
					:disabled="loading"
				>
					<template v-if="loading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else> 등록 </template>
				</button>

				<button class="btn btn-secondary" @click="Go('OrgList', {})">
					목록으로
				</button>
			</div>
		</template>
	</OrgForm>
	<br /><br />
</template>

<script setup>
import { useRouter } from 'vue-router';
import OrgForm from '@/components/Org/OrgForm.vue';
import { ref, watch } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';
const router = useRouter();
const { vAlert, vSuccess } = useAlert();

const Org = ref({
	orgId: '',
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
	insDt: '',
});

const Go = (nm, q) => {
	router.push({ name: nm, query: q });
};

const {
	error,
	loadinig,
	execute: exeCretOrg,
} = useAxios(
	'/api/Org/CretOrg',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			Go('OrgList', {});
			vSuccess('기관이 등록되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const CretOrg = () => {
	exeCretOrg(Org.value);
};

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

<style lang="scss" scoped></style>
