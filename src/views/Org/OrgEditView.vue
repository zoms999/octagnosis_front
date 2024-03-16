<template>
	<div class="TitPage">
		<div>기관 <span> - 수정</span></div>
		<div>
			<button class="btn btn-primary">저장</button>
			<button class="btn btn-primary" @click="Go('OrgList', {})">
				목록으로
			</button>
		</div>
	</div>

	<OrgForm :Item="Item"></OrgForm>
	<br /><br />
</template>

<script setup>
import { useRouter } from 'vue-router';
import OrgForm from '@/components/Org/OrgForm.vue';
import { ref } from 'vue';

const Item = ref({
	id: 11,
	nm: 'cha',
	UserId: 'octauserid',
});

const router = useRouter();
const Go = (nm, q) => {
	router.push({ name: nm, query: q });
};
</script>

<style lang="scss" scoped></style>
