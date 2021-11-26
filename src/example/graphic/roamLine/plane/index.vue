<template>
  <PannelBox class="infoView roamLinePanel">
    <a-form>
      <a-form-item>
        <a-space>
          <mars-button @click="btnStart">开始</mars-button>
          <mars-button v-show="formState.showBtn === '1'" @click="btnPause">{{ formState.pause }}</mars-button>
          <mars-button @click="btnStop">停止</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-row :gutter="[0, 10]">
          <a-col :span="8">漫游视角:</a-col>
          <a-col :span="11">
            <mars-select @change="changeSelect" v-model:value="formState.select" :options="selectOptions"> </mars-select>
          </a-col>

          <a-col v-show="formState.showFollowedX === '1'" :span="8" title="距离漫游对象的水平距离，单位：米">视角距离:</a-col>
          <a-col v-show="formState.showFollowedX === '1'" :span="11">
            <mars-input-number @change="changeFollowed" v-model:value="formState.followedX" :step="1" />
          </a-col>

          <a-col v-show="formState.showFollowedZ === '1'" :span="8" title="距离漫游对象的高度，单位：米">视角高度:</a-col>
          <a-col v-show="formState.showFollowedZ === '1'" :span="11">
            <mars-input-number @change="changeFollowed" v-model:value="formState.followedZ" :step="1" />
          </a-col>

          <a-col :span="8" title="偏离漫游对象的高度，单位：米">高度偏移值:</a-col>
          <a-col :span="11">
            <mars-input-number @change="changeFollowed" v-model:value="formState.offsetZ" :step="1" />
          </a-col>

          <a-col :span="8" title="偏离漫游对象的横向值，单位：米">横向偏移值:</a-col>
          <a-col :span="11">
            <mars-input-number @change="changeFollowed" v-model:value="formState.offsetY" :step="1" />
          </a-col>

          <a-col :span="8" title="偏离漫游对象的前后值，单位：米">前后偏移值:</a-col>
          <a-col :span="11">
            <mars-input-number @change="changeFollowed" v-model:value="formState.offsetX" :step="1" />
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-row :gutter="[0, 10]">
          <a-col :span="8">手动调整模型角度:</a-col>
          <a-col :span="11">
            <a-switch v-model:checked="formState.isHand" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item v-show="formState.isHand === true">
        <a-row :gutter="[0, 10]">
          <a-col :span="8">heading值:</a-col>
          <a-col :span="11">根据路线自动计算</a-col>

          <a-col :span="8">pitch值(前后):</a-col>
          <a-col :span="11">
            <a-slider @change="updateModel" v-model:value="formState.slidePitchStep" :min="0" :max="360" :step="0.01" />
          </a-col>

          <a-col :span="8">roll值(左右):</a-col>
          <a-col :span="11">
            <a-slider @change="updateModel" v-model:value="formState.slideRollStep" :min="0" :max="360" :step="0.01" />
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </PannelBox>

  <roamLinePanel/>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import roamLinePanel from "@comp/MarsSample/RoamLinePanel.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  showBtn: string
  showFollowedX: string
  showFollowedZ: string
  pause: string
  select: string
  followedX: number
  followedZ: number
  offsetZ: number
  offsetY: number
  offsetX: number
  isHand: boolean
  slidePitchStep: number
  slideRollStep: number
}
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  showBtn: "",
  showFollowedX: "",
  showFollowedZ: "",
  pause: "暂停",
  select: "",
  followedX: 0,
  followedZ: 0,
  offsetZ: 0,
  offsetY: 0,
  offsetX: 0,
  isHand: false,
  slidePitchStep: 0,
  slideRollStep: 0
})

onMounted(() => {
  formState.select = mapWork.changeLineData.select
  formState.followedX = mapWork.changeLineData.followedX
  formState.followedZ = mapWork.changeLineData.followedZ
  formState.offsetZ = mapWork.changeLineData.offsetZ
  formState.offsetY = mapWork.changeLineData.offsetY
  formState.offsetX = mapWork.changeLineData.offsetX
  changeSelect()
  mapWork.updateModel(false, formState)
})

// 按钮事件
const btnStart = () => {
  // 启动漫游
  mapWork.roamLine.start()
  formState.showBtn = "1"
  formState.pause = "暂停"
}
const btnPause = () => {
  // 暂停漫游
  if (mapWork.roamLine.isPause) {
    formState.pause = "暂停"
    mapWork.roamLine.proceed() // 继续
  } else {
    formState.pause = "继续"
    mapWork.roamLine.pause() // 暂停
  }
}
const btnStop = () => {
  // 停止漫游
  mapWork.roamLine.stop()
  formState.showBtn = ""
}

// 下拉菜单
const selectOptions = ref([
  {
    value: "",
    label: "自由视角"
  },
  {
    value: "gs",
    label: "跟随视角"
  },
  {
    value: "dy",
    label: "锁定第一视角"
  },
  {
    value: "sd",
    label: "锁定上帝视角"
  }
])
const changeSelect = () => {
  formState.showFollowedX = ""
  formState.showFollowedZ = ""

  switch (formState.select) {
    default:
      break
    case "gs": //
      formState.showFollowedX = "1"
      break
    case "dy": // 锁定第一视角
      formState.showFollowedX = "1"
      formState.showFollowedZ = "1"

      formState.followedX = 200
      formState.followedZ = 50
      formState.offsetZ = 0
      formState.offsetY = 0
      formState.offsetX = 0

      break
    case "sd": // 锁定上帝视角
      formState.showFollowedZ = "1"

      var followedZ = Number(formState.followedZ)
      if (followedZ < 500) {
        formState.followedZ = 500
      }
      break
  }
  mapWork.updateCameraSetting(formState)
}
const changeFollowed = () => {
  mapWork.updateCameraSetting(formState)
}

const updateModel = () => {
  mapWork.updateModel(false, formState)
}
</script>

<style scoped lang="less">
.roamLinePanel{
  width: 290px;
}
.ant-form-item .ant-select,.ant-input-number{
  width: 120px;
}
</style>
