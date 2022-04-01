<template>
  <mars-pannel v-model:visible="isShow" right="10" top="10">
    <a-space>
      <mars-button @click="showVillage">小区</mars-button>
      <mars-button @click="showSchool">学校</mars-button>
      <mars-button @click="showHospital">医院</mars-button>
      <mars-button @click="showHotel">酒店</mars-button>
      <mars-button @click="showMall">商场</mars-button>
      <mars-button>火箭发射</mars-button>
      <mars-button>消防演练</mars-button>
    </a-space>
  </mars-pannel>

  <mars-pannel :visible="true" right="10" top="70" width="220" bottom="40" customClass="layer-tree">
    <mars-tree checkable :tree-data="treeData" v-model:expandedKeys="expandedKeys" v-model:checkedKeys="checkedKeys" @check="checkedChange">
      <template #title="{ title }">
        <span>{{ title }}</span>
      </template>
    </mars-tree>
  </mars-pannel>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"
import * as digitalCity from "./digital-city.js"

const treeData = ref<any[]>([])

const expandedKeys = ref<string[]>([])

const checkedKeys = ref<string[]>([])

const layersObj: any = {}

const state = ref(true)
const isShow = ref(false)

let treeModelData: any = {}

let testLayer
let testLayer2
let graphicLayer
let graphicLayer2

mapWork.eventTarget.on("loadOk", function (event: any) {
  treeModelData = event.modelData
  initTree()
})

mapWork.eventTarget.on("getGraphicLayer", function (event: any) {
  graphicLayer = event.graphicLayer
})
mapWork.eventTarget.on("getGraphicLayer2", function (event: any) {
  graphicLayer2 = event.graphicLayer2
})

const checkedChange = (_keys: string[], item: any) => {
  const node = item.node
  const layer = layersObj[node.key]
  const isChildern = node.children
  console.log("node", node.pId)

  if (layer && !layer.show) {
    layer.show = true
  }

  // 增添模型
  if (isChildern.length === 0 && !node.checked) {
    mapWork.addLayer(layer)
    if (node.id === 207011) {
      // 数字城市
      mapWork.addDigitalCity()
      digitalCity.addCityGraphics(graphicLayer) // 创建中心旋转模型
      mapWork.cutModel(layer)
      testLayer = layer
      isShow.value = true
      if (state.value === false) {
        // 判断倾斜摄影天鹅湖模型存在，重新切割防止重叠
        mapWork.cutModel3(layer)
      }
    } else if (node.id === 208011) {
      // 智慧社区
      mapWork.addCommunity()
      mapWork.cutModel2(layer)
      digitalCity.addGraphics(graphicLayer2)
    } else if (node.id === 203015) {
      // 倾斜摄影天鹅湖
      mapWork.addDemoGraphic()
      state.value = false
      cutLayer()
      cutLayer2()
    } else if (node.id === 204011) {
      // 城市白模
      mapWork.cutModel(layer)
      if (state.value === false) {
        // 判断倾斜摄影天鹅湖模型存在，重新切割防止重叠
        mapWork.cutModel3(layer)
      }
      testLayer2 = layer
    }
  }

  // 删除模型
  if (isChildern.length === 0 && node.checked) {
    mapWork.removeLayer(layer)
    if (node.id === 207011) {
      // 数字城市
      graphicLayer.clear()
      testLayer = null
      mapWork.removeGraphicLayer4()
      isShow.value = false
    } else if (node.id === 208011) {
      // 智慧社区
      graphicLayer2.clear()
    } else if (node.id === 203015) {
      // 倾斜摄影天鹅湖
      mapWork.removeGraphicLayer3()
      state.value = true
      if (testLayer) {
        mapWork.cutModel(testLayer)
      }
      if (testLayer2) {
        mapWork.cutModel(testLayer2)
      }
    } else if (node.id === 204011 && state.value === false) {
      // 城市白模
      testLayer2 = null
    }
  }
}

// 删除被切割的模型后需恢复
function cutLayer() {
  if (testLayer && state.value === false) {
    mapWork.cutModel3(testLayer)
    console.log("重新切割了模型")
  }
}
function cutLayer2() {
  if (testLayer2 && state.value === false) {
    mapWork.cutModel3(testLayer2)
    console.log("重新切割了模型2")
  }
}

function showVillage() {
  if (testLayer) {
    mapWork.loadData("img", "小区")
  }
}
function showSchool() {
  if (testLayer) {
    mapWork.loadData("img", "学校")
  }
}
function showMall() {
  if (testLayer) {
    mapWork.loadData("img", "商场")
  }
}
function showHospital() {
  if (testLayer) {
    // mapWork.loadData("img", "医院")
  }
}
function showHotel() {
  if (testLayer) {
    mapWork.loadData("img", "酒店")
  }
}

function initTree() {
  const layers = treeModelData
  // 遍历出config.json中所有的basempas和layers
  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = mapWork.createLayer(mapWork.createLayer(layers[i])) // 创建图层
    if (layer && layer.pid === 20) {
      const node: any = {
        title: layer.name,
        key: layer.id,
        id: layer.id,
        pId: layer.pid,
        uuid: layer.uuid
      }
      node.children = findChild(node, layers)
      treeData.value.push(node)
      expandedKeys.value.push(node.key)
    }
  }
}

function findChild(parent: any, list: any[]) {
  return list
    .filter((item: any) => item.pid === parent.id)
    .map((item: any) => {
      const node: any = {
        title: item.name,
        key: item.id,
        id: item.id,
        pId: item.pid,
        uuid: item.uuid
      }
      const nodeLayer = mapWork.createLayer(item) // 创建图层
      layersObj[item.id] = nodeLayer
      node.children = findChild(node, list)
      expandedKeys.value.push(node.key)
      if (item.isAdded && item.show) {
        checkedKeys.value.push(node.key)
      }
      return node
    })
}
</script>

<style lang="less" scoped>
.infoView {
  max-height: 646px;
  bottom: 40px;
  overflow: scroll;
}
.layer-tree{
  max-height: 600px;
  overflow-y: auto;
}
</style>
