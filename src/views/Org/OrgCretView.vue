<template>
	<div>등록</div>
	<button class="btn btn-primary" @click="ShowView">목록으로</button>
</template>

<script setup>
const emit = defineEmits(['ShowView']);
const ShowView = () => {
	emit('ShowView', { ViewNm: 'List' });
};
</script>

<style lang="scss" scoped></style>
