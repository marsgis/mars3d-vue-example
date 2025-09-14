import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
let slope
let contourLine
let graphicLayer

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  addSlope()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

function addSlope() {
  // 坡度坡向
  slope = new mars3d.thing.Slope({
    arrow: {
      scale: 0.3, // 箭头长度的比例（范围0.1-0.9）
      color: Cesium.Color.YELLOW,
      width: 15, // 箭头宽度
      // materialType: mars3d.MaterialType.LineFlow,
      // materialOptions: {
      //   color: "#1a9850",
      //   image: "https://data.mars3d.cn/img/textures/line-arrow-right.png",
      //   speed: 10
      // },
      // clampToGround: true,
      show: true
    },
    tooltip: function (event) {
      const attr = event.graphic?.attr
      return `坡度: ${attr.slopeStr1}  (${attr.slopeStr2})<br />坡向: ${attr.direction}°`
    }
  })
  map.addThing(slope)

  slope.on(mars3d.EventType.end, function (event) {
    console.log("分析完成", event)

    // event.data[0] 数组内返回值说明： {
    //     position:position,  //坐标位置
    //     slope: slopeValDou, //度数法值，α(坡度)=arc tan (高程差/水平距离)
    //     slopeStr1: text1,   //度数法值字符串
    //     slopeStr2: text2,   //百分比法值字符串，坡度 = (高程差/水平距离)x100%
    //     direction: slopeAngle //坡向值（0-360度）
    // }
  })

  // 渲染效果
  contourLine = new mars3d.thing.ContourLine({
    contourShow: false, // 是否显示等高线
    shadingType: "none", // 地表渲染效果类型:无nono, 高程 elevation, 坡度slope, 坡向aspect
    shadingAlpha: 0.6 /// 地表渲染的透明度
  })
  map.addThing(contourLine)
}

// async function getSlope(positions) {
//   const result = await mars3d.thing.Slope.getSlope({
//     map,
//     positions,
//     splitNum: 1, // splitNum插值分割的个数
//     radius: 1, // 缓冲半径（影响坡度坡向的精度）
//     count: 4 // 缓冲的数量（影响坡度坡向的精度）会求周边(count*4)个点
//   })
//   console.log("分析完成", result)
// }

// 添加矩形
export async function btnDrawExtent(splitNum) {
  clearAll()
  const graphic = await graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8,
      outline: false
    }
  })
  const positions = graphic.getOutlinePositions(false)
  graphicLayer.clear()

  console.log("绘制坐标为", JSON.stringify(mars3d.LngLatArray.toArray(positions))) // 方便测试拷贝坐标

  contourLine.positions = positions
  slope.add(positions, {
    splitNum, // splitNum插值分割的个数
    radius: 1, // 缓冲半径（影响坡度坡向的精度）
    count: 4 // 缓冲的数量（影响坡度坡向的精度）会求周边(count*4)个点
  })
}

// 绘制多边形
export async function btnDraw(splitNum) {
  clearAll()
  const graphic = await graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#29cf34",
      opacity: 0.3,
      outline: true,
      outlineColor: "#ffffff",
      clampToGround: true
    }
  })
  const positions = graphic.positionsShow
  graphicLayer.clear()

  console.log("绘制坐标为", JSON.stringify(mars3d.LngLatArray.toArray(positions))) // 方便测试拷贝坐标

  contourLine.positions = positions
  slope.add(positions, {
    splitNum, // splitNum插值分割的个数
    radius: 1, // 缓冲半径（影响坡度坡向的精度）
    count: 4 // 缓冲的数量（影响坡度坡向的精度）会求周边(count*4)个点
  })
}

// 添加点
export async function btnDrawPoint() {
  clearAll()

  const graphic = await graphicLayer.startDraw({
    type: "point",
    style: {
      color: "#ffff00"
    }
  })
  const position = graphic.positionShow
  graphicLayer.clear()

  slope.add([position])
}
// 改变阴影
export function changeShadingType(val) {
  contourLine.shadingType = val
}

export function clearAll() {
  slope.clear()
  contourLine.clear()
}
