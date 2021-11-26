var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  // 创建Graphic图层
 graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\common\script\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)


  // 加一些演示数据
  addGraphic_a1(graphicLayer)
  addGraphic_a2(graphicLayer)
  addGraphic_a3(graphicLayer)
  addGraphic_a4(graphicLayer)
}

// 添加数据
function addData(count) {
  graphicLayer.clear()

  showLoading()

    var startTime = new Date().getTime()

     count = count * 10000

    for (var j = 0; j < count; ++j) {
      // eslint-disable-next-line no-undef
      var position = randomPoint() // 在图层处理graphicManager.js中

      var primitive = new mars3d.graphic.BillboardPrimitive({
        position: position,
        style: {
          image: "img/marker/303.png",
          scale: 0.7
        }
      })
      graphicLayer.addGraphic(primitive)
    }

    hideLoading()

    var endTime = new Date().getTime()
    // 两个时间戳相差的毫秒数
    var usedTime = (endTime - startTime) / 1000
    console.log(usedTime)

    globalMsg("共耗时" + usedTime.toFixed(2) + "秒")

}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.BillboardPrimitive({
    position: [116.244399, 30.920459, 573.6],
    style: {
      image: "img/marker/mark3.png",
      scale: 1,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1),
      label: {
        text: "我是原始点",
        font_size: 18,
        color: "#ffffff",
        pixelOffsetY: -40,
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // 图层管理的相关处理，代码在\common\script\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(primitive)

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log("转换后的geojson", geojson)
  addGeoJson(geojson, graphicLayer)
}

// 添加单个geojson为graphic，多个直接用graphicLayer.loadGeoJSON
function addGeoJson(geojson, graphicLayer) {
  var graphicCopy = mars3d.Util.geoJsonToGraphics(geojson)[0]
  delete graphicCopy.attr
  // 新的坐标
  graphicCopy.position = [116.225027, 30.883235, 1034.6]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}

function addGraphic_a2(graphicLayer) {
  var primitive = new mars3d.graphic.BillboardPrimitive({
    position: [116.39224, 30.902853],
    style: {
      image: "img/marker/di3.png",
      scale: 0.5,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      clampToGround: true,

      label: { text: "鼠标移入会放大", pixelOffsetY: -50 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        scale: 0.8
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.BillboardPrimitive({
    position: [116.340443, 30.882935, 389.88],
    style: {
      image: "img/marker/symbol1.png",
      scale: 1,
      pixelOffset: new Cesium.Cartesian2(0, -6), // 偏移量
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 500000)
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a4(graphicLayer) {
  var primitive = new mars3d.graphic.BillboardPrimitive({
    position: new mars3d.LatLngPoint(116.329102, 30.977955, 1548.6),
    style: {
      image: "img/marker/mark3.png",
      scale: 1
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}
// 清除数据
function clearLayer() {
  graphicLayer.clear()
}

// 显示隐藏 绑定popup和tooltip和右键菜单以及是否编辑
function bindShowHide(val) {
  graphicLayer.show = val
}

function bindPopup(val) {
  if (val) {
    // eslint-disable-next-line no-undef
    bindLayerPopup(graphicLayer)
  } else {
    graphicLayer.unbindPopup()
  }
}
function bindTooltip(val) {
  if (val) {
    graphicLayer.bindTooltip("我是layer上绑定的Tooltip")
  } else {
    graphicLayer.unbindTooltip()
  }
}
function bindRightMenu(val) {
  if (val) {
    // eslint-disable-next-line no-undef
    bindLayerContextMenu(graphicLayer)
  } else {
    graphicLayer.unbindContextMenu(true)
  }
}
