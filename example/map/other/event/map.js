import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance
  // on绑定事件
  map.on(mars3d.EventType.cameraChanged, this.map_cameraChangedHandler, this)
  map.on(mars3d.EventType.click, this.map_clickHandler, this)
  map.on(mars3d.EventType.dblClick, this.map_dblClickHandler, this)

  // off移除事件
  // map.off(mars3d.EventType.cameraChanged, this.map_cameraChangedHandler, this)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

let clickTimeId // 双击会触发两次单击事件的解决
export function map_clickHandler(event) {
  clearTimeout(clickTimeId)
  clickTimeId = setTimeout(function () {
    console.log("鼠标单击", event)
  }, 250)
}

export function map_dblClickHandler(event) {
  clearTimeout(clickTimeId)
  console.log("鼠标双击地图", event)
}

export function map_cameraChangedHandler(event) {
  console.log("相机位置完成", event)
}
