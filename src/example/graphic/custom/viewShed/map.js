import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
export let graphicLayer
let selectedView

// 事件对象，用于抛出事件给vue
export const eventTarget = new mars3d.BaseClass()

export const mapOptions = {
  scene: {
    center: { lat: 28.440007, lng: 119.48322, alt: 424, heading: 282, pitch: -56 },
    fxaa: true, // 不开启抗锯齿，可视域会闪烁
    globe: {
      depthTestAgainstTerrain: true // 不加无法投射到地形上
    }
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

  // 添加参考三维模型
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 11.5 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    dynamicScreenSpaceError: true,
    cullWithChildrenBounds: false,
    luminanceAtZenith: 0.6
  })
  map.addLayer(tiles3dLayer)

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加一些演示数据
  addDemoGraphic1()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
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
    }
  })
  graphicLayer.addGraphic(viewShed)

  selectedView = viewShed // 记录下

  eventTarget.fire("loadVideo", {
    value: {
      cameraAngle: selectedView.angle,
      cameraAngle2: selectedView.angle2,
      heading: selectedView.heading,
      pitchValue: selectedView.pitch,
      distanceValue: selectedView.distance,
      opcity: selectedView.opacity,
      showFrustum: selectedView.showFrustum
    }
  })
}

// 添加可视域
export function addViewShed(data) {
  // 开始绘制
  graphicLayer.startDraw({
    type: "viewShed",
    style: {
      angle: data.cameraAngle,
      angle2: data.cameraAngle2,
      showFrustum: data.showFrustum,
      addHeight: 0.5 // 在坐标点增加的高度值，规避遮挡，效果更友好
    },
    success: function (graphic) {
      console.log("绘制完成", graphic)

      selectedView = graphic // 记录下

      eventTarget.fire("loadVideo", {
        value: {
          cameraAngle: selectedView.angle,
          cameraAngle2: selectedView.angle2,
          heading: selectedView.heading,
          pitchValue: selectedView.pitch,
          distanceValue: selectedView.distance,
          opcity: selectedView.opacity,
          showFrustum: selectedView.showFrustum
        }
      })
    }
  })
}

export function clear() {
  graphicLayer.clear()
  selectedView = null
}

export function selCamera() {
  if (!selectedView) {
    return
  }

  map.graphicLayer.startDraw({
    type: "point",
    success: (graphic) => {
      const point = graphic.point
      graphic.remove() // 删除绘制的点

      selectedView.position = point
    }
  })
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
export function onClickSelView() {
  if (!selectedView) {
    return
  }

  map.graphicLayer.startDraw({
    type: "point",
    success: (graphic) => {
      const point = graphic.point
      graphic.remove() // 删除绘制的点

      selectedView.targetPosition = point
    }
  })
}