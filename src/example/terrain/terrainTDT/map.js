var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    terrain: false
    // 方式1：在创建地球前的传参中配置 terrain 参数[目前1个球只支持1个地形服务]
    // terrain: {
    //   type: "tdt",
    //   url: "https://t{s}.tianditu.gov.cn/DataServer",
    //   key: mars3d.Token.tianditu,
    //   subdomains: "01234567",
    //   show: true,
    // },
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 方式2：在创建地球后更新terrainProvider
  map.terrainProvider = new mars3d.provider.TdtTerrainProvider({
    url: "https://t{s}.tianditu.gov.cn/DataServer",
    key: mars3d.Token.tianditu,
    subdomains: "01234567"
  })


}
function enabledSanjiaowang(enabled) {
  // 三角网
  map.scene.globe._surface.tileProvider._debug.wireframe = enabled
}
