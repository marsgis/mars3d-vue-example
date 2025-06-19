// import * as mars3d from "mars3d"
// const Cesium = mars3d.Cesium

const { LngLatPoint, Icon, CRS } = mars3d
const { alert = globalAlert, downloadFile, formatNum, openFile } = mars3d.Util
const { addPositionsHeight } = mars3d.PointUtil
const { proj4Trans } = mars3d.PointTrans
const { logInfo } = mars3d.Log
const { RotatePoint, Measure, KeyboardRoam } = mars3d.thing
const { Bloom, Brightness, BlackAndWhite, NightVision, Outline, Rain, Snow, Fog } = mars3d.effect

// 获取平台内置的右键菜单
function getDefaultContextMenu(map) {
  const that = map.contextmenu

  const that_thing = map.thing
  const that_effect = map.effect

  return [
    {
      text: function () {
        return map.getLangText("_查看此处坐标") + "-来自示例"
      },
      icon: Icon.Coordinates,
      show: function (e) {
        return Cesium.defined(e.cartesian)
      },
      callback: function (e) {
        // 经纬度
        const mpt = LngLatPoint.fromCartesian(e.cartesian)

        const ptNew = proj4Trans([mpt.lng, mpt.lat], "EPSG:4326", CRS.CGCS2000_GK_Zone_3)

        const inhtml = `
         ${map.getLangText("_经度")}:${mpt.lng}, ${map.getLangText("_纬度")}:${mpt.lat}, ${map.getLangText("_海拔")}:${mpt.alt},
         ${map.getLangText("_横坐标")}:${ptNew[0].toFixed(1)}, ${map.getLangText("_纵坐标")}:${ptNew[1].toFixed(1)} (CGCS2000)
        `
        globalAlert(inhtml, map.getLangText("_位置信息"))

        logInfo("此处经纬度坐标", mpt.toString()) // 打印方便测试
      }
    },
    {
      text: function () {
        return map.getLangText("_查看当前视角")
      },
      icon: Icon.CameraInfo,
      callback: function (e) {
        const mpt = JSON.stringify(map.getCameraView())
        globalAlert(mpt, map.getLangText("_当前视角信息"))

        logInfo("当前视角信息", mpt)
      }
    },
    // 下面是工具类
    {
      text: function () {
        return map.getLangText("_图上量算")
      },
      icon: Icon.Measure,
      children: [
        {
          text: function () {
            return map.getLangText("_距离")
          },
          icon: Icon.MeasureDistance,
          callback: function (e) {
            if (!that_thing.measure) {
              that_thing.measure = new Measure()
              map.addThing(that_thing.measure)
            }
            that_thing.measure.distance()
          }
        },
        {
          text: function () {
            return map.getLangText("_面积")
          },
          icon: Icon.MeasureArea,
          callback: function (e) {
            if (!that_thing.measure) {
              that_thing.measure = new Measure()
              map.addThing(that_thing.measure)
            }
            that_thing.measure.area()
          }
        },
        {
          text: function () {
            return map.getLangText("_高度差")
          },
          icon: Icon.MeasureHeight,
          callback: function (e) {
            if (!that_thing.measure) {
              that_thing.measure = new Measure()
              map.addThing(that_thing.measure)
            }
            that_thing.measure.heightTriangle()
          }
        },
        {
          text: function () {
            return map.getLangText("_角度")
          },
          icon: Icon.MeasureAngle,
          callback: function (e) {
            if (!that_thing.measure) {
              that_thing.measure = new Measure()
              map.addThing(that_thing.measure)
            }
            that_thing.measure.angle()
          }
        },
        {
          text: function () {
            return map.getLangText("_删除测量")
          },
          icon: Icon.Delete,
          show: function (e) {
            return that_thing.measure && that_thing.measure.hasMeasure
          },
          callback: function (e) {
            if (that_thing.measure) {
              that_thing.measure.clear()
            }
          }
        }
      ]
    },
    {
      text: function () {
        return map.getLangText("_图上标记")
      },
      icon: Icon.Draw,
      children: [
        {
          text: function () {
            return map.getLangText("_标记点")
          },
          icon: Icon.DrawPoint,
          callback: function (e) {
            map.graphicLayer.startDraw({
              type: "point",
              style: {
                pixelSize: 12,
                color: "#3388ff"
              },
              success: function (graphic) {
                // eslint-disable-next-line no-console
                logInfo("标记点坐标", JSON.stringify(graphic.coord))
              }
            })
          }
        },
        {
          text: function () {
            return map.getLangText("_标记线")
          },
          icon: Icon.DrawPolyline,
          callback: function (e) {
            map.graphicLayer.startDraw({
              type: "polyline",
              style: {
                color: "#55ff33",
                width: 3
                // arcType: Cesium.ArcType.NONE
              },
              success: function (graphic) {
                // eslint-disable-next-line no-console
                logInfo("标记线坐标", JSON.stringify(graphic.coord))
              }
            })
          }
        },
        {
          text: function () {
            return map.getLangText("_标记面")
          },
          icon: Icon.DrawPolygon,
          callback: function (e) {
            map.graphicLayer.startDraw({
              type: "polygon",
              style: {
                color: "#29cf34",
                opacity: 0.5,
                outline: true,
                outlineWidth: 2.0
              },
              success: function (graphic) {
                // eslint-disable-next-line no-console
                logInfo("标记面坐标", JSON.stringify(graphic.coord))
              }
            })
          }
        },
        {
          text: function () {
            return map.getLangText("_标记圆")
          },
          icon: Icon.DrawCircle,
          callback: function (e) {
            map.graphicLayer.startDraw({
              type: "circle",
              style: {
                color: "#ffff00",
                opacity: 0.6
              },
              addHeight: 1,
              success: function (graphic) {
                // eslint-disable-next-line no-console
                logInfo("标记圆坐标", JSON.stringify(graphic.coord))
              }
            })
          }
        },
        {
          text: function () {
            return map.getLangText("_标记矩形")
          },
          icon: Icon.DrawRectangle,
          callback: function (e) {
            map.graphicLayer.startDraw({
              type: "rectangle",
              style: {
                color: "#ffff00",
                opacity: 0.6
              },
              success: function (graphic) {
                // eslint-disable-next-line no-console
                logInfo("标记矩形坐标", JSON.stringify(graphic.coord))
              }
            })
          }
        },
        {
          text: function () {
            return map.getLangText("_允许编辑")
          },
          icon: Icon.DrawEditYes,
          show: function (e) {
            return !map.graphicLayer.isAutoEditing
          },
          callback: function (e) {
            map.graphicLayer.isAutoEditing = true
          }
        },
        {
          text: function () {
            return map.getLangText("_禁止编辑")
          },
          icon: Icon.DrawEditNo,
          show: function (e) {
            return map.graphicLayer.isAutoEditing
          },
          callback: function (e) {
            map.graphicLayer.isAutoEditing = false
          }
        },
        {
          text: function () {
            return map.getLangText("_导出JSON")
          },
          icon: Icon.DrawDownJson,
          show: function (e) {
            return map.graphicLayer.length > 0
          },
          callback: function (e) {
            const json = map.graphicLayer.toJSON()
            logInfo("标绘图层数据", json)
            downloadFile("标绘图层数据.json", JSON.stringify(json))
          }
        },
        {
          text: function () {
            return map.getLangText("_导入JSON")
          },
          icon: Icon.DrawDownJson,
          callback: function (e) {
            openFile({ accept: ".json,.geojson" }).then((result) => {
              logInfo("导入文件数据", result.text)
              map.graphicLayer.loadJSON(result.text, { flyTo: true, clear: true })
            })
          }
        },
        {
          text: function () {
            return map.getLangText("_清除标记")
          },
          icon: Icon.Delete,
          show: function (e) {
            return map.graphicLayer.length > 0
          },
          callback: function (e) {
            map.graphicLayer.clear()
          }
        }
      ]
    },

    { type: "line" }, // 间隔线

    // 视角
    {
      text: function () {
        return map.getLangText("_视角切换")
      },
      icon: Icon.Camera,
      children: [
        {
          text: function () {
            return map.getLangText("_允许进入地下")
          },
          icon: Icon.UndergroundYes,
          show: function (e) {
            return map.scene.screenSpaceCameraController.enableCollisionDetection
          },
          callback: function (e) {
            map.scene.screenSpaceCameraController.enableCollisionDetection = false
          }
        },
        {
          text: function () {
            return map.getLangText("_禁止进入地下")
          },
          icon: Icon.UndergroundNo,
          show: function (e) {
            return !map.scene.screenSpaceCameraController.enableCollisionDetection
          },
          callback: function (e) {
            map.scene.screenSpaceCameraController.enableCollisionDetection = true
          }
        },
        {
          text: function () {
            return map.getLangText("_绕此处环绕飞行")
          },
          icon: Icon.RotatePointStart,
          show: function (e) {
            return e.cartesian && (!that_thing.rotatePoint || !that_thing.rotatePoint?.isStart)
          },
          callback: function (e) {
            if (!that_thing.rotatePoint) {
              that_thing.rotatePoint = new RotatePoint()
              map.addThing(that_thing.rotatePoint)
            }
            that_thing.rotatePoint.start(e.cartesian)
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭环绕飞行")
          },
          icon: Icon.RotatePointStop,
          show: function (e) {
            return that_thing.rotatePoint?.isStart
          },
          callback: function (e) {
            if (that_thing.rotatePoint) {
              that_thing.rotatePoint.stop()
            }
          }
        },

        {
          text: function () {
            return map.getLangText("_移动到此处")
          },
          icon: Icon.FlyToPoint,
          show: function (e) {
            return Cesium.defined(e.cartesian)
          },
          callback: function (e) {
            const cameraDistance = Cesium.Cartesian3.distance(e.cartesian, map.camera.positionWC) * 0.1

            map.flyToPoint(e.cartesian, {
              radius: cameraDistance, // 距离目标点的距离
              maximumHeight: map.camera.positionCartographic.height
            })
          }
        },
        {
          text: function () {
            return map.getLangText("_第一视角站到此处")
          },
          icon: Icon.FirstPerspective,
          show: function (e) {
            return Cesium.defined(e.cartesian)
          },
          callback: function (e) {
            map.camera.flyTo({
              destination: addPositionsHeight(e.cartesian, 10), // 升高10米
              orientation: {
                heading: map.camera.heading,
                pitch: 0.0,
                roll: 0.0
              },
              maximumHeight: map.camera.positionCartographic.height
            })
          }
        },
        {
          text: function () {
            return map.getLangText("_开启键盘漫游")
          },
          icon: Icon.KeyboardRoamYes,
          show: function (e) {
            return !that_thing.keyboardRoam || !that_thing.keyboardRoam.enabled
          },
          callback: function (e) {
            if (!that_thing.keyboardRoam) {
              that_thing.keyboardRoam = new KeyboardRoam()
              map.addThing(that_thing.keyboardRoam)
            }
            that_thing.keyboardRoam.enabled = true
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭键盘漫游")
          },
          icon: Icon.KeyboardRoamNo,
          show: function (e) {
            return that_thing.keyboardRoam?.enabled
          },
          callback: function (e) {
            that_thing.keyboardRoam.enabled = false
          }
        },
        {
          text: function () {
            return map.getLangText("_跟踪锁定")
          },
          icon: Icon.TrackedEntityYes,
          show: function (e) {
            const graphic = e.graphic
            if (!graphic) {
              return false
            }

            if (graphic.entity instanceof Cesium.Entity) {
              return true
            } else if (graphic.trackedEntity instanceof Cesium.Entity) {
              return true
            }

            return false
          },
          callback: function (e) {
            map.trackedEntity = e.graphic
            that.trackedGraphic = e.graphic
          }
        },
        {
          text: function () {
            return map.getLangText("_取消锁定")
          },
          icon: Icon.TrackedEntityNo,
          show: function (e) {
            return that.trackedGraphic === e.graphic && map.trackedEntity !== undefined
          },
          callback: function (e) {
            map.trackedEntity = undefined
            that.trackedGraphic = undefined
          }
        }
      ]
    },
    // 特效
    {
      text: function () {
        return map.getLangText("_特效效果")
      },
      icon: Icon.Effect,
      children: [
        {
          text: function () {
            return map.getLangText("_开启下雨")
          },
          icon: Icon.RainEffectYes,
          show: function (e) {
            return !that_effect.rainEffect
          },
          callback: function (e) {
            if (!that_effect.rainEffect) {
              that_effect.rainEffect = new Rain()
              map.addEffect(that_effect.rainEffect)
            }
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭下雨")
          },
          icon: Icon.RainEffectNo,
          show: function (e) {
            return that_effect.rainEffect
          },
          callback: function (e) {
            if (that_effect.rainEffect) {
              map.removeEffect(that_effect.rainEffect, true)
              delete that_effect.rainEffect
            }
          }
        },
        {
          text: function () {
            return map.getLangText("_开启下雪")
          },
          icon: Icon.SnowEffectYes,
          show: function (e) {
            return !that_effect.snowEffect
          },
          callback: function (e) {
            if (!that_effect.snowEffect) {
              that_effect.snowEffect = new Snow()
              map.addEffect(that_effect.snowEffect)
            }
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭下雪")
          },
          icon: Icon.SnowEffectNo,
          show: function (e) {
            return that_effect.snowEffect
          },
          callback: function (e) {
            if (that_effect.snowEffect) {
              map.removeEffect(that_effect.snowEffect, true)
              delete that_effect.snowEffect
            }
          }
        },

        {
          text: function () {
            return map.getLangText("_开启雾天气")
          },
          icon: Icon.FogEffectYes,
          show: function (e) {
            return !that_effect.fogEffect
          },
          callback: function (e) {
            if (!that_effect.fogEffect) {
              const height = map.camera.positionCartographic.height * 2
              that_effect.fogEffect = new Fog({
                fogByDistance: new Cesium.Cartesian4(0.1 * height, 0.1, height, 0.8)
              })
              map.addEffect(that_effect.fogEffect)
            }
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭雾天气")
          },
          icon: Icon.FogEffectNo,
          show: function (e) {
            return that_effect.fogEffect
          },
          callback: function (e) {
            if (that_effect.fogEffect) {
              map.removeEffect(that_effect.fogEffect, true)
              delete that_effect.fogEffect
            }
          }
        },

        {
          text: function () {
            return map.getLangText("_开启泛光")
          },
          icon: Icon.BloomEffectYes,
          show: function (e) {
            return !that_effect.bloomEffect
          },
          callback: function (e) {
            if (!that_effect.bloomEffect) {
              that_effect.bloomEffect = new Bloom()
              map.addEffect(that_effect.bloomEffect)
            }
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭泛光")
          },
          icon: Icon.BloomEffectNo,
          show: function (e) {
            return that_effect.bloomEffect
          },
          callback: function (e) {
            if (that_effect.bloomEffect) {
              map.removeEffect(that_effect.bloomEffect, true)
              delete that_effect.bloomEffect
            }
          }
        },

        {
          text: function () {
            return map.getLangText("_开启亮度")
          },
          icon: Icon.BrightnessEffectYes,
          show: function (e) {
            return !that_effect.brightnessEffect
          },
          callback: function (e) {
            if (!that_effect.brightnessEffect) {
              that_effect.brightnessEffect = new Brightness()
              map.addEffect(that_effect.brightnessEffect)
            }
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭亮度")
          },
          icon: Icon.BrightnessEffectNo,
          show: function (e) {
            return that_effect.brightnessEffect
          },
          callback: function (e) {
            if (that_effect.brightnessEffect) {
              map.removeEffect(that_effect.brightnessEffect, true)
              delete that_effect.brightnessEffect
            }
          }
        },

        {
          text: function () {
            return map.getLangText("_开启夜视")
          },
          icon: Icon.NightVisionEffectYes,
          show: function (e) {
            return !that_effect.nightVisionEffect
          },
          callback: function (e) {
            if (!that_effect.nightVisionEffect) {
              that_effect.nightVisionEffect = new NightVision()
              map.addEffect(that_effect.nightVisionEffect)
            }
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭夜视")
          },
          icon: Icon.NightVisionEffectNo,
          show: function (e) {
            return that_effect.nightVisionEffect
          },
          callback: function (e) {
            if (that_effect.nightVisionEffect) {
              map.removeEffect(that_effect.nightVisionEffect, true)
              delete that_effect.nightVisionEffect
            }
          }
        },

        {
          text: function () {
            return map.getLangText("_开启黑白")
          },
          icon: Icon.BlackAndWhiteEffectYes,
          show: function (e) {
            return !that_effect.blackAndWhiteEffect
          },
          callback: function (e) {
            if (!that_effect.blackAndWhiteEffect) {
              that_effect.blackAndWhiteEffect = new BlackAndWhite()
              map.addEffect(that_effect.blackAndWhiteEffect)
            }
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭黑白")
          },
          icon: Icon.BlackAndWhiteEffectNo,
          show: function (e) {
            return that_effect.blackAndWhiteEffect
          },
          callback: function (e) {
            if (that_effect.blackAndWhiteEffect) {
              map.removeEffect(that_effect.blackAndWhiteEffect, true)
              delete that_effect.blackAndWhiteEffect
            }
          }
        },

        {
          text: function () {
            return map.getLangText("_开启拾取高亮")
          },
          icon: Icon.OutlineEffectYes,
          show: function (e) {
            return !that_effect.outlineEffect
          },
          callback: function (e) {
            if (!that_effect.outlineEffect) {
              that_effect.outlineEffect = new Outline()
              map.addEffect(that_effect.outlineEffect)
            }
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭拾取高亮")
          },
          icon: Icon.OutlineEffectNo,
          show: function (e) {
            return that_effect.outlineEffect
          },
          callback: function (e) {
            if (that_effect.outlineEffect) {
              map.removeEffect(that_effect.outlineEffect, true)
              delete that_effect.outlineEffect
            }
          }
        }
      ]
    },
    // 地形
    {
      text: function () {
        return map.getLangText("_地形")
      },
      icon: Icon.Terrain,
      show: function (e) {
        return Cesium.defined(e.cartesian)
      },
      children: [
        {
          text: function () {
            return map.getLangText("_开启地形")
          },
          icon: Icon.TerrainYes,
          show: function (e) {
            return !map.hasTerrain
          },
          callback: function (e) {
            map.hasTerrain = true
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭地形")
          },
          icon: Icon.TerrainNo,
          show: function (e) {
            return map.hasTerrain
          },
          callback: function (e) {
            map.hasTerrain = false
          }
        },
        {
          text: function () {
            return map.getLangText("_显示三角网")
          },
          icon: Icon.TerrainWireframeYes,
          show: function (e) {
            return !map.scene.globe._surface.tileProvider._debug.wireframe
          },
          callback: function (e) {
            map.scene.globe._surface.tileProvider._debug.wireframe = true
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭三角网")
          },
          icon: Icon.TerrainWireframeNo,
          show: function (e) {
            return map.scene.globe._surface.tileProvider._debug.wireframe
          },
          callback: function (e) {
            map.scene.globe._surface.tileProvider._debug.wireframe = false
          }
        }
      ]
    },
    // 图层
    {
      text: function () {
        return map.getLangText("_图层")
      },
      icon: Icon.Tileset,
      show: function (e) {
        return Cesium.defined(e.layer)
      },
      children: [
        {
          text: function () {
            return map.getLangText("_显示三角网")
          },
          icon: Icon.TilesetWireframeYes,
          show: function (e) {
            const model = map.pick3DTileset(e.cartesian) // 拾取绘制返回的模型
            if (!model) {
              return false
            }
            return !model.debugWireframe && model._enableDebugWireframe
          },
          callback: function (e) {
            const model = map.pick3DTileset(e.cartesian) // 拾取绘制返回的模型
            model.debugWireframe = true
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭三角网")
          },
          icon: Icon.TilesetWireframeNo,
          show: function (e) {
            const model = map.pick3DTileset(e.cartesian) // 拾取绘制返回的模型
            if (!model) {
              return false
            }
            return model.debugWireframe && model._enableDebugWireframe
          },
          callback: function (e) {
            const model = map.pick3DTileset(e.cartesian) // 拾取绘制返回的模型
            model.debugWireframe = false
          }
        },
        {
          text: function () {
            return map.getLangText("_显示包围盒")
          },
          icon: Icon.TilesetBoundingVolumeYes,
          show: function (e) {
            const model = map.pick3DTileset(e.cartesian) // 拾取绘制返回的模型
            if (!model) {
              return false
            }
            return !model.debugShowBoundingVolume
          },
          callback: function (e) {
            const model = map.pick3DTileset(e.cartesian) // 拾取绘制返回的模型
            model.debugShowBoundingVolume = true
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭包围盒")
          },
          icon: Icon.TilesetBoundingVolumeNo,
          show: function (e) {
            const model = map.pick3DTileset(e.cartesian) // 拾取绘制返回的模型
            if (!model) {
              return false
            }
            return model.debugShowBoundingVolume
          },
          callback: function (e) {
            const model = map.pick3DTileset(e.cartesian) // 拾取绘制返回的模型
            model.debugShowBoundingVolume = false
          }
        },
        {
          text: function () {
            return map.getLangText("_导出JSON")
          },
          icon: Icon.TilesetBoundingVolumeNo,
          show: function (e) {
            return e.layer.toJSON
          },
          callback: function (e) {
            const json = e.layer.toJSON()
            logInfo("layer图层配置", json)
            downloadFile("layer图层配置.json", JSON.stringify(json))
          }
        }
      ]
    },
    // 场景
    {
      text: function () {
        return map.getLangText("_场景")
      },
      icon: Icon.Scene,
      children: [
        {
          text: function () {
            return map.getLangText("_开启深度监测")
          },
          icon: Icon.DepthTestYes,
          show: function (e) {
            return !map.scene.globe.depthTestAgainstTerrain
          },
          callback: function (e) {
            map.scene.globe.depthTestAgainstTerrain = true
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭深度监测")
          },
          icon: Icon.DepthTestNo,
          show: function (e) {
            return map.scene.globe.depthTestAgainstTerrain
          },
          callback: function (e) {
            map.scene.globe.depthTestAgainstTerrain = false
          }
        },

        {
          text: function () {
            return map.getLangText("_显示星空背景")
          },
          icon: Icon.SkyBoxYes,
          show: function (e) {
            return !map.scene.skyBox?.show
          },
          callback: function (e) {
            map.scene.skyBox.show = true // 天空盒
            map.scene.moon.show = true // 太阳
            map.scene.sun.show = true // 月亮
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭星空背景")
          },
          icon: Icon.SkyBoxNo,
          show: function (e) {
            return map.scene.skyBox?.show
          },
          callback: function (e) {
            map.scene.skyBox.show = false // 天空盒
            map.scene.moon.show = false // 太阳
            map.scene.sun.show = false // 月亮
          }
        },
        {
          text: function () {
            return map.getLangText("_开启日照阴影")
          },
          icon: Icon.ShadowYes,
          show: function (e) {
            return !map.viewer.shadows
          },
          callback: function (e) {
            map.viewer.shadows = true
            map.viewer.terrainShadows = Cesium.ShadowMode.ENABLED
            map.scene.globe.enableLighting = true
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭日照阴影")
          },
          icon: Icon.ShadowNo,
          show: function (e) {
            return map.viewer.shadows
          },
          callback: function (e) {
            map.viewer.shadows = false
            map.viewer.terrainShadows = Cesium.ShadowMode.RECEIVE_ONLY
            map.scene.globe.enableLighting = false
          }
        },
        {
          text: function () {
            return map.getLangText("_开启大气渲染")
          },
          icon: Icon.SkyAtmosphereYes,
          show: function (e) {
            return map.scene.skyAtmosphere && !map.scene.skyAtmosphere.show
          },
          callback: function (e) {
            map.scene.skyAtmosphere.show = true
            map.scene.globe.showGroundAtmosphere = true
          }
        },
        {
          text: function () {
            return map.getLangText("_关闭大气渲染")
          },
          icon: Icon.SkyAtmosphereNo,
          show: function (e) {
            return map.scene.skyAtmosphere?.show
          },
          callback: function (e) {
            map.scene.skyAtmosphere.show = false
            map.scene.globe.showGroundAtmosphere = false
          }
        },

        {
          text: function () {
            return map.getLangText("_导入JSON")
          },
          icon: Icon.DrawDownJson,
          callback: function (e) {
            openFile({ accept: ".json,.geojson" }).then((result) => {
              logInfo("导入场景JSON文件", result.text)
              map.setOptions(result.text, { merge: false })
            })
          }
        },
        {
          text: function () {
            return map.getLangText("_导出JSON")
          },
          icon: Icon.DrawDownJson,
          callback: function (e) {
            const json = map.toJSON()
            logInfo("Map场景配置", json)
            downloadFile("Map场景配置.json", JSON.stringify(json))
          }
        },
        {
          text: function () {
            return map.getLangText("_场景出图")
          },
          icon: Icon.ExpImage,
          callback: function (e) {
            map.expImage()
          }
        }
      ]
    }
  ]
}
