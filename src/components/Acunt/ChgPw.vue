<template>
	<div class="modal-body">
		<div class="container ItemBox">
			<div class="row">
				<div class="col-12">
					<i></i>신규비밀번호 [ 6~20 자, 영문(대소문자 구분안함), 숫자 ]
				</div>
				<div class="col-12">
					<input
						type="password"
						ref="txtPw"
						class="form-control"
						v-model="AcuntParm.pw"
					/>
				</div>
				<div class="col-12"><i></i>신규비밀번호 확인</div>
				<div class="col-12">
					<input
						type="password"
						ref="txtPwConfirm"
						class="form-control"
						v-model="AcuntParm.pwConfirm"
					/>
				</div>
				<div class="col-12">변경이유</div>
				<div class="col-12">
					<input
						type="text"
						ref="txtActinReasn"
						class="form-control"
						v-model="AcuntParm.acuntLog.actinReasn"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-primary" @click="ChgPw">
			<template v-if="Procs.ChgPw.loading">
				<span
					class="spinner-grow spinner-grow-sm"
					role="status"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Loading...</span>
			</template>
			<template v-else> 비밀번호 변경 </template>
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
	pw: '',
	pwConfirm: '',
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

const txtPw = ref(null);
const txtPwConfirm = ref(null);
const txtActinReasn = ref(null);

const { vAlert, vSuccess } = useAlert();

// Axios	***********************************

const Procs = ref({
	ChgPw: { path: '/api/Acunt/ChgPw', loading: false },
});

const { execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.ChgPw.path:
					Procs.value.ChgPw.loading = false;
					vSuccess('비밀번호가 변경되었습니다.');
					Emits('SetPw', AcuntParm.value.pw);
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

// 비밀번호 변경	*****************************

const ChgPw = () => {
	if (AcuntParm.value.pw != AcuntParm.value.pwConfirm) {
		vAlert('비밀번호가 일치하지 않습니다.');
		return;
	}
	if (
		!ValidNotBlank(
			AcuntParm.value.acuntLog.actinReasn,
			'변경이유',
			txtActinReasn.value,
		)
	) {
		return;
	}
	if (!ValidMaxLen(AcuntParm.value.pw, 6, 20, txtPw.value)) return;
	if (!ValidMaxLen(AcuntParm.value.pwConfirm, 6, 20, txtPwConfirm.value))
		return;

	Procs.value.ChgPw.loading = true;
	execUrl(Procs.value.ChgPw.path, AcuntParm.value);
};

// Etc	**************************************

const ValidNotBlank = (val, tit, obj) => {
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

const ValidMaxLen = (val, minLen, maxLen, obj) => {
	if (val.length < minLen || val.length > maxLen) {
		vAlert(`${minLen}~${maxLen}자 사이로 입력해주세요.`);
		if (obj != null) {
			obj.focus();
		}
		return false;
	}
	return true;
};
</script>

<style lang="scss" scoped></style>
