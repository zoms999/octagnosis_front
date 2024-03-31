<template>
	<div class="TitPage">
		<div>개인관리</div>
		<div></div>
	</div>
	<div class="SrchBox">
		<div class="row">
			<div class="col-8"></div>
			<div class="col-4 text-end">
				<div class="input-group w100p">
					<input
						type="text"
						class="form-control"
						id="SrchStr"
						placeholder="기관명/대표/담당자"
					/>
					<button class="btn btn-primary w80">검색</button>
				</div>
			</div>
		</div>
	</div>
	<div class="FunBox">
		<div>Total : {{ totalCount }}</div>
		<button class="btn btn-primary" @click="Go('PersonalCreate', {})">
			추가
		</button>
	</div>

	<AppLoading v-if="loading"></AppLoading>

	<AppError v-else-if="error" :message="error.message"></AppError>

	<template v-else>
		<table
			class="table table-bordered Tbl1"
			id="dataTable"
			width="100%"
			cellspacing="0"
		>
			<thead>
				<tr>
					<th>No</th>
					<th>이름</th>
					<th>휴대폰</th>
					<th>등록자</th>
					<th>만기일자</th>
					<th>검사</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="item in PersonalList"
					:key="item.PersnId"
					@click="Go('PersonalEdit', { id: item.persnId })"
					class="Poit"
				>
					<td>{{ item.persnId }}</td>
					<td>{{ item.persnNm }}</td>
					<td>{{ item.phone }}</td>
					<td>{{ item.insDt }}</td>
					<td>{{ item.ExpirationDate }}</td>
					<!-- 예시: 만기일자에 해당하는 데이터의 실제 속성 이름으로 수정 -->
					<td>보기</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>

		<!-- <AppPagination
			:CurPage="CurPage"
			:PageCnt="PageCnt"
			@Page="GetPersonalList"
		></AppPagination> -->

		<AppPaginationTest
			:current-page="params.paging.page"
			:page-count="pageCount"
			@page="page => (params.paging.page = page)"
		/>
	</template>

	<Teleport to="#modal">
		<AppModal v-model="show" title="게시글">
			<template #default>
				<p>제목 :</p>
				<p>내용 :</p>
				<p>등록일 :</p>
			</template>
			<template #actions>
				<button type="button" class="btn btn-secondary" @click="closeModal">
					닫기
				</button>
			</template>
		</AppModal>
	</Teleport>
	<button class="btn btn-primary" @click="openModal">모달오픈</button>
</template>

<script setup>
import { useAxios } from '@/hooks/useAxios';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';

const { vAlert, vSuccess } = useAlert();

//const props = defineProps();
//const emit = defineEmits(['ShowView']);
const router = useRouter();

const Go = (nm, q) => {
	//router.push({ name: nm, params: p });
	router.push({ name: nm, query: q });
};

// List	************************************************

const params = ref({
	persnId: null,
	persnNm: '',
	srchStr: 'Str',
	paging: {
		page: 1,
		pageBlock: 1,
		limit: 5,
		sort: 'createdAt',
		order: 'desc',
	},
});
const PersonalList = ref([]);
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value.paging.limit),
);

// Axios	**********************************************
const { response, data, error, loading, execute, execUrl, reqUrl } = useAxios(
	'',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			totalCount.value = data.value.PersonalTotCnt;
			PersonalList.value = data.value.PersonalList;
			console.log(totalCount.value);
			console.log(PersonalList.value);
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const GetPersonalList = async () => {
	//params.value.paging.page = CurPage.value;
	// params.value.paging.limit = 2;
	console.log('GetPersonalList');
	execUrl('/api/personal/personalList', params.value);
};

GetPersonalList();

const show = ref(false);
const openModal = () => {
	show.value = true;
};
const closeModal = () => {
	show.value = false;
};
</script>

<style lang="scss" scoped></style>
@/hooks/alert
