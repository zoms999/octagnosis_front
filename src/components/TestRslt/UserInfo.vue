<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Persn.persnNm }} 님</p>

				<div class="layout">
					<div class="item full">
						<p class="tit v1">기본정보</p>

						<div class="trans-tbl v1 mt10">
							<!-- tbody 영역 -->
							<div class="tbl-body-item">
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">이름</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<strong>{{ Persn.persnNm }}</strong>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">성별</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<strong>{{
											Persn.sex == '' ? '=' : Persn.sex == 'M' ? '남' : '여'
										}}</strong>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">생일</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<strong>{{
											Persn.birthDate !== null && Persn.birthDate.length == 8
												? `${Persn.birthDate.toString().substring(0, 4)}-${Persn.birthDate.toString().substring(4, 6)}-${Persn.birthDate.toString().substring(6, 8)}`
												: ''
										}}</strong>
									</div>
								</div>
							</div>
							<div class="tbl-body-item">
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">
										휴대전화
									</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<strong>{{ Persn.phone }}</strong>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">
										(추가) 연락처
									</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<strong>{{ Persn.tel }}</strong>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 14.5rem">이메일</div>
									<div class="tbl-col data" style="width: calc(100% - 14.5rem)">
										<strong>{{ Persn.email }}</strong>
									</div>
								</div>
							</div>
							<!--// tbody 영역 -->
						</div>
					</div>
					<div class="item half">
						<p class="tit v1">기본정보</p>

						<div class="tbl-wrap v1 mt10">
							<table>
								<colgroup>
									<col style="width: 14.5rem" />
									<col />
								</colgroup>
								<tbody>
									<tr>
										<td>학업군</td>
										<td>
											<strong>{{ Persn.eductNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>학교명</td>
										<td>
											<strong>{{ Persn.scholNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>학년</td>
										<td>
											<strong>{{ Persn.scholGrade }}</strong>
										</td>
									</tr>
									<tr>
										<td>전공</td>
										<td>
											<strong>{{ Persn.scholMajor }}</strong>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div class="item half">
						<p class="tit v1">최종(현재) 직장 정보</p>

						<div class="tbl-wrap v1 mt10">
							<table>
								<colgroup>
									<col style="width: 14.5rem" />
									<col />
								</colgroup>
								<tbody>
									<tr>
										<td>직업군</td>
										<td>
											<strong>{{ Persn.jobCdNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>직장명</td>
										<td>
											<strong>{{ Persn.jobNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>하는일</td>
										<td>
											<strong>{{ Persn.jobDuty }}</strong>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vSuccess } = useAlert();

// Props / Emit  ****************************

const Props = defineProps({ ListItem: { type: Object } });

// Hook  ************************************
onMounted(() => {
	getPersn();
});

// Model / Data  ****************************

const Persn = ref({
	persnId: 0,
	persnNm: '',
	birthDate: '',
	birthYear: '',
	birthMonth: '',
	birthDay: '',
	sex: '',
	phone: '',
	tel: '',
	email: '',
	zip: '',
	addrStret: '',
	addrLotNum: '',
	addr2: '',
	addr3: '',
	educt: '',
	eductStus: '',
	scholNm: '',
	scholMajor: '',
	scholGrade: '',
	job: '',
	jobNm: '',
	jobDuty: '',
	orgId: '',
	eductNm: '',
	eductStusNm: '',
	jobCdNm: '',
});

const Parm = ref({
	persnId: 0,
});

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getPersn: { path: '/api/personal/getPersn', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getPersn.path:
					Procs.value.getPersn.loading = false;
					Persn.value = data.value.Persn;
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

// Modal  ***********************************

// Watch  ***********************************

// Method  **********************************

const getPersn = () => {
	Parm.value.persnId = Props.ListItem.PersnId;

	execUrl(Procs.value.getPersn.path, Parm.value);
};

// Etc  *************************************
</script>
<style scoped>
@import url(@/assets/css/common.css);
@import url(@/assets/css/components.css);
@import url(@/assets/css/main.css);
@import url(@/assets/css/sub.css);
</style>
