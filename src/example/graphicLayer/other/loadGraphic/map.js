var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.563158, lng: 116.329235, alt: 16165, heading: 0, pitch: -45 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  var lodGraphicLayer = new mars3d.layer.LodGraphicLayer({
    IdField: "id", // 数据的唯一主键 字段名称
    minimumLevel: 11, // 限定层级，只加载该层级下的数据。[与效率相关的重要参数]
    debuggerTileInfo: true,
    // 根据LOD分块信息去请求对应的Tile瓦块内的数据
    queryGridData: (grid, callback) => {
      const extent = grid.extent
      mars3d.Resource.fetchJson({
        url: "//server.mars3d.cn/server/pointRandom/",
        queryParameters: {
          xmin: extent.xmin,
          ymin: extent.ymin,
          xmax: extent.xmax,
          ymax: extent.ymax,
          count: 5
        }
      })
        .then(function (data) {
          callback(grid, data) // 执行回调，回传数据
        })
        .otherwise(function (error) {
          console.log("加载JSON出错", error)
        })
    },
    // 根据 attr属性 创建 矢量对象[必须返回Graphic对象]
    createGraphic(grid, attr) {
      const height = mars3d.PointUtil.getSurfaceHeight(map.scene, Cesium.Cartesian3.fromDegrees(attr.x, attr.y))

      var graphic = new mars3d.graphic.ModelPrimitive({
        position: [attr.x, attr.y, height],
        style: {
          url: "//data.mars3d.cn/gltf/mars/leida.glb",
          scale: 1,
          minimumPixelSize: 40
        }
      })
      lodGraphicLayer.addGraphic(graphic)

      return graphic
    }
  })
  map.addLayer(lodGraphicLayer)

  lodGraphicLayer.on(mars3d.EventType.click, (event) => {
    console.log("你单击了对象", event)
  })
}
