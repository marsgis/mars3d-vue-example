<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <span>建议：顺着道路方向选点，直线时多采集点</span>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span>路宽度(米):</span>
          <mars-input-number @change="widthChange" v-model:value="widthValue"></mars-input-number>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span>路高度(米):</span>
          <mars-input-number @change="heightChange" v-model:value="heightValue"></mars-input-number>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>透明度:</span>
          <a-slider @change="alphaChange" v-model:value="alphaValue" :min="0" :max="1" step="0.1" />当前值{{ alphaValue }}
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <mars-button @click="drawLine">绘制道路</mars-button>
          <mars-button @click="clear">清除</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const widthValue = ref<number>(280)

const heightValue = ref<number>(30)

const alphaValue = ref<number>(1)

const drawLine = () => {
  mapWork.drawLine(widthValue.value, heightValue.value, alphaValue.value)
}

const widthChange = () => {
  mapWork.widthChange(widthValue.value)
}

const heightChange = () => {
  mapWork.heightChange(heightValue.value)
}
const alphaChange = () => {
  mapWork.alphaChange(alphaValue.value)
}

const clear = () => {
  mapWork.clear()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 160px;
}
.infoView {
  width: 302px;
}
</style>
