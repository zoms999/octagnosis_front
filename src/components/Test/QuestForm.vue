<template>
	<div class="modal-body">
		<div class="container ItemBox">
			<div class="row">
				<div class="col-1 lbl"><i></i>문항번호</div>
				<div class="col-2">
					<input
						type="text"
						ref="txtQuestNo"
						class="form-control"
						v-model="Quest.questNo"
					/>
				</div>
				<div class="col-1"></div>
				<div class="col-1 lbl"><i></i>사용여부</div>
				<div class="col-2">
					<select class="form-select" ref="selUseYn" v-model="Quest.useYn">
						<option value="Y" :selected="Quest.useYn == Y">사용</option>
						<option value="N" :selected="Quest.useYn == N">미상용</option>
					</select>
				</div>
				<div class="col-1 lbl" v-if="ModalParm.procType == 'E'">
					<i></i>검사지
				</div>
				<div class="col-4" v-if="ModalParm.procType == 'E'">
					<select
						class="form-select"
						ref="selQuestPageId"
						v-model="Quest.questPageId"
					>
						<option
							v-for="item in QuestPageList"
							:key="item.questPageId"
							:value="item.questPageId"
							:selected="item.questPageId == Quest.questPageId"
						>
							{{
								`${item.questPageSeq}.${item.questPageNm} / ${item.questPageTypeNm}`
							}}
						</option>
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col-1 lbl"><i></i>문항유형</div>
				<div class="col-3">
					<select
						class="form-select"
						ref="selQuestType"
						v-model="Quest.questType"
					>
						<option value="C00501" selected="selected">이미지</option>
						<option value="C00502">재능</option>
						<option value="C00503">사고력</option>
						<option value="C00504">성향</option>
					</select>
				</div>
				<div class="col-1 lbl"><i></i>문항속성1</div>
				<div class="col-3">
					<select
						class="form-select"
						ref="selQuestAttrCd1"
						v-model="Quest.questAttrCd1"
					>
						<option value=""></option>
						<option
							v-for="item in QuestAttrList"
							:key="item.questAttrCd"
							:value="item.questAttrCd"
							:selected="item.questAttrCd == Quest.questAttrCd1"
						>
							{{
								`${item.questTypeNm} : ${item.questAttrNm} ( ${item.totScore} / ${item.cutLine} )`
							}}
						</option>
					</select>
				</div>
				<div class="col-1 lbl"><i></i>문항속성2</div>
				<div class="col-3">
					<select
						class="form-select"
						ref="selQuestAttrCd2"
						v-model="Quest.questAttrCd2"
					>
						<option value=""></option>
						<option
							v-for="item in QuestAttrList"
							:key="item.questAttrCd"
							:value="item.questAttrCd"
							:selected="item.questAttrCd == Quest.questAttrCd2"
						>
							{{
								`${item.questTypeNm} : ${item.questAttrNm} ( ${item.totScore} / ${item.cutLine} )`
							}}
						</option>
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col-12 lblL"><i></i>문항내용</div>
				<div class="col-12">
					<textarea
						type="text"
						ref="txtQuestCont1"
						class="form-control"
						v-model="Quest.questCont1"
					></textarea>
				</div>
			</div>
		</div>
		<div class="container ItemBox" v-if="ModalParm.procType == 'E'">
			<div class="row" v-if="ModalParm.procType == 'C'">
				<div class="col-12 lblL"><i></i>문항내용 추가</div>
				<div class="col-12">
					<textarea
						type="text"
						ref="txtQuestCont2"
						class="form-control"
						v-model="Quest.questCont2"
					></textarea>
				</div>
			</div>
			<div class="row">
				<div class="col-2 lbl"><i></i>보기 열개수</div>
				<div class="col-2">
					<input
						type="text"
						ref="txtItemColCnt"
						class="form-control"
						v-model="Quest.itemColCnt"
					/>
				</div>
				<div class="col-2 lbl"><i></i>이미지 열개수</div>
				<div class="col-2">
					<input
						type="text"
						ref="txtImgColCnt"
						class="form-control"
						v-model="Quest.imgColCnt"
					/>
				</div>
				<div class="col-2 lbl"><i></i>대기시간</div>
				<div class="col-2">
					<input
						type="text"
						ref="txtWaitSec"
						class="form-control"
						v-model="Quest.waitSec"
					/>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12 text-end">
				<button type="button" class="btn btn-primary" @click="saveQuest">
					<template v-if="Procs.saveQuest.loading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>
						{{ ModalParm.procType == 'C' ? '등록' : '수정' }}
					</template>
				</button>
				<button
					type="button"
					class="btn btn-primary ms-2"
					v-show="ModalParm.procType == 'E'"
					@click="delQuest"
				>
					<template v-if="Procs.delQuest.loading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else> 삭제 </template>
				</button>
			</div>
		</div>
	</div>
	<div v-if="ModalParm.procType == 'E'">
		<hr />
		<div class="container ItemBox">
			<div class="row">
				<div class="col-6">문항 이미지</div>
				<div class="col-6 text-end">
					<butto type="button" class="btn btn-primary btn-sm">
						<span class="material-icons pt-1"> add_circle </span>
					</butto>
				</div>
			</div>
			<div class="row">
				<div class="col-3"></div>
			</div>
		</div>
		<div class="container ItemBox">
			<div class="row">
				<div class="col-6">문항 보기</div>
				<div class="col-6 text-end">
					<butto type="button" class="btn btn-primary btn-sm">
						<span class="material-icons pt-1"> add_circle </span>
					</butto>
				</div>
			</div>
			<div class="row">
				<div class="col-3"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button
			type="button"
			class="btn btn-secondary"
			@click="$emit('update:modelValue', false)"
		>
			닫기
		</button>
	</div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

// Props / Emit  ****************************

var Emits = defineEmits(['update:modelValue', 'getQuestList']);

var ModalParm = defineModel('ModalParm');

// alert(ModalParm.value.procType);

// Model / Data *****************************

const { userMngrId } = storeToRefs(useAuthStore());
const { vAlert, vSuccess } = useAlert();

const Quest = ref({
	testId: 0,
	questPageId: 0,
	questId: 0,
	questNo: '',
	questCont1: '',
	questCont2: '',
	questCont3: '',
	questType: '',
	questAttrCd1: '',
	questAttrCd2: '',
	waitSec: '0',
	itemColCnt: '1',
	imgColCnt: '1',
	useYn: 'Y',
	insId: userMngrId.value,
	uptId: userMngrId.value,
});

const QuestParm = ref({
	testId: 0,
	questPageId: 0,
	questId: 0,
	procType: ModalParm.value.procType,
});

const QuestPageList = ref([]);
const QuestAttrList = ref([]);

// Hook	 *************************************

onMounted(() => {
	Quest.value.testId = ModalParm.value.testId;
	Quest.value.questPageId = ModalParm.value.questPageId;

	QuestParm.value.testId = ModalParm.value.testId;
	QuestParm.value.questPageId = ModalParm.value.questPageId;

	if (ModalParm.value.procType == 'E') {
		Quest.value.questId = ModalParm.value.questId;
		QuestParm.value.questId = ModalParm.value.questId;
	}
	getQuest();
});

// Html ref  ********************************

const txtQuestNo = ref(null);
const selQuestPageId = ref(null);
const selQuestType = ref(null);
const selQuestAttrCd1 = ref(null);
const selQuestAttrCd2 = ref(null);
const txtQuestCont1 = ref(null);
const txtItemColCnt = ref(null);
const txtImgColCnt = ref(null);

// Axios / Route  ***************************

const Procs = ref({
	getQuest: { path: '/api/Quest/Quest/getQuest', loading: false },
	saveQuest: { path: '/api/Quest/Quest/saveQuest', loading: false },
	delQuest: { path: '/api/Quest/Quest/delQuest', loading: false },
});

const { data, execUrl, reqUrl } = useAxios(
	'',
	{ method: 'post' },
	{
		immediate: false,
		onSuccess: () => {
			switch (reqUrl.value) {
				case Procs.value.saveQuest.path:
					Procs.value.saveQuest.loading = false;
					vSuccess(
						`${ModalParm.value.procType == 'C' ? '등록' : '수정'}되었습니다.`,
					);

					ModalParm.value.procType = 'E';
					Emits('getQuestList', Quest.value.questPageId);
					break;
				case Procs.value.delQuest.path:
					Procs.value.delQuest.loading = false;
					vSuccess('삭제되었습니다.');
					Emits('getQuestList', Quest.value.questPageId);
					break;
				case Procs.value.getQuest.path:
					Procs.value.getQuest.loading = false;
					if (data.value.Quest != null) Quest.value = { ...data.value.Quest };
					QuestPageList.value = data.value.QuestPageList;
					QuestAttrList.value = data.value.QuestAttrList;

					//Quest.value = { ...data.value };
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

// Modal *************************************

// Watch *************************************

watch(
	() => Quest.value.questNo,
	newValue => {
		if (newValue == '' || newValue == null) return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		Quest.value.questNo = val;
	},
);

watch(
	() => Quest.value.itemColCnt,
	newValue => {
		if (newValue == '' || newValue == null) return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		Quest.value.itemColCnt = val == 0 ? '1' : val;
	},
);

watch(
	() => Quest.value.imgColCnt,
	newValue => {
		if (newValue == '' || newValue == null) return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		Quest.value.itemColCnt = val == 0 ? '1' : val;
	},
);

watch(
	() => Quest.value.waitSec,
	newValue => {
		if (newValue == '' || newValue == null) return;
		const val = newValue.toString().replace(/[^0-9]/g, '');
		Quest.value.waitSec = val;
	},
);

// Method ************************************

const getQuest = () => {
	execUrl(Procs.value.getQuest.path, QuestParm.value);
};

const saveQuest = () => {
	if (!validNotBlank(Quest.value.questNo, '문항번호', txtQuestNo.value)) return;
	if (!validNotSelect(Quest.value.questPageId, '검사지', selQuestPageId.value))
		return;
	if (!validNotSelect(Quest.value.questType, '문항유형', selQuestType.value))
		return;
	if (
		!validNotSelect(
			Quest.value.questAttrCd1,
			'문항속성1',
			selQuestAttrCd1.value,
		)
	)
		return;
	if (
		!validNotSelect(
			Quest.value.questAttrCd2,
			'문항속성2',
			selQuestAttrCd2.value,
		)
	)
		return;
	if (!validNotBlank(Quest.value.questCont1, '문항내용', txtQuestCont1.value))
		return;
	if (
		!validNotBlank(Quest.value.itemColCnt, '보기 열개수', txtItemColCnt.value)
	)
		return;
	if (!validNotBlank(Quest.value.imgColCnt, '보기 열개수', txtImgColCnt.value))
		return;

	Procs.value.saveQuest.loading = true;

	const Parm = ref({
		Quest: Quest.value,
		QuestParm: QuestParm.value,
	});
	execUrl(Procs.value.saveQuest.path, Parm.value);
};

const delQuest = () => {
	QuestParm.value.testId = Quest.value.testId;
	Procs.value.delQuest.loading = true;

	execUrl(Procs.value.delQuest.path, QuestParm.value);
};

// Etc  **************************************

const validNotBlank = (val, tit, obj) => {
	val = typeof val != 'string' ? val.toString() : val;
	var Val = val.replace(/\s/g, '');
	if (Val.length == 0) {
		vAlert(tit == null ? `입력해 주세요.` : `${tit}를(을) 입력해 주세요.`);
		if (obj != null) {
			obj.focus();
		}
		return false;
	}
	return true;
};

const validNotSelect = (val, tit, obj) => {
	val = typeof val != 'string' ? val.toString() : val;
	var Val = val.replace(/\s/g, '');
	if (Val.length == 0) {
		vAlert(tit == null ? `입력해 주세요.` : `${tit}를(을) 입력해 주세요.`);
		if (obj != null) {
			obj.focus();
		}
		return false;
	}
	return true;
};
</script>

<style lang="scss" scoped></style>
