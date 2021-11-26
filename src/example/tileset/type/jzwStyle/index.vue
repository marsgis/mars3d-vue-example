<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span>Style样式</span>
          <mars-button @click="setStyle1">原始样式</mars-button>
          <mars-button @click="setStyle2" title="这是Mars3D内置的">动态特效1</mars-button>
          <mars-button @click="setStyle3" title="这是不改动cesium源码的">动态特效2</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>背景颜色</span>
          <mars-color-picker @change="changeColor" v-model:value="formState.color" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>叠加效果</span>
          <a-checkbox @change="chkBloom" v-model:checked="formState.enabledBloom">开启泛光</a-checkbox>
          <a-checkbox @change="chkShadows" v-model:checked="formState.enabledShadows">开启光照</a-checkbox>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>亮度效果</span>
          <a-checkbox @change="chkBrightness" v-model:checked="formState.enabledBrightness">开启亮度</a-checkbox>
          <a-slider @change="alphaChange" :min="0.1" :max="8.0" :step="0.05" v-model:value="alphaVal" />
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledBloom: boolean
  enabledShadows: boolean
  enabledBrightness: boolean
  color: string
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  enabledBloom: false,
  enabledShadows: false,
  enabledBrightness: true,
  color: "#4B61E1"
})

// 透明度
const alphaVal = ref<number>(1.5)

onMounted(() => {
  mapWork.addbrightnessEffect(alphaVal.value)
})

// 原始样式
const setStyle1 = () => {
  mapWork.setStyle1()
}
// 样式1
const setStyle2 = () => {
  mapWork.setStyle2()
}
// 样式2
const setStyle3 = () => {
  mapWork.setStyle3()
}
// 颜色改变
const changeColor = () => {
  mapWork.changeColor(formState.color)
}
// 开启泛光
const chkBloom = () => {
  mapWork.chkBloom(formState.enabledBloom)
}

// 开启光照
const chkShadows = () => {
  mapWork.chkShadows(formState.enabledShadows)
}

// 调整亮度
const chkBrightness = () => {
  mapWork.chkBrightness(formState.enabledBrightness)
}
const alphaChange = () => {
  mapWork.alphaChange(formState.enabledBrightness)
}
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}

.ant-slider {
  width: 110px;
}
</style>
