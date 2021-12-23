
import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let tileLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.601462, lng: 117.246888, alt: 56825, heading: 359, pitch: -69 }
  },
  control: {
    baseLayerPicker: false
  },
  basemaps: [],
  layers: [
    {
      name: "单张图片",
      icon: "img/basemaps/bingmap.png",
      type: "image",
      url: "//data.mars3d.cn/file/img/world/world.jpg",
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
  // The viewModel tracks the state of our mini application.
  const viewModel = {
    brightness: 1, // 亮度
    contrast: 1, // 对比度
    hue: 0.1, // 色彩
    saturation: 1, // 饱和度
    gamma: 0.2, // 伽马值
    opacity: 1 // 透明度
  }

  // 添加图层
  tileLayer = new mars3d.layer.GaodeLayer({
    layer: "vec",
    ...viewModel
  })
  map.addLayer(tileLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// // Convert the viewModel members into knockout observables.
// Cesium.knockout.track(viewModel)
// let toolbar = document.getElementById("toolbar")
// Cesium.knockout.applyBindings(viewModel, toolbar)

// // Make the active imagery layer a subscriber of the viewModel.
// function subscribeLayerParameter(name) {
//   Cesium.knockout.getObservable(viewModel, name).subscribe(function (newValue) {
//     tileLayer[name] = newValue
//   })
// }
// subscribeLayerParameter("brightness")
// subscribeLayerParameter("contrast")
// subscribeLayerParameter("hue")
// subscribeLayerParameter("saturation")
// subscribeLayerParameter("gamma")
// subscribeLayerParameter("opacity")

/**
 * 参数发生变化
 *
 * @export changeOpacity
 * @param {string} attribute 改变的类型
 * @param {number} val 改变的值
 * @returns {void}
 */
export function changeOpacity(attribute, val) {
  tileLayer[attribute] = val
}
