var map
var graphicLayer
var echartTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 29.526546, lng: 119.823425, alt: 803, heading: 178, pitch: -27 },
      fxaa: true
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/tower.json" })
    .then(function (res) {
      showData(res.data)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

function showData(arrdata) {
  var polylines1 = []
  var polylines2 = []
  var polylines3 = []
  var polylines4 = []
  var polylines5 = []
  var polylinesTB = []
  for (var i = 0; i < arrdata.length; i++) {
    var item = arrdata[i]

    // 所在经纬度坐标及海拔高度
    var longitude = Number(item.longitude)
    var latitude = Number(item.latitude)
    var height = Number(item.height)

    var originPoint = {
      longitude: longitude,
      latitude: latitude,
      height: height
    }
    var position = Cesium.Cartesian3.fromDegrees(originPoint.longitude, originPoint.latitude, originPoint.height)

    // 计算电线塔转角角度
    var degree = parseInt(item.degree)

    // 5条线路坐标
    const hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(degree), 0, 0)
    var newPoint1 = mars3d.PointUtil.getPositionByHprAndOffset(position, new Cesium.Cartesian3(0.341789, 16.837972, 50.717621), hpr)
    var newPoint2 = mars3d.PointUtil.getPositionByHprAndOffset(position, new Cesium.Cartesian3(0.34241, -16.838163, 50.717617), hpr)
    var newPoint3 = mars3d.PointUtil.getPositionByHprAndOffset(position, new Cesium.Cartesian3(-0.025005, 0.022878, 39.540545), hpr)
    var newPoint4 = mars3d.PointUtil.getPositionByHprAndOffset(position, new Cesium.Cartesian3(-0.024999, 15.009109, 39.303012), hpr)
    var newPoint5 = mars3d.PointUtil.getPositionByHprAndOffset(position, new Cesium.Cartesian3(-0.025001, -15.009585, 39.301099), hpr)

    polylinesTB.push(newPoint3) // 图标显示的点

    if (i === 0) {
      polylines1.push(newPoint1)
      polylines2.push(newPoint2)
      polylines3.push(newPoint3)
      polylines4.push(newPoint4)
      polylines5.push(newPoint5)
    } else {
      var angularityFactor = -5000
      var num = 50
      var positions = mars3d.PolyUtil.getLinkedPointList(polylines1[polylines1.length - 1], newPoint1, angularityFactor, num) // 计算曲线点
      polylines1 = polylines1.concat(positions)

      positions = mars3d.PolyUtil.getLinkedPointList(polylines2[polylines2.length - 1], newPoint2, angularityFactor, num) // 计算曲线点
      polylines2 = polylines2.concat(positions)

      positions = mars3d.PolyUtil.getLinkedPointList(polylines3[polylines3.length - 1], newPoint3, angularityFactor, num) // 计算曲线点
      polylines3 = polylines3.concat(positions)

      positions = mars3d.PolyUtil.getLinkedPointList(polylines4[polylines4.length - 1], newPoint4, angularityFactor, num) // 计算曲线点
      polylines4 = polylines4.concat(positions)

      positions = mars3d.PolyUtil.getLinkedPointList(polylines5[polylines5.length - 1], newPoint5, angularityFactor, num) // 计算曲线点
      polylines5 = polylines5.concat(positions)
    }

    var html = mars3d.Util.getTemplateHtml({
      title: "塔杆",
      template: [
        { field: "roadName", name: "所属线路" },
        { field: "towerId", name: "杆塔编号" },
        { field: "杆塔型号", name: "杆塔型号" },
        { field: "杆塔性质", name: "杆塔性质" },
        { field: "杆塔类型", name: "杆塔类型" },
        { field: "投运日期", name: "投运日期" },
        { field: "杆塔全高", name: "杆塔全高" },
        { field: "设计单位", name: "设计单位" },
        { field: "施工单位", name: "施工单位" },
        { field: "height", name: "海拔高度" }
      ],
      attr: item
    })

    drawWireTowerModel(position, degree, html)
  }

  // 绘制路线
  drawGuideLine(polylines1, "#ffffff")
  drawGuideLine(polylines2, "#ffffff")
  drawGuideLine(polylines3)
  drawGuideLine(polylines4, "#ff0000")
  drawGuideLine(polylines5, "#0000ff")

  // 绘制断面图echarts图表
  computeSurfacePointsHeight(polylinesTB)
}

// 绘制电线塔模型
function drawWireTowerModel(position, degree, inthtml) {
  var modelUrls = ["tower.glb", "V.glb", "vertical01.glb", "vertical02.glb"]
  for (var j = 0; j < modelUrls.length; j++) {
    var primitive = new mars3d.graphic.ModelPrimitive({
      position: position,
      style: {
        url: "//data.mars3d.cn/gltf/mars/tower/" + modelUrls[j],
        heading: degree,
        scale: 1,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 4000.0)
      }
    })
    graphicLayer.addGraphic(primitive)

    primitive.bindPopup(inthtml)
  }
}

function drawGuideLine(positions, color) {
  var primitive = new mars3d.graphic.PolylinePrimitive({
    positions: positions,
    style: {
      width: 4,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.Color, {
        color: color || "#ffff00"
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

// 绘制断面图echarts图表
function computeSurfacePointsHeight(polylines5) {
  // 绘制断面图
  mars3d.PolyUtil.computeSurfacePoints({
    scene: map.scene,
    positions: polylines5, // 需要计算的源路线坐标数组
    callback: function (raisedPositions) {
      // raisedPositions为含高程信息的新坐标数组，noHeight为标识是否存在无地形数据。
      var heightArry = []
      var heightTDArray = []
      var distanceArray
      for (let i = 0; i < polylines5.length; i++) {
        const item = polylines5[i]
        const carto = Cesium.Cartographic.fromCartesian(item)

        const height = mars3d.Util.formatNum(carto.height) // 设计高度  当小数点后面的数字一致时，会省略小数点，不显示
        const tdHeight = mars3d.Util.formatNum(Cesium.Cartographic.fromCartesian(raisedPositions[i]).height) // 地面高度
        heightArry.push(height)
        heightTDArray.push(tdHeight)

        // 距离数组
        var positionsLineFirst = raisedPositions[0]
        distanceArray = raisedPositions.map(function (data) {
          return Math.round(Cesium.Cartesian3.distance(data, positionsLineFirst)) // 计算两点之间的距离,返回距离
        })
      }
      echartTarget.fire("addEchart", { heightArry, heightTDArray, distanceArray })
    }
  })
}
