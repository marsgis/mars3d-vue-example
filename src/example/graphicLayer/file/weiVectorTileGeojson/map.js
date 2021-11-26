var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 27.689337, lng: 118.112448, alt: 762174, heading: 358, pitch: -62 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/areas/340000_full.json" })
    .then(function (geojson) {
      showBJXLine(geojson.features[0])
    })
    .otherwise(function () {
      globalAlert("Json文件加载失败！")
    })

  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/areas/340000_full.json" })
    .then(function (geojson) {
      showGeoJsonVectorTile(geojson)
    })
    .otherwise(function () {
      globalAlert("Json文件加载失败！")
    })
}
// API文档，参考lib\mars3d\thirdParty\weiVectorTile\Document.rar（解压Document.rar）
function showGeoJsonVectorTile(geojson) {
  var tileLayer = new mars3d.layer.WeiVectorTileLayer({
    source: geojson,
    zIndex: 2,
    removeDuplicate: false,
    allowPick: true, // 允许单击
    defaultStyle: {
      // 参考api文档的Cesium.VectorStyle类
      tileCacheSize: 200,

      fill: true, // 是否填充，仅面数据有效。
      fillColor: "rgba(0,255,255,0.1)",

      outline: true, // 是否显示边，仅面数据有效。
      outlineColor: "rgba(138,138,138,1)",
      lineWidth: 2,

      showMaker: false,

      showCenterLabel: true, // 是否显示文本，仅对线和面数据有效
      centerLabelPropertyName: "name",
      fontColor: "rgba(255,255,255,1)",
      fontSize: 23,
      fontFamily: "楷体",
      labelOffsetX: -10,
      labelOffsetY: -5
    },
    minimumLevel: 1,
    maximumLevel: 20,
    simplify: false,
    styleFilter: function (feature, style, x, y, level) {
      if (level < 6) {
        style.fontSize = level * 2
      } else {
        style.fontSize = 23
      }

      if (feature.properties && feature.properties.name && feature.properties.name == "合肥市") {
        style.fillColor = Cesium.Color.YELLOW.withAlpha(0.2)
      }
      return style
    },
    // 以下为mars3d参数,API参考http://mars3d.cn/api/BaseTileLayer.html#.ConstructorOptions
    popup: "all"
  })
  map.addLayer(tileLayer)
}

function showBJXLine(feature) {
  // console.log('边界线', feature)

  // 缓冲区
  var bufferedOuter = turf.buffer(feature, 2000, {
    units: "meters"
  })
  var bufferedInner = turf.buffer(feature, 1000, {
    units: "meters"
  })

  bufferedInner = turf.difference(bufferedInner, feature)

  bufferedOuter = turf.difference(bufferedOuter, bufferedInner)

  bufferedInner = turf.featureCollection([bufferedInner])
  bufferedOuter = turf.featureCollection([bufferedOuter])

  var tileLayer = new mars3d.layer.WeiVectorTileLayer({
    source: bufferedOuter,
    zIndex: 99,
    removeDuplicate: false,
    defaultStyle: {
      outlineColor: "rgba(209,204,226,1)",
      lineWidth: 2,
      outline: true,
      fill: true,
      fillColor: "rgba(209,204,226,1)",
      tileCacheSize: 200,
      showMaker: false,
      showCenterLabel: false
    },
    maximumLevel: 20,
    minimumLevel: 5,
    simplify: false
  })
  map.addLayer(tileLayer)

  var tileLayer2 = new mars3d.layer.WeiVectorTileLayer({
    source: bufferedInner,
    zIndex: 99,
    removeDuplicate: false,
    defaultStyle: {
      outlineColor: "rgba(185,169,199,1)",
      lineWidth: 2,
      outline: true,
      fill: true,
      fillColor: "rgba(185,169,199,1)",
      tileCacheSize: 200,
      showMaker: false,
      showCenterLabel: false
    },
    maximumLevel: 20,
    minimumLevel: 5,
    simplify: false
  })
  map.addLayer(tileLayer2)
}
