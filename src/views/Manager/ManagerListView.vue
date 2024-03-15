<template>
	<div>
		<hr class="my-4" />
		<button class="btn btn-outline-dark" type="button" @click="goCreate">
			등록
		</button>
		<AppLoading v-if="loading" />
		<AppError v-else-if="error" :message="error.message" />
		<template v-else-if="!isExist">
			<p class="text-center py-4 text-muted">No Results</p>
		</template>
		<template v-else>
			<div class="container-fluid">
				<!-- Page Heading -->
				<h1 class="h3 mb-2 text-gray-800">Tables</h1>
				<!-- DataTales Example -->
				<div class="card shadow mb-4">
					<div class="card-header py-3">
						<h6 class="m-0 font-weight-bold text-primary">매니저 관리</h6>
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
										<th>mngrId</th>
										<th>useYn (Toggle)</th>
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
								<tfoot></tfoot>
								<tbody>
									<tr
										v-for="(item, index) in posts"
										:key="index"
										@click="goPage(item.mngrId)"
									>
										<td>{{ item.mngrId }}</td>
										<td>
											<button
												class="btn btn-sm btn-outline-dark"
												@click.stop="toggleUseYn(item)"
											>
												{{ item.useYn }}
											</button>
										</td>
										<td>{{ item.email }}</td>
										<td>{{ item.mngrNm }}</td>
										<td>{{ item.phone }}</td>
										<td>{{ item.tel }}</td>
										<td v-html="getIcon(item.authPersn)"></td>
										<td v-html="getIcon(item.authRsltView)"></td>
										<td v-html="getIcon(item.authAdmin)"></td>
										<td v-html="getIcon(item.authLogView)"></td>
										<td v-html="getIcon(item.authStati)"></td>
										<td v-html="getIcon(item.authBbs)"></td>
										<td v-html="getIcon(item.authOrg)"></td>
										<td>{{ item.insDt }}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAxios } from '@/hooks/useAxios';

const goCreate = () => {
	router.push({
		name: 'ManagerCreate',
	});
};

const router = useRouter();
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 6,
	title_like: '',
});

const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/api/managers', { params });
const isExist = computed(() => posts.value && posts.value.length > 0);
const goPage = mngrId => {
	router.push({
		name: 'ManagerEdit',
		params: {
			mngrId,
		},
	});
};

const toggleUseYn = item => {
	item.useYn = item.useYn === 'Y' ? 'N' : 'Y';
	// Call API to update `useYn` in the backend if needed
};

const getIcon = authValue => {
	if (authValue === 0) return '<i class="bi bi-x-square"></i>';
	else if (authValue === 1) return '<i class="bi bi-eye-fill"></i>';
	else if (authValue === 2) return '<i class="bi bi-pencil-square"></i>';
	else return '';
};
</script>

<style scoped></style>
