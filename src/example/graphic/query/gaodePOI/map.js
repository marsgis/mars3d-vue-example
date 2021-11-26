
var map
var poiLayer
var queryGaodePOI

var drawGraphic // 限定区域

var bootstrapList = [] // 查询结果
var lastQueryOptions // 上一次请求参数，用于 下一页使用

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
  poiLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(poiLayer)


  poiLayer.bindPopup(function (event) {
    var item = event.graphic.attr

    var inHtml = '<div class="mars-popup-titile">' + item.name + '</div><div class="mars-popup-content" >'
    if (item.type != "") {
      const type = item.type.trim()
      inHtml += "<div><label>类别</label>" + type + "</div>"
    }
    if (item.xzqh != "") {
      const xzqh = item.xzqh.trim()
      inHtml += "<div><label>区域</label>" + xzqh + "</div>"
    }
    if (item.tel != "") {
      const tel = item.tel.trim()
      inHtml += "<div><label>电话</label>" + tel + "</div>"
    }
    if (item.address != "") {
      const address = item.address.trim()
      inHtml += "<div><label>地址</label>" + address + "</div>"
    }
    inHtml += "</div>"
    return inHtml
  })

  queryGaodePOI = new mars3d.query.GaodePOI({
    // key: ['ae29a37307840c7ae4a785ac905927e0'],
  })
}

function bindViewEvent() {
  // 加载更多- 下一页
  /* $("#loadMore").click(function () {
    if (!lastQueryOptions) {
      return
    }

    lastQueryOptions.page++
    loadData(lastQueryOptions)
  }) */
}


function clearAll(noClearDraw) {
  lastQueryOptions = null

  bootstrapList = []

  poiLayer.clear()

  if (!noClearDraw) {
    drawGraphic = null
    map.graphicLayer.clear()
  }
}

function addGraphics(arr) {
  console.log("查询数据结果", arr)

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]

    var graphic = new mars3d.graphic.BillboardEntity({
      position: Cesium.Cartesian3.fromDegrees(item.lng, item.lat),
      style: {
        image: "img/marker/mark3.png",
        scale: 1,
        scaleByDistance: true,
        scaleByDistance_far: 20000,
        scaleByDistance_farValue: 0.5,
        scaleByDistance_near: 1000,
        scaleByDistance_nearValue: 1,
        clampToGround: true, // 贴地
        highlight: { type: "click", image: "img/marker/mark1.png" },
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

    item.graphic = graphic
  }
}


// 框选查询 矩形
function drawRectangle() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#00FF00",
      opacity: 0.3,
      outline: true,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    success: function (graphic) {
      drawGraphic = graphic

      console.log("矩形：", drawGraphic.toGeoJSON({ outline: true }))
    }
  })
}
// 框选查询   圆
function drawCircle() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "circle",
    style: {
      color: "#00FF00",
      opacity: 0.3,
      outline: true,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    success: function (graphic) {
      drawGraphic = graphic
      console.log("圆：", drawGraphic.toGeoJSON({ outline: true }))
    }
  })
}
// 框选查询   多边行
function drawPolygon() {
  clearAll()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#00FF00",
      opacity: 0.3,
      outline: true,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    success: function (graphic) {
      drawGraphic = graphic
      console.log("多边行：", drawGraphic.toGeoJSON())
    }
  })
}
// 清除按钮
function removeAll() {
  clearAll()
}
