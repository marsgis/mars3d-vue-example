<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">视椎体状态:</span>
        <a-checkbox v-model:checked="formState.enabledShowHide" @change="chkShowModelMatrix">显示/隐藏</a-checkbox>

        <mars-button @click="locate">定位至卫星</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">前后侧摆:</span>
        <a-slider @change="pitchChange" v-model:value="pitchValue" :min="-180" :max="180" :step="1" />当前值{{ pitchValue }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">左右侧摆:</span>
        <a-slider @change="rollChange" v-model:value="rollValue" :min="-180" :max="180" :step="1" />当前值{{ rollValue }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">夹角:</span>
        <a-slider @change="angle" v-model:value="angleValue" :min="1" :max="60" :step="0.01" />当前值{{ angleValue }}
      </a-space>
    </div>
  </pannel>
  <pannel class="messageShow">
    <table class="mars-table tb-border">
      <tr>
        <td class="nametd">名称</td>
        <td id="td_name">{{ formState.name }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState.td_gd }}</td>
      </tr>
    </table>
  </pannel>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  enabledShowHide: boolean // 参考轴系
  name: string
  tle1: string
  tle2: string
  time: string
  td_jd: number
  td_wd: number
  td_gd: number
}

// 角度
const angleValue = ref<number>(10)
const pitchValue = ref<number>(0) // 仰角
const rollValue = ref<number>(0) // 左右

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: false,
  name: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0
})
mapWork.eventTarget.on("realData", (event: any) => {
  mapWork.centerPoint(angleValue.value)
  formState.name = event.name
  formState.tle1 = event.tle1
  formState.tle2 = event.tle2
  formState.time = event.time
  formState.td_jd = event.td_jd
  formState.td_wd = event.td_wd
  formState.td_gd = event.td_gd
})

// 俯仰角
const pitchChange = () => {
  mapWork.pitchChange(pitchValue.value)
}

// 左右角
const rollChange = () => {
  mapWork.rollChange(rollValue.value)
}

// 夹角
const angle = () => {
  mapWork.angle(angleValue.value)
}
// 定位至卫星
const locate = () => {
  mapWork.locate()
}

// 显示/隐藏
const chkShowModelMatrix = () => {
  mapWork.chkShowModelMatrix(formState.enabledShowHide)
}
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}
.messageShow {
  right: 10px !important;
  top: 60% !important;
  bottom: 54px;
  padding: 0 !important;
}
th.column-money,
td.column-money {
  text-align: right !important;
}
.ant-slider {
  width: 110px;
}
.mars-table {
  width: 280px;
  border-collapse: collapse;
  border-spacing: 0;
}

.mars-table tr td {
  padding: 5px 10px;
  text-align: left;
}

.mars-table tr td:first-child {
  border-left: none;
}

.mars-table .nametd {
  padding: 5px 20px 5px 10px;
}
.tb-border {
  border: 1px solid #4db3ff70;
}

.tb-border tr td {
  border: 1px solid #4db3ff70;
}
</style>
