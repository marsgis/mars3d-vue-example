var map
var graphicLayer
var gltfListObj
var gltfItemObj
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.83351, lng: 116.354467, alt: 2743, heading: 359, pitch: -52 },
      clock: {
        currentTime: "2021-01-01 22:00:00"
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true

  this.graphicLayer = new mars3d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(graphicLayer)

  var globe = map.scene.globe

  queryModelListData()

  // 触发自定义事件
  graphicLayer.on(mars3d.EventType.drawCreated, function (e) {
    const graphic = e.graphic
    eventTarget.fire("editorUI-draw", { graphic })
  })
  graphicLayer.on(
    [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
    function (e) {
      const graphic = e.graphic
      eventTarget.fire("editorUI-SMR", { graphic })
    }
  )
  graphicLayer.on([mars3d.EventType.editStop, mars3d.EventType.removeGraphic], function (e) {
    eventTarget.fire("editorUI-stop")
  })
}

function chkTestTerrain(val) {
  map.scene.globe.depthTestAgainstTerrain = val
}

function onlyPickModelPosition(val) {
  map.onlyPickModelPosition = val
}

// 下面是获取模型库的JSON数据
function queryModelListData() {
  const configUrl = "//data.mars3d.cn/gltf/list.json"
  mars3d.Resource.fetchJson({ url: configUrl })
    .then(function (data) {
      eventTarget.fire("loadOk", { data })
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

function deleteAll() {
  graphicLayer.clear()
}

// 绘制模型
function drawGltf(style) {
  graphicLayer.startDraw({
    type: "model",
    drawShow: true, // 绘制时，是否显示模型，可避免在3dtiles上拾取坐标存在问题。
    style: style
  })
}
