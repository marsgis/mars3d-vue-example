import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 39.660996, lng: 116.929644, alt: 84368, heading: 310, pitch: -59 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.basemap = "黑色底图"
  addGraphics()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addGraphics() {
  // 创建Graphic图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  Cesium.Resource.fetchJson("//data.mars3d.cn/file/apidemo/bjgj.json").then(function (data) {
    const timeDuration = 10.0
    const moveBaseDuration = 4.0

    const hStep = 300 / (data.length - 1)

    // let busLines = [].concat.apply([], data.map(function (busLine, idx) {
    const busLines = []
    data.forEach(function (busLine, idx) {
      let prevPt
      const points = []
      for (let i = 0; i < busLine.length; i += 2) {
        let pt = [busLine[i], busLine[i + 1]]
        if (i > 0) {
          pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]]
        }
        prevPt = pt

        const longitude = pt[0] / 1e4
        const latitude = pt[1] / 1e4
        const cart = Cesium.Cartesian3.fromDegrees(longitude, latitude, 100.0)
        points.push(cart)
      }

      busLines.push({
        positions: points
      })
    })

    busLines.forEach(function (busLine) {
      const primitive = new mars3d.graphic.PolylinePrimitive({
        positions: busLine.positions,
        style: {
          width: 2.0,
          material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.ODLine, {
            color: new Cesium.Color(Math.random() * 0.5 + 0.5, Math.random() * 0.8 + 0.2, 0.0, 1.0),
            speed: 2 + 1.0 * Math.random(),
            startTime: Math.random()
          })
        }
      })
      graphicLayer.addGraphic(primitive)
    })
  })
}
