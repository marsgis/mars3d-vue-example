<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state />

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">方法演示:</span>
        <mars-button class="bounce-btn" @click="onClickStartBounce">开始弹跳</mars-button>
        <mars-button class="bounce-btn" @click="onClickStopBounce">停止弹跳</mars-button>
      </a-space>
      <mars-button class="stop-bounce-btn" @click="onClickStartBounce2">开始弹跳（自动停止）</mars-button>

    </div>
  </mars-dialog>

  <location-to />
</template>

<script setup lang="ts">
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import * as mapWork from "./map.js"

const onClickStartBounce = () => {
  mapWork.onClickStartBounce()
}
const onClickStartBounce2 = () => {
  mapWork.onClickStartBounce2()
}
const onClickStopBounce = () => {
  mapWork.onClickStopBounce()
}
</script>

<style lang="less" scoped>
.bounce-btn {
  width: 110px;
}

.stop-bounce-btn {
  width: 228px;
  margin-top: 10px;
  margin-left: 68px;
}
</style>
