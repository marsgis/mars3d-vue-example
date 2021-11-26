var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.589203, lng: 120.732051, alt: 18446, heading: 2, pitch: -49 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  queryLineroadApiData()
}

// 访问后端接口，取数据
function queryLineroadApiData() {
  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/lineroad.json" })
    .then(function (json) {
      // 创建Echarts图层

      createEchartsLayer(json.data)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}
function createEchartsLayer(data) {
  var options = getEchartsOption(data)
  options.depthTest = false // 是否进行计算深度（大数据时，需要关闭）

  var echartsLayer = new mars3d.layer.EchartsLayer(options)
  map.addLayer(echartsLayer)

  // 图表自适应
  window.addEventListener("resize", function () {
    echartsLayer.resize()
  })
}

function getEchartsOption(data) {
  var option = {
    animation: false,

    visualMap: {
      type: "piecewise",
      left: "right",
      bottom: 46,
      /* pieces: [
                {min: 15}, // 不指定 max，表示 max 为无限大（Infinity）。
                {min: 12, max: 15},
                {min: 9, max: 12},
                {min: 6, max: 9},
                {min: 3, max: 6},
                {max: 3}     // 不指定 min，表示 min 为无限大（-Infinity）。
        ], */
      min: 0,
      max: 15,
      splitNumber: 5,
      maxOpen: true,
      color: ["red", "yellow", "green"],
      textStyle: {
        color: "#ffffff"
      }
    },
    tooltip: {
      formatter: function (params, ticket, callback) {
        return "拥堵指数:" + params.value
      },
      trigger: "item"
    },
    series: [
      {
        type: "lines",
        coordinateSystem: "mars3dMap",
        polyline: true,
        data: data,
        lineStyle: {
          normal: {
            opacity: 1,
            width: 4
          },
          emphasis: {
            width: 6
          }
        },
        effect: {
          show: true,
          symbolSize: 2,
          color: "white"
        }
      }
    ]
  }

  return option
}
