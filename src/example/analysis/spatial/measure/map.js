var map
var measure

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


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
      // eslint-disable-next-line no-undef
      showInterResult(e.list) // 在js/showPolygonInter.js
    }
  })
  // 任意一个矢量数据被移出，贴地面积中的插值计算点都会被移除
  measure.on(mars3d.EventType.remove, function (e) {
    clearInterResult() // 在js/showPolygonInter.js
  })
}
function onlyPickModelPosition(val) {
  // 控制鼠标只取模型上的点，忽略地形上的点的拾取

  map.onlyPickModelPosition = val
}

// 外部控制，完成绘制，比如手机端无法双击结束
function endDraw() {
  measure.endDraw()
}

function removeAll() {
  measure.clear()
  // eslint-disable-next-line no-undef
  clearInterResult() // 在js/showPolygonInter.js
}
// 空间距离
function measureLength() {
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
function measureSurfaceLength() {
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
function measureArea() {
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
function measureSurfaceeArea() {
  measure.areaSurface({
    style: {
      color: "#ffff00"
    },
    splitNum: 10 // step插值分割的个数
  })
}
// 高度差
function measureHeight() {
  measure.height()
}
// 三角测量
function measureTriangleHeight() {
  measure.heightTriangle()
}
// 方位角
function measureAngle() {
  measure.angle()
}

// 坐标测量
function measurePoint() {
  measure.point()
}


// 定位至模型
var modelTest
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
