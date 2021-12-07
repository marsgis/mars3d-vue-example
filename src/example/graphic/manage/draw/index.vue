<template>
  <PannelBox class="infoView">
    <div>
      <a-row>
        <a-col :span="5">数据管理:</a-col>
        <a-col :span="19">
          <a-space>
            <a-checkbox v-model:checked="isShow" @change="showChange">显示隐藏</a-checkbox>
            <a-checkbox v-model:checked="popupShow" @change="showPopup">Popup绑定</a-checkbox>
            <a-checkbox v-model:checked="tooltipShow" @change="showTooltip">Tooltip绑定</a-checkbox>
            <a-checkbox v-model:checked="contextMenuShow" @change="showContextMenu">右键菜单绑定</a-checkbox>
            <a-checkbox v-model:checked="isEditable" @change="isEditableChange">是否编辑</a-checkbox>
            <a-checkbox v-model:checked="onlyPickModelPosition" @change="onlyPickModelPositionChange">
              <span title="屏蔽拾取地形坐标，避免穿透3dtiles模型">仅在3dtiles上标绘</span>
            </a-checkbox>
          </a-space>
        </a-col>
      </a-row>
    </div>
    <div class="f-pt">
      <a-row>
        <a-col :span="5">图层管理:</a-col>
        <a-col :span="19">
          <a-space>
            <mars-button @click="clear">清除</mars-button>
            <a-upload
              :multiple="false"
              name="file"
              accept="json,geojson,kml,kmz"
              :showUploadList="false"
              @change="openGeoJSON"
              :beforeUpload="() => false"
            >
              <mars-button> 打开... </mars-button>
            </a-upload>
            <mars-button @click="saveGeoJSON">保存GeoJSON</mars-button>
            <mars-button @click="saveKML">另存KML</mars-button>
            <mars-button @click="saveWKT">另存WKT</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
    <div class="f-pt">
      <a-row>
        <a-col :span="5">单个点类:</a-col>
        <a-col :span="19">
          <a-space>
            <mars-button @click="drawPoint">点</mars-button>
            <mars-button @click="drawLabel">文字</mars-button>
            <mars-button @click="drawMarker">图标点</mars-button>
            <mars-button @click="drawModel">小模型</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
    <div class="f-pt">
      <a-row>
        <a-col :span="5">二维空间:</a-col>
        <a-col :span="19">
          <a-space>
            <mars-button @click="drawPolyline(false)">线</mars-button>
            <mars-button @click="drawPolygon(false)">面</mars-button>
            <mars-button @click="drawEllipse(false)">圆</mars-button>
            <mars-button @click="drawRectangle(false)">矩形</mars-button>
            <mars-button @click="draPlane">平面</mars-button>
            <mars-button @click="drawCurve(false)">曲线</mars-button>
            <mars-button @click="drawCorridor(false)">走廊</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
    <div class="f-pt">
      <a-row>
        <a-col :span="5">二维贴地:</a-col>
        <a-col :span="19">
          <a-space>
            <mars-button @click="drawPolyline(true)">线</mars-button>
            <mars-button @click="drawPolygon(true)">面</mars-button>
            <mars-button @click="drawEllipse(true)">圆</mars-button>
            <mars-button @click="drawCurve(true)">曲线</mars-button>
            <mars-button @click="drawCorridor(true)">走廊</mars-button>
            <mars-button @click="drawRectangle(true)">矩形</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
    <div class="f-pt">
      <a-row>
        <a-col :span="5">三维空间:</a-col>
        <a-col :span="19">
          <a-space>
            <mars-button @click="drawEllipsoid">球</mars-button>
            <mars-button @click="draWall(false)">墙</mars-button>
            <mars-button @click="drawBox">盒子</mars-button>
            <mars-button @click="drawExtrudedCircle">圆柱</mars-button>
            <mars-button @click="drawCylinder">圆锥</mars-button>
            <mars-button @click="draWall(true)">闭合墙</mars-button>
            <mars-button @click="drawExtrudedPolygon">面立体</mars-button>
            <mars-button @click="drawExtrudedRectangle">矩形立体</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </PannelBox>
  <GraphicEditor ref="editor" />
  <LocationTo />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import GraphicEditor from "@comp/GraphicEditor/index.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import _ from "lodash"
import * as mapWork from "./map.js"

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

// 显示隐藏
const isShow = ref(true)
const showChange = () => {
  mapWork.showGraphicLayer(isShow.value)
}

// 是否绑定Popup
const popupShow = ref(false)
const showPopup = () => {
  if (popupShow.value) {
    mapWork.bindLayerPopup()
  } else {
    mapWork.unbindPopup()
  }
}

// 是否绑定Tooltip
const tooltipShow = ref(false)
const showTooltip = () => {
  mapWork.showToolTip(tooltipShow.value)
}

// 是否绑定右键菜单
const contextMenuShow = ref(false)
const showContextMenu = () => {
  if (contextMenuShow.value) {
    mapWork.bindLayerContextMenu()
  } else {
    mapWork.unbindContextMenu()
  }
}

// 是否可编辑
const isEditable = ref(true)
const isEditableChange = () => {
  if (!isEditable.value) {
    editor.value.hideEditor()
  }
}

// 是否仅在3dtiles上标绘
const onlyPickModelPosition = ref(false)
const onlyPickModelPositionChange = () => {
  mapWork.onlyPickModelPositionChange(onlyPickModelPosition.value)
}

// 点击清除按钮
const clear = () => {
  mapWork.clear()
}

// 点击保存GeoJSON
const saveGeoJSON = () => {
  mapWork.saveGeoJSON()
}

// 打开GeoJSON
const openGeoJSON = (info: FileInfo) => {
  const item = info.file
  const fileName = item.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()
  console.log(item)
  if (fileType != "json") {
    alert("文件类型不合法,请选择json格式标注文件！")
  }
  mapWork.openGeoJSON(item)
}

// 点击保存KML
const saveKML = () => {
  mapWork.saveKML()
}

// 点击保存WKT
const saveWKT = () => {
  mapWork.saveWKT()
}

// 属性面板
const editor = ref()
mapWork.eventTarget.on("editorUI-draw", async (e: any) => {
  const result = await editor.value.setValue(e.graphic)
  if (result) {
    editor.value.showEditor()
  }
})
// 编辑修改了模型
mapWork.eventTarget.on("editorUI-SMR", async (e: any) => {
  const result = await editor.value.setValue(e.graphic)
  if (result) {
    editor.value.showEditor()
  }
})
// 停止编辑修改模型
mapWork.eventTarget.on("editorUI-stop", async (e: any) => {
  editor.value.hideEditor()
})

function drawPoint() {
  mapWork.drawPoint()
}

function drawMarker() {
  mapWork.drawMarker()
}

function drawLabel() {
  mapWork.drawLabel()
}

function drawModel() {
  mapWork.drawModel()
}

function drawPolyline(clampToGround: boolean) {
  mapWork.drawPolyline(clampToGround)
}

function drawPolygon(clampToGround: boolean) {
  mapWork.drawPolygon(clampToGround)
}

function drawCurve(clampToGround: boolean) {
  mapWork.drawCurve(clampToGround)
}

function drawCorridor(clampToGround: boolean) {
  mapWork.drawCorridor(clampToGround)
}

function drawEllipse(clampToGround: boolean) {
  mapWork.drawEllipse(clampToGround)
}

function drawRectangle(clampToGround: boolean) {
  mapWork.drawRectangle(clampToGround)
}

function draPlane() {
  mapWork.draPlane()
}

function draWall(closure: boolean) {
  mapWork.draWall(closure)
}

function drawBox() {
  mapWork.drawBox()
}

function drawCylinder() {
  mapWork.drawCylinder()
}

function drawEllipsoid() {
  mapWork.drawEllipsoid()
}

function drawExtrudedPolygon() {
  mapWork.drawExtrudedPolygon()
}

function drawExtrudedRectangle() {
  mapWork.drawExtrudedRectangle()
}

function drawExtrudedCircle() {
  mapWork.drawExtrudedCircle()
}
</script>
<style scoped lang="less">
.infoView {
  width: 340px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
</style>
