// 最佳的二三维联动是：https://github.com/openlayers/ol-cesium

var map3d

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})
  // 创建三维地球场景
  map3d = new mars3d.Map("mars3dContainer", mapOptions)
  creatDom()
  showLoading()
  // 读取 config.json 配置文件
  var configUrl = "http://mars2d.cn/example/config/config.json"
  return mars2d.axios
    .get(configUrl)
    .then(function (response) {
      // 构建地图
      mapManager.createMap2D("map2d", response.data.map)
      mapManager.bind3D(map3d)
      mapManager.viewTo23D() // 默认
      hideLoading()
    })
    .catch(function (error) {
      hideLoading()
      console.log(error)
      globalMsg(error && error.message, "error")
    })
}

function creatDom() {
  const mapDiv = mars3d.DomUtil.create("div", "", document.body)
  mapDiv.setAttribute("id", "centerDiv")
  const map2dDiv = mars3d.DomUtil.create("div", "", mapDiv)
  map2dDiv.setAttribute("id", "map2d")
  map2dDiv.setAttribute("class", "mars2d-container")
}

// 二三维地图联动控制
var mapManager = {
  map2d: null, // leaflet map 对象
  map3d: null, // cesium map3d对象
  createMap2D: function (id, mapOptions) {
    // 创建地图
    this.map2d = new mars2d.Map(id, mapOptions)
    this.bind2dEvent(this.map2d)
  },
  bind3D: function (map3d) {
    this.map3d = map3d
    this.bind3dEvent()
    this._map_extentChangeHandler()
  },
  viewTo2d: function () {
    var to3dDom = document.getElementById("centerDiv3D")
    var to2dDom = document.getElementById("centerDiv")
    to3dDom.style.display = "none"
    to2dDom.style.display = "block"
    to2dDom.style.width = "100%"
    if (this.map2d) {
      this.map2d.invalidateSize(false)
    }
  },
  viewTo3d: function () {
    var to3dDom = document.getElementById("centerDiv3D")
    var to2dDom = document.getElementById("centerDiv")
    to2dDom.style.display = "none"
    to3dDom.style.display = "block"
    to3dDom.style.left = "0"
    to3dDom.style.width = "100%"
  },
  viewTo23D: function () {
    var to3dDom = document.getElementById("centerDiv3D")
    var to2dDom = document.getElementById("centerDiv")
    to3dDom.style.width = "50%"
    to2dDom.style.width = "50%"
    to3dDom.style.left = "50%"
    to3dDom.style.display = "block"
    to2dDom.style.display = "block"
    if (this.map2d) {
      this.map2d.invalidateSize(false)
    }
  },
  // 二维地图变化事件
  bind2dEvent: function () {
    this.map2d.on("drag", this._map_extentChangeHandler, this)
    this.map2d.on("zoomend", this._map_extentChangeHandler, this)
  },
  unbind2dEvent: function () {
    this.map2d.off("drag", this._map_extentChangeHandler, this)
    this.map2d.off("zoomend", this._map_extentChangeHandler, this)
  },
  _map_extentChangeHandler: function (e) {
    var bounds = this.map2d.getBounds()
    var extent = {
      xmin: bounds.getWest(),
      xmax: bounds.getEast(),
      ymin: bounds.getSouth(),
      ymax: bounds.getNorth()
    }
    console.log(`'二维地图变化了，区域： ${JSON.stringify(extent)} `)

    this.unbind3dEvent()
    this.map3d.camera.setView({
      destination: Cesium.Rectangle.fromDegrees(extent.xmin, extent.ymin, extent.xmax, extent.ymax)
    })
    this.bind3dEvent()
  },
  // 三维地图相机移动结束事件
  bind3dEvent: function () {
    this.map3d.on(mars3d.EventType.cameraChanged, this.camera_moveEndHandler, this)
  },
  unbind3dEvent: function () {
    this.map3d.off(mars3d.EventType.cameraChanged, this.camera_moveEndHandler, this)
  },
  camera_moveEndHandler: function (e) {
    // 范围对象
    var point = this.map3d.getCenter()
    var level = this.map3d.level
    console.log(`'三维地图变化了，位置： ${point.toString()},层级 ${level} `)

    this.unbind2dEvent()

    this.map2d.setView([point.lat, point.lng], level, { animate: false })

    this.bind2dEvent()
  }
}
