<template>
  <mars-dialog :visible="true" right="10" top="10" width="400">
    <a-radio-group @change="changeMouseModel" v-model:value="radioValue">
      <a-radio :value="1">左键平移+中键旋转+右键缩放（Cesium操作习惯）</a-radio>
      <a-radio :value="2">左键平移+中键缩放+右键旋转（中右键互换）</a-radio>
      <a-radio :value="3">左键旋转+中键平移+右键缩放（自定义设置演示）</a-radio>
    </a-radio-group>
  </mars-dialog>
  <location-to />
</template>

<script setup lang="ts">
import { ref } from "vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import * as mapWork from "./map.js"

const radioValue = ref<number>(1)

const changeMouseModel = () => {
  mapWork.changeMouseModel(radioValue.value)
}
</script>
