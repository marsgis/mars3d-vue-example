<template>
  <PannelBox class="infoView" v-show="isShow">
    <a-space>
      <mars-button @click="showAircraft">飞机</mars-button>
      <mars-button @click="showShip">船舶</mars-button>
      <mars-button @click="showCar">汽车</mars-button>
      <mars-button @click="showSatellite">卫星</mars-button>
      <mars-button @click="showBDSatellite">北斗卫星</mars-button>
      <mars-button @click="showRocket">火箭发射</mars-button>
      <mars-button @click="showFireDrill">消防演练</mars-button>
    </a-space>
  </PannelBox>

  <PannelBox class="treeView">
    <mars-tree checkable v-model:expandedKeys="expandedKeys" v-model:checkedKeys="selectedKeys" :tree-data="treeData" @check="checkedChange">
      <template #title="{ title }">
        <span class="">{{ title }}</span>
      </template>
    </mars-tree>
  </PannelBox>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import { getQueryString } from "@/utils/index"
import * as mapWork from "./map.js"
interface treeItem {
  title: string
  key: string
  children: treeItem[]
}

const isShow = ref()

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
const isUrl = getQueryString("data") == null
isShow.value = isUrl

mapWork.eventTarget.on("loadOk", function (event: any) {
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
  if (!node.children && node.checked) {
    layersObj[node.key].show = false
  }

  if (!node.children && !node.checked) {
    layersObj[node.key].show = true
  }

  if (node.children && node.checked) {
    node.children.forEach((element: any) => {
      layersObj[element.key].show = false
    })
  }

  if (node.children && !node.checked) {
    node.children.forEach((element: any) => {
      layersObj[element.key].show = true
    })
  }
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
<style scoped lang="less">
.treeView {
  right: 10px;
  top: 80px;
  width: 200px;
  max-height: calc(100% - 160px);
  overflow-y: auto;
}
</style>
