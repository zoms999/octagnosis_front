<template>
	<div class="modal-body">
		<div class="container ItemBox">
			<div class="row">
				<div class="col-3 lbl"><i></i>검사명</div>
				<div class="col-9">
					<input
						type="text"
						ref="txtTestNm"
						class="form-control"
						v-model="Test.testNm"
					/>
				</div>
				<div class="col-3 lbl"><i></i>순번</div>
				<div class="col-3">
					<input
						type="text"
						ref="txtSeq"
						class="form-control"
						v-model="Test.seq"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-primary" @click="saveTest">
			<template v-if="Procs.saveTest.loading">
				<span
					class="spinner-grow spinner-grow-sm"
					role="status"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Loading...</span>
			</template>
			<template v-else>
				{{ ModalParm.procType == 'C' ? '등록' : '수정' }}
			</template>
		</button>
		<button
			type="button"
			class="btn btn-primary"
			v-show="ModalParm.procType == 'E'"
			@click="delTest"
		>
			<template v-if="Procs.delTest.loading">
				<span
					class="spinner-grow spinner-grow-sm"
					role="status"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Loading...</span>
			</template>
			<template v-else> 삭제 </template>
		</button>
		<button
			type="button"
			class="btn btn-secondary"
			@click="$emit('update:modelValue', false)"
		>
			닫기
		</button>
	</div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

// Props / Emit  ****************************

var Emits = defineEmits(['update:modelValue', 'getTestList']);

var ModalParm = defineModel('ModalParm');
var ParmTest = defineModel('Test');

// alert(ModalParm.value.ProcType);

// Model / Data *****************************

const { userMngrId } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();

const Test = ref({
	testId: 0,
	testNm: '',
	seq: 0,
	insId: userMngrId.value,
	uptId: userMngrId.value,
});

const QuestParm = ref({
	testId: 0,
	procType: ModalParm.value.procType,
});

// Hook	 *************************************

onMounted(() => {
	if (ModalParm.value.procType == 'E') {
		Test.value.testId = ParmTest.value.testId;
		Test.value.testNm = ParmTest.value.testNm;
		Test.value.seq = ParmTest.value.seq;
	}
});

// Html ref  ********************************

const txtTestNm = ref(null);
const txtSeq = ref(null);

// Axios / Route  ***************************

const Procs = ref({
	saveTest: { path: '/api/Quest/Test/saveTest', loading: false },
	delTest: { path: '/api/Quest/Test/delTest', loading: false },
});

const { execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.saveTest.path:
					Procs.value.saveTest.loading = false;
					vSuccess('저장되었습니다.');
					Emits('getTestList');
					break;
				case Procs.value.delTest.path:
					Procs.value.delTest.loading = false;
					vSuccess('삭제되었습니다.');
					Emits('getTestList');
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

// Modal *************************************

// Watch *************************************

watch(
	() => Test.value.seq,
	newValue => {
		if (newValue == '') return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		Test.value.seq = parseInt(val).toString();
	},
);

// Method ************************************

const saveTest = () => {
	if (!validNotBlank(Test.value.testNm, '검사명', null)) return;
	if (!validNotBlank(Test.value.seq, '순번', txtSeq)) return;

	Procs.value.saveTest.loading = true;

	const Parm = ref({
		Test: Test.value,
		QuestParm: QuestParm.value,
	});
	execUrl(Procs.value.saveTest.path, Parm.value);
};

const delTest = () => {
	QuestParm.value.testId = Test.value.testId;
	Procs.value.delTest.loading = true;

	execUrl(Procs.value.delTest.path, QuestParm.value);
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

<style lang="scss" scoped></style>
