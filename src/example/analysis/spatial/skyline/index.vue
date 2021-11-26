<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-checkbox @change="isVChecked" v-model:checked="checked">开启天际线</a-checkbox>
      </a-form-item>

      <a-form-item label="线宽(像素):">
        <a-space>
          <mars-input-number @change="lineWidth" v-model:value="value" :min="1" :max="10" />
          <a-button @click="changeColor">换色</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const value = ref<number>(3)
const checked = ref(true)

// 换色
const changeColor = () => {
  mapWork.changeColor()
}

// 线宽
const lineWidth = () => {
  mapWork.lineWidth(value.value)
}
const isVChecked = () => {
  mapWork.isVChecked(checked.value)
}
</script>
<style scoped lang="less">
.ant-input-number {
  width: 60px !important;
}
</style>
