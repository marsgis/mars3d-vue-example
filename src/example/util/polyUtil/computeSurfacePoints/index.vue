<template>
  <!-- UI面板 -->
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space>
      <mars-button class="btn" @click="measureSection">绘制线</mars-button>
      <mars-button class="btn" danger @click="clear">清除</mars-button>
    </a-space>
  </mars-dialog>

  <!-- ecahrt图表 -->
  <mars-dialog v-model:visible="isShow" :left="70" :right="240" :bottom="40">
    <div class="echatsView">
      <div id="echartsView1" style="width: 100%; height: 100%"></div>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
import * as echarts from "echarts"
import * as mapWork from "./map.js"

const isShow = ref<boolean>(false)

let myChart1: echarts.ECharts

// 图表自适应
window.onresize = function () {
  myChart1.resize()
}

onMounted(() => {
  myChart1 = echarts.init(document.getElementById("echartsView1")!)
})

mapWork.eventTarget.on("measureEnd", function (event: any) {
  isShow.value = true
  nextTick(() => {
    setEchartsData(event)
  })
})

mapWork.eventTarget.on("measureClick", function (event: any) {
  if (event.value) {
    nextTick(() => {
      setEchartsData(event.value)
    })
  }
})

const measureSection = () => {
  mapWork.measureSection()
}

const clear = () => {
  mapWork.removeAll()
  isShow.value = false
  myChart1.clear()
}

function setEchartsData(data: any) {
  if (data == null || data.arrPoint == null) {
    return
  }
  const arrPoint = data.arrPoint
  let inhtml = ""

  const option = {
    grid: {
      left: 10,
      right: 40,
      bottom: 10,
      top: 40,
      containLabel: true
    },
    dataZoom: [
      {
        type: "inside",
        throttle: 50
      }
    ],
    tooltip: {
      trigger: "axis",
      // position: function (point, params, dom, rect, size) {
      //    return [10, 20];
      // },
      formatter: (params: any) => {
        if (params.length === 0) {
          mapWork.hideTipMarker()
          return inhtml
        }

        const hbgd = params[0].value // 海拔高度
        const point = arrPoint[params[0].dataIndex] // 所在经纬度
        const len = mapWork.formatDistance(Number(params[0].axisValue))
        const hbgdStr1 = mapWork.formatDistance(Number(params[0].value)) || "无"
        const hbgdStr2 = mapWork.formatDistance(Number(params[1].value)) || "无"
        const hbgdStr3 = mapWork.formatDistance(Number(params[2].value)) || "无"

        inhtml = `当前位置<br />
        距起点：${len}<br />
        C1高度：<span style='color:${params[0].color};'>${hbgdStr1}</span><br />
        C2高度：<span style='color:${params[1].color};'>${hbgdStr2}</span><br />
        C3高度：<span style='color:${params[2].color};'>${hbgdStr3}</span><br />
        经度：${point.lng}<br />
        纬度：${point.lat}`

        mapWork.showTipMarker(point, hbgd, inhtml)

        return inhtml
      }
    },
    xAxis: [
      {
        name: "长度",
        type: "category",
        nameTextStyle: { color: "rgb(255, 70, 131)" },
        boundaryGap: false,
        axisLine: {
          show: true
        },
        axisLabel: {
          show: true,
          formatter: "{value} 米",
          color: "#fff"
        },
        data: data.arrLen
      }
    ],
    yAxis: [
      {
        name: "高程",
        nameTextStyle: { color: "rgb(255, 70, 131)" },
        type: "value",
        min: 0, // getMinZ(arrPoint),
        axisLabel: {
          formatter: "{value} 米",
          color: "#fff"
        }
      }
    ],
    series: [
      {
        name: "C1高度",
        type: "line",
        smooth: true,
        itemStyle: {
          normal: {
            color: "#698d29"
          }
        },
        data: data.arrHB1
      },
      {
        name: "C2高度",
        type: "line",
        smooth: true,
        itemStyle: {
          normal: {
            color: "#782b71"
          }
        },
        data: data.arrHB2
      },
      {
        name: "C3高度",
        type: "line",
        smooth: true,
        itemStyle: {
          normal: {
            color: "#332d91"
          }
        },
        data: data.arrHB3
      }
    ]
  }

  myChart1.setOption(option)
  myChart1.resize()
}

function getMinZ(arr: any) {
  let minz = "dataMin"
  if (arr == null || arr.length === 0) {
    return minz
  }

  minz = arr[0].alt
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].alt < minz) {
      minz = arr[i].alt
    }
  }
  return minz
}
</script>
<style scoped lang="less">
.echatsView {
  width: 100%;
  height: 240px;
}
.btn {
  width:146px;
}
</style>
