<template>
  <mars-pannel :visible="true" right="10" top="10" width="202">
    超图S3M图层：
    <mars-button @click="showMaxNiaochaoDemo">人工建模(奥体公园)</mars-button>
    <mars-button @click="showMaxCBDDemo">人工建模(CBD)</mars-button>
    <mars-button @click="showMaxPipeDemo">人工建模(地下管网)</mars-button>
    <mars-button @click="showBIMQiaoDemo">BIM(桥梁)</mars-button>
    <mars-button @click="showQxSuofeiyaDemo">倾斜摄影(哈尔滨索菲亚)</mars-button>
    <mars-button @click="showQxSrsbDemo">倾斜摄影(萨尔茨堡)</mars-button>
  </mars-pannel>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import * as mapWork from "./map.js"

const showMaxNiaochaoDemo = () => {
  mapWork.showMaxNiaochaoDemo()
}
const showMaxCBDDemo = () => {
  mapWork.showMaxCBDDemo()
}
const showBIMQiaoDemo = () => {
  mapWork.showBIMQiaoDemo()
}
const showMaxPipeDemo = () => {
  mapWork.showMaxPipeDemo()
}
const showQxSuofeiyaDemo = () => {
  mapWork.showQxSuofeiyaDemo()
}
const showQxSrsbDemo = () => {
  mapWork.showQxSrsbDemo()
}
</script>
<style scoped lang="less">
.mars-button {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
