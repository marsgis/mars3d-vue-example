
      var map

      function initMap(options) {
        // 合并属性参数，可覆盖config.json中的对应配置
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            center: { lat: 30.820398, lng: 116.218603, alt: 6483, heading: 22, pitch: -40 }
          }
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)

        // 固定光照，避免gltf模型随时间存在亮度不一致。
        map.fixedLight = true

        // 创建矢量数据图层
        var graphicLayer = new mars3d.layer.GraphicLayer()
        map.addLayer(graphicLayer)

        addGraphic_a1(graphicLayer)
        addGraphic_a2(graphicLayer)
        addGraphic_a3(graphicLayer)
      }

      function addGraphic_a1(graphicLayer) {
        var graphic = new mars3d.graphic.ModelEntity({
          name: "飞机",
          position: [116.239918, 30.879709, 1208],
          style: {
            url: "//data.mars3d.cn/gltf/mars/feiji.glb",
            scale: 2
          }
        })
        graphicLayer.addGraphic(graphic)

        // 开始 自旋转效果
        graphic.rotateStart({
          direction: false, // 控制方向, true逆时针，false顺时针
          time: 30 // time：给定飞行一周所需时间(单位 秒)，控制速度
        })
      }

      function addGraphic_a2(graphicLayer) {
        var graphic = new mars3d.graphic.ModelEntity({
          name: "四凌锥体",
          position: [116.257665, 30.869372, 1500],
          style: {
            url: "//data.mars3d.cn/gltf/mars/zhui.glb",
            scale: 200
          }
        })
        graphicLayer.addGraphic(graphic)

        // 开始 自旋转效果
        graphic.rotateStart({
          direction: true, // 控制方向, true逆时针，false顺时针
          time: 6 // time：给定飞行一周所需时间(单位 秒)，控制速度
        })
      }

      function addGraphic_a3(graphicLayer) {
        var graphicCar = new mars3d.graphic.ModelEntity({
          name: "汽车",
          position: [116.210938, 30.87518, 613.1],
          style: {
            url: "//data.mars3d.cn/gltf/mars/qiche.gltf",
            scale: 0.5,
            heading: 30,
            minimumPixelSize: 100
          }
        })
        graphicLayer.addGraphic(graphicCar)

        // 移动模型
        graphicCar.moveTo({
          position: [116.259138, 30.855247, 562],
          time: 8 // 移动的时长(单位 秒)
        })
      }
