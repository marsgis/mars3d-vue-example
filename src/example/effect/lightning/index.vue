<template>
  <mars-dialog :visible="true" right="10" top="10" width="230">
    <div class="f-mb">
      <a-space>
        <a-checkbox @change="setEnabled" v-model:checked="formState.enabled">是否开启：</a-checkbox>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span>混合系数</span>
        <mars-slider @change="setOpacity" v-model:value="formState.opacity" :min="0.0" :max="1.0" :step="0.1" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span>闪电间隔</span>
        <mars-slider @change="setInterval" v-model:value="formState.interval" :min="0.0" :max="1.0" :step="0.1" />
      </a-space>
    </div>


  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import * as mapWork from "./map.js"

const formState = reactive({
  enabled: true,
  opacity: 0.4,
  interval: 0.8
})

// 混合系数
const setOpacity = () => {
  mapWork.setOpacity(formState.opacity)
}


// 间隔
const setInterval = () => {
  mapWork.setInterval(formState.interval)
}

// 是否开启
const setEnabled = () => {
  mapWork.setEnabled(formState.enabled)
}

</script>
<style scoped lang="less">
.ant-slider {
  width: 120px;
}
</style>
