<template>
	<div class="TitPage">
		<div>상품</div>
		<div></div>
	</div>
	<div class="container-fluid mt-2">
		<div class="row">
			<div class="col-4"></div>
			<div class="col-5"></div>
			<div class="col-3 text-end">
				<button
					type="button"
					class="btn btn-primary ms-2"
					@click="ShowProdt('C')"
				>
					상품등록
				</button>
			</div>
		</div>
	</div>
	<div>
		<table class="table table-bordered Tbl1">
			<thead>
				<tr>
					<th class="w100">NO</th>
					<th class="w200">검사상품</th>
					<th class="w160">가격</th>
					<th class="w160">상품유형</th>
					<th class="w160">상품종류</th>
					<!--<th class="w160">할인율</th>-->
					<th class="w80">사용여부</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, idx) in ProdtList"
					:key="item.ProdtId"
					class="Poit"
					@click="ShowProdt('E', item.ProdtId)"
				>
					<td>{{ ++idx }}</td>
					<td>
						{{ item.ProdtNm }}
					</td>
					<td>{{ item.Price }}</td>
					<td>{{ item.ProdtCateNm }}</td>
					<td>{{ item.ProdtTypeNm }}</td>
					<td>{{ item.UseYn }}</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>
		<br /><br /><br />
	</div>

	<!--	검사문항 ------------------------------->
	<Teleport to="#modal">
		<AppModalV1 v-model="Modal.Prodt.showYn" title="상품" width="600">
			<ProdtForm
				v-model="Modal.Prodt.showYn"
				v-model:ModalParm="Modal.Prodt"
				@getProdtList="getProdtList"
			></ProdtForm>
		</AppModalV1>
	</Teleport>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';

import ProdtForm from '@/components/Prodt/ProdtForm.vue';

// Props / Emit  ****************************

// Model / Data *****************************

const { vAlert, vSuccess } = useAlert();

const ProdtList = ref([]);

const ProdtParm = ref({
	prodtId: 0,
});

// Html ref  ********************************

// Axios / Route	***************************

const Procs = ref({
	getProdtList: {
		path: '/api/Prodt/getProdtList',
		loading: false,
	},
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.getProdtList.path:
					Procs.value.getProdtList.loading = false;
					ProdtList.value = data.value.ProdtList;
					break;
				default:
					break;
			}
		},
		onError: err => {
			vAlert(err.message);
			// Procs의 모든 속성에 대해 반복문을 실행하여 loading 값을 true로 변경
			for (const key in Procs.value) {
				if (Object.hasOwnProperty.call(Procs.value, key)) {
					Procs.value[key].loading = false;
				}
			}
		},
	},
);

// Hook	 ************************************

onMounted(() => {
	getProdtList();
});

// Modal ************************************

const Modal = ref({
	Prodt: { showYn: false, procType: 'C', prodtId: 0 },
});

const ShowHide = (type, showYn) => {
	switch (type) {
		case 'Prodt':
			Modal.value.Prodt.showYn = showYn;
			break;
	}
};

const ShowProdt = (procType, prodtId) => {
	Modal.value.Prodt.procType = procType;
	Modal.value.Prodt.prodtId = prodtId == null ? 0 : prodtId;

	ShowHide('Prodt', true);
};

// Watch ************************************

// Method	***********************************

// 상품 조회
const getProdtList = () => {
	Modal.value.Prodt.showYn = false;
	execUrl(Procs.value.getProdtList.path, ProdtParm.value);
};

// Etc	**************************************
</script>

<style></style>
