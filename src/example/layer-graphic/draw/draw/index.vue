<template>
  <mars-pannel :visible="true" right="10" top="10" width="345px">
    <div>
      <a-row>
        <a-col :span="5">数据管理:</a-col>
        <a-col :span="19">
          <a-space>
            <a-checkbox v-model:checked="enabledShowHide" @change="onChangeShow">显示隐藏</a-checkbox>
            <a-checkbox v-model:checked="enabledPopup" @change="onChangePopup">Popup绑定</a-checkbox>
            <a-checkbox v-model:checked="enabledTooltip" @change="onChangeTooltip">Tooltip绑定</a-checkbox>
            <a-checkbox v-model:checked="enabledRightMenu" @change="onChangeContextMenu">右键菜单绑定</a-checkbox>
            <a-checkbox v-model:checked="enabledEdit" @change="onChangeHasEdit">是否编辑</a-checkbox>
            <a-checkbox v-model:checked="onlyPickModelPosition" @change="onChangeOnlyPickModel">
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
            <mars-button @click="onClickClear">清除</mars-button>
            <a-upload
              :multiple="false"
              name="file"
              accept="json,geojson,kml,kmz"
              :showUploadList="false"
              @change="onClickOpenJson"
              :beforeUpload="() => false"
            >
              <mars-button> 打开... </mars-button>
            </a-upload>
            <mars-button @click="onClickSaveJson">保存GeoJSON</mars-button>
            <mars-button @click="onClickSaveKml">另存KML</mars-button>
            <mars-button @click="onClickSaveWKT">另存WKT</mars-button>
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
            <mars-button @click="onClickStartDarw">小模型</mars-button>
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
  </mars-pannel>
  <location-to />
</template>

<script lang="ts" setup>
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import { ref, markRaw } from "vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import * as mapWork from "./map.js"

const { activate, disable, isActivate, updateWidget } = useWidget()

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
const enabledShowHide = ref(true)
const onChangeShow = () => {
  mapWork.graphicLayer.show = enabledShowHide.value
}

// 是否绑定Popup
const enabledPopup = ref(false)
const onChangePopup = () => {
  if (enabledPopup.value) {
    mapWork.bindLayerPopup()
  } else {
    mapWork.graphicLayer.unbindPopup()
  }
}

// 是否绑定Tooltip
const enabledTooltip = ref(false)
const onChangeTooltip = () => {
  if (enabledTooltip.value) {
    mapWork.graphicLayer.bindTooltip("我是layer上绑定的Tooltip")
  } else {
    mapWork.graphicLayer.unbindTooltip()
  }
}

// 是否绑定右键菜单
const enabledRightMenu = ref(false)
const onChangeContextMenu = () => {
  if (enabledRightMenu.value) {
    mapWork.bindLayerContextMenu()
  } else {
    mapWork.graphicLayer.unbindContextMenu(true)
  }
}

// 是否可编辑
const enabledEdit = ref(true)
const onChangeHasEdit = () => {
  if (!enabledEdit.value) {
    disable("graphic-editor")
  }
}

// 是否仅在3dtiles上标绘
const onlyPickModelPosition = ref(false)
const onChangeOnlyPickModel = () => {
  mapWork.updateOnlyPickModelPosition(onlyPickModelPosition.value)
}

// 点击清除按钮
const onClickClear = () => {
  mapWork.clearAllGraphic()
}

// 点击保存GeoJSON
const onClickSaveJson = () => {
  mapWork.saveGeoJSON()
}

// 打开GeoJSON
const onClickOpenJson = (info: FileInfo) => {
  mapWork.openGeoJSON(info.file)
}

// 点击保存KML
const onClickSaveKml = () => {
  mapWork.saveKML()
}

// 点击保存WKT
const onClickSaveWKT = () => {
  mapWork.saveWKT()
}

// 属性面板

const showEditor = (e: any) => {
  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: { graphic: markRaw(e.graphic) }
    })
  } else {
    updateWidget("graphic-editor", {
      data: { graphic: markRaw(e.graphic) }
    })
  }
}
mapWork.eventTarget.on("graphicEditor-start", async (e: any) => {
  if (enabledEdit.value) {
    showEditor(e)
  }
})
// 编辑修改了模型
mapWork.eventTarget.on("graphicEditor-update", async (e: any) => {
  showEditor(e)
})

// 停止编辑修改模型
mapWork.eventTarget.on("graphicEditor-stop", async (e: any) => {
  disable("graphic-editor")
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

function onClickStartDarw() {
  mapWork.startDrawModel()
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
:deep(.ant-space) {
  flex-wrap: wrap;
}
</style>
