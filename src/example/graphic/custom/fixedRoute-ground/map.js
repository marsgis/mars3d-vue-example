import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中
let graphicLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.836861, lng: 116.044673, alt: 1395, heading: 14, pitch: -42 }
  },
  control: {
    clockAnimate: true, // 时钟动画控制(左下角)
    timeline: true, // 是否显示时间线控件
    compass: { style: { top: "10px", left: "5px" } }
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // map.scene.verticalExaggeration = 2 // 地形夸张
  // map.control.toolbar.container.style.bottom = "55px" // 修改toolbar控件的样式

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加载完成在加载小车，否则地形未加载完成，小车会处于地下
  map.on(mars3d.EventType.load, function (event) {
    addGraphicLayer()
  })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

function addGraphicLayer() {
  const pointList = [
    [116.043233, 30.845286, 392.48],
    [116.046833, 30.846863, 411.33],
    [116.052137, 30.848801, 439.45],
    [116.060838, 30.850918, 442.91],
    [116.069013, 30.852035, 435.14],
    [116.18739, 30.854441, 244.53],
    [116.205214, 30.859332, 300.96]
  ]
  // pointList = mars3d.PolyUtil.interLine(pointList, { minDistance: 10 }) // path穿地时，且没有autoSurfaceHeight时可以进行插值

  const fixedRoute = new mars3d.graphic.FixedRoute({
    name: "贴地表表面漫游",
    position: {
      type: "time", // 时序动态坐标
      speed: 160,
      list: pointList
    },
    clockLoop: false, // 是否循环播放
    camera: {
      type: "gs",
      pitch: -30,
      radius: 500
    },
    // model: {
    //   show: true,
    //   url: "https://data.mars3d.cn/gltf/mars/qiche.gltf",
    //   scale: 0.2,
    //   minimumPixelSize: 50
    // },
    model: {
      url: "https://data.mars3d.cn/gltf/mars/jingche/jingche.gltf",
      heading: 90,
      mergeOrientation: true, // 用于设置模型不是标准的方向时的纠偏处理,在orientation基础的方式值上加上设置是heading值
      minimumPixelSize: 50
    },
    // polyline: {
    //   color: "rgba(255,0,0,0.5)",
    //   width: 2,
    //   showAll: true
    // },
    // path: {
    //   color: "rgba(255,255,0,1.0)",
    //   width: 4,
    //   leadTime: 0
    // }
    polyline: {
      color: "rgba(0,255,0,1.0)",
      width: 2 // 显示已走过的路线
    },
    path: {
      color: "rgba(255,255,0,0.5)",
      width: 2,
      trailTime: 0 // 显示未来的路线
    }
  })
  graphicLayer.addGraphic(fixedRoute)

  // 绑定popup
  bindPopup(fixedRoute)

  fixedRoute.on(mars3d.EventType.start, function (event) {
    console.log("漫游开始start")
  })
  fixedRoute.on(mars3d.EventType.end, function (event) {
    console.log("漫游结束end")
  })
  // ui面板信息展示
  fixedRoute.on(
    mars3d.EventType.change,
    mars3d.Util.funThrottle((event) => {
      // 取实时信息，可以通过  fixedRoute.info
      eventTarget.fire("roamLineChange", event)
    }, 500)
  )

  map.on(mars3d.EventType.keydown, function (event) {
    // 空格 切换暂停/继续
    if (event.keyCode === 32) {
      if (fixedRoute.isPause) {
        fixedRoute.proceed()
      } else {
        fixedRoute.pause()
      }
    }
  })

  // 不贴地时，直接开始
  // startFly(fixedRoute)

  // 需要计算贴地点时，异步计算完成贴地后再启动
  showLoading()
  fixedRoute.autoSurfaceHeight({ exact: true }).then(function (e) {
    hideLoading()
    startFly(fixedRoute)
  })
}

function startFly(fixedRoute) {
  fixedRoute.start()
  fixedRoute.openPopup() // 显示popup

  addParticleSystem(fixedRoute.property)
}

function bindPopup(fixedRoute) {
  fixedRoute.bindPopup(
    `<div style="width: 200px">
      <div>总 距 离：<span id="lblAllLen"> </span></div>
      <div>总 时 间：<span id="lblAllTime"> </span></div>
      <div>开始时间：<span id="lblStartTime"> </span></div>
      <div>剩余时间：<span id="lblRemainTime"> </span></div>
      <div>剩余距离：<span id="lblRemainLen"> </span></div>
    </div>`,
    { closeOnClick: false }
  )

  // 刷新局部DOM,不影响popup面板的其他控件操作
  fixedRoute.on(mars3d.EventType.popupRender, function (event) {
    const container = event.container // popup对应的DOM

    const params = fixedRoute?.info
    if (!params) {
      return
    }

    const lblAllLen = container.querySelector("#lblAllLen")
    if (lblAllLen) {
      lblAllLen.innerHTML = mars3d.MeasureUtil.formatDistance(params.distance_all)
    }

    const lblAllTime = container.querySelector("#lblAllTime")
    if (lblAllTime) {
      lblAllTime.innerHTML = mars3d.Util.formatTime(params.second_all / map.clock.multiplier)
    }

    const lblStartTime = container.querySelector("#lblStartTime")
    if (lblStartTime) {
      lblStartTime.innerHTML = mars3d.Util.formatDate(Cesium.JulianDate.toDate(fixedRoute.startTime), "yyyy-M-d HH:mm:ss")
    }

    const lblRemainTime = container.querySelector("#lblRemainTime")
    if (lblRemainTime) {
      lblRemainTime.innerHTML = mars3d.Util.formatTime((params.second_all - params.second) / map.clock.multiplier)
    }

    const lblRemainLen = container.querySelector("#lblRemainLen")
    if (lblRemainLen) {
      lblRemainLen.innerHTML = mars3d.MeasureUtil.formatDistance(params.distance_all - params.distance) || "完成"
    }
  })
}

//  添加尾气粒子效果
function addParticleSystem(property) {
  const particleSystem = new mars3d.graphic.ParticleSystem({
    position: property,
    style: {
      image: "https://data.mars3d.cn/img/particle/smoke.png",
      particleSize: 12, // 粒子大小（单位：像素）
      emissionRate: 20.0, // 发射速率 （单位：次/秒）
      pitch: 40, // 俯仰角
      maxHeight: 1000, // 超出该高度后不显示粒子效果

      startColor: Cesium.Color.GREY.withAlpha(0.7), // 开始颜色
      endColor: Cesium.Color.WHITE.withAlpha(0.0), // 结束颜色
      startScale: 1.0, //  开始比例（单位：相对于imageSize大小的倍数）
      endScale: 5.0, // 结束比例（单位：相对于imageSize大小的倍数）
      minimumSpeed: 1.0, // 最小速度(米/秒)
      maximumSpeed: 4.0 // 最大速度(米/秒)
    },
    attr: { remark: "车辆尾气" }
  })
  graphicLayer.addGraphic(particleSystem)
}

// ui层使用
export const formatDistance = mars3d.MeasureUtil.formatDistance
export const formatTime = mars3d.Util.formatTime
