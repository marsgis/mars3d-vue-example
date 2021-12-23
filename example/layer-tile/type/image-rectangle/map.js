import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.839403, lng: 117.257352, alt: 2540, heading: 0, pitch: -90 }
  },
  layers: [
    // 方式1：在创建地球前的参数中配置
    {
      name: "中科大-东区",
      type: "image",
      url: "//data.mars3d.cn/file/img/zkd-dq.png",
      rectangle: { xmin: 117.259691, xmax: 117.267778, ymin: 31.834432, ymax: 31.84387 },
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

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  const tileLayer = new mars3d.layer.ImageLayer({
    name: "中科大-西区",
    url: "//data.mars3d.cn/file/img/zkd-xq.png",
    rectangle: { xmin: 117.245648, xmax: 117.254431, ymin: 31.836891, ymax: 31.843413 }
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
