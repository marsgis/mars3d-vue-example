<template>
  <mars-pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">状态:</span>
        <a-checkbox @change="isChecked" v-model:checked="checked">开启地下模式</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">地表透明度:</span>
        <a-slider @change="opacityChange" v-model:value="inputValue" :min="0" :max="1" :step="0.1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">演示视角:</span>
        <mars-button @click="centerAtDX1">俯视视角</mars-button>
        <mars-button @click="centerAtDX2">地下视角1</mars-button>
        <mars-button @click="centerAtDX3">地下视角2</mars-button>
      </a-space>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
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
  width: 65px;
}
.ant-slider {
  width: 160px;
}
</style>
