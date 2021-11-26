// 地图对象
var map
// 构造bloom效果对象
var bloomEffect

// 事件对象，用于抛出事件给vue
var eventTarget = new mars3d.BaseClass()

// 构造地图主方法【必须】
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.823874, lng: 117.223976, alt: 3509, heading: 0, pitch: -90 }
    },
    control: {
      baseLayerPicker: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 构造bloom效果 用于滑动条测试
  bloomEffect = new mars3d.effect.BloomEffect()
  map.addEffect(bloomEffect)

  eventTarget.fire("test", 123)
}

// 绘制矩形（演示map.js与index.vue的交互）
function drawExtent(extent) {
  map.graphicLayer.clear()
  // 绘制矩形
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fill: true,
      color: "rgba(255,255,0,0.2)",
      outline: true,
      outlineWidth: 2,
      outlineColor: "rgba(255,255,0,1)"
    },
    success: function (graphic) {
      var rectangle = mars3d.PolyUtil.formatRectangle(graphic._rectangle_draw)
      eventTarget.fire("drawExtent", { extent: JSON.stringify(rectangle) })// 抛出事件，可以vue中去监听事件
    }
  })
}

// 是否运行地图鼠标交互
function enableMapMouseController(value) {
  map.setSceneOptions({
    cameraController: {
      enableZoom: value,
      enableTranslate: value,
      enableRotate: value,
      enableTilt: value
     }
  })
}

// 调整亮度 （演示滑动条）
function updateBrightness(val) {
  bloomEffect.brightness = val
}

// 调整对比度 （演示滑动条）
function updateContrast(val) {
  bloomEffect.contrast = val
}
