<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
        <mars-button @click="btnDraw">绘制剪裁区</mars-button>
        <mars-button @click="removeAll">清除</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-table :pagination="false" :dataSource="dataSource" :columns="columns" size="small" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'caozuo'">
            <a-space>
              <mars-button type="link">
                  <move-one fill="#FFF" @click="flyto(record)" />
                </mars-button>
                <mars-button type="link">
                  <delete-o fill="#FFF" @click="deleted(record)" />
              </mars-button>
            </a-space>
          </template>
          <template v-else>
            {{ record.name }}
          </template>
        </template>
      </a-table>
    </div>
  </pannel>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import { Delete as DeleteO, MoveOne } from "@icon-park/vue-next"
import * as mapWork from "./map.js"

interface TableItem {
  key: number
  name: string
  graphicId: string
}

// 表格数据
const columns = ref([
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
])
const dataSource = ref<TableItem[]>([])

onMounted(() => {
  window.$notify(
    "已知问题提示",
    `（1）对3dtiles数据有要求，仅适用于无自带着色器的纹理格式模型。
  （2）目前不支持所有3dtile数据，请替换url进行自测`,
    { duration: null }
  )

  mapWork.eventTarget.on("dataLoaded", function (event: any) {
    dataSource.value = event.list.map((item: any) => ({ key: item.id - 1, name: "裁剪区" + item.id, graphicId: item.id }))
  })
  mapWork.eventTarget.on("addItem", function (event: any) {
    const item = event.item
    dataSource.value.push({ key: item.id - 1, name: "裁剪区" + item.id, graphicId: item.id })
  })
})

// 表格的操作
const flyto = (record: TableItem) => {
  mapWork.flyToGraphic(record.graphicId)
}
const deleted = (record: TableItem) => {
  mapWork.deletedGraphic(record.graphicId)

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
