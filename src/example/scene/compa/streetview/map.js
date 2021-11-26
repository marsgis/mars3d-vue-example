var map
var tileLayer
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.676218, lng: 117.251248, alt: 27740, heading: 1, pitch: -63 }
    },
    control: {
      compass: { bottom: "320px", right: "5px" }
    }
  })
  creatDom()

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  map.basemap = "腾讯电子"

  // 矢量图层数据
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 叠加的图层
  tileLayer = new mars3d.layer.BaiduLayer({
    layer: "streetview",
    show: false
  })
  map.addLayer(tileLayer)

  splitScreen()

}

function chooseStree() {
  if (markerStreet) {
    graphicLayer.removeGraphic(markerStreet, true)
    markerStreet = null
  }

  map.off(mars3d.EventType.click, onClickMap)
  tileLayer.show = false

  tileLayer.show = true

  if (typeView != 0) {
    viewTo3d()
  }


  graphicLayer.startDraw({
    type: "billboard",
    style: {
      image: "img/marker/street.png",
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      label: {
        font_size: 30,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -50
      }
    },
    success: function (graphic) {
      markerStreet = graphic
    }
  })

  map.on(mars3d.EventType.click, onClickMap)
}

function creatDom() {
  const divDom = mars3d.DomUtil.create("div", "", document.body)
  divDom.setAttribute("id", "centerDiv")

  const iframDom = mars3d.DomUtil.create("iframe", "stree", divDom)
  iframDom.setAttribute("id", "streeScape")
  iframDom.setAttribute("src", "example/scene/compa/streetview/baidu.html?lng=117.215219&lat=31.861592")
}

var typeView = 0

// 3d显示
function viewTo3d() {
  typeView = 0
  var dom2d = document.getElementById("centerDiv")
  var dom3d = document.getElementById("centerDiv3D")
  dom3d.style.display = "block"
  dom3d.style.width = "100%"
  dom3d.style.left = "0"

  dom2d.style.display = "none"

}

// // 街景显示
function streetscape() {
  typeView = 1
  var dom2d = document.getElementById("centerDiv")
  var dom3d = document.getElementById("centerDiv3D")
  dom3d.style.display = "none"
  dom2d.style.width = "100%"
  dom2d.style.display = "block"

}

// 分屏显示
function splitScreen() {
  typeView = 2
  var dom2d = document.getElementById("centerDiv")
  var dom3d = document.getElementById("centerDiv3D")

  dom2d.style.width = "50%"
  dom3d.style.width = "50%"
  dom3d.style.left = "50%"
  dom2d.style.display = "block"
  dom3d.style.display = "block"
}

function onClickMap(event) {
  const point = mars3d.LatLngPoint.fromCartesian(event.cartesian)

  const rightFrame = document.getElementById("streeScape")
  rightFrame.contentWindow.setPosition(point)

  if (typeView == 0) {
    streetscape()
  }
}

let markerStreet
function updateMarker(position) {
  if (markerStreet) {
    markerStreet.position = position
  } else {
    markerStreet = new mars3d.graphic.BillboardEntity({
      position: position,
      style: {
        image: "img/marker/street.png",
        scale: 1,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        clampToGround: true
      }
    })
    graphicLayer.addGraphic(markerStreet)
  }

  map.flyToGraphic(markerStreet, { radius: 800 })
}
