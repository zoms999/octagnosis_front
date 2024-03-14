<template>
	<div class="TitPage">
		<div>기관</div>
		<div></div>
	</div>

	<div>수정</div>
	<p>
		{{ props.id }}
	</p>
	<button class="btn btn-primary" @click="Go('OrgList', {})">목록으로</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
});

const router = useRouter();

const Go = (nm, p) => {
	router.push({ name: nm, params: p });
};
</script>

<style lang="scss" scoped></style>
