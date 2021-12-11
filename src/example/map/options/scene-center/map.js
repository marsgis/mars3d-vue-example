import * as mars3d from "mars3d"

let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 25.389914, lng: 119.084961, alt: 1179575, heading: 346, pitch: -60 }
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

  // 2也可以通过下面方法获取center参数
  const center = map.getCameraView()
  console.log("center参数为", JSON.stringify(center))

  // 可以通过centerAt切换视角
  map.setCameraView(center)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */

export function onUnmounted() {
  map = null
}

export function changeView1() {
  map.setCameraView({ lat: 39.904128, lng: 116.391643, alt: 1054, heading: 356, pitch: -39 })
}

export function changeView2() {
  map.setCameraView({ lat: 28.13059, lng: 86.835138, alt: 7627, heading: 148, pitch: -7 })
}

export function changeView3() {
  map.setCameraView({ lat: 34.560392, lng: 110.052393, alt: 1724, heading: 171, pitch: -5 })
}

export function changeView4() {
  map.setCameraView({ lat: 30.83463, lng: 115.86774, alt: 710, heading: 303, pitch: -7 })
}
