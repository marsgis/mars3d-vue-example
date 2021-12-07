<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="viewSeeTop">顶视图</mars-button>
      <mars-button @click="viewSeeCe">侧视图</mars-button>
      <mars-button @click="viewSeeHome">主视图</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const viewSeeTop = () => {
  mapWork.viewSeeTop()
}

const viewSeeCe = () => {
  mapWork.viewSeeCe()
}

const viewSeeHome = () => {
  mapWork.viewSeeHome()
}
</script>
