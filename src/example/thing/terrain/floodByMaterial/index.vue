<template>
  <mars-pannel :visible="true" right="10" top="10" width="320">
    <div v-show="!isShow">
      <div class="f-mb">
        <a-space>
          <span>分析区域</span>
          <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
          <mars-button @click="btnDraw">绘制多边形</mars-button>
          <mars-button @click="clearDraw">清除</mars-button>
        </a-space>
      </div>

      <div class="f-mb">
        <a-space>
          <span>最低海拔</span>
          <mars-input-number v-model:value="formState.minHeight" :step="1" />米
        </a-space>
      </div>

      <div class="f-mb">
        <a-space>
          <span>最高海拔</span>
          <mars-input-number v-model:value="formState.maxHeight" :step="1" />米
        </a-space>
      </div>
      <div class="f-mb">
        <a-space>
          <span>淹没速度</span>
          <mars-input-number v-model:value="formState.speed" :step="1" />米/秒
        </a-space>
      </div>

      <div class="f-tac">
        <mars-button @click="begin">开始分析</mars-button>
      </div>
    </div>

    <div v-show="isShow">
      <div class="f-mb">
        <a-space>
          <span>高度选择</span>
          <a-slider v-model:value="formState.height" @change="onChangeHeight()" :min="0" :max="1000" :step="0.1" />
        </a-space>
      </div>

      <div class="f-mb">
        <span>当前高度:{{ formState.height }}</span>
      </div>

      <div class="f-tac">
        <a-space>
          <mars-button @click="startPlay">{{ isStart ? "暂停" : "播放" }}</mars-button>
          <mars-button @click="goBack">返回</mars-button>
        </a-space>
      </div>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  minHeight: any
  maxHeight: any
  speed: number
  height: number
}

const formState: UnwrapRef<FormState> = reactive({
  minHeight: "",
  maxHeight: "",
  height: 0,
  speed: 80
})

const isStart = ref(true)
const isShow = ref(false)

let floodByMaterial: any

mapWork.eventTarget.on("loadOk", (e: any) => {
  floodByMaterial = e.floodByMaterial
  floodByMaterial.speed = Number(formState.speed)
})

// 监听到高度发生变化
mapWork.eventTarget.on("heightChange", (e: any) => {
  formState.height = e.height.toFixed(1)
})

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent((min: any, max: any) => {
    if (floodByMaterial.length > 0) {
      min = Math.min(min, Number(formState.minHeight))
      max = Math.max(max, Number(formState.maxHeight))
    }

    formState.minHeight = min
    formState.maxHeight = max
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

  formState.minHeight = ""
  formState.maxHeight = ""
}

// 开始淹没
const begin = () => {
  isShow.value = true
  mapWork.begin(formState)
}

// 高度改变
const onChangeHeight = () => {
  mapWork.onChangeHeight(formState.height)
}

// 默认自动播放
const startPlay = () => {
  isStart.value = !isStart.value
  mapWork.startPlay()
}

const goBack = () => {
  mapWork.clearDraw()
  formState.minHeight = ""
  formState.maxHeight = ""
  isShow.value = false
  isStart.value = true
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 200px;
}
</style>
