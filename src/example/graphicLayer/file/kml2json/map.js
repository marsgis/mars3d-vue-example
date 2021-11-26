var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.614035, lng: 117.292184, alt: 25686, heading: 0, pitch: -44 }
    },
    layers: [
      {
        name: "国境线",
        type: "kml2json",
        url: "//data.mars3d.cn/file/kml/countryboundary.kml",
        symbol: {
          styleOptions: {
            color: "#FED976",
            width: 2
          }
        },
        popup: "all",
        show: true
      },
      {
        name: "省界线",
        type: "kml2json",
        url: "//data.mars3d.cn/file/kml/province.kml",
        symbol: {
          styleOptions: {
            color: "#00FF00",
            width: 2
          }
        },
        popup: "all",
        show: true
      }
    ]
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  showTieluDemo()
}

var kmlLayer

function removeLayer() {
  map.trackedEntity = null
  if (kmlLayer) {
    map.removeLayer(kmlLayer, true)
    kmlLayer = null
  }
}

// 示例：
function showTieluDemo() {
  removeLayer()

  kmlLayer = new mars3d.layer.Kml2JsonLayer({
    url: "//data.mars3d.cn/file/kml/hftl.kml",
    symbol: {
      styleOptions: {
        color: "#00ffff",
        opacity: 0.8,
        width: 3,
        arcType: Cesium.ArcType.GEODESIC,
        clampToGround: true,
        // 标记文字
        label: {
          text: "{name}",
          opacity: 1,
          font_size: 30,
          color: "#ffffff",

          font_family: "楷体",
          outline: true,
          outlineColor: "#000000",
          outlineWidth: 3,

          scaleByDistance: true,
          scaleByDistance_far: 20000,
          scaleByDistance_farValue: 0.1,
          scaleByDistance_near: 100,
          scaleByDistance_nearValue: 1,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 20000)
        }
      }
    },
    center: { lat: 31.653222, lng: 117.273592, alt: 35183, heading: 358, pitch: -63 },
    popup: "all",
    flyTo: true
  })
  map.addLayer(kmlLayer)

  // 绑定事件
  kmlLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
    // initTree(event.list)
  })
  kmlLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：
function showGaosuluDemo() {
  removeLayer()

  kmlLayer = new mars3d.layer.Kml2JsonLayer({
    name: "路线",
    url: "//data.mars3d.cn/file/kml/bslx.kmz",
    popup: "all",
    flyTo: true
  })
  map.addLayer(kmlLayer)

  // 绑定事件
  kmlLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
    // initTree(event.list)
  })
  kmlLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：
function showAnquanDemo() {
  removeLayer()

  kmlLayer = new mars3d.layer.Kml2JsonLayer({
    name: "海上安全警告",
    url: "//data.mars3d.cn/file/kml/NAVWARN.kmz",
    symbol: function (attr, style, featue) {
      const geoType = featue.geometry?.type
      if (geoType === "Point") {
        return {
          image: "img/marker/di3.png",
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          scale: 0.4,
          label: {
            text: attr.name,
            font_size: 18,
            color: "#ffffff",
            outline: true,
            outlineColor: "#000000",
            pixelOffsetY: -50,
            scaleByDistance: true,
            scaleByDistance_far: 990000,
            scaleByDistance_farValue: 0.3,
            scaleByDistance_near: 10000,
            scaleByDistance_nearValue: 1
          }
        }
      }
      return style
    },
    popup: "{description}",
    center: { lat: 4.112702, lng: 110.383709, alt: 3269095, heading: 7, pitch: -74 },
    flyTo: true
  })
  map.addLayer(kmlLayer)

  // 绑定事件
  kmlLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
    // initTree(event.list)
  })
  kmlLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：
function showQixiangDemo() {
  removeLayer()

  kmlLayer = new mars3d.layer.Kml2JsonLayer({
    name: "气象数据",
    url: "//data.mars3d.cn/file/kml/dg8.kml",
    opacity: 0.7,
    popup: "all",
    flyTo: true
  })
  map.addLayer(kmlLayer)

  // 绑定事件
  kmlLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
    // initTree(event.list)
  })
  kmlLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

// 示例：
function showGuojiaDemo() {
  removeLayer()

  kmlLayer = new mars3d.layer.Kml2JsonLayer({
    name: "全球各国GDP",
    url: "//data.mars3d.cn/file/kml/gdpPerCapita2008.kmz",
    symbol: function (attr, style, featue) {
      const geoType = featue.geometry?.type
      if (geoType === "Point") {
        return {
          type: "label", // 指定用label渲染。
          text: attr.name,
          font_size: 18,
          color: "#ffffff",
          outline: true,
          outlineColor: "#000000"
        }
      } else if (geoType === "Polygon") {
        style.extrudedHeight = 1
        // style.diffHeight = featue.geometry?.coordinates[0][0][2]
      }

      return style
    },
    center: { lat: 12.46821, lng: 91.404177, alt: 18969935, heading: 359, pitch: -87 },
    popup: "all",
    flyTo: true
  })
  map.addLayer(kmlLayer)

  // 绑定事件
  kmlLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
    // initTree(event.list)
  })
  kmlLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}
