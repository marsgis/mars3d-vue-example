
var map
var terrainPlanClip

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.840043, lng: 117.21586, alt: 554, heading: 360, pitch: -59 },
      globe: {
        depthTestAgainstTerrain: true
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 管网数据：3dtiles
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    name: "地下管网",
    url: "//data.mars3d.cn/3dtiles/max-piping/tileset.json",
    position: { lng: 117.215457, lat: 31.843363, alt: -3.6 },
    rotation: { z: 336.7 },
    maximumScreenSpaceError: 2,
    maximumMemoryUsage: 1024,
    highlight: { type: "click", color: "#00FFFF" },
    popup: "all",
    center: { lat: 31.840525, lng: 117.217024, alt: 495.12, heading: 0, pitch: -59.3, roll: 0 }
  })
  map.addLayer(tilesetLayer)


  terrainPlanClip = new mars3d.thing.TerrainPlanClip({
    positions: [
      [117.214491, 31.841736, 42.83],
      [117.21764, 31.841736, 42.83],
      [117.21764, 31.843807, 42.83],
      [117.214491, 31.843807, 42.83]
    ],
    // diffHeight: 30, // 井的深度
    image: "img/textures/excavate_side_min.jpg", // 边界墙材质
    imageBottom: "img/textures/excavate_bottom_min.jpg", // 底部区域材质
    splitNum: 50 // 井边界插值数
  })
  map.addThing(terrainPlanClip)


}

// 是否挖地
function chkClippingPlanes(val) {
  terrainPlanClip.enabled = val
}
// 是否外切割
function chkUnionClippingRegions(val) {
  terrainPlanClip.clipOutSide = val
}
// 是否深度检测
function chkTestTerrain(val) {
  map.scene.globe.depthTestAgainstTerrain = val
}

// 改变切割的深度
function changeClipHeight(val) {
  terrainPlanClip.diffHeight = val
}

// 添加矩形
function btnDrawExtent() {
  terrainPlanClip.clear() // 清除挖地区域

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
// 添加多边形
function btnDraw() {
  terrainPlanClip.clear() // 清除挖地区域

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

      // 挖地区域
      terrainPlanClip.positions = positions
    }
  })
}
// 清除
function removeAll() {
  terrainPlanClip.clear() // 清除挖地区域
}

