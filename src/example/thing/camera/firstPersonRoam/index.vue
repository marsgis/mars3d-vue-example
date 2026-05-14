<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
      <div class="f-mb">
        <a-form-item label="启用状态">
          <a-checkbox @change="chkOpen" v-model:checked="checked">是否开启</a-checkbox>
        </a-form-item>
      </div>

      <div class="f-mb">
        <a-form-item label="键盘漫游">
          <span class="info">单击地图激活后按 W前进、S后退、A左移、D右移</span>
        </a-form-item>
      </div>

      <div>
        <a-form-item label="自动漫游">
          <a-space>
            <mars-button class="btn" @click="startAuto">开始自动漫游</mars-button>
            <mars-button class="btn" @click="stopAuto">停止自动漫游</mars-button>
          </a-space>
        </a-form-item>
      </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
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
<style lang="less" scoped>
.info {
  display: inline-block;
  width: 230px;
}

.btn {
  width:111px;
}
</style>
