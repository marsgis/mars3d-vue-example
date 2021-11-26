// xyz图层url所支持的字符串模版:
// {z}: 切片方案中切片的级别。零级是四叉树金字塔的根。
// {x}:切片方案中的图块X坐标，其中0是最西端的图块。
// {y}: 切片方案中的图块Y坐标，其中0是最北的图块。
// {s}:可用的子域之一，用于克服浏览器对每个主机的并发请求数的限制。
// {reverseX}: 切片方案中的图块X坐标，其中0是最东的图块。
// {reverseY}:切片方案中的图块Y坐标，其中0是最南端的图块。
// {reverseZ}:在切片方案中切片的级别，其中级别0是四叉树金字塔的最大级别。为了使用reverseZ，必须定义maximumLevel。
// {westDegrees}: 瓦片图块在测地角度上的西边缘。
// {southDegrees}:瓦片图块在测地角度上的南边缘。
// {eastDegrees}:以大地测量度表示的图块的东边缘。
// {northDegrees}: 瓦片图块在测地角度上的北边缘。
// {westProjected}:图块方案的墨卡托投影坐标中图块的西边缘。
// {southProjected}: 图块方案的墨卡托投影坐标中图块的南边缘。
// {eastProjected}: :图块方案的墨卡托投影坐标中图块的东边缘。
// {northProjected}:图块方案的墨卡托投影坐标中图块的北边缘。
// {width}:每个图块的宽度（以像素为单位）。
// {height}: 每个图块的高度（以像素为单位）。

var map
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 29.968111, lng: 106.437663, alt: 8098707, heading: 5, pitch: -88 }
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
        name: "电子地图",
        icon: "img/basemaps/google_vec.png",
        type: "xyz",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        subdomains: "abc",
        show: true
      },
      {
        name: "影像地图",
        icon: "img/basemaps/gaode_img.png",
        type: "xyz",
        url: "//data.mars3d.cn/tile/googleImg/{z}/{x}/{y}.jpg",
        maximumLevel: 12
      },
      {
        name: "EPSG4490影像",
        icon: "img/basemaps/tdt_img.png",
        type: "xyz",
        url: "http://t3.tianditu.gov.cn/img_c/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={z}&layer=img&style=default&tilerow={y}&tilecol={x}&tilematrixset=c&format=tiles&tk=6c99c7793f41fccc4bd595b03711913e",
        crs: "EPSG:4490" // 标识坐标系
      }
    ]
  })
}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.XyzLayer({
    url: "//data.mars3d.cn/tile/dizhiChina/{z}/{x}/{y}.png",
    minimumLevel: 0,
    maximumLevel: 10,
    rectangle: { xmin: 69.706929, xmax: 136.560941, ymin: 15.831038, ymax: 52.558005 },
    opacity: 0.7,
    center: { lat: 22.43392, lng: 113.23887, alt: 8157553, heading: 354, pitch: -82 },
    flyTo: true
  })
  map.addLayer(tileLayer)
}
function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
