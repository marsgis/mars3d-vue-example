<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <span>启用:</span>
      <a-switch v-model:checked="enabled" @change="onChangeState" />
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const enabled = ref(true)

const onChangeState = () => {
  mapWork.setMosaicEffect(enabled.value)
}
</script>
