<template>
	<div class="TitPage">
		<div>기업정보</div>
		<div></div>
	</div>
	<div class="ActionBtn">
		<div></div>
		<div>
			<button class="btn btn-primary ms-2" @click="editCompy()">
				<template v-if="Procs.editCompy.loading">
					<span
						class="spinner-grow spinner-grow-sm"
						role="status"
						aria-hidden="true"
					></span>
					<span class="visually-hidden">Loading...</span>
				</template>
				<template v-else> 수정 </template>
			</button>
		</div>
	</div>
	<div class="Tit1">
		<div>기업기본정보</div>
		<div></div>
	</div>

	<div class="container-fluid ItemBox">
		<div class="row">
			<div class="col-1 lbl"><i></i>기업명</div>
			<div class="col-4">
				<div class="input-group">
					<span class="input-group-text"></span>
					<input
						v-focus
						type="text"
						ref="txtCompyNm"
						class="form-control"
						v-model="Compy.compyNm"
					/>
				</div>
			</div>
			<div class="col-1 lbl"><i></i>대표</div>
			<div class="col-4">
				<div class="input-group">
					<span class="input-group-text"></span>
					<input
						v-focus
						type="text"
						ref="txtCeoNm"
						class="form-control"
						v-model="Compy.ceoNm"
					/>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl"><i></i>사업자번호</div>
			<div class="col-4">
				<div class="input-group">
					<span class="input-group-text"></span>
					<input
						v-focus
						type="text"
						ref="txtBizNum"
						class="form-control"
						v-model="Compy.bizNum"
					/>
				</div>
			</div>
			<div class="col-1 lbl"><i></i>법인번호</div>
			<div class="col-4">
				<div class="input-group">
					<span class="input-group-text"></span>
					<input
						v-focus
						type="text"
						ref="txtCorpNum"
						class="form-control"
						v-model="Compy.corpNum"
					/>
				</div>
			</div>
			<div class="col-1 lbl"><i></i>통신판매업신고번호</div>
			<div class="col-4">
				<div class="input-group">
					<span class="input-group-text"></span>
					<input
						v-focus
						type="text"
						ref="txtOnlineNum"
						class="form-control"
						v-model="Compy.onlineNum"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="Tit1">
		<div>기업연락정보</div>
		<div></div>
	</div>
	<div class="container-fluid ItemBox">
		<div class="row">
			<div class="col-1 lbl"><i></i>연락처1</div>
			<div class="col-4">
				<input
					v-focus
					type="text"
					ref="txtTel1"
					class="form-control"
					v-model="Compy.tel1"
				/>
			</div>
			<div class="col-1 lbl">연락처2</div>
			<div class="col-4">
				<input
					v-focus
					type="text"
					ref="txtTel2"
					class="form-control"
					v-model="Compy.tel2"
				/>
			</div>
			<div class="col-1 lbl">팩스</div>
			<div class="col-4">
				<input
					v-focus
					type="text"
					ref="txtFax"
					class="form-control"
					v-model="Compy.fax"
				/>
			</div>
			<div class="col-1 lbl">세금계산서 메일</div>
			<div class="col-4">
				<input
					v-focus
					type="text"
					ref="txtBillEmail"
					class="form-control"
					v-model="Compy.billEmail"
				/>
			</div>
		</div>
	</div>
	<div class="Tit1">
		<div>기업주소</div>
		<div></div>
	</div>
	<div class="container-fluid ItemBox">
		<div class="row">
			<div class="col-1 lbl"><i></i>우편번호</div>
			<div class="col-3">
				<div class="input-group">
					<input
						type="text"
						ref="txtZip"
						class="form-control"
						v-model="Compy.zip"
					/>
					<button class="btn btn-primary IconBtn">
						<span class="material-icons"> search </span>
					</button>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-1 lbl">도로명 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddr2"
					class="form-control"
					v-model="Compy.addr2"
				/>
			</div>
			<div class="col-1 lbl">지번 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddrStret"
					class="form-control"
					v-model="Compy.addrStret"
				/>
			</div>
			<div class="col-1 lbl">상세 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddr3"
					class="form-control"
					v-model="Compy.addr3"
				/>
			</div>
			<div class="col-1 lbl">추가 주소</div>
			<div class="col-5">
				<input
					type="text"
					ref="txtAddrLotNum"
					class="form-control"
					v-model="Compy.addrLotNum"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

// Props / Emit  ****************************

// Data *************************************

const { userMngrId } = storeToRefs(useAuthStore());

const Compy = ref({
	logId: '',
	acuntId: '',
	actinDt: '',
	actinReasn: '',
	actinType: 'C00101',
	actinRslt: '',
	actinFunc: '',
	insId: userMngrId.value,
	insDt: '',
	uptId: userMngrId.value,
	uptDt: '',
});

const { vAlert, vSuccess } = useAlert();

const txtBizNum = ref(null);
const txtCompyNm = ref(null);
const txtTel1 = ref(null);
const txtTel2 = ref(null);
const txtFax = ref(null);
const txtCorpNum = ref(null);
const txtCeoNm = ref(null);
const txtZip = ref(null);
const txtAddrStret = ref(null);
const txtAddrLotNum = ref(null);
const txtAddr2 = ref(null);
const txtAddr3 = ref(null);
const txtBillEmail = ref(null);
//const txtEmailTo = ref(null);
const txtOnlineNum = ref(null);

// Axios	***********************************

const Procs = ref({
	cretCompy: { path: '/api/Compy/cretCompy', loading: false },
	editCompy: { path: '/api/Compy/editCompy', loading: false },
	getCompy: { path: '/api/Compy/getCompy', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.editCompy.path:
					vSuccess('기관이 수정되었습니다. ');
					Procs.value.editCompy.loading = false;
					break;

				case Procs.value.getCompy.path:
					Procs.value.getCompy.loading = false;

					Compy.value = data.value.Compy;
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

// Modal ************************************
</script>

<style lang="scss" scoped></style>
