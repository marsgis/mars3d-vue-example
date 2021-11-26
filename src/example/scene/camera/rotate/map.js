var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 6.266347, lng: 130.562822, alt: 12564220, heading: 0, pitch: -90 },
      clock: {
        multiplier: 200 // 速度
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 按shift键+鼠标左键 拖拽 地球到合适区域，通过下面代码获取视角参数，拷贝到mapOptions的center参数中。
  const center = map.getCameraView({ simplify: false })

  startRotate()

  // 获取演示数据并加载
  queryAreasData()
}

function startRotate() {
  stopRotate()
  previousTime = map.clock.currentTime.secondsOfDay
  map.on(mars3d.EventType.clockTick, map_onClockTick)
}

function stopRotate() {
  map.off(mars3d.EventType.clockTick, map_onClockTick)
}

var previousTime

// 地球旋转
function map_onClockTick(clock) {
  var spinRate = 1

  var currentTime = map.clock.currentTime.secondsOfDay
  var delta = (currentTime - previousTime) / 1000
  previousTime = currentTime
  map.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta)
}

function addGraphics(geojson) {
  var center = Cesium.Cartesian3.fromDegrees(117.203932, 31.856794, 31.8)
  // 公司位置 矢量对象标记
  var lightCone = new mars3d.graphic.LightCone({
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
  var lineMaterial = mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
    image: "img/textures/lineClr.png",
    color: new Cesium.Color(255 / 255, 201 / 255, 38 / 255, 0.5),
    speed: 9
  })
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].attr
    if (item.name) {
      var thisPoint = Cesium.Cartesian3.fromDegrees(item.center[0], item.center[1])
      var positions = mars3d.PolyUtil.getLinkedPointList(center, thisPoint, 40000, 100) // 计算曲线点
      var primitive = new mars3d.graphic.PolylinePrimitive({
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
