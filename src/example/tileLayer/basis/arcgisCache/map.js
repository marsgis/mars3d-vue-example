var map
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 20.328888, lng: 110.051238, alt: 6352112, heading: 356, pitch: -78 }
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
        name: "ArcGIS影像",
        icon: "img/basemaps/esriWorldImagery.png",
        type: "arcgis_cache",
        url: "//data.mars3d.cn/arcgis_cache/googleVec/_alllayers/{z}/{y}/{x}.jpg",
        upperCase: true, // 标识图片名称是否大写
        minimumLevel: 0,
        maximumLevel: 4,
        rectangle: { xmin: -180, xmax: 180, ymin: -90, ymax: 90 },
        show: true
      }
    ]
  })

}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  map.setCameraView({ lat: 31.427562, lng: 117.193707, alt: 97757, heading: 3, pitch: -66 })

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.ArcGisCacheLayer({
    url: "//data.mars3d.cn/arcgis_cache/hfgh/_alllayers/{z}/{y}/{x}.png",
    upperCase: false,
    minimumLevel: 1,
    maximumLevel: 17,
    minimumTerrainLevel: 1,
    // "maximumTerrainLevel": 17,
    rectangle: { xmin: 116.846, xmax: 117.642, ymin: 31.533, ymax: 32.185 } // 控制切片如果在矩形坐标内才显示，如果不在矩形坐标内不显示
  })
  map.addLayer(tileLayer)
}
function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
