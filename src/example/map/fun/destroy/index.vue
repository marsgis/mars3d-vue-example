<template>
  <div class="map-control">
    <a-space :size="20">
      <mars-button @click="createMap">
        <mars-icon icon="world" :size="20"></mars-icon>
        创建地图</mars-button>
      <mars-button @click="destroyMap">
        <mars-icon icon="delete-five" :size="20"></mars-icon>
        销毁地图</mars-button>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { useWidget } from "@mars/widgets/common/store/widget"
import * as mapWork from "./map.js"
const { activate, disableAll } = useWidget()

// 创建地图
const createMap = () => {
  window._mapInstance = mapWork.createMap()

  activate("tools-button")
}
// 销毁地图
const destroyMap = () => {
  disableAll()
  mapWork.destroyMap()
}
</script>

<style lang="less" scoped>
.map-control {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;

  .mars-button {
    width: 120px;
    height: 46px;
  }
}
</style>
