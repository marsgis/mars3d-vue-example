<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="demo-list">
      <mars-button @click="shoRailway">铁路</mars-button>
      <mars-button @click="showExpressway">高速公路线</mars-button>
      <mars-button @click="showMeteorological">气象等值面</mars-button>
      <mars-button class="long-btn" @click="showGDP">国家GDP数据</mars-button>
      <mars-button class="long-btn" @click="showSafetyNotice">海上安全通告</mars-button>
    </div>

    <div class="f-pt">
      <layer-state />
    </div>
  </mars-dialog>

  <mars-dialog :visible="true" right="10" top="190" width="330">
    <mars-tree checkable :height="433" :tree-data="treeData" v-model:checkedKeys="checkedKeys" @check="checkedChange"
      v-model:expandedKeys="expandedKeys">
      <template #title="{ title }">
        <span :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"
// tree节点太多，八千朝上，内存溢出报错，使用height虚拟滚动处理

const treeData = ref<any[]>([
  {
    title: "全部",
    key: 0,
    id: -1,
    children: []
  }
])

const checkedKeys = ref<string[] | number[]>([])
const expandedKeys = ref<any[]>([0])

let layersObj: any = {}

mapWork.eventTarget.on("tree", function (event: any) {
  initTree(event.treeData)
})


// 初始化树控件
function initTree(dataItems: any) {
  // 重置上一次的树状数据
  treeData.value[0].children = []
  layersObj = {}

  const children: any[] = []
  const dataKeys: any = []

  // 遍历出所有的树状数据
  for (let i = 0; i < dataItems.length; i++) {
    const layer = dataItems[i]
    if (layer) {
      const key = "01-" + Math.random()
      children.push({
        title: layer.name || "未命名",
        key: key,
        id: layer._entity._id
      })

      if (layer._entity.show) {
        dataKeys.push(key)
      }
      layersObj[layer._entity._id] = layer._entity
    }
  }

  treeData.value[0].children = children

  nextTick(() => {
    checkedKeys.value = dataKeys
  })
}


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


const shoRailway = () => {
  checkedKeys.value = []

  mapWork.shoRailway()
}
const showExpressway = () => {
  checkedKeys.value = []

  mapWork.showExpressway()
}
const showMeteorological = () => {
  checkedKeys.value = []

  mapWork.showMeteorological()
}
const showGDP = () => {
  checkedKeys.value = []

  mapWork.showGDP()
}
const showSafetyNotice = () => {
  checkedKeys.value = []

  mapWork.showSafetyNotice()
}
</script>
<style lang="less">
.demo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  .mars-button {
    width: 94px;
  }

  .long-btn {
    padding-left: 5px;
  }
}
</style>
