import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let shadows

export const mapOptions = {
  scene: {
    center: { lat: 33.596051, lng: 119.031383, alt: 359, heading: 180, pitch: -43 },
    fxaa: true,
    globe: {
      baseColor: "#000"
    }
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

  // let imageryLayer = map.scene.imageryLayers.get(0)
  // imageryLayer.dayAlpha = 0.1  //白天图层透明值
  // imageryLayer.nightAlpha = 1.0 //夜晚图层透明值

  // 加个模型
  const tilesetLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
    position: { alt: 80.6 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    shadows: Cesium.ShadowMode.ENABLED
  })
  map.addLayer(tilesetLayer)

  eventTarget.fire("shadows")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function stopPlay() {
  if (shadows && shadows.isStart) {
    shadows.pause()
    shadows = null
  }
}

export function startPlay(timeVal, currTime) {
  const currentTime = setShadows(timeVal, currTime)

  shadows.on(mars3d.EventType.change, function () {
    const shadowTime = shadows.time
    eventTarget.fire("loadOk", { shadowTime })
  })

  const startDate = new Date(currTime + " 00:00:00")
  const endDate = new Date(currTime + " 23:59:59")

  if (currentTime >= endDate) {
    globalMsg("开始时间必须小于结束时间！")
    return
  }
  shadows.start(startDate, endDate, currentTime)
}

export function setShadows(value, date) {
  const hours = Number.parseInt(value / 60)
  const minutes = Number.parseInt(value % 60)
  const strDateTime = `${date} ${hours}:${minutes}:00`
  const dateTime = new Date(strDateTime)

  shadows = new mars3d.thing.Shadows({
    multiplier: 1600,
    time: dateTime
  })
  map.addThing(shadows)

  return dateTime
}
