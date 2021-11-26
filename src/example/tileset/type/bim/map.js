var map
var terrainPlanClip
var tilesetPlanClip
var underground
var terrainClip
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.8503, lng: 117.101008, alt: 308, heading: 291, pitch: -30 },
      baseColor: "rgba(0,0,0.0,0.5)",
      globe: {
        depthTestAgainstTerrain: true
      },
      highDynamicRange: true
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 加个模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    id: 1987,
    name: "桥梁",
    url: "//data.mars3d.cn/3dtiles/bim-qiaoliang/tileset.json",
    maximumScreenSpaceError: 16,
    maximumMemoryUsage: 2048,
    dynamicScreenSpaceError: true,
    cullWithChildrenBounds: false,
    luminanceAtZenith: 0.6,

    position: { lng: 117.096906, lat: 31.851564, alt: 45 },
    rotation: { z: 17.5 },
    // 高亮时的样式
    highlight: {
      // all: true, //全部整体高亮，false时是构件高亮
      type: mars3d.EventType.click, // 默认为鼠标移入高亮，也可以指定click单击高亮
      color: "#00FF00"
    },
    popup: "all"
  })
  map.addLayer(tiles3dLayer)

  // 单击事件
  tiles3dLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了3dtiles图层", event)
  })

  // 模型裁剪
  tilesetPlanClip = new mars3d.thing.TilesetPlanClip({
    positions: [
      [117.096786, 31.851355, 0],
      [117.096834, 31.851464, 0],
      [117.09691, 31.851375, 0]
    ],
    layer: tiles3dLayer,
    clipOutSide: false,
    edgeColor: Cesium.Color.GREY,
    edgeWidth: 2.0
  })
  map.addThing(tilesetPlanClip)

  terrainPlanClip = new mars3d.thing.TerrainPlanClip({
    positions: [
      [117.096176, 31.851189, 42.56],
      [117.097776, 31.851189, 42.56],
      [117.097776, 31.853494, 42.56],
      [117.096176, 31.853494, 42.56]
    ]
  })
  map.addThing(terrainPlanClip)
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

//= =========================================
// 是否开挖
function chkClippingPlanes(val) {
  terrainClip.enabled = val
  terrainPlanClip.enabled = val
}

function terrainClips(heightVal) {
  // 挖地区域
  terrainClip = new mars3d.thing.TerrainClip({
    positions: [
      [117.096176, 31.851189, 42.56],
      [117.097776, 31.851189, 42.56],
      [117.097776, 31.853494, 42.56],
      [117.096176, 31.853494, 42.56]
    ],
    diffHeight: heightVal, // 高度
    image: "./img/textures/excavate_side_min.jpg",
    imageBottom: "./img/textures/excavate_bottom_min.jpg",
    splitNum: 80 // 井边界插值数
  })
  map.addThing(terrainClip)
}

function heightChange(num) {
  terrainClip.height = num
}

// 绘制矩形
function drawExtent() {
  terrainClip.clear() // 清除挖地区域
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
      terrainClip.positions = positions
      terrainPlanClip.positions = positions
    }
  })
}

// 绘制多边形
function drawPolygon() {
  terrainClip.clear() // 清除挖地区域
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
      terrainClip.positions = positions
      terrainPlanClip.positions = positions
    }
  })
}

function clearWJ() {
  terrainClip.clear() // 清除挖地区域
  terrainPlanClip.clear()
}

//= ========================================
function distanceChange(value) {
  tilesetPlanClip.distance = value
}

// 切顶
function clipTop() {
  tilesetPlanClip.type = mars3d.thing.TilesetPlanClip.Type.ZR
}
// 起点
function clipBottom() {
  tilesetPlanClip.type = mars3d.thing.TilesetPlanClip.Type.Z
}
// 切线
function clipLine() {
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

// 内切
function clipPoly() {
  tilesetPlanClip.clear()

  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

      tilesetPlanClip.positions = positions
    }
  })
}

// 外切

function clipPoly2() {
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
function clearClip() {
  tilesetPlanClip.clear()
}
