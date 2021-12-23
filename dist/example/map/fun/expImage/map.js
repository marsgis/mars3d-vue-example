import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 33.588378, lng: 119.031749, alt: 172, heading: 3, pitch: -23 }
  }
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 三维模型
  const tilesetLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
    position: { alt: 80.6 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tilesetLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 查看场景出图
export function showMapImg() {
  map.expImage({
    download: false,
    callback: function (base64, size) {
      // 回调
      eventTarget.fire("loadOk", { base64 })
    }
  })
}

// 下载场景出图
export function downLoad() {
  map.expImage()
}

// 下载场景缩略图
export function downLoad2() {
  map.expImage({
    height: 300, // 指定 高度 或 宽度(指定1种就行，对应的自动缩放)
    download: true
  })
}
