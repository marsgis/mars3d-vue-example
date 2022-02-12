<template>
  <mars-pannel class="infoView">
    <a-space> 显示每层颜色:<a-switch v-model:checked="checked" @change="chkShowColor" /> </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import * as mapWork from "./map.js"

const checked = ref(true)

const chkShowColor = () => {
  mapWork.chkShowColor(checked.value)
}
</script>
