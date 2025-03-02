<template>
  <mars-dialog :visible="true" right="10" bottom="10" width="50">
    <a-space direction="vertical">
      <div>高度：米</div>

      <div :key="item" v-for="(item) in floorModel">
        <mars-button @click="setActiveHighIdx(item.idx)">{{ item.label }}</mars-button>
      </div>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as mapWork from "./map.js"

const floorModel = ref([])

onMounted(() => {
  mapWork.createControl("centerDiv3D")
})

mapWork.eventTarget.on("dataLoaded", function (event) {
  for (let index = event.zValues.length - 1; index >= 0; index--) {
    const element = event.zValues[index]
    floorModel.value.push({ label: element, idx: index })
  }
})

const setActiveHighIdx = (index) => {
  mapWork.setActiveHighIdx(index)
}
</script>
