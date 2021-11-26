
      var map

      function initMap(options) {
        const color = "#363635"
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            center: { lat: 25.845231, lng: 117.57678, alt: 488175, heading: 358, pitch: -42 },
            showSun: false,
            showMoon: false,
            showSkyBox: false,
            showSkyAtmosphere: false,
            fog: false,
            backgroundColor: color, // 天空背景色
            globe: {
              baseColor: color, // 地球地面背景色
              showGroundAtmosphere: false,
              enableLighting: false
            }
          },
          control: {
            baseLayerPicker: false
          },
          basemaps: [],
          layers: []
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)

        // 添加矢量图层
        var graphicLayer = new mars3d.layer.GraphicLayer()
        map.addLayer(graphicLayer)

        // 添加对象
        addAnhui(graphicLayer)
        addCenterCity(graphicLayer)
        addOutCircle(graphicLayer)
      }

      // 添加安徽省底图和墙
      function addAnhui(graphicLayer) {
        // 安徽省卫星底图
        var tileLayer = new mars3d.layer.XyzLayer({
          url: "//data.mars3d.cn/tile/anhui/{z}/{x}/{y}.png",
          minimumLevel: 0,
          maximumLevel: 12,
          rectangle: { xmin: 114.811691, xmax: 119.703609, ymin: 29.35597, ymax: 34.698585 }
        })
        map.addLayer(tileLayer)

        // 安徽省边界线墙
        var anhuiWall = new mars3d.layer.GeoJsonLayer({
          name: "安徽省边界墙",
          url: "//data.mars3d.cn/file/geojson/areas/340000.json",
          symbol: {
            type: "wallP",
            styleOptions: {
              setHeight: -15000,
              diffHeight: 15000, // 墙高
              materialType: mars3d.MaterialType.Image2,
              image: "./img/textures/grawall.png",
              color: "rgba(0,255,255,0.6)"
            }
          }
        })
        map.addLayer(anhuiWall)

        // 安徽各市边界线和名称
        var shiLayer = new mars3d.layer.GeoJsonLayer({
          name: "安徽各市边界线",
          url: "//data.mars3d.cn/file/geojson/areas/340000_full.json",
          symbol: {
            type: "polyline",
            styleOptions: {
              color: "rgba(255,255,255,0.3)",
              width: 2,
              label: {
                text: "{name}",
                position: "center",
                font_size: 18,
                color: "black",
                font_family: "楷体",
                outline: true,
                outlineColor: "#f1f3f4",
                outlineWidth: 3,
                // 视距的设置
                scaleByDistance: true,
                scaleByDistance_far: 20000000,
                scaleByDistance_farValue: 0.1,
                scaleByDistance_near: 1000,
                scaleByDistance_nearValue: 1
              }
            },
            styleField: "name",
            styleFieldOptions: {
              合肥市: { color: "rgba(0,255,255,0.3)" }
            }
          },
          popup: "{name}"
        })
        map.addLayer(shiLayer)
      }

      // 添加示范城市的相关对象
      function addCenterCity(graphicLayer) {
        const point = [117.234218, 31.814155, 0]

        // divgraphic标注
        var divgraphic = new mars3d.graphic.DivGraphic({
          position: point,
          style: {
            html: `<div class="marsBlackPanel">
                <div class="marsBlackPanel-text">示范城市</div>
            </div>`,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // 横向定位
            verticalOrigin: Cesium.VerticalOrigin.CENTER // 垂直定位
          }
        })
        graphicLayer.addGraphic(divgraphic)

        // 圆形动态扩散图
        var cicle = new mars3d.graphic.CirclePrimitive({
          position: point,
          style: {
            radius: 16000,
            material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.CircleWave, {
              color: "rgba(0,255,255,0.6)",
              count: 2,
              speed: 10
            })
          }
        })
        graphicLayer.addGraphic(cicle)
      }

      // 添加周边的圆圈刻度尺等对象
      function addOutCircle(graphicLayer) {
        var arrImg = [
          {
            // 刻度
            image: "./img/icon/calib.png",
            positions: [
              [113.564329, 35.654741],
              [120.802219, 28.844016]
            ]
          },
          {
            // 刻度尺
            image: "./img/icon/calib-value.png",
            positions: [
              [114.162597, 29.256489],
              [120.216593, 35.055444]
            ]
          },
          {
            // 方向
            image: "./img/icon/calib-dir.png",
            positions: [
              [114.162597, 29.256489],
              [120.216593, 35.055444]
            ]
          }
        ]

        for (let i = 0; i < arrImg.length; i++) {
          var item = arrImg[i]
          var primitive = new mars3d.graphic.RectanglePrimitive({
            positions: item.positions,
            style: {
              materialType: mars3d.MaterialType.Image2,
              image: item.image,
              opacity: 0.4
            }
          })
          graphicLayer.addGraphic(primitive)
        }

        // 自转的半椭圆
        // var rotation = Cesium.Math.toRadians(50);
        // function getRotationValue() {
        //   rotation += 0.005;
        //   return rotation;
        // }
        // var primitive1 = new mars3d.graphic.RectangleEntity({
        //   positions: [
        //     [114.642444, 34.789658],
        //     [119.814361, 29.425181],
        //   ],
        //   style: {
        //     materialType: mars3d.MaterialType.Image2,
        //     image: "./img/icon/calib-semicircle.png",
        //     opacity: 0.2,
        //     clampToGround: true,
        //     rotation: new Cesium.CallbackProperty(getRotationValue, false),
        //     stRotation: new Cesium.CallbackProperty(getRotationValue, false),
        //   },
        // });
        // graphicLayer.addGraphic(primitive1);
      }
