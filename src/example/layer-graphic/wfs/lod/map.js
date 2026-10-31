import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.783013, lng: 117.221851, alt: 2307, heading: 1, pitch: -29 }
  }
}
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.readyPromise.then(() => {
    console.log("map初始化完成", map)

    initLodGraphicLayer2()
  })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

function initLodGraphicLayer() {
  const lodGraphicLayer = new mars3d.layer.LodGraphicLayer({
    IdField: "id", // 数据的唯一主键 字段名称
    minimumLevel: 11, // 限定层级，只加载该层级下的数据。[与效率相关的重要参数]
    debuggerTileInfo: true,
    // 根据LOD分块信息去请求对应的Tile瓦块内的数据
    queryGridData: (grid) => {
      return mars3d.Util.fetchJson({
        url: "//server.mars3d.cn/server/pointRandom/",
        queryParameters: {
          xmin: grid.extent.xmin,
          ymin: grid.extent.ymin,
          xmax: grid.extent.xmax,
          ymax: grid.extent.ymax,
          count: 5
        }
      }).then(function (data) {
        grid.list = data // list标识回传数据
        return grid
      })
    },
    // 根据 attr属性 创建 矢量对象[必须返回Graphic对象]
    createGraphic(grid, attr) {
      const height = map.getHeight(Cesium.Cartesian3.fromDegrees(attr.x, attr.y))

      const graphic = new mars3d.graphic.ModelPrimitive({
        position: [attr.x, attr.y, height],
        style: {
          url: "https://data.mars3d.cn/gltf/mars/leida.glb",
          scale: 1,
          minimumPixelSize: 40
        }
      })
      lodGraphicLayer.addGraphic(graphic)

      return graphic
    }
  })
  map.addLayer(lodGraphicLayer)

  lodGraphicLayer.on(mars3d.EventType.click, (event) => {
    console.log("你单击了对象", event)
  })
}


class PoiLayer extends mars3d.layer.LodGraphicLayer {
  constructor(options = {}) {
    super(options)

    this.query = new mars3d.query.QueryPOI(options)

    if (!this.options.popup) {
      this.bindPopup(
        function (event) {
          const item = event?.graphic?.attr
          if (!item) {
            return
          }
          const inHtml =
            "<div>名称：" +
            item.name +
            "</div>" +
            "<div>地址：" +
            item.address +
            "</div>" +
            "<div>区域：" +
            item.xzqh +
            "</div>" +
            "<div>类别：" +
            item.type +
            "</div>"

          return inHtml
        },
        {
          offsetY: -10
        }
      )
    }
  }

  //= ========= 对外属性 ==========
  queryGridData(grid) {
    return this.query
      .queryExtent({
        extent: grid.extent,
        count: 25
      })
      .then((res) => {
        grid.list = res?.list || []
        return grid
      })
  }

  createGraphic(grid, attr) {
    const style = mars3d.Util.getSymbolStyle(this.options.symbol, attr)
    style.clampToGround = style.clampToGround ?? true

    const graphic = this.addGraphic({
      type: this.options.symbol?.type ?? (style.image ? "billboardP" : "pointP"),
      position: [attr.lng, attr.lat, this.options.height || 0],
      style: style,
      attr: attr
    })
    return graphic
  }
}

function initLodGraphicLayer2() {
  const lodGraphicLayer = new PoiLayer({
    service: "gaode",
    minimumLevel: 13, // 限定层级，只加载该层级下的数据。[与效率相关的重要参数]
    collision: { includeType: "label" }, // 文字避让 关键配置
    symbol: {
      styleOptions: {
        image: "https://data.mars3d.cn/img/marker/square.png",
        scaleByDistance: true,
        scaleByDistance_far: 20000,
        scaleByDistance_farValue: 0.3,
        scaleByDistance_near: 1000,
        scaleByDistance_nearValue: 0.6,
        label: {
          text: "{name}",
          font_size: 15,
          color: "#ffffff",
          outline: true,
          outlineColor: "#000000",
          pixelOffsetY: -30,
          distanceDisplayCondition: true,
          distanceDisplayCondition_far: 4000,
          distanceDisplayCondition_near: 0
        }
      }
    },
    debuggerTileInfo: false // 是否显示网格信息（测试用）
  })
  map.addLayer(lodGraphicLayer)

  lodGraphicLayer.on(mars3d.EventType.click, (event) => {
    console.log("你单击了对象", event)
  })
}
