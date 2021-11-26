var map
var underground
var terrainPlanClip
var eventTarget = new mars3d.BaseClass()
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.839437, lng: 117.216104, alt: 554, heading: 359, pitch: -55 },
      baseColor: "rgba(0,0,0.0,0.5)",
      globe: {
        depthTestAgainstTerrain: true
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 加个模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "地下管网",
    url: "//data.mars3d.cn/3dtiles/max-piping/tileset.json",
    position: { lng: 117.215457, lat: 31.843363, alt: -3.6 },
    rotation: { z: 336.7 },
    maximumScreenSpaceError: 2,
    maximumMemoryUsage: 1024,
    highlight: { type: "click", outlineEffect: true, width: 8, color: "#FFFF00" },
    popup: "all",
    center: { lat: 31.838081, lng: 117.216584, alt: 406, heading: 1, pitch: -34 }
  })
  map.addLayer(tiles3dLayer)
  eventTarget.fire("loadOk")
}

function centerAtDX1() {
  map.setCameraView({
    lat: 31.840106,
    lng: 117.216768,
    alt: 554.36,
    heading: 0,
    pitch: -59.3,
    roll: 0
  })
}

function centerAtDX2() {
  map.setCameraView({
    lat: 31.841263,
    lng: 117.21538,
    alt: -13.35,
    heading: 40.6,
    pitch: 15.7,
    roll: 0.1
  })
}
// 是否开启地下模式
function chkUnderground(val, alphaVal) {
  // 地下模式
  underground = new mars3d.thing.Underground({
    alpha: alphaVal,
    enabled: val
  })
  map.addThing(underground)

  underground.enabled = val
}

// 透明度发生改变
function alphaChange(value) {
  if (underground) {
    underground.alpha = value
  }
}
// 是否开挖
function chkClippingPlanes(val) {
  terrainPlanClip.enabled = val
}

function terrainClips(heightVal) {
  // 挖地区域
  terrainPlanClip = new mars3d.thing.TerrainClip({
    positions: [
      [117.214769, 31.842048, 42.63],
      [117.217764, 31.842048, 42.63],
      [117.217764, 31.843312, 42.63],
      [117.214769, 31.843312, 42.63]
    ],
    diffHeight: heightVal, // 高度
    image: "./img/textures/excavate_side_min.jpg",
    imageBottom: "./img/textures/excavate_bottom_min.jpg",
    splitNum: 50 // 井边界插值数
  })
  map.addThing(terrainPlanClip)
}

function heightChange(num) {
  terrainPlanClip.height = num
}

// 绘制矩形
function drawExtent() {
  terrainPlanClip.clear()

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

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

      // 挖地区域
      terrainPlanClip.positions = positions
    }
  })
}

// 绘制多边形
function drawPolygon() {
  terrainPlanClip.clear()

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

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

      // 挖地区域
      terrainPlanClip.positions = positions
    }
  })
}

function clearWJ() {
  terrainPlanClip.clear() // 清除挖地区域
}

function distanceChange(value) {
  terrainPlanClip.distance = value
}
