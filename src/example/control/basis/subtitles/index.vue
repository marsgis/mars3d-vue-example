<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space>
      <mars-button @click="startPlay()" >重新开始</mars-button>
      <mars-button @click="ztPlay()" v-if="shouldAnimate" >暂停</mars-button>
      <mars-button @click="jxPlay()" v-if="!shouldAnimate" >继续</mars-button>
    </a-space>
      <mars-table
      size="small"
      :dataSource="dataSource"
      :columns="graphicColumns"
      :pagination='false'
      :row-class-name="getRowClass">
    </mars-table>

    <div class="f-mt">
      总时长{{ allDuration }}秒，共{{ dataSource.length }}任务，当前正在执行第{{ activeIndex + 1 }}个
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"


// 数据列表
interface TableItem {
  key: number
  name: string
}

const activeIndex = ref<number | null>(0)
const dataSource = ref<TableItem[]>([])
const allDuration = ref<number>(0) // 总时长

// 列表名称
const graphicColumns = [
  {
    title: "序号",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "内容",
    dataIndex: "text",
    key: "text",
    width: 140
  },
  {
    title: "时间范围",
    dataIndex: "startstop",
    key: "startstop"
  },
  {
    title: "时长",
    dataIndex: "duration",
    key: "duration"
  }
]



mapWork.eventTarget.on("getTableData", (event) => {
  const list = event.list
  allDuration.value = event.allDuration

  dataSource.value = list.map((item, index) => {
    return { key: index + 1, text: item.options.text, startstop: item.start + "-" + item.stop, duration: item.duration }
  })
})


mapWork.eventTarget.on("changeIndex", (event) => {

  activeIndex.value = event.index

})

function getRowClass(_record, index) {
  return (index === activeIndex.value ? "active-row" : null)
}
const shouldAnimate = ref(true)
function startPlay() {
  mapWork.startPlay()
  shouldAnimate.value = true
}
function ztPlay() {
  mapWork.updateShouldAnimate(false)
  shouldAnimate.value = false
}

function jxPlay() {
  mapWork.updateShouldAnimate(true)
  shouldAnimate.value = true
}

</script>

<style lang="less">
.active-row {
  background-color: var(--mars-hover-color, #1487f5) !important;
}
</style>
