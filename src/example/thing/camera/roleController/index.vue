<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      提示： <br />
      1）点击开启角色控制，在地图上左键点击初始化模型位置<br />
      2）通过W/S/A/D和鼠标控制人物移动和视角<br />
    </div>
    <a-space>
      <mars-button class="btn" @click="startController">开启角色控制</mars-button>
      <mars-button class="btn" @click="stopController">关闭角色控制</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script lang="ts" setup>
import * as mapWork from "./map.js"

let canClick = true

const startController = () => {
  setTimeout(() => {
    canClick = true
  }, 500)
  if (canClick) {
    mapWork.startController()
    canClick = false
  }
}

const stopController = () => {
  mapWork.stopController()
}
</script>
<style lang="less" scoped>
.btn {
  width:146px;
}
</style>
