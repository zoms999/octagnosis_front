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
						v-model="Parm.srchStr"
						placeholder="기관명/대표/담당자(정)"
					/>
					<button class="btn btn-primary w80" @click="GetOrgList">
						<template v-if="loading">
							<span
								class="spinner-grow spinner-grow-sm"
								role="status"
								aria-hidden="true"
							></span>
							<span class="visually-hidden">Loading...</span>
						</template>
						<template v-else> 검색 </template>
					</button>
				</div>
			</div>
		</div>
	</div>
	<div class="FunBox">
		<div>Total : {{ TotCnt }}</div>
		<button class="btn btn-primary" @click="Go('OrgCret', {})">추가</button>
	</div>

	<AppError v-if="error" :message="error.message"></AppError>
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
				<tr
					v-for="item in OrgList"
					:key="item.orgId"
					@click="Go('OrgEdit', { id: item.orgId })"
					class="Poit"
				>
					<td>{{ item.OrgId }}</td>
					<td>{{ item.CompyNm }}</td>
					<td>{{ item.Tel1 }}</td>
					<td>{{ item.CeoNm }}</td>
					<td>{{ item.MngerNm1 }}</td>
					<td>{{ dayjs(item.InsDt).format('YYYY-MM-DD') }}</td>
					<td>{{ dayjs(item.InsDt).format('YYYY-MM-DD') }}</td>
					<td>{{ item.TurnNum }}</td>
					<td>{{ item.TurnReqCnt }}</td>
					<td>{{ item.TurnUseCnt }}</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>

		<AppPagination
			:CurPage="CurPage"
			:CurBlock="CurBlock"
			:TotCnt="TotCnt"
			:RowCntInPage="Parm.paging.rowCntInPage"
			:PageCntInBlock="Parm.paging.pageCntInBlock"
			@Page="GetOrgList"
		></AppPagination>
	</template>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');

// Props / Emit  ****************************

// Data *************************************

// Axios	***********************************

const { data, error, loading, execUrl, reqUrl } = useAxios(
	'',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case '/api/Org/GetOrgList':
					TotCnt.value = data.value.OrgTotCnt;
					OrgList.value = data.value.OrgList;

					if (TotCnt.value == 0) vSuccess('조회된 데이터가 없습니다.');

					break;
				default:
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

// Show/Hide	*******************************

// Route	***********************************

const router = useRouter();
const Go = (nm, q) => {
	//router.push({ name: nm, params: p });
	router.push({ name: nm, query: q });
};

// Method	************************************

// List	************************

const Parm = ref({
	srchStr: '',
	paging: {
		page: 1,
		block: 1,
		pageCntInBlock: 3,
		rowCntInPage: 2,
		startRow: 1,
		sort: 'createdAt',
		order: 'desc',
	},
});

const TotCnt = ref(0);
const CurPage = ref(1);
const CurBlock = ref(1);
const OrgList = ref([]);

const GetOrgList = async page => {
	page = typeof no === 'object' && page !== null ? 1 : page;
	CurBlock.value = Math.ceil(page / Parm.value.paging.pageCntInBlock);
	CurPage.value = page;
	Parm.value.paging.page = page;
	Parm.value.paging.startRow = (page - 1) * Parm.value.paging.rowCntInPage;
	execUrl('/api/Org/GetOrgList', Parm.value);
};

GetOrgList(1);

// List	************************************************
</script>

<style lang="scss" scoped></style>
