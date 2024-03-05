<template>
  <mars-dialog :visible="true" right="10" top="10" bottom="110" width="330" customClass="draw-model-list">
    <div class="f-mb">
      <a-checkbox @change="chkTestTerrain" v-model:checked="isTestTerrain" title="深度检测">深度检测</a-checkbox>
      <a-checkbox @change="onlyVertexPosition" v-model:checked="isonlyModel">开启顶点吸附</a-checkbox>
    </div>

    <div class="gltf-list">
      <mars-select ref="select" v-model:value="value1" :options="selectOptions" @change="handleChange"
        class="f-mb"></mars-select>

      <div class="gltfImg">
        <ul>
          <li v-for="imgs in dataList" :key="imgs.name">
            <img class="gltfImg_image" :src="imgs.image" alt="" @click="showModel(imgs.style)" />
          </li>
        </ul>
      </div>
    </div>
  </mars-dialog>


  <mars-dialog :visible="true" right="339" top="10" width="32px" :min-width="32" :height="111" customClass="draw-model-icons">
    <div class="info-view-content"> 
      <a-upload :multiple="false" name="file" accept="json,geojson" :showUploadList="false" @change="openGeoJSON"
        :beforeUpload="() => false">
        <i title="打开GeoJSON文件"><mars-icon icon="folder-close" width="18"  color="#ffffffb3" /></i>
      </a-upload>
      <mars-icon icon="inbox-download-r" width="18" color="#ffffffb3" @click="saveGeoJSON" title="保存GeoJSON" />
      <mars-icon icon="delete" width="18" color="#ffffffb3" @click="deleteMoXin" title="删除" />
 
    </div>
  </mars-dialog>

  <location-to />
</template>

<script lang="ts" setup>
import { ref, markRaw, onMounted } from "vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
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

// 深度检测
const isTestTerrain = ref<boolean>(false)
const chkTestTerrain = () => {
  mapWork.chkTestTerrain(isTestTerrain.value)
}

const isonlyModel = ref<boolean>(false)
const onlyVertexPosition = () => {
  mapWork.onlyVertexPosition(isonlyModel.value)
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

// 数据编辑属性面板 相关处理
const { activate, disable, isActivate, updateWidget } = useWidget()
onMounted(() => {
  const mars3d = window.mapWork.mars3d
  // 矢量数据创建完成
  mapWork.graphicLayer.on(mars3d.EventType.drawCreated, function (e) {
    showEditor(e)
  })
  // 修改了矢量数据
  mapWork.graphicLayer.on(
    [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
    function (e) {
      showEditor(e)
    }
  )
  // 停止编辑
  mapWork.graphicLayer.on([mars3d.EventType.editStop, mars3d.EventType.removeGraphic], function (e) {
    setTimeout(() => {
      if (!mapWork.graphicLayer.isEditing) {
        disable("graphic-editor")
      }
    }, 100)
  })
})

const showEditor = (e: any) => {
  const graphic = e.graphic
  if (!graphic._conventStyleJson) {
    graphic.options.style = graphic.toJSON().style // 因为示例中的样式可能有复杂对象，需要转为单个json简单对象
    graphic._conventStyleJson = true // 只处理一次
  }

  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: {
        graphic: markRaw(graphic)
      }
    })
  } else {
    updateWidget("graphic-editor", {
      data: {
        graphic: markRaw(graphic)
      }
    })
  }
}

const deleteMoXin = () => {
  mapWork.deleteAll()
}
</script>
<style scoped lang="less">
.info-view-content { 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;  
}

.gltf-list {
  height: calc(100% - 32px);

  .gltfImg {
    width: calc(100% + 14px);
    height: calc(100% - 42px);
    max-height: 670px;
    overflow-y: auto;

    >ul {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 10px;

      >li {
        width: 94px;
        height: 94px;
        border-radius: 4px;
        list-style-type: none;
        padding: 4px;
        border: 1.5px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.1);

        .gltfImg_image {
          width: 100%;
          height: 100%;
          border: 1.5px solid white;
        }
      }
    }
  }
}

.ant-upload {
  line-height: 0 !important;
}
</style>
<style lang="less">
// 修改双滑动条问题
.draw-model-icons {
  .mars-dialog__content {
    padding: 5px 12px 8px !important; 
  }
}
</style>
