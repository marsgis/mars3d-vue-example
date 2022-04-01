<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="addLayer">叠加图层</mars-button>
      <mars-button @click="removeLayer">移除图层</mars-button>

      <a-space>
        <span>颜色:</span>
        <mars-color-picker @change="selectColor" v-model:value="color" />
      </a-space>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"
import { useWidget } from "@mars/widgets/common/store/widget"

const { activate } = useWidget()

const addLayer = () => {
  mapWork.addLayer()
}

const removeLayer = () => {
  mapWork.removeLayer()
}


const color = ref("#4e70a6")
const selectColor = () => {
  mapWork.setFilterColor(color.value)
}
</script>
