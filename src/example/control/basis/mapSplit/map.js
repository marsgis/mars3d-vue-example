import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

/**
 * 方便演示，移除默认配置的control
 *
 * @type {object}
 */
export const mapOptions = {
  control: {
    homeButton: false, // 回到默认视域按钮
    navigationHelpButton: false, // 是否显示帮助信息控件
    fullscreenButton: false, // 右下角全屏按钮
    vrButton: false, // vr按钮
    geocoder: false, // 地名查找控件按钮
    sceneModePicker: false, //  二三维视图切换按钮
    timeline: false, // 下侧时间线控件面板
    compass: false, // 导航球
    locationBar: false, // 鼠标提示控件
    distanceLegend: false, // 比例尺控件
    baseLayerPicker: false // 是否显示图层选择控件
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

  map.basemap = null

  const _alllayers = map.getTileLayers()

  const mapSplit = new mars3d.control.MapSplit({
    rightLayer: _alllayers[0],
    leftLayer: _alllayers[1]
  })
  map.addControl(mapSplit)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
