<template>
  <mars-dialog :visible="true" right="10" top="10" width="200">
    <a-radio-group @change="changeMouseModel" v-model:value="radioValue">
      <a-radio :value="1">Cesium操作习惯</a-radio>
      <a-radio :value="2">更换中键和右键 </a-radio>
      <a-radio :value="3">设置左键缩放 </a-radio>
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
