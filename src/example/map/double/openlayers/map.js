import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.841977, lng: 117.141788, alt: 1043, heading: 90, pitch: -51 },
    fxaa: true
  }
}

// 二三维地图联动控制
const mapManager = {
  createMap2D: function (viewer) {
    const tileWorldImagery = new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        crossOrigin: "Anonymous"
      })
    })

    const map2d = new ol.Map({
      target: "map2d",
      projection: "EPSG:3857",
      layers: [tileWorldImagery],

      view: new ol.View({
        center: ol.proj.fromLonLat([134.364805, 26.710497]),
        zoom: 4,
        minZoom: 2
      })
    })
    this.map2d = map2d

    // 联动控制器

    this.ol3d = new olcs.OLCesium({ map: map2d, viewer: viewer })

    mapManager.viewTo23D() // 默认
  },
  viewTo23D: function () {
    const dom2d = document.getElementById("centerDiv2D")
    const dom3d = document.getElementById("centerDiv3D")
    dom3d.style.left = "50%"
    dom2d.style.width = "50%"
    dom3d.style.width = "50%"

    this.map2d.updateSize()
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

  creat2dDom()

  setTimeout(() => {
    mapManager.createMap2D(map)
  }, 1000)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function creat2dDom() {
  const mapDiv = mars3d.DomUtil.create("div", "", document.body)
  mapDiv.setAttribute("id", "centerDiv2D")
  const map2ds = mars3d.DomUtil.create("div", "", mapDiv)
  map2ds.setAttribute("id", "map2d")
  map2ds.setAttribute("class", "mars2d-container")
}
