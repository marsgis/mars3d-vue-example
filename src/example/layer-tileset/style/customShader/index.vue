<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="setStyleDef">原始样式</mars-button>
      <mars-button @click="setStyle1">自定义效果1</mars-button>
      <mars-button @click="setStyle2">自定义效果2</mars-button>
    </a-space>
  </pannel>
</template>

<script lang="ts" setup>
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const setStyle1 = () => {
  mapWork.setStyle1()
}
const setStyle2 = () => {
  mapWork.setStyle2()
}
const setStyleDef = () => {
  mapWork.setStyleDef()
}
</script>
