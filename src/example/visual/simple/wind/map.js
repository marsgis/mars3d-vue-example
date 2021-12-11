import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 20.648765, lng: 129.340334, alt: 19999976, heading: 355, pitch: -89 }
  },
  control: {
    sceneModePicker: false
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

  map.basemap = 2017 // 蓝色底图
  addLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

let windLayer
function addLayer() {
  windLayer = new mars3d.layer.WindLayer({
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
    windLayer.setData(data)
  })
}

// 参数调整面板
export function onParticleSystemOptionsChange(options) {
  const option = {
    maxParticles: options.maxParticles,
    particleHeight: options.particleHeight,
    fadeOpacity: options.fadeOpacity,
    dropRate: options.dropRate,
    dropRateBump: options.dropRateBump,
    speedFactor: options.speedFactor,
    lineWidth: options.lineWidth
  }
  windLayer.setOptions(option)
}

// 数据加载类
const DataProcess = (function () {
  let data

  const loadNetCDF = function (filePath) {
    return new Promise(function (resolve) {
      const request = new XMLHttpRequest()
      request.open("GET", filePath)
      request.responseType = "arraybuffer"

      request.onload = function () {
        const arrayToMap = function (array) {
          return array.reduce(function (map, object) {
            map[object.name] = object
            return map
          }, {})
        }

        // eslint-disable-next-line new-cap
        const NetCDF = new netcdfjs(request.response)
        const dimensions = arrayToMap(NetCDF.dimensions)

        const variables = arrayToMap(NetCDF.variables)
        const uAttributes = arrayToMap(variables.U.attributes) //
        const vAttributes = arrayToMap(variables.V.attributes)

        const arrLon = NetCDF.getDataVariable("lon").flat()
        const arrLat = NetCDF.getDataVariable("lat").flat()
        const arrLev = [1] // NetCDF.getDataVariable('lev').flat()

        const arrU = NetCDF.getDataVariable("U").flat()
        const maxU = uAttributes.max.value
        const minU = uAttributes.min.value

        const arrV = NetCDF.getDataVariable("V").flat()
        const maxV = vAttributes.max.value
        const minV = vAttributes.min.value

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

  const loadText = function (filePath) {
    const request = new XMLHttpRequest()
    request.open("GET", filePath, false)
    request.send()
    return request.responseText
  }

  const loadColorTable = function (filePath) {
    const string = loadText(filePath)
    const json = JSON.parse(string)

    const colorNum = json.ncolors
    const colorTable = json.colorTable

    const colorsArray = new Float32Array(3 * colorNum)
    for (let i = 0; i < colorNum; i++) {
      colorsArray[3 * i] = colorTable[3 * i]
      colorsArray[3 * i + 1] = colorTable[3 * i + 1]
      colorsArray[3 * i + 2] = colorTable[3 * i + 2]
    }

    data.colorTable = {}
    data.colorTable.colorNum = colorNum
    data.colorTable.array = colorsArray
  }

  const loadData = async function (ncFilePath, colorTableFilePath) {
    await loadNetCDF(ncFilePath)
    loadColorTable(colorTableFilePath)
    return data
  }

  return {
    loadData: loadData
  }
})()
