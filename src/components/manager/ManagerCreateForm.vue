<template>
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
						placeholder="Enter your email"
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
						placeholder="Enter your name"
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
						@change="$emit('update:AuthOrg', 0)"
					/>
					<label class="btn btn-outline-primary" for="AuthOrg0">없음</label>

					<input
						type="radio"
						class="btn-check"
						name="AuthOrg"
						id="AuthOrg1"
						autocomplete="off"
						@change="$emit('update:AuthOrg', 1)"
					/>
					<label class="btn btn-outline-primary" for="AuthOrg1">보기</label>

					<input
						type="radio"
						class="btn-check"
						name="AuthOrg"
						id="AuthOrg2"
						autocomplete="off"
						@change="$emit('update:AuthOrg', 2)"
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
					<label class="btn btn-outline-primary" for="AuthLogView1">없음</label>

					<input
						type="radio"
						class="btn-check"
						name="AuthLogView"
						id="AuthLogView2"
						autocomplete="off"
						@change="$emit('update:authLogView', 1)"
					/>
					<label class="btn btn-outline-primary" for="AuthLogView2">보기</label>
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

	<div class="Tit1">
		<div>활동관리</div>
		<div></div>
	</div>
	<div class="container ItemBox">
		<div class="row">
			<div class="col-1 lbl">로그확인</div>
			<div class="col-3 d-flex">
				<button class="btn btn-primary IconBtn me-2">
					<div class="d-flex">
						<span class="me-2">접속로그</span>
						<span class="material-icons"> poll </span>
					</div>
				</button>
				<button class="btn btn-primary IconBtn me-2">
					<div class="d-flex">
						<span class="me-2">변경로그</span>
						<span class="material-icons"> poll </span>
					</div>
				</button>
				<button class="btn btn-primary IconBtn">
					<div class="d-flex">
						<span class="me-2">결과지로그</span>
						<span class="material-icons"> poll </span>
					</div>
				</button>
			</div>
			<div class="col-1 lbl">로그인관리</div>
			<div class="col-3 d-flex">
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
</template>

<script setup>
defineProps({
	useYn: String,
	email: String,
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
]);
</script>

<style lang="scss" scoped></style>
