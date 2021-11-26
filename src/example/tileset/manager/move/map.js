var map
var eventTarget = new mars3d.BaseClass()
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true
  eventTarget.fire("loadOk")
}

var x = 0
var y = 0
var z = 0
var step = 1
let tiles3dLayer

function removeLayer() {
  if (tiles3dLayer) {
    map.basemap = 2021 // 切换到默认卫星底图

    map.removeLayer(tiles3dLayer, true)
    tiles3dLayer = null
  }
}

// 是否有地形
function chkHasTerrain(isStkTerrain) {
  map.hasTerrain = isStkTerrain
}

// 深度检测
function chkTestTerrain(val) {
  map.scene.globe.depthTestAgainstTerrain = val
}

// 当前页面业务相关
function showModel(modelUrl) {
  removeLayer()
  if (!modelUrl) {
    return
  }

  tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: modelUrl,
    maximumScreenSpaceError: 1,

    // 高亮时的样式
    highlight: {
      type: mars3d.EventType.click, // 默认为鼠标移入高亮，也可以指定click单击高亮
      color: "#00FF00"
    },
    popup: "all",
    flyTo: true
  })
  map.addLayer(tiles3dLayer)

  // 加载完成事件
  tiles3dLayer.on(mars3d.EventType.load, function (event) {
    console.log("模型加载完成", event)
  })
}

var result
function change(type) {
  switch (type) {
    default:
    case 0:
      x += step
      break
    case 1:
      x -= step
      break
    case 2:
      y += step
      break
    case 3:
      y -= step
      break
    case 4:
      z += step
      break
    case 5:
      z -= step
      break
  }

  result = "x:" + x.toFixed(1) + " y:" + y.toFixed(1) + " z:" + z.toFixed(1)
  // 创建平移矩阵方法二
  var translation = Cesium.Cartesian3.fromArray([x, y, z])
  tiles3dLayer.tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
}
