<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <span>提示：单击“添加可视域”后，图上左键绘制两点即可</span>
    </div>

    <div class="f-mb">
      <a-space>
        <span >水平张角:</span>
        <a-slider v-model:value="horizontalVal" @change="horizontalAngle" :min="1" :max="120" :step="1" />值{{ horizontalVal }}
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span>垂直张角:</span>
        <a-slider v-model:value="verticalVal" @change="verticalAngle" :min="1" :max="90" :step="1" />值{{ verticalVal }}
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span >视角距离:</span>
        <a-slider v-model:value="distanceVal" @change="distance" :min="1" :max="5000" :step="1" />值{{ distanceVal }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span >视椎线框:</span>
        <a-checkbox @change="chkDebugFrustum" v-model:checked="checked">显示框线</a-checkbox>
      </a-space>
    </div>
    <div class=" f-tac">
      <a-space>
        <mars-button @click="addPoint">添加可视域</mars-button>
        <mars-button @click="clear">清除</mars-button>
      </a-space>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const horizontalVal = ref<number>(120)
const verticalVal = ref<number>(90)
const distanceVal = ref<number>(10)
const checked = ref<boolean>(true)

// 水平张角
const horizontalAngle = () => {
  mapWork.updateParams(horizontalVal.value, verticalVal.value, distanceVal.value)
}
// 垂直张角
const verticalAngle = () => {
  mapWork.updateParams(horizontalVal.value, verticalVal.value, distanceVal.value)
}

// 视角距离
const distance = () => {
  mapWork.updateParams(horizontalVal.value, verticalVal.value, distanceVal.value)
}

const addPoint = () => {
  mapWork.addPoint(horizontalVal.value, verticalVal.value, distanceVal.value, checked.value)
}
const clear = () => {
  mapWork.clear()
}

// 视椎线框
const chkDebugFrustum = () => {
  mapWork.chkDebugFrustum(checked.value)
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 55px;
}
.ant-slider {
  width: 160px;
}
</style>
