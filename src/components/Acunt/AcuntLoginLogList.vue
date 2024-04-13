<template>
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
					<th class="w60">No</th>
					<th class="w200">로그인날짜</th>
					<th>로그인 환경</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, idx) in List" :key="item.LogId">
					<td>{{ VirNum - idx }}</td>
					<td>{{ dayjs(item.LoginDt).format('YYYY-MM-DD HH:mm:ss') }}</td>
					<td class="text-start">{{ item.LoginEnv }}</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>
		<div class="FunBox mt-4">
			<div class="d-flex justify-content-start align-items-center">
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
					</select>
				</div>
			</div>
			<div>
				<AppPagination
					:CurPage="CurPage"
					:CurBlock="CurBlock"
					:TotCnt="TotCnt"
					:RowCntInPage="Parm.paging.rowCntInPage"
					:PageCntInBlock="Parm.paging.pageCntInBlock"
					@Page="GetList"
				></AppPagination>
			</div>
		</div>
	</template>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, inject, defineProps } from 'vue';
import { useAlert } from '@/hooks/useAlert';

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');

// Props / Emit  ****************************

const Props = defineProps({
	AcuntId: { type: Number },
});

// Data *************************************

const TotCnt = ref(0);
const CurPage = ref(1);
const CurBlock = ref(1);
const VirNum = ref(1);

const List = ref([]);

// Axios	***********************************

// Show/Hide	*******************************

// Route	***********************************

// Method	************************************

// List	************************

const Parm = ref({
	srchStr: '',
	acuntId: Props.AcuntId,
	paging: {
		page: 1,
		block: 1,
		pageCntInBlock: 5,
		rowCntInPage: 10,
		startRow: 1,
		sort: 'createdAt',
		order: 'desc',
	},
});

const { data, error, execute } = useAxios(
	'/api/AcuntLoginLog/GetAcuntLoginLogList',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			TotCnt.value = data.value.TotCnt;
			List.value = data.value.List;
			VirNum.value =
				TotCnt.value -
				(Parm.value.paging.page - 1) * Parm.value.paging.rowCntInPage;
			if (TotCnt.value == 0) vSuccess('조회된 데이터가 없습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const GetList = async page => {
	page = typeof page === 'object' || page == null ? 1 : page;
	CurBlock.value = Math.ceil(page / Parm.value.paging.pageCntInBlock);
	CurPage.value = page;
	Parm.value.paging.page = page;
	Parm.value.paging.startRow = (page - 1) * Parm.value.paging.rowCntInPage;
	execute(Parm.value);
};

GetList(1);

const chageRowCntInPage = () => {
	GetList(1);
};
</script>

<style lang="scss" scoped></style>
