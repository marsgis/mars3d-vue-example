<template>
  <PannelBox class="infoView">
    <a-checkbox v-model:checked="onCheckedTriangulation" @change="formStateChange">地形三角网</a-checkbox>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const onCheckedTriangulation = ref<boolean>(false)

const formStateChange = () => {
  mapWork.checkedTriangulation(onCheckedTriangulation.value)
}
</script>
