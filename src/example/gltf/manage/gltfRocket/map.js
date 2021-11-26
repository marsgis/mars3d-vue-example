var map
var eventTarget = new mars3d.BaseClass()
// 汉化属性名称
var objNames = {
  // 属性分组
  LaunchVehicle: "火箭整体",
  Fairing: "整流罩",

  UpperStage: "二级部分",
  UpperStageEngines: "二级发动机",
  UpperStageFlames: "二级火焰",

  InterstageAdapter: "级间段",

  Booster: "一级部分",
  BoosterEngines: "一级发动机",
  BoosterFlames: "一级火焰",

  SRBs: "助推器",
  SRBFlames: "助推器火焰",

  // 属性
  MoveX: "X方向移动",
  MoveY: "Y方向移动",
  MoveZ: "Z方向移动",
  Yaw: "Yaw角度",
  Pitch: "Pitch角度",
  Roll: "Roll角度",
  Size: "大小",
  Separate: "分离",
  Drop: "下降",
  Open: "打开",
  Rotate: "旋转"
}

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true

  // 绑定到UI界面控制参数
  var viewModel = {
    articulations: [],
    stages: [],
    selectedArticulation: undefined
  }

  // 创建Graphic图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  var primitive = new mars3d.graphic.ModelPrimitive({
    position: [113.693, 31.243, 220000],
    style: {
      url: "//data.mars3d.cn/gltf/sample/launchvehicle/launchvehicle.glb",
      scale: 20,
      minimumPixelSize: 128,
      heading: 0
    }
  })
  graphicLayer.addGraphic(primitive)

  // gltf模型加载完成事件
  primitive.on(mars3d.EventType.load, (event) => {
    var model = event.model

    // 缩放区域到模型所在位置
    var controller = map.scene.screenSpaceCameraController
    var r = 2.0 * Math.max(model.boundingSphere.radius, map.camera.frustum.near)
    controller.minimumZoomDistance = r * 0.2

    var center = Cesium.Matrix4.multiplyByPoint(model.modelMatrix, Cesium.Cartesian3.ZERO, new Cesium.Cartesian3())
    var heading = Cesium.Math.toRadians(0.0)
    var pitch = Cesium.Math.toRadians(-10.0)
    map.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, r * 1.5))

    // 设置参数效果
    model.setArticulationStage("LaunchVehicle Pitch", -60) // 火箭整体Pitch角度
    model.setArticulationStage("SRBFlames Size", 1) // 助推器火焰大小
    model.applyArticulations()

    // 递归取参数
    viewModel.articulations = Object.keys(model._runtime.articulationsByName).map(function (articulationName) {
      var name = objNames[articulationName] || articulationName
      // 属性分组
      return {
        name: name,
        stages: model._runtime.articulationsByName[articulationName].stages.map(function (stage) {
          // 属性
          var stageModel = {
            name: objNames[stage.name] || stage.name,
            minimum: stage.minimumValue,
            maximum: stage.maximumValue,
            current: stage.currentValue
          }
          Cesium.knockout.track(stageModel)
          Cesium.knockout.defineProperty(stageModel, "currentText", {
            get: function () {
              return stageModel.current.toString()
            },
            set: function (value) {
              // coerce values to number
              stageModel.current = +value
            }
          })
          Cesium.knockout.getObservable(stageModel, "current").subscribe(function (newValue) {
            var _name = articulationName + " " + stage.name
            var _val = Number(stageModel.current)

            model.setArticulationStage(_name, _val)
            model.applyArticulations()

            console.log(
              "model.setArticulationStage('" + _name + "', " + _val + "); //" + (objNames[articulationName] || "") + (objNames[stage.name] || "")
            )
          })

          return stageModel
        })
      }
    })
    viewModel.selectedArticulation = viewModel.articulations[0]
    eventTarget.fire("loadOver", viewModel)
  })
}
