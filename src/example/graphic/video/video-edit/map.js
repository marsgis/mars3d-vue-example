import * as mars3d from "mars3d"
const Cesium = mars3d.Cesium

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 28.440846, lng: 119.481734, alt: 332.6, heading: 222, pitch: -85.8 }
  }
}

let videoPolygon


/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer({
    hasEdit: true
  })
  map.addLayer(graphicLayer)

  videoPolygon = new mars3d.graphic.VideoPrimitive({
    positions: [
      [119.481684, 28.439947, 128.5],
      [119.481006, 28.440518, 133.4],
      [119.481752, 28.441208, 128.8],
      [119.482471, 28.440632, 129.9]
    ],
    style: {
      url: "//data.mars3d.cn/file/video/lukou.mp4",
      opacity: 0.8
    }
  })
  graphicLayer.addGraphic(videoPolygon)

  // const positions = mars3d.LngLatArray.toCartesians([
  //   [119.481684, 28.439947, 128.5],
  //   [119.481006, 28.440518, 133.4],
  //   [119.481752, 28.441208, 128.8],
  //   [119.482471, 28.440632, 129.9]
  // ])

  // const uvROI = [
  //   [0, 1],
  //   [1, 1],
  //   [1, 0],
  //   [0, 0]
  // ]

  // // eslint-disable-next-line no-undef
  // videoPolygon = new VideoPolygon(map, {
  //   url: "//data.mars3d.cn/file/video/lukou.mp4",
  //   positions: positions
  // })

  // updateROI(uvROI)
}

export function updateROI(uvROI) {
  videoPolygon.rois = uvROI
}

export function clearROI() {
  videoPolygon.rois = undefined
}

export const choosePoint = (isChoosePoint) => {
  videoPolygon.useGridEditing(isChoosePoint || false)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
