var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  const mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.565291, lng: 117.294375, alt: 28796, heading: 2, pitch: -49 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)

  // 加一些演示数据
  addGraphic_a1(graphicLayer)
  addGraphic_a2(graphicLayer)
  addGraphic_a3(graphicLayer)
  addGraphic_a4(graphicLayer)
  addGraphic_a5(graphicLayer)
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
function bindEdit(val) {
  graphicLayer.hasEdit = val
}

// 按钮事件
function btnDrawModel() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "curve",
    // maxPointNum: 2, //可以限定最大点数，2个点绘制后自动结束
    style: {
      color: "#55ff33",
      width: 3,
      clampToGround: false
    }
  })
}
function btnClear() {
  graphicLayer.clear()
}
function btnExpFile() {
  // 代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  expFile(graphicLayer)
}
function btnImpFile(file) {
  // 代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  impFile(graphicLayer, file)
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

function addGraphic_a1(graphicLayer) {
  const graphic = new mars3d.graphic.CurveEntity({
    positions: [
      [117.220337, 31.832987, 42.8],
      [117.223096, 31.818342, 29.8],
      [117.249686, 31.818964, 40.1],
      [117.286308, 31.804112, 29.2],
      [117.28621, 31.801059, 24.6]
    ],
    style: {
      width: 5,
      color: "#3388ff"
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(graphic)
}

// 有衬色边线,附带的label演示，导出geojson，加载geojson
function addGraphic_a2(graphicLayer) {
  const graphic = new mars3d.graphic.CurveEntity({
    positions: [
      [117.172852, 31.862736, 33.69],
      [117.211204, 31.876064, 31.9],
      [117.251461, 31.856011, 26.44]
    ],
    style: {
      width: 6,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineOutline, {
        color: Cesium.Color.ORANGE,
        outlineWidth: 2,
        outlineColor: Cesium.Color.BLACK
      }),
      label: {
        text: "我是原始线",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // graphic转geojson
  var geojson = graphic.toGeoJSON()
  console.log("转换后的geojson", geojson)
  addGeoJson(geojson, graphicLayer)
}

// 添加单个geojson为graphic，多个直接用graphicLayer.loadGeoJSON
function addGeoJson(geojson, graphicLayer) {
  var graphicCopy = mars3d.Util.geoJsonToGraphics(geojson)[0]
  delete graphicCopy.attr
  // 新的坐标
  graphicCopy.positions = [
    [117.172852, 31.872736, 33.69],
    [117.21087, 31.891337, 28.7],
    [117.251461, 31.866011, 26.44]
  ]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}

function addGraphic_a3(graphicLayer) {
  const graphic = new mars3d.graphic.CurveEntity({
    positions: [
      [117.169646, 31.769171],
      [117.164564, 31.789748],
      [117.194579, 31.806466]
    ],
    style: {
      width: 5,
      color: Cesium.Color.CYAN,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        color: "#ff0000"
      }
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 虚线
function addGraphic_a4(graphicLayer) {
  const graphic = new mars3d.graphic.CurveEntity({
    positions: [
      [117.348938, 31.805369, 7.63],
      [117.391807, 31.836325, 10],
      [117.429496, 31.786715, 8.41]
    ],
    style: {
      width: 5,
      clampToGround: true,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineDash, {
        color: Cesium.Color.CYAN,
        dashLength: 8.0
      })
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 虚线 ，双色间隔
function addGraphic_a5(graphicLayer) {
  const graphic = new mars3d.graphic.CurveEntity({
    positions: [
      [117.313682, 31.7416, 10.85],
      [117.287836, 31.760026, 17],
      [117.312816, 31.780792, 10.6],
      [117.305473, 31.800304, 23.86]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineDash, {
        color: Cesium.Color.BLUE,
        gapColor: Cesium.Color.YELLOW,
        dashPattern: parseInt("1111000000", 2)
      })
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}
