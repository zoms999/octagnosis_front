<template>
	<div class="TitPage">
		<div>상품 결제 관리</div>
		<div></div>
	</div>
	<div class="container-fluid mt-2">
		<div class="row">
			<div class="col-12">
				<DataTable
					:data="payments"
					:columns="columns"
					class="table table-bordered Tbl1"
					:options="tableOptions"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

// Initialize DataTable with Bootstrap 5
DataTable.use(DataTablesCore);

const payments = ref([]);
const router = useRouter();
const dayjs = inject('dayjs');

const columns = computed(() => [
	{ data: null, title: 'No', render: (data, type, row, meta) => meta.row + 1 },
	{ data: 'dutyYn', title: '직무 여부' },
	{ data: 'studyYn', title: '학습법 여부' },
	{ data: 'subjYn', title: '교과목 여부' },
	{ data: 'imgYn', title: '선호도이미지 여부' },
	{ data: 'acuntId', title: '계정ID' },
	{ data: 'persnNm', title: '결제자명' },
	{ data: 'prodTypeName', title: '상품유형' },
	{ data: 'price', title: '상품가격' },
	{
		data: 'payDt',
		title: '결제일시',
		render: data => dayjs(data).format('YYYY. MM. DD'),
	},
	{ data: 'orgId', title: '조직Id' },
	{ data: 'turnId', title: '회차Id' },
	{ data: 'payYn', title: '결제여부' },
]);

const tableOptions = {
	responsive: true,
	language: {
		url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json',
	},
};

const fetchPayments = async () => {
	try {
		const response = await axios.get('/api/payment/all');
		payments.value = response.data;
	} catch (error) {
		console.error('Failed to fetch payments', error);
	}
};

onMounted(() => {
	fetchPayments();
});
</script>

<style lang="scss">
@import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'; /* Import DataTables Bootstrap 5 CSS */

.TitPage {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.container-fluid {
	margin-top: 20px;
}

.dataTables_wrapper {
	margin-top: 20px;
}

/* Ensure proper visibility of table header */
.table thead th {
	background-color: #f8f9fa !important; /* Ensure header background */
	color: #333; /* Ensure header text color */
}

// .table.dataTable th,
// .table.dataTable td {
// 	padding: 4px 8px; /* Smaller padding for smaller row height */
// 	vertical-align: middle; /* Center text vertically */
// 	line-height: 2; /* Adjust line height */
// }

/* Change cursor to pointer (hand icon) on hover */
.table tbody tr {
	cursor: pointer;
}

/* Highlight row on hover */
.table tbody tr:hover {
	background-color: #f5f5f5; /* Light gray color */
}

/* Highlight selected row */
.table tbody tr.selected {
	background-color: #cce5ff; /* Light blue color */
}
</style>
