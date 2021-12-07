import * as mars3d from "mars3d"

function initMap() {
  // 添加可叠加图层有3种方式（参数除指定的type类型外无需type参数，其他参数都相同）:
  // 方式1：在创建地球前的传参中配置layers参数
  const map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 26.035977, lng: 115.209641, alt: 2703280, heading: 7, pitch: -78 }
    },
    control: {
      baseLayerPicker: true, // basemaps底图切换按钮
      homeButton: true, // 视角复位按钮
      sceneModePicker: true, // 二三维切换按钮
      navigationHelpButton: true, // 帮助按钮
      fullscreenButton: true, // 全屏按钮
      defaultContextMenu: true // 右键菜单
    },
    basemaps: [
      {
        name: "单张图片",
        icon: "img/basemaps/offline.png",
        type: "image",
        url: "//data.mars3d.cn/file/img/world/world.jpg",
        show: true
      }
    ],
    layers: [
      {
        name: "天地图注记",
        type: "tdt",
        layer: "img_z",
        key: ["9ae78c51a0a28f06444d541148496e36"],
        show: true
      }
    ]
  })

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  const layer = new mars3d.layer.XyzLayer({
    name: "行政区划界线",
    url: "https://t{s}.tianditu.gov.cn/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=9ae78c51a0a28f06444d541148496e36",
    subdomains: "01234567",
    maximumLevel: 10
  })
  map.addLayer(layer)

  // 方式3：在创建地球后调用addLayer添加图层(用 mars3d.layer.create工厂方法创建)
  const layerImg = mars3d.LayerUtil.create({
    type: "image",
    url: "//data.mars3d.cn//file/img/radar/201906211112.PNG",
    rectangle: { xmin: 73.16895, xmax: 134.86816, ymin: 12.2023, ymax: 54.11485 },
    alpha: 0.7
  })
  map.addLayer(layerImg)
}
