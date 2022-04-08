<template>
  <mars-pannel :visible="true" right="10" top="10" width="280">
    <a-collapse v-model:activeKey="activeKey">
      <!-- 自定义切换图标 -->
      <template #expandIcon>
        <mars-icon icon="down-c" class="icon-vertical-a" />
      </template>
      <a-collapse-panel key="1" header="单个裁剪面">
        <div class="f-mb">
          <a-space>
            <mars-button @click="drawLine">按绘制线裁剪</mars-button>
          </a-space>
        </div>

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

      <a-collapse-panel key="2" header="多个裁剪面">
        <div class="f-mb">
          <a-space>
            <mars-button @click="drawExtent">绘制矩形</mars-button>
            <mars-button @click="drawPoly">绘制面</mars-button>
            <mars-button @click="drawPoly2">绘制外切面</mars-button>
          </a-space>
        </div>
      </a-collapse-panel>

      <a-collapse-panel key="3" header="裁剪参数">
        <div style="width: 246px">
          <a-form-item label="裁剪距离">
            <a-space>
              <mars-slider @change="rangeDistance" v-model:value="distanceVal" :min="-20" :max="30" :step="1.0" />当前值{{ distanceVal }}
            </a-space>
          </a-form-item>

          <a-form-item label="斜切偏移量">
            <a-space>
              <mars-slider @change="rangeNormalZ" v-model:value="normalVal" :min="-10" :max="10" :step="0.1" />当前值{{ normalVal }}
            </a-space>
          </a-form-item>
        </div>
      </a-collapse-panel>
    </a-collapse>

    <mars-button @click="clear">清除</mars-button>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"

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
  width: 158px;
}
</style>
