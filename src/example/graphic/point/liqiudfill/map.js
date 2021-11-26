
      var map
      var graphicLayer

      function initMap(options) {
        // 合并属性参数，可覆盖config.json中的对应配置
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            center: { lng: 117.084439, lat: 31.653047, alt: 354, heading: 319, pitch: -23 }
          }
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)

        // 加载石化工厂模型
        const tiles3dLayer = new mars3d.layer.TilesetLayer({
          name: "石化工厂",
          url: "http://data.mars3d.cn/3dtiles/max-shihua/tileset.json",
          position: { lng: 117.077158, lat: 31.659116, alt: 24.6 },
          maximumScreenSpaceError: 1,
          maximumMemoryUsage: 1024,
          popup: "all"
        })
        map.addLayer(tiles3dLayer)

        // 创建div数据图层
        graphicLayer = new mars3d.layer.DivLayer()
        map.addLayer(graphicLayer)

        // 添加矢量数据
        addGraphic([117.077462, 31.657745, 60], { value: 0.53, color: "#fb980b" })
        addGraphic([117.079091, 31.65898, 90], { value: 0.45, color: "#00ff00" })
        addGraphic([117.079766, 31.658268, 70], { value: 0.35, color: "#00ffff" })
        addGraphic([117.07913, 31.655748, 80], { value: 0.21, color: "#ff0000" })
      }

      function addGraphic(position, attr) {
        var graphic = new mars3d.graphic.DivGraphic({
          position: position,
          style: {
            html: `<div style="width: 80px;height:80px;"></div>`,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
          },
          attr: attr
        })
        graphic.on(mars3d.EventType.add, function (e) {
          const dom = e.target.container.firstChild
          const attr = e.target.attr

          const liquidfillchartChart = echarts.init(dom)

          // 参考API：https://github.com/ecomfe/echarts-liquidfill
          // 参考示例：https://www.makeapie.com/explore.html#tags=liquidFill~sort=rank~timeframe=all~author=all
          const option = {
            series: [
              {
                type: "liquidFill",
                radius: "100%",
                outline: { show: false },
                color: [attr.color],
                data: [attr.value],
                label: {
                  normal: {
                    color: "#294D99",
                    insideColor: "#fff",
                    fontSize: 20
                  }
                }
              }
            ]
          }
          liquidfillchartChart.setOption(option)
        })
        graphicLayer.addGraphic(graphic)
      }
