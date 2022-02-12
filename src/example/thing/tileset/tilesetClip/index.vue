<template>
  <mars-pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
        <mars-button @click="btnDraw">绘制剪裁区</mars-button>
        <mars-button @click="removeAll">清除</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-table :pagination="{ pageSize: 5 }" :row-selection="rowSelection" :dataSource="dataSource" :columns="columns" size="small" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'caozuo'">
            <a-space>
              <mars-button type="link">
                <Icon icon="icon-park-outline:move-one" color="#f2f2f2" class="icon-vertical-a" @click="flyto(record)" />
              </mars-button>
              <mars-button type="link">
                <Icon icon="ep:delete" color="#f2f2f2" class="icon-vertical-a" @click="deleted(record)" />
              </mars-button>
            </a-space>
          </template>
          <template v-else>
            {{ record.name }}
          </template>
        </template>
      </a-table>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import { Icon } from "@iconify/vue"
import * as mapWork from "./map.js"
import { $notify } from "@/components/mars-ui/index"

onMounted(() => {
  $notify(
    "已知问题提示",
    `（1）对3dtiles数据有要求，仅适用于无自带着色器的纹理格式模型。
  （2）目前不支持所有3dtile数据，请替换url进行自测`,
    { duration: null }
  )
})

interface TableItem {
  key: number
  name: string
}

// 表格数据
const columns = [
  {
    title: "裁剪区",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    key: "caozuo",
    width: 80
  }
]
const dataSource = ref<TableItem[]>([])
// 默认的选项
const rowKeys = ref<string[]>([])

const rowSelection = {
  hideSelectAll: true,
  hideDefaultSelections: true,
  selectedRowKeys: rowKeys,
  onChange: (selectedRowKeys: string[]) => {
    // 使得点击之后选项改变
    rowKeys.value = selectedRowKeys
  },
  onSelect: (record: TableItem, selected: boolean) => {
    mapWork.showHideArea(record.key, selected)
  }
}

mapWork.eventTarget.on("dataLoaded", function (event: any) {
  dataSource.value = event.list.map((item: any) => ({ key: item.id, name: "裁剪区" + item.id }))
  rowKeys.value = event.list.map((item: any) => item.id)
})
mapWork.eventTarget.on("addItem", function (event: any) {
  const item = event.item
  dataSource.value.push({ key: item.id, name: "裁剪区" + item.id })
  rowKeys.value.push(item.id)
})

// 表格的操作
const flyto = (record: TableItem) => {
  mapWork.flyToGraphic(record.key)
}
const deleted = (record: TableItem) => {
  mapWork.deletedGraphic(record.key)

  dataSource.value = dataSource.value.filter((item: any) => item.key !== record.key)
}

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent()
}
// 绘制剪裁区
const btnDraw = () => {
  mapWork.btnDraw()
}
// 清除
const removeAll = () => {
  mapWork.removeAll()

  // 清除表格
  dataSource.value = []
}
</script>
<style scoped lang="less">
.infoView {
  width: 280px;
}
</style>
