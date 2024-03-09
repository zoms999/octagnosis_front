<template>
			<hr class="my-4" />

<AppLoading v-if="loading" />

<AppError v-else-if="error" :message="error.message" />

<template v-else-if="!isExist">
	<p class="text-center py-4 text-muted">No Results</p>
</template>
<template v-else>
	<AppGrid :items="posts" col-class="col-12" 
	>
    <template v-slot="{ item }" >
			<ManagerItem
						:mngrId="item.mngrId"
						:useYn="item.useYn"
						:email="item.email"
						:mngrNm="item.mngrNm"
						:phone="item.phone"
						:tel="item.tel"
						:authPersn="item.authPersn"
						:authRsltView="item.authRsltView"
						:authAdmin="item.authAdmin"
						:authLogView="item.authLogView"
						:authStati="item.authStati"
						:authBbs="item.authBbs"
						:authOrg="item.authOrg"
						:insDt="item.insDt"
						@click="goPage(item.mngrId)"
				></ManagerItem>
    </template>
  </AppGrid>
	</template>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import ManagerItem from '@/components/manager/ManagerItem.vue';

const router = useRouter();
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 6,
	title_like: '',
});

const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/api/managers', { params });
const isExist = computed(() => posts.value && posts.value.length > 0);
const goPage = mngrId => {
	// router.push(`/manager/${mngrId}`);
	router.push({
		name: 'ManagerDetail',
		params: {
			mngrId,
		},
	});
};

</script>

<style  scoped>
</style>
