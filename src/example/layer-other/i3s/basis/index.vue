<template>
  <mars-dialog :nopadding="true" :visible="true" right="10" top="10" width="330">
    <a-collapse v-model:activeKey="activeKey" expandIconPosition="end">
      <a-collapse-panel key="1" header="I3S示例">
        <div class="basis-button-contain">
          <a-space>
            <mars-button @click="showNewYorkDemo">城市白膜(纽约)</mars-button>
            <mars-button @click="showSanFranciscoDemo">倾斜摄影(旧金山)</mars-button>
          </a-space>
          <mars-button class="f-push-10-t" @click="showFrankfurtDemo">倾斜摄影(法兰克福)</mars-button>
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
  width: 146px;
}
</style>
