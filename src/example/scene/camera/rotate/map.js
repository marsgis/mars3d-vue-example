import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 26.520735, lng: 120.914959, alt: 23891502.7, heading: 92.1, pitch: -76.8, roll: 267.9 },
    clock: {
      multiplier: 200 // 速度
    }
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

  // 按shift键+鼠标左键 拖拽 地球到合适区域，通过下面代码获取视角参数，拷贝到mapOptions的center参数中。
  const center = map.getCameraView({ simplify: false })

  startRotate()

  // 获取演示数据并加载
  queryAreasData()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function startRotate() {
  stopRotate()
  previousTime = map.clock.currentTime.secondsOfDay
  map.on(mars3d.EventType.clockTick, map_onClockTick)
}

export function stopRotate() {
  map.off(mars3d.EventType.clockTick, map_onClockTick)
}

let previousTime

// 地球旋转
function map_onClockTick(clock) {
  const spinRate = 1

  const currentTime = map.clock.currentTime.secondsOfDay
  const delta = (currentTime - previousTime) / 1000
  previousTime = currentTime
  map.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta)
}

function addGraphics(geojson) {
  const center = Cesium.Cartesian3.fromDegrees(117.203932, 31.856794, 31.8)
  // 公司位置 矢量对象标记
  const lightCone = new mars3d.graphic.LightCone({
    position: center,
    style: {
      color: "rgba(0,255,255,0.9)",
      radius: 80000, // 底部半径
      height: 1000000 // 椎体高度
    },
    show: true
  })
  map.graphicLayer.addGraphic(lightCone)

  const arr = mars3d.Util.geoJsonToGraphics(geojson) // 解析geojson
  const lineMaterial = mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
    image: "img/textures/lineClr.png",
    color: new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 0.5),
    speed: 9
  })
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].attr
    if (item.name) {
      const thisPoint = Cesium.Cartesian3.fromDegrees(item.center[0], item.center[1])
      const positions = mars3d.PolyUtil.getLinkedPointList(center, thisPoint, 40000, 100) // 计算曲线点
      const primitive = new mars3d.graphic.PolylinePrimitive({
        positions: positions,
        style: {
          width: 2,
          material: lineMaterial // 动画线材质
        },
        attr: item
      })
      primitive.bindTooltip(`合肥 - ${item.name}`)
      map.graphicLayer.addGraphic(primitive)
    }
  }
}

function queryAreasData() {
  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/areas/100000_full.json" })
    .then(function (json) {
      addGraphics(json)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}
