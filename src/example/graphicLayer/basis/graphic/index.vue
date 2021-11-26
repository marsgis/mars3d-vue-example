<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item><LayerState /></a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">点状(单个坐标):</span>
          <div :key="item" v-for="(item, index) in arrPoint">
            <mars-button :href="arrPointHref[index]" target="_blank">{{ item }}</mars-button>
          </div>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">线面状(多个坐标):</span>
          <div :key="item" v-for="(item, index) in arrPolyline">
            <mars-button :href="arrPolylineHref[index]" target="_blank">{{ item }}</mars-button>
          </div>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const arrPoint = ["文字", "点", "图标点", "平面", "盒子", "圆", "圆锥", "球", "小模型"]
const arrPolyline = ["线", "管道", "走廊", "墙", "矩形", "面"]
const arrPointHref = [
  "editor.html?id=graphic/entity/label",
  "editor.html?id=graphic/entity/point",
  "editor.html?id=graphic/entity/billboard",
  "editor.html?id=graphic/entity/plane",
  "editor.html?id=graphic/entity/box",
  "editor.html?id=graphic/entity/circle",
  "editor.html?id=graphic/entity/cylinder",
  "editor.html?id=graphic/entity/ellipsoid",
  "editor.html?id=graphic/entity/model"
]
const arrPolylineHref = [
  "editor.html?id=graphic/entity/polyline",
  "editor.html?id=graphic/entity/polylineVolume",
  "editor.html?id=graphic/entity/corridor",
  "editor.html?id=graphic/entity/wall",
  "editor.html?id=graphic/entity/rectangle",
  "editor.html?id=graphic/entity/polygon"
]
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 100px;
}
</style>
