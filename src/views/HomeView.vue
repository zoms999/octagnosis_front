<template>
	<div class="main">
		<div class="container-flude">
			<div class="row">
				<div class="col-3">
					<div class="tit">최근등록 - 개인 & 멤버</div>
					<div class="box1 color1" v-for="(item, idx) in List1" :key="idx">
						<div>{{ dayjs(item.RegDt).format('YYYY-MM-DD') }}</div>
						<div>{{ item.PersnNm }} ({{ item.AcuntId }})</div>
					</div>
				</div>
				<div class="col-3">
					<div class="tit">최근등록 기관</div>
					<div class="box1 color2" v-for="(item, idx) in List2" :key="idx">
						<div>{{ dayjs(item.RegDt).format('YYYY-MM-DD') }}</div>
						<div>{{ item.CompyNm }} ({{ item.AcuntId }})</div>
					</div>
				</div>
				<div class="col-3">
					<div class="tit">검사완료 - 멤버</div>
					<div class="box1 color3" v-for="(item, idx) in List3" :key="idx">
						<div>
							{{ dayjs(item.EndDt).format('YYYY-MM-DD') }} / {{ item.CompyNm }}
						</div>
						<div>{{ item.PersnNm }} ({{ item.AcuntId }})</div>
					</div>
				</div>
				<div class="col-3">
					<div class="tit">검사완료 - 개인</div>
					<div class="box1 color4" v-for="(item, idx) in List4" :key="idx">
						<div>{{ dayjs(item.EndDt).format('YYYY-MM-DD') }}</div>
						<div>{{ item.PersnNm }} ({{ item.AcuntId }})</div>
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
</script>

<style scoped>
.main {
	padding: 30px;
}

.tit {
	font-size: 1.2rem;
	border: 1px solid #cacaca;
	background-color: #418b89;
	color: #ffffff;
	padding: 5px 5px 5px 10px;
	border-radius: 10px 10px 0px 0px;
}

.box1 {
	border-radius: 5px;
	border: 1px solid #cacaca;
	margin: 10px 0 5px 0;
	padding: 3px 8px 3px 8px;
}
.box1.color1 {
	border-bottom: 2px solid #db2828;
}
.box1.color2 {
	border-bottom: 2px solid #2185d0;
}
.box1.color3 {
	border-bottom: 2px solid #21ba45;
}
.box1.color4 {
	border-bottom: 2px solid #a333c8;
}
.box1 > div:nth-child(1) {
	font-size: 1.05rem;
	padding: 5px 5px 0px 5px;
}
.box1 > div:nth-child(2) {
	font-size: 1.2rem;
	padding: 5px;
	margin: 0 0 0 30px;
	color: rgb(120, 120, 120);
}

.box2 {
	border-radius: 5px;
	border: 1px solid #cacaca;
	margin: 10px 0 5px 0;
	padding: 5px 8px 5px 8px;
	border-bottom: 2px solid #cacaca;
	border-right: 2px solid #cacaca;
}
.box2 > div:nth-child(1) {
	font-size: 1.2rem;
	padding: 5px 5px 0px 5px;
}
.box2 > div:nth-child(2) {
	font-size: 1.05rem;
	padding: 5px;
	margin: 0 0 0 20px;
	color: rgb(120, 120, 120);
}

.box3 {
	border-radius: 5px;
	border: 1px solid #cacaca;
	margin: 10px 0 5px 0;
	padding: 5px 8px 5px 8px;
	border-bottom: 2px solid #cacaca;
	border-right: 2px solid #cacaca;
}
.box3 > div:nth-child(1) {
	font-size: 1.2rem;
	padding: 5px 5px 0px 5px;
}
.box3 > div:nth-child(2) {
	font-size: 1.05rem;
	padding: 5px;
	margin: 0 0 0 20px;
	color: rgb(120, 120, 120);
}

.box4 {
	border-radius: 5px;
	border: 1px solid #cacaca;
	margin: 10px 0 5px 0;
	padding: 5px 8px 5px 8px;
	border-bottom: 2px solid #cacaca;
	border-right: 2px solid #cacaca;
}
.box4 > div:nth-child(1) {
	font-size: 1.2rem;
	padding: 5px 5px 0px 5px;
}
.box4 > div:nth-child(2) {
	font-size: 1.05rem;
	padding: 5px;
	margin: 0 0 0 20px;
	color: rgb(120, 120, 120);
}
</style>
