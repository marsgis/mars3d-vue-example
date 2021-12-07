import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

/**
 *方便演示，移除默认配置的control
 *
 * @param {object} option 默认配置的参数
 * @return {object} option
 */
//  方式1：在创建地球前的传参中配置control参数
export const mapOptions = {
  control: {
    mouseDownView: false // 当前示例展现的控件-鼠标按下的特效
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

  // 方式2：在创建地球后按需调用addControl添加(直接new对应type类型的控件)
  const mouseDownView = new mars3d.control.MouseDownView()
  map.addControl(mouseDownView)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
