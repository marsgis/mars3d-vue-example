var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 23.816631, lng: 111.688366, alt: 4605984, heading: 355, pitch: -80 }
    },
    terrain: {
      show: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 天地图 三维地名服务图层
  var tdtDmLayer = new mars3d.layer.TdtDmLayer({
    key: mars3d.Token.tianditu
  })
  map.addLayer(tdtDmLayer)
}
