<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <a-space>
        <span>启用:</span>
        <a-switch v-model:checked="checked" @change="isChecked" />
      </a-space>
    </div>

    <div>
      <a-space>
        <span>渐变:</span>
        <a-slider @change="gradations" v-model:value="gradationsValue" :min="1" :max="10" step="0.01" />
      </a-space>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const gradationsValue = ref<number>(4)

const checked = ref(true)

// 亮度
const gradations = () => {
  mapWork.gradations(gradationsValue.value)
}

const isChecked = () => {
  mapWork.chkShowEffect(checked.value)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 110px;
  margin-left: -1px;
}
</style>
