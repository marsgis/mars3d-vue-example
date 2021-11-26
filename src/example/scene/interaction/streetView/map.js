var map
var streetView
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)




   streetView = new mars3d.thing.StreetView({
    rotateSpeed: 30, // 右键拖动的移动度数，旋转的方向和速度，正负控制方向。
    windingPointDirection: false, /// 绕点旋转方向 true逆时针，false顺时针
    windingPointTime: 30, // 绕点旋转的一周时长(秒)，控制速度。
    windingPointAngle: 360, // 旋转的角度后自动停止
    heightStep: 0.2, // 升高或降低相机高度比例，当前相机高度的比例
    moveStep: 0.1, // 左键双击定位的移动比例，当前视距的比例
    moveDuration: 3 // 左键双击定位动画时长，不指定时cesium内部自动计算的
  })
  map.addThing(streetView)
}


function shadingMaterials(val) {
  if (val === 1) {
    streetView.enabled = true
  } else {
    streetView.enabled = false
  }
}

// 定位至模型
var modelTest
function centerAtModel() {
  if (!modelTest) {
    modelTest = new mars3d.layer.TilesetLayer({
      url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
      position: { alt: 80.6 },
      maximumScreenSpaceError: 1,
      maximumMemoryUsage: 1024,
      flyTo: true
    })
    map.addLayer(modelTest)
  }
}
