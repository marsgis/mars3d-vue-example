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

function addData(count) {
  count = count * 10000
  graphicLayer.clear()
  showLoading()
  var startTime = new Date().getTime()

  for (var j = 0; j < count; ++j) {
    // eslint-disable-next-line no-undef
    var position = randomPoint()
    var primitive = new mars3d.graphic.LabelPrimitive({
      position: position,
      style: {
        text: "第" + j + "个",
        font_size: 18,
        font_family: "楷体",
        color: Cesium.Color.AZURE,
        outline: true,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -28) // 偏移量
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
  var primitive = new mars3d.graphic.LabelPrimitive({
    position: [116.244399, 30.920459, 573.6],
    style: {
      text: "合肥火星科技有限公司",
      font_size: 25,
      font_family: "楷体",
      color: "#003da6",
      outline: true,
      outlineColor: "#bfbfbf",
      outlineWidth: 2,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      disableDepthTestDistance: Number.POSITIVE_INFINITY // 一直显示，不被地形等遮挡(会穿过地球被透视)
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
  var primitive = new mars3d.graphic.LabelPrimitive({
    position: [116.39224, 30.902853],
    style: {
      text: "Mars3D",
      fillColor: Cesium.Color.YELLOW,
      clampToGround: true
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.LabelPrimitive({
    position: [116.340443, 30.882935, 389.88],
    style: {
      text: "中国安徽合肥",
      fillColor: Cesium.Color.LIME,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a4(graphicLayer) {
  var primitive = new mars3d.graphic.LabelPrimitive({
    position: new mars3d.LatLngPoint(116.329102, 30.977955, 1548.6),
    style: {
      text: "火星科技Mars3D平台",
      font_size: 25,
      font_family: "楷体",
      fillColor: Cesium.Color.BLUE,
      outline: true,
      outlineColor: Cesium.Color.LIME,
      outlineWidth: 2,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 100000),

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        font_size: 35
      }
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
