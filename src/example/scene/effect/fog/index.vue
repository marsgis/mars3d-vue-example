<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">启用:</span>
          <a-switch v-model:checked="formState.chkShowEffect" @change="bindShowEffect" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">雾颜色:</span>
          <mars-color-picker v-model:value="formState.color" @change="changeColor" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">近距离:</span>
          <a-slider v-model:value="formState.fogByDistanceX" @change="fogByDistanceX" :min="1" :max="5000" :step="1" />
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">远距离:</span>
          <a-slider v-model:value="formState.fogByDistanceZ" @change="fogByDistanceZ" :min="100" :max="50000" :step="1" />
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState = reactive({
  chkShowEffect: true,
  color: "#ffffff",
  fogByDistanceX: 100,
  fogByDistanceZ: 9000
})

const bindShowEffect = () => {
  mapWork.bindShowEffect(formState.chkShowEffect)
}
const changeColor = () => {
  mapWork.changeColor(formState.color)
}
const fogByDistanceX = () => {
  mapWork.fogByDistanceX(formState.fogByDistanceX)
}
const fogByDistanceZ = () => {
  mapWork.fogByDistanceZ(formState.fogByDistanceZ)
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 40px;
}
.ant-slider {
  width: 160px;
}
</style>
