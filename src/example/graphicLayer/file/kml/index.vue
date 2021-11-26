<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="showTieluDemo">铁路</mars-button>
      <mars-button @click="showGaosuluDemo">高速公路线</mars-button>
      <mars-button @click="showQixiangDemo">气象等值面</mars-button>
      <mars-button @click="showGuojiaDemo">国家GDP数据</mars-button>
      <mars-button @click="showAnquanDemo">海上安全通告</mars-button>
    </a-space>
  </PannelBox>

  <PannelBox class="infoView manager-pannel">
    <a-directory-tree checkable :tree-data="treeData" @check="checkedChange" v-model:checkedKeys="checkedKeys">
      <template #title="{ title }">
        <span class="tree-style" :title="title">{{ title }}</span>
      </template>
    </a-directory-tree>
  </PannelBox>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

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

const checkedChange = (keys: string[], checkedNodes: any) => {
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
  mapWork.map.flyTo(entity)
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

const showTieluDemo = () => {
  checkedKeys.value = []

  mapWork.showTieluDemo()
}
const showGaosuluDemo = () => {
  checkedKeys.value = []

  mapWork.showGaosuluDemo()
}
const showQixiangDemo = () => {
  checkedKeys.value = []

  mapWork.showQixiangDemo()
}
const showGuojiaDemo = () => {
  checkedKeys.value = []

  mapWork.showGuojiaDemo()
}
const showAnquanDemo = () => {
  checkedKeys.value = []

  mapWork.showAnquanDemo()
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
