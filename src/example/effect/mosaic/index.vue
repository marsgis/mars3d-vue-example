<template>
  <pannel class="infoView">
    <a-space>
      <span>启用:</span>
      <a-switch v-model:checked="checked" @change="isChecked" />
    </a-space>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const checked = ref(true)

const isChecked = () => {
  mapWork.chkShowEffect(checked.value)
}
</script>
