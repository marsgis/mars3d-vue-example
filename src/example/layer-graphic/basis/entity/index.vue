<template>
  <mars-pannel class="infoView">
    <div class="f-mb">
      <layer-state />
    </div>
    <div class="f-mb">
      <a-row>
        <a-col :span="4">点状:</a-col>
        <a-col :span="19">
          <a-space>
            <div :key="item" v-for="(item, index) in arrPoint">
              <mars-button :href="arrPointHref[index]" target="_blank">{{ item }}</mars-button>
            </div>
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="4">线面状:</a-col>
        <a-col :span="19">
          <a-space>
            <div :key="item" v-for="(item, index) in arrPolyline">
              <mars-button :href="arrPolylineHref[index]" target="_blank">{{ item }}</mars-button>
            </div>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import LayerState from "@/components/mars-sample/layer-state.vue"
import type { UnwrapRef } from "vue"

import * as mapWork from "./map.js"

interface FormState {
  enabledShowHide: boolean
  enabledPopup: boolean
  enabledTooltip: boolean
  enabledRightMenu: boolean
}

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledPopup: true,
  enabledTooltip: false,
  enabledRightMenu: true
})

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
.infoView {
  width: 450px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
.ant-col-4 {
  max-width: 11.666667%;
}
</style>
