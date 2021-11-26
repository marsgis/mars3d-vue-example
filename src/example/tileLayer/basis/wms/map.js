var map
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 19.171756, lng: 107.215418, alt: 9274074, heading: 356, pitch: -85 }
    },
    control: {
      baseLayerPicker: true, // basemaps底图切换按钮
      homeButton: true, // 视角复位按钮
      sceneModePicker: true, // 二三维切换按钮
      defaultContextMenu: true, // 右键菜单
      locationBar: { fps: true } // 状态栏
    },
    terrain: {
      url: "http://data.mars3d.cn/terrain",
      show: true
    },
    // 方式1：在创建地球前的参数中配置
    basemaps: [
      {
        name: "光污染图层",
        icon: "img/basemaps/blackMarble.png",
        type: "wms",
        url: "//www.lightpollutionmap.info/geoserver/gwc/service/wms",
        layers: "PostGIS:VIIRS_2019",
        crs: "EPSG:3857",
        parameters: {
          transparent: true,
          format: "image/png"
        },
        alpha: 0.6, // 透明度
        proxy: "//server.mars3d.cn/proxy/", // 代理服务，解决跨域问题
        show: true
      },
      {
        // wms也可以换一种xyz的直接写法
        name: "光污染图层(XYZ方式)",
        icon: "img/basemaps/blackMarble.png",
        type: "xyz",
        url: "//www.lightpollutionmap.info/geoserver/gwc/service/wms?transparent=true&format=image%2Fpng&service=WMS&version=1.1.1&request=GetMap&styles=&layers=PostGIS%3AVIIRS_2019&bbox={westProjected},{southProjected},{eastProjected},{northProjected}&width={width}&height={height}&srs=EPSG%3A3857",
        alpha: 0.6, // 透明度
        proxy: "//server.mars3d.cn/proxy/" // 代理服务，解决跨域问题
      },
      {
        name: "单张图片",
        icon: "img/basemaps/offline.png",
        type: "image",
        url: "//data.mars3d.cn/file/img/world/world.jpg"
      }
    ]
  })
}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.WmsLayer({
    url: "//server.mars3d.cn/geoserver/mars/wms",
    layers: "mars:hf",
    parameters: {
      transparent: "true",
      format: "image/png"
    },
    getFeatureInfoParameters: {
      feature_count: 10
    },
    // 单击高亮及其样式
    highlight: {
      type: "wallP",
      diffHeight: 100,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "img/textures/fence.png",
        color: "#ffff00",
        speed: 10, // 速度，建议取值范围1-100
        axisY: true
      })
    },
    popup: "all",
    flyTo: true
  })

  // 单击事件
  tileLayer.on(mars3d.EventType.loadConfig, function (event) {
    console.log("加载了GetCapabilities", event)
  })
  tileLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了矢量数据，共" + event.features.length + "条", event)
  })

  map.addLayer(tileLayer)
}
function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
