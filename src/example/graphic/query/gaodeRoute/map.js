var map
var routeLayer
var gaodeRoute

// 当前页面业务相关
var startGraphic, endGraphic
var lineGraphic

// 自定义事件
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.797919, lng: 117.281329, alt: 36236, heading: 358, pitch: -81 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建矢量数据图层
  routeLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(routeLayer)

  gaodeRoute = new mars3d.query.GaodeRoute({
    // key: ['ae29a37307840c7ae4a785ac905927e0'],
  })
}

// 开始分析按钮
function btnAnalyse(type) {
  if (!startGraphic || !endGraphic) {
    globalMsg("请设置起点和终点")
    return
  }
  queryRoute(type)
}
// 清除按钮
function removeAll() {
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }
  if (endGraphic) {
    endGraphic.remove()
    endGraphic = null
  }

  routeLayer.clear()
}

// 起点按钮
function startPoint(type) {
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }

  map.graphicLayer.startDraw({
    type: "billboard",
    style: {
      image: "img/marker/start.png",
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    },
    success: function (graphic) {
      startGraphic = graphic

      var point = graphic.point
      point.format()

      // 触发自定义事件，改变输入框的值
      eventTarget.fire("start", { point })

      queryRoute(type)
    }
  })
}
// 终点按钮
function endPoint(type) {
  if (endGraphic) {
    endGraphic.remove()
    endGraphic = null
  }

  map.graphicLayer.startDraw({
    type: "billboard",
    style: {
      image: "img/marker/end.png",
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    },
    success: function (graphic) {
      endGraphic = graphic

      var point = graphic.point
      point.format()

      // 触发自定义事件，改变输入框的值
      eventTarget.fire("end", { point })

      queryRoute(type)
    }
  })
}

function queryRoute(type) {
  if (!startGraphic || !endGraphic) {
    return
  }

  routeLayer.clear()
  showLoading()

  gaodeRoute.query({
    type: type,
    points: [startGraphic.coordinate, endGraphic.coordinate],
    success: function (data) {
      hideLoading()
      var lineFirst = data.paths[0]
      var points = lineFirst.points
      if (!points || points.length < 1) {
        return
      }

      var time = formatTime(lineFirst.allDuration)
      var distance = mars3d.MeasureUtil.formatDistance(lineFirst.allDistance)
      var html = "<div>总距离：" + distance + "<br/>所需时间：" + time + "</div>"

      var graphic = new mars3d.graphic.PolylineEntity({
        positions: points,
        style: {
          clampToGround: true,
          material: Cesium.Color.AQUA.withAlpha(0.8),
          width: 5
        },
        popup: html
      })
      routeLayer.addGraphic(graphic)

      var allTime = formatTime(data.paths[0].allDuration)
      var allDistance = mars3d.MeasureUtil.formatDistance(data.paths[0].allDistance)

      var dhHtml = ""
      for (var i = 0; i < data.paths[0].steps.length; i++) {
        var item = data.paths[0].steps[i]
        dhHtml += item.instruction + "；"
      }

      eventTarget.fire("analyse", { allTime, allDistance, dhHtml })
    },
    error: function (msg) {
      hideLoading()
      globalAlert(msg)
    }
  })
}

// 格式化时间
function formatTime(strtime) {
  strtime = Number(strtime) || 0

  if (strtime < 60) {
    return strtime.toFixed(0) + "秒"
  } else if (strtime >= 60 && strtime < 3600) {
    var miao = Math.floor(strtime % 60)
    return Math.floor(strtime / 60) + "分钟" + (miao != 0 ? miao + "秒" : "")
  } else {
    strtime = Math.floor(strtime / 60) // 秒转分钟
    return Math.floor(strtime / 60) + "小时" + Math.floor(strtime % 60) + "分钟"
  }
}

