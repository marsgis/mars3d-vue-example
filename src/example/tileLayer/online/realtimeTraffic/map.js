var map
var eventTarget = new mars3d.BaseClass()
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.841275, lng: 117.311355, alt: 50289, heading: 292, pitch: -85 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  map.basemap = 2017 // 切换至蓝色底图

  addGaodeLayer()
}

// 叠加的图层
var tileLayer

function addGaodeLayer() {
  removeLayer()
  tileLayer = new mars3d.layer.GaodeLayer({
    layer: "time",
    minimumTerrainLevel: 4,
    minimumLevel: 4,
    proxy: "//server.mars3d.cn/proxy/"
  })
  map.addLayer(tileLayer)
}

function addBaiduLayer() {
  removeLayer()

  tileLayer = new mars3d.layer.BaiduLayer({
    name: "百度实时路况",
    layer: "time"
  })
  map.addLayer(tileLayer)
}

function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
