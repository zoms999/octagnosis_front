<template>
	<div class="TitPage">
		<div>상품 결제 관리</div>
		<div></div>
	</div>
	<div class="container-fluid mt-2">
		<div class="row">
			<div class="col-4"></div>
			<div class="col-5"></div>
			<div class="col-3 text-end"></div>
		</div>
	</div>
	<div>
		<table class="table table-bordered Tbl1">
			<thead>
				<tr>
					<th class="w100">No</th>
					<th class="w100">직무 여부</th>
					<th class="w100">학습법 여부</th>
					<th class="w100">교과목 여부</th>
					<th class="w100">선호도이미지 여부</th>
					<th class="w100">계정ID</th>
					<th class="w100">결제자명</th>
					<th class="w100">상품유형</th>
					<th class="w100">상품가격</th>
					<th class="w100">결제일시</th>
					<th class="w100">조직Id</th>
					<th class="w100">회차Id</th>
					<th class="w100">결제여부</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(payment, index) in payments" :key="payment.payId">
					<td>{{ index + 1 }}</td>
					<td>{{ payment.dutyYn }}</td>
					<td>{{ payment.studyYn }}</td>
					<td>{{ payment.subjYn }}</td>
					<td>{{ payment.imgYn }}</td>
					<td>{{ payment.acuntId }}</td>
					<td>{{ payment.persnNm }}</td>
					<td>{{ payment.prodTypeName }}</td>
					<td>{{ payment.price }}</td>
					{{
						formatInsDt(payment.payDt)
					}}
					<td>{{ payment.orgId }}</td>
					<td>{{ payment.turnId }}</td>
					<td>{{ payment.payYn }}</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>
		<br /><br /><br />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const payments = ref([]);
const router = useRouter();

const fetchPayments = async () => {
	try {
		const response = await axios.get('/api/payment/all');
		payments.value = response.data;
	} catch (error) {
		console.error('Failed to fetch payments', error);
	}
};

const showProdt = action => {
	// Logic to show product registration form
	// For example, you can use router.push to navigate to the registration page
	router.push({ name: 'ProductRegister', params: { action } });
};

onMounted(() => {
	fetchPayments();
});

const dayjs = inject('dayjs');
const formatInsDt = insDt => {
	return dayjs(insDt).format('YYYY. MM. DD HH:mm:ss');
};
</script>

<style lang="scss" scoped>
.TitPage {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.container-fluid {
	margin-top: 20px;
}

.table {
	margin-top: 20px;
}
</style>
