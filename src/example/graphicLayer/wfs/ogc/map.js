var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.798703, lng: 117.207366, alt: 2033, heading: 31, pitch: -29 }
    },
    layers: [
      {
        name: "合肥教育点",
        type: "wfs",
        url: "//server.mars3d.cn/geoserver/mars/wfs",
        layer: "mars:hfjy",
        parameters: {
          // 支持所有wfs的参数
          maxFeatures: 500
        },
        minimumLevel: 13,
        debuggerTileInfo: false,
        symbol: {
          type: "billboardP",
          styleOptions: {
            image: "img/marker/mark1.png",
            scale: 0.7,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance: true,
            scaleByDistance_far: 20000,
            scaleByDistance_farValue: 0.5,
            scaleByDistance_near: 1000,
            scaleByDistance_nearValue: 1,
            clampToGround: true,
            label: {
              text: "{项目名称}",
              font_size: 15,
              color: "#ffffff",
              outline: true,
              outlineColor: "#000000",
              pixelOffsetY: -30,
              distanceDisplayCondition: true,
              distanceDisplayCondition_far: 2000,
              distanceDisplayCondition_near: 0
            }
          }
        },
        popup: "all",
        show: true
      }
    ]
  })
  delete mapOptions.terrain

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 蓝色底图

  var changeLevel = 15

  // 瓦片图，参考用
  var tileLayer = new mars3d.layer.WmsLayer({
    name: "建筑物面",
    type: "wms",
    url: "//server.mars3d.cn/geoserver/mars/wms",
    layers: "mars:hfjzw",
    crs: "EPSG:4326",
    parameters: {
      transparent: "true",
      format: "image/png"
    },
    maximumLevel: changeLevel - 1,
    maximumTerrainLevel: changeLevel - 1,
    popup: "名称：{NAME}<br />层数：{floor}",
    show: true
  })
  map.addLayer(tileLayer)

  var wfsLayer = new mars3d.layer.WfsLayer({
    name: "建筑物面",
    url: "//server.mars3d.cn/geoserver/mars/wfs",
    layer: "mars:hfjzw",
    parameters: {
      // 支持所有wfs的参数
      maxFeatures: 210
    },
    minimumLevel: changeLevel,
    symbol: {
      type: "polygonP",
      styleOptions: {
        color: "#00469c",
        outline: false,
        opacity: 1
      }
    },
    buildings: {
      cloumn: "floor"
    },
    debuggerTileInfo: false,
    popup: "名称：{NAME}<br />层数：{floor}",
    show: true
  })
  map.addLayer(wfsLayer)

  // 绑定事件
  wfsLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}
