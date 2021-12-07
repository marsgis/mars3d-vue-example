import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 27.765308, lng: 116.057297, alt: 267, heading: 5, pitch: -48 }
  }
}

export const eventTarget = new mars3d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 添加书签
export function butAddTxtName(index, name) {
  // 动态的获取index
  const item = {
    id: index,
    name: name,
    image: "",
    center: map.getCameraView()
  }

  map.expImage({
    download: false,
    width: 300,
    callback: function (image) {
      item.image = image
      eventTarget.fire("addImgObject", item)
    }
  })
}

// 飞向视角
export function flytoView(center) {
  map.centerAt(center)
}

// 保存历史记录
export function setLocalStorage(imgObject) {
  localStorage.setItem("bookmark", JSON.stringify(imgObject))
}

// 读取历史记录
export function getLocalStorage() {
  try {
    const data = JSON.parse(localStorage.getItem("bookmark"))
    if (data && data.length > 0) {
      console.log("历史数据", data)
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        eventTarget.fire("localStorage", item)
      }
    }
  } catch (err) {}
}
