<template>
	<div class="TitPage">
		<div>기관</div>
		<div></div>
	</div>
	<div class="SrchBox">
		<div class="row">
			<div class="col-8"></div>
			<div class="col-4 text-end">
				<div class="input-group w100p">
					<input
						type="text"
						class="form-control"
						id="SrchStr"
						placeholder="기관명/대표/담당자"
					/>
					<button class="btn btn-primary w80">검색</button>
				</div>
			</div>
		</div>
	</div>
	<div class="FunBox">
		<div>Total : 23,223</div>
		<button class="btn btn-primary" @click="ShowView('Cret', {})">추가</button>
	</div>
	<table
		class="table table-bordered Tbl1"
		id="dataTable"
		width="100%"
		cellspacing="0"
	>
		<thead>
			<tr>
				<th>No</th>
				<th>기관명</th>
				<th>연락처1</th>
				<th>대표자</th>
				<th>담당자(정)</th>
				<th>등록일자</th>
				<th>사용기한</th>
				<th>회차</th>
				<th>요청</th>
				<th>사용</th>
			</tr>
		</thead>
		<tbody>
			<tr @click="ShowView('OrgEdit', {})" class="Poit">
				<td>1</td>
				<td>개인_Romain choi</td>
				<td>010-2929-3838</td>
				<td>홍길동</td>
				<td>김길동 이사</td>
				<td>2022-12-09</td>
				<td>2025-12-31</td>
				<td>1</td>
				<td>2</td>
				<td>1</td>
			</tr>
			<tr @click="ShowView('OrgEdit', {})" class="Poit">
				<td>2</td>
				<td>개인_Romain choi</td>
				<td>010-2929-3838</td>
				<td>홍길동</td>
				<td>김길동 이사</td>
				<td>2022-12-09</td>
				<td>2025-12-31</td>
				<td>1</td>
				<td>2</td>
				<td>1</td>
			</tr>
			<tr @click="ShowView('OrgEdit', {})" class="Poit">
				<td>3</td>
				<td>개인_Romain choi</td>
				<td>010-2929-3838</td>
				<td>홍길동</td>
				<td>김길동 이사</td>
				<td>2022-12-09</td>
				<td>2025-12-31</td>
				<td>1</td>
				<td>2</td>
				<td>1</td>
			</tr>
		</tbody>
		<tfoot></tfoot>
	</table>
</template>

<script setup>
import { useRouter } from 'vue-router';

//const props = defineProps();
//const emit = defineEmits(['ShowView']);
const router = useRouter();

const ShowView = (vieNm, p) => {
	router.push({ name: vieNm, params: p });
};
</script>

<style lang="scss" scoped></style>
