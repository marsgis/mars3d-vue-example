<template>
  <PannelBox class="infoView">
    <a-from>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">启用状态:</span>
          <a-switch v-model:checked="checked" @change="chkShowEffect" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">粒子速度:</span>
          <a-slider @change="speed" v-model:value="speedValue" :min="1" :max="100" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">粒子大小:</span>
          <a-slider @change="size" v-model:value="sizeValue" :min="1" :max="100" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">粒子方向:</span>
          <a-slider @change="direction" v-model:value="directionValue" :min="-89" :max="89" />
        </a-space>
      </a-form-item>
    </a-from>
  </PannelBox>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const checked = ref(true)
const speedValue = ref<number>(10)
const sizeValue = ref<number>(20)
const directionValue = ref<number>(-30)

// 是否开启特效
const chkShowEffect = () => {
  mapWork.chkShowEffect(checked.value)
}

// 粒子速度

const speed = () => {
  mapWork.rainSpeed(speedValue.value)
}

// 粒子大小
const size = () => {
  mapWork.rainSize(sizeValue.value)
}
// 粒子方向
const direction = () => {
  mapWork.rainDirection(directionValue.value)
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 55px;
}
.ant-slider {
  width: 145px;
}
</style>
