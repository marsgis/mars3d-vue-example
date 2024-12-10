<template>
  <mars-dialog :visible="true" right="10" top="10" bottom="40" width="250">
    <mars-tree checkable :tree-data="treeData" v-model:expandedKeys="expandedKeys" v-model:checkedKeys="checkedKeys"
      @check="checkedChange">
      <template #title="{ title }">
        <span>{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue"
import * as mapWork from "./map.js"

const treeData = ref<any[]>()
const expandedKeys = ref<string[]>()
const checkedKeys = ref<string[]>()

onMounted(() => {
  initTree()
})

// 初始化树构件
function initTree() {
  const showIds = [] // 是显示状态的图层id集合
  const openIds = [] // 展开的树节点id集合（如果不想展开，对应图层配置open:false）
  const result = mapWork.getLayrsTree({
    forEach: function (item) {
      item.key = item.id // 树控件api需要的唯一标识
      item.title = item.name // 树控件api需要的显示文本字段

      if (item.show) {
        showIds.push(item.id)
      }
      if (item.group && item.open !== false) {
        openIds.push(item.id)
      }
    }
  })
  console.log("获取到的map图层树", result)

  // 赋予树控件
  treeData.value = result.tree
  checkedKeys.value = showIds
  expandedKeys.value = openIds
}


// 树控件 勾选事件
function checkedChange(keys: string[], e: any) {
  const layer = mapWork.getLayerById(e.node?.key)

  if (layer) {
    const show = keys.indexOf(e.node.key) !== -1
    mapWork.updateLayerShow(layer, show)
  }

  // 处理子节点
  if (e.node.children && e.node.children.length) {
    e.node.children.forEach((child) => {
      checkedChange(keys, { node: child })
    })
  }
}
</script>

<style>
.pannel-content {
  overflow-y: auto !important;
}
</style>
<style scoped lang="less">
:deep(.ant-form-item) {
  margin-bottom: 10px;
}
</style>
