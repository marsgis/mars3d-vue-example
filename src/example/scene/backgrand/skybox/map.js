var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 36.873519, lng: 106.863496, alt: 19999205, heading: 354, pitch: -89 },
      cameraController: {
        zoomFactor: 3.0,
        minimumZoomDistance: 1,
        maximumZoomDistance: 50000000
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)




  map.scene.skyBox = new Cesium.SkyBox({
    sources: {
      negativeX: "img/skybox/6/tycho2t3_80_mx.jpg",
      negativeY: "img/skybox/6/tycho2t3_80_my.jpg",
      negativeZ: "img/skybox/6/tycho2t3_80_mz.jpg",
      positiveX: "img/skybox/6/tycho2t3_80_px.jpg",
      positiveY: "img/skybox/6/tycho2t3_80_py.jpg",
      positiveZ: "img/skybox/6/tycho2t3_80_pz.jpg"
    }
  })

}

function show1() {
 // 修改天空盒
 map.scene.skyBox = new Cesium.SkyBox({
  sources: {
    negativeX: "img/skybox/1/tycho2t3_80_mx.jpg",
    negativeY: "img/skybox/1/tycho2t3_80_my.jpg",
    negativeZ: "img/skybox/1/tycho2t3_80_mz.jpg",
    positiveX: "img/skybox/1/tycho2t3_80_px.jpg",
    positiveY: "img/skybox/1/tycho2t3_80_py.jpg",
    positiveZ: "img/skybox/1/tycho2t3_80_pz.jpg"
  }
})
}

function show2() {
  // 修改天空盒
  map.scene.skyBox = new Cesium.SkyBox({
    sources: {
      negativeX: "img/skybox/2/tycho2t3_80_mx.jpg",
      negativeY: "img/skybox/2/tycho2t3_80_my.jpg",
      negativeZ: "img/skybox/2/tycho2t3_80_mz.jpg",
      positiveX: "img/skybox/2/tycho2t3_80_px.jpg",
      positiveY: "img/skybox/2/tycho2t3_80_py.jpg",
      positiveZ: "img/skybox/2/tycho2t3_80_pz.jpg"
    }
  })
}

function show3() {
  map.scene.skyBox = new Cesium.SkyBox({
    sources: {
      negativeX: "img/skybox/3/tycho2t3_80_mx.jpg",
      negativeY: "img/skybox/3/tycho2t3_80_my.jpg",
      negativeZ: "img/skybox/3/tycho2t3_80_mz.jpg",
      positiveX: "img/skybox/3/tycho2t3_80_px.jpg",
      positiveY: "img/skybox/3/tycho2t3_80_py.jpg",
      positiveZ: "img/skybox/3/tycho2t3_80_pz.jpg"
    }
  })
}
function show4() {
  map.scene.skyBox = new Cesium.SkyBox({
    sources: {
      negativeX: "img/skybox/4/tycho2t3_80_mx.jpg",
      negativeY: "img/skybox/4/tycho2t3_80_my.jpg",
      negativeZ: "img/skybox/4/tycho2t3_80_mz.jpg",
      positiveX: "img/skybox/4/tycho2t3_80_px.jpg",
      positiveY: "img/skybox/4/tycho2t3_80_py.jpg",
      positiveZ: "img/skybox/4/tycho2t3_80_pz.jpg"
    }
  })
}

function show5() {
  map.scene.skyBox = new Cesium.SkyBox({
    sources: {
      negativeX: "img/skybox/5/tycho2t3_80_mx.jpg",
      negativeY: "img/skybox/5/tycho2t3_80_my.jpg",
      negativeZ: "img/skybox/5/tycho2t3_80_mz.jpg",
      positiveX: "img/skybox/5/tycho2t3_80_px.jpg",
      positiveY: "img/skybox/5/tycho2t3_80_py.jpg",
      positiveZ: "img/skybox/5/tycho2t3_80_pz.jpg"
    }
  })
}
function show6() {
  map.scene.skyBox = new Cesium.SkyBox({
    sources: {
      negativeX: "img/skybox/6/tycho2t3_80_mx.jpg",
      negativeY: "img/skybox/6/tycho2t3_80_my.jpg",
      negativeZ: "img/skybox/6/tycho2t3_80_mz.jpg",
      positiveX: "img/skybox/6/tycho2t3_80_px.jpg",
      positiveY: "img/skybox/6/tycho2t3_80_py.jpg",
      positiveZ: "img/skybox/6/tycho2t3_80_pz.jpg"
    }
  })
}

