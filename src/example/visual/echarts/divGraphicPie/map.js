import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 32.246011, lng: 119.666969, alt: 317736, heading: 360, pitch: -90 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建div图层
  graphicLayer = new mars3d.layer.DivLayer()
  map.addLayer(graphicLayer)

  const arrData = [
    {
      PortName: "南通市",
      TotalLength: 233991,
      DeepUsedLength: 51077,
      DeepUnUsedLength: 131008,
      UnDeepUsedLength: 28579,
      UnDeepUnUsedLength: 23327,
      X: 120.83720389900009,
      Y: 32.00030006500003,
      id: 8
    },
    {
      PortName: "南京市",
      TotalLength: 91025,
      DeepUsedLength: 36909,
      DeepUnUsedLength: 12551,
      UnDeepUsedLength: 28251,
      UnDeepUnUsedLength: 13313,
      X: 118.73599633300012,
      Y: 32.08923823900005,
      id: 9
    },
    {
      PortName: "镇江市",
      TotalLength: 147431,
      DeepUsedLength: 35499,
      DeepUnUsedLength: 52026,
      UnDeepUsedLength: 18359,
      UnDeepUnUsedLength: 41547,
      X: 119.61540071200011,
      Y: 32.18204232800008,
      id: 10
    },
    {
      PortName: "扬州市",
      TotalLength: 49649,
      DeepUsedLength: 30245,
      DeepUnUsedLength: 9140,
      UnDeepUsedLength: 8164,
      UnDeepUnUsedLength: 2101,
      X: 119.3991518150001,
      Y: 32.271322643000076,
      id: 36
    },
    {
      PortName: "常州市",
      TotalLength: 9849,
      DeepUsedLength: 3484,
      DeepUnUsedLength: 836,
      UnDeepUsedLength: 4115,
      UnDeepUnUsedLength: 1415,
      X: 119.98426756200001,
      Y: 31.971521771000027,
      id: 37
    },
    {
      PortName: "江阴市",
      TotalLength: 23570,
      DeepUsedLength: 22365,
      DeepUnUsedLength: 1205,
      UnDeepUsedLength: 0,
      UnDeepUnUsedLength: 0,
      X: 120.32921593100002,
      Y: 31.927882063000027,
      id: 38
    }
  ]
  showDivGraphic(arrData)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function showDivGraphic(arr) {
  for (let i = 0; i < arr.length; i++) {
    const deepUnUsed = arr[i].DeepUnUsedLength // 国道
    const deepUsed = arr[i].DeepUsedLength // 县道
    const total = arr[i].TotalLength // 中间显示
    const unDeepUnUsed = arr[i].UnDeepUnUsedLength // 铁路
    const unDeepUsed = arr[i].UnDeepUsedLength // 高速
    const cityName = arr[i].PortName // 城市名字
    const points = [arr[i].X, arr[i].Y] // 位置

    const point = mars3d.LatLngPoint.fromCartesian(points) // 经纬度坐标
    const divPostion = point._position

    // 白色背景
    const backGroundGraphic = new mars3d.graphic.DivGraphic({
      position: divPostion,
      style: {
        html: '<div style="width:60px;height:60px;border-radius: 50%;background-color: #ffffff; position: relative;"></div>',
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER
      }
    })
    graphicLayer.addGraphic(backGroundGraphic)

    // div
    const graphic = new mars3d.graphic.DivGraphic({
      position: divPostion,
      style: {
        html: '<div style="width: 100px;height:100px;"></div>',
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER
      },
      pointerEvents: true
    })
    graphic.on(mars3d.EventType.add, function (e) {
      const dom = e.target.container.firstChild
      const attr = e.target.attr

      const chartChart = echarts.init(dom)

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}km </br>占比 : {d}%",
          backgroundColor: "rgba(63, 72, 84, 0.7)",
          textStyle: {
            color: "#ffffff"
          }
        },
        title: {
          text: total + "\n Km",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 14
          }
        },
        color: ["#334b5c", "#6ab0b8", "#d48265", "#c23531"],
        series: [
          {
            name: cityName,
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: deepUnUsed, name: "国道" },
              { value: deepUsed, name: "县道" },
              { value: unDeepUnUsed, name: "铁路" },
              { value: unDeepUsed, name: "高速" }
            ]
          }
        ]
      }

      chartChart.setOption(option)
    })
    graphicLayer.addGraphic(graphic)
  }
}
