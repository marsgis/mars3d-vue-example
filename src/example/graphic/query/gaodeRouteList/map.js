var map
var routeLayer
var gaodeRoute

// 当前页面业务相关
var startGraphic
var endPointArr
var poiLayer
var queryGaodePOI

// 自定义事件
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.812769, lng: 117.250545, alt: 18500, heading: 358, pitch: -81 }
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

  queryGaodePOI = new mars3d.query.GaodePOI({
    // key: ['ae29a37307840c7ae4a785ac905927e0'],
  })

  // 创建矢量数据图层
  poiLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(poiLayer)

  poiLayer.bindPopup(function (event) {
    var item = event.graphic.attr

    var inHtml = '<div class="mars-popup-titile">' + item.name + '</div><div class="mars-popup-content" >'
    var type = item.type.trim()
    if (type != "") {
      inHtml += "<div><label>类别</label>" + type + "</div>"
    }
    var xzqh = item.xzqh.trim()
    if (xzqh != "") {
      inHtml += "<div><label>区域</label>" + xzqh + "</div>"
    }
    var tel = item.tel.trim()
    if (tel != "") {
      inHtml += "<div><label>电话</label>" + tel + "</div>"
    }
    var address = item.address.trim()
    if (address != "") {
      inHtml += "<div><label>地址</label>" + address + "</div>"
    }
    inHtml += "</div>"
    return inHtml
  })
}

// 起点
function stratPoint() {
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

      const point = graphic.point
      point.format()

      eventTarget.fire("star", { point })
    }
  })
}
// 终点
function endPoint() {
  showLoading()
  var extent = map.getExtent() // 当前视域内

  queryGaodePOI.queryPolygon({
    text: "企业",
    polygon: [
      [extent.xmin, extent.ymin],
      [extent.xmin, extent.ymax],
      [extent.xmax, extent.ymax],
      [extent.xmax, extent.ymin]
    ],
    page: 0,
    count: 10,
    success: function (res) {
      hideLoading()

      const count = res.count
      eventTarget.fire("end", { count })

      addEndPointEntity(res.list)
    },
    error: function (msg) {
      globalMsg(msg)
      hideLoading()
    }
  })
}

// 开始分析
function btnAnalyse() {
  if (!startGraphic || !endPointArr || endPointArr.length == 0) {
    globalMsg("请设置起点和查询目的地")
    return
  }
  showLoading()

  queryRoute()
}

function queryRoute(type) {
  var startPoint = startGraphic.coordinate
  var arr = []
  for (var i = 0; i < endPointArr.length; i++) {
    var item = endPointArr[i]
    arr.push([startPoint, [item.x, item.y]])
  }

  gaodeRoute.queryArr({
    type: type, // GaodeRouteType枚举类型
    points: arr,
    success: function (data) {
      hideLoading()

      showRouteResult(data)
    },
    error: function (msg) {
      hideLoading()
      globalAlert(msg)
    }
  })
}
function showRouteResult(data) {
  for (var i = 0; i < data.length; i++) {
    var item = data[i]
    if (!item) {
      continue
    }

    var lnglats = item.points
    if (!lnglats || lnglats.length < 1) {
      continue
    }

    var name = endPointArr[i].name

    var time = formatTime(item.allDuration)
    var distance = mars3d.MeasureUtil.formatDistance(item.allDistance)
    var html = "目的地：" + name + "<br/>总距离：" + distance + "<br/>所需时间：" + time + ""

    const graphic = new mars3d.graphic.PolylineEntity({
      positions: lnglats,
      style: {
        clampToGround: true,
        material: Cesium.Color.fromRandom({
          alpha: 0.7
        }),
        width: 4
      },
      popup: html
    })
    routeLayer.addGraphic(graphic)

    graphic.entityGraphic.material_old = graphic.entityGraphic.material
    graphic.entityGraphic.width_old = graphic.entityGraphic.width

    const id = graphic.id
    eventTarget.fire("analyse", { i, name, distance, time, id })
  }
}

// 终点的POI查询
function addEndPointEntity(arr) {
  console.log("查询数据结果", arr)

  endPointArr = arr

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]

    var graphic = new mars3d.graphic.BillboardEntity({
      position: Cesium.Cartesian3.fromDegrees(item.x, item.y),
      style: {
        image: "img/marker/end.png",
        scale: 1,
        clampToGround: true, // 贴地
        label: {
          text: item.name,
          font: "20px 楷体",
          color: Cesium.Color.AZURE,
          outline: true,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -30), // 偏移量
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200000),
          clampToGround: true // 贴地
        }
      },
      attr: item
    })
    poiLayer.addGraphic(graphic)
  }
}

var lastRoute

// 表格的点击事件
function centerAtRoute(id) {
  const graphic = routeLayer.getGraphicById(id)

  if (lastRoute) {
    lastRoute.entityGraphic.material = lastRoute.entityGraphic.material_old
    lastRoute.entityGraphic.width = lastRoute.entityGraphic.width_old
  }

  // 动画线材质
  graphic.entityGraphic.width = 5
  graphic.entityGraphic.material = mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
    color: Cesium.Color.CHARTREUSE,
    image: "img/textures/lineClr.png",
    speed: 20
  })

  map.flyToGraphic(graphic)

  lastRoute = graphic
}

// 清除按钮
function removeAll() {
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }
  routeLayer.clear()
  poiLayer.clear()
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
