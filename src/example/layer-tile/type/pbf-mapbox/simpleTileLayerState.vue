<template>
  <div>
    <a-space>
      <mars-button v-if="formState.hasAddTileLayer" @click="addTileLayer">添加图层</mars-button>
      <mars-button v-if="formState.hasAddTileLayer" @click="removeTileLayer">移除图层</mars-button>
    </a-space>
    <div class="showTableControl">
      <span>显示列表</span>
      <mars-switch v-model:checked="formState.showTable" title="显示图层内所有矢量数据列表" />
    </div>
  </div>

  <!-- 使用表格实现界面 -->
  <div class="f-mt" v-if="formState.showTable">
    <mars-table
      :row-selection="tileLayerRowSelection"
      :dataSource="tileLayerList"
      :columns="tileLayerColumns"
      bordered
      :pagination="{ pageSize: 5 }"
      size="small"
      :customRow="tileLayerCustomRowObj">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'edit'">
          <a-space>
            <mars-icon icon="aiming" color="#f2f2f2" class="icon-vertical-a" title="飞行定位"
              @click.stop="flyToLayer(record)" />
            <mars-icon icon="delete" color="#F96868" class="icon-vertical-a" title="删除图层"
              @click.stop="deleteLayer(record)" />
          </a-space>
        </template>
      </template>
    </mars-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import type { UnwrapRef } from "vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork
const mars3d = mapWork.mars3d

interface FormState {
  show: boolean
  hasAddTileLayer: boolean
  hasPopup: boolean
  hasHighlight: boolean
  showTable: boolean // 控制列表的显示与隐藏
  layerName: string
}
const formState: UnwrapRef<FormState> = reactive({
  show: true,
  hasAddTileLayer: true,
  hasPopup: true,
  hasHighlight: true,
  showTable: true,
  layerName: ""
})

// 表格相关
interface LayerTableItem {
  key: number
  name: string
  isTile: boolean
}

const tileLayerList = ref([])
const rowKeys = ref<string[]>([])

const tileLayerColumns = ref([
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    align: "center"
  },
  {
    title: "编辑",
    dataIndex: "edit",
    key: "edit",
    align: "center"
  }
])

// 选择功能的配置
const tileLayerRowSelection = ref({
  hideSelectAll: true,
  hideDefaultSelections: true,
  selectedRowKeys: rowKeys,
  onChange: (selectedRowKeys: string[]) => {
    rowKeys.value = selectedRowKeys
  },
  onSelect: (record: LayerTableItem, selected: boolean) => {
    const layer = map.getLayerById(record.key)
    layer.show = selected // 图层显示
  }
})
// 实现点击行聚焦到对应位置
const tileLayerCustomRowObj = (record) => {
  return {
    onClick: () => {
      startEditingLayer(record)
    }
  }
}

let map
let thisLayer: any // 选中的图层

onMounted(() => {
  map = mapWork.map

  formState.hasAddTileLayer = Boolean(mapWork.addTileLayer)

  const list = []
  const layers = map.getLayers()
  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i]
    if (layer.isPrivate) {
      continue
    }

    list.push({
      key: layer.id,
      name: `${layer.type} - ${layer.name || "未命名"}`,
      isTile: layer.isTile
    })
  }
  tileLayerList.value = list

  console.log("当前图层列表为", list)

  // 实现默认全部选中
  rowKeys.value = list.map((item) => item.key)

  selectedFirst()

  // 添加新的图层，数组中也添加数据
  map.on(mars3d.EventType.addLayer, function (event) {
    const layer = event.layer
    if (layer.isPrivate || layer.name === "POI查询") {
      return
    }

    tileLayerList.value.push({
      key: layer.id,
      name: `${layer.type} - ${layer.name || "未命名"}`,
      isTile: layer.isTile
    })

    // 将新添加的图层也默认选中
    rowKeys.value = tileLayerList.value.map((item) => item.key)

    selectedFirst()
  })

  // 删除图层
  map.on(mars3d.EventType.removeLayer, function (event) {
    const layerId = event.layer.id

    const idx = tileLayerList.value.findIndex((item) => item.key === layerId)
    tileLayerList.value.splice(idx, 1)

    if (thisLayer && thisLayer.id === layerId) {
      thisLayer = null
      formState.layerName = "" // 隐藏编辑面板
    }
  })
})

function selectedFirst() {
  setTimeout(() => {
    // 选中第一个
    if (tileLayerList.value.length === 1) {
      startEditingLayer(tileLayerList.value[0])
    }
  }, 50)
}

const addTileLayer = () => {
  mapWork.addTileLayer()
}

const removeTileLayer = () => {
  mapWork.removeTileLayer()
}

// 表格行：点击定位图层
const flyToLayer = (record: LayerTableItem) => {
  const layer = map.getLayerById(record.key)
  if (layer) {
    layer.flyTo()
  }
}

// 表格行：点击删除图层
const deleteLayer = (record: LayerTableItem) => {
  const layer = map.getLayerById(record.key)
  if (layer) {
    layer.remove(true)
    formState.layerName = "" // 隐藏编辑面板
  }
}

// 点击显示编辑图层面板,将获取的面板数据放在新出现的面板上
const startEditingLayer = (record: LayerTableItem) => {
  if (!record.isTile) {
    return
  }

  formState.layerName = record.name // 获取到的对应图层的信息

  thisLayer = map.getLayerById(record.key)
  formState.show = thisLayer.show
}

</script>

<style scoped lang="less">
.title {
  text-align: center;
  color: var(--mars-text-color);
}

.guiBox {
  margin-left: -3px;
}


:deep(.ant-table-pagination) {
  margin: 10px 0 1px 0 !important;
}

.showTableControl {
  display: flex;
  justify-content: space-between;
}
</style>
