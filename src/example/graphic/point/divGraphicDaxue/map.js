
      var map

      function initMap(options) {
        // 合并属性参数，可覆盖config.json中的对应配置
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            center: { lat: 31.314417, lng: 118.82149, alt: 78939, heading: 358, pitch: -46 }
          }
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)

        map.basemap = 2017

        // 显示边界
        const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
          name: "南京市",
          url: "//data.mars3d.cn/file/geojson/areas/320100_full.json",
          symbol: {
            type: "wall",
            styleOptions: {
              diffHeight: 800, // 墙高
              materialType: mars3d.MaterialType.LineFlow,
              speed: 10, // 速度
              image: "img/textures/fence.png", // 图片
              repeatX: 1, // 重复数量
              axisY: true, // 竖直方向
              color: "#00ffff", // 颜色
              opacity: 0.6, // 透明度
              outline: false,
              label: {
                text: "{name}",
                font_size: 18,
                color: "#ffffff",
                distanceDisplayCondition: true,
                distanceDisplayCondition_far: 500000,
                distanceDisplayCondition_near: 0,

                position: "center",
                setHeight: 900
              }
            }
          },
          popup: "{name}"
        })
        map.addLayer(geoJsonLayer)

        // 显示高校点
        mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/gaoxiao.json" })
        .then(function (res) {
          addFeature(res)
        })
        .otherwise(function (error) {
          console.log("加载JSON出错", error)
        })
      }

      function addFeature(arr) {
        var pointColorArr = ["#f33349", "#f79a2c", "#f2fa19", "#95e40c", "#1ffee6"]

        // 创建DIV数据图层
        var graphicLayer = new mars3d.layer.DivLayer()
        map.addLayer(graphicLayer)

        // 在layer上绑定监听事件
        graphicLayer.on(mars3d.EventType.click, function (event) {
          console.log("监听layer，单击了矢量对象", event)

          const item = event.garaphic.attr
          globalMsg("单击了：" + item["高校名称"])
        })

        graphicLayer.bindPopup(function (event) {
          const item = event.graphic?.attr
          if (!item) {
            return false
          }
          var html =
            "高校名称：" +
            item["高校名称"] +
            "<br />所属地区：" +
            item["地区"] +
            "<br />主管部门：" +
            item["主管部门"] +
            "<br />办学层次：" +
            item["办学层次"] +
            "<br />王牌专业：" +
            item["王牌专业"]
          return html
        })

        for (var i = 0, len = arr.length; i < len; i++) {
          var item = arr[i]
          var postions = item["经纬度"].split(",") // 取到经纬度坐标
          if (postions.length !== 2) {
            continue
          }

          var lng = Number(postions[0])
          var lat = Number(postions[1])
          var pointColor = pointColorArr[i % pointColorArr.length]

          var graphic = new mars3d.graphic.DivGraphic({
            position: Cesium.Cartesian3.fromDegrees(lng, lat),
            style: {
              html: '<div class="mars3d-animation-point" style="color:' + pointColor + ';"><p></p></div>',
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000) // 按视距距离显示
            },
            attr: item
          })
          graphicLayer.addGraphic(graphic)
        }
      }
