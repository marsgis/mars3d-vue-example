var map
var graphicLayer
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.488477, lng: 117.322386, alt: 41062, heading: 2, pitch: -49 }
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
  globalMsg("管线的绘制时容易报“Invalid array length”的未知错误，极不稳定，项目中慎用！")

  // 开始绘制
  graphicLayer.startDraw({
    type: "polylineVolume",
    // maxPointNum: 2, //可以限定最大点数，2个点绘制后自动结束
    style: {
      shape: "pipeline",
      radius: 80,
      color: "#00ffff",
      opacity: 0.9
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
  var graphic = new mars3d.graphic.PolylineVolumeEntity({
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
      shape: "pipeline",
      radius: 80,
      color: "#3388ff",
      opacity: 0.6
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(graphic)
}

function addGraphic_a2(graphicLayer) {
  var graphic = new mars3d.graphic.PolylineVolumeEntity({
    positions: [
      [117.172852, 31.862736, 33.69],
      [117.251461, 31.856011, 26.44]
    ],
    style: {
      shape: "pipeline",
      radius: 80,
      color: "#00ffff",
      opacity: 0.9,
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
    [117.251461, 31.866011, 26.44]
  ]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}

function addGraphic_a3(graphicLayer) {
  var graphic = new mars3d.graphic.PolylineVolumeEntity({
    positions: [
      [117.358187, 31.838662, 12.23],
      [117.4384, 31.819405, 11.78]
    ],
    style: {
      shape: "circle",
      radius: 80,
      cornerType: Cesium.CornerType.BEVELED,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        color: "#ff0000",
        image: "img/textures/fenceline.png",
        speed: 10,
        repeat_x: 6
      })
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addGraphic_a4(graphicLayer) {
  var graphic = new mars3d.graphic.PolylineVolumeEntity({
    positions: [
      [117.348938, 31.805369, 7.63],
      [117.429496, 31.786715, 8.41]
    ],
    style: {
      shape: "star",
      radius: 80,
      cornerType: Cesium.CornerType.MITERED,
      color: "#ffff00",
      opacity: 0.4
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addGraphic_a5(graphicLayer) {
  var graphic = new mars3d.graphic.PolylineVolumeEntity({
    positions: [
      [117.313682, 31.7416, 10.85],
      [117.311934, 31.774753, 19.71],
      [117.305473, 31.800304, 23.86]
    ],
    style: {
      shape: "pipeline",
      radius: 80,
      color: "#0000ff",
      opacity: 0.9
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}
