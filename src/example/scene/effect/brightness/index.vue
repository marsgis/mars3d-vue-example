<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item label="状态:">
        <a-checkbox @change="isChecked" v-model:checked="checked">开启效果</a-checkbox>
      </a-form-item>

      <a-form-item label="亮度:">
        <a-slider @change="brightness" v-model:value="brightnessValue" :min="0" :max="5" step="0.01" />
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const brightnessValue = ref<number>(2)

const checked = ref(true)

// 亮度
const brightness = () => {
  mapWork.brightness(brightnessValue.value)
}

const isChecked = () => {
  mapWork.chkShowEffect(checked.value)
}
</script>
<style scoped lang="less">
.infoView {
  width: 200px;
}
</style>
