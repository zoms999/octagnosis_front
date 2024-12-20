<template>
	<div class="result">
		<div class="result-sheet">
			<div class="result-view">
				<p class="name">{{ Props.ListItem.PersnNm }} 님</p>
				<p class="headline">
					옥타그노시스검사 결과에 따른 <strong>선호도반응</strong>
					검사결과 입니다.
				</p>
				<div class="summary">
					<p class="text fs110">
						{{ Props.ListItem.PersnNm }}님이 옥타그노시스 검사를 통해 분석된
						선호하는 성향을 진단한 결과입니다.
					</p>
				</div>

				<div class="chart-wrap d-flex justify-content-center">
					<div class="p-3 chart1">
						<canvas ref="chart1Ref"></canvas>
					</div>
					<div class="p-3 chart2">
						<canvas ref="chart2Ref"></canvas>
					</div>
				</div>

				<p class="tit v3 mt-4">
					{{ Props.ListItem.PersnNm }}님은
					<strong class="txt-mint"
						>{{ Rslt2[0] == null ? '-' : Rslt2[0].rrate1 }}%</strong
					>의 비율로
					<strong class="txt-mint"
						>{{ Rslt2[0] == null ? '-' : Rslt2[0].tdname1 }} </strong
					>을 선호하셨습니다.
				</p>

				<p class="txt-comment mt5">
					<strong>{{ Rslt2[0] == null ? '-' : Rslt2[0].tdname1 }} </strong> :
					{{ Rslt2[0] == null ? '-' : Rslt2[0].exp1 }}
				</p>

				<div class="hide-mobile mt10">
					<div class="tbl-wrap v2">
						<table>
							<colgroup>
								<col style="width: 10.092%" />
								<col style="width: 32.111%" />
								<col style="width: 32.111%" />
								<col style="width: 25.688%" />
							</colgroup>
							<thead>
								<tr>
									<th class="ta-l">직업명</th>
									<th>직무 개요</th>
									<th>주요 업무</th>
									<th>관련 학과</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, idx) in Rslt3" :key="idx">
									<td class="va-t ta-l">{{ item.JobNm }}</td>
									<td class="va-t ta-l">
										{{ item.Expl }}
									</td>
									<td class="va-t ta-l">
										{{ item.MainWork }}
									</td>
									<td class="va-t ta-l">
										{{ item.major }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<p class="tit v3 mt-4">
					{{ Props.ListItem.PersnNm }}님은
					<strong class="txt-mint"
						>{{ Rslt2[0] == null ? '-' : Rslt2[0].rrate2 }}%</strong
					>의 비율로
					<strong class="txt-mint"
						>{{ Rslt2[0] == null ? '-' : Rslt2[0].tdname2 }} </strong
					>을 선호하셨습니다.
				</p>

				<p class="txt-comment mt5">
					<strong>{{ Rslt2[0] == null ? '-' : Rslt2[0].tdname2 }} </strong> :
					{{ Rslt2[0] == null ? '-' : Rslt2[0].exp2 }}
				</p>

				<div class="tbl-wrap v2">
					<table>
						<colgroup>
							<col style="width: 10.092%" />
							<col style="width: 32.111%" />
							<col style="width: 32.111%" />
							<col style="width: 25.688%" />
						</colgroup>
						<thead>
							<tr>
								<th class="ta-l">직업명</th>
								<th>직무 개요</th>
								<th>주요 업무</th>
								<th>관련 학과</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, idx) in Rslt4" :key="idx">
								<td class="va-t ta-l">{{ item.JobNm }}</td>
								<td class="va-t ta-l">
									{{ item.Expl }}
								</td>
								<td class="va-t ta-l">
									{{ item.MainWork }}
								</td>
								<td class="va-t ta-l">
									{{ item.major }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<p class="tit v3 mt-4">
					{{ Props.ListItem.PersnNm }}님은
					<strong class="txt-mint"
						>{{ Rslt2[0] == null ? '-' : Rslt2[0].rrate3 }}%</strong
					>의 비율로
					<strong class="txt-mint"
						>{{ Rslt2[0] == null ? '-' : Rslt2[0].tdname3 }} </strong
					>을 선호하셨습니다.
				</p>

				<p class="txt-comment mt5">
					<strong>{{ Rslt2[0] == null ? '-' : Rslt2[0].tdname3 }} </strong> :
					{{ Rslt2[0] == null ? '-' : Rslt2[0].exp3 }}
				</p>

				<div class="hide-mobile mt10">
					<div class="tbl-wrap v2">
						<table>
							<colgroup>
								<col style="width: 10.092%" />
								<col style="width: 32.111%" />
								<col style="width: 32.111%" />
								<col style="width: 25.688%" />
							</colgroup>
							<thead>
								<tr>
									<th class="ta-l">직업명</th>
									<th>직무 개요</th>
									<th>주요 업무</th>
									<th>관련 학과</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, idx) in Rslt5" :key="idx">
									<td class="va-t ta-l">{{ item.JobNm }}</td>
									<td class="va-t ta-l">
										{{ item.Expl }}
									</td>
									<td class="va-t ta-l">
										{{ item.MainWork }}
									</td>
									<td class="va-t ta-l">
										{{ item.major }}
									</td>
								</tr>
							</tbody>
						</table>
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
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const { vAlert } = useAlert();

// Props / Emit  ****************************
const Props = defineProps({ ListItem: { type: Object } });

// Hook  ************************************
onMounted(() => {
	getRsltPrefer();
});

// Model / Data  ****************************
const Parm = ref({
	ansPrgrsId: 0,
});

const Rslt1 = ref([{ tcnt: '0', cnt: '0', irate: '0' }]);
const Rslt2 = ref([{
	tdname1: '',
	qcnt1: '',
	rrate1: '',
	tdname2: '',
	qcnt2: '',
	rrate2: '',
	tdname3: '',
	qcnt3: '',
	rrate3: '',
	exp1: '',
	exp2: '',
	exp: '',
}]);
const Rslt3 = ref({});
const Rslt4 = ref({});
const Rslt5 = ref({});

const chart1Ref = ref(null);
const chart2Ref = ref(null);

// Axios / Route  ***************************
const Procs = ref({
	getRsltPrefer: { path: '/api/Test/getRsltPrefer', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getRsltPrefer.path:
					Procs.value.getRsltPrefer.loading = false;
					Rslt1.value = data.value.Rslt1;
					Rslt2.value = data.value.Rslt2;
					Rslt3.value = data.value.Rslt3;
					Rslt4.value = data.value.Rslt4;
					Rslt5.value = data.value.Rslt5;

					setChart();
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			for (const key in Procs.value) {
				if (Object.hasOwnProperty.call(Procs.value, key)) {
					Procs.value[key].loading = false;
				}
			}
		},
	},
);

// Method  **********************************
const getRsltPrefer = () => {
	Parm.value.ansPrgrsId = Props.ListItem.AnsPrgrsId;
	execUrl(Procs.value.getRsltPrefer.path, Parm.value);
};

const setChart = () => {
	if (chart1Ref.value) {
		new Chart(chart1Ref.value, {
			type: 'bar',
			data: {
				labels: [`선호반응률 (${Rslt1.value[0].irate}%)`],
				datasets: [{
					label: '선호반응률(%)',
					backgroundColor: '#f87979',
					data: [Rslt1.value[0].irate],
					barThickness: 40,
				}],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						max: 100,
					},
				},
			},
		});
	}

	if (chart2Ref.value) {
		new Chart(chart2Ref.value, {
			type: 'bar',
			data: {
				labels: [
					`선호형1 (${Rslt2.value[0].rrate1}%)`,
					`선호형2 (${Rslt2.value[0].rrate2}%)`,
					`선호형3 (${Rslt2.value[0].rrate3}%)`,
				],
				datasets: [{
					label: '선호형',
					backgroundColor: '#f87979',
					data: [
						Rslt2.value[0].rrate1,
						Rslt2.value[0].rrate2,
						Rslt2.value[0].rrate3,
					],
					barThickness: 40,
				}],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						max: 100,
					},
				},
			},
		});
	}
};
</script>

<style scoped>
@import url(@/assets/css/common.css);
@import url(@/assets/css/components.css);
@import url(@/assets/css/main.css);
@import url(@/assets/css/sub.css);

.chart-wrap {
	max-width: 800px;
	margin: 0 auto;
}

.chart1 {
	width: 30%;
	height: 250px;
}
.chart2 {
	width: 70%;
	height: 250px;
}
</style>
