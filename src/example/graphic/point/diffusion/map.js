import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayerElllipsoid
const center = Cesium.Cartesian3.fromDegrees(117.167848, 31.814011, 46) // 事发点

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.805861, lng: 117.158491, alt: 1311, heading: 53, pitch: -45 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建Graphic图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayerElllipsoid = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayerElllipsoid)

  // 半球范围圈
  createEllipsoid(true, false)

  // 火焰效果
  createParticle(graphicLayer)

  // 添加点集
  const resource = new Cesium.Resource({
    url: "//data.mars3d.cn/file/apidemo/diffusion.json"
  })
  resource
    .fetchJson()
    .then(function (rs) {
      globalNotify("已知问题：", `加载${rs.length}条数据，请耐心等待~`, { duration: null })

      setTimeout(() => {
        creteaPointPrimitive(graphicLayer, rs)
      }, 1000)
    })
    .otherwise(function (error) {
      globalAlert(error, "加载数据出错")
    })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 添加点集
function creteaPointPrimitive(graphicLayer, rs) {
  clr.init()

  const degree = 45 // 角度
  const hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(degree), 0, 0)

  let len = rs.length

  // 减少数据量
  len = len * 0.255

  for (let i = 1; i < len; i++) {
    const item = rs[i]
    const val = item[3]
    const par1Position = mars3d.PointUtil.getPositionByHprAndOffset(center, new Cesium.Cartesian3(item[0], item[1], item[2]), hpr)

    // 加point点
    const primitive = new mars3d.graphic.PointPrimitive({
      position: par1Position,
      style: {
        pixelSize: 5,
        color: clr.getColor(val)
      },
      tooltip: "浓度值：" + val
    })
    graphicLayer.addGraphic(primitive)
  }
}

// 半球范围圈
export function createEllipsoid(redShow, yellowShow) {
  graphicLayerElllipsoid.clear()
  let radiu = 200
  const redSphere = new mars3d.graphic.EllipsoidEntity({
    name: "危险圈",
    position: center,
    style: {
      radii: new Cesium.Cartesian3(radiu, radiu, radiu),
      maximumConeDegree: 90,
      slicePartitions: 45,
      stackPartitions: 45,
      color: Cesium.Color.RED.withAlpha(0.3),
      outline: true,
      outlineColor: Cesium.Color.WHITE.withAlpha(0.8)
    },
    show: redShow
  })
  graphicLayerElllipsoid.addGraphic(redSphere)

  // 是否显示红色的危险圈
  redSphere.show = redShow

  radiu = 400
  const yellowSphere = new mars3d.graphic.EllipsoidEntity({
    name: "警告圈",
    position: center,
    style: {
      radii: new Cesium.Cartesian3(radiu, radiu, radiu),
      maximumConeDegree: 90,
      slicePartitions: 45,
      stackPartitions: 45,
      color: Cesium.Color.YELLOW.withAlpha(0.3),
      outline: true,
      outlineColor: Cesium.Color.WHITE.withAlpha(0.8)
    },
    show: yellowShow
  })
  graphicLayerElllipsoid.addGraphic(yellowSphere)

  // 是否显示黄色的警告圈
  yellowSphere.show = yellowShow
}

// 添加火焰粒子效果
function createParticle(graphicLayer) {
  const particleSystem = new mars3d.graphic.ParticleSystem({
    position: center, // 位置
    style: {
      image: "img/particle/fire.png",
      startColor: Cesium.Color.RED.withAlpha(0.7), // 粒子出生时的颜色
      endColor: Cesium.Color.YELLOW.withAlpha(0.0), // 当粒子死亡时的颜色

      startScale: 1.0, // 粒子出生时的比例，相对于原始大小
      endScale: 5.0, // 粒子在死亡时的比例
      minimumParticleLife: 1.2, // 设置粒子寿命的可能持续时间的最小界限（以秒为单位），粒子的实际寿命将随机生成
      maximumParticleLife: 1.2, // 设置粒子寿命的可能持续时间的最大界限（以秒为单位），粒子的实际寿命将随机生成
      minimumSpeed: 1.0, // 设置以米/秒为单位的最小界限，超过该最小界限，随机选择粒子的实际速度。
      maximumSpeed: 4.0, // 设置以米/秒为单位的最大界限，超过该最大界限，随机选择粒子的实际速度。

      emissionRate: 50.0, // 每秒要发射的粒子数。
      lifetime: 16.0, // 粒子的生命周期为（以秒为单位）。
      bursts: [
        // 粒子会在5s、10s、15s时分别进行一次粒子大爆发
        new Cesium.ParticleBurst({
          time: 5.0,
          minimum: 10,
          maximum: 100
        }), // 当在5秒时，发射的数量为10-100
        new Cesium.ParticleBurst({
          time: 10.0,
          minimum: 50,
          maximum: 100
        }), // 当在10秒时，发射的数量为50-100
        new Cesium.ParticleBurst({
          time: 15.0,
          minimum: 200,
          maximum: 300
        }) // 当在15秒时，发射的数量为200-300
      ]
    },
    transX: 2.5,
    transY: 4.0,
    transZ: 1.0,
    maxHeight: 1000 // 超出该高度后不显示粒子效果
  })
  graphicLayer.addGraphic(particleSystem)
}

// 颜色处理
const clr = {
  span: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
  colors: ["#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"],
  init: function () {
    for (let k = 0, length = this.colors.length; k < length; k++) {
      this.colors[k] = Cesium.Color.fromCssColorString(this.colors[k]).withAlpha(0.6)
    }
  },
  getColor: function (num) {
    let length = this.span.length + 1
    if (length > this.colors.length) {
      length = this.colors.length
    }

    for (let k = 0; k < length; k++) {
      if (num < this.span[k]) {
        return this.colors[k]
      }
    }
    return this.colors[length - 1]
  }
}
