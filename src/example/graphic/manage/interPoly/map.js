/* eslint-disable no-undef */

var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 30.841762, lng: 116.26537, alt: 3281, heading: 39, pitch: -63 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

}

function removeAll() {
  map.graphicLayer.clear()
  clearInterResult() // 在js/showPolygonInter.js
}

function interPolygon(val) {
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#29cf34",
      opacity: 0.3,
      outline: true,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    success: function (graphic) {
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      // var splitNum = Number($("#txtSplitNum").val())
      var resultInter = mars3d.PolyUtil.interPolygon({
        scene: map.scene,
        positions: positions,
        splitNum: val // splitNum插值分割的个数
      })

      showInterResult(resultInter.list) // 在js/showPolygonInter.js
    }
  })
}

function interLine(val) {
  map.graphicLayer.startDraw({
    type: "polyline",
    style: {
      color: "#55ff33",
      width: 3
    },
    success: function (graphic) {
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      var arrLine = mars3d.PolyUtil.interLine(positions, {
        splitNum: val // 插值分割的个数
      })

      showInterLineResult(arrLine) // 在js/showPolygonInter.js
    }
  })
}

function interPolyline(val) {
  map.graphicLayer.startDraw({
    type: "polyline",
    style: {
      color: "#55ff33",
      width: 3,
      clampToGround: true
    },
    success: function (graphic) {
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      var arrLine = mars3d.PolyUtil.interPolyline({
        scene: map.scene,
        positions: positions,
        splitNum: val // 插值分割的个数
      })

      showInterLineResult(arrLine) // 在js/showPolygonInter.js
    }
  })
}
