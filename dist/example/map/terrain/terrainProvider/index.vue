<template>
  <pannel class="infoView">
    <a-row class="f-mb">
      <a-col :span="3">单选:</a-col>
      <a-col :span="21">
        <a-space>
          <a-radio-group v-model:value="formState.radio" @change="onChangeRadioTerrain">
            <a-radio value="none">无地形</a-radio>
            <a-radio value="xyz">标准服务</a-radio>
            <a-radio title="目前演示的是mars3d部署的地形服务" value="ion">Ion在线服务</a-radio>
            <!-- <a-radio value="arcgis">ArcGIS服务</a-radio>
              <a-radio value="gee">谷歌地球企业服务</a-radio> -->
            <a-radio value="vr">VR服务</a-radio>
          </a-radio-group>
        </a-space>
      </a-col>
    </a-row>

    <a-row >
      <a-col :span="3">调试：</a-col>
      <a-col :span="21">
        <a-space>
          <a-checkbox v-model:checked="formState.enabledTerrain" @change="onShowTerrain">开启地形</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledTerrainSJW" @change="onChangeTerrainSJW">地形三角网</a-checkbox>
        </a-space>
      </a-col>
    </a-row>
  </pannel>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  radio: string
  enabledTerrainSJW: boolean
  enabledTerrain: boolean
}

const formState: UnwrapRef<FormState> = reactive({
  radio: "xyz",
  enabledTerrainSJW: false,
  enabledTerrain: true
})

const onChangeTerrainSJW = () => {
  mapWork.enabledTerrainSJW(formState.enabledTerrainSJW)
}
const onShowTerrain = () => {
  mapWork.enabledTerrain(formState.enabledTerrain)
}
const onChangeRadioTerrain = () => {
  mapWork.radioTerrain(formState.radio)
}
</script>

<style lang="less" scoped>
.infoView {
  width: 422px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
</style>
