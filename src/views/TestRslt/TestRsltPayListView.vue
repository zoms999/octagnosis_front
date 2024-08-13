<template>
	<div class="TitPage">
		<div>
			검사결과 > 개인용 <span>{{ pnlPath }}</span>
		</div>
		<div></div>
	</div>

	<AppError v-if="error" :message="error.message"></AppError>
	<template v-else>
		<div v-if="Pnl.RsltList.show">
			<div class="SrchBox">
				<div class="row">
					<div class="col-9"></div>
					<div class="col-3 text-end">
						<div class="input-group w100p">
							<input
								type="text"
								class="form-control"
								ref="txtSrchStr"
								v-model="Parm.srchStr"
								placeholder="이름"
								@keyup.enter="getTestRsltPayList()"
							/>
							<button class="btn btn-primary w80" @click="getTestRsltPayList()">
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
						v-for="(item, idx) in TestRsltPayList"
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
								<!--
								<buton
									class="btn btn-primary btn-sm w80 ms-2"
									@click.stop="showPnl('RsltAll', item)"
									>Down</buton
								>
								-->
								<buton
									class="btn btn-primary btn-sm w80 ms-2"
									@click.stop="popupTestRslt(item)"
									>PRINT</buton
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
					@Page="getTestRsltPayList"
				></AppPagination>
			</div>
		</div>
		<div v-if="Pnl.RsltView.show">
			<RsltMain :ListItem="ListItem" @showPnl="showPnl"></RsltMain>
		</div>
		<div v-if="Pnl.RsltAll.show">
			<RsltAll :ListItem="ListItem" @showPnl="showPnl"></RsltAll>
		</div>
	</template>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, inject, onMounted } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useBase64Utils } from '@/plugins/base64.js';

import RsltMain from '@/components/TestRslt/RsltMain.vue';
import RsltAll from '@/components/TestRslt/RsltAll.vue';

// Props / Emit  ****************************

// Hook	 ************************************

onMounted(() => {
	getTestRsltPayList(1);
});

// Model / Data *****************************

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');
const pnlPath = ref('');
const ListItem = ref('');
const { encodeBase64 } = useBase64Utils();

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
const TestRsltPayList = ref([]);
const VirNum = ref(1);

var windowRef = null;

// Html ref  ********************************

const txtSrchStr = ref(null);

// Axios / Route  ***************************

const Procs = ref({
	getTestRsltPayList: { path: '/api/Test/getTestRsltPayList', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getTestRsltPayList.path:
					Procs.value.getTestRsltPayList.loading = false;
					TotCnt.value = data.value.TotCnt;
					TestRsltPayList.value = data.value.List;
					VirNum.value =
						TotCnt.value -
						(Parm.value.paging.page - 1) * Parm.value.paging.rowCntInPage;

					if (TotCnt.value == 0) vSuccess('조회된 데이터가 없습니다.');

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

// Watch *************************************

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
	getTestRsltPayList(1);
};

// 검사결과자 조회
const getTestRsltPayList = async page => {
	page = typeof no === 'object' && page !== null ? 1 : page;
	CurBlock.value = Math.ceil(page / Parm.value.paging.pageCntInBlock);
	CurPage.value = page;
	Parm.value.paging.page = page;
	Parm.value.paging.startRow = (page - 1) * Parm.value.paging.rowCntInPage;

	execUrl(Procs.value.getTestRsltPayList.path, Parm.value);
};

const getDateFormat = dt => {
	return dt == '' ? '-' : dayjs(dt).format('YYYY-MM-DD');
};

const popupTestRslt = item => {
	const Parm = {
		PersnNm: item.PersnNm,
		AnsPrgrsId: item.AnsPrgrsId,
		ProdtId: item.ProdtId,
		PersnId: item.PersnId,
	};
	const parm = encodeBase64(JSON.stringify(Parm));
	let uri = `TestRsltAll?p=${parm}`;

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
		', resizable=yes,status=no,scrollbars=yes';

	// 1. 윈도우 팝업 띄우기
	windowRef = window.open(uri, '', attr);
	//	window.open(uri, '', attr);
	/**
	if (!windowRef && windowRef.closed) {
		//windowRef.addEventListener('beforeunload', this.evtClose);
	} else {
		windowRef.focus();
	}
		 */
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
