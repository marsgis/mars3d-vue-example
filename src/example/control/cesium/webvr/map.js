var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 28.439577, lng: 119.476925, alt: 229, heading: 57, pitch: -29 }
    },
    control: {
      vrButton: true
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 加个模型，效果更NB
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "县城社区",
    url: "//data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 11.5 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    dynamicScreenSpaceError: true,
    cullWithChildrenBounds: false,
    skipLevelOfDetail: true,
    preferLeaves: true,
    center: { lat: 28.439577, lng: 119.476925, alt: 229, heading: 57, pitch: -29 }
  })
  map.addLayer(tiles3dLayer)

  // 这句话打开VR
  map.scene.useWebVR = true

  // WebVR相关参数: 眼镜的视角距离（单位：米）
  map.scene.eyeSeparation = 100.0

  // WebVR相关参数: 焦距
  map.scene.eyeSeparation.focalLength = 5.0
}
