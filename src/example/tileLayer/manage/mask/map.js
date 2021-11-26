var map
var geoJsonLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.663835, lng: 117.52331, alt: 407326, heading: 352, pitch: -88 },
      cameraController: {
        zoomFactor: 3.0,
        minimumZoomDistance: 1,
        maximumZoomDistance: 1000000
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // geojson 合肥边界线
  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    url: "//data.mars3d.cn/file/geojson/areas/340100.json",
    mask: true, // 标识为遮罩层【重点参数】
    symbol: {
      styleOptions: {
        fill: true,
        color: "rgb(2,26,79)",
        opacity: 0.9,
        outline: true,
        outlineColor: "#39E09B",
        outlineWidth: 8,
        outlineOpacity: 0.8,
        arcType: Cesium.ArcType.GEODESIC,
        clampToGround: true
      }
    }
  })
  map.addLayer(geoJsonLayer)
}
