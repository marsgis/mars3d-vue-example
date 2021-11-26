var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  startAnimation()
}

function startAnimation() {
  map.flyHome({ duration: 0 })

  // 开场动画
  map.openFlyAnimation({
    // duration1:4,
    // easingFunction1: Cesium.EasingFunction.QUINTIC_IN_OUT,
    callback: function () {
      // 动画播放完成后回调
    }
  })
}

function stopAnimation() {
  map.camera.cancelFlight()
}
