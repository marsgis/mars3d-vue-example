<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <mars-table :pagination="false" :customRow="rowClick" :columns="columns" :dataSource="dataSource"
      :row-selection="rowSelection" />
  </mars-dialog>
  <mars-dialog customClass="message-list" :visible="true" right="10" top="335" width="330">
    <div v-for="(msgList, index) in msg" :key="index">
      <a-space>
        <div class="out-circle">
        <div class="in-circle">
        </div>
      </div>
      <p class="f-push-5-b">{{ msgList }}</p>
      </a-space>

    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
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

const arr: DataItem[] = []
const arrKey: string[] = []

mapWork.eventTarget.on("carList", function (event: any) {
  event.tableData.forEach((item: any, index: number) => {
    arr.push({
      key: item.id,
      num: index + 1,
      carNumber: item.name,
      type: item.type === 1 ? "土方车" : "挖掘机"
    })
    arrKey.push(item.id)
  })
  dataSource.value = arr
  rowKeys.value = arrKey
})

mapWork.eventTarget.on("showPath", function (event: any) {
  msg.value.push(event.path)
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
    mapWork.onSelect(record.key, selected)
  }
})

// 点击行事件
const rowClick = (recode: any) => {
  return {
    onClick: () => {
      mapWork.flyToModel(recode.key)
    }
  }
}
</script>

<style lang="less" scoped>
.message-list {
  max-height: 220px;
  overflow: auto;
}

:deep(.ant-table-row:nth-of-type(even)) {
  background-color: transparent !important;
}

.out-circle {
  width: 12px;
  height: 12px;
  background: rgba(51, 133, 255, 0.2);
  border-radius: 50%;

  .in-circle {
    position: relative;
    transform: translate(50%, 50%);
    width: 6px;
    height: 6px;
    background: #3385FF;
    border-radius: 50%;
  }
}
</style>
