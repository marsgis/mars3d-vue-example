import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.894577, lng: 105.02468, alt: 8402267, heading: 75, pitch: -86 },
    highDynamicRange: false
  },
  control: {
    baseLayerPicker: true, // basemaps底图切换按钮
    homeButton: true, // 视角复位按钮
    sceneModePicker: true, // 二三维切换按钮
    defaultContextMenu: true // 右键菜单
  },
  terrain: {
    url: "//data.mars3d.cn/terrain",
    show: true
  },
  // 方式1：在创建地球前的参数中配置
  basemaps: [
    {
      name: "单张图片",
      icon: "img/basemaps/bingmap.png",
      type: "image",
      url: "//data.mars3d.cn/file/img/world/world.jpg"
    },
    {
      name: "夜晚图片",
      icon: "img/basemaps/blackMarble.png",
      type: "image",
      url: "//data.mars3d.cn/file/img/world/night.jpg"
    },
    {
      name: "蓝色底图",
      icon: "img/basemaps/bd-c-midnight.png",
      type: "image",
      url: "//data.mars3d.cn/file/img/world/blue.jpg",
      show: true
    }
  ]
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
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

// 叠加的图层
let tileLayer
export function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.ImageLayer({
    url: "//data.mars3d.cn//file/img/radar/201906211112.PNG",
    rectangle: { xmin: 73.16895, xmax: 134.86816, ymin: 12.2023, ymax: 54.11485 },
    alpha: 0.7
  })
  map.addLayer(tileLayer)
}
// 移除图层
export function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
