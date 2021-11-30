<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <a-row>
        <a-col :span="5">图层状态:</a-col>
        <a-col :span="19">
          <a-space>
            <a-checkbox v-model:checked="enabledShowHide" @change="bindShowHide">显示隐藏</a-checkbox>
            <a-checkbox v-model:checked="enabledPopup" @change="bindPopup">Popup绑定</a-checkbox>
            <a-checkbox v-model:checked="enabledTooltip" @change="bindTooltip">Tooltip</a-checkbox>
            <a-checkbox v-model:checked="enabledRightMenu" @change="bindRightMenu">右键绑定</a-checkbox>
            <a-checkbox v-model:checked="isEditable" @change="isEditableChange">是否编辑</a-checkbox>
          </a-space>
        </a-col>
      </a-row>
    </div>
    <div class="f-mb">
      <a-row>
        <a-col :span="5">数据管理:</a-col>
        <a-col :span="19">
          <a-space>
            <mars-button @click="btnClear">清除</mars-button>
            <mars-button @click="btnExpFile">保存GeoJSON</mars-button>
            <a-upload
              :multiple="false"
              name="file"
              accept="json,geojson"
              :file-list="fileList"
              :showUploadList="false"
              :supportServerRender="true"
              :beforeUpload="beforeUploade"
              @change="btnImpFile"
            >
              <a-button>
                <upload-outlined></upload-outlined>
                打开GeoJSON
              </a-button>
            </a-upload>
          </a-space>
        </a-col>
      </a-row>
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
            <mars-button @click="drawPolygon('fineArrowYW')">燕尾直箭头</mars-button>
            <mars-button @click="drawPolygon('fineArrow')">粗单尖直箭头</mars-button>
            <mars-button @click="drawPolygon('attackArrowPW')">平尾攻击箭头</mars-button>
            <mars-button @click="drawPolygon('attackArrowYW')">燕尾攻击箭头</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="5">三维贴地:</a-col>
        <a-col :span="19">
          <a-space>
            <mars-button @click="drawExtrudedPolygon('doubleArrow')">钳击箭头</mars-button>
            <mars-button @click="drawExtrudedPolygon('closeVurve')">闭合曲面</mars-button>
            <mars-button @click="drawExtrudedPolygon('attackArrow')">攻击箭头</mars-button>
            <mars-button @click="drawExtrudedPolygon('gatheringPlace')">集结地</mars-button>
            <mars-button @click="drawExtrudedPolygon('straightArrow')">粗直箭头</mars-button>
            <mars-button @click="drawExtrudedPolygon('fineArrowYW')">燕尾直箭头</mars-button>
            <mars-button @click="drawExtrudedPolygon('fineArrow')">粗单尖直箭头</mars-button>
            <mars-button @click="drawExtrudedPolygon('attackArrowPW')">平尾攻击箭头</mars-button>
            <mars-button @click="drawExtrudedPolygon('attackArrowYW')">燕尾攻击箭头</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </PannelBox>
  <GraphicEditor ref="editor" />
  <LocationTo />
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import GraphicEditor from "@comp/GraphicEditor/index.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
const editor = ref()

// 是否可编辑
const isEditable = ref(true)
const isEditableChange = () => {
  if (!isEditable.value) {
    editor.value.hideEditor()
  }
}

// 显示隐藏
const enabledShowHide = ref(true)
const bindShowHide = () => {
  mapWork.bindShowHide(enabledShowHide)
}

// 是否绑定Popup
const enabledPopup = ref(true)
const bindPopup = () => {
  mapWork.bindPopup(enabledPopup)
}

// 是否绑定Tooltip
const enabledTooltip = ref(false)
const bindTooltip = () => {
  mapWork.bindTooltip(enabledTooltip)
}

// 是否绑定右键菜单
const enabledRightMenu = ref(true)
const bindRightMenu = () => {
  mapWork.bindRightMenu(enabledRightMenu)
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
const btnClear = () => {
  mapWork.btnClear()
}
// 保存geojson
const btnExpFile = () => {
  mapWork.btnExpFile()
}
// 打开geojson
const beforeUploade = (file: FileItem) => {
  // fileList.value = [file]
  return false
}
const btnImpFile = (info: FileInfo) => {
  const item = info.file
  const fileName = item.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()

  if (fileType != "json") {
    window.$message("文件类型不合法,请选择json格式标注文件！")
  }
  mapWork.btnImpFile(item)
}

const fileList = ref([])

const drawPolygon = (type: any) => {
  mapWork.drawPolygon(type)
}
const drawExtrudedPolygon = (type: any) => {
  mapWork.drawExtrudedPolygon(type)
}

// 开始编辑
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
</script>
<style scoped lang="less">
.infoView {
  width: 362px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
</style>
