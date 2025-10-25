<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span>数据:</span>
        <mars-button @click="startPoint">绘制起点</mars-button>
        <mars-button @click="endPoint">绘制终点</mars-button>
      </a-space>
    </div>
    <a-form class="p-14">
      <a-form-item label="最大坡度">
        <mars-input-number v-model:value="formState.maxSlope" :step="1" unit="度">可以通过的最大坡度</mars-input-number>
      </a-form-item>
      <a-form-item>
        <template #label>
          <span title="数值越大越精确，过大会导致卡顿">网格数</span>
        </template>
        <mars-input-number v-model:value="formState.splitNum" :step="1"> </mars-input-number>
      </a-form-item>
    </a-form>
    <div>
      <a-space>
        <span>计算:</span>
        <mars-button @click="shortPathByTerrain">根据地形计算</mars-button>
        <mars-button @click="clearAll">清除</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import * as mapWork from "./map.js"

const formState = reactive({
  splitNum: 200,
  maxSlope: 15 //  可以通过的最大坡度，通过调整maxSlope，可以控制哪些地形可以走
})

// // 绘制障碍面
// const drawPolygon = () => {
//   mapWork.drawPolygon()
// }
// 绘制起点
const startPoint = () => {
  mapWork.startPoint()
}
// 绘制终点
const endPoint = () => {
  mapWork.endPoint()
}


// 根据地形计算最短路径
const shortPathByTerrain = () => {
  mapWork.shortPathByTerrain(formState)
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
