var map
var modelPlanClip
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.841619, lng: 117.140395, alt: 1259, heading: 90, pitch: -51 },
      fxaa: true
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true

  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加模型
  var graphic = new mars3d.graphic.ModelPrimitive({
    position: [117.150365, 31.841954, 50.26],
    style: {
      url: "//data.mars3d.cn/gltf/mars/dikuai/d1.gltf",
      scale: 1
    }
  })
  graphicLayer.addGraphic(graphic)

  modelPlanClip = new mars3d.thing.ModelPlanClip({
    graphic: graphic,
    height: 1, // 开挖的深度
    clipOutSide: false,
    edgeColor: Cesium.Color.GREY,
    edgeWidth: 2.0
  })
  map.addThing(modelPlanClip)
}

function rangeDistance(value) {
  modelPlanClip.distance = value
}

function rangeNormalZ(value) {
  modelPlanClip.normalZ = value
}

function clipping1() {
  modelPlanClip.type = mars3d.thing.ModelPlanClip.Type.ZR
}

function clipping2() {
  modelPlanClip.type = mars3d.thing.ModelPlanClip.Type.Z
}

function clipping3() {
  modelPlanClip.type = mars3d.thing.ModelPlanClip.Type.XR
}
function clipping4() {
  modelPlanClip.type = mars3d.thing.ModelPlanClip.Type.X
}

function clipping5() {
  modelPlanClip.type = mars3d.thing.ModelPlanClip.Type.Y
}

function clipping6() {
  modelPlanClip.type = mars3d.thing.ModelPlanClip.Type.YR
}

// 绘制线
function drawLine() {
  modelPlanClip.clear()

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

      modelPlanClip.positions = positions
    }
  })
}
// 绘制矩形
function drawExtent() {
  modelPlanClip.clear()
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

      modelPlanClip.positions = positions
    }
  })
}

// 绘制面
function drawPoly() {
  modelPlanClip.clear()

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

      modelPlanClip.positions = positions
    }
  })
}
// 绘制面(外切)
function drawPoly2() {
  modelPlanClip.clear()
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

      modelPlanClip.clipOutSide = true
      modelPlanClip.positions = positions
    }
  })
}

function clear() {
  modelPlanClip.clear()
}
