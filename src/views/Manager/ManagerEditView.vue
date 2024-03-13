<template>
	<AppLoading v-if="loading" />
	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message" />
		<ManagerForm
			v-model:useYn="form.useYn"
			v-model:email="form.email"
			v-model:mngrNm="form.mngrNm"
			v-model:phone="form.phone"
			v-model:tel="form.tel"
			v-model:authPersn="form.authPersn"
			v-model:authRsltView="form.authRsltView"
			v-model:authAdmin="form.authAdmin"
			v-model:authLogView="form.authLogView"
			v-model:authStati="form.authStati"
			v-model:authBbs="form.authBbs"
			v-model:authOrg="form.authOrg"
			@submit.prevent="edit"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDetailPage"
				>
					취소
				</button>
				<button
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
			</template>
		</ManagerForm>
	</div>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue';
//import { getPostById, updatePost } from '@/api/managers';
import ManagerForm from '@/components/manager/ManagerForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
const router = useRouter();
const route = useRoute();
const mngrId = route.params.mngrId;
// const props = defineProps({
// 	mngrId: [String, Number],
// });
//const { mngrId: mngrIdRef } = toRefs(props);

const { data: form, error, loading } = useAxios(`/api/managers/${mngrId}`);

const {
	error: editError,
	loading: editLoading,
	execute,
} = useAxios(
	`/api/managers/${mngrId}`,
	{ method: 'patch' },
	{
		immediate: false,
		onSuccess: () => {
			//vSuccess('수정이 완료되었습니다!');
			console.log('mngrId-->' + mngrId);
			console.log('수정이 완료되었습니다! ');
			alert('saveed');
			//router.push({ name: 'ManagerList', params: { mngrId } });
		},
		onError: err => {
			alert(err);
			console.log('err ' + err.message);
			//vAlert(err.message);
		},
	},
);

const submitForm = () => {
	edit(); // save 함수 호출
};

const edit = () => {
	alert('save');
	execute({
		...form.value,
	});
};

const goDetailPage = () =>
	router.push({ name: 'ManagerEdit', params: { mngrId } });
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
