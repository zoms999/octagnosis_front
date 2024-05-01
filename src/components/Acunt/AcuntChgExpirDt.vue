<template>
	<div class="modal-body">
		<div class="container ItemBox">
			<div class="row">
				<div class="col-12">사용기한</div>
				<div class="col-12">
					<VueDatePicker
						v-model="AcuntParm.expirDt"
						locale="ko"
						:format="formatDate"
						:enable-time-picker="false"
					>
					</VueDatePicker>
				</div>
				<div class="col-12">변경이유</div>
				<div class="col-12">
					<input
						type="text"
						ref="txtActinReasnExpir"
						class="form-control"
						v-model="AcuntParm.acuntLog.actinReasn"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-primary" @click="chgExpirDt">
			<template v-if="Procs.ChgExpirDt.loading">
				<span
					class="spinner-grow spinner-grow-sm"
					role="status"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Loading...</span>
			</template>
			<template v-else> 저장 </template>
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
import { ref } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const { userMngrId } = storeToRefs(useAuthStore());

// Props / Emit  ****************************

const Props = defineProps({
	AcuntId: { type: String },
	ActinType: { type: String },
	ActinFunc: { type: String },
});

const Emits = defineEmits(['update:modelValue', 'setExpireDt']);

// Data *************************************

const AcuntParm = ref({
	acuntId: Props.AcuntId,
	expirDt: '',
	userId: userMngrId.value,
	acuntLog: {
		logId: '',
		acuntId: Props.AcuntId,
		actinDt: '',
		actinReasn: '',
		actinType: Props.ActinType,
		actinRslt: '',
		actinFunc: Props.ActinFunc,
		insId: userMngrId.value,
		insDt: '',
		uptId: userMngrId.value,
		uptDt: '',
	},
});

const txtActinReasnExpir = ref(null);

const { vAlert, vSuccess } = useAlert();

// Axios	***********************************

const Procs = ref({
	ChgExpirDt: { path: '/api/Acunt/chgExpirDt', loading: false },
});

const { execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.ChgExpirDt.path:
					Procs.value.ChgExpirDt.loading = false;
					vSuccess('사용기한이 변경되었습니다.');
					Emits('SetExpireDt', AcuntParm.value.expirDt);
					Emits('update:modelValue');
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

// 사용기한 변경	*****************************

const chgExpirDt = () => {
	if (!validNotBlank(AcuntParm.value.expirDt, '사용기한', null)) return;
	if (
		!validNotBlank(
			AcuntParm.value.acuntLog.actinReasn,
			'변경이유',
			txtActinReasnExpir,
		)
	)
		return;

	AcuntParm.value.expirDt = formatDate(AcuntParm.value.expirDt).replace(
		/-/g,
		'',
	);

	Procs.value.ChgExpirDt.loading = true;
	execUrl(Procs.value.ChgExpirDt.path, AcuntParm.value);
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

const formatDate = date => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	// 날짜 앞에 0을 붙여야 하는 경우
	if (month || day < 10) {
		const zeroDay = ('00' + day).slice(-2);
		const zeroMonth = ('00' + month).slice(-2);

		return `${year}-${zeroMonth}-${zeroDay}`;
	} else {
		return `${year}-${month}-${day}`;
	}
};
</script>

<style lang="scss" scoped></style>
