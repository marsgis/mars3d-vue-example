var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    control: {
      mouseDownView: {
        rightDrag: true
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)



  // 限定pitch角度： max ，min(默认-90)
  map.setPitchRange(-10)
}

function shadingMaterials(val) {
  if (val === 1) {
    // 设置鼠标操作习惯,更换中键和右键
    map.changeMouseModel(true)
  } else {
    map.changeMouseModel(false)
  }
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
