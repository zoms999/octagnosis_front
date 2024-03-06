<template>
  <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" @click="fetchManagers">등록</button>
    </div>
    <table class="w3-table-all">
      <thead>
        <tr>
          <th>No</th>
          <th>이름</th>
          <th>휴대폰</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(manager, index) in managers" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ manager.name }}</td>
          <td>{{ manager.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const managers = ref([]);

    const fetchManagers = async () => {
      try {
        const response = await axios.get('/api/managers');  
        managers.value = response.data;
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    };

    return {
      managers,
      fetchManagers
    };
  }
}
</script>

<style  scoped>
</style>
