var map
var depthOfField

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 33.591015, lng: 119.032698, alt: 73, heading: 343, pitch: -21 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 添加参考三维模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
    position: { alt: 80.6 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    dynamicScreenSpaceError: true,
    cullWithChildrenBounds: false
  })
  map.addLayer(tiles3dLayer)

  // 构造效果
  depthOfField = new mars3d.effect.DepthOfFieldEffect()
  map.addEffect(depthOfField)
}

// 是否开启特效
function bindShowEffect(val) {
  depthOfField.enabled = val
}
// 修改对应参数
function txt_focalDistance(val) {
  if (val) {
    depthOfField.focalDistance = val
  }
}
function txt_delta(val) {
  if (val) {
    depthOfField.delta = val
  }
}
function txt_sigma(val) {
  if (val) {
    depthOfField.sigma = val
  }
}
function txt_stepSize(val) {
  if (val) {
    depthOfField.stepSize = val
  }
}
