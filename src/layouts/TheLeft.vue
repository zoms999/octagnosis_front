<template>
  <div class="mt-3">
    <div v-for="(item, index) in MenuList" :key="item.MenuId" class="Menu">
      <div
        :class="{
          Lvl1: item.Lvl == 1,
          Lvl2: item.Lvl == 2,
          Lvl3: item.Lvl == 3
        }"
        @click="GoPage(item.Src)"
      >
        <img src="@/assets/img/PointWhite_8.png" class="Dot" />{{ item.MenuNm }}
      </div>
    </div>
  </div>
  <hr class="w90p" style="border: 1px solid #ffffff; margin: 20px auto; background-color: #ffffff" />
  <div class="copyright">Copyright © 한국진로적성센터. All Rights Reserved.</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

/********************************/
const router = useRouter()
const MenuList = ref({})

MenuList.value = [
  { MenuId: '1', MenuNm: 'HOME', Lvl: 1, Src: 'home' },
  { MenuId: '2', MenuNm: '기업정보', Lvl: 1, Src: 'about' },
  { MenuId: '3', MenuNm: '매니저관리', Lvl: 1, Src: 'ManagerList' },
  { MenuId: '4', MenuNm: '문의글', Lvl: 1, Src: '' },
  { MenuId: '5', MenuNm: '검사결과', Lvl: 1, Src: '' },
  { MenuId: '6', MenuNm: '기관용', Lvl: 2, Src: '' },
  { MenuId: '7', MenuNm: '개인용', Lvl: 2, Src: '' },
  { MenuId: '8', MenuNm: '문항관리', Lvl: 1, Src: '' }
]

/********************************/

const GoPage = (name) => {
  router.push({
    name: name
  })
}
</script>

<style scoped>
.Menu > div {
  font-size: 1.2rem;
  cursor: pointer;
}
.Menu > div .Dot {
  margin: -2px 10px 0 0;
}

.Menu > div.Lvl1 {
  font-size: 1.3rem;
  margin: 2px 0 10px 20px;
}
.Menu > div.Lvl2 {
  font-size: 1.2rem;
  margin: 2px 0 8px 40px;
}
.Menu > div.Lvl3 {
  margin: 2px 0 8px 70px;
}
.copyright {
  font-size: 0.9rem;
  padding: 10px;
  color: rgb(220, 220, 220);
}
</style>
