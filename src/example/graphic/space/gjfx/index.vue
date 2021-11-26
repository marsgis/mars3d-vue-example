<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">过境区域:</span>
          <mars-button @click="drawRectangle">框选</mars-button>
          <mars-button @click="drawCircle">圆形</mars-button>
          <mars-button @click="drawPolygon">多边形</mars-button>
          <mars-button @click="drawClear">清除</mars-button>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">开始时间:</span>
          <mars-date-picker v-model:value="startTime" format="YYYY-MM-DD HH:mm:ss" :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">结束时间:</span>
          <mars-date-picker v-model:value="endTime" format="YYYY-MM-DD HH:mm:ss" :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label"></span>
          <mars-button @click="startFX">开始分析</mars-button>
          <mars-button @click="clearResult">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-table size="small" :pagination="{ pageSize: 5 }" :columns="columns" :data-source="data">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
        </template>
      </a-table>
    </a-form>
  </PannelBox>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import dayjs, { Dayjs } from "dayjs"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

const columns = [
  {
    title: "卫星名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "进入时间",
    dataIndex: "inTime",
    key: "inTime"
  },
  {
    title: "飞出时间",
    dataIndex: "outTime",
    key: "outTime"
  },
  {
    title: "飞行时长",
    dataIndex: "often",
    key: "often"
  },
  {
    title: "飞行距离",
    dataIndex: "distance",
    key: "distance"
  }
]

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const startTime = ref<Dayjs>(dayjs())
const endTime = ref<Dayjs>(dayjs().add(60, "minute"))

// 框选查询 矩形
const drawRectangle = () => {
  mapWork.drawRectangle()
}
// 框选查询   多边
const drawPolygon = () => {
  mapWork.drawPolygon()
}
// 框选查询   圆
const drawCircle = () => {
  mapWork.drawCircle()
}

const drawClear = () => {
  mapWork.drawClear()
}

const clearResult = () => {
  mapWork.clearResult()
}

const data = ref([])

const startFX = () => {
  const startTimes = dayjs(startTime.value).valueOf()
  const endTimes = dayjs(endTime.value).valueOf()

  mapWork.startFX(startTimes, endTimes)

  data.value = mapWork.tableList
}
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}
</style>
