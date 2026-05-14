<template>
  <mars-dialog :nopadding="true" :visible="true" right="10" top="10" width="330">

    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-collapse :activeKey='["1", "2"]' expandIconPosition="end">
        <a-collapse-panel key="1" header="最短路径分析">
          <div class="f-mb">
            <a-space>
              <span>数据:</span>
              <mars-button @click="startPoint">绘制起点</mars-button>
              <mars-button @click="endPoint">绘制终点</mars-button>
              <mars-button @click="drawPolygon">绘制障碍面</mars-button>
            </a-space>
          </div>
          <div>
            <a-space>
              <span>计算:</span>
              <mars-button @click="shortestPath">最短路径</mars-button>
              <mars-button @click="clearAll">清除</mars-button>
            </a-space>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="其他算法示例">
          <mars-button href="editor-vue.html?id=thing/terrain/shortestPath">查看基于地形和最大坡度分析最短路径</mars-button>
        </a-collapse-panel>
      </a-collapse>
    </a-form>

  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import * as mapWork from "./map.js"



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
.mars-pannel-item-label {
  width: 30px;
}
</style>
