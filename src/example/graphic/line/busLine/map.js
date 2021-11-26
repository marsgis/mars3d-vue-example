
      var map

      function initMap(options) {
        // 合并属性参数，可覆盖config.json中的对应配置
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            center: { lat: 39.800803, lng: 116.34344, alt: 6521, heading: 360, pitch: -45 }
          }
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)
        map.basemap = "黑色底图"

        // 创建Graphic图层
        var graphicLayer = new mars3d.layer.GraphicLayer()
        map.addLayer(graphicLayer)

        // 颜色
        var colors = ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"].reverse()

        mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/bj-bus.json" })
        .then(function (res) {
          const arr = mars3d.Util.geoJsonToGraphics(res) // 解析geojson
          arr.forEach((item, index) => {
            var i = index % colors.length

            const color = colors[i]
            const height = i * 80 + 50

            var primitive = new mars3d.graphic.PolylinePrimitive({
              positions: item.positions,
              style: {
                width: 3,
                color: color,
                opacity: 0.8,
                setHeight: height
              },
              attr: item.attr
            })
            graphicLayer.addGraphic(primitive)
          })
          })
        .otherwise(function (error) {
          console.log("获取单个卡车详情失败", error)
})
      }

