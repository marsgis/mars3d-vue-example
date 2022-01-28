<template>
  <pannel class="infoView">
    <a-table
      size="small"
      :customRow="tyRowClick"
      :row-selection="rowSelection"
      bordered
      :pagination="{ pageSize: 5 }"
      :columns="columns"
      :data-source="typhoonList"
      rowKey="id"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </a-table>

    <div class="playBtn">
      <a-space>
        <mars-button @click="startPlay">播放</mars-button>
        <mars-button @click="stopPlay">停止</mars-button>
      </a-space>
    </div>

    <a-table
      size="small"
      :scroll="{ y: tableScrollHeight }"
      :sticky="true"
      bordered
      :pagination="false"
      :columns="columnsPath"
      :data-source="dataPath"
      :customRow="rowClick"
      rowKey="id"
    >
      <template #bodyCell="{ text }">
        <a>{{ text }}</a>
      </template>
    </a-table>
  </pannel>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import { TableColumnType, TableProps } from "ant-design-vue"
import { setAutoHeight } from "@/utils/index"
import * as mapWork from "./map.js"

interface typhoon {
  id: number
  name_en: string
  name_cn: string
  typnumber: string
  state: string
}
const columns: TableColumnType[] = [
  {
    title: "台风编号",
    dataIndex: "typnumber",
    key: "typnumber"
  },
  {
    title: "台风名(中文)",
    dataIndex: "name_cn"
  },
  {
    title: "台风名(英文)",
    dataIndex: "name_en"
  }
]

const columnsPath: TableColumnType[] = [
  {
    title: "时间",
    dataIndex: "time_str",
    width: 110,
    ellipsis: true
  },

  {
    title: "风速",
    dataIndex: "centerSpeed",
    width: 46
  },
  {
    title: "移向",
    dataIndex: "moveTo_str"
  },
  {
    title: "强度",
    dataIndex: "level_str"
  }
]

const typhoonList = ref<typhoon[]>([]) // 台风列表数据

const dataPath = ref([]) // 台风路径数据
const tableScrollHeight = ref(0)

// 高度自适应
onMounted(() => {
  tableScrollHeight.value = setAutoHeight((height) => {
    tableScrollHeight.value = height
  }, 450)
})

mapWork.eventTarget.on("loadOk", function (event: any) {
  typhoonList.value = event.arr.typhoonList.map((item: any) => ({
    id: item[0],
    name_en: item[1],
    name_cn: item[2],
    typnumber: item[3],
    state: item[7]
  }))
})

const rowSelection: TableProps["rowSelection"] = {
  onSelect: (selectedRowKeys: any, selectedRows: any) => {
    const msg = {
      id: selectedRowKeys.id,
      name_en: selectedRowKeys.name_en,
      name_cn: selectedRowKeys.name_cn,
      typnumber: selectedRowKeys.typnumber,
      state: selectedRowKeys.state
    }
    if (selectedRows) {
      mapWork.selectOneTyphoon(msg)
      mapWork.eventTarget.on("pathList", function (event: any) {
        const msgPath = event.typhoonObj.options.path

        dataPath.value = msgPath.map((item: any) => item)
      })
    } else {
      mapWork.unSelectOneTyphoon(msg)
      dataPath.value = []
    }
  }
}
// 点击行
const rowClick = (recode: any) => {
  return {
    onClick: () => {
      mapWork.clickPathRow(recode)
    }
  }
}
// 点击台风列表的行
const tyRowClick = (recode: any) => {
  return {
    onClick: () => {
      mapWork.clickTyRow(recode)
    }
  }
}

const startPlay = () => {
  mapWork.startPlay()
}
const stopPlay = () => {
  mapWork.stopPlay()
}
</script>
<style scoped lang="less">
.infoView {
  width: 338px;
}
.playBtn {
  margin-bottom: 5px;
}
</style>
