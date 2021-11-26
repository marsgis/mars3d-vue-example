var map
var tilesetFlood

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 25.074712, lng: 102.65196, alt: 3122, heading: 28, pitch: -41 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true

  // 加模型
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-xiaoqu/tileset.json",
    maximumScreenSpaceError: 6,
    maximumMemoryUsage: 2048,
    flyTo: true
  })
  map.addLayer(tilesetLayer)

  // 会执行多次，重新加载一次完成后都会回调
  tilesetLayer.on(mars3d.EventType.allTilesLoaded, function (event) {
    console.log("触发allTilesLoaded事件", event)
  })

  // 模型淹没处理类
  tilesetFlood = new mars3d.thing.TilesetFlood({
    layer: tilesetLayer,
    floodAll: false
  })
  map.addThing(tilesetFlood)

  tilesetFlood.on(mars3d.EventType.start, function (e) {
    console.log("开始分析", e)
  })
  tilesetFlood.on(mars3d.EventType.change, function (e) {
    onChangeHeight(e.height)
  })
  tilesetFlood.on(mars3d.EventType.end, function (e) {
    console.log("结束分析", e)
  })
}

// 修改分析方式
function changeFloodType(val) {
  if (val === "1") {
    tilesetFlood.floodAll = true
  } else {
    tilesetFlood.floodAll = false
  }
}

// 绘制矩形
function btnDrawExtent() {
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.2,
      outline: false
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.getOutlinePositions(false)
      tilesetFlood.addArea(positions)
    }
  })
}
// 绘制多边形
function btnDraw() {
  map.graphicLayer.clear()
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
      tilesetFlood.addArea(positions)

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界
    }
  })
}
// 开始分析
function begin(data) {
  console.log(tilesetFlood.floodAll, tilesetFlood.length)
  if (!tilesetFlood.floodAll && tilesetFlood.length == 0) {
    globalMsg("请首先绘制分析区域！")
    return
  }
  map.graphicLayer.clear()

  var minValue = Number(data.minHeight)
  var maxValue = Number(data.maxHeight)
  var speed = Number(data.speed)
  if (minValue <= 1800) {
    globalMsg("最低海拔过低，请耐心等候几秒")
  }

  console.log("当前参数", { minHeight: minValue, maxHeight: maxValue })

  tilesetFlood.setOptions({
    minHeight: minValue,
    maxHeight: maxValue,
    speed: speed
  })

  tilesetFlood.start()
}

function onChangeHeight(height) {
  console.log("分析中，高度变化了", height)
}
