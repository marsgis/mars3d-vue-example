var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 32.086616, lng: 118.731447, alt: 97704, heading: 244, pitch: -22 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  // 修改地形夸张
  map.scene.terrainExaggeration = 10
}

function changeTerrain(val) {
  map.scene.globe.terrainExaggeration = val
}
