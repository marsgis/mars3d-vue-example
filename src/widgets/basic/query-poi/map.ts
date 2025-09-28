/**
 * 高德POI 查询栏 （左上角）
 * @copyright 火星科技 mars3d.cn
 * @author 火星渣渣灰 2022-01-10
 */
import * as mars3d from "mars3d"
import QueryPopup from "./query-popup.vue"
import { createApp } from "vue"
const Cesium = mars3d.Cesium

let map: mars3d.Map // 地图对象
export let graphicLayer: mars3d.layer.GraphicLayer
let queryPoi: mars3d.query.QueryPOI // TdtPOI查询
let address: any = null
let queryAddressDOM

const imgArr = []

// 初始化当前业务
export async function onMounted(mapInstance: mars3d.Map): Promise<void> {
  for (let i = 0; i < 10; i++) {
    const img = await getCanvas(i + 1)
    imgArr.push(img)
  }

  map = mapInstance // 记录map

  // 下侧状态栏提示
  const locationBar = map.control.locationBar?.container
  if (locationBar) {
    queryAddressDOM = mars3d.DomUtil.create(
      "div",
      "mars3d-locationbar-content mars3d-locationbar-autohide",
      map.control.locationBar.container
    )
    queryAddressDOM.style.marginRight = "50px"
  }

  queryPoi = new mars3d.query.QueryPOI({
    service: "gaode"
    // city: '合肥市',
  })

  graphicLayer = new mars3d.layer.GraphicLayer({
    name: "POI查询",
    pid: 99 // 图层管理 中使用，父节点id
  })

  graphicLayer.bindPopup(
    (event) => {
      const attr = event.graphic.attr || {}
      if (!attr) {
        return
      }
      const vNodeDom = document.createElement("div")
      document.body.appendChild(vNodeDom)

      const vNode = createApp(QueryPopup, {
        id: attr.id,
        name: attr.name,
        tel: attr.tel ? attr.tel.toString() : "",
        address: attr.address,
        type: attr.type ? attr.type.toString() : ""
      })
      vNode.mount(vNodeDom) // vue2中可使用extend
      // return vNode._container // 项目中可以直接返回DOM
      return vNode._container.innerHTML // 示例中特殊处理，转为html元素
    },
    { template: false }
  )

  map.addLayer(graphicLayer)

  map.on(mars3d.EventType.cameraMoveEnd, cameraChanged)
}

async function cameraChanged() {
  const radius = map.camera.positionCartographic.height // 单位：米
  if (radius > 100000) {
    address = null
    if (queryAddressDOM) { queryAddressDOM.innerHTML = "" }
    return
  }

  address = await queryPoi.getAddress({
    location: map.getCenter()
  })
  if (address && queryAddressDOM) { queryAddressDOM.innerHTML = "地址：" + address.address }
}

// 释放当前业务
export function onUnmounted(): void {
  if (!map) {
    return
  }
  map.removeLayer(graphicLayer)
  map.off(mars3d.EventType.cameraChanged, cameraChanged)
  graphicLayer.remove()
  queryPoi = null
  address = null
  map = null
}

// 查询数据
export function queryData(val: string) {
  return queryPoi.autoTip({
    text: val,
    extent: map.getExtent(),
    city: address?.city
  })
}

export function querySiteList(text: string, page: number) {
  return queryPoi.queryText({
    text,
    count: 6,
    page: page - 1,
    extent: map.getExtent(),
    city: address?.city
  })
}

/**
 * 加载查询之后的数据，通过矢量数据展示出来
 * @param {any} arr 查询之后的数据
 * @returns {void} 无
 */
export function showPOIArr(arr: any): void {
  clearLayers()

  arr.forEach(async (item: any, index: number) => {
    const jd = Number(item.lng)
    const wd = Number(item.lat)
    if (isNaN(jd) || isNaN(wd)) {
      return
    }

    item.lng = jd
    item.lat = wd

    // 添加实体
    const graphic = new mars3d.graphic.BillboardEntity({
      position: Cesium.Cartesian3.fromDegrees(jd, wd),
      style: {
        image: imgArr[index],
        pixelSize: 10,
        color: "#ffffff",
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2,
        scaleByDistance: new Cesium.NearFarScalar(1000, 1, 1000000, 0.1),
        clampToGround: true, // 贴地
        visibleDepth: false // 是否被遮挡
      },
      attr: item
    })
    graphicLayer.addGraphic(graphic)

    item._graphic = graphic
  })

  if (arr.length > 1) {
    graphicLayer.flyTo({ radius: 5000, pitch: -90 })
  }
}

let indexMark

// 获取Canvas对象
async function getCanvas(text) {
  if (!indexMark) {
    indexMark = await Cesium.Resource.fetchImage({ url: "https://data.mars3d.cn/img/marker/bg/poi-num.png" })
  }

  const canvas = document.createElement("canvas")
  canvas.width = 19
  canvas.height = 25
  const ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(indexMark, 0, 0) // 绘制图片

  // 绘制文字
  ctx.fillStyle = "#ffffff"
  ctx.font = "22px 楷体"
  ctx.textBaseline = "middle"
  ctx.fillText(text, 4, 10)

  return canvas.toDataURL("image/png")
}

/**
 * 判断是否为经纬度值，
 * 若是，加载为矢量数据且定位至该矢量数据
 * 若否，返回
 * @param {string} text 输入框输入的关键字
 * @returns {void} 无
 */
export function centerAtLonLat(text: string): void {
  const arr = text.split(",")
  if (arr.length !== 2) {
    return
  }

  const jd = Number(arr[0])
  const wd = Number(arr[1])
  if (isNaN(jd) || isNaN(wd)) {
    return
  }

  // 添加实体
  const graphic = new mars3d.graphic.PointEntity({
    position: Cesium.Cartesian3.fromDegrees(jd, wd),
    style: {
      color: "#3388ff",
      pixelSize: 10,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2,
      scaleByDistance: new Cesium.NearFarScalar(1000, 1, 1000000, 0.1),
      clampToGround: true, // 贴地
      visibleDepth: false // 是否被遮挡
    }
  })
  graphicLayer.addGraphic(graphic)

  graphic.bindPopup(`<div class="mars3d-template-titile">坐标定位</div>
              <div class="mars3d-template-content" >
                <div><label>经度</label> ${jd}</div>
                <div><label>纬度</label>${wd}</div>
              </div>`)

  graphic.openHighlight()

  graphic.flyTo({
    radius: 1000, // 点数据：radius控制视距距离
    scale: 1.5, // 线面数据：scale控制边界的放大比例
    complete: () => {
      graphic.openPopup()
    }
  })
}

export function flyToGraphic(graphic: mars3d.graphic.BaseGraphic, option: any): void {
  map.flyToGraphic(graphic, { ...option, complete: () => graphicLayer.openPopup(graphic) })
}

export function clearLayers(): void {
  graphicLayer.closePopup()
  graphicLayer.clear()
}
