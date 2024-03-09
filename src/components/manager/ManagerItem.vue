<template>


<div class="container-fluid">

<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Tables</h1>

<!-- DataTales Example -->
<div class="card shadow mb-4">
		<div class="card-header py-3">
				<h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
		</div>
		<div class="card-body">
				<div class="table-responsive">
						<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
								<thead>
										<tr>
											<th>mngrId</th>
											<th>useYn</th>
											<th>email</th>
											<th>mngrNm</th>
											<th>phone</th>
											<th>tel</th>
											<th>authPersn</th>
											<th>authRsltView</th>
											<th>authAdmin</th>
											<th>authLogView</th>
											<th>authStati</th>
											<th>authBbs</th>
											<th>authOrg</th>
											<th>insDt</th>
										</tr>
								</thead>
								<tfoot>
										
								</tfoot>
								<tbody>
										<tr>
											<td>{{ mngrId }}</td>
											<td >
													{{ useYn }}
											</td>
											<td>{{ email }}</td>
											<td>
													{{ mngrNm }}
											</td>
											<td>
													{{ phone }}
											</td>
											<td>
													{{ tel }}
											</td>
											<td>
													{{ authPersn }}
											</td>
											<td>
													{{ authRsltView }}
											</td>
											<td>
													{{ authAdmin }}
											</td>
											<td>
													{{ authLogView }}
											</td>
											<td>
													{{ authStati }}
											</td>
											<td>
													{{ authBbs }}
											</td>
											<td>
													{{ authOrg }}
											</td>
											<td>
													{{ insDt }}
											</td>
            			</tr>
								</tbody>
						</table>
				</div>
		</div>
</div>

</div>
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

<style lang="scss" scoped>

</style>
