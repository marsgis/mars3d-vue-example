import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer

// 事件对象，用于抛出事件给面板
export const eventTarget = new mars3d.BaseClass()

export const mapOptions = {
  scene: {
    center: { lat: 28.445199, lng: 119.481909, alt: 661.2, heading: 199.8, pitch: -41.6 },
    fxaa: true, // 不开启抗锯齿，可视域会闪烁
    globe: {
      depthTestAgainstTerrain: true // 不加无法投射到地形上
    }
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  globalNotify("已知问题提示", `(1) 平面上视域内可能存在锯齿。(2) 视角变化时可能有锯齿抖动。`)

  // 添加参考三维模型
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: "https://data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 148.2 },
    maximumScreenSpaceError: 1,
    cullWithChildrenBounds: false,
    brightness: 0.6
  })
  map.addLayer(tiles3dLayer)

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加一些演示数据
  addDemoGraphic1()
  addDemoGraphic2()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

function addDemoGraphic1() {
  const viewShed = new mars3d.graphic.ViewShed({
    position: [119.480878, 28.440286, 149],
    style: {
      angle: 60,
      angle2: 45,
      distance: 80,
      heading: 44,
      pitch: -12,
      addHeight: 0.5
    },
    depthBiasStep: 0.01
  })
  graphicLayer.addGraphic(viewShed)
}

function addDemoGraphic2() {
  const viewShed = new mars3d.graphic.ViewShed({
    position: {
      type: "time",
      speed: 100,
      list: [
        [119.479894, 28.441438, 132.8],
        [119.475388, 28.438343, 138.1]
      ],
      forwardExtrapolationType: Cesium.ExtrapolationType.NONE // 到达后消失
    },
    style: {
      angle: 60,
      angle2: 45,
      distance: 80,
      heading: 138,
      showFrustum: true
    },
    depthBiasStep: 0.01
  })
  graphicLayer.addGraphic(viewShed)
}

// 添加可视域
export async function startDrawGraphic() {
  // 开始绘制
  const graphic = await graphicLayer.startDraw({
    type: "viewShed",
    style: {
      angle: 60,
      angle2: 45,
      distance: 80,
      heading: 44,
      pitch: -12,
      addHeight: 0.5 // 在坐标点增加的高度值，规避遮挡，效果更友好
    }
  })
  console.log("标绘完成", graphic.toJSON())
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 30)
  console.log("生成的测试网格坐标", result)

  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const index = j + 1

    const graphic = new mars3d.graphic.ViewShed({
      position,
      style: {
        angle: 60,
        angle2: 45,
        distance: 1880,
        heading: 44,
        pitch: -12,
        addHeight: 0.5
      },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

// 属性编辑
let selectedView
export function getGraphic(graphicId) {
  selectedView = graphicLayer.getGraphicById(graphicId)
  return selectedView
}

export async function selCamera() {
  if (!selectedView) {
    return
  }

  const graphic = await map.graphicLayer.startDraw({
    type: "point"
  })
  const point = graphic.point
  graphic.remove() // 删除绘制的点

  selectedView.position = point
}

// 修改水平角度
export function onChangeAngle(value) {
  if (selectedView) {
    selectedView.angle = value
  }
}

// 修改垂直角度
export function onChangeAngle2(value) {
  if (selectedView) {
    selectedView.angle2 = value
  }
}

// 修改投射距离
export function onChangeDistance(value) {
  if (selectedView) {
    selectedView.distance = value
  }
}

// 修改四周距离 value 修改后的数值
export function onChangeHeading(value) {
  if (selectedView) {
    selectedView.heading = value
  }
}

//  修改俯仰角数值   value 修改后的数值
export function onChangePitch(value) {
  if (selectedView) {
    selectedView.pitch = value
  }
}

//   线框是否显示   isCheckde 修改后的数值
export function showFrustum(isCheckde) {
  if (selectedView) {
    selectedView.showFrustum = isCheckde
  }
}

// 修改视频的透明度   opacity 透明度数值
export function onChangeOpacity(opacity) {
  if (selectedView) {
    selectedView.opacity = opacity
  }
}

// 四周视角选点
export async function onClickSelView() {
  if (!selectedView) {
    return
  }

  const graphic = await map.graphicLayer.startDraw({
    type: "point"
  })
  const point = graphic.point
  graphic.remove() // 删除绘制的点

  selectedView.targetPosition = point
}
