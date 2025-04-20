import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer
export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 28.18408, lng: 116.160667, alt: 1138597, heading: 1, pitch: -78 },
    globe: {
      baseColor: "#a3b3c2"
    }
  },
  control: {
    infoBox: false
  },
  terrain: false,
  layers: [
    {
      type: "geojson",
      name: "全国省界",
      url: "https://data.mars3d.cn/file/geojson/areas/100000_full.json",
      symbol: {
        type: "polylineC",
        styleOptions: {
          width: 2,
          color: "#cccccc",
          opacity: 0.8
        }
      },
      allowDrillPick: true,
      show: true
    }
  ]
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.basemap = undefined

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    const pickedItem = event.pickedObject?.data
    // let attr = event.graphic.attr
    console.log("单击了合并对象中的单个值为", pickedItem)
  })

  bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效

  // 加一些演示数据
  addDemoGraphic1()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 加载演示数据
export function addDemoGraphic1() {
  graphicLayer.clear()

  map.setCameraView({ lat: 28.18408, lng: 116.160667, alt: 1138597, heading: 1, pitch: -78 })

  mars3d.Util.fetchJson({ url: "https://data.mars3d.cn/file/apidemo/windpoint.json" })
    .then(function (result) {
      const arr = result.data
      globalMsg("共加载" + arr.length + "个数据")

      const arrData = []
      for (let i = 0, len = arr.length; i < len; i++) {
        const item = arr[i]
        arrData.push({
          position: Cesium.Cartesian3.fromDegrees(item.x, item.y, 1000),
          style: {
            angle: 360 - item.dir, // 方向
            image: getImageBySpeed(item.speed), // 速度 ，使用不同图片
            width: 30, // 单位：像素
            height: 60
          },
          attr: item
        })
      }

      const flatBillboard = new mars3d.graphic.FlatBillboard({
        instances: arrData
      })
      graphicLayer.addGraphic(flatBillboard)

      eventTarget.fire("addTableData", { graphicLayer })
    })
    .catch(function (error) {
      console.log("加载JSON出错", error)
    })
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 1000)
  console.log("生成的测试网格坐标", result)

  const arrData = []
  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const index = j + 1

    const angle = random(0, 360) // 随机方向
    const speed = random(0, 60) // 随机数值

    arrData.push({
      position,
      style: {
        angle,
        image: getImageBySpeed(speed),
        width: 30, // 单位：像素
        height: 60
      },
      attr: { index }
    })
  }

  const flatBillboard = new mars3d.graphic.FlatBillboard({
    instances: arrData // 也可以后面通过属性传入
  })
  graphicLayer.addGraphic(flatBillboard)

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 在图层绑定Popup弹窗
export function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    attr["类型"] = event.graphic.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr })
  })
}

function getImageBySpeed(speed) {
  let windVaneUrl = "https://data.mars3d.cn/img/marker/wind/01.png"
  if (speed >= 0 && speed <= 2) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/01.png"
  } else if (speed > 2 && speed <= 4) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/02.png"
  } else if (speed > 4 && speed <= 6) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/03.png"
  } else if (speed > 6 && speed <= 8) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/04.png"
  } else if (speed > 8 && speed <= 10) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/05.png"
  } else if (speed > 10 && speed <= 12) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/06.png"
  } else if (speed > 12 && speed <= 14) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/07.png"
  } else if (speed > 14 && speed <= 16) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/08.png"
  } else if (speed > 16 && speed <= 18) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/09.png"
  } else if (speed > 18 && speed <= 20) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/10.png"
  } else if (speed > 20 && speed <= 22) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/11.png"
  } else if (speed > 22 && speed <= 24) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/12.png"
  } else if (speed > 24 && speed <= 26) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/13.png"
  } else if (speed > 26 && speed <= 28) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/14.png"
  } else if (speed > 28 && speed <= 30) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/15.png"
  } else if (speed > 30 && speed <= 32) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/16.png"
  } else if (speed > 32 && speed <= 34) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/17.png"
  } else if (speed > 34 && speed <= 36) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/18.png"
  } else if (speed > 36 && speed <= 38) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/19.png"
  } else if (speed > 38 && speed <= 40) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/20.png"
  } else if (speed > 40 && speed <= 42) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/21.png"
  } else if (speed > 42 && speed <= 44) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/22.png"
  } else if (speed > 44 && speed <= 46) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/23.png"
  } else if (speed > 46 && speed <= 48) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/24.png"
  } else if (speed > 48 && speed <= 50) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/25.png"
  } else if (speed > 50 && speed <= 52) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/26.png"
  } else if (speed > 52 && speed <= 54) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/27.png"
  } else if (speed > 54 && speed <= 56) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/28.png"
  } else if (speed > 56) {
    windVaneUrl = "https://data.mars3d.cn/img/marker/wind/29.png"
  }
  return windVaneUrl
}
