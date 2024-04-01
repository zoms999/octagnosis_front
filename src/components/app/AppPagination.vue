<template>
	<nav class="mt-5" aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item" :class="isPrevBlock">
				<a
					class="page-link pt-2 pb-1 px-2"
					href="#"
					aria-label="Previous"
					@click.prevent="GoPage(CurPage - 1)"
				>
					<span class="material-icons fs110"> first_page </span>
				</a>
			</li>
			<li class="page-item" :class="isPrevPage">
				<a
					class="page-link pt-2 pb-1 px-2"
					href="#"
					aria-label="Previous"
					@click.prevent="GoPage(CurPage - 1)"
				>
					<span class="material-icons fs110"> navigate_before </span>
				</a>
			</li>
			<li
				v-for="page in PageCnt"
				:key="page"
				class="page-item"
				:class="{ active: page == CurPage }"
			>
				<a
					class="page-link pt-2 pb-1 px-3"
					href="#"
					@click.prevent="GoPage(page * CurBlock)"
					>{{ page * CurBlock }}</a
				>
			</li>

			<li class="page-item" :class="isNextPage">
				<a
					class="page-link pt-2 pb-1 px-2"
					href="#"
					aria-label="Next"
					@click.prevent="GoPage(CurPage + 1)"
				>
					<span class="material-icons fs110"> navigate_next </span>
				</a>
			</li>

			<li class="page-item" :class="isNextBlock">
				<a
					class="page-link pt-2 pb-1 px-2"
					href="#"
					aria-label="Next"
					@click.prevent="GoPage(CurPage + 1)"
				>
					<span class="material-icons fs110"> last_page </span>
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
	TotCnt: {
		type: Number,
		required: true,
	},
	CurBlock: {
		type: Number,
		required: true,
	},
});

const emit = defineEmits(['page']);

const isPrevBlock = computed(() => {
	return { disabled: props.CurBlock == 1 };
});

const isPrevPage = computed(() => {
	return { disabled: props.CurPage == 1 };
});
const isNextPage = computed(() => {
	return { disabled: !(props.CurPage < props.PageCnt) };
});

const isNextBlock = computed(() => {
	return { disabled: !(props.CurBlock < props.PageCnt) };
});

const GoPage = no => {
	//console.log('no : ', no);
	emit('page', no);
};
</script>

<style lang="scss" scoped></style>
