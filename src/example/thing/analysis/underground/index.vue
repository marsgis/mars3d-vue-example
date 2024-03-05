<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">状态控制:</span>
        <mars-switch class="switch_btn" @change="isChecked" v-model:checked="checked" />
        <span class="pannel_label">开启地下模式</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">地表透明度:</span>
        <mars-slider @change="opacityChange" v-model:value="inputValue" :min="0" :max="1" :step="0.1" />
      </a-space>
    </div>

    <div>
      <a-space>
        <mars-button class="control_btn" @click="centerAtDX1">俯视视角</mars-button>
        <mars-button class="control_btn" @click="centerAtDX2">地下视角1</mars-button>
        <mars-button class="control_btn" @click="centerAtDX3">地下视角2</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const inputValue = ref<number>(0.5)
const checked = ref(true)

// 俯视视角
const centerAtDX1 = () => {
  mapWork.centerAtDX1()
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
.mars-pannel-item-label {
  width: 74px;
}
.pannel_label {
  font-size: 12px;
  font-weight: normal;
  line-height: 22px;
  color: rgba(234, 242, 255, 0.5);
}
.switch_btn {
  margin-bottom: 1px;
}
.control_btn {
  width: 94px;
}
.ant-slider {
  width: 210px;
}

</style>
