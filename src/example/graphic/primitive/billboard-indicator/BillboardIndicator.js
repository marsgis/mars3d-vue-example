const DEF_STYLE = {
  rectX: 100,
  rectY: -50,
  rectColor: "rgb(16 238 220)",

  pointColor: "#0000ff",
  pointSize: 10,
  pointOutline: true,
  pointOutlineWidth: 2,
  pointOutlineColor: "#ffffff",

  textFont: "20px 楷体",
  textColor: "#ffffff",
  textAlign: "center",
  textBaseline: "middle",

  autoPoistion: true
}
/**
 * 可拖拽的图标点,矩形宽度随文本
 * @param {object} options 参数对象，包括以下：
 * @param {LngLatPoint|Cesium.Cartesian3|number[]} options.position 坐标位置
 * @param {BillboardPrimitive.StyleOptions} options.style 样式信息
 *
 * @param {number} [rectX=-100,rectY=-50]  可拖拽矩形的原点，离静态点的距离，即线的长短
 * @param {string} [rectColor]  矩形颜色
 *
 * @param {string} [pointColor] 圆点颜色
 * @param {number} [pointSize] 圆点大小
 * @param {boolean} [pointOutline] 是否加载圆点边框
 * @param {number} [pointOutlineWidth] 圆点边框宽度
 * @param {string} [pointOutlineColor] 圆点边框yanse
 *
 * @param {string} [textFont] 文本
 * @param {string} [textColor] 文本颜色
 * @param {string} [textAlign] 文本对齐方式
 * @param {string} [textBaseline] 文本基线
 *
 * @param {boolean} [autoPoistion] 是否自动判断连接最近的角
 *
 * @class BillboardIndicator
 * @extends {mars3d.graphic.BillboardPrimitive}
 */
class BillboardIndicator extends mars3d.graphic.BillboardPrimitive {
  constructor(options = {}) {
    options.style = {
      ...DEF_STYLE,
      ...(options.style || {})
    }
    super(options)
  }

  _addedHook(style) {
    super._addedHook(style)
    this._updateImage(null, true)

    this.on(mars3d.EventType.click, this._clickHandler, this)
  }

  _removedHook() {
    super._removedHook()

    this.off(mars3d.EventType.click, this._clickHandler, this)

    this._removeDragCanvas()
  }

  /**
   * 设置 样式信息 的钩子方法
   *
   * @param {object} style 完整样式信息
   * @param {object} newStyle 变动部分的样式信息
   * @return {void}  无
   * @private
   */
  _updateStyleHook(style, newStyle) {
    delete style.image
    super._updateStyleHook(style, newStyle)

    if (newStyle) {
      this._updateImage()
    }
  }

  // 更新图标
  _updateImage(callback, isInit = false) {
    let canvas = document.createElement("canvas")

    const ctx = canvas.getContext("2d")

    if (isInit) {
      // 计算文本宽高，10为 padding 值
      ctx.font = this.style.textFont
      const textMetrics = ctx.measureText(this.style.text)

      this.style.rectWidth = textMetrics.width + 10
      this.style.rectHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent + 10
    }

    canvas.width = (this.style.rectWidth + Math.abs(this.style.rectX) + 5) * 2
    canvas.height = (this.style.rectHeight + Math.abs(this.style.rectY) + 5) * 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 保存绘图上下文
    ctx.save()

    // 改变绘制原点
    ctx.translate(canvas.width / 2, canvas.height / 2)

    this._drawingCanvas(ctx)

    this.image = canvas.toDataURL("image/png")
    callback && callback()

    canvas = null
  }

  // 绘制canvas图形
  _drawingCanvas(ctx, x = 0, y = 0) {
    // 圆点(不动的)
    ctx.beginPath()
    ctx.arc(0, 0, this.style.pointSize, 0, 2 * Math.PI)
    ctx.fillStyle = this.style.pointColor
    ctx.fill()
    if (this.style.pointOutline) {
      ctx.strokeStyle = this.style.pointColor
      ctx.lineWidth = this.style.pointOutlineWidth ?? 2
      ctx.stroke()
    }

    // 绘制虚线
    ctx.beginPath()
    ctx.lineWidth = this.style.lineWidth ?? 2
    ctx.strokeStyle = this.style.lineColor ?? "yellow"
    if (this.style.lineDash) {
      ctx.setLineDash(this.style.lineDash.split(","))
    }
    ctx.moveTo(0, 0) // 起点不变，实心圆圈位置

    const rectOrigin = [this.style.rectX + x, this.style.rectY + y]
    const lineToPosition = [0, 0]

    // 自动判断连线位置
    if (this.style.autoPoistion) {
      if (rectOrigin[0] < 0 && Math.abs(rectOrigin[0]) > this.style.rectWidth / 2) {
        lineToPosition[0] = lineToPosition[0] + this.style.rectWidth
      }
      if (rectOrigin[1] > 0 && rectOrigin[1] > this.style.rectHeight / 2) {
        lineToPosition[1] = lineToPosition[1] + -this.style.rectHeight
      }
    }

    // 改变绘制原点 - 更方便拖拽矩形绘制位置
    ctx.translate(...rectOrigin)

    // 止点改变 - 拖拽矩形一个角
    ctx.lineTo(...lineToPosition)
    ctx.stroke()

    // 可拖拽的矩形 - 纯色
    ctx.fillStyle = this.style.rectColor
    ctx.fillRect(0, 0, this.style.rectWidth, -this.style.rectHeight)
    ctx.stroke()

    // 绘制文本，随拖拽矩形改变而改变
    ctx.font = this.style.textFont
    ctx.textAlign = this.style.textAlign
    ctx.textBaseline = this.style.textBaseline
    ctx.fillStyle = this.style.textColor
    ctx.fillText(this.style.text, this.style.rectWidth / 2, -this.style.rectHeight / 2)
    ctx.stroke()

    // 绘制完成后恢复上下文
    ctx.restore()

    return { x: this.style.rectX + x, y: this.style.rectY + y }
  }

  // 以下是拖拽编辑部分代码
  _clickHandler(e) {
    this.show = false

    // 笛卡尔空间直角坐标 转换为 屏幕坐标
    this._graphicWindowPosition = mars3d.Cesium.SceneTransforms.worldToWindowCoordinates(
      this._map.scene,
      mars3d.LngLatPoint.toCartesian(e.graphic.coordinate)
    )

    const dragCanvas = document.createElement("canvas")
    document.body.appendChild(dragCanvas)

    dragCanvas.id = this.id
    dragCanvas.width = document.body.scrollWidth - 5
    dragCanvas.height = document.body.scrollHeight - 5
    // dragCanvas.style.border = "2px solid red"
    dragCanvas.style.position = "absolute"
    dragCanvas.style.top = 0

    const ctx = dragCanvas.getContext("2d")

    // 修改一些参数，比如改变原点，缩放大小
    this._changeDragCanvas(ctx)

    this._drawingCanvas(ctx)

    addEvent(dragCanvas, "mousedown", this._canvasMouseDown.bind(this))
  }

  // 事件
  _canvasMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()

    const canvas = document.body.querySelector("#" + this.id)
    if (!canvas) {
      return
    }

    const dragRect = this._getDragRectPosition()

    if (event.offsetX > dragRect[0] && event.offsetX < dragRect[2] && event.offsetY > dragRect[1] && event.offsetY < dragRect[3]) {
      addEvent(canvas, "mousemove", handleMove)
    }
    addEvent(canvas, "mouseup", handleUp)

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    let rectOri
    function handleMove(el) {
      el.preventDefault()
      el.stopPropagation()

      const offsetX = el.clientX - event.clientX
      const offsetY = el.clientY - event.clientY

      const ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 修改一些参数，比如改变原点，缩放大小
      that._changeDragCanvas(ctx)

      rectOri = that._drawingCanvas(ctx, offsetX, offsetY)
    }

    function handleUp() {
      event.preventDefault()
      event.stopPropagation()

      removeEvent(canvas, "mousemove", handleMove)
      removeEvent(canvas, "mouseup", handleUp)

      if (rectOri) {
        // 将最后移动的原点记录下来，以便下次移动
        that.style.rectX = rectOri?.x
        that.style.rectY = rectOri?.y
      }

      that._updateImage(() => {
        document.body.removeChild(canvas)
        that.show = true
      })
    }
  }

  /**
   * 获取拖拽矩形的顶点坐标，判断按下的鼠标位置是否位于矩形内
   */
  _getDragRectPosition() {
    let rectPointX = this._graphicWindowPosition.x + this.style.rectX
    let rectPointY = this._graphicWindowPosition.y + this.style.rectY

    let dragRectWidth = this.style.rectWidth
    let dragRectHeight = this.style.rectHeight

    if (this.style.scale && this.style.scale !== 1) {
      rectPointX = this._graphicWindowPosition.x + this.style.rectX * Number(this.style.scale)
      rectPointY = this._graphicWindowPosition.y + this.style.rectY * Number(this.style.scale)

      dragRectWidth = this.style.rectWidth * Number(this.style.scale)
      dragRectHeight = this.style.rectHeight * Number(this.style.scale)
    }

    return [rectPointX, rectPointY - dragRectHeight, rectPointX + dragRectWidth, rectPointY]
  }

  // 修改一些参数，比如改变原点，缩放大小
  _changeDragCanvas(ctx) {
    // 保存绘图上下文
    ctx.save()

    // 改变绘制原点
    ctx.translate(this._graphicWindowPosition.x, this._graphicWindowPosition.y)

    if (this.style.scale && this.style.scale !== 1) {
      ctx.scale(this.style.scale, this.style.scale)
    }

    if (this.style.rotationDegree && this.style.rotationDegree !== 0) {
      ctx.rotate(-(this.style.rotationDegree * Math.PI) / 180)
    }
  }

  _removeDragCanvas() {
    const canvas = document.body.querySelector("#" + this.id)
    if (canvas) {
      removeEvent(canvas, "mousedown", this._canvasMouseDown.bind(this))

      document.body.removeChild(canvas)
    }
  }
}

// 注册下
mars3d.GraphicUtil.register("billboardIndicator", BillboardIndicator, true)

// 兼容不同浏览器，绑定事件
function addEvent(el, event, handler) {
  if (!el) {
    return
  }
  if (el.attachEvent) {
    el.attachEvent(`on${event}`, handler)
  } else if (el.addEventListener) {
    el.addEventListener(event, handler)
  } else {
    el[`on${event}`] = handler
  }
}

// 兼容不同浏览器，移除事件
function removeEvent(el, event, handler) {
  if (!el) {
    return
  }
  if (el.detachEvent) {
    el.detachEvent(`on${event}`, handler)
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler)
  } else {
    el[`on${event}`] = null
  }
}
