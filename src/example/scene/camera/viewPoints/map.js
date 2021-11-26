var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lng: 102.5, lat: 35.13135, alt: 14307887.9, heading: 360, pitch: -90 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "大雁塔",
    url: "//data.mars3d.cn/3dtiles/qx-dyt/tileset.json",
    position: { alt: -27 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tiles3dLayer)

  // 创建视点
  var viewPoints = [
    { lng: 108.961601, lat: 34.217109, alt: 509.2, heading: 314.5, pitch: -22.5, duration: 8, stop: 0 },
    { lng: 108.96164, lat: 34.222159, alt: 510.3, heading: 211.2, pitch: -22.5, duration: 5, stop: 0 },
    { lng: 108.957259, lat: 34.221967, alt: 494.3, heading: 127.5, pitch: -17.2, duration: 5, stop: 0 },
    { lng: 108.957319, lat: 34.217225, alt: 515.5, heading: 25.4, pitch: -25.3, duration: 5 }
  ]

  // 视角切换（分步执行）
  map.setCameraViewList(viewPoints)
}
