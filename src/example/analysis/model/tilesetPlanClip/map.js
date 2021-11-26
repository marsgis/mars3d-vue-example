var map
var tilesetPlanClip
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 模型
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    name: "教学楼",
    url: "//data.mars3d.cn/3dtiles/bim-daxue/tileset.json",
    position: { lng: 117.251229, lat: 31.844015, alt: 31.2 },
    maximumScreenSpaceError: 16,
    maximumMemoryUsage: 1024,
    // highlight: { type: "click", color: "#00FFFF" },
    // popup: "all",
    flyTo: true
  })
  map.addLayer(tilesetLayer)

  tilesetPlanClip = new mars3d.thing.TilesetPlanClip({
    layer: tilesetLayer,
    clipOutSide: false,
    edgeColor: Cesium.Color.GREY,
    edgeWidth: 2.0
  })
  map.addThing(tilesetPlanClip)

  // //加载完成事件
  // tilesetLayer.on(mars3d.EventType.load, function (event) {
  //   var tileset = event.tileset
  //   //可以按模型实际大小动态赋值
  //   // var radius = tileset.boundingSphere.radius / 3
  //   // $('#rangeDistance').attr('min', -radius)
  //   // $('#rangeDistance').attr('max', radius)
  // })
}
// 绘制线
function drawLine() {
  tilesetPlanClip.clear()

  map.graphicLayer.startDraw({
    type: "polyline",
    maxPointNum: 2,
    style: {
      color: "#007be6",
      opacity: 0.8,
      outline: false
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      tilesetPlanClip.positions = positions
    }
  })
}

// 绘制矩形
function drawExtent() {
  tilesetPlanClip.clear()

  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8,
      outline: false
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.getOutlinePositions(false)
      map.graphicLayer.clear()

      tilesetPlanClip.positions = positions
    }
  })
}

// 绘制面
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

      tilesetPlanClip.positions = positions
    }
  })
}
// 绘制面(外切)
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

// 切顶部
function clipping1() {
  tilesetPlanClip.type = mars3d.thing.TilesetPlanClip.Type.ZR
}
// 切底部
function clipping2() {
  tilesetPlanClip.type = mars3d.thing.TilesetPlanClip.Type.Z
}

// 切东部
function clipping3() {
  tilesetPlanClip.type = mars3d.thing.TilesetPlanClip.Type.XR
}
// 切西部
function clipping4() {
  tilesetPlanClip.type = mars3d.thing.TilesetPlanClip.Type.X
}
// 切南部
function clipping5() {
  tilesetPlanClip.type = mars3d.thing.TilesetPlanClip.Type.Y
}
// 切北部
function clipping6() {
  tilesetPlanClip.type = mars3d.thing.TilesetPlanClip.Type.YR
}

// 距离
function rangeDistance(value) {
  tilesetPlanClip.distance = value
}
// 偏移量
function rangeNormalZ(value) {
  tilesetPlanClip.normalZ = value
}

function clear() {
  tilesetPlanClip.clear()
}
