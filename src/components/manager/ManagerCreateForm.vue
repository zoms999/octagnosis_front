<template>
	<form>
		<div class="ActionBtn">
			<slot name="actions"></slot>
		</div>
		<div class="Tit1">
			<div>기본정보</div>
			<div></div>
		</div>
		<div class="container ItemBox">
			<div class="row">
				<div class="col-1 lbl">이메일</div>
				<div class="col-3">
					<div class="input-group">
						<input
							id="email"
							class="form-control"
							type="text"
							placeholder="이메일을 입력하세요"
							:value="email"
							@input="$emit('update:email', $event.target.value)"
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
							placeholder="이름을 입력하세요"
							:value="mngrNm"
							@input="$emit('update:mngrNm', $event.target.value)"
						/>
					</div>
				</div>
				<div class="col-1 lbl">비밀번호</div>
				<div class="col-3">
					<div class="input-group">
						<input
							id="pw"
							type="password"
							class="form-control"
							:value="pw"
							@input="$emit('update:pw', $event.target.value)"
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
						placeholder="휴대전화를 입력하세요."
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
							placeholder="추가연락처를 입력하세요"
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
						<button
							type="button"
							class="btn btn-primary IconBtn"
							@click="popupAddr"
						>
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
						ref="txtAddr3"
					/>
				</div>
			</div>
		</div>

		<div class="Tit1">
			<div>권한설정</div>
			<div></div>
		</div>
		<div class="container ItemBox">
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
							checked
							@change="$emit('update:authAdmin', 0)"
						/>
						<label class="btn btn-outline-primary" for="AuthAdmin0">없음</label>

						<input
							type="radio"
							class="btn-check"
							name="AuthAdmin"
							id="AuthAdmin1"
							autocomplete="off"
							@change="$emit('update:authAdmin', 1)"
						/>
						<label class="btn btn-outline-primary" for="AuthAdmin1">보기</label>
						<input
							type="radio"
							class="btn-check"
							name="AuthAdmin"
							id="AuthAdmin2"
							autocomplete="off"
							@change="$emit('update:authAdmin', 2)"
						/>
						<label class="btn btn-outline-primary" for="AuthAdmin2">쓰기</label>
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
							checked
							@change="$emit('update:authOrg', 0)"
						/>
						<label class="btn btn-outline-primary" for="AuthOrg0">없음</label>

						<input
							type="radio"
							class="btn-check"
							name="AuthOrg"
							id="AuthOrg1"
							autocomplete="off"
							@change="$emit('update:authOrg', 1)"
						/>
						<label class="btn btn-outline-primary" for="AuthOrg1">보기</label>

						<input
							type="radio"
							class="btn-check"
							name="AuthOrg"
							id="AuthOrg2"
							autocomplete="off"
							@change="$emit('update:authOrg', 2)"
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
							checked
							@change="$emit('update:authPersn', 0)"
						/>
						<label class="btn btn-outline-primary" for="AuthPersn0">없음</label>

						<input
							type="radio"
							class="btn-check"
							name="AuthPersn"
							id="AuthPersn1"
							autocomplete="off"
							@change="$emit('update:authPersn', 1)"
						/>
						<label class="btn btn-outline-primary" for="AuthPersn1">보기</label>

						<input
							type="radio"
							class="btn-check"
							name="AuthPersn"
							id="AuthPersn2"
							autocomplete="off"
							@change="$emit('update:authPersn', 2)"
						/>
						<label class="btn btn-outline-primary" for="AuthPersn2">쓰기</label>
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
							checked
							@change="$emit('update:authBbs', 0)"
						/>
						<label class="btn btn-outline-primary" for="AuthBbs0">없음</label>

						<input
							type="radio"
							class="btn-check"
							name="AuthBbs"
							id="AuthBbs1"
							autocomplete="off"
							@change="$emit('update:authBbs', 1)"
						/>
						<label class="btn btn-outline-primary" for="AuthBbs1">조회</label>

						<input
							type="radio"
							class="btn-check"
							name="AuthBbs"
							id="AuthBbs2"
							autocomplete="off"
							@change="$emit('update:authBbs', 2)"
						/>
						<label class="btn btn-outline-primary" for="AuthBbs2">쓰기</label>
					</div>
				</div>

				<div class="col-1 lbl">검사결과(기관&개인)</div>
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
							checked
							@change="$emit('update:authRsltView', 0)"
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
							@change="$emit('update:authRsltView', 1)"
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
							checked
							@change="$emit('update:authLogView', 0)"
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
							@change="$emit('update:authLogView', 1)"
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
							checked
							@change="$emit('update:authStati', 0)"
						/>
						<label class="btn btn-outline-primary" for="AuthStati0">없음</label>

						<input
							type="radio"
							class="btn-check"
							name="AuthStati"
							id="AuthStati1"
							autocomplete="off"
							@change="$emit('update:authStati', 1)"
						/>
						<label class="btn btn-outline-primary" for="AuthStati1">보기</label>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
	const script = document.createElement('script');
	script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
	script.async = true;
	document.body.appendChild(script);
});
const txtAddr3 = ref();

defineOptions({
	inheritAttrs: false,
});

const props = defineProps({
	mngrId: {
		type: Number,
		required: true,
	},
	useYn: {
		type: String,
		default: 'Y',
	},
	email: {
		type: String,
		required: true,
	},
	mngrNm: {
		type: String,
		required: true,
	},
	pw: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	tel: {
		type: String,
	},
	authAdmin: {
		type: String,
	},
	authOrg: {
		type: String,
	},
	authPersn: {
		type: String,
	},
	authBbs: {
		type: String,
	},
	authRsltView: {
		type: String,
	},
	authLogView: {
		type: String,
	},
	authStati: {
		type: String,
	},
	insDt: {
		type: [String, Date, Number],
	},
	zip: String,
	addrStret: String,
	addrLotNum: String,
	addr2: String,
	addr3: String,
});
const Emit = defineEmits([
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

// 우편번호
const popupAddr = () => {
	new daum.Postcode({
		oncomplete: function (data) {
			//member.zip = data.zonecode;
			//member.addrStret = data.roadAddress;
			//member.addrLotNum = data.jibunAddress;
			//member.addr2 = data.buildingName;
			Emit('update:zip', data.zonecode);
			Emit('update:addrStret', data.roadAddress);
			Emit('update:addrLotNum', data.jibunAddress);
			Emit('update:addr2', data.buildingName);
			txtAddr3.value.focus();

			//alert(data);
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
			// 예제를 참고하여 다양한 활용법을 확인해 보세요.
		},
	}).open();
};
</script>

<style lang="scss" scoped></style>
