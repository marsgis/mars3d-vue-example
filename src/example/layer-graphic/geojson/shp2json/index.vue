<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space>
      <mars-button @click="shoXZM">社区面</mars-button>
      <mars-button @click="shoGCD">高程点</mars-button>
    </a-space>
    <div class="f-pt">
      <layer-state />
    </div>
  </mars-dialog>


  <mars-dialog :visible="true" right="10" top="150" customClass="pannel" width="300">
    <mars-tree checkable :height="550" :tree-data="treeData" v-model:checkedKeys="checkedKeys" v-model:expandedKeys="expandedKeys"
      @check="checkedChange"  @select="flyToGraphic">
      <template #title="{ title }">
        <span :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>

<script setup lang="ts">
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"
import { ref } from "vue"

const shoXZM = () => {
  treeData.value = [] // 重置上一次的树状数据
  autoGroup = "SSJD"

  mapWork.shoXZM()
}

const shoGCD = () => {
  treeData.value = [] // 重置上一次的树状数据
  autoGroup = function (item) {
    const val = item.attr?.DEM
    if (val < 100) {
      return "<100"
    } else if (val >= 100 && val < 200) {
      return "100~200"
    } else if (val >= 200 && val < 300) {
      return "200~300"
    } else {
      return "300~999"
    }
  }

  mapWork.shoGCD()
}

mapWork.treeEvent.on("refTree", (event: any) => {
  initTree()
})

// 初始化树控件
const treeData = ref<any[]>()
const checkedKeys = ref<any[]>([])
const expandedKeys = ref<any[]>([])

let autoGroup: string | any = "SSJD" // 自动分组处理

function initTree() {
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
    autoGroup: autoGroup
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
  max-height: 750px;
  overflow-y: auto;
}

.mars-button {
  width: 146px;
}
</style>
