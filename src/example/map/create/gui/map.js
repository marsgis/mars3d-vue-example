import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.823874, lng: 117.223976, alt: 3509, heading: 0, pitch: -90 }
  },
  control: {
    baseLayerPicker: false
  }
}

export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
 export function onUnmounted() {
  map = null
}
