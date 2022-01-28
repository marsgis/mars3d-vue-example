<template>
  <!-- UI面板 -->
  <pannel class="infoView">
    <a-space>
      <mars-button @click="measureSection">绘制线</mars-button>
      <mars-button @click="clear">清除</mars-button>
    </a-space>
  </pannel>

  <!-- ecahrt图表 -->
  <pannel class="echartsBox" v-show="isShow">
    <div class="echatsView">
      <div id="echartsView1" style="width: 100%; height: 100%"></div>
    </div>
  </pannel>

  <location-to />
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import LocationTo from "@comp/mars-sample/location-to.vue"
import * as echarts from "echarts"
import * as mapWork from "./map.js"

const isShow = ref<boolean>(false)
const data = ref()

let myChart1: echarts.ECharts

// 图表自适应
window.addEventListener("resize", function () {
  myChart1.resize()
})

onMounted(() => {
  myChart1 = echarts.init(document.getElementById("echartsView1")!)
})

mapWork.eventTarget.on("end", function (event: any) {
  data.value = event.e
  nextTick(() => {
    setEchartsData(data.value)
  })
  isShow.value = true
})

mapWork.eventTarget.on("click", function (event: any) {
  const e = event.e
  data.value = e.graphic?.measured
  if (data.value) {
    nextTick(() => {
      setEchartsData(data.value)
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
      right: 10,
      bottom: 10,
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
        const result = mapWork.calculation(params[0])

        inhtml = `当前位置<br />
                      距起点：${result.len}<br />
                      海拔：<span style='color:${params[0].color};'>${result.hbgdStr}</span><br />
                      经度：${point.lng}<br />
                      纬度：${point.lat}`

        mapWork.showTipMarker(point, hbgd, inhtml)

        return inhtml
      }
    },
    xAxis: [
      {
        name: "行程",
        type: "category",
        boundaryGap: false,
        axisLine: {
          show: true
        },
        axisLabel: {
          show: true,
          formatter: "{value} 米"
        },
        data: data.arrLen
      }
    ],
    yAxis: [
      {
        name: "高程",
        type: "value",
        min: getMinZ(arrPoint),
        axisLabel: {
          formatter: "{value} 米"
        }
      }
    ],
    series: [
      {
        name: "高程值",
        type: "line",
        smooth: true,
        symbol: "none",
        sampling: "average",
        itemStyle: {
          normal: {
            color: "rgb(255, 70, 131)"
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(255, 158, 68)"
              },
              {
                offset: 1,
                color: "rgb(255, 70, 131)"
              }
            ])
          }
        },
        data: data.arrHB
      }
    ]
  }

  myChart1.setOption(option)
  myChart1.resize()

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
}
</script>
<style scoped lang="less">
.echartsBox {
  top: auto !important;
  left: 50px;
  width: calc(100% - 60px);
  bottom: 40px;
  .echatsView {
    width: 100%;
    height: 200px;
  }
}
</style>
