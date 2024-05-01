<template>
	<div class="TitPage">
		<div>계정관리 > 개인 <span>></span><span> 수정</span></div>
		<div></div>
	</div>
	<PersonalEditForm
		:personal="personal"
		@GoBack="GoBack"
		@editPersonal="savePersonal"
	>
		<template #actionsLog>
			<button
				class="btn btn-primary IconBtn ms-2"
				@click.prevent="showAcuntLoginLog = true"
			>
				<div class="d-flex">
					<span class="me-2">접속로그</span>
					<span class="material-icons"> poll </span>
				</div>
			</button>
			<button
				class="btn btn-primary IconBtn ms-2"
				@click.prevent="showAcuntLog = true"
			>
				<div class="d-flex">
					<span class="me-2">변경로그</span>
					<span class="material-icons"> poll </span>
				</div>
			</button>
		</template>

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

	<!--	비밀번호 변경	------------------------------->
	<Teleport to="#modal">
		<AppModalV1 v-model="show" title="비밀번호 변경" width="500">
			<AcuntChgPw
				v-model="show"
				:AcuntId="personal.AcuntId"
				ActinType="C00205"
				ActinFunc="관리자-개인계정 비밀번호 변경"
				@SetPw="setPw"
			></AcuntChgPw>
		</AppModalV1>
	</Teleport>

	<!--	사용기한 	------------------------------->
	<Teleport to="#modal">
		<AppModalV1 v-model="showExpirDt" title="사용기한 변경" width="500">
			<AcuntChgExpireDt
				v-model="showExpirDt"
				:AcuntId="personal.AcuntId"
				ActinType="C00204"
				ActinFunc="관리자-개인계정 사용기한 수정"
				@SetExpireDt="setExpireDt"
			></AcuntChgExpireDt>
		</AppModalV1>
	</Teleport>

	<!--	접속로그	------------------------------->
	<Teleport to="#modal">
		<AppModal
			v-model="showAcuntLoginLog"
			title="접속로그"
			width="1000"
			:footer="false"
		>
			<template #default>
				<AcuntLoginLogList :AcuntId="personal.AcuntId"></AcuntLoginLogList>
			</template>
		</AppModal>
	</Teleport>

	<!--	변경로그	------------------------------->
	<Teleport to="#modal">
		<AppModal
			v-model="showAcuntLog"
			title="변경로그"
			width="1000"
			:footer="false"
		>
			<AcuntLogList :AcuntId="personal.AcuntId"></AcuntLogList>
		</AppModal>
	</Teleport>

	<!--
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
	-->

	<!--	사용기한 	-----------------------------
	<Teleport to="#modal">
		<AppModal v-model="showExpirDt" title="사용기한 변경" width="500">
			<template #default>
				<div class="container ItemBox">
					<div class="row">
						<div class="col-12">사용기한</div>
						<div class="col-12">
							<VueDatePicker
								v-model="expirDtNew"
								locale="ko"
								:format="formatDate"
								:enable-time-picker="false"
							>
							</VueDatePicker>
						</div>
						<div class="col-12">변경이유</div>
						<div class="col-12">
							<input
								type="text"
								ref="txtActinReasnExpir"
								class="form-control"
								v-model="MngrLog.actinReasn"
							/>
						</div>
					</div>
				</div>
			</template>
			<template #actions>
				<button type="button" class="btn btn-secondary" @click="closeModal">
					닫기
				</button>
				<button type="button" class="btn btn-primary" @click="saveExpirDt">
					저장
				</button>
			</template>
		</AppModal>
	</Teleport>
--></template>

<script setup>
import { ref, computed } from 'vue';
//import { getPostById, updatePost } from '@/api/managers';
import PersonalEditForm from '@/components/personal/PersonalEditForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { useAlertStore } from '@/stores/alert';

import AcuntChgPw from '@/components/Acunt/AcuntChgPw.vue';
import AcuntChgExpireDt from '@/components/Acunt/AcuntChgExpirDt.vue';
import AcuntLogList from '@/components/Acunt/AcuntLogList.vue';
import AcuntLoginLogList from '@/components/Acunt/AcuntLoginLogList.vue';

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
	}
};

const userpw = ref();
const userpw1 = ref();
const userpw2 = ref();

const show = ref(false);
const showExpirDt = ref(false);
const showAcuntLog = ref(false);
const showAcuntLoginLog = ref(false);

const changPwModal = () => {
	show.value = true;
	userpw.value = ''; // 현재 비밀번호 초기화
	userpw1.value = ''; // 변경 비밀번호 초기화
	userpw2.value = ''; // 비밀번호 확인 초기화
};

const changExpirDtModal = () => {
	showExpirDt.value = true;
};

/*
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
*/

const savePersonal = () => {
	if (!personal.value.PersnNm) {
		vAlert('이름을 입력해주세요.');
		return; // Stop execution if name is not provided
	}
	if (!personal.value.BirthDate) {
		vAlert('생년월일을 입력해주세요.');
		return;
	}
	if (!personal.value.Sex) {
		vAlert('성별을 선택해주세요.');
		return;
	}
	if (!personal.value.Phone) {
		vAlert('휴대전화를 입력해주세요.');
		return;
	}
	if (!personal.value.Email) {
		vAlert('이메일을 입력해주세요.');
		return;
	}
	// if (!personal.value.Zip) {
	// 	vAlert('우편번호를 입력해주세요.');
	// 	return;
	// }
	// if (!personal.value.LotNumAddr1) {
	// 	vAlert('도로명 주소를 입력해주세요.');
	// 	return;
	// }
	// if (!personal.value.LotNumAddr2) {
	// 	vAlert('지번 주소를 입력해주세요.');
	// 	return;
	// }
	// if (!personal.value.StretAddr1) {
	// 	vAlert('상세 주소를 입력해주세요.');
	// 	return;
	// }
	if (!personal.value.Educt) {
		vAlert('학력을 선택해주세요.');
		return;
	}
	if (!personal.value.ScholNm) {
		vAlert('학교명을 입력해주세요.');
		return;
	}
	if (!personal.value.ScholMajor) {
		vAlert('전공을 입력해주세요.');
		return;
	}
	if (!personal.value.ScholGrade) {
		vAlert('학년을 입력해주세요.');
		return;
	}
	if (!personal.value.Job) {
		vAlert('직업군을 선택해주세요.');
		return;
	}
	if (!personal.value.JobNm) {
		vAlert('직장명을 입력해주세요.');
		return;
	}
	if (!personal.value.JobDuty) {
		vAlert('하는 일을 입력해주세요.');
		return;
	}

	let personalData = {
		persnId: personal.value.PersnId,
		persnNm: personal.value.PersnNm,
		birthDate: personal.value.BirthDate,
		sex: personal.value.Sex,
		phone: personal.value.Phone,
		tel: personal.value.Tel,
		email: personal.value.Email,
		zip: personal.value.Zip,
		lotNumAddr1: personal.value.LotNumAddr1,
		lotNumAddr2: personal.value.LotNumAddr2,
		stretAddr1: personal.value.StretAddr1,
		stretAddr2: personal.value.StretAddr2,
		educt: personal.value.Educt,
		scholNm: personal.value.ScholNm,
		scholMajor: personal.value.ScholMajor,
		scholGrade: personal.value.ScholGrade,
		job: personal.value.Job,
		jobNm: personal.value.JobNm,
		jobDuty: personal.value.JobDuty,
		uptId: userMngrId.value,
		acuntId: personal.value.AcuntId,
		expirDt: personal.value.ExpirDt.replace(/-/g, ''),
	};

	axios
		.post(`/api/personal/edit/${persnId}`, personalData) // Removed spread syntax
		.then(response => {
			vSuccess('수정 되었습니다.');
			console.log('Personal data updated successfully:', response.data);
			router.push({ name: 'PersonalList' });
		})
		.catch(error => {
			vAlert('수정실패.' + error.message);
			console.error('Error updating personal data:', error);
		});
};

getPersnByPersnIdAndType();

const txtActinReasnExpir = ref(null);
const MngrLog = ref({
	logId: '',
	mngrId: userMngrId.value,
	actinDt: '',
	actinReasn: '',
	actinType: 'C00102',
	actinRslt: '',
	actinFunc: '',
	insId: userMngrId.value,
	insDt: '',
	uptId: userMngrId.value,
	uptDt: '',
});
const Procs = ref({
	chgExpirDt: { path: '/api/Acunt/chgExpirDt', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.chgExpirDt.path:
					Procs.value.chgExpirDt.loading = false;
					showExpirDt.value = false;
					MngrLog.value.actinReasn = '';
					personal.value.ExpirDt = formatDate(expirDtNew.value);
					vSuccess('사용기한이 수정되었습니다. ');
					break;

				default:
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			// Procs의 모든 속성에 대해 반복문을 실행하여 loading 값을 true로 변경
			for (const key in Procs.value) {
				if (Object.hasOwnProperty.call(Procs.value, key)) {
					Procs.value[key].loading = false;
				}
			}
		},
	},
);
const expirDtNew = ref('');
const saveExpirDt = () => {
	if (!validNotBlank(expirDtNew.value, '사용기한', null)) return;
	if (!validNotBlank(MngrLog.value.actinReasn, '변경이유', txtActinReasnExpir))
		return;

	MngrLog.value.actinType = 'C00202';
	MngrLog.value.actinFunc = '관리자-기관계정 사용기한 수정';

	Procs.value.chgExpirDt.loading = true;
	execUrl(Procs.value.chgExpirDt.path, {
		acuntId: personal.value.AcuntId,
		expirDt: formatDate(expirDtNew.value).replace(/-/g, ''),
		userId: userMngrId.value,
		mngrLog: MngrLog.value,
	});
};

const closeModal = () => {
	show.value = false;
	showExpirDt.value = false;
};
const GoBack = () => {
	window.history.back();
};
const validNotBlank = (val, tit, obj) => {
	val = typeof val != 'string' ? val.toString() : val;
	var Val = val.replace(/\s/g, '');
	if (Val.length == 0) {
		vAlert(tit == null ? `입력해 주세요.` : `${tit}를(을) 입력해 주세요.`);
		if (obj != null) {
			obj.focus();
		}
		return false;
	}
	return true;
};

// 사용기한 수정
const setExpireDt = expireDt => {
	personal.value.ExpirDt = expireDt;
};

// 비밀번호 수정
const setPw = pw => {
	personal.value.Pw = pw;
};

const formatDate = date => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	// 날짜 앞에 0을 붙여야 하는 경우
	if (month || day < 10) {
		const zeroDay = ('00' + day).slice(-2);
		const zeroMonth = ('00' + month).slice(-2);

		return `${year}-${zeroMonth}-${zeroDay}`;
	} else {
		return `${year}-${month}-${day}`;
	}
};

const passwordsMatch = computed(() => userpw1.value === userpw2.value);
</script>

<style lang="scss" scoped></style>
