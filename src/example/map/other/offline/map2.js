import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 25.598554, lng: 101.908933, alt: 16767550.2, heading: 357.4, pitch: -89 },
    mapProjection: "EPSG:3857", // 2D模式下避免瓦片拉伸
    fxaa: true, // 是否开启抗锯齿
    resolutionScale: 2.0, // 提示注记层清晰度
    highDynamicRange: false // 避免瓦片太暗
  },
  // 离线12.5米地形的配置
  terrain: {
    url: "https://data.mars3d.cn/terrain",
    show: true
  },
  // 离线0-16级谷歌地图的配置
  basemaps: [
    {
      name: "影像地图-全国16",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/google_img.png",
      type: "xyz",
      url: "//localhost/mars3d-data/tile/img/{z}/{x}/{y}.jpg",
      chinaCRS: "GCJ02",
      show: true
    },
    {
      name: "影像地图-全球13",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/google_img.png",
      type: "xyz",
      url: "//localhost/img-world/{z}/{x}/{y}.jpg",
      chinaCRS: "GCJ02",
      minimumLevel: 0,
      maximumLevel: 13
    },
    {
      name: "电子地图",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/google_vec.png",
      type: "xyz",
      url: "//localhost/mars3d-data/tile/vec/{z}/{x}/{y}.jpg",
      chinaCRS: "GCJ02"
    },
    {
      name: "蓝色底图",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/my_blue.png",
      type: "xyz",
      url: "//localhost/mars3d-data/tile/vec/{z}/{x}/{y}.jpg",
      chinaCRS: "GCJ02",
      invertColor: true,
      filterColor: "#4e70a6",
      brightness: 0.6,
      contrast: 1.8,
      gamma: 0.3,
      hue: 1,
      saturation: 0
    }
  ],
  layers: []
}
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}
