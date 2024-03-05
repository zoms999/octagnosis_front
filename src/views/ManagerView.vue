<template>
 <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
    </div>
    <table class="w3-table-all">
      <thead>
      <tr>
        <th>No</th>
        <th>제목</th>
        <th>이름</th>
        <th>휴대폰</th>
      </tr>
      </thead>
      <tbody>
      <tr >
        <td>1</td>
        <td>제목</td>
        <td>루이스</td>
        <td>000</td>
      </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script >
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>