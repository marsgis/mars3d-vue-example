<template>
  <mars-dialog :visible="true" right="10" top="10" width="208">
    <a-collapse v-model:activeKey="activeKey" expandIconPosition="end">
      <!-- 自定义切换图标 -->
      <template #expandIcon>
        <mars-icon icon="down-c" class="icon-vertical-a" />
      </template>
      <a-collapse-panel key="1" header="I3S示例">
        <div class="basis-button-contain">
          <mars-button @click="showNewYorkDemo">城市白膜(纽约)</mars-button>
          <mars-button @click="showSanFranciscoDemo">倾斜摄影(旧金山)</mars-button>
          <mars-button @click="showFrankfurtDemo">倾斜摄影(法兰克福)</mars-button>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import * as mapWork from "./map.js"

const activeKey = ref(["1", "2", "3"])

const showNewYorkDemo = () => {
  mapWork.showNewYorkDemo()
}

const showSanFranciscoDemo = () => {
  mapWork.showSanFranciscoDemo()
}

const showFrankfurtDemo = () => {
  mapWork.showFrankfurtDemo()
}
</script>
<style scoped lang="less">
.mars-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
