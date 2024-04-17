<template>
	<div class="modal-body">
		<div class="container ItemBox">
			<div class="row">
				<div class="col-12">
					기관인증코드 [ 10~20자, 영문(대소문자 구분함), 숫자 ]
				</div>
				<div class="col-12">
					<div class="input-group">
						<input
							v-focus
							type="text"
							ref="txtUrlCd"
							class="form-control"
							v-model="OrgParm.urlCd"
						/>
						<span class="input-group-text"
							><span class="material-icons text-body-tertiary"
								>{{ OrgParm.valid ? 'check' : 'noise_control_off' }}
							</span></span
						>
						<button class="btn btn-primary" @click="chkUrlNewCd">
							<template v-if="Procs.ChkUrlCd.loading">
								<span
									class="spinner-grow spinner-grow-sm"
									role="status"
									aria-hidden="true"
								></span>
								<span class="visually-hidden">Loading...</span>
							</template>
							<template v-else> 유효성검사 </template>
						</button>
					</div>
				</div>
				<div class="col-12">변경이유</div>
				<div class="col-12">
					<input
						type="text"
						ref="txtActinReasn"
						class="form-control"
						v-model="OrgParm.acuntLog.actinReasn"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-primary" @click="chgOrgUrlCd">
			저장
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
import { ref, watch } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const { userMngrId } = storeToRefs(useAuthStore());

// Props / Emit  ****************************

const props = defineProps({
	OrgId: { type: Number },
	AcuntId: { type: String },
	ActinType: { type: String },
	ActinFunc: { type: String },
});

const emits = defineEmits(['update:modelValue', 'setExpireDt']);

// Data *************************************

const OrgParm = ref({
	orgId: props.OrgId,
	urlCd: '',
	userId: userMngrId.value,
	acuntLog: {
		logId: '',
		acuntId: props.AcuntId,
		actinDt: '',
		actinReasn: '',
		actinType: props.ActinType,
		actinRslt: '',
		actinFunc: props.ActinFunc,
		insId: userMngrId.value,
		insDt: '',
		uptId: userMngrId.value,
		uptDt: '',
	},
	valid: false,
});

const txtUrlCd = ref(null);
const txtActinReasn = ref(null);

const { vAlert, vSuccess } = useAlert();

// Axios	***********************************

const Procs = ref({
	ChkUrlCd: { path: '/api/Org/chkUrlCd', loading: false },
	ChgOrgUrlCd: { path: '/api/Org/chgOrgUrlCd', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.ChkUrlCd.path:
					if (data.value.ExistYn == 'Y') {
						vSuccess('이미 사용중입니다. ');
						OrgParm.value.urlCd = '';
						OrgParm.value.valid = false;
						if (props.ProcType == 'C') txtUrlCd.value.focus();
						else txtUrlCd.value.focus();
					} else {
						vSuccess('사용 가능합니다. ');
						OrgParm.value.urlCdSet = OrgParm.value.urlCd;
						OrgParm.value.valid = true;
					}
					Procs.value.ChkUrlCd.loading = false;
					break;

				case Procs.value.ChgOrgUrlCd.path:
					Procs.value.ChgOrgUrlCd.loading = false;
					vSuccess('기관인증코드가 변경되었습니다.');
					emits('SetUrlCd', OrgParm.value.urlCd);
					emits('update:modelValue');
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

const chkUrlNewCd = () => {
	let Val = OrgParm.value.urlCd;

	if (!validNotBlank(Val, '기관인증코드', txtUrlCd.value)) return;
	if (!validMaxLen(Val, 0, 20, txtUrlCd.value)) return;

	Procs.value.ChkUrlCd.loading = true;
	execUrl(Procs.value.ChkUrlCd.path, {
		urlCd: Val,
	});
};

// 기관인증코드 변경
const chgOrgUrlCd = () => {
	let Val = OrgParm.value.urlCd;

	if (!validNotBlank(Val, '기관인증코드', txtUrlCd.value)) return;
	if (!validMaxLen(Val, 0, 20, txtUrlCd.value)) return;
	if (
		!validNotBlank(
			OrgParm.value.acuntLog.actinReasn,
			'변경사유',
			txtActinReasn.value,
		)
	)
		return;

	Procs.value.ChgOrgUrlCd.loading = true;
	execUrl(Procs.value.ChgOrgUrlCd.path, OrgParm.value);
};

watch(
	() => OrgParm.value.urlCd,
	newValue => {
		const val = newValue.replace(/[^a-zA-Z0-9]/g, '');
		OrgParm.value.urlCd = val;
		OrgParm.value.valid = OrgParm.value.urlCd == OrgParm.value.urlCdSet;

		//Emit('update:urlCd', OrgParm.value.urlCd);
	},
);

// Etc	**************************************

const validMaxLen = (val, minLen, maxLen, obj) => {
	if (val.length < minLen || val.length > maxLen) {
		vAlert(`${minLen}~${maxLen}자 사이로 입력해주세요.`);
		if (obj != null) {
			obj.focus();
		}
		return false;
	}
	return true;
};

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
