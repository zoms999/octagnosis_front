<template>
	<div class="dashboard">
		<div class="container">
			<div class="row">
				<div
					class="col-md-3"
					v-for="(list, index) in [List1, List2, List3, List4]"
					:key="index"
				>
					<div class="card">
						<div class="card-header">{{ titles[index] }}</div>
						<div class="card-body">
							<div class="item" v-for="(item, idx) in list" :key="idx">
								<div class="date">
									{{ dayjs(item.RegDt || item.EndDt).format('YYYY-MM-DD') }}
								</div>
								<div class="name">
									{{ item.PersnNm || item.CompyNm }} ({{ item.AcuntId }})
								</div>
								<div class="company" v-if="item.CompyNm && index === 2">
									{{ item.CompyNm }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, onMounted, inject } from 'vue';
import { useAlert } from '@/hooks/useAlert';
const dayjs = inject('dayjs');

// Props / Emit  ****************************

// Hook	 *************************************

onMounted(() => {
	getDashboard();
});

// Model / Data *****************************

const { vAlert, vSuccess } = useAlert();

const Parm = ref({
	srchStr: '',
});

const List1 = ref([]);
const List2 = ref([]);
const List3 = ref([]);
const List4 = ref([]);

// Html ref  ********************************

// Axios / Route  ***************************

const Procs = ref({
	getDashboard: { path: '/api/Main/getDashboard', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getDashboard.path:
					Procs.value.getDashboard.loading = false;
					List1.value = data.value.List1;
					List2.value = data.value.List2;
					List3.value = data.value.List3;
					List4.value = data.value.List4;

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

// Modal ************************************

// Watch *************************************

// Method ************************************

// Route	***********************************

// Method	************************************

// DashBoard
const getDashboard = () => {
	execUrl(Procs.value.getDashboard.path, Parm.value);
};

// Etc  **************************************

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

const titles = [
	'최근등록 - 개인 & 멤버',
	'최근등록 기관',
	'검사완료 - 멤버',
	'검사완료 - 개인',
];
</script>

<style scoped>
.dashboard {
	padding: 30px;
	background-color: #f5f5f5;
}

.card {
	border-radius: 10px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	margin-bottom: 20px;
	overflow: hidden;
	transition: all 0.3s ease;
}

.card:hover {
	transform: translateY(-5px);
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
	background-color: #418b89;
	color: white;
	font-size: 1.2rem;
	padding: 15px;
	border-bottom: none;
}

.card-body {
	padding: 0;
}

.item {
	border-bottom: 1px solid #e0e0e0;
	padding: 15px;
	transition: background-color 0.2s ease;
}

.item:last-child {
	border-bottom: none;
}

.item:hover {
	background-color: #f9f9f9;
}

.date {
	font-size: 0.9rem;
	color: #666;
	margin-bottom: 5px;
}

.name {
	font-size: 1.1rem;
	color: #333;
	font-weight: 500;
}

.company {
	font-size: 0.9rem;
	color: #666;
	margin-top: 5px;
}

@media (max-width: 768px) {
	.col-md-3 {
		margin-bottom: 20px;
	}
}
</style>
