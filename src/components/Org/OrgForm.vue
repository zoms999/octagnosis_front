<template>
	<div class="ActionBtn">
		<div></div>
		<div>
			<button
				v-if="ProcType == 'C'"
				class="btn btn-primary me-2"
				@click="CretOrg()"
				:disabled="Procs.CretOrg.loading"
			>
				<template v-if="Procs.CretOrg.loading">
					<span
						class="spinner-grow spinner-grow-sm"
						role="status"
						aria-hidden="true"
					></span>
					<span class="visually-hidden">Loading...</span>
				</template>
				<template v-else> 등록 </template>
			</button>
			<button v-if="ProcType == 'E'" class="btn btn-primary me-2" @click="edit">
				수정
			</button>
			<button class="btn btn-secondary" @click="$emit('GoBack')">
				목록으로
			</button>
		</div>
	</div>
	<div class="Tit1">
		<div>기관계정</div>
		<div></div>
	</div>
	<div class="container ItemBox">
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

					<button class="btn btn-primary w100" @click="ChkUrlCd">
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
					<button class="btn btn-primary w100" @click="ChkAcuntId">
						<template v-if="Procs.ChkAcuntId.loading">
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
					ref="txtTurnNum"
					class="form-control"
					v-model="OrgTurn.turnNum"
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

					<button class="btn btn-primary w100" @click="ChkTurnConnCd">
						<template v-if="Procs.ChkTurnConnCd.loading">
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
					<input type="text" class="form-control" :value="Acunt.expirDt" />
					<button class="btn btn-primary">변경</button>
				</div>
			</div>
			<div class="col-1 lbl">등록날짜</div>
			<div class="col-3">
				<input type="text" class="form-control" :value="insDt" />
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
					<input type="password" class="form-control" />
					<button class="btn btn-primary" @click="ShowModal.OrgPw = true">
						변경
					</button>
				</div>
			</div>
			<div class="col-1 lbl">로그확인</div>
			<div class="col-3 d-flex">
				<button class="btn btn-primary IconBtn me-2">
					<div class="d-flex">
						<span class="me-2">접속로그</span>
						<span class="material-icons"> poll </span>
					</div>
				</button>
				<button class="btn btn-primary IconBtn">
					<div class="d-flex">
						<span class="me-2">변경로그</span>
						<span class="material-icons"> poll </span>
					</div>
				</button>
			</div>
		</div>
	</div>

	<div class="Tit1">
		<div>기관정보</div>
		<div></div>
	</div>

	<div class="container ItemBox">
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
			<div class="col-1 lbl">세금계산서<br />(이메일)</div>
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
					ref="txtAddr1"
					class="form-control"
					v-model="Org.addr1"
				/>
			</div>
			<div class="col-1 lbl">지번 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddr2"
					class="form-control"
					v-model="Org.addr2"
				/>
			</div>
			<div class="col-1 lbl">상세 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddr3"
					class="form-control"
					v-model="Org.addr3"
				/>
			</div>
			<div class="col-1 lbl">추가 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddr4"
					class="form-control"
					v-model="Org.addr4"
				/>
			</div>
		</div>
	</div>

	<div class="Tit1">
		<div>담당자 정보</div>
		<div></div>
	</div>

	<div class="container ItemBox">
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
		<AppModal v-model="ShowModal.OrgUrlCd" title="변경 이력 기록" width="500">
			<template #default>
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
									ref="txtUrlCdNew"
									class="form-control"
									v-model="Org.urlCdNew"
								/>
								<span class="input-group-text"
									><span class="material-icons text-body-tertiary"
										>{{ Org.valid ? 'check' : 'noise_control_off' }}
									</span></span
								>

								<button class="btn btn-primary" @click="ChkUrlNewCd">
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
								v-model="MngrLog.actinReasn"
							/>
						</div>
					</div>
				</div>
			</template>
			<template #actions>
				<button type="button" class="btn btn-primary" @click="ChangeOrgUrlCd">
					저장
				</button>
				<button
					type="button"
					class="btn btn-secondary"
					@click="CloseOrgCdModal"
				>
					닫기
				</button>
			</template>
		</AppModal>
	</Teleport>

	<!--	사용기한 	------------------------------->
	<Teleport to="#modal">
		<AppModal v-model="ShowModal.ExpirDt" title="사용기한 변경" width="500">
			<template #default>
				<div class="container ItemBox">
					<div class="row">
						<div class="col-12">사용기한</div>
						<div class="col-12">
							<input type="text" class="form-control" v-model="Acunt.expirDt" />
						</div>
						<div class="col-12">변경이유</div>
						<div class="col-12">
							<input
								type="text"
								class="form-control"
								v-model="Org.actinReasn"
							/>
						</div>
					</div>
				</div>
			</template>
			<template #actions>
				<button type="button" class="btn btn-primary" @click="ChangeOrgUrlCd">
					저장
				</button>
				<button
					type="button"
					class="btn btn-secondary"
					@click="CloseOrgCdModal"
				>
					닫기
				</button>
			</template>
		</AppModal>
	</Teleport>

	<!--	비밀번호 변경 코드	------------------------------->
	<Teleport to="#modal">
		<AppModal v-model="ShowModal.OrgPw" title="비밀번호 변경" width="500">
			<template #default>
				<div class="container ItemBox">
					<div class="row">
						<div class="col-4 lbl"><i></i>기존비밀번호</div>
						<div class="col-8">
							<input
								type="password"
								class="form-control"
								v-model="ObjPw.oldPw"
							/>
						</div>
						<div class="col-4 lbl"><i></i>신규비밀번호</div>
						<div class="col-8">
							<input
								type="password"
								class="form-control"
								v-model="ObjPw.newPw"
							/>
						</div>
						<div class="col-4 lbl"><i></i>신규비밀번호 확인</div>
						<div class="col-8">
							<input
								type="password"
								class="form-control"
								v-model="ObjPw.newPwConfirm"
							/>
						</div>
					</div>
				</div>
			</template>
			<template #actions>
				<button type="button" class="btn btn-primary" @click="ChangePw">
					비밀번호 변경
				</button>
				<button
					type="button"
					class="btn btn-secondary"
					@click="ShowModal.value.OrdPw = false"
				>
					닫기
				</button>
			</template>
		</AppModal>
	</Teleport>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { defineProps, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

// Props / Emit  ****************************

const Props = defineProps({
	ProcType: { type: String },
	ObjOrg: { type: Object },
	ObjAcunt: { type: Object },
	ObjOrgTurn: { type: Object },
	OrgId: { type: Number },
});

console.log('OrgId :  ', Props.OrgId);

//const Emit = defineEmits(['CretOrg']);

// Data *************************************

const { userMngrId } = storeToRefs(useAuthStore());

const Org = ref({ actinReasn: '', urlCdSet: '', valid: false, urlCdNew: '' });
const Acunt = ref({ acuntIdSet: '', valid: false });
const OrgTurn = ref({
	turnConnCdSet: '',
	valid: false,
});

const MngrLog = ref({
	logId: '',
	mngrId: userMngrId.value,
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

const txtUrlCd = ref(null);
const txtAcuntId = ref(null);
const txtPw = ref(null);
const txtPwConfirm = ref(null);
const txtTurnNum = ref(null);
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
	ChangeOrgUrlCd: { path: '/api/Org/ChangeOrgUrlCd', loading: false },
	ChangePw: { path: '/api/Org/ChangePw', loading: false },

	ChkUrlCd: { path: '/api/Org/ChkUrlCd', loading: false },
	ChkAcuntId: { path: '/api/Acunt/ChkAcuntId', loading: false },
	ChkTurnConnCd: { path: '/api/OrgTurn/ChkTurnConnCd', loading: false },
	CretOrg: { path: '/api/Org/CretOrg', loading: false },

	GetOrg: { path: '/api/Org/GetOrg', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.ChangeOrgUrlCd.path:
					vSuccess('기관코드가 변경되었습니다.');
					ShowModal.value.OrgUrlCd = false;
					break;

				case Procs.value.ChangePw.path:
					vSuccess('비밀번호가 변경되었습니다.');
					ShowModal.value.OrdPw = false;
					break;

				case Procs.value.ChkUrlCd.path:
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
					Procs.value.ChkUrlCd.loading = false;
					break;

				case Procs.value.ChkAcuntId.path:
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
					Procs.value.ChkAcuntId.loading = false;
					break;

				case Procs.value.ChkTurnConnCd.path:
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
					Procs.value.ChkTurnConnCd.loading = false;
					break;

				case Procs.value.CretOrg.path:
					vSuccess('기관이 등록되었습니다. ');
					Procs.value.CretOrg.loading = false;
					Go('OrgList', {});
					break;

				case Procs.value.GetOrg.path:
					Procs.value.GetOrg.loading = false;

					Org.value = data.value.Org;
					Acunt.value = data.value.Acunt;

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

// Show / Hide	*****************************

const ShowModal = ref({
	OrgUrlCd: false,
	OrgCd: false,
	OrgPw: false,
	ExpirDt: false,
});

const ShowHide = (type, showHide) => {
	switch (type) {
		case 'OrgUrlCd':
			ShowModal.value.OrgUrlCd = showHide;
			Org.value.urlCdNew = '';
			Org.value.valid = false;
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
const ChkUrlCd = () => {
	let Val = Org.value.urlCd;

	if (!ValidNotBlank(Val, '기관인증코드', txtUrlCd.value)) return;
	if (!ValidMaxLen(Val, 0, 20, txtUrlCd.value)) return;

	Procs.value.ChkUrlCd.loading = true;
	execUrl(Procs.value.ChkUrlCd.path, Org.value);
};

// 기관인증코드 유효성 (수정)
const ChkUrlNewCd = () => {
	let Val = Org.value.urlCdNew;

	if (!ValidNotBlank(Val, '기관인증코드', txtUrlCdNew.value)) return;
	if (!ValidMaxLen(Val, 0, 20, txtUrlCdNew.value)) return;

	Procs.value.ChkUrlCd.loading = true;
	execUrl(Procs.value.ChkUrlCd.path, {
		urlCd: Val,
	});
};

// 기관인증코드 변경
const ChangeOrgUrlCd = () => {
	let Val = Org.value.urlCdNew;
	if (!ValidNotBlank(Val, 0, 20, txtUrlCdNew.value)) return;
	if (!ValidMaxLen(Val, 0, 20, txtUrlCdNew.value)) return;

	MngrLog.value.actinFunc = '관리자 수정';

	Procs.value.ChangeOrgUrlCd.loading = true;
	execUrl(Procs.value.ChangeOrgUrlCd.path, {
		orgId: Org.value.orgId,
		urlCd: Val,
		userId: userMngrId.value,
		mngrLog: MngrLog.value,
	});
};

watch(
	() => Org.value.urlCd,
	newValue => {
		const val = newValue.replace(/[^a-zA-Z0-9]/g, '');
		Org.value.urlCd = val;
		Org.value.valid = Org.value.urlCd == Org.value.urlCdSet;

		//Emit('update:urlCd', Org.value.urlCd);
	},
);

watch(
	() => Org.value.urlCdNew,
	newValue => {
		const val = newValue.replace(/[^a-zA-Z0-9]/g, '');
		Org.value.urlCdNew = val;
		Org.value.valid = Org.value.urlCdNew == Org.value.urlCdSet;

		//Emit('update:urlCd', Org.value.urlCd);
	},
);

// 사용기한 변경	*****************************

// 아이디 	**********************************

// 아이디 중복확인
const ChkAcuntId = () => {
	let Val = Acunt.value.acuntId;

	if (!ValidNotBlank(Val, '아이디', txtAcuntId.value)) {
		return;
	}
	if (!ValidMaxLen(Val, 6, 20, txtAcuntId.value)) return;

	Procs.value.ChkAcuntId.loading = true;
	execUrl(Procs.value.ChkAcuntId.path, Acunt.value);
};

watch(
	() => Acunt.value.acuntId,
	newValue => {
		const val = newValue.replace(/[^a-zA-Z0-9]/g, '');
		Acunt.value.acuntId = val;
		Acunt.value.valid = Acunt.value.acuntId == Acunt.value.acuntIdSet;
	},
);

// 비밀번호 변경	*****************************

const ObjPw = ref({
	orgId: Props.orgId,
	oldPw: '',
	newPw: '',
	newPwConfirm: '',
	valid: false,
});

const ChangePw = () => {
	if (ObjPw.value.newPw != ObjPw.value.newPwConfirm) {
		vAlert('비밀번호가 일치하지 않습니다.');
		return;
	}

	Procs.value.ChangePw.loading = true;
	execUrl(Procs.value.ChangePw.path, ObjPw.value);
};

// 1회차 코드	********************************

const ChkTurnConnCd = () => {
	let Val = OrgTurn.value.turnConnCd;

	if (!ValidNotBlank(Val, '1회차 코드', txtTurnConnCd.value)) {
		return;
	}
	if (!ValidMaxLen(Val, 10, 20, txtTurnConnCd.value)) return;

	Procs.value.ChkTurnConnCd.loading = true;
	execUrl(Procs.value.ChkTurnConnCd.path, OrgTurn.value);
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

// 접속로그	**********************************

// 변경로그	**********************************

// 우편번호	**********************************

// Method	************************************

// 등록
const CretOrg = () => {
	if (!Org.value.valid) {
		vAlert('기관인증코드 유효성검사를 진행하세요.');
		return;
	}
	if (!Acunt.value.valid) {
		vAlert('아이디 중복확인을 진행하세요.');
		return;
	}

	if (!ValidNotBlank(Org.value.urlCd, '기관인증코드', txtUrlCd.value)) {
		return;
	}
	if (!ValidNotBlank(Acunt.value.acuntId, '아이디', txtAcuntId.value)) {
		return;
	}
	if (!ValidNotBlank(Acunt.value.pw, '비밀번호', txtPw.value)) {
		return;
	}
	if (
		!ValidNotBlank(Acunt.value.pwConfirm, '비밀번호 확인', txtPwConfirm.value)
	) {
		return;
	}
	if (Acunt.value.pw != Acunt.value.pwConfirm) {
		vAlert('비밀번호 확인이 일치하지 않습니다.');
		txtPwConfirm.value.focus();
		return;
	}

	if (!ValidNotBlank(OrgTurn.value.turnNum, '1회차 요청수', txtTurnNum.value)) {
		return;
	}
	if (
		!ValidNotBlank(OrgTurn.value.turnConnCd, '1회차 코드', txtTurnConnCd.value)
	) {
		return;
	}
	if (!OrgTurn.value.valid) {
		vAlert('1회차코드 유효성검사를 진행하세요.');
		return;
	}

	if (!ValidNotBlank(Org.value.compyNm, '기관명', txtCompyNm.value)) {
		return;
	}
	if (!ValidNotBlank(Org.value.ceoNm, '대표자', txtCeoNm.value)) {
		return;
	}
	if (!ValidNotBlank(Org.value.bizNum, '사업자번호', txtBizNum.value)) {
		return;
	}
	if (!ValidNotBlank(Org.value.tel1, '연락처1', txtTel1.value)) {
		return;
	}
	if (!ValidNotBlank(Org.value.zip, '우편번호', txtZip.value)) {
		return;
	}
	if (!ValidNotBlank(Org.value.mngerNm1, '정(이름)', txtMngerNm1.value)) {
		return;
	}
	if (!ValidNotBlank(Org.value.mngerTeam1, '부서', txtMngerTeam1.value)) {
		return;
	}
	if (!ValidNotBlank(Org.value.mngerPosit1, '직급', txtMngerPosit1.value)) {
		return;
	}
	if (!ValidNotBlank(Org.value.mngerPhone1, '휴대번호', txtMngerPhone1.value)) {
		return;
	}
	if (!ValidNotBlank(Org.value.mngerEmail1, '이메일', txtMngerEmail1.value)) {
		return;
	}

	let Parm = {
		Org: Org.value,
		Acunt: Acunt.value,
		OrgTurn: OrgTurn.value,
	};

	Procs.value.CretOrg.loading = true;
	execUrl(Procs.value.CretOrg.path, Parm);
};

// 조회
const GetOrg = () => {
	let Parm = {
		orgId: Props.OrgId,
	};

	Procs.value.GetOrg.loading = true;
	execUrl(Procs.value.GetOrg.path, Parm);
};

if (Props.OrgId != null) {
	GetOrg();
}

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

const ValidNotBlank = (val, tit, obj) => {
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
