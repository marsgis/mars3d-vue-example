import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 方式1：按basemaps配置自动生成
export const mapOptions = {
  control: {
    homeButton: false, // 回到默认视域按钮
    navigationHelpButton: false, // 是否显示帮助信息控件
    fullscreenButton: false, // 右下角全屏按钮
    vrButton: false, // vr按钮
    sceneModePicker: false, //  二三维视图切换按钮
    timeline: false, // 下侧时间线控件面板
    compass: false, // 导航球
    locationBar: false, // 鼠标提示控件
    distanceLegend: false, // 比例尺控件
    baseLayerPicker: false, // 是否显示图层选择控件
    geocoder: true,
    geocoderConfig: {
      key: ["f2fedb9b08ae13d22f1692cd472d345e", "2e6ca4aeb6867fb637a5bee8333e5d3a"] // 高德key
    }
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
  viewModelCallback()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function viewModelCallback() {
  // 查询结果回调方法
  map.viewer.geocoder.viewModel.complete.addEventListener(function () {
    const arrdata = map.viewer.geocoder.viewModel.suggestions
  })
}
