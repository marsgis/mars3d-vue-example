import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 地图API: http://lbs.tianditu.gov.cn/server/MapService.html

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  terrain: false
  // 方式1：在创建地球前的传参中配置 terrain 参数[目前1个球只支持1个地形服务]
  // terrain: {
  //   type: "tdt",
  //   url: "https://t{s}.tianditu.gov.cn/mapservice/swdx",
  //   key: "789e558be762ff832392a0393fd8a4f1",
  //   subdomains: "01234567",
  //   show: true,
  // },
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // http://mars3d.cn/docs/issue/token/
  globalNotify("已知问题提示", `(1)如果天地图token超量或失效，请您自行申请替换mars3d.Token.updateTianditu("key value")。`)

  // 方式2：在创建地球后更新terrainProvider
  map.terrainProvider = new mars3d.provider.TdtTerrainProvider({
    url: "https://t{s}.tianditu.gov.cn/mapservice/swdx",
    key: mars3d.Token.tianditu,
    // key: "789e558be762ff832392a0393fd8a4f1",
    subdomains: "01234567"
  })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 是否开启三角网
export function checkedTriangulation(enabled) {
  map.scene.globe._surface.tileProvider._debug.wireframe = enabled // 三角网
}
