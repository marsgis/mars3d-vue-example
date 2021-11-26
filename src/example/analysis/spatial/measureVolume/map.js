var map
var measure
var measureVolume
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      globe: { depthTestAgainstTerrain: true },
      center: { lat: 30.883785, lng: 116.230883, alt: 8121, heading: 266, pitch: -62 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  measure = new mars3d.thing.Measure({
    label: {
      color: "#ffffff",
      font_family: "楷体",
      font_size: 20
    }
  })
  map.addThing(measure)

  // 直接传入坐标分析
  measureVolume = measure.volume({
    positions: mars3d.PointTrans.lonlats2cartesians([
      [116.191817, 30.864845, 309.3],
      [116.192869, 30.8757, 521.81],
      [116.190478, 30.886266, 672.79],
      [116.19247, 30.893748, 448.91],
      [116.200836, 30.889954, 379.92],
      [116.204063, 30.882578, 532.5],
      [116.203027, 30.873828, 498.8],
      [116.201795, 30.865941, 443.06]
    ]),
    splitNum: 6,
    height: 450
  })

  measure.on(mars3d.EventType.start, function (event) {
    console.log("开始分析", event)

    // eslint-disable-next-line no-undef
    clearInterResult() // 在js/showPolygonInter.js
    showLoading()

    // 打印下边界，测试用
    var coords = mars3d.PointTrans.cartesians2lonlats(event.positions)
    console.log(JSON.stringify(coords))
  })

  measure.on(mars3d.EventType.end, function (event) {
    console.log("分析完成", event)
    hideLoading()
    showHeightVal(event.sourceTarget)

    // 自定义事件 endMeasure ，初始化vue面板中的数值
    eventTarget.fire("endMeasure", { event })
  })
}

// 点选高度
function showHeightVal() {
  var baseHeight = measureVolume.height.toFixed(1)
  var minHeight = measureVolume.minHeight.toFixed(1)
  var maxHeight = getFixedNum(measureVolume.maxHeight)

  // 触发自定义事件 heightVal ，改变vue面板中的值
  eventTarget.fire("heightVal", { baseHeight, minHeight, maxHeight })
}

function getFixedNum(val) {
  return Math.ceil(val * 10) / 10
}

// 方量分析
function analysisMeasure() {
  // 手动绘制的方式分析
  measureVolume = measure.volume({
    splitNum: 6 // 面内插值次数，控制精度[注意精度越大，分析时间越长]
    // minHeight: 50  //可以设置一个固定的最低高度
  })
}

// 清除
function clear() {
  measure.clear()
  // eslint-disable-next-line no-undef
  clearInterResult() // 在js/showPolygonInter.js
}

function showResult(reslut) {
  if (reslut) {
    // eslint-disable-next-line no-undef
    showInterResult(measureVolume.interPolygonObj.list) // 在js/showPolygonInter.js
  } else {
    // eslint-disable-next-line no-undef
    clearInterResult() // 在js/showPolygonInter.js
  }
}

// 修改基础高度
function baseHeight(num) {
  measureVolume.height = num
  showHeightVal()
}

// 修改底高
function txtMinHeight(num) {
  if (num > measureVolume.height) {
    globalMsg("墙底部高度不能高于基准面高")
    return
  }
  measureVolume.minHeight = num
}

// 修改顶高
function txtMaxHeight(num) {
  var maxHeight = getFixedNum(measureVolume.polygonMaxHeight)
  if (num < maxHeight) {
    globalMsg("墙顶部高度不能低于区域内的地表高" + maxHeight)
    measureVolume.maxHeight = Number(maxHeight)
    return
  }
  if (num < measureVolume.height) {
    globalMsg("墙顶部高度不能低于基准面高")
    return
  }
  measureVolume.maxHeight = num
}

function selHeight() {
  measureVolume.selecteHeight(showHeightVal)
}
