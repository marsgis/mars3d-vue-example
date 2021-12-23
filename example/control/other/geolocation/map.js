import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

export const mapOptions = {
  scene: {
    center: { lat: 31.852379, lng: 117.278594, alt: 25115, heading: 2, pitch: -89 }
  },
  control: {
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    infoBox: false,
    vrButton: false,
    geocoder: false,
    fullscreenButton: false
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

  const toolButton = new Geolocation({
    insertIndex: 1 // 插入的位置顺序, 1是home按钮后面
  })
  map.addControl(toolButton)

  // 手动调用，开始定位
  toolButton.startTracking()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
