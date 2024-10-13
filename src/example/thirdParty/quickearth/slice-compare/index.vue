
<template>
   <mars-dialog :visible="true" right="10" bottom="10" width="50">
    <span class="mars-pannel-item-label">高度：米</span>

    <div class="model-button-contain" :key="item" v-for="(item) in floorModel">
      <mars-button @click="setActiveHighIdx(item.idx)">{{ item.label }}</mars-button>
    </div>

  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const floorModel = ref([])


mapWork.eventTarget.on("dataLoaded", function(event) {
  for (let index = event.zValues.length - 1; index >= 0; index--) {
    const element = event.zValues[index]
    floorModel.value.push({ label: element, idx: index })
  }
})

const setActiveHighIdx = (index) => {
  mapWork.setActiveHighIdx(index)
}
</script>

<style scoped lang="less">
:deep(.ant-space) {
  flex-wrap: wrap;
}
.mars-pannel-item-label {
  display: inline-block;
}

.model-button-contain {
  float: right;
  .mars-button {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
