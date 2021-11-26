
var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.609076, lng: 117.292797, alt: 17106, heading: 350, pitch: -51 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  var geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "马拉松",
    url: "//data.mars3d.cn/file/geojson/hefei-marathon.json",
    onCreateGraphic: function (e) {
      const typeP = e.type + "P"
      if (mars3d.GraphicType[typeP]) {
        e.type = typeP
      } // 修改type为primitive类型展示

      geoJsonLayer.addGraphic(e)
    }
  })
  map.addLayer(geoJsonLayer)
}

function changeView1() {
  map.setCameraView({ lat: 31.77566, lng: 117.226039, alt: 413, heading: 47, pitch: -48 })
}

function changeView2() {
  map.setCameraView({ lat: 31.723314, lng: 117.247933, alt: 159, heading: 270, pitch: -31 })
}
function changeView3() {
  map.setCameraView({ lat: 31.712765, lng: 117.294325, alt: 377, heading: 336, pitch: -56 })
}

function changeView4() {
  map.setCameraView({ lat: 31.609076, lng: 117.292797, alt: 17106, heading: 350, pitch: -51 })
}
