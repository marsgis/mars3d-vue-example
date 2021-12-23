import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let tileLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 24.336939, lng: 108.949729, alt: 14990362, heading: 0, pitch: -90 }
  },
  control: {
    // baseLayerPicker: false,
    infoBox: false
  },
  basemaps: [
    {
      name: "天地图影像",
      icon: "img/basemaps/tdt_img.png",
      type: "tdt",
      layer: "img_d",
      key: ["9ae78c51a0a28f06444d541148496e36"]
    },
    {
      name: "天地图电子",
      icon: "img/basemaps/tdt_vec.png",
      type: "group",
      layers: [
        { name: "底图", type: "tdt", layer: "vec_d", key: ["9ae78c51a0a28f06444d541148496e36"] },
        { name: "注记", type: "tdt", layer: "vec_z", key: ["9ae78c51a0a28f06444d541148496e36"] }
      ]
    },
    {
      name: "单张图片",
      icon: "img/basemaps/bingmap.png",
      type: "image",
      url: "//data.mars3d.cn/file/img/world/world.jpg",
      show: true
    }
  ],
  layers: [
    {
      name: "瓦片测试信息",
      type: "tileinfo",
      color: "rgba(255,255,0,0.6)",
      show: true
    }
  ]
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 加载图层
export function createTileLayer(options) {
  const params = {
    type: options.type, // 类型
    url: options.url, // 图层url
    // subdomains: $("#txtSubdomains").val(), // url子域
    layer: options.txtLayer, // 图层名

    crs: options.CRS, // 坐标系信息
    chinaCRS: options.chinaCRS, // 国内坐标系

    minimumLevel: options.minLoadLevel, // 最低层级
    maximumLevel: options.maxLoadLevel, // 最高层级
    minimumTerrainLevel: options.minShowLevel, // 展示影像图层的最小地形细节级别
    maximumTerrainLevel: options.maxShowLevel, // 展示影像图层的最大地形细节级别
    brightness: options.brightness, // 亮度
    opacity: options.opacity // 透明度
  }
  // 新增图层
  if (params.error) {
    globalMsg(params.msg)
    return
  }
  if (params.minimumLevel > params.maximumLevel) {
    return { error: true, msg: "最低层级的值不得高于最高层级" }
  }
  if (params.minimumTerrainLevel > params.maximumTerrainLevel) {
    return { error: true, msg: "最小细节的值不得高于最大细节" }
  }

  // 移除原有图层
  removeLayer()

  // 绘制区域
  const rectangle = options.rectangle
  if (rectangle) {
    params.rectangle = JSON.parse(rectangle)
  }

  // 代理被选中
  if (params.chkProxy) {
    params.proxy = "//server.mars3d.cn/proxy/"
  } else {
    params.proxy = null
  }

  console.log("图层参数为", params)

  tileLayer = mars3d.LayerUtil.create({
    ...params,
    highlight: {
      clampToGround: true,
      fill: true,
      color: "#2deaf7",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#e000d9",
      outlineOpacity: 1.0
    },
    popup: "all",
    flyTo: true
  })
  map.addLayer(tileLayer)
}

// 移除并销毁图层
export function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}

// 数据更新
export function dataUpdate(params) {
  if (tileLayer) {
    params.flyTo = false
    createTileLayer(params)
  }
}

// 绘制和清除区域
export function btnDrawExtent(options) {
  if (tileLayer) {
    tileLayer.rectangle = null
  }
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      fill: false,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ff0000"
    },
    success: function (graphic) {
      const rectangle = mars3d.PolyUtil.formatRectangle(graphic._rectangle_draw)
      options.rectangle = JSON.stringify(rectangle)
      createTileLayer(options)
    }
  })
}
export function btnClearExtent() {
  map.graphicLayer.clear()
  if (tileLayer) {
    tileLayer.rectangle = null
    tileLayer.options.flyTo = false
    tileLayer.reload()
  }
}

// 修改图层的部分值
export function changeOpacity(val) {
  if (tileLayer) {
    tileLayer.opacity = val
  }
}
export function changeBrightness(val) {
  if (tileLayer) {
    tileLayer.brightness = val
  }
}
