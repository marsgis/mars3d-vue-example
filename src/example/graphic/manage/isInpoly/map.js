
      var map
      var graphicLayer

      function initMap(options) {
        // 合并属性参数，可覆盖config.json中的对应配置
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            center: { lat: 31.772337, lng: 117.213784, alt: 12450, heading: 360, pitch: -66 }
          }
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)


        // 创建矢量数据图层
        graphicLayer = new mars3d.layer.GraphicLayer()
        map.addLayer(graphicLayer)


        var extent = map.getExtent()
        mars3d.Resource.fetchJson({
          url: "//server.mars3d.cn/server/pointRandom/",
          queryParameters: {
            xmin: extent.xmin,
            ymin: extent.ymin,
            xmax: extent.xmax,
            ymax: extent.ymax,
            count: 100
          }
        })
        .then(function (data) {
            addData(data)
        })
        .otherwise(function (error) { console.log("加载JSON出错", error) })
      }

      var selectGraphic = []
      function addData(arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
          var item = arr[i]

          var graphic = new mars3d.graphic.BillboardEntity({
            position: Cesium.Cartesian3.fromDegrees(item.x, item.y, 0),
            style: {
              image: "img/marker/mark3.png",
              scale: 1,
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
            },
            attr: item
          })
          graphicLayer.addGraphic(graphic)

          graphic.bindTooltip(item.name)
        }
      }

      // 在范围内的改变图标为红色
      function updateSelect(drawGraphic) {
        graphicLayer.eachGraphic((graphic) => {
          var position = graphic.positionShow

          var isInArea = drawGraphic.isInPoly(position)
          if (isInArea) {
            graphic.entityGraphic.image = "img/marker/mark1.png"
            selectGraphic.push(graphic)
          }
        })
      }

      function removeAll() {
        map.graphicLayer.clear()

        for (var i = 0; i < selectGraphic.length; i++) {
          selectGraphic[i].entityGraphic.image = "img/marker/mark3.png"
        }
        selectGraphic = []
      }

      function drawPolygon() {
        removeAll()
        map.graphicLayer.startDraw({
          type: "polygon",
          style: {
            color: "#ffff00",
            opacity: 0.2,
            clampToGround: true
          },
          success: function (graphic) {
            updateSelect(graphic)
          }
        })
      }

      function drawCircle() {
        removeAll()
        map.graphicLayer.startDraw({
          type: "circle",
          style: {
            color: "#ffff00",
            opacity: 0.2,
            clampToGround: true
          },
          success: function (graphic) {
            updateSelect(graphic)
          }
        })
      }

      function drawRectangle() {
        removeAll()
        map.graphicLayer.startDraw({
          type: "rectangle",
          style: {
            color: "#ffff00",
            opacity: 0.2,
            clampToGround: true
          },
          success: function (graphic) {
            updateSelect(graphic)
          }
        })
      }
