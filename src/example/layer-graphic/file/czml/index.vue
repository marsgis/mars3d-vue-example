<template>
  <mars-dialog v-model:visible="isShow" right="10" top="10" width="330">
    <div class="demo-list">
      <mars-button @click="showAircraft">飞机</mars-button>
      <mars-button @click="showShip">船舶</mars-button>
      <mars-button @click="showCar">汽车</mars-button>
      <mars-button @click="showSatellite">卫星</mars-button>
      <mars-button @click="showBDSatellite">北斗卫星</mars-button>
      <mars-button @click="showRocket">火箭发射</mars-button>
      <mars-button @click="showFireDrill">消防演练</mars-button>
    </div>

    <div class="f-pt">
      <layer-state label="图层控制：" />
    </div>
  </mars-dialog>

  <mars-dialog :visible="true" right="10" top="230" bottom="70"  width="330" customClass="czml_dialog">
    <div class="czml_tree">
      <mars-tree checkable v-model:expandedKeys="expandedKeys" v-model:checkedKeys="selectedKeys" :tree-data="treeData"
        @check="checkedChange" @select="flytoModelNode">
      </mars-tree>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import { getQueryString } from "@mars/utils/mars-util"
import * as mapWork from "./map.js"

interface treeItem {
  title: string
  key: string
  children: treeItem[]
}

const treeData = ref<treeItem[]>([
  {
    title: "全部",
    key: "1",
    children: []
  }
])

const selectedKeys = ref<string[]>([])

const expandedKeys = ref<string[]>([])

const layersObj: any = {}

// 隐藏button
const isShow = ref()
isShow.value = getQueryString("data") === ("CZML" || null)

mapWork.eventTarget.on("loadGraphicLayer", function (event: any) {
  const modelList = event.data.list
  const tree = []
  const selects: string[] = []
  for (let i = 0; i < modelList.length; i++) {
    const node = modelList[i]._entity

    if (node) {
      const nodeList: any = {
        title: node.name,
        name: node.name,
        key: node.id
      }
      tree.push(nodeList)
      selects.push(nodeList.key)
      layersObj[nodeList.key] = node
    }
  }
  treeData.value[0].children = tree
  nextTick(() => {
    selectedKeys.value = selects
  })
})

const checkedChange = (keys: any, item: any) => {
  const node = item.node
  if (!node.children) {
    if (!node.checked) {
      layersObj[node.key].show = true
    } else {
      layersObj[node.key].show = false
    }
  } else {
    if (!node.checked) {
      node.children.forEach((element: any) => {
        layersObj[element.key].show = true
      })
    } else {
      node.children.forEach((element: any) => {
        layersObj[element.key].show = false
      })
    }
  }
}
// 点击节点 定位
const flytoModelNode = (keys: any, item: any) => {
  const id = item.node.key
  mapWork.flytoModel(id)
}
const showAircraft = () => {
  selectedKeys.value = []
  mapWork.showAircraft()
}
const showShip = () => {
  selectedKeys.value = []

  mapWork.showShip()
}
const showCar = () => {
  selectedKeys.value = []

  mapWork.showCar()
}
const showSatellite = () => {
  selectedKeys.value = []

  mapWork.showSatellite()
}
const showBDSatellite = () => {
  selectedKeys.value = []

  mapWork.showBDSatellite()
}
const showRocket = () => {
  selectedKeys.value = []

  mapWork.showRocket()
}
const showFireDrill = () => {
  selectedKeys.value = []
  mapWork.showFireDrill()
}
</script>

<style lang="less" scoped>
.layer-tree {
  vertical-align: top !important;
}

.czml_tree {
  overflow: hidden;
}

:deep(.ant-tree-list) {
  padding-left: 9px !important;
}
</style>
<style lang="less">
.czml_dialog {
  .mars-dialog__content {
    box-sizing: content-box;
    padding: 8px 5px 6px 5px !important;
  }
}

.demo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .mars-button {
    width: 94px;
  }
}
</style>
