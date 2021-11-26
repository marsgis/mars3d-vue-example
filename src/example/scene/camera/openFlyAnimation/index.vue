<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="startAnimation">重新播放</mars-button>
      <mars-button @click="stopAnimation">停止动画</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

// 随机点
const startAnimation = () => {
  mapWork.startAnimation()
}
// 清除
const stopAnimation = () => {
  mapWork.stopAnimation()
}
</script>
