// 按mars3d规范，演示创建自己的一个瓦片图层，并定义type类型，可以在json中配置

// import * as mars3d from "mars3d"

class MyXyzImageryProvider extends mars3d.provider.XyzImageryProvider {
  constructor(options = {}) {
    // options.customTags = options.customTags || {}
    // options.customTags.mars3d_u = (imageryProvider, x, y, level) => {
    //   return `x=${x};y=${-y};z=${level};v=009;type=sate`
    // }

    super(options)
  }

  // requestImage(x, y, level, request) {
  // }
}

class MyXyzLayer extends mars3d.layer.XyzLayer {
  // 构建ImageryProvider
  async _createImageryProvider(options) {
    return createImageryProvider(options)
  }
}
async function createImageryProvider(options) {
  return new MyXyzImageryProvider(options)
}

// 注册下
const layerType = "xyz-my" // 图层类型,可以json中定义使用
mars3d.LayerUtil.register(layerType, MyXyzLayer)
mars3d.LayerUtil.registerImageryProvider(layerType, createImageryProvider)

// export { MyXyzLayer }
