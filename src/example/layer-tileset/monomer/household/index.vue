<template>
  <pannel class="infoView">
    <a-space> 显示每户颜色:<a-switch v-model:checked="checked" @change="chkShowColor" /> </a-space
  ></pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const checked = ref(true)

const chkShowColor = () => {
  mapWork.chkShowColor(checked.value)
}
</script>
