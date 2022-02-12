<template>
  <mars-pannel class="infoView">
    <a-space>
      <mars-button @click="shoRailway">铁路</mars-button>
      <mars-button @click="showExpressway">高速公路线</mars-button>
      <mars-button @click="showMeteorological">气象等值面</mars-button>
      <mars-button @click="showGDP">国家GDP数据</mars-button>
      <mars-button @click="showSafetyNotice">海上安全通告</mars-button>
    </a-space>
    <div class="f-pt">
      <layer-state />
    </div>
  </mars-pannel>

  <mars-pannel class="infoView manager-mars-pannel">
    <mars-tree checkable :tree-data="treeData" @check="checkedChange" v-model:checkedKeys="checkedKeys">
      <template #title="{ title }">
        <span class="tree-style" :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </mars-pannel>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import LayerState from "@/components/mars-sample/layer-state.vue"
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

let layersObj: any = {}

onMounted(() => {
  initTree()
})

const checkedChange = (_keys: string[], checkedNodes: any) => {
  const show = checkedNodes.checked
  const entity = layersObj[checkedNodes.node.id]

  if (checkedNodes.node.id === -1) {
    Object.keys(layersObj).forEach((k) => {
      const layer = layersObj[k]
      layer.show = show
      if (layer._labelEx) {
        layer._labelEx.show = show
      }
    })
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

function initTree() {
  mapWork.treeEvent.on("tree", function (event: any) {
    // 重置上一次的树状数据
    treeData.value[0].children = []
    layersObj = {}

    const children: any[] = []
    const dataKeys: any = []
    const dataItems = event.treeData

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
  })
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
<style scoped lang="less">
.manager-mars-pannel {
  top: 100px !important;
  right: 10px !important;
  width: 220px;
  max-height: calc(100% - 138px) !important;
  overflow-y: auto !important;
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
