<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-form-item label="演示数据:">
        <a-space>
          <mars-button @click="loadEarthData">全球区域</mars-button>
          <mars-button @click="loadDongnanData">局部区域</mars-button>
        </a-space>
      </a-form-item>
    </div>

    <div class="f-mb">
      <a-form-item label="粒子个数:">
        <mars-slider v-model:value="formState.count" @change="changeCount" :min="1000" :max="9000" :step="1" />
      </a-form-item>
    </div>

    <div class="f-mb">
      <a-space>
        <a-form-item label="存活时间:">
          <mars-slider v-model:value="formState.age" @change="changeAge" :min="10" :max="150" :step="1" />
        </a-form-item>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <a-form-item label="移动速率:">
          <mars-slider v-model:value="formState.speed" @change="changeSpeed" :min="1" :max="100" :step="1" />
        </a-form-item>
      </a-space>
    </div>

    <div class="f-mb">
      <a-form-item label="线宽度:">
        <mars-slider v-model:value="formState.linewidth" @change="changeLinewidth" :min="1" :max="6" :step="0.1" />
      </a-form-item>
    </div>

    <div class="f-mb">
      <a-form-item label="线颜色:">
        <mars-color-picker v-model:value="formState.color" @change="changeColor" />
      </a-form-item>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  count: number
  age: number
  speed: number
  linewidth: number
  color: string
}

const formState: UnwrapRef<FormState> = reactive({
  count: 4096,
  age: 10,
  speed: 10,
  linewidth: 1,
  color: "#4696db"
})

// 滑动条事件
// 修改粒子数量
const changeCount = () => {
  mapWork.changeCount(formState.count)
}

// 修改存活时间
const changeAge = () => {
  mapWork.changeAge(formState.age)
}

// 修改移动速率
const changeSpeed = () => {
  mapWork.changeSpeed(formState.speed)
}
// 修改线宽
const changeLinewidth = () => {
  mapWork.changeLinewidth(formState.linewidth)
}
// 修改颜色
const changeColor = (e) => {
  mapWork.changeColor(formState.color)
}

// 全球加载数据
const loadEarthData = () => {
  mapWork.loadEarthData()
}
// 局部加载数据
const loadDongnanData = () => {
  mapWork.loadDongnanData()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 214px;
}
</style>
