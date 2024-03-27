<template>
	<div class="TitPage">
		<div>기관 <span>></span><span> 수정</span></div>
		<div></div>
	</div>

	<OrgForm :Item="Item">
		<template #actions>
			<div></div>
			<div>
				<button class="btn btn-primary me-2" @click="edit">수정</button>
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
import { useAlert } from '@/hooks/useAlert';

const { vAlert, vSuccess } = useAlert();

const Item = ref({
	id: 11,
	nm: 'cha',
	UserId: 'octauserid',
});

const router = useRouter();
const Go = (nm, q) => {
	router.push({ name: nm, query: q });
};

const edit = () => {
	vAlert('수정할까요수정할까요수정할까요수정할까요 ?');
};

// alert	************************
</script>

<style lang="scss" scoped></style>
@/hooks/alert
