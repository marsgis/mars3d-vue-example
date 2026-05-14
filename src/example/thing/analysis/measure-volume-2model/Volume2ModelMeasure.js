// import * as mars3d from "mars3d"
// const Cesium = mars3d.Cesium

const EventType = mars3d.EventType
const interPolygonByDepth = mars3d.PolyUtil.interPolygonByDepth
const formatVolume = mars3d.MeasureUtil.formatVolume

/**
 * 对2个模型图层（基准模型&比较模型）进行对比，分析差异的填挖方体积（方量分析）
 *
 * 注意：<br />
 * 1. 需要地形和模型等需要分析区域对应的数据加载完成后才能分析。<br />
 * 2. 如果有遮挡了分析区域的任何矢量对象，都需要分析前隐藏下，分析结束后再改回显示。<br />
 * 3. 不同视角下计算贴模型高度结果可能会有差异，大量计算时积少成多对结果就有一定误差
 *
 *
 * @param {object} options 参数对象，包括以下：
 * @param {object|BaseGraphic.AjaxAttr} [options.attr] 附件的属性信息，可以任意附加属性，导出geojson或json时会自动处理导出。
 *
 * @param {LabelEntity.StyleOptions} [options.label] 测量结果文本的样式
 * @param {number} [options.maxHeightDifference]  最大的差值，两个高度差超过多少将不记入计算
 * @param {number} [options.offsetHeight= 0]  盒子偏移显示的高度值，可以将盒子显示在空中来展示
 *
 * @param {string|number | object | TilesetLayer} [options.baseModel] 基准模型，传入图层id或者图层名称对象（{value:图层名称,type:"name"}）或者模型图层本身
 * @param {string|number | object | TilesetLayer} [options.compareModel] 比较模型，传入图层id或者图层名称对象（{value:图层名称,type:"name"}）或者模型图层本身
 *
 * @param {boolean} [options.showDigBox=true] 是否显示挖方盒子
 * @param {string|Cesium.Color} [options.digBoxColor= "rgba(255, 0, 0, 0.3)"] 挖方盒子的颜色
 * @param {boolean} [options.showDigVolume=true] 是否显示挖方体积结果文本
 * @param {string} [options.digVolumeName='挖方体积'] 挖方体积结果的名称
 *
 * @param {boolean} [options.showFillBox=true] 是否显示填方盒子
 * @param {string|Cesium.Color} [options.fillBoxColor= "rgba(140, 230, 50, 0.3)"] 填方盒子的颜色
 * @param {boolean} [options.showFillVolume=true] 是否显示填方体积结果文本
 * @param {string} [options.fillVolumeName='填方体积'] 填方体积结果的名称
 *
 * @param {number} [options.decimal = 2]  显示的 数值 文本中保留的小数位
 * @param {boolean} [options.exact=true]  是否进行精确计算， 传false时是否快速概略计算方式，该方式计算精度较低，但计算速度快，仅能计算在当前视域内坐标的高度
 *
 *
 * @param {string|number} [options.id = createGuid()] 矢量数据id标识
 * @param {string} [options.name] 矢量数据名称
 * @param {boolean} [options.show = true] 矢量数据是否显示
 * @param {BaseClass|boolean} [options.eventParent]  指定的事件冒泡对象，默认为所加入的图层对象，false时不冒泡事件
 * @param {boolean|Function} [options.allowDrillPick]  是否允许鼠标穿透拾取
 * @param {boolean} [options.flyTo] 加载完成数据后是否自动飞行定位到数据所在的区域。
 * @param {object} [options.flyToOptions] 加载完成数据后是否自动飞行定位到数据所在的区域的对应 {@link BaseGraphic#flyTo}方法参数。
 *
 * @export
 * @class Volume2ModelMeasure
 * @extends {VolumeDepthMeasure}
 * @see [支持的事件类型]{@link BaseGraphic.EventType}
 */
class Volume2ModelMeasure extends mars3d.graphic.VolumeDepthMeasure {
  constructor(options = {}) {
    super(options)

    this.showArea = false

    this._showPoly = false
    this._showWall = false
  }

  _mountedHook() {
    super._mountedHook()

    // 获取基准模型和比较模型
    this.initBaseAngCompareLayer()
  }

  // // 编辑修改后
  // _editPointHandler(event) {
  //   this._entity.show = false
  //   if (this.options.geometrys?.length) {
  //     this.creatGeometrysList(this.options.geometrys)
  //   } else {
  //     this._drawCreatedHandler(event)
  //   }
  // }

  // 计算体积 -主要代码
  async calcVolume(positions) {
    if (!this._map) {
      return
    }

    this.fire(
      EventType.start,
      {
        mtype: this.type,
        sourceTarget: this,
        positions
      },
      true
    )

    this._measureLable.show = false
    this._entity.show = false
    if (this._entity_outlines) {
      for (let i = 0, len = this._entity_outlines.length; i < len; i++) {
        const polyline = this._entity_outlines[i].polyline
        polyline.show = false
      }
    }

    if (this._primitive_boxs) {
      this._layer.primitiveCollection.remove(this._primitive_boxs)
      delete this._primitive_boxs
    }

    // 基础模型
    this.showHiddenBCLayer(true, false)

    await delay(500)

    const baseEvent = await interPolygonByDepth({
      scene: this._map.scene,
      positions,
      splitNum: this.options.splitNum ?? 512,
      cameraHeight: this.options.cameraHeight
    })

    if (this.isDestroy) {
      return
    }
    // 比较模型
    this.showHiddenBCLayer(false, true)
    await delay(500)
    const compareEvent = await interPolygonByDepth({
      scene: this._map.scene,
      positions,
      splitNum: this.options.splitNum ?? 512,
      cameraHeight: this.options.cameraHeight
    })

    this._measured = this.updateVolume(baseEvent, compareEvent)
    // 显示计算结果文本
    this.updateText()
    if (this._measureLable) {
      this._measureLable.position = mars3d.PolyUtil.centerOfMass(positions, this._maxHeight) // 求中心点
      this._measureLable.show = this.show
    }

    this.showHiddenBCLayer(this.laseBaseLayerShow, this.laseCompareLayerShow)

    const result = {
      ...this._measured,
      sourceTarget: this,
      mtype: this.type,
      graphic: this
    }
    this.fire(EventType.end, result, true)

    if (this._promise?.resolve) {
      this._promise.resolve(this)
    }
  }

  updateVolume(baseEvent, compareEvent) {
    if (!baseEvent) {
      baseEvent = this._measured.baseEvent
    }
    if (!compareEvent) {
      compareEvent = this._measured.compareEvent
    }
    const boxArea = baseEvent.box.area
    const baseModelPositions = baseEvent.positions
    const compareModelPositions = compareEvent.positions

    const positions = this.positionsShow
    // 计算体积
    const geometrysList = []

    let cut = 0
    let fill = 0
    for (let i = 0; i < baseModelPositions.length; i++) {
      const basePosition = baseModelPositions[i]
      const comparePosition = compareModelPositions[i]

      // 将范围外的排除
      if (getInPolyPoint(basePosition, positions) && getInPolyPoint(comparePosition, positions)) {
        const baseAlt = basePosition.height
        const compareAlt = comparePosition.height

        const heightDifference = Math.round(Math.abs(baseAlt - compareAlt))
        if (heightDifference > this._maxHeightDifference) {
          console.log("高度差大于50，跳过计算")
          continue
        }
        if (compareAlt > baseAlt) {
          // 比较模型模型高度大于基准模型的高度，则需要挖掉
          cut += boxArea * (compareAlt - baseAlt)

          // 红色挖方
          if (this.showDigBox) {
            const box = compareModelPositions[i].getOutline()
            geometrysList.push({
              box,
              extrudedHeight: compareAlt,
              height: baseAlt,
              color: this.options.digBoxColor ?? "rgba(255, 0, 0, 0.3)"
            })
          }
        } else if (compareAlt < baseAlt) {
          // 比较模型的高度小于基准模型的高度，则需要填上
          fill += boxArea * (baseAlt - compareAlt)

          // 绿色填方
          if (this.showFillBox) {
            const box = baseModelPositions[i].getOutline()
            geometrysList.push({
              box,
              extrudedHeight: baseAlt,
              height: compareAlt,
              color: this.options.fillBoxColor ?? "rgba(140, 230, 50, 0.3)"
            })
          }
        }
      }
    }

    this.creatGeometrysList(geometrysList)

    return { baseEvent, compareEvent, geometrysList, digVolume: cut, fillVolume: fill }
  }

  creatGeometrysList(geometrysList) {
    if (!geometrysList) {
      geometrysList = this._measured?.geometrysList
    }

    const geometryInstances = []
    const offsetHeight = this.options.offsetHeight ?? 0
    for (let i = 0; i < geometrysList.length; i++) {
      const item = geometrysList[i]
      geometryInstances.push(
        new Cesium.GeometryInstance({
          geometry: new Cesium.PolygonOutlineGeometry({
            polygonHierarchy: new Cesium.PolygonHierarchy(item.box),
            extrudedHeight: item.extrudedHeight + offsetHeight,
            height: item.height + offsetHeight
          }),
          attributes: {
            color: getCesiumGeometryColor(item.color)
          }
        })
      )
    }

    if (this._primitive_boxs) {
      this._layer.primitiveCollection.remove(this._primitive_boxs)
      delete this._primitive_boxs
    }
    if (geometryInstances.length > 0) {
      this._primitive_boxs = new Cesium.Primitive({
        geometryInstances,
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: true,
          renderState: {
            lineWidth: 1.0
          }
        }),
        asynchronous: true // debug图形实时生成，会影响计算时间，如果为true异步创建，则结果很快得出，但debug图形会过段时间才显示
      })
      this._layer.primitiveCollection.add(this._primitive_boxs)

      this._primitive_boxs._noMousePick = true
      this.bindPickId(this._primitive_boxs)
    }
  }

  initBaseAngCompareLayer() {
    if (!this._map) {
      console.log("没有map")
      return
    }
    if (this.options.baseModel || this.options.baseModel?.id || this.options.baseModel?.value) {
      const baseValue = this.options.baseModel?.id ?? this.options.baseModel?.value ?? this.options.baseModel
      const baseName = this.options.baseModel?.id ? "id" : (this.options.baseModel?.type ?? "id")
      this.baseLayer = this._map.getLayerByAttr(baseValue, baseName)
      this.laseBaseLayerShow = this.baseLayer.show
    } else {
      console.log("基础模型未配置")
    }

    if (this.options.compareModel || this.options.compareModel?.id || this.options.compareModel?.value) {
      const compareValue = this.options.compareModel?.id ?? this.options.compareModel?.value ?? this.options.compareModel
      const compareName = this.options.compareModel?.id ? "id" : (this.options.compareModel?.type ?? "id")
      this.compareLayer = this._map.getLayerByAttr(compareValue, compareName)
      this.laseCompareLayerShow = this.compareLayer.show
    } else {
      console.log("比较模型未配置")
    }
  }

  showHiddenBCLayer(isShowBase, isShowCompare) {
    //  基础模型
    if (this.baseLayer) {
      if (isShowBase && !this.baseLayer.isAdded) {
        this._map.addLayer(this.baseLayer)
      }
      this.baseLayer.show = isShowBase
    } else {
      console.log("没有获取到基准模型")
    }
    // 比较模型
    if (this.compareLayer) {
      if (isShowCompare && !this.compareLayer.isAdded) {
        this._map.addLayer(this.compareLayer)
      }
      this.compareLayer.show = isShowCompare
    } else {
      console.log("没有获取到比较模型")
    }
  }

  // // 主要代码
  // _toJSON_Ex(json) {
  //   json.measured = {
  //     fillVolume: this._measured.fillVolume,
  //     digVolume: this._measured.digVolume,
  //     geometrysList: this._measured.geometrysList
  //   }
  // }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getCesiumGeometryColor(color) {
  return Cesium.ColorGeometryInstanceAttribute.fromColor(mars3d.Util.getCesiumColor(color))
}

function getInPolyPoint(position, positions) {
  const isIn = mars3d.PolyUtil.isInPoly(position, positions)
  return isIn
}


// 注册下
mars3d.GraphicUtil.register("volume2Model", Volume2ModelMeasure)
// export VolumeDepthModel
