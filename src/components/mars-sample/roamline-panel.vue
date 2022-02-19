<template>
  <mars-pannel :visible="true" height="285px" right="10" bottom="60" width="200">
    <a-form>
      <a-row :gutter="[0, 8]">
        <a-col :span="12">总长度:</a-col>
        <a-col :span="12">{{ formState.td_alllength }}</a-col>

        <a-col :span="12">已漫游长度:</a-col>
        <a-col :span="12">{{ formState.td_length }}</a-col>

        <a-col :span="12">总时长:</a-col>
        <a-col :span="12">{{ formState.td_alltimes }}</a-col>

        <a-col :span="12">已漫游时间:</a-col>
        <a-col :span="12">{{ formState.td_times }}</a-col>

        <a-col :span="12">经度:</a-col>
        <a-col :span="12">{{ formState.td_jd }}</a-col>

        <a-col :span="12">纬度:</a-col>
        <a-col :span="12">{{ formState.td_wd }}</a-col>

        <a-col :span="12">漫游高程:</a-col>
        <a-col :span="12">{{ formState.td_gd }}</a-col>

        <a-col :span="12">地面高程:</a-col>
        <a-col :span="12">{{ formState.td_dmhb }}</a-col>

        <a-col :span="12">离地距离:</a-col>
        <a-col :span="12">{{ formState.td_ldgd }}</a-col>

        <a-progress :percent="formState.percent" size="small" />
      </a-row>
    </a-form>
  </mars-pannel>
</template>

<script setup lang="ts">
/**
 * 公共组件：飞行漫游路线公共面板
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { onMounted, reactive } from "vue"
import type { UnwrapRef } from "vue"

interface FormState {
  td_alllength: number
  td_length: number
  td_alltimes: number
  td_times: number
  td_jd: number
  td_wd: number
  td_gd: number
  td_dmhb: number
  td_ldgd: number
  percent: number
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork
// const mars3d = mapWork.mars3d
// const Cesium = mapWork.Cesium

const formState: UnwrapRef<FormState> = reactive({
  td_alllength: 0,
  td_length: 0,
  td_alltimes: 0,
  td_times: 0,
  td_jd: 0,
  td_wd: 0,
  td_gd: 0,
  td_dmhb: 0,
  td_ldgd: 0,
  percent: 0
})

onMounted(() => {
  mapWork.eventTarget.on("roamLineChange", (roamLineData: any) => {
    formState.td_alllength = roamLineData.td_alllength
    formState.td_alltimes = roamLineData.td_alltimes
    formState.td_length = roamLineData.td_length
    formState.td_times = roamLineData.td_times
    formState.td_jd = roamLineData.td_jd
    formState.td_wd = roamLineData.td_wd
    formState.td_gd = roamLineData.td_gd
    formState.td_dmhb = roamLineData.td_dmhb
    formState.td_ldgd = roamLineData.td_ldgd
    formState.percent = roamLineData.percent
  })
})
</script>
<style scoped lang="less">
:deep(.info-view) {
  width: 200px;
  top: auto !important;
  bottom: 60px;
  overflow-y: hidden;
  z-index: 0 !important;
}
</style>
