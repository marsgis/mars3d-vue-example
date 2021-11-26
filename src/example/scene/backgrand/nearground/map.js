var map

var qingtianSkybox = new mars3d.GroundSkyBox({
  sources: {
    positiveX: "img/skybox_near/qingtian/rightav9.jpg",
    negativeX: "img/skybox_near/qingtian/leftav9.jpg",
    positiveY: "img/skybox_near/qingtian/frontav9.jpg",
    negativeY: "img/skybox_near/qingtian/backav9.jpg",
    positiveZ: "img/skybox_near/qingtian/topav9.jpg",
    negativeZ: "img/skybox_near/qingtian/bottomav9.jpg"
  }
})

var wanxiaSkybox = new mars3d.GroundSkyBox({
  sources: {
    positiveX: "img/skybox_near/wanxia/SunSetRight.png",
    negativeX: "img/skybox_near/wanxia/SunSetLeft.png",
    positiveY: "img/skybox_near/wanxia/SunSetFront.png",
    negativeY: "img/skybox_near/wanxia/SunSetBack.png",
    positiveZ: "img/skybox_near/wanxia/SunSetUp.png",
    negativeZ: "img/skybox_near/wanxia/SunSetDown.png"
  }
})

var lantianSkybox = new mars3d.GroundSkyBox({
  sources: {
    positiveX: "img/skybox_near/lantian/Right.jpg",
    negativeX: "img/skybox_near/lantian/Left.jpg",
    positiveY: "img/skybox_near/lantian/Front.jpg",
    negativeY: "img/skybox_near/lantian/Back.jpg",
    positiveZ: "img/skybox_near/lantian/Up.jpg",
    negativeZ: "img/skybox_near/lantian/Down.jpg"
  }
})

var currSkyBox
var defaultSkybox // cesium自带的Skybox

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.830035, lng: 117.159801, alt: 409, heading: 41, pitch: 0 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  defaultSkybox = map.scene.skyBox
  currSkyBox = qingtianSkybox

  map.on(mars3d.EventType.postRender, function () {
    var position = map.camera.position
    var height = Cesium.Cartographic.fromCartesian(position).height
    if (height < 230000) {
      if (currSkyBox) {
        map.scene.skyBox = currSkyBox
      }
      map.scene.skyAtmosphere.show = false
    } else {
      if (defaultSkybox) {
        map.scene.skyBox = defaultSkybox
      }
      map.scene.skyAtmosphere.show = true
    }
  })
}

function sunny() {
  currSkyBox = qingtianSkybox
}

function sunsetGlow() {
  currSkyBox = wanxiaSkybox
}

function blueSky() {
  currSkyBox = lantianSkybox
}

function mr() {
  currSkyBox = defaultSkybox
}
