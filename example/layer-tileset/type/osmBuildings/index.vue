<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <mars-button @click="setStyle1">原始样式</mars-button>
        <mars-button @click="setStyle2">特效样式</mars-button>
      </a-space>
    </div>

    <div>
      <a-space>
        <span>按颜色着色:</span>
        <mars-color-picker @change="selectColor" v-model:value="color" />
      </a-space>
    </div>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const color = ref("#4B61E1")

const setStyle1 = () => {
  mapWork.setStyle1()
}
const setStyle2 = () => {
  mapWork.setStyle2()
}
const selectColor = () => {
  mapWork.selectColor(color.value)
}
</script>
