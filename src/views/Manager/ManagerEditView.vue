<template>
	<div class="TitPage">
		<div>매니저관리 <span>></span><span> 수정</span></div>
		<div></div>
	</div>

	<AppLoading v-if="loading" />
	<AppError v-else-if="error" :message="error.message" />
	<div v-else>
		<AppError v-if="editError" :message="editError.message" />
		<ManagerEditForm
			v-model:useYn="form.useYn"
			v-model:email="form.email"
			v-model:pw="form.pw"
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
			v-model:zip="form.zip"
			v-model:addrStret="form.addrStret"
			v-model:addrLotNum="form.addrLotNum"
			v-model:addr2="form.addr2"
			v-model:addr3="form.addr3"
			@submit.prevent="edit"
		>
			<template #actionsPw>
				<button class="btn btn-primary" @click.prevent="changPwModal">
					변경
				</button>
			</template>
			<template #actions>
				<div></div>
				<div>
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
					<button
						type="button"
						class="btn btn-primary ms-2"
						@click="goListPage"
					>
						목록
					</button>
				</div>
			</template>
		</ManagerEditForm>
	</div>

	<Teleport to="#modal">
		<AppModal v-model="show" title="비밀번호변경">
			<template #default>
				<div class="container ItemBox">
					<div class="row">
						<div class="col-12">
							<i></i>신규비밀번호 [ 6~20 자, 영문(대소문자 구분안함), 숫자 ]
						</div>
						<div class="col-12">
							<input
								type="password"
								ref="txtPw"
								class="form-control"
								v-model="userPw"
							/>
						</div>
						<div class="col-12"><i></i>신규비밀번호 확인</div>
						<div class="col-12">
							<input
								type="password"
								ref="txtPwConfirm"
								class="form-control"
								v-model="userPwConfirm"
							/>
						</div>
						<div class="col-12">변경이유</div>
						<div class="col-12">
							<input
								type="text"
								ref="txtActinReasn"
								class="form-control"
								v-model="actinReasn"
							/>
						</div>
					</div>
				</div>
			</template>
			<template #actions>
				<button type="button" class="btn btn-secondary" @click="savePw">
					비밀번호 변경
				</button>
				<button type="button" class="btn btn-secondary" @click="closeModal">
					닫기
				</button>
			</template>
		</AppModal>
	</Teleport>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';
//import { getPostById, updatePost } from '@/api/managers';
import ManagerEditForm from '@/components/manager/ManagerEditForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
const store = useAuthStore();
const { userMngrId } = storeToRefs(store);
const { vAlert, vSuccess } = useAlert();
const router = useRouter();
const route = useRoute();
const mngrId = route.params.mngrId;
const form = ref([]);
//const { data, error, loading } = useAxios(`/api/managers/${mngrId}`);

const { error, loading } = useAxios(
	`/api/managers/${mngrId}`,
	{
		method: 'get',
	},
	{
		// API 요청에 대한 콜백 함수를 설정합니다.
		onSuccess: response => {
			// API 요청이 성공했을 때 호출되는 콜백 함수입니다.
			// 받은 데이터를 form 변수에 할당합니다.

			console.log('response.data' + response.data);
			form.value = response.data;
		},
		// 만약 요청이 실패했을 때의 콜백 함수도 설정할 수 있습니다.
		// onError: (error) => {
		//   console.error('API 요청 실패:', error);
		// },
	},
);

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
			console.log('mngrId-->' + mngrId);
			console.log('수정이 완료되었습니다! ');
			vSuccess('수정 되었습니다.');
			router.push({ name: 'ManagerList' });
		},
		onError: err => {
			//alert(err);
			console.log('err ' + err.message);
			vAlert('수정실패.' + err.message);
			//vAlert(err.message);
		},
	},
);

const submitForm = () => {
	edit(); // save 함수 호출
};

const edit = () => {
	execute({
		...form.value,
		uptId: userMngrId.value, // store에서 가져온 userMngrId 사용
	});
};

const show = ref(false);
const userPw = ref();
const userPwConfirm = ref();
const actinReasn = ref();

const changPwModal = () => {
	show.value = true;
	userPw.value = ''; // 현재 비밀번호 초기화
	userPwConfirm.value = ''; // 변경 비밀번호 초기화
	actinReasn.value = ''; // 변경이유
};
const savePw = () => {
	if (!userPwConfirm.value) {
		vAlert('비밀번호를 입력하세요.');
	} else if (userPw.value !== userPwConfirm.value) {
		vAlert('비밀번호가 일치하지 않습니다.');
	} else if (!actinReasn.value) {
		vAlert('변경사유를 입력하세요.');
	} else {
		axios
			.patch(`/api/managers/chg/${mngrId}`, {
				pw: userPw.value,
				actinReasn: actinReasn.value,
				insId: userMngrId.value,
			})
			.then(response => {
				// 비밀번호가 성공적으로 업데이트되었을 때
				const requestData = JSON.parse(response.config.data);
				const newPw = requestData.pw;
				console.log('비밀번호가 업데이트되었습니다:', newPw); // 응답 데이터를 로그로 출력 (선택사항)
				form.value.pw = newPw;
				closeModal();
			})
			.catch(error => {
				// 오류 메시지 표시
				vAlert('현재 비밀번호가 잘못되었습니다.');
				console.error('비밀번호 업데이트 중 오류 발생:', error); // 오류를 로그로 출력 (선택사항)
			});
	}
};

const closeModal = () => {
	show.value = false;
};

const passwordsMatch = computed(() => userPwConfirm.value === actinReasn.value);

const goListPage = () => router.push({ name: 'ManagerList' });
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
@/hooks/alert
