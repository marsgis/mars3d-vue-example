<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <mars-button @click="btnDrawWall">竖立墙</mars-button>
          <mars-button @click="btnDrawRectangle">贴地矩形</mars-button>
          <mars-button title="根据中心点和长宽来计算矩形" @click="btnDrawPoint">贴地矩形2</mars-button>
          <mars-button @click="btnRemoveAll">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item label="方向">
        <a-slider v-model:value="formState.slideStep" @change="changeSlider" :min="0" :max="360" :step="1" />
      </a-form-item>

      <a-form-item label="文字">
        <a-space>
          <mars-input v-model:value="formState.inputText" />
          <mars-button @click="btnOK">确定</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  slideStep: number
  inputText: string
}
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  slideStep: 0,
  inputText: "Mars3D 火星科技 2021"
})
const changeSlider = () => {
  mapWork.changeSlider(formState.slideStep)
}

const btnDrawWall = () => {
  mapWork.btnDrawWall()
}
const btnDrawRectangle = () => {
  mapWork.btnDrawRectangle()
}
const btnDrawPoint = () => {
  mapWork.btnDrawPoint()
}
const btnRemoveAll = () => {
  mapWork.btnRemoveAll()
}
const btnOK = () => {
  mapWork.btnOK(formState.inputText)
}
</script>
