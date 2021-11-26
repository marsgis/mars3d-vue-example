var map
function initMap() {


  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 33.211374, lng: 117.277002, alt: 1200952, heading: 354, pitch: -72 }
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
        name: "XYZ瓦片",
        icon: "img/basemaps/google_vec.png",
        type: "xyz",
        url: "http://t3.tianditu.gov.cn/img_c/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={z}&layer=img&style=default&tilerow={y}&tilecol={x}&tilematrixset=c&format=tiles&tk=6c99c7793f41fccc4bd595b03711913e",
        crs: "EPSG:4490", // 标识坐标系
        show: true
      }
    ],
    layers: [
      {
        name: "山东电子",
        icon: "img/basemaps/google_vec.png",
        type: "xyz",
        url: "http://www.sdmap.gov.cn/tileservice/SDPubMap?layer=SDPubMap&style=default&tilematrixset=default028mm&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}",
        crs: "EPSG:4490",
        rectangle: { xmin: 114.3, xmax: 123.2, ymin: 34.165, ymax: 38.626 },
        minimumLevel: 5,
        maximumLevel: 18,
        alpha: 1,
        queryParameters: {
          // 可以传自定义url参数，如token等
          token: "mars3d"
        },
        show: true
      }
      // {
      //     "name": "arcgis服务",
      //     "icon": "img/basemaps/google_vec.png",
      //     "type": "xyz",
      //     "url": "https://localhost:6080/arcgis/rest/services/test/MapServer/tile/{z}/{y}/{x}",
      //     "crs": "EPSG:4490",
      //     "minimumLevel": 0,
      //     "maximumLevel": 18
      // },
      // {
      //     "name": "WMTS",
      //     "icon": "img/basemaps/google_vec.png",
      //     "type": "xyz",
      //     "url": "http://47.106.133.145:20000/geowebcache/service/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=arcgis-China&STYLE=_null&FORMAT=image/jpeg&TILEMATRIXSET=EPSG:4326_arcgis-China&TILEMATRIX=EPSG:4326_arcgis-China:{z}&TILEROW={y}&TILECOL={x}",
      //     "crs": "EPSG:4490",
      //     "minimumLevel": 0,
      //     "maximumLevel": 18,
      //     "proxy": "//server.mars3d.cn/proxy/",  //代理服务，解决跨域问题
      // }
    ]
  })

}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  map.setCameraView({ lat: 31.528964, lng: 117.245717, alt: 81718, heading: 360, pitch: -67 })

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.XyzLayer({
    url: "//server.mars3d.cn/geoserver/gwc/service/tms/1.0.0/mars%3Ahfgh3857@EPSG%3A3857@png/{z}/{x}/{reverseY}.png",
    rectangle: { xmin: 116.850438, xmax: 117.635666, ymin: 31.5375784, ymax: 32.16236297 },
    crs: "EPSG:3857",
    queryParameters: {
      // 可以传自定义url参数，如token等
      token: "mars3d"
    },
    minimumLevel: 0,
    maximumLevel: 18,
    minimumTerrainLevel: 0,
    maximumTerrainLevel: 18
  })
  map.addLayer(tileLayer)
}
function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
