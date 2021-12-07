<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="show">无</mars-button>
      <mars-button @click="show1">背景1</mars-button>
      <mars-button @click="show2">背景2</mars-button>
      <mars-button @click="show3">背景3</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
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
