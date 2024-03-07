<template>
  <!-- <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" @click="fetchManagers">등록</button>
    </div>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>No</th>
          <th>이름</th>
          <th>나이</th>
          <th>프로필</th>
          <th>No</th>
          <th>mngrId</th>
          <th>useYn</th>
          <th>email</th>
          <th>mngrNm</th>
          <th>phone</th>
          <th>tel</th>
          <th>authPersn</th>
          <th>authRsltView</th>
          <th>authAdmin</th>
          <th>authLogView</th>
          <th>authStati</th>
          <th>authBbs</th>
          <th>authOrg</th>
          <th>insDt</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(manager, index) in managers" :key="index">
          <td>{{ manager.mngrId }}</td>
          <td>{{ manager.useYn }}</td>
          <td>{{ manager.email }}</td>
          <td>{{ manager.mngrNm }}</td>
          <td>{{ manager.phone }}</td>
          <td>{{ manager.tel }}</td>
          <td>{{ manager.authPersn }}</td>
          <td>{{ manager.authRsltView }}</td>
          <td>{{ manager.authAdmin }}</td>
          <td>{{ manager.authLogView }}</td>
          <td>{{ manager.authStati }}</td>
          <td>{{ manager.authBbs }}</td>
          <td>{{ manager.authOrg }}</td>
          <td>{{ manager.insDt }}</td>
        </tr>
      </tbody>
    </table>
  </div> -->

  <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
    <template v-slot="{ item }">
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

// export default {
//   setup() {
//     const managers = ref([]);

//     const fetchManagers = async () => {
//       try {
//         const response = await axios('http://localhost:8080/managers/');  
//         console.log(response.data);
//         managers.value =response.data;
//       } catch (error) {
//         console.error('Error fetching managers:', error);
//       }
//     };
//     fetchManagers();
//     return {
//       managers,
//       fetchManagers
//     };
//   }
// }
</script>

<style  scoped>
</style>
