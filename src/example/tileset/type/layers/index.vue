<template>
  <PannelBox class="infoView">
    <mars-tree checkable :tree-data="treeData" v-model:expandedKeys="expandedKeys" v-model:checkedKeys="checkedKeys" @check="checkedChange">
      <template #title="{ title }">
        <span>{{ title }}</span>
      </template>
    </mars-tree>
  </PannelBox>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const treeData = ref<any[]>([])

const expandedKeys = ref<string[]>([])

const checkedKeys = ref<string[]>([])

const layersObj: any = {}

let treeModelData: any = {}

mapWork.eventTarget.on("loadOk", function (event: any) {
  treeModelData = event.modelData
  initTree()
})

const checkedChange = (keys: string[]) => {
  Object.keys(layersObj).forEach((k) => {
    const show = keys.indexOf(k) !== -1
    const layer = layersObj[k]

    layer.show = show

    if (show) {
      if (!layer.isAdded) {
        window.mapWork.map.addLayer(layer)
      }
      layer.flyTo()
    } else {
      if (layer.isAdded) {
        window.mapWork.map.removeLayer(layer)
      }
    }
  })
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
  console.log(treeData)
}

function findChild(parent: any, list: any[]) {
  return list
    .filter((item: any) => item.pid === parent.id)
    .map((item: any) => {
      if ((item.pid = parent.id)) {
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
      }
    })
}
</script>
