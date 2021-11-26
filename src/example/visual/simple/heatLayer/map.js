var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.466724, lng: 119.306582, alt: 182294, heading: 359, pitch: -68 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  queryWindyuvApiData()
    .then(function (data) {
      var arrPoints = []
      for (var i = 0; i < data.Data.length; i++) {
        const item = data.Data[i]
        arrPoints.push({ lng: item.X, lat: item.Y, value: item.Count })
      }
      showHeatMap(arrPoints)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

// 访问后端接口，取数据
function queryWindyuvApiData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/heat.json" })
}

function showHeatMap(arrPoints) {
  // 热力图 图层
  var heatLayer = new mars3d.layer.HeatLayer({
    positions: arrPoints,
    // 以下为热力图本身的样式参数，可参阅api：https://www.patrick-wied.at/static/heatmapjs/docs.html
    heatStyle: {
      radius: 120,
      blur: 0.85
    },
    // 以下为矩形矢量对象的样式参数
    style: {
      opacity: 1.0
      // clampToGround: true,
    },
    flyTo: true
  })
  map.addLayer(heatLayer)
}
