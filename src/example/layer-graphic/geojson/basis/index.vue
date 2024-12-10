<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="geojson-example">
      <mars-button @click="showChinaLine">省界线</mars-button>
      <mars-button @click="showPlanningSurface">规划面</mars-button>
      <mars-button @click="showDraw">标绘数据</mars-button>
      <mars-button @click="showMonomer">单体化面</mars-button>
      <mars-button @click="showWorld">世界各国</mars-button>
      <mars-button @click="showPoint">体育设施点</mars-button>
      <mars-button @click="showBuilding">立体建筑物</mars-button>
      <mars-button @click="showBoundaryWall">合肥边界墙</mars-button>
      <mars-button @click="showRegion">合肥区域面</mars-button>
      <mars-button class="floor" @click="showFloor">分层分户楼栋</mars-button>
      <mars-button @click="showGCJ02Data">GCJ纠偏</mars-button>
    </div>

    <div class="f-pt f-mb">
      <a-space>
        <span>透明度:</span>
        <mars-slider v-model:value="layerOpacity" :min="0.0" :max="1.0" :step="0.1" @change="onOpacityChange" />
      </a-space>
    </div>
    <div>
      <layer-state label="" />
    </div>
  </mars-dialog>


  <mars-dialog :visible="true" right="10" top="300" customClass="pannel" width="250">
    <mars-tree checkable :height="400" :tree-data="treeData" v-model:checkedKeys="checkedKeys" v-model:expandedKeys="expandedKeys"
      @check="checkedChange"  @select="flyToGraphic">
      <template #title="{ title }">
        <span :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import * as mapWork from "./map.js"

const { updateWidget } = useWidget()

function setDefuatData() {
  treeData.value = []
  layerOpacity.value = 1.0

  mapWork.eventTarget.fire("defuatData", {
    enabledShowHide: true,
    enabledPopup: true,
    enabledTooltip: false,
    enabledRightMenu: false
  })
}

const showDraw = () => {
  setDefuatData()
  mapWork.showDraw(true)

  changeGraphicData()
}
const showPoint = () => {
  setDefuatData()
  mapWork.showPoint()

  changeGraphicData()
}
const showChinaLine = () => {
  setDefuatData()
  mapWork.showChinaLine()

  changeGraphicData()
}
const showRegion = () => {
  setDefuatData()
  mapWork.showRegion()

  changeGraphicData()
}
const showBoundaryWall = () => {
  setDefuatData()
  mapWork.showBoundaryWall()

  changeGraphicData()
}
const showPlanningSurface = () => {
  setDefuatData()
  mapWork.showPlanningSurface()

  changeGraphicData()
}
const showWorld = () => {
  setDefuatData()
  mapWork.showWorld()

  changeGraphicData()
}
const showBuilding = () => {
  setDefuatData()
  mapWork.showBuilding()

  changeGraphicData()
}
const showFloor = () => {
  setDefuatData()
  mapWork.showFloor()

  changeGraphicData()
}
const showMonomer = () => {
  setDefuatData()
  mapWork.showMonomer()

  changeGraphicData()
}

const showGCJ02Data = () => {
  setDefuatData()
  mapWork.showGCJ02Data()

  changeGraphicData()
}



function changeGraphicData() {
  setTimeout(() => {
    updateWidget("manage-layers")
  }, 500)
}

const layerOpacity = ref<number>(1.0)
const onOpacityChange = () => {
  mapWork.graphicLayer.opacity = layerOpacity.value
}



mapWork.eventTarget.on("refTree", (event: any) => {
  initTree()
})

// 初始化树控件
const treeData = ref<any[]>()
const checkedKeys = ref<any[]>([])
const expandedKeys = ref<any[]>([])

function initTree() {
  // 重置上一次的树状数据
  const showIds = [] // 是显示状态的图层id集合
  const openIds = [] // 展开的树节点id集合（如果不想展开，对应图层配置open:false）
  const result = mapWork.getGraphicsTree({
    forEach: function (item) {
      item.key = item.id // 树控件api需要的唯一标识
      item.title = item.name || "未命名" // 树控件api需要的显示文本字段

      if (item.show) {
        showIds.push(item.id)
      }
      if (item.group && item.open !== false) {
        openIds.push(item.id)
      }
    },
    autoGroup: "type"
  })
  console.log("获取到的graphics树", result)

  // 赋予树控件
  treeData.value = result.tree
  checkedKeys.value = showIds
  expandedKeys.value = openIds
}

// 树控件 勾选事件
function checkedChange(keys: string[], e: any) {
  const node = e.node
  const graphic = mapWork.getGraphicById(node.key)
  if (graphic) {
    const show = keys.indexOf(node.key) !== -1
    graphic.show = show
  }

  // 处理子节点
  if (node.children && node.children.length) {
    node.children.forEach((child) => {
      checkedChange(keys, { node: child })
    })
  }
}

// 点击节点 定位
const flyToGraphic = (keys: any, item: any) => {
  const graphic = mapWork.getGraphicById(item.node.key)
  graphic.flyTo()
}
</script>
<style scoped lang="less">
.geojson-example {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  align-content: center;
  flex-wrap: wrap;

  .mars-button {
    width: 94px;
  }

  .floor {
    padding-left: 5px !important;
  }
}


:deep(.ant-slider) {
  width: 230px;
}
</style>
