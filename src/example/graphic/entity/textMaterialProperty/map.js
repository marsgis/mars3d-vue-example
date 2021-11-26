
var map
var graphicLayer
var textMaterialProperty

var rotation = 0
function getRotationValue() {
  return rotation
}

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 29.792325, lng: 121.480055, alt: 146, heading: 198, pitch: -54 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 加个模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "水利闸门",
    url: "//data.mars3d.cn/3dtiles/max-fsdzm/tileset.json",
    position: { alt: 15.2 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tiles3dLayer)

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer({
    hasEdit: true
  })
  map.addLayer(graphicLayer)

  // 材质对象
  textMaterialProperty = mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.Text, {
    text: "火星科技Mars3D平台",
    fillColor: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
    stroke: true,
    strokeWidth: 2,
    strokeColor: new Cesium.Color(1.0, 1.0, 1.0, 0.8)
  })



  // 加一些演示数据
  addGraphic_01(graphicLayer)
  addGraphic_02(graphicLayer)
  addGraphic_03(graphicLayer)
  addGraphic_04(graphicLayer)
}

// wall文字 entity方式
function addGraphic_01(graphicLayer) {
  var wallEntity = new mars3d.graphic.WallEntity({
    positions: [
      [121.479914, 29.791249, 32],
      [121.479694, 29.791303, 32]
    ],
    style: {
      diffHeight: 5,

      materialType: mars3d.MaterialType.Text,
      text: "水利闸门",
      font_family: "楷体",
      fillColor: "#00ffff"
    }
  })

  graphicLayer.addGraphic(wallEntity)
}

//  wall文字  primitive方式添加
function addGraphic_02(graphicLayer) {
  var primitive = new mars3d.graphic.WallEntity({
    positions: [
      [121.479343, 29.791419, 35],
      [121.479197, 29.791474, 35]
    ],
    style: {
      diffHeight: 5,
      materialType: mars3d.MaterialType.Text,
      text: "   火星科技",
      font_size: 70,
      fillColor: "#3388cc",
      outlineWidth: 4,

      onCustomCanvas: onCustomCanvas // 对Canvas做自定义处理
    }
  })
  graphicLayer.addGraphic(primitive)
}

// 对Canvas做自定义处理,需要返回Promise
function onCustomCanvas(canvas, material) {
  const cWidth = canvas.width
  const cHeight = canvas.height
  const context = canvas.getContext("2d")

  return Cesium.Resource.createIfNeeded("./img/country/zg.png")
    .fetchImage()
    .then((image) => {
      context.drawImage(image, 5, 5, 20, 20)

      return canvas
    })
}

// rectangle贴地矩形  3dtiles路面文字
function addGraphic_03(graphicLayer) {
  var rectangleEntity = new mars3d.graphic.RectangleEntity({
    name: "路面文字",
    positions: [
      [121.479989, 29.791162],
      [121.480114, 29.791201]
    ],
    style: {
      classificationType: Cesium.ClassificationType.BOTH,
      clampToGround: true,

      materialType: mars3d.MaterialType.Text,
      text: "火星路",
      font_size: 50,
      font_family: "楷体",
      fillColor: "#00ff00",
      stroke: true,
      strokeWidth: 2,
      strokeColor: "#ffffff",
      rotationDegree: 163,

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        type: mars3d.EventType.click,
        stroke: true,
        strokeColor: "#ff0000",
        strokeWidth: 4
      }
    }
  })
  graphicLayer.addGraphic(rectangleEntity)
}

function addGraphic_04(graphicLayer) {
  var rectangleEntity = new mars3d.graphic.RectangleEntity({
    positions: [
      [121.479593, 29.791632, 13],
      [121.480136, 29.79169, 13]
    ],
    style: {
      material: textMaterialProperty,
      rotationDegree: 163
    }
  })
  graphicLayer.addGraphic(rectangleEntity)
}

function btnDrawWall() {
  graphicLayer.startDraw({
    type: "wall",
    maxPointNum: 2,
    style: {
      font_size: 50,
      color: "#ffff00",
      opacity: 0.2,
      outline: false,
      diffHeight: 5,
      material: textMaterialProperty
    },
    success: function (graphic) {
      console.log(JSON.stringify(graphic.coordinates)) // 打印下边界
    }
  })
}

function btnDrawRectangle() {
  graphicLayer.startDraw({
    type: "rectangle",
    style: {
      material: textMaterialProperty,
      rotation: new Cesium.CallbackProperty(getRotationValue, false),
      stRotation: new Cesium.CallbackProperty(getRotationValue, false),
      clampToGround: true
    },
    success: function (graphic) {
      console.log(JSON.stringify(graphic.coordinates)) // 打印下边界
    }
  })
}

// 根据中心点来计算矩形
function btnDrawPoint() {
  graphicLayer.startDraw({
    type: "point",
    style: {
      color: "#ffff00",
      opacity: 0.2,
      clampToGround: true
    },
    success: function (graphic) {
      var position = graphic.positionShow
      graphic.remove()

      var positions = mars3d.PolyUtil.getRectPositionsByCenter({
        center: position,
        width: 60,
        height: 10
      })
      console.log(positions)

      var rectangleEntity = new mars3d.graphic.RectangleEntity({
        positions: positions,
        style: {
          material: textMaterialProperty,
          rotation: new Cesium.CallbackProperty(getRotationValue, false),
          stRotation: new Cesium.CallbackProperty(getRotationValue, false),
          clampToGround: true
        }
      })
      graphicLayer.addGraphic(rectangleEntity)
    }
  })
}

function changeSlider(val) {
  if (val) {
    rotation = Cesium.Math.toRadians(val)
  }
}

function btnOK(val) {
  console.log(val)
  textMaterialProperty.text = val
}

function btnRemoveAll() {
  graphicLayer.clear()
}
