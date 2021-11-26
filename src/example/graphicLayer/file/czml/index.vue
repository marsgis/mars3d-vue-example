<template>
  <PannelBox class="infoView" v-show="isShow">
    <a-space>
      <mars-button @click="showFeijiDemo">飞机</mars-button>
      <mars-button @click="showChuanboDemo">船舶</mars-button>
      <mars-button @click="showQicheDemo">汽车</mars-button>
      <mars-button @click="showWeixinDemo">卫星</mars-button>
      <mars-button @click="showBDWeixinDemo">北斗卫星</mars-button>
      <mars-button @click="showHuojianDemo">火箭发射</mars-button>
      <mars-button @click="showXiaofangDemo">消防演练</mars-button>
    </a-space>
  </PannelBox>

  <PannelBox class="treeView">
    <a-tree
      checkable
      :show-line="true"
      v-model:expandedKeys="expandedKeys"
      :show-icon="true"
      v-model:checkedKeys="selectedKeys"
      :tree-data="treeData"
      @check="checkedChange"
    >
      <template #title="{ title }">
        <span>{{ title }}</span>
      </template>
    </a-tree>
  </PannelBox>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import { getQueryString } from "@/utils/index"

interface treeItem {
  title: string
  key: string
  children: treeItem[]
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

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

const isUrl = getQueryString("data")
isShow.value = !isUrl

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
  if (item.checkedNodes.length == 0) {
    for (let i = 0; i < node.children.length; i++) {
      layersObj[node.children[i].key].show = false
    }
  } else {
    for (let i = 0; i < item.checkedNodes.length; i++) {
      const nodes = layersObj[item.checkedNodes[i].key]
      if (nodes) {
        nodes.show = true
      }
    }
  }

  if (layersObj[node.key]) {
    layersObj[node.key].show = !node.checked
  }
}

const showFeijiDemo = () => {
  mapWork.showFeijiDemo()
}
const showChuanboDemo = () => {
  mapWork.showChuanboDemo()
}
const showQicheDemo = () => {
  mapWork.showQicheDemo()
}
const showWeixinDemo = () => {
  mapWork.showWeixinDemo()
}
const showBDWeixinDemo = () => {
  mapWork.showBDWeixinDemo()
}
const showHuojianDemo = () => {
  mapWork.showHuojianDemo()
}
const showXiaofangDemo = () => {
  mapWork.showXiaofangDemo()
}
</script>
<style scoped lang="less">
.treeView {
  right: 10px;
  top: 80px;
  width: 200px;
}
</style>
