var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.771164, lng: 117.242438, alt: 9736, heading: 0, pitch: -56 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.viewer.imageryLayers._layers.forEach(function (layer) {
    layer.brightness = 0.3
  })

  queryMapvLayerData()
  .then(function (data) {
    createMapvLayer(data.features)
  })
  .otherwise(function (error) {
    console.log("加载JSON出错", error)
  })
}

// 获取数据
function queryMapvLayerData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/buildings-hf.json" })
}
// 创建mapv图层
function createMapvLayer(geojson) {
  var options = {
    fillStyle: "rgba(255, 80, 53, 0.8)",
    strokeStyle: "rgba(250, 255, 53, 0.8)",
    size: 3,
    lineWidth: 1,
    draw: "simple",
    depthTest: false // 是否进行计算深度（大数据时，需要关闭）
  }
  var dataSet = new this.mapv.DataSet(geojson)

  // 创建MapV图层
  var mapVLayer = new mars3d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}
