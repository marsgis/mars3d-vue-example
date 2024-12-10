<template>
  <mars-dialog :visible="true" right="10" top="10" customClass="pannel" width="300">
    <mars-tree checkable :height="600" :tree-data="treeData" v-model:checkedKeys="checkedKeys"
      v-model:expandedKeys="expandedKeys" @check="checkedChange" @select="flyToGraphic">
      <template #title="{ title }">
        <span :title="title">{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"


mapWork.eventTarget.on("refTree", (event: any) => {
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
      if (item.attr) {
        item.title = item.attr["高校名称"]
      } else {
        item.title = item.name // 树控件api需要的显示文本字段
      }

      if (item.show) {
        showIds.push(item.id)
      }
      if (item.group && item.open !== false) {
        openIds.push(item.id)
      }
    },
    autoGroup: "地区"
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
  graphic.openPopup()
}
</script>
<style scoped lang="less">
.geojson-example {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  align-content: center;
  flex-wrap: wrap;

  .mars-button {
    width: 94px;
  }

  .floor {
    padding-left: 5px !important;
  }
}


:deep(.ant-slider) {
  width: 230px;
}
</style>
