<template>
	<div>
		<form>
			<div class="ActionBtn">
				<slot name="actions"></slot>
			</div>
			<div class="Tit1">
				<div>기본정보</div>
				<div></div>
			</div>
			<div class="container-fluid ItemBox">
				<div class="row">
					<div class="col-1 lbl">이메일</div>
					<div class="col-3">
						<div class="input-group">
							<input
								id="email"
								class="form-control"
								type="text"
								placeholder="Enter your email"
								:value="email"
								@input="$emit('update:email', $event.target.value)"
								:readonly="isReadonly('email')"
							/>
							<slot name="actionsDupl"> </slot>
						</div>
					</div>
					<div class="col-1 lbl">이름</div>
					<div class="col-3">
						<div class="input-group">
							<input
								id="mngrNm"
								class="form-control"
								type="text"
								placeholder="Enter your name"
								:value="mngrNm"
								@input="$emit('update:mngrNm', $event.target.value)"
								:readonly="isReadonly('mngrNm')"
							/>
						</div>
					</div>
					<div class="col-1 lbl">비밀번호</div>
					<div class="col-3">
						<div class="input-group">
							<button
								class="btn btn-primary"
								@click.prevent="togglePasswordVisibility"
							>
								<span class="material-icons">{{
									showPassword ? 'visibility_off' : 'visibility'
								}}</span>
							</button>
							<input
								id="pw"
								:type="passwordFieldType"
								class="form-control"
								:value="pw"
								@input="$emit('update:pw', $event.target.value)"
								readonly="readonly"
							/>
							<slot name="actionsPw"> </slot>
						</div>
					</div>
					<div class="col-1 lbl">휴대폰</div>
					<div class="col-3">
						<input
							class="form-control"
							id="phone"
							type="text"
							placeholder="Enter your phone"
							:value="phone"
							@input="$emit('update:phone', $event.target.value)"
						/>
					</div>
					<div class="col-1 lbl">추가연락처</div>
					<div class="col-3">
						<div class="input-group">
							<input
								class="form-control"
								id="tel"
								type="text"
								placeholder="연락처"
								:value="tel"
								@input="$emit('update:tel', $event.target.value)"
							/>
						</div>
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
							:value="addrStret"
							@input="$emit('update:addrStret', $event.target.value)"
						/>
					</div>
					<div class="col-1 lbl">지번 주소</div>
					<div class="col-5">
						<input
							type="text"
							class="form-control"
							:value="addrLotNum"
							@input="$emit('update:addrLotNum', $event.target.value)"
						/>
					</div>
					<div class="col-1 lbl">상세 주소</div>
					<div class="col-5">
						<input
							type="text"
							class="form-control"
							:value="addr2"
							@input="$emit('update:addr2', $event.target.value)"
						/>
					</div>
				</div>
				<div class="row">
					<div class="col-1 lbl">추가 주소</div>
					<div class="col-5">
						<input
							type="text"
							class="form-control"
							:value="addr3"
							@input="$emit('update:addr3', $event.target.value)"
						/>
					</div>
				</div>
			</div>
			<div class="Tit1">
				<div>권한설정</div>
				<div></div>
			</div>
			<div class="container-fluid ItemBox">
				<div class="row">
					<div class="col-1 lbl">매니저관리</div>
					<div class="col-3 d-flex">
						<div
							class="btn-group"
							role="group"
							aria-label="Basic radio toggle button group"
						>
							<input
								type="radio"
								class="btn-check"
								name="AuthAdmin"
								id="AuthAdmin0"
								autocomplete="off"
								:checked="authAdmin === 0"
								@change="updateAuth('authAdmin', 0)"
							/>
							<label class="btn btn-outline-primary" for="AuthAdmin0"
								>없음</label
							>

							<input
								type="radio"
								class="btn-check"
								name="AuthAdmin"
								id="AuthAdmin1"
								autocomplete="off"
								:checked="authAdmin === 1"
								@change="updateAuth('authAdmin', 1)"
							/>
							<label class="btn btn-outline-primary" for="AuthAdmin1"
								>보기</label
							>
							<input
								type="radio"
								class="btn-check"
								name="AuthAdmin"
								id="AuthAdmin2"
								autocomplete="off"
								:checked="authAdmin === 2"
								@change="updateAuth('authAdmin', 2)"
							/>
							<label class="btn btn-outline-primary" for="AuthAdmin2"
								>쓰기</label
							>
						</div>
					</div>

					<div class="col-1 lbl">(계정)기관관리</div>
					<div class="col-3 d-flex">
						<div
							class="btn-group"
							role="group"
							aria-label="Basic radio toggle button group"
						>
							<input
								type="radio"
								class="btn-check"
								name="AuthOrg"
								id="AuthOrg0"
								autocomplete="off"
								:checked="authOrg === 0"
								@change="updateAuth('authOrg', 0)"
							/>
							<label class="btn btn-outline-primary" for="AuthOrg0">없음</label>

							<input
								type="radio"
								class="btn-check"
								name="AuthOrg"
								id="AuthOrg1"
								autocomplete="off"
								:checked="authOrg === 1"
								@change="updateAuth('authOrg', 1)"
							/>
							<label class="btn btn-outline-primary" for="AuthOrg1">보기</label>

							<input
								type="radio"
								class="btn-check"
								name="AuthOrg"
								id="AuthOrg2"
								autocomplete="off"
								:checked="authOrg === 2"
								@change="updateAuth('authOrg', 2)"
							/>
							<label class="btn btn-outline-primary" for="AuthOrg2">쓰기</label>
						</div>
					</div>

					<div class="col-1 lbl">(계정)개인관리</div>
					<div class="col-3 d-flex">
						<div
							class="btn-group"
							role="group"
							aria-label="Basic radio toggle button group"
						>
							<input
								type="radio"
								class="btn-check"
								name="AuthPersn"
								id="AuthPersn0"
								autocomplete="off"
								:checked="authPersn === 0"
								@change="updateAuth('authPersn', 0)"
							/>
							<label class="btn btn-outline-primary" for="AuthPersn0"
								>없음</label
							>

							<input
								type="radio"
								class="btn-check"
								name="AuthPersn"
								id="AuthPersn1"
								autocomplete="off"
								:checked="authPersn === 1"
								@change="updateAuth('authPersn', 1)"
							/>
							<label class="btn btn-outline-primary" for="AuthPersn1"
								>보기</label
							>

							<input
								type="radio"
								class="btn-check"
								name="AuthPersn"
								id="AuthPersn2"
								autocomplete="off"
								:checked="authPersn === 2"
								@change="updateAuth('authPersn', 2)"
							/>
							<label class="btn btn-outline-primary" for="AuthPersn2"
								>쓰기</label
							>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-1 lbl">문의글 관리</div>
					<div class="col-3 d-flex">
						<div
							class="btn-group"
							role="group"
							aria-label="Basic radio toggle button group"
						>
							<input
								type="radio"
								class="btn-check"
								name="AuthBbs"
								id="AuthBbs0"
								autocomplete="off"
								:checked="authBbs === 0"
								@change="updateAuth('authBbs', 0)"
							/>
							<label class="btn btn-outline-primary" for="AuthBbs0">없음</label>

							<input
								type="radio"
								class="btn-check"
								name="AuthBbs"
								id="AuthBbs1"
								autocomplete="off"
								:checked="authBbs === 1"
								@change="updateAuth('authBbs', 1)"
							/>
							<label class="btn btn-outline-primary" for="AuthBbs1">조회</label>

							<input
								type="radio"
								class="btn-check"
								name="AuthBbs"
								id="AuthBbs2"
								autocomplete="off"
								:checked="authBbs === 2"
								@change="updateAuth('authBbs', 2)"
							/>
							<label class="btn btn-outline-primary" for="AuthBbs2">쓰기</label>
						</div>
					</div>

					<div class="col-1 lblT">검사결과<br />(기관&개인)</div>
					<div class="col-3 d-flex">
						<div
							class="btn-group"
							role="group"
							aria-label="Basic radio toggle button group"
						>
							<input
								type="radio"
								class="btn-check"
								name="AuthRsltView"
								id="AuthRsltView0"
								autocomplete="off"
								:checked="authRsltView === 0"
								@change="updateAuth('authRsltView', 0)"
							/>
							<label class="btn btn-outline-primary" for="AuthRsltView0"
								>없음</label
							>

							<input
								type="radio"
								class="btn-check"
								name="AuthRsltView"
								id="AuthRsltView1"
								autocomplete="off"
								:checked="authRsltView === 1"
								@change="updateAuth('authRsltView', 1)"
							/>
							<label class="btn btn-outline-primary" for="AuthRsltView1"
								>보기</label
							>
						</div>
					</div>

					<div class="col-1 lbl">로그관리</div>
					<div class="col-3 d-flex">
						<div
							class="btn-group"
							role="group"
							aria-label="Basic radio toggle button group"
						>
							<input
								type="radio"
								class="btn-check"
								name="AuthLogView"
								id="AuthLogView1"
								autocomplete="off"
								:checked="authLogView === 0"
								@change="updateAuth('authLogView', 0)"
							/>
							<label class="btn btn-outline-primary" for="AuthLogView1"
								>없음</label
							>

							<input
								type="radio"
								class="btn-check"
								name="AuthLogView"
								id="AuthLogView2"
								autocomplete="off"
								:checked="authLogView === 1"
								@change="updateAuth('authLogView', 1)"
							/>
							<label class="btn btn-outline-primary" for="AuthLogView2"
								>보기</label
							>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-1 lbl">통계조회</div>
					<div class="col-3 d-flex">
						<div
							class="btn-group"
							role="group"
							aria-label="Basic radio toggle button group"
						>
							<input
								type="radio"
								class="btn-check"
								name="AuthStati"
								id="AuthStati0"
								autocomplete="off"
								:checked="authStati === 0"
								@change="updateAuth('authStati', 0)"
							/>
							<label class="btn btn-outline-primary" for="AuthStati0"
								>없음</label
							>

							<input
								type="radio"
								class="btn-check"
								name="AuthStati"
								id="AuthStati1"
								autocomplete="off"
								:checked="authStati === 1"
								@change="updateAuth('authStati', 1)"
							/>
							<label class="btn btn-outline-primary" for="AuthStati1"
								>보기</label
							>
						</div>
					</div>
				</div>
			</div>

			<div class="Tit1">
				<div>활동관리</div>
				<div></div>
			</div>
			<div class="container ItemBox">
				<div class="row">
					<div class="col-1 lbl">로그확인</div>
					<div class="col-5 d-flex">
						<button
							class="btn btn-primary IconBtn me-2"
							@click.prevent="connectionLogModal"
						>
							<div class="d-flex">
								<span class="me-2">접속로그</span>
								<span class="material-icons"> poll </span>
							</div>
						</button>
						<button
							class="btn btn-primary IconBtn me-2"
							@click.prevent="authChangeLogModal"
						>
							<div class="d-flex">
								<span class="me-2">변경로그</span>
								<span class="material-icons"> poll </span>
							</div>
						</button>
						<button
							class="btn btn-primary IconBtn"
							@click.prevent="resultHisLogModal"
						>
							<div class="d-flex">
								<span class="me-2">결과지로그</span>
								<span class="material-icons"> poll </span>
							</div>
						</button>
					</div>
					<div class="col-1 lbl">로그인관리</div>
					<div class="col-5 d-flex">
						<button class="btn btn-primary IconBtn me-2">
							<div class="d-flex">
								<span class="me-2">자동연장차단</span>
								<span class="material-icons"> poll </span>
							</div>
						</button>
						<button class="btn btn-primary IconBtn me-2">
							<div class="d-flex">
								<span class="me-2">권한 정보의 즉시 변경이 필요한경우!</span>
								<span class="material-icons"> poll </span>
							</div>
						</button>
					</div>
				</div>
			</div>
		</form>
		<Teleport to="#modal">
			<AppModal v-model="connectionLogShow" title="접속로그">
				<template #default>
					<p>제목 :</p>
					<p>내용 :</p>
					<p>등록일 :</p>
				</template>
				<template #actions>
					<button type="button" class="btn btn-secondary" @click="closeModal">
						닫기
					</button>
				</template>
			</AppModal>
		</Teleport>

		<!--	변경로그	------------------------------->
		<Teleport to="#modal">
			<AppModal
				v-model="authChangeLogShow"
				title="변경로그"
				width="1000"
				:footer="false"
			>
				<template #default>
					<ManagerLogList :MngrId="mngrId"></ManagerLogList>
				</template>
				<template #actions>
					<button type="button" class="btn btn-secondary" @click="closeModal">
						닫기
					</button>
				</template>
			</AppModal>
		</Teleport>

		<Teleport to="#modal">
			<AppModal v-model="resultHisLogShow" title="결과지로그">
				<template #default>
					<p>제목 :</p>
					<p>내용 :</p>
					<p>등록일 :</p>
				</template>
				<template #actions>
					<button type="button" class="btn btn-secondary" @click="closeModal">
						닫기
					</button>
				</template>
			</AppModal>
		</Teleport>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import axios from 'axios';

import ManagerLogList from '@/components/manager/ManagerLogList.vue';

defineOptions({
	inheritAttrs: false,
});
const member = defineProps({
	useYn: String,
	email: {
		type: String,
	},
	mngrNm: String,
	pw: String,
	phone: String,
	tel: String,
	authAdmin: Number,
	authOrg: Number,
	authPersn: Number,
	authBbs: Number,
	authRsltView: Number,
	authLogView: Number,
	authStati: Number,
	zip: String,
	addrStret: String,
	addrLotNum: String,
	addr2: String,
	addr3: String,
});
defineEmits([
	'update:useYn',
	'update:email',
	'update:mngrNm',
	'update:pw',
	'update:phone',
	'update:tel',
	'update:authAdmin',
	'update:authOrg',
	'update:authPersn',
	'update:authBbs',
	'update:authRsltView',
	'update:authLogView',
	'update:authStati',
	'update:zip',
	'update:addrStret',
	'update:addrLotNum',
	'update:addr2',
	'update:addr3',
]);
console.log('member.email' + member.email);

const route = useRoute();
// Computed property to determine if readonly should be applied
const isReadonly = fieldName => {
	return (
		route.name === 'ManagerEdit' &&
		(fieldName === 'email' || fieldName === 'mngrNm')
	); // Add more fields as needed
};

const showPassword = ref(false);
const passwordFieldType = ref('password');
const togglePasswordVisibility = () => {
	console.log(showPassword.value);
	showPassword.value = !showPassword.value;
	passwordFieldType.value = showPassword.value ? 'text' : 'password';
};

const mngrId = route.params.mngrId; // 현재 페이지의 매니저 ID
const { vAlert, vSuccess } = useAlert();
const updateAuth = async (key, value) => {
	try {
		console.log('route.name' + route.name);
		await axios.patch(`/api/managers/auth/${mngrId}`, { [key]: value });
		//emit(`update:${key}`, value); // Ensure emit is imported and defined
		console.log('key  ' + key);
		console.log('value  ' + value);
		vSuccess('수정 되었습니다.');
	} catch (err) {
		vAlert(err.message);
		console.error('API 업데이트 중 오류 발생:', err);
	}
};

const connectionLogShow = ref(false);
const authChangeLogShow = ref(false);
const resultHisLogShow = ref(false);
const connectionLogModal = () => {
	connectionLogShow.value = true;
};
const authChangeLogModal = () => {
	authChangeLogShow.value = true;
};
const resultHisLogModal = () => {
	resultHisLogShow.value = true;
};

const closeModal = () => {
	connectionLogShow.value = false;
	authChangeLogShow.value = false;
	resultHisLogShow.value = false;
};
</script>

<style lang="scss" scoped></style>
@/hooks/alert
