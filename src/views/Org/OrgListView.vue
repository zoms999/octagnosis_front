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
					<button class="btn btn-primary w80" @click="GetOrgList(1)">
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
		<div>
			<div class="w100">Total : {{ TotCnt }}</div>
			<div>
				<select
					class="form-select"
					v-model="Parm.paging.rowCntInPage"
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
					@click="Go('OrgEdit', { orgId: item.OrgId })"
					class="Poit"
				>
					<td>{{ item.OrgId }}</td>
					<td>{{ item.CompyNm }}</td>
					<td>{{ item.Tel1 }}</td>
					<td>{{ item.CeoNm }}</td>
					<td>{{ item.MngerNm1 }}</td>
					<td>{{ dayjs(item.RegDt).format('YYYY-MM-DD') }}</td>
					<td>{{ dayjs(item.ExpirDt).format('YYYY-MM-DD') }}</td>
					<td>
						<buton
							class="btn btn-primary btn-sm w40"
							@click.stop="ShowHide('OrgTurn', true, item.OrgId)"
							>{{ item.TurnNum }}</buton
						>
					</td>
					<td>{{ item.TurnReqCnt }}</td>
					<td>{{ item.TurnUseCnt }}</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>
		<div class="mt-3">
			<AppPagination
				:CurPage="CurPage"
				:CurBlock="CurBlock"
				:TotCnt="TotCnt"
				:RowCntInPage="Parm.paging.rowCntInPage"
				:PageCntInBlock="Parm.paging.pageCntInBlock"
				@Page="GetOrgList"
			></AppPagination>
		</div>
	</template>

	<!--	기관회차	------------------------------->
	<Teleport to="#modal">
		<AppModal v-model="Modal.OrgTurn" title="기관 회차" width="1100">
			<template #default>
				<OrgTurnList :OrgId="OrgId"></OrgTurnList>
			</template>
			<template #actions>
				<button
					type="button"
					class="btn btn-secondary"
					@click="ShowHide('OrgTurn', false)"
				>
					닫기
				</button>
			</template>
		</AppModal>
	</Teleport>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';

import OrgTurnList from '@/components/Org/OrgTurnList.vue';

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');

// Props / Emit  ****************************

// Data *************************************

const OrgId = ref(0);

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

// Modal ************************************

const Modal = ref({
	OrgTurn: false,
});

const ShowHide = (type, showHide, acuntId) => {
	switch (type) {
		case 'OrgTurn':
			Modal.value.OrgTurn = showHide;
			OrgId.value = acuntId;
			break;
	}
};

// Route	***********************************

const router = useRouter();

const Go = (nm, q) => {
	//router.push({ name: nm, params: p });
	console.log(('q : ', q));
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
		rowCntInPage: 10,
		startRow: 1,
		sort: 'createdAt',
		order: 'desc',
	},
});

const TotCnt = ref(0);
const CurPage = ref(1);
const CurBlock = ref(1);
const OrgList = ref([]);

const chageRowCntInPage = () => {
	GetOrgList(1);
};

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
