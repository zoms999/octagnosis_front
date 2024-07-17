<template>
	<div class="TitPage">
		<div>검사문항</div>
		<div></div>
	</div>
	<div class="container-fluid mt-2">
		<div class="row">
			<div class="col-4">
				<div class="input-group">
					<span class="input-group-text">검사지</span>
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
					<button
						type="button"
						class="btn btn-primary"
						:disabled="NotSelectTest"
						@click="ShowTest('E')"
					>
						검사수정
					</button>
					<button
						type="button"
						class="btn btn-primary ms-1"
						@click="ShowTest('C')"
					>
						검사등록
					</button>
				</div>
			</div>
			<div class="col-5"></div>
			<div class="col-3 text-end">
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
			class="table table-bordered Tbl11"
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
					<th class="w130">검사지명</th>
					<th class="w160">유형</th>
					<th class="w150 seprator1">-</th>

					<th class="w50">번호</th>
					<th>내용</th>
					<th class="w100">문항유형</th>
					<th class="w100">문항속성1</th>
					<th class="w100">문항속성2</th>
					<th class="w50">-</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, idx) in QuestPageList" :key="item.questPageId">
					<td>{{ item.questPageSeq }}</td>
					<td>
						{{ item.questPageNm }}
					</td>
					<td>{{ item.questPageTypeNm }}</td>
					<td>
						<div
							class="IconBtnA"
							@click="ShowQuestPageMain(item.questPageId)"
							S
						>
							<span class="material-icons"> article </span>
						</div>
						<div
							class="IconBtnA"
							@click.stop="ShowQuestPage('E', item.questPageId)"
						>
							<span class="material-icons"> mode_edit </span>
						</div>
						<div
							class="IconBtnA"
							@click.stop="ShowQuest('C', item.questPageId, 0)"
						>
							<span class="material-icons"> playlist_add </span>
						</div>
					</td>
					<td colspan="6" style="padding: 0 !important">
						<div
							class="d-flex QuestList"
							v-for="item1 in item.questList"
							:key="item1.questId"
						>
							<div class="w50">{{ item1.questNo }}</div>
							<div class="flex-fill w200 text-truncate">
								{{ item1.questCont1 }}
							</div>
							<div class="w100">
								{{ item1.questTypeNm }}
							</div>
							<div class="w100">
								{{ item1.questAttrCd1Nm }}
							</div>
							<div class="w100">
								{{ item1.questAttrCd2Nm }}
							</div>
							<div class="w50">
								<div
									class="IconBtnA"
									@click.stop="ShowQuest('E', item.questPageId, item1.questId)"
								>
									<span class="material-icons"> mode_edit </span>
								</div>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>
		<div class="NotSelect" v-if="NotSelectTest">검사지를 선택하세요.</div>
		<br /><br /><br />
	</div>

	<!--	검사 ------------------------------->
	<Teleport to="#modal">
		<AppModalV1 v-model="Modal.Test.showYn" title="검사" width="500">
			<TestForm
				v-model="Modal.Test.showYn"
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
				v-model="Modal.QuestPage.showYn"
				v-model:ModalParm="Modal.QuestPage"
				@getQuestPageList="getQuestPageList"
			></QuestPageForm>
		</AppModalV1>
	</Teleport>

	<!--	검사문항 ------------------------------->
	<Teleport to="#modal">
		<AppModalV1 v-model="Modal.Quest.showYn" title="검사문항" width="1100">
			<QuestForm
				v-model="Modal.Quest.showYn"
				v-model:ModalParm="Modal.Quest"
				@getQuestList="getQuestList"
			></QuestForm>
		</AppModalV1>
	</Teleport>

	<!--	검사지 샘플 ------------------------------->
	<Teleport to="#modal">
		<AppModalV1
			v-model="Modal.QuestPageMain.showYn"
			title="검사지"
			width="1400"
		>
			<QuestPageMain
				v-model="Modal.QuestPageMain.showYn"
				v-model:ModalParm="Modal.QuestPageMain"
				v-model:Test="Test"
			></QuestPageMain>
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
import QuestForm from '@/components/Test/QuestForm.vue';
import QuestPageMain from '@/views/Test/QuestPageMainView.vue';

// Props / Emit  ****************************

// Model / Data *****************************

const { userMngrId } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();

const TestList = ref([]);
const Test = ref({});
const QuestPageList = ref([]);
const QuestList = ref([]);

const NotSelectTest = ref(true);

const QuestParm = ref({
	testId: 0,
	questPageId: 0,
	oldQuestPageId: 0,
});

// Html ref  ********************************

const selTest = ref(null);

// Axios / Route	***************************

const Procs = ref({
	getTestList: { path: '/api/Quest/Test/getTestList', loading: false },
	getQuestPageList: {
		path: '/api/Quest/QuestPage/getQuestPageList',
		loading: false,
	},
	getQuestList: { path: '/api/Quest/Quest/getQuestList', loading: false },
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
				case Procs.value.getQuestList.path:
					Procs.value.getQuestList.loading = false;

					var QuestId = data.value.QuestId;
					var QuestPage = QuestPageList.value.find(
						o => o.questPageId == QuestId,
					);

					QuestPage.questList = data.value.QuestList;

					// 변경 전 검사지의 문항 바인딩
					var OldQuestId = data.value.OldQuestId;
					if (QuestId != OldQuestId && OldQuestId != 0) {
						var OldQuestPage = QuestPageList.value.find(
							o => o.questPageId == OldQuestId,
						);

						OldQuestPage.questList = data.value.OldQuestList;
					}

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
	getTestList();
});

// Modal ************************************

const Modal = ref({
	Test: { showYn: false, procType: 'C' },
	QuestPage: { showYn: false, procType: 'C', testId: 0, questPageId: 0 },
	Quest: {
		showYn: false,
		procType: 'C',
		testId: 0,
		questPageId: 0,
		questId: 0,
	},
	QuestPageMain: { showYn: false, testId: 0, questPageId: 0 },
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
		case 'QuestPageMain':
			Modal.value.QuestPageMain.showYn = showYn;
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

const ShowQuest = (procType, questPageId, questId) => {
	Modal.value.Quest.procType = procType;
	Modal.value.Quest.testId = selTest.value.value;
	Modal.value.Quest.questPageId = questPageId;
	Modal.value.Quest.questId = questId;

	ShowHide('Quest', true);
};

const ShowQuestPageMain = questPageId => {
	Modal.value.QuestPageMain.testId = selTest.value.value;
	Modal.value.QuestPageMain.questPageId = questPageId;

	ShowHide('QuestPageMain', true);
};

// Watch ************************************

// Method	***********************************

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

// 검사지 조회
const getQuestPageList = () => {
	Modal.value.QuestPage.showYn = false;
	execUrl(Procs.value.getQuestPageList.path, QuestParm.value);
};

// 검사지 문항 조회
const getQuestList = questPageId => {
	//Modal.value.Quest.showYn = false;

	QuestParm.value.questPageId = questPageId;
	// 문항의 검사지가 변경되었으면 변경되기전의 검사지의 문항도 조회
	QuestParm.value.oldQuestPageId =
		questPageId != Modal.value.Quest.questPageId
			? Modal.value.Quest.questPageId
			: 0;
	execUrl(Procs.value.getQuestList.path, QuestParm.value);
};

// Etc	**************************************
</script>

<style>
.th1 {
	padding: 1px;
}
.th1 th {
	padding: 1px !important;
	font-size: 1rem;
	background-color: rgb(120, 120, 120) !important;
}
.th2 {
	padding: 1px;
}
.th2 th {
	height: 40px !important;
	padding: 1px !important;
	font-size: 1rem;
}
.seprator1 {
	border-right: 2px solid #ffffff !important;
}
.seprator1 {
	border-right: 2px solid #ffffff !important;
}

.QuestList {
	border-bottom: 1px solid #cacaca;
	margin: 0px !important;
	padding: 3px;
}
.QuestList > div:nth-child(1) {
	width: 50px;
	text-align: center;
	border: 0px solid red;
	padding: 4px 0 0 0;
}
.QuestList > div:nth-child(2) {
	padding: 4px 5px 0 5px;
	text-align: left;
}
.QuestList > div:nth-child(3) {
	width: 100px;
	padding: 4px 0 0 0;
}
.QuestList > div:nth-child(4) {
	width: 100px;
	padding: 4px 0 0 0;
}
.QuestList > div:nth-child(5) {
	width: 100px;
	padding: 4px 0 0 0;
}
.QuestList > div:nth-child(6) {
	width: 60px;
	padding: 2px;
}

.Tbl11 {
	border-top: 1px solid #ffffff;
	border-left: 1px solid #ffffff;
	border-right: 1px solid #ffffff;
	border-bottom: 1px solid #ffffff;
	border-collapse: collapse !important;
	margin: 10px 0px 10px 0px !important;
}

.Tbl11 thead tr {
	padding: 1rem 1rem;
	text-align: center;
}

.Tbl11 thead th {
	padding: 0.6rem 0.3rem;
	border: 1px solid #cacaca;
	background-color: #418b89;
	color: #ffffff;
	font-size: 1.1rem;
}

.Tbl11 thead td {
	padding: 0.6rem 0.3rem;
	border: 1px solid #cacaca;
	background-color: #418b89;
	color: #ffffff;
	font-size: 1.1rem;
}

.Tbl11 tbody tr {
	border: 1px solid #cacaca;
}

.Tbl11 tbody tr:hover {
	background-color: #f1f1f1;
}

.Tbl11 tbody td {
	padding: 3px;
	font-size: 1rem;
	text-align: center;
	line-height: 1.85rem;
	border: 1px solid #cacaca;
	color: rgb(50, 50, 50);
	background-color: transparent;
	vertical-align: middle;
}

.NotSelect {
	padding: 100px;
	text-align: center;
	color: #aaaaaa;
}
</style>
