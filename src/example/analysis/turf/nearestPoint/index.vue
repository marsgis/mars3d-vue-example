<template>
  <PannelBox class="infoView">
    <span>提示：请单击地图，分析拾取点最近的体育场所。</span>
    <mars-button @click="clearAll">清除</mars-button>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

// 清除
const clearAll = () => {
  mapWork.clearAll()
}
</script>
