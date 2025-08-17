// import * as mars3d from "mars3d"
// import Supercluster from "supercluster"

class PointSupercluster extends mars3d.PointCluster {
  constructor(graphicLayer, options) {
    super(graphicLayer, options)

    // eslint-disable-next-line no-undef
    this._supercluster = new Supercluster({ radius: 40, maxZoom: 17, ...options })
    this._clusterZoomObj = {}
  }

  _clearCache() {
    this._clusterZoomObj = {}
  }

  // 聚合计算核心方法
  _cluster() {
    if (!this.enabled || !this._graphicLayer.show || this.mouse_down) {
      return
    }

    // 获取需要计算的矢量对象列表
    const graphics = this._getCalculateGraphics()
    if (!graphics || graphics.length === 0) {
      this.removeAll()
      return
    }

    const thisZoom = this._map.zoom
    if (thisZoom === this._lastZoom) {
      return
    }
    this._lastZoom = thisZoom

    let newClusters
    let noClusterIds
    if (this._clusterZoomObj[thisZoom]) {
      const result = this._clusterZoomObj[thisZoom] // 使用缓存
      newClusters = result.newClusters
      noClusterIds = result.noClusterIds
    } else {
      newClusters = []
      noClusterIds = {}

      const arrPoint = []
      for (let i = 0, len = graphics.length; i < len; i++) {
        const graphic = graphics[i]
        arrPoint.push(graphic._cluster_coord)
      }
      this._supercluster.load(arrPoint)

      const result = this._supercluster.getClusters([-180, -90, 180, 90], thisZoom)
      for (let i = 0, len = result.length; i < len; i++) {
        const item = result[i]
        const attr = item.properties
        if (attr.cluster) {
          newClusters.push({
            id: attr.cluster_id,
            count: attr.point_count,
            position: mars3d.LngLatPoint.toCartesian(item.geometry.coordinates)
            // getGraphics: () => {
            //   return this._supercluster.getChildren(attr.cluster_id)
            // }
          })
        } else {
          noClusterIds[attr] = false
        }
      }
      this._clusterZoomObj[thisZoom] = {
        newClusters: newClusters,
        noClusterIds: noClusterIds
      }
    }

    // 正式赋值
    for (let i = 0, len = graphics.length; i < len; i++) {
      const graphic = graphics[i]
      graphic.isCluster = noClusterIds[graphic.id] ?? true
    }

    this._refreshClusterEnd(newClusters)
  }

  _getCalculateGraphics() {
    const graphics = this._graphicLayer.getGraphics()
    if (graphics.length === 0) {
      return
    }

    const graphicsNew = []
    for (let i = 0, length = graphics.length; i < length; ++i) {
      const graphic = graphics[i]

      if (
        !graphic.isAdded ||
        graphic.isEditing ||
        (this._includePoly === false && !graphic.isPoint) || // 不聚合线面时
        !graphic.hasCluster || // 合并渲染对象
        (this.options.includeType && this.options.includeType.indexOf(graphic.type) === -1) // 指定了类型时
      ) {
        continue // 排查不聚合的
      }

      const position = graphic.positionShow ?? graphic.position ?? graphic.center
      if (!position || !graphic.show) {
        continue
      }

      // 记录下，后面计算直接用
      graphic._cluster_coord = turf.point(graphic.coord, graphic.id)

      graphicsNew.push(graphic)
    }

    return graphicsNew
  }
}

// 覆盖SDK内的聚合构造方法
mars3d.layer.GraphicLayer.prototype._initializeCluster = function () {
  if (!this._map) {
    return
  }
  if (this._pointCollision) {
    this._pointCollision.enabled = false
  }

  const opts = this.options.cluster
  if (this._pointCluster) {
    this._pointCluster.setOptions(opts)
  } else {
    this._pointCluster = new PointSupercluster(this, opts)
  }
}
mars3d.layer.GraphicLayer.prototype.refreshCluster = function () {
  this._pointCluster._clearCache()
  this._refreshCollisionCluster()
}
