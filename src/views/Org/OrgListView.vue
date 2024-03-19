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
		<button class="btn btn-primary" @click="Go('OrgCret', {})">추가</button>
	</div>

	<AppLoading v-if="loading"></AppLoading>
	<AppError v-else-if="error" :message="error.message"></AppError>
	<template v-else>
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
				<tr @click="Go('OrgEdit', { id: '1' })" class="Poit">
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
				<tr @click="Go('OrgEdit', { id: '2' })" class="Poit">
					<td>2</td>
					<td>개인_Romain choi</td>
					<td>010-2929-3838</td>
					<td>홍길동</td>
					<td>김길동 이사</td>
					<td>{{ $dayjs('2024-12-09').format('YYYY. MM. DD') }}</td>
					<td>2025-12-31</td>
					<td>1</td>
					<td>2</td>
					<td>1</td>
				</tr>
				<tr @click="Go('OrgEdit', { id: '3' })" class="Poit">
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

		<AppPagination
			:CurPage="CurPage"
			:PageCnt="PageCnt"
			@Page="GetOrgList"
		></AppPagination>
	</template>

	<Teleport to="#modal">
		<AppModal v-model="show" title="게시글">
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
	<button class="btn btn-primary" @click="openModal">모달오픈</button>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

//const props = defineProps();
//const emit = defineEmits(['ShowView']);
const router = useRouter();

const Go = (nm, q) => {
	//router.push({ name: nm, params: p });
	router.push({ name: nm, query: q });
};

const error = ref(null);
const loading = ref(false);

const TotCnt = ref(15);
const PageCnt = computed(() => Math.ceil(TotCnt.value / 3));
const CurPage = ref(3);

const GetOrgList = page => {
	CurPage.value = page ?? 1;
};

watchEffect(GetOrgList);

console.log('TotCnt ; ', TotCnt);
console.log('PageCnt ; ', PageCnt);
console.log('CurPage ; ', CurPage);

const GetList = async () => {
	try {
		loading.value = true;
	} catch (e) {
		error.value = e;
	} finally {
		loading.value = false;
	}
};

const show = ref(false);
const openModal = () => {
	show.value = true;
};
const closeModal = () => {
	show.value = false;
};
</script>

<style lang="scss" scoped></style>
