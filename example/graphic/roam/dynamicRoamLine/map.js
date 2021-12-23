import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.773622, lng: 117.077444, alt: 5441, heading: 359, pitch: -57 }
  }
}

export var eventTarget = new mars3d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 演示数据的时间
  map.clock.currentTime = Cesium.JulianDate.fromDate(new Date("2020-11-25 10:10:00"))

  // 加载车辆
  queryCarListApiData()
    .then(function (res) {
      var tableData = res.data
      eventTarget.fire("loadOk", { tableData })
      showCarList(tableData)
    })
    .otherwise(function () {
      globalMsg("查询信息失败")
    })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

var colors = [
  "rgb(40, 40, 255)",
  "rgb(0, 88, 176)",
  "rgb(0, 128, 255)",
  "rgb(0, 217, 0)",
  "rgb(0, 151, 0)",
  "rgb(255, 199, 83)",
  "rgb(255, 144, 30)",
  "rgb(202, 101, 0)",
  "rgb(255, 0, 0)"
]

// 访问car-list.json后端接口，取数据
function queryCarListApiData() {
  return mars3d.Resource.fetchJson({
    url: "//data.mars3d.cn/file/apidemo/car-list.json"
  })
}
// 访问car-path.json后端接口，取数据
function queryCarPathApiData() {
  return mars3d.Resource.fetchJson({
    url: "//data.mars3d.cn/file/apidemo/car-path.json"
  })
}

function showCarList(arr) {
  console.log("加载" + arr.length + "条")

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 鼠标移入提示信息
  graphicLayer.bindTooltip(function (event) {
    var data = event.graphic.options
    return "车辆编号：" + data.id + "<br />车牌号码：" + data.name
  })

  // 单击地图空白处
  map.on(mars3d.EventType.clickMap, function (event) {
    if (lastClickCar) {
      lastClickCar.removeShading("circle")
      lastClickCar = null
    }
  })

  // 绑定点击事件
  graphicLayer.on(mars3d.EventType.click, (event, position) => {
    var car = event.graphic
    console.log("单击了车辆", car)

    if (lastClickCar) {
      if (lastClickCar === car) {
        return
      } // 重复单击，跳出
      lastClickCar.removeShading("circle")
      lastClickCar = null
    }

    car.addShading({
      type: "circle",
      materialType: mars3d.MaterialType.CircleWave,
      speed: 10,
      count: 3,
      gradient: 0.1,
      radius: 50,
      color: "#ffff00",
      opacity: 0.3,
      show: true
    })
    lastClickCar = car

    // 视角定位下
    // car.flyToPoint({ radius: 1000 })
  })

  var lastClickCar

  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]

    item.show = true

    var modelParam
    switch (item.type) {
      default:
      case 1:
        modelParam = {
          scale: 2,
          url: "//data.mars3d.cn/gltf/mars/car/tufangche.glb"
        }
        break
      case 2:
        modelParam = {
          scale: 1,
          url: "//data.mars3d.cn/gltf/mars/car/wajueji.glb"
        }
        break
    }

    const car = new mars3d.graphic.DynamicRoamLine({
      id: item.id,
      name: item.name,
      model: {
        clampToGround: true,
        show: true,
        ...modelParam
      },
      shadow: [
        {
          type: "polyline",
          color: colors[i],
          width: 2,
          clampToGround: true,
          maxDistance: 500,
          show: true
        }
      ]
    })
    graphicLayer.addGraphic(car)
  }

  // 定时获取卡车和铲车的列表数据
  createPath()
}

// 取轨迹数据的时间间隔（单位：秒）
var timeStep = 10
var lastTime
// 首次获取并创建轨迹
function createPath() {
  // 取数据的时间范围，结束时间
  var date = Cesium.JulianDate.toDate(map.clock.currentTime)
  var endTime = mars3d.Util.formatDate(date, "yyyy-MM-dd HH:mm:ss")

  // 修改当前时间回退一分钟，因为数据永远是当前时间之前的。
  date.setSeconds(date.getSeconds() - 60)
  map.clock.currentTime = window.Cesium.JulianDate.fromDate(date)

  // 取数据的时间范围，开始时间
  date.setMinutes(date.getMinutes() - 10) // 初次取一定时间内的数据
  var beginTime = mars3d.Util.formatDate(date, "yyyy-MM-dd HH:mm:ss")

  // 记录最后一次读取数据的时间
  lastTime = endTime

  // 取数据
  getPathList(beginTime, endTime)

  // 定时更新
  setInterval(() => {
    updatePath()
  }, timeStep * 1000)
}

// 后续更新轨迹
function updatePath() {
  var beginTime = lastTime

  var date = new Date(beginTime)
  date.setSeconds(date.getSeconds() + timeStep)
  var endTime = mars3d.Util.formatDate(date, "yyyy-MM-dd HH:mm:ss")

  lastTime = endTime

  // 取数据
  getPathList(beginTime, endTime)
}

// 读取车辆gps坐标路径的接口
function getPathList(beginTime, endTime) {
  queryCarPathApiData()
    .then((res) => {
      var listALL = res.data || []
      // 因为读取静态json，为了演示动态，筛选数据内符合时间范围内的数据。
      // 真实接口中可以注释下面代码。
      const d_beginTime = new Date(beginTime)
      const d_endTime = new Date(endTime)
      const list = listALL.filter((item) => {
        var thistime = new Date(item.time)
        return thistime >= d_beginTime && thistime <= d_endTime
      })

      addLog(`${endTime} 获取到 ${list.length} 条GPS坐标记录`)
      // 循环车辆
      graphicLayer.eachGraphic((car) => {
        // 取出对应车辆的轨迹列表
        var path = list.filter((item) => {
          return item.id === car.id
        })

        if (path && path.length > 0) {
          // 更新车辆的轨迹
          car.updatePath(path, {
            timeColumn: "time",
            getPosition: function (item) {
              return Cesium.Cartesian3.fromDegrees(parseFloat(item.lon), parseFloat(item.lat), 0)
            }
          })
        }
      })
    })
    .otherwise(() => {
      globalMsg("实时查询气象信息失败，请稍候再试")
    })
}

function addLog(log) {
  eventTarget.fire("showMsg", { log })
}

export function onSelece(data, selected) {
  const car = graphicLayer.getGraphicById(data.key)
  if (!car) {
    return
  }
  if (selected) {
    car.show = true
    car.flyToPoint({ radius: 900 })
  } else {
    car.show = false
  }
}

function onChange(data) {
  data.forEach((item) => {
    const car = graphicLayer.getGraphicById(item)
    if (car) {
      car.flyToPoint({ radius: 900 })
    }
  })
}
