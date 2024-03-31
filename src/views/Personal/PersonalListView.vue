<template>
	<div>
		<input v-model="searchQuery" placeholder="검색어를 입력하세요" />
		<button @click="search">검색</button>

		<!-- DataTales Example -->
		<div class="card shadow mb-4">
			<div class="card-header py-3">
				<h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
			</div>
			<div class="card-body">
				<div class="table-responsive">
					<table
						class="table table-bordered"
						id="dataTable"
						width="100%"
						cellspacing="0"
					>
						<thead>
							<tr>
								<th>Name</th>
								<th>Name</th>
								<th>Name</th>
								<th>Name</th>
								<th>Name</th>
								<th>Name</th>
							</tr>
						</thead>

						<tbody>
							<tr v-for="item in items" :key="item.persnId">
								<td>{{ item.persnNm }}</td>
								<td>{{ item.birthYear }}</td>
								<td>{{ item.birthMonth }}</td>
								<td>{{ item.sex }}</td>
								<td>2011/04/25</td>
								<td>$320,800</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<button @click="loadMore" v-if="totalItems > items.length">더 보기</button>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const items = ref([]);
const totalItems = ref(0);
const limit = 10;
let start = 0;
const searchQuery = ref('');

const fetchData = async () => {
	try {
		const response = await axios.post('api/personal/personalList', {
			start,
			limit,
			searchQuery: searchQuery.value,
		});
		totalItems.value = response.data.PersonalTotCnt;
		items.value = response.data.PersonalList;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

const loadMore = async () => {
	start += limit;
	await fetchData();
};

const search = async () => {
	start = 0;
	await fetchData();
};

onMounted(fetchData);
</script>
