<template>
	<div class="TitPage">
		<div>검사문항</div>
		<div></div>
	</div>
	<div class="container-fluid mt-2">
		<div class="row">
			<div class="col-4">
				<div class="input-group">
					<select class="form-select fs120" ref="selTest" :onChange="setTest">
						<option value=""></option>
						<option
							v-for="item in TestList"
							:Key="item.testId"
							:value="item.testId"
						>
							{{ item.testNm }}
						</option>
					</select>
					<button type="button" class="btn btn-primary" @click="ShowTest('C')">
						검사등록
					</button>
					<button
						type="button"
						class="btn btn-primary ms-1"
						@click="ShowTest('E')"
					>
						검사수정
					</button>
				</div>
			</div>
			<div class="col-2"></div>
			<div class="col-6 text-end">
				<button
					type="button"
					class="btn btn-primary ms-2"
					:disabled="NotSelectTest"
					@click="ShowQuestPage('C')"
				>
					검사지 등록
				</button>
			</div>
		</div>
	</div>
	<div>
		<table
			class="table table-bordered Tbl1"
			id="dataTable"
			width="100%"
			cellspacing="0"
		>
			<thead>
				<tr class="th1">
					<th colspan="4" class="seprator1">검사지</th>
					<th colspan="6">검사문항</th>
				</tr>
				<tr class="th2">
					<th class="w50">순번</th>
					<th class="w200">검사지명</th>
					<th class="w140">유형</th>
					<th class="w110 seprator1">-</th>

					<th class="w50">번호</th>
					<th>내용</th>
					<th class="w80">속성1</th>
					<th class="w80">속성1</th>
					<th class="w50">보기</th>
					<th class="w50">-</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, idx) in QuestPageList" :key="item.questPageId">
					<td>{{ item.questPageSeq }}</td>
					<td>{{ item.questPageNm }}</td>
					<td>{{ item.questPageTypeNm }}</td>
					<td>
						<button type="button" class="btn btn-primary btn-sm fs080">
							<span class="material-icons"> playlist_add </span>
						</button>
						<button
							type="button"
							class="btn btn-primary btn-sm fs080 ms-1"
							@click.stop="ShowQuestPage('E', item.questPageId)"
						>
							<span class="material-icons"> mode_edit </span>
						</button>
					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>
	</div>

	<!--	검사 ------------------------------->
	<Teleport to="#modal">
		<AppModalV1 v-model="Modal.Test.showYn" title="검사" width="500">
			<TestForm
				v-model:ModalParm="Modal.Test"
				v-model:Test="Test"
				@getTestList="getTestList"
			></TestForm>
		</AppModalV1>
	</Teleport>

	<!--	검사지 ------------------------------->
	<Teleport to="#modal">
		<AppModalV1 v-model="Modal.QuestPage.showYn" title="검사지" width="800">
			<QuestPageForm
				v-model:ModalParm="Modal.QuestPage"
				@getQuestPageList="getQuestPageList"
			></QuestPageForm>
		</AppModalV1>
	</Teleport>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import TestForm from '@/components/Test/TestForm.vue';
import QuestPageForm from '@/components/Test/QuestPageForm.vue';

// Props / Emit  ****************************

// Model / Data *****************************

const { userMngrId } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();

const TestList = ref([]);
const Test = ref({});
const QuestPageList = ref([]);

const NotSelectTest = ref(true);

const QuestParm = ref({
	testId: 0,
	questPageId: 0,
});

// Html ref  ********************************

const selTest = ref(null);

// Axios / Route	***********************************

const Procs = ref({
	getTestList: { path: '/api/Quest/Test/getTestList', loading: false },
	getQuestPageList: {
		path: '/api/Quest/QuestPage/getQuestPageList',
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
				case Procs.value.getTestList.path:
					Procs.value.getTestList.loading = false;
					TestList.value = data.value.TestList;
					break;
				case Procs.value.getQuestPageList.path:
					Procs.value.getQuestPageList.loading = false;
					QuestPageList.value = data.value.QuestPageList;
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

// Hook	 *************************************

onMounted(() => {
	getTestList();
});

// Modal *************************************

const Modal = ref({
	Test: { showYn: false, procType: 'C' },
	QuestPage: { showYn: false, procType: 'C', testId: 0, questPageId: 0 },
	Quest: { showYn: false, procType: 'C', testId: 0, questPageId: 0 },
});

const ShowHide = (type, showYn) => {
	switch (type) {
		case 'Test':
			Modal.value.Test.showYn = showYn;
			break;
		case 'QuestPage':
			Modal.value.QuestPage.showYn = showYn;
			break;
		case 'Quest':
			Modal.value.Quest.showYn = showYn;
			break;
	}
};

const ShowTest = procType => {
	Modal.value.Test.procType = procType;
	const TestId = selTest.value.value;
	Test.value = TestList.value.find(o => o.testId == TestId);

	ShowHide('Test', true);
};

const ShowQuestPage = (procType, questPageId) => {
	Modal.value.QuestPage.procType = procType;
	Modal.value.QuestPage.testId = selTest.value.value;
	Modal.value.QuestPage.questPageId = questPageId;

	ShowHide('QuestPage', true);
};

// Watch *************************************

// Method	************************************

const getTestList = () => {
	Modal.value.Test.showYn = false;

	execUrl(Procs.value.getTestList.path);
};

const setTest = () => {
	if (selTest.value.value == '') {
		NotSelectTest.value = true;
	} else {
		NotSelectTest.value = false;
		QuestParm.value.testId = selTest.value.value;
		getQuestPageList();
	}
};

const getQuestPageList = () => {
	execUrl(Procs.value.getQuestPageList.path, QuestParm.value);
};

const getQuestList = () => {
	Modal.value.QuestPage.showYn = false;

	execUrl(Procs.value.getTestList.path);
};

// Etc	**************************************
</script>

<style>
.th1 {
	height: 30px !important;
	padding: 1px;
}
.th1 th {
	height: 30px !important;
	padding: 1px !important;
	font-size: 1rem;
	background-color: rgb(120, 120, 120) !important;
}
.th2 {
	height: 35px !important;
	padding: 1px;
}
.th2 th {
	height: 35px !important;
	padding: 1px !important;
	font-size: 1rem;
}
.seprator1 {
	border-right: 2px solid #ffffff !important;
}
.seprator1 {
	border-right: 2px solid #ffffff !important;
}
</style>
