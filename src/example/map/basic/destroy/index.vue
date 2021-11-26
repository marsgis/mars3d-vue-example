<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="createMap">创建地图</mars-button>
      <mars-button @click="destroyMap">销毁地图</mars-button>
    </a-space>
  </PannelBox>
</template>

<script lang="ts" setup>
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
// 创建地图
const createMap = () => {
  mapWork.createMap()
}

// 销毁地图
const destroyMap = () => {
  mapWork.destroyMap()
}
</script>
<style scoped lang="less"></style>
