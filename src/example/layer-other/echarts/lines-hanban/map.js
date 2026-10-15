import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 18.188973, lng: 112.70603, alt: 5647407, heading: 352, pitch: -76 }
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建Echarts图层
  createEchartsLayer()
}

let resizeHandler // resize监听引用，供卸载时移除

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null

  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler)
    resizeHandler = null
  }
}

let echartsLayer
function createEchartsLayer() {
  const options = getEchartsOption()
  // options.pointerEvents = true // 使用单击

  echartsLayer = new mars3d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)

  // if (options.pointerEvents) {
  //   echartsLayer.on("click", function (event) {
  //     console.log("单击了图层", event)
  //   })
  // }

  // 图表自适应
  resizeHandler = function () {
    echartsLayer.resize()
  }
  window.addEventListener("resize", resizeHandler)
}

export function changeShowLayer(value) {
  const options = value === 2 ? getEchartsOption2() : getEchartsOption()
  echartsLayer.setEchartsOption(options, true)
}

/**
 *echart图层
 *
 * @return {option} echart图表的数据
 */
function getEchartsOption() {
  const beijinCoord = [116.407395, 39.904211]

  const geoCoorddata = {
    合肥: [117.399043, 31.741401],
    深圳: [114.057865, 22.543096],
    乌鲁木齐: [87.405386, 41.779595]
  }

  const symbolPoint = "image://img/icon/symbol1.png"
  const linePoint = "image://img/icon/linePoint1.png"

  const pointArr = []
  for (const key in geoCoorddata) {
    pointArr.push({
      name: key,
      value: geoCoorddata[key],
      symbol: symbolPoint
    })
  }

  const option = {
    animation: false,

    series: [
      {
        name: "",
        type: "lines",
        coordinateSystem: "mars3dMap",
        zlevel: 1,
        data: [
          {
            name: "合肥",
            toname: "北京",
            coords: [geoCoorddata["合肥"], beijinCoord]
          },
          {
            name: "深圳",
            toname: "北京",
            coords: [geoCoorddata["深圳"], beijinCoord]
          },
          {
            name: "乌鲁木齐",
            toname: "北京",
            coords: [geoCoorddata["乌鲁木齐"], beijinCoord]
          }
        ],
        // 线上面的动态特效
        effect: {
          show: true,
          smooth: false,
          trailLength: 0,
          symbol: linePoint,
          symbolSize: [10, 30],
          period: 4
        },
        lineStyle: {
          normal: {
            width: 1,
            color: "#ffffff",
            curveness: 0.2
          }
        }
      },
      {
        type: "effectScatter",
        coordinateSystem: "mars3dMap",
        zlevel: 3,
        data: [
          {
            name: "北京",
            value: beijinCoord.concat(200)
          }
        ],
        rippleEffect: {
          period: 10,
          scale: 5,
          brushType: "fill"
        }
      },
      {
        type: "effectScatter",
        coordinateSystem: "mars3dMap",
        symbolSize: [20, 20],
        symbolOffset: [0, -10],
        zlevel: 3,
        circular: {
          rotateLabel: true
        },
        label: {
          normal: {
            show: true,
            position: "bottom",
            formatter: "{b}",
            fontSize: 18,
            color: "#fff",
            textBorderColor: "#2aa4e8",
            offset: [0, 20]
          }
        },
        itemStyle: {
          normal: {
            shadowColor: "none"
          }
        },
        data: pointArr
      }
    ]
  }
  return option
}

function getEchartsOption2() {
  const items = [
    {
      level: 1,
      name: "北京",
      label: "beijing",
      value: [116.407395, 39.904211],
      symbol: "",
      symbolSize: [30, 30]
    },
    {
      level: 1,
      symbol: "",
      name: "沈阳",
      label: "langfang",
      category: 0,
      active: true,
      speed: 6,
      value: [122.904763, 41.689105],
      belong: "北京"
    },
    {
      level: 1,
      symbol: "",
      name: "西宁",
      category: 0,
      active: true,
      speed: 6,
      value: [101.4038, 36.8207],
      belong: "北京"
    },
    {
      level: 1,
      symbol: "",
      name: "兰州",
      category: 0,
      active: true,
      speed: 6,
      value: [103.5901, 36.3043],
      belong: "北京"
    },
    {
      level: 1,
      symbol: "",
      name: "杭州",
      category: 0,
      active: true,
      speed: 6,
      value: [119.5313, 29.8773],
      belong: "北京"
    },
    {
      level: 1,
      symbol: "",
      name: "四川",
      category: 0,
      active: true,
      speed: 6,
      value: [103.9526, 30.7617],
      belong: "北京"
    },
    {
      level: 2,
      symbol: "",
      name: "重庆",
      category: 0,
      active: true,
      speed: 6,
      value: [107.7539, 30.1904],
      belong: "四川"
    },
    {
      level: 1,
      symbol: "",
      name: "乌鲁木齐",
      category: 0,
      active: true,
      speed: 6,
      value: [85.865421, 43.452051],
      belong: "北京"
    },
    {
      level: 1,
      symbol: "",
      name: "喀什",
      category: 0,
      active: true,
      speed: 6,
      value: [84.693786, 36.353336],
      belong: "北京"
    },
    {
      level: 1,
      symbol: "",
      name: "温州",
      category: 0,
      active: true,
      speed: 6,
      value: [120.647069, 28.01946],
      belong: "杭州"
    },
    {
      level: 2,
      symbol: "",
      name: "舟山",
      category: 0,
      active: true,
      speed: 6,
      value: [122.2559, 30.2234],
      belong: "杭州"
    }
  ]

  const lineColor = ["#fff", "#f6fb05", "#00fcff"]

  // 城市点位图标
  const symbolList = ["image://img/icon/symbol1.png", "image://img/icon/symbol2.png"]

  // 线上的动态运动点图标
  const pointSymbol = ["image://img/icon/linePoint1.png", "image://img/icon/linePoint2.png"]

  // level = 1的地点添加图标
  items.forEach((el) => {
    el.symbol = symbolList[el.level - 1]
  })

  const dataArr = [[], [], []]
  items.forEach((el) => {
    if (el.belong) {
      items.forEach((element) => {
        if (el.belong === element.name) {
          dataArr[el.level - 1].push([
            {
              coord: element.value
            },
            {
              coord: el.value
            }
          ])
        }
      })
    }
  })

  const seriesOne = [
    {
      type: "effectScatter",
      layout: "none",
      // coordinateSystem: "cartesian2d",
      coordinateSystem: "mars3dMap",
      symbolSize: [20, 20],
      symbolOffset: [0, -10],
      zlevel: 3,
      circular: {
        rotateLabel: true
      },
      label: {
        normal: {
          show: true,
          position: "bottom",
          formatter: "{b}",
          fontSize: 24,
          color: "#fff",
          textBorderColor: "#2aa4e8",
          offset: [0, 20]
        }
      },
      itemStyle: {
        normal: {
          shadowColor: "none"
        }
      },
      data: items
    }
  ]
  const lineSeries = []
  dataArr.forEach((el, index) => {
    lineSeries.push({
      name: "",
      type: "lines",
      // coordinateSystem: "cartesian2d",
      coordinateSystem: "mars3dMap",
      zlevel: 1,
      effect: {
        show: true,
        smooth: false,
        trailLength: 0,
        symbol: pointSymbol[index],
        symbolSize: [10, 30],
        period: 4
      },

      lineStyle: {
        width: 2,
        color: lineColor[index],
        curveness: -0.2
      },
      data: el
    })
  })

  const seriesData = seriesOne.concat(lineSeries)

  const option = {
    animation: false,
    // backgroundColor: '#000',

    series: seriesData
  }
  return option
}
