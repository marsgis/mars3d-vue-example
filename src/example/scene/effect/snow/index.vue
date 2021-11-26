<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <a-checkbox @change="isSnowChecked" v-model:checked="snowchecked">下雪效果</a-checkbox>
          <a-checkbox @change="isCoverChecked" v-model:checked="coverchecked">积雪效果</a-checkbox>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">速度:</span>
          <a-slider @change="speed" v-model:value="speedValue" :min="1" :max="100" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">积雪程度:</span>
          <a-slider @change="height" v-model:value="heightValue" :min="0" :max="1" step="0.1" />
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

const speedValue = ref<number>(20)
const heightValue = ref<number>(0.6)

const snowchecked = ref(true)
const coverchecked = ref(true)

// 下雪速度
const speed = () => {
  mapWork.snowSpeed(speedValue.value)
}

// 粒子大小
const height = () => {
  mapWork.sonwAlpha(heightValue.value)
}

const isSnowChecked = () => {
  mapWork.chkSnow(snowchecked.value)
}
const isCoverChecked = () => {
  mapWork.chkSnowCover(coverchecked.value)
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
