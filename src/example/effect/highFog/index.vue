<template>
  <mars-dialog :visible="true" right="10" top="10" width="250">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">启用:</span>
        <mars-switch v-model:checked="formState.enabled" @change="onChangeState" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">雾颜色:</span>
        <mars-color-picker v-model:value="formState.color" @change="onChangeColor" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">高度:</span>
        <mars-slider v-model:value="formState.height" @change="setFogHeight" :min="1" :max="2000" :step="1" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">浓度:</span>
        <mars-slider v-model:value="formState.density" @change="setGlobalDensity" :min="0.0" :max="1.0" :step="0.1" />
      </a-space>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import * as mapWork from "./map.js"
import { $message } from "@mars/components/mars-ui/index"

const formState = reactive({
  enabled: true,
  color: "#ffffff",
  height: 300,
  density: 0.6
})

const onChangeState = () => {
  mapWork.setFogEffect(formState.enabled)
}
const onChangeColor = (e) => {
  mapWork.setColor(formState.color)
}
const setGlobalDensity = () => {
  mapWork.setGlobalDensity(formState.density)
}
const setFogHeight = () => {
  mapWork.setFogHeight(formState.height)
}

</script>
<style scoped lang="less">
 .ant-slider {
   width: 120px;
 }
 .mars-color-view {
   width: 130px;
 }
</style>
