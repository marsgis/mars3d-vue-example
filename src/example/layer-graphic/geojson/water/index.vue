<template>
  <mars-dialog :nopadding="true" :visible="true" right="10" top="10" width="330">
    <div class="title">闸门控制</div>

    <a-form class="p-14">
      <a-form-item label="高度（米）">
        <mars-input-number v-model:value="formState.height" :min="0" :max="4" :step="0.1" />
      </a-form-item>
      <a-form-item label="时长（秒）">
        <mars-input-number v-model:value="formState.time" :min="0" :max="10" :step="0.1" />
      </a-form-item>
    </a-form>

    <div class="f-tac f-pdg-10-b">
      <a-space>
        <mars-button @click="openZm">开启</mars-button>
        <mars-button @click="closeZm">关闭</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  height: number
  time: number
}
const formState: UnwrapRef<FormState> = reactive({
  height: 2,
  time: 3
})

const openZm = () => {
  mapWork.openZm(formState.height, formState.time)
}
const closeZm = () => {
  mapWork.closeZm(formState.height, formState.time)
}
</script>
<style lang="less" scoped>
.title {
  color: #EAF2FF;
  height: 44px;
  line-height: 44px;
  padding-left: 10px;
  background: #464C5A;
  font-size: 14px;
  box-shadow: 0px 6px 12px -2px rgba(50, 50, 93, 0.15), 0px 3px 7px -3px rgba(0, 0, 0, 0.2);
}

.mars-button {
  width: 146px;
}
</style>
