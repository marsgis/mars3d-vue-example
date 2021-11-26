function initMap() {

  // 与超图结合示例：      https://github.com/marsgis/mars3d-link-supermap
  // 与earthsdk结合示例：  https://github.com/marsgis/mars3d-link-earthsdk

  // 构造地球（可以使用原生Cesium或第3方SDK方式去构造Viewer）
  var viewer = new Cesium.Viewer("mars3dContainer", {
    animation: false,
    timeline: false,
    baseLayerPicker: false, // 是否显示图层选择控件
    imageryProvider: new Cesium.TileMapServiceImageryProvider({
      url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
    })
  })

  // mars3d.Map也可以直接传入外部已经构造好的viewer, 支持config.json所有参数
  var map = new mars3d.Map(viewer, {
    scene: {
      center: { lat: 30.054604, lng: 108.885436, alt: 17036414, heading: 0, pitch: -90 },
      fxaa: true
    },
    control: {
      defaultContextMenu: true // 右键菜单
    }
  })

  // cesium对应的原始地球对象
  // var viewer = map.viewer
}
