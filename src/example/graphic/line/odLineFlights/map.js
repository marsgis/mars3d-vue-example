
var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 28.059099, lng: 120.440855, alt: 5467418, heading: 343, pitch: -75 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = "黑色底图"

  Cesium.Resource.fetchJson("//data.mars3d.cn/file/apidemo/flights.json").then(function (data) {
    var airports = data.airports.map(function (item) {
      return {
        name: item[0],
        country: item[2],
        point: Cesium.Cartesian3.fromDegrees(item[3], item[4])
      }
    })

    var routesGroupByAirline = {}
    data.routes.forEach(function (route) {
      var airline = data.airlines[route[0]]
      var airlineName = airline[0]
      if (!routesGroupByAirline[airlineName]) {
        routesGroupByAirline[airlineName] = []
      }
      routesGroupByAirline[airlineName].push(route)
    })

    var routes = routesGroupByAirline["Air China"]

    var routePaths = []
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
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic?.attr
    if (!attr) {
      return false
    }
    return mars3d.Util.getTemplateHtml({ title: "航线", template: "{startName} - {endName}", attr: attr })
  })

  var arrData = []
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
  var primitive = new mars3d.graphic.PolylineCombine({
    instances: arrData
  })
  graphicLayer.addGraphic(primitive)
}

// 按单个线渲染，效率差些
// function initPath(routePaths) {
//   //创建Graphic图层
//   var graphicLayer = new mars3d.layer.GraphicLayer();
//   map.addLayer(graphicLayer);

//   routePaths.forEach(function (item, index) {
//     let positions = mars3d.PolyUtil.getLinkedPointList(item.startPoint, item.endPoint, 5000, 30);

//     var graphic = new mars3d.graphic.PolylinePrimitive({
//       positions: positions,
//       style: {
//         width: 2.0,
//         material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.ODLine, {
//           color: new Cesium.Color(0.8 * Math.random() + 0.2, 0.5 * Math.random() + 0.5, 0.1, 1.0),
//           bgColor: new Cesium.Color(0.8, 0.8, 0.2, 0.2),
//           startTime: 10.0 * Math.random(),
//           speed: 2 + 1.0 * Math.random(),
//           bidirectional: 2,
//         }),
//       },
//     });
//     graphicLayer.addGraphic(graphic);
//   });
// }
