<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <span>模型URL地址: </span> &nbsp;&nbsp;
      <a-checkbox v-model:checked="isProxy">使用代理</a-checkbox>
      <mars-input v-model:value="modelUrl"></mars-input>
    </div>
    <div class="f-mb">
      <a-space>
        <mars-button @click="onClickStartDarw">标绘</mars-button>
        <mars-button @click="clear">清除</mars-button>
        <mars-button @click="saveGeoJSON">保存</mars-button>
        <a-upload :multiple="false" name="file" accept="json,geojson" :showUploadList="false" @change="openGeoJSON" :beforeUpload="() => false">
          <mars-button> 打开... </mars-button>
        </a-upload>
      </a-space>
      <div class="f-pt">
        <a-space>
          <a-checkbox @change="chkTestTerrain" v-model:checked="isTestTerrain">深度检测</a-checkbox>
          <a-checkbox @change="onlyPickModelPosition" v-model:checked="isonlyModel">仅在3dtiles上标绘</a-checkbox>
          <a-checkbox @change="chkHasTerrain" v-model:checked="isHasTerrain">地形</a-checkbox>
        </a-space>
      </div>
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
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

const modelUrl = ref<string>("//data.mars3d.cn/gltf/mars/feiji.glb")

// 代理
const isProxy = ref<boolean>(false)
const onClickStartDarw = () => {
  mapWork.startDrawModel(modelUrl.value, isProxy.value)
}

// 地形
const isHasTerrain = ref<boolean>(true)
const chkHasTerrain = () => {
  mapWork.chkHasTerrain(isHasTerrain.value)
}

// 深度检测
const isTestTerrain = ref<boolean>(false)
const chkTestTerrain = () => {
  mapWork.chkTestTerrain(isTestTerrain.value)
}

// 仅在3dmodel上绘制
const isonlyModel = ref<boolean>(false)
const onlyPickModelPosition = () => {
  mapWork.onlyPickModelPosition(isonlyModel.value)
}

const clear = () => {
  mapWork.graphicLayer.clear()
}

// *****************************JSON文件***************************//
// const globalProperties = getCurrentInstance()!.appContext.config.globalProperties

// 打开JSON
const openGeoJSON = (info: FileInfo) => {
  const item = info.file
  const fileName = item.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()

  if (fileType !== "json") {
    alert("文件类型不合法,请选择json格式标注文件！")
  }
  mapWork.openGeoJSON(item)
}
// 点击保存GeoJSON
const saveGeoJSON = () => {
  mapWork.saveGeoJSON()
}

// *****************************属性面板***************************//

const showEditor = (e: any) => {
  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: { graphic: markRaw(e.graphic) }
    })
  }
}
mapWork.eventTarget.on("graphicEditor-start", async (e: any) => {
  showEditor(e)
})
// 编辑修改了模型
mapWork.eventTarget.on("graphicEditor-update", async (e: any) => {
  updateWidget("graphic-editor", {
    data: { graphic: markRaw(e.graphic) }
  })
  showEditor(e)
})

// 停止编辑修改模型
mapWork.eventTarget.on("graphicEditor-stop", async (e: any) => {
  disable("graphic-editor")
})
</script>
