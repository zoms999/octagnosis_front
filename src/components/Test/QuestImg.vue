<template>
	<div class="modal-body">
		<div class="container ItemBox">
			<div class="row">
				<div class="col-2 lbl"><i></i>번호</div>
				<div class="col-3">
					<input
						type="text"
						ref="txtSeq"
						class="form-control"
						v-model="QuestImg.seq"
					/>
				</div>
				<div class="col-2 lbl"><i></i>이미지유형</div>
				<div class="col-3">
					<select
						class="form-select"
						ref="selImgType"
						v-model="QuestImg.imgType"
					>
						<option value="C00801" selected="selected">이미지 A</option>
						<option value="C00802">이미지 B</option>
						<option value="C00803">이미지 C</option>
					</select>
				</div>
			</div>
			<div class="row" v-if="false">
				<div class="col-1 lbl">내용</div>
				<div class="col-11">
					<textarea
						type="text"
						ref="txtConts"
						class="form-control h80"
						v-model="QuestImg.conts"
					></textarea>
				</div>
			</div>
			<div class="row">
				<div class="col-2 lbl">이미지</div>
				<div class="col-7">
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
			<div class="row" v-if="QuestImg.imgNm != ''">
				<div class="col-3"></div>
				<div class="col-6 text-center">
					<img :src="ImgPath" class="Img" alt="이미지" />
				</div>
				<div class="col-3"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-primary" @click="saveQuestImg">
			<template v-if="Procs.saveQuestImg.loading">
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
			@click="delQuestImg"
		>
			<template v-if="Procs.delQuestImg.loading">
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

const Emits = defineEmits(['update:modelValue', 'getQuestImgList']);

var ModalParm = defineModel('ModalParm');

// Hook	 *************************************

onMounted(() => {
	QuestImg.value.questId = ModalParm.value.questId;

	QuestParm.value.questId = ModalParm.value.questId;
	QuestParm.value.imgId = ModalParm.value.imgId;

	if (ModalParm.value.procType == 'E') {
		QuestImg.value.imgId = ModalParm.value.imgId;
		QuestImg.value = { ...ModalParm.value.questImg };
	}
});

// Model / Data *****************************

const { userMngrId } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();

const QuestImg = ref({
	questId: 0,
	imgId: 0,
	imgType: 'C00801',
	conts: '',
	imgNm: '',
	seq: 1,
	insId: userMngrId.value,
	uptId: userMngrId.value,
});

const QuestParm = ref({
	questId: 0,
	imgId: 0,
	procType: ModalParm.value.procType,
});

const ImgPath = ref('');

// Html ref  ********************************

const txtSeq = ref(null);
const selImgType = ref(null);
const txtConts = ref(null);
const fileItem = ref(null);

// Axios	***********************************

const Procs = ref({
	getQuestImg: { path: '/api/Quest/Quest/getQuestImg', loading: false },
	saveQuestImg: { path: '/api/Quest/Quest/saveQuestImg', loading: false },
	delQuestImg: { path: '/api/Quest/Quest/delQuestImg', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post', 'Content-Type': 'multipart/form-data' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.saveQuestImg.path:
					Procs.value.saveQuestImg.loading = false;
					vSuccess(
						`${ModalParm.value.procType == 'C' ? '등록' : '수정'}되었습니다.`,
					);
					Emits('getQuestImgList');
					break;
				case Procs.value.delQuestImg.path:
					Procs.value.delQuestImg.loading = false;
					vSuccess('삭제되었습니다.');
					Emits('getQuestImgList');
					break;
				case Procs.value.getQuestImg.path:
					Procs.value.getQuestImg.loading = false;
					QuestImg.value = { ...data.value.QuestImg };
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
	() => QuestImg.value.seq,
	newValue => {
		if (newValue == '' || newValue == null) return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		QuestImg.value.seq = val;
	},
);

watch(
	() => QuestImg.value.imgNm,
	newValue => {
		var ImgNm = newValue == '' ? 'none.png' : newValue;
		ImgPath.value = `/public/img/QuestImg/${ImgNm}`;
	},
);

// Method ************************************

// 보기 저장(등록/수정)
const saveQuestImg = () => {
	if (!validNotBlank(QuestImg.value.seq, '번호', txtSeq.value)) return;
	if (!validNotSelect(QuestImg.value.imgType, '보기유형', selImgType.value))
		return;

	Procs.value.saveQuestImg.loading = true;

	const formData = new FormData();

	var Files = fileItem.value.files;

	if (fileItem.value.files.length == 0) {
		formData.append('files', '');
	} else {
		for (var i = 0; i < Files.length; i++) {
			formData.append('files', Files[i]);
		}
	}

	formData.append('QuestImg', JSON.stringify(QuestImg.value));
	formData.append('QuestParm', JSON.stringify(QuestParm.value));

	execUrl(Procs.value.saveQuestImg.path, formData);

	/**
	const Parm = ref({
		FormData: formData,
		QuestImg: QuestImg.value,
		QuestParm: QuestParm.value,
	});
	execUrl(Procs.value.saveQuestImg.path, Parm.value);
	 */
};

// 보기 삭제
const delQuestImg = () => {
	Procs.value.delQuestImg.loading = true;

	execUrl(Procs.value.delQuestImg.path, QuestParm.value);
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
