
var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 31.401401, lng: 117.014981, alt: 12825, heading: 316, pitch: -53 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  var terrainClip = new mars3d.thing.TerrainClip({
    positions: [
      [116.919224, 31.460461],
      [116.901819, 31.459734],
      [116.902772, 31.479859],
      [116.926981, 31.479483],
      [116.936875, 31.486053],
      [116.974004, 31.489014],
      [116.982398, 31.483053],
      [116.981635, 31.458477],
      [116.946754, 31.424056],
      [116.908152, 31.44481]
    ],
    diffHeight: 1200, // 矿区深度
    image: "./img/textures/excavate_kuangqu.jpg", // 井墙面贴图url
    imageBottom: "./img/textures/excavate_bottom_min.jpg", // 井底贴图url
    splitNum: 2 // wall边界插值数
  })
  map.addThing(terrainClip)

  globalNotify("功能提示", "(1)非真实数据，仅体现岩层效果.")
}
