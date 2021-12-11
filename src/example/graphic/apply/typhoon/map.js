import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 8.560501, lng: 111.849127, alt: 10725692, heading: 358, pitch: -87 }
  }
}

export const eventTarget = new mars3d.BaseClass()

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 绘制24/48小时警戒线
  drawWarningLine()
  queryTyphoonList()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

let typhoonListObj = {}

// 勾选了台风
let typhoonObj
let selectTF
export function selectOneTyphoon(row) {
  typhoonListObj = {}
  if (typhoonListObj[row.id]) {
    const typhoon = typhoonListObj[row.id]
    typhoon.show = true
    typhoon.flyTo()
  } else {
    mars3d.Resource.fetchJson({ url: "http://data.mars3d.cn/file/apidemo/typhoon/view_" + row.id + ".json" })
      .then(function (res) {
        const newData = conversionPathData(res.typhoon) // 在Typhoon.js中


        typhoonObj = new Typhoon({ ...row, ...newData }, map)
        typhoonObj.flyTo()

        eventTarget.fire("pathList", { typhoonObj })

        selectTF = typhoonObj

        typhoonListObj[row.id] = typhoonObj // 绑定到数据中，方便使用
      })
      .otherwise(function (error) {
        console.log("加载JSON出错", error)
      })
  }
}

export function clickPathRow(row) {
  typhoonObj.showPointFQ(row)
  const graphic = typhoonObj.getPointById(row.id)
  if (graphic) {
    graphic.flyTo({
      radius: 1600000,
      complete() {
        graphic.openTooltip()
      }
    })
  }
}

export function clickTyRow(row) {
  if (typhoonListObj[row.id]) {
    selectOneTyphoon(row)
  }
}

// 取消勾选台风
export function unSelectOneTyphoon(row) {
  const typhoon = typhoonListObj[row.id]
  if (typhoon == selectTF) {
    stopPlay()
  }
  if (typhoon) {
    typhoon.show = false
  }
}

// 访问后端接口，取台风列表数据
function queryTyphoonList() {
  // url: "http://typhoon.nmc.cn/weatherservice/typhoon/jsons/list_default", //在线实时接口
  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/typhoon/list_2020.json" })
    .then(function (arr) {
      eventTarget.fire("loadOk", { arr })
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

// 开始播放
export function startPlay() {
  if (!selectTF) {
    return
  }

  selectTF.playTyphoon = selectTF.playTyphoon || new PlayTyphoon(selectTF.options, map)
  selectTF.playTyphoon.start()
  selectTF.show = false
}
// 停止播放
export function stopPlay() {
  if (selectTF?.playTyphoon) {
    selectTF.playTyphoon.stop()
    selectTF.show = true
  }
}

// 转换数据,将后端接口数据转换为需要的格式
function conversionPathData(oldData) {
  const path = []
  oldData[8].forEach((message) => {
    let circle7
    let circle10
    let circle12
    message[10].forEach((level) => {
      const radiusObj = {
        speed: level[0],
        radius1: level[1],
        radius2: level[2],
        radius3: level[3],
        radius4: level[4]
      }

      if (level[0] == "30KTS") {
        circle7 = radiusObj
      } else if (level[0] == "50KTS") {
        circle10 = radiusObj
      } else if (level[0] == "64KTS") {
        circle12 = radiusObj
      } else {
        console.log("未处理风圈", radiusObj)
      }
    })

    // 预测路径
    const babj = message[11]?.BABJ
    let arrForecast
    if (babj) {
      arrForecast = []
      babj.forEach((element) => {
        const newArr = {
          time: element[0], // 几小时预报
          time_str: element[1],
          lon: element[2], // 预报经度
          lat: element[3], // 预报纬度
          strength: element[4], // 中心气压
          centerSpeed: element[5], // 最大风速  m/s
          level: element[7], // 预报台风等级, 代码
          color: getColor(element[7]) // 对应等级的颜色
        }
        arrForecast.push(newArr)
      })
    }

    const time = mars3d.Util.formatDate(new Date(message[2]), "yyyy-M-d HH:mm") // 时间

    path.push({
      id: message[0], // 唯一标识
      time: new Date(message[2]), // 时间
      time_str: time, // 时间格式化字符串
      level: message[3], // 台风等级, 代码
      level_str: getLevelStr(message[3]),
      color: getColor(message[3]), // 对应等级的颜色
      lon: message[4], // 经度
      lat: message[5], // 纬度
      strength: message[6], // 中心气压,百帕
      centerSpeed: message[7], // 最大风速,米/秒
      moveTo: message[8], // 移动方向, 代码
      moveTo_str: getMoveToStr(message[8]),
      windSpeed: message[9], // 移动速度,公里/小时

      circle7: circle7, // 7级风圈, 对象
      circle10: circle10, // 10级风圈, 对象
      circle12: circle12, // 12级风圈, 对象
      forecast: arrForecast // 预测路径, 数组
    })
  })

  return {
    id: oldData[0],
    name_en: oldData[1], // 台风名字,英文
    name_cn: oldData[2], // 台风名字
    typnumber: oldData[3], // 台风编号
    state: oldData[7],
    path: path
  }
}

// 不同等级的台风对应不同的颜色
function getColor(level) {
  switch (level) {
    default:
    case "TD": // 热带低压
      return "rgb(238,209,57)"
    case "TS": // 热带风暴
      return "rgb(0,0,255)"
    case "STS": // 强热带风暴
      return "rgb(15,128,0)"
    case "TY": // 台风
      return "rgb(254,156,69)"
    case "STY": // 强台风
      return "rgb(254,0,254)"
    case "SuperTY": // 超强台风
      return "rgb(254,0,0)"
  }
}

function getLevelStr(value) {
  switch (value) {
    default:
    case "TD":
      return "热带低压"
    case "TS":
      return "热带风暴"
    case "STS":
      return "强热带风暴"
    case "TY":
      return "台风"
    case "STY":
      return "强台风"
    case "SuperTY":
      return "超强台风"
  }
}

function getMoveToStr(value) {
  switch (value) {
    default:
    case "N":
      return "北"
    case "NNE":
      return "北东北"
    case "NE":
      return "东北"
    case "ENE":
      return "东东北"
    case "E":
      return "东"
    case "ESE":
      return "东东南"
    case "ES":
      return "东南"
    case "SSE":
      return "南东南"
    case "S":
      return "南"
    case "SSW":
      return "南西南"
    case "SW":
      return "西南"
    case "WSW":
      return "西西南"
    case "W":
      return "西"
    case "WNW":
      return "西北西"
    case "NW":
      return "北西"
    case "NNW":
      return "北西北"
  }
}

// 绘制警戒线
function drawWarningLine() {
  // 绘制24小时警戒线
  const lineWarning24 = new mars3d.graphic.PolylineEntity({
    positions: [
      [127, 34],
      [127, 22],
      [119, 18],
      [119, 11],
      [113, 4.5],
      [105, 0]
    ],
    style: {
      color: "#828314",
      width: 2,
      zIndex: 1
    }
  })
  map.graphicLayer.addGraphic(lineWarning24)

  // 注记文本
  const textWarning24 = new mars3d.graphic.RectangleEntity({
    positions: [
      [128.129019, 29.104287],
      [125.850451, 28.424599]
    ],
    style: {
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.Text, {
        text: "24小时警戒线",
        font: "80px 楷体",
        color: "#828314",
        backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0)
      }),
      rotationDegree: 90,
      zIndex: 2
    }
  })
  map.graphicLayer.addGraphic(textWarning24)

  // 绘制48小时警戒线
  const lineWarning48 = new mars3d.graphic.PolylineEntity({
    positions: [
      [132, 34],
      [132, 22],
      [119, 0],
      [105, 0]
    ],
    style: {
      width: 2,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineDash, {
        dashLength: 20.0,
        color: "#4dba3d"
      }),
      zIndex: 1
    }
  })
  map.graphicLayer.addGraphic(lineWarning48)

  // 注记文本
  const textWarning48 = new mars3d.graphic.RectangleEntity({
    positions: [
      [130.502492, 25.959716],
      [133.423638, 26.772991]
    ],
    style: {
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.Text, {
        text: "48小时警戒线",
        font: "80px 楷体",
        color: "#4dba3d",
        backgroundColor: new Cesium.Color(0.0, 0.0, 0.0, 0)
      }),
      rotationDegree: 90,
      zIndex: 4
    }
  })
  map.graphicLayer.addGraphic(textWarning48)
}
