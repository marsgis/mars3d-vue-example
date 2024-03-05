<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <layer-state />

    <div class="f-mb f-pt">
      <a-row>
        <a-col :span="6">点状:</a-col>
        <a-col :span="18">
          <div class="entity-button-contain" :key="item.name" v-for="item in list.point">
            <mars-button :class="item.flag ? 'tools-btn' : ''" :href="item.href" target="_blank">{{ item.name
            }}</mars-button>
          </div>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-row>
        <a-col :span="6">线面状:</a-col>
        <a-col :span="18">
          <div class="entity-button-contain" :key="item.name" v-for="item in list.polyline">
            <a-space>
              <mars-button :href="item.href" target="_blank">{{ item.name }}</mars-button>
            </a-space>

          </div>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <div class="property-content">
        <div class="content-title">
          <h2 class="title">矢量数据列表</h2>
        </div>
      </div>
      <mars-table class="mars-noHeader-table" :pagination="{ pageSize: 5, simple: true }" :customRow="graphicCustomRowObj"
        :row-selection="graphicRowSelection" :dataSource="graphicDataList" :columns="graphicColumns" size="small"
        :showHeader="false" :bordered="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'caozuo'">
            <a-space>
              <mars-icon icon="editor" color="#f2f2f2" class="icon-vertical-a" @click.stop="startEditGraphic(record)" />
              <mars-icon icon="delete" color="#F96868" class="icon-vertical-a" @click.stop="deleteGraphic(record)" />
            </a-space>

          </template>
          <template v-else>
            {{ record.name }}
          </template>
        </template>
      </mars-table>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import { ref, onMounted } from "vue"
import * as mapWork from "./map.js"

const list = {
  point: [
    { name: "文字", href: "editor-vue.html?id=graphic/entity/label" },
    { name: "点", href: "editor-vue.html?id=graphic/entity/point" },
    { name: "图标点", flag: true, href: "editor-vue.html?id=graphic/entity/billboard" },
    { name: "平面", href: "editor-vue.html?id=graphic/entity/plane" },
    { name: "盒子", href: "editor-vue.html?id=graphic/entity/box" },
    { name: "圆", href: "editor-vue.html?id=graphic/entity/circle" },
    { name: "圆锥", href: "editor-vue.html?id=graphic/entity/cylinder" },
    { name: "球", href: "editor-vue.html?id=graphic/entity/ellipsoid" },
    { name: "小模型", flag: true, href: "editor-vue.html?id=graphic/entity/model" }
  ],
  polyline: [
    { name: "线", href: "editor-vue.html?id=graphic/entity/polyline" },
    { name: "管道", href: "editor-vue.html?id=graphic/entity/polylineVolume" },
    { name: "走廊", href: "editor-vue.html?id=graphic/entity/corridor" },
    { name: "墙", href: "editor-vue.html?id=graphic/entity/wall" },
    { name: "矩形", href: "editor-vue.html?id=graphic/entity/rectangle" },
    { name: "面", href: "editor-vue.html?id=graphic/entity/polygon" }
  ]
}

// 获取map.js中定义的需要管理的图层
function getManagerLayer() {
  return mapWork.graphicLayer
}

// 数据列表
interface GraphicTableItem {
  key: number
  name: string
}
const graphicDataList = ref<GraphicTableItem[]>([])
const rowKeys = ref<number[]>([]) // 勾选的row

// 列表名称
const graphicColumns = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    align: "start"
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    key: "caozuo"
  }
]

const graphicRowSelection = {
  hideSelectAll: true,
  hideDefaultSelections: true,
  selectedRowKeys: rowKeys,
  onChange: (selectedRowKeys: number[]) => {
    rowKeys.value = selectedRowKeys // 使得点击之后选项改变
  },
  onSelect: (record: GraphicTableItem, selected: boolean) => {
    const graphicLayer = getManagerLayer()
    const graphic = graphicLayer.getGraphicById(record.key)
    if (graphic) {
      graphic.show = selected
    }
  }
}

onMounted(() => {
  const graphicLayer = getManagerLayer()

  const list = graphicLayer.graphics
  graphicDataList.value = list.map((item: any, index: number) => ({
    key: item.id,
    name: getGraphicName(item)
  }))
  rowKeys.value = graphicDataList.value.map((item) => item.key)

  graphicLayer.on("addGraphic", function (event) {
    const item = event.graphic
    graphicDataList.value.push({
      key: item.id,
      name: getGraphicName(item)
    })
    rowKeys.value = graphicDataList.value.map((item) => item.key)
  })

  graphicLayer.on("removeGraphic", function (event) {
    const graphicId = event.graphic.id
    const idx = graphicDataList.value.findIndex((item) => item.key === graphicId)
    graphicDataList.value.splice(idx, 1)
  })
})

let graphicIndex = 0
function getGraphicName(graphic) {
  if (graphic?.style?.label?.text) {
    return `${graphic.type} - ${graphic.style.label.text}`
  }

  if (graphic.name) {
    return `${graphic.type} - ${graphic.name}`
  }
  if (graphic.attr.remark) {
    return `${graphic.type} - ${graphic.attr.remark}`
  }

  return `${graphic.type} - 未命名${++graphicIndex}`
}

// 表格行: 点击含，飞行定位
const graphicCustomRowObj = (recode: any) => {
  return {
    onClick: () => {
      const graphicLayer = getManagerLayer()
      const graphic = graphicLayer.getGraphicById(recode.key)
      graphic.flyTo()
    }
  }
}

// 表格行: 开始编辑graphic
function startEditGraphic(record: GraphicTableItem) {
  const graphicLayer = getManagerLayer()
  const graphic = graphicLayer.getGraphicById(record.key)
  graphicLayer.startEditing(graphic)
}

// 表格行: 删除graphic
const deleteGraphic = (record: GraphicTableItem) => {
  const graphicLayer = getManagerLayer()
  const graphic = graphicLayer.getGraphicById(record.key)
  graphic && graphic.remove(true)
}

</script>
<style scoped lang="less">
.ant-col-6 {
  max-width: 24.666667%;
  color: rgba(234, 242, 255, 0.8);
}



.entity-button-contain {
  float: left;

  .mars-button {
    width: 49px;

    margin-right: 7px;
    margin-bottom: 8px;
  }

  .tools-btn {
    padding-left: 5px !important;
  }
}

.property-content {
  width: 100%;
  overflow-x: hidden;
  box-shadow: 0px 6px 12px -2px rgba(50, 50, 93, 0.15), 0px 3px 7px -3px rgba(0, 0, 0, 0.2);

  .content-title {
    .title {
      color: #EAF2FF;
      display: inline-block;
      font-size: 14px;
      width: 100%;
      height: 44px;
      background: #464C5A;
      line-height: 44px;
      padding-left: 10px;

      &::before {
        content: "|";
        background: #3385FF;
        color: #3385FF;
        border-radius: 4px;
        margin-right: 10px;
      }
    }
  }
}
</style>
