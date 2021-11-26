var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.2322, lng: 121.44363, alt: 1989, heading: 87, pitch: -25 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  var osmBuildingsLayer = new mars3d.layer.OsmBuildingsLayer({
    highlight: {
      type: "click",
      color: "#00FF00"
    },
    popup: "all"
  })
  map.addLayer(osmBuildingsLayer)
}
