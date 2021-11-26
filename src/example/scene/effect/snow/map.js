var map
var snowEffect
var snowCover
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 33.591015, lng: 119.032697, alt: 73, heading: 343, pitch: -21 },
      globe: {
        depthTestAgainstTerrain: true
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 雾化效果
  map.scene.fog.density = 0.001
  map.scene.fog.minimumBrightness = 0.8

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

  snowEffect = new mars3d.effect.SnowEffect({
    speed: 20
  })
  map.addEffect(snowEffect)

  snowCover = new mars3d.effect.SnowCoverEffect({
    maxHeight: 8000, // 大于此高度后不显示
    alpha: 0.6
  })
  map.addEffect(snowCover)
}

// 是否开启下雪效果
function chkSnow(val) {
  snowEffect.enabled = val
}
// 速度
function snowSpeed(value) {
  snowEffect.speed = value
}
// 是否开启积雪效果
function chkSnowCover(val) {
  snowCover.enabled = val
}

// 积雪厚度
function sonwAlpha(value) {
  snowCover.alpha = value
}
