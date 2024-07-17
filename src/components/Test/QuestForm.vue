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
				<div class="col-1 lbl">문항속성2</div>
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
			<div class="row">
				<div class="col-12 lblL"><i></i>문항내용 추가1</div>
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
		<div class="Tit1 ms-3">
			<div>문항 이미지</div>
			<div>
				<div class="IconBtnA" @click="ShowImg('C')">
					<span class="material-icons"> add </span>
				</div>
			</div>
		</div>

		<div class="container ItemBox">
			<div class="row">
				<div
					class="col-3 text-center"
					v-for="item in QuestImgList"
					:key="item.imgId"
				>
					<div class="Poit" @click.stop="ShowImg('E', item.imgId)">
						<img :src="getQuestImg(item.imgNm)" class="QuestImg" />
					</div>
					<div>{{ getCdNm(item.imgType) }}</div>
				</div>
			</div>
		</div>

		<div class="Tit1 ms-3">
			<div>문항 보기</div>
			<div>
				<div class="IconBtnA" @click="ShowItem('C')">
					<span class="material-icons">add</span>
				</div>
			</div>
		</div>

		<div class="mx-4">
			<table class="table table-bordered Tbl1" cellspacing="0">
				<thead>
					<tr class="th2">
						<th class="w50">순번</th>
						<th class="">보기</th>
						<th class="w80">보기유형</th>
						<th class="w60">점수</th>
						<th class="w60">-</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in QuestItemList" :key="item.itemId">
						<td class="text-center">{{ item.seq }}</td>
						<td class="text-start">
							<span v-if="item.itemType == 'C00701'">{{ item.conts }}</span>
							<img
								v-if="item.itemType == 'C00702'"
								:src="getQuestItemImg(item.imgNm)"
								class="QuestItemImg"
							/>
						</td>
						<td class="">{{ getCdNm(item.itemType) }}</td>
						<td class="">{{ item.weigt }}</td>
						<td>
							<div class="IconBtnA" @click.stop="ShowItem('E', item.itemId)">
								<span class="material-icons"> mode_edit </span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
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
	<!--	문항 보기------------------------------->
	<Teleport to="#modal">
		<AppModalV1
			v-model="Modal.Item.showYn"
			title="문항보기"
			width="800"
			depth="2"
		>
			<QuestItem
				v-model="Modal.Item.showYn"
				v-model:ModalParm="Modal.Item"
				@getQuestItemList="getQuestItemList"
			></QuestItem>
		</AppModalV1>
	</Teleport>

	<!--	문항 이미지------------------------------->
	<Teleport to="#modal">
		<AppModalV1
			v-model="Modal.Img.showYn"
			title="문항이미지"
			width="700"
			depth="2"
		>
			<QuestImg
				v-model="Modal.Img.showYn"
				v-model:ModalParm="Modal.Img"
				@getQuestImgList="getQuestImgList"
			></QuestImg>
		</AppModalV1>
	</Teleport>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue';
import { useAlert } from '@/hooks/useAlert';
import { useAxios } from '@/hooks/useAxios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

import QuestItem from '@/components/Test/QuestItem.vue';
import QuestImg from '@/components/Test/QuestImg.vue';

// Props / Emit  ****************************

var Emits = defineEmits(['update:modelValue', 'getQuestList']);

var ModalParm = defineModel('ModalParm');

// alert(ModalParm.value.procType);

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
	questType: 'C00501',
	questAttrCd1: 'IMG001',
	questAttrCd2: 'IMG004',
	waitSec: 0,
	itemColCnt: 1,
	imgColCnt: 1,
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
const QuestItemList = ref([]);
const QuestImgList = ref([]);

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
	getQuestItemList: {
		path: '/api/Quest/Quest/getQuestItemList',
		loading: false,
	},
	getQuestImgList: {
		path: '/api/Quest/Quest/getQuestImgList',
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
					QuestItemList.value = data.value.QuestItemList;
					QuestImgList.value = data.value.QuestImgList;
					break;

				case Procs.value.getQuestItemList.path:
					Procs.value.getQuestItemList.loading = false;
					QuestItemList.value = data.value.QuestItemList;
					break;
				case Procs.value.getQuestImgList.path:
					Procs.value.getQuestImgList.loading = false;
					QuestImgList.value = data.value.QuestImgList;
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

const Modal = ref({
	Item: {
		showYn: false,
		procType: 'C',
		questId: 0,
		itemId: 0,
		questItem: {},
	},
	Img: { showYn: false, procType: 'C', questId: 0, imgId: 0, questImg: {} },
});

const ShowHide = (type, showYn) => {
	switch (type) {
		case 'Item':
			Modal.value.Item.showYn = showYn;
			break;
		case 'Img':
			Modal.value.Img.showYn = showYn;
			break;
	}
};

const ShowItem = (procType, itemId) => {
	Modal.value.Item.procType = procType;
	Modal.value.Item.questId = Quest.value.questId;
	Modal.value.Item.itemId = itemId;

	Modal.value.Item.questItem = QuestItemList.value.find(
		o => o.itemId == itemId,
	);

	ShowHide('Item', true);
};

const ShowImg = (procType, imgId) => {
	Modal.value.Img.procType = procType;
	Modal.value.Img.questId = Quest.value.questId;
	Modal.value.Img.imgId = imgId;

	Modal.value.Img.questImg = QuestImgList.value.find(o => o.imgId == imgId);

	ShowHide('Img', true);
};

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
		Quest.value.imgColCnt = val == 0 ? '1' : val;
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
	/*
	if (
		!validNotSelect(
			Quest.value.questAttrCd2,
			'문항속성2',
			selQuestAttrCd2.value,
		)
	)
		return;
		*/
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

const getQuestItemList = () => {
	Modal.value.Item.showYn = false;
	execUrl(Procs.value.getQuestItemList.path, QuestParm.value);
};

const getQuestImg = imgNm => {
	var ImgNm = imgNm == '' ? 'none.png' : imgNm;
	return `${import.meta.env.VITE_IMG_BASE_PATH}/QuestImg/${ImgNm}`;
};

const getQuestImgList = () => {
	Modal.value.Img.showYn = false;
	execUrl(Procs.value.getQuestImgList.path, QuestParm.value);
};

const getQuestItemImg = imgNm => {
	var ImgNm = imgNm == '' ? 'none.png' : imgNm;
	return `${import.meta.env.VITE_IMG_BASE_PATH}/QuestItem/${ImgNm}`;
};

// Etc  **************************************

const getCdNm = cd => {
	switch (cd) {
		case 'C00701':
			return '글자';
		case 'C00702':
			return '이미지';
		case 'C00801':
			return '이미지 A';
		case 'C00802':
			return '이미지 B';
		case 'C00803':
			return '이미지 C';
	}
};

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

<style scoped>
.QuestImg {
	width: 200px;
	height: auto;
}
.QuestItemImg {
	width: 80px;
}
</style>
