<template>
  <mars-dialog :nopadding="true" :visible="true" right="10" top="10" width="330">

    <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-collapse :activeKey='["1", "2"]' expandIconPosition="end">
        <a-collapse-panel key="1" header="障碍面找路径">
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
        <a-collapse-panel key="2" header="地形找路径">
          <div class="f-mb">
            <a-space>
              <span>数据:</span>
              <mars-button @click="startPoint">绘制起点</mars-button>
              <mars-button @click="endPoint">绘制终点</mars-button>
              <mars-button @click="drawComputePolygon">绘制计算面</mars-button>
            </a-space>
          </div>
          <a-form class="p-14">
            <a-form-item label="最大坡度">
              <mars-input-number v-model:value="formState.maxSlope"
                :step="1">可以通过的最大坡度</mars-input-number>
            </a-form-item>
            <a-form-item>
              <template #label>
                <span title="数值越大越精确，过大会导致卡顿">插值数</span>
              </template>
              <mars-input-number v-model:value="formState.splitNum" :step="0.001"> </mars-input-number>
            </a-form-item>
          </a-form>
          <div>
            <a-space>
              <span>计算:</span>
              <mars-button @click="shortPathByTerrain">根据地形计算</mars-button>
              <mars-button @click="clearAll">清除</mars-button>
            </a-space>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </a-form>

  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import * as mapWork from "./map.js"

const formState = reactive({
  splitNum: 20,
  maxSlope: 20 //  可以通过的最大坡度，通过调整maxSlope，可以控制哪些地形可以走
})

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

// 根据地形计算最短路径
const shortPathByTerrain = () => {
  mapWork.shortPathByTerrain(formState)
}

// 绘制需要计算路径的面
const drawComputePolygon = () => {
  mapWork.drawComputePolygon()
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
