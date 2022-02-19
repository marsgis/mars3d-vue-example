<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="sunny">晴天</mars-button>
      <mars-button @click="sunsetGlow">晚霞</mars-button>
      <mars-button @click="blueSky">蓝天</mars-button>
      <mars-button @click="mr">默认</mars-button>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const sunny = () => {
  mapWork.sunny()
}

const sunsetGlow = () => {
  mapWork.sunsetGlow()
}
const blueSky = () => {
  mapWork.blueSky()
}

const mr = () => {
  mapWork.mr()
}
</script>
