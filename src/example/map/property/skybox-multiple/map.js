import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.85579, lng: 117.160245, alt: 273.4, heading: 153.6, pitch: -1.5 },
    showSkyAtmosphere: false // 需要关闭
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // map.scene.skyAtmosphere.show = false

  map.scene.skyBox = new mars3d.MultipleSkyBox({
    sources: {
      positiveX: "https://data.mars3d.cn/img/skybox-near/qingtian/rightav9.jpg",
      negativeX: "https://data.mars3d.cn/img/skybox-near/qingtian/leftav9.jpg",
      positiveY: "https://data.mars3d.cn/img/skybox-near/qingtian/frontav9.jpg",
      negativeY: "https://data.mars3d.cn/img/skybox-near/qingtian/backav9.jpg",
      positiveZ: "https://data.mars3d.cn/img/skybox-near/qingtian/topav9.jpg",
      negativeZ: "https://data.mars3d.cn/img/skybox-near/qingtian/bottomav9.jpg"
    },
    sources2: {
      positiveX: "https://data.mars3d.cn/img/skybox-near/wanxia/SunSetRight.png",
      negativeX: "https://data.mars3d.cn/img/skybox-near/wanxia/SunSetLeft.png",
      positiveY: "https://data.mars3d.cn/img/skybox-near/wanxia/SunSetFront.png",
      negativeY: "https://data.mars3d.cn/img/skybox-near/wanxia/SunSetBack.png",
      positiveZ: "https://data.mars3d.cn/img/skybox-near/wanxia/SunSetUp.png",
      negativeZ: "https://data.mars3d.cn/img/skybox-near/wanxia/SunSetDown.png"
    },
    sources3: {
      negativeX: "https://data.mars3d.cn/img/skybox/2/tycho2t3_80_mx.jpg",
      negativeY: "https://data.mars3d.cn/img/skybox/2/tycho2t3_80_my.jpg",
      negativeZ: "https://data.mars3d.cn/img/skybox/2/tycho2t3_80_mz.jpg",
      positiveX: "https://data.mars3d.cn/img/skybox/2/tycho2t3_80_px.jpg",
      positiveY: "https://data.mars3d.cn/img/skybox/2/tycho2t3_80_py.jpg",
      positiveZ: "https://data.mars3d.cn/img/skybox/2/tycho2t3_80_pz.jpg"
    }
  })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 更新场景参数
export function onChangeSceneVal(u_sceneSwitch) {
  // @ts-ignore
  map.scene.skyBox.select = u_sceneSwitch
}
