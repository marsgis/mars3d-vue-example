var map
var treeEvent = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: -10.999882, lng: -0.258788, alt: 8711459, heading: 10, pitch: -85 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/airport.json" })
    .then(function (json) {
      addOrbitList(json)
    })
    .otherwise(function (e) {
      console.log("加载出错", e)
    })
}

function addOrbitList(arr) {
  var features = []
  for (var i = 0, len = arr.length; i < len; i++) {
    var item = arr[i]

    var geojson = getPoint(item)
    if (geojson) {
      features.push(geojson)
    }
  }

  const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    data: features,
    crs: "EPSG:3857", // 标识数据的坐标系
    symbol: {
      styleOptions: {
        randomColor: true,
        outline: true,
        outlineColor: "#ffffff"
      }
    },
    popup: "all",
    flyTo: true
  })

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
    const data = event.list
    treeEvent.fire("tree", { data })
  })
  geoJsonLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })

  map.addLayer(geoJsonLayer)
}

// 提取坐标信息
function getPoint(item) {
  if (!item.geometry) {
    return null
  }

  // eslint-disable-next-line no-undef
  var geojson = Terraformer.WKT.parse(item.geometry) // WKT格式转换geojson

  return {
    type: "Feature",
    geometry: geojson,
    properties: item
  }
}
