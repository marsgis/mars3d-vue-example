var map
var graphicLayer
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.473861, lng: 117.225929, alt: 52974, heading: 2, pitch: -49 }
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
    type: "wall",
    style: {
      color: "#55ff33",
      opacity: 0.8,
      diffHeight: 800
    }
  })
}
function btnDrawModelClosure() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "wall",
    style: {
      color: "#55ff33",
      opacity: 0.8,
      diffHeight: 800,
      closure: true
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
  var graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.154815, 31.853495],
      [117.181255, 31.854257],
      [117.182284, 31.848255],
      [117.184748, 31.840141],
      [117.180557, 31.835556],
      [117.180023, 31.833741],
      [117.166846, 31.833737],
      [117.155531, 31.833151],
      [117.154787, 31.835978],
      [117.151994, 31.839036],
      [117.150691, 31.8416],
      [117.151215, 31.844734]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      // 动画线材质
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        image: "img/textures/fence.png",
        color: "#00ff00",
        speed: 10,
        axisY: true
      })
    }
  })
  graphicLayer.addGraphic(graphic)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(graphic)
}

function addGraphic_a2(graphicLayer) {
  var graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.208302, 31.85757],
      [117.234234, 31.858263],
      [117.234261, 31.833317],
      [117.207414, 31.834541]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      // 动画线材质
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        image: "img/textures/arrow.png",
        color: Cesium.Color.CHARTREUSE,
        repeat: new Cesium.Cartesian2(30, 1),
        speed: 20
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a3(graphicLayer) {
  // 圆形时
  var positions = mars3d.PolyUtil.getEllipseOuterPositions({
    position: Cesium.Cartesian3.fromDegrees(117.276257, 31.866351, 19.57),
    radius: 1200, // 半径
    count: 50 // 共返回(count*4)个点
  })

  var graphic = new mars3d.graphic.WallEntity({
    positions: positions,
    style: {
      diffHeight: 800,
      closure: true,
      // 动画线材质
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        image: "img/textures/fence.png",
        color: "#00ffff",
        speed: 10,
        axisY: true
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a4(graphicLayer) {
  var graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.229659, 31.908221],
      [117.240804, 31.908175]
    ],
    style: {
      diffHeight: 700,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        // 动画线材质
        image: "img/textures/fence.png",
        axisY: true,
        color: "#ff0000",
        image2: "img/textures/tanhao.png",
        color2: "#ffff00",
        speed: 10
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a5(graphicLayer) {
  var graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.153945, 31.881122, 36.4],
      [117.168352, 31.880147, 32.6],
      [117.178047, 31.885925, 29.25]
    ],
    style: {
      diffHeight: 200,
      color: "#00ffff",
      opacity: 0.4,
      label: {
        text: "我是原始的",
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
    [117.105938, 31.883825, 43.6],
    [117.125006, 31.876243, 42.6],
    [117.135525, 31.882068, 39],
    [117.151507, 31.874259, 39.7]
  ]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}

function addGraphic_a6(graphicLayer) {
  var graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.353776, 31.887406, 21.2],
      [117.321028, 31.887207, 21.3],
      [117.290341, 31.902469, 15.1]
    ],
    style: {
      diffHeight: 400,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        // 动画线材质
        image: "img/textures/arrow.png",
        color: "#00eba8",
        repeat: new Cesium.Cartesian2(20, 1),
        speed: 20
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a7(graphicLayer) {
  var graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.192113, 31.80998, 32.2],
      [117.228145, 31.792757, 26.7],
      [117.2717, 31.798397, 20.7]
    ],
    style: {
      diffHeight: 500,
      color: "#00ffff",
      opacity: 0.4,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a8(graphicLayer) {
  var graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.206138, 31.877321],
      [117.206326, 31.901436]
    ],
    style: {
      diffHeight: 400,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.Image, {
        image: getColorRampCanvas(),
        transparent: false
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 纹理图绘制
function getColorRampCanvas(elevationRamp) {
  if (elevationRamp == null) {
    // elevationRamp = { 0.0: "blue", 0.1: "cyan", 0.37: "lime", 0.54: "yellow", 1: "red" };
    // elevationRamp = { 0.0: '#000000', 0.045: '#2747E0', 0.1: '#D33B7D', 0.15: '#D32738', 0.37: '#FF9742', 0.54: '#ffd700', 1.0: '#ffffff' }
    elevationRamp = {
      0.0: "#FFEDA0",
      0.05: "#FED976",
      0.1: "#FEB24C",
      0.15: "#FD8D3C",
      0.37: "#FC4E2A",
      0.54: "#E31A1C",
      0.7: "#BD0026",
      1.0: "#800026"
    }
  }

  var canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 100

  var ctx = canvas.getContext("2d")
  var grd = ctx.createLinearGradient(0, 0, 0, 100)
  for (var key in elevationRamp) {
    grd.addColorStop(1 - Number(key), elevationRamp[key])
  }

  ctx.fillStyle = grd
  ctx.fillRect(0, 0, 1, 100) // 参数：左上角x  左上角y  宽度width  高度height
  return canvas.toDataURL()
}

// 边界墙绘制
function addGraphic_a9(graphicLayer) {
  queryAreasData().then(function (data) {
    const arr = mars3d.Util.geoJsonToGraphics(data) // 解析geojson
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      var graphic = new mars3d.graphic.WallEntity({
        positions: item.positions,
        style: {
          diffHeight: 3000,
          material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
            image: "img/textures/fence.png",
            color: "#bdf700",
            repeat: new Cesium.Cartesian2(5, 1),
            axisY: true, // 方向，true时上下，false左右
            speed: 10
          })
        },
        attr: item.attr
      })
      graphicLayer.addGraphic(graphic)
      graphic.bindTooltip("合肥欢迎您 - 火星科技")
    }
  })
}

// 边界墙绘制 - 数据获取
function queryAreasData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/areas/340100.json" })
}
