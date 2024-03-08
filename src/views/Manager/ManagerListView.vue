<template>
  <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4" 
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

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import AppGrid from '@/components/app/AppGrid.vue';
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
