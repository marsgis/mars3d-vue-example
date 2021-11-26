var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 33.591733, lng: 119.032381, alt: 32, heading: 331, pitch: -21 },
      globe: {
        depthTestAgainstTerrain: true
      }
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

  // 倒影效果
  var invertedEffect = new mars3d.effect.InvertedEffect()
  map.addEffect(invertedEffect)

  globalNotify("已知问题提示", "(1) 目前为实验示例，镜面效果一般  (2) 模型越平整效果越好 ")
}
