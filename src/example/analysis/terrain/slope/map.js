
var map
var slope
var contourLine

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 剖度坡向
  slope = new mars3d.thing.Slope({
    point: {
      show: true,
      pixelSize: 9,
      color: Cesium.Color.RED.withAlpha(0.5)
      // disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
    arrow: {
      show: true,
      scale: 0.3, // 箭头长度的比例（范围0.1-0.9）
      width: 15, // 箭头宽度
      color: Cesium.Color.YELLOW
    },
    tooltip: function (event) {
      // 自定义显示内容
      var attr = event.czmObject.attr
      return `坡度: ${attr.slopeStr1}  (${attr.slopeStr2})<br />坡向: ${attr.direction}°`
    }
  })
  map.addThing(slope)

  slope.on(mars3d.EventType.end, function (event) {
    console.log("分析完成", event)
    // event.data[0] 数组内返回值说明： {
    //     position:position,  //坐标位置
    //     slope: slopeValDou, //度数法值，α(坡度)=arc tan (高程差/水平距离)
    //     slopeStr1: text1,   //度数法值字符串
    //     slopeStr2: text2,   //百分比法值字符串，坡度 = (高程差/水平距离)x100%
    //     direction: slopeAngle //坡向值（0-360度）
    // }
  })

  // 渲染效果
  contourLine = new mars3d.thing.ContourLine({
    contourShow: false, // 是否显示等高线
    shadingType: "none" // 地表渲染效果类型:无nono, 高程 elevation, 坡度slope, 坡向aspect
  })
  map.addThing(contourLine)


}

// 添加矩形
function btnDrawExtent(splitNum) {
  clearAll()
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

      contourLine.positions = positions

      slope.add(positions, {
        splitNum: splitNum, // splitNum插值分割的个数
        radius: 1, // 缓冲半径（影响坡度坡向的精度）
        count: 4 // 缓冲的数量（影响坡度坡向的精度）会求周边(count*4)个点
      })
    }
  })
}
// 绘制多边形
function btnDraw(splitNum) {
  clearAll()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#29cf34",
      opacity: 0.3,
      outline: true,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

      contourLine.positions = positions

      slope.add(positions, {
        splitNum: splitNum, // splitNum插值分割的个数
        radius: 1, // 缓冲半径（影响坡度坡向的精度）
        count: 4 // 缓冲的数量（影响坡度坡向的精度）会求周边(count*4)个点
      })
    }
  })
}
// 添加点
function btnDrawPoint() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "point",
    style: {
      color: "#ffff00"
    },
    success: function (graphic) {
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      slope.add(positions)
    }
  })
}
// 改变阴影
function changeShadingType(val) {
  contourLine.shadingType = val
}

function clearAll() {
  slope.clear()
  contourLine.clear()
}
