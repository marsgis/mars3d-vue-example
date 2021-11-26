var map
var sightline

var positionSXT
var positionDM
var positionJD // 与地面的交点

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 30.841574, lng: 116.18792, alt: 6828, heading: 215, pitch: -28 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  sightline = new mars3d.thing.Sightline()
  map.addThing(sightline)

  sightline.on(mars3d.EventType.end, function (e) {
    positionJD = e.position
  })

  // 测试数据
  positionSXT = Cesium.Cartesian3.fromDegrees(116.144409, 30.744228, 1045)

  var graphicSXT = new mars3d.graphic.PointEntity({
    position: positionSXT,
    style: {
      color: "#ffff00",
      pixelSize: 8,
      label: {
        text: "摄像头",
        font_size: 20,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -20
      }
    }
  })
  map.graphicLayer.addGraphic(graphicSXT)


  // updateModel()


  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 地面点
  var graphic = new mars3d.graphic.PointEntity({
    position: new Cesium.CallbackProperty(function (time) {
      return positionDM
    }, false),
    style: {
      color: "#0000ff",
      pixelSize: 7,
      outlineColor: "#ffffff",
      outlineWidth: 2,
      label: {
        text: "目标参考点",
        font_size: 18,
        color: "#ffffff",
        pixelOffsetY: -10,
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(graphic)

  var graphicJD = new mars3d.graphic.PointEntity({
    position: new Cesium.CallbackProperty(function (time) {
      return positionJD
    }, false),
    style: {
      color: "#00ff00",
      pixelSize: 8,
      outlineColor: "#ffffff",
      outlineWidth: 2
    }
  })
  graphicJD.bindTooltip("与地形地面的交点")
  graphicLayer.addGraphic(graphicJD)

  // 摄像头朝向的地面点连线
  const graphicLine = new mars3d.graphic.PolylineEntity({
    positions: new Cesium.CallbackProperty(function (time) {
      if (!positionSXT || !positionDM || positionJD != null) {
        return []
      }
      return [positionSXT, positionDM]
    }, false),
    style: {
      width: 2,
      arcType: Cesium.ArcType.NONE,
      color: "#ffff00"
    }
  })
  graphicLayer.addGraphic(graphicLine)


}


// 计算与地面焦点
function getCenter() {
    if (!positionSXT || !positionDM) {
      return []
    }

    sightline.clear()
    sightline.addAsync(positionSXT, positionDM)
}

// 设置摄像头位置
function sePoint() {
   map.graphicLayer.clear()
    map.graphicLayer.startDraw({
      type: "point",
      style: {
        pixelSize: 8,
        color: "#ffff00",
        label: {
          text: "摄像头",
          font_size: 20,
          color: "#ffffff",
          outline: true,
          outlineColor: "#000000",
          pixelOffsetY: -20
        }
      },
      success: function (graphic) {
        positionSXT = graphic.positionShow
        positionSXT = mars3d.PointUtil.addPositionsHeight(positionSXT, 5.0) // 增加杆子高度

        updateModel()
      }
    })
}


function testTerrain(val) {
  map.scene.globe.depthTestAgainstTerrain = val
  if (val) {
    globalMsg("深度监测打开后，您将无法看到地下或被地形遮挡的对象")
  }
}

function updateModel(heading, pitch, roll) {
  if (!positionSXT) {
    return
  }

  var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  positionDM = mars3d.PointUtil.getRayEarthPosition(positionSXT, hpr, true, map.scene.globe.ellipsoid)

  if (!positionDM) {
    // 与地面无交点时
    positionDM = mars3d.PointUtil.getPositionByHprAndLen(positionSXT, hpr, 5000)
  }

  sightline.clear()

  positionJD = null
}
