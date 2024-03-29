<template>
	<div class="ActionBtn">
		<slot name="actions"></slot>
	</div>
	<div class="Tit1">
		<div>기관계정</div>
		<div></div>
	</div>
	<div class="container ItemBox">
		<div class="row">
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
					<button class="btn btn-primary" @click="ShowModal.OrgCd = true">
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
		<AppModal v-model="ShowModal.OrgCd" title="변경 이력 기록" width="500">
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
									v-model="OrgCd.newOrgCd"
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
								v-model="OrgCd.newOrgCd"
							/>
						</div>
					</div>
				</div>
			</template>
			<template #actions>
				<button type="button" class="btn btn-primary" @click="ChangeOrgCd">
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
								v-model="OrgPw.oldPw"
							/>
						</div>
						<div class="col-4 lbl"><i></i>신규비밀번호</div>
						<div class="col-8">
							<input
								type="password"
								class="form-control"
								v-model="OrgPw.newPw"
							/>
						</div>
						<div class="col-4 lbl"><i></i>신규비밀번호 확인</div>
						<div class="col-8">
							<input
								type="password"
								class="form-control"
								v-model="OrgPw.newPwConfirm"
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
					@click="CloseOrgPwModal"
				>
					닫기
				</button>
			</template>
		</AppModal>
	</Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

// Props / Emit  *************************************

const Props = defineProps({
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
defineEmits(['update:Item']);

//******************************************************

const { vAlert, vSuccess } = useAlert();

// Axios	**********************************************

const { data, error, loading, execute, execUrl, reqUrl } = useAxios(
	'',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case '/api/Org/GetOrgList':
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

// 사용기한 변경	****************************************

// 기관인증코드 변경	************************************

const OrgCd = ref({
	orgId: Props.orgId,
	oldOrgCd: '',
	newOrgCd: '',
});

// Modal
const ShowOrgCd = ref(false);
const OpenOrgCdModal = () => {
	ShowOrgCd.value = true;
};
const CloseOrgCdModal = () => {
	ShowOrgCd.value = false;
};

// Method
const { execute: exeChangeOrgCd } = useAxios(
	'/api/Org/ChangeOrgCd',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('비밀번호가 변경되었습니다.');
			ShowModal.value.OrdPw = false;
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const ChangeOrgCd = () => {
	if (OrgCd.value.newOrgCd != OrgCd.value.newOrgCdConfirm) {
		vAlert('비밀번호가 일치하지 않습니다.');
		return;
	}
	exeChangeOrgCd(OrgCd.value);
};

// 비밀번호 변경	****************************************

const OrgPw = ref({
	orgId: Props.orgId,
	oldPw: '',
	newPw: '',
	newPwConfirm: '',
});

// Modal
const ShowOrgPw = ref(false);
const OpenOrgPwModal = () => {
	ShowOrgPw.value = true;
};
const CloseOrgPwModal = () => {
	ShowOrgPw.value = false;
};

// Method
const { execute: exeChangePw } = useAxios(
	'/api/Org/ChangePw',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('비밀번호가 변경되었습니다.');
			CloseOrgPwModal();
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const ChangePw = () => {
	if (OrgPw.value.newPw != OrgPw.value.newPwConfirm) {
		vAlert('비밀번호가 일치하지 않습니다.');
		return;
	}
	exeChangePw(OrgPw.value);
};

// 접속로그	****************************************

// 변경로그	****************************************

// 우편번호	****************************************

// 등록	********************************************
</script>

<style lang="scss" scoped></style>
