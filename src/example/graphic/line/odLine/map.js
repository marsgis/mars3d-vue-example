
      var map

      function initMap(options) {
        // 合并属性参数，可覆盖config.json中的对应配置
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            center: { lat: 39.660996, lng: 116.929644, alt: 84368, heading: 310, pitch: -59 }
          }
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)

        map.basemap = "黑色底图"

        // 创建Graphic图层
        var graphicLayer = new mars3d.layer.GraphicLayer()
        map.addLayer(graphicLayer)

        Cesium.Resource.fetchJson("//data.mars3d.cn/file/apidemo/bjgj.json").then(function (data) {
          var timeDuration = 10.0
          var moveBaseDuration = 4.0

          var hStep = 300 / (data.length - 1)

          // var busLines = [].concat.apply([], data.map(function (busLine, idx) {
          var busLines = []
          data.map(function (busLine, idx) {
            var prevPt
            var points = []
            for (var i = 0; i < busLine.length; i += 2) {
              var pt = [busLine[i], busLine[i + 1]]
              if (i > 0) {
                pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]]
              }
              prevPt = pt

              var longitude = pt[0] / 1e4
              var latitude = pt[1] / 1e4
              var cart = Cesium.Cartesian3.fromDegrees(longitude, latitude, 100.0)
              points.push(cart)
            }

            busLines.push({
              positions: points
            })
          })

          busLines.forEach(function (busLine) {
            var primitive = new mars3d.graphic.PolylinePrimitive({
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
