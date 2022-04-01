import * as mars3d from "mars3d"
import "./city"

let map // mars3d.Map三维地图对象
let lastQueryOptions
let queryGaodePOI
let graphicLayer4
let tilesetClip

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.623553, lng: 117.322405, alt: 123536, heading: 359, pitch: -81 }
  },
  control: {
    baseLayerPicker: false
  }
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  queryTilesetData()
  queryGaodePOI = new mars3d.query.GaodePOI({
    // key: ['ae29a37307840c7ae4a785ac905927e0'],
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function createLayer(layers) {
  return mars3d.LayerUtil.create(layers) // 创建图层
}

// 添加矢量数据图层
export function addLayer(layer) {
  map.addLayer(layer)
  layer.flyTo()
}

// 取消勾选移除图层
export function removeLayer(layer) {
  map.removeLayer(layer)
}

// 创建社区矢量数据图层
const graphicLayer2 = new mars3d.layer.GraphicLayer()
export function addCommunity() {
  map.addLayer(graphicLayer2)
  eventTarget.fire("getGraphicLayer2", { graphicLayer2 })
}

// 创建中心扩散图层
const graphicLayer = new mars3d.layer.GraphicLayer()
export function addDigitalCity() {
  // 创建Graphic图层
  map.addLayer(graphicLayer)
  eventTarget.fire("getGraphicLayer", { graphicLayer })
}

export function cutModel(layer) {
  // 3d模型裁剪
  const tilesetPlanClip = new mars3d.thing.TilesetClip({
    layer: layer,
    clipOutSide: true, // 外裁剪
    positions: [
      [117.196484, 31.803549],
      [117.196484, 31.835931],
      [117.247038, 31.835931],
      [117.247038, 31.803549]
    ]
  })
  map.addThing(tilesetPlanClip)
}

export function cutModel2(layer) {
  // 3d模型裁剪
  const tilesetPlanClip = new mars3d.thing.TilesetPlanClip({
    layer: layer,
    clipOutSide: true, // 外裁剪
    positions: [
      [117.22648, 31.827441],
      [117.210341, 31.830612],
      [117.211311, 31.842438],
      [117.226091, 31.842885]
    ]
  })
  map.addThing(tilesetPlanClip)
}

export function cutModel3(layer) {
  // 3d模型裁剪
  tilesetClip = new mars3d.thing.TilesetClip({
    layer: layer,
    clipOutSide: false, // 内裁剪
    positions: [
      [117.217052, 31.828226, 33],
      [117.226442, 31.826613, 36.3],
      [117.226796, 31.807994, 21.8],
      [117.209922, 31.808607, 34.8],
      [117.209823, 31.816096, 23.9],
      [117.214736, 31.816278, 34],
      [117.214412, 31.82334, 33.6],
      [117.216856, 31.823559, 28.4]
    ]
  })
  map.addThing(tilesetClip)
}

// 立体围墙扩散效果,面状
const graphicLayer3 = new mars3d.layer.GraphicLayer()
export function addDemoGraphic() {
  map.addLayer(graphicLayer3)
  const diffuseWallGlow = new mars3d.graphic.DiffuseWall({
    positions: [
      [117.217104, 31.828242, 0],
      [117.226196, 31.826378, 0],
      [117.226767, 31.80882, 0],
      [117.210111, 31.808442, 0],
      [117.209821, 31.816224, 0],
      [117.214619, 31.816297, 0],
      [117.214464, 31.823528, 0],
      [117.217187, 31.823565, 0],
      [117.217097, 31.823639, 0]
    ],
    style: {
      color: "#3588d6",
      diffHeight: 1000, // 高度
      speed: 6 // 速度

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      // highlight: {
      //   color: "#ff0000"
      // }
    }
  })
  graphicLayer3.addGraphic(diffuseWallGlow)
}

export function removeGraphicLayer3() {
  graphicLayer3.clear()
}

let text2
export function loadData(queryOptions, text) {
  if (!text2) {
    addDivGraphic()

    showLoading()

    lastQueryOptions = {
      polygon: [
        [117.196484, 31.803549],
        [117.196484, 31.835931],
        [117.247038, 31.835931],
        [117.247038, 31.803549]
      ],
      limit: true,
      text: text,
      success: function (res) {
        const data = res.list
        // resultList = resultList.concat(data)
        console.log(res)
        addDemoGraphics(data)

        hideLoading()
      },
      error: function (msg) {
        globalAlert(msg).hideLoading()
      }
    }
    queryGaodePOI.query(lastQueryOptions)
    text2 = text
  } else {
    graphicLayer4.clear()
    text2 = null
  }
}

export function removeGraphicLayer4() {
  graphicLayer4.clear()
  text2 = null
}

function addDemoGraphics(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const position = [item.lng, item.lat]
    addDemoGraphic2(position, item)
  }
}

// 创建标签
function addDemoGraphic2(position, item) {
  const img = item.info.photos[0].url
  const graphicImg = new mars3d.graphic.DivGraphic({
    position: position,
    style: {
      html: ` <div class="mars3d-camera-content">
                <img class="mars3d-camera-img" src="img/marker/camera.svg" >
              </div>
              <div class="mars3d-camera-line" ></div>
              <div class="mars3d-camera-point"></div>`,
      offsetX: -16,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000)
    },
    popup: `<img style="width: 300px;" src=""></img>`,
    popupOptions: {
      offsetY: -170, // 显示Popup的偏移值，是DivGraphic本身的像素高度值
      template: `<div class="marsBlackPanel animation-spaceInDown">
                      <div class="marsBlackPanel-text">${item.name}</div>
                      <img style="width: 300px;" src="${img}"></img>
                      <span class="mars3d-popup-close-button closeButton" >×</span>
                  </div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.CENTER
    }
  })
  graphicLayer4.addGraphic(graphicImg)
}

function addDivGraphic() {
  // 创建DIV数据图层
  graphicLayer4 = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer4)

  graphicLayer4.on(mars3d.EventType.click, function (event) {
    console.log("您单击了", event)
  })

  // 在layer上绑定右键菜单
  graphicLayer4.bindContextMenu(
    [
      {
        text: "查看",
        iconCls: "fa fa-trash-o",
        callback: function (e) {
          const graphic = e.graphic

          globalMsg("右键菜单示例")
        }
      }
    ],
    { offsetY: -170 }
  )
}

// 数据获取
function queryTilesetData() {
  mars3d.Util.fetchJson({ url: "config/tileset.json" })
    .then(function (arr) {
      const modelData = arr.layers
      eventTarget.fire("loadOk", { modelData })
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}
