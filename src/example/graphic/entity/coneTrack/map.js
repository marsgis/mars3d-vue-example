
var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.808137, lng: 116.411699, alt: 23221, heading: 347, pitch: -40 },
      clock: {
        currentTime: "2021-07-01 10:45:00"
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)

  // 加一些演示数据
  addGraphic_01(graphicLayer)
  addGraphic_02(graphicLayer)
  addGraphic_03(graphicLayer)
  addGraphic_04(graphicLayer)
}

// 静态的位置
function addGraphic_01(graphicLayer) {
  var coneTrack = new mars3d.graphic.ConeTrack({
    position: [116.327881, 31.018378, 5000],
    targetPosition: [116.311135, 30.998408, 1264.9], // 可选
    style: {
      slices: 4, // 四凌锥
      // length: 4000,//targetPosition存在时无需传
      angle: 5, // 半场角度
      color: "#ff0000",
      opacity: 0.3,

      label: { text: "鼠标移入会高亮" },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    }
  })
  graphicLayer.addGraphic(coneTrack)
}

// 静态的位置
var coneTrack
function addGraphic_02(graphicLayer) {
  const position = [116.28782, 30.971557, 5000]
  // 加个飞机
  var primitive = new mars3d.graphic.ModelPrimitive({
    position: position,
    style: {
      url: "//data.mars3d.cn/gltf/mars/feiji.glb",
      scale: 1,
      minimumPixelSize: 50
    }
  })
  graphicLayer.addGraphic(primitive)

  // 圆锥追踪体
  coneTrack = new mars3d.graphic.ConeTrack({
    position: position,
    // targetPosition: [116.317411, 30.972581, 1439.7], //可选
    style: {
      length: 4000,
      angle: 5, // 半场角度
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.CircleWave, {
        duration: 2000,
        color: "#02ff00"
      })
    }
  })
  graphicLayer.addGraphic(coneTrack)
}

// 修改飞机追踪的目标点
function btnSelPoint() {
  map.graphicLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 8,
      color: "#ffff00"
    },
    success: function (graphic) {
      var position = graphic.positionShow
      map.graphicLayer.clear()

      coneTrack.targetPosition = position
    }
  })
}

// 动态的位置
function addGraphic_03(graphicLayer) {
  const propertyFJ = getSampledPositionProperty([
    [116.364307, 31.03778, 5000],
    [116.42794, 31.064786, 5000],
    [116.474002, 31.003825, 5000],
    [116.432393, 30.951142, 5000],
    [116.368497, 30.969006, 5000],
    [116.364307, 31.03778, 5000]
  ])

  // 飞机
  var graphicModel = new mars3d.graphic.ModelEntity({
    position: propertyFJ,
    orientation: new Cesium.VelocityOrientationProperty(propertyFJ),
    style: {
      url: "//data.mars3d.cn/gltf/mars/zhanji.glb",
      scale: 0.3,
      minimumPixelSize: 30
    }
  })
  graphicLayer.addGraphic(graphicModel)

  // 汽车
  const propertyQC = getSampledPositionProperty([
    [116.391268, 30.956038, 827.2],
    [116.37934, 30.980835, 898.1],
    [116.382514, 30.999031, 921.5],
    [116.40338, 31.009258, 1214],
    [116.412254, 31.021635, 1224.1],
    [116.432328, 31.045508, 804.3]
  ])
  var graphicQC = new mars3d.graphic.PathEntity({
    position: propertyQC,
    orientation: new Cesium.VelocityOrientationProperty(propertyQC),
    style: {
      width: 1,
      color: "#ffff00",
      opacity: 0.4,
      leadTime: 0
    },
    model: {
      url: "//data.mars3d.cn/gltf/mars/qiche.gltf",
      scale: 0.5,
      minimumPixelSize: 50
    }
  })
  graphicLayer.addGraphic(graphicQC)

  // 圆锥追踪体（动态position=>动态targetPosition）
  var coneTrack = new mars3d.graphic.ConeTrack({
    position: propertyFJ,
    targetPosition: propertyQC,
    style: {
      // length: 4000, //targetPosition存在时无需传
      angle: 1, // 半场角度
      color: "#00ffff",
      opacity: 0.4
    }
  })
  graphicLayer.addGraphic(coneTrack)
}

// 计算演示的SampledPositionProperty轨迹
function getSampledPositionProperty(points) {
  const property = new Cesium.SampledPositionProperty()

  const start = map.clock.currentTime
  const positions = mars3d.LatLngArray.toCartesians(points)
  for (let i = 0; i < positions.length; i++) {
    const time = Cesium.JulianDate.addSeconds(start, i * 20, new Cesium.JulianDate())
    const position = positions[i]
    property.addSample(time, position)
  }
  return property
}

//
function addGraphic_04(graphicLayer) {
  var model = new mars3d.graphic.ModelEntity({
    name: "地面站模型",
    position: [117.170264, 31.840312, 258],
    style: {
      url: "//data.mars3d.cn/gltf/mars/leida.glb",
      scale: 1,
      minimumPixelSize: 40,
      clampToGround: true
    }
  })
  graphicLayer.addGraphic(model)

  // 卫星
  var weixin = new mars3d.graphic.Satellite({
    name: "GAOFEN 1",
    tle1: "1 39150U 13018A   21180.50843864  .00000088  00000-0  19781-4 0  9997",
    tle2: "2 39150  97.8300 252.9072 0018449 344.7422  15.3253 14.76581022440650",
    model: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      scale: 1,
      minimumPixelSize: 90,
      autoHeading: true,
      show: true
    },
    path: { color: "#00ff00", opacity: 0.5, width: 1, show: true }
  })
  graphicLayer.addGraphic(weixin)

  var coneTrack = new mars3d.graphic.ConeTrack({
    position: model.position,
    targetPosition: weixin.property,
    style: {
      angle: 1, // 半场角度
      color: "#ff0000",
      opacity: 0.4
    }
  })
  graphicLayer.addGraphic(coneTrack)
}
