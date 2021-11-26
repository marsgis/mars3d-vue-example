var map
var mapOptions
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  mapOptions = mars3d.Util.merge(options, {
    layers: [
      {
        type: "geojson",
        name: "示例数据",
        url: "//data.mars3d.cn/file/geojson/mars3d-draw.json",
        popup: "{type} {name}",
        show: true
      },
      {
        type: "3dtiles",
        name: "测试模型",
        url: "//data.mars3d.cn/3dtiles/bim-daxue/tileset.json",
        position: { lng: 116.313536, lat: 31.217297, alt: 80 },
        scale: 100,
        show: true
      }
    ]
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
}

function createMap() {
  if (map) {
    globalMsg("地图已存在,请勿重复创建!")
    return
  }
  map = new mars3d.Map("mars3dContainer", mapOptions)
}

function destroyMap() {
  if (!map) {
    globalMsg("地图已销毁,无需重复销毁!")
    return
  }
  map.destroy()
  map = null
}
