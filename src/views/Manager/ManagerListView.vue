<template>
	<div class="TitPage">
		<div>매니저관리</div>
		<div></div>
	</div>
	<div>
		<div class="SrchBox">
			<div class="row">
				<div class="col-8"></div>
				<div class="col-4 text-end">
					<div class="input-group w100p">
						<input
							type="text"
							class="form-control"
							id="SrchStr"
							placeholder="이름/이메일/연락처"
						/>
						<button class="btn btn-primary w80">검색</button>
					</div>
				</div>
			</div>
		</div>

		<div class="FunBox">
			<div>
				<div class="w100">전체개수 : {{ TotCnt }}</div>
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
			<button class="btn btn-primary" @click="goCreate">추가</button>
		</div>

		<AppLoading v-if="loading" />
		<AppError v-else-if="error" :message="error.message" />
		<template v-else-if="!isExist">
			<p class="text-center py-4 text-muted">No Results</p>
		</template>
		<template v-else>
			<div class="container-fluid">
				<!-- DataTales Example -->
				<table
					class="table table-bordered Tbl1"
					id="dataTable"
					width="100%"
					cellspacing="0"
				>
					<thead>
						<tr>
							<th>순번</th>
							<th>활동</th>
							<th>이름</th>
							<th>이메일</th>
							<th>휴대폰</th>
							<th>연락처</th>
							<th>매니저</th>
							<th>기관</th>
							<th>개인</th>
							<th>문의</th>
							<th>결과</th>
							<th>로그</th>
							<th>통계</th>
							<th>등록일</th>
						</tr>
					</thead>
					<tfoot></tfoot>
					<tbody>
						<tr
							v-for="(item, index) in ManagerList"
							:key="index"
							@click="goPage(item.mngrId)"
							class="Poit text-center"
						>
							<td>{{ item.mngrId }}</td>
							<td>
								<button
									class="btn btn-sm btn-primary w30"
									@click.stop="toggleUseYn(item)"
								>
									{{ item.useYn }}
								</button>
							</td>
							<td>{{ item.mngrNm }}</td>
							<td>{{ item.email }}</td>
							<td>{{ item.phone }}</td>
							<td>{{ item.tel }}</td>
							<td v-html="getIcon(item.authAdmin)"></td>
							<td v-html="getIcon(item.authOrg)"></td>
							<td v-html="getIcon(item.authPersn)"></td>
							<td v-html="getIcon(item.authBbs)"></td>
							<td v-html="getIcon(item.authRsltView)"></td>
							<td v-html="getIcon(item.authLogView)"></td>
							<td v-html="getIcon(item.authStati)"></td>
							<td>
								{{ formatInsDt(item.insDt) }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</template>

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

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { computed, inject } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';

const goCreate = () => {
	router.push({
		name: 'ManagerCreate',
	});
};

const router = useRouter();
const Parm = ref({
	srchStr: '',
	paging: {
		page: 1,
		block: 1,
		pageCntInBlock: 2,
		rowCntInPage: 10,
		startRow: 1,
		sort: 'createdAt',
		order: 'desc',
	},
});

const { response, data, error, loading, execute, execUrl, reqUrl } = useAxios(
	'',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			TotCnt.value = data.value.ManagerTotCnt;
			ManagerList.value = data.value.ManagerList;

			console.log(TotCnt.value);
			if (TotCnt.value == 0) vSuccess('조회된 데이터가 없습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const isExist = computed(
	() => ManagerList.value && ManagerList.value.length > 0,
);
const goPage = mngrId => {
	router.push({
		name: 'ManagerEdit',
		params: {
			mngrId,
		},
	});
};
const ManagerList = ref([]);
const CurPage = ref(1);
const CurBlock = ref(1);
const TotCnt = ref(0);
const PageCnt = computed(() =>
	Math.ceil(TotCnt.value / Parm.value.paging.limit),
);

const GetOrgList = page => {
	page = typeof no === 'object' && page !== null ? 1 : page;
	CurBlock.value = Math.ceil(page / Parm.value.paging.pageCntInBlock);
	CurPage.value = page;
	Parm.value.paging.page = page;
	Parm.value.paging.startRow = (page - 1) * Parm.value.paging.rowCntInPage;

	console.log('GetOrgList' + Parm.value);
	execUrl('/api/managers/managersList', Parm.value);
};
GetOrgList(1);

const { vAlert, vSuccess } = useAlert();
const toggleUseYn = item => {
	// Toggle the useYn field
	item.useYn = item.useYn === 'Y' ? 'N' : 'Y';
	console.log(item.useYn);
	// Call API to update useYn in the backend
	axios
		.patch(`/api/managers/toggle-useyn/${item.mngrId}`, { useYn: item.useYn })
		.then(res => {
			vSuccess('수정 되었습니다.');
			//console.log('useYn updated successfully');
		})
		.catch(error => {
			console.error('Error updating useYn:', error);
			vAlert('수정실패.' + error.message);
		});
};

const getIcon = authValue => {
	if (authValue === 0)
		return '<span class="material-icons">not_interested</span>';
	else if (authValue === 1)
		return '<span class="material-icons">visibility</span>';
	else if (authValue === 2)
		return '<span class="material-symbols-outlined">edit_square</span>';
	else return '';
};

const dayjs = inject('dayjs');
const formatInsDt = insDt => {
	return dayjs(insDt).format('YYYY. MM. DD HH:mm:ss');
};
</script>

<style scoped></style>
