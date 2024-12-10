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

  <mars-dialog :visible="true" right="10" top="195" customClass="pannel" width="300">
    <mars-tree checkable :height="550" :tree-data="treeData" v-model:checkedKeys="checkedKeys" v-model:expandedKeys="expandedKeys"
      @check="checkedChange"  @select="flyToGraphic">
      <template #title="{ title }">
        <span :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"


const shoRailway = () => {
  treeData.value = []

  mapWork.shoRailway()
}
const showExpressway = () => {
  treeData.value = []

  mapWork.showExpressway()
}
const showMeteorological = () => {
  treeData.value = []

  mapWork.showMeteorological()
}
const showGDP = () => {
  treeData.value = []

  mapWork.showGDP()
}
const showSafetyNotice = () => {
  treeData.value = []

  mapWork.showSafetyNotice()
}



mapWork.treeEvent.on("refTree", (event: any) => {
  initTree()
})

// 初始化树控件
const treeData = ref<any[]>()
const checkedKeys = ref<any[]>([])
const expandedKeys = ref<any[]>([])

function initTree() {
  // 重置上一次的树状数据
  const showIds = [] // 是显示状态的图层id集合
  const openIds = [] // 展开的树节点id集合（如果不想展开，对应图层配置open:false）
  const result = mapWork.getGraphicsTree({
    forEach: function (item) {
      item.key = item.id // 树控件api需要的唯一标识
      item.title = item.name || "未命名" // 树控件api需要的显示文本字段

      if (item.show) {
        showIds.push(item.id)
      }
      if (item.group && item.open !== false) {
        openIds.push(item.id)
      }
    },
    // autoGroup: "type"
    autoGroup: function(item) {
      const name = item.name
      if (name) {
        if (name.indexOf("专线") !== -1 || name.indexOf("合九") !== -1) { return "专线" }
        if (name.indexOf("高铁") !== -1) { return "高铁" }
        if (name.indexOf("城际铁路") !== -1) { return "城际铁路" }
        if (name.indexOf("铁路") !== -1) { return "铁路" }
        if (name.indexOf("宁西") !== -1) { return "宁西" }
        if (name.indexOf("合肥轨道") !== -1 || name.indexOf("有轨") !== -1 || name.indexOf("地铁") !== -1) { return "合肥轨道" }
      }
      return name || "未知"
    }
  })
  console.log("获取到的graphics树", result)

  // 赋予树控件
  treeData.value = result.tree
  checkedKeys.value = showIds
  expandedKeys.value = openIds
}

// 树控件 勾选事件
function checkedChange(keys: string[], e: any) {
  const node = e.node
  const graphic = mapWork.getGraphicById(node.key)
  if (graphic) {
    const show = keys.indexOf(node.key) !== -1
    graphic.show = show
  }

  // 处理子节点
  if (node.children && node.children.length) {
    node.children.forEach((child) => {
      checkedChange(keys, { node: child })
    })
  }
}

// 点击节点 定位
const flyToGraphic = (keys: any, item: any) => {
  const graphic = mapWork.getGraphicById(item.node.key)
  graphic.flyTo()
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
