var map
var graphicLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 32.432745, lng: 115.601935, alt: 131, heading: 237, pitch: -31 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 显示水域
  var waterLayer = new mars3d.layer.GeoJsonLayer({
    url: "//data.mars3d.cn/file/geojson/wangjiaba.json",
    symbol: {
      type: "waterCombine",
      styleOptions: {
        height: 32, // 水面高度
        normalMap: "img/textures/waterNormals.jpg", // 水正常扰动的法线图
        frequency: 9000.0, // 控制波数的数字。
        animationSpeed: 0.03, // 控制水的动画速度的数字。
        amplitude: 5.0, // 控制水波振幅的数字。
        specularIntensity: 0.2, // 控制镜面反射强度的数字。
        baseWaterColor: "#123e59", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
        blendColor: "#123e59" // 从水中混合到非水域时使用的rgba颜色对象。
      }
    }
  })
  map.addLayer(waterLayer)

  // 水柱位置
  var posArr = [
    [115.600031, 32.43217, 38],
    [115.600104, 32.432121, 38],
    [115.600163, 32.432059, 38],
    [115.600246, 32.432014, 38],
    [115.600324, 32.431971, 38],
    [115.600404, 32.431927, 38],
    [115.600484, 32.431882, 38],
    [115.600563, 32.431839, 38],
    [115.600646, 32.431793, 38],
    [115.600727, 32.431749, 38],
    [115.600806, 32.431706, 38],
    [115.600886, 32.431661, 38],
    [115.600967, 32.431617, 38]
  ]

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  for (var i = 0, len = posArr.length; i < len; i++) {
    var pos = posArr[i]
    var position = Cesium.Cartesian3.fromDegrees(pos[0], pos[1], pos[2])

    var particleSystem = new mars3d.graphic.ParticleSystem({
      id: i + 1,
      position: position, // 位置
      style: {
        image: "./img/particle/smoke.png",
        particleSize: 28,
        startColor: Cesium.Color.LIGHTCYAN.withAlpha(0.3), // 粒子出生时的颜色
        endColor: Cesium.Color.WHITE.withAlpha(0.0), // 当粒子死亡时的颜色

        startScale: 2.0, // 粒子出生时的比例，相对于原始大小
        endScale: 4.0, // 粒子在死亡时的比例
        minimumParticleLife: 1.1, // 设置粒子寿命的可能持续时间的最小界限（以秒为单位），粒子的实际寿命将随机生成
        maximumParticleLife: 3.1, // 设置粒子寿命的可能持续时间的最大界限（以秒为单位），粒子的实际寿命将随机生成
        minimumSpeed: 1.0, // 设置以米/秒为单位的最小界限，超过该最小界限，随机选择粒子的实际速度。
        maximumSpeed: 4.0, // 设置以米/秒为单位的最大界限，超过该最大界限，随机选择粒子的实际速度。

        emissionRate: 100.0, // 每秒要发射的粒子数。
        lifetime: 8.0 // 粒子的生命周期为（以秒为单位）。
      },
      gravity: -11,
      target: new Cesium.Cartesian3(-0.13, 0.09, 0.28), // 粒子的方向
      maxHeight: 2000 // 超出该高度后不显示粒子效果
    })

    graphicLayer.addGraphic(particleSystem)
  }
}

// 单个闸门控制
function changeZhaMen(id, checked) {
  // const id = Number(item.value)
  var particleSystem = graphicLayer.getGraphicById(id)
  if (particleSystem) {
    particleSystem.show = !checked
  }
}
// 全部闸门的控制
function bindShowAll(val) {
  graphicLayer.eachGraphic((graphic) => {
    graphic.show = val
  })
}
