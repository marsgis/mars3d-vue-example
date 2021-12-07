<template>
  <PannelBox class="infoView">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="绘制坐标">
        <!-- 自定义面板右侧图标 -->
        <template #extra>
          <icon-config theme="outline" />
        </template>
        <div class="f-mb">
          <a-space>
            <mars-button @click="drawLine">绘制线</mars-button>
            <mars-button @click="drawExtent">绘制矩形</mars-button>
            <mars-button @click="drawPoly">绘制面</mars-button>
          </a-space>
        </div>
        <mars-button @click="drawPoly2">绘制面(外切)</mars-button>
      </a-collapse-panel>

      <a-collapse-panel key="2" header="按正方向">
        <!-- 自定义面板右侧图标 -->
        <template #extra>
          <icon-config theme="outline" />
        </template>
        <div class="f-mb">
          <a-space>
            <mars-button @click="clipping1">切顶部</mars-button>
            <mars-button @click="clipping2">切底部</mars-button>
            <mars-button @click="clipping3">切东向</mars-button>
          </a-space>
        </div>

        <div class="f-mb">
          <a-space>
            <mars-button @click="clipping4">切西向</mars-button>
            <mars-button @click="clipping5">切南向</mars-button>
            <mars-button @click="clipping6">切北向</mars-button>
          </a-space>
        </div>
      </a-collapse-panel>

      <a-collapse-panel key="3" header="裁剪距离">
        <!-- 自定义面板右侧图标 -->
        <template #extra>
          <icon-config theme="outline" />
        </template>
        <a-space> <a-slider @change="rangeDistance" v-model:value="distanceVal" :min="-20" :max="30" :step="1.0" />当前值{{ distanceVal }} </a-space>
      </a-collapse-panel>

      <a-collapse-panel key="4" header="斜切偏移量">
        <!-- 自定义面板右侧图标 -->
        <template #extra>
          <icon-config theme="outline" />
        </template>
        <a-space> <a-slider @change="rangeNormalZ" v-model:value="normalVal" :min="-10" :max="10" :step="0.1" />当前值{{ normalVal }} </a-space>
      </a-collapse-panel>
    </a-collapse>
    <mars-button @click="clear">清除</mars-button>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
 import * as mapWork from "./map.js"

const activeKey = ref(["1", "2", "3", "4"])
const distanceVal = ref<number>(0)
const normalVal = ref<number>(0)

const clear = () => {
  mapWork.clear()
}

// 距离
const rangeDistance = () => {
  mapWork.rangeDistance(distanceVal.value)
}
// 偏移量
const rangeNormalZ = () => {
  mapWork.rangeNormalZ(normalVal.value)
}

// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}

// 绘制矩形
const drawExtent = () => {
  mapWork.drawExtent()
}

// 绘制面
const drawPoly = () => {
  mapWork.drawPoly()
}

// 绘制面(外切)
const drawPoly2 = () => {
  mapWork.drawPoly2()
}

const clipping1 = () => {
  mapWork.clipping1()
}

const clipping2 = () => {
  mapWork.clipping2()
}

const clipping3 = () => {
  mapWork.clipping3()
}

const clipping4 = () => {
  mapWork.clipping4()
}

const clipping5 = () => {
  mapWork.clipping5()
}

const clipping6 = () => {
  mapWork.clipping6()
}
</script>
<style scoped lang="less">
.infoView {
  width: 268px;
}
.ant-slider {
  width: 160px;
}
</style>
