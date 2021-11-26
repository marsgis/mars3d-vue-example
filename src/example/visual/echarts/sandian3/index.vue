<template>
  <PannelBox class="infoView">
    <a-checkbox
      v-model:checked="pointerEvents"
      @change="chkPointerEvents">
        启用Echars交互
    </a-checkbox>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
const pointerEvents = ref(false)
onMounted(() => {
  // 创建Echarts图层
  mapWork.createEchartsLayer(pointerEvents.value)
})

// 状态控制
const chkPointerEvents = () => {
  mapWork.chkPointerEvents(pointerEvents.value)
}
</script>
<style scoped lang="less">
.infoView{
  left: 10px;
  width: 155px;
}
</style>
