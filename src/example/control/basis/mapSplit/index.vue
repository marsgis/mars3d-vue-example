<template>
  <mars-dialog :visible="true" right="10" top="10" customClass="mapsplit-pannel">
    <a-space  :size="20">
      <mars-button @click="createMap">
        <mars-icon icon="split" :size="20"></mars-icon>
        创建控件
      </mars-button>
      <mars-button @click="destroyMap">
        <mars-icon icon="delete-five" :size="20"></mars-icon>
        销毁控件
      </mars-button>
    </a-space>
  </mars-dialog>
</template>

<script lang="ts" setup>
import * as mapWork from "./map.js"

// 创建地图
const createMap = () => {
  mapWork.createControl()
}
// 销毁地图
const destroyMap = () => {
  mapWork.destroyControl()
}
</script>

<style lang="less">
.mapsplit-pannel {
  background: transparent !important;
  backdrop-filter: none !important;

  .mars-dialog__content {
    background-color: transparent !important;
  }

  .mars-button {
    width: 120px;
    height: 46px;
  }
}
</style>

