var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 23.359088, lng: 116.19963, alt: 1262727, heading: 2, pitch: -60 }
    },
    layers: []
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.imageryLayers._layers.forEach(function (layer, index, arr) {
    layer.brightness = 0.4
  })

  // 加载气象
  queryWindpointApiData()
    .then(function (res) {
      showWindLine(res.data)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

var colors = ["#006837", "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"]
var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 99] // 等值面的级数

// 访问后端接口，取数据
function queryWindpointApiData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/windpoint.json" })
}

// 等值线面
function showWindLine(arr) {
  // var min = arr[0].speed
  // var max = arr[0].speed

  var pointGrid = []
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i]

    // if (min > item.speed) min = item.speed
    // if (max < item.speed) max = item.speed

    pointGrid.push({
      type: "Feature",
      properties: item,
      geometry: {
        type: "Point",
        coordinates: [item.x, item.y]
      }
    })
  }

  // breaks = []
  // var step = (max - min) / 10
  // for (var i = min; i <= max; i += step) {
  //   breaks.push(Number(i.toFixed(1)))
  // }

  var points = {
    type: "FeatureCollection",
    features: pointGrid
  }

  // 插值
  // points = turf.interpolate(points, 10, {
  //   gridType: 'point', // 'square' | 'point' | 'hex' | 'triangle'
  //   property: 'speed',
  //   units: 'kilometers', // degrees, radians, miles, or kilometers
  //   weight: 1
  // })
  // 适当降低插值结果的精度便于显示
  // points.features.map((i) => (i.properties.speed = Number(i.properties.speed.toFixed(2))))

  // 等值面
  var geojsonPoly = turf.isobands(points, breaks, {
    zProperty: "speed"
  })

  var geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "等值面",
    data: geojsonPoly,
    popup: "{speed}",
    symbol: {
      styleOptions: {
        fill: true, // 是否填充
        color: "#ffff00", // 颜色
        opacity: 0.7 // 透明度
      },
      callback: function (attr, styleOpt) {
        // 得到点的权重，计算落在那个色度带
        const val = Number(attr.speed.split("-")[0] || 0)
        const color = getColor(val)
        return {
          color: color
        }
      }
    }
  })
  map.addLayer(geoJsonLayer)

  // 等值线
  var geojsonLine = turf.isolines(points, breaks, {
    zProperty: "speed"
  })

  // 进行平滑处理
  // var features = geojsonLine.features;
  // for (var i = 0; i < features.length; i++) {
  //     var _coords = features[i].geometry.coordinates;
  //     var _lCoords = [];
  //     for (var j = 0; j < _coords.length; j++) {
  //         var _coord = _coords[j];
  //         var line = turf.lineString(_coord);
  //         var curved = turf.bezierSpline(line);
  //         _lCoords.push(curved.geometry.coordinates);
  //     }
  //     features[i].geometry.coordinates = _lCoords;
  // }

  var layerDZX = new mars3d.layer.GeoJsonLayer({
    name: "等值线",
    data: geojsonLine,
    popup: "{speed}",
    symbol: {
      styleOptions: {
        width: 2, // 边框宽度
        color: "#000000", // 边框颜色
        opacity: 0.5, // 边框透明度
        clampToGround: false // 是否贴地
      }
    }
  })
  map.addLayer(layerDZX)
}

function getColor(value) {
  for (var i = 0; i < breaks.length; i++) {
    if (breaks[i] === value) {
      return colors[i]
    }
  }
  return colors[0]
}
