var map
var drawGraphic
var graphicLayer
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: -13.151771, lng: 55.60413, alt: 30233027, heading: 154, pitch: -89 },
      cameraController: {
        zoomFactor: 3.0,
        minimumZoomDistance: 1,
        maximumZoomDistance: 300000000,
        constrainedAxis: false // 解除在南北极区域鼠标操作限制
      },
      clock: {
        multiplier: 10 // 速度
      }
    },
    control: {
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: true, // 是否显示时间线控件
      compass: { top: "10px", left: "5px" }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 因为animation面板遮盖，修改底部bottom值
  const toolbar = document.getElementsByClassName("cesium-viewer-toolbar")[0]
  toolbar.style.bottom = "110px"

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了卫星", event)
  })
  graphicLayer.on(mars3d.EventType.change, function (event) {
    // 监听位置变化
  })

  var weixin = new mars3d.graphic.Satellite({
    name: "GAOFEN 1",
    tle1: "1 39150U 13018A   21180.50843864  .00000088  00000-0  19781-4 0  9997",
    tle2: "2 39150  97.8300 252.9072 0018449 344.7422  15.3253 14.76581022440650",
    model: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      show: true
    },
    cone: {
      angle1: 40,
      show: false
    },
    label: {
      font_family: "楷体",
      font_size: 30,
      show: true
    },
    path: {
      show: true
    }
  })

  graphicLayer.addGraphic(weixin)

  weixin._lastInPoly = false

  setTimeout(() => {
    var position = weixin.position
    if (position) {
      map.flyToPoint(position, {
        radius: 900000, // 距离目标点的距离
        pitch: -60 // 相机方向
      })
    }
  }, 3000)

  // 位置变化事件
  graphicLayer.on(mars3d.EventType.change, function (event) {
    // 判断卫星是否在面内
    const weixin = event.graphic
    if (!drawGraphic) {
      weixin._lastInPoly = false
      weixin.coneShow = false // 关闭视锥体
      return
    }

    var position = weixin.position
    if (!position) {
      return
    }
    var openVideo = false
    var thisIsInPoly = drawGraphic.isInPoly(position)
    if (thisIsInPoly !== weixin._lastInPoly) {
      if (thisIsInPoly) {
        // 开始进入区域内
        console.log(weixin.name + "开始进入区域内")

        weixin.coneShow = true // 打开视锥体
        openVideo = true // 打开视频面板
      } else {
        // 离开区域
        console.log(weixin.name + "离开区域")

        weixin.coneShow = false // 关闭视锥体
        openVideo = false // 关闭视频面板
      }

      eventTarget.fire("video", { openVideo })
      weixin._lastInPoly = thisIsInPoly
    }
  })
}

// 框选查询 矩形
function drawRectangle() {
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#ffff00",
      opacity: 0.2,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}
// 框选查询   圆
function drawCircle() {
  map.graphicLayer.startDraw({
    type: "circle",
    style: {
      color: "#ffff00",
      opacity: 0.2,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}
// 框选查询   多边
function drawPolygon() {
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#ffff00",
      opacity: 0.2,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2
    },
    success: function (graphic) {
      drawGraphic = graphic
    }
  })
}
// 清除
function drawClear() {
  map.graphicLayer.clear()
  drawGraphic = null
}

// // 判断卫星是否在面内
// function processInArea(weixin) {
//   if (!drawGraphic) {
//     weixin._lastInPoly = false
//     weixin.coneShow = false // 关闭视锥体
//     // $("#videoView").hide() // 关闭视频面板
//     return
//   }

//   var position = weixin.position
//   if (!position) {
//     return
//   }

//   var thisIsInPoly = drawGraphic.isInPoly(position)
//   if (thisIsInPoly !== weixin._lastInPoly) {
//     if (thisIsInPoly) {
//       // 开始进入区域内
//       console.log(weixin.name + "开始进入区域内")

//       weixin.coneShow = true // 打开视锥体
//       // $("#videoView").show() // 打开视频面板
//     } else {
//       // 离开区域
//       console.log(weixin.name + "离开区域")

//       weixin.coneShow = false // 关闭视锥体
//       // $("#videoView").hide() // 关闭视频面板
//     }

//     weixin._lastInPoly = thisIsInPoly
//   }
// }
