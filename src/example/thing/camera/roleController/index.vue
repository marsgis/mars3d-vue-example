<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      提示：通过W/S/A/D和鼠标控制人物移动和视角<br />
    </div>
    <div>
      <a-space>
        <span class="mars-pannel-item-label">启用:</span>
        <mars-switch v-model:checked="enabled" @change="onChangeState" />

        <mars-button class="btn" @click="mapWork.drawPoint">点选修改位置</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"

const enabled = ref(true)
const onChangeState = () => {
  mapWork.setEnabled(enabled.value)
}
</script>
<style lang="less" scoped></style>
