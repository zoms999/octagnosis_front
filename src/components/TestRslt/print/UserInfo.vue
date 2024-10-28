<template>
	<div class="result" v-if="Persn">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Persn?.persnNm }} 님</p>

				<div class="layout">
					<div class="item full">
						<p class="tit v1">기본정보</p>

						<div class="trans-tbl v1 mt10">
							<!-- tbody 영역 -->
							<div class="tbl-body-item">
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 8rem">이름</div>
									<div class="tbl-col data" style="width: calc(100% - 8rem)">
										<strong>{{ Persn?.persnNm }}</strong>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 8rem">성별</div>
									<div class="tbl-col data" style="width: calc(100% - 8rem)">
										<strong>{{ Persn?.sex == 'M' ? '남' : '여' }}</strong>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 8rem">생일</div>
									<div class="tbl-col data" style="width: calc(100% - 8rem)">
										<strong>{{
											Persn?.birthDate
												? `${Persn.birthDate.toString().substring(0, 4)}-${Persn.birthDate.toString().substring(4, 6)}-${Persn.birthDate.toString().substring(6, 8)}`
												: ''
										}}</strong>
									</div>
								</div>
							</div>
							<div class="tbl-body-item">
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 8rem">휴대전화</div>
									<div class="tbl-col data" style="width: calc(100% - 8rem)">
										<strong>{{ Persn?.phone }}</strong>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 9rem">
										(추가) 연락처
									</div>
									<div class="tbl-col data" style="width: calc(100% - 9rem)">
										<strong>{{ Persn?.tel }}</strong>
									</div>
								</div>
								<div class="tbl-row">
									<div class="tbl-col data" style="width: 9rem">이메일</div>
									<div class="tbl-col data" style="width: calc(100% - 9rem)">
										<strong>{{ Persn?.email }}</strong>
									</div>
								</div>
							</div>
							<!--// tbody 영역 -->
						</div>
					</div>
					<div class="item half">
						<p class="tit v1">기본정보</p>

						<div class="tbl-wrap v1 mt10">
							<table style="width: 100%">
								<colgroup>
									<col style="width: 9rem" />
									<col style="width: calc(100% - 9rem)" />
								</colgroup>
								<tbody>
									<tr>
										<td>학업군</td>
										<td>
											<strong>{{ Persn?.eductNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>학교명</td>
										<td>
											<strong>{{ Persn?.scholNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>학년</td>
										<td>
											<strong>{{ Persn?.scholGrade }}</strong>
										</td>
									</tr>
									<tr>
										<td>전공</td>
										<td>
											<strong>{{ Persn?.scholMajor }}</strong>
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
									<col style="width: 9rem" />
									<col />
								</colgroup>
								<tbody>
									<tr>
										<td>직업군</td>
										<td>
											<strong>{{ Persn?.jobCdNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>직장명</td>
										<td>
											<strong>{{ Persn?.jobNm }}</strong>
										</td>
									</tr>
									<tr>
										<td>하는일</td>
										<td>
											<strong>{{ Persn?.jobDuty }}</strong>
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

const Persn = ref(null); // null로 초기화

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

const getPersn = async () => {
	try {
		if (!Props.ListItem?.PersnId) return;

		Parm.value.persnId = Props.ListItem.PersnId;
		await execUrl(Procs.value.getPersn.path, Parm.value);
	} catch (error) {
		console.error('getPersn error:', error);
		vAlert('사용자 정보를 불러오는데 실패했습니다.');
	}
};

// Etc  *************************************
</script>
<style scoped>
@import url(@/assets/css/print_common.css);
@import url(@/assets/css/print_components.css);
@import url(@/assets/css/print_main.css);
@import url(@/assets/css/print_sub.css);
</style>
