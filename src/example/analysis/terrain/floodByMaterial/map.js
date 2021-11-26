
var map
var floodByMaterial

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      showSun: false,
      showMoon: false,
      showSkyBox: false,
      showSkyAtmosphere: false,
      fog: false,
      globe: {
        showGroundAtmosphere: false,
        enableLighting: false
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 基于地球材质，可以多个区域
  floodByMaterial = new mars3d.thing.FloodByMaterial({
    // speed: speed
  })
  map.addThing(floodByMaterial)


  floodByMaterial.on(mars3d.EventType.start, function (e) {
    console.log("开始分析", e)
  })
  floodByMaterial.on(mars3d.EventType.change, function (e) {
    onChangeHeight(e.height)
  })
  floodByMaterial.on(mars3d.EventType.end, function (e) {
    console.log("结束分析", e)
  })
}

// 绘制矩形
function btnDrawExtent(callback) {
  floodByMaterial.clear()
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

      // 更新最大、最小高度值
      updateHeightRange(positions, callback)

      // 区域
      floodByMaterial.addArea(positions)
    }
  })
}
// 绘制多边形
function btnDraw(callback) {
  floodByMaterial.clear()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5,
      outline: false
    },
    success: function (graphic) {
      var positions = graphic.positionsShow

      // 更新最大、最小高度值
      updateHeightRange(positions, callback)
      floodByMaterial.addArea(positions)
    }
  })
}
// 求最大、最小高度值
function updateHeightRange(positions, callback) {
  showLoading()

  var result = mars3d.PolyUtil.getHeightRange(positions, map.scene)
  const minHeight = Math.ceil(result.minHeight)
  const maxHeight = Math.floor(result.maxHeight)

  callback(minHeight, maxHeight)
  hideLoading()
}

// 开始分析
function begin(data) {
  if (floodByMaterial.length == 0) {
    globalMsg("请首先绘制分析区域！")
    return
  }
  map.graphicLayer.clear()

  var minValue = Number(data.minHeight)
  var maxValue = Number(data.maxHeight)
  var speed = Number(data.speed)

  floodByMaterial.setOptions({
    minHeight: minValue,
    maxHeight: maxValue,
    speed: speed
  })
  floodByMaterial.start()
}

function onChangeHeight(height) {
  console.log("高度发生了变化", height)
}

function clearDraw() {
  floodByMaterial.clear()
  map.graphicLayer.clear()
}
