function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.783013, lng: 117.221851, alt: 2307, heading: 1, pitch: -29 }
    },
    terrain: false
  })

  // 创建三维地球场景
  var map = new mars3d.Map("mars3dContainer", mapOptions)

  // 高德POI图层，演示大数据的分块加载
  var layer = new mars3d.layer.GeodePoiLayer({
    minimumLevel: 13,
    debuggerTileInfo: false, // 是否显示网格信息（测试用）
    key: mars3d.Token.gaodeArr, // 请在实际项目中将下面高德KEY换为自己申请的，因为该key不保证长期有效。
    filter: {
      types: "120000|130000|190000"
    },
    height: 5,
    symbol: {
      styleOptions: {
        image: "img/marker/mark3.png",
        scale: 0.7,
        scaleByDistance: true,
        scaleByDistance_far: 20000,
        scaleByDistance_farValue: 0.5,
        scaleByDistance_near: 1000,
        scaleByDistance_nearValue: 1,
        label: {
          text: "{name}",
          font_size: 15,
          color: "#ffffff",
          outline: true,
          outlineColor: "#000000",
          pixelOffsetY: -30,
          distanceDisplayCondition: true,
          distanceDisplayCondition_far: 4000,
          distanceDisplayCondition_near: 0
        }
      }
    }
    // 当是entity类型时，点的聚合配置
    // clustering: {
    //   enabled: true,
    //   pixelRange: 20,
    // },
  })
  map.addLayer(layer)
}
