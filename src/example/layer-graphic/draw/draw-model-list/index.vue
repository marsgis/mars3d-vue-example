<template>
  <mars-pannel :visible="true" right="10" top="10" bottom="40" width="255">
    <div style="width: 220px">
      <div class="f-mb infoView-content">
        <a-space>
          <span>模型列表： </span>
          <a-upload :multiple="false" name="file" accept="json,geojson" :showUploadList="false" @change="openGeoJSON" :beforeUpload="() => false">
            <i title="打开GeoJSON文件"><mars-icon icon="folder-upload" width="19" /></i>
          </a-upload>
          <i title="保存GeoJSON"><mars-icon icon="disk" width="17" color="#f2f2f2" @click="saveGeoJSON" /></i>
        </a-space>
      </div>

      <div class="f-mb">
        <a-checkbox @change="chkTestTerrain" v-model:checked="isTestTerrain" title="深度检测">深度</a-checkbox>
        <a-checkbox @change="onlyPickModelPosition" v-model:checked="isonlyModel">仅在Tiles上拾取</a-checkbox>
      </div>

      <div class="f-mb">
        <mars-select
          ref="select"
          v-model:value="value1"
          style="width: 200px; margin-left: 10px"
          :options="selectOptions"
          @change="handleChange"
        ></mars-select>

        <div class="f-mb gltfImg">
          <ul>
            <li v-for="imgs in dataList" :key="imgs.name">
              <img :src="imgs.image" alt="" @click="showModel(imgs.style)" />
            </li>
          </ul>
        </div>
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

// 深度检测
const isTestTerrain = ref<boolean>(false)
const chkTestTerrain = () => {
  mapWork.chkTestTerrain(isTestTerrain.value)
}

// 仅在模型上绘制
const isonlyModel = ref<boolean>(false)
const onlyPickModelPosition = () => {
  mapWork.onlyPickModelPosition(isonlyModel.value)
}

// 绘制模型
const showModel = (style: any) => {
  mapWork.startDrawModel(style)
}

//* **********************下拉框******************* */
let modelData: any
const selectOptions = ref<any[]>([])
const value1 = ref<string>("车辆")
const dataList = ref<any[]>([])

mapWork.eventTarget.on("loadModelList", function (event: any) {
  modelData = event.data
  // 下拉框数据
  Object.keys(modelData).forEach((k) => {
    selectOptions.value.push({
      value: k,
      lable: k
    })
  })
  handleChange()
})
// 下拉框改变
const handleChange = () => {
  dataList.value = modelData[value1.value]

  for (let i = 0; i < dataList.value.length; i++) {
    const item = dataList.value[i]

    item.image = mapWork.changeItemImage(item)
    item.style.url = mapWork.changeItemUrl(item)
    dataList.value[i] = item
  }
}

// ************************JSON文件************************/
// 打开
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

// ************************属性面板************************/

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
  setTimeout(() => {
    if (!mapWork.graphicLayer.isEditing) {
      disable("graphic-editor")
    }
  }, 100)
})
</script>
<style scoped lang="less">
.infoView-content {
  height: 20px;
  width: 210px;
  line-height: 20px;
  background-color: rgba(32, 42, 68, 0.5);
  overflow: hidden;
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
.ant-upload {
  line-height: 0 !important;
}
</style>
