var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.760749, lng: 117.247058, alt: 3824, heading: 359, pitch: -33 }
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

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    const pickedItem = event.pickedObject?.data
    // let attr = event.graphic.attr
    console.log("单击了合并对象中的单个值为", pickedItem)

    // 测试修改model
    // var instance = event.pickedObject
    // var scaleMatrix = Cesium.Matrix4.fromUniformScale(1.1)
    // var modelMatrix = Cesium.Matrix4.multiply(instance.modelMatrix, scaleMatrix, new Cesium.Matrix4())
    // instance.modelMatrix = modelMatrix
  })

  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic?.attr
    if (!attr) {
      return false
    }
    return mars3d.Util.getTemplateHtml({ title: "建筑物", template: "all", attr: attr })
  })

  createCollection(1000)
}

// 合并渲染
function createCollection(count) {
  var arrData = []
  for (var j = 0; j < count; ++j) {
    arrData.push({
      position: randomPoint(),
      style: {
        heading: 270,
        scale: 30
      },
      attr: {
        name: "第" + j + "个模型"
      }
    })
  }

  var modelCombine = new mars3d.graphic.ModelCombine({
    url: "//data.mars3d.cn/gltf/mars/fengche.gltf",
    instances: arrData
  })
  graphicLayer.addGraphic(modelCombine)
}

// 取区域内的随机图标
function randomPoint() {
  var jd = random(117.184644 * 1000, 117.307163 * 1000) / 1000
  var wd = random(31.783595 * 1000, 31.87024 * 1000) / 1000
  return new mars3d.LatLngPoint(jd, wd, 50)
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function addData(count) {
  graphicLayer.clear()

  showLoading()

  var startTime = new Date().getTime()

  createCollection(count)

  hideLoading()
  var endTime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  var usedTime = (endTime - startTime) / 1000

  globalMsg("共耗时" + usedTime.toFixed(2) + "秒")
}

function clearLayer() {
  graphicLayer.clear()
}
