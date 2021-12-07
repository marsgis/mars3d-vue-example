<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item label="名称">
        <mars-input class="inputServe" v-model:value="serverName" placeholder="请输入查询关键字"></mars-input>
      </a-form-item>

      <a-form-item label="范围">
        <a-space>
          <mars-button @click="drawRectangle">框选范围</mars-button>
          <mars-button @click="drawCircle">圆形范围</mars-button>
          <mars-button @click="drawPolygon">多边形范围</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item label="范围">
        <a-space>
          <mars-button @click="query">查询</mars-button>
          <mars-button @click="removeAll">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item v-show="show">
        <a-tabs v-model:activeKey="activeKey" :centered="true" :tabBarGutter="55">
          <a-tab-pane key="1" tab="表格" force-render :forceRender="true">
            <a-form-item>
              <a-table
                :pagination="false"
                :dataSource="dataSource"
                :columns="columns"
                size="small" bordered="true" />
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" tab="饼状图" :forceRender="true">
            <div id="pieChart" class="chart"></div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="柱状图" :forceRender="true">
            <div id="histogram" class="chart"></div>
          </a-tab-pane>
        </a-tabs>
      </a-form-item>

    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import any from "nprogress"
import * as echarts from "echarts"
import * as mapWork from "./map.js"

const serverName = ref("")

const show = ref<boolean>(false)

const activeKey = ref("1")

// 表格数据
const dataSource = ref([any])
// 取到js中的数据
mapWork.eventTarget.on("loadOk", function(event:any) {
  // 表格数据
  dataSource.value = []
  event.arrTable.forEach((item:any, index:any) => {
    dataSource.value.push({
                            key: index,
                            index: index + 1,
                            type: item.name,
                            num: item.count,
                            area: item.area
                          })
  })

  // 饼状图数据
  const pieDom:any = document.getElementById("pieChart")
  const pieEcharts = echarts.init(pieDom)

  pieEcharts.setOption(event.pieEchartsOption)

  // 柱状图数据
  const histogramDom:any = document.getElementById("histogram")
  const histogramECharts = echarts.init(histogramDom)
  histogramECharts.setOption(event.histogramOption)
})

const columns = ref([
  {
    title: "序号",
    dataIndex: "index",
    key: "index"
  },
  {
    title: "类别",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "数量",
    dataIndex: "num",
    key: "num"
  },
  {
    title: "面积（亩）",
    dataIndex: "area",
    key: "area"
  }
])

// 绘制范围
const drawRectangle = () => {
  mapWork.drawRectangle()
}
const drawCircle = () => {
  mapWork.drawCircle()
}
const drawPolygon = () => {
  mapWork.drawPolygon()
}
// 查询数据
const query = () => {
  mapWork.queryData(serverName.value)
  if (dataSource.value.length !== 0) {
    show.value = true
  } else {
    show.value = false

  }
}

// 清除数据
const removeAll = () => {
  show.value = false
  mapWork.clearAll()
}
</script>
<style scoped lang="less">
.infoView{
  width: 320px;
}
.inputServe{
  width:250px;
}
.chart{
  width: 380px;
  height: 250px
}
</style>
