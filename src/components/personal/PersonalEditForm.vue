<template>
	<div>
		<div class="ActionBtn">
			<div></div>
			<div>
				<button class="btn btn-primary" @click="$emit('editPersonal')">
					수정
				</button>
				<button class="btn btn-primary ms-2" @click="$emit('GoBack')">
					목록
				</button>

				<slot name="actionsLog"> </slot>
			</div>
		</div>
		<div class="Tit1">
			<div>개인 기본정보</div>
			<div></div>
		</div>
		<div class="container-fluid ItemBox">
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
						<button
							class="btn btn-light border"
							@click.prevent="togglePasswordVisibility"
						>
							<span class="material-icons fs120">
								{{ showPassword ? 'visibility' : 'visibility_off' }}
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
							:value="personal.ExpirDt"
							readonly="readonly"
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
						<VueDatePicker
							v-model="formattedBirthDate"
							locale="ko"
							:format="formatDate"
							:enable-time-picker="false"
						>
						</VueDatePicker>
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
					<input
						type="text"
						class="form-control"
						v-model="personal.AddrStret"
					/>
				</div>
				<div class="col-1 lbl">지번 주소</div>
				<div class="col-5">
					<input
						type="text"
						class="form-control"
						v-model="personal.AddrLotNum"
					/>
				</div>
				<div class="col-1 lbl">상세 주소</div>
				<div class="col-5">
					<input type="text" class="form-control" v-model="personal.Addr2" />
				</div>
			</div>
			<div class="row">
				<div class="col-1 lbl">추가 주소</div>
				<div class="col-5">
					<input type="text" class="form-control" v-model="personal.Addr3" />
				</div>
			</div>
		</div>

		<div class="Tit1">
			<div>최종(현재) 학력 정보</div>
			<div></div>
		</div>
		<div class="container-fluid ItemBox">
			<div class="row">
				<div class="col-1 lbl">학업군</div>
				<div class="col-2">
					<select
						name="Educt"
						id="Educt"
						class="form-select"
						v-model="personal.Educt"
					>
						<option value="" hidden selected>학력</option>
						<option value="C01001">초등</option>
						<option value="C01002">중등</option>
						<option value="C01003">고등</option>
						<option value="C01004">2,3년제 대학</option>
						<option value="C01005">4년제 대학교</option>
						<option value="C01006">대학원 석사</option>
						<option value="C01007">대학원 박사</option>
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
		<div class="container-fluid ItemBox">
			<div class="row">
				<div class="col-1 lbl">직업군</div>
				<div class="col-2">
					<select
						name="Job"
						id="Job"
						class="form-select"
						v-model="personal.Job"
					>
						<option value="" hidden selected>기타</option>
						<option value="C02001">학생</option>
						<option value="C02002">회사원</option>
						<option value="C02003">전문직</option>
						<option value="C02004">사업가</option>
						<option value="C02005">공무원</option>
						<option value="C02006">주부</option>
						<option value="C02007">무직</option>
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

const selectJobs = ref('');

watch(
	() => props.personal.Job,
	newValue => {
		selectJobs.value = newValue;
	},
);

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

const formattedBirthDate = computed(() => {
	// Check if personal.RegDt is defined and not empty
	if (props.personal && props.personal.BirthDate) {
		const birthDate = props.personal.BirthDate;
		// Format the date as 'YYYY-MM-DD'
		return `${birthDate.substring(0, 4)}-${birthDate.substring(4, 6)}-${birthDate.substring(6, 8)}`;
	} else {
		return '';
	}
});

watch(
	() => props.personal.ExpirDt,
	newValue => {
		const val = newValue.replace(/[^0-9]/g, '');

		if (val.length == 8) {
			props.personal.ExpirDt = val.replace(
				/^(\d{4})(\d{2})(\d{2})$/,
				'$1-$2-$3',
			);
		}
		//Emit('update:urlCd', Org.value.urlCd);
	},
);

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
