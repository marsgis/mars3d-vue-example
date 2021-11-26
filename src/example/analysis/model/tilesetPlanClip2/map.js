var map
var tilesetPlanClip
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 加模型
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    name: "县城社区",
    url: "//data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 11.5 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    skipLevelOfDetail: true,
    preferLeaves: true,
    dynamicScreenSpaceError: true,
    cullWithChildrenBounds: false,
    luminanceAtZenith: 0.6,
    center: { lat: 28.440675, lng: 119.487735, alt: 639, heading: 269, pitch: -38 },
    flyTo: true
  })
  map.addLayer(tilesetLayer)

  // 3d模型裁剪
  tilesetPlanClip = new mars3d.thing.TilesetPlanClip({
    layer: tilesetLayer,
    clipOutSide: false,
    edgeColor: Cesium.Color.GREY,
    edgeWidth: 2.0
  })
  map.addThing(tilesetPlanClip)
}

function drawPoly() {
  tilesetPlanClip.clear()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5,
      clampToGround: true
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      // 加入positions才能使3d裁剪确定位置，生效
      tilesetPlanClip.positions = positions
    }
  })
}

function drawPoly2() {
  tilesetPlanClip.clear()

  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5,
      clampToGround: true
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      tilesetPlanClip.clipOutSide = true
      tilesetPlanClip.positions = positions
    }
  })
}

function drawExtent() {
  tilesetPlanClip.clear()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8,
      outline: false
      // clampToGround: true
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.getOutlinePositions(false)
      map.graphicLayer.clear()

      tilesetPlanClip.positions = positions
    }
  })
}

function drawExtent2() {
  tilesetPlanClip.clear()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8,
      outline: false
      // clampToGround: true
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.getOutlinePositions(false)
      map.graphicLayer.clear()

      tilesetPlanClip.clipOutSide = true
      tilesetPlanClip.positions = positions

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界
    }
  })
}

function clear() {
  tilesetPlanClip.clear()
}
