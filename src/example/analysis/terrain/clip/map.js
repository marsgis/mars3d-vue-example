
var map
var terrainClip
var eventTabel = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.827414, lng: 116.378229, alt: 16933, heading: 360, pitch: -56 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  terrainClip = new mars3d.thing.TerrainClip({
    // diffHeight: 20, // 井的深度
    image: "img/textures/excavate_side_min.jpg",
    imageBottom: "img/textures/excavate_bottom_min.jpg",
    splitNum: 80 // 井边界插值数
  })
  map.addThing(terrainClip)

  const areaItem = terrainClip.addArea(
    [
      [116.334222, 30.899171, 645.46],
      [116.370874, 30.899171, 645.46],
      [116.370874, 30.944509, 645.46],
      [116.334222, 30.944509, 645.46]
    ],
    { diffHeight: 900 }
  )
  addTableItem(areaItem)

  const areaItem2 = terrainClip.addArea(
    [
      [116.416497, 30.934256, 775.89],
      [116.427392, 30.962941, 1084.88],
      [116.434838, 30.932608, 900.43],
      [116.462994, 30.923081, 771.42],
      [116.437571, 30.916044, 906.39],
      [116.44977, 30.894487, 776.06],
      [116.424183, 30.908752, 727.02],
      [116.402218, 30.898406, 593.08],
      [116.414309, 30.918806, 588.78],
      [116.387022, 30.933539, 700.65]
    ],
    { diffHeight: 200 }
  )
  addTableItem(areaItem2)

}

// 添加矩形
function btnDrawExtent() {
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.getOutlinePositions(false)
      map.graphicLayer.clear()

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

      // 挖地区域
      const areaItem = terrainClip.addArea(positions)
      addTableItem(areaItem)
    }
  })
}
// 添加多边形
function btnDraw() {
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5,
      outline: false
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

      const areaItem = terrainClip.addArea(positions)
      addTableItem(areaItem)
    }
  })
}
// 清除
function removeAll() {
  terrainClip.clear() // 清除挖地区域
  table = []
}
// 改变切割的深度
function changeClipHeight(val) {
  terrainClip.diffHeight = val
}
// 是否挖地
function chkClippingPlanes(val) {
  terrainClip.enabled = val
}
// 是否外切割
function chkUnionClippingRegions(val) {
  terrainClip.clipOutSide = val
}
// 是否深度检测
function chkTestTerrain(val) {
  map.scene.globe.depthTestAgainstTerrain = val
}


var table = []
// 区域表格添加一行记录
function addTableItem(item) {
  table.push({ key: item.id - 1, name: "开挖区域" + item.id, graphicId: item.id })

  eventTabel.fire("tableObject", { table })
}
// 表格操作
function flyToGraphic(item) {
  const graphic = terrainClip.getAreaById(item)
  map.flyToPositions(graphic.positions)
}
function deletedGraphic(item) {
  const graphic = terrainClip.getAreaById(item)
  terrainClip.removeArea(graphic)
}
