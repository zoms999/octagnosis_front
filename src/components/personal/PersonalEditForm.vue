<template>
	<div>
		<div class="ActionBtn">
			<div></div>
			<div>
				<button class="btn btn-primary me-2" @click="$emit('editPersonal')">
					수정
				</button>
				<button class="btn btn-secondary" @click="$emit('GoBack')">
					목록으로
				</button>
			</div>
		</div>
		<div class="Tit1">
			<div>개인 기본정보</div>
			<div></div>
		</div>
		<div class="container ItemBox">
			<div class="row">
				<div class="col-1 lbl">아이디</div>
				<div class="col-2">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							v-model="personal.AcuntId"
							readonly
						/>
					</div>
				</div>
				<div class="col-1 lbl">비밀번호</div>
				<div class="col-2">
					<div class="input-group">
						<input
							id="pw"
							:type="passwordFieldType"
							class="form-control"
							:value="personal.Pw"
							@input="$emit('update:pw', $event.target.value)"
						/>
						<button class="button" @click.prevent="togglePasswordVisibility">
							<span class="icon">
								<i
									class="bi"
									:class="{
										'bi-eye-slash': showPassword,
										'bi-eye-fill': !showPassword,
									}"
								></i>
							</span>
						</button>
						<slot name="actionsPw"> </slot>
					</div>
				</div>
				<div class="col-1 lbl">가입일</div>
				<div class="col-2">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							v-model="formattedRegDt"
							readonly
						/>
					</div>
				</div>
				<div class="col-1 lbl">사용기한</div>
				<div class="col-2">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							v-model="personal.ExpirDt"
						/>
						<slot name="actionsExpirDt"> </slot>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-1 lbl">이름</div>
				<div class="col-2">
					<div class="input-group">
						<input
							id="PersnNm"
							type="text"
							class="form-control"
							v-model="personal.PersnNm"
						/>
					</div>
				</div>
				<div class="col-1 lbl">생년월일</div>
				<div class="col-2">
					<div class="input-group">
						<input type="text" class="form-control" v-model="birthdate" />
					</div>
				</div>
				<div class="col-1 lbl">성별</div>
				<div class="col-2">
					<div
						class="btn-group"
						role="group"
						aria-label="Basic radio toggle button group"
					>
						<input
							type="radio"
							class="btn-check"
							name="gender"
							id="male"
							v-model="personal.Sex"
							value="M"
						/>
						<label class="btn btn-outline-primary" for="male">남</label>

						<input
							type="radio"
							class="btn-check"
							name="gender"
							id="female"
							autocomplete="off"
							v-model="personal.Sex"
							value="W"
						/>
						<label class="btn btn-outline-primary" for="female">여</label>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-1 lbl">휴대전화</div>
				<div class="col-2">
					<div class="input-group">
						<input type="text" class="form-control" v-model="personal.Phone" />
					</div>
				</div>
				<div class="col-1 lbl">추가연락처</div>
				<div class="col-2">
					<div class="input-group">
						<input type="text" class="form-control" v-model="personal.Tel" />
					</div>
				</div>
				<div class="col-1 lbl">이메일</div>
				<div class="col-2">
					<div class="input-group">
						<input type="text" class="form-control" v-model="personal.Email" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-1 lbl"><i></i>우편번호</div>
				<div class="col-3">
					<div class="input-group">
						<input type="text" class="form-control" />
						<button class="btn btn-primary IconBtn">
							<span class="material-icons"> search </span>
						</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-1 lbl">도로명 주소</div>
				<div class="col-5">
					<input type="text" class="form-control" />
				</div>
				<div class="col-1 lbl">지번 주소</div>
				<div class="col-5">
					<input type="text" class="form-control" />
				</div>
				<div class="col-1 lbl">상세 주소</div>
				<div class="col-5">
					<input type="text" class="form-control" />
				</div>
				<div class="col-1 lbl">추가 주소</div>
				<div class="col-5">
					<input type="text" class="form-control" />
				</div>
			</div>
			<div class="row">
				<div class="col-1 lbl">로그확인</div>
				<div class="col-4">
					<div class="input-group">
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
							class="btn btn-primary IconBtn"
							@click.prevent="authChangeLogModal"
						>
							<div class="d-flex">
								<span class="me-2">변경로그</span>
								<span class="material-icons"> poll </span>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="Tit1">
			<div>최종(현재) 학력 정보</div>
			<div></div>
		</div>
		<div class="container ItemBox">
			<div class="row">
				<div class="col-1 lbl">학업군</div>
				<div class="col-2">
					<select name="Educt" id="Educt" class="form-select">
						<option value="" hidden selected>학력</option>
						<option value="">초등</option>
						<option value="">중등</option>
						<option value="">고등</option>
						<option value="">2,3년제 대학</option>
						<option value="">4년제 대학교</option>
						<option value="">대학원 석사</option>
						<option value="">대학원 박사</option>
					</select>
				</div>
				<div class="col-1 lbl">학교명</div>
				<div class="col-2">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							v-model="personal.ScholNm"
						/>
					</div>
				</div>
				<div class="col-1 lbl">전공</div>
				<div class="col-2">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							v-model="personal.ScholMajor"
						/>
					</div>
				</div>
				<div class="col-1 lbl">학년</div>
				<div class="col-2">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							v-model="personal.ScholGrade"
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="Tit1">
			<div>최종(현재) 직업 정보</div>
			<div></div>
		</div>
		<div class="container ItemBox">
			<div class="row">
				<div class="col-1 lbl">직업군</div>
				<div class="col-2">
					<select name="Job" id="Job" class="form-select">
						<option value="" hidden selected>기타</option>
						<option value="">학생</option>
						<option value="">회사원</option>
						<option value="">전문직</option>
						<option value="">사업가</option>
						<option value="">공무원</option>
						<option value="">주부</option>
						<option value="">무직</option>
					</select>
				</div>
				<div class="col-1 lbl">직장명</div>
				<div class="col-2">
					<div class="input-group">
						<input type="text" class="form-control" v-model="personal.JobNm" />
					</div>
				</div>
				<div class="col-1 lbl">하는 일</div>
				<div class="col-4">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							v-model="personal.JobDuty"
						/>
					</div>
				</div>
			</div>
		</div>

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
	</div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
	personal: Object,
});

const formattedRegDt = computed(() => {
	// Check if personal.RegDt is defined and not empty
	if (props.personal && props.personal.RegDt) {
		const regDt = props.personal.RegDt;
		// Format the date as 'YYYY-MM-DD'
		return `${regDt.substring(0, 4)}-${regDt.substring(4, 6)}-${regDt.substring(6, 8)}`;
	} else {
		return '';
	}
});

// const formattedExpirDt = computed(() => {
// 	if (props.personal && props.personal.ExpirDt) {
// 		const expirDt = props.personal.ExpirDt;
// 		return `${expirDt.substring(0, 4)}-${expirDt.substring(4, 6)}-${expirDt.substring(6, 8)}`;
// 	} else {
// 		return '';
// 	}
// });

const birthYear = ref(props.personal.BirthYear || null);
const birthMonth = ref(props.personal.BirthMonth || null);
const birthDay = ref(props.personal.BirthDay || null);

const birthdate = ref('');

// 생일 연, 월, 일이 변경될 때마다 합쳐진 생일 값을 업데이트합니다.
watch([birthYear, birthMonth, birthDay], () => {
	const year = birthYear.value || '0000';
	const month = birthMonth.value || '00';
	const day = birthDay.value || '00';
	birthdate.value = `${year}-${month}-${day}`;
});

const showPassword = ref(false);
const passwordFieldType = ref('password');
const togglePasswordVisibility = () => {
	console.log(showPassword.value);
	showPassword.value = !showPassword.value;
	passwordFieldType.value = showPassword.value ? 'text' : 'password';
};

const connectionLogShow = ref(false);
const authChangeLogShow = ref(false);
const connectionLogModal = () => {
	connectionLogShow.value = true;
};
const authChangeLogModal = () => {
	authChangeLogShow.value = true;
};

const closeModal = () => {
	connectionLogShow.value = false;
	authChangeLogShow.value = false;
};
</script>

<style lang="scss" scoped>
input[readonly] {
	background-color: #f2f2f2;
	color: #b3b3b3;
	cursor: not-allowed;
}
input[readonly]:hover {
	box-shadow: none;
}
</style>
@/hooks/alert
