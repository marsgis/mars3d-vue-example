<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="showPoint">体育设施点</mars-button>
      <mars-button @click="showChinaLine">省界线</mars-button>
      <mars-button @click="showPlanningSurface">规划面</mars-button>
      <mars-button @click="showRegion">安徽区域面</mars-button>
    </a-space>
  </PannelBox>

  <PannelBox class="infoView manager-pannel">
    <mars-tree checkable :tree-data="treeData" @check="checkedChange" v-model:checkedKeys="checkedKeys">
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

onMounted(() => {
  initTree()
})

const treeData = ref<any[]>([
  {
    title: "全部",
    key: 0,
    id: -1,
    children: []
  }
])

const checkedKeys = ref<string[]>([])

let layersObj: any = {}

const checkedChange = (keys: string[], checkedNodes: any) => {
  const show = checkedNodes.checked
  const layer = layersObj[checkedNodes.node.id]

  if (checkedNodes.node.id === -1) {
    Object.keys(layersObj).forEach((k) => {
      const layer = layersObj[k]
      layer.show = show
      if (layer._labelEx) {
        layer._labelEx.show = show
      }
      if (layer._outlineEx) {
        layer._outlineEx.forEach((element: any) => {
          element.show = show
        })
      }
    })
    return
  }

  layer.show = show
  if (layer._labelEx) {
    layer._labelEx.show = show
  }
  if (layer._outlineEx) {
    layer._outlineEx.forEach((element: any) => {
      element.show = show
    })
  }
  if (show) {
    mapWork.flyToLayer(layer)
  } else {
    layer.show = show
  }
}

function initTree() {
  // 在js中获取的数据
  mapWork.treeEvent.on("tree", (event: any) => {
    // 重置上一次的树状数据
    treeData.value[0].children = []
    layersObj = {}

    const dataKeys: any = []
    const children: any[] = []

    const dataItems = event.treeData

    // 遍历出所有的树状数据
    for (let i = 0; i < dataItems.length; i++) {
      const layer = dataItems[i]
      if (layer) {
        const key = "01-" + Math.random()
        children.push({
          title: layer["项目名称"] || layer.name || layer["类型"] || "未命名",
          key: key,
          id: layer._entity.id
        })

        if (layer._entity.show) {
          dataKeys.push(key)
        }
        layersObj[layer._entity.id] = layer._entity
      }
    }
    treeData.value[0].children = children
    nextTick(() => {
      checkedKeys.value = dataKeys
    })
  })
}

const showPoint = () => {
  checkedKeys.value = []
  mapWork.showPoint()
}
const showChinaLine = () => {
  checkedKeys.value = []
  mapWork.showChinaLine()
}
const showPlanningSurface = () => {
  checkedKeys.value = []
  mapWork.showPlanningSurface()
}
const showRegion = () => {
  checkedKeys.value = []
  mapWork.showRegion()
}
</script>
<style scoped lang="less">
.manager-pannel {
  top: 100px;
  right: 10px;
  width: 220px;
  max-height: calc(100% - 138px);
  overflow-y: auto;
}
:deep(.ant-form-item) {
  margin-bottom: 10px;
}
.tree-style {
  width: 90px;
  display: inline-block;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
</style>
