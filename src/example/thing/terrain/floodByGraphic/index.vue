<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">分析区域</span>
        <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
        <mars-button @click="btnDraw">绘制多边形</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">最低海拔（米）</span>
        <mars-input-number v-model:value="formState.minHeight" :step="1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">最高海拔（米）</span>
        <mars-input-number v-model:value="formState.maxHeight" :step="1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">淹没速度（米/秒）</span>
        <mars-input-number v-model:value="formState.speed" :step="1" />
      </a-space>
    </div>

    <div class="f-tac">
      <a-space>
        <mars-button @click="begin">开始分析</mars-button>
        <mars-button @click="clearDraw">清除</mars-button>
      </a-space>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  minHeight: any
  maxHeight: any
  speed: number
}

const formState: UnwrapRef<FormState> = reactive({
  minHeight: 0,
  maxHeight: 0,
  speed: 10
})

mapWork.eventTarget.on("loadOk", (e: any) => {
  e.floodByGraphic.speed = Number(formState.speed)
})

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent((min: any, max: any) => {
    formState.minHeight = Math.ceil(min)
    formState.maxHeight = Math.ceil(max)
  })
}
// 添加多边形
const btnDraw = () => {
  mapWork.btnDraw((min: any, max: any) => {
    formState.minHeight = Math.ceil(min)
    formState.maxHeight = Math.ceil(max)
  })
}
const clearDraw = () => {
  mapWork.clearDraw()

  formState.minHeight = 0
  formState.maxHeight = 0
}

// 开始淹没
const begin = () => {
  mapWork.begin(formState)
}
</script>
<style scoped lang="less">
.infoView {
  width: 320px;
}
.mars-pannel-item-label {
  width: 100px;
}
</style>
