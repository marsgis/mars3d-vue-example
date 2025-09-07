import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: {
      lat: 31.799613,
      lng: 117.27357,
      alt: 72.55,
      heading: 59.8,
      pitch: -18,
      roll: 0
    }
  },
  control: {
    clockAnimate: true, // 时钟动画控制(左下角)
    timeline: true, // 是否显示时间线控件
    compass: { style: { bottom: "380px", left: "5px" } }
  }
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

// 时间控制参数
const args = {
  martTimeInter: null,
  cleanTimeInter: null
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // map.control.toolbar.container.style.bottom = "55px" // 修改toolbar控件的样式

  addLayer()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

function addLayer() {
  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 合肥高铁
  const coors = [
    [117.277697, 31.800233, 45],
    [117.262022, 31.798983, 45],
    [117.229506, 31.793351, 45],
    [117.215719, 31.791085, 45],
    [117.207234, 31.79079, 45],
    [117.180246, 31.790688, 45],
    [117.168311, 31.789785, 45],
    [117.152322, 31.789855, 45],
    [117.125297, 31.788849, 45],
    [117.091144, 31.787516, 45]
  ]

  const positions = mars3d.PointTrans.lonlats2cartesians(coors)

  // 插值求新路线（按固定间隔米数插值） positions输入的值需为笛卡尔空间xyz坐标数组
  const positionsNew = mars3d.PolyUtil.interLine(positions, {
    minDistance: 20 // 间隔20米
  })

  // 求对比的贴地地面高度（用于echarts展示）
  mars3d.PolyUtil.computeSurfacePoints({
    scene: map.scene,
    exact: true,
    positions: positionsNew // 需要计算的源路线坐标数组
  }).then((result) => {
    // raisedPositions为含高程信息的新坐标数组，noHeight为标识是否存在无地形数据。
    console.log("含高程信息的新坐标数组", result.positions)

    inintRoad(positionsNew, result.positions)
  })
}

// 构造动态高铁   positions:设计的路线    positionsTD地面的贴地路线（用于比较）
function inintRoad(positionsSJ, positionsTD) {
  const heightArray = []
  const heightTDArray = []
  const mpoints = []
  for (let i = 0; i < positionsSJ.length; i++) {
    const position = positionsSJ[i]
    const carto = Cesium.Cartographic.fromCartesian(position)
    const x = Cesium.Math.toDegrees(carto.longitude)
    const y = Cesium.Math.toDegrees(carto.latitude)

    const height = mars3d.Util.formatNum(carto.height) // 设计高度  当小数点后面的数字一致时，会省略小数点，不显示
    const tdHeight = mars3d.Util.formatNum(Cesium.Cartographic.fromCartesian(positionsTD[i]).height) // 地面高度

    heightArray.push(height)
    heightTDArray.push(tdHeight)
    mpoints.push([x, y, height, tdHeight])
  }

  //  距离数组
  const positionsLineFirst = positionsTD[0]
  const distanceArray = positionsTD.map(function (data) {
    return Math.round(Cesium.Cartesian3.distance(data, positionsLineFirst)) // 计算两点之间的距离,返回距离
  })

  // 显示echarts
  eventTarget.fire("dataLoaded", { heightArray, heightTDArray, distanceArray })
  //  画线
  const graphic = new mars3d.graphic.PolylinePrimitive({
    id: "设计路线",
    positions: positionsSJ,
    style: {
      width: 3,
      materialType: mars3d.MaterialType.PolylineDash, // 虚线
      materialOptions: {
        color: Cesium.Color.RED,
        dashLength: 20
      }
    }
  })
  graphicLayer.addGraphic(graphic)

  const primitiveTD = new mars3d.graphic.PolylinePrimitive({
    id: "贴地路线",
    positions: positionsTD,
    style: {
      width: 3,
      color: Cesium.Color.YELLOW
    }
  })
  graphicLayer.addGraphic(primitiveTD)

  // =================计算路线====================
  const speed = 180
  const start = map.clock.currentTime.clone()
  const arrStartTime = []
  let alltimes = 0
  // 16组车身+头尾2个车头 共18组
  for (let j = 0; j < 18; j++) {
    const timeSecond = 20 / (speed / 3.6) // 车身长度除以车速
    alltimes += timeSecond
    const stime = Cesium.JulianDate.addSeconds(start, alltimes, new Cesium.JulianDate()) // 每隔j秒，添加一次时间
    arrStartTime.push(stime)
  }

  // =================添加高铁车头================
  const graphicHead = addTrainHead(mpoints, speed, arrStartTime[0])

  // =================添加16组车身====================
  for (let j = 1, len = arrStartTime.length - 1; j < len; j++) {
    addTrainBody(mpoints, speed, arrStartTime[j])
  }

  // =================添加高铁车尾================
  const graphicRear = addTrainHead(mpoints, speed, arrStartTime[17], true) // 车尾部的反向车头

  // ==============添加铁路，定时更新================
  addRailway(graphicHead, mpoints)

  // 设置相机的视角跟随的Entity实例
  map.trackedEntity = graphicHead

  // =================时间相关====================
  const stop = graphicRear.timeRange.stopTime
  map.clock.startTime = start.clone()
  map.clock.stopTime = stop.clone()
  map.clock.currentTime = start.clone()
  map.clock.multiplier = 1 // 当前速度，默认为1
  map.clock.shouldAnimate = true // 是否开启时钟动画，默认true

  if (map.control.timeline) {
    map.control.timeline.zoomTo(start, stop)
  }

  // ==============更新echarts================
  let lastDistance

  function locTrain() {
    const t = parseInt(map.clock.currentTime.secondsOfDay - map.clock.startTime.secondsOfDay) // 时间差

    if (t >= heightArray.length) {
      // 高铁运行结束之后
      clearInterval(args.martTimeInter)
      clearInterval(args.cleanTimeInter)
      return
    }
    if (lastDistance === t) {
      return
    }
    lastDistance = t
    updateEchartsDistance(t, heightArray[t])
  }
  args.martTimeInter = setInterval(locTrain, 100)
}

// 添加车头
function addTrainHead(positions, speed, startTime, rotatePI) {
  const graphicModel = new mars3d.graphic.ModelEntity({
    name: "和谐号车头",
    position: {
      type: "time", // 时序动态坐标
      speed: speed,
      startTime,
      list: positions,
      forwardExtrapolationType: Cesium.ExtrapolationType.NONE, // 在最后1个结束时间之后，NONE时不显示，HOLD时显示结束时间对应坐标位置
      backwardExtrapolationType: Cesium.ExtrapolationType.NONE, //  在第1个开始时间之前，NONE时不显示，HOLD时显示开始时间对应坐标位置
      interpolation: true,
      interpolationDegree: 1,
      interpolationAlgorithm: Cesium.LinearApproximation
    },
    style: {
      url: "https://data.mars3d.cn/gltf/mars/train/heada.glb",
      scale: 0.001,
      minimumPixelSize: 16,
      heading: rotatePI ? 90 : -90,
      mergeOrientation: true // 用于设置模型不是标准的方向时的纠偏处理,在orientation基础的方式值上加上设置是heading值
    }
  })
  graphicLayer.addGraphic(graphicModel)
  return graphicModel
}

// 添加车身
function addTrainBody(positions, speed, startTime) {
  const graphicModel = new mars3d.graphic.ModelEntity({
    name: "和谐号车身",
    position: {
      type: "time", // 时序动态坐标
      speed: speed,
      startTime,
      list: positions,
      forwardExtrapolationType: Cesium.ExtrapolationType.NONE, // 在最后1个结束时间之后，NONE时不显示，HOLD时显示结束时间对应坐标位置
      backwardExtrapolationType: Cesium.ExtrapolationType.NONE, // 在第1个开始时间之前，NONE时不显示，HOLD时显示开始时间对应坐标位置
      interpolation: true,
      interpolationDegree: 1,
      interpolationAlgorithm: Cesium.LinearApproximation
    },
    style: {
      url: "https://data.mars3d.cn/gltf/mars/train/body.glb",
      scale: 0.001,
      minimumPixelSize: 16,
      heading: -90,
      mergeOrientation: true // 用于设置模型不是标准的方向时的纠偏处理,在orientation基础的方式值上加上设置是heading值
    }
  })
  graphicLayer.addGraphic(graphicModel)
  return graphicModel
}

// 添加铁路，定时更新
function addRailway(graphicHead, mpoints) {
  const positions = []
  const orientations = []

  const times = graphicHead.position._property._times
  const counts = times.length

  for (let k = 1; k < counts; k++) {
    const time = times[k]

    const position = graphicHead.position.getValue(time)
    positions.push(position)

    const orientation = graphicHead.orientation.getValue(time)
    orientations.push(orientation)
  }


  const showRoadIndexArr = []
  const showZhiJiaIndexArr = []
  const showZhuZiIndexArr = []

  const initRoadLength = 40

  for (let i = 0; i < initRoadLength; i++) {
    addData(i)
  }

  let hasTickIndex = -1

  let currentAddRoadIndex = initRoadLength - 1

  map.on(mars3d.EventType.clockTick, function (event) {
    const tickIndex =
      Math.floor(
        ((map.clock.currentTime.secondsOfDay - map.clock.startTime.secondsOfDay) /
          (map.clock.stopTime.secondsOfDay - map.clock.startTime.secondsOfDay)) *
          positions.length
      )
      // console.log("-----tickIndex", tickIndex)

      if (tickIndex > hasTickIndex && currentAddRoadIndex < positions.length) {
        hasTickIndex = tickIndex + 0.5
        addData(++currentAddRoadIndex)

        const showRoadLength = currentAddRoadIndex - tickIndex
        if (showRoadLength < 40 && currentAddRoadIndex > 40) {
          for (let i = 0; i < 40 - showRoadLength; i++) {
            // console.log("-----", currentAddRoadIndex)
            addData(++currentAddRoadIndex)
          }
        }

        // console.log("-----currentAddRoadIndex", currentAddRoadIndex)
      }

  })

  function addData(i) {
    // 添加轨道
    const id = "xl" + i
    const graphic = graphicLayer.getGraphicById(id)
    if (!graphic) {
      const graphicModel = new mars3d.graphic.ModelEntity({
        id,
        position: positions[i],
        orientation: orientations[i],
        style: {
          url: "https://data.mars3d.cn/gltf/mars/railway/railway.glb",
          scale: 0.001
        }
      })
      graphicLayer.addGraphic(graphicModel)
      showRoadIndexArr.push(graphicModel.id)
      if (i > initRoadLength + 40) {
          // 当轨道足够长的时候再开始删除尾部轨道
          const railId = showRoadIndexArr.shift()
          removeGraphic(railId)
      }
    }




    // 添加轨道支架
    if (i % 5 === 0) {
      const id = "xq" + i
      const graphic = graphicLayer.getGraphicById(id)
      if (!graphic) {
        const graphicModel = new mars3d.graphic.ModelEntity({
          id,
          position: positions[i],
          orientation: orientations[i],
          style: {
            url: "https://data.mars3d.cn/gltf/mars/railway/bridge.glb",
            scale: 0.001
          }
        })
        graphicLayer.addGraphic(graphicModel)
        showZhiJiaIndexArr.push(graphicModel.id)

        if (i > initRoadLength + 40) {
          const zhiJiaId = showZhiJiaIndexArr.shift()
          removeGraphic(zhiJiaId)
        }
      }
    }

    // // 添加轨道边的柱子
    if (i % 12 === 0) {
      const id = "xd" + i
      const graphic = graphicLayer.getGraphicById(id)
      if (!graphic) {
        const graphicModel = new mars3d.graphic.ModelEntity({
          id,
          position: positions[i],
          orientation: orientations[i],
          style: {
            url: "https://data.mars3d.cn/gltf/mars/railway/jiazi.glb",
            scale: 0.001
          }
        })
        graphicLayer.addGraphic(graphicModel)
        showZhuZiIndexArr.push(graphicModel.id)


        if (i > initRoadLength + 40) {
          const zhuZiId = showZhuZiIndexArr.shift()
          removeGraphic(zhuZiId)
        }
      }
    }
  }

}

function removeGraphic(id) {
  const graphic = graphicLayer.getGraphicById(id)
  if (graphic) {
    graphic.remove(true)
  }
}

function updateEchartsDistance(loc, height) {
  eventTarget.fire("dataUpdated", { loc, height })
}
