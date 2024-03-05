<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">开启:</span>
        <mars-switch v-model:checked="formState.enabled" @change="onChangeState" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">轮廓线颜色:</span>
        <mars-color-picker v-model:value="formState.color" @change="onChangeColor" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">被遮挡线颜色:</span>
        <mars-color-picker v-model:value="formState.colorHidden" @change="onChangeColorHidden" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">线宽:</span>
        <mars-slider v-model:value="formState.width" @change="onChangeWidth" :min="0.1" :max="10" :step="0.1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">是否显示边缘:</span>
        <mars-switch v-model:checked="formState.showPlane" @change="onChangeShowPlane" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">边缘法线夹角:</span>
        <mars-slider v-model:value="formState.planeAngle" @change="onChangePlaneAngle" :min="0.1" :max="10.0"
          :step="0.1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">发光:</span>
        <mars-switch v-model:checked="formState.glow" @change="onChangeGlow" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">发光强度:</span>
        <mars-slider v-model:value="formState.glowPower" @change="onChangeGlowPower" :min="0" :max="10" :step="0.01" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">发光增量:</span>
        <mars-slider v-model:value="formState.glowStrength" @change="onChangeGlowStrength" :min="0" :max="10"
          :step="0.01" />
      </a-space>
    </div>

  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import * as mapWork from "./map.js"

const formState = reactive({
  enabled: true,
  width: 6,
  color: "#ffff00",
  colorHidden: "#ffff00",
  showPlane: false,
  planeAngle: 10,
  glow: false,
  glowPower: 1.0,
  glowStrength: 3
})

const onChangeState = () => {
  mapWork.changeState(formState.enabled)
}

const onChangeColor = () => {
  mapWork.changeColor(formState.color)
}

const onChangeColorHidden = () => {
  mapWork.changeColorHidden(formState.colorHidden)
}
const onChangeGlowPower = () => {
  mapWork.changeGlowPower(formState.glowPower)
}
const onChangeShowPlane = () => {
  mapWork.changeShowPlane(formState.showPlane)
}
const onChangePlaneAngle = () => {
  mapWork.changePlaneAngle(formState.planeAngle)
}
const onChangeGlow = () => {
  mapWork.changeGlow(formState.glow)
}
const onChangeGlowStrength = () => {
  mapWork.changeGlowStrength(formState.glowStrength)
}

const onChangeWidth = () => {
  mapWork.changeWidth(formState.width)
}
</script>
<style>
.mars-pannel-item-label {
  width: 88px;
}

.ant-slider {
  width: 195px;
}

.mars-color-view {
  width: 200px;
}
</style>
