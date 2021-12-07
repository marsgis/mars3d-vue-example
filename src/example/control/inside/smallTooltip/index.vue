<template>
  <PannelBox class="infoView">
    <a-checkbox v-model:checked="enabledSmallTooltip" @change="formStateChange">启用/禁用</a-checkbox>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const enabledSmallTooltip = ref<boolean>(true)
const formStateChange = () => {
  mapWork.enabledSmallTooltip(enabledSmallTooltip.value)
}
</script>
