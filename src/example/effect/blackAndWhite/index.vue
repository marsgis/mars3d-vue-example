<template>
  <mars-pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span>启用:</span>
        <a-switch v-model:checked="enabled" @change="onChangeState" />
      </a-space>
    </div>

    <div>
      <a-space>
        <span>渐变量:</span>
        <a-slider @change="onChangeGradations" v-model:value="gradations" :min="1" :max="10" :step="0.01" />
      </a-space>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import * as mapWork from "./map.js"

const gradations = ref<number>(4)

const enabled = ref(true)

// 亮度
const onChangeGradations = () => {
  mapWork.setGradations(gradations.value)
}

const onChangeState = () => {
  mapWork.setEnabled(enabled.value)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 110px;
  margin-left: -1px;
}
</style>
