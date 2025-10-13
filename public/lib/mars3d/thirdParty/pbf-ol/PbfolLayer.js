/* MVT加载类 作者： 木遥（微信:  http://marsgis.cn/weixin.html ） */

// import * as mars3d from "mars3d"

; (function (window) {
  function MvtImageryProvider (options = {}) {
    this.options = options

    this._tileWidth = (options.tileWidth ?? 512)
    this._tileHeight = (options.tileHeight ?? 512)
    this._minimumLevel = (options.minimumLevel ?? 0)
    this._maximumLevel = (options.maximumLevel ?? 18)

    if (options.rectangle && options.rectangle.xmin && options.rectangle.xmax && options.rectangle.ymin && options.rectangle.ymax) {
      var xmin = options.rectangle.xmin
      var xmax = options.rectangle.xmax
      var ymin = options.rectangle.ymin
      var ymax = options.rectangle.ymax
      options.rectangle = Cesium.Rectangle.fromDegrees(xmin, ymin, xmax, ymax)
    }
    this._tilingScheme = (options.tilingScheme ?? new Cesium.WebMercatorTilingScheme({ ellipsoid: options.ellipsoid }))
    this._rectangle = (options.rectangle ?? this._tilingScheme.rectangle)
    this._rectangle = Cesium.Rectangle.intersection(this._rectangle, this._tilingScheme.rectangle)
    this._hasAlphaChannel = (options.hasAlphaChannel ?? true)

    this._errorEvent = new Cesium.Event()
    this._readyPromise = Cesium.defer()
    this._credit = undefined
    this._ready = true

    //mvt相关的处理
    if (!window.ol) {
      throw new DeveloperError("请引入Openlayers类库！")
    }
    this._ol = window.ol
    this._mvtParser = new this._ol.format.MVT()

    this._key = (options.key ?? "")
    this._url = (options.url ?? "")

    if (options.styleConfig) {
      //(glStyle, sources, resolutions = defaultResolutions, spriteData, spriteImageUrl, getFonts)
      this._styleClass = window.olms.stylefunction(options.styleConfig, options.styleConfig.sources, "", null, null)
      // this._url = options.styleConfig.tiles[0]
    } else if (options.style) {
      switch (options.style) {
        case "mapbox-streets-v6":
          this._styleClass = new mars3d.MapboxStreetsV6()
          break
        default:
          this._styleClass = options.style
          break
      }
    }

    var sw = this._tilingScheme._rectangleSouthwestInMeters
    var ne = this._tilingScheme._rectangleNortheastInMeters
    var mapExtent = [sw.x, sw.y, ne.x, ne.y]
    this._resolutions = ol.tilegrid.resolutionsFromExtent(mapExtent, this._maximumLevel, this._tileWidth)

    this._pixelRatio = 1
    this._transform = [0.125, 0, 0, 0.125, 0, 0]
    this._replays = ["Default", "Image", "Polygon", "LineString", "Text"]

    this._tileQueue = new Cesium.TileReplacementQueue()
    this._cacheSize = 1000
  }

  Object.defineProperties(MvtImageryProvider.prototype, {
    proxy: {
      get: function () {
        return undefined
      }
    },

    tileWidth: {
      get: function () {
        return this._tileWidth
      }
    },

    tileHeight: {
      get: function () {
        return this._tileHeight
      }
    },

    maximumLevel: {
      get: function () {
        return undefined
      }
    },

    minimumLevel: {
      get: function () {
        return undefined
      }
    },

    tilingScheme: {
      get: function () {
        return this._tilingScheme
      }
    },

    rectangle: {
      get: function () {
        return this._tilingScheme.rectangle
      }
    },

    tileDiscardPolicy: {
      get: function () {
        return undefined
      }
    },

    errorEvent: {
      get: function () {
        return this._errorEvent
      }
    },

    ready: {
      get: function () {
        return true
      }
    },

    readyPromise: {
      get: function () {
        return this._readyPromise.promise
      }
    },

    credit: {
      get: function () {
        return undefined
      }
    },

    hasAlphaChannel: {
      get: function () {
        return true
      }
    }
  })

  MvtImageryProvider.prototype.getTileCredits = function (x, y, level) {
    return undefined
  }

  MvtImageryProvider.prototype.pickFeatures = function (x, y, level, longitude, latitude) {
    return undefined
  }

  MvtImageryProvider.prototype.requestImage = function (x, y, level, request) {
    var cacheTile = findTileInQueue(x, y, level, this._tileQueue)
    if (cacheTile != undefined) {
      return new Promise((resolve, reject) => {
        resolve(cacheTile)
      })
    } else {
      var that = this
      var url = this._url

      var reverseY = this._tilingScheme.getNumberOfYTilesAtLevel(level) - y - 1
      url = url.replace("{x}", x).replace("{y}", y).replace("{reverseY}", reverseY).replace("{z}", level).replace("{k}", this._key)

      var resource = Cesium.Resource.createIfNeeded(url)
      return resource.fetchArrayBuffer().then(function (arrayBuffer) {
        var canvas = document.createElement("canvas")
        canvas.width = that._tileWidth
        canvas.height = that._tileHeight
        var vectorContext = canvas.getContext("2d")

        var features = that._mvtParser.readFeatures(arrayBuffer)

        var styleFun = that._styleClass.getStyle()

        var extent = [0, 0, 4096, 4096]
        var _replayGroup = new ol.render.canvas.ReplayGroup(0, extent, 8, true, 100)

        for (var i = 0; i < features.length; i++) {
          var feature = features[i]
          var styles = styleFun(features[i], that._resolutions[level])
          for (var j = 0; j < styles.length; j++) {
            ol.renderer.vector.renderFeature_(_replayGroup, feature, styles[j], 16)
          }
        }
        _replayGroup.finish()

        _replayGroup.replay(vectorContext, that._pixelRatio, that._transform, 0, {}, that._replays, true)
        if (that._tileQueue.count > that._cacheSize) {
          trimTiles(that._tileQueue, that._cacheSize / 2)
        }

        canvas.xMvt = x
        canvas.yMvt = y
        canvas.zMvt = level
        that._tileQueue.markTileRendered(canvas)

        _replayGroup = null

        return canvas
      })
    }
  }

  function findTileInQueue (x, y, level, tileQueue) {
    var item = tileQueue.head
    while (item != undefined && !(item.xMvt == x && item.yMvt == y && item.zMvt == level)) {
      item = item.replacementNext
    }
    return item
  }

  function removeQueue (tileReplacementQueue, item) {
    var previous = item.replacementPrevious
    var next = item.replacementNext

    if (item === tileReplacementQueue._lastBeforeStartOfFrame) {
      tileReplacementQueue._lastBeforeStartOfFrame = next
    }

    if (item === tileReplacementQueue.head) {
      tileReplacementQueue.head = next
    } else {
      previous.replacementNext = next
    }

    if (item === tileReplacementQueue.tail) {
      tileReplacementQueue.tail = previous
    } else {
      next.replacementPrevious = previous
    }

    item.replacementPrevious = undefined
    item.replacementNext = undefined

    --tileReplacementQueue.count
  }

  function trimTiles (tileQueue, maximumTiles) {
    var tileToTrim = tileQueue.tail
    while (tileQueue.count > maximumTiles && Cesium.defined(tileToTrim)) {
      var previous = tileToTrim.replacementPrevious

      removeQueue(tileQueue, tileToTrim)
      tileToTrim = null

      tileToTrim = previous
    }
  }

  class PbfolLayer extends mars3d.layer.BaseTileLayer {
    _addedHook () {
      let styleUrl = this.options.style
      if (mars3d.Util.isString(styleUrl) && styleUrl.endsWith(".json")) {
        this.getPbfStyle(styleUrl).then((data) => {
          if (this.isAdded) {
            super._addedHook()
          }
        })
      } else {
        super._addedHook()
      }
    }
    //构建ImageryProvider
    async _createImageryProvider (options) {
      return createImageryProvider(options)
    }

    //取样式数据
    getPbfStyle (styleUrl) {
      return mars3d.Util.fetchJson({
        url: styleUrl,
        queryParameters: {
          access_token: this.options.key || "mars3d"
        }
      })
        .then((json) => {
          this.options.styleConfig = json
        })
        .catch(function (error) {
          console.log("加载样式出错", error)
        })
    }
  }

  async function createImageryProvider (options) {
    return new MvtImageryProvider(options)
  }
  PbfolLayer.createImageryProvider = createImageryProvider

  //注册下
  const layerType = "mvt" //图层类型
  mars3d.LayerUtil.register(layerType, PbfolLayer)
  mars3d.LayerUtil.registerImageryProvider(layerType, createImageryProvider)

  //对外接口
  window.MvtImageryProvider = MvtImageryProvider
  window.PbfolLayer = PbfolLayer
})(window)

// export { PbfolLayer }
