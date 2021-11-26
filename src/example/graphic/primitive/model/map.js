var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      fxaa: true,
      center: { lat: 30.857163, lng: 116.345129, alt: 926, heading: 33, pitch: -34 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  map.basemap = 2017 // 蓝色底图

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)
  // 加一些演示数据
  addGraphic_a1(graphicLayer)
  addGraphic_a2(graphicLayer)
  addGraphic_a3(graphicLayer)
}

function addData(count) {
  graphicLayer.clear()

  map.setCameraView({ lat: 30.648084, lng: 116.747173, alt: 29041, heading: 317, pitch: -32 })

  showLoading()

  var startTime = new Date().getTime()

  createModels(count)

  hideLoading()
  var endTime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  var usedTime = (endTime - startTime) / 1000
  console.log(usedTime)

  globalMsg("共耗时" + usedTime.toFixed(2) + "秒")
}

function createModels(count) {
  for (var j = 0; j < count; ++j) {
    // eslint-disable-next-line no-undef
    var position = randomPoint()

    var primitive = new mars3d.graphic.ModelPrimitive({
      position: position,
      style: {
        url: "//data.mars3d.cn/gltf/mars/feiji.glb",
        scale: 1,
        minimumPixelSize: 50,

        distanceDisplayCondition: true,
        distanceDisplayCondition_near: 0,
        distanceDisplayCondition_far: 90000,
        distanceDisplayPoint: {
          // 当视角距离超过一定距离(distanceDisplayCondition_far定义的) 后显示为点对象的样式
          color: "#00ff00",
          pixelSize: 5
        }
      },
      tooltip: "第" + j + "个"
    })
    graphicLayer.addGraphic(primitive)
  }
}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.ModelPrimitive({
    position: [116.346929, 30.861947, 401.34],
    style: {
      url: "//data.mars3d.cn/gltf/mars/firedrill/xiaofangyuan-run.gltf",
      scale: 20,
      minimumPixelSize: 50,
      heading: 90,

      distanceDisplayCondition: true,
      distanceDisplayCondition_near: 0,
      distanceDisplayCondition_far: 10000,
      distanceDisplayPoint: {
        // 当视角距离超过一定距离(distanceDisplayCondition_far定义的) 后显示为点对象的样式
        color: "#00ff00",
        pixelSize: 8
      },

      label: {
        text: "我是模型",
        font_size: 18,
        color: "#ffffff",
        pixelOffsetY: -50,
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 10000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // 演示个性化处理graphic，代码在\js\graphicManager.js
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
  graphicCopy.position = [116.348587, 30.859472, 373.8]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}

function addGraphic_a2(graphicLayer) {
  var primitive = new mars3d.graphic.ModelPrimitive({
    position: [116.35104, 30.86225, 374.4],
    style: {
      url: "//data.mars3d.cn/gltf/mars/fengche.gltf",
      colorBlendMode: Cesium.ColorBlendMode.MIX,
      heading: 270,
      scale: 30,
      minimumPixelSize: 100,
      runAnimations: false, // 关闭启动动画

      distanceDisplayCondition: true,
      distanceDisplayCondition_near: 0,
      distanceDisplayCondition_far: 9000,
      distanceDisplayBillboard: {
        // 当视角距离超过一定距离(distanceDisplayCondition_far定义的) 后显示为图标对象的样式
        image: "img/marker/303.png",
        scale: 1
      },

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        silhouette: true,
        silhouetteColor: "#00ffff",
        silhouetteSize: 3
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // 手动按需启动动画
  primitive.on(mars3d.EventType.load, function (event) {
    const model = event.model

    // 参考API: http://mars3d.cn/api/cesium/ModelAnimationCollection.html
    model.activeAnimations.addAll({
      multiplier: 0.5, // Play at half-speed
      loop: Cesium.ModelAnimationLoop.REPEAT // Loop the animations
    })

    // var animation = model.activeAnimations.add({
    //   index: 0, //第一个叶子
    //   multiplier: 0.5, // Play at double speed
    //   loop: Cesium.ModelAnimationLoop.REPEAT, // Loop the animation
    // });

    // animation.start.addEventListener(function (model, animation) {
    //   console.log("Animation started: " + animation.name);
    // });
    // animation.update.addEventListener(function (model, animation, time) {
    //   console.log("Animation updated: " + animation.name + ". glTF animation time: " + time);
    // });
    // animation.stop.addEventListener(function (model, animation) {
    //   console.log("Animation stopped: " + animation.name);
    // });
  })
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.ModelPrimitive({
    position: [116.349194, 30.864603, 376.58],
    style: {
      url: "//data.mars3d.cn/gltf/mars/qiche.gltf",
      scale: 0.5,
      minimumPixelSize: 50,

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        silhouette: true,
        silhouetteColor: "#ff0000",
        silhouetteSize: 4
      }
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
