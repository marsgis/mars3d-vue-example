document.addEventListener(
  "DOMContentLoaded",
  function () {
    // 注销事件，避免反复触发
    // document.removeEventListener('DOMContentLoaded', arguments.callee, false)

    // 读取 config.json 配置文件
    mars3d.Resource.fetchJson({
      url: "config/config.json"
    }).then(function (json) {
      // 构建地图
      if (!mars3d.Util.webglreport()) {
        mars3d.Util.webglerror()
        return
      }
      // 合并属性参数，可覆盖config.json中的对应配置
      var mapOptions = mars3d.Util.merge(json.map3d, {
        scene: {
          center: { lat: 11.676709, lng: 117.82576, alt: 4116236, heading: 346, pitch: -60 }
        }
      })
      // 创建三维地球场景
      var map = new mars3d.Map("mars3dContainer", mapOptions)
    })
  },
  false
)
