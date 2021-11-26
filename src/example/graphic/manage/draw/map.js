var map
var graphicLayer
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    control: {
      infoBox: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  graphicLayer = new mars3d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(graphicLayer)

  eventTarget.fire("beforeUI", { graphicLayer })

  // 自定义提示
  // mars3d.Lang["_单击开始绘制"][0] = "新的提示内容";
  // mars3d.Lang["_单击增加点右击删除点"][0] = "新的提示内容";
  // mars3d.Lang["_双击完成绘制"][0] = "";

  /* // 绑定标绘相关事件监听(可以自行加相关代码实现业务需求，此处主要做示例)
  graphicLayer.on(mars3d.EventType.drawStart, function (e) {
    console.log("开始绘制", e)
  })
  graphicLayer.on(mars3d.EventType.drawAddPoint, function (e) {
    console.log("绘制过程中增加了点", e)
  })
  graphicLayer.on(mars3d.EventType.drawRemovePoint, function (e) {
    console.log("绘制过程中删除了点", e)
  })

  graphicLayer.on(mars3d.EventType.drawCreated, function (e) {
    console.log("创建完成", e)
  })
  graphicLayer.on(mars3d.EventType.editStart, function (e) {
    console.log("开始编辑", e)
  })
  graphicLayer.on(mars3d.EventType.editMovePoint, function (e) {
    console.log("编辑修改了点", e)
  })
  graphicLayer.on(mars3d.EventType.editRemovePoint, function (e) {
    console.log("编辑删除了点", e)
  })
  graphicLayer.on(mars3d.EventType.editStop, function (e) {
    console.log("停止编辑", e)
  })
  graphicLayer.on(mars3d.EventType.removeGraphic, function (e) {
    console.log("删除了对象", e)
  }) */
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

  queryDrawData()
}

function queryDrawData() {
  // 加载历史演示数据
  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/mars3d-draw.json" })
    .then(function (json) {
      graphicLayer.loadGeoJSON(json, { clear: true, flyTo: true })
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

function drawPoint() {
  graphicLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 12,
      color: "#3388ff",
      label: {
        // 不需要文字时，去掉label配置即可
        text: "可以同时支持文字",
        font_size: 20,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -20
      }
    }
  })
}

function drawMarker() {
  graphicLayer.startDraw({
    type: "billboard",
    style: {
      image: "img/marker/mark1.png",
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      label: {
        // 不需要文字时，去掉label配置即可
        text: "可以同时支持文字",
        font_size: 26,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -60
      }
    }
  })
}

function drawLabel() {
  graphicLayer.startDraw({
    type: "label",
    style: {
      text: "火星科技三维地球",
      color: "#0081c2",
      font_size: 50,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2
    }
  })
}

function drawModel() {
  graphicLayer.startDraw({
    type: "model",
    style: {
      scale: 10,
      url: "//data.mars3d.cn/gltf/mars/firedrill/xiaofangche.gltf"
    }
  })
}

function drawPolyline(clampToGround) {
  graphicLayer.startDraw({
    type: "polyline",
    // maxPointNum: 2,  //限定最大点数，可以绘制2个点的线，自动结束
    style: {
      color: clampToGround ? "#ffff00" : "#3388ff",
      width: 3,
      clampToGround: clampToGround
    }
  })
}

function drawPolygon(clampToGround) {
  graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: clampToGround ? "#ffff00" : "#3388ff",
      opacity: 0.5,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2.0,
      clampToGround: clampToGround
    }
  })
}

function drawCurve(clampToGround) {
  graphicLayer.startDraw({
    type: "curve",
    style: {
      color: clampToGround ? "#ffff00" : "#3388ff",
      width: 3,
      clampToGround: clampToGround
    }
  })
}

function drawCorridor(clampToGround) {
  graphicLayer.startDraw({
    type: "corridor",
    style: {
      color: clampToGround ? "#ffff00" : "#3388ff",
      opacity: 0.6,
      width: 500,
      clampToGround: clampToGround
    }
  })
}

function drawEllipse(clampToGround) {
  graphicLayer.startDraw({
    type: "circle",
    style: {
      color: clampToGround ? "#ffff00" : "#3388ff",
      opacity: 0.6,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2.0,
      clampToGround: clampToGround
    }
  })
}

function drawRectangle(clampToGround) {
  graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: clampToGround ? "#ffff00" : "#3388ff",
      opacity: 0.6,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2.0,
      clampToGround: clampToGround
    }
  })
}

function draPlane() {
  graphicLayer.startDraw({
    type: "plane",
    style: {
      color: "#00ff00",
      opacity: 0.8,
      plane_normal: "x",
      dimensions_x: 1000.0,
      dimensions_y: 1000.0
    }
  })
}

function draWall(closure) {
  graphicLayer.startDraw({
    type: "wall",
    style: {
      color: "#00ff00",
      opacity: 0.8,
      diffHeight: 400,
      closure: closure // 是否闭合
    }
  })
}

function drawBox() {
  graphicLayer.startDraw({
    type: "box",
    style: {
      color: "#00ff00",
      opacity: 0.6,
      dimensions_x: 1000.0,
      dimensions_y: 1000.0,
      dimensions_z: 1000.0
    }
  })
}

function drawCylinder() {
  graphicLayer.startDraw({
    type: "cylinder",
    style: {
      fill: true,
      color: "#00ff00",
      opacity: 0.6,
      length: 1000
    }
  })
}

function drawEllipsoid() {
  graphicLayer.startDraw({
    type: "ellipsoid",
    style: {
      fill: true,
      color: "#00ff00",
      opacity: 0.6
    }
  })
}

function drawExtrudedPolygon() {
  graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#00ff00",
      opacity: 0.6,
      diffHeight: 300
    }
  })
}

function drawExtrudedRectangle() {
  graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#00ff00",
      opacity: 0.6,
      diffHeight: 300
    }
  })
}

function drawExtrudedCircle() {
  graphicLayer.startDraw({
    type: "circle",
    style: {
      color: "#00ff00",
      opacity: 0.6,
      diffHeight: 300
    }
  })
}

// 打开保存的文件
function openGeoJSON(file) {
  const fileName = file.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()

  if (fileType == "json" || fileType == "geojson") {
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onloadend = function (e) {
      const json = this.result
      graphicLayer.loadGeoJSON(json, {
        flyTo: true
      })
    }
  } else if (fileType == "kml") {
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onloadend = function (e) {
      const strkml = this.result
      // eslint-disable-next-line no-undef
      kgUtil.toGeoJSON(strkml).then((geojoson) => {
        console.log("kml2geojson", geojoson)

        graphicLayer.loadGeoJSON(geojoson, {
          flyTo: true
        })
      })
    }
  } else if (fileType == "kmz") {
    // 加载input文件控件的二进制流
    // eslint-disable-next-line no-undef
    kgUtil.toGeoJSON(file).then((geojoson) => {
      console.log("kmz2geojson", geojoson)

      graphicLayer.loadGeoJSON(geojoson, {
        flyTo: true
      })
    })
  } else {
    globalMsg("暂不支持 " + fileType + " 文件类型的数据！")
  }
}

let modelTest
function centerAtModel() {
  map.setCameraView({ lat: 33.590452, lng: 119.032184, alt: 185, heading: 359, pitch: -34 })

  // 三维模型
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
