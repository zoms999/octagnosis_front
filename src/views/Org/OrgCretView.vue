<template>
	<div class="TitPage">
		<div>기관 <span>></span><span>등록</span></div>
		<div></div>
	</div>
	<OrgForm :Item="Item">
		<template #actions>
			<div></div>
			<div>
				<button class="btn btn-primary me-2">등록</button>
				<button class="btn btn-primary" @click="Go('OrgList', {})">
					목록으로
				</button>
			</div>
		</template>
	</OrgForm>
	<br /><br />
</template>

<script setup>
import { useRouter } from 'vue-router';
import OrgForm from '@/components/Org/OrgForm.vue';
import { ref } from 'vue';
const router = useRouter();

const Item = ref({
	id: '',
	nm: '',
	UserId: '',
});

const Go = (nm, q) => {
	router.push({ name: nm, query: q });
};
</script>

<style lang="scss" scoped></style>
