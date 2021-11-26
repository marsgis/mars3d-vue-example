var map
var sightline

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.715648, lng: 116.300527, alt: 10727, heading: 3, pitch: -25 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  sightline = new mars3d.thing.Sightline({
    visibleColor: new Cesium.Color(0, 1, 0, 0.4),
    hiddenColor: new Cesium.Color(1, 0, 0, 0.4)
    // depthFailColor: Cesium.Color.fromCssColorString("#db2c8f"),
  })
  map.addThing(sightline)
}

function drawCircle() {
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "circle",
    style: {
      color: "#ffff00",
      opacity: 0.2,
      clampToGround: true
    },
    success: function (graphic) {
      // 绘制成功后回调

      var center = graphic.positionShow
      center = mars3d.PointUtil.addPositionsHeight(center, 1.5) // 加人的身高等因素，略微抬高一些

      var targetPoints = graphic.getOutlinePositions(false, 45)

      map.graphicLayer.clear()
      map.scene.globe.depthTestAgainstTerrain = true

      var targetArr = []
      for (var i = 0; i < targetPoints.length; i++) {
        var targetPoint = targetPoints[i]
        targetPoint = mars3d.PointUtil.getSurfacePosition(map.scene, targetPoint)
        sightline.add(center, targetPoint)
      }

      createPoint(center, true)

      map.scene.globe.depthTestAgainstTerrain = false
    }
  })
}

function drawLine() {
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "polyline",
    maxPointNum: 2,
    style: {
      color: "#55ff33",
      width: 3
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.positionsShow
      map.graphicLayer.clear()
      map.scene.globe.depthTestAgainstTerrain = true

      var center = positions[0]
      var targetPoint = positions[1]
      sightline.add(center, targetPoint, { offsetHeight: 1.5 }) // 1.5是加人的身高等因素，略微抬高一些

      createPoint(center, true)
      createPoint(targetPoint, false)

      map.scene.globe.depthTestAgainstTerrain = false
    }
  })
}

function clearAll() {
  sightline.clear()
  map.graphicLayer.clear()
}

function createPoint(position, isFirst) {
  var graphic = new mars3d.graphic.PointEntity({
    position: position,
    style: {
      color: Cesium.Color.fromCssColorString("#3388ff"),
      pixelSize: 6,
      outlineColor: Cesium.Color.fromCssColorString("#ffffff"),
      outlineWidth: 2,
      scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.2),
      label: {
        text: isFirst ? "观察位置" : "目标点",
        font_size: 17,
        font_family: "楷体",
        color: Cesium.Color.AZURE,
        outline: true,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 2,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -20), // 偏移量
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 2000000)
      }
    }
  })
  map.graphicLayer.addGraphic(graphic)

  return graphic
}
// 定位至模型
var modelTest
function centerAtModel() {
  if (!modelTest) {
    modelTest = new mars3d.layer.TilesetLayer({
      url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
      position: { alt: 80.6 },
      maximumScreenSpaceError: 1,
      maximumMemoryUsage: 1024,
      flyTo: true
    })
    map.addLayer(modelTest)
  }
}
