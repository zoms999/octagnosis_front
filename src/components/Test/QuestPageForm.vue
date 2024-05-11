<template>
	<div class="modal-body">
		<div class="container ItemBox">
			<div class="row">
				<div class="col-3 lbl"><i></i>검사지명</div>
				<div class="col-9">
					<input
						type="text"
						ref="txtQuestPageNm"
						class="form-control"
						v-model="QuestPage.questPageNm"
					/>
				</div>
				<div class="col-3 lbl"><i></i>검사지유형</div>
				<div class="col-6">
					<select
						class="form-select"
						ref="selQuestPageType"
						v-model="QuestPage.questPageType"
					>
						<option value="C00401" selected="selected">단일질의 객관식</option>
						<option value="C00402">다중질의 객관식</option>
						<option value="C00403">이미지형 객관식 1</option>
						<option value="C00404">이미지형 객관식 2</option>
						<option value="C00405">자유형</option>
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col-3 lbl"><i></i>순번</div>
				<div class="col-3">
					<input
						type="text"
						ref="txtQuestPageSeq"
						class="form-control"
						v-model="QuestPage.questPageSeq"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-primary" @click="saveQuestPage">
			<template v-if="Procs.saveQuestPage.loading">
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
			@click="delQuestPage"
		>
			<template v-if="Procs.delQuestPage.loading">
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

var Emits = defineEmits(['update:modelValue', 'getQuestList']);

var ModalParm = defineModel('ModalParm');

// alert(ModalParm.value.procType);

// Model / Data *****************************

const { userMngrId } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();

const QuestPage = ref({
	testId: 0,
	questPageId: 0,
	questPageNm: '',
	questPageSeq: 0,
	questPageType: '',
	insId: userMngrId.value,
	uptId: userMngrId.value,
});

const QuestParm = ref({
	testId: 0,
	questPageId: 0,
	procType: ModalParm.value.procType,
});

// Hook	 *************************************

onMounted(() => {
	QuestPage.value.testId = ModalParm.value.testId;
	QuestPage.value.questPageId = ModalParm.value.questPageId;

	QuestParm.value.testId = ModalParm.value.testId;
	QuestParm.value.questPageId = ModalParm.value.questPageId;

	if (ModalParm.value.procType == 'E') {
		getQuestPage();
		//QuestPage.value.testId = ParmTest.value.testId;
		//QuestPage.value.testNm = ParmTest.value.testNm;
		//QuestPage.value.seq = ParmTest.value.seq;
	}
});

// Html ref  ********************************

const txtQuestPageNm = ref(null);
const selQuestPageType = ref(null);
const txtQuestPageSeq = ref(null);

// Axios / Route  ***************************

const Procs = ref({
	getQuestPage: { path: '/api/Quest/QuestPage/getQuestPage', loading: false },
	saveQuestPage: { path: '/api/Quest/QuestPage/saveQuestPage', loading: false },
	delQuestPage: { path: '/api/Quest/QuestPage/delQuestPage', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.saveQuestPage.path:
					Procs.value.saveQuestPage.loading = false;
					vSuccess('저장되었습니다.');
					Emits('getQuestPageList');
					break;
				case Procs.value.delQuestPage.path:
					Procs.value.delQuestPage.loading = false;
					vSuccess('삭제되었습니다.');
					Emits('getQuestPageList');
					break;
				case Procs.value.getQuestPage.path:
					Procs.value.getQuestPage.loading = false;
					QuestPage.value = { ...data.value };
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
	() => QuestPage.value.seq,
	newValue => {
		if (newValue == '') return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		QuestPage.value.seq = parseInt(val).toString();
	},
);

// Method ************************************

const getQuestPage = () => {
	execUrl(Procs.value.getQuestPage.path, QuestParm.value);
};

const saveQuestPage = () => {
	if (
		!validNotBlank(
			QuestPage.value.questPageNm,
			'검사지명',
			txtQuestPageNm.value,
		)
	)
		return;
	if (
		!validNotSelect(
			QuestPage.value.questPageType,
			'검사지유형',
			selQuestPageType.value,
		)
	)
		return;
	if (
		!validNotBlank(QuestPage.value.questPageSeq, '순번', txtQuestPageSeq.value)
	)
		return;

	Procs.value.saveQuestPage.loading = true;

	const Parm = ref({
		QuestPage: QuestPage.value,
		QuestParm: QuestParm.value,
	});
	execUrl(Procs.value.saveQuestPage.path, Parm.value);
};

const delQuestPage = () => {
	QuestParm.value.testId = QuestPage.value.testId;
	Procs.value.delQuestPage.loading = true;

	execUrl(Procs.value.delQuestPage.path, QuestParm.value);
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

const validNotSelect = (val, tit, obj) => {
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
