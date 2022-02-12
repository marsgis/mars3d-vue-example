<template>
  <mars-pannel class="infoView">
    <a-space>
      <span>启用:</span>
      <a-switch v-model:checked="enabled" @change="onChangeState" />
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import * as mapWork from "./map.js"

const enabled = ref(true)

const onChangeState = () => {
  mapWork.setEffect(enabled.value)
}
</script>
