var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.838348, lng: 117.206494, alt: 752, heading: 359, pitch: -54 }
    },
    layers: [
      {
        type: "3dtiles",
        name: "合肥国家大学科技园",
        url: "//data.mars3d.cn/3dtiles/qx-hfdxy/tileset.json",
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 1024,
        position: { alt: 50 },
        show: true
      },
      {
        id: 87,
        type: "arcgis_wfs",
        name: "兴趣点",
        url: "//server.mars3d.cn/arcgis/rest/services/mars/hefei/MapServer/1",
        where: " NAME like '%大学%' ",
        minimumLevel: 15,
        symbol: {
          type: "billboardP",
          styleOptions: {
            image: "img/marker/mark3.png",
            scale: 0.7,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            label: {
              text: "{NAME}",
              font_size: 15,
              color: "#ffffff",
              outline: true,
              outlineColor: "#000000",
              pixelOffsetY: -30
            }
          }
        },
        popup: "名称：{NAME}<br />地址：{address}",
        show: true
      }
    ]
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 绑定回调处理
  var layerPoint = map.getLayer("兴趣点", "name")
  layerPoint.on(mars3d.EventType.addGraphic, function (event) {
    // 添加entity的回调，方便自定义控制。
    updateAutoSurfaceHeight(event.graphic)
  })
}

// 点的自动贴地处理
function updateAutoSurfaceHeight(graphic) {
  if (!graphic.position) {
    return
  }

  // 点贴模型测试
  var position = graphic.position
  position = mars3d.PointUtil.getSurfaceHeight(map.scene, position, {
    asyn: true, // 是否异步求准确高度
    has3dtiles: true, // 是否先求贴模型上（无模型时改为false，提高效率）
    callback: function (newHeight, cartOld) {
      console.log("原始高度为：" + cartOld.height.toFixed(2) + ",贴地高度：" + newHeight.toFixed(2))

      var positionNew = Cesium.Cartesian3.fromRadians(cartOld.longitude, cartOld.latitude, newHeight)
      graphic.position = positionNew
    }
  })
}
