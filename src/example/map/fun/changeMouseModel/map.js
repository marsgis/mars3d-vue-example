import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  control: {
    mouseDownView: {
      zoomEvent: false
    }
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.scene.screenSpaceCameraController.minimumCollisionTerrainHeight = 150000

  // 限定pitch角度： max ，min(默认-90)
  // map.setPitchRange(-10)
  map.scene.screenSpaceCameraController.maximumTiltAngle = Cesium.Math.toRadians(90)
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

export function changeMouseModel(val) {
  if (val === 1) {
    map.changeMouseModel(false)
  } else if (val === 2) {
    map.changeMouseModel(true) // 设置鼠标操作习惯,更换中键和右键
  } else {
    // 设置平移
    map.scene.screenSpaceCameraController.rotateEventTypes = [Cesium.CameraEventType.MIDDLE_DRAG, Cesium.CameraEventType.PINCH]
    // 设置旋转
    map.scene.screenSpaceCameraController.tiltEventTypes = [
      Cesium.CameraEventType.LEFT_DRAG,
      Cesium.CameraEventType.PINCH,
      {
        eventTpye: Cesium.CameraEventType.LEFT_DRAG,
        modifier: Cesium.KeyboardEventModifier.CTRL // 按住shift键
      },
      {
        eventTpye: Cesium.CameraEventType.RIGHT_DRAG,
        modifier: Cesium.KeyboardEventModifier.CTRL // 按住shift键
      }
    ]
    // 设置缩放
    map.scene.screenSpaceCameraController.zoomEventTypes = [
      Cesium.CameraEventType.WHEEL,
      Cesium.CameraEventType.PINCH,
      Cesium.CameraEventType.RIGHT_DRAG
    ]

    map.control.mouseDownView.reload()
  }
}

// 解除ALT按键的操作
// const getInputAction_old = Cesium.ScreenSpaceEventHandler.prototype.getInputAction
// Cesium.ScreenSpaceEventHandler.prototype.getInputAction = function (type, modifier) {
//   if (modifier === Cesium.KeyboardEventModifier.ALT) {
//     modifier = undefined
//   }
//   return getInputAction_old.bind(this)(type, modifier)
// }
