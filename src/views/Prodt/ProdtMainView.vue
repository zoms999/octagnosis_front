<template>
	<div class="payment-management">
		<h1 class="page-title">상품</h1>
		<div class="table-controls">
			<div class="col-4"></div>
			<div class="col-5"></div>
			<div class="col-3 text-end">
				<button
					type="button"
					class="btn btn-primary ms-2"
					@click="ShowProdt('C')"
				>
					상품등록
				</button>
			</div>
		</div>
		<div class="table-container">
			<DataTable
				:data="ProdtList"
				:columns="columns"
				class="payment-table"
				:options="tableOptions"
			/>
		</div>
	</div>

	<Teleport to="#modal">
		<AppModalV1 v-model="Modal.Prodt.showYn" title="상품" width="600">
			<ProdtForm
				v-model="Modal.Prodt.showYn"
				v-model:ModalParm="Modal.Prodt"
				@getProdtList="getProdtList"
			></ProdtForm>
		</AppModalV1>
	</Teleport>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

// Initialize DataTable with Bootstrap 5
DataTable.use(DataTablesCore);

import ProdtForm from '@/components/Prodt/ProdtForm.vue';

// Props / Emit  ****************************

// Model / Data *****************************

const { vAlert, vSuccess } = useAlert();

const ProdtList = ref([]);

const ProdtParm = ref({
	prodtId: 0,
});

// DataTable configuration
const columns = [
	{ title: 'NO', data: null, render: (data, type, row, meta) => meta.row + 1 },
	{ title: '검사상품', data: 'ProdtNm' },
	{ title: '가격', data: 'Price' },
	{ title: '상품유형', data: 'ProdtCateNm' },
	{ title: '상품종류', data: 'ProdtTypeNm' },
	{ title: '사용여부', data: 'UseYn' },
];

const tableOptions = {
	responsive: true,
	language: {
		url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json',
	},
	createdRow: (row, data) => {
		// Attach click event listener to each row
		row.addEventListener('click', () => {
			// Remove 'selected' class from all rows
			const tableRows = row.parentNode.querySelectorAll('tr');
			tableRows.forEach(tr => tr.classList.remove('selected'));

			// Add 'selected' class to the clicked row
			row.classList.add('selected');

			// Trigger the row click action
			onRowClicked(data);
		});
	},
};

const onRowClicked = rowData => {
	ShowProdt('E', rowData.ProdtId);
};

// Html ref  ********************************

// Axios / Route	***************************

const Procs = ref({
	getProdtList: {
		path: '/api/Prodt/getProdtList',
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
				case Procs.value.getProdtList.path:
					Procs.value.getProdtList.loading = false;
					ProdtList.value = data.value.ProdtList;
					break;
				default:
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			for (const key in Procs.value) {
				if (Object.hasOwnProperty.call(Procs.value, key)) {
					Procs.value[key].loading = false;
				}
			}
		},
	},
);

// Hook	 ************************************

onMounted(() => {
	getProdtList();
});

// Modal ************************************

const Modal = ref({
	Prodt: { showYn: false, procType: 'C', prodtId: 0 },
});

const ShowHide = (type, showYn) => {
	switch (type) {
		case 'Prodt':
			Modal.value.Prodt.showYn = showYn;
			break;
	}
};

const ShowProdt = (procType, prodtId) => {
	Modal.value.Prodt.procType = procType;
	Modal.value.Prodt.prodtId = prodtId == null ? 0 : prodtId;

	ShowHide('Prodt', true);
};

// 상품 조회
const getProdtList = () => {
	Modal.value.Prodt.showYn = false;
	execUrl(Procs.value.getProdtList.path, ProdtParm.value);
};
</script>

<style lang="scss">
@import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

.payment-management {
	padding: 2rem;
	background-color: #f8f9fa;
	min-height: 100vh;
}

.page-title {
	font-size: 2rem;
	color: #333;
	margin-bottom: 1.5rem;
	border-bottom: 2px solid #007bff;
	padding-bottom: 0.5rem;
}

.table-controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
}

// ... 나머지 스타일 코드 유지 ...

@media (max-width: 768px) {
	.table-controls {
		flex-direction: column;
		align-items: stretch;
	}

	.dataTables_length,
	.dataTables_filter {
		margin: 0.5rem 0;
	}
}
</style>
