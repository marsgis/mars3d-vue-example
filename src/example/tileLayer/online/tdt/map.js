var map
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 31.675177, lng: 117.323257, alt: 81193, heading: 359, pitch: -79 }
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
        name: "天地图影像(EPSG:3857)",
        icon: "img/basemaps/tdt_img.png",
        type: "tdt",
        layer: "img_d",
        key: mars3d.Token.tiandituArr,
        show: true
      },
      {
        name: "天地图电子(EPSG:3857)",
        icon: "img/basemaps/tdt_vec.png",
        type: "group",
        layers: [
          { name: "底图", type: "tdt", layer: "vec_d", key: mars3d.Token.tiandituArr },
          { name: "注记", type: "tdt", layer: "vec_z", key: mars3d.Token.tiandituArr }
        ]
      },
      {
        name: "天地图地形(EPSG:3857)",
        icon: "img/basemaps/tdt_ter.png",
        type: "group",
        layers: [
          { name: "底图", type: "tdt", layer: "ter_d", key: mars3d.Token.tiandituArr },
          { name: "注记", type: "tdt", layer: "ter_z", key: mars3d.Token.tiandituArr }
        ]
      },
      {
        name: "天地图影像(EPSG:4326)",
        icon: "img/basemaps/tdt_img.png",
        type: "group",
        layers: [
          {
            name: "底图",
            type: "tdt",
            layer: "img_d",
            crs: "EPSG:4326",
            key: mars3d.Token.tiandituArr
          },
          {
            name: "注记",
            type: "tdt",
            layer: "img_z",
            crs: "EPSG:4326",
            key: mars3d.Token.tiandituArr
          }
        ]
      },
      {
        name: "天地图电子(EPSG:4326)",
        icon: "img/basemaps/tdt_vec.png",
        type: "group",
        layers: [
          {
            name: "底图",
            type: "tdt",
            layer: "vec_d",
            crs: "EPSG:4326",
            key: mars3d.Token.tiandituArr
          },
          {
            name: "注记",
            type: "tdt",
            layer: "vec_z",
            crs: "EPSG:4326",
            key: mars3d.Token.tiandituArr
          }
        ]
      },
      {
        name: "天地图地形(EPSG:4326)",
        icon: "img/basemaps/tdt_ter.png",
        type: "group",
        layers: [
          {
            name: "底图",
            type: "tdt",
            layer: "ter_d",
            crs: "EPSG:4326",
            key: mars3d.Token.tiandituArr
          },
          {
            name: "注记",
            type: "tdt",
            layer: "ter_z",
            crs: "EPSG:4326",
            key: mars3d.Token.tiandituArr
          }
        ]
      }
    ]
  })
}

// 叠加的图层
var tileLayer
function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.TdtLayer({
    name: "天地图影像注记",
    layer: "img_z",
    key: mars3d.Token.tiandituArr
  })
  map.addLayer(tileLayer)
}

function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
