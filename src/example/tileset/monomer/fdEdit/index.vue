<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <a-radio-group @change="modeChange" v-model:value="value" name="radioGroup">
            <a-radio value="1">编辑模式</a-radio>
            <a-radio value="2">预览模式</a-radio>
          </a-radio-group>
        </a-space>
      </a-form-item>

      <a-form-item v-if="value === '1' ">
        <a-space>
          <mars-button @click="drawPolygon">单体化面</mars-button>
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

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import GraphicEditor from "@comp/GraphicEditor/index.vue"

export default defineComponent({
  components: {
    PannelBox,
    GraphicEditor
  },

  setup() {
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

    const value = ref<string>("1")

    mapWork.graphicLayerEdit.on(mapWork.mars3d.EventType.drawCreated, async (e: any) => {
      const result = await editor.value.setValue(e.graphic)
      if (result) {
        editor.value.showEditor()
      }
    })

    // 编辑修改了模型
    mapWork.graphicLayerEdit.on(
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
    mapWork.geoJsonLayerDTH.on([mapWork.mars3d.EventType.editStop, mapWork.mars3d.EventType.removeGraphic], async (e: any) => {
      editor.value.hideEditor()
    })

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
      if (mapWork.graphicLayerEdit.length === 0) {
        globalProperties.$message("当前没有标注任何数据，无需保存！")
        return
      }
      const geojson = mapWork.graphicLayerEdit.toGeoJSON()
      mapWork.mars3d.Util.downloadFile("单体化.json", JSON.stringify(geojson))
    }

    // 单体化面
    const drawPolygon = () => {
      mapWork.drawPolygon()
    }

    const clear = () => {
      mapWork.deleteAll()
    }

    // 模式发生改变
    const modeChange = () => {
      if (value.value === "1") {
        mapWork.toBJMS()
      }
      mapWork.toYLMS()
    }

    return {
      drawPolygon,
      value,
      openGeoJSON,
      saveGeoJSON,
      clear,
      editor,
      modeChange
    }
  }
})
</script>
<style scoped lang="less"></style>
