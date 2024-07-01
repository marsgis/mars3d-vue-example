<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="example-list">
      <mars-button @click="shoRailway">铁路</mars-button>
      <mars-button @click="showExpressway">高速公路</mars-button>
      <mars-button @click="showMeteorological">气象等值面</mars-button>
      <mars-button class="gdp-btn" @click="showGDP">国家GDP数据</mars-button>
      <mars-button class="gdp-btn" @click="showSafetyNotice">海上安全通告</mars-button>
    </div>
    <div class="f-pt">
      <layer-state />
    </div>
  </mars-dialog>

  <mars-dialog :visible="true" right="10" top="195" customClass="pannel" width="330">
    <mars-tree checkable :height="433" :tree-data="treeData" @check="checkedChange" v-model:checkedKeys="selectedKeys"
      v-model:expandedKeys="expandedKeys">
      <template #title="{ title }">
        <span :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

const treeData = ref<any[]>([
  {
    title: "全部",
    key: 0,
    id: -1,
    children: []
  }
])
const selectedKeys = ref<any[]>([0])
const expandedKeys = ref<any[]>([0])

let layersObj: any = {}

mapWork.treeEvent.on("tree", (event: any) => {
  initTree(event.treeData)
})

const checkedChange = (_keys: string[], checkedNodes: any) => {

  const show = checkedNodes.checked
  const entity = layersObj[checkedNodes.node.id]

  if (checkedNodes.node.id === -1) {
    mapWork.graphicLayer.show = show
    return
  }
  // 处理图层显示隐藏
  entity.show = show
  if (entity._labelEx) {
    entity._labelEx.show = show
  }
  if (entity == null) {
    return
  }

  mapWork.flyToEntity()
}

// 初始化树控件
function initTree(dataItems: any) {
  // 重置上一次的树状数据
  treeData.value[0].children = []
  layersObj = {}

  const tree = []
  const dataKeys: any = []

  for (let i = 0; i < dataItems.length; i++) {
    const node = dataItems[i].graphic

    if (node) {
      const key = "01-" + Math.random()
      const nodeList: any = {
        title: node.name || "未命名",
        key: key,
        id: node._id
      }
      tree.push(nodeList)

      if (node.show) {
        dataKeys.push(key)
      }

      layersObj[nodeList.key] = node
    }
  }
  treeData.value[0].children = tree

  nextTick(() => {
    selectedKeys.value = dataKeys
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
<style lang="less">
.pannel {
  max-height: 676px;
  overflow-x: hidden;
  overflow-y: auto;
}

.example-list {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  align-content: center;
  flex-wrap: wrap;

  .gdp-btn {
    padding-left: 5px;
  }

  .mars-button {
    width: 93px;
  }
}
</style>
