<template>
  <div class="map_tool_container">
    <mars-button  :class="{ active: activeValue === 1 }" @click="changeShowLayer(1)">效果一</mars-button>
    <mars-button  :class="{ active: activeValue === 2 }" @click="changeShowLayer(2)">效果二</mars-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const activeValue = ref(1)

const changeShowLayer = (value: number) => {
  activeValue.value = value
  mapWork.changeShowLayer(value)
}

</script>
<style scoped lang="less">
.map_tool_container {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;

  .mars-button {
    width: 68px;
    margin-right: 10px;
    background-color: rgba(39, 44, 54, 0.8);
  }

  .active {
    background-color: rgba(51, 133, 255, 1) !important;
  }

  .mars-button:last-child {
    margin-right: 0px
  }
}
</style>
