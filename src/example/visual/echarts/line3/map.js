var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 18.188973, lng: 112.70603, alt: 5647407, heading: 352, pitch: -76 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建Echarts图层
  createEchartsLayer()
}

function createEchartsLayer() {
  var options = getEchartsOption()
  var echartsLayer = new mars3d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)

  // 图表自适应
  window.addEventListener("resize", function () { echartsLayer.resize() })
}

function getEchartsOption(data) {
  var beijinCoord = [116.407395, 39.904211]

  var geoCoorddata = {
    合肥: [117.399043, 31.741401],
    深圳: [114.057865, 22.543096],
    乌鲁木齐: [87.405386, 41.779595]
  }

  var symbolPoint = "image://img/marker/symbol1.png"
  var linePoint = "image://img/marker/linePoint1.png"

  var pointArr = []
  for (var key in geoCoorddata) {
    pointArr.push({
      name: key,
      value: geoCoorddata[key],
      symbol: symbolPoint
    })
  }

  var option = {
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
