<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-row class="f-mb">
      <a-col :span="5" class="mars-pannel-item-label f-push-5-r">图层管理:</a-col>
      <a-col :span="18">
        <div class="grid-checkboxs">
          <a-checkbox v-model:checked="enabledShowHide" @change="onChangeShow">显示隐藏</a-checkbox>
          <a-checkbox v-model:checked="enabledPopup" @change="onChangePopup">Popup绑定</a-checkbox>
          <a-checkbox v-model:checked="enabledTooltip" @change="onChangeTooltip">Tooltip绑定</a-checkbox>
          <a-checkbox v-model:checked="enabledRightMenu" @change="onChangeContextMenu">右键菜单绑定</a-checkbox>
          <a-checkbox v-model:checked="isAutoEditing" @change="onChangeHasEdit">是否编辑</a-checkbox>
          <a-checkbox v-model:checked="onlyVertexPosition" @change="updateOnlyVertexPosition">开启顶点吸附 </a-checkbox>

          <a-checkbox v-model:checked="isDrawPrimitive" @change="changeDrawPrimitive">用Primitive绘制 </a-checkbox>
        </div>
      </a-col>
    </a-row>

    <a-row class="f-mb">
      <a-col :span="5" class="mars-pannel-item-label f-push-5-r">数据管理:</a-col>
      <a-col :span="18">
        <div class="grid-btns">
          <a-upload :multiple="false" name="file" accept=".json,.geojson,.kml,.kmz" :showUploadList="false"
            @change="onClickOpenJson" :beforeUpload="() => false">
            <mars-button class="open-btn">打开</mars-button>
          </a-upload>
          <mars-button class="small-btn" @click="onClickClear" danger>清除</mars-button>
          <mars-button class="long-btn" @click="onClickSaveJson">保存JSON</mars-button>
          <mars-button class="long-btn" @click="onClickSaveGeoJson">存GeoJSON</mars-button>
          <mars-button class="small-btn" @click="onClickSaveKml">保存KML</mars-button>
          <mars-button class="small-btn" @click="onClickSaveWKT">保存WKT</mars-button>
        </div>
      </a-col>
    </a-row>

    <a-row class="f-mb">
      <a-col :span="5" class="mars-pannel-item-label f-push-5-r">单个点类:</a-col>
      <a-col :span="18">
        <a-space>
          <mars-button @click="drawPoint">点</mars-button>
          <mars-button @click="drawLabel">文字</mars-button>
          <mars-button class="pad-none" @click="drawMarker">图标点</mars-button>
          <mars-button class="pad-none" @click="onClickStartDarw">小模型</mars-button>
        </a-space>
      </a-col>
    </a-row>

    <a-row class="f-mb">
      <a-col :span="5" class="mars-pannel-item-label f-push-5-r">二维空间:</a-col>
      <a-col :span="18">
        <a-space>
          <mars-button @click="drawPolyline(false)">线</mars-button>
          <mars-button class="pad-none" @click="drawBrushLine(false)">自由线</mars-button>
          <mars-button @click="drawPolygon(false)">面</mars-button>
          <mars-button @click="drawEllipse(false)">圆</mars-button>
          <mars-button @click="drawRectangle(false)">矩形</mars-button>
          <mars-button @click="draPlane">平面</mars-button>
          <mars-button @click="drawCurve(false)">曲线</mars-button>
          <mars-button @click="drawCorridor(false)">走廊</mars-button>
        </a-space>
      </a-col>
    </a-row>

    <a-row class="f-mb">
      <a-col :span="5" class="mars-pannel-item-label f-push-5-r">二维贴地:</a-col>
      <a-col :span="18">
        <a-space>
          <mars-button @click="drawPolyline(true)">线</mars-button>
          <mars-button class="pad-none" @click="drawBrushLine(true)">自由线</mars-button>
          <mars-button @click="drawPolygon(true)">面</mars-button>
          <mars-button @click="drawEllipse(true)">圆</mars-button>
          <mars-button @click="drawCurve(true)">曲线</mars-button>
          <mars-button @click="drawCorridor(true)">走廊</mars-button>
          <mars-button @click="drawRectangle(true)">矩形</mars-button>
        </a-space>
      </a-col>
    </a-row>

    <a-row class="f-mb">
      <a-col :span="5" class="mars-pannel-item-label f-push-5-r">三维空间:</a-col>
      <a-col :span="18">
        <a-space>
          <mars-button @click="drawEllipsoid">球</mars-button>
          <mars-button @click="draWall(false)">墙</mars-button>
          <mars-button @click="drawBox">盒子</mars-button>
          <mars-button @click="drawExtrudedCircle">圆柱</mars-button>
          <mars-button @click="drawCylinder">圆锥</mars-button>
          <mars-button class="pad-none" @click="draWall(true)">闭合墙</mars-button>
          <mars-button class="pad-none" @click="drawExtrudedPolygon">面立体</mars-button>
          <mars-button class="pad-none f-fs12" @click="drawExtrudedRectangle">矩形立体</mars-button>
        </a-space>
      </a-col>
    </a-row>

    <a-row>
      <a-col :span="5" class="mars-pannel-item-label f-push-5-r">其他:</a-col>
      <a-col :span="18">
        <a-space>
          <mars-button @click="mapWork.drawSatellite()">卫星</mars-button>
        </a-space>
      </a-col>
    </a-row>
  </mars-dialog>
  <location-to />
</template>

<script lang="ts" setup>
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import { ref, markRaw, onMounted } from "vue"
import { useWidget } from "@mars/widgets/common/store/widget"
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
const isDrawPrimitive = ref(false)
const changeDrawPrimitive = () => {
  mapWork.changeDrawEntity(!isDrawPrimitive.value)
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
const enabledRightMenu = ref(true)
const onChangeContextMenu = () => {
  if (enabledRightMenu.value) {
    mapWork.bindLayerContextMenu()
  } else {
    mapWork.graphicLayer.unbindContextMenu(true)
  }
}

// 是否可编辑
const isAutoEditing = ref(true)
const onChangeHasEdit = () => {
  mapWork.graphicLayer.isAutoEditing = isAutoEditing.value
}

//
const onlyVertexPosition = ref(false)
const updateOnlyVertexPosition = () => {
  mapWork.updateOnlyVertexPosition(onlyVertexPosition.value)
}

// 点击清除按钮
const onClickClear = () => {
  mapWork.graphicLayer.clear()
}

// 点击保存GeoJSON
const onClickSaveJson = () => {
  mapWork.saveJSON()
}

const onClickSaveGeoJson = () => {
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

function drawBrushLine(clampToGround: boolean) {
  mapWork.drawBrushLine(clampToGround)
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

// ************************属性面板************************/
const { activate, disable, isActivate, updateWidget } = useWidget()
mapWork.eventTarget.on("updateGraphicOptionsWidget", (event) => {
  if (event.disable) {
    disable("graphic-options")
  } else {
    const data = { layerId: event.layerId, graphicId: event.graphicId }
    if (!isActivate("graphic-options")) {
      activate({ name: "graphic-options", data })
    } else {
      updateWidget("graphic-options", data)
    }
  }
})
</script>
<style scoped lang="less">
:deep(.ant-space) {
  flex-wrap: wrap;
}

.long-btn {
  width: 100px !important;
}

.small-btn {
  width: 70px !important;
  padding: 0 5px;
}

.mars-button {
  width: 50px;
}

.mars-pannel-item-label {
  line-height: 32px;
}

.grid-checkboxs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  :deep(.ant-checkbox+span) {
    padding-inline-end: 0 !important;
  }
}

.grid-btns {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 7px;
}
</style>
