<template>
  <PannelBox class="infoView">
    <a-space>
      <span class="pannel-item-label">闸门:</span>

      <a-checkbox v-model:checked="formState.enabledShowAll" class="pannel-item" @change="bindShowAll">全部</a-checkbox>

      <a-checkbox-group v-model:value="formState.checkbox">
        <a-checkbox @change="changeZhaMen" :key="item" v-for="item in zhamenData" :value="item">{{ item }}号</a-checkbox>
      </a-checkbox-group>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledShowAll: boolean
  checkbox: string[]
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork

const zhamenData = ["13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]

const formState: UnwrapRef<FormState> = reactive({
  enabledShowAll: true,
  checkbox: []
})

onMounted(() => {
  if (formState.enabledShowAll) {
    formState.checkbox = zhamenData
  }
})

// 全部闸门的控制
const bindShowAll = () => {
  if (formState.enabledShowAll) {
    formState.checkbox = zhamenData
  } else {
    formState.checkbox = []
  }
  mapWork.bindShowAll(formState.enabledShowAll)
}
// 单个闸门的控制
const changeZhaMen = (e: Event) => {
  mapWork.changeZhaMen(e.target)
}
</script>
<style scoped lang="less">
.infoView {
  width: 915px;
  max-width: calc(100% - 10px);
  min-width: 100px;
  right:10px;
}
.pannel-item-label {
  width: 40px;
}
.pannel-item {
  min-width: 56px;
}
</style>
