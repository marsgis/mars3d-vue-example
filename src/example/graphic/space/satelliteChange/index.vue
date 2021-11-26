<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <mars-button @click="drawRectangle">框选</mars-button>
          <mars-button @click="drawCircle">圆形</mars-button>
          <mars-button @click="drawPolygon">多边形</mars-button>
          <mars-button @click="drawClear">清除</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>

  <!-- 视频 面板 -->
  <div id="videoView" class="videoWrap" v-show="formState.openVideo == true">
    <div class="openPanel" v-show="formState.openPannel === true">
      <div class="closeAction" @click="closePannel">&lt; 收缩</div>
      <video id="trailer" class="video" width="420" :muted="true" :autoplay="true">
        <source src="//data.mars3d.cn/file/video/lukou.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="closePannel" v-show="formState.openPannel === false">
      <mars-button @click="openPanel">查看视频</mars-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

interface FormState {
  openVideo: boolean
  openPannel:boolean
}
const formState: UnwrapRef<FormState> = reactive({
  openVideo: false,
  openPannel: true
})

onMounted(() => {
  mapWork.graphicLayer.on(mapWork.mars3d.EventType.change, function (event:any) {
    // 位置变化事件
    // 判断卫星是否在面内
    const weixin = event.graphic
    if (!mapWork.drawGraphic) {
    weixin._lastInPoly = false
    weixin.coneShow = false // 关闭视锥体
    formState.openVideo = false // 关闭视频面板
    return
  }

  var position = weixin.position
  if (!position) {
    return
  }

  var thisIsInPoly = mapWork.drawGraphic.isInPoly(position)
  if (thisIsInPoly !== weixin._lastInPoly) {
    if (thisIsInPoly) {
      // 开始进入区域内
      console.log(weixin.name + "开始进入区域内")

      weixin.coneShow = true // 打开视锥体
      formState.openVideo = true // 打开视频面板
    } else {
      // 离开区域
      console.log(weixin.name + "离开区域")

      weixin.coneShow = false // 关闭视锥体
    formState.openVideo = false // 关闭视频面板
    }

    weixin._lastInPoly = thisIsInPoly
  }
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
  bottom: 45px;
  left: 2px;
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
