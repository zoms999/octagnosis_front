<template>
	<div class="TitPage">
		<div>기관</div>
		<div></div>
	</div>
	<div v-show="ViewNm === 'List'">
		<OrgListView @ShowView="ShowView"></OrgListView>
	</div>
	<div v-if="ViewNm === 'Cret'">
		<OrgCretView @ShowView="ShowView"></OrgCretView>
	</div>
	<div v-else-if="ViewNm === 'Edit'">
		<OrgEditView :id="Id" @ShowView="ShowView"></OrgEditView>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import OrgListView from './OrgListView.vue';
import OrgCretView from './OrgCretView.vue';
import OrgEditView from './OrgEditView.vue';

const ViewNm = ref('List');
const Id = ref('0');

const ShowView = obj => {
	console.log('obj.Id', obj.Id);
	ViewNm.value = obj.ViewNm;
	Id.value = obj.Id;
};
</script>

<style lang="scss" scoped></style>
