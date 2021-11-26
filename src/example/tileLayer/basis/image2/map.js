var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.839403, lng: 117.257352, alt: 2540, heading: 0, pitch: -90 }
    },
    layers: [
      // 方式1：在创建地球前的参数中配置
      {
        name: "中科大-东区",
        type: "image",
        url: "//data.mars3d.cn/file/img/zkd-dq.png",
        rectangle: { xmin: 117.259691, xmax: 117.267778, ymin: 31.834432, ymax: 31.84387 },
        show: true
      }
    ]
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  var tileLayer = new mars3d.layer.ImageLayer({
    name: "中科大-西区",
    url: "//data.mars3d.cn/file/img/zkd-xq.png",
    rectangle: { xmin: 117.245648, xmax: 117.254431, ymin: 31.836891, ymax: 31.843413 }
  })
  map.addLayer(tileLayer)
}
