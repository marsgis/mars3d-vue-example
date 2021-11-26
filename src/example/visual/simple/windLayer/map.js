var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 20.648765, lng: 129.340334, alt: 19999976, heading: 355, pitch: -89 }
    },
    control: {
      sceneModePicker: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 蓝色底图

  var windLayer = new mars3d.layer.WindLayer({
    maxParticles: 9000,
    particleHeight: 1.0,
    fadeOpacity: 0.996,
    dropRate: 0.003,
    dropRateBump: 0.01,
    speedFactor: 0.2,
    lineWidth: 4.0
  })
  map.addLayer(windLayer)

  DataProcess.loadData("//data.mars3d.cn/file/apidemo/wind.nc", "//data.mars3d.cn/file/apidemo/windColor.json").then((data) => {
    console.log("加载数据", data)
    windLayer.setData(data)
  })

  // 参数调整面板
  function onParticleSystemOptionsChange() {
    windLayer.setOptions()
  }

  // eslint-disable-next-line no-undef
  var gui = new dat.GUI({
    autoPlace: false
  })
  gui.add(windLayer, "maxParticles", 1, 256 * 256, 1).onFinishChange(onParticleSystemOptionsChange)
  gui.add(windLayer, "particleHeight", 1, 10000, 1).onFinishChange(onParticleSystemOptionsChange)
  gui.add(windLayer, "fadeOpacity", 0.9, 0.999, 0.001).onFinishChange(onParticleSystemOptionsChange)
  gui.add(windLayer, "dropRate", 0.0, 0.1).onFinishChange(onParticleSystemOptionsChange)
  gui.add(windLayer, "dropRateBump", 0, 0.2).onFinishChange(onParticleSystemOptionsChange)
  gui.add(windLayer, "speedFactor", 0.05, 1).onFinishChange(onParticleSystemOptionsChange)
  gui.add(windLayer, "lineWidth", 0.01, 16.0).onFinishChange(onParticleSystemOptionsChange)

  mars3d.DomUtil.addClass(gui.domElement, "infoview")
  document.body.appendChild(gui.domElement)
}

// 数据加载类
var DataProcess = (function () {
  var data

  var loadNetCDF = function (filePath) {
    return new Promise(function (resolve) {
      var request = new XMLHttpRequest()
      request.open("GET", filePath)
      request.responseType = "arraybuffer"

      request.onload = function () {
        var arrayToMap = function (array) {
          return array.reduce(function (map, object) {
            map[object.name] = object
            return map
          }, {})
        }

        // eslint-disable-next-line new-cap
        var NetCDF = new netcdfjs(request.response)
        var dimensions = arrayToMap(NetCDF.dimensions)

        var variables = arrayToMap(NetCDF.variables)
        var uAttributes = arrayToMap(variables.U.attributes) //
        var vAttributes = arrayToMap(variables.V.attributes)

        var arrLon = NetCDF.getDataVariable("lon").flat()
        var arrLat = NetCDF.getDataVariable("lat").flat()
        var arrLev = [1] // NetCDF.getDataVariable('lev').flat()

        var arrU = NetCDF.getDataVariable("U").flat()
        var maxU = uAttributes.max.value
        var minU = uAttributes.min.value

        var arrV = NetCDF.getDataVariable("V").flat()
        var maxV = vAttributes.max.value
        var minV = vAttributes.min.value

        data = {}
        data.dimensions = {} // dimensions: {lon: 720, lat: 361, lev: 1}
        data.dimensions.lon = arrLon.length
        data.dimensions.lat = arrLat.length
        data.dimensions.lev = arrLev.length

        data.lon = {} // lon: {min: 0, max: 359.5}
        data.lon.min = Math.min(...arrLon)
        data.lon.max = Math.max(...arrLon)

        data.lat = {} // lat: {min: -90, max: 90}
        data.lat.min = Math.min(...arrLat)
        data.lat.max = Math.max(...arrLat)

        data.lev = {} // lev: {min: 1, max: 1}
        data.lev.min = Math.min(...arrLev)
        data.lev.max = Math.max(...arrLev)

        data.U = {}
        data.U.array = new Float32Array(arrU)
        data.U.min = minU
        data.U.max = maxU

        data.V = {}
        data.V.array = new Float32Array(arrV)
        data.V.min = minV
        data.V.max = maxV

        resolve(data)
      }

      request.send()
    })
  }

  var loadText = function (filePath) {
    var request = new XMLHttpRequest()
    request.open("GET", filePath, false)
    request.send()
    return request.responseText
  }

  var loadColorTable = function (filePath) {
    var string = loadText(filePath)
    var json = JSON.parse(string)

    var colorNum = json.ncolors
    var colorTable = json.colorTable

    var colorsArray = new Float32Array(3 * colorNum)
    for (var i = 0; i < colorNum; i++) {
      colorsArray[3 * i] = colorTable[3 * i]
      colorsArray[3 * i + 1] = colorTable[3 * i + 1]
      colorsArray[3 * i + 2] = colorTable[3 * i + 2]
    }

    data.colorTable = {}
    data.colorTable.colorNum = colorNum
    data.colorTable.array = colorsArray
  }

  var loadData = async function (ncFilePath, colorTableFilePath) {
    await loadNetCDF(ncFilePath)
    loadColorTable(colorTableFilePath)
    return data
  }

  return {
    loadData: loadData
  }
})()
