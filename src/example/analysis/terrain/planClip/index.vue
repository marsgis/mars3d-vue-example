<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <a-checkbox v-model:checked="formState.enabledWadi" @change="chkClippingPlanes"> 是否挖地 </a-checkbox>
          <a-checkbox v-model:checked="formState.enabledWaiqiege" @change="chkUnionClippingRegions"> 是否外切割 </a-checkbox>
          <a-checkbox v-model:checked="formState.enabledShendu" @change="chkTestTerrain"> 深度检测 </a-checkbox>
        </a-space>
      </a-form-item>

      <a-form-item label="开挖深度">
        <mars-input-number v-model:value="formState.txtHeight" @change="changeClipHeight" :step="1" :min="-500" :max="999" />
        <span>（米）</span>
      </a-form-item>

      <a-form-item>
        <a-space>
          <mars-button @click="btnDrawExtent">添加矩形</mars-button>
          <mars-button @click="btnDraw">添加多边行</mars-button>
          <mars-button @click="removeAll">清除</mars-button>
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
  enabledWadi: boolean
  enabledWaiqiege: boolean
  enabledShendu: boolean
  txtHeight: number
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  enabledWadi: true,
  enabledWaiqiege: false,
  enabledShendu: true,
  txtHeight: 30
})

mapWork.eventTarget.on("loadOk", () => {
  mapWork.terrainPlanClip.diffHeight = formState.txtHeight

  window.$notify("已知问题提示", "（1）因为使用clippingPlanes接口，绘制多边形时，部分围合角度时会存在效果不对")
})

// 是否挖地
const chkClippingPlanes = () => {
  mapWork.chkClippingPlanes(formState.enabledWadi)
}
// 是否外切割
const chkUnionClippingRegions = () => {
  mapWork.chkUnionClippingRegions(formState.enabledWaiqiege)
}
// 深度检测
const chkTestTerrain = () => {
  mapWork.chkTestTerrain(formState.enabledShendu)
}

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent()
}
// 添加多边形
const btnDraw = () => {
  mapWork.btnDraw()
}
// 清除
const removeAll = () => {
  mapWork.removeAll()

  // 是否挖地和外切割
  formState.enabledWaiqiege = false
  formState.enabledWadi = true
}
// 改变切割的深度
const changeClipHeight = () => {
  mapWork.changeClipHeight(formState.txtHeight)
}
</script>
<style scoped lang="less">
.infoView {
  width: 300px;
}
.ant-input-number {
  width: 100px !important;
}
</style>
