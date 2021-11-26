var map
var floodByGraphic
var drawPotions
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 基于polygon矢量面抬高模拟，只支持单个区域
  floodByGraphic = new mars3d.thing.FloodByGraphic({
    // speed: speed,
    style: {
      color: "#007be6",
      opacity: 0.5,
      outline: false
    }
  })
  map.addThing(floodByGraphic)

  floodByGraphic.on(mars3d.EventType.start, function (e) {
    console.log("开始分析", e)
  })
  floodByGraphic.on(mars3d.EventType.change, function (e) {
    onChangeHeight(e.height)
  })
  floodByGraphic.on(mars3d.EventType.end, function (e) {
    console.log("结束分析", e)
  })

  eventTarget.fire("loadOk")
}

function onChangeHeight(height) {
  console.log("高度发生了变化", height)
}

// 绘制矩形
function btnDrawExtent(callback) {
  drawPotions = null
  floodByGraphic.clear()
  map.graphicLayer.clear()

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

      // 区域
      drawPotions = positions

      // 求最大、最小高度值
      showLoading()
      var result = mars3d.PolyUtil.getHeightRange(positions, map.scene)
      callback(result.minHeight, result.maxHeight)
      hideLoading()
    }
  })
}
// 绘制多边形
function btnDraw(callback) {
  drawPotions = null
  floodByGraphic.clear()
  map.graphicLayer.clear()

  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5,
      outline: false
    },
    success: function (graphic) {
      var positions = graphic.positionsShow

      drawPotions = positions

      // 求最大、最小高度值
      showLoading()
      var result = mars3d.PolyUtil.getHeightRange(positions, map.scene)
      callback(result.minHeight, result.maxHeight)
      hideLoading()
    }
  })
}

function clearDraw() {
  drawPotions = null
  map.graphicLayer.clear()
}

// 开始分析
function begin(data) {
  if (drawPotions == null) {
    globalMsg("请首先绘制分析区域！")
    return
  }
  map.graphicLayer.clear()
  floodByGraphic.positions = drawPotions

  var minValue = Number(data.minHeight)
  var maxValue = Number(data.maxHeight)
  var speed = Number(data.speed)
  console.log(minValue, maxValue, speed)

  floodByGraphic.setOptions({
    minHeight: minValue,
    maxHeight: maxValue,
    speed: speed
  })
  floodByGraphic.start()
}
