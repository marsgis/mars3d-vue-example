var tileLayer
var wmsLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 28.268322, lng: 117.426104, alt: 1052215, heading: 0, pitch: -69 }
    },
    control: {
      baseLayerPicker: false
    },
    basemaps: [],
    layers: [{ type: "tileinfo", name: "瓦片信息", order: 2, show: true }]
  })

  // 创建三维地球场景
  var map = new mars3d.Map("mars3dContainer", mapOptions)

  // 添加图层
  tileLayer = new mars3d.layer.TdtLayer({
    name: "天地图影像",
    layer: "img_d",
    order: 1
  })
  map.addLayer(tileLayer)

  // wms、arcgis等矢量发布类型图层支持click事件
  wmsLayer = new mars3d.layer.WmsLayer({
    url: "//server.mars3d.cn/geoserver/mars/wms",
    layers: "mars:hf",
    crs: "EPSG:4326",
    parameters: {
      transparent: "true",
      format: "image/png"
    },
    getFeatureInfoParameters: {
      feature_count: 10
    },
    popup: "all"
  })
  map.addLayer(wmsLayer)

  addTileStatus()
}

function addTileStatus() {
  var count = 0
  // 添加单个瓦片，开始加载瓦片（请求前）
  tileLayer.on(mars3d.EventType.addTile, function (event) {
    count++
    console.log(`${count},开始请求加载瓦片: L:${event.level},X:${event.x},Y:${event.y}`)
  })
  // 添加单个瓦片 加载瓦片完成
  tileLayer.on(mars3d.EventType.addTileSuccess, function (event) {
    count--
    console.log(`${count},开始请求加载瓦片: L:${event.level},X:${event.x},Y:${event.y}`)
  })
  // 添加单个瓦片 加载瓦片出错
  tileLayer.on(mars3d.EventType.addTileError, function (event) {
    count--
    console.log(`${count},开始请求加载瓦片: L:${event.level},X:${event.x},Y:${event.y}`)
  })

  // 卸载移除了瓦片
  tileLayer.on(mars3d.EventType.removeTile, function (event) {
    console.log(`卸载移除了瓦片: L:${event.level},X:${event.x},Y:${event.y}`)
  })

  // 单击事件
  wmsLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了矢量数据，共" + event.features.length + "条", event)
  })
}
