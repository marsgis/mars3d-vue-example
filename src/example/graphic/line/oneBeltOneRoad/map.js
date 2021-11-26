
var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 26.163233, lng: 77.849567, alt: 17754541, heading: 360, pitch: -90 },
      sceneMode: 2
    },
    terrain: false,
    layers: []
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  map.basemap = 2017 // 蓝色底图

  // 加载数据
  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/oneBeltOneRoad.json" })
  .then(function (res) {
    showRoad(res.data.land, {
      name: "丝绸之路经济带",
      color: Cesium.Color.CORAL
    })

    showRoad(res.data.sea, {
      name: "21世纪海上丝绸之路",
      color: Cesium.Color.DEEPSKYBLUE
    })
    })
  .otherwise(function () {
    globalMsg("实时查询信息失败，请稍候再试")
  })

}

function showRoad(arr, options) {
  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  const arrPosition = []
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i]

    const position = Cesium.Cartesian3.fromDegrees(item.x, item.y)
    item.position = position

    arrPosition.push(position)

    // 创建点
    if (item.icon) {
      var billboardPrimitive = new mars3d.graphic.BillboardPrimitive({
        name: item.name,
        position: position,
        style: {
          image: "img/country/" + item.icon,
          scale: 0.7,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          label: {
            text: item.name,
            font_size: 17,
            font_family: "楷体",
            color: Cesium.Color.WHITE,
            outline: true,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -30)
          }
        }
      })
      graphicLayer.addGraphic(billboardPrimitive)

      const html = `<div class="mars-load-location">
        ${item.continent} - ${item.country} - <i style="color: #00ffff;">${item.name}</i>
      </div>`
      billboardPrimitive.bindPopup(html)
    }
  }

  var positions = mars3d.PolyUtil.getBezierCurve(arrPosition)
  positions.push(arrPosition[arrPosition.length - 1])

  var primitive = new mars3d.graphic.PolylinePrimitive({
    positions: positions,
    style: {
      width: 4,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "img/textures/LinkPulse.png",
        color: options.color,
        repeat: new Cesium.Cartesian2(10.0, 1.0),
        speed: 2
      })
    }
  })
  graphicLayer.addGraphic(primitive)

  primitive.bindTooltip(options.name)
}
