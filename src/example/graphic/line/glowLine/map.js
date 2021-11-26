
      var map

      function initMap(options) {
        // 合并属性参数，可覆盖config.json中的对应配置
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            center: { lat: 29.516846, lng: 106.610174, alt: 13449, heading: 310, pitch: -64 }
          },
          baseLayerPicker: false
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)

        map.basemap = 2017 // 蓝色底图

        // 调节场景环境
        map.scene.globe.globeAlpha = 0.001
        map.scene.undergroundMode = true
        map.scene.sun.show = false
        map.scene.moon.show = false
        map.scene.skyBox.show = false
        map.scene.skyAtmosphere.show = false

        // geojson图层
        var geoJsonLayer1 = new mars3d.layer.GeoJsonLayer({
          url: "//data.mars3d.cn/file/geojson/wuhan-line1.json",
          symbol: {
            // type: 'polyline',
            styleOptions: {
              materialType: "PolylineGlow",
              glowPower: 0.06, // 发光强度
              width: 50, // 线宽
              color: "#FF4500",
              opacity: 0.9,
              clampToGround: true
            }
          },
          show: true
        })
        map.addLayer(geoJsonLayer1)

        var geoJsonLayer2 = new mars3d.layer.GeoJsonLayer({
          url: "//data.mars3d.cn/file/geojson/wuhan-line2.json",
          symbol: {
            styleOptions: {
              materialType: "PolylineGlow",
              glowPower: 0.1, // 发光强度
              width: 10, // 线宽
              color: "#FF4500",
              opacity: 0.9,
              clampToGround: true
            }
          },
          show: true
        })
        map.addLayer(geoJsonLayer2)

        var geoJsonLayer3 = new mars3d.layer.GeoJsonLayer({
          url: "//data.mars3d.cn/file/geojson/wuhan-line3.json",
          symbol: {
            styleOptions: {
              materialType: "PolylineGlow",
              glowPower: 0.1, // 发光强度
              width: 10, // 线宽
              color: "#FF4500",
              opacity: 0.9,
              clampToGround: true
            }
          },
          show: true
        })
        map.addLayer(geoJsonLayer3)
      }
