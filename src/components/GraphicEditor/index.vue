<template>
  <PannelBox class="attr-editor-model" v-auto-height="50" type="model" title="矢量数据属性" v-model:visible="visible">
    <div class="top-handle-bar">
      <a-space>
        <icon-send fill="#FFF" @click="flyToGraphic" title="飞行定位" />
        <icon-delete fill="#FFF" @click="deleteEntity"  title="删除" />
        <icon-save fill="#FFF" @click="getGeoJson" title="导出geojson"  />
      </a-space>
    </div>
    <div v-if="visible" class="attr-editor-main">
      <attrEditor v-if="activeTab === 'attr'" :labelWidth="labelWidth" :attrs="attrs" @attrChange="attrChange" />
      <coordEditor v-if="activeTab === 'coord'" :labelWidth="labelWidth" :lonlats="lonlats" @pointChange="pointChange" />
      <styleEditor v-if="activeTab === 'style'" :labelWidth="labelWidth" :styleConfig="styleConfig" :style="style" @styleChange="styleChange" />
    </div>
    <a-tabs v-model:activeKey="activeTab" tabPosition="bottom">
      <a-tab-pane key="attr" tab="属性"></a-tab-pane>
      <a-tab-pane key="coord" tab="坐标"></a-tab-pane>
      <a-tab-pane key="style" tab="样式"></a-tab-pane>
    </a-tabs>
  </PannelBox>
</template>

<script lang="ts" setup>
/**
 * 模型编辑组件
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { onBeforeMount, provide, ref } from "vue"
import _ from "lodash"
import axios from "axios"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import attrEditor from "./attr.vue"
import coordEditor from "./coord.vue"
import styleEditor from "./style.vue"

const mapWork = window.mapWork

// 获取属性配置列表
let graphicAttr: any = null
onBeforeMount(async () => {
  const { data } = await fetchAttrJson()
  graphicAttr = data
})

provide("getGraphicAttr", () => {
  return graphicAttr
})

function fetchAttrJson() {
  return axios.get(`${process.env.BASE_URL}config/attr.json`)
}

// 展示相关
const labelWidth = 8
const visible = ref(false)
const activeTab = ref("attr")

defineExpose({
  showEditor,
  hideEditor,
  setValue
})

// 显示编辑窗口处理相关参数
let graphic: any = null
const lonlats = ref<any[]>([])
const styleConfig = ref(null)
const style = ref(null)
const attrs = ref(null)

provide("getGraphic", () => {
  return graphic
})

function showEditor() {
  visible.value = true
}

function hideEditor() {
  style.value = null
  lonlats.value = []
  attrs.value = null
  visible.value = false
}
function setValue(gp: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (graphicAttr && gp.isEditing) {
        graphic = gp

        style.value = _.cloneDeep(graphic.options.style)
        lonlats.value = _.cloneDeep(graphic.coordinates || graphic.options.positions)
        attrs.value = _.cloneDeep(graphic.options.attr)

        const config = graphicAttr[graphic.attr.edittype || graphic.options.edittype || graphic.type] || {}
        styleConfig.value = _.cloneDeep(config)
        resolve(true)
      } else {
        resolve(false)
      }
    }, 100)
  })
}

// 事件处理
function flyToGraphic() {
  graphic.flyTo()
}

function deleteEntity() {
  graphic.remove()
}

// 文件处理
function getGeoJson() {
  const geojson = graphic.toGeoJSON()
  geojson.properties._layer = graphic._layer.name // 记录分组信息

  mapWork.mars3d.Util.downloadFile("标绘item.json", JSON.stringify(geojson))
}

function attrChange(attr: any) {
  graphic.setOptions({
    attr
  })
}

function pointChange(points: any[]) {
  lonlats.value = points
  graphic.positions = points
}

function styleChange(style: any) {
  graphic.setOptions({
    style
  })
}
</script>

<style lang="less" scoped>
.attr-editor-model {
  left: 10px;/*遮盖了toolbar按钮没有关系，按钮使用频次不高 */
  top: 10px;
  width: 260px;
  .top-handle-bar {
    border-bottom: 1px solid #cde1de;
    padding: 5px 0 2px 0;
    font-size: 20px;
    :deep(.i-icon) {
      cursor: pointer;
      line-height: 1;
    }
  }
  .attr-editor-main {
    height: calc(100% - 120px);
    overflow-y: auto;
    :deep(*) {
      font-size: 12px;
    }
  }

  :deep(.attr-editor-label) {
    word-break: break-all;
  }
}
</style>
