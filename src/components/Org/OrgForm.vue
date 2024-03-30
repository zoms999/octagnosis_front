<template>
	<div class="ActionBtn">
		<slot name="actions"></slot>
	</div>
	<div class="Tit1">
		<div>기관계정</div>
		<div></div>
	</div>
	<div class="container ItemBox">
		<!-- 등록	----------------------------->
		<div class="row" v-if="procType == 'C'">
			<div class="col-1 lbl">기관인증코드</div>
			<div class="col-5">
				<div class="input-group">
					<input
						v-focus
						type="text"
						ref="txtUrlCd"
						class="form-control"
						v-model="ObjUrlCd.urlCd"
					/>
					<span class="input-group-text"
						><span class="material-icons text-body-tertiary"
							>{{ ObjUrlCd.valid ? 'check' : 'noise_control_off' }}
						</span></span
					>
					<button class="btn btn-primary w100" @click="ChkUrlCd">
						유효성검사
					</button>
				</div>
			</div>
			<div class="col-6">
				[ 최대 20자 , 영문(대소문자 구분), 숫자 ] &nbsp; 예) Yuop7890WeRk0909
			</div>
			<div class="col-1 lbl">아이디</div>
			<div class="col-5">
				<div class="input-group">
					<input type="text" class="form-control" v-model="ObjAcunt.acuntId" />
					<span class="input-group-text"
						><span class="material-icons text-body-tertiary">{{
							ObjAcunt.valid ? 'check' : 'noise_control_off'
						}}</span></span
					>
					<button class="btn btn-primary w100" @click="ChkAcuntId">
						중복확인
					</button>
				</div>
			</div>
			<div class="col-6">[ 6~20 자, 영문(대소문자 구분안함), 숫자 ]</div>
			<div class="col-1 lbl">비밀번호</div>
			<div class="col-3">
				<input type="password" class="form-control" />
			</div>
			<div class="col-1 lbl">비밀번호 확인</div>
			<div class="col-3">
				<input type="password" class="form-control" />
			</div>
			<div class="col-4">[ 6~20 자, 영문(대소문자 구분안함), 숫자 ]</div>
			<div class="col-1 lbl">1회차 요청수</div>
			<div class="col-1">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl">1회차 코드</div>
			<div class="col-5">
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						v-model="ObjOrgTurn.turnConnCd"
					/>
					<span class="input-group-text"
						><span class="material-icons text-body-tertiary">{{
							ObjOrgTurn.valid ? 'check' : 'noise_control_off'
						}}</span></span
					>

					<button class="btn btn-primary w100" @click="ChkTurnConnCd">
						유효성검사
					</button>
				</div>
			</div>
			<div class="col-4">
				[ 10~20 자, 영문(대소문자 구분), 숫자 ] <br />예) abCD1234EFGH5678
			</div>
		</div>
		<!-- 수정	----------------------------->
		<div class="row" v-else-if="procType == 'E'">
			<div class="col-1 lbl">기관인증코드</div>
			<div class="col-3">
				<div class="input-group">
					<input
						v-focus
						type="text"
						class="form-control"
						:value="orgId"
						@input="$emit('update:orgId', $event.target.value)"
					/>
					<button class="btn btn-primary">변경</button>
				</div>
			</div>
			<div class="col-1 lbl">사용기한</div>
			<div class="col-3">
				<div class="input-group">
					<input type="text" class="form-control" />
					<button class="btn btn-primary" @click="ShowModal.OrgUrlCd = true">
						변경
					</button>
				</div>
			</div>
			<div class="col-1 lbl">등록날짜</div>
			<div class="col-3">
				<input type="text" class="form-control" :value="insDt" />
			</div>
			<div class="col-1 lbl">아이디</div>
			<div class="col-3">
				<input type="text" class="form-control" :value="UserId" />
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
						class="form-control"
						:value="compyNm"
						@input="$emit('update:compyNm', $event.target.value)"
					/>
				</div>
			</div>
			<div class="col-1 lbl"><i></i>대표이름</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="ceoNm"
					@input="$emit('update:ceoNm', $event.target.value)"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl">세금계산서<br />(이메일)</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="billEmail"
					@input="$emit('update:billEmail', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl"><i></i>사업자번호</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="bizNum"
					@input="$emit('update:bizNum', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl">법인번호</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="corpNum"
					@input="$emit('update:corpNum', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl">업태</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="bizType"
					@input="$emit('update:bizType', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl">종목</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="bizSectr"
					@input="$emit('update:bizSectr', $event.target.value)"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl"><i></i>연락처 1</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="tel1"
					@input="$emit('update:tel1', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl">연락처 2</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="tel2"
					@input="$emit('update:tel2', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl">팩스</div>
			<div class="col-3">
				<input
					type="text"
					class="form-control"
					:value="fax"
					@input="$emit('update:fax', $event.target.value)"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl"><i></i>우편번호</div>
			<div class="col-3">
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						:value="zip"
						@input="$emit('update:zip', $event.target.value)"
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
					class="form-control"
					:value="addr1"
					@input="$emit('update:addr1', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl">지번 주소</div>
			<div class="col-5">
				<input
					type="text"
					class="form-control"
					:value="addr2"
					@input="$emit('update:addr2', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl">상세 주소</div>
			<div class="col-5">
				<input
					type="text"
					class="form-control"
					:value="addr3"
					@input="$emit('update:addr3', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl">추가 주소</div>
			<div class="col-5">
				<input
					type="text"
					class="form-control"
					:value="addr4"
					@input="$emit('update:addr4', $event.target.value)"
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
			<div class="col-2">
				<input
					type="text"
					class="form-control"
					:value="mngerNm1"
					@input="$emit('update:mngerNm1', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl"><i></i>부서</div>
			<div class="col-2">
				<input
					type="text"
					class="form-control"
					:value="mngerTeam1"
					@input="$emit('update:mngerTeam1', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl"><i></i>직급</div>
			<div class="col-2">
				<input
					type="text"
					class="form-control"
					:value="mngerPosit1"
					@input="$emit('update:mngerPosit1', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl"><i></i>휴대번호</div>
			<div class="col-2">
				<input
					type="text"
					class="form-control"
					:value="mngerPhone1"
					@input="$emit('update:mngerPhone1', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl"><i></i>이메일</div>
			<div class="col-2">
				<input
					type="text"
					class="form-control"
					:value="mngerEmail1"
					@input="$emit('update:mngerEmail1', $event.target.value)"
				/>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl">(부)이름</div>
			<div class="col-2">
				<input
					type="text"
					class="form-control"
					:value="mngerNm2"
					@input="$emit('update:mngerNm2', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl"><i></i>부서</div>
			<div class="col-2">
				<input
					type="text"
					class="form-control"
					:value="mngerTeam2"
					@input="$emit('update:mngerTeam2', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl"><i></i>직급</div>
			<div class="col-2">
				<input
					type="text"
					class="form-control"
					:value="mngerPosit2"
					@input="$emit('update:mngerPosit2', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl"><i></i>휴대번호</div>
			<div class="col-2">
				<input
					type="text"
					class="form-control"
					:value="mngerPhone2"
					@input="$emit('update:mngerPhone2', $event.target.value)"
				/>
			</div>
			<div class="col-1 lbl"><i></i>이메일</div>
			<div class="col-2">
				<input
					type="text"
					class="form-control"
					:value="mngerEmail2"
					@input="$emit('update:mngerEmail2', $event.target.value)"
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
									class="form-control"
									v-model="ObjUrlCd.urlCd"
									@input="$emit('update:orgId', $event.target.value)"
								/>
								<button class="btn btn-primary">유효성검사</button>
							</div>
						</div>
						<div class="col-12">변경이유</div>
						<div class="col-12">
							<input
								type="text"
								class="form-control"
								v-model="ObjUrlCd.actionReasn"
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
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { defineProps, watch, ref } from 'vue';

// Props / Emit  ****************************

const Props = defineProps({
	procType: { type: String },
	orgId: { type: String },
	bizNum: { type: String },
	corpNum: { type: String },
	ceoNm: { type: String },
	zip: { type: String },
	addr1: { type: String },
	addr2: { type: String },
	addr3: { type: String },
	addr4: { type: String },
	compyNm: { type: String },
	tel1: { type: String },
	tel2: { type: String },
	fax: { type: String },
	bizType: { type: String },
	bizSectr: { type: String },
	mngerNm1: { type: String },
	mngerPhone1: { type: String },
	mngerEmail1: { type: String },
	mngerNm2: { type: String },
	mngerPhone2: { type: String },
	mngerEmail2: { type: String },
	billEmail: { type: String },
	mngerTeam1: { type: String },
	mngerPosit1: { type: String },
	mngerTeam2: { type: String },
	mngerPosit2: { type: String },
	urlCd: { type: String },
});
const Emit = defineEmits(['update:urlCd', 'update:orgId']);

//*******************************************

const { vAlert, vSuccess } = useAlert();

// Data *************************************

// Axios	***********************************

const { data, error, loading, execute, execUrl, reqUrl } = useAxios(
	'',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case '/api/Org/ChangeOrgUrlCd':
					vSuccess('기관코드가 변경되었습니다.');
					ShowModal.value.OrdCd = false;
					break;
				case '/api/Org/ChangePw':
					vSuccess('비밀번호가 변경되었습니다.');
					ShowModal.value.OrdPw = false;
					break;
				case '/api/Org/ChkUrlCd':
					if (data.value.ExistYn == 'Y') {
						vSuccess('이미 사용중입니다. ');
						ObjUrlCd.value.urlCd = '';
						ObjUrlCd.value.valid = false;
					} else {
						vSuccess('사용 가능합니다. ');
						ObjUrlCd.value.urlCdSet = ObjUrlCd.value.urlCd;
						ObjUrlCd.value.valid = true;
					}
					break;

				case '/api/Acunt/ChkAcuntId':
					if (data.value.ExistYn == 'Y') {
						vSuccess('이미 사용중인 아이디 입니다.');
						ObjAcunt.value.acuntId = '';
						ObjAcunt.value.valid = false;
					} else {
						vSuccess('사용 가능합니다. ');
						ObjAcunt.value.acuntIdSet = ObjAcunt.value.acuntId;
						ObjAcunt.value.valid = true;
					}
					break;
				case '/api/OrgTurn/ChkTurnConnCd':
					if (data.value.ExistYn == 'Y') {
						vSuccess('이미 사용중인 코드 입니다.');
						ObjOrgTurn.value.turnConnCd = '';
						ObjOrgTurn.value.valid = false;
					} else {
						vSuccess('사용 가능합니다. ');
						ObjOrgTurn.value.turnConnCdSet = ObjOrgTurn.value.turnConnCd;
						ObjOrgTurn.value.valid = true;
					}
					break;

				default:
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

// Show/Hide	******************************************

const ShowModal = ref({
	OrgCd: false,
	OrgPw: false,
});

// 기관인증코드 변경	************************************

const ObjUrlCd = ref({
	urlCd: '',
	actionReasn: '',
	urlCdSet: '',
	valid: false,
});

// 기관인증코드 유효성
const ChkUrlCd = () => {
	let Val = ObjUrlCd.value.urlCd;

	if (!ValidNotBlank(Val, '기관인증코드')) {
		return;
	}
	if (!ValidMaxLen(Val, 10, 20)) return;

	execUrl('/api/Org/ChkUrlCd', ObjUrlCd.value);
};

// 기관인증코드 변경
const ChangeOrgUrlCd = () => {
	if (!ValidMaxLen(ObjUrlCd.value.urlCd, 10, 20)) return;

	execUrl('/api/Org/ChangeOrgUrlCd', ObjUrlCd.value);
};

watch(
	() => ObjUrlCd.value.urlCd,
	newValue => {
		const val = newValue.replace(/[^a-zA-Z0-9]/g, '');
		ObjUrlCd.value.urlCd = val;
		ObjUrlCd.value.valid = ObjUrlCd.value.urlCd == ObjUrlCd.value.urlCdSet;

		Emit('update:urlCd', ObjUrlCd.value.urlCd);
	},
);

// 사용기한 변경	****************************************

// 아이디 	********************************************

const ObjAcunt = ref({
	acuntId: '',
	acuntIdSet: '',
	valid: false,
});

// 아이디 중복확인
const ChkAcuntId = () => {
	let Val = ObjAcunt.value.acuntId;

	if (!ValidNotBlank(Val, '아이디')) {
		return;
	}
	if (!ValidMaxLen(Val, 10, 20)) return;

	execUrl('/api/Acunt/ChkAcuntId', ObjAcunt.value);
};

watch(
	() => ObjAcunt.value.acuntId,
	newValue => {
		const val = newValue.replace(/[^a-zA-Z0-9]/g, '');
		ObjAcunt.value.acuntId = val;
		ObjAcunt.value.valid = ObjAcunt.value.acuntId == ObjAcunt.value.acuntIdSet;
	},
);

// 비밀번호 변경	****************************************

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
	execUrl('/api/Org/ChangePw', ObjPw.value);
};

// 아이디 	********************************************

const ObjOrgTurn = ref({
	turnConnCd: '',
	turnConnCdSet: '',
	valid: false,
});

// 아이디 중복확인
const ChkTurnConnCd = () => {
	let Val = ObjOrgTurn.value.turnConnCd;

	if (!ValidNotBlank(Val, '1회차 코드')) {
		return;
	}
	if (!ValidMaxLen(Val, 10, 20)) return;

	execUrl('/api/OrgTurn/ChkTurnConnCd', ObjOrgTurn.value);
};

watch(
	() => ObjOrgTurn.value.turnConnCd,
	newValue => {
		const val = newValue.replace(/[^a-zA-Z0-9]/g, '');
		ObjOrgTurn.value.turnConnCd = val;
		ObjOrgTurn.value.valid =
			ObjOrgTurn.value.turnConnCd == ObjOrgTurn.value.turnConnCdSet;
	},
);

// 접속로그	****************************************

// 변경로그	****************************************

// 우편번호	****************************************

// 등록	*******************************************

// Method	****************************************

// Watch *****************************************

// Methods *****************************************

//console.log('txtUrlCd : ', txtUrlCd.value);

const ValidMaxLen = (val, minLen, maxLen) => {
	if (val.length < minLen && val.length > maxLen) {
		vAlert(`${minLen}~${maxLen}자 사이로 입력해주세요.`);
		return false;
	}
	return true;
};

const ValidNotBlank = (val, tit) => {
	var Val = val.replace(/\s/g, '');
	if (Val.length == 0) {
		vAlert(tit == null ? `입력해 주세요.` : `${tit}를(을) 입력해 주세요.`);
		return false;
	}
	return true;
};
</script>

<style lang="scss" scoped></style>
