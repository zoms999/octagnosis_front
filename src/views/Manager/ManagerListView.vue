<template>
	<div class="TitPage">
		<div>매니저관리</div>
		<div></div>
	</div>
	<div>
		<div class="SrchBox">
			<div class="row">
				<div class="col-8"></div>
				<div class="col-4 text-end">
					<div class="input-group w100p">
						<input
							type="text"
							class="form-control"
							id="SrchStr"
							placeholder="이름/이메일/연락처"
						/>
						<button class="btn btn-primary w80">검색</button>
					</div>
				</div>
			</div>
		</div>
		<div class="FunBox">
			<div>Total : 23,223</div>
			<button class="btn btn-primary" @click="goCreate">추가</button>
		</div>

		<AppLoading v-if="loading" />
		<AppError v-else-if="error" :message="error.message" />
		<template v-else-if="!isExist">
			<p class="text-center py-4 text-muted">No Results</p>
		</template>
		<template v-else>
			<div class="container-fluid">
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
										<th>No.</th>
										<th>활동</th>
										<th>이름</th>
										<th>이메일</th>
										<th>휴대폰</th>
										<th>연락처</th>
										<th>매니저</th>
										<th>기관</th>
										<th>개인</th>
										<th>문의</th>
										<th>결과</th>
										<th>로그</th>
										<th>통계</th>
										<th>등록일</th>
									</tr>
								</thead>
								<tfoot></tfoot>
								<tbody>
									<tr
										v-for="(item, index) in posts"
										:key="index"
										@click="goPage(item.mngrId)"
										class="Poit"
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
										<td>{{ item.mngrNm }}</td>
										<td>{{ item.email }}</td>
										<td>{{ item.phone }}</td>
										<td>{{ item.tel }}</td>
										<td v-html="getIcon(item.authAdmin)"></td>
										<td v-html="getIcon(item.authOrg)"></td>
										<td v-html="getIcon(item.authPersn)"></td>
										<td v-html="getIcon(item.authBbs)"></td>
										<td v-html="getIcon(item.authRsltView)"></td>
										<td v-html="getIcon(item.authLogView)"></td>
										<td v-html="getIcon(item.authStati)"></td>
										<td>{{ formatInsDt(item.insDt) }}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</template>

		<AppPagination
			:CurPage="CurPage"
			:PageCnt="PageCnt"
			@Page="GetOrgList"
		></AppPagination>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { computed, inject } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert';

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

const TotCnt = ref(10);
const PageCnt = computed(() => Math.ceil(TotCnt.value / 3));
const CurPage = ref(3);

const GetOrgList = page => {
	CurPage.value = page ?? 1;
};

const { vAlert, vSuccess } = useAlert();
const toggleUseYn = item => {
	// Toggle the useYn field
	item.useYn = item.useYn === 'Y' ? 'N' : 'Y';
	console.log(item.useYn);
	// Call API to update useYn in the backend
	axios
		.patch(`/api/managers/toggle-useyn/${item.mngrId}`, { useYn: item.useYn })
		.then(res => {
			vSuccess('수정 되었습니다.');
			//console.log('useYn updated successfully');
		})
		.catch(error => {
			console.error('Error updating useYn:', error);
			vAlert('수정실패.' + error.message);
		});
};

const getIcon = authValue => {
	if (authValue === 0) return '<i class="bi bi-x-square"></i>';
	else if (authValue === 1) return '<i class="bi bi-eye-fill"></i>';
	else if (authValue === 2) return '<i class="bi bi-pencil-square"></i>';
	else return '';
};

const dayjs = inject('dayjs');
const formatInsDt = insDt => {
	return dayjs(insDt).format('YYYY. MM. DD HH:mm:ss');
};
</script>

<style scoped></style>
