import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 14.741847, lng: 108.420914, alt: 10003793, heading: 0, pitch: -83 }
  },
  // 离线12.5米地形的配置
  terrain: {
    url: "//192.168.0.115/terrain15",
    show: true,
    clip: true
  },
  // 离线0-16级谷歌地图的配置
  basemaps: [
    {
      pid: 10,
      name: "影像地图",
      icon: "//data.mars3d.cn/img/thumbnail/basemap/google_img.png",
      type: "xyz",
      url: "//192.168.0.115/tile16/img/{z}/{x}/{y}.jpg",
      chinaCRS: mars3d.ChinaCRS.GCJ02,
      minimumLevel: 0,
      maximumLevel: 16,
      show: true
    },
    {
      pid: 10,
      name: "电子地图",
      icon: "//data.mars3d.cn/img/thumbnail/basemap/google_vec.png",
      type: "xyz",
      url: "//192.168.0.115/tile16/vec/{z}/{x}/{y}.png",
      chinaCRS: mars3d.ChinaCRS.GCJ02,
      minimumLevel: 0,
      maximumLevel: 16
    }
  ],
  layers: []
}
/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
