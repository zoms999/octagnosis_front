<template>
	<div>
		<PersonalEditForm
			:personal="personal"
			@GoBack="GoBack"
			@editPersonal="savePersonal"
		>
			<template #actionsPw>
				<button class="btn btn-primary" @click.prevent="changPwModal">
					변경
				</button>
			</template>
			<template #actionsExpirDt>
				<button class="btn btn-primary" @click.prevent="changExpirDtModal">
					사용기한
				</button>
			</template>
		</PersonalEditForm>
	</div>
	<Teleport to="#modal">
		<AppModal v-model="show" title="비밀번호변경">
			<template #default>
				<div class="mb-3 row">
					<label for="inputPassword" class="col-sm-4 col-form-label"
						>현재 비밀번호</label
					>
					<div class="col-sm-8">
						<input
							type="password"
							class="form-control"
							id="userpw"
							v-model="userpw"
						/>
					</div>
				</div>
				<div class="mb-3 row">
					<label for="inputPassword" class="col-sm-4 col-form-label"
						>변경 비밀번호</label
					>
					<div class="col-sm-8">
						<input
							type="password"
							class="form-control"
							id="userpw1"
							v-model="userpw1"
						/>
					</div>
				</div>
				<div class="mb-3 row">
					<label for="inputPassword" class="col-sm-4 col-form-label"
						>비밀번호 확인</label
					>
					<div class="col-sm-8">
						<input
							type="password"
							class="form-control"
							id="userpw2"
							v-model="userpw2"
						/>
						<div v-if="!passwordsMatch" class="text-danger">
							비밀번호가 일치하지 않습니다.
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

	<Teleport to="#modal">
		<AppModal v-model="showExpirDt" title="변경 이력을 기록합니다.">
			<template #default>
				<div class="mb-3 row">
					<label for="inputPassword" class="col-sm-4 col-form-label"
						>변경이유?</label
					>
					<div class="col-sm-8">
						<input
							type="text"
							class="form-control"
							id="reasonChange"
							v-model="reasonChange"
						/>
					</div>
				</div>
			</template>
			<template #actions>
				<button type="button" class="btn btn-secondary" @click="closeModal">
					닫기
				</button>
				<button type="button" class="btn btn-secondary" @click="save">
					저장
				</button>
			</template>
		</AppModal>
	</Teleport>
</template>

<script setup>
import { ref } from 'vue';
//import { getPostById, updatePost } from '@/api/managers';
import PersonalEditForm from '@/components/personal/PersonalEditForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import axios from 'axios';
const store = useAuthStore();
const { userMngrId } = storeToRefs(store);
const { vAlert, vSuccess } = useAlert();
const router = useRouter();
const route = useRoute();
const persnId = route.params.persnId;
const personal = ref([]);
console.log('goEditPage -- > ' + persnId);

const getPersnByPersnIdAndType = async () => {
	try {
		const response = await axios.post(
			'/api/personal/getPersnByPersnIdAndType',
			{
				persnId: persnId,
			},
		);
		personal.value = response.data.Personal;
		console.log('Response:', response.data.Personal); // Log the response
	} catch (error) {
		console.error('Error checking email duplication:', error);
		alert('An error occurred while checking email duplication.');
	}
};

const show = ref(false);
const userpw = ref();
const userpw1 = ref();
const userpw2 = ref();

const showExpirDt = ref(false);

const changPwModal = () => {
	show.value = true;
	userpw.value = ''; // 현재 비밀번호 초기화
	userpw1.value = ''; // 변경 비밀번호 초기화
	userpw2.value = ''; // 비밀번호 확인 초기화
};

const changExpirDtModal = () => {
	showExpirDt.value = true;
};

const savePw = () => {
	if (!userpw1.value) {
		vAlert('변경할 비밀번호를 입력하세요.');
	} else if (userpw1.value !== userpw2.value) {
		vAlert('비밀번호가 일치하지 않습니다.');
	} else {
		axios
			.patch(`/api/personal/chgpw/${persnId}`, {
				currentPassword: userpw.value,
				newPassword: userpw1.value,
			})
			.then(response => {
				const requestData = JSON.parse(response.config.data);
				const newPw = requestData.newPassword;
				console.log('비밀번호가 업데이트되었습니다:', newPw); // 응답 데이터를 로그로 출력 (선택사항)
				//form.value.pw = newPw;
				closeModal();
			})
			.catch(error => {
				// 오류 메시지 표시
				vAlert('현재 비밀번호가 잘못되었습니다.');
				console.error('비밀번호 업데이트 중 오류 발생:', error); // 오류를 로그로 출력 (선택사항)
			});
	}
};

const savePersonal = () => {
	let personalData = {
		persnId: personal.value.PersnId,
		persnNm: personal.value.PersnNm,
		sex: personal.value.Sex,
		phone: personal.value.Phone,
		tel: personal.value.Tel,
		email: personal.value.Email,
		zip: personal.value.Zip,
		addr1: personal.value.Addr1,
		addr2: personal.value.Addr2,
		addr3: personal.value.Addr3,
		addr4: personal.value.Addr4,
		educt: personal.value.Educt,
		scholNm: personal.value.ScholNm,
		scholMajor: personal.value.ScholMajor,
		scholGrade: personal.value.ScholGrade,
		job: personal.value.Job,
		jobNm: personal.value.JobNm,
		jobDuty: personal.value.JobDuty,
		uptId: userMngrId.value,
		acuntId: personal.value.AcuntId,
		expirDt: personal.value.ExpirDt,
	};

	axios
		.post(`/api/personal/edit/${persnId}`, personalData) // Removed spread syntax
		.then(response => {
			vSuccess('수정 되었습니다.');
			console.log('Personal data updated successfully:', response.data);
		})
		.catch(error => {
			vAlert('수정실패.' + error.message);
			console.error('Error updating personal data:', error);
		});
};

// const { execute } = useAxios(
// 	`/api/personal/edit/${persnId}`,
// 	{ method: 'patch' },
// 	{
// 		immediate: false,
// 		onSuccess: () => {
// 			console.log('persnId-->' + persnId);
// 			console.log('수정이 완료되었습니다! ');
// 			vSuccess('수정 되었습니다.');
// 			//router.push({ name: 'ManagerList' });
// 		},
// 		onError: err => {
// 			//alert(err);
// 			console.log('err ' + err.message);
// 			vAlert('수정실패.' + err.message);
// 			//vAlert(err.message);
// 		},
// 	},
// );

// const savePersonal = () => {
// 	execute({
// 		...personal.value,
// 		uptId: userMngrId.value, // store에서 가져온 userMngrId 사용
// 	});
// };

const closeModal = () => {
	show.value = false;
};
const GoBack = () => {
	window.history.back();
};
getPersnByPersnIdAndType();
</script>

<style lang="scss" scoped></style>
