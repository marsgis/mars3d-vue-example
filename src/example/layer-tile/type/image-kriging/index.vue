<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <tile-layer-state />
    <div class="color-area">
      获取到的颜色： <div class="color-box"></div>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import TileLayerState from "@mars/components/mars-sample/tile-layer-state.vue"
import * as mapWork from "./map.js"

mapWork.eventTarget.on("changeColor", ({ color }) => {
  // @ts-ignore
  document.querySelector(".color-box").style.backgroundColor = color
})
</script>

<style lang="less" scoped>
.color-area {
  display: flex;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
  .color-box {
  height: 30px;
  width: 100px;
  background-color: #fff;
}
}
</style>
