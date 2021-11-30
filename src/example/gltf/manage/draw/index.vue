<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span>模型URl</span>
          <mars-input v-model:value="modelUrl"></mars-input>
          <a-checkbox v-model:checked="isProxy">代理</a-checkbox>
          <mars-button @click="drawModel">标绘</mars-button>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-checkbox @change="chkHasTerrain" v-model:checked="isHasTerrain">地形</a-checkbox>
          <a-checkbox @change="chkTestTerrain" v-model:checkde="isTestTerrain">深度检测</a-checkbox>
          <a-checkbox @change="onlyPickModelPosition" v-model:checked="isonlyModel">仅在3dtiles上标绘</a-checkbox>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
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
          <mars-button @click="saveGeoJSON">保存</mars-button>
          <mars-button @click="clear">清除</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
  <GraphicEditor ref="editor" />
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import GraphicEditor from "@comp/GraphicEditor/index.vue"
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
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
const globalProperties = getCurrentInstance()!.appContext.config.globalProperties
const editor = ref()

const modelUrl = ref<string>("//data.mars3d.cn/gltf/mars/feiji.glb")

const isProxy = ref<boolean>(false)

const isHasTerrain = ref<boolean>(false)

const isTestTerrain = ref<boolean>(true)

const isonlyModel = ref<boolean>(false)

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

// 标绘
const drawModel = () => {
  mapWork.drawModel(modelUrl.value, isProxy.value)
}

// 地形
const chkHasTerrain = () => {
  mapWork.chkHasTerrain(isHasTerrain.value)
}

// 深度检测
const chkTestTerrain = () => {
  mapWork.chkTestTerrain(isTestTerrain.value)
}

const onlyPickModelPosition = () => {
  mapWork.onlyPickModelPosition(isonlyModel.value)
}

// 打开
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
// 点击保存GeoJSON
const saveGeoJSON = () => {
  if (mapWork.graphicLayer.length === 0) {
    globalProperties.$message("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = mapWork.graphicLayer.toGeoJSON()
  mapWork.mars3d.Util.downloadFile("我的标注.json", JSON.stringify(geojson))
}

const clear = () => {
  mapWork.deleteAll()
}
</script>
