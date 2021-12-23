import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 28.059099, lng: 120.440855, alt: 5467418, heading: 343, pitch: -75 }
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
  Cesium.Resource.fetchJson("//data.mars3d.cn/file/apidemo/flights.json").then(function (data) {
    const airports = data.airports.map(function (item) {
      return {
        name: item[0],
        country: item[2],
        point: Cesium.Cartesian3.fromDegrees(item[3], item[4])
      }
    })

    const routesGroupByAirline = {}
    data.routes.forEach(function (route) {
      const airline = data.airlines[route[0]]
      const airlineName = airline[0]
      if (!routesGroupByAirline[airlineName]) {
        routesGroupByAirline[airlineName] = []
      }
      routesGroupByAirline[airlineName].push(route)
    })

    const routes = routesGroupByAirline["Air China"]

    const routePaths = []
    routes.forEach(function (route, index) {
      const start = airports[route[1]]
      const end = airports[route[2]]

      routePaths.push({
        startName: start.name,
        startPoint: start.point,
        endName: end.name,
        endPoint: end.point
      })
    })

    initPath(routePaths)
  })
}

function initPath(routePaths) {
  // 创建Graphic图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic?.attr
    if (!attr) {
      return false
    }
    return mars3d.Util.getTemplateHtml({ title: "航线", template: "{startName} - {endName}", attr: attr })
  })

  const arrData = []
  routePaths.forEach(function (item, index) {
    const positions = mars3d.PolyUtil.getLinkedPointList(item.startPoint, item.endPoint, 5000, 30)

    arrData.push({
      positions: positions,
      style: {
        width: 2.0,
        material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.ODLine, {
          color: new Cesium.Color(0.8 * Math.random() + 0.2, 0.5 * Math.random() + 0.5, 0.1, 1.0),
          bgColor: new Cesium.Color(0.8, 0.8, 0.2, 0.2),
          startTime: 10.0 * Math.random(),
          speed: 2 + 1.0 * Math.random(),
          bidirectional: 2
        })
      },
      attr: item
    })
  })

  // 多个线对象的合并渲染。
  const primitive = new mars3d.graphic.PolylineCombine({
    instances: arrData
  })
  graphicLayer.addGraphic(primitive)
}

// 按单个线渲染，效率差些
/* function initPath(routePaths) {
  // 创建Graphic图层
  let graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  routePaths.forEach(function (item, index) {
    const positions = mars3d.PolyUtil.getLinkedPointList(item.startPoint, item.endPoint, 5000, 30)

    let graphic = new mars3d.graphic.PolylinePrimitive({
      positions: positions,
      style: {
        width: 2.0,
        material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.ODLine, {
          color: new Cesium.Color(0.8 * Math.random() + 0.2, 0.5 * Math.random() + 0.5, 0.1, 1.0),
          bgColor: new Cesium.Color(0.8, 0.8, 0.2, 0.2),
          startTime: 10.0 * Math.random(),
          speed: 2 + 1.0 * Math.random(),
          bidirectional: 2
        })
      }
    })
    graphicLayer.addGraphic(graphic)
  })
} */
