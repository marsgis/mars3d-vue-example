<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">状态:</span>
          <a-checkbox @change="isChecked" v-model:checked="checked">开启地下模式</a-checkbox>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">地表透明度:</span>
          <a-slider @change="opacityChange" v-model:value="inputValue" :min="0" :max="1" step="0.1" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">演示视角:</span>
          <mars-button @click="centerAtDX1">俯视视角</mars-button>
          <mars-button @click="centerAtDX2">地下视角1</mars-button>
          <mars-button @click="centerAtDX3">地下视角2</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const inputValue = ref<number>(0.5)

const checked = ref(true)

// 俯视视角
const centerAtDX1 = () => {
  mapWork.centerAtDX1(inputValue.value)
}
// 地下视角1
const centerAtDX2 = () => {
  mapWork.centerAtDX2()
}
// 地下视角2
const centerAtDX3 = () => {
  mapWork.centerAtDX3()
}

// 透明度发生改变
const opacityChange = () => {
  mapWork.opacityChange(inputValue.value)
}

const isChecked = () => {
  mapWork.chkUnderground(checked.value)
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 65px;
}
.ant-slider {
  width: 160px;
}
</style>
