<template>
	<div class="ActionBtn">
		<div></div>
		<div>
			<button
				v-if="ProcType == 'C'"
				class="btn btn-primary ms-2"
				@click="cretOrg()"
				:disabled="Procs.cretOrg.loading"
			>
				<template v-if="Procs.cretOrg.loading">
					<span
						class="spinner-grow spinner-grow-sm"
						role="status"
						aria-hidden="true"
					></span>
					<span class="visually-hidden">Loading...</span>
				</template>
				<template v-else> 등록 </template>
			</button>
			<button
				v-if="ProcType == 'E'"
				class="btn btn-primary ms-2"
				@click="editOrg()"
			>
				<template v-if="Procs.editOrg.loading">
					<span
						class="spinner-grow spinner-grow-sm"
						role="status"
						aria-hidden="true"
					></span>
					<span class="visually-hidden">Loading...</span>
				</template>
				<template v-else> 수정 </template>
			</button>
			<button class="btn btn-primary ms-2" @click="$emit('GoBack')">
				목록
			</button>
			<button
				v-if="ProcType == 'E'"
				class="btn btn-primary IconBtn ms-2"
				@click="ShowHide('AcuntLoginLog', true)"
			>
				<div class="d-flex">
					<span class="me-2">접속로그</span>
					<span class="material-icons"> poll </span>
				</div>
			</button>
			<button
				v-if="ProcType == 'E'"
				class="btn btn-primary IconBtn ms-2"
				@click="ShowHide('AcuntLog', true)"
			>
				<div class="d-flex">
					<span class="me-2">변경로그</span>
					<span class="material-icons"> poll </span>
				</div>
			</button>
		</div>
	</div>
	<div class="Tit1">
		<div>기관계정</div>
		<div></div>
	</div>
	<div class="container-fluid ItemBox">
		<!-- 등록	----------------------------->
		<div class="row" v-if="ProcType == 'C'">
			<div class="col-1 lbl"><i></i>기관인증코드</div>
			<div class="col-4">
				<div class="input-group">
					<input
						v-focus
						type="text"
						ref="txtUrlCd"
						class="form-control"
						v-model="Org.urlCd"
					/>
					<span class="input-group-text"
						><span class="material-icons text-body-tertiary"
							>{{ Org.valid ? 'check' : 'noise_control_off' }}
						</span></span
					>

					<button class="btn btn-primary w100" @click="chkUrlCd">
						<template v-if="Procs.chkUrlCd.loading">
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
			<div class="col-7">
				[ 최대 20자 , 영문(대소문자 구분), 숫자 ] &nbsp; 예) Yuop7890WeRk0909
			</div>
			<div class="col-1 lbl"><i></i>아이디</div>
			<div class="col-4">
				<div class="input-group">
					<input
						type="text"
						ref="txtAcuntId"
						class="form-control"
						v-model="Acunt.acuntId"
					/>
					<span class="input-group-text"
						><span class="material-icons text-body-tertiary">{{
							Acunt.valid ? 'check' : 'noise_control_off'
						}}</span></span
					>
					<button class="btn btn-primary w100" @click="chkAcuntId">
						<template v-if="Procs.chkAcuntId.loading">
							<span
								class="spinner-grow spinner-grow-sm"
								role="status"
								aria-hidden="true"
							></span>
							<span class="visually-hidden">Loading...</span>
						</template>
						<template v-else> 중복확인 </template>
					</button>
				</div>
			</div>
			<div class="col-7">[ 6~20 자, 영문(대소문자 구분안함), 숫자 ]</div>
			<div class="col-1 lbl"><i></i>비밀번호</div>
			<div class="col-3">
				<input
					type="password"
					ref="txtPw"
					class="form-control"
					v-model="Acunt.pw"
				/>
			</div>
			<div class="col-1 lbl"><i></i>비밀번호 확인</div>
			<div class="col-3">
				<input
					type="password"
					ref="txtPwConfirm"
					class="form-control"
					v-model="Acunt.pwConfirm"
				/>
			</div>
			<div class="col-4">[ 6~20 자, 영문(대소문자 구분안함), 숫자 ]</div>
			<div class="col-1 lbl"><i></i>1회차 요청수</div>
			<div class="col-2">
				<input
					type="text"
					ref="txtTurnReqCnt"
					class="form-control"
					v-model="OrgTurn.turnReqCnt"
				/>
			</div>
			<div class="col-1 lbl"><i></i>1회차 코드</div>
			<div class="col-4">
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
			<div class="col-4">
				[ 10~20 자, 영문(대소문자 구분), 숫자 ] <br />예) abCD1234EFGH5678
			</div>
		</div>
		<!-- 수정	----------------------------->
		<div class="row" v-else-if="ProcType == 'E'">
			<div class="col-1 lbl">기관인증코드</div>
			<div class="col-3">
				<div class="input-group w100p" style="width: 100% !important">
					<input
						v-focus
						type="text"
						class="form-control"
						:value="Org.urlCd"
						readonly
					/>
					<button class="btn btn-primary" @click="ShowHide('OrgUrlCd', true)">
						변경
					</button>
				</div>
			</div>
			<div class="col-1 lbl">사용기한</div>
			<div class="col-3">
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						:value="Acunt.expirDt"
						readonly="readonly"
					/>
					<button
						class="btn btn-primary"
						@click="ShowHide('AcuntExpirDt', true)"
					>
						변경
					</button>
				</div>
			</div>
			<div class="col-1 lbl">등록날짜</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="
						Acunt.insDt
							.substr(0, 8)
							.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
					"
					readonly="readonly"
				/>
			</div>
			<div class="col-1 lbl">아이디</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="Acunt.acuntId"
					readonly
				/>
			</div>
			<div class="col-1 lbl">비밀번호</div>
			<div class="col-3">
				<div class="input-group">
					<input
						type="password"
						class="form-control"
						:value="Acunt.pw"
						readonly="readonly"
					/>
					<button class="btn btn-primary" @click="Modal.AcuntPw = true">
						변경
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="Tit1">
		<div>기관정보</div>
		<div></div>
	</div>

	<div class="container-fluid ItemBox">
		<div class="row">
			<div class="col-1 lbl"><i></i>기관명</div>
			<div class="col-7">
				<div class="input-group">
					<input
						type="text"
						ref="txtCompyNm"
						class="form-control"
						v-model="Org.compyNm"
					/>
				</div>
			</div>
			<div class="col-1 lbl"><i></i>대표자</div>
			<div class="col-3">
				<input
					type="text"
					ref="txtCeoNm"
					class="form-control"
					v-model="Org.ceoNm"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lblT">세금계산서<br />(이메일)</div>
			<div class="col-3">
				<input
					type="text"
					ref="txtBillEmail"
					class="form-control"
					v-model="Org.billEmail"
				/>
			</div>
			<div class="col-1 lbl"><i></i>사업자번호</div>
			<div class="col-3">
				<input
					type="text"
					ref="txtBizNum"
					class="form-control"
					v-model="Org.bizNum"
				/>
			</div>
			<div class="col-1 lbl">법인번호</div>
			<div class="col-3">
				<input
					type="text"
					ref="txtCorpNum"
					class="form-control"
					v-model="Org.corpNum"
				/>
			</div>
			<div class="col-1 lbl">업태</div>
			<div class="col-3">
				<input
					type="text"
					ref="txtBizType"
					class="form-control"
					v-model="Org.bizType"
				/>
			</div>
			<div class="col-1 lbl">종목</div>
			<div class="col-3">
				<input
					type="text"
					ref="txtBizSectr"
					class="form-control"
					v-model="Org.bizSectr"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl"><i></i>연락처 1</div>
			<div class="col-3">
				<input
					type="text"
					ref="txtTel1"
					class="form-control"
					v-model="Org.tel1"
				/>
			</div>
			<div class="col-1 lbl">연락처 2</div>
			<div class="col-3">
				<input
					type="text"
					ref="txtTel2"
					class="form-control"
					v-model="Org.tel2"
				/>
			</div>
			<div class="col-1 lbl">팩스</div>
			<div class="col-3">
				<input
					type="text"
					ref="txtFax"
					class="form-control"
					v-model="Org.fax"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl"><i></i>우편번호</div>
			<div class="col-3">
				<div class="input-group">
					<input
						type="text"
						ref="txtZip"
						class="form-control"
						v-model="Org.zip"
					/>
					<button class="btn btn-primary IconBtn">
						<span class="material-icons"> search </span>
					</button>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl">도로명 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddr2"
					class="form-control"
					v-model="Org.addrStret"
				/>
			</div>
			<div class="col-1 lbl">지번 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddrStret"
					class="form-control"
					v-model="Org.addrLotNum"
				/>
			</div>
			<div class="col-1 lbl">상세 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddr3"
					class="form-control"
					v-model="Org.addr2"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl">추가 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddrLotNum"
					class="form-control"
					v-model="Org.addr3"
				/>
			</div>
		</div>
	</div>

	<div class="Tit1">
		<div>담당자 정보</div>
		<div></div>
	</div>

	<div class="container-fluid ItemBox">
		<div class="row">
			<div class="col-1 lbl"><i></i>(정)이름</div>
			<div class="col-1">
				<input
					type="text"
					ref="txtMngerNm1"
					class="form-control"
					v-model="Org.mngerNm1"
				/>
			</div>
			<div class="col-1 lbl"><i></i>부서</div>
			<div class="col-1">
				<input
					type="text"
					ref="txtMngerTeam1"
					class="form-control"
					v-model="Org.mngerTeam1"
				/>
			</div>
			<div class="col-1 lbl"><i></i>직급</div>
			<div class="col-1">
				<input
					type="text"
					ref="txtMngerPosit1"
					class="form-control"
					v-model="Org.mngerPosit1"
				/>
			</div>
			<div class="col-1 lbl"><i></i>휴대번호</div>
			<div class="col-2">
				<input
					type="text"
					ref="txtMngerPhone1"
					class="form-control"
					v-model="Org.mngerPhone1"
				/>
			</div>
			<div class="col-1 lbl"><i></i>이메일</div>
			<div class="col-2">
				<input
					type="text"
					ref="txtMngerEmail1"
					class="form-control"
					v-model="Org.mngerEmail1"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl">(부)이름</div>
			<div class="col-1">
				<input
					type="text"
					ref="txtMngerNm2"
					class="form-control"
					v-model="Org.mngerNm2"
				/>
			</div>
			<div class="col-1 lbl">부서</div>
			<div class="col-1">
				<input
					type="text"
					ref="txtMngerTeam2"
					class="form-control"
					v-model="Org.mngerTeam2"
				/>
			</div>
			<div class="col-1 lbl">직급</div>
			<div class="col-1">
				<input
					type="text"
					ref="txtMngerPosit2"
					class="form-control"
					v-model="Org.mngerPosit2"
				/>
			</div>
			<div class="col-1 lbl">휴대번호</div>
			<div class="col-2">
				<input
					type="text"
					ref="txtMngerPhone2"
					class="form-control"
					v-model="Org.mngerPhone2"
				/>
			</div>
			<div class="col-1 lbl">이메일</div>
			<div class="col-2">
				<input
					type="text"
					ref="txtMngerEmail2"
					class="form-control"
					v-model="Org.mngerEmail2"
				/>
			</div>
		</div>
	</div>

	<!--	기관인증 코드	------------------------------->
	<Teleport to="#modal">
		<AppModalV1 v-model="Modal.OrgUrlCd" title="기관인증코드 변경" width="500">
			<ChgUrlCd
				v-model="Modal.OrgUrlCd"
				:OrgId="Org.orgId"
				:AcuntId="Acunt.acuntId"
				ActinType="C00201"
				ActinFunc="관리자-기관계정 사용기한 수정"
				@SetUrlCd="setUrlCd"
			></ChgUrlCd>
		</AppModalV1>
	</Teleport>

	<!--	사용기한 	------------------------------->
	<Teleport to="#modal">
		<AppModalV1 v-model="Modal.AcuntExpirDt" title="사용기한 변경" width="500">
			<AcuntChgExpireDt
				v-model="Modal.AcuntExpirDt"
				:AcuntId="Acunt.acuntId"
				ActinType="C00202"
				ActinFunc="관리자-기관계정 사용기한 수정"
				@setExpireDt="setExpireDt"
			></AcuntChgExpireDt>
		</AppModalV1>
	</Teleport>

	<!--	비밀번호 변경 ------------------------------->
	<Teleport to="#modal">
		<AppModalV1 v-model="Modal.AcuntPw" title="비밀번호 변경" width="500">
			<AcuntChgPw
				v-model="Modal.AcuntPw"
				:AcuntId="Acunt.acuntId"
				ActinType="C00203"
				ActinFunc="관리자-기관계정 비밀번호 변경"
				@setPw="setPw"
			></AcuntChgPw>
		</AppModalV1>
	</Teleport>

	<!--	변경로그	------------------------------->
	<Teleport to="#modal">
		<AppModal
			v-model="Modal.AcuntLog"
			title="변경로그"
			width="1000"
			:footer="false"
		>
			<template #default>
				<AcuntLogList :AcuntId="Acunt.acuntId"></AcuntLogList>
			</template>
			<template #actions>
				<button
					type="button"
					class="btn btn-secondary"
					@click="ShowHide('AcuntLog', false)"
				>
					닫기
				</button>
			</template>
		</AppModal>
	</Teleport>

	<!--	접속로그	------------------------------->
	<Teleport to="#modal">
		<AppModal
			v-model="Modal.AcuntLoginLog"
			title="접속로그"
			width="1000"
			:footer="false"
		>
			<template #default>
				<AcuntLoginLogList :AcuntId="Acunt.acuntId"></AcuntLoginLogList>
			</template>
			<template #actions>
				<button
					type="button"
					class="btn btn-secondary"
					@click="ShowHide('AcuntLoginLog', false)"
				>
					닫기
				</button>
			</template>
		</AppModal>
	</Teleport>
</template>

<script setup>
import { defineProps, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import ChgUrlCd from '@/components/Org/ChgUrlCd.vue';
import AcuntChgExpireDt from '@/components/Acunt/AcuntChgExpirDt.vue';
import AcuntChgPw from '@/components/Acunt/AcuntChgPw.vue';
import AcuntLogList from '@/components/Acunt/AcuntLogList.vue';
import AcuntLoginLogList from '@/components/Acunt/AcuntLoginLogList.vue';

// Props / Emit  ****************************

const Props = defineProps({
	ProcType: { type: String },
	ObjOrg: { type: Object },
	ObjAcunt: { type: Object },
	ObjOrgTurn: { type: Object },
	OrgId: { type: Number },
});

//const Emit = defineEmits(['cretOrg']);

// Model / Data *****************************

const { userMngrId } = storeToRefs(useAuthStore());

const Org = ref({ actinReasn: '', urlCdSet: '', valid: false, urlCdNew: '' });
const Acunt = ref({ acuntIdSet: '', valid: false, expirDtNew: '' });
const OrgTurn = ref({
	turnConnCdSet: '',
	valid: false,
});

const AcuntLog = ref({
	logId: '',
	acuntId: Acunt.value.acuntId,
	actinDt: '',
	actinReasn: '',
	actinType: 'C00101',
	actinRslt: '',
	actinFunc: '',
	insId: userMngrId.value,
	insDt: '',
	uptId: userMngrId.value,
	uptDt: '',
});

const { vAlert, vSuccess } = useAlert();

Org.value = { ...Props.ObjOrg };
Acunt.value = { ...Props.ObjAcunt };
OrgTurn.value = { ...Props.ObjOrgTurn };

// Html ref  ********************************

const txtUrlCd = ref(null);
const txtAcuntId = ref(null);
const txtPw = ref(null);
const txtPwConfirm = ref(null);
const txtTurnReqCnt = ref(null);
const txtTurnConnCd = ref(null);
const txtCompyNm = ref(null);
const txtCeoNm = ref(null);
const txtBizNum = ref(null);
const txtTel1 = ref(null);
const txtZip = ref(null);
const txtMngerNm1 = ref(null);
const txtMngerTeam1 = ref(null);
const txtMngerPosit1 = ref(null);
const txtMngerPhone1 = ref(null);
const txtMngerEmail1 = ref(null);
const txtUrlCdNew = ref(null);

// Axios	***********************************

const Procs = ref({
	chkUrlCd: { path: '/api/Org/chkUrlCd', loading: false },
	chkAcuntId: { path: '/api/Acunt/chkAcuntId', loading: false },
	chkTurnConnCd: { path: '/api/OrgTurn/chkTurnConnCd', loading: false },

	cretOrg: { path: '/api/Org/cretOrg', loading: false },
	editOrg: { path: '/api/Org/editOrg', loading: false },
	getOrg: { path: '/api/Org/getOrg', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.chkUrlCd.path:
					if (data.value.ExistYn == 'Y') {
						vSuccess('이미 사용중입니다. ');
						Org.value.urlCd = '';
						Org.value.valid = false;
						if (Props.ProcType == 'C') txtUrlCd.value.focus();
						else txtUrlCdNew.value.focus();
					} else {
						vSuccess('사용 가능합니다. ');
						Org.value.urlCdSet = Org.value.urlCd;
						Org.value.valid = true;
					}
					Procs.value.chkUrlCd.loading = false;
					break;

				case Procs.value.chkAcuntId.path:
					if (data.value.ExistYn == 'Y') {
						vSuccess('이미 사용중인 아이디 입니다.');
						Acunt.value.acuntId = '';
						Acunt.value.valid = false;
						txtAcuntId.value.focus();
					} else {
						vSuccess('사용 가능합니다. ');
						Acunt.value.acuntIdSet = Acunt.value.acuntId;
						Acunt.value.valid = true;
					}
					Procs.value.chkAcuntId.loading = false;
					break;

				case Procs.value.chkTurnConnCd.path:
					if (data.value.ExistYn == 'Y') {
						vSuccess('이미 사용중인 코드 입니다.');
						OrgTurn.value.turnConnCd = '';
						OrgTurn.value.valid = false;
						txtTurnConnCd.value.focus();
					} else {
						vSuccess('사용 가능합니다. ');
						OrgTurn.value.turnConnCdSet = OrgTurn.value.turnConnCd;
						OrgTurn.value.valid = true;
					}
					Procs.value.chkTurnConnCd.loading = false;
					break;

				case Procs.value.cretOrg.path:
					vSuccess('기관이 등록되었습니다. ');
					Procs.value.cretOrg.loading = false;
					Go('OrgList', {});
					break;

				case Procs.value.editOrg.path:
					vSuccess('기관이 수정되었습니다. ');
					Procs.value.editOrg.loading = false;
					break;

				case Procs.value.getOrg.path:
					Procs.value.getOrg.loading = false;

					Org.value = data.value.Org;
					Acunt.value = data.value.Acunt;
					AcuntLog.value.acuntId = Acunt.value.acuntId;
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

// Modal ************************************

const Modal = ref({
	OrgUrlCd: false,
	AcuntExpirDt: false,
	AcuntPw: false,
	AcuntLog: false,
});

const ShowHide = (type, showYn) => {
	switch (type) {
		case 'OrgUrlCd':
			Modal.value.OrgUrlCd = showYn;
			break;
		case 'AcuntExpirDt':
			Modal.value.AcuntExpirDt = showYn;
			AcuntLog.value.actinReasn = '';
			Acunt.value.expirDtNew = '';
			Acunt.value.valid = false;
			break;
		case 'AcuntPw':
			Modal.value.AcuntPw = showYn;
			Acunt.value.pwNew = '';
			Acunt.value.pwNewConfirm = '';
			Acunt.value.valid = false;
			AcuntLog.value.actinReasn = '';
			break;
		case 'AcuntLog':
			Modal.value.AcuntLog = showYn;
			break;
		case 'AcuntLoginLog':
			Modal.value.AcuntLoginLog = showYn;
			break;
	}
};

// Init	*************************************

// Route	***********************************

const router = useRouter();
const Go = (nm, q) => {
	router.push({ name: nm, query: q });
};

// 기관인증코드 변경	**************************

// 기관인증코드 유효성
const chkUrlCd = () => {
	let Val = Org.value.urlCd;

	if (!validNotBlank(Val, '기관인증코드', txtUrlCd.value)) return;
	if (!validMaxLen(Val, 0, 20, txtUrlCd.value)) return;

	Procs.value.chkUrlCd.loading = true;
	execUrl(Procs.value.chkUrlCd.path, Org.value);
};

// 기관인증코드 유효성 (수정)

watch(
	() => Org.value.urlCd,
	newValue => {
		const val = newValue.replace(/[^a-zA-Z0-9]/g, '');
		Org.value.urlCd = val;
		Org.value.valid = Org.value.urlCd == Org.value.urlCdSet;

		//Emit('update:urlCd', Org.value.urlCd);
	},
);

// 사용기한 날짜

watch(
	() => Acunt.value.expirDt,
	newValue => {
		const val = newValue.replace(/[^0-9]/g, '');

		if (val.length == 8) {
			Acunt.value.expirDt = val.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
		}
		//Emit('update:urlCd', Org.value.urlCd);
	},
);

// 아이디 	**********************************

// 아이디 중복확인
const chkAcuntId = () => {
	let Val = Acunt.value.acuntId;

	if (!validNotBlank(Val, '아이디', txtAcuntId.value)) {
		return;
	}
	if (!validMaxLen(Val, 6, 20, txtAcuntId.value)) return;

	Procs.value.chkAcuntId.loading = true;
	execUrl(Procs.value.chkAcuntId.path, Acunt.value);
};

watch(
	() => Acunt.value.acuntId,
	newValue => {
		const val = newValue.replace(/[^a-zA-Z0-9]/g, '');
		Acunt.value.acuntId = val;
		Acunt.value.valid = Acunt.value.acuntId == Acunt.value.acuntIdSet;
	},
);

// 1회차 코드	********************************

const chkTurnConnCd = () => {
	let Val = OrgTurn.value.turnConnCd;

	if (!validNotBlank(Val, '1회차 코드', txtTurnConnCd.value)) {
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

// 우편번호

// Method	************************************

// 등록
const cretOrg = () => {
	if (!Org.value.valid) {
		vAlert('기관인증코드 유효성검사를 진행하세요.');
		return;
	}
	if (!Acunt.value.valid) {
		vAlert('아이디 중복확인을 진행하세요.');
		return;
	}

	if (!validNotBlank(Org.value.urlCd, '기관인증코드', txtUrlCd.value)) {
		return;
	}
	if (!validNotBlank(Acunt.value.acuntId, '아이디', txtAcuntId.value)) {
		return;
	}
	if (!validNotBlank(Acunt.value.pw, '비밀번호', txtPw.value)) {
		return;
	}
	if (
		!validNotBlank(Acunt.value.pwConfirm, '비밀번호 확인', txtPwConfirm.value)
	) {
		return;
	}
	if (Acunt.value.pw != Acunt.value.pwConfirm) {
		vAlert('비밀번호 확인이 일치하지 않습니다.');
		txtPwConfirm.value.focus();
		return;
	}

	if (
		!validNotBlank(
			OrgTurn.value.turnReqCnt,
			'1회차 요청수',
			txtTurnReqCnt.value,
		)
	) {
		return;
	}
	if (
		!validNotBlank(OrgTurn.value.turnConnCd, '1회차 코드', txtTurnConnCd.value)
	) {
		return;
	}
	if (!OrgTurn.value.valid) {
		vAlert('1회차코드 유효성검사를 진행하세요.');
		return;
	}

	if (!validNotBlank(Org.value.compyNm, '기관명', txtCompyNm.value)) {
		return;
	}
	if (!validNotBlank(Org.value.ceoNm, '대표자', txtCeoNm.value)) {
		return;
	}
	if (!validNotBlank(Org.value.bizNum, '사업자번호', txtBizNum.value)) {
		return;
	}
	if (!validNotBlank(Org.value.tel1, '연락처1', txtTel1.value)) {
		return;
	}
	if (!validNotBlank(Org.value.zip, '우편번호', txtZip.value)) {
		return;
	}
	if (!validNotBlank(Org.value.mngerNm1, '정(이름)', txtMngerNm1.value)) {
		return;
	}
	if (!validNotBlank(Org.value.mngerTeam1, '부서', txtMngerTeam1.value)) {
		return;
	}
	if (!validNotBlank(Org.value.mngerPosit1, '직급', txtMngerPosit1.value)) {
		return;
	}
	if (!validNotBlank(Org.value.mngerPhone1, '휴대번호', txtMngerPhone1.value)) {
		return;
	}
	if (!validNotBlank(Org.value.mngerEmail1, '이메일', txtMngerEmail1.value)) {
		return;
	}

	let Parm = {
		Org: Org.value,
		Acunt: Acunt.value,
		OrgTurn: OrgTurn.value,
	};

	Procs.value.cretOrg.loading = true;
	execUrl(Procs.value.cretOrg.path, Parm);
};

// 기관수정
const editOrg = () => {
	if (!validNotBlank(Org.value.compyNm, '기관명', txtCompyNm.value)) {
		return;
	}
	if (!validNotBlank(Org.value.ceoNm, '대표자', txtCeoNm.value)) {
		return;
	}
	if (!validNotBlank(Org.value.bizNum, '사업자번호', txtBizNum.value)) {
		return;
	}
	if (!validNotBlank(Org.value.tel1, '연락처1', txtTel1.value)) {
		return;
	}
	if (!validNotBlank(Org.value.zip, '우편번호', txtZip.value)) {
		return;
	}
	if (!validNotBlank(Org.value.mngerNm1, '정(이름)', txtMngerNm1.value)) {
		return;
	}
	if (!validNotBlank(Org.value.mngerTeam1, '부서', txtMngerTeam1.value)) {
		return;
	}
	if (!validNotBlank(Org.value.mngerPosit1, '직급', txtMngerPosit1.value)) {
		return;
	}
	if (!validNotBlank(Org.value.mngerPhone1, '휴대번호', txtMngerPhone1.value)) {
		return;
	}
	if (!validNotBlank(Org.value.mngerEmail1, '이메일', txtMngerEmail1.value)) {
		return;
	}
	Procs.value.editOrg.loading = true;
	execUrl(Procs.value.editOrg.path, Org.value);
};

// 조회
const getOrg = () => {
	let Parm = {
		orgId: Props.OrgId,
	};

	Procs.value.getOrg.loading = true;
	execUrl(Procs.value.getOrg.path, Parm);
};

if (Props.OrgId != null) {
	getOrg();
}

// 기관인증코드 수정
const setUrlCd = urlCd => {
	Org.value.urlCd = urlCd;
};

// 사용기한 수정
const setExpireDt = expireDt => {
	Acunt.value.expirDt = expireDt;
};

// 비밀번호 수정
const setPw = pw => {
	Acunt.value.Pw = pw;
};

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
</script>

<style lang="scss" scoped></style>
