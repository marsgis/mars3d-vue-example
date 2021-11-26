<template>
  <PannelBox class="infoView">
    <a-directory-tree checkable :tree-data="treeData" @check="checkedChange" v-model:checkedKeys="checkedKeys">
      <template #title="{ title }">
        <span class="tree-style" :title="title">{{ title }}</span>
      </template>
    </a-directory-tree>
  </PannelBox>
</template>
<script lang="ts" setup>
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import { nextTick, onMounted, ref } from "vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork

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
  const entity = layersObj[checkedNodes.node.uuid]

  if (checkedNodes.node.id === -1) {
    Object.keys(layersObj).forEach((k) => {
      const layer = layersObj[k]
      layer.graphic.show = show
    })
    return
  }

  if (!show) {
    entity.graphic.show = show
  } else {
    entity.graphic.show = show
    entity.graphic.flyTo()
  }
}

function initTree() {
  mapWork.treeEvent.on("tree", function (event: any) {
    // 重置上一次的树状数据
    treeData.value[0].children = []
    layersObj = {}

    const children: any[] = []
    const dataKeys: any = []
    const dataItems = event.data

    // 遍历出所有的树状数据
    for (let i = 0; i < dataItems.length; i++) {
      const layer = dataItems[i]
      if (layer) {
        const key = "01-" + Math.random()
        children.push({
          title: layer.airportName,
          key: key,
          uuid: layer.graphic.uuid
        })

        if (layer.graphic.show) {
          dataKeys.push(key)
        }
        layersObj[layer.graphic.uuid] = layer
      }
    }
    treeData.value[0].children = children
    nextTick(() => {
      checkedKeys.value = dataKeys
    })
  })
}
</script>

<style scoped lang="less">
.tree-style {
  width: 90px;
  display: inline-block;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}
</style>
