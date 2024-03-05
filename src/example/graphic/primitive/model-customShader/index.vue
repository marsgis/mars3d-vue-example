<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">夜晚:</span>
        <mars-switch v-model:checked="enabled" @change="onChangeState" />
      </a-space>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"


const enabled = ref(true)

const onChangeState = () => {
  mapWork.setEnabled(enabled.value)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 220px;
}
</style>
