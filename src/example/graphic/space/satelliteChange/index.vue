<template>
  <PannelBox class="infoView">

        <a-space>
          <mars-button @click="drawRectangle">框选</mars-button>
          <mars-button @click="drawCircle">圆形</mars-button>
          <mars-button @click="drawPolygon">多边形</mars-button>
          <mars-button @click="drawClear">清除</mars-button>
        </a-space>

  </PannelBox>
  <!-- 视频 面板 -->
  <div class="videoWrap" v-show="formState.openVideo == true">
    <div class="openPanel" v-show="formState.openPannel === true">
      <div class="closeAction" @click="closePannel">&lt; 收缩</div>
      <video width="420" :muted="true" :autoplay="true">
        <source src="//data.mars3d.cn/file/video/lukou.mp4" type="video/mp4" />
      </video>
    </div>
    <div v-show="formState.openPannel === false">
      <mars-button @click="openPanel">查看视频</mars-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"
 import * as mapWork from "./map.js"

interface FormState {
  openVideo: boolean
  openPannel: boolean
}
const formState: UnwrapRef<FormState> = reactive({
  openVideo: false,
  openPannel: true
})

onMounted(() => {
  mapWork.eventTarget.on("video", function (e: any) {
    formState.openVideo = e.openVideo
  })
})

// 框选查询 矩形
const drawRectangle = () => {
  mapWork.drawRectangle()
}
// 框选查询   圆
const drawCircle = () => {
  mapWork.drawCircle()
}
// 框选查询   多边
const drawPolygon = () => {
  mapWork.drawPolygon()
}
// 清除
const drawClear = () => {
  mapWork.drawClear()
}

// 视屏面板的控制
const openPanel = () => {
  formState.openPannel = true
}
const closePannel = () => {
  formState.openPannel = false
}
</script>

<style scoped lang="less">
.videoWrap {
  position: absolute;
  bottom: 110px;
  left: 52px;
  border: 1px solid gray;
  z-index: 9;
  background-color: #3f4854;
  padding: 4px 8px;
}

.closeAction {
  position: absolute;
  top: -25px;
  left: 0;
  background-color: #3f4854;
  padding: 2px 6px;
  cursor: pointer;
}

.closeAction:after {
  content: "";
  position: absolute;
  right: -28px;
  top: 0;
  border-left: 14px solid #3f4854;
  border-right: 14px solid transparent;
  border-bottom: 14px solid #3f4854;
  border-top: 14px solid transparent;
}

.videoWrap .title {
  margin-bottom: 8px;
}

/* 视频的收缩展开状态 */
.videoWrap .openPanel {
  display: block;
}

.videoWrap .closePanel {
  display: block;
  cursor: pointer;
  display: none;
}
</style>
