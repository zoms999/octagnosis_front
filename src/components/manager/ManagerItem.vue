<template>
		 <table class="table">
    <thead>
      <tr>
        <th scope="col">mngrId</th>
        <th scope="col">useYn</th>
        <th scope="col">email</th>
				<th scope="col">mngrNm</th>
				<th scope="col">phone</th>
				<th scope="col">tel</th>
				<th scope="col">authPersn</th>
				<th scope="col">authRsltView</th>
				<th scope="col">authAdmin</th>
				<th scope="col">authLogView</th>
				<th scope="col">authStati</th>
				<th scope="col">authBbs</th>
				<th scope="col">authOrg</th>
				<th scope="col">insDt</th>
      </tr>
    </thead>
    <tbody>
      <tr >
        <th scope="row">{{ mngrId }}</th>
        <td>{{ useYn }}</td>
        <td>{{ email }}</td>
        <td>{{ mngrNm }}</td>
				<td>{{ phone }}</td>
				<td>{{ tel }}</td>
				<td>{{ authPersn }}</td>
				<td>{{ authRsltView }}</td>
				<td>{{ authAdmin }}</td>
				<td>{{ authLogView }}</td>
				<td>{{ authStati }}</td>
				<td>{{ authBbs }}</td>
				<td>{{ authOrg }}</td>
				<td>{{ insDt }}</td>
      </tr>
    </tbody>
  </table>
	
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
	mngrId: {
		type: Number,
		required: true,
	},
	useYn: {
		type: String,
	},
	email: {
		type: String,
	},
	mngrNm: {
		type: String,
	},
	phone: {
		type: String,
	},
	tel: {
		type: String,
	},
	authPersn: {
		type: String,
	},
	authRsltView: {
		type: String,
	},
	authAdmin: {
		type: String,
	},
	authLogView: {
		type: String,
	},
	authStati: {
		type: String,
	},
	authBbs: {
		type: String,
	},
	authOrg: {
		type: String,
	},
	insDt: {
		type: [String, Date, Number],
	},
});
const dayjs = inject('dayjs');
const insDt = computed(() =>
	dayjs(props.createdAt).format('YYYY. MM. DD HH:mm:ss'),
);
</script>

<style lang="scss" scoped></style>
