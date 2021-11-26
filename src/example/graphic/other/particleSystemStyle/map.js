
var map
var particleGraphic
var particlePosition
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 31.806029, lng: 117.222082, alt: 275, heading: 1, pitch: -12 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建Graphic图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 2.在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
    console.log("监听layer，鼠标移入了矢量对象", event)
  })
  graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
    console.log("监听layer，鼠标移出了矢量对象", event)
  })

  // 可在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  graphicLayer.bindPopup("我是layer上绑定的Popup")

  // 可在图层上绑定tooltip,对所有加到这个图层的矢量数据都生效
  // graphicLayer.bindTooltip('我是layer上绑定的Tooltip')

  // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  graphicLayer.bindContextMenu([
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
        var primitive = e.graphic
        if (primitive) {
          graphicLayer.removeGraphic(primitive)
        }
      }
    }
  ])

  // 绑定UI处理
  // initParamView()

  particlePosition = Cesium.Cartesian3.fromDegrees(117.221844, 31.813857, 28.5)

  particleGraphic = new mars3d.graphic.ParticleSystem({
    position: particlePosition, // 位置
    style: {
      image: "./img/particle/smoke.png",
      startColor: Cesium.Color.LIGHTCYAN.withAlpha(0.3), // 粒子出生时的颜色
      endColor: Cesium.Color.WHITE.withAlpha(0.0), // 当粒子死亡时的颜色

      particleSize: 20, // 粒子图片的Size大小（单位：像素）
      startScale: 2.0, // 粒子在出生时的比例（单位：相对于imageSize大小的倍数）
      endScale: 4.0, // 粒子在死亡时的比例（单位：相对于imageSize大小的倍数）

      minimumParticleLife: 1.0, // 粒子可能存在的最短寿命时间，实际寿命将随机生成（单位：秒）
      maximumParticleLife: 3.0, // 粒子可能存在的最长寿命时间，实际寿命将随机生成（单位：秒）

      // minimumSpeed: 1.0,  //粒子初速度的最小界限，超过该最小界限，随机选择粒子的实际速度。（单位：米/秒） ？？？
      // maximumSpeed: 2.0,  //粒子初速度的最大界限，超过该最大界限，随机选择粒子的实际速度。（单位：米/秒）

      emissionRate: 200 // 粒子发射器的发射速率 （单位：次/秒）
      // lifetime: 5, //粒子的一个生命周期长度（单位：秒） ？？？
    },
    gravity: -11, // 重力因子，会修改速度矢量以改变方向或速度（基于物理的效果）
    target: new Cesium.Cartesian3(-0.151, 0.294, 0.225), // 粒子的方向
    maxHeight: 5000 // 超出该高度后不显示粒子效果
  })
  graphicLayer.addGraphic(particleGraphic)
}

var targetPosition
// 发射的目标点
function targetHeight(val) {
  if (targetPosition) {
    updateTarget(targetPosition, val)
  }
}
function btnSelectTarget(val) {
  map.graphicLayer.startDraw({
    type: "point",
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.positionsShow
      targetPosition = positions[0]
      map.graphicLayer.clear()

      updateTarget(targetPosition, val)
    }
  })
}

// 图上选点
function btnSelectPosition() {
  map.graphicLayer.startDraw({
    type: "point",
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.positionsShow
      particlePosition = positions[0]
      map.graphicLayer.clear()

      particleGraphic.position = particlePosition
    }
  })
}

// UI绑定数据 处理
function initParamView(data) {

  // 绑定事件
  if (data.emissionRate) {
    particleGraphic.czmObject.emissionRate = parseFloat(data.emissionRate)
  }
  if (data.slideMinLife) {
    particleGraphic.czmObject.minimumParticleLife = parseFloat(data.slideMinLife)
  }
  if (data.slideMaxLife) {
    particleGraphic.czmObject.maximumParticleLife = parseFloat(data.slideMaxLife)
  }
  if (data.slideMinSpeed) {
    particleGraphic.czmObject.minimumSpeed = parseFloat(data.slideMinSpeed)
  }
  if (data.slideMaxSpeed) {
    particleGraphic.czmObject.maximumSpeed = parseFloat(data.slideMaxSpeed)
  }
  if (data.slideStart) {
    particleGraphic.czmObject.startScale = parseFloat(data.slideStart)
  }
  if (data.slideStop) {
    particleGraphic.czmObject.endScale = parseFloat(data.slideStop)
  }
  if (data.sliderParticleSize) {
    particleGraphic.particleSize = parseFloat(data.sliderParticleSize)
  }
  if (data.slideGravity) {
    particleGraphic.gravity = parseFloat(data.slideGravity)
  }
}


function updateTarget(position, val) {
  position = mars3d.PointUtil.addPositionsHeight(position, val)

  var target = Cesium.Cartesian3.subtract(position, particlePosition, new Cesium.Cartesian3())
  Cesium.Cartesian3.multiplyByScalar(target, 0.01, target)

  console.log(`${target.x},${target.y},${target.z}`)
  particleGraphic.target = target
}
