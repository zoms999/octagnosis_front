
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
      <tr v-for="(item, index) in items" :key="index" :class="colClass">
        <th scope="row">{{ item.mngrId }}</th>
        <td>{{ item.useYn }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.mngrNm }}</td>
				<td>{{ item.phone }}</td>
				<td>{{ item.tel }}</td>
				<td>{{ item.authPersn }}</td>
				<td>{{ item.authRsltView }}</td>
				<td>{{ item.authAdmin }}</td>
				<td>{{ item.authLogView }}</td>
				<td>{{ item.authStati }}</td>
				<td>{{ item.authBbs }}</td>
				<td>{{ item.authOrg }}</td>
				<td>{{ formatDate(item.insDt) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>

import dayjs from 'dayjs'; // Import dayjs

defineProps({
	items: {
		type: Array,
		required: true,
	},
	colClass: {
		type: String,
		default: 'col-4',
	},
});

const formatDate = (date) => {
  return dayjs(date).format('YYYY. MM. DD HH:mm:ss');
};
</script>

<style lang="scss" scoped>
</style>
