<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="measureSection">绘制线</mars-button>
      <mars-button @click="clear">清除</mars-button>
    </a-space>
  </PannelBox>

  <LocationTo />

  <PannelBox class="echartsBox" v-show="isShow">
    <div id="sectionChars" class="echatsView">
      <div id="echartsView1" style="width: 100%; height: 100%"></div>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import * as echarts from "echarts"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const isShow = ref<boolean>(false)

const data = ref()

let myChart1: echarts.ECharts
onMounted(() => {
  myChart1 = echarts.init(document.getElementById("echartsView1")!)
})

mapWork.measureObj.on(mapWork.mars3d.EventType.start, function (e: any) {
  console.log("开始分析", e)
  // 开始分析前回调(异步)
  mapWork.showLoading()
})

mapWork.measureObj.on(mapWork.mars3d.EventType.end, function (e: any) {
  console.log("分析结束", e)
  // 分析完成后回调(异步)
  mapWork.hideLoading()

  if (e.graphic?.type === mapWork.mars3d.graphic.SectionMeasure.type) {
    console.log(e)
    data.value = e
    setEchartsData(data.value)
    isShow.value = true
  }
})

mapWork.measureObj.on(mapWork.mars3d.EventType.click, function (e: any) {
  // console.log('单击了对象', e)
  data.value = e.graphic?.measured
  if (e.graphic?.type === mapWork.mars3d.graphic.SectionMeasure.type && data.value) {
    setEchartsData(data.value)
    isShow.value = true
  }
})

const measureSection = () => {
  mapWork.measureSection()
}

const clear = () => {
  mapWork.removeAll()
  isShow.value = false
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
        const len = mapWork.mars3d.MeasureUtil.formatDistance(Number(params[0].axisValue))
        const hbgdStr = mapWork.mars3d.MeasureUtil.formatDistance(Number(params[0].value))

        inhtml = `当前位置<br />
                      距起点：${len}<br />
                      海拔：<span style='color:${params[0].color};'>${hbgdStr}</span><br />
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
        min: mapWork.getMinZ(arrPoint),
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

  window.addEventListener("resize", function () {
    myChart1.resize()
  })
}
</script>
<style scoped lang="less">
.echartsBox {
  top: auto;
  left: 50px;
  width: calc(100% - 60px);
  bottom: 40px;
}
.echatsView {
  width: 100%;
  height: 200px;
}
</style>
