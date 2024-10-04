<template>
	<div class="payment-management">
		<h1 class="page-title">상품 결제 관리</h1>

		<div class="table-container">
			<DataTable
				:data="payments"
				:columns="columns"
				class="payment-table"
				:options="tableOptions"
			/>
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

const pageSize = ref(10);
const searchQuery = ref('');

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

const changePageSize = () => {
	// 페이지 크기 변경 로직 구현
};

const handleSearch = () => {
	// 검색 로직 구현
};

const tableOptions = {
	responsive: true,
	language: {
		url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Korean.json',
	},
	pageLength: pageSize.value,
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

.dataTables_length,
.dataTables_filter {
	margin: 0 1rem;
}

.table-container {
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	padding: 1rem;
}

.payment-table {
	width: 100%;
	border-collapse: separate;
	border-spacing: 0;

	thead th {
		background-color: #f8f9fa;
		color: #333;
		font-weight: 600;
		text-transform: uppercase;
		padding: 0.75rem;
		border-bottom: 2px solid #dee2e6;
	}

	tbody td {
		padding: 0.75rem;
		border-bottom: 1px solid #e9ecef;
		vertical-align: middle;
	}

	tbody tr:hover {
		background-color: #f1f3f5;
	}
}

.dataTables_wrapper {
	padding: 1rem;

	.dataTables_info,
	.dataTables_paginate {
		margin-top: 1rem;
	}

	.dataTables_paginate {
		display: flex;
		justify-content: center;

		.paginate_button {
			padding: 0.5rem 0.75rem;
			margin: 0 0.25rem;
			border-radius: 4px;
			background-color: #f8f9fa;
			color: #495057;
			border: 1px solid #dee2e6;
			cursor: pointer;
			transition: all 0.2s ease-in-out;

			&:hover {
				background-color: #e9ecef;
			}

			&.current {
				background-color: #007bff;
				color: #fff;
				border-color: #007bff;
			}

			&.disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}
	}
}

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
