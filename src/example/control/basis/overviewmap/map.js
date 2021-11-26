var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.73204, lng: 117.286568, alt: 50785, heading: 359, pitch: -76 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 构造鹰眼地图
  var overviewMap = new mars3d.control.OverviewMap({
    basemap: {
      name: "天地图电子",
      type: "group",
      layers: [
        { name: "底图", type: "tdt", layer: "vec_d", key: ["9ae78c51a0a28f06444d541148496e36"] },
        { name: "注记", type: "tdt", layer: "vec_z", key: ["9ae78c51a0a28f06444d541148496e36"] }
      ]
    },
    rectangle: {
      color: "#fecd78",
      opacity: 0.2,
      outline: 1,
      outlineColor: "#ff7800"
    },
    style: {
      right: "5px",
      top: "5px",
      width: "200px",
      height: "150px"
    }
  })
  map.addControl(overviewMap)
}
