
var map
var graphicLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 27.390195, lng: 117.386057, alt: 550488, heading: 0, pitch: -49 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  var center = Cesium.Cartesian3.fromDegrees(117.257436, 31.838742, 1)

  var graphic = new mars3d.graphic.CircleEntity({
    name: "合肥市",
    position: center,
    style: {
      radius: 50000.0,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.CircleWave, {
        color: "#ff0000",
        count: 1, // 单个圆圈
        speed: 20
      })
    }
  })
  graphicLayer.addGraphic(graphic)

  var cities = [
    { name: "六安市", lon: 116.3123, lat: 31.8329 },
    { name: "安庆市", lon: 116.7517, lat: 30.5255 },
    { name: "滁州市", lon: 118.1909, lat: 32.536 },
    { name: "宣城市", lon: 118.8062, lat: 30.6244 },
    { name: "阜阳市", lon: 115.7629, lat: 32.9919 },
    { name: "宿州市", lon: 117.5208, lat: 33.6841 },
    { name: "黄山市", lon: 118.0481, lat: 29.9542 },
    { name: "巢湖市", lon: 117.7734, lat: 31.4978 },
    { name: "亳州市", lon: 116.1914, lat: 33.4698 },
    { name: "池州市", lon: 117.3889, lat: 30.2014 },
    { name: "蚌埠市", lon: 117.4109, lat: 33.1073 },
    { name: "芜湖市", lon: 118.3557, lat: 31.0858 },
    { name: "淮北市", lon: 116.6968, lat: 33.6896 },
    { name: "淮南市", lon: 116.7847, lat: 32.7722 },
    { name: "马鞍山市", lon: 118.6304, lat: 31.5363 },
    { name: "铜陵市", lon: 117.9382, lat: 30.9375 }
  ]

  var lineMaterial = mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
    image: "img/textures/lineClr.png",
    color: new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 1),
    speed: 10
  })
  for (var i = 0; i < cities.length; i++) {
    var item = cities[i]
    var thisPoint = Cesium.Cartesian3.fromDegrees(item.lon, item.lat, 1)
    var positions = mars3d.PolyUtil.getLinkedPointList(center, thisPoint, 40000, 100) // 计算曲线点
    var primitive = new mars3d.graphic.PolylinePrimitive({
      positions: positions,
      style: {
        width: 2,
        material: lineMaterial // 动画线材质
      }
    })
    primitive.bindPopup(`合肥 - ${item.name}`)
    graphicLayer.addGraphic(primitive)
  }
}
function changeSlide(val) {
  if (!val) {
    return
  }

  graphicLayer.eachGraphic((graphic) => {
    if (graphic instanceof mars3d.graphic.PolylinePrimitive) {
      // 只更新速度（平滑过度）
      graphic.uniforms.speed = val

      // 更新material
      // graphic.setStyle({
      //   material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
      //     image: "img/textures/lineClr.png",
      //     color: new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 1),
      //     speed: speed,
      //   }),
      // });
    }
  })
}
