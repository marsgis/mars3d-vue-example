var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    control: {
      homeButton: true,
      sceneModePicker: true,
      navigationHelpButton: true,
      infoBox: true,
      vrButton: true,
      fullscreenButton: true,
      geocoder: true,
      baseLayerPicker: true,
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: true, // 是否显示时间线控件
      compass: { top: "10px", left: "5px" }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

// 因为animation面板遮盖，修改底部bottom值
  const toolbar = document.getElementsByClassName("cesium-viewer-toolbar")[0]
  toolbar.style.bottom = "110px"
}

// 按钮：
function bindPOI(val) {
  map.viewer.geocoder.container.style.display = val ? "block" : "none"
}
// 视角复位
function bindView(val) {
  map.viewer.homeButton._element.style.display = val ? "block" : "none"
}
// 二三维切换
function bindSceneModePicker(val) {
  document.getElementsByClassName("cesium-sceneModePicker-wrapper")[0].style.display = val ? "block" : "none"
}
// 基础的地图切换
function bindBaseLayerPicker(val) {
  map.viewer.baseLayerPicker._element.style.display = val ? "block" : "none"
}
// 全屏切换
function bindFullScreen(val) {
  map.viewer.fullscreenButton.container.style.display = val ? "block" : "none"
}
// VR
function bindVR(val) {
  map.viewer.vrButton.container.style.display = val ? "block" : "none"
}
// 帮助按钮
function bindHelpButton(val) {
  document.getElementsByClassName("cesium-navigationHelpButton-wrapper")[0].style.display = val ? "block" : "none"
}

// 面板：
// 信息状态栏
function bindLocation(val) {
  map.controls.locationBar.show = val
}
// 时钟
function bindClock(val) {
  map.viewer.animation.container.style.display = val ? "block" : "none"

  if (val) {
    map.controls.locationBar.setStyle({
      left: "170px"
    })
  } else {
    map.controls.locationBar.setStyle({
      left: "0px"
    })
  }
}
// 时间刻度线
function bindTimeLine(val) {
  map.viewer.timeline.container.style.display = val ? "block" : "none"

  if (val) {
    map.controls.locationBar.setStyle({
      bottom: "25px"
    })
  } else {
    map.controls.locationBar.setStyle({
      bottom: "0px"
    })
  }
}
// 导航求
function bindNav(val) {
  map.controls.compass.show = val
}
// 比例尺
function bindLegend(val) {
  map.controls.distanceLegend.show = val
}
