<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb keyboard-btns">
      <span>演示视角：</span>
      <mars-button class="f-push-10-r" @click="onChangeCenterAtDX1">室内</mars-button>
      <mars-button @click="onChangeCenterAtDX2">室外</mars-button>
    </div>
    <div class="f-push-15-t  f-push-15-b">
      <a-space>
        <span title="平移的步长（单位：米）">平移步长:</span>
        <mars-slider v-model:value="slideStep" @change="onChangeSlider" tooltipPlacement="bottom" :min="0" :max="300"
          :step="0.01" />
      </a-space>
    </div>

    <img class="keyboard-img" src="./img/keyboard.png" alt="" />
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const slideStep = ref<number>(10)

const onChangeSlider = () => {
  mapWork.changeSlider(slideStep.value)
}
const onChangeCenterAtDX1 = () => {
  mapWork.centerAtDX1()
}
const onChangeCenterAtDX2 = () => {
  mapWork.centerAtDX2()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 220px;
}

.keyboard-btns {
  display: grid;
  grid-template-columns: 70px repeat(2, 1fr);
  align-items: center;
}

.keyboard-img {
  width: 100%;
}</style>
