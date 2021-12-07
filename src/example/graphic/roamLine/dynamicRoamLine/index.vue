<template>
  <PannelBox class="infoView">
    <a-table :pagination="false" :columns="columns" :dataSource="dataSource" :row-selection="rowSelection" />
  </PannelBox>
  <PannelBox class="msg">
    <div v-for="(msgList, index) in msg" :key="index">
      <p>{{ msgList }}</p>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

interface DataItem {
  key: string | number
  num: number
  carNumber: number
  type: string
}

const dataSource = ref<DataItem[]>([])
// 默认的选项
const rowKeys = ref<string[]>([]) // Check here to configure the default column

const msg = ref<string[]>([])

onMounted(() => {
  const arr: DataItem[] = []
  const arrKey: string[] = []

  mapWork.eventTarget.on("loadOk", function (event: any) {
    msg.value.push(event.log)

    event.tableData.forEach((item: any, index: number) => {
      arr.push({
        key: item.id,
        num: index + 1,
        carNumber: item.name,
        type: item.type == "1" ? "土方车" : "挖掘机"
      })
      arrKey.push(item.id)
    })
    dataSource.value = arr
    rowKeys.value = arrKey
  })
})

mapWork.eventTarget.on("showMsg", function (event: any) {
  msg.value.push(event.log)
})

const columns: any[] = [
  {
    title: "序号",
    dataIndex: "num",
    key: "num"
  },
  {
    title: "车牌号",
    dataIndex: "carNumber",
    key: "carNumber"
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type"
  }
]

const rowSelection = ref({
  hideSelectAll: true,
  hideDefaultSelections: true,
  selectedRowKeys: rowKeys,
  onChange: (selectedRowKeys: string[]) => {
    // 使得点击之后选项改变
    rowKeys.value = selectedRowKeys
  },
  onSelect: (record: DataItem, selected: boolean) => {
    // 对车子进行的操作
    mapWork.onSelece(record, selected)
  }
})
</script>

<style scoped lang="less">
.msg {
  top: 300px;
  right: 10px;
}
.infoView {
  width: 306px;
}
</style>
