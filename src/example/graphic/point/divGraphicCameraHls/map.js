
  var map

  function initMap(options) {
    // 合并属性参数，可覆盖config.json中的对应配置
    var mapOptions = mars3d.Util.merge(options, {
      scene: {
        center: { lat: 31.649617, lng: 117.081721, alt: 444, heading: 348, pitch: -25 }
      }
    })

    // 创建三维地球场景
    map = new mars3d.Map("mars3dContainer", mapOptions)

    // 加载石化工厂模型
    const tiles3dLayer = new mars3d.layer.TilesetLayer({
      name: "石化工厂",
      url: "http://data.mars3d.cn/3dtiles/max-shihua/tileset.json",
      position: { lng: 117.077158, lat: 31.659116, alt: 24.6 },
      maximumScreenSpaceError: 1,
      maximumMemoryUsage: 1024,
      popup: "all"
    })
    map.addLayer(tiles3dLayer)

    // 创建DIV数据图层
    var graphicLayer = new mars3d.layer.DivLayer()
    map.addLayer(graphicLayer)

    graphicLayer.on(mars3d.EventType.click, function (event) {
      console.log("您单击了", event)
    })

    // 在layer上绑定右键菜单
    graphicLayer.bindContextMenu(
      [
        {
          text: "查看摄像头",
          iconCls: "fa fa-trash-o",
          callback: function (e) {
            const graphic = e.graphic

            globalMsg("右键菜单示例")
          }
        }
      ],
      { offsetY: -170 }
    )

    // 添加数据
    addGraphic(graphicLayer, [117.080397, 31.656139, 33.3])
    addGraphic(graphicLayer, [117.078006, 31.65649, 49.4])
    addGraphic(graphicLayer, [117.080571, 31.657898, 50.2])
    addGraphic(graphicLayer, [117.078331, 31.660016, 47.2])
  }

  function addGraphic(graphicLayer, position) {
    var graphicImg = new mars3d.graphic.DivGraphic({
      position: position,
      style: {
        html: ` <div class="mars3d-camera-content">
                  <img class="mars3d-camera-img" src="img/marker/camera.svg" >
                </div>
                <div class="mars3d-camera-line" ></div>
                <div class="mars3d-camera-point"></div>
              `,
        offsetX: -16,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000)
      },
      popup: `<video id="videoHLS"  muted="muted" autoplay="autoplay" loop="loop" crossorigin="" controls="">
              </video>`,
      popupOptions: {
        offsetY: -170, // 显示Popup的偏移值，是DivGraphic本身的像素高度值
        template: `<div class="marsBlackPanel animation-spaceInDown">
                    <div class="marsBlackPanel-text">{content}</div>
                    <span class="mars3d-popup-close-button closeButton" >×</span>
                  </div>`,
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.CENTER
      }
    })
    graphicLayer.addGraphic(graphicImg)

    // var hlsUrl = "http://ivi.bupt.edu.cn/hls/cctv13.m3u8";
    var hlsUrl = "http://1252093142.vod2.myqcloud.com/4704461fvodcq1252093142/f865d8a05285890787810776469/playlist.f3.m3u8"

    graphicImg.on(mars3d.EventType.popupOpen, function (event) {
      const videoElement = event.container.querySelector("#videoHLS") // popup对应的DOM

      if (window.Hls.isSupported()) {
        var hls = new window.Hls()
        hls.loadSource(hlsUrl)
        hls.attachMedia(videoElement)
        hls.on(window.Hls.Events.MANIFEST_PARSED, function () {
          videoElement.play()
        })
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        videoElement.src = hlsUrl
        videoElement.addEventListener("loadedmetadata", function () {
          videoElement.play()
        })
      }
    })
  }
