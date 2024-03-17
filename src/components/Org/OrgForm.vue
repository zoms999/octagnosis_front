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
					<input type="text" class="form-control" :value="Item.id" />
					<button class="btn btn-primary">변경</button>
				</div>
			</div>
			<div class="col-1 lbl">사용기한</div>
			<div class="col-3">
				<div class="input-group">
					<input type="text" class="form-control" />
					<button class="btn btn-primary">변경</button>
				</div>
			</div>
			<div class="col-1 lbl">등록날짜</div>
			<div class="col-3"><input type="text" class="form-control" /></div>
			<div class="col-1 lbl">아이디</div>
			<div class="col-3">
				<input type="text" class="form-control" :value="Item.UserId" />
			</div>
			<div class="col-1 lbl">비밀번호</div>
			<div class="col-3">
				<div class="input-group">
					<input type="text" class="form-control" />
					<button class="btn btn-primary">변경</button>
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
					<input type="text" class="form-control" />
				</div>
			</div>
			<div class="col-1 lbl"><i></i>대표이름</div>
			<div class="col-3">
				<input type="text" class="form-control" />
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl">세금계산서<br />(이메일)</div>
			<div class="col-3"><input type="text" class="form-control" /></div>
			<div class="col-1 lbl"><i></i>사업자번호</div>
			<div class="col-3"><input type="text" class="form-control" /></div>
			<div class="col-1 lbl">법인번호</div>
			<div class="col-3">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl">업태</div>
			<div class="col-3">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl">종목</div>
			<div class="col-3">
				<input type="text" class="form-control" />
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl"><i></i>연락처 1</div>
			<div class="col-3">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl">연락처 2</div>
			<div class="col-3">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl">팩스</div>
			<div class="col-3">
				<input type="text" class="form-control" />
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
		<div>담당자 정보</div>
		<div></div>
	</div>

	<div class="container ItemBox">
		<div class="row">
			<div class="col-1 lbl"><i></i>(정)이름</div>
			<div class="col-2">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl"><i></i>부서</div>
			<div class="col-2">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl"><i></i>직급</div>
			<div class="col-2">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl"><i></i>휴대번호</div>
			<div class="col-2">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl"><i></i>이메일</div>
			<div class="col-2">
				<input type="text" class="form-control" />
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl">(부)이름</div>
			<div class="col-2">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl">부서</div>
			<div class="col-2">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl">직급</div>
			<div class="col-2">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl">휴대번호</div>
			<div class="col-2">
				<input type="text" class="form-control" />
			</div>
			<div class="col-1 lbl">이메일</div>
			<div class="col-2">
				<input type="text" class="form-control" />
			</div>
		</div>
	</div>
</template>

<script setup>
const { Item } = defineProps({
	Item: {
		type: Object,
	},
});
</script>

<style lang="scss" scoped></style>
