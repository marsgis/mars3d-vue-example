import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 29.808307, lng: 110.597446, alt: 7852846, heading: 353, pitch: -86 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建mapv图层
  createMapvLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function createMapvLayer() {
  let randomCount = 1000
  const data = []
  const citys = [
    "北京",
    "天津",
    "上海",
    "重庆",
    "石家庄",
    "太原",
    "呼和浩特",
    "哈尔滨",
    "长春",
    "沈阳",
    "济南",
    "南京",
    "合肥",
    "杭州",
    "南昌",
    "福州",
    "郑州",
    "武汉",
    "长沙",
    "广州",
    "南宁",
    "西安",
    "银川",
    "兰州",
    "西宁",
    "乌鲁木齐",
    "成都",
    "贵阳",
    "昆明",
    "拉萨",
    "海口"
  ]

  // 自定义数据
  while (randomCount--) {
    const cityCenter1 = this.mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
    const cityCenter2 = this.mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
    data.push({
      geometry: {
        type: "LineString",
        coordinates: [
          [cityCenter1.lng - 1 + Math.random() * 1, cityCenter1.lat - 1 + Math.random() * 1],
          [cityCenter2.lng - 1 + Math.random() * 1, cityCenter2.lat - 1 + Math.random() * 1]
        ]
      },
      count: 30 * Math.random()
    })
  }

  const options = {
    gradient: {
      0: "blue",
      0.5: "yellow",
      1: "red"
    },
    lineWidth: 0.5,
    max: 30,
    draw: "intensity"
  }
  const dataSet = new this.mapv.DataSet(data)
  // 创建MapV图层
  const mapVLayer = new mars3d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}
