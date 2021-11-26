var map
var geoJsonLayer
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.722018, lng: 117.251926, alt: 8378, heading: 360, pitch: -33 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 切换到蓝色底图

  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "合肥市建筑物",
    url: "//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    marsJzwStyle: true, // 打开建筑物特效（内置Shader代码）
    popup: [
      { field: "objectid", name: "编号" },
      { field: "name", name: "名称" },
      { field: "height", name: "楼高", unit: "米" }
    ],
    center: { lat: 31.841018, lng: 117.252932, alt: 1346, heading: 38, pitch: -26 },
    flyTo: true
  })
  map.addLayer(tiles3dLayer)

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "体育设施点",
    url: "//data.mars3d.cn/file/geojson/hfty-point.json",
    symbol: {
      type: "billboard",
      styleOptions: {
        image: "img/marker/mark1.png",
        scale: 0.7,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    },
    popup: "all",
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    var geojsonLength = geoJsonLayer.length
    eventTarget.fire("loadOk", { geojsonLength })
    console.log("数据加载完成", event)
  })
}

function toGeojson() {
  const geojson = geoJsonLayer.toGeoJSON()
  mars3d.Util.downloadFile("hfty-point-含高度值.json", JSON.stringify(geojson))
}

// 计算贴地高度示例代码，可以将获取到的高度更新到数据库内，后续不用重复计算。
function getDataSurfaceHeight() {
  if (geoJsonLayer.length === 0) {
    globalMsg("数据尚未加载成功！")
    return
  }
  showLoading()

  // 对图层内的数据做贴地运算,自动得到贴地高度
  geoJsonLayer.clampToGround({
    endItem: function (index, len) {
      var resultData = {
        percent: index + 1,
        percentAll: len
      }
      eventTarget.fire("loadOk", { resultData })
    },
    callback: function () {
      hideLoading()
    }
  })
}
