var map
var tileLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 24.336939, lng: 108.949729, alt: 14990362, heading: 0, pitch: -90 }
    },
    control: {
      baseLayerPicker: false,
      infoBox: false
    },
    basemaps: [
      {
        name: "单张图片",
        icon: "img/basemaps/bingmap.png",
        type: "image",
        url: "//data.mars3d.cn/file/img/world/world.jpg",
        show: true
      }
    ],
    layers: [
      {
        name: "瓦片测试信息",
        type: "tileinfo",
        color: "rgba(255,255,0,0.6)",
        show: true
      }
    ]
  })
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

}

// 加载图层
function createTileLayer(options) {
  const params = {
    type: options.type, // 类型
    url: options.url, // 图层url
    // subdomains: $("#txtSubdomains").val(), // url子域
    layer: options.txtLayer, // 图层名

    crs: options.CRS, // 坐标系信息
    chinaCRS: options.chinaCRS, // 国内坐标系

    minimumLevel: options.minLoadLevel, // 最低层级
    maximumLevel: options.maxLoadLevel, // 最高层级
    minimumTerrainLevel: options.minShowLevel, // 展示影像图层的最小地形细节级别
    maximumTerrainLevel: options.maxShowLevel, // 展示影像图层的最大地形细节级别
    brightness: options.brightness, // 亮度
    opacity: options.opacity // 透明度
  }
  // 新增图层
  if (params.error) {
    globalMsg(params.msg)
    return
  }
  if (params.minimumLevel > params.maximumLevel) {
    return { error: true, msg: "最低层级的值不得高于最高层级" }
  }
  if (params.minimumTerrainLevel > params.maximumTerrainLevel) {
    return { error: true, msg: "最小细节的值不得高于最大细节" }
  }

  // 移除原有图层
  removeLayer()
  // 绘制区域
  const rectangle = options.rectangle
  if (rectangle) {
    params.rectangle = JSON.parse(rectangle)
  }

  // 代理被选中
  if (params.chkProxy) {
    params.proxy = "//server.mars3d.cn/proxy/"
  } else {
    params.proxy = null
  }

  console.log("图层参数为", params)

  tileLayer = mars3d.LayerUtil.create({
    ...params,
    highlight: {
      clampToGround: true,
      fill: true,
      color: "#2deaf7",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#e000d9",
      outlineOpacity: 1.0
    },
    popup: "all",
    flyTo: true
  })
  map.addLayer(tileLayer)
}
// 移除并销毁图层
function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}

// 数据更新
function dataUpdate(params) {
  if (tileLayer) {
    params.flyTo = false
    createTileLayer(params)
  }
}

// 绘制和清除区域
function btnDrawExtent(options) {
  if (tileLayer) {
    tileLayer.rectangle = null
  }
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fill: false,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ff0000"
    },
    success: function (graphic) {
      var rectangle = mars3d.PolyUtil.formatRectangle(graphic._rectangle_draw)
      options.rectangle = JSON.stringify(rectangle)
      createTileLayer(options)
    }
  })
}
function btnClearExtent() {
  map.graphicLayer.clear()
  if (tileLayer) {
    tileLayer.rectangle = null
    tileLayer.options.flyTo = false
    tileLayer.reload()
  }
}

// 修改图层的部分值
function changeOpacity(val) {
  tileLayer.opacity = val
}
function changeBrightness(val) {
  tileLayer.brightness = val
}
