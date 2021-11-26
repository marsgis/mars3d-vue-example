<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item label="单选">
        <a-radio-group v-model:value="formState.radio" @change="radioTerrain">
          <a-radio value="none">无地形</a-radio>
          <a-radio value="xyz">标准服务</a-radio>
          <a-radio title="目前演示的是mars3d部署的地形服务" value="ion">Ion在线服务</a-radio>
          <a-radio value="arcgis">ArcGIS服务</a-radio>
          <!-- <a-radio value="gee">谷歌地球企业服务</a-radio>
          <a-radio value="vr">VR服务</a-radio> -->
        </a-radio-group>
      </a-form-item>
      <a-form-item label="调试：">
        <a-checkbox v-model:checked="formState.enabledTerrain" @change="formTerrainChange">开启地形</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledSanjiaowang" @change="formStateChange">地形三角网</a-checkbox>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  radio: string
  enabledSanjiaowang: boolean
  enabledTerrain: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  radio: "xyz",
  enabledSanjiaowang: false,
  enabledTerrain: true
})

const formStateChange = () => {
  mapWork.enabledSanjiaowang(formState.enabledSanjiaowang)
}
const formTerrainChange = () => {
  mapWork.enabledTerrain(formState.enabledTerrain)
}
const radioTerrain = () => {
  mapWork.radioTerrain(formState.radio)
}
</script>
<style scoped lang="less"></style>
