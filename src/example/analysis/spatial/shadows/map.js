var map
var shadows
var eventTarget = new mars3d.BaseClass()
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      fxaa: true,
      center: { lat: 33.596051, lng: 119.031383, alt: 359, heading: 180, pitch: -43 },
      globe: {
        baseColor: "#000"
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // let imageryLayer = map.scene.imageryLayers.get(0)
  // imageryLayer.dayAlpha = 0.1  //白天图层透明值
  // imageryLayer.nightAlpha = 1.0 //夜晚图层透明值

  // 加个模型
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
    position: { alt: 80.6 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    shadows: Cesium.ShadowMode.ENABLED
  })
  map.addLayer(tilesetLayer)

  eventTarget.fire("shadows")

}

function stopPlay() {
  if (shadows && shadows.isStart) {
    shadows.pause()
    shadows = null
  }
}
function startPlay(timeVal, currTime) {
  var currentTime = setShadows(timeVal, currTime)

  shadows.on(mars3d.EventType.change, function () {
    var shadowTime = shadows.time
    eventTarget.fire("loadOk", { shadowTime })
  })

  var startDate = new Date(currTime + " 00:00:00")
  var endDate = new Date(currTime + " 23:59:59")

  if (currentTime >= endDate) {
    globalMsg("开始时间必须小于结束时间！")
    return
  }
  shadows.start(startDate, endDate, currentTime)
}

function setShadows(value, date) {
  var hours = Number.parseInt(value / 60)
  var minutes = Number.parseInt(value % 60)
  var strDateTime = `${date} ${hours}:${minutes}:00`
  var dateTime = new Date(strDateTime)

  shadows = new mars3d.thing.Shadows({
    multiplier: 1600,
    time: dateTime
  })
  map.addThing(shadows)


  return dateTime
}
