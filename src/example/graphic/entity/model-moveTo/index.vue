<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">整体控制:</span>
        <mars-button @click="openFloorModel">展开</mars-button>
        <mars-button @click="mergeFloorModel">合并</mars-button>
        <mars-button @click="resetModel">还原</mars-button>
      </a-space>
    </div>

    <!-- <div> -->
    <span class="pannel-item-label">显示指定:</span>
    <a-space class="floor">
      <div :key="item" v-for="(item, index) in floorModel">
        <mars-button @click="showFloorModel(index)">{{ item }}</mars-button>
      </div>
    </a-space>
    <!-- </div> -->
  </pannel>
</template>

<script setup lang="ts">
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const floorModel = ["一楼", "二楼", "三楼", "四楼", "五楼", "六楼", "七楼", "八楼", "九楼", "顶楼"]

const openFloorModel = () => {
  mapWork.openFloorModel()
}
const mergeFloorModel = () => {
  mapWork.mergeFloorModel()
}
const resetModel = () => {
  mapWork.resetModel()
}
const showFloorModel = (floorNum: number) => {
  mapWork.showFloorModel(floorNum + 1)
}
</script>
<style scoped lang="less">
.infoView {
  width: 335px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
.pannel-item-label {
  display: inline-block;
}
.floor {
  margin-left: 78px;
  margin-top: -7px;
}
</style>
