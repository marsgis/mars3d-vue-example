<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="setStyleDef">原始样式</mars-button>
      <mars-button @click="setStyle1">自定义效果1</mars-button>
      <mars-button @click="setStyle2">自定义效果2</mars-button>
      <mars-button @click="setStyle3">自定义效果3</mars-button>
      <mars-button @click="setStyle4">自定义效果4</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script lang="ts" setup>
import * as mapWork from "./map.js"

const setStyleDef = () => {
  mapWork.setStyleDef()
}
const setStyle1 = () => {
  mapWork.setStyle1()
}
const setStyle2 = () => {
  mapWork.setStyle2()
}
const setStyle3 = () => {
  mapWork.setStyle3()
}
const setStyle4 = () => {
  mapWork.setStyle4()
}
</script>
