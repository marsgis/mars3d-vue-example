var map
function initMap(options) {
  const color = "#363635"
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 25.845231, lng: 117.57678, alt: 488175, heading: 358, pitch: -42 },
      showSun: false,
      showMoon: false,
      showSkyBox: false,
      showSkyAtmosphere: false,
      fog: false,
      backgroundColor: color, // 天空背景色
      globe: {
        baseColor: color, // 地球地面背景色
        showGroundAtmosphere: false,
        enableLighting: false
      }
    },
    control: {
      baseLayerPicker: false
    },
    basemaps: [],
    layers: []
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 添加 安徽省边界线墙
  var anhuiWall = new mars3d.layer.GeoJsonLayer({
    name: "安徽省边界墙",
    url: "//data.mars3d.cn/file/geojson/areas/340000.json",
    symbol: {
      type: "wallP",
      styleOptions: {
        setHeight: -15000,
        diffHeight: 15000, // 墙高
        materialType: mars3d.MaterialType.Image2,
        image: "./img/textures/grawall.png",
        color: "rgba(0,255,255,0.6)"
      }
    }
  })
  map.addLayer(anhuiWall)

  // 安徽省卫星底图
  var tileLayer = new mars3d.layer.XyzLayer({
    url: "//data.mars3d.cn/tile/anhui/{z}/{x}/{y}.png",
    minimumLevel: 0,
    maximumLevel: 12,
    rectangle: { xmin: 114.811691, xmax: 119.703609, ymin: 29.35597, ymax: 34.698585 }
  })
  map.addLayer(tileLayer)
}
