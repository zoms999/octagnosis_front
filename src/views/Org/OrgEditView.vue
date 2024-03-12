<template>
	<div class="TitPage">
		<div>기관</div>
		<div></div>
	</div>

	<div>수정</div>
	<p>
		{{ props.id }}
	</p>
	<button class="btn btn-primary" @click="ShowView">목록으로</button>
</template>

<script setup>
const props = defineProps({
	id: {
		type: String,
		required: true,
	},
});
const emit = defineEmits(['ShowView']);

const ShowView = () => {
	emit('ShowView', { ViewNm: 'List' });
};
</script>

<style lang="scss" scoped></style>
