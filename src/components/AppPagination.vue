<template>
	<nav class="mt-5" aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item" :class="isPrevPage">
				<a
					class="page-link"
					href="#"
					aria-label="Previous"
					@click.prevent="GoPage(CurPage - 1)"
				>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li
				v-for="page in PageCnt"
				:key="page"
				class="page-item"
				:class="{ active: page == CurPage }"
			>
				<a class="page-link" href="#" @click.prevent="GoPage(page)">{{
					page
				}}</a>
			</li>

			<li class="page-item" :class="isNextPage">
				<a
					class="page-link"
					href="#"
					aria-label="Next"
					@click.prevent="GoPage(CurPage + 1)"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	CurPage: {
		type: Number,
		required: true,
	},
	PageCnt: {
		type: Number,
		required: true,
	},
});

const emit = defineEmits(['page']);

const isPrevPage = computed(() => {
	return { disabled: props.CurPage == 1 };
});
const isNextPage = computed(() => {
	return { disabled: !(props.CurPage < props.PageCnt) };
});

const GoPage = no => {
	//console.log('no : ', no);
	emit('page', no);
};
</script>

<style lang="scss" scoped></style>
