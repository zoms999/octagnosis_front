<template>
	<div class="TitPage">
		<div>
			검사결과 > 기관용 <span>{{ pnlPath }}</span>
		</div>
		<div></div>
	</div>

	<AppError v-if="error" :message="error.message"></AppError>
	<template v-else>
		<div v-if="Pnl.RsltList.show">
			<div class="SrchBox">
				<div class="row">
					<div class="col-9">
						<div class="d-flex justify-content-start">
							<div class="minw100">
								<h5 class="pt-1 ps-2 text text-primary">{{ Org.CompyNm }}</h5>
							</div>
							<div class="ms-3">
								<select class="form-select w220" v-model="SelectedTurnId">
									<option
										v-for="item in OrgTurnList"
										:key="item.TurnId"
										:value="item.TurnId"
									>
										{{ item.TurnNum }} 회차 /
										{{
											item.insDt
												.substr(0, 8)
												.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3')
										}}
									</option>
								</select>
							</div>
						</div>
					</div>
					<div class="col-3 text-end">
						<div class="input-group w100p">
							<input
								type="text"
								class="form-control"
								ref="txtSrchStr"
								v-model="Parm.srchStr"
								placeholder="기관명"
								@keyup.enter="getOrgList()"
							/>
							<button class="btn btn-primary w80" @click="getOrgList()">
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
			</div>
			<table
				class="table table-bordered Tbl1"
				id="dataTable"
				width="100%"
				cellspacing="0"
			>
				<thead>
					<tr>
						<th class="w80">No</th>
						<th>이름</th>
						<th>아이디</th>
						<th>연락처</th>
						<th>검사상품</th>
						<th class="w180">시작일자</th>
						<th class="w180">완료일자</th>
						<th class="w250">결과</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, idx) in TestRsltList"
						:key="item.orgId"
						class="Poit"
					>
						<td>{{ VirNum - idx }}</td>
						<td>{{ item.PersnNm }}</td>
						<td>{{ item.AcuntId }}</td>
						<td>{{ item.Phone }}</td>
						<td>{{ item.ProdtNm }}</td>
						<td>{{ getDateFormat(item.StartDt) }}</td>
						<td>{{ getDateFormat(item.EndDt) }}</td>
						<td>
							<div v-if="item.DoneYn == 'Y'">
								<buton
									class="btn btn-primary btn-sm w80"
									@click.stop="showPnl('RsltView', item)"
									>결과보기</buton
								>
								<buton
									class="btn btn-primary btn-sm w80 ms-2"
									@click.stop="showPnl('RsltAll', item)"
									>Down</buton
								>
							</div>
							<div v-else>진행중</div>
						</td>
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
					@Page="getTestRsltList"
				></AppPagination>
			</div>
		</div>
		<div v-if="Pnl.RsltView.show">
			<RsltMain :ListItem="ListItem" @showPnl="showPnl"></RsltMain>
		</div>
	</template>

	<!--	기관조회	------------------------------->
	<Teleport to="#modal">
		<AppModal
			v-model="Modal.OrgList"
			title="기관 조회"
			width="1200"
			:footer="false"
		>
			<template #default>
				<OrgListPop :OrgList="OrgList" @setOrg="setOrg"></OrgListPop>
			</template>
			<template #actions>
				<button
					type="button"
					class="btn btn-secondary"
					@click="ShowHide('OrgList', false)"
				>
					닫기
				</button>
			</template>
		</AppModal>
	</Teleport>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, inject, watch } from 'vue';
import { useAlert } from '@/hooks/useAlert';

import OrgListPop from '@/components/TestRslt/OrgList.vue';
import RsltMain from '@/components/TestRslt/RsltMain.vue';

// Props / Emit  ****************************

// Hook	 *************************************

// Model / Data *****************************

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');
const pnlPath = ref('');
const ListItem = ref('');

const Parm = ref({
	srchStr: '',
	orgId: '',
	turnId: '',
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

const Pnl = ref({
	RsltList: { show: true },
	RsltView: { show: false },
	RsltAll: { show: false },
});

const TotCnt = ref(0);
const CurPage = ref(1);
const CurBlock = ref(1);
const TestRsltList = ref([]);
const OrgList = ref([]);
const Org = ref({ CompyNm: '-' });
const VirNum = ref(1);

const OrgTurnList = ref([]);
const SelectedTurnId = ref(null);
const CurOrgTurn = ref({});

// Html ref  ********************************

const txtSrchStr = ref(null);

// Axios / Route  ***************************

const Procs = ref({
	getTestRsltList: { path: '/api/Test/getTestRsltList', loading: false },
	getOrgList: { path: '/api/Org/getOrgList2', loading: false },
	getOrgTurnList: { path: '/api/OrgTurn/getOrgTurnList', loading: false },
	getOrgTurnPersnList: {
		path: '/api/OrgTurn/getOrgTurnPersnList',
		loading: false,
	},
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getTestRsltList.path:
					Procs.value.getTestRsltList.loading = false;
					TotCnt.value = data.value.TotCnt;
					TestRsltList.value = data.value.List;
					VirNum.value =
						TotCnt.value -
						(Parm.value.paging.page - 1) * Parm.value.paging.rowCntInPage;

					if (TotCnt.value == 0) vSuccess('조회된 데이터가 없습니다.');

					break;

				case Procs.value.getOrgList.path:
					Procs.value.getOrgList.loading = false;
					OrgList.value = data.value.OrgList;

					if (OrgList.value.length == 0) {
						vSuccess('검색된 기관이 없습니다.');
					} else {
						ShowHide('OrgList', true);
					}

					break;
				case Procs.value.getOrgTurnList.path:
					OrgTurnList.value = data.value.OrgTurnList;
					SelectedTurnId.value = OrgTurnList.value[0].TurnId;
					Parm.value.turnId = OrgTurnList.value[0].TurnId;
					getTestRsltList(1);

					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			// Procs의 모든 속성에 대해 반복문을 실행하여 loading 값을 true로 변경
			for (const key in Procs.value) {
				if (Object.hasOwnProperty.call(Procs.value, key)) {
					Procs.value[key].loading = false;
				}
			}
		},
	},
);

// Modal ************************************

const Modal = ref({
	OrgList: false,
});

const ShowHide = (type, showHide) => {
	switch (type) {
		case 'OrgList':
			Modal.value.OrgList = showHide;

			break;
	}
};

// Watch *************************************

watch(
	() => SelectedTurnId.value,
	(newValue, oldValue) => {
		CurOrgTurn.value = OrgTurnList.value.find(o => o.TurnId == newValue);
		Parm.value.turnId = newValue;
		getTestRsltList(1);
	},
);

// Method ************************************

// Route	***********************************

const showPnl = (pnlNm, item) => {
	//router.push({ name: nm, params: p });
	switch (pnlNm) {
		case 'RsltList':
			Pnl.value.RsltList.show = true;
			Pnl.value.RsltView.show = false;
			Pnl.value.RsltAll.show = false;
			pnlPath.value = '';

			break;
		case 'RsltView':
			Pnl.value.RsltList.show = false;
			Pnl.value.RsltView.show = true;
			Pnl.value.RsltAll.show = false;
			pnlPath.value = ' > 결과보기';

			ListItem.value = item;
			break;

		case 'RsltAll':
			Pnl.value.RsltList.show = false;
			Pnl.value.RsltView.show = false;
			Pnl.value.RsltAll.show = true;
			pnlPath.value = ' > 결과보기';

			ListItem.value = item;
			break;
	}
};

// Method	************************************

const chageRowCntInPage = () => {
	getTestRsltList(1);
};

// 기관조회
const getOrgList = () => {
	if (!validNotBlank(Parm.value.srchStr, '기관명', txtSrchStr.value)) return;

	Parm.value.paging.page = 1;
	Parm.value.paging.startRow = (1 - 1) * Parm.value.paging.rowCntInPage;

	execUrl(Procs.value.getOrgList.path, Parm.value);
};

// 검사결과자 조회
const getTestRsltList = async page => {
	page = typeof no === 'object' && page !== null ? 1 : page;
	CurBlock.value = Math.ceil(page / Parm.value.paging.pageCntInBlock);
	CurPage.value = page;
	Parm.value.paging.page = page;
	Parm.value.paging.startRow = (page - 1) * Parm.value.paging.rowCntInPage;

	execUrl(Procs.value.getTestRsltList.path, Parm.value);
};

const setOrg = item => {
	Modal.value.OrgList = false;
	Parm.value.srchStr = '';
	Org.value = item;
	Parm.value.orgId = item.OrgId;

	execUrl(Procs.value.getOrgTurnList.path, Parm.value);
};

const getDateFormat = dt => {
	return dt == '' ? '-' : dayjs(dt).format('YYYY-MM-DD');
};

const popupTestRslt = item => {
	var Parm = {
		ProdtId: item.ProdtId,
		AnsPrgrsId: item.AnsPrgrsId,
	};

	const parm = encodeBase64(JSON.stringify(Parm));
	let uri = `TestRsltMain?p=${parm}`;

	//localhost:5200/QuestMain?TestId=1&QuestPageId=2

	if (windowRef != null && !windowRef.closed) {
		windowRef.focus();
		return;
	}

	const width = screen.width;
	const height = screen.height;

	let left = screen.width ? (screen.width - width) / 2 : 0;
	let top = screen.height ? (screen.height - height) / 2 : 0;

	let attr =
		'top=' +
		top +
		', left=' +
		left +
		', width=' +
		width +
		', height=' +
		height +
		', resizable=no,status=no';

	// 1. 윈도우 팝업 띄우기
	windowRef = window.open(uri, '', attr);

	if (!windowRef && windowRef.closed) {
		//windowRef.addEventListener('beforeunload', this.evtClose);
	} else {
		windowRef.focus();
	}
};

// Etc  **************************************

const validNotBlank = (val, tit, obj) => {
	val = typeof val != 'string' ? val.toString() : val;
	var Val = val.replace(/\s/g, '');
	if (Val.length == 0) {
		vAlert(tit == null ? `입력해 주세요.` : `${tit}를(을) 입력해 주세요.`);
		if (obj != null) {
			obj.focus();
		}
		return false;
	}
	return true;
};
</script>

<style lang="scss" scoped></style>
