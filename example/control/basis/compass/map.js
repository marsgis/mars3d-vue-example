import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

/**
 *方便演示，移除默认配置的control
 *
 * @param {object} option 默认配置的参数
 * @return {object} option
 */
export const mapOptions = function (option) {
  option.control = {
    compass: { top: "10px", left: "5px" } // 当前示例展现的控件 - 导航球
  }
  return option
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 方式2：在创建地球后按需调用addControl添加(直接new对应type类型的控件)
  // let compass = new mars3d.control.Compass({ top: "10px", right: "5px" })
  // map.addControl(compass)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
