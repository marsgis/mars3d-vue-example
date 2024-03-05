<template>
  <mars-dialog :visible="true" right="10" top="10" height="470" width="330">
    <graphic-layer-state :defaultCount="10" drawLabel1="绘制" drawLabel2="按当前相机" />


  </mars-dialog>


  <mars-dialog :visible="true" right="10" top="490" width="330">
    <div class="toolbar">
      <a-space>
        <span class="mars-pannel-item-label">编辑Canvas:</span>
        <mars-button @click="draw()">{{ isDrawing ? "停止绘制" : "开始绘制" }}</mars-button>
        <mars-button @click="clear()" danger>清除</mars-button>
      </a-space>
      <a-checkbox class="edit-point f-pt" :checked="isEdit" @click="chooseEdit">编辑点</a-checkbox>

    </div>
    <div class="toolbar f-pt">
      <a-space>
        <span class="mars-pannel-item-label">编辑矢量面:</span>
        <a-checkbox-group v-model:value="isChoosePoint" @change="choosePoint()">
          <a-checkbox value="true">编辑网格点</a-checkbox>
        </a-checkbox-group>
      </a-space>
    </div>

    <div class="canvas-container">
      <canvas class="drawCanvas" width="300" height="170" id="drawVideo">不支持canvas</canvas>
      <video muted class="video_test" autoplay loop width="300" height="170" id="videotest"
        src="//data.mars3d.cn/file/video/lukou.mp4"></video>
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, toRaw } from "vue"
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
import * as mapWork from "./map.js"

let drawVideoCanvas
const uVList = ref()
const isDrawing = ref(false)
const isEdit = ref(true)

onMounted(() => {
  const drawVideo = document.getElementById("drawVideo")

  drawVideoCanvas = mapWork.creatCanvas(drawVideo)

  drawVideo.addEventListener("mousemove", () => {
    uVList.value = drawVideoCanvas.uvList
  })
})

watch(
  () => uVList.value,
  () => {
    const listData = toRaw(uVList.value)
    if (listData.length >= 3) {
      mapWork.updateROI(listData)
    }
  },
  {
    deep: true
  }
)

const draw = () => {
  if (isDrawing.value) {
    // 处于绘制状态，将要停止绘制
    drawVideoCanvas.edit(isEdit.value)
  } else {
    // 处于停止绘制状态，将要开始绘制
    clear()
    drawVideoCanvas.draw()
  }

  isDrawing.value = !isDrawing.value
}

const clear = () => {
  drawVideoCanvas.clear()
  mapWork.clearROI()
}

const isChoosePoint = ref(false)

const choosePoint = () => {
  mapWork.choosePoint(isChoosePoint.value[0])
}

const chooseEdit = () => {
  isEdit.value = !isEdit.value
  drawVideoCanvas.edit(isEdit.value)
}
</script>
<style scoped lang="less">
.canvas-container {
  width: 300px;
  height: 170px;
  margin: 0 auto;
  margin-top: 10px;
  background-color: transparent;

  .video_test {
    width: 300px;
    height: 170px;
    position: absolute;
  }

  .drawCanvas {
    position: absolute;
    left: -500;
    z-index: 1000;
  }
}

.mars-button {
  width: 100px;
}

.edit-point {
  margin-left: 83px;
}
</style>
