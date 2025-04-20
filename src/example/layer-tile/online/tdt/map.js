import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

const creditHtml = `自然资源部 - <span>审图号：GS(2023)336号</span>
 - 甲测资字1100471 - <a href="https://www.tianditu.gov.cn/about/contact.html?type=2" target="_blank" trace="tos">服务条款</a> `

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.675177, lng: 117.323257, alt: 81193, heading: 359, pitch: -79 },
    highDynamicRange: false,
    showSkyAtmosphere: false,
    fog: false,
    fxaa: false,
    globe: {
      showGroundAtmosphere: false
    }
  },
  // 方式1：在创建地球前的参数中配置
  basemaps: [
    {
      name: "天地图影像(EPSG:3857)",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_img.png",
      type: "tdt",
      layer: "img_d",
      key: mars3d.Token.tiandituArr,
      show: true,
      credit: creditHtml
    },
    {
      name: "天地图电子(EPSG:3857)",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_vec.png",
      type: "group",
      layers: [
        { name: "底图", type: "tdt", layer: "vec_d", key: mars3d.Token.tiandituArr },
        { name: "注记", type: "tdt", layer: "vec_z", key: mars3d.Token.tiandituArr }
      ],
      credit: creditHtml
    },
    {
      name: "天地图地形(EPSG:3857)",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_ter.png",
      type: "group",
      layers: [
        { name: "底图", type: "tdt", layer: "ter_d", key: mars3d.Token.tiandituArr },
        {
          name: "注记",
          type: "tdt",
          layer: "ter_z",
          key: mars3d.Token.tiandituArr,
          // 表示缩小和放大瓦片数据的过滤方式。默认值为LINEAR线性结构，大部分地图调整为最近方式过滤能够有效提升地图清晰度。
          minificationFilter: Cesium.TextureMinificationFilter.NEAREST,
          magnificationFilter: Cesium.TextureMinificationFilter.NEAREST
        }
      ],
      credit: creditHtml
    },
    {
      name: "天地图影像(EPSG:4326)",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_img.png",
      type: "group",
      layers: [
        {
          name: "底图",
          type: "tdt",
          layer: "img_d",
          crs: "EPSG:4326",
          key: mars3d.Token.tiandituArr
        },
        {
          name: "注记",
          type: "tdt",
          layer: "img_z",
          crs: "EPSG:4326",
          key: mars3d.Token.tiandituArr
        }
      ],
      credit: creditHtml
    },
    {
      name: "天地图电子(EPSG:4326)",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_vec.png",
      type: "group",
      layers: [
        {
          name: "底图",
          type: "tdt",
          layer: "vec_d",
          crs: "EPSG:4326",
          key: mars3d.Token.tiandituArr
        },
        {
          name: "注记",
          type: "tdt",
          layer: "vec_z",
          crs: "EPSG:4326",
          key: mars3d.Token.tiandituArr
        }
      ],
      credit: creditHtml
    },
    {
      name: "天地图地形(EPSG:4326)",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_ter.png",
      type: "group",
      layers: [
        {
          name: "底图",
          type: "tdt",
          layer: "ter_d",
          crs: "EPSG:4326",
          key: mars3d.Token.tiandituArr
        },
        {
          name: "注记",
          type: "tdt",
          layer: "ter_z",
          crs: "EPSG:4326",
          key: mars3d.Token.tiandituArr
        }
      ],
      credit: creditHtml
    },

    {
      name: "天地图影像(英文)",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_img.png",
      type: "group",
      layers: [
        { name: "底图", type: "tdt", layer: "img_d", key: mars3d.Token.tiandituArr },
        { name: "底图", type: "tdt", layer: "img_e", key: mars3d.Token.tiandituArr }
      ],
      credit: creditHtml
    },
    {
      name: "天地图电子(英文)",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_vec.png",
      type: "group",
      layers: [
        { name: "底图", type: "tdt", layer: "vec_d", key: mars3d.Token.tiandituArr },
        { name: "底图", type: "tdt", layer: "vec_e", key: mars3d.Token.tiandituArr }
      ],
      credit: creditHtml
    }
  ]
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  addCreditDOM()

  // 三维文字注记不清晰的原因：https://zhuanlan.zhihu.com/p/389945647

  // 数值越高，性能越好，但视觉质量越差。默认值为2。
  // 针对不同的地图数据源，该值在 0.66~1.33 之间地图清晰度最高。
  map.scene.globe.maximumScreenSpaceError = 4 / 3
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  removeCreditDOM()
  map = null
}

// 叠加的图层
let tileLayer
export function addTileLayer() {
  removeTileLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.TdtLayer({
    name: "天地图影像注记",
    layer: "img_z",
    key: mars3d.Token.tiandituArr
  })
  map.addLayer(tileLayer)


  // tileLayer = new mars3d.layer.TdtLayer({
  //   name: "地表覆盖",
  //   layer: "glc2020",
  //   key: ["75f0434f240669f4a2df6359275146d2"] //需要有效token才能访问地表覆盖
  // })
  // map.addLayer(tileLayer)
}

export function removeTileLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}




// 在下侧状态栏增加一个额外div展示图层版权信息
let creditDOM
function addCreditDOM() {
  const locationBar = map.control.locationBar?.container
  if (locationBar) {
    creditDOM = mars3d.DomUtil.create("div", "mars3d-locationbar-content mars3d-locationbar-autohide", locationBar)
    creditDOM.style["pointer-events"] = "all"
    creditDOM.style.float = "left"
    creditDOM.style.marginLeft = "20px"

    creditDOM.innerHTML = map.basemap?.options?.credit || ""

    map.on(mars3d.EventType.changeBasemap, function (event) {
      creditDOM.innerHTML = event.layer?.options?.credit || ""
    })
  }
}
function removeCreditDOM() {
  if (creditDOM) {
    mars3d.DomUtil.remove(creditDOM)
    creditDOM = null
  }
}
