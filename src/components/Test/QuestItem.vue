<template>
	<div class="modal-body">
		<div class="container ItemBox">
			<div class="row">
				<div class="col-1 lbl"><i></i>번호</div>
				<div class="col-2">
					<input
						type="text"
						ref="txtSeq"
						class="form-control"
						v-model="QuestItem.seq"
					/>
				</div>
				<div class="col-2 lbl"><i></i>보기유형</div>
				<div class="col-2">
					<select
						class="form-select"
						ref="selItemType"
						v-model="QuestItem.itemType"
					>
						<option value="C00701" selected="selected">글자</option>
						<option value="C00702">이미지</option>
					</select>
				</div>
				<div class="col-3 lbl">점수</div>
				<div class="col-2">
					<input
						type="text"
						ref="txtWeigt"
						class="form-control"
						v-model="QuestItem.weigt"
					/>
				</div>
			</div>
			<div class="row">
				<div class="col-1 lbl">내용</div>
				<div class="col-11">
					<textarea
						type="text"
						ref="txtConts"
						class="form-control h80"
						v-model="QuestItem.conts"
					></textarea>
				</div>
			</div>
			<div class="row">
				<div class="col-1 lbl">이미지</div>
				<div class="col-8">
					<div class="mb-3">
						<input
							class="form-control"
							type="file"
							ref="fileItem"
							id="formFile"
							accept=".jpg, .png"
						/>
					</div>
				</div>
				<div class="col-3">(용량 : 1MB 이하)</div>
			</div>
			<div class="row" v-if="QuestItem.imgNm != ''">
				<div class="col-3"></div>
				<div class="col-6 text-center">
					<img :src="ImgPath" class="Img" alt="이미지" />
				</div>
				<div class="col-3"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-primary" @click="saveQuestItem">
			<template v-if="Procs.saveQuestItem.loading">
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
			class="btn btn-primary ms-2"
			v-show="ModalParm.procType == 'E'"
			@click="delQuestItem"
		>
			<template v-if="Procs.delQuestItem.loading">
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
import { watch, ref, onMounted } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

// Props / Emit  ****************************

const Emits = defineEmits(['update:modelValue', 'getQuestItem']);

var ModalParm = defineModel('ModalParm');

// Hook	 *************************************

onMounted(() => {
	QuestItem.value.questId = ModalParm.value.questId;

	QuestParm.value.questId = ModalParm.value.questId;
	QuestParm.value.itemId = ModalParm.value.itemId;

	if (ModalParm.value.procType == 'E') {
		QuestItem.value.itemId = ModalParm.value.itemId;
		QuestItem.value = { ...ModalParm.value.questItem };
	}
});

// Model / Data *****************************

const { userMngrId } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();

const QuestItem = ref({
	questId: 0,
	itemId: 0,
	itemType: '',
	conts: '',
	imgNm: '',
	seq: 0,
	weigt: '',
	insId: userMngrId.value,
	uptId: userMngrId.value,
});

const QuestParm = ref({
	questId: 0,
	itemId: 0,
	procType: ModalParm.value.procType,
});

const ImgPath = ref('');

// Html ref  ********************************

const txtSeq = ref(null);
const txtWeigt = ref(null);
const selItemType = ref(null);
const txtConts = ref(null);
const fileItem = ref(null);

// Axios	***********************************

const Procs = ref({
	getQuestItem: { path: '/api/Quest/Quest/getQuestItem', loading: false },
	saveQuestItem: { path: '/api/Quest/Quest/saveQuestItem', loading: false },
	delQuestItem: { path: '/api/Quest/Quest/delQuestItem', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post', 'Content-Type': 'multipart/form-data' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.saveQuestItem.path:
					Procs.value.saveQuestItem.loading = false;
					vSuccess(
						`${ModalParm.value.procType == 'C' ? '등록' : '수정'}되었습니다.`,
					);
					Emits('getQuestItemList');
					break;
				case Procs.value.delQuestItem.path:
					Procs.value.delQuestItem.loading = false;
					vSuccess('삭제되었습니다.');
					Emits('getQuestItemList');
					break;
				case Procs.value.getQuestItem.path:
					Procs.value.getQuestItem.loading = false;
					QuestItem.value = { ...data.value.QuestItem };
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
	() => QuestItem.value.seq,
	newValue => {
		if (newValue == '' || newValue == null) return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		QuestItem.value.seq = val;
	},
);

watch(
	() => QuestItem.value.weigt,
	newValue => {
		if (newValue == '' || newValue == null) return;
		const val = newValue.toString().replace(/[^0-9.]/g, '');
		QuestItem.value.weigt = val;
	},
);

watch(
	() => QuestItem.value.imgNm,
	newValue => {
		var ImgNm = newValue == '' ? 'none.png' : newValue;
		ImgPath.value = `${import.meta.env.VITE_IMG_BASE_PATH}/QuestItem/${ImgNm}`;
	},
);

// Method ************************************

// 보기 저장(등록/수정)
const saveQuestItem = () => {
	if (!validNotBlank(QuestItem.value.seq, '번호', txtSeq.value)) return;
	if (!validNotSelect(QuestItem.value.itemType, '보기유형', selItemType.value))
		return;

	Procs.value.saveQuestItem.loading = true;

	const formData = new FormData();

	var Files = fileItem.value.files;

	if (fileItem.value.files.length == 0) {
		formData.append('files', '');
	} else {
		for (var i = 0; i < Files.length; i++) {
			formData.append('files', Files[i]);
		}
	}

	formData.append('QuestItem', JSON.stringify(QuestItem.value));
	formData.append('QuestParm', JSON.stringify(QuestParm.value));

	execUrl(Procs.value.saveQuestItem.path, formData);

	/**
	const Parm = ref({
		FormData: formData,
		QuestItem: QuestItem.value,
		QuestParm: QuestParm.value,
	});
	execUrl(Procs.value.saveQuestItem.path, Parm.value);
	 */
};

// 보기 삭제
const delQuestItem = () => {
	Procs.value.delQuestItem.loading = true;

	execUrl(Procs.value.delQuestItem.path, QuestParm.value);
};
// Etc	**************************************

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

<style scoped>
.Img {
	width: 200px;
	height: auto;
}
</style>
