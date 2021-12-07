<template>
  <PannelBox class="infoView">
      <a-space>
        <mars-button @click="shoRailway">铁路</mars-button>
        <mars-button @click="showExpressway">高速公路</mars-button>
        <mars-button @click="showMeteorological">气象等值面</mars-button>
        <mars-button @click="showGDP">国家GDP数据</mars-button>
        <mars-button @click="showSafetyNotice">海上安全通告</mars-button>
      </a-space>
  </PannelBox>


   <PannelBox class="treeView">
    <mars-tree checkable :tree-data="treeData" @check="checkedChange" v-model:checkedKeys="selectedKeys">
      <template #title="{ title }">
        <span class="tree-style" :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </PannelBox>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
 import * as mapWork from "./map.js"

const treeData = ref<any[]>([
  {
    title: "全部",
    key: 0,
    id: -1,
    children: []
  }
])
const checkedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

const layersObj: any = {}


onMounted(() => {
  initTree()
})

const checkedChange = (keys: string[], checkedNodes: any) => {
  const node = checkedNodes.node
  if (!node.children && node.checked) {
    layersObj[node.key].show = false
  }
  if (!node.children && !node.checked) {
    layersObj[node.key].show = true
  }

  if (node.id === -1 && node.checked) {
     node.children.forEach((element: any) => {
      layersObj[element.key].show = false
    })
  }
  if (node.id === -1 && !node.checked) {
     node.children.forEach((element: any) => {
      layersObj[element.key].show = true
    })
  }
  mapWork.flyToEntity()
}

function initTree() {
mapWork.treeEvent.on("tree", function (event: any) {
  const modelList = event.treeData
  
  const tree = []
  const selects: string[] = []
  for (let i = 0; i < modelList.length; i++) {
    const node = modelList[i].graphic

    if (node) {
      const nodeList: any = {
        title: node.name || "未命名",
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
}

const shoRailway = () => {
  selectedKeys.value = []

  mapWork.shoRailway()
}
const showExpressway = () => {
  selectedKeys.value = []

  mapWork.showExpressway()
}
const showMeteorological = () => {
  selectedKeys.value = []

  mapWork.showMeteorological()
}
const showGDP = () => {
  selectedKeys.value = []

  mapWork.showGDP()
}
const showSafetyNotice = () => {
  selectedKeys.value = []

  mapWork.showSafetyNotice()
}
</script>
<style scoped lang="less">

.treeView {
  right:10px;
  top: 80px;
  width: 200px;
  max-height: calc(100% - 160px);
  overflow-y: auto;
}
</style>
