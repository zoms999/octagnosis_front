<template>
	<AppError v-if="error" :message="error.message" />
	<h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
	<hr class="my-4" />
	<ManagerCreateForm
		v-model:useYn="form.useYn"
		v-model:email="form.email"
		v-model:mngrNm="form.mngrNm"
		v-model:phone="form.phone"
		v-model:tel="form.tel"
		v-model:authAdmin="form.authAdmin"
		v-model:authOrg="form.authOrg"
		v-model:authPersn="form.authPersn"
		v-model:authBbs="form.authBbs"
		v-model:authRsltView="form.authRsltView"
		v-model:authLogView="form.authLogView"
		v-model:authStati="form.authStati"
		@submit.prevent="save"
	>
		<template #actions>
			<div></div>
			<div>
				<button
					type="button"
					class="btn btn-outline-dark me-2"
					@click="goListPage"
				>
					목록
				</button>
				<button class="btn btn-primary" @click="submitForm" :disabled="loading">
					<template v-if="loading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else> 저장 </template>
				</button>
			</div>
		</template>
		<template #actionsDupl>
			<button class="btn btn-primary" @click.prevent="checkDuplicate">
				중복확인
			</button>
		</template>
	</ManagerCreateForm>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//import { createPost } from '@/api/posts';
import ManagerCreateForm from '@/components/manager/ManagerCreateForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
const store = useAuthStore();
const { userMngrId } = storeToRefs(store);

const router = useRouter();
const form = ref({
	useYn: 'Y',
	email: null,
	mngrNm: null,
	phone: null,
	tel: null,
	authAdmin: null,
	authOrg: null,
	authPersn: null,
	authBbs: null,
	authRsltView: null,
	authLogView: null,
	authStati: null,
	insId: userMngrId.value,
});
console.log('ManagerCreateForm userMngrId.value --> ' + userMngrId.value);
const { vAlert, vSuccess } = useAlert();
const { error, loading, execute } = useAxios(
	'/api/managers',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'ManagerList' });
			vSuccess('등록이 완료되었습니다!');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const submitForm = () => {
	save(); // save 함수 호출
};

const save = async () => {
	//alert('save');
	execute({ ...form.value });
};

const checkDuplicate = async () => {
	try {
		const response = await axios.post('/api/managers/check-duplicate-email', {
			email: form.value.email,
		});

		console.log('Response:', response); // Log the response
		if (response.data.exists) {
			alert('이미 등록된 이메일주소입니다.');
			form.value.email = null;
		} else {
			alert('사용가능한 이메일주소입니다.');
		}
	} catch (error) {
		console.error('Error checking email duplication:', error);
		alert('An error occurred while checking email duplication.');
	}
};

const goListPage = () => router.push({ name: 'ManagerList' });
const visibleForm = ref(true);
</script>

<style lang="scss" scoped>
body {
	margin-top: 20px;
	background-color: #f2f6fc;
	color: #69707a;
}
.img-account-profile {
	height: 10rem;
}
.rounded-circle {
	border-radius: 50% !important;
}
.card {
	box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}
.card .card-header {
	font-weight: 500;
}
.card-header:first-child {
	border-radius: 0.35rem 0.35rem 0 0;
}
.card-header {
	padding: 1rem 1.35rem;
	margin-bottom: 0;
	background-color: rgba(33, 40, 50, 0.03);
	border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}
.form-control,
.dataTable-input {
	display: block;
	width: 100%;
	padding: 0.875rem 1.125rem;
	font-size: 0.875rem;
	font-weight: 400;
	line-height: 1;
	color: #69707a;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid #c5ccd6;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border-radius: 0.35rem;
	transition:
		border-color 0.15s ease-in-out,
		box-shadow 0.15s ease-in-out;
}

.nav-borders .nav-link.active {
	color: #0061f2;
	border-bottom-color: #0061f2;
}
.nav-borders .nav-link {
	color: #69707a;
	border-bottom-width: 0.125rem;
	border-bottom-style: solid;
	border-bottom-color: transparent;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	padding-left: 0;
	padding-right: 0;
	margin-left: 1rem;
	margin-right: 1rem;
}
</style>
