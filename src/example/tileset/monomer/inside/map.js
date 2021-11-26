var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.654916, lng: 117.08278, alt: 279, heading: 316, pitch: -29 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true

  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    type: "3dtiles",
    name: "石化工厂",
    url: "//data.mars3d.cn/3dtiles/max-shihua/tileset.json",
    position: { lng: 117.077158, lat: 31.659116, alt: 24.6 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    highlight: { type: "click", color: "#00ffff" },
    popup: "all"
  })
  map.addLayer(tiles3dLayer)

  // 单击事件
  tiles3dLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了3dtiles图层", event)
  })
}
