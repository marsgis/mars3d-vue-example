
var map
var queryMapserver
var geoJsonLayer

var drawGraphic
var $table

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.79536, lng: 117.255222, alt: 16294, heading: 358, pitch: -76 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  queryMapserver = new mars3d.query.QueryGeoServer({
    url: "//server.mars3d.cn/geoserver/mars/wfs",
    layer: "mars:hfjy"
  })

  // 用于显示查询结果（geojson）的图层
  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    symbol: {
      styleOptions: {
        image: "img/marker/mark3.png",
        scale: 1,
        scaleByDistance: true,
        scaleByDistance_far: 20000,
        scaleByDistance_farValue: 0.5,
        scaleByDistance_near: 1000,
        scaleByDistance_nearValue: 1,
        highlight: { type: "click", image: "img/marker/mark1.png" },
        clampToGround: true,
        label: {
          text: "{项目名称}",
          font_size: 25,
          color: "#ffffff",
          outline: true,
          outlineColor: "#000000",
          pixelOffsetY: -25,
          scaleByDistance: true,
          scaleByDistance_far: 80000,
          scaleByDistance_farValue: 0.5,
          scaleByDistance_near: 1000,
          scaleByDistance_nearValue: 1,
          distanceDisplayCondition: true,
          distanceDisplayCondition_far: 80000,
          distanceDisplayCondition_near: 0
        }
      }
    },
    popup: "all"
  })
  map.addLayer(geoJsonLayer)


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

function clearAll(noClearDraw) {
  if (!noClearDraw) {
    drawGraphic = null
    map.graphicLayer.clear()
  }
  geoJsonLayer.clear()
}
