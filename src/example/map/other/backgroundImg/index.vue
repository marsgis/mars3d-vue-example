<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="show">无</mars-button>
      <mars-button @click="show1">背景1</mars-button>
      <mars-button @click="show2">背景2</mars-button>
      <mars-button @click="show3">背景3</mars-button>
    </a-space>
  </pannel>
</template>

<script setup lang="ts">
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const show = () => {
  mapWork.show()
}
const show1 = () => {
  mapWork.show1()
}
const show2 = () => {
  mapWork.show2()
}
const show3 = () => {
  mapWork.show3()
}
</script>
