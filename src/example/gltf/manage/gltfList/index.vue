<template>
  <PannelBox class="infoView modelView" v-auto-height="60">
    <a-form>
      <a-form-item>
        <a-space>
          <a-checkbox @change="chkTestTerrain" v-model:checkde="isTestTerrain">深度检测</a-checkbox>
          <a-checkbox @change="onlyPickModelPosition" v-model:checked="isonlyModel">仅在3dtiles上标绘</a-checkbox>
        </a-space>
      </a-form-item>

      <div class="infoView-content">
        <a-upload
          :multiple="false"
          name="file"
          accept="json,geojson,kml,kmz"
          :showUploadList="false"
          @change="openGeoJSON"
          :beforeUpload="() => false"
        >
          <icon-folder-upload class="icon" theme="outline" size="20" fill="#ffffff" title="打开" />
        </a-upload>
        <icon-disk class="icon" theme="outline" size="20" fill="#ffffff" @click="saveGeoJSON" title="保存GeoJSON" />
      </div>

      <a-form-item>
        <mars-select
          ref="select"
          v-model:value="value1"
          style="width: 200px; margin-left: 10px"
          :options="selectOptions"
          @focus="focus"
          @change="handleChange"
        ></mars-select>

        <div class="gltfImg" v-auto-height="220">
          <ul>
            <li v-for="imgs in dataList" :key="imgs.name">
              <img :src="imgs.image" alt="" @click="showModel(imgs.style)" />
            </li>
          </ul>
        </div>
      </a-form-item>
    </a-form>
  </PannelBox>
  <GraphicEditor ref="editor" />
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from "vue"
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

const isTestTerrain = ref<boolean>(true)

const isonlyModel = ref<boolean>(false)

const value1 = ref<string>("车辆")

let modelData: any

const selectOptions = ref<any[]>([])

onMounted(() => {
  mapWork.eventTarget.on("loadOk", function (event: any) {
    modelData = event.data
    Object.keys(modelData).forEach((k, index) => {
      selectOptions.value.push({
        value: k,
        lable: k
      })
    })
    handleChange()
  })
})

mapWork.graphicLayer.on(mapWork.mars3d.EventType.drawCreated, async (e: any) => {
  const result = await editor.value.setValue(e.graphic)
  if (result) {
    editor.value.showEditor()
  }
})

// 编辑修改了模型
mapWork.graphicLayer.on(
  [
    mapWork.mars3d.EventType.editStart,
    mapWork.mars3d.EventType.editMovePoint,
    mapWork.mars3d.EventType.editStyle,
    mapWork.mars3d.EventType.editRemovePoint
  ],
  async (e: any) => {
    const result = await editor.value.setValue(e.graphic)
    if (result) {
      editor.value.showEditor()
    }
  }
)

// 停止编辑修改模型
mapWork.graphicLayer.on([mapWork.mars3d.EventType.editStop, mapWork.mars3d.EventType.removeGraphic], async (e: any) => {
  editor.value.hideEditor()
})

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
  mapWork.mars3d.Util.downloadFile("模型标绘.json", JSON.stringify(geojson))
}

const dataList = ref<any[]>([])

const handleChange = () => {
  dataList.value = modelData[value1.value]

  for (let i = 0; i < dataList.value.length; i++) {
    const item = dataList.value[i]

    item.image = mapWork.mars3d.Util.template(item.image, { gltfServerUrl: "//data.mars3d.cn/gltf" })
    item.style.url = mapWork.mars3d.Util.template(item.style.url, { gltfServerUrl: "//data.mars3d.cn/gltf" })
    dataList.value[i] = item
  }
}

const showModel = (style: any) => {
  mapWork.drawGltf(style)
}
</script>
<style scoped lang="less">
.infoView-content {
  top: 10px;
  width: 210px;
  background-color: rgba(32, 42, 68, 0.5);
}
.icon {
  margin-left: 10px;
}
.modelView {
  right: 10px;
  width: 240px;
}
.gltfImg {
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}

.gltfImg li {
  display: inline-block;
  margin-right: 5px;
  width: 100px;
  text-align: center;
  padding-bottom: 10px;
}

.gltfImg img {
  width: 100px;
  height: 90px;
  border: 1.5px solid white;
}
</style>
