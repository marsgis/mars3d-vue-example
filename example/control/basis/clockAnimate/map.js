import * as mars3d from "mars3d"

let map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  const mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.744627, lng: 117.228537, alt: 18677, heading: 0, pitch: -63 }
    },
    control: {
      timeline: true,
      clockAnimate: false,
      distanceLegend: { left: "100px", bottom: "27px" }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 时钟控制（可替代cesium本身的animation）
  const clockAnimate = new mars3d.control.ClockAnimate({
    format: "yyyy-MM-dd HH:mm:ss"
  })
  map.addControl(clockAnimate)
}
