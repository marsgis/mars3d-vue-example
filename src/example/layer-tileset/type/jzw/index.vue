<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-collapse v-model:activeKey="activeKey">
      <!-- 自定义切换图标 -->
      <template #expandIcon>
        <mars-icon icon="down-c" class="icon-vertical-a" />
      </template>
      <a-collapse-panel key="1" header="原始样式">
        <div class="f-mb">
          <a-space>
            <mars-button @click="setStyleDef">原始样式</mars-button>
            <span>建筑物颜色</span>
            <mars-color-picker @change="changeColor" v-model:value="formState.color" />
          </a-space>
        </div>
      </a-collapse-panel>

      <a-collapse-panel key="2" header="建筑物样式">
        <div class="f-mb">
          <a-space>
            <mars-button @click="setStyle1" title="这是Mars3D内置的">动态特效1</mars-button>
            <mars-button @click="setStyle2" title="这是不改动cesium源码的">动态特效2</mars-button>
            <mars-button @click="setStyle3">夜景贴图</mars-button>
          </a-space>
        </div>
      </a-collapse-panel>

      <a-collapse-panel key="3" header="叠加场景效果">
        <div class="f-mb">
          <a-space>
            <span>叠加效果</span>
            <a-checkbox @change="chkBloom" v-model:checked="formState.enabledBloom">开启泛光</a-checkbox>
            <a-checkbox @change="chkShadows" v-model:checked="formState.enabledShadows">开启光照</a-checkbox>
          </a-space>
        </div>

        <div class="f-mb">
          <a-space>
            <span>亮度效果</span>
            <a-checkbox @change="chkBrightness" v-model:checked="formState.enabledBrightness">开启亮度</a-checkbox>
            <mars-slider @change="alphaChange" :min="0.1" :max="8.0" :step="0.05" v-model:value="alphaVal" />
          </a-space>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </mars-pannel>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"

import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  enabledBloom: boolean
  enabledShadows: boolean
  enabledBrightness: boolean
  color: string
}

const formState: UnwrapRef<FormState> = reactive({
  enabledBloom: false,
  enabledShadows: false,
  enabledBrightness: true,
  color: "#4B61E1"
})

const activeKey = ref(["1", "2", "3"])

// 透明度
const alphaVal = ref<number>(1.5)



// 原始样式
const setStyleDef = () => {
  mapWork.setStyleDef()
}
//
const setStyle1 = () => {
  mapWork.setStyle1()
}
//
const setStyle2 = () => {
  mapWork.setStyle2()
}
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
.ant-slider {
  width: 150px;
}
</style>
