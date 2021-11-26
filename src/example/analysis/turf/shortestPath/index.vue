<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">数据:</span>
          <mars-button @click="drawPolygon">绘制障碍面</mars-button>
          <mars-button @click="startPoint">绘制起点</mars-button>
          <mars-button @click="endPoint">绘制终点</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">计算:</span>
          <mars-button @click="shortestPath">最短路径</mars-button>
          <mars-button @click="clearAll">清除</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

// 绘制障碍面
const drawPolygon = () => {
  mapWork.drawPolygon()
}
// 绘制起点
const startPoint = () => {
  mapWork.startPoint()
}
// 绘制终点
const endPoint = () => {
  mapWork.endPoint()
}
// 计算最短路径
const shortestPath = () => {
  mapWork.shortestPath()
}
// 清除
const clearAll = () => {
  mapWork.clearLayer()
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 30px;
}
</style>
