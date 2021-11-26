var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.808815, lng: 117.188016, alt: 800, heading: 55, pitch: -15 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 切换至蓝色底图

  // 添加参考三维模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "合肥市建筑物",
    url: "//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    marsJzwStyle: true, // 打开建筑物特效（内置Shader代码）
    popup: [
      { field: "objectid", name: "编号" },
      { field: "name", name: "名称" },
      { field: "height", name: "楼高", unit: "米" }
    ]
  })
  map.addLayer(tiles3dLayer)

  // 添加蒙版

  var maskDiv = document.createElement("div")
  maskDiv.className = "maskDiv"
  document.body.appendChild(maskDiv)
  maskDiv.style.cssText = `position: absolute;
                          top:0;
                          width: 100%;
                          height: 100%;
                          pointer-events: none;
                          z-index: 999;
                          background-image:
                          radial-gradient(rgba(139, 138, 138, 0.219) 50%, rgba(65, 57, 57, 0.658) 70%, rgba(17, 16, 16, 1) 90%);`
}
