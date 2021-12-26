import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

/**
 * 合并属性参数，可覆盖config.json中的对应配置
 * @type {object}
 */
export const mapOptions = {
  control: {
    homeButton: true, // 回到默认视域按钮
    navigationHelpButton: false, // 是否显示帮助信息控件
    fullscreenButton: false, // 右下角全屏按钮
    geocoder: false,
    sceneModePicker: false
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

  const zoom = new mars3d.control.Zoom({
    insertIndex: 1 // 插入的位置顺序
  })
  map.addControl(zoom)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
