import * as mars3d from "mars3d"

function initMap(options) {

  // 读取 config.json 配置文件
  mars3d.Resource.fetchJson({ url: "config/config.json" })
    .then(function (json) {
      console.log("读取 config.json 配置文件完成", json) // 打印测试信息

      // 创建三维地球场景
      export const mapOptions = json.map3d
      const map = new mars3d.Map("mars3dContainer", mapOptions)

      // 打印测试信息
      console.log("mars3d的Map主对象构造完成", map)
      console.log("其中Cesium原生的Cesium.Viewer为", map.viewer)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
      globalAlert(error?.message)
    })

}
