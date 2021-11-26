
var map
var contourLine
var eventTabel = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.706401, lng: 116.08272, alt: 26859, heading: 5, pitch: -55 },
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

  contourLine = new mars3d.thing.ContourLine({
    spacing: 100,
    width: 1.5,
    color: Cesium.Color.RED,
    minHeight: -414.0,
    maxHeight: 8777.0,
    // 地表渲染的配色方案
    colorScheme: {
      elevation: {
        step: [0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0],
        color: ["#000000", "#2747E0", "#D33B7D", "#D33038", "#FF9742", "#FF9742", "#ffd700"]
      },
      slope: {
        step: [0.0, 0.29, 0.5, Math.sqrt(2) / 2, 0.87, 0.91, 1.0],
        color: ["#000000", "#2747E0", "#D33B7D", "#D33038", "#FF9742", "#FF9742", "#ffd700"]
      },
      aspect: {
        step: [0.0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0],
        color: ["#000000", "#2747E0", "#D33B7D", "#D33038", "#FF9742", "#FF9742", "#ffd700"]
      }
    }
  })
  map.addThing(contourLine)



  // 演示的示例区域
  const areaItem = contourLine.addArea([
    [116.003125, 30.948354, 1103.66],
    [116.23964, 30.946376, 563.02],
    [116.223677, 30.802558, 522.04],
    [115.997891, 30.807484, 440.83]
  ])
  addTableItem(areaItem)
}

// 添加矩形
function btnDrawExtent() {
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

      const areaItem = contourLine.addArea(positions)
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

      const areaItem = contourLine.addArea(positions)
      addTableItem(areaItem)
    }
  })
}
// 清除
function clearAll() {
  contourLine.clear()
  table = []
}

// 滑动条控制
function changeWidth(val) {
  if (val) {
    contourLine.width = val
  }
}
function changeSpacing(val) {
  if (val) {
    contourLine.spacing = val
  }
}

// 改变颜色
function changeColor(val) {
  contourLine.color = Cesium.Color.fromCssColorString(val)
}

// 等高线控制
function showDengGX(val) {
  contourLine.contourShow = val
}
// 状态控制
function chkClippingPlanes(val) {
  contourLine.showElseArea = val
}
// 阴影控制
function changeShadingType(val) {
  contourLine.shadingType = val
}

var table = []
// 区域表格添加一行记录
function addTableItem(item) {
  table.push({ key: item.id - 1, name: "区域" + item.id, graphicId: item.id })

  eventTabel.fire("tableObject", { table })
}
// 表格操作
function flyToGraphic(item) {
  const graphic = contourLine.getAreaById(item)
  map.flyToPositions(graphic.positions)
}
function deletedGraphic(item) {
  const graphic = contourLine.getAreaById(item)
  contourLine.removeArea(graphic)
}
