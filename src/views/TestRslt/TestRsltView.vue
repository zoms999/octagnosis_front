<template>
	<div class="TitPage">
		<div>검사결과 > 기관용 > 결과보기</div>
		<div></div>
	</div>
	<div class="ActionBtn">
		<div></div>
		<div>
			<!--
			<button
				type="button"
				class="btn btn-primary"
				@click="submitForm"
				:disabled="editLoading"
			>
				<template v-if="editLoading">
					<span
						class="spinner-grow spinner-grow-sm"
						role="status"
						aria-hidden="true"
					></span>
					<span class="visually-hidden">Loading...</span>
				</template>
				<template v-else> 수정 </template>
			</button>
			-->
			<button type="button" class="btn btn-primary ms-2" @click="goListPage">
				목록
			</button>
		</div>
	</div>
	<div class="SrchBox">
		<div class="row">
			<div class="col-12">
				<ul class="nav nav-tabs">
					<li
						class="nav-item mx-1"
						v-for="(item, idx) in RsltItems"
						:key="item.id"
					>
						<a
							class="nav-link"
							:class="{ active: item.activeYn == 'Y' }"
							aria-current="page"
							href="#"
							@click="goTab(item)"
							>{{ item.tit }}</a
						>
					</li>
				</ul>
			</div>
		</div>
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
					<th class="w70">No</th>
					<th>기관명</th>
					<th>연락처1</th>
					<th>대표자</th>
					<th>담당자(정)</th>
					<th class="w140">등록일자</th>
					<th class="w140">사용기한</th>
					<th class="w120">회차</th>
					<th class="w70">요청</th>
					<th class="w70">사용</th>
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
						<div class="input-group">
							<buton
								class="btn btn-primary btn-sm w40"
								@click.stop="ShowHide('OrgTurn', true, item.OrgId)"
								>{{ item.TurnNum }}</buton
							>
							<span
								class="input-group-text fs080 w60"
								:class="{
									'text-primary': item.TurnUseYn == 'Y',
									'text-body-tertiary': item.TurnUseYn == 'N',
								}"
								>{{ item.TurnUseYn == 'Y' ? 'OPEN' : 'CLOSE' }}</span
							>
						</div>
					</td>
					<td>{{ item.TurnReqCnt }}</td>
					<td>{{ item.TurnUseCnt }}</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>
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

// Model / Data *****************************

const OrgId = ref(0);

const RsltItems = [
	{ id: '1', cate1: 'Y', cate2: 'Y', activeYn: 'Y', tit: '개인정보' },
	{ id: '2', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '성향진단' },
	{ id: '3', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '성향분석' },
	{ id: '4', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '사고력' },
	{ id: '5', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '성향적합직업학과' },
	{ id: '6', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '역량진단' },
	{ id: '7', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '역량적합직업학과' },
	{ id: '8', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '학습' },
	{ id: '9', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '교과목' },
	{ id: '10', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '직무' },
	{ id: '11', cate1: 'Y', cate2: 'Y', activeYn: 'N', tit: '선호도' },
];

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
				case '/api/Org/getOrgList':
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
			if (showHide == false) {
				getOrgList(CurPage.value);
			}
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

const goTab = item => {
	RsltItems.forEach(o => {
		if (o.id == item.id) {
			o.activeYn = 'Y';
			// 탭변경
		} else {
			o.activeYn = 'N';
		}
	});
};

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
	getOrgList(1);
};

const getOrgList = async page => {
	page = typeof no === 'object' && page !== null ? 1 : page;
	CurBlock.value = Math.ceil(page / Parm.value.paging.pageCntInBlock);
	CurPage.value = page;
	Parm.value.paging.page = page;
	Parm.value.paging.startRow = (page - 1) * Parm.value.paging.rowCntInPage;

	execUrl('/api/Org/getOrgList', Parm.value);
};

getOrgList(1);

// List	************************************************
</script>

<style lang="scss" scoped></style>
