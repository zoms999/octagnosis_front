<template>
	<div class="SrchBox">
		<div class="row g-1 borderd">
			<div class="col-2">
				<select class="form-select" v-model="SelectedTurnId">
					<option
						v-for="item in OrgTurnList"
						:key="item.TurnId"
						:value="item.TurnId"
					>
						{{ item.TurnNum }} 회차
					</option>
				</select>
			</div>
			<div class="col-1">
				<div class="input-group">
					<span class="input-group-text px-1">요청</span>
					<input
						type="text"
						class="form-control"
						aria-label="Sizing example input"
						aria-describedby="inputGroup-sizing-default"
						readonly="readonly"
						:value="CurOrgTurn.TurnReqCnt"
					/>
				</div>
			</div>
			<div class="col-1">
				<div class="input-group">
					<span class="input-group-text px-1">사용</span>
					<input
						type="text"
						class="form-control"
						aria-label="Sizing example input"
						aria-describedby="inputGroup-sizing-default"
						readonly="readonly"
						:value="CurOrgTurn.TurnUseCnt"
					/>
				</div>
			</div>
			<div class="col-1">
				<div class="input-group w100p">
					<span
						class="input-group-text"
						:class="{
							'text-danger': CurOrgTurn.UseYn == 'N',
							'text-primary': CurOrgTurn.UseYn == 'Y',
						}"
						>{{ CurOrgTurn.UseYn == 'N' ? 'CLOSE' : 'OPEN' }}</span
					>
				</div>
			</div>
			<div class="col-7 text-end">
				<button type="button" class="btn btn-primary" @click="ShowTurnConnCd()">
					<div class="d-flex">
						<span class="me-2">회차코드</span>
						<span class="material-icons"> visibility </span>
					</div>
				</button>
				<button
					type="button"
					class="btn btn-primary ms-2"
					@click="EditOrgTurnUse"
					:disabled="CurOrgTurn.UseYn == 'Y' ? false : true"
				>
					<div class="d-flex">
						<span class="me-2">회차종료</span>
						<span class="material-icons"> cancel </span>
					</div>
				</button>
				<button
					type="button"
					class="btn btn-primary ms-2"
					@click="ShowHide('OrgTurn', true)"
					:disabled="UseYnCnt == 0 ? false : true"
				>
					<div class="d-flex">
						<span class="me-2">회차추가</span>
						<span class="material-icons"> add_circle </span>
					</div>
				</button>
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
					<th class="w60">No</th>
					<th class="w120">이름</th>
					<th class="w120">휴대전화</th>
					<th class="w120">이메일</th>
					<th class="w120">검사시작날짜</th>
					<th class="w120">검사종료날짜</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, idx) in List" :key="item.LogId">
					<td>{{ VirNum - idx }}</td>
					<td>{{ item.PersnNm }}</td>
					<td>{{ item.Phone }}</td>
					<td>{{ item.Email }}</td>
					<td>
						{{
							item.StartDt.length > 0
								? dayjs(item.StartDt).format('YYYY-MM-DD HH:mm')
								: '-'
						}}
					</td>
					<td>
						{{
							item.EndDt.length > 0
								? dayjs(item.EndDt).format('YYYY-MM-DD HH:mm')
								: '-'
						}}
					</td>
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
					@Page="GetOrgPersnList"
				></AppPagination>
			</div>
		</div>
	</template>

	<!--	기관회차등록	------------------------------->
	<Teleport to="#modal">
		<AppModal
			v-model="Modal.OrgTurn"
			title="기관 회차 등록"
			width="500"
			depth="2"
			:footer="false"
		>
			<template #default>
				<OrgTurn :OrgId="OrgId" @reload="Reload"></OrgTurn>
			</template>
		</AppModal>
	</Teleport>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { ref, inject, defineProps, watch } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import OrgTurn from '@/components/Org/OrgTurn.vue';

const { vAlert, vSuccess } = useAlert();
const dayjs = inject('dayjs');

// Props / Emit  ****************************

const Props = defineProps({
	OrgId: { type: Number },
});

// Data *************************************

const TotCnt = ref(0);
const CurPage = ref(1);
const CurBlock = ref(1);
const VirNum = ref(1);

const List = ref([]);
const OrgTurnList = ref([]);

const SelectedTurnId = ref(null);
const CurOrgTurn = ref({});
const UseYnCnt = ref(0);

const { userMngrId } = storeToRefs(useAuthStore());

// Axios	***********************************

// Modal ************************************

const Modal = ref({
	OrgTurn: false,
});

const ShowHide = (type, showHide) => {
	switch (type) {
		case 'OrgTurn':
			Modal.value.OrgTurn = showHide;
			break;
	}
};
// Route	***********************************

// Method	************************************

// Init	****************

const { execute: execInit } = useAxios(
	'/api/OrgTurn/GetOrgTurnList',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: res => {
			OrgTurnList.value = res.data.OrgTurnList;
			SelectedTurnId.value = OrgTurnList.value[0].TurnId;
			UseYnCnt.value = OrgTurnList.value.filter(o => o.UseYn == 'Y').length;
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

execInit({ orgId: Props.OrgId });

const Reload = () => {
	Modal.value.OrgTurn = false;
	//alert('1111');
	execInit({ orgId: Props.OrgId });
};

// List	****************

const Parm = ref({
	srchStr: '',
	orgId: Props.OrgId,
	turnId: SelectedTurnId.value,
	paging: {
		page: 1,
		block: 1,
		pageCntInBlock: 5,
		rowCntInPage: 10,
		startRow: 1,
	},
});

const { data, error, loading, execute } = useAxios(
	'/api/OrgTurn/GetOrgTurnPersnList',
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

const GetOrgPersnList = async page => {
	page = typeof page === 'object' || page == null ? 1 : page;
	CurBlock.value = Math.ceil(page / Parm.value.paging.pageCntInBlock);
	CurPage.value = page;
	Parm.value.paging.page = page;
	Parm.value.paging.startRow = (page - 1) * Parm.value.paging.rowCntInPage;
	execute(Parm.value);
};

const chageRowCntInPage = () => {
	GetOrgPersnList(1);
};

const ShowTurnConnCd = () => {
	alert(CurOrgTurn.value.TurnConnCd);
};

watch(
	() => SelectedTurnId.value,
	(newValue, oldValue) => {
		CurOrgTurn.value = OrgTurnList.value.find(o => o.TurnId == newValue);
		Parm.value.turnId = newValue;
		GetOrgPersnList(1);
	},
);

// OrgTurn 사용여부	****************
const { execute: execOrgTurnUse } = useAxios(
	'/api/OrgTurn/EditOrgTurnUse',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			CurOrgTurn.value.UseYn = 'N';
			UseYnCnt.value = OrgTurnList.value.filter(o => o.UseYn == 'Y').length;
			vSuccess('회차종료 되었습니다.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const EditOrgTurnUse = () => {
	execOrgTurnUse({
		orgId: Props.OrgId,
		turnId: CurOrgTurn.value.TurnId,
		useYn: 'N',
		userId: userMngrId.value,
	});
};
</script>

<style lang="scss" scoped></style>
