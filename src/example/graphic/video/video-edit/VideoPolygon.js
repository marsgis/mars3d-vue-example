const splitCharacter = "#@#"

class VideoPolygon {
  /**
   * 可编辑多边形视频
   * @param {Object} options 具有以下属性的对象:
   * @param {String} options.url 视频的地址.
   * @param {Array.<Cartesian3>} options.positions 视频投放的四个顶点.
   * @param {Number} [options.grids = 4] 编辑格网分段数.
   */
  constructor(map, options = {}) {
    this._map = map
    this._grids = Cesium.defaultValue(options.grids, 4)
    this._positions_grid = []
    this._uv = []
    this._indice = []
    this._roiUV = []
    this.useROI = false
    this.reverseROI = false
    this._isMouseDown = false
    this._id = Cesium.createGuid()
    this._videoElement = createElement(map.container, options.url)

    const { positions, uv, indice } = insertPosAnduv(options.positions, this._grids)

    this._positions_grid = positions
    this._uv = uv
    this._indice = indice

    this.primitiveCollection = this._map.scene.primitives.add(new Cesium.PrimitiveCollection())
    this._editPointLayer = this.primitiveCollection.add(new Cesium.PointPrimitiveCollection())

    const pointEdit = new mars3d.thing.MatrixMove2()
    map.addThing(pointEdit)

    pointEdit.on(mars3d.EventType.change, (event) => {
      if (this._pointEditPoint) {
        this._pointEditPoint.position = event.position
        const index = Number(this._pointEditPoint.name.split(splitCharacter)[0])
        this._positions_grid[index] = event.position
        this.update()
      }
    })
    this._pointEdit = pointEdit

    this.update()
  }

  _createVideoPrimitive() {
    const numPositions = this._positions_grid.length
    // 点存储空间
    const pos = new Float64Array(numPositions * 3)
    for (let i = 0; i < numPositions; ++i) {
      pos[i * 3] = this._positions_grid[i].x
      pos[i * 3 + 1] = this._positions_grid[i].y
      pos[i * 3 + 2] = this._positions_grid[i].z
    }
    // 创建geometry
    const geometry = new Cesium.Geometry({
      attributes: {
        position: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          values: pos
        }),
        st: new Cesium.GeometryAttribute({
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          values: new Float32Array(this._uv)
        })
      },
      indices: new Uint16Array(this._indice),
      primitiveType: Cesium.PrimitiveType.TRIANGLES,
      boundingSphere: Cesium.BoundingSphere.fromVertices(pos)
    })
    // 绘制三角带
    const myInstance = new Cesium.GeometryInstance({
      geometry
    })

    const material = Cesium.Material.fromType("Image")
    material.uniforms.image = this._videoElement
    const bufferView = new Float32Array(this._roiUV)
    const width = bufferView.length / 4
    material.uniforms.roiUV = new Cesium.Texture({
      context: this._map.scene.context,
      source: {
        width,
        height: 1,
        arrayBufferView: bufferView
      },
      pixelDatatype: Cesium.PixelDatatype.FLOAT
    })
    material._uniforms.roiUV0 = () => {
      return material.uniforms.roiUV
    }
    material._uniforms.useROI = () => {
      return this.useROI
    }
    material._uniforms.reverseROI = () => {
      return this.reverseROI
    }
    material.shaderSource = `
      const int WIDTH = ${width};
      uniform sampler2D image_0;
      uniform sampler2D roiUV0;
      uniform bool useROI;
      uniform bool reverseROI;

      // 获取指定的由UV坐标定义的poi边界点
      vec2 getROIuv(sampler2D roi, int index){
        vec2 poiuv = texture(roi, vec2((float(index) + 0.5) / float(WIDTH), 0)).xy;
        return poiuv;
      }

      // 判断UV坐标在不在范围内
      bool isInside(vec2 uv, sampler2D roi){
          bool ifInside = false;
          float u = uv.x;
          float v = uv.y;
          vec2 sP = getROIuv(roi, 0);
          for (int i = 0; i < 100000; i++){
              if(i >= WIDTH) break;
              int nextIndex = i + 1;
              nextIndex = nextIndex == WIDTH ? 0 : nextIndex;
              vec2 eP = getROIuv(roi, nextIndex);
              if((sP.x == u && sP.y == v) || (eP.x == u && eP.y == v)){
                  return true;
              } else if((sP.y < v && eP.y >= v) || (sP.y >= v && eP.y < v)) {
                  float x = sP.x + (v - sP.y) * (eP.x - sP.x) / (eP.y - sP.y);
                  if(x == u){
                    return true;
                  } else if(x > u) {
                    ifInside = !ifInside;
                  }
              }
            sP = eP;
          }
          return ifInside;
      }

      czm_material getMaterial(czm_materialInput materialInput){
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 uv = materialInput.st;
        vec4 imageColor = texture(image_0, uv);
        material.diffuse = imageColor.rgb;
        material.alpha = imageColor.a;
        return material;
      }

      czm_material czm_getMaterial(czm_materialInput materialInput) {
        if(useROI){
          vec2 uv = materialInput.st;
          bool inside = isInside(uv, roiUV0);
          if(inside != reverseROI) {
            return getMaterial(materialInput);
          } else {
            discard;
          }
        } else {
          return getMaterial(materialInput);
        }
      }
      `
    return new Cesium.Primitive({
      geometryInstances: myInstance,
      asynchronous: false,
      appearance: new Cesium.MaterialAppearance({
        material
      })
    })
  }

  update() {
    this.primitiveCollection.remove(this.videoPrimitive)
    this.videoPrimitive = this._createVideoPrimitive()
    this.primitiveCollection.add(this.videoPrimitive)
  }

  /**
   * 是否开启格网编辑
   *
   * @param {Boolean} use 是否开启格网编辑
   */
  useGridEditing(use) {
    if (this._editing) {
      this._editing.save()
      this._editing.destroy()
      this._editing = undefined
    }
    if (use) {
      this._addRangeEditHandler()
    } else {
      this._removeRangeEditHandler()
    }
  }

  /**
   * 更新裁切范围（用UV坐标定义）
   * @param rois uv坐标范围
   */
  updateROI(rois) {
    let pointsArray = []
    // UV定义兴趣区
    rois.forEach((roi) => {
      pointsArray = pointsArray.concat([roi[0], roi[1], 0, 0])
    })
    this._roiUV = pointsArray
    this.update()
  }

  // 添加鼠标事件
  _addRangeEditHandler() {
    if (!this._rangeEditHandler) {
      this._rangeEditHandler = new Cesium.ScreenSpaceEventHandler(this._map.canvas)
      this._rangeEditLeftclick()
      this._rangeEditLeftdown()
      this._rangeEditLeftup()
      this._rangeEditMousemove()
      this._rangeEditRightclick()

      drawEditPositions(this._positions_grid, this._editPointLayer, this._id)
    }
  }

  // 移除鼠标事件
  _removeRangeEditHandler() {
    this._editPointLayer.removeAll()
    if (this._rangeEditHandler) {
      this._rangeEditHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN)
      this._rangeEditHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP)
      this._rangeEditHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      this._rangeEditHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
      this._rangeEditHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      this._rangeEditHandler = undefined
      this._editPoint = undefined
      this._pointEditPoint = undefined
      this._isMouseDown = false
      this._pointEdit.enabled = false
    }
  }

  // 鼠标左键事件按下事件
  _rangeEditLeftdown() {
    if (this._rangeEditHandler) {
      this._rangeEditHandler.setInputAction((movement) => {
        const pick = this._map.scene.pick(movement.position)
        if (pick && pick.id === "VIDEO_EDIT") {
          const infors = pick.primitive.name.split(splitCharacter)
          if (infors[1] === this._id) {
            this._editPoint = pick.primitive
            this._map.scene.screenSpaceCameraController.enableRotate = false // 锁定相机
            this._map.container.style.cursor = "move"
            this._isMouseDown = true
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
    }
  }

  // 鼠标事件左键抬起事件
  _rangeEditLeftup() {
    if (this._rangeEditHandler) {
      this._rangeEditHandler.setInputAction(() => {
        this._map.scene.screenSpaceCameraController.enableRotate = true
        this._map.container.style.cursor = "auto"
        this._isMouseDown = false
        if (this._editPoint) {
          this._editPoint.show = true
          this._editPoint = undefined
        }
      }, Cesium.ScreenSpaceEventType.LEFT_UP)
    }
  }

  // 鼠标事件 -- 移动
  _rangeEditMousemove() {
    if (this._rangeEditHandler) {
      this._rangeEditHandler.setInputAction((movement) => {
        if (this._isMouseDown && this._editPoint) {
          this._map.container.style.cursor = "move"
          this._editPoint.show = false
          const cartesian = cartesian2To3(this._map, movement.endPosition)
          if (cartesian) {
            this._editPoint.position = cartesian
            const infors = this._editPoint.name.split(splitCharacter)
            const index = Number(infors[0])
            this._positions_grid[index] = cartesian
            this.update()
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    }
  }

  // 鼠标事件 -- 右键点击
  _rangeEditRightclick() {
    if (this._rangeEditHandler) {
      this._rangeEditHandler.setInputAction(() => {
        this._pointEditPoint = undefined
        this._pointEdit.enabled = false
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    }
  }

  // 鼠标左键点击事件
  _rangeEditLeftclick() {
    if (this._rangeEditHandler) {
      this._rangeEditHandler.setInputAction((movement) => {
        const pick = this._map.scene.pick(movement.position)
        if (pick && pick.id === "VIDEO_EDIT") {
          const infors = pick.primitive.name.split(splitCharacter)
          if (infors[1] === this._id) {
            this._pointEdit.position = pick.primitive.position
            this._pointEdit.enabled = true
            this._pointEditPoint = pick.primitive
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }
  }
}

function cartesian2To3(map, cartesian2) {
  const scene = map.scene
  let cartesian = scene.pickPosition(cartesian2)

  if (cartesian) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
    if (cartographic.height < 0 && scene.globe) {
      const ray = map.camera.getPickRay(cartesian2)
      cartesian = scene.globe.pick(ray, scene)
    }
  } else {
    const ray = map.camera.getPickRay(cartesian2)
    cartesian = scene.globe.pick(ray, scene)
    if (!cartesian) {
      cartesian = map.camera.pickEllipsoid(cartesian2, scene.globe.ellipsoid)
    }
  }
  return cartesian
}

// 绘制编辑点
function drawEditPositions(editPositions, pointLayer, id) {
  pointLayer.removeAll()
  for (let i = 0; i < editPositions.length; i++) {
    const editPoint = pointLayer.add({
      id: "VIDEO_EDIT",
      position: editPositions[i],
      color: Cesium.Color.RED,
      pixelSize: 10,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 1,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    })
    editPoint.name = i + splitCharacter + id
  }
}

// 插值_positions、_indice、_uv
function insertPosAnduv(originPositions, grids) {
  const uv = []
  const positions = []
  const indice = []
  const A = originPositions[0]
  const B = originPositions[1]
  const C = originPositions[2]
  const D = originPositions[3]
  const adLength = Cesium.Cartesian3.distance(A, D)
  const bcLength = Cesium.Cartesian3.distance(B, C)
  const abStep = adLength / grids
  const bcStep = bcLength / grids
  const vAD = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(D, A, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const vBC = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(C, B, new Cesium.Cartesian3()), new Cesium.Cartesian3())
  const uvStep = 1 / grids
  for (let j = 0; j <= grids; j++) {
    for (let i = 0; i <= grids; i++) {
      const p1 = Cesium.Cartesian3.add(Cesium.Cartesian3.multiplyByScalar(vAD, j * abStep, new Cesium.Cartesian3()), A, new Cesium.Cartesian3())
      const p2 = Cesium.Cartesian3.add(Cesium.Cartesian3.multiplyByScalar(vBC, j * bcStep, new Cesium.Cartesian3()), B, new Cesium.Cartesian3())

      const v12 = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(p2, p1, new Cesium.Cartesian3()), new Cesium.Cartesian3())
      const v12Length = Cesium.Cartesian3.distance(p2, p1)
      const v12Step = v12Length / grids

      const point = Cesium.Cartesian3.add(Cesium.Cartesian3.multiplyByScalar(v12, i * v12Step, new Cesium.Cartesian3()), p1, new Cesium.Cartesian3())
      uv.push(i * uvStep)
      uv.push(1 - j * uvStep)
      positions.push(point)
    }
  }
  for (let i = 0; i < grids; i++) {
    for (let j = 0; j < grids; j++) {
      const indice1 = i * (grids + 1) + j
      const indice2 = (i + 1) * (grids + 1) + j
      indice.push(indice1)
      indice.push(indice1 + 1)
      indice.push(indice2 + 1)
      indice.push(indice2 + 1)
      indice.push(indice2)
      indice.push(indice1)
    }
  }

  return { uv, indice, positions }
}

function createElement(container, url) {
  const videoElement = document.createElement("VIDEO")
  videoElement.setAttribute("id", Cesium.createGuid())
  videoElement.setAttribute("autoplay", "true")
  videoElement.setAttribute("loop", "true")
  videoElement.setAttribute("width", "0")
  videoElement.setAttribute("height", "0")
  videoElement.setAttribute("crossorigin", "anonymous")
  videoElement.setAttribute("src", url)
  videoElement.style.position = "absolute"
  videoElement.style.left = "0px"
  videoElement.style.top = "0px"
  videoElement.muted = true
  container.appendChild(videoElement)
  return videoElement
}
