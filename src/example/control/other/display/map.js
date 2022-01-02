import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

/**
 * 合并属性参数，可覆盖config.json中的对应配置
 * @type {object}
 */
export const mapOptions = {
  control: {
    homeButton: true,
    sceneModePicker: true,
    navigationHelpButton: true,
    infoBox: true,
    vrButton: true,
    fullscreenButton: true,
    geocoder: true,
    baseLayerPicker: true,
    clockAnimate: true, // 时钟动画控制(左下角)
    timeline: true, // 是否显示时间线控件
    compass: { top: "10px", left: "5px" }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // 因为animation面板遮盖，修改底部bottom值
  const toolbar = document.querySelector(".cesium-viewer-toolbar")
  toolbar.style.bottom = "60px"
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 按钮
export function bindPOI(val) {
  map.viewer.geocoder.container.style.display = val ? "block" : "none"
}
// 视角复位
export function bindView(val) {
  map.viewer.homeButton._element.style.display = val ? "block" : "none"
}
// 二三维切换
export function bindSceneModePicker(val) {
  document.getElementsByClassName("cesium-sceneModePicker-wrapper")[0].style.display = val ? "block" : "none"
}
// 基础的地图切换
export function bindBaseLayerPicker(val) {
  map.viewer.baseLayerPicker._element.style.display = val ? "block" : "none"
}
// 全屏切换
export function bindFullScreen(val) {
  map.viewer.fullscreenButton.container.style.display = val ? "block" : "none"
}
// VR
export function bindVR(val) {
  map.viewer.vrButton.container.style.display = val ? "block" : "none"
}
// 帮助按钮
export function bindHelpButton(val) {
  document.getElementsByClassName("cesium-navigationHelpButton-wrapper")[0].style.display = val ? "block" : "none"
}
export function bindZoom(val) {
  map.controls.zoom.show = val
}


// 面板：
// 信息状态栏
export function bindLocation(val) {
  map.controls.locationBar.show = val
}
// 时钟
export function bindClock(val) {
  map.controls.clockAnimate.show = val
}
// 时间刻度线
export function bindTimeLine(val) {
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
// 导航球
export function bindNav(val) {
  map.controls.compass.show = val
}
// 比例尺
export function bindLegend(val) {
  map.controls.distanceLegend.show = val
}
