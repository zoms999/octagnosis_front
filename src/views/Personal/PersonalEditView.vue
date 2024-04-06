<template>
	<div>
		<PersonalEditForm :personal="personal"> </PersonalEditForm>
	</div>
</template>

<script setup>
import { ref } from 'vue';
//import { getPostById, updatePost } from '@/api/managers';
import PersonalEditForm from '@/components/personal/PersonalEditForm.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/hooks/useAlert';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import axios from 'axios';
const store = useAuthStore();
const { userMngrId } = storeToRefs(store);
const { vAlert, vSuccess } = useAlert();
const router = useRouter();
const route = useRoute();
const persnId = route.params.persnId;
const personal = ref([]);
console.log('goEditPage -- > ' + persnId);

const getPersnByPersnIdAndType = async () => {
	try {
		const response = await axios.post(
			'/api/personal/getPersnByPersnIdAndType',
			{
				persnId: persnId,
			},
		);
		personal.value = response.data.Personal;
		console.log('Response:', response.data.Personal); // Log the response
	} catch (error) {
		console.error('Error checking email duplication:', error);
		alert('An error occurred while checking email duplication.');
	}
};

getPersnByPersnIdAndType();
</script>

<style lang="scss" scoped></style>
