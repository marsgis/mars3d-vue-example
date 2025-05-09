<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-row>
        <a-col :span="5">图层状态:</a-col>
        <a-col :span="19">
          <a-space>
            <a-checkbox v-model:checked="enabledShowHide" @change="onChangeShow">显示隐藏</a-checkbox>
            <a-checkbox v-model:checked="enabledPopup" @change="onChangePopup">Popup绑定</a-checkbox>
            <a-checkbox v-model:checked="enabledTooltip" @change="onChangeTooltip">Tooltip</a-checkbox>
            <a-checkbox v-model:checked="enabledRightMenu" @change="onChangeContextMenu">右键绑定</a-checkbox>
            <a-checkbox v-model:checked="isAutoEditing" @change="isEditableChange">是否编辑</a-checkbox>
          </a-space>
        </a-col>
      </a-row>
    </div>
    <div class="f-mb">
      <a-row>
        <a-col :span="5">数据管理:</a-col>
        <a-col :span="19">
          <a-space>
            <mars-button class="long-btn" @click="onClickExpFile">保存GeoJSON</mars-button>
            <a-upload :multiple="false" name="file" accept=".json,.geojson" :file-list="fileList"
              :showUploadList="false"
              :supportServerRender="true" :beforeUpload="() => false" @change="onClickImpFile">
              <mars-button class="long-btn"> 打开GeoJSON </mars-button>
            </a-upload>
          </a-space>
        </a-col>
      </a-row>
      <mars-button class="remove-btn" @click="onClickClear" danger>清除</mars-button>

    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="5">二维贴地:</a-col>
        <a-col :span="19">
          <a-space>
            <mars-button @click="drawPolygon('doubleArrow')">钳击箭头</mars-button>
            <mars-button @click="drawPolygon('closeVurve')">闭合曲面</mars-button>
            <mars-button @click="drawPolygon('attackArrow')">攻击箭头</mars-button>
            <mars-button @click="drawPolygon('gatheringPlace')">集结地</mars-button>
            <mars-button @click="drawPolygon('straightArrow')">粗直箭头</mars-button>
            <mars-button class="small-size" @click="drawPolygon('fineArrowYW')">燕尾直箭头</mars-button>
            <mars-button class="long-btn" @click="drawPolygon('fineArrow')">粗单尖直箭头</mars-button>
            <mars-button class="long-btn" @click="drawPolygon('attackArrowPW')">平尾攻击箭头</mars-button>
            <mars-button class="long-btn" @click="drawPolygon('attackArrowYW')">燕尾攻击箭头</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="5">三维立体:</a-col>
        <a-col :span="19">
          <a-space>
            <mars-button @click="drawExtrudedPolygon('doubleArrow')">钳击箭头</mars-button>
            <mars-button @click="drawExtrudedPolygon('closeVurve')">闭合曲面</mars-button>
            <mars-button @click="drawExtrudedPolygon('attackArrow')">攻击箭头</mars-button>
            <mars-button @click="drawExtrudedPolygon('gatheringPlace')">集结地</mars-button>
            <mars-button @click="drawExtrudedPolygon('straightArrow')">粗直箭头</mars-button>
            <mars-button class="small-size" @click="drawExtrudedPolygon('fineArrowYW')">燕尾直箭头</mars-button>
            <mars-button class="long-btn" @click="drawExtrudedPolygon('fineArrow')">粗单尖直箭头</mars-button>
            <mars-button class="long-btn" @click="drawExtrudedPolygon('attackArrowPW')">平尾攻击箭头</mars-button>
            <mars-button class="long-btn" @click="drawExtrudedPolygon('attackArrowYW')">燕尾攻击箭头</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </mars-dialog>
  <location-to />
</template>

<script setup lang="ts">
import { ref, markRaw, onMounted } from "vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import { $message } from "@mars/components/mars-ui/index"
import { useWidget } from "@mars/widgets/common/store/widget"
import * as mapWork from "./map.js"

// 是否可编辑
const isAutoEditing = ref(true)
const isEditableChange = () => {
  mapWork.graphicLayer.isAutoEditing = isAutoEditing.value
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

//  清除数据
const onClickClear = () => {
  mapWork.graphicLayer.clear()
}

// 保存geojson
const onClickExpFile = () => {
  if (mapWork.graphicLayer.length === 0) {
    $message("当前没有标注任何数据，无需保存！")
    return
  }
  mapWork.downloadJsonFile()
}
// 打开geojson
const onClickImpFile = (info: FileInfo) => {
  mapWork.openGeoJSON(info.file)
}

const fileList = ref([])

const drawPolygon = (type: any) => {
  mapWork.drawPolygon(type)
}
const drawExtrudedPolygon = (type: any) => {
  mapWork.drawExtrudedPolygon(type)
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
  width: 109px !important;
}

.small-size {
  // font-size: 12px !important;
  padding: 0 !important;
}

.remove-btn {
  width: 228px !important;
  margin-left: 63px;
  margin-top: 10px;
}

.mars-button {
  width: 69px;
}
</style>
