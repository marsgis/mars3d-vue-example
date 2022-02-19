<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-checkbox v-model:checked="onCheckedTriangulation" @change="formStateChange">地形三角网</a-checkbox>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const onCheckedTriangulation = ref<boolean>(false)

const formStateChange = () => {
  mapWork.checkedTriangulation(onCheckedTriangulation.value)
}
</script>
