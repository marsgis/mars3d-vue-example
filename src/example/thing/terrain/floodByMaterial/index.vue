<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div v-show="!isShow">
      <div class="f-mb">
        <a-space>
          <span class="text-default">最低海拔:</span>
          <mars-input-number v-model:value="formState.minHeight" :step="1" addon-after="米" />
        </a-space>
      </div>

      <div class="f-mb">
        <a-space>
          <span class="text-default">最高海拔:</span>
          <mars-input-number v-model:value="formState.maxHeight" :step="1" addon-after="米" />
        </a-space>
      </div>
      <div class="f-mb">
        <a-space>
          <span class="text-default">淹没速度:</span>
          <mars-input-number v-model:value="formState.speed" :step="1" addon-after="米/秒" />
        </a-space>
      </div>

      <div class="f-push-20-b">
        <a-space>
          <span class="text-default">淹没颜色:</span>
          <mars-color-picker v-model:value="floodColor" @change="onChangeColor" />
        </a-space>

      </div>

      <div class="f-mb">
        <div class="draw-tools">
          <a-space>
            <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
            <mars-button @click="btnDraw">绘制多边形</mars-button>
            <mars-button type="primary" danger @click="clearDraw">清除</mars-button>
          </a-space>
        </div>

      </div>

      <div class="f-tac">
        <mars-button class="analysis-btn" @click="begin">开始分析</mars-button>
      </div>
    </div>

    <div v-show="isShow">
      <div class="f-mb">
        <a-space>
          <span class="text-default">高度选择</span>
          <mars-slider tooltipPlacement="bottom" v-model:value="formState.height" @change="onChangeHeight()"
            :min="formState.minHeight" :max="formState.maxHeight" :step="1" />
        </a-space>
      </div>

      <div class="f-mb">
        <a-space>
          <span class="text-default">淹没颜色:</span>
          <mars-color-picker v-model:value="floodColor" @change="onChangeColor" />
          <!-- <span>当前高度:{{ formState.height }}</span> -->
        </a-space>
      </div>

      <div class="f-tac control-btn">
        <a-space>
          <mars-button :class="isStart ? 'pause-btn' : 'play-btn'" @click="startPlay">
            <mars-icon v-if="!isStart" icon="play"></mars-icon>
            <mars-icon v-else icon="pause-one"></mars-icon>
            {{ isStart ? "暂停" : "播放" }}
          </mars-button>

          <mars-button @click="goBack">返回</mars-button>
        </a-space>
      </div>

      <div class="f-pt">
        <a-checkbox v-model:checked="formState.enabledShowElse" @change="onChangeElse">显示非淹没区域</a-checkbox>
      </div>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  minHeight: number
  maxHeight: number
  speed: number
  height: number
  enabledShowElse: boolean
}

const formState: UnwrapRef<FormState> = reactive({
  minHeight: 0,
  maxHeight: 0,
  height: 0,
  speed: 80,
  enabledShowElse: true
})

const isStart = ref(true)
const isShow = ref(false)

const floodColor = ref("rgba(0, 123, 230, 0.5)")

// 监听到高度发生变化
mapWork.eventTarget.on("heightChange", (e: any) => {
  isShow.value = true
  formState.height = Math.ceil(e.height)
})

// 监听淹没完成
mapWork.eventTarget.on("floodEnd", (e: any) => {
  isStart.value = false
})

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent((min: any, max: any) => {
    formState.minHeight = min
    formState.maxHeight = max
  }, floodColor.value)
}
// 添加多边形
const btnDraw = () => {
  mapWork.btnDraw((min: any, max: any) => {
    formState.minHeight = Math.ceil(min)
    formState.maxHeight = Math.ceil(max)
  }, floodColor.value)
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

// 高度改变
const onChangeHeight = () => {
  mapWork.onChangeHeight(formState.height)
}

// 颜色修改
const onChangeColor = (e) => {
  mapWork.onChangeColor(floodColor.value)
}

// 默认自动播放
const startPlay = () => {
  isStart.value = !isStart.value
  mapWork.startPlay()
}

const goBack = () => {
  mapWork.clearDraw()
  formState.minHeight = 0
  formState.maxHeight = 0
  isShow.value = false
  isStart.value = true
  formState.enabledShowElse = true
}

const onChangeElse = () => {
  mapWork.onChangeElse(formState.enabledShowElse)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 224px;
}

.text-default {
  color: #EAF2FF;
}

.analysis-btn {
  width: 298px;
}

.mars-input-number,
.mars-color-view {
  width: 232px;
}


.draw-tools {
  .mars-button {
    width: 94px;
  }
}

.control-btn {
  .pause-btn {
    background: #2CC719;

    &:hover {
      background: #2CC719;
    }
  }

  .play-btn {
    background: #F96868;

    &:hover {
      background: #F96868;
    }
  }

  .mars-button {
    width: 146px;
  }
}
</style>
