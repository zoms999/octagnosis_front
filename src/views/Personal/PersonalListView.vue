<template>
	<div class="TitPage">
		<div>계정관리 > 개인</div>
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
		<div>
			<div class="w100">Total : {{ TotCnt }}</div>
			<div>
				<select
					class="form-select"
					v-model="params.paging.rowCntInPage"
					@change="chageRowCntInPage"
				>
					<option value="5">5 줄</option>
					<option value="10" selected="selected">10 줄</option>
					<option value="20">20 줄</option>
					<option value="30">30 줄</option>
					<option value="50">50 줄</option>
				</select>
			</div>
		</div>
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
					<th>아이디</th>
					<th>이름</th>
					<th>휴대폰</th>
					<th>등록자</th>
					<th>만기일자</th>
					<th>검사</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="item in PersonalList"
					:key="item.PersnId"
					@click="goEditPage('PersonalEdit', item.persnId)"
					class="Poit"
				>
					<td>{{ item.persnId }}</td>
					<td>{{ item.persnUserId }}</td>
					<td>{{ item.persnNm }}</td>
					<td>{{ item.phone }}</td>
					<td>{{ dayjs(item.InsDt).format('YYYY-MM-DD') }}</td>
					<td>{{ item.ExpirationDate }}</td>
					<td>보기</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>

		<AppPagination
			:CurPage="CurPage"
			:CurBlock="CurBlock"
			:TotCnt="TotCnt"
			:RowCntInPage="params.paging.rowCntInPage"
			:PageCntInBlock="params.paging.pageCntInBlock"
			@Page="GetPersonalList"
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
import { useAxios } from '@/hooks/useAxios';
import { computed, ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
const dayjs = inject('dayjs');
const { vAlert, vSuccess } = useAlert();

const router = useRouter();

const goEditPage = (name, persnId) => {
	router.push({
		name: 'PersonalEdit',
		params: {
			persnId,
		},
	});
};

// List	************************************************

const params = ref({
	srchStr: '',
	paging: {
		page: 1,
		block: 1,
		pageCntInBlock: 3,
		rowCntInPage: 10,
		startRow: 1,
		sort: 'createdAt',
		order: 'desc',
	},
});
const PersonalList = ref([]);
const TotCnt = ref(0);
const CurPage = ref(1);
const CurBlock = ref(1);

// Axios	**********************************************
const { response, data, error, loading, execute, execUrl, reqUrl } = useAxios(
	'',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			TotCnt.value = data.value.PersonalTotCnt;
			PersonalList.value = data.value.PersonalList;
			console.log(TotCnt.value);
			console.log(PersonalList.value);
			if (TotCnt.value == 0) vSuccess('조회된 데이터가 없습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const GetPersonalList = async page => {
	page = typeof no === 'object' && page !== null ? 1 : page;
	CurBlock.value = Math.ceil(page / params.value.paging.pageCntInBlock);
	CurPage.value = page;
	params.value.paging.page = page;
	params.value.paging.startRow = (page - 1) * params.value.paging.rowCntInPage;
	console.log('GetPersonalList');
	execUrl('/api/personal/personalList', params.value);
};

GetPersonalList(1);

const show = ref(false);
const openModal = () => {
	show.value = true;
};
const closeModal = () => {
	show.value = false;
};
</script>

<style lang="scss" scoped></style>
@/hooks/alert
