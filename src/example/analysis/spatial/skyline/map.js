var map
var skyline
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 28.441881, lng: 119.482881, alt: 133, heading: 240, pitch: -2 },
      globe: {
        depthTestAgainstTerrain: true
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)



  // 加个模型，观看效果更佳
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    type: "3dtiles",
    name: "县城社区",
    url: "//data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 11.5 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    show: true
  })
  map.addLayer(tiles3dLayer)

  skyline = new mars3d.thing.Skyline()
  map.addThing(skyline)


}

function changeColor() {
  skyline.color = Cesium.Color.fromRandom()
}

function lineWidth(val) {
  skyline.width = val

}
function isVChecked(value) {
  skyline.enabled = value
}
