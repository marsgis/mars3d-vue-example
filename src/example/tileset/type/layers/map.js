var map
var eventTarget = new mars3d.BaseClass()
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.623553, lng: 117.322405, alt: 123536, heading: 359, pitch: -81 }
    },
    control: {
      baseLayerPicker: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  queryTilesetData()
}
// 数据获取
function queryTilesetData() {
  mars3d.Resource.fetchJson({ url: "config/tileset.json" })
    .then(function (arr) {
      var modelData = arr.layers
      eventTarget.fire("loadOk", { modelData })
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}
