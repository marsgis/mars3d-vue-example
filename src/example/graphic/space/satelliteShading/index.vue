<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item label="卫星张角:">
        <a-slider @change="changeAngle" v-model:value="formState.slideAngle" :min="1" :max="70" :step="1" />
      </a-form-item>

      <a-form-item label="开始时间:">
        <mars-date-picker v-model:value="startTime" format="YYYY-MM-DD HH:mm:ss" :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }" />
      </a-form-item>
      <a-form-item label="结束时间:">
        <mars-date-picker v-model:value="endTime" format="YYYY-MM-DD HH:mm:ss" :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }" />
      </a-form-item>

      <a-form-item label="区域颜色:">
        <mars-color-picker @change="changeColorOpacity" v-model:value="formState.areaColor" />
      </a-form-item>

      <a-form-item label="区域透明度:">
        <a-slider @change="changeColorOpacity" v-model:value="formState.slideOpacity" :min="0.01" :max="1.0" :step="0.01" />
      </a-form-item>

      <a-form-item>
        <a-space>
          <mars-button @click="btnAdd">计算成像区域</mars-button>
          <mars-button @click="btnRemoveAll">清除所有</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-checkbox v-model:checked="formState.guidaoS" @change="changeGuidaoS">升轨</a-checkbox>
        <a-checkbox v-model:checked="formState.guidaoJ" @change="changeGuidaoJ">降轨</a-checkbox>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import dayjs, { Dayjs } from "dayjs"
import type { UnwrapRef } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

interface FormState {
  slideAngle: number
  slideOpacity: number
  startTime: Dayjs | null
  endTime: Dayjs | null
  areaColor: string
  guidaoS: boolean
  guidaoJ: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  slideAngle: 10,
  slideOpacity: 0.4,
  startTime: null,
  endTime: null,
  areaColor: "red",
  guidaoS: true,
  guidaoJ: true
})

const startTime = ref()
const endTime = ref()
mapWork.eventTarget.on("loadOK", (event: any) => {
  startTime.value = dayjs(event.startTime, "YYYY-MM-DD HH:mm:ss")
  endTime.value = dayjs(event.endTime, "YYYY-MM-DD HH:mm:ss")
})

const changeAngle = () => {
  mapWork.changeAngle(formState.slideAngle)
}
// 升轨
const changeGuidaoS = () => {
  mapWork.changeGuidaoS(formState.guidaoS)
}
// 降轨
const changeGuidaoJ = () => {
  mapWork.changeGuidaoJ(formState.guidaoJ)
}
const changeColorOpacity = () => {
  mapWork.changeColorOpacity(formState)
}

const btnAdd = () => {
  mapWork.btnAdd(formState, startTime.value, endTime.value)
}
const btnRemoveAll = () => {
  mapWork.btnRemoveAll()
}
</script>
