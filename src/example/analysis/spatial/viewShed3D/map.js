var map
var arrViewField = []

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 28.440942, lng: 119.482189, alt: 191, heading: 227, pitch: -28 },
      fxaa: true, // 不开启抗锯齿，可视域会闪烁
      globe: {
        depthTestAgainstTerrain: true // 不加无法投射到地形上
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 添加参考三维模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 11.5 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    dynamicScreenSpaceError: true,
    cullWithChildrenBounds: false,
    luminanceAtZenith: 0.6
  })
  map.addLayer(tiles3dLayer)
}

// 添加可视域
function addPoint(horizontalAngle, verticalAngle, distance, showFrustum) {
  var thisViewField = new mars3d.thing.ViewShed3D({
    horizontalAngle: horizontalAngle,
    verticalAngle: verticalAngle,
    distance: distance,
    showFrustum: showFrustum,
    offsetHeight: 1.5 // 加人的身高等因素，略微抬高一些
  })
  map.addThing(thisViewField)

  arrViewField.push(thisViewField)
}

function clear() {
  for (var i = 0, len = arrViewField.length; i < len; i++) {
    map.removeThing(arrViewField[i], true)
  }
  arrViewField = []
}

// 视椎线框
function chkDebugFrustum(showFrustum) {
  for (var i = 0, len = arrViewField.length; i < len; i++) {
    arrViewField[i].showFrustum = showFrustum
  }
}

// 视角距离
function updateParams(horizontalAngle, verticalAngle, distance) {
  if (arrViewField.length === 0) {
    return
  }

  var thisViewField = arrViewField[arrViewField.length - 1]
  if (!thisViewField) {
  }
  thisViewField.distance = distance
  thisViewField.horizontalAngle = horizontalAngle
  thisViewField.verticalAngle = verticalAngle
}
