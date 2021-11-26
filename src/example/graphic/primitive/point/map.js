var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\common\script\graphicManager.js

  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)

  // 加一些演示数据
  addGraphic_a1(graphicLayer)
  addGraphic_a2(graphicLayer)
  addGraphic_a3(graphicLayer)
  addGraphic_a4(graphicLayer)
}

// 添加数据
function addData(count) {
  graphicLayer.clear()

  showLoading()
  var startTime = new Date().getTime()

  count = count * 10000

  for (var j = 0; j < count; ++j) {
    // eslint-disable-next-line no-undef
    var position = randomPoint()

    var color = Cesium.Color.fromRandom({
      minimumRed: 0.75,
      minimumGreen: 0.75,
      minimumBlue: 0.75,
      alpha: 1.0
    })

    var primitive = new mars3d.graphic.PointPrimitive({
      position: position,
      style: {
        color: color,
        pixelSize: 5,
        outlineColor: "#000000",
        outlineWidth: 1
      },
      tooltip: "第" + j + "个"
    })
    graphicLayer.addGraphic(primitive)
  }

  hideLoading()
  var endTime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  var usedTime = (endTime - startTime) / 1000
  console.log(usedTime)

  globalMsg("共耗时" + usedTime.toFixed(2) + "秒")
}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.PointPrimitive({
    position: [116.244399, 30.920459, 573.6],
    style: {
      pixelSize: 8,
      color: Cesium.Color.fromCssColorString("#FED976").withAlpha(0.9),
      label: {
        text: "我是原始点",
        font_size: 18,
        color: "#ffffff",
        pixelOffsetY: -10,
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // 图层管理的相关处理，代码在\common\script\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(primitive)

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log("转换后的geojson", geojson)
}

function addGraphic_a2(graphicLayer) {
  var primitive = new mars3d.graphic.PointPrimitive({
    position: [116.39224, 30.902853],
    style: {
      pixelSize: 9,
      color: "#ff0000",
      clampToGround: true
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.PointPrimitive({
    position: [116.340443, 30.882935, 389.88],
    style: {
      color: "#ffff00",
      pixelSize: 10,
      outlineWidth: 0,

      label: { text: "鼠标单击会高亮", pixelOffsetY: -10 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        type: mars3d.EventType.click, // 默认为鼠标移入高亮，也可以指定click单击高亮
        pixelSize: 15,
        outlineColor: "#ff0000",
        outlineWidth: 2
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a4(graphicLayer) {
  var primitive = new mars3d.graphic.PointPrimitive({
    position: new mars3d.LatLngPoint(116.329102, 30.977955, 1548.6),
    style: {
      color: Cesium.Color.BLUE,
      pixelSize: 20,
      outlineColor: "#ffffff",
      outlineWidth: 2,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 100000)
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

// 清除数据
function clearLayer() {
  graphicLayer.clear()
}

// 显示隐藏 绑定popup和tooltip和右键菜单以及是否编辑
function bindShowHide(val) {
  graphicLayer.show = val
}

function bindPopup(val) {
  if (val) {
    // eslint-disable-next-line no-undef
    bindLayerPopup(graphicLayer)
  } else {
    graphicLayer.unbindPopup()
  }
}
function bindTooltip(val) {
  if (val) {
    graphicLayer.bindTooltip("我是layer上绑定的Tooltip")
  } else {
    graphicLayer.unbindTooltip()
  }
}
function bindRightMenu(val) {
  if (val) {
    // eslint-disable-next-line no-undef
    bindLayerContextMenu(graphicLayer)
  } else {
    graphicLayer.unbindContextMenu(true)
  }
}
