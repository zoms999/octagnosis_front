<template>
	<div class="modal-body">
		<div class="container ItemBox">
			<div class="row">
				<div class="col-3 lbl"><i></i>검사상품</div>
				<div class="col-9">
					<input
						type="text"
						ref="txtProdtNm"
						class="form-control"
						v-model="Prodt.prodtNm"
					/>
				</div>
				<div class="col-3 lbl"><i></i>검사유형</div>
				<div class="col-9">
					<select
						class="form-select"
						ref="selProdtCate"
						v-model="Prodt.prodtCate"
					>
						<option value="C01101" selected="selected">기관</option>
						<option value="C01102">개인</option>
					</select>
				</div>
				<div class="col-3 lbl"><i></i>검사종류</div>
				<div class="col-9">
					<select
						class="form-select"
						ref="selProdtType"
						v-model="Prodt.prodtType"
					>
						<option value="C01201" selected="selected">프리미엄</option>
						<option value="C01202">베이직</option>
					</select>
				</div>
				<div class="col-3 lbl"><i></i>가격</div>
				<div class="col-9">
					<input
						type="text"
						ref="txtPrice"
						class="form-control"
						v-model="Prodt.price"
					/>
				</div>
				<div class="col-3 lbl"><i></i>사용기한</div>
				<div class="col-9">
					<input
						type="text"
						ref="txtUsePerid"
						class="form-control"
						v-model="Prodt.usePerid"
					/>
				</div>

				<div class="col-3 lbl"><i></i>사용여부</div>
				<div class="col-9">
					<select class="form-select" ref="selUseYn" v-model="Prodt.useYn">
						<option value="Y" selected="selected">Y</option>
						<option value="N">N</option>
					</select>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-primary" @click="saveProdt">
			<template v-if="Procs.saveProdt.loading">
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
			@click="delProdt"
		>
			<template v-if="Procs.delProdt.loading">
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

const Emits = defineEmits(['update:modelValue', 'getProdt']);

var ModalParm = defineModel('ModalParm');

// Hook	 *************************************

onMounted(() => {
	Prodt.value.prodtId = ModalParm.value.prodtId;
	if (ModalParm.value.procType == 'E') {
		getProdt();
	}
});

// Model / Data *****************************

const { userMngrId } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();

const Prodt = ref({
	prodtId: 0,
	price: 0,
	dcRate: 0,
	prodtNm: '',
	prodtCate: 'C01101',
	usePerid: 0,
	useYn: 'Y',
	prodtType: 'C01201',
	insId: userMngrId.value,
	uptId: userMngrId.value,
});

const ProdtParm = ref({
	procType: ModalParm.value.procType,
});

// Html ref  ********************************

const txtProdtNm = ref(null);
const txtPrice = ref(null);
const selProdtCate = ref(null);
const selProdtType = ref(null);
//const txtDcRate = ref(null);
const txtUsePerid = ref(null);
const selUseYn = ref(null);

// Axios	***********************************

const Procs = ref({
	getProdt: { path: '/api/Prodt/getProdt', loading: false },
	saveProdt: { path: '/api/Prodt/saveProdt', loading: false },
	delProdt: { path: '/api/Prodt/delProdt', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post', 'Content-Type': 'multipart/form-data' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.saveProdt.path:
					Procs.value.saveProdt.loading = false;
					vSuccess(
						`${ModalParm.value.procType == 'C' ? '등록' : '수정'}되었습니다.`,
					);
					Emits('getProdtList');
					break;
				case Procs.value.delProdt.path:
					Procs.value.delProdt.loading = false;
					vSuccess('삭제되었습니다.');
					Emits('getProdtList');
					break;
				case Procs.value.getProdt.path:
					Procs.value.getProdt.loading = false;
					Prodt.value = { ...data.value.Prodt };
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
	() => Prodt.value.dcRate,
	newValue => {
		if (newValue == '' || newValue == null) return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		Prodt.value.dcRate = val;
	},
);
watch(
	() => Prodt.value.price,
	newValue => {
		if (newValue == '' || newValue == null) return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		Prodt.value.price = val;
	},
);
watch(
	() => Prodt.value.usePerid,
	newValue => {
		if (newValue == '' || newValue == null) return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		Prodt.value.usePerid = val;
	},
);

// Method ************************************

// 상품 삭제
const getProdt = () => {
	execUrl(Procs.value.getProdt.path, Prodt.value);
};

// 상품 저장(등록/수정)
const saveProdt = () => {
	if (!validNotBlank(Prodt.value.prodtNm, '검사상품', txtProdtNm.value)) return;
	if (!validNotSelect(Prodt.value.prodtCate, '검사유형', selProdtCate.value))
		return;

	if (!validNotSelect(Prodt.value.prodtType, '검사종류', selProdtType.value))
		return;

	if (ModalParm.value.procType == 'E') {
		Procs.value.saveProdt.loading = true;
	}

	const Parm = ref({
		Prodt: Prodt.value,
		ProdtParm: ProdtParm.value,
	});

	execUrl(Procs.value.saveProdt.path, Parm.value);

	/**
	const Parm = ref({
		FormData: formData,
		Prodt: Prodt.value,
		QuestParm: QuestParm.value,
	});
	execUrl(Procs.value.saveProdt.path, Parm.value);
	 */
};

// 상품 삭제
const delProdt = () => {
	Procs.value.delProdt.loading = true;

	execUrl(Procs.value.delProdt.path, Prodt.value);
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
