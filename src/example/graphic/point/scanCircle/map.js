
      var map

      function initMap(options) {
        // 合并属性参数，可覆盖config.json中的对应配置
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            center: { lat: 31.170953, lng: 121.485939, alt: 7473, heading: 10, pitch: -40 }
          }
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)
        map.basemap = 2017 // 蓝色底图

        var tiles3dLayer = new mars3d.layer.TilesetLayer({
          name: "上海市建筑物",
          url: "//data.mars3d.cn/3dtiles/jzw-shanghai/tileset.json",
          maximumScreenSpaceError: 8,
          maximumMemoryUsage: 1024,
          marsJzwStyle: true,
          style: {
            color: {
              conditions: [["true", "rgb(3, 104, 255)"]]
            }
          },
          popup: "all"
        })
        map.addLayer(tiles3dLayer)

        // 创建Graphic图层
        var graphicLayer = new mars3d.layer.GraphicLayer()
        map.addLayer(graphicLayer)

        // 加一些演示数据
        addGraphic_a1(graphicLayer)
        addGraphic_a2(graphicLayer)
        addGraphic_a3(graphicLayer)
        addGraphic_a4(graphicLayer)
        addGraphic_a5(graphicLayer)
      }

      function addGraphic_a1(graphicLayer) {
        // 立体围墙扩散效果,面状
        var diffuseWallGlow = new mars3d.graphic.DiffuseWall({
          positions: [
            [121.475616, 31.255374, 5.87],
            [121.482578, 31.248681, 10.85],
            [121.479447, 31.240235, 14.25],
            [121.470002, 31.240496, 12.92],
            [121.46538, 31.249206, 9.53],
            [121.475616, 31.255374, 5.87]
          ],
          style: {
            color: "#ffff00",
            diffHeight: 2000, // 高度
            speed: 10 // 速度
          }
        })
        graphicLayer.addGraphic(diffuseWallGlow)
      }

      function addGraphic_a2(graphicLayer) {
        // 立体围墙扩散效果,圆状
        var circleDiffuseWallGlow = new mars3d.graphic.DiffuseWall({
          position: new mars3d.LatLngPoint(121.481165, 31.278668, 44.3), // 圆中心点
          style: {
            diffHeight: 2000, // 高度
            radius: 600, // 半径
            color: "#ff0000",
            speed: 10 // 速度
          }
        })
        graphicLayer.addGraphic(circleDiffuseWallGlow)
      }

      function addGraphic_a3(graphicLayer) {
        var primitive = new mars3d.graphic.CirclePrimitive({
          position: [121.522454, 31.267553, 61.9],
          style: {
            radius: 2000,
            material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.ScanLine, {
              color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
              speed: 10
            }),
            clampToGround: true // 是否贴地
          }
        })
        graphicLayer.addGraphic(primitive)
      }

      function addGraphic_a4(graphicLayer) {
        var _rotation = Math.random()

        var graphic = new mars3d.graphic.CircleEntity({
          position: Cesium.Cartesian3.fromDegrees(121.504242, 31.23805, 27.88),
          style: {
            radius: 1500.0,
            // 扫描材质
            material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.CircleScan, {
              image: "img/textures/circleScan.png",
              color: "#00ff00"
            }),
            stRotation: new Cesium.CallbackProperty(function (e) {
              _rotation -= 0.1
              return _rotation
            }, false),
            classificationType: Cesium.ClassificationType.BOTH,
            clampToGround: true // 是否贴地
          }
        })
        graphicLayer.addGraphic(graphic)
      }

      function addGraphic_a5(graphicLayer) {
        var _rotation = Math.random()
        var graphic = new mars3d.graphic.CircleEntity({
          position: new mars3d.LatLngPoint(121.526215, 31.245237, 123.5),
          style: {
            radius: 700.0,
            material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.CircleScan, {
              // 扫描材质
              image: "img/textures/circle_bg.png",
              color: "#5fc4ee"
            }),
            stRotation: new Cesium.CallbackProperty(function (e) {
              _rotation += 0.1
              return _rotation
            }, false),
            classificationType: Cesium.ClassificationType.BOTH,
            clampToGround: true // 是否贴地
          }
        })
        graphicLayer.addGraphic(graphic)
      }
