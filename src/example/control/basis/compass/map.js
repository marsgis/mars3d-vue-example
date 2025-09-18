import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = function (option) {
  option.control = {
    compass: { style: { top: "10px", right: "5px" } } // 当前示例展现的控件 - 导航球
  }
  return option
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 方式2：在创建地球后按需调用addControl添加(直接new对应type类型的控件)
  // const imgDivString = '<img src="https://data.mars3d.cn/img/control/homeButton.svg" alt="">'
  const compass = new mars3d.control.Compass({
    top: "10px",
    left: "5px"
    // innerSvg: imgDivString  // 自定义图标
  })
  map.addControl(compass)

  map.control.compass.on(mars3d.EventType.click, function (event) {
    globalMsg("单击了 compass 控件")
  })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}
