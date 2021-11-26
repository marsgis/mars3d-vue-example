
      var map
      var graphicLayer

      function initMap(options) {
        // 合并属性参数，可覆盖config.json中的对应配置
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            // 此处参数会覆盖config.json中的对应配置
            center: { lat: 40, lng: 111.833884, alt: 20000000, heading: 0, pitch: -90 },
            cameraController: {
              zoomFactor: 3.0,
              minimumZoomDistance: 1,
              maximumZoomDistance: 300000000,
              constrainedAxis: false // 解除在南北极区域鼠标操作限制
            }
          }
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)

        // 创建矢量数据图层
        graphicLayer = new mars3d.layer.GraphicLayer()
        map.addLayer(graphicLayer)

        showLoading()

        var czml = Cesium.CzmlDataSource.load("//data.mars3d.cn/file/czml/satellite-one.czml")
        czml
          .then(function (dataSource) {
            hideLoading()

            map.dataSources.add(dataSource)

            const satelliteEntity = dataSource.entities.values[0]

            var swathWidth = swathWidthDict[satelliteEntity.id]
            satelliteFoot.start(satelliteEntity, swathWidth)
          })
          .otherwise(function (error) {
            globalAlert(error, "加载数据出错")
          })
      }

      // 多个卫星时可以可配置【卫星地面投射圆半径，足迹宽度】
      var swathWidthDict = {
        "Satellite/CBERS 4": 650000.0
      }

      // 地球观测的轨道预测,包含绘制卫星到地球的足迹功能。
      var satelliteFoot = {
        start: function (entity, instrumentFOV) {
          if (!instrumentFOV) {
            // 默认值；
            instrumentFOV = 2000 * 1000
          }

          var secondMultiplier = instrumentFOV / 250000.0 // 每间隔多少公里进行显示一次足迹。
          var intervalBetweenFootPrints = 40 * secondMultiplier // setInterval间隔脚印的时长
          var numberOfFootPrintsAtAtime = parseInt(90 / Math.ceil(secondMultiplier)) * 5 // 保持足迹的数量个数

          var point = mars3d.LatLngPoint.fromCartesian(entity.position, map.clock.currentTime)
          this.drawOneFoot(point, instrumentFOV)

          var timeLast = map.clock.currentTime.secondsOfDay + intervalBetweenFootPrints

          map.on(mars3d.EventType.clockTick, (event) => {
            var sxTimes = Math.abs(map.clock.currentTime.secondsOfDay - timeLast) // 剩下时长

            if (sxTimes < 1 || sxTimes > intervalBetweenFootPrints) {
              console.log(sxTimes)

              timeLast = map.clock.currentTime.secondsOfDay + intervalBetweenFootPrints

              if (graphicLayer.length >= numberOfFootPrintsAtAtime) {
                graphicLayer.clear()
              }

              var point = mars3d.LatLngPoint.fromCartesian(entity.position, map.clock.currentTime)
              this.drawOneFoot(point, instrumentFOV)
            }
          })
        },

        // 绘制一个足迹
        drawOneFoot: function (point, instrumentFOV) {
          // 卫星到地面的垂直线
          this._drawLineGroundToSatellite(point)

          // 投射圆锥体
          this._drawInstrumentFootPrintSwathWidth(instrumentFOV, point)

          // 在地球表面上绘制可见足迹椭圆
          this._drawVisibleFootPrint(point)
        },

        // 卫星到地面的垂直线,point: 卫星在天空中的位置
        _drawLineGroundToSatellite: function (point) {
          var groundPoint = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 0.0)

          var point1 = new mars3d.graphic.PointPrimitive({
            position: point,
            style: {
              pixelSize: 2,
              color: Cesium.Color.RED
            }
          })
          graphicLayer.addGraphic(point1)

          var point2 = new mars3d.graphic.PointPrimitive({
            position: groundPoint,
            style: {
              pixelSize: 2,
              color: Cesium.Color.RED
            }
          })
          graphicLayer.addGraphic(point2)

          var primitiveLine = new mars3d.graphic.PolylinePrimitive({
            positions: [point, groundPoint],
            style: {
              width: 1,
              color: Cesium.Color.YELLOW
            }
          })
          graphicLayer.addGraphic(primitiveLine)
        },
        // 投射圆锥体
        _drawInstrumentFootPrintSwathWidth: function (instrumentFOV, point) {
          var primitive = new mars3d.graphic.CylinderPrimitive({
            name: "视锥体",
            position: Cesium.Cartesian3.fromDegrees(point.lng, point.lat, point.alt / 2),
            style: {
              length: point.alt,
              topRadius: 0.0,
              bottomRadius: instrumentFOV,
              color: Cesium.Color.GREEN.withAlpha(0.3),
              outline: true,
              outlineColor: Cesium.Color.RED.withAlpha(0.5)
            }
          })
          graphicLayer.addGraphic(primitive)
        },
        // 在地球表面上绘制可见足迹椭圆（红色外圈线）
        _drawVisibleFootPrint: function (point) {
          var groundPoint = Cesium.Cartesian3.fromDegrees(point.lng, point.lat, 0.0)

          var radiusOfEarth = Cesium.Cartesian3.distance(new Cesium.Cartesian3(0, 0, 0), groundPoint)
          var satToOrignEarth = radiusOfEarth + point.alt // point to origin of earth
          var groundPointToSatPointToTangentAngle = Cesium.Math.toDegrees(Math.asin(radiusOfEarth / satToOrignEarth))
          var groundPointToOriginToTangentAngle = 90.0 - groundPointToSatPointToTangentAngle
          var distanceAlongGround = Cesium.Math.TWO_PI * radiusOfEarth * (groundPointToOriginToTangentAngle / 360.0)

          var primitive = new mars3d.graphic.CirclePrimitive({
            name: "可视卫星范围（45度）",
            position: groundPoint,
            style: {
              radius: distanceAlongGround,
              color: "#ff0000",
              opacity: 0.1,
              outline: true,
              outlineColor: "#ff0000"
            }
          })
          graphicLayer.addGraphic(primitive)
        }
      }
