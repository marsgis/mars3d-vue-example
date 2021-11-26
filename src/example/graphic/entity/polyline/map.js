var map
var graphicLayer
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  const mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.471758, lng: 117.20494, alt: 47660, heading: 4, pitch: -45 }
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
  addGraphic_a6(graphicLayer)
  addGraphic_a7(graphicLayer)
  addGraphic_a8(graphicLayer)
  addGraphic_a9(graphicLayer)
  addGraphic_a10(graphicLayer)
  addGraphic_a11(graphicLayer)
  addGraphic_a12(graphicLayer)
  addGraphic_a13(graphicLayer)
  addGraphic_a14(graphicLayer)

  // 触发自定义事件
  graphicLayer.on(mars3d.EventType.drawCreated, function (e) {
    const graphic = e.graphic
    eventTarget.fire("editorUI-draw", { graphic })
  })
  graphicLayer.on(
    [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
    function (e) {
      const graphic = e.graphic
      eventTarget.fire("editorUI-SMR", { graphic })
    }
  )
  graphicLayer.on([mars3d.EventType.editStop, mars3d.EventType.removeGraphic], function (e) {
    eventTarget.fire("editorUI-stop")
  })
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
    type: "polyline",
    // maxPointNum: 2, //可以限定最大点数，2个点绘制后自动结束
    style: {
      color: "#55ff33",
      width: 3,
      clampToGround: false,
      label: {
        text: "我是火星科技",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
}
function btnDrawModelClosure() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "polyline",
    style: {
      color: "#ff0000",
      width: 3,
      closure: true
    }
  })
}
function btnClear() {
  graphicLayer.clear()
}
function btnExpFile() {
  // eslint-disable-next-line no-undef
  expFile(graphicLayer)
}
function btnImpFile(file) {
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
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [117.220337, 31.832987, 42.8],
      [117.220242, 31.835234, 45.6],
      [117.216263, 31.835251, 39.3],
      [117.217219, 31.819929, 35.8],
      [117.223096, 31.818342, 29.8],
      [117.249686, 31.818964, 40.1],
      [117.263171, 31.816664, 35.2],
      [117.278695, 31.816107, 35.5],
      [117.279826, 31.804185, 34.5],
      [117.286308, 31.804112, 29.2],
      [117.28621, 31.801059, 24.6]
    ],
    style: {
      width: 5,
      color: "#3388ff",

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        color: "#ff0000"
      }
    }
  })
  graphicLayer.addGraphic(graphic)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(graphic)
}

// 有衬色边线,附带的label演示，导出geojson，加载geojson
function addGraphic_a2(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [117.172852, 31.862736, 33.69],
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
  graphicLayer.addGraphic(graphic)

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
    [117.251461, 31.866011, 26.44]
  ]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}

// 箭头线
function addGraphic_a3(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [117.358187, 31.838662, 12.23],
      [117.4384, 31.819405, 11.78]
    ],
    style: {
      width: 8,
      clampToGround: true,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineArrow, {
        color: Cesium.Color.YELLOW
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 虚线
function addGraphic_a4(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [117.348938, 31.805369, 7.63],
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
  graphicLayer.addGraphic(graphic)
}

// 虚线 ，双色间隔
function addGraphic_a5(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [117.313682, 31.7416, 10.85],
      [117.311934, 31.774753, 19.71],
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
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a6(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [117.169646, 31.769171],
      [117.194579, 31.806466]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        color: "#00ff00",
        image: "img/textures/LinkPulse.png",
        speed: 3
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a7(graphicLayer) {
  const startPoint = Cesium.Cartesian3.fromDegrees(117.025419, 32.00651, 51.2)
  const endPoint = Cesium.Cartesian3.fromDegrees(117.323963, 32.050384, 33.8)
  const positions = mars3d.PolyUtil.getLinkedPointList(startPoint, endPoint, 20000, 50) // 计算曲线点

  const graphic = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      width: 8,
      // 动画线材质
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        color: "#66bd63",
        repeat: new Cesium.Cartesian2(2.0, 1.0),
        image: "img/textures/line.png",
        speed: 25
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a8(graphicLayer) {
  const startPoint = Cesium.Cartesian3.fromDegrees(117.128446, 31.943352, 42.31)
  const endPoint = Cesium.Cartesian3.fromDegrees(117.410216, 31.975375, 37.53)
  const positions = mars3d.PolyUtil.getLinkedPointList(startPoint, endPoint, 20000, 50) // 计算曲线点

  const graphic = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      width: 10,
      // 动画线材质
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        color: "#1a9850",
        image: "img/textures/lineAarrow.png",
        speed: 20,
        repeat: new Cesium.Cartesian2(5, 1)
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 演示CallbackProperty属性
function addGraphic_a9(graphicLayer) {
  const startPoint = Cesium.Cartesian3.fromDegrees(117.281455, 31.896386, 22.64)
  const endPoint = Cesium.Cartesian3.fromDegrees(117.528249, 31.921552, 43.3)
  const positions = mars3d.PolyUtil.getLinkedPointList(startPoint, endPoint, 20000, 50) // 计算曲线点

  const graphic = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlowColor, {
        color: "#00ffff",
        speed: 10,
        percent: 0.15,
        alpha: 0.2
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a10(graphicLayer) {
  const startPoint = Cesium.Cartesian3.fromDegrees(116.96385, 32.089068, 38.1)
  const endPoint = Cesium.Cartesian3.fromDegrees(117.299257, 32.137552, 40)
  const positions = mars3d.PolyUtil.getLinkedPointList(startPoint, endPoint, 20000, 50) // 计算曲线点

  const graphic = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      width: 10,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        image: "img/textures/lineClr2.png",
        speed: 10
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a11(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [117.086107, 31.848306, 40.6],
      [117.145698, 31.798726, 22.6]
    ],
    style: {
      width: 10,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        color: Cesium.Color.AQUA,
        image: "./img/textures/arrow2.png",
        repeat: new Cesium.Cartesian2(20, 1),
        speed: 30
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a12(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [117.037815, 31.799497, 39.1],
      [117.097695, 31.742135, 22.5]
    ],
    style: {
      width: 18,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        color: "#a6d96a",
        repeat: new Cesium.Cartesian2(4.0, 1.0),
        image: "img/textures/arrow_1.png",
        speed: 20
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a13(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [117.057761, 31.81993, 33.3],
      [117.121986, 31.77118, 19.3]
    ],
    style: {
      width: 5,
      clampToGround: true,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        color: Cesium.Color.CHARTREUSE,
        image: "img/textures/lineClr.png",
        speed: 25
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a14(graphicLayer) {
  const graphic = new mars3d.graphic.PolylineEntity({
    positions: [
      [117.009827, 31.776642, 42],
      [117.100274, 31.69459, 37.4]
    ],
    style: {
      width: 5,
      clampToGround: true,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        color: "rgba(89,249,255,0.8)",
        image: "img/textures/LineDataTrans.png",
        speed: 8
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}
