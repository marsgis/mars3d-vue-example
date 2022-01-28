<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="show1">背景1</mars-button>
      <mars-button @click="show2">背景2</mars-button>
      <mars-button @click="show3">背景3</mars-button>
      <mars-button @click="show4">背景4</mars-button>
      <mars-button @click="show5">背景5</mars-button>
      <mars-button @click="show6">背景6</mars-button>
    </a-space>
  </pannel>
</template>

<script setup lang="ts">
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const show1 = () => {
  mapWork.show1()
}

const show2 = () => {
  mapWork.show2()
}
const show3 = () => {
  mapWork.show3()
}

const show4 = () => {
  mapWork.show4()
}

const show5 = () => {
  mapWork.show5()
}
const show6 = () => {
  mapWork.show6()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
