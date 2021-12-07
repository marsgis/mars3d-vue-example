<template>
  <PannelBox class="infoView">
    <a-from>
      <a-form-item label="启用状态:">
        <a-checkbox @change="chkOpen" v-model:checked="checked">是否开启</a-checkbox>
      </a-form-item>

      <a-form-item label="键盘漫游:">
        <span>单击地图激活后按 W前进、 S后退、A左移、D右移</span>
      </a-form-item>

      <a-form-item label="自动漫游:">
        <a-space>
          <mars-button @click="startAuto">开始自动漫游</mars-button>
          <mars-button @click="stopAuto">停止自动漫游</mars-button>
        </a-space>
      </a-form-item>
    </a-from>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const checked = ref(true)

// 是否开启漫游
const chkOpen = () => {
  mapWork.chkOpen(checked.value)
}

// 开始自动漫游
const startAuto = () => {
  if (checked.value) {
    mapWork.startAuto()
  }
}

// 停止自动漫游
const stopAuto = () => {
  mapWork.stopAuto()
}
</script>
