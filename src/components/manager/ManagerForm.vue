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
						v-focus
						type="text"
						class="form-control"
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
						class="form-control"
						id="mngrNm"
						type="text"
						placeholder="Enter your name"
						:value="mngrNm"
						@input="$emit('update:mngrNm', $event.target.value)"
					/>
				</div>
			</div>
			<div class="col-1 lbl">비밀번호</div>
			<div class="col-3"><input type="text" class="form-control" /></div>
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
						name="btnradio"
						id="btnradio1"
						autocomplete="off"
						checked
					/>
					<label class="btn btn-outline-primary" for="btnradio1">없음</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="btnradio2"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="btnradio2">보기</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="btnradio3"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="btnradio3">쓰기</label>
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
						name="btnradio"
						id="btnradio1"
						autocomplete="off"
						checked
					/>
					<label class="btn btn-outline-primary" for="btnradio1">없음</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="btnradio2"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="btnradio2">보기</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="btnradio3"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="btnradio3">쓰기</label>
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
						name="btnradio"
						id="btnradio1"
						autocomplete="off"
						checked
					/>
					<label class="btn btn-outline-primary" for="btnradio1">없음</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="btnradio2"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="btnradio2">보기</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="btnradio3"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="btnradio3">쓰기</label>
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
						name="btnradio"
						id="btnradio1"
						autocomplete="off"
						checked
					/>
					<label class="btn btn-outline-primary" for="btnradio1">없음</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="btnradio2"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="btnradio2">조회</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="btnradio3"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="btnradio3">쓰기</label>
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
						name="btnradio"
						id="btnradio1"
						autocomplete="off"
						checked
					/>
					<label class="btn btn-outline-primary" for="btnradio1">없음</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="btnradio2"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="btnradio2">보기</label>
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
						name="btnradio"
						id="btnradio1"
						autocomplete="off"
						checked
					/>
					<label class="btn btn-outline-primary" for="btnradio1">없음</label>

					<input
						type="radio"
						class="btn-check"
						name="btnradio"
						id="btnradio2"
						autocomplete="off"
					/>
					<label class="btn btn-outline-primary" for="btnradio2">보기</label>
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
	phone: String,
	tel: String,
	authPersn: String,
	authRsltView: String,
	authAdmin: String,
	authLogView: String,
	authStati: String,
	authBbs: String,
	authOrg: String,
});
defineEmits([
	'update:useYn',
	'update:email',
	'update:mngrNm',
	'update:phone',
	'update:tel',
	'update:authPersn',
	'update:authRsltView',
	'update:authAdmin',
	'update:authLogView',
	'update:authStati',
	'update:authBbs',
	'update:authOrg',
]);
</script>

<style lang="scss" scoped></style>
