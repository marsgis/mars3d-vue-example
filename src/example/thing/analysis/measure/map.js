import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let measure


/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  addMeasure()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addMeasure() {
  measure = new mars3d.thing.Measure({
    label: {
      color: "#ffffff",
      font_family: "楷体",
      font_size: 20,
      background: false
    }
  })
  map.addThing(measure)



  measure.on(mars3d.EventType.start, function (e) {
    console.log("开始异步分析", e)
    showLoading()
  })
  measure.on(mars3d.EventType.end, function (e) {
    console.log("完成异步分析", e)
    hideLoading()

    if (e.graphic?.type === mars3d.graphic.AreaSurfaceMeasure.type && e.list) {
      showInterResult(e.list)
    }
  })
  // 任意一个矢量数据被移出，贴地面积中的插值计算点都会被移除
  measure.on(mars3d.EventType.remove, function (e) {

    clearInterResult()
  })
}

export function onlyPickModelPosition(val) {
  // 控制鼠标只取模型上的点，忽略地形上的点的拾取
  map.onlyPickModelPosition = val
}

// 外部控制，完成绘制，比如手机端无法双击结束
function endDraw() {
  measure.endDraw()
}

export function removeAll() {
  measure.clear()

  clearInterResult()
}

// 空间距离
export function measureLength() {
  measure.distance({
    showAddText: true
    // style: {
    //   color: '#ffff00',
    //   width: 3,
    //   clampToGround: false //是否贴地
    // }
  })
}
// 贴地距离
export function measureSurfaceLength() {
  measure.distanceSurface({
    showAddText: true
    // unit: 'm', //支持传入指定计量单位
    // style: {
    //   color: '#ffff00',
    //   width: 3,
    //   clampToGround: true //是否贴地
    // }
  })
}
// 水平面积
export function measureArea() {
  measure.area({
    // style: {
    //   color: '#00fff2',
    //   opacity: 0.4,
    //   outline: true,
    //   outlineColor: '#fafa5a',
    //   outlineWidth: 1,
    //   clampToGround: false //贴地
    // }
  })
}
// 贴地面积
export function measureSurfaceeArea() {
  measure.areaSurface({
    style: {
      color: "#ffff00"
    },
    splitNum: 10 // step插值分割的个数
  })
}
// 高度差
export function measureHeight() {
  measure.height()
}

// 三角测量
export function measureTriangleHeight() {
  measure.heightTriangle()
}

// 方位角
export function measureAngle() {
  measure.angle()
}

// 坐标测量
export function measurePoint() {
  measure.point()
}

// 定位至模型
let modelTest
function centerAtModel() {
  if (!modelTest) {
    modelTest = new mars3d.layer.TilesetLayer({
      url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
      position: { alt: 80.6 },
      maximumScreenSpaceError: 1,
      maximumMemoryUsage: 1024,
      flyTo: true
    })
    map.addLayer(modelTest)
  }
}



// 显示mars3d.polygon.interPolygon处理后的面内插值分析结果，主要用于测试对比

// 显示面的插值计算结果，方便比较分析
var interGraphicLayer

function clearInterResult() {
  if (!interGraphicLayer) {
    interGraphicLayer = new mars3d.layer.GraphicLayer()
    map.addLayer(interGraphicLayer)
  }

  interGraphicLayer.clear()
}

function showInterResult(list) {
  // 分析结果用于测试分析的，不做太多处理，直接清除之前的，只保留一个
  clearInterResult()

  var pt1, pt2, pt3
  // var geometryInstances = [];
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i]

    pt1 = item.point1.pointDM
    pt2 = item.point2.pointDM
    pt3 = item.point3.pointDM

    // 点
    for (const pt of [item.point1, item.point2, item.point3]) {
      var primitive = new mars3d.graphic.PointPrimitive({
        position: pt.pointDM,
        style: {
          pixelSize: 9,
          color: Cesium.Color.fromCssColorString("#ff0000").withAlpha(0.5)
        }
      })
      interGraphicLayer.addGraphic(primitive)

      primitive.bindTooltip("点高度:" + mars3d.MeasureUtil.formatDistance(pt.height))
    }

    // 横截面面积
    item.area = item.area || mars3d.MeasureUtil.getTriangleArea(pt1, pt2, pt3)

    // 三角网及边线
    var positions = [pt1, pt2, pt3, pt1]

    // 三角网面（单击用）
    var primitivePoly = new mars3d.graphic.PolygonPrimitive({
      positions: positions,
      style: {
        material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.Color, {
          color: Cesium.Color.fromCssColorString("#ffffff").withAlpha(0.01)
        })
      }
    })
    interGraphicLayer.addGraphic(primitivePoly)
    primitivePoly.bindTooltip("三角面积:" + mars3d.MeasureUtil.formatArea(item.area) + "(第" + i + "个)")

    // 三角网边线
    var primitiveLine = new mars3d.graphic.PolylinePrimitive({
      positions: positions,
      style: {
        width: 1,
        material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.Color, {
          color: Cesium.Color.fromCssColorString("#ffff00").withAlpha(0.3)
        })
      }
    })
    interGraphicLayer.addGraphic(primitiveLine)
  }
}

function showInterLineResult(list) {
  // 分析结果用于测试分析的，不做太多处理，直接清除之前的，只保留最后一个
  clearInterResult()

  var colorList = [Cesium.Color.fromCssColorString("#ffff00"), Cesium.Color.fromCssColorString("#00ffff")]

  for (var i = 1, len = list.length; i < len; i++) {
    var pt1 = list[i - 1]
    var pt2 = list[i]

    var color = colorList[i % 2]

    const graphic = new mars3d.graphic.PolylineEntity({
      positions: [pt1, pt2],
      style: {
        width: 3,
        material: color,
        depthFailMaterial: color.withAlpha(0.3)
      }
    })
    interGraphicLayer.addGraphic(graphic)
    graphic.bindTooltip("长度:" + mars3d.MeasureUtil.formatDistance(Cesium.Cartesian3.distance(pt1, pt2)) + "(第" + i + "段)")
  }
}
