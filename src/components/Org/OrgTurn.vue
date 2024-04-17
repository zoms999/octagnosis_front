<template>
	<div class="container ItemBox">
		<div class="row">
			<div class="col-12">회차 요청수</div>
			<div class="col-12">
				<input
					type="text"
					ref="txtTurnReqCnt"
					class="form-control"
					v-model="OrgTurn.turnReqCnt"
				/>
			</div>
			<div class="col-12">회차 코드</div>
			<div class="col-12">
				<div class="input-group">
					<input
						type="text"
						ref="txtTurnConnCd"
						class="form-control"
						v-model="OrgTurn.turnConnCd"
					/>
					<span class="input-group-text"
						><span class="material-icons text-body-tertiary">{{
							OrgTurn.valid ? 'check' : 'noise_control_off'
						}}</span></span
					>
					<button class="btn btn-primary w100" @click="chkTurnConnCd">
						<template v-if="Procs.chkTurnConnCd.loading">
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
			<div class="mt-1 text-center">
				[ 10~20 자, 영문(대소문자 구분), 숫자 ] &nbsp; &nbsp; &nbsp; 예)
				abCD1234EFGH5678
			</div>
		</div>
	</div>
	<div class="mt-5 mb-3 text-center">
		<button class="btn btn-primary w100" @click="cretOrgTurn">
			<template v-if="Procs.cretOrgTurn.loading">
				<span
					class="spinner-grow spinner-grow-sm"
					role="status"
					aria-hidden="true"
				></span>
				<span class="visually-hidden">Loading...</span>
			</template>
			<template v-else> 회차추가 </template>
		</button>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const { userMngrId } = storeToRefs(useAuthStore());

const { vAlert, vSuccess } = useAlert();

const txtTurnReqCnt = ref(null);
const txtTurnConnCd = ref(null);

// Props / Emit  ****************************

const Props = defineProps({
	OrgId: { type: Number },
});

const Emits = defineEmits(['reload']);

// Data *************************************

const OrgTurn = ref({
	orgId: Props.OrgId,
	turnId: '',
	useYn: 'Y',
	turnNum: '1',
	turnReqCnt: '',
	turnUseCnt: '0',
	turnConnCd: '',
	insId: userMngrId,
	insDt: '',
	uptId: '',
	uptDt: '',

	turnConnCdSet: '',
	valid: false,
});

// Axios	***********************************

const Procs = ref({
	chkTurnConnCd: { path: '/api/OrgTurn/chkTurnConnCd', loading: false },
	cretOrgTurn: { path: '/api/OrgTurn/cretOrgTurn', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.chkTurnConnCd.path:
					if (data.value.ExistYn == 'Y') {
						vSuccess('이미 사용중인 코드 입니다.');
						OrgTurn.value.turnConnCd = '';
						OrgTurn.value.valid = false;
					} else {
						vSuccess('사용 가능합니다. ');
						OrgTurn.value.turnConnCdSet = OrgTurn.value.turnConnCd;
						OrgTurn.value.valid = true;
					}
					Procs.value.chkTurnConnCd.loading = false;
					break;

				case Procs.value.cretOrgTurn.path:
					Procs.value.cretOrgTurn.loading = false;
					vSuccess('회차 추가되었습니다.');
					Emits('reload');
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

// Method	************************************

// 유효성 검사  ****************
const chkTurnConnCd = () => {
	let Val = OrgTurn.value.turnConnCd;

	if (!validNotBlank(Val, '회차 코드', txtTurnConnCd.value)) {
		return;
	}
	if (!validMaxLen(Val, 10, 20, txtTurnConnCd.value)) return;

	Procs.value.chkTurnConnCd.loading = true;
	execUrl(Procs.value.chkTurnConnCd.path, OrgTurn.value);
};

watch(
	() => OrgTurn.value.turnNum,
	newValue => {
		const val = newValue.replace(/[^0-9]/g, '');
		OrgTurn.value.turnNum = val;
	},
);

watch(
	() => OrgTurn.value.turnConnCd,
	newValue => {
		const val = newValue.replace(/[^a-zA-Z0-9]/g, '');
		OrgTurn.value.turnConnCd = val;
		OrgTurn.value.valid =
			OrgTurn.value.turnConnCd == OrgTurn.value.turnConnCdSet;
	},
);

// 기관 회차 등록  ****************

const cretOrgTurn = () => {
	if (
		!validNotBlank(OrgTurn.value.turnReqCnt, '회차 요청수', txtTurnReqCnt.value)
	) {
		return;
	}
	if (
		!validNotBlank(OrgTurn.value.turnConnCd, '회차 코드', txtTurnConnCd.value)
	) {
		return;
	}
	if (!OrgTurn.value.valid) {
		vAlert('회차 코드 유효성검사를 진행하세요.');
		return;
	}

	Procs.value.cretOrgTurn.loading = true;
	execUrl(Procs.value.cretOrgTurn.path, OrgTurn.value);
};

// ******************************

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
</script>

<style lang="scss" scoped></style>
