var map
function initMap() {


  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 25.816726, lng: 114.165359, alt: 3339610, heading: 356, pitch: -81 }
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
        name: "谷歌影像",
        icon: "img/basemaps/google_img.png",
        type: "xyz",
        url: "https://boxa.earthol.com/map.jpg?lyrs=y&gl=cn&x={x}&y={y}&z={z}",
        chinaCRS: mars3d.ChinaCRS.GCJ02,
        show: true
      },
      {
        name: "谷歌影像(WGS84)",
        icon: "img/basemaps/google_img.png",
        type: "google",
        layer: "img_d",
        chinaCRS: mars3d.ChinaCRS.WGS84
      },
      {
        name: "谷歌影像",
        icon: "img/basemaps/esriWorldImagery.png",
        type: "group",
        layers: [
          { name: "底图", type: "google", layer: "img_d", chinaCRS: mars3d.ChinaCRS.GCJ02 },
          { name: "注记", type: "google", layer: "img_d", chinaCRS: mars3d.ChinaCRS.GCJ02 }
        ]
      },
      {
        name: "谷歌电子",
        icon: "img/basemaps/google_vec.png",
        type: "google",
        layer: "vec",
        chinaCRS: mars3d.ChinaCRS.GCJ02
      },
      {
        name: "谷歌地形",
        icon: "img/basemaps/stamenWatercolor.png",
        type: "google",
        layer: "ter",
        chinaCRS: mars3d.ChinaCRS.GCJ02
      }
    ]
  })


  globalNotify("已知问题：",
  `(1)按国家测绘主管部门的通知,
  目前国家相关部门对未经审核批准的谷歌等地图做了封锁及下架，
  目前谷歌地图服务暂不可用`)
}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.GoogleLayer({
    name: "谷歌地形",
    layer: "ter",
    chinaCRS: mars3d.ChinaCRS.GCJ02
  })
  map.addLayer(tileLayer)
}

function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
