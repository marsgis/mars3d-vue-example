/*!
 * 基于MikesWei的CesiumVectorTile代码整理规范修改，并用webpack打包
 * 版本信息：v2.0.0, hash值: d0acdda6c1d94d453884
 * 编译日期：2022-04-30 17:22:32
 * Github：https://github.com/muyao1987/CesiumVectorTile/
 *
 */
;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object") module.exports = factory(require("mars3d-cesium"), require("@turf/turf"))
  else if (typeof define === "function" && define.amd) define("CesiumVectorTile", ["mars3d-cesium", "@turf/turf"], factory)
  else if (typeof exports === "object") exports["CesiumVectorTile"] = factory(require("mars3d-cesium"), require("@turf/turf"))
  else root["CesiumVectorTile"] = factory(root["Cesium"], root["turf"])
})(window, function (__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__) {
  return /******/ (function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {}
        /******/
      })
      /******/
      /******/ // Execute the module function
      /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
      /******/
      /******/ // Flag the module as loaded
      /******/ module.l = true
      /******/
      /******/ // Return the exports of the module
      /******/ return module.exports
      /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/ __webpack_require__.m = modules
    /******/
    /******/ // expose the module cache
    /******/ __webpack_require__.c = installedModules
    /******/
    /******/ // define getter function for harmony exports
    /******/ __webpack_require__.d = function (exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter })
        /******/
      }
      /******/
    }
    /******/
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = function (exports) {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" })
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true })
      /******/
    }
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/ __webpack_require__.t = function (value, mode) {
      /******/ if (mode & 1) value = __webpack_require__(value)
      /******/ if (mode & 8) return value
      /******/ if (mode & 4 && typeof value === "object" && value && value.__esModule) return value
      /******/ var ns = Object.create(null)
      /******/ __webpack_require__.r(ns)
      /******/ Object.defineProperty(ns, "default", { enumerable: true, value: value })
      /******/ if (mode & 2 && typeof value != "string")
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function (key) {
              return value[key]
            }.bind(null, key)
          )
      /******/ return ns
      /******/
    }
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = function (module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module["default"]
            }
          : /******/ function getModuleExports() {
              return module
            }
      /******/ __webpack_require__.d(getter, "a", getter)
      /******/ return getter
      /******/
    }
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/ __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    }
    /******/
    /******/ // __webpack_public_path__
    /******/ __webpack_require__.p = ""
    /******/
    /******/
    /******/ // Load entry module and return exports
    /******/ return __webpack_require__((__webpack_require__.s = 64))
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */
      /***/ function (module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE__0__

        /***/
      },
      /* 1 */
      /***/ function (module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE__1__

        /***/
      },
      /* 2 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var support = __webpack_require__(4)
        var compressions = __webpack_require__(10)
        var nodeBuffer = __webpack_require__(12)
        /**
         * Convert a string to a "binary string" : a string containing only char codes between 0 and 255.
         * @param {string} str the string to transform.
         * @return {String} the binary string.
         */
        exports.string2binary = function (str) {
          var result = ""
          for (var i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i) & 0xff)
          }
          return result
        }
        exports.arrayBuffer2Blob = function (buffer, mimeType) {
          exports.checkSupport("blob")
          mimeType = mimeType || "application/zip"

          try {
            // Blob constructor
            return new Blob([buffer], {
              type: mimeType
            })
          } catch (e) {
            try {
              // deprecated, browser only, old way
              var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder
              var builder = new Builder()
              builder.append(buffer)
              return builder.getBlob(mimeType)
            } catch (e) {
              // well, fuck ?!
              throw new Error("Bug : can't construct the Blob.")
            }
          }
        }
        /**
         * The identity function.
         * @param {Object} input the input.
         * @return {Object} the same input.
         */
        function identity(input) {
          return input
        }

        /**
         * Fill in an array with a string.
         * @param {String} str the string to use.
         * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
         * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
         */
        function stringToArrayLike(str, array) {
          for (var i = 0; i < str.length; ++i) {
            array[i] = str.charCodeAt(i) & 0xff
          }
          return array
        }

        /**
         * Transform an array-like object to a string.
         * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
         * @return {String} the result.
         */
        function arrayLikeToString(array) {
          // Performances notes :
          // --------------------
          // String.fromCharCode.apply(null, array) is the fastest, see
          // see http://jsperf.com/converting-a-uint8array-to-a-string/2
          // but the stack is limited (and we can get huge arrays !).
          //
          // result += String.fromCharCode(array[i]); generate too many strings !
          //
          // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
          var chunk = 65536
          var result = [],
            len = array.length,
            type = exports.getTypeOf(array),
            k = 0,
            canUseApply = true
          try {
            switch (type) {
              case "uint8array":
                String.fromCharCode.apply(null, new Uint8Array(0))
                break
              case "nodebuffer":
                String.fromCharCode.apply(null, nodeBuffer(0))
                break
            }
          } catch (e) {
            canUseApply = false
          }

          // no apply : slow and painful algorithm
          // default browser on android 4.*
          if (!canUseApply) {
            var resultStr = ""
            for (var i = 0; i < array.length; i++) {
              resultStr += String.fromCharCode(array[i])
            }
            return resultStr
          }
          while (k < len && chunk > 1) {
            try {
              if (type === "array" || type === "nodebuffer") {
                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))))
              } else {
                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))))
              }
              k += chunk
            } catch (e) {
              chunk = Math.floor(chunk / 2)
            }
          }
          return result.join("")
        }

        exports.applyFromCharCode = arrayLikeToString

        /**
         * Copy the data from an array-like to an other array-like.
         * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
         * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
         * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
         */
        function arrayLikeToArrayLike(arrayFrom, arrayTo) {
          for (var i = 0; i < arrayFrom.length; i++) {
            arrayTo[i] = arrayFrom[i]
          }
          return arrayTo
        }

        // a matrix containing functions to transform everything into everything.
        var transform = {}

        // string to ?
        transform["string"] = {
          string: identity,
          array: function (input) {
            return stringToArrayLike(input, new Array(input.length))
          },
          arraybuffer: function (input) {
            return transform["string"]["uint8array"](input).buffer
          },
          uint8array: function (input) {
            return stringToArrayLike(input, new Uint8Array(input.length))
          },
          nodebuffer: function (input) {
            return stringToArrayLike(input, nodeBuffer(input.length))
          }
        }

        // array to ?
        transform["array"] = {
          string: arrayLikeToString,
          array: identity,
          arraybuffer: function (input) {
            return new Uint8Array(input).buffer
          },
          uint8array: function (input) {
            return new Uint8Array(input)
          },
          nodebuffer: function (input) {
            return nodeBuffer(input)
          }
        }

        // arraybuffer to ?
        transform["arraybuffer"] = {
          string: function (input) {
            return arrayLikeToString(new Uint8Array(input))
          },
          array: function (input) {
            return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength))
          },
          arraybuffer: identity,
          uint8array: function (input) {
            return new Uint8Array(input)
          },
          nodebuffer: function (input) {
            return nodeBuffer(new Uint8Array(input))
          }
        }

        // uint8array to ?
        transform["uint8array"] = {
          string: arrayLikeToString,
          array: function (input) {
            return arrayLikeToArrayLike(input, new Array(input.length))
          },
          arraybuffer: function (input) {
            return input.buffer
          },
          uint8array: identity,
          nodebuffer: function (input) {
            return nodeBuffer(input)
          }
        }

        // nodebuffer to ?
        transform["nodebuffer"] = {
          string: arrayLikeToString,
          array: function (input) {
            return arrayLikeToArrayLike(input, new Array(input.length))
          },
          arraybuffer: function (input) {
            return transform["nodebuffer"]["uint8array"](input).buffer
          },
          uint8array: function (input) {
            return arrayLikeToArrayLike(input, new Uint8Array(input.length))
          },
          nodebuffer: identity
        }

        /**
         * Transform an input into any type.
         * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
         * If no output type is specified, the unmodified input will be returned.
         * @param {String} outputType the output type.
         * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
         * @throws {Error} an Error if the browser doesn't support the requested output type.
         */
        exports.transformTo = function (outputType, input) {
          if (!input) {
            // undefined, null, etc
            // an empty string won't harm.
            input = ""
          }
          if (!outputType) {
            return input
          }
          exports.checkSupport(outputType)
          var inputType = exports.getTypeOf(input)
          var result = transform[inputType][outputType](input)
          return result
        }

        /**
         * Return the type of the input.
         * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
         * @param {Object} input the input to identify.
         * @return {String} the (lowercase) type of the input.
         */
        exports.getTypeOf = function (input) {
          if (typeof input === "string") {
            return "string"
          }
          if (Object.prototype.toString.call(input) === "[object Array]") {
            return "array"
          }
          if (support.nodebuffer && nodeBuffer.test(input)) {
            return "nodebuffer"
          }
          if (support.uint8array && input instanceof Uint8Array) {
            return "uint8array"
          }
          if (support.arraybuffer && input instanceof ArrayBuffer) {
            return "arraybuffer"
          }
        }

        /**
         * Throw an exception if the type is not supported.
         * @param {String} type the type to check.
         * @throws {Error} an Error if the browser doesn't support the requested type.
         */
        exports.checkSupport = function (type) {
          var supported = support[type.toLowerCase()]
          if (!supported) {
            throw new Error(type + " is not supported by this browser")
          }
        }
        exports.MAX_VALUE_16BITS = 65535
        exports.MAX_VALUE_32BITS = -1 // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

        /**
         * Prettify a string read as binary.
         * @param {string} str the string to prettify.
         * @return {string} a pretty string.
         */
        exports.pretty = function (str) {
          var res = "",
            code,
            i
          for (i = 0; i < (str || "").length; i++) {
            code = str.charCodeAt(i)
            res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase()
          }
          return res
        }

        /**
         * Find a compression registered in JSZip.
         * @param {string} compressionMethod the method magic to find.
         * @return {Object|null} the JSZip compression object, null if none found.
         */
        exports.findCompression = function (compressionMethod) {
          for (var method in compressions) {
            if (!compressions.hasOwnProperty(method)) {
              continue
            }
            if (compressions[method].magic === compressionMethod) {
              return compressions[method]
            }
          }
          return null
        }
        /**
         * Cross-window, cross-Node-context regular expression detection
         * @param  {Object}  object Anything
         * @return {Boolean}        true if the object is a regular expression,
         * false otherwise
         */
        exports.isRegExp = function (object) {
          return Object.prototype.toString.call(object) === "[object RegExp]"
        }

        /**
         * Merge the objects passed as parameters into a new one.
         * @private
         * @param {...Object} var_args All objects to merge.
         * @return {Object} a new object with the data of the others.
         */
        exports.extend = function () {
          var result = {},
            i,
            attr
          for (i = 0; i < arguments.length; i++) {
            // arguments is not enumerable in some browsers
            for (attr in arguments[i]) {
              if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
                result[attr] = arguments[i][attr]
              }
            }
          }
          return result
        }

        /***/
      },
      /* 3 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined"

        function _has(obj, key) {
          return Object.prototype.hasOwnProperty.call(obj, key)
        }

        exports.assign = function (obj /*from1, from2, from3, ...*/) {
          var sources = Array.prototype.slice.call(arguments, 1)
          while (sources.length) {
            var source = sources.shift()
            if (!source) {
              continue
            }

            if (typeof source !== "object") {
              throw new TypeError(source + "must be non-object")
            }

            for (var p in source) {
              if (_has(source, p)) {
                obj[p] = source[p]
              }
            }
          }

          return obj
        }

        // reduce buffer size, avoiding mem copy
        exports.shrinkBuf = function (buf, size) {
          if (buf.length === size) {
            return buf
          }
          if (buf.subarray) {
            return buf.subarray(0, size)
          }
          buf.length = size
          return buf
        }

        var fnTyped = {
          arraySet: function (dest, src, src_offs, len, dest_offs) {
            if (src.subarray && dest.subarray) {
              dest.set(src.subarray(src_offs, src_offs + len), dest_offs)
              return
            }
            // Fallback to ordinary array
            for (var i = 0; i < len; i++) {
              dest[dest_offs + i] = src[src_offs + i]
            }
          },
          // Join array of chunks to single array.
          flattenChunks: function (chunks) {
            var i, l, len, pos, chunk, result

            // calculate data length
            len = 0
            for (i = 0, l = chunks.length; i < l; i++) {
              len += chunks[i].length
            }

            // join chunks
            result = new Uint8Array(len)
            pos = 0
            for (i = 0, l = chunks.length; i < l; i++) {
              chunk = chunks[i]
              result.set(chunk, pos)
              pos += chunk.length
            }

            return result
          }
        }

        var fnUntyped = {
          arraySet: function (dest, src, src_offs, len, dest_offs) {
            for (var i = 0; i < len; i++) {
              dest[dest_offs + i] = src[src_offs + i]
            }
          },
          // Join array of chunks to single array.
          flattenChunks: function (chunks) {
            return [].concat.apply([], chunks)
          }
        }

        // Enable/Disable typed arrays use, for testing
        //
        exports.setTyped = function (on) {
          if (on) {
            exports.Buf8 = Uint8Array
            exports.Buf16 = Uint16Array
            exports.Buf32 = Int32Array
            exports.assign(exports, fnTyped)
          } else {
            exports.Buf8 = Array
            exports.Buf16 = Array
            exports.Buf32 = Array
            exports.assign(exports, fnUntyped)
          }
        }

        exports.setTyped(TYPED_OK)

        /***/
      },
      /* 4 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"
        /* WEBPACK VAR INJECTION */
        ;(function (Buffer) {
          exports.base64 = true
          exports.array = true
          exports.string = true
          exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined"
          // contains true if JSZip can read/generate nodejs Buffer, false otherwise.
          // Browserify will provide a Buffer implementation for browsers, which is
          // an augmented Uint8Array (i.e., can be used as either Buffer or U8).
          exports.nodebuffer = typeof Buffer !== "undefined"
          // contains true if JSZip can read/generate Uint8Array, false otherwise.
          exports.uint8array = typeof Uint8Array !== "undefined"

          if (typeof ArrayBuffer === "undefined") {
            exports.blob = false
          } else {
            var buffer = new ArrayBuffer(0)
            try {
              exports.blob =
                new Blob([buffer], {
                  type: "application/zip"
                }).size === 0
            } catch (e) {
              try {
                var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder
                var builder = new Builder()
                builder.append(buffer)
                exports.blob = builder.getBlob("application/zip").size === 0
              } catch (e) {
                exports.blob = false
              }
            }
          }

          /* WEBPACK VAR INJECTION */
        }).call(this, __webpack_require__(5).Buffer)

        /***/
      },
      /* 5 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"
        /* WEBPACK VAR INJECTION */
        ;(function (global) {
          /*!
           * The buffer module from node.js, for the browser.
           *
           * @author   Feross Aboukhadijeh <http://feross.org>
           * @license  MIT
           */
          /* eslint-disable no-proto */

          var base64 = __webpack_require__(30)
          var ieee754 = __webpack_require__(31)
          var isArray = __webpack_require__(32)

          exports.Buffer = Buffer
          exports.SlowBuffer = SlowBuffer
          exports.INSPECT_MAX_BYTES = 50

          /**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
          Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport()

          /*
           * Export kMaxLength after typed array support is determined.
           */
          exports.kMaxLength = kMaxLength()

          function typedArraySupport() {
            try {
              var arr = new Uint8Array(1)
              arr.__proto__ = {
                __proto__: Uint8Array.prototype,
                foo: function () {
                  return 42
                }
              }
              return (
                arr.foo() === 42 && // typed array instances can be augmented
                typeof arr.subarray === "function" && // chrome 9-10 lack `subarray`
                arr.subarray(1, 1).byteLength === 0
              ) // ie10 has broken `subarray`
            } catch (e) {
              return false
            }
          }

          function kMaxLength() {
            return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff
          }

          function createBuffer(that, length) {
            if (kMaxLength() < length) {
              throw new RangeError("Invalid typed array length")
            }
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              // Return an augmented `Uint8Array` instance, for best performance
              that = new Uint8Array(length)
              that.__proto__ = Buffer.prototype
            } else {
              // Fallback: Return an object instance of the Buffer class
              if (that === null) {
                that = new Buffer(length)
              }
              that.length = length
            }

            return that
          }

          /**
           * The Buffer constructor returns instances of `Uint8Array` that have their
           * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
           * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
           * and the `Uint8Array` methods. Square bracket notation works as expected -- it
           * returns a single octet.
           *
           * The `Uint8Array` prototype remains unmodified.
           */

          function Buffer(arg, encodingOrOffset, length) {
            if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
              return new Buffer(arg, encodingOrOffset, length)
            }

            // Common case.
            if (typeof arg === "number") {
              if (typeof encodingOrOffset === "string") {
                throw new Error("If encoding is specified then the first argument must be a string")
              }
              return allocUnsafe(this, arg)
            }
            return from(this, arg, encodingOrOffset, length)
          }

          Buffer.poolSize = 8192 // not used by this implementation

          // TODO: Legacy, not needed anymore. Remove in next major version.
          Buffer._augment = function (arr) {
            arr.__proto__ = Buffer.prototype
            return arr
          }

          function from(that, value, encodingOrOffset, length) {
            if (typeof value === "number") {
              throw new TypeError('"value" argument must not be a number')
            }

            if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
              return fromArrayBuffer(that, value, encodingOrOffset, length)
            }

            if (typeof value === "string") {
              return fromString(that, value, encodingOrOffset)
            }

            return fromObject(that, value)
          }

          /**
           * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
           * if value is a number.
           * Buffer.from(str[, encoding])
           * Buffer.from(array)
           * Buffer.from(buffer)
           * Buffer.from(arrayBuffer[, byteOffset[, length]])
           **/
          Buffer.from = function (value, encodingOrOffset, length) {
            return from(null, value, encodingOrOffset, length)
          }

          if (Buffer.TYPED_ARRAY_SUPPORT) {
            Buffer.prototype.__proto__ = Uint8Array.prototype
            Buffer.__proto__ = Uint8Array
            if (typeof Symbol !== "undefined" && Symbol.species && Buffer[Symbol.species] === Buffer) {
              // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
              Object.defineProperty(Buffer, Symbol.species, {
                value: null,
                configurable: true
              })
            }
          }

          function assertSize(size) {
            if (typeof size !== "number") {
              throw new TypeError('"size" argument must be a number')
            } else if (size < 0) {
              throw new RangeError('"size" argument must not be negative')
            }
          }

          function alloc(that, size, fill, encoding) {
            assertSize(size)
            if (size <= 0) {
              return createBuffer(that, size)
            }
            if (fill !== undefined) {
              // Only pay attention to encoding if it's a string. This
              // prevents accidentally sending in a number that would
              // be interpretted as a start offset.
              return typeof encoding === "string" ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill)
            }
            return createBuffer(that, size)
          }

          /**
           * Creates a new filled Buffer instance.
           * alloc(size[, fill[, encoding]])
           **/
          Buffer.alloc = function (size, fill, encoding) {
            return alloc(null, size, fill, encoding)
          }

          function allocUnsafe(that, size) {
            assertSize(size)
            that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
            if (!Buffer.TYPED_ARRAY_SUPPORT) {
              for (var i = 0; i < size; ++i) {
                that[i] = 0
              }
            }
            return that
          }

          /**
           * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
           * */
          Buffer.allocUnsafe = function (size) {
            return allocUnsafe(null, size)
          }
          /**
           * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
           */
          Buffer.allocUnsafeSlow = function (size) {
            return allocUnsafe(null, size)
          }

          function fromString(that, string, encoding) {
            if (typeof encoding !== "string" || encoding === "") {
              encoding = "utf8"
            }

            if (!Buffer.isEncoding(encoding)) {
              throw new TypeError('"encoding" must be a valid string encoding')
            }

            var length = byteLength(string, encoding) | 0
            that = createBuffer(that, length)

            var actual = that.write(string, encoding)

            if (actual !== length) {
              // Writing a hex string, for example, that contains invalid characters will
              // cause everything after the first invalid character to be ignored. (e.g.
              // 'abxxcd' will be treated as 'ab')
              that = that.slice(0, actual)
            }

            return that
          }

          function fromArrayLike(that, array) {
            var length = array.length < 0 ? 0 : checked(array.length) | 0
            that = createBuffer(that, length)
            for (var i = 0; i < length; i += 1) {
              that[i] = array[i] & 255
            }
            return that
          }

          function fromArrayBuffer(that, array, byteOffset, length) {
            array.byteLength // this throws if `array` is not a valid ArrayBuffer

            if (byteOffset < 0 || array.byteLength < byteOffset) {
              throw new RangeError("'offset' is out of bounds")
            }

            if (array.byteLength < byteOffset + (length || 0)) {
              throw new RangeError("'length' is out of bounds")
            }

            if (byteOffset === undefined && length === undefined) {
              array = new Uint8Array(array)
            } else if (length === undefined) {
              array = new Uint8Array(array, byteOffset)
            } else {
              array = new Uint8Array(array, byteOffset, length)
            }

            if (Buffer.TYPED_ARRAY_SUPPORT) {
              // Return an augmented `Uint8Array` instance, for best performance
              that = array
              that.__proto__ = Buffer.prototype
            } else {
              // Fallback: Return an object instance of the Buffer class
              that = fromArrayLike(that, array)
            }
            return that
          }

          function fromObject(that, obj) {
            if (Buffer.isBuffer(obj)) {
              var len = checked(obj.length) | 0
              that = createBuffer(that, len)

              if (that.length === 0) {
                return that
              }

              obj.copy(that, 0, 0, len)
              return that
            }

            if (obj) {
              if ((typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer) || "length" in obj) {
                if (typeof obj.length !== "number" || isnan(obj.length)) {
                  return createBuffer(that, 0)
                }
                return fromArrayLike(that, obj)
              }

              if (obj.type === "Buffer" && isArray(obj.data)) {
                return fromArrayLike(that, obj.data)
              }
            }

            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
          }

          function checked(length) {
            // Note: cannot use `length < kMaxLength()` here because that fails when
            // length is NaN (which is otherwise coerced to zero.)
            if (length >= kMaxLength()) {
              throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + kMaxLength().toString(16) + " bytes")
            }
            return length | 0
          }

          function SlowBuffer(length) {
            if (+length != length) {
              // eslint-disable-line eqeqeq
              length = 0
            }
            return Buffer.alloc(+length)
          }

          Buffer.isBuffer = function isBuffer(b) {
            return !!(b != null && b._isBuffer)
          }

          Buffer.compare = function compare(a, b) {
            if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
              throw new TypeError("Arguments must be Buffers")
            }

            if (a === b) return 0

            var x = a.length
            var y = b.length

            for (var i = 0, len = Math.min(x, y); i < len; ++i) {
              if (a[i] !== b[i]) {
                x = a[i]
                y = b[i]
                break
              }
            }

            if (x < y) return -1
            if (y < x) return 1
            return 0
          }

          Buffer.isEncoding = function isEncoding(encoding) {
            switch (String(encoding).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return true
              default:
                return false
            }
          }

          Buffer.concat = function concat(list, length) {
            if (!isArray(list)) {
              throw new TypeError('"list" argument must be an Array of Buffers')
            }

            if (list.length === 0) {
              return Buffer.alloc(0)
            }

            var i
            if (length === undefined) {
              length = 0
              for (i = 0; i < list.length; ++i) {
                length += list[i].length
              }
            }

            var buffer = Buffer.allocUnsafe(length)
            var pos = 0
            for (i = 0; i < list.length; ++i) {
              var buf = list[i]
              if (!Buffer.isBuffer(buf)) {
                throw new TypeError('"list" argument must be an Array of Buffers')
              }
              buf.copy(buffer, pos)
              pos += buf.length
            }
            return buffer
          }

          function byteLength(string, encoding) {
            if (Buffer.isBuffer(string)) {
              return string.length
            }
            if (
              typeof ArrayBuffer !== "undefined" &&
              typeof ArrayBuffer.isView === "function" &&
              (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)
            ) {
              return string.byteLength
            }
            if (typeof string !== "string") {
              string = "" + string
            }

            var len = string.length
            if (len === 0) return 0

            // Use a for loop to avoid recursion
            var loweredCase = false
            for (;;) {
              switch (encoding) {
                case "ascii":
                case "latin1":
                case "binary":
                  return len
                case "utf8":
                case "utf-8":
                case undefined:
                  return utf8ToBytes(string).length
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return len * 2
                case "hex":
                  return len >>> 1
                case "base64":
                  return base64ToBytes(string).length
                default: // assume utf8
                  if (loweredCase) return utf8ToBytes(string).length
                  encoding = ("" + encoding).toLowerCase()
                  loweredCase = true
              }
            }
          }
          Buffer.byteLength = byteLength

          function slowToString(encoding, start, end) {
            var loweredCase = false

            // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
            // property of a typed array.

            // This behaves neither like String nor Uint8Array in that we set start/end
            // to their upper/lower bounds if the value passed is out of range.
            // undefined is handled specially as per ECMA-262 6th Edition,
            // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
            if (start === undefined || start < 0) {
              start = 0
            }
            // Return early if start > this.length. Done here to prevent potential uint32
            // coercion fail below.
            if (start > this.length) {
              return ""
            }

            if (end === undefined || end > this.length) {
              end = this.length
            }

            if (end <= 0) {
              return ""
            }

            // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
            end >>>= 0
            start >>>= 0

            if (end <= start) {
              return ""
            }

            if (!encoding) encoding = "utf8"

            while (true) {
              switch (encoding) {
                case "hex":
                  return hexSlice(this, start, end)

                case "utf8":
                case "utf-8":
                  return utf8Slice(this, start, end)

                case "ascii":
                  return asciiSlice(this, start, end)

                case "latin1":
                case "binary":
                  return latin1Slice(this, start, end)

                case "base64":
                  return base64Slice(this, start, end)

                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return utf16leSlice(this, start, end)

                default:
                  if (loweredCase) throw new TypeError("Unknown encoding: " + encoding)
                  encoding = (encoding + "").toLowerCase()
                  loweredCase = true
              }
            }
          }

          // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
          // Buffer instances.
          Buffer.prototype._isBuffer = true

          function swap(b, n, m) {
            var i = b[n]
            b[n] = b[m]
            b[m] = i
          }

          Buffer.prototype.swap16 = function swap16() {
            var len = this.length
            if (len % 2 !== 0) {
              throw new RangeError("Buffer size must be a multiple of 16-bits")
            }
            for (var i = 0; i < len; i += 2) {
              swap(this, i, i + 1)
            }
            return this
          }

          Buffer.prototype.swap32 = function swap32() {
            var len = this.length
            if (len % 4 !== 0) {
              throw new RangeError("Buffer size must be a multiple of 32-bits")
            }
            for (var i = 0; i < len; i += 4) {
              swap(this, i, i + 3)
              swap(this, i + 1, i + 2)
            }
            return this
          }

          Buffer.prototype.swap64 = function swap64() {
            var len = this.length
            if (len % 8 !== 0) {
              throw new RangeError("Buffer size must be a multiple of 64-bits")
            }
            for (var i = 0; i < len; i += 8) {
              swap(this, i, i + 7)
              swap(this, i + 1, i + 6)
              swap(this, i + 2, i + 5)
              swap(this, i + 3, i + 4)
            }
            return this
          }

          Buffer.prototype.toString = function toString() {
            var length = this.length | 0
            if (length === 0) return ""
            if (arguments.length === 0) return utf8Slice(this, 0, length)
            return slowToString.apply(this, arguments)
          }

          Buffer.prototype.equals = function equals(b) {
            if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer")
            if (this === b) return true
            return Buffer.compare(this, b) === 0
          }

          Buffer.prototype.inspect = function inspect() {
            var str = ""
            var max = exports.INSPECT_MAX_BYTES
            if (this.length > 0) {
              str = this.toString("hex", 0, max).match(/.{2}/g).join(" ")
              if (this.length > max) str += " ... "
            }
            return "<Buffer " + str + ">"
          }

          Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
            if (!Buffer.isBuffer(target)) {
              throw new TypeError("Argument must be a Buffer")
            }

            if (start === undefined) {
              start = 0
            }
            if (end === undefined) {
              end = target ? target.length : 0
            }
            if (thisStart === undefined) {
              thisStart = 0
            }
            if (thisEnd === undefined) {
              thisEnd = this.length
            }

            if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
              throw new RangeError("out of range index")
            }

            if (thisStart >= thisEnd && start >= end) {
              return 0
            }
            if (thisStart >= thisEnd) {
              return -1
            }
            if (start >= end) {
              return 1
            }

            start >>>= 0
            end >>>= 0
            thisStart >>>= 0
            thisEnd >>>= 0

            if (this === target) return 0

            var x = thisEnd - thisStart
            var y = end - start
            var len = Math.min(x, y)

            var thisCopy = this.slice(thisStart, thisEnd)
            var targetCopy = target.slice(start, end)

            for (var i = 0; i < len; ++i) {
              if (thisCopy[i] !== targetCopy[i]) {
                x = thisCopy[i]
                y = targetCopy[i]
                break
              }
            }

            if (x < y) return -1
            if (y < x) return 1
            return 0
          }

          // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
          // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
          //
          // Arguments:
          // - buffer - a Buffer to search
          // - val - a string, Buffer, or number
          // - byteOffset - an index into `buffer`; will be clamped to an int32
          // - encoding - an optional encoding, relevant is val is a string
          // - dir - true for indexOf, false for lastIndexOf
          function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
            // Empty buffer means no match
            if (buffer.length === 0) return -1

            // Normalize byteOffset
            if (typeof byteOffset === "string") {
              encoding = byteOffset
              byteOffset = 0
            } else if (byteOffset > 0x7fffffff) {
              byteOffset = 0x7fffffff
            } else if (byteOffset < -0x80000000) {
              byteOffset = -0x80000000
            }
            byteOffset = +byteOffset // Coerce to Number.
            if (isNaN(byteOffset)) {
              // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
              byteOffset = dir ? 0 : buffer.length - 1
            }

            // Normalize byteOffset: negative offsets start from the end of the buffer
            if (byteOffset < 0) byteOffset = buffer.length + byteOffset
            if (byteOffset >= buffer.length) {
              if (dir) return -1
              else byteOffset = buffer.length - 1
            } else if (byteOffset < 0) {
              if (dir) byteOffset = 0
              else return -1
            }

            // Normalize val
            if (typeof val === "string") {
              val = Buffer.from(val, encoding)
            }

            // Finally, search either indexOf (if dir is true) or lastIndexOf
            if (Buffer.isBuffer(val)) {
              // Special case: looking for empty string/buffer always fails
              if (val.length === 0) {
                return -1
              }
              return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
            } else if (typeof val === "number") {
              val = val & 0xff // Search for a byte value [0-255]
              if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
                if (dir) {
                  return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
                } else {
                  return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
                }
              }
              return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
            }

            throw new TypeError("val must be string, number or Buffer")
          }

          function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
            var indexSize = 1
            var arrLength = arr.length
            var valLength = val.length

            if (encoding !== undefined) {
              encoding = String(encoding).toLowerCase()
              if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
                if (arr.length < 2 || val.length < 2) {
                  return -1
                }
                indexSize = 2
                arrLength /= 2
                valLength /= 2
                byteOffset /= 2
              }
            }

            function read(buf, i) {
              if (indexSize === 1) {
                return buf[i]
              } else {
                return buf.readUInt16BE(i * indexSize)
              }
            }

            var i
            if (dir) {
              var foundIndex = -1
              for (i = byteOffset; i < arrLength; i++) {
                if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                  if (foundIndex === -1) foundIndex = i
                  if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
                } else {
                  if (foundIndex !== -1) i -= i - foundIndex
                  foundIndex = -1
                }
              }
            } else {
              if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
              for (i = byteOffset; i >= 0; i--) {
                var found = true
                for (var j = 0; j < valLength; j++) {
                  if (read(arr, i + j) !== read(val, j)) {
                    found = false
                    break
                  }
                }
                if (found) return i
              }
            }

            return -1
          }

          Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
            return this.indexOf(val, byteOffset, encoding) !== -1
          }

          Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
          }

          Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
          }

          function hexWrite(buf, string, offset, length) {
            offset = Number(offset) || 0
            var remaining = buf.length - offset
            if (!length) {
              length = remaining
            } else {
              length = Number(length)
              if (length > remaining) {
                length = remaining
              }
            }

            // must be an even number of digits
            var strLen = string.length
            if (strLen % 2 !== 0) throw new TypeError("Invalid hex string")

            if (length > strLen / 2) {
              length = strLen / 2
            }
            for (var i = 0; i < length; ++i) {
              var parsed = parseInt(string.substr(i * 2, 2), 16)
              if (isNaN(parsed)) return i
              buf[offset + i] = parsed
            }
            return i
          }

          function utf8Write(buf, string, offset, length) {
            return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
          }

          function asciiWrite(buf, string, offset, length) {
            return blitBuffer(asciiToBytes(string), buf, offset, length)
          }

          function latin1Write(buf, string, offset, length) {
            return asciiWrite(buf, string, offset, length)
          }

          function base64Write(buf, string, offset, length) {
            return blitBuffer(base64ToBytes(string), buf, offset, length)
          }

          function ucs2Write(buf, string, offset, length) {
            return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
          }

          Buffer.prototype.write = function write(string, offset, length, encoding) {
            // Buffer#write(string)
            if (offset === undefined) {
              encoding = "utf8"
              length = this.length
              offset = 0
              // Buffer#write(string, encoding)
            } else if (length === undefined && typeof offset === "string") {
              encoding = offset
              length = this.length
              offset = 0
              // Buffer#write(string, offset[, length][, encoding])
            } else if (isFinite(offset)) {
              offset = offset | 0
              if (isFinite(length)) {
                length = length | 0
                if (encoding === undefined) encoding = "utf8"
              } else {
                encoding = length
                length = undefined
              }
              // legacy write(string, encoding, offset, length) - remove in v0.13
            } else {
              throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")
            }

            var remaining = this.length - offset
            if (length === undefined || length > remaining) length = remaining

            if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
              throw new RangeError("Attempt to write outside buffer bounds")
            }

            if (!encoding) encoding = "utf8"

            var loweredCase = false
            for (;;) {
              switch (encoding) {
                case "hex":
                  return hexWrite(this, string, offset, length)

                case "utf8":
                case "utf-8":
                  return utf8Write(this, string, offset, length)

                case "ascii":
                  return asciiWrite(this, string, offset, length)

                case "latin1":
                case "binary":
                  return latin1Write(this, string, offset, length)

                case "base64":
                  // Warning: maxLength not taken into account in base64Write
                  return base64Write(this, string, offset, length)

                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return ucs2Write(this, string, offset, length)

                default:
                  if (loweredCase) throw new TypeError("Unknown encoding: " + encoding)
                  encoding = ("" + encoding).toLowerCase()
                  loweredCase = true
              }
            }
          }

          Buffer.prototype.toJSON = function toJSON() {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0)
            }
          }

          function base64Slice(buf, start, end) {
            if (start === 0 && end === buf.length) {
              return base64.fromByteArray(buf)
            } else {
              return base64.fromByteArray(buf.slice(start, end))
            }
          }

          function utf8Slice(buf, start, end) {
            end = Math.min(buf.length, end)
            var res = []

            var i = start
            while (i < end) {
              var firstByte = buf[i]
              var codePoint = null
              var bytesPerSequence = firstByte > 0xef ? 4 : firstByte > 0xdf ? 3 : firstByte > 0xbf ? 2 : 1

              if (i + bytesPerSequence <= end) {
                var secondByte, thirdByte, fourthByte, tempCodePoint

                switch (bytesPerSequence) {
                  case 1:
                    if (firstByte < 0x80) {
                      codePoint = firstByte
                    }
                    break
                  case 2:
                    secondByte = buf[i + 1]
                    if ((secondByte & 0xc0) === 0x80) {
                      tempCodePoint = ((firstByte & 0x1f) << 0x6) | (secondByte & 0x3f)
                      if (tempCodePoint > 0x7f) {
                        codePoint = tempCodePoint
                      }
                    }
                    break
                  case 3:
                    secondByte = buf[i + 1]
                    thirdByte = buf[i + 2]
                    if ((secondByte & 0xc0) === 0x80 && (thirdByte & 0xc0) === 0x80) {
                      tempCodePoint = ((firstByte & 0xf) << 0xc) | ((secondByte & 0x3f) << 0x6) | (thirdByte & 0x3f)
                      if (tempCodePoint > 0x7ff && (tempCodePoint < 0xd800 || tempCodePoint > 0xdfff)) {
                        codePoint = tempCodePoint
                      }
                    }
                    break
                  case 4:
                    secondByte = buf[i + 1]
                    thirdByte = buf[i + 2]
                    fourthByte = buf[i + 3]
                    if ((secondByte & 0xc0) === 0x80 && (thirdByte & 0xc0) === 0x80 && (fourthByte & 0xc0) === 0x80) {
                      tempCodePoint = ((firstByte & 0xf) << 0x12) | ((secondByte & 0x3f) << 0xc) | ((thirdByte & 0x3f) << 0x6) | (fourthByte & 0x3f)
                      if (tempCodePoint > 0xffff && tempCodePoint < 0x110000) {
                        codePoint = tempCodePoint
                      }
                    }
                }
              }

              if (codePoint === null) {
                // we did not generate a valid codePoint so insert a
                // replacement char (U+FFFD) and advance only 1 byte
                codePoint = 0xfffd
                bytesPerSequence = 1
              } else if (codePoint > 0xffff) {
                // encode to utf16 (surrogate pair dance)
                codePoint -= 0x10000
                res.push(((codePoint >>> 10) & 0x3ff) | 0xd800)
                codePoint = 0xdc00 | (codePoint & 0x3ff)
              }

              res.push(codePoint)
              i += bytesPerSequence
            }

            return decodeCodePointsArray(res)
          }

          // Based on http://stackoverflow.com/a/22747272/680742, the browser with
          // the lowest limit is Chrome, with 0x10000 args.
          // We go 1 magnitude less, for safety
          var MAX_ARGUMENTS_LENGTH = 0x1000

          function decodeCodePointsArray(codePoints) {
            var len = codePoints.length
            if (len <= MAX_ARGUMENTS_LENGTH) {
              return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
            }

            // Decode in chunks to avoid "call stack size exceeded".
            var res = ""
            var i = 0
            while (i < len) {
              res += String.fromCharCode.apply(String, codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH)))
            }
            return res
          }

          function asciiSlice(buf, start, end) {
            var ret = ""
            end = Math.min(buf.length, end)

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i] & 0x7f)
            }
            return ret
          }

          function latin1Slice(buf, start, end) {
            var ret = ""
            end = Math.min(buf.length, end)

            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i])
            }
            return ret
          }

          function hexSlice(buf, start, end) {
            var len = buf.length

            if (!start || start < 0) start = 0
            if (!end || end < 0 || end > len) end = len

            var out = ""
            for (var i = start; i < end; ++i) {
              out += toHex(buf[i])
            }
            return out
          }

          function utf16leSlice(buf, start, end) {
            var bytes = buf.slice(start, end)
            var res = ""
            for (var i = 0; i < bytes.length; i += 2) {
              res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
            }
            return res
          }

          Buffer.prototype.slice = function slice(start, end) {
            var len = this.length
            start = ~~start
            end = end === undefined ? len : ~~end

            if (start < 0) {
              start += len
              if (start < 0) start = 0
            } else if (start > len) {
              start = len
            }

            if (end < 0) {
              end += len
              if (end < 0) end = 0
            } else if (end > len) {
              end = len
            }

            if (end < start) end = start

            var newBuf
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              newBuf = this.subarray(start, end)
              newBuf.__proto__ = Buffer.prototype
            } else {
              var sliceLen = end - start
              newBuf = new Buffer(sliceLen, undefined)
              for (var i = 0; i < sliceLen; ++i) {
                newBuf[i] = this[i + start]
              }
            }

            return newBuf
          }

          /*
           * Need to make sure that buffer isn't trying to write out of bounds.
           */
          function checkOffset(offset, ext, length) {
            if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint")
            if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length")
          }

          Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
            offset = offset | 0
            byteLength = byteLength | 0
            if (!noAssert) checkOffset(offset, byteLength, this.length)

            var val = this[offset]
            var mul = 1
            var i = 0
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul
            }

            return val
          }

          Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
            offset = offset | 0
            byteLength = byteLength | 0
            if (!noAssert) {
              checkOffset(offset, byteLength, this.length)
            }

            var val = this[offset + --byteLength]
            var mul = 1
            while (byteLength > 0 && (mul *= 0x100)) {
              val += this[offset + --byteLength] * mul
            }

            return val
          }

          Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 1, this.length)
            return this[offset]
          }

          Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 2, this.length)
            return this[offset] | (this[offset + 1] << 8)
          }

          Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 2, this.length)
            return (this[offset] << 8) | this[offset + 1]
          }

          Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 4, this.length)

            return (this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16)) + this[offset + 3] * 0x1000000
          }

          Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 4, this.length)

            return this[offset] * 0x1000000 + ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3])
          }

          Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
            offset = offset | 0
            byteLength = byteLength | 0
            if (!noAssert) checkOffset(offset, byteLength, this.length)

            var val = this[offset]
            var mul = 1
            var i = 0
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul
            }
            mul *= 0x80

            if (val >= mul) val -= Math.pow(2, 8 * byteLength)

            return val
          }

          Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
            offset = offset | 0
            byteLength = byteLength | 0
            if (!noAssert) checkOffset(offset, byteLength, this.length)

            var i = byteLength
            var mul = 1
            var val = this[offset + --i]
            while (i > 0 && (mul *= 0x100)) {
              val += this[offset + --i] * mul
            }
            mul *= 0x80

            if (val >= mul) val -= Math.pow(2, 8 * byteLength)

            return val
          }

          Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 1, this.length)
            if (!(this[offset] & 0x80)) return this[offset]
            return (0xff - this[offset] + 1) * -1
          }

          Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 2, this.length)
            var val = this[offset] | (this[offset + 1] << 8)
            return val & 0x8000 ? val | 0xffff0000 : val
          }

          Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 2, this.length)
            var val = this[offset + 1] | (this[offset] << 8)
            return val & 0x8000 ? val | 0xffff0000 : val
          }

          Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 4, this.length)

            return this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16) | (this[offset + 3] << 24)
          }

          Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 4, this.length)

            return (this[offset] << 24) | (this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3]
          }

          Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 4, this.length)
            return ieee754.read(this, offset, true, 23, 4)
          }

          Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 4, this.length)
            return ieee754.read(this, offset, false, 23, 4)
          }

          Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 8, this.length)
            return ieee754.read(this, offset, true, 52, 8)
          }

          Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
            if (!noAssert) checkOffset(offset, 8, this.length)
            return ieee754.read(this, offset, false, 52, 8)
          }

          function checkInt(buf, value, offset, ext, max, min) {
            if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
            if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
            if (offset + ext > buf.length) throw new RangeError("Index out of range")
          }

          Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
            value = +value
            offset = offset | 0
            byteLength = byteLength | 0
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1
              checkInt(this, value, offset, byteLength, maxBytes, 0)
            }

            var mul = 1
            var i = 0
            this[offset] = value & 0xff
            while (++i < byteLength && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff
            }

            return offset + byteLength
          }

          Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
            value = +value
            offset = offset | 0
            byteLength = byteLength | 0
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1
              checkInt(this, value, offset, byteLength, maxBytes, 0)
            }

            var i = byteLength - 1
            var mul = 1
            this[offset + i] = value & 0xff
            while (--i >= 0 && (mul *= 0x100)) {
              this[offset + i] = (value / mul) & 0xff
            }

            return offset + byteLength
          }

          Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
            if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
            this[offset] = value & 0xff
            return offset + 1
          }

          function objectWriteUInt16(buf, value, offset, littleEndian) {
            if (value < 0) value = 0xffff + value + 1
            for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
              buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>> ((littleEndian ? i : 1 - i) * 8)
            }
          }

          Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value & 0xff
              this[offset + 1] = value >>> 8
            } else {
              objectWriteUInt16(this, value, offset, true)
            }
            return offset + 2
          }

          Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 8
              this[offset + 1] = value & 0xff
            } else {
              objectWriteUInt16(this, value, offset, false)
            }
            return offset + 2
          }

          function objectWriteUInt32(buf, value, offset, littleEndian) {
            if (value < 0) value = 0xffffffff + value + 1
            for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
              buf[offset + i] = (value >>> ((littleEndian ? i : 3 - i) * 8)) & 0xff
            }
          }

          Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset + 3] = value >>> 24
              this[offset + 2] = value >>> 16
              this[offset + 1] = value >>> 8
              this[offset] = value & 0xff
            } else {
              objectWriteUInt32(this, value, offset, true)
            }
            return offset + 4
          }

          Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 24
              this[offset + 1] = value >>> 16
              this[offset + 2] = value >>> 8
              this[offset + 3] = value & 0xff
            } else {
              objectWriteUInt32(this, value, offset, false)
            }
            return offset + 4
          }

          Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1)

              checkInt(this, value, offset, byteLength, limit - 1, -limit)
            }

            var i = 0
            var mul = 1
            var sub = 0
            this[offset] = value & 0xff
            while (++i < byteLength && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                sub = 1
              }
              this[offset + i] = (((value / mul) >> 0) - sub) & 0xff
            }

            return offset + byteLength
          }

          Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1)

              checkInt(this, value, offset, byteLength, limit - 1, -limit)
            }

            var i = byteLength - 1
            var mul = 1
            var sub = 0
            this[offset + i] = value & 0xff
            while (--i >= 0 && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                sub = 1
              }
              this[offset + i] = (((value / mul) >> 0) - sub) & 0xff
            }

            return offset + byteLength
          }

          Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
            if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
            if (value < 0) value = 0xff + value + 1
            this[offset] = value & 0xff
            return offset + 1
          }

          Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value & 0xff
              this[offset + 1] = value >>> 8
            } else {
              objectWriteUInt16(this, value, offset, true)
            }
            return offset + 2
          }

          Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 8
              this[offset + 1] = value & 0xff
            } else {
              objectWriteUInt16(this, value, offset, false)
            }
            return offset + 2
          }

          Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value & 0xff
              this[offset + 1] = value >>> 8
              this[offset + 2] = value >>> 16
              this[offset + 3] = value >>> 24
            } else {
              objectWriteUInt32(this, value, offset, true)
            }
            return offset + 4
          }

          Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
            value = +value
            offset = offset | 0
            if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
            if (value < 0) value = 0xffffffff + value + 1
            if (Buffer.TYPED_ARRAY_SUPPORT) {
              this[offset] = value >>> 24
              this[offset + 1] = value >>> 16
              this[offset + 2] = value >>> 8
              this[offset + 3] = value & 0xff
            } else {
              objectWriteUInt32(this, value, offset, false)
            }
            return offset + 4
          }

          function checkIEEE754(buf, value, offset, ext, max, min) {
            if (offset + ext > buf.length) throw new RangeError("Index out of range")
            if (offset < 0) throw new RangeError("Index out of range")
          }

          function writeFloat(buf, value, offset, littleEndian, noAssert) {
            if (!noAssert) {
              checkIEEE754(buf, value, offset, 4, 3.4028234663852886e38, -3.4028234663852886e38)
            }
            ieee754.write(buf, value, offset, littleEndian, 23, 4)
            return offset + 4
          }

          Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
            return writeFloat(this, value, offset, true, noAssert)
          }

          Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
            return writeFloat(this, value, offset, false, noAssert)
          }

          function writeDouble(buf, value, offset, littleEndian, noAssert) {
            if (!noAssert) {
              checkIEEE754(buf, value, offset, 8, 1.7976931348623157e308, -1.7976931348623157e308)
            }
            ieee754.write(buf, value, offset, littleEndian, 52, 8)
            return offset + 8
          }

          Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
            return writeDouble(this, value, offset, true, noAssert)
          }

          Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
            return writeDouble(this, value, offset, false, noAssert)
          }

          // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
          Buffer.prototype.copy = function copy(target, targetStart, start, end) {
            if (!start) start = 0
            if (!end && end !== 0) end = this.length
            if (targetStart >= target.length) targetStart = target.length
            if (!targetStart) targetStart = 0
            if (end > 0 && end < start) end = start

            // Copy 0 bytes; we're done
            if (end === start) return 0
            if (target.length === 0 || this.length === 0) return 0

            // Fatal error conditions
            if (targetStart < 0) {
              throw new RangeError("targetStart out of bounds")
            }
            if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds")
            if (end < 0) throw new RangeError("sourceEnd out of bounds")

            // Are we oob?
            if (end > this.length) end = this.length
            if (target.length - targetStart < end - start) {
              end = target.length - targetStart + start
            }

            var len = end - start
            var i

            if (this === target && start < targetStart && targetStart < end) {
              // descending copy from end
              for (i = len - 1; i >= 0; --i) {
                target[i + targetStart] = this[i + start]
              }
            } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
              // ascending copy from start
              for (i = 0; i < len; ++i) {
                target[i + targetStart] = this[i + start]
              }
            } else {
              Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart)
            }

            return len
          }

          // Usage:
          //    buffer.fill(number[, offset[, end]])
          //    buffer.fill(buffer[, offset[, end]])
          //    buffer.fill(string[, offset[, end]][, encoding])
          Buffer.prototype.fill = function fill(val, start, end, encoding) {
            // Handle string cases:
            if (typeof val === "string") {
              if (typeof start === "string") {
                encoding = start
                start = 0
                end = this.length
              } else if (typeof end === "string") {
                encoding = end
                end = this.length
              }
              if (val.length === 1) {
                var code = val.charCodeAt(0)
                if (code < 256) {
                  val = code
                }
              }
              if (encoding !== undefined && typeof encoding !== "string") {
                throw new TypeError("encoding must be a string")
              }
              if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
                throw new TypeError("Unknown encoding: " + encoding)
              }
            } else if (typeof val === "number") {
              val = val & 255
            }

            // Invalid ranges are not set to a default, so can range check early.
            if (start < 0 || this.length < start || this.length < end) {
              throw new RangeError("Out of range index")
            }

            if (end <= start) {
              return this
            }

            start = start >>> 0
            end = end === undefined ? this.length : end >>> 0

            if (!val) val = 0

            var i
            if (typeof val === "number") {
              for (i = start; i < end; ++i) {
                this[i] = val
              }
            } else {
              var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString())
              var len = bytes.length
              for (i = 0; i < end - start; ++i) {
                this[i + start] = bytes[i % len]
              }
            }

            return this
          }

          // HELPER FUNCTIONS
          // ================

          var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

          function base64clean(str) {
            // Node strips out invalid characters like \n and \t from the string, base64-js does not
            str = stringtrim(str).replace(INVALID_BASE64_RE, "")
            // Node converts strings with length < 2 to ''
            if (str.length < 2) return ""
            // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
            while (str.length % 4 !== 0) {
              str = str + "="
            }
            return str
          }

          function stringtrim(str) {
            if (str.trim) return str.trim()
            return str.replace(/^\s+|\s+$/g, "")
          }

          function toHex(n) {
            if (n < 16) return "0" + n.toString(16)
            return n.toString(16)
          }

          function utf8ToBytes(string, units) {
            units = units || Infinity
            var codePoint
            var length = string.length
            var leadSurrogate = null
            var bytes = []

            for (var i = 0; i < length; ++i) {
              codePoint = string.charCodeAt(i)

              // is surrogate component
              if (codePoint > 0xd7ff && codePoint < 0xe000) {
                // last char was a lead
                if (!leadSurrogate) {
                  // no lead yet
                  if (codePoint > 0xdbff) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
                    continue
                  } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
                    continue
                  }

                  // valid lead
                  leadSurrogate = codePoint

                  continue
                }

                // 2 leads in a row
                if (codePoint < 0xdc00) {
                  if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
                  leadSurrogate = codePoint
                  continue
                }

                // valid surrogate pair
                codePoint = (((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00)) + 0x10000
              } else if (leadSurrogate) {
                // valid bmp char, but last char was a lead
                if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
              }

              leadSurrogate = null

              // encode utf8
              if (codePoint < 0x80) {
                if ((units -= 1) < 0) break
                bytes.push(codePoint)
              } else if (codePoint < 0x800) {
                if ((units -= 2) < 0) break
                bytes.push((codePoint >> 0x6) | 0xc0, (codePoint & 0x3f) | 0x80)
              } else if (codePoint < 0x10000) {
                if ((units -= 3) < 0) break
                bytes.push((codePoint >> 0xc) | 0xe0, ((codePoint >> 0x6) & 0x3f) | 0x80, (codePoint & 0x3f) | 0x80)
              } else if (codePoint < 0x110000) {
                if ((units -= 4) < 0) break
                bytes.push(
                  (codePoint >> 0x12) | 0xf0,
                  ((codePoint >> 0xc) & 0x3f) | 0x80,
                  ((codePoint >> 0x6) & 0x3f) | 0x80,
                  (codePoint & 0x3f) | 0x80
                )
              } else {
                throw new Error("Invalid code point")
              }
            }

            return bytes
          }

          function asciiToBytes(str) {
            var byteArray = []
            for (var i = 0; i < str.length; ++i) {
              // Node's code seems to be doing this and not & 0x7F..
              byteArray.push(str.charCodeAt(i) & 0xff)
            }
            return byteArray
          }

          function utf16leToBytes(str, units) {
            var c, hi, lo
            var byteArray = []
            for (var i = 0; i < str.length; ++i) {
              if ((units -= 2) < 0) break

              c = str.charCodeAt(i)
              hi = c >> 8
              lo = c % 256
              byteArray.push(lo)
              byteArray.push(hi)
            }

            return byteArray
          }

          function base64ToBytes(str) {
            return base64.toByteArray(base64clean(str))
          }

          function blitBuffer(src, dst, offset, length) {
            for (var i = 0; i < length; ++i) {
              if (i + offset >= dst.length || i >= src.length) break
              dst[i + offset] = src[i]
            }
            return i
          }

          function isnan(val) {
            return val !== val // eslint-disable-line no-self-compare
          }

          /* WEBPACK VAR INJECTION */
        }).call(this, __webpack_require__(7))

        /***/
      },
      /* 6 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"
        /* WEBPACK VAR INJECTION */
        ;(function (global) {
          var proj4 = __webpack_require__(63)
          if (proj4.default) {
            proj4 = proj4.default
          }
          var unzip = __webpack_require__(28)
          var binaryAjax = __webpack_require__(51)
          var parseShp = __webpack_require__(54)
          var parseDbf = __webpack_require__(55)
          var Promise = __webpack_require__(26)
          var Cache = __webpack_require__(62)
          var Buffer = __webpack_require__(5).Buffer
          var cache = new Cache({
            max: 20
          })

          function toBuffer(b) {
            if (!b) {
              throw new Error("forgot to pass buffer")
            }
            if (Buffer.isBuffer(b)) {
              return b
            }
            if (b instanceof global.ArrayBuffer) {
              return Buffer.from(b)
            }
            if (b.buffer instanceof global.ArrayBuffer) {
              if (b.BYTES_PER_ELEMENT === 1) {
                return Buffer.from(b)
              }
              return Buffer.from(b.buffer)
            }
          }

          function shp(base, whiteList) {
            if (typeof base === "string" && cache.has(base)) {
              return Promise.resolve(cache.get(base))
            }
            return shp.getShapefile(base, whiteList).then(function (resp) {
              if (typeof base === "string") {
                cache.set(base, resp)
              }
              return resp
            })
          }
          shp.combine = function (arr) {
            var out = {}
            out.type = "FeatureCollection"
            out.features = []
            var i = 0
            var len = arr[0].length
            while (i < len) {
              out.features.push({
                type: "Feature",
                geometry: arr[0][i],
                properties: arr[1][i]
              })
              i++
            }
            return out
          }
          shp.parseZip = function (buffer, whiteList) {
            var key
            buffer = toBuffer(buffer)
            var zip = unzip(buffer)
            var names = []
            whiteList = whiteList || []
            for (key in zip) {
              if (key.indexOf("__MACOSX") !== -1) {
                continue
              }
              if (key.slice(-3).toLowerCase() === "shp") {
                names.push(key.slice(0, -4))
                zip[key.slice(0, -3) + key.slice(-3).toLowerCase()] = zip[key]
              } else if (key.slice(-3).toLowerCase() === "prj") {
                zip[key.slice(0, -3) + key.slice(-3).toLowerCase()] = proj4(zip[key])
              } else if (key.slice(-4).toLowerCase() === "json" || whiteList.indexOf(key.split(".").pop()) > -1) {
                names.push(key.slice(0, -3) + key.slice(-3).toLowerCase())
              } else if (key.slice(-3).toLowerCase() === "dbf" || key.slice(-3).toLowerCase() === "cpg") {
                zip[key.slice(0, -3) + key.slice(-3).toLowerCase()] = zip[key]
              }
            }
            if (!names.length) {
              throw new Error("no layers founds")
            }
            var geojson = names.map(function (name) {
              var parsed, dbf
              var lastDotIdx = name.lastIndexOf(".")
              if (lastDotIdx > -1 && name.slice(lastDotIdx).indexOf("json") > -1) {
                parsed = JSON.parse(zip[name])
                parsed.fileName = name.slice(0, lastDotIdx)
              } else if (whiteList.indexOf(name.slice(lastDotIdx + 1)) > -1) {
                parsed = zip[name]
                parsed.fileName = name
              } else {
                if (zip[name + ".dbf"]) {
                  dbf = parseDbf(zip[name + ".dbf"], zip[name + ".cpg"])
                }
                parsed = shp.combine([parseShp(zip[name + ".shp"], zip[name + ".prj"]), dbf])
                parsed.fileName = name
              }
              return parsed
            })
            if (geojson.length === 1) {
              return geojson[0]
            } else {
              return geojson
            }
          }

          function getZip(base, whiteList) {
            return binaryAjax(base).then(function (a) {
              return shp.parseZip(a, whiteList)
            })
          }
          shp.getShapefile = function (base, whiteList) {
            if (typeof base === "string") {
              if (base.slice(-4).toLowerCase() === ".zip") {
                return getZip(base, whiteList)
              } else {
                return Promise.all([
                  Promise.all([binaryAjax(base + ".shp"), binaryAjax(base + ".prj")]).then(function (args) {
                    var prj = false
                    try {
                      if (args[1]) {
                        prj = proj4(args[1])
                      }
                    } catch (e) {
                      prj = false
                    }
                    return parseShp(args[0], prj)
                  }),
                  Promise.all([binaryAjax(base + ".dbf"), binaryAjax(base + ".cpg")]).then(function (args) {
                    return parseDbf(args[0], args[1])
                  })
                ]).then(shp.combine)
              }
            } else {
              return new Promise(function (resolve) {
                resolve(shp.parseZip(base))
              })
            }
          }
          shp.parseShp = function (shp, prj) {
            shp = toBuffer(shp)
            if (Buffer.isBuffer(prj)) {
              prj = prj.toString()
            }
            if (typeof prj === "string") {
              try {
                prj = proj4(prj)
              } catch (e) {
                prj = false
              }
            }
            return parseShp(shp, prj)
          }
          shp.parseDbf = function (dbf, cpg) {
            dbf = toBuffer(dbf)
            return parseDbf(dbf, cpg)
          }
          module.exports = shp

          /* WEBPACK VAR INJECTION */
        }).call(this, __webpack_require__(7))

        /***/
      },
      /* 7 */
      /***/ function (module, exports) {
        var g

        // This works in non-strict mode
        g = (function () {
          return this
        })()

        try {
          // This works if eval is allowed (see CSP)
          g = g || new Function("return this")()
        } catch (e) {
          // This works if the window reference is available
          if (typeof window === "object") g = window
        }

        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}

        module.exports = g

        /***/
      },
      /* 8 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // private property
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

        // public method for encoding
        exports.encode = function (input, utf8) {
          var output = ""
          var chr1, chr2, chr3, enc1, enc2, enc3, enc4
          var i = 0

          while (i < input.length) {
            chr1 = input.charCodeAt(i++)
            chr2 = input.charCodeAt(i++)
            chr3 = input.charCodeAt(i++)

            enc1 = chr1 >> 2
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
            enc4 = chr3 & 63

            if (isNaN(chr2)) {
              enc3 = enc4 = 64
            } else if (isNaN(chr3)) {
              enc4 = 64
            }

            output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
          }

          return output
        }

        // public method for decoding
        exports.decode = function (input, utf8) {
          var output = ""
          var chr1, chr2, chr3
          var enc1, enc2, enc3, enc4
          var i = 0

          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "")

          while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++))
            enc2 = _keyStr.indexOf(input.charAt(i++))
            enc3 = _keyStr.indexOf(input.charAt(i++))
            enc4 = _keyStr.indexOf(input.charAt(i++))

            chr1 = (enc1 << 2) | (enc2 >> 4)
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
            chr3 = ((enc3 & 3) << 6) | enc4

            output = output + String.fromCharCode(chr1)

            if (enc3 != 64) {
              output = output + String.fromCharCode(chr2)
            }
            if (enc4 != 64) {
              output = output + String.fromCharCode(chr3)
            }
          }

          return output
        }

        /***/
      },
      /* 9 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var support = __webpack_require__(4)
        var utils = __webpack_require__(2)
        var crc32 = __webpack_require__(43)
        var signature = __webpack_require__(18)
        var defaults = __webpack_require__(19)
        var base64 = __webpack_require__(8)
        var compressions = __webpack_require__(10)
        var CompressedObject = __webpack_require__(20)
        var nodeBuffer = __webpack_require__(12)
        var utf8 = __webpack_require__(21)
        var StringWriter = __webpack_require__(44)
        var Uint8ArrayWriter = __webpack_require__(45)

        /**
         * Returns the raw data of a ZipObject, decompress the content if necessary.
         * @param {ZipObject} file the file to use.
         * @return {String|ArrayBuffer|Uint8Array|Buffer} the data.
         */
        var getRawData = function (file) {
          if (file._data instanceof CompressedObject) {
            file._data = file._data.getContent()
            file.options.binary = true
            file.options.base64 = false

            if (utils.getTypeOf(file._data) === "uint8array") {
              var copy = file._data
              // when reading an arraybuffer, the CompressedObject mechanism will keep it and subarray() a Uint8Array.
              // if we request a file in the same format, we might get the same Uint8Array or its ArrayBuffer (the original zip file).
              file._data = new Uint8Array(copy.length)
              // with an empty Uint8Array, Opera fails with a "Offset larger than array size"
              if (copy.length !== 0) {
                file._data.set(copy, 0)
              }
            }
          }
          return file._data
        }

        /**
         * Returns the data of a ZipObject in a binary form. If the content is an unicode string, encode it.
         * @param {ZipObject} file the file to use.
         * @return {String|ArrayBuffer|Uint8Array|Buffer} the data.
         */
        var getBinaryData = function (file) {
          var result = getRawData(file),
            type = utils.getTypeOf(result)
          if (type === "string") {
            if (!file.options.binary) {
              // unicode text !
              // unicode string => binary string is a painful process, check if we can avoid it.
              if (support.nodebuffer) {
                return nodeBuffer(result, "utf-8")
              }
            }
            return file.asBinary()
          }
          return result
        }

        /**
         * Transform this._data into a string.
         * @param {function} filter a function String -> String, applied if not null on the result.
         * @return {String} the string representing this._data.
         */
        var dataToString = function (asUTF8) {
          var result = getRawData(this)
          if (result === null || typeof result === "undefined") {
            return ""
          }
          // if the data is a base64 string, we decode it before checking the encoding !
          if (this.options.base64) {
            result = base64.decode(result)
          }
          if (asUTF8 && this.options.binary) {
            // JSZip.prototype.utf8decode supports arrays as input
            // skip to array => string step, utf8decode will do it.
            result = out.utf8decode(result)
          } else {
            // no utf8 transformation, do the array => string step.
            result = utils.transformTo("string", result)
          }

          if (!asUTF8 && !this.options.binary) {
            result = utils.transformTo("string", out.utf8encode(result))
          }
          return result
        }
        /**
         * A simple object representing a file in the zip file.
         * @constructor
         * @param {string} name the name of the file
         * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
         * @param {Object} options the options of the file
         */
        var ZipObject = function (name, data, options) {
          this.name = name
          this.dir = options.dir
          this.date = options.date
          this.comment = options.comment
          this.unixPermissions = options.unixPermissions
          this.dosPermissions = options.dosPermissions

          this._data = data
          this.options = options

          /*
           * This object contains initial values for dir and date.
           * With them, we can check if the user changed the deprecated metadata in
           * `ZipObject#options` or not.
           */
          this._initialMetadata = {
            dir: options.dir,
            date: options.date
          }
        }

        ZipObject.prototype = {
          /**
           * Return the content as UTF8 string.
           * @return {string} the UTF8 string.
           */
          asText: function () {
            return dataToString.call(this, true)
          },
          /**
           * Returns the binary content.
           * @return {string} the content as binary.
           */
          asBinary: function () {
            return dataToString.call(this, false)
          },
          /**
           * Returns the content as a nodejs Buffer.
           * @return {Buffer} the content as a Buffer.
           */
          asNodeBuffer: function () {
            var result = getBinaryData(this)
            return utils.transformTo("nodebuffer", result)
          },
          /**
           * Returns the content as an Uint8Array.
           * @return {Uint8Array} the content as an Uint8Array.
           */
          asUint8Array: function () {
            var result = getBinaryData(this)
            return utils.transformTo("uint8array", result)
          },
          /**
           * Returns the content as an ArrayBuffer.
           * @return {ArrayBuffer} the content as an ArrayBufer.
           */
          asArrayBuffer: function () {
            return this.asUint8Array().buffer
          }
        }

        /**
         * Transform an integer into a string in hexadecimal.
         * @private
         * @param {number} dec the number to convert.
         * @param {number} bytes the number of bytes to generate.
         * @returns {string} the result.
         */
        var decToHex = function (dec, bytes) {
          var hex = "",
            i
          for (i = 0; i < bytes; i++) {
            hex += String.fromCharCode(dec & 0xff)
            dec = dec >>> 8
          }
          return hex
        }

        /**
         * Transforms the (incomplete) options from the user into the complete
         * set of options to create a file.
         * @private
         * @param {Object} o the options from the user.
         * @return {Object} the complete set of options.
         */
        var prepareFileAttrs = function (o) {
          o = o || {}
          if (o.base64 === true && (o.binary === null || o.binary === undefined)) {
            o.binary = true
          }
          o = utils.extend(o, defaults)
          o.date = o.date || new Date()
          if (o.compression !== null) o.compression = o.compression.toUpperCase()

          return o
        }

        /**
         * Add a file in the current folder.
         * @private
         * @param {string} name the name of the file
         * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
         * @param {Object} o the options of the file
         * @return {Object} the new file.
         */
        var fileAdd = function (name, data, o) {
          // be sure sub folders exist
          var dataType = utils.getTypeOf(data),
            parent

          o = prepareFileAttrs(o)

          if (typeof o.unixPermissions === "string") {
            o.unixPermissions = parseInt(o.unixPermissions, 8)
          }

          // UNX_IFDIR  0040000 see zipinfo.c
          if (o.unixPermissions && o.unixPermissions & 0x4000) {
            o.dir = true
          }
          // Bit 4    Directory
          if (o.dosPermissions && o.dosPermissions & 0x0010) {
            o.dir = true
          }

          if (o.dir) {
            name = forceTrailingSlash(name)
          }

          if (o.createFolders && (parent = parentFolder(name))) {
            folderAdd.call(this, parent, true)
          }

          if (o.dir || data === null || typeof data === "undefined") {
            o.base64 = false
            o.binary = false
            data = null
            dataType = null
          } else if (dataType === "string") {
            if (o.binary && !o.base64) {
              // optimizedBinaryString == true means that the file has already been filtered with a 0xFF mask
              if (o.optimizedBinaryString !== true) {
                // this is a string, not in a base64 format.
                // Be sure that this is a correct "binary string"
                data = utils.string2binary(data)
              }
            }
          } else {
            // arraybuffer, uint8array, ...
            o.base64 = false
            o.binary = true

            if (!dataType && !(data instanceof CompressedObject)) {
              throw new Error("The data of '" + name + "' is in an unsupported format !")
            }

            // special case : it's way easier to work with Uint8Array than with ArrayBuffer
            if (dataType === "arraybuffer") {
              data = utils.transformTo("uint8array", data)
            }
          }

          var object = new ZipObject(name, data, o)
          this.files[name] = object
          return object
        }

        /**
         * Find the parent folder of the path.
         * @private
         * @param {string} path the path to use
         * @return {string} the parent folder, or ""
         */
        var parentFolder = function (path) {
          if (path.slice(-1) == "/") {
            path = path.substring(0, path.length - 1)
          }
          var lastSlash = path.lastIndexOf("/")
          return lastSlash > 0 ? path.substring(0, lastSlash) : ""
        }

        /**
         * Returns the path with a slash at the end.
         * @private
         * @param {String} path the path to check.
         * @return {String} the path with a trailing slash.
         */
        var forceTrailingSlash = function (path) {
          // Check the name ends with a /
          if (path.slice(-1) != "/") {
            path += "/" // IE doesn't like substr(-1)
          }
          return path
        }
        /**
         * Add a (sub) folder in the current folder.
         * @private
         * @param {string} name the folder's name
         * @param {boolean=} [createFolders] If true, automatically create sub
         *  folders. Defaults to false.
         * @return {Object} the new folder.
         */
        var folderAdd = function (name, createFolders) {
          createFolders = typeof createFolders !== "undefined" ? createFolders : false

          name = forceTrailingSlash(name)

          // Does this folder already exist?
          if (!this.files[name]) {
            fileAdd.call(this, name, null, {
              dir: true,
              createFolders: createFolders
            })
          }
          return this.files[name]
        }

        /**
         * Generate a JSZip.CompressedObject for a given zipOject.
         * @param {ZipObject} file the object to read.
         * @param {JSZip.compression} compression the compression to use.
         * @param {Object} compressionOptions the options to use when compressing.
         * @return {JSZip.CompressedObject} the compressed result.
         */
        var generateCompressedObjectFrom = function (file, compression, compressionOptions) {
          var result = new CompressedObject(),
            content

          // the data has not been decompressed, we might reuse things !
          if (file._data instanceof CompressedObject) {
            result.uncompressedSize = file._data.uncompressedSize
            result.crc32 = file._data.crc32

            if (result.uncompressedSize === 0 || file.dir) {
              compression = compressions["STORE"]
              result.compressedContent = ""
              result.crc32 = 0
            } else if (file._data.compressionMethod === compression.magic) {
              result.compressedContent = file._data.getCompressedContent()
            } else {
              content = file._data.getContent()
              // need to decompress / recompress
              result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content), compressionOptions)
            }
          } else {
            // have uncompressed data
            content = getBinaryData(file)
            if (!content || content.length === 0 || file.dir) {
              compression = compressions["STORE"]
              content = ""
            }
            result.uncompressedSize = content.length
            result.crc32 = crc32(content)
            result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content), compressionOptions)
          }

          result.compressedSize = result.compressedContent.length
          result.compressionMethod = compression.magic

          return result
        }

        /**
         * Generate the UNIX part of the external file attributes.
         * @param {Object} unixPermissions the unix permissions or null.
         * @param {Boolean} isDir true if the entry is a directory, false otherwise.
         * @return {Number} a 32 bit integer.
         *
         * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
         *
         * TTTTsstrwxrwxrwx0000000000ADVSHR
         * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
         *     ^^^_________________________ setuid, setgid, sticky
         *        ^^^^^^^^^________________ permissions
         *                 ^^^^^^^^^^______ not used ?
         *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
         */
        var generateUnixExternalFileAttr = function (unixPermissions, isDir) {
          var result = unixPermissions
          if (!unixPermissions) {
            // I can't use octal values in strict mode, hence the hexa.
            //  040775 => 0x41fd
            // 0100664 => 0x81b4
            result = isDir ? 0x41fd : 0x81b4
          }

          return (result & 0xffff) << 16
        }

        /**
         * Generate the DOS part of the external file attributes.
         * @param {Object} dosPermissions the dos permissions or null.
         * @param {Boolean} isDir true if the entry is a directory, false otherwise.
         * @return {Number} a 32 bit integer.
         *
         * Bit 0     Read-Only
         * Bit 1     Hidden
         * Bit 2     System
         * Bit 3     Volume Label
         * Bit 4     Directory
         * Bit 5     Archive
         */
        var generateDosExternalFileAttr = function (dosPermissions, isDir) {
          // the dir flag is already set for compatibility

          return (dosPermissions || 0) & 0x3f
        }

        /**
         * Generate the various parts used in the construction of the final zip file.
         * @param {string} name the file name.
         * @param {ZipObject} file the file content.
         * @param {JSZip.CompressedObject} compressedObject the compressed object.
         * @param {number} offset the current offset from the start of the zip file.
         * @param {String} platform let's pretend we are this platform (change platform dependents fields)
         * @param {Function} encodeFileName the function to encode the file name / comment.
         * @return {object} the zip parts.
         */
        var generateZipParts = function (name, file, compressedObject, offset, platform, encodeFileName) {
          var data = compressedObject.compressedContent,
            useCustomEncoding = encodeFileName !== utf8.utf8encode,
            encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
            utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
            comment = file.comment || "",
            encodedComment = utils.transformTo("string", encodeFileName(comment)),
            utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
            useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
            useUTF8ForComment = utfEncodedComment.length !== comment.length,
            o = file.options,
            dosTime,
            dosDate,
            extraFields = "",
            unicodePathExtraField = "",
            unicodeCommentExtraField = "",
            dir,
            date

          // handle the deprecated options.dir
          if (file._initialMetadata.dir !== file.dir) {
            dir = file.dir
          } else {
            dir = o.dir
          }

          // handle the deprecated options.date
          if (file._initialMetadata.date !== file.date) {
            date = file.date
          } else {
            date = o.date
          }

          var extFileAttr = 0
          var versionMadeBy = 0
          if (dir) {
            // dos or unix, we set the dos dir flag
            extFileAttr |= 0x00010
          }
          if (platform === "UNIX") {
            versionMadeBy = 0x031e // UNIX, version 3.0
            extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir)
          } else {
            // DOS or other, fallback to DOS
            versionMadeBy = 0x0014 // DOS, version 2.0
            extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir)
          }

          // date
          // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
          // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
          // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

          dosTime = date.getHours()
          dosTime = dosTime << 6
          dosTime = dosTime | date.getMinutes()
          dosTime = dosTime << 5
          dosTime = dosTime | (date.getSeconds() / 2)

          dosDate = date.getFullYear() - 1980
          dosDate = dosDate << 4
          dosDate = dosDate | (date.getMonth() + 1)
          dosDate = dosDate << 5
          dosDate = dosDate | date.getDate()

          if (useUTF8ForFileName) {
            // set the unicode path extra field. unzip needs at least one extra
            // field to correctly handle unicode path, so using the path is as good
            // as any other information. This could improve the situation with
            // other archive managers too.
            // This field is usually used without the utf8 flag, with a non
            // unicode path in the header (winrar, winzip). This helps (a bit)
            // with the messy Windows' default compressed folders feature but
            // breaks on p7zip which doesn't seek the unicode path extra field.
            // So for now, UTF-8 everywhere !
            unicodePathExtraField =
              // Version
              decToHex(1, 1) +
              // NameCRC32
              decToHex(crc32(encodedFileName), 4) +
              // UnicodeName
              utfEncodedFileName

            extraFields +=
              // Info-ZIP Unicode Path Extra Field
              "\x75\x70" +
              // size
              decToHex(unicodePathExtraField.length, 2) +
              // content
              unicodePathExtraField
          }

          if (useUTF8ForComment) {
            unicodeCommentExtraField =
              // Version
              decToHex(1, 1) +
              // CommentCRC32
              decToHex(this.crc32(encodedComment), 4) +
              // UnicodeName
              utfEncodedComment

            extraFields +=
              // Info-ZIP Unicode Path Extra Field
              "\x75\x63" +
              // size
              decToHex(unicodeCommentExtraField.length, 2) +
              // content
              unicodeCommentExtraField
          }

          var header = ""

          // version needed to extract
          header += "\x0A\x00"
          // general purpose bit flag
          // set bit 11 if utf8
          header += !useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment) ? "\x00\x08" : "\x00\x00"
          // compression method
          header += compressedObject.compressionMethod
          // last mod file time
          header += decToHex(dosTime, 2)
          // last mod file date
          header += decToHex(dosDate, 2)
          // crc-32
          header += decToHex(compressedObject.crc32, 4)
          // compressed size
          header += decToHex(compressedObject.compressedSize, 4)
          // uncompressed size
          header += decToHex(compressedObject.uncompressedSize, 4)
          // file name length
          header += decToHex(encodedFileName.length, 2)
          // extra field length
          header += decToHex(extraFields.length, 2)

          var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields

          var dirRecord =
            signature.CENTRAL_FILE_HEADER +
            // version made by (00: DOS)
            decToHex(versionMadeBy, 2) +
            // file header (common to file and central directory)
            header +
            // file comment length
            decToHex(encodedComment.length, 2) +
            // disk number start
            "\x00\x00" +
            // internal file attributes TODO
            "\x00\x00" +
            // external file attributes
            decToHex(extFileAttr, 4) +
            // relative offset of local header
            decToHex(offset, 4) +
            // file name
            encodedFileName +
            // extra field
            extraFields +
            // file comment
            encodedComment

          return {
            fileRecord: fileRecord,
            dirRecord: dirRecord,
            compressedObject: compressedObject
          }
        }

        // return the actual prototype of JSZip
        var out = {
          /**
           * Read an existing zip and merge the data in the current JSZip object.
           * The implementation is in jszip-load.js, don't forget to include it.
           * @param {String|ArrayBuffer|Uint8Array|Buffer} stream  The stream to load
           * @param {Object} options Options for loading the stream.
           *  options.base64 : is the stream in base64 ? default : false
           * @return {JSZip} the current JSZip object
           */
          load: function (stream, options) {
            throw new Error("Load method is not defined. Is the file jszip-load.js included ?")
          },

          /**
           * Filter nested files/folders with the specified function.
           * @param {Function} search the predicate to use :
           * function (relativePath, file) {...}
           * It takes 2 arguments : the relative path and the file.
           * @return {Array} An array of matching elements.
           */
          filter: function (search) {
            var result = [],
              filename,
              relativePath,
              file,
              fileClone
            for (filename in this.files) {
              if (!this.files.hasOwnProperty(filename)) {
                continue
              }
              file = this.files[filename]
              // return a new object, don't let the user mess with our internal objects :)
              fileClone = new ZipObject(file.name, file._data, utils.extend(file.options))
              relativePath = filename.slice(this.root.length, filename.length)
              if (
                filename.slice(0, this.root.length) === this.root && // the file is in the current root
                search(relativePath, fileClone)
              ) {
                // and the file matches the function
                result.push(fileClone)
              }
            }
            return result
          },

          /**
           * Add a file to the zip file, or search a file.
           * @param   {string|RegExp} name The name of the file to add (if data is defined),
           * the name of the file to find (if no data) or a regex to match files.
           * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
           * @param   {Object} o     File options
           * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
           * a file (when searching by string) or an array of files (when searching by regex).
           */
          file: function (name, data, o) {
            if (arguments.length === 1) {
              if (utils.isRegExp(name)) {
                var regexp = name
                return this.filter(function (relativePath, file) {
                  return !file.dir && regexp.test(relativePath)
                })
              } else {
                // text
                return (
                  this.filter(function (relativePath, file) {
                    return !file.dir && relativePath === name
                  })[0] || null
                )
              }
            } else {
              // more than one argument : we have data !
              name = this.root + name
              fileAdd.call(this, name, data, o)
            }
            return this
          },

          /**
           * Add a directory to the zip file, or search.
           * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
           * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
           */
          folder: function (arg) {
            if (!arg) {
              return this
            }

            if (utils.isRegExp(arg)) {
              return this.filter(function (relativePath, file) {
                return file.dir && arg.test(relativePath)
              })
            }

            // else, name is a new folder
            var name = this.root + arg
            var newFolder = folderAdd.call(this, name)

            // Allow chaining by returning a new object with this folder as the root
            var ret = this.clone()
            ret.root = newFolder.name
            return ret
          },

          /**
           * Delete a file, or a directory and all sub-files, from the zip
           * @param {string} name the name of the file to delete
           * @return {JSZip} this JSZip object
           */
          remove: function (name) {
            name = this.root + name
            var file = this.files[name]
            if (!file) {
              // Look for any folders
              if (name.slice(-1) != "/") {
                name += "/"
              }
              file = this.files[name]
            }

            if (file && !file.dir) {
              // file
              delete this.files[name]
            } else {
              // maybe a folder, delete recursively
              var kids = this.filter(function (relativePath, file) {
                return file.name.slice(0, name.length) === name
              })
              for (var i = 0; i < kids.length; i++) {
                delete this.files[kids[i].name]
              }
            }

            return this
          },

          /**
           * Generate the complete zip file
           * @param {Object} options the options to generate the zip file :
           * - base64, (deprecated, use type instead) true to generate base64.
           * - compression, "STORE" by default.
           * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
           * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
           */
          generate: function (options) {
            options = utils.extend(options || {}, {
              base64: true,
              compression: "STORE",
              compressionOptions: null,
              type: "base64",
              platform: "DOS",
              comment: null,
              mimeType: "application/zip",
              encodeFileName: utf8.utf8encode
            })

            utils.checkSupport(options.type)

            // accept nodejs `process.platform`
            if (options.platform === "darwin" || options.platform === "freebsd" || options.platform === "linux" || options.platform === "sunos") {
              options.platform = "UNIX"
            }
            if (options.platform === "win32") {
              options.platform = "DOS"
            }

            var zipData = [],
              localDirLength = 0,
              centralDirLength = 0,
              writer,
              i,
              encodedComment = utils.transformTo("string", options.encodeFileName(options.comment || this.comment || ""))

            // first, generate all the zip parts.
            for (var name in this.files) {
              if (!this.files.hasOwnProperty(name)) {
                continue
              }
              var file = this.files[name]

              var compressionName = file.options.compression || options.compression.toUpperCase()
              var compression = compressions[compressionName]
              if (!compression) {
                throw new Error(compressionName + " is not a valid compression method !")
              }
              var compressionOptions = file.options.compressionOptions || options.compressionOptions || {}

              var compressedObject = generateCompressedObjectFrom.call(this, file, compression, compressionOptions)

              var zipPart = generateZipParts.call(this, name, file, compressedObject, localDirLength, options.platform, options.encodeFileName)
              localDirLength += zipPart.fileRecord.length + compressedObject.compressedSize
              centralDirLength += zipPart.dirRecord.length
              zipData.push(zipPart)
            }

            var dirEnd = ""

            // end of central dir signature
            dirEnd =
              signature.CENTRAL_DIRECTORY_END +
              // number of this disk
              "\x00\x00" +
              // number of the disk with the start of the central directory
              "\x00\x00" +
              // total number of entries in the central directory on this disk
              decToHex(zipData.length, 2) +
              // total number of entries in the central directory
              decToHex(zipData.length, 2) +
              // size of the central directory   4 bytes
              decToHex(centralDirLength, 4) +
              // offset of start of central directory with respect to the starting disk number
              decToHex(localDirLength, 4) +
              // .ZIP file comment length
              decToHex(encodedComment.length, 2) +
              // .ZIP file comment
              encodedComment

            // we have all the parts (and the total length)
            // time to create a writer !
            var typeName = options.type.toLowerCase()
            if (typeName === "uint8array" || typeName === "arraybuffer" || typeName === "blob" || typeName === "nodebuffer") {
              writer = new Uint8ArrayWriter(localDirLength + centralDirLength + dirEnd.length)
            } else {
              writer = new StringWriter(localDirLength + centralDirLength + dirEnd.length)
            }

            for (i = 0; i < zipData.length; i++) {
              writer.append(zipData[i].fileRecord)
              writer.append(zipData[i].compressedObject.compressedContent)
            }
            for (i = 0; i < zipData.length; i++) {
              writer.append(zipData[i].dirRecord)
            }

            writer.append(dirEnd)

            var zip = writer.finalize()

            switch (options.type.toLowerCase()) {
              // case "zip is an Uint8Array"
              case "uint8array":
              case "arraybuffer":
              case "nodebuffer":
                return utils.transformTo(options.type.toLowerCase(), zip)
              case "blob":
                return utils.arrayBuffer2Blob(utils.transformTo("arraybuffer", zip), options.mimeType)
              // case "zip is a string"
              case "base64":
                return options.base64 ? base64.encode(zip) : zip
              default: // case "string" :
                return zip
            }
          },

          /**
           * @deprecated
           * This method will be removed in a future version without replacement.
           */
          crc32: function (input, crc) {
            return crc32(input, crc)
          },

          /**
           * @deprecated
           * This method will be removed in a future version without replacement.
           */
          utf8encode: function (string) {
            return utils.transformTo("string", utf8.utf8encode(string))
          },

          /**
           * @deprecated
           * This method will be removed in a future version without replacement.
           */
          utf8decode: function (input) {
            return utf8.utf8decode(input)
          }
        }
        module.exports = out

        /***/
      },
      /* 10 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        exports.STORE = {
          magic: "\x00\x00",
          compress: function (content, compressionOptions) {
            return content // no compression
          },
          uncompress: function (content) {
            return content // no compression
          },
          compressInputType: null,
          uncompressInputType: null
        }
        exports.DEFLATE = __webpack_require__(33)

        /***/
      },
      /* 11 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        module.exports = {
          2: "need dictionary" /* Z_NEED_DICT       2  */,
          1: "stream end" /* Z_STREAM_END      1  */,
          0: "" /* Z_OK              0  */,
          "-1": "file error" /* Z_ERRNO         (-1) */,
          "-2": "stream error" /* Z_STREAM_ERROR  (-2) */,
          "-3": "data error" /* Z_DATA_ERROR    (-3) */,
          "-4": "insufficient memory" /* Z_MEM_ERROR     (-4) */,
          "-5": "buffer error" /* Z_BUF_ERROR     (-5) */,
          "-6": "incompatible version" /* Z_VERSION_ERROR (-6) */
        }

        /***/
      },
      /* 12 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"
        /* WEBPACK VAR INJECTION */
        ;(function (Buffer) {
          module.exports = function (data, encoding) {
            return new Buffer(data, encoding)
          }
          module.exports.test = function (b) {
            return Buffer.isBuffer(b)
          }

          /* WEBPACK VAR INJECTION */
        }).call(this, __webpack_require__(5).Buffer)

        /***/
      },
      /* 13 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // Note: adler32 takes 12% for level 0 and 2% for level 6.
        // It isn't worth it to make additional optimizations as in original.
        // Small size is preferable.

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        function adler32(adler, buf, len, pos) {
          var s1 = (adler & 0xffff) | 0,
            s2 = ((adler >>> 16) & 0xffff) | 0,
            n = 0

          while (len !== 0) {
            // Set limit ~ twice less than 5552, to keep
            // s2 in 31-bits, because we force signed ints.
            // in other case %= will fail.
            n = len > 2000 ? 2000 : len
            len -= n

            do {
              s1 = (s1 + buf[pos++]) | 0
              s2 = (s2 + s1) | 0
            } while (--n)

            s1 %= 65521
            s2 %= 65521
          }

          return s1 | (s2 << 16) | 0
        }

        module.exports = adler32

        /***/
      },
      /* 14 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // Note: we can't get significant speed boost here.
        // So write code to minimize size - no pregenerated tables
        // and array tools dependencies.

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        // Use ordinary array, since untyped makes no boost here
        function makeTable() {
          var c,
            table = []

          for (var n = 0; n < 256; n++) {
            c = n
            for (var k = 0; k < 8; k++) {
              c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
            }
            table[n] = c
          }

          return table
        }

        // Create table on load. Just 255 signed longs. Not a problem.
        var crcTable = makeTable()

        function crc32(crc, buf, len, pos) {
          var t = crcTable,
            end = pos + len

          crc ^= -1

          for (var i = pos; i < end; i++) {
            crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xff]
          }

          return crc ^ -1 // >>> 0;
        }

        module.exports = crc32

        /***/
      },
      /* 15 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"
        // String encode/decode helpers

        var utils = __webpack_require__(3)

        // Quick check if we can use fast array to bin string conversion
        //
        // - apply(Array) can fail on Android 2.2
        // - apply(Uint8Array) can fail on iOS 5.1 Safari
        //
        var STR_APPLY_OK = true
        var STR_APPLY_UIA_OK = true

        try {
          String.fromCharCode.apply(null, [0])
        } catch (__) {
          STR_APPLY_OK = false
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1))
        } catch (__) {
          STR_APPLY_UIA_OK = false
        }

        // Table with utf8 lengths (calculated by first byte of sequence)
        // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
        // because max possible codepoint is 0x10ffff
        var _utf8len = new utils.Buf8(256)
        for (var q = 0; q < 256; q++) {
          _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1
        }
        _utf8len[254] = _utf8len[254] = 1 // Invalid sequence start

        // convert string to array (typed, when possible)
        exports.string2buf = function (str) {
          var buf,
            c,
            c2,
            m_pos,
            i,
            str_len = str.length,
            buf_len = 0

          // count binary size
          for (m_pos = 0; m_pos < str_len; m_pos++) {
            c = str.charCodeAt(m_pos)
            if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
              c2 = str.charCodeAt(m_pos + 1)
              if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00)
                m_pos++
              }
            }
            buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4
          }

          // allocate buffer
          buf = new utils.Buf8(buf_len)

          // convert
          for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
            c = str.charCodeAt(m_pos)
            if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
              c2 = str.charCodeAt(m_pos + 1)
              if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00)
                m_pos++
              }
            }
            if (c < 0x80) {
              /* one byte */
              buf[i++] = c
            } else if (c < 0x800) {
              /* two bytes */
              buf[i++] = 0xc0 | (c >>> 6)
              buf[i++] = 0x80 | (c & 0x3f)
            } else if (c < 0x10000) {
              /* three bytes */
              buf[i++] = 0xe0 | (c >>> 12)
              buf[i++] = 0x80 | ((c >>> 6) & 0x3f)
              buf[i++] = 0x80 | (c & 0x3f)
            } else {
              /* four bytes */
              buf[i++] = 0xf0 | (c >>> 18)
              buf[i++] = 0x80 | ((c >>> 12) & 0x3f)
              buf[i++] = 0x80 | ((c >>> 6) & 0x3f)
              buf[i++] = 0x80 | (c & 0x3f)
            }
          }

          return buf
        }

        // Helper (used in 2 places)
        function buf2binstring(buf, len) {
          // On Chrome, the arguments in a function call that are allowed is `65534`.
          // If the length of the buffer is smaller than that, we can use this optimization,
          // otherwise we will take a slower path.
          if (len < 65534) {
            if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
              return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len))
            }
          }

          var result = ""
          for (var i = 0; i < len; i++) {
            result += String.fromCharCode(buf[i])
          }
          return result
        }

        // Convert byte array to binary string
        exports.buf2binstring = function (buf) {
          return buf2binstring(buf, buf.length)
        }

        // Convert binary string (typed, when possible)
        exports.binstring2buf = function (str) {
          var buf = new utils.Buf8(str.length)
          for (var i = 0, len = buf.length; i < len; i++) {
            buf[i] = str.charCodeAt(i)
          }
          return buf
        }

        // convert array to string
        exports.buf2string = function (buf, max) {
          var i, out, c, c_len
          var len = max || buf.length

          // Reserve max possible length (2 words per char)
          // NB: by unknown reasons, Array is significantly faster for
          //     String.fromCharCode.apply than Uint16Array.
          var utf16buf = new Array(len * 2)

          for (out = 0, i = 0; i < len; ) {
            c = buf[i++]
            // quick process ascii
            if (c < 0x80) {
              utf16buf[out++] = c
              continue
            }

            c_len = _utf8len[c]
            // skip 5 & 6 byte codes
            if (c_len > 4) {
              utf16buf[out++] = 0xfffd
              i += c_len - 1
              continue
            }

            // apply mask on first byte
            c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07
            // join the rest
            while (c_len > 1 && i < len) {
              c = (c << 6) | (buf[i++] & 0x3f)
              c_len--
            }

            // terminated by end of string?
            if (c_len > 1) {
              utf16buf[out++] = 0xfffd
              continue
            }

            if (c < 0x10000) {
              utf16buf[out++] = c
            } else {
              c -= 0x10000
              utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff)
              utf16buf[out++] = 0xdc00 | (c & 0x3ff)
            }
          }

          return buf2binstring(utf16buf, out)
        }

        // Calculate max possible position in utf8 buffer,
        // that will not break sequence. If that's not possible
        // - (very small limits) return max size as is.
        //
        // buf[] - utf8 bytes array
        // max   - length limit (mandatory);
        exports.utf8border = function (buf, max) {
          var pos

          max = max || buf.length
          if (max > buf.length) {
            max = buf.length
          }

          // go back from last position, until start of sequence found
          pos = max - 1
          while (pos >= 0 && (buf[pos] & 0xc0) === 0x80) {
            pos--
          }

          // Very small and broken sequence,
          // return max, because we should return something anyway.
          if (pos < 0) {
            return max
          }

          // If we came to start of buffer - that means buffer is too small,
          // return max too.
          if (pos === 0) {
            return max
          }

          return pos + _utf8len[buf[pos]] > max ? pos : max
        }

        /***/
      },
      /* 16 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        function ZStream() {
          /* next input byte */
          this.input = null // JS specific, because we have no pointers
          this.next_in = 0
          /* number of bytes available at input */
          this.avail_in = 0
          /* total number of input bytes read so far */
          this.total_in = 0
          /* next output byte should be put there */
          this.output = null // JS specific, because we have no pointers
          this.next_out = 0
          /* remaining free space at output */
          this.avail_out = 0
          /* total number of bytes output so far */
          this.total_out = 0
          /* last error message, NULL if no error */
          this.msg = "" /*Z_NULL*/
          /* not visible by applications */
          this.state = null
          /* best guess about the data type: binary or text */
          this.data_type = 2 /*Z_UNKNOWN*/
          /* adler32 value of the uncompressed data */
          this.adler = 0
        }

        module.exports = ZStream

        /***/
      },
      /* 17 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        module.exports = {
          /* Allowed flush values; see deflate() and inflate() below for details */
          Z_NO_FLUSH: 0,
          Z_PARTIAL_FLUSH: 1,
          Z_SYNC_FLUSH: 2,
          Z_FULL_FLUSH: 3,
          Z_FINISH: 4,
          Z_BLOCK: 5,
          Z_TREES: 6,

          /* Return codes for the compression/decompression functions. Negative values
           * are errors, positive values are used for special but normal events.
           */
          Z_OK: 0,
          Z_STREAM_END: 1,
          Z_NEED_DICT: 2,
          Z_ERRNO: -1,
          Z_STREAM_ERROR: -2,
          Z_DATA_ERROR: -3,
          //Z_MEM_ERROR:     -4,
          Z_BUF_ERROR: -5,
          //Z_VERSION_ERROR: -6,

          /* compression levels */
          Z_NO_COMPRESSION: 0,
          Z_BEST_SPEED: 1,
          Z_BEST_COMPRESSION: 9,
          Z_DEFAULT_COMPRESSION: -1,

          Z_FILTERED: 1,
          Z_HUFFMAN_ONLY: 2,
          Z_RLE: 3,
          Z_FIXED: 4,
          Z_DEFAULT_STRATEGY: 0,

          /* Possible values of the data_type field (though see inflate()) */
          Z_BINARY: 0,
          Z_TEXT: 1,
          //Z_ASCII:                1, // = Z_TEXT (deprecated)
          Z_UNKNOWN: 2,

          /* The deflate compression method */
          Z_DEFLATED: 8
          //Z_NULL:                 null // Use -1 or null inline, depending on var type
        }

        /***/
      },
      /* 18 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        exports.LOCAL_FILE_HEADER = "PK\x03\x04"
        exports.CENTRAL_FILE_HEADER = "PK\x01\x02"
        exports.CENTRAL_DIRECTORY_END = "PK\x05\x06"
        exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07"
        exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06"
        exports.DATA_DESCRIPTOR = "PK\x07\x08"

        /***/
      },
      /* 19 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        exports.base64 = false
        exports.binary = false
        exports.dir = false
        exports.createFolders = false
        exports.date = null
        exports.compression = null
        exports.compressionOptions = null
        exports.comment = null
        exports.unixPermissions = null
        exports.dosPermissions = null

        /***/
      },
      /* 20 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        function CompressedObject() {
          this.compressedSize = 0
          this.uncompressedSize = 0
          this.crc32 = 0
          this.compressionMethod = null
          this.compressedContent = null
        }

        CompressedObject.prototype = {
          /**
           * Return the decompressed content in an unspecified format.
           * The format will depend on the decompressor.
           * @return {Object} the decompressed content.
           */
          getContent: function () {
            return null // see implementation
          },
          /**
           * Return the compressed content in an unspecified format.
           * The format will depend on the compressed conten source.
           * @return {Object} the compressed content.
           */
          getCompressedContent: function () {
            return null // see implementation
          }
        }
        module.exports = CompressedObject

        /***/
      },
      /* 21 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var utils = __webpack_require__(2)
        var support = __webpack_require__(4)
        var nodeBuffer = __webpack_require__(12)

        /**
         * The following functions come from pako, from pako/lib/utils/strings
         * released under the MIT license, see pako https://github.com/nodeca/pako/
         */

        // Table with utf8 lengths (calculated by first byte of sequence)
        // Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
        // because max possible codepoint is 0x10ffff
        var _utf8len = new Array(256)
        for (var i = 0; i < 256; i++) {
          _utf8len[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1
        }
        _utf8len[254] = _utf8len[254] = 1 // Invalid sequence start

        // convert string to array (typed, when possible)
        var string2buf = function (str) {
          var buf,
            c,
            c2,
            m_pos,
            i,
            str_len = str.length,
            buf_len = 0

          // count binary size
          for (m_pos = 0; m_pos < str_len; m_pos++) {
            c = str.charCodeAt(m_pos)
            if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
              c2 = str.charCodeAt(m_pos + 1)
              if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00)
                m_pos++
              }
            }
            buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4
          }

          // allocate buffer
          if (support.uint8array) {
            buf = new Uint8Array(buf_len)
          } else {
            buf = new Array(buf_len)
          }

          // convert
          for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
            c = str.charCodeAt(m_pos)
            if ((c & 0xfc00) === 0xd800 && m_pos + 1 < str_len) {
              c2 = str.charCodeAt(m_pos + 1)
              if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00)
                m_pos++
              }
            }
            if (c < 0x80) {
              /* one byte */
              buf[i++] = c
            } else if (c < 0x800) {
              /* two bytes */
              buf[i++] = 0xc0 | (c >>> 6)
              buf[i++] = 0x80 | (c & 0x3f)
            } else if (c < 0x10000) {
              /* three bytes */
              buf[i++] = 0xe0 | (c >>> 12)
              buf[i++] = 0x80 | ((c >>> 6) & 0x3f)
              buf[i++] = 0x80 | (c & 0x3f)
            } else {
              /* four bytes */
              buf[i++] = 0xf0 | (c >>> 18)
              buf[i++] = 0x80 | ((c >>> 12) & 0x3f)
              buf[i++] = 0x80 | ((c >>> 6) & 0x3f)
              buf[i++] = 0x80 | (c & 0x3f)
            }
          }

          return buf
        }

        // Calculate max possible position in utf8 buffer,
        // that will not break sequence. If that's not possible
        // - (very small limits) return max size as is.
        //
        // buf[] - utf8 bytes array
        // max   - length limit (mandatory);
        var utf8border = function (buf, max) {
          var pos

          max = max || buf.length
          if (max > buf.length) {
            max = buf.length
          }

          // go back from last position, until start of sequence found
          pos = max - 1
          while (pos >= 0 && (buf[pos] & 0xc0) === 0x80) {
            pos--
          }

          // Fuckup - very small and broken sequence,
          // return max, because we should return something anyway.
          if (pos < 0) {
            return max
          }

          // If we came to start of buffer - that means vuffer is too small,
          // return max too.
          if (pos === 0) {
            return max
          }

          return pos + _utf8len[buf[pos]] > max ? pos : max
        }

        // convert array to string
        var buf2string = function (buf) {
          var str, i, out, c, c_len
          var len = buf.length

          // Reserve max possible length (2 words per char)
          // NB: by unknown reasons, Array is significantly faster for
          //     String.fromCharCode.apply than Uint16Array.
          var utf16buf = new Array(len * 2)

          for (out = 0, i = 0; i < len; ) {
            c = buf[i++]
            // quick process ascii
            if (c < 0x80) {
              utf16buf[out++] = c
              continue
            }

            c_len = _utf8len[c]
            // skip 5 & 6 byte codes
            if (c_len > 4) {
              utf16buf[out++] = 0xfffd
              i += c_len - 1
              continue
            }

            // apply mask on first byte
            c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07
            // join the rest
            while (c_len > 1 && i < len) {
              c = (c << 6) | (buf[i++] & 0x3f)
              c_len--
            }

            // terminated by end of string?
            if (c_len > 1) {
              utf16buf[out++] = 0xfffd
              continue
            }

            if (c < 0x10000) {
              utf16buf[out++] = c
            } else {
              c -= 0x10000
              utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff)
              utf16buf[out++] = 0xdc00 | (c & 0x3ff)
            }
          }

          // shrinkBuf(utf16buf, out)
          if (utf16buf.length !== out) {
            if (utf16buf.subarray) {
              utf16buf = utf16buf.subarray(0, out)
            } else {
              utf16buf.length = out
            }
          }

          // return String.fromCharCode.apply(null, utf16buf);
          return utils.applyFromCharCode(utf16buf)
        }

        // That's all for the pako functions.

        /**
         * Transform a javascript string into an array (typed if possible) of bytes,
         * UTF-8 encoded.
         * @param {String} str the string to encode
         * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
         */
        exports.utf8encode = function utf8encode(str) {
          if (support.nodebuffer) {
            return nodeBuffer(str, "utf-8")
          }

          return string2buf(str)
        }

        /**
         * Transform a bytes array (or a representation) representing an UTF-8 encoded
         * string into a javascript string.
         * @param {Array|Uint8Array|Buffer} buf the data de decode
         * @return {String} the decoded string.
         */
        exports.utf8decode = function utf8decode(buf) {
          if (support.nodebuffer) {
            return utils.transformTo("nodebuffer", buf).toString("utf-8")
          }

          buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf)

          // return buf2string(buf);
          // Chrome prefers to work with "small" chunks of data
          // for the method buf2string.
          // Firefox and Chrome has their own shortcut, IE doesn't seem to really care.
          var result = [],
            k = 0,
            len = buf.length,
            chunk = 65536
          while (k < len) {
            var nextBoundary = utf8border(buf, Math.min(k + chunk, len))
            if (support.uint8array) {
              result.push(buf2string(buf.subarray(k, nextBoundary)))
            } else {
              result.push(buf2string(buf.slice(k, nextBoundary)))
            }
            k = nextBoundary
          }
          return result.join("")
        }
        // vim: set shiftwidth=4 softtabstop=4:

        /***/
      },
      /* 22 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var DataReader = __webpack_require__(23)
        var utils = __webpack_require__(2)

        function StringReader(data, optimizedBinaryString) {
          this.data = data
          if (!optimizedBinaryString) {
            this.data = utils.string2binary(this.data)
          }
          this.length = this.data.length
          this.index = 0
          this.zero = 0
        }
        StringReader.prototype = new DataReader()
        /**
         * @see DataReader.byteAt
         */
        StringReader.prototype.byteAt = function (i) {
          return this.data.charCodeAt(this.zero + i)
        }
        /**
         * @see DataReader.lastIndexOfSignature
         */
        StringReader.prototype.lastIndexOfSignature = function (sig) {
          return this.data.lastIndexOf(sig) - this.zero
        }
        /**
         * @see DataReader.readData
         */
        StringReader.prototype.readData = function (size) {
          this.checkOffset(size)
          // this will work because the constructor applied the "& 0xff" mask.
          var result = this.data.slice(this.zero + this.index, this.zero + this.index + size)
          this.index += size
          return result
        }
        module.exports = StringReader

        /***/
      },
      /* 23 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var utils = __webpack_require__(2)

        function DataReader(data) {
          this.data = null // type : see implementation
          this.length = 0
          this.index = 0
          this.zero = 0
        }
        DataReader.prototype = {
          /**
           * Check that the offset will not go too far.
           * @param {string} offset the additional offset to check.
           * @throws {Error} an Error if the offset is out of bounds.
           */
          checkOffset: function (offset) {
            this.checkIndex(this.index + offset)
          },
          /**
           * Check that the specifed index will not be too far.
           * @param {string} newIndex the index to check.
           * @throws {Error} an Error if the index is out of bounds.
           */
          checkIndex: function (newIndex) {
            if (this.length < this.zero + newIndex || newIndex < 0) {
              throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?")
            }
          },
          /**
           * Change the index.
           * @param {number} newIndex The new index.
           * @throws {Error} if the new index is out of the data.
           */
          setIndex: function (newIndex) {
            this.checkIndex(newIndex)
            this.index = newIndex
          },
          /**
           * Skip the next n bytes.
           * @param {number} n the number of bytes to skip.
           * @throws {Error} if the new index is out of the data.
           */
          skip: function (n) {
            this.setIndex(this.index + n)
          },
          /**
           * Get the byte at the specified index.
           * @param {number} i the index to use.
           * @return {number} a byte.
           */
          byteAt: function (i) {
            // see implementations
          },
          /**
           * Get the next number with a given byte size.
           * @param {number} size the number of bytes to read.
           * @return {number} the corresponding number.
           */
          readInt: function (size) {
            var result = 0,
              i
            this.checkOffset(size)
            for (i = this.index + size - 1; i >= this.index; i--) {
              result = (result << 8) + this.byteAt(i)
            }
            this.index += size
            return result
          },
          /**
           * Get the next string with a given byte size.
           * @param {number} size the number of bytes to read.
           * @return {string} the corresponding string.
           */
          readString: function (size) {
            return utils.transformTo("string", this.readData(size))
          },
          /**
           * Get raw data without conversion, <size> bytes.
           * @param {number} size the number of bytes to read.
           * @return {Object} the raw data, implementation specific.
           */
          readData: function (size) {
            // see implementations
          },
          /**
           * Find the last occurence of a zip signature (4 bytes).
           * @param {string} sig the signature to find.
           * @return {number} the index of the last occurence, -1 if not found.
           */
          lastIndexOfSignature: function (sig) {
            // see implementations
          },
          /**
           * Get the next date.
           * @return {Date} the date.
           */
          readDate: function () {
            var dostime = this.readInt(4)
            return new Date(
              ((dostime >> 25) & 0x7f) + 1980, // year
              ((dostime >> 21) & 0x0f) - 1, // month
              (dostime >> 16) & 0x1f, // day
              (dostime >> 11) & 0x1f, // hour
              (dostime >> 5) & 0x3f, // minute
              (dostime & 0x1f) << 1
            ) // second
          }
        }
        module.exports = DataReader

        /***/
      },
      /* 24 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var ArrayReader = __webpack_require__(25)

        function Uint8ArrayReader(data) {
          if (data) {
            this.data = data
            this.length = this.data.length
            this.index = 0
            this.zero = 0
          }
        }
        Uint8ArrayReader.prototype = new ArrayReader()
        /**
         * @see DataReader.readData
         */
        Uint8ArrayReader.prototype.readData = function (size) {
          this.checkOffset(size)
          if (size === 0) {
            // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
            return new Uint8Array(0)
          }
          var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size)
          this.index += size
          return result
        }
        module.exports = Uint8ArrayReader

        /***/
      },
      /* 25 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var DataReader = __webpack_require__(23)

        function ArrayReader(data) {
          if (data) {
            this.data = data
            this.length = this.data.length
            this.index = 0
            this.zero = 0

            for (var i = 0; i < this.data.length; i++) {
              data[i] = data[i] & 0xff
            }
          }
        }
        ArrayReader.prototype = new DataReader()
        /**
         * @see DataReader.byteAt
         */
        ArrayReader.prototype.byteAt = function (i) {
          return this.data[this.zero + i]
        }
        /**
         * @see DataReader.lastIndexOfSignature
         */
        ArrayReader.prototype.lastIndexOfSignature = function (sig) {
          var sig0 = sig.charCodeAt(0),
            sig1 = sig.charCodeAt(1),
            sig2 = sig.charCodeAt(2),
            sig3 = sig.charCodeAt(3)
          for (var i = this.length - 4; i >= 0; --i) {
            if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
              return i - this.zero
            }
          }

          return -1
        }
        /**
         * @see DataReader.readData
         */
        ArrayReader.prototype.readData = function (size) {
          this.checkOffset(size)
          if (size === 0) {
            return []
          }
          var result = this.data.slice(this.zero + this.index, this.zero + this.index + size)
          this.index += size
          return result
        }
        module.exports = ArrayReader

        /***/
      },
      /* 26 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var immediate = __webpack_require__(53)

        /* istanbul ignore next */
        function INTERNAL() {}

        var handlers = {}

        var REJECTED = ["REJECTED"]
        var FULFILLED = ["FULFILLED"]
        var PENDING = ["PENDING"]

        module.exports = Promise

        function Promise(resolver) {
          if (typeof resolver !== "function") {
            throw new TypeError("resolver must be a function")
          }
          this.state = PENDING
          this.queue = []
          this.outcome = void 0
          if (resolver !== INTERNAL) {
            safelyResolveThenable(this, resolver)
          }
        }

        Promise.prototype["finally"] = function (callback) {
          if (typeof callback !== "function") {
            return this
          }
          var p = this.constructor
          return this.then(resolve, reject)

          function resolve(value) {
            function yes() {
              return value
            }
            return p.resolve(callback()).then(yes)
          }
          function reject(reason) {
            function no() {
              throw reason
            }
            return p.resolve(callback()).then(no)
          }
        }
        Promise.prototype["catch"] = function (onRejected) {
          return this.then(null, onRejected)
        }
        Promise.prototype.then = function (onFulfilled, onRejected) {
          if ((typeof onFulfilled !== "function" && this.state === FULFILLED) || (typeof onRejected !== "function" && this.state === REJECTED)) {
            return this
          }
          var promise = new this.constructor(INTERNAL)
          if (this.state !== PENDING) {
            var resolver = this.state === FULFILLED ? onFulfilled : onRejected
            unwrap(promise, resolver, this.outcome)
          } else {
            this.queue.push(new QueueItem(promise, onFulfilled, onRejected))
          }

          return promise
        }
        function QueueItem(promise, onFulfilled, onRejected) {
          this.promise = promise
          if (typeof onFulfilled === "function") {
            this.onFulfilled = onFulfilled
            this.callFulfilled = this.otherCallFulfilled
          }
          if (typeof onRejected === "function") {
            this.onRejected = onRejected
            this.callRejected = this.otherCallRejected
          }
        }
        QueueItem.prototype.callFulfilled = function (value) {
          handlers.resolve(this.promise, value)
        }
        QueueItem.prototype.otherCallFulfilled = function (value) {
          unwrap(this.promise, this.onFulfilled, value)
        }
        QueueItem.prototype.callRejected = function (value) {
          handlers.reject(this.promise, value)
        }
        QueueItem.prototype.otherCallRejected = function (value) {
          unwrap(this.promise, this.onRejected, value)
        }

        function unwrap(promise, func, value) {
          immediate(function () {
            var returnValue
            try {
              returnValue = func(value)
            } catch (e) {
              return handlers.reject(promise, e)
            }
            if (returnValue === promise) {
              handlers.reject(promise, new TypeError("Cannot resolve promise with itself"))
            } else {
              handlers.resolve(promise, returnValue)
            }
          })
        }

        handlers.resolve = function (self, value) {
          var result = tryCatch(getThen, value)
          if (result.status === "error") {
            return handlers.reject(self, result.value)
          }
          var thenable = result.value

          if (thenable) {
            safelyResolveThenable(self, thenable)
          } else {
            self.state = FULFILLED
            self.outcome = value
            var i = -1
            var len = self.queue.length
            while (++i < len) {
              self.queue[i].callFulfilled(value)
            }
          }
          return self
        }
        handlers.reject = function (self, error) {
          self.state = REJECTED
          self.outcome = error
          var i = -1
          var len = self.queue.length
          while (++i < len) {
            self.queue[i].callRejected(error)
          }
          return self
        }

        function getThen(obj) {
          // Make sure we only access the accessor once as required by the spec
          var then = obj && obj.then
          if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
            return function appyThen() {
              then.apply(obj, arguments)
            }
          }
        }

        function safelyResolveThenable(self, thenable) {
          // Either fulfill, reject or reject with error
          var called = false
          function onError(value) {
            if (called) {
              return
            }
            called = true
            handlers.reject(self, value)
          }

          function onSuccess(value) {
            if (called) {
              return
            }
            called = true
            handlers.resolve(self, value)
          }

          function tryToUnwrap() {
            thenable(onSuccess, onError)
          }

          var result = tryCatch(tryToUnwrap)
          if (result.status === "error") {
            onError(result.value)
          }
        }

        function tryCatch(func, value) {
          var out = {}
          try {
            out.value = func(value)
            out.status = "success"
          } catch (e) {
            out.status = "error"
            out.value = e
          }
          return out
        }

        Promise.resolve = resolve
        function resolve(value) {
          if (value instanceof this) {
            return value
          }
          return handlers.resolve(new this(INTERNAL), value)
        }

        Promise.reject = reject
        function reject(reason) {
          var promise = new this(INTERNAL)
          return handlers.reject(promise, reason)
        }

        Promise.all = all
        function all(iterable) {
          var self = this
          if (Object.prototype.toString.call(iterable) !== "[object Array]") {
            return this.reject(new TypeError("must be an array"))
          }

          var len = iterable.length
          var called = false
          if (!len) {
            return this.resolve([])
          }

          var values = new Array(len)
          var resolved = 0
          var i = -1
          var promise = new this(INTERNAL)

          while (++i < len) {
            allResolver(iterable[i], i)
          }
          return promise
          function allResolver(value, i) {
            self.resolve(value).then(resolveFromAll, function (error) {
              if (!called) {
                called = true
                handlers.reject(promise, error)
              }
            })
            function resolveFromAll(outValue) {
              values[i] = outValue
              if (++resolved === len && !called) {
                called = true
                handlers.resolve(promise, values)
              }
            }
          }
        }

        Promise.race = race
        function race(iterable) {
          var self = this
          if (Object.prototype.toString.call(iterable) !== "[object Array]") {
            return this.reject(new TypeError("must be an array"))
          }

          var len = iterable.length
          var called = false
          if (!len) {
            return this.resolve([])
          }

          var i = -1
          var promise = new this(INTERNAL)

          while (++i < len) {
            resolver(iterable[i])
          }
          return promise
          function resolver(value) {
            self.resolve(value).then(
              function (response) {
                if (!called) {
                  called = true
                  handlers.resolve(promise, response)
                }
              },
              function (error) {
                if (!called) {
                  called = true
                  handlers.reject(promise, error)
                }
              }
            )
          }
        }

        /***/
      },
      /* 27 */
      /***/ function (module, exports) {
        function _typeof(obj) {
          "@babel/helpers - typeof"

          return (
            ((module.exports = _typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (obj) {
                    return typeof obj
                  }
                : function (obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
                  }),
            (module.exports.__esModule = true),
            (module.exports["default"] = module.exports)),
            _typeof(obj)
          )
        }

        ;(module.exports = _typeof), (module.exports.__esModule = true), (module.exports["default"] = module.exports)

        /***/
      },
      /* 28 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var JSZip = __webpack_require__(29)
        module.exports = function (buffer) {
          var zip = new JSZip(buffer)
          var files = zip.file(/.+/)
          var out = {}
          files.forEach(function (a) {
            if (a.name.slice(-3).toLowerCase() === "shp" || a.name.slice(-3).toLowerCase() === "dbf") {
              out[a.name] = a.asNodeBuffer()
            } else {
              out[a.name] = a.asText()
            }
          })
          return out
        }

        /***/
      },
      /* 29 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var base64 = __webpack_require__(8)

        /**
Usage:
   zip = new JSZip();
   zip.file("hello.txt", "Hello, World!").file("tempfile", "nothing");
   zip.folder("images").file("smile.gif", base64Data, {base64: true});
   zip.file("Xmas.txt", "Ho ho ho !", {date : new Date("December 25, 2007 00:00:01")});
   zip.remove("tempfile");

   base64zip = zip.generate();

**/

        /**
         * Representation a of zip file in js
         * @constructor
         * @param {String=|ArrayBuffer=|Uint8Array=} data the data to load, if any (optional).
         * @param {Object=} options the options for creating this objects (optional).
         */
        function JSZip(data, options) {
          // if this constructor is used without `new`, it adds `new` before itself:
          if (!(this instanceof JSZip)) return new JSZip(data, options)

          // object containing the files :
          // {
          //   "folder/" : {...},
          //   "folder/data.txt" : {...}
          // }
          this.files = {}

          this.comment = null

          // Where we are in the hierarchy
          this.root = ""
          if (data) {
            this.load(data, options)
          }
          this.clone = function () {
            var newObj = new JSZip()
            for (var i in this) {
              if (typeof this[i] !== "function") {
                newObj[i] = this[i]
              }
            }
            return newObj
          }
        }
        JSZip.prototype = __webpack_require__(9)
        JSZip.prototype.load = __webpack_require__(46)
        JSZip.support = __webpack_require__(4)
        JSZip.defaults = __webpack_require__(19)

        /**
         * @deprecated
         * This namespace will be removed in a future version without replacement.
         */
        JSZip.utils = __webpack_require__(50)

        JSZip.base64 = {
          /**
           * @deprecated
           * This method will be removed in a future version without replacement.
           */
          encode: function (input) {
            return base64.encode(input)
          },
          /**
           * @deprecated
           * This method will be removed in a future version without replacement.
           */
          decode: function (input) {
            return base64.decode(input)
          }
        }
        JSZip.compressions = __webpack_require__(10)
        module.exports = JSZip

        /***/
      },
      /* 30 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        exports.byteLength = byteLength
        exports.toByteArray = toByteArray
        exports.fromByteArray = fromByteArray

        var lookup = []
        var revLookup = []
        var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array

        var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup[i] = code[i]
          revLookup[code.charCodeAt(i)] = i
        }

        // Support decoding URL-safe base64 strings, as Node.js does.
        // See: https://en.wikipedia.org/wiki/Base64#URL_applications
        revLookup["-".charCodeAt(0)] = 62
        revLookup["_".charCodeAt(0)] = 63

        function getLens(b64) {
          var len = b64.length

          if (len % 4 > 0) {
            throw new Error("Invalid string. Length must be a multiple of 4")
          }

          // Trim off extra bytes after placeholder bytes are found
          // See: https://github.com/beatgammit/base64-js/issues/42
          var validLen = b64.indexOf("=")
          if (validLen === -1) validLen = len

          var placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4)

          return [validLen, placeHoldersLen]
        }

        // base64 is 4/3 + up to two characters of the original data
        function byteLength(b64) {
          var lens = getLens(b64)
          var validLen = lens[0]
          var placeHoldersLen = lens[1]
          return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
        }

        function _byteLength(b64, validLen, placeHoldersLen) {
          return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
        }

        function toByteArray(b64) {
          var tmp
          var lens = getLens(b64)
          var validLen = lens[0]
          var placeHoldersLen = lens[1]

          var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

          var curByte = 0

          // if there are placeholders, only get up to the last complete 4 chars
          var len = placeHoldersLen > 0 ? validLen - 4 : validLen

          var i
          for (i = 0; i < len; i += 4) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 18) |
              (revLookup[b64.charCodeAt(i + 1)] << 12) |
              (revLookup[b64.charCodeAt(i + 2)] << 6) |
              revLookup[b64.charCodeAt(i + 3)]
            arr[curByte++] = (tmp >> 16) & 0xff
            arr[curByte++] = (tmp >> 8) & 0xff
            arr[curByte++] = tmp & 0xff
          }

          if (placeHoldersLen === 2) {
            tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
            arr[curByte++] = tmp & 0xff
          }

          if (placeHoldersLen === 1) {
            tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
            arr[curByte++] = (tmp >> 8) & 0xff
            arr[curByte++] = tmp & 0xff
          }

          return arr
        }

        function tripletToBase64(num) {
          return lookup[(num >> 18) & 0x3f] + lookup[(num >> 12) & 0x3f] + lookup[(num >> 6) & 0x3f] + lookup[num & 0x3f]
        }

        function encodeChunk(uint8, start, end) {
          var tmp
          var output = []
          for (var i = start; i < end; i += 3) {
            tmp = ((uint8[i] << 16) & 0xff0000) + ((uint8[i + 1] << 8) & 0xff00) + (uint8[i + 2] & 0xff)
            output.push(tripletToBase64(tmp))
          }
          return output.join("")
        }

        function fromByteArray(uint8) {
          var tmp
          var len = uint8.length
          var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
          var parts = []
          var maxChunkLength = 16383 // must be multiple of 3

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
            parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength))
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          if (extraBytes === 1) {
            tmp = uint8[len - 1]
            parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 0x3f] + "==")
          } else if (extraBytes === 2) {
            tmp = (uint8[len - 2] << 8) + uint8[len - 1]
            parts.push(lookup[tmp >> 10] + lookup[(tmp >> 4) & 0x3f] + lookup[(tmp << 2) & 0x3f] + "=")
          }

          return parts.join("")
        }

        /***/
      },
      /* 31 */
      /***/ function (module, exports) {
        /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
        exports.read = function (buffer, offset, isLE, mLen, nBytes) {
          var e, m
          var eLen = nBytes * 8 - mLen - 1
          var eMax = (1 << eLen) - 1
          var eBias = eMax >> 1
          var nBits = -7
          var i = isLE ? nBytes - 1 : 0
          var d = isLE ? -1 : 1
          var s = buffer[offset + i]

          i += d

          e = s & ((1 << -nBits) - 1)
          s >>= -nBits
          nBits += eLen
          for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

          m = e & ((1 << -nBits) - 1)
          e >>= -nBits
          nBits += mLen
          for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

          if (e === 0) {
            e = 1 - eBias
          } else if (e === eMax) {
            return m ? NaN : (s ? -1 : 1) * Infinity
          } else {
            m = m + Math.pow(2, mLen)
            e = e - eBias
          }
          return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
        }

        exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
          var e, m, c
          var eLen = nBytes * 8 - mLen - 1
          var eMax = (1 << eLen) - 1
          var eBias = eMax >> 1
          var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0
          var i = isLE ? 0 : nBytes - 1
          var d = isLE ? 1 : -1
          var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

          value = Math.abs(value)

          if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0
            e = eMax
          } else {
            e = Math.floor(Math.log(value) / Math.LN2)
            if (value * (c = Math.pow(2, -e)) < 1) {
              e--
              c *= 2
            }
            if (e + eBias >= 1) {
              value += rt / c
            } else {
              value += rt * Math.pow(2, 1 - eBias)
            }
            if (value * c >= 2) {
              e++
              c /= 2
            }

            if (e + eBias >= eMax) {
              m = 0
              e = eMax
            } else if (e + eBias >= 1) {
              m = (value * c - 1) * Math.pow(2, mLen)
              e = e + eBias
            } else {
              m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
              e = 0
            }
          }

          for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

          e = (e << mLen) | m
          eLen += mLen
          for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

          buffer[offset + i - d] |= s * 128
        }

        /***/
      },
      /* 32 */
      /***/ function (module, exports) {
        var toString = {}.toString

        module.exports =
          Array.isArray ||
          function (arr) {
            return toString.call(arr) == "[object Array]"
          }

        /***/
      },
      /* 33 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var USE_TYPEDARRAY = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined"

        var pako = __webpack_require__(34)
        exports.uncompressInputType = USE_TYPEDARRAY ? "uint8array" : "array"
        exports.compressInputType = USE_TYPEDARRAY ? "uint8array" : "array"

        exports.magic = "\x08\x00"
        exports.compress = function (input, compressionOptions) {
          return pako.deflateRaw(input, {
            level: compressionOptions.level || -1 // default compression
          })
        }
        exports.uncompress = function (input) {
          return pako.inflateRaw(input)
        }

        /***/
      },
      /* 34 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"
        // Top level file is just a mixin of submodules & constants

        var assign = __webpack_require__(3).assign

        var deflate = __webpack_require__(35)
        var inflate = __webpack_require__(38)
        var constants = __webpack_require__(17)

        var pako = {}

        assign(pako, deflate, inflate, constants)

        module.exports = pako

        /***/
      },
      /* 35 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var zlib_deflate = __webpack_require__(36)
        var utils = __webpack_require__(3)
        var strings = __webpack_require__(15)
        var msg = __webpack_require__(11)
        var ZStream = __webpack_require__(16)

        var toString = Object.prototype.toString

        /* Public constants ==========================================================*/
        /* ===========================================================================*/

        var Z_NO_FLUSH = 0
        var Z_FINISH = 4

        var Z_OK = 0
        var Z_STREAM_END = 1
        var Z_SYNC_FLUSH = 2

        var Z_DEFAULT_COMPRESSION = -1

        var Z_DEFAULT_STRATEGY = 0

        var Z_DEFLATED = 8

        /* ===========================================================================*/

        /**
         * class Deflate
         *
         * Generic JS-style wrapper for zlib calls. If you don't need
         * streaming behaviour - use more simple functions: [[deflate]],
         * [[deflateRaw]] and [[gzip]].
         **/

        /* internal
         * Deflate.chunks -> Array
         *
         * Chunks of output data, if [[Deflate#onData]] not overridden.
         **/

        /**
         * Deflate.result -> Uint8Array|Array
         *
         * Compressed result, generated by default [[Deflate#onData]]
         * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
         * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
         * push a chunk with explicit flush (call [[Deflate#push]] with
         * `Z_SYNC_FLUSH` param).
         **/

        /**
         * Deflate.err -> Number
         *
         * Error code after deflate finished. 0 (Z_OK) on success.
         * You will not need it in real life, because deflate errors
         * are possible only on wrong options or bad `onData` / `onEnd`
         * custom handlers.
         **/

        /**
         * Deflate.msg -> String
         *
         * Error message, if [[Deflate.err]] != 0
         **/

        /**
         * new Deflate(options)
         * - options (Object): zlib deflate options.
         *
         * Creates new deflator instance with specified params. Throws exception
         * on bad params. Supported options:
         *
         * - `level`
         * - `windowBits`
         * - `memLevel`
         * - `strategy`
         * - `dictionary`
         *
         * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
         * for more information on these.
         *
         * Additional options, for internal needs:
         *
         * - `chunkSize` - size of generated data chunks (16K by default)
         * - `raw` (Boolean) - do raw deflate
         * - `gzip` (Boolean) - create gzip wrapper
         * - `to` (String) - if equal to 'string', then result will be "binary string"
         *    (each char code [0..255])
         * - `header` (Object) - custom header for gzip
         *   - `text` (Boolean) - true if compressed data believed to be text
         *   - `time` (Number) - modification time, unix timestamp
         *   - `os` (Number) - operation system code
         *   - `extra` (Array) - array of bytes with extra data (max 65536)
         *   - `name` (String) - file name (binary string)
         *   - `comment` (String) - comment (binary string)
         *   - `hcrc` (Boolean) - true if header crc should be added
         *
         * ##### Example:
         *
         * ```javascript
         * var pako = require('pako')
         *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
         *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
         *
         * var deflate = new pako.Deflate({ level: 3});
         *
         * deflate.push(chunk1, false);
         * deflate.push(chunk2, true);  // true -> last chunk
         *
         * if (deflate.err) { throw new Error(deflate.err); }
         *
         * console.log(deflate.result);
         * ```
         **/
        function Deflate(options) {
          if (!(this instanceof Deflate)) return new Deflate(options)

          this.options = utils.assign(
            {
              level: Z_DEFAULT_COMPRESSION,
              method: Z_DEFLATED,
              chunkSize: 16384,
              windowBits: 15,
              memLevel: 8,
              strategy: Z_DEFAULT_STRATEGY,
              to: ""
            },
            options || {}
          )

          var opt = this.options

          if (opt.raw && opt.windowBits > 0) {
            opt.windowBits = -opt.windowBits
          } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
            opt.windowBits += 16
          }

          this.err = 0 // error code, if happens (0 = Z_OK)
          this.msg = "" // error message
          this.ended = false // used to avoid multiple onEnd() calls
          this.chunks = [] // chunks of compressed data

          this.strm = new ZStream()
          this.strm.avail_out = 0

          var status = zlib_deflate.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy)

          if (status !== Z_OK) {
            throw new Error(msg[status])
          }

          if (opt.header) {
            zlib_deflate.deflateSetHeader(this.strm, opt.header)
          }

          if (opt.dictionary) {
            var dict
            // Convert data if needed
            if (typeof opt.dictionary === "string") {
              // If we need to compress text, change encoding to utf8.
              dict = strings.string2buf(opt.dictionary)
            } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
              dict = new Uint8Array(opt.dictionary)
            } else {
              dict = opt.dictionary
            }

            status = zlib_deflate.deflateSetDictionary(this.strm, dict)

            if (status !== Z_OK) {
              throw new Error(msg[status])
            }

            this._dict_set = true
          }
        }

        /**
         * Deflate#push(data[, mode]) -> Boolean
         * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
         *   converted to utf8 byte sequence.
         * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
         *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
         *
         * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
         * new compressed chunks. Returns `true` on success. The last data block must have
         * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
         * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
         * can use mode Z_SYNC_FLUSH, keeping the compression context.
         *
         * On fail call [[Deflate#onEnd]] with error code and return false.
         *
         * We strongly recommend to use `Uint8Array` on input for best speed (output
         * array format is detected automatically). Also, don't skip last param and always
         * use the same type in your code (boolean or number). That will improve JS speed.
         *
         * For regular `Array`-s make sure all elements are [0..255].
         *
         * ##### Example
         *
         * ```javascript
         * push(chunk, false); // push one of data chunks
         * ...
         * push(chunk, true);  // push last chunk
         * ```
         **/
        Deflate.prototype.push = function (data, mode) {
          var strm = this.strm
          var chunkSize = this.options.chunkSize
          var status, _mode

          if (this.ended) {
            return false
          }

          _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH

          // Convert data if needed
          if (typeof data === "string") {
            // If we need to compress text, change encoding to utf8.
            strm.input = strings.string2buf(data)
          } else if (toString.call(data) === "[object ArrayBuffer]") {
            strm.input = new Uint8Array(data)
          } else {
            strm.input = data
          }

          strm.next_in = 0
          strm.avail_in = strm.input.length

          do {
            if (strm.avail_out === 0) {
              strm.output = new utils.Buf8(chunkSize)
              strm.next_out = 0
              strm.avail_out = chunkSize
            }
            status = zlib_deflate.deflate(strm, _mode) /* no bad return value */

            if (status !== Z_STREAM_END && status !== Z_OK) {
              this.onEnd(status)
              this.ended = true
              return false
            }
            if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
              if (this.options.to === "string") {
                this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)))
              } else {
                this.onData(utils.shrinkBuf(strm.output, strm.next_out))
              }
            }
          } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END)

          // Finalize on the last chunk.
          if (_mode === Z_FINISH) {
            status = zlib_deflate.deflateEnd(this.strm)
            this.onEnd(status)
            this.ended = true
            return status === Z_OK
          }

          // callback interim results if Z_SYNC_FLUSH.
          if (_mode === Z_SYNC_FLUSH) {
            this.onEnd(Z_OK)
            strm.avail_out = 0
            return true
          }

          return true
        }

        /**
         * Deflate#onData(chunk) -> Void
         * - chunk (Uint8Array|Array|String): output data. Type of array depends
         *   on js engine support. When string output requested, each chunk
         *   will be string.
         *
         * By default, stores data blocks in `chunks[]` property and glue
         * those in `onEnd`. Override this handler, if you need another behaviour.
         **/
        Deflate.prototype.onData = function (chunk) {
          this.chunks.push(chunk)
        }

        /**
         * Deflate#onEnd(status) -> Void
         * - status (Number): deflate status. 0 (Z_OK) on success,
         *   other if not.
         *
         * Called once after you tell deflate that the input stream is
         * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
         * or if an error happened. By default - join collected chunks,
         * free memory and fill `results` / `err` properties.
         **/
        Deflate.prototype.onEnd = function (status) {
          // On success - join
          if (status === Z_OK) {
            if (this.options.to === "string") {
              this.result = this.chunks.join("")
            } else {
              this.result = utils.flattenChunks(this.chunks)
            }
          }
          this.chunks = []
          this.err = status
          this.msg = this.strm.msg
        }

        /**
         * deflate(data[, options]) -> Uint8Array|Array|String
         * - data (Uint8Array|Array|String): input data to compress.
         * - options (Object): zlib deflate options.
         *
         * Compress `data` with deflate algorithm and `options`.
         *
         * Supported options are:
         *
         * - level
         * - windowBits
         * - memLevel
         * - strategy
         * - dictionary
         *
         * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
         * for more information on these.
         *
         * Sugar (options):
         *
         * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
         *   negative windowBits implicitly.
         * - `to` (String) - if equal to 'string', then result will be "binary string"
         *    (each char code [0..255])
         *
         * ##### Example:
         *
         * ```javascript
         * var pako = require('pako')
         *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
         *
         * console.log(pako.deflate(data));
         * ```
         **/
        function deflate(input, options) {
          var deflator = new Deflate(options)

          deflator.push(input, true)

          // That will never happens, if you don't cheat with options :)
          if (deflator.err) {
            throw deflator.msg || msg[deflator.err]
          }

          return deflator.result
        }

        /**
         * deflateRaw(data[, options]) -> Uint8Array|Array|String
         * - data (Uint8Array|Array|String): input data to compress.
         * - options (Object): zlib deflate options.
         *
         * The same as [[deflate]], but creates raw data, without wrapper
         * (header and adler32 crc).
         **/
        function deflateRaw(input, options) {
          options = options || {}
          options.raw = true
          return deflate(input, options)
        }

        /**
         * gzip(data[, options]) -> Uint8Array|Array|String
         * - data (Uint8Array|Array|String): input data to compress.
         * - options (Object): zlib deflate options.
         *
         * The same as [[deflate]], but create gzip wrapper instead of
         * deflate one.
         **/
        function gzip(input, options) {
          options = options || {}
          options.gzip = true
          return deflate(input, options)
        }

        exports.Deflate = Deflate
        exports.deflate = deflate
        exports.deflateRaw = deflateRaw
        exports.gzip = gzip

        /***/
      },
      /* 36 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        var utils = __webpack_require__(3)
        var trees = __webpack_require__(37)
        var adler32 = __webpack_require__(13)
        var crc32 = __webpack_require__(14)
        var msg = __webpack_require__(11)

        /* Public constants ==========================================================*/
        /* ===========================================================================*/

        /* Allowed flush values; see deflate() and inflate() below for details */
        var Z_NO_FLUSH = 0
        var Z_PARTIAL_FLUSH = 1
        //var Z_SYNC_FLUSH    = 2;
        var Z_FULL_FLUSH = 3
        var Z_FINISH = 4
        var Z_BLOCK = 5
        //var Z_TREES         = 6;

        /* Return codes for the compression/decompression functions. Negative values
         * are errors, positive values are used for special but normal events.
         */
        var Z_OK = 0
        var Z_STREAM_END = 1
        //var Z_NEED_DICT     = 2;
        //var Z_ERRNO         = -1;
        var Z_STREAM_ERROR = -2
        var Z_DATA_ERROR = -3
        //var Z_MEM_ERROR     = -4;
        var Z_BUF_ERROR = -5
        //var Z_VERSION_ERROR = -6;

        /* compression levels */
        //var Z_NO_COMPRESSION      = 0;
        //var Z_BEST_SPEED          = 1;
        //var Z_BEST_COMPRESSION    = 9;
        var Z_DEFAULT_COMPRESSION = -1

        var Z_FILTERED = 1
        var Z_HUFFMAN_ONLY = 2
        var Z_RLE = 3
        var Z_FIXED = 4
        var Z_DEFAULT_STRATEGY = 0

        /* Possible values of the data_type field (though see inflate()) */
        //var Z_BINARY              = 0;
        //var Z_TEXT                = 1;
        //var Z_ASCII               = 1; // = Z_TEXT
        var Z_UNKNOWN = 2

        /* The deflate compression method */
        var Z_DEFLATED = 8

        /*============================================================================*/

        var MAX_MEM_LEVEL = 9
        /* Maximum value for memLevel in deflateInit2 */
        var MAX_WBITS = 15
        /* 32K LZ77 window */
        var DEF_MEM_LEVEL = 8

        var LENGTH_CODES = 29
        /* number of length codes, not counting the special END_BLOCK code */
        var LITERALS = 256
        /* number of literal bytes 0..255 */
        var L_CODES = LITERALS + 1 + LENGTH_CODES
        /* number of Literal or Length codes, including the END_BLOCK code */
        var D_CODES = 30
        /* number of distance codes */
        var BL_CODES = 19
        /* number of codes used to transfer the bit lengths */
        var HEAP_SIZE = 2 * L_CODES + 1
        /* maximum heap size */
        var MAX_BITS = 15
        /* All codes must not exceed MAX_BITS bits */

        var MIN_MATCH = 3
        var MAX_MATCH = 258
        var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1

        var PRESET_DICT = 0x20

        var INIT_STATE = 42
        var EXTRA_STATE = 69
        var NAME_STATE = 73
        var COMMENT_STATE = 91
        var HCRC_STATE = 103
        var BUSY_STATE = 113
        var FINISH_STATE = 666

        var BS_NEED_MORE = 1 /* block not completed, need more input or more output */
        var BS_BLOCK_DONE = 2 /* block flush performed */
        var BS_FINISH_STARTED = 3 /* finish started, need only more output at next deflate */
        var BS_FINISH_DONE = 4 /* finish done, accept no more input or output */

        var OS_CODE = 0x03 // Unix :) . Don't detect, use this default.

        function err(strm, errorCode) {
          strm.msg = msg[errorCode]
          return errorCode
        }

        function rank(f) {
          return (f << 1) - (f > 4 ? 9 : 0)
        }

        function zero(buf) {
          var len = buf.length
          while (--len >= 0) {
            buf[len] = 0
          }
        }

        /* =========================================================================
         * Flush as much pending output as possible. All deflate() output goes
         * through this function so some applications may wish to modify it
         * to avoid allocating a large strm->output buffer and copying into it.
         * (See also read_buf()).
         */
        function flush_pending(strm) {
          var s = strm.state

          //_tr_flush_bits(s);
          var len = s.pending
          if (len > strm.avail_out) {
            len = strm.avail_out
          }
          if (len === 0) {
            return
          }

          utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out)
          strm.next_out += len
          s.pending_out += len
          strm.total_out += len
          strm.avail_out -= len
          s.pending -= len
          if (s.pending === 0) {
            s.pending_out = 0
          }
        }

        function flush_block_only(s, last) {
          trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last)
          s.block_start = s.strstart
          flush_pending(s.strm)
        }

        function put_byte(s, b) {
          s.pending_buf[s.pending++] = b
        }

        /* =========================================================================
         * Put a short in the pending buffer. The 16-bit value is put in MSB order.
         * IN assertion: the stream state is correct and there is enough room in
         * pending_buf.
         */
        function putShortMSB(s, b) {
          //  put_byte(s, (Byte)(b >> 8));
          //  put_byte(s, (Byte)(b & 0xff));
          s.pending_buf[s.pending++] = (b >>> 8) & 0xff
          s.pending_buf[s.pending++] = b & 0xff
        }

        /* ===========================================================================
         * Read a new buffer from the current input stream, update the adler32
         * and total number of bytes read.  All deflate() input goes through
         * this function so some applications may wish to modify it to avoid
         * allocating a large strm->input buffer and copying from it.
         * (See also flush_pending()).
         */
        function read_buf(strm, buf, start, size) {
          var len = strm.avail_in

          if (len > size) {
            len = size
          }
          if (len === 0) {
            return 0
          }

          strm.avail_in -= len

          // zmemcpy(buf, strm->next_in, len);
          utils.arraySet(buf, strm.input, strm.next_in, len, start)
          if (strm.state.wrap === 1) {
            strm.adler = adler32(strm.adler, buf, len, start)
          } else if (strm.state.wrap === 2) {
            strm.adler = crc32(strm.adler, buf, len, start)
          }

          strm.next_in += len
          strm.total_in += len

          return len
        }

        /* ===========================================================================
         * Set match_start to the longest match starting at the given string and
         * return its length. Matches shorter or equal to prev_length are discarded,
         * in which case the result is equal to prev_length and match_start is
         * garbage.
         * IN assertions: cur_match is the head of the hash chain for the current
         *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
         * OUT assertion: the match length is not greater than s->lookahead.
         */
        function longest_match(s, cur_match) {
          var chain_length = s.max_chain_length /* max hash chain length */
          var scan = s.strstart /* current string */
          var match /* matched string */
          var len /* length of current match */
          var best_len = s.prev_length /* best match length so far */
          var nice_match = s.nice_match /* stop if match long enough */
          var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0 /*NIL*/

          var _win = s.window // shortcut

          var wmask = s.w_mask
          var prev = s.prev

          /* Stop when cur_match becomes <= limit. To simplify the code,
           * we prevent matches with the string of window index 0.
           */

          var strend = s.strstart + MAX_MATCH
          var scan_end1 = _win[scan + best_len - 1]
          var scan_end = _win[scan + best_len]

          /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
           * It is easy to get rid of this optimization if necessary.
           */
          // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

          /* Do not waste too much time if we already have a good match: */
          if (s.prev_length >= s.good_match) {
            chain_length >>= 2
          }
          /* Do not look for matches beyond the end of the input. This is necessary
           * to make deflate deterministic.
           */
          if (nice_match > s.lookahead) {
            nice_match = s.lookahead
          }

          // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

          do {
            // Assert(cur_match < s->strstart, "no future");
            match = cur_match

            /* Skip to next match if the match length cannot increase
             * or if the match length is less than 2.  Note that the checks below
             * for insufficient lookahead only occur occasionally for performance
             * reasons.  Therefore uninitialized memory will be accessed, and
             * conditional jumps will be made that depend on those values.
             * However the length of the match is limited to the lookahead, so
             * the output of deflate is not affected by the uninitialized values.
             */

            if (
              _win[match + best_len] !== scan_end ||
              _win[match + best_len - 1] !== scan_end1 ||
              _win[match] !== _win[scan] ||
              _win[++match] !== _win[scan + 1]
            ) {
              continue
            }

            /* The check at best_len-1 can be removed because it will be made
             * again later. (This heuristic is not always a win.)
             * It is not necessary to compare scan[2] and match[2] since they
             * are always equal when the other bytes match, given that
             * the hash keys are equal and that HASH_BITS >= 8.
             */
            scan += 2
            match++
            // Assert(*scan == *match, "match[2]?");

            /* We check for insufficient lookahead only every 8th comparison;
             * the 256th check will be made at strstart+258.
             */
            do {
              /*jshint noempty:false*/
            } while (
              _win[++scan] === _win[++match] &&
              _win[++scan] === _win[++match] &&
              _win[++scan] === _win[++match] &&
              _win[++scan] === _win[++match] &&
              _win[++scan] === _win[++match] &&
              _win[++scan] === _win[++match] &&
              _win[++scan] === _win[++match] &&
              _win[++scan] === _win[++match] &&
              scan < strend
            )

            // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

            len = MAX_MATCH - (strend - scan)
            scan = strend - MAX_MATCH

            if (len > best_len) {
              s.match_start = cur_match
              best_len = len
              if (len >= nice_match) {
                break
              }
              scan_end1 = _win[scan + best_len - 1]
              scan_end = _win[scan + best_len]
            }
          } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0)

          if (best_len <= s.lookahead) {
            return best_len
          }
          return s.lookahead
        }

        /* ===========================================================================
         * Fill the window when the lookahead becomes insufficient.
         * Updates strstart and lookahead.
         *
         * IN assertion: lookahead < MIN_LOOKAHEAD
         * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
         *    At least one byte has been read, or avail_in == 0; reads are
         *    performed for at least two bytes (required for the zip translate_eol
         *    option -- not supported here).
         */
        function fill_window(s) {
          var _w_size = s.w_size
          var p, n, m, more, str

          //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

          do {
            more = s.window_size - s.lookahead - s.strstart

            // JS ints have 32 bit, block below not needed
            /* Deal with !@#$% 64K limit: */
            //if (sizeof(int) <= 2) {
            //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
            //        more = wsize;
            //
            //  } else if (more == (unsigned)(-1)) {
            //        /* Very unlikely, but possible on 16 bit machine if
            //         * strstart == 0 && lookahead == 1 (input done a byte at time)
            //         */
            //        more--;
            //    }
            //}

            /* If the window is almost full and there is insufficient lookahead,
             * move the upper half to the lower one to make room in the upper half.
             */
            if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
              utils.arraySet(s.window, s.window, _w_size, _w_size, 0)
              s.match_start -= _w_size
              s.strstart -= _w_size
              /* we now have strstart >= MAX_DIST */
              s.block_start -= _w_size

              /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

              n = s.hash_size
              p = n
              do {
                m = s.head[--p]
                s.head[p] = m >= _w_size ? m - _w_size : 0
              } while (--n)

              n = _w_size
              p = n
              do {
                m = s.prev[--p]
                s.prev[p] = m >= _w_size ? m - _w_size : 0
                /* If n is not on any hash chain, prev[n] is garbage but
                 * its value will never be used.
                 */
              } while (--n)

              more += _w_size
            }
            if (s.strm.avail_in === 0) {
              break
            }

            /* If there was no sliding:
             *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
             *    more == window_size - lookahead - strstart
             * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
             * => more >= window_size - 2*WSIZE + 2
             * In the BIG_MEM or MMAP case (not yet supported),
             *   window_size == input_size + MIN_LOOKAHEAD  &&
             *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
             * Otherwise, window_size == 2*WSIZE so more >= 2.
             * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
             */
            //Assert(more >= 2, "more < 2");
            n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more)
            s.lookahead += n

            /* Initialize the hash value now that we have some input: */
            if (s.lookahead + s.insert >= MIN_MATCH) {
              str = s.strstart - s.insert
              s.ins_h = s.window[str]

              /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
              s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask
              //#if MIN_MATCH != 3
              //        Call update_hash() MIN_MATCH-3 more times
              //#endif
              while (s.insert) {
                /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
                s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask

                s.prev[str & s.w_mask] = s.head[s.ins_h]
                s.head[s.ins_h] = str
                str++
                s.insert--
                if (s.lookahead + s.insert < MIN_MATCH) {
                  break
                }
              }
            }
            /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
             * but this is not important since only literal bytes will be emitted.
             */
          } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0)

          /* If the WIN_INIT bytes after the end of the current data have never been
           * written, then zero those bytes in order to avoid memory check reports of
           * the use of uninitialized (or uninitialised as Julian writes) bytes by
           * the longest match routines.  Update the high water mark for the next
           * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
           * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
           */
          //  if (s.high_water < s.window_size) {
          //    var curr = s.strstart + s.lookahead;
          //    var init = 0;
          //
          //    if (s.high_water < curr) {
          //      /* Previous high water mark below current data -- zero WIN_INIT
          //       * bytes or up to end of window, whichever is less.
          //       */
          //      init = s.window_size - curr;
          //      if (init > WIN_INIT)
          //        init = WIN_INIT;
          //      zmemzero(s->window + curr, (unsigned)init);
          //      s->high_water = curr + init;
          //    }
          //    else if (s->high_water < (ulg)curr + WIN_INIT) {
          //      /* High water mark at or above current data, but below current data
          //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
          //       * to end of window, whichever is less.
          //       */
          //      init = (ulg)curr + WIN_INIT - s->high_water;
          //      if (init > s->window_size - s->high_water)
          //        init = s->window_size - s->high_water;
          //      zmemzero(s->window + s->high_water, (unsigned)init);
          //      s->high_water += init;
          //    }
          //  }
          //
          //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
          //    "not enough room for search");
        }

        /* ===========================================================================
         * Copy without compression as much as possible from the input stream, return
         * the current block state.
         * This function does not insert new strings in the dictionary since
         * uncompressible data is probably not useful. This function is used
         * only for the level=0 compression option.
         * NOTE: this function should be optimized to avoid extra copying from
         * window to pending_buf.
         */
        function deflate_stored(s, flush) {
          /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
           * to pending_buf_size, and each stored block has a 5 byte header:
           */
          var max_block_size = 0xffff

          if (max_block_size > s.pending_buf_size - 5) {
            max_block_size = s.pending_buf_size - 5
          }

          /* Copy as much as possible from input to output: */
          for (;;) {
            /* Fill the window as much as possible: */
            if (s.lookahead <= 1) {
              //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
              //  s->block_start >= (long)s->w_size, "slide too late");
              //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
              //        s.block_start >= s.w_size)) {
              //        throw  new Error("slide too late");
              //      }

              fill_window(s)
              if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
                return BS_NEED_MORE
              }

              if (s.lookahead === 0) {
                break
              }
              /* flush the current block */
            }
            //Assert(s->block_start >= 0L, "block gone");
            //    if (s.block_start < 0) throw new Error("block gone");

            s.strstart += s.lookahead
            s.lookahead = 0

            /* Emit a stored block if pending_buf will be full: */
            var max_start = s.block_start + max_block_size

            if (s.strstart === 0 || s.strstart >= max_start) {
              /* strstart == 0 is possible when wraparound on 16-bit machine */
              s.lookahead = s.strstart - max_start
              s.strstart = max_start
              /*** FLUSH_BLOCK(s, 0); ***/
              flush_block_only(s, false)
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE
              }
              /***/
            }
            /* Flush if we may have to slide, otherwise block_start may become
             * negative and the data will be gone:
             */
            if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
              /*** FLUSH_BLOCK(s, 0); ***/
              flush_block_only(s, false)
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE
              }
              /***/
            }
          }

          s.insert = 0

          if (flush === Z_FINISH) {
            /*** FLUSH_BLOCK(s, 1); ***/
            flush_block_only(s, true)
            if (s.strm.avail_out === 0) {
              return BS_FINISH_STARTED
            }
            /***/
            return BS_FINISH_DONE
          }

          if (s.strstart > s.block_start) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false)
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE
            }
            /***/
          }

          return BS_NEED_MORE
        }

        /* ===========================================================================
         * Compress as much as possible from the input stream, return the current
         * block state.
         * This function does not perform lazy evaluation of matches and inserts
         * new strings in the dictionary only for unmatched strings or for short
         * matches. It is used only for the fast compression options.
         */
        function deflate_fast(s, flush) {
          var hash_head /* head of the hash chain */
          var bflush /* set if current block must be flushed */

          for (;;) {
            /* Make sure that we always have enough lookahead, except
             * at the end of the input file. We need MAX_MATCH bytes
             * for the next match, plus MIN_MATCH bytes to insert the
             * string following the next match.
             */
            if (s.lookahead < MIN_LOOKAHEAD) {
              fill_window(s)
              if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
                return BS_NEED_MORE
              }
              if (s.lookahead === 0) {
                break /* flush the current block */
              }
            }

            /* Insert the string window[strstart .. strstart+2] in the
             * dictionary, and set hash_head to the head of the hash chain:
             */
            hash_head = 0 /*NIL*/
            if (s.lookahead >= MIN_MATCH) {
              /*** INSERT_STRING(s, s.strstart, hash_head); ***/
              s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h]
              s.head[s.ins_h] = s.strstart
              /***/
            }

            /* Find the longest match, discarding those <= prev_length.
             * At this point we have always match_length < MIN_MATCH
             */
            if (hash_head !== 0 /*NIL*/ && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
              /* To simplify the code, we prevent matches with the string
               * of window index 0 (in particular we have to avoid a match
               * of the string with itself at the start of the input file).
               */
              s.match_length = longest_match(s, hash_head)
              /* longest_match() sets match_start */
            }
            if (s.match_length >= MIN_MATCH) {
              // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

              /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
              bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH)

              s.lookahead -= s.match_length

              /* Insert new strings in the hash table only if the match length
               * is not too large. This saves time but degrades compression.
               */
              if (s.match_length <= s.max_lazy_match /*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
                s.match_length-- /* string at strstart already in table */
                do {
                  s.strstart++
                  /*** INSERT_STRING(s, s.strstart, hash_head); ***/
                  s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask
                  hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h]
                  s.head[s.ins_h] = s.strstart
                  /***/
                  /* strstart never exceeds WSIZE-MAX_MATCH, so there are
                   * always MIN_MATCH bytes ahead.
                   */
                } while (--s.match_length !== 0)
                s.strstart++
              } else {
                s.strstart += s.match_length
                s.match_length = 0
                s.ins_h = s.window[s.strstart]
                /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
                s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask

                //#if MIN_MATCH != 3
                //                Call UPDATE_HASH() MIN_MATCH-3 more times
                //#endif
                /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
                 * matter since it will be recomputed at next deflate call.
                 */
              }
            } else {
              /* No match, output a literal byte */
              //Tracevv((stderr,"%c", s.window[s.strstart]));
              /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
              bflush = trees._tr_tally(s, 0, s.window[s.strstart])

              s.lookahead--
              s.strstart++
            }
            if (bflush) {
              /*** FLUSH_BLOCK(s, 0); ***/
              flush_block_only(s, false)
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE
              }
              /***/
            }
          }
          s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1
          if (flush === Z_FINISH) {
            /*** FLUSH_BLOCK(s, 1); ***/
            flush_block_only(s, true)
            if (s.strm.avail_out === 0) {
              return BS_FINISH_STARTED
            }
            /***/
            return BS_FINISH_DONE
          }
          if (s.last_lit) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false)
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE
            }
            /***/
          }
          return BS_BLOCK_DONE
        }

        /* ===========================================================================
         * Same as above, but achieves better compression. We use a lazy
         * evaluation for matches: a match is finally adopted only if there is
         * no better match at the next window position.
         */
        function deflate_slow(s, flush) {
          var hash_head /* head of hash chain */
          var bflush /* set if current block must be flushed */

          var max_insert

          /* Process the input block. */
          for (;;) {
            /* Make sure that we always have enough lookahead, except
             * at the end of the input file. We need MAX_MATCH bytes
             * for the next match, plus MIN_MATCH bytes to insert the
             * string following the next match.
             */
            if (s.lookahead < MIN_LOOKAHEAD) {
              fill_window(s)
              if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
                return BS_NEED_MORE
              }
              if (s.lookahead === 0) {
                break
              } /* flush the current block */
            }

            /* Insert the string window[strstart .. strstart+2] in the
             * dictionary, and set hash_head to the head of the hash chain:
             */
            hash_head = 0 /*NIL*/
            if (s.lookahead >= MIN_MATCH) {
              /*** INSERT_STRING(s, s.strstart, hash_head); ***/
              s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h]
              s.head[s.ins_h] = s.strstart
              /***/
            }

            /* Find the longest match, discarding those <= prev_length.
             */
            s.prev_length = s.match_length
            s.prev_match = s.match_start
            s.match_length = MIN_MATCH - 1

            if (hash_head !== 0 /*NIL*/ && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD /*MAX_DIST(s)*/) {
              /* To simplify the code, we prevent matches with the string
               * of window index 0 (in particular we have to avoid a match
               * of the string with itself at the start of the input file).
               */
              s.match_length = longest_match(s, hash_head)
              /* longest_match() sets match_start */

              if (
                s.match_length <= 5 &&
                (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) /*TOO_FAR*/
              ) {
                /* If prev_match is also MIN_MATCH, match_start is garbage
                 * but we will ignore the current match anyway.
                 */
                s.match_length = MIN_MATCH - 1
              }
            }
            /* If there was a match at the previous step and the current
             * match is not better, output the previous match:
             */
            if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
              max_insert = s.strstart + s.lookahead - MIN_MATCH
              /* Do not insert strings in hash table beyond this. */

              //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

              /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
              bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH)
              /* Insert in hash table all strings up to the end of the match.
               * strstart-1 and strstart are already inserted. If there is not
               * enough lookahead, the last two strings are not inserted in
               * the hash table.
               */
              s.lookahead -= s.prev_length - 1
              s.prev_length -= 2
              do {
                if (++s.strstart <= max_insert) {
                  /*** INSERT_STRING(s, s.strstart, hash_head); ***/
                  s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask
                  hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h]
                  s.head[s.ins_h] = s.strstart
                  /***/
                }
              } while (--s.prev_length !== 0)
              s.match_available = 0
              s.match_length = MIN_MATCH - 1
              s.strstart++

              if (bflush) {
                /*** FLUSH_BLOCK(s, 0); ***/
                flush_block_only(s, false)
                if (s.strm.avail_out === 0) {
                  return BS_NEED_MORE
                }
                /***/
              }
            } else if (s.match_available) {
              /* If there was no match at the previous position, output a
               * single literal. If there was a match but the current match
               * is longer, truncate the previous match to a single literal.
               */
              //Tracevv((stderr,"%c", s->window[s->strstart-1]));
              /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
              bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1])

              if (bflush) {
                /*** FLUSH_BLOCK_ONLY(s, 0) ***/
                flush_block_only(s, false)
                /***/
              }
              s.strstart++
              s.lookahead--
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE
              }
            } else {
              /* There is no previous match to compare with, wait for
               * the next step to decide.
               */
              s.match_available = 1
              s.strstart++
              s.lookahead--
            }
          }
          //Assert (flush != Z_NO_FLUSH, "no flush?");
          if (s.match_available) {
            //Tracevv((stderr,"%c", s->window[s->strstart-1]));
            /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
            bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1])

            s.match_available = 0
          }
          s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1
          if (flush === Z_FINISH) {
            /*** FLUSH_BLOCK(s, 1); ***/
            flush_block_only(s, true)
            if (s.strm.avail_out === 0) {
              return BS_FINISH_STARTED
            }
            /***/
            return BS_FINISH_DONE
          }
          if (s.last_lit) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false)
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE
            }
            /***/
          }

          return BS_BLOCK_DONE
        }

        /* ===========================================================================
         * For Z_RLE, simply look for runs of bytes, generate matches only of distance
         * one.  Do not maintain a hash table.  (It will be regenerated if this run of
         * deflate switches away from Z_RLE.)
         */
        function deflate_rle(s, flush) {
          var bflush /* set if current block must be flushed */
          var prev /* byte at distance one to match */
          var scan, strend /* scan goes up to strend for length of run */

          var _win = s.window

          for (;;) {
            /* Make sure that we always have enough lookahead, except
             * at the end of the input file. We need MAX_MATCH bytes
             * for the longest run, plus one for the unrolled loop.
             */
            if (s.lookahead <= MAX_MATCH) {
              fill_window(s)
              if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
                return BS_NEED_MORE
              }
              if (s.lookahead === 0) {
                break
              } /* flush the current block */
            }

            /* See how many times the previous byte repeats */
            s.match_length = 0
            if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
              scan = s.strstart - 1
              prev = _win[scan]
              if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
                strend = s.strstart + MAX_MATCH
                do {
                  /*jshint noempty:false*/
                } while (
                  prev === _win[++scan] &&
                  prev === _win[++scan] &&
                  prev === _win[++scan] &&
                  prev === _win[++scan] &&
                  prev === _win[++scan] &&
                  prev === _win[++scan] &&
                  prev === _win[++scan] &&
                  prev === _win[++scan] &&
                  scan < strend
                )
                s.match_length = MAX_MATCH - (strend - scan)
                if (s.match_length > s.lookahead) {
                  s.match_length = s.lookahead
                }
              }
              //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
            }

            /* Emit match if have run of MIN_MATCH or longer, else emit literal */
            if (s.match_length >= MIN_MATCH) {
              //check_match(s, s.strstart, s.strstart - 1, s.match_length);

              /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
              bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH)

              s.lookahead -= s.match_length
              s.strstart += s.match_length
              s.match_length = 0
            } else {
              /* No match, output a literal byte */
              //Tracevv((stderr,"%c", s->window[s->strstart]));
              /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
              bflush = trees._tr_tally(s, 0, s.window[s.strstart])

              s.lookahead--
              s.strstart++
            }
            if (bflush) {
              /*** FLUSH_BLOCK(s, 0); ***/
              flush_block_only(s, false)
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE
              }
              /***/
            }
          }
          s.insert = 0
          if (flush === Z_FINISH) {
            /*** FLUSH_BLOCK(s, 1); ***/
            flush_block_only(s, true)
            if (s.strm.avail_out === 0) {
              return BS_FINISH_STARTED
            }
            /***/
            return BS_FINISH_DONE
          }
          if (s.last_lit) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false)
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE
            }
            /***/
          }
          return BS_BLOCK_DONE
        }

        /* ===========================================================================
         * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
         * (It will be regenerated if this run of deflate switches away from Huffman.)
         */
        function deflate_huff(s, flush) {
          var bflush /* set if current block must be flushed */

          for (;;) {
            /* Make sure that we have a literal to write. */
            if (s.lookahead === 0) {
              fill_window(s)
              if (s.lookahead === 0) {
                if (flush === Z_NO_FLUSH) {
                  return BS_NEED_MORE
                }
                break /* flush the current block */
              }
            }

            /* Output a literal byte */
            s.match_length = 0
            //Tracevv((stderr,"%c", s->window[s->strstart]));
            /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
            bflush = trees._tr_tally(s, 0, s.window[s.strstart])
            s.lookahead--
            s.strstart++
            if (bflush) {
              /*** FLUSH_BLOCK(s, 0); ***/
              flush_block_only(s, false)
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE
              }
              /***/
            }
          }
          s.insert = 0
          if (flush === Z_FINISH) {
            /*** FLUSH_BLOCK(s, 1); ***/
            flush_block_only(s, true)
            if (s.strm.avail_out === 0) {
              return BS_FINISH_STARTED
            }
            /***/
            return BS_FINISH_DONE
          }
          if (s.last_lit) {
            /*** FLUSH_BLOCK(s, 0); ***/
            flush_block_only(s, false)
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE
            }
            /***/
          }
          return BS_BLOCK_DONE
        }

        /* Values for max_lazy_match, good_match and max_chain_length, depending on
         * the desired pack level (0..9). The values given below have been tuned to
         * exclude worst case performance for pathological files. Better values may be
         * found for specific files.
         */
        function Config(good_length, max_lazy, nice_length, max_chain, func) {
          this.good_length = good_length
          this.max_lazy = max_lazy
          this.nice_length = nice_length
          this.max_chain = max_chain
          this.func = func
        }

        var configuration_table

        configuration_table = [
          /*      good lazy nice chain */
          new Config(0, 0, 0, 0, deflate_stored) /* 0 store only */,
          new Config(4, 4, 8, 4, deflate_fast) /* 1 max speed, no lazy matches */,
          new Config(4, 5, 16, 8, deflate_fast) /* 2 */,
          new Config(4, 6, 32, 32, deflate_fast) /* 3 */,

          new Config(4, 4, 16, 16, deflate_slow) /* 4 lazy matches */,
          new Config(8, 16, 32, 32, deflate_slow) /* 5 */,
          new Config(8, 16, 128, 128, deflate_slow) /* 6 */,
          new Config(8, 32, 128, 256, deflate_slow) /* 7 */,
          new Config(32, 128, 258, 1024, deflate_slow) /* 8 */,
          new Config(32, 258, 258, 4096, deflate_slow) /* 9 max compression */
        ]

        /* ===========================================================================
         * Initialize the "longest match" routines for a new zlib stream
         */
        function lm_init(s) {
          s.window_size = 2 * s.w_size

          /*** CLEAR_HASH(s); ***/
          zero(s.head) // Fill with NIL (= 0);

          /* Set the default configuration parameters:
           */
          s.max_lazy_match = configuration_table[s.level].max_lazy
          s.good_match = configuration_table[s.level].good_length
          s.nice_match = configuration_table[s.level].nice_length
          s.max_chain_length = configuration_table[s.level].max_chain

          s.strstart = 0
          s.block_start = 0
          s.lookahead = 0
          s.insert = 0
          s.match_length = s.prev_length = MIN_MATCH - 1
          s.match_available = 0
          s.ins_h = 0
        }

        function DeflateState() {
          this.strm = null /* pointer back to this zlib stream */
          this.status = 0 /* as the name implies */
          this.pending_buf = null /* output still pending */
          this.pending_buf_size = 0 /* size of pending_buf */
          this.pending_out = 0 /* next pending byte to output to the stream */
          this.pending = 0 /* nb of bytes in the pending buffer */
          this.wrap = 0 /* bit 0 true for zlib, bit 1 true for gzip */
          this.gzhead = null /* gzip header information to write */
          this.gzindex = 0 /* where in extra, name, or comment */
          this.method = Z_DEFLATED /* can only be DEFLATED */
          this.last_flush = -1 /* value of flush param for previous deflate call */

          this.w_size = 0 /* LZ77 window size (32K by default) */
          this.w_bits = 0 /* log2(w_size)  (8..16) */
          this.w_mask = 0 /* w_size - 1 */

          this.window = null
          /* Sliding window. Input bytes are read into the second half of the window,
           * and move to the first half later to keep a dictionary of at least wSize
           * bytes. With this organization, matches are limited to a distance of
           * wSize-MAX_MATCH bytes, but this ensures that IO is always
           * performed with a length multiple of the block size.
           */

          this.window_size = 0
          /* Actual size of window: 2*wSize, except when the user input buffer
           * is directly used as sliding window.
           */

          this.prev = null
          /* Link to older string with same hash index. To limit the size of this
           * array to 64K, this link is maintained only for the last 32K strings.
           * An index in this array is thus a window index modulo 32K.
           */

          this.head = null /* Heads of the hash chains or NIL. */

          this.ins_h = 0 /* hash index of string to be inserted */
          this.hash_size = 0 /* number of elements in hash table */
          this.hash_bits = 0 /* log2(hash_size) */
          this.hash_mask = 0 /* hash_size-1 */

          this.hash_shift = 0
          /* Number of bits by which ins_h must be shifted at each input
           * step. It must be such that after MIN_MATCH steps, the oldest
           * byte no longer takes part in the hash key, that is:
           *   hash_shift * MIN_MATCH >= hash_bits
           */

          this.block_start = 0
          /* Window position at the beginning of the current output block. Gets
           * negative when the window is moved backwards.
           */

          this.match_length = 0 /* length of best match */
          this.prev_match = 0 /* previous match */
          this.match_available = 0 /* set if previous match exists */
          this.strstart = 0 /* start of string to insert */
          this.match_start = 0 /* start of matching string */
          this.lookahead = 0 /* number of valid bytes ahead in window */

          this.prev_length = 0
          /* Length of the best match at previous step. Matches not greater than this
           * are discarded. This is used in the lazy match evaluation.
           */

          this.max_chain_length = 0
          /* To speed up deflation, hash chains are never searched beyond this
           * length.  A higher limit improves compression ratio but degrades the
           * speed.
           */

          this.max_lazy_match = 0
          /* Attempt to find a better match only when the current match is strictly
           * smaller than this value. This mechanism is used only for compression
           * levels >= 4.
           */
          // That's alias to max_lazy_match, don't use directly
          //this.max_insert_length = 0;
          /* Insert new strings in the hash table only if the match length is not
           * greater than this length. This saves time but degrades compression.
           * max_insert_length is used only for compression levels <= 3.
           */

          this.level = 0 /* compression level (1..9) */
          this.strategy = 0 /* favor or force Huffman coding*/

          this.good_match = 0
          /* Use a faster search when the previous match is longer than this */

          this.nice_match = 0 /* Stop searching when current match exceeds this */

          /* used by trees.c: */

          /* Didn't use ct_data typedef below to suppress compiler warning */

          // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
          // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
          // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

          // Use flat array of DOUBLE size, with interleaved fata,
          // because JS does not support effective
          this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2)
          this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2)
          this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2)
          zero(this.dyn_ltree)
          zero(this.dyn_dtree)
          zero(this.bl_tree)

          this.l_desc = null /* desc. for literal tree */
          this.d_desc = null /* desc. for distance tree */
          this.bl_desc = null /* desc. for bit length tree */

          //ush bl_count[MAX_BITS+1];
          this.bl_count = new utils.Buf16(MAX_BITS + 1)
          /* number of codes at each bit length for an optimal tree */

          //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
          this.heap = new utils.Buf16(2 * L_CODES + 1) /* heap used to build the Huffman trees */
          zero(this.heap)

          this.heap_len = 0 /* number of elements in the heap */
          this.heap_max = 0 /* element of largest frequency */
          /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
           * The same heap array is used to build all trees.
           */

          this.depth = new utils.Buf16(2 * L_CODES + 1) //uch depth[2*L_CODES+1];
          zero(this.depth)
          /* Depth of each subtree used as tie breaker for trees of equal frequency
           */

          this.l_buf = 0 /* buffer index for literals or lengths */

          this.lit_bufsize = 0
          /* Size of match buffer for literals/lengths.  There are 4 reasons for
           * limiting lit_bufsize to 64K:
           *   - frequencies can be kept in 16 bit counters
           *   - if compression is not successful for the first block, all input
           *     data is still in the window so we can still emit a stored block even
           *     when input comes from standard input.  (This can also be done for
           *     all blocks if lit_bufsize is not greater than 32K.)
           *   - if compression is not successful for a file smaller than 64K, we can
           *     even emit a stored file instead of a stored block (saving 5 bytes).
           *     This is applicable only for zip (not gzip or zlib).
           *   - creating new Huffman trees less frequently may not provide fast
           *     adaptation to changes in the input data statistics. (Take for
           *     example a binary file with poorly compressible code followed by
           *     a highly compressible string table.) Smaller buffer sizes give
           *     fast adaptation but have of course the overhead of transmitting
           *     trees more frequently.
           *   - I can't count above 4
           */

          this.last_lit = 0 /* running index in l_buf */

          this.d_buf = 0
          /* Buffer index for distances. To simplify the code, d_buf and l_buf have
           * the same number of elements. To use different lengths, an extra flag
           * array would be necessary.
           */

          this.opt_len = 0 /* bit length of current block with optimal trees */
          this.static_len = 0 /* bit length of current block with static trees */
          this.matches = 0 /* number of string matches in current block */
          this.insert = 0 /* bytes at end of window left to insert */

          this.bi_buf = 0
          /* Output buffer. bits are inserted starting at the bottom (least
           * significant bits).
           */
          this.bi_valid = 0
          /* Number of valid bits in bi_buf.  All bits above the last valid bit
           * are always zero.
           */

          // Used for window memory init. We safely ignore it for JS. That makes
          // sense only for pointers and memory check tools.
          //this.high_water = 0;
          /* High water mark offset in window for initialized bytes -- bytes above
           * this are set to zero in order to avoid memory check warnings when
           * longest match routines access bytes past the input.  This is then
           * updated to the new high water mark.
           */
        }

        function deflateResetKeep(strm) {
          var s

          if (!strm || !strm.state) {
            return err(strm, Z_STREAM_ERROR)
          }

          strm.total_in = strm.total_out = 0
          strm.data_type = Z_UNKNOWN

          s = strm.state
          s.pending = 0
          s.pending_out = 0

          if (s.wrap < 0) {
            s.wrap = -s.wrap
            /* was made negative by deflate(..., Z_FINISH); */
          }
          s.status = s.wrap ? INIT_STATE : BUSY_STATE
          strm.adler =
            s.wrap === 2
              ? 0 // crc32(0, Z_NULL, 0)
              : 1 // adler32(0, Z_NULL, 0)
          s.last_flush = Z_NO_FLUSH
          trees._tr_init(s)
          return Z_OK
        }

        function deflateReset(strm) {
          var ret = deflateResetKeep(strm)
          if (ret === Z_OK) {
            lm_init(strm.state)
          }
          return ret
        }

        function deflateSetHeader(strm, head) {
          if (!strm || !strm.state) {
            return Z_STREAM_ERROR
          }
          if (strm.state.wrap !== 2) {
            return Z_STREAM_ERROR
          }
          strm.state.gzhead = head
          return Z_OK
        }

        function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
          if (!strm) {
            // === Z_NULL
            return Z_STREAM_ERROR
          }
          var wrap = 1

          if (level === Z_DEFAULT_COMPRESSION) {
            level = 6
          }

          if (windowBits < 0) {
            /* suppress zlib wrapper */
            wrap = 0
            windowBits = -windowBits
          } else if (windowBits > 15) {
            wrap = 2 /* write gzip wrapper instead */
            windowBits -= 16
          }

          if (
            memLevel < 1 ||
            memLevel > MAX_MEM_LEVEL ||
            method !== Z_DEFLATED ||
            windowBits < 8 ||
            windowBits > 15 ||
            level < 0 ||
            level > 9 ||
            strategy < 0 ||
            strategy > Z_FIXED
          ) {
            return err(strm, Z_STREAM_ERROR)
          }

          if (windowBits === 8) {
            windowBits = 9
          }
          /* until 256-byte window bug fixed */

          var s = new DeflateState()

          strm.state = s
          s.strm = strm

          s.wrap = wrap
          s.gzhead = null
          s.w_bits = windowBits
          s.w_size = 1 << s.w_bits
          s.w_mask = s.w_size - 1

          s.hash_bits = memLevel + 7
          s.hash_size = 1 << s.hash_bits
          s.hash_mask = s.hash_size - 1
          s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH)

          s.window = new utils.Buf8(s.w_size * 2)
          s.head = new utils.Buf16(s.hash_size)
          s.prev = new utils.Buf16(s.w_size)

          // Don't need mem init magic for JS.
          //s.high_water = 0;  /* nothing written to s->window yet */

          s.lit_bufsize = 1 << (memLevel + 6) /* 16K elements by default */

          s.pending_buf_size = s.lit_bufsize * 4

          //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
          //s->pending_buf = (uchf *) overlay;
          s.pending_buf = new utils.Buf8(s.pending_buf_size)

          // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
          //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
          s.d_buf = 1 * s.lit_bufsize

          //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
          s.l_buf = (1 + 2) * s.lit_bufsize

          s.level = level
          s.strategy = strategy
          s.method = method

          return deflateReset(strm)
        }

        function deflateInit(strm, level) {
          return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY)
        }

        function deflate(strm, flush) {
          var old_flush, s
          var beg, val // for gzip header write only

          if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
            return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR
          }

          s = strm.state

          if (!strm.output || (!strm.input && strm.avail_in !== 0) || (s.status === FINISH_STATE && flush !== Z_FINISH)) {
            return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR)
          }

          s.strm = strm /* just in case */
          old_flush = s.last_flush
          s.last_flush = flush

          /* Write the header */
          if (s.status === INIT_STATE) {
            if (s.wrap === 2) {
              // GZIP header
              strm.adler = 0 //crc32(0L, Z_NULL, 0);
              put_byte(s, 31)
              put_byte(s, 139)
              put_byte(s, 8)
              if (!s.gzhead) {
                // s->gzhead == Z_NULL
                put_byte(s, 0)
                put_byte(s, 0)
                put_byte(s, 0)
                put_byte(s, 0)
                put_byte(s, 0)
                put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0)
                put_byte(s, OS_CODE)
                s.status = BUSY_STATE
              } else {
                put_byte(
                  s,
                  (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
                )
                put_byte(s, s.gzhead.time & 0xff)
                put_byte(s, (s.gzhead.time >> 8) & 0xff)
                put_byte(s, (s.gzhead.time >> 16) & 0xff)
                put_byte(s, (s.gzhead.time >> 24) & 0xff)
                put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0)
                put_byte(s, s.gzhead.os & 0xff)
                if (s.gzhead.extra && s.gzhead.extra.length) {
                  put_byte(s, s.gzhead.extra.length & 0xff)
                  put_byte(s, (s.gzhead.extra.length >> 8) & 0xff)
                }
                if (s.gzhead.hcrc) {
                  strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0)
                }
                s.gzindex = 0
                s.status = EXTRA_STATE
              }
            } // DEFLATE header
            else {
              var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8
              var level_flags = -1

              if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
                level_flags = 0
              } else if (s.level < 6) {
                level_flags = 1
              } else if (s.level === 6) {
                level_flags = 2
              } else {
                level_flags = 3
              }
              header |= level_flags << 6
              if (s.strstart !== 0) {
                header |= PRESET_DICT
              }
              header += 31 - (header % 31)

              s.status = BUSY_STATE
              putShortMSB(s, header)

              /* Save the adler32 of the preset dictionary: */
              if (s.strstart !== 0) {
                putShortMSB(s, strm.adler >>> 16)
                putShortMSB(s, strm.adler & 0xffff)
              }
              strm.adler = 1 // adler32(0L, Z_NULL, 0);
            }
          }

          //#ifdef GZIP
          if (s.status === EXTRA_STATE) {
            if (s.gzhead.extra /* != Z_NULL*/) {
              beg = s.pending /* start of bytes to update crc */

              while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
                if (s.pending === s.pending_buf_size) {
                  if (s.gzhead.hcrc && s.pending > beg) {
                    strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg)
                  }
                  flush_pending(strm)
                  beg = s.pending
                  if (s.pending === s.pending_buf_size) {
                    break
                  }
                }
                put_byte(s, s.gzhead.extra[s.gzindex] & 0xff)
                s.gzindex++
              }
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg)
              }
              if (s.gzindex === s.gzhead.extra.length) {
                s.gzindex = 0
                s.status = NAME_STATE
              }
            } else {
              s.status = NAME_STATE
            }
          }
          if (s.status === NAME_STATE) {
            if (s.gzhead.name /* != Z_NULL*/) {
              beg = s.pending /* start of bytes to update crc */
              //int val;

              do {
                if (s.pending === s.pending_buf_size) {
                  if (s.gzhead.hcrc && s.pending > beg) {
                    strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg)
                  }
                  flush_pending(strm)
                  beg = s.pending
                  if (s.pending === s.pending_buf_size) {
                    val = 1
                    break
                  }
                }
                // JS specific: little magic to add zero terminator to end of string
                if (s.gzindex < s.gzhead.name.length) {
                  val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff
                } else {
                  val = 0
                }
                put_byte(s, val)
              } while (val !== 0)

              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg)
              }
              if (val === 0) {
                s.gzindex = 0
                s.status = COMMENT_STATE
              }
            } else {
              s.status = COMMENT_STATE
            }
          }
          if (s.status === COMMENT_STATE) {
            if (s.gzhead.comment /* != Z_NULL*/) {
              beg = s.pending /* start of bytes to update crc */
              //int val;

              do {
                if (s.pending === s.pending_buf_size) {
                  if (s.gzhead.hcrc && s.pending > beg) {
                    strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg)
                  }
                  flush_pending(strm)
                  beg = s.pending
                  if (s.pending === s.pending_buf_size) {
                    val = 1
                    break
                  }
                }
                // JS specific: little magic to add zero terminator to end of string
                if (s.gzindex < s.gzhead.comment.length) {
                  val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff
                } else {
                  val = 0
                }
                put_byte(s, val)
              } while (val !== 0)

              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg)
              }
              if (val === 0) {
                s.status = HCRC_STATE
              }
            } else {
              s.status = HCRC_STATE
            }
          }
          if (s.status === HCRC_STATE) {
            if (s.gzhead.hcrc) {
              if (s.pending + 2 > s.pending_buf_size) {
                flush_pending(strm)
              }
              if (s.pending + 2 <= s.pending_buf_size) {
                put_byte(s, strm.adler & 0xff)
                put_byte(s, (strm.adler >> 8) & 0xff)
                strm.adler = 0 //crc32(0L, Z_NULL, 0);
                s.status = BUSY_STATE
              }
            } else {
              s.status = BUSY_STATE
            }
          }
          //#endif

          /* Flush as much pending output as possible */
          if (s.pending !== 0) {
            flush_pending(strm)
            if (strm.avail_out === 0) {
              /* Since avail_out is 0, deflate will be called again with
               * more output space, but possibly with both pending and
               * avail_in equal to zero. There won't be anything to do,
               * but this is not an error situation so make sure we
               * return OK instead of BUF_ERROR at next call of deflate:
               */
              s.last_flush = -1
              return Z_OK
            }

            /* Make sure there is something to do and avoid duplicate consecutive
             * flushes. For repeated and useless calls with Z_FINISH, we keep
             * returning Z_STREAM_END instead of Z_BUF_ERROR.
             */
          } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
            return err(strm, Z_BUF_ERROR)
          }

          /* User must not provide more input after the first FINISH: */
          if (s.status === FINISH_STATE && strm.avail_in !== 0) {
            return err(strm, Z_BUF_ERROR)
          }

          /* Start a new block or continue the current one.
           */
          if (strm.avail_in !== 0 || s.lookahead !== 0 || (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
            var bstate =
              s.strategy === Z_HUFFMAN_ONLY
                ? deflate_huff(s, flush)
                : s.strategy === Z_RLE
                ? deflate_rle(s, flush)
                : configuration_table[s.level].func(s, flush)

            if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
              s.status = FINISH_STATE
            }
            if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
              if (strm.avail_out === 0) {
                s.last_flush = -1
                /* avoid BUF_ERROR next call, see above */
              }
              return Z_OK
              /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
               * of deflate should use the same flush parameter to make sure
               * that the flush is complete. So we don't have to output an
               * empty block here, this will be done at next call. This also
               * ensures that for a very small output buffer, we emit at most
               * one empty block.
               */
            }
            if (bstate === BS_BLOCK_DONE) {
              if (flush === Z_PARTIAL_FLUSH) {
                trees._tr_align(s)
              } else if (flush !== Z_BLOCK) {
                /* FULL_FLUSH or SYNC_FLUSH */

                trees._tr_stored_block(s, 0, 0, false)
                /* For a full flush, this empty block will be recognized
                 * as a special marker by inflate_sync().
                 */
                if (flush === Z_FULL_FLUSH) {
                  /*** CLEAR_HASH(s); ***/ /* forget history */
                  zero(s.head) // Fill with NIL (= 0);

                  if (s.lookahead === 0) {
                    s.strstart = 0
                    s.block_start = 0
                    s.insert = 0
                  }
                }
              }
              flush_pending(strm)
              if (strm.avail_out === 0) {
                s.last_flush = -1 /* avoid BUF_ERROR at next call, see above */
                return Z_OK
              }
            }
          }
          //Assert(strm->avail_out > 0, "bug2");
          //if (strm.avail_out <= 0) { throw new Error("bug2");}

          if (flush !== Z_FINISH) {
            return Z_OK
          }
          if (s.wrap <= 0) {
            return Z_STREAM_END
          }

          /* Write the trailer */
          if (s.wrap === 2) {
            put_byte(s, strm.adler & 0xff)
            put_byte(s, (strm.adler >> 8) & 0xff)
            put_byte(s, (strm.adler >> 16) & 0xff)
            put_byte(s, (strm.adler >> 24) & 0xff)
            put_byte(s, strm.total_in & 0xff)
            put_byte(s, (strm.total_in >> 8) & 0xff)
            put_byte(s, (strm.total_in >> 16) & 0xff)
            put_byte(s, (strm.total_in >> 24) & 0xff)
          } else {
            putShortMSB(s, strm.adler >>> 16)
            putShortMSB(s, strm.adler & 0xffff)
          }

          flush_pending(strm)
          /* If avail_out is zero, the application will call deflate again
           * to flush the rest.
           */
          if (s.wrap > 0) {
            s.wrap = -s.wrap
          }
          /* write the trailer only once! */
          return s.pending !== 0 ? Z_OK : Z_STREAM_END
        }

        function deflateEnd(strm) {
          var status

          if (!strm /*== Z_NULL*/ || !strm.state /*== Z_NULL*/) {
            return Z_STREAM_ERROR
          }

          status = strm.state.status
          if (
            status !== INIT_STATE &&
            status !== EXTRA_STATE &&
            status !== NAME_STATE &&
            status !== COMMENT_STATE &&
            status !== HCRC_STATE &&
            status !== BUSY_STATE &&
            status !== FINISH_STATE
          ) {
            return err(strm, Z_STREAM_ERROR)
          }

          strm.state = null

          return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK
        }

        /* =========================================================================
         * Initializes the compression dictionary from the given byte
         * sequence without producing any compressed output.
         */
        function deflateSetDictionary(strm, dictionary) {
          var dictLength = dictionary.length

          var s
          var str, n
          var wrap
          var avail
          var next
          var input
          var tmpDict

          if (!strm /*== Z_NULL*/ || !strm.state /*== Z_NULL*/) {
            return Z_STREAM_ERROR
          }

          s = strm.state
          wrap = s.wrap

          if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
            return Z_STREAM_ERROR
          }

          /* when using zlib wrappers, compute Adler-32 for provided dictionary */
          if (wrap === 1) {
            /* adler32(strm->adler, dictionary, dictLength); */
            strm.adler = adler32(strm.adler, dictionary, dictLength, 0)
          }

          s.wrap = 0 /* avoid computing Adler-32 in read_buf */

          /* if dictionary would fill window, just replace the history */
          if (dictLength >= s.w_size) {
            if (wrap === 0) {
              /* already empty otherwise */
              /*** CLEAR_HASH(s); ***/
              zero(s.head) // Fill with NIL (= 0);
              s.strstart = 0
              s.block_start = 0
              s.insert = 0
            }
            /* use the tail */
            // dictionary = dictionary.slice(dictLength - s.w_size);
            tmpDict = new utils.Buf8(s.w_size)
            utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0)
            dictionary = tmpDict
            dictLength = s.w_size
          }
          /* insert dictionary into window and hash */
          avail = strm.avail_in
          next = strm.next_in
          input = strm.input
          strm.avail_in = dictLength
          strm.next_in = 0
          strm.input = dictionary
          fill_window(s)
          while (s.lookahead >= MIN_MATCH) {
            str = s.strstart
            n = s.lookahead - (MIN_MATCH - 1)
            do {
              /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
              s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask

              s.prev[str & s.w_mask] = s.head[s.ins_h]

              s.head[s.ins_h] = str
              str++
            } while (--n)
            s.strstart = str
            s.lookahead = MIN_MATCH - 1
            fill_window(s)
          }
          s.strstart += s.lookahead
          s.block_start = s.strstart
          s.insert = s.lookahead
          s.lookahead = 0
          s.match_length = s.prev_length = MIN_MATCH - 1
          s.match_available = 0
          strm.next_in = next
          strm.input = input
          strm.avail_in = avail
          s.wrap = wrap
          return Z_OK
        }

        exports.deflateInit = deflateInit
        exports.deflateInit2 = deflateInit2
        exports.deflateReset = deflateReset
        exports.deflateResetKeep = deflateResetKeep
        exports.deflateSetHeader = deflateSetHeader
        exports.deflate = deflate
        exports.deflateEnd = deflateEnd
        exports.deflateSetDictionary = deflateSetDictionary
        exports.deflateInfo = "pako deflate (from Nodeca project)"

        /* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

        /***/
      },
      /* 37 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        /* eslint-disable space-unary-ops */

        var utils = __webpack_require__(3)

        /* Public constants ==========================================================*/
        /* ===========================================================================*/

        //var Z_FILTERED          = 1;
        //var Z_HUFFMAN_ONLY      = 2;
        //var Z_RLE               = 3;
        var Z_FIXED = 4
        //var Z_DEFAULT_STRATEGY  = 0;

        /* Possible values of the data_type field (though see inflate()) */
        var Z_BINARY = 0
        var Z_TEXT = 1
        //var Z_ASCII             = 1; // = Z_TEXT
        var Z_UNKNOWN = 2

        /*============================================================================*/

        function zero(buf) {
          var len = buf.length
          while (--len >= 0) {
            buf[len] = 0
          }
        }

        // From zutil.h

        var STORED_BLOCK = 0
        var STATIC_TREES = 1
        var DYN_TREES = 2
        /* The three kinds of block type */

        var MIN_MATCH = 3
        var MAX_MATCH = 258
        /* The minimum and maximum match lengths */

        // From deflate.h
        /* ===========================================================================
         * Internal compression state.
         */

        var LENGTH_CODES = 29
        /* number of length codes, not counting the special END_BLOCK code */

        var LITERALS = 256
        /* number of literal bytes 0..255 */

        var L_CODES = LITERALS + 1 + LENGTH_CODES
        /* number of Literal or Length codes, including the END_BLOCK code */

        var D_CODES = 30
        /* number of distance codes */

        var BL_CODES = 19
        /* number of codes used to transfer the bit lengths */

        var HEAP_SIZE = 2 * L_CODES + 1
        /* maximum heap size */

        var MAX_BITS = 15
        /* All codes must not exceed MAX_BITS bits */

        var Buf_size = 16
        /* size of bit buffer in bi_buf */

        /* ===========================================================================
         * Constants
         */

        var MAX_BL_BITS = 7
        /* Bit length codes must not exceed MAX_BL_BITS bits */

        var END_BLOCK = 256
        /* end of block literal code */

        var REP_3_6 = 16
        /* repeat previous bit length 3-6 times (2 bits of repeat count) */

        var REPZ_3_10 = 17
        /* repeat a zero length 3-10 times  (3 bits of repeat count) */

        var REPZ_11_138 = 18
        /* repeat a zero length 11-138 times  (7 bits of repeat count) */

        /* eslint-disable comma-spacing,array-bracket-spacing */
        var extra_lbits =
          /* extra bits for each length code */
          [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]

        var extra_dbits =
          /* extra bits for each distance code */
          [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]

        var extra_blbits = /* extra bits for each bit length code */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]

        var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
        /* eslint-enable comma-spacing,array-bracket-spacing */

        /* The lengths of the bit length codes are sent in order of decreasing
         * probability, to avoid transmitting the lengths for unused bit length codes.
         */

        /* ===========================================================================
         * Local data. These are initialized only once.
         */

        // We pre-fill arrays with 0 to avoid uninitialized gaps

        var DIST_CODE_LEN = 512 /* see definition of array dist_code below */

        // !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
        var static_ltree = new Array((L_CODES + 2) * 2)
        zero(static_ltree)
        /* The static literal tree. Since the bit lengths are imposed, there is no
         * need for the L_CODES extra codes used during heap construction. However
         * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
         * below).
         */

        var static_dtree = new Array(D_CODES * 2)
        zero(static_dtree)
        /* The static distance tree. (Actually a trivial tree since all codes use
         * 5 bits.)
         */

        var _dist_code = new Array(DIST_CODE_LEN)
        zero(_dist_code)
        /* Distance codes. The first 256 values correspond to the distances
         * 3 .. 258, the last 256 values correspond to the top 8 bits of
         * the 15 bit distances.
         */

        var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1)
        zero(_length_code)
        /* length code for each normalized match length (0 == MIN_MATCH) */

        var base_length = new Array(LENGTH_CODES)
        zero(base_length)
        /* First normalized length for each code (0 = MIN_MATCH) */

        var base_dist = new Array(D_CODES)
        zero(base_dist)
        /* First normalized distance for each code (0 = distance of 1) */

        function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
          this.static_tree = static_tree /* static tree or NULL */
          this.extra_bits = extra_bits /* extra bits for each code or NULL */
          this.extra_base = extra_base /* base index for extra_bits */
          this.elems = elems /* max number of elements in the tree */
          this.max_length = max_length /* max bit length for the codes */

          // show if `static_tree` has data or dummy - needed for monomorphic objects
          this.has_stree = static_tree && static_tree.length
        }

        var static_l_desc
        var static_d_desc
        var static_bl_desc

        function TreeDesc(dyn_tree, stat_desc) {
          this.dyn_tree = dyn_tree /* the dynamic tree */
          this.max_code = 0 /* largest code with non zero frequency */
          this.stat_desc = stat_desc /* the corresponding static tree */
        }

        function d_code(dist) {
          return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)]
        }

        /* ===========================================================================
         * Output a short LSB first on the stream.
         * IN assertion: there is enough room in pendingBuf.
         */
        function put_short(s, w) {
          //    put_byte(s, (uch)((w) & 0xff));
          //    put_byte(s, (uch)((ush)(w) >> 8));
          s.pending_buf[s.pending++] = w & 0xff
          s.pending_buf[s.pending++] = (w >>> 8) & 0xff
        }

        /* ===========================================================================
         * Send a value on a given number of bits.
         * IN assertion: length <= 16 and value fits in length bits.
         */
        function send_bits(s, value, length) {
          if (s.bi_valid > Buf_size - length) {
            s.bi_buf |= (value << s.bi_valid) & 0xffff
            put_short(s, s.bi_buf)
            s.bi_buf = value >> (Buf_size - s.bi_valid)
            s.bi_valid += length - Buf_size
          } else {
            s.bi_buf |= (value << s.bi_valid) & 0xffff
            s.bi_valid += length
          }
        }

        function send_code(s, c, tree) {
          send_bits(s, tree[c * 2] /*.Code*/, tree[c * 2 + 1] /*.Len*/)
        }

        /* ===========================================================================
         * Reverse the first len bits of a code, using straightforward code (a faster
         * method would use a table)
         * IN assertion: 1 <= len <= 15
         */
        function bi_reverse(code, len) {
          var res = 0
          do {
            res |= code & 1
            code >>>= 1
            res <<= 1
          } while (--len > 0)
          return res >>> 1
        }

        /* ===========================================================================
         * Flush the bit buffer, keeping at most 7 bits in it.
         */
        function bi_flush(s) {
          if (s.bi_valid === 16) {
            put_short(s, s.bi_buf)
            s.bi_buf = 0
            s.bi_valid = 0
          } else if (s.bi_valid >= 8) {
            s.pending_buf[s.pending++] = s.bi_buf & 0xff
            s.bi_buf >>= 8
            s.bi_valid -= 8
          }
        }

        /* ===========================================================================
         * Compute the optimal bit lengths for a tree and update the total bit length
         * for the current block.
         * IN assertion: the fields freq and dad are set, heap[heap_max] and
         *    above are the tree nodes sorted by increasing frequency.
         * OUT assertions: the field len is set to the optimal bit length, the
         *     array bl_count contains the frequencies for each bit length.
         *     The length opt_len is updated; static_len is also updated if stree is
         *     not null.
         */
        function gen_bitlen(s, desc) {
          //    deflate_state *s;
          //    tree_desc *desc;    /* the tree descriptor */
          var tree = desc.dyn_tree
          var max_code = desc.max_code
          var stree = desc.stat_desc.static_tree
          var has_stree = desc.stat_desc.has_stree
          var extra = desc.stat_desc.extra_bits
          var base = desc.stat_desc.extra_base
          var max_length = desc.stat_desc.max_length
          var h /* heap index */
          var n, m /* iterate over the tree elements */
          var bits /* bit length */
          var xbits /* extra bits */
          var f /* frequency */
          var overflow = 0 /* number of elements with bit length too large */

          for (bits = 0; bits <= MAX_BITS; bits++) {
            s.bl_count[bits] = 0
          }

          /* In a first pass, compute the optimal bit lengths (which may
           * overflow in the case of the bit length tree).
           */
          tree[s.heap[s.heap_max] * 2 + 1] /*.Len*/ = 0 /* root of the heap */

          for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
            n = s.heap[h]
            bits = tree[tree[n * 2 + 1] /*.Dad*/ * 2 + 1] /*.Len*/ + 1
            if (bits > max_length) {
              bits = max_length
              overflow++
            }
            tree[n * 2 + 1] /*.Len*/ = bits
            /* We overwrite tree[n].Dad which is no longer needed */

            if (n > max_code) {
              continue
            } /* not a leaf node */

            s.bl_count[bits]++
            xbits = 0
            if (n >= base) {
              xbits = extra[n - base]
            }
            f = tree[n * 2] /*.Freq*/
            s.opt_len += f * (bits + xbits)
            if (has_stree) {
              s.static_len += f * (stree[n * 2 + 1] /*.Len*/ + xbits)
            }
          }
          if (overflow === 0) {
            return
          }

          // Trace((stderr,"\nbit length overflow\n"));
          /* This happens for example on obj2 and pic of the Calgary corpus */

          /* Find the first bit length which could increase: */
          do {
            bits = max_length - 1
            while (s.bl_count[bits] === 0) {
              bits--
            }
            s.bl_count[bits]-- /* move one leaf down the tree */
            s.bl_count[bits + 1] += 2 /* move one overflow item as its brother */
            s.bl_count[max_length]--
            /* The brother of the overflow item also moves one step up,
             * but this does not affect bl_count[max_length]
             */
            overflow -= 2
          } while (overflow > 0)

          /* Now recompute all bit lengths, scanning in increasing frequency.
           * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
           * lengths instead of fixing only the wrong ones. This idea is taken
           * from 'ar' written by Haruhiko Okumura.)
           */
          for (bits = max_length; bits !== 0; bits--) {
            n = s.bl_count[bits]
            while (n !== 0) {
              m = s.heap[--h]
              if (m > max_code) {
                continue
              }
              if (tree[m * 2 + 1] /*.Len*/ !== bits) {
                // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
                s.opt_len += (bits - tree[m * 2 + 1]) /*.Len*/ * tree[m * 2] /*.Freq*/
                tree[m * 2 + 1] /*.Len*/ = bits
              }
              n--
            }
          }
        }

        /* ===========================================================================
         * Generate the codes for a given tree and bit counts (which need not be
         * optimal).
         * IN assertion: the array bl_count contains the bit length statistics for
         * the given tree and the field len is set for all tree elements.
         * OUT assertion: the field code is set for all tree elements of non
         *     zero code length.
         */
        function gen_codes(tree, max_code, bl_count) {
          //    ct_data *tree;             /* the tree to decorate */
          //    int max_code;              /* largest code with non zero frequency */
          //    ushf *bl_count;            /* number of codes at each bit length */
          var next_code = new Array(MAX_BITS + 1) /* next code value for each bit length */
          var code = 0 /* running code value */
          var bits /* bit index */
          var n /* code index */

          /* The distribution counts are first used to generate the code values
           * without bit reversal.
           */
          for (bits = 1; bits <= MAX_BITS; bits++) {
            next_code[bits] = code = (code + bl_count[bits - 1]) << 1
          }
          /* Check that the bit counts in bl_count are consistent. The last code
           * must be all ones.
           */
          //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
          //        "inconsistent bit counts");
          //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

          for (n = 0; n <= max_code; n++) {
            var len = tree[n * 2 + 1] /*.Len*/
            if (len === 0) {
              continue
            }
            /* Now reverse the bits */
            tree[n * 2] /*.Code*/ = bi_reverse(next_code[len]++, len)

            //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
            //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
          }
        }

        /* ===========================================================================
         * Initialize the various 'constant' tables.
         */
        function tr_static_init() {
          var n /* iterates over tree elements */
          var bits /* bit counter */
          var length /* length value */
          var code /* code value */
          var dist /* distance index */
          var bl_count = new Array(MAX_BITS + 1)
          /* number of codes at each bit length for an optimal tree */

          // do check in _tr_init()
          //if (static_init_done) return;

          /* For some embedded targets, global variables are not initialized: */
          /*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

          /* Initialize the mapping length (0..255) -> length code (0..28) */
          length = 0
          for (code = 0; code < LENGTH_CODES - 1; code++) {
            base_length[code] = length
            for (n = 0; n < 1 << extra_lbits[code]; n++) {
              _length_code[length++] = code
            }
          }
          //Assert (length == 256, "tr_static_init: length != 256");
          /* Note that the length 255 (match length 258) can be represented
           * in two different ways: code 284 + 5 bits or code 285, so we
           * overwrite length_code[255] to use the best encoding:
           */
          _length_code[length - 1] = code

          /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
          dist = 0
          for (code = 0; code < 16; code++) {
            base_dist[code] = dist
            for (n = 0; n < 1 << extra_dbits[code]; n++) {
              _dist_code[dist++] = code
            }
          }
          //Assert (dist == 256, "tr_static_init: dist != 256");
          dist >>= 7 /* from now on, all distances are divided by 128 */
          for (; code < D_CODES; code++) {
            base_dist[code] = dist << 7
            for (n = 0; n < 1 << (extra_dbits[code] - 7); n++) {
              _dist_code[256 + dist++] = code
            }
          }
          //Assert (dist == 256, "tr_static_init: 256+dist != 512");

          /* Construct the codes of the static literal tree */
          for (bits = 0; bits <= MAX_BITS; bits++) {
            bl_count[bits] = 0
          }

          n = 0
          while (n <= 143) {
            static_ltree[n * 2 + 1] /*.Len*/ = 8
            n++
            bl_count[8]++
          }
          while (n <= 255) {
            static_ltree[n * 2 + 1] /*.Len*/ = 9
            n++
            bl_count[9]++
          }
          while (n <= 279) {
            static_ltree[n * 2 + 1] /*.Len*/ = 7
            n++
            bl_count[7]++
          }
          while (n <= 287) {
            static_ltree[n * 2 + 1] /*.Len*/ = 8
            n++
            bl_count[8]++
          }
          /* Codes 286 and 287 do not exist, but we must include them in the
           * tree construction to get a canonical Huffman tree (longest code
           * all ones)
           */
          gen_codes(static_ltree, L_CODES + 1, bl_count)

          /* The static distance tree is trivial: */
          for (n = 0; n < D_CODES; n++) {
            static_dtree[n * 2 + 1] /*.Len*/ = 5
            static_dtree[n * 2] /*.Code*/ = bi_reverse(n, 5)
          }

          // Now data ready and we can init static trees
          static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS)
          static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS)
          static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS)

          //static_init_done = true;
        }

        /* ===========================================================================
         * Initialize a new block.
         */
        function init_block(s) {
          var n /* iterates over tree elements */

          /* Initialize the trees. */
          for (n = 0; n < L_CODES; n++) {
            s.dyn_ltree[n * 2] /*.Freq*/ = 0
          }
          for (n = 0; n < D_CODES; n++) {
            s.dyn_dtree[n * 2] /*.Freq*/ = 0
          }
          for (n = 0; n < BL_CODES; n++) {
            s.bl_tree[n * 2] /*.Freq*/ = 0
          }

          s.dyn_ltree[END_BLOCK * 2] /*.Freq*/ = 1
          s.opt_len = s.static_len = 0
          s.last_lit = s.matches = 0
        }

        /* ===========================================================================
         * Flush the bit buffer and align the output on a byte boundary
         */
        function bi_windup(s) {
          if (s.bi_valid > 8) {
            put_short(s, s.bi_buf)
          } else if (s.bi_valid > 0) {
            //put_byte(s, (Byte)s->bi_buf);
            s.pending_buf[s.pending++] = s.bi_buf
          }
          s.bi_buf = 0
          s.bi_valid = 0
        }

        /* ===========================================================================
         * Copy a stored block, storing first the length and its
         * one's complement if requested.
         */
        function copy_block(s, buf, len, header) {
          //DeflateState *s;
          //charf    *buf;    /* the input data */
          //unsigned len;     /* its length */
          //int      header;  /* true if block header must be written */
          bi_windup(s) /* align on byte boundary */

          if (header) {
            put_short(s, len)
            put_short(s, ~len)
          }
          //  while (len--) {
          //    put_byte(s, *buf++);
          //  }
          utils.arraySet(s.pending_buf, s.window, buf, len, s.pending)
          s.pending += len
        }

        /* ===========================================================================
         * Compares to subtrees, using the tree depth as tie breaker when
         * the subtrees have equal frequency. This minimizes the worst case length.
         */
        function smaller(tree, n, m, depth) {
          var _n2 = n * 2
          var _m2 = m * 2
          return tree[_n2] /*.Freq*/ < tree[_m2] /*.Freq*/ || (tree[_n2] /*.Freq*/ === tree[_m2] /*.Freq*/ && depth[n] <= depth[m])
        }

        /* ===========================================================================
         * Restore the heap property by moving down the tree starting at node k,
         * exchanging a node with the smallest of its two sons if necessary, stopping
         * when the heap property is re-established (each father smaller than its
         * two sons).
         */
        function pqdownheap(s, tree, k) {
          //    deflate_state *s;
          //    ct_data *tree;  /* the tree to restore */
          //    int k;               /* node to move down */
          var v = s.heap[k]
          var j = k << 1 /* left son of k */
          while (j <= s.heap_len) {
            /* Set j to the smallest of the two sons: */
            if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
              j++
            }
            /* Exit if v is smaller than both sons */
            if (smaller(tree, v, s.heap[j], s.depth)) {
              break
            }

            /* Exchange v with the smallest son */
            s.heap[k] = s.heap[j]
            k = j

            /* And continue down the tree, setting j to the left son of k */
            j <<= 1
          }
          s.heap[k] = v
        }

        // inlined manually
        // var SMALLEST = 1;

        /* ===========================================================================
         * Send the block data compressed using the given Huffman trees
         */
        function compress_block(s, ltree, dtree) {
          //    deflate_state *s;
          //    const ct_data *ltree; /* literal tree */
          //    const ct_data *dtree; /* distance tree */
          var dist /* distance of matched string */
          var lc /* match length or unmatched char (if dist == 0) */
          var lx = 0 /* running index in l_buf */
          var code /* the code to send */
          var extra /* number of extra bits to send */

          if (s.last_lit !== 0) {
            do {
              dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | s.pending_buf[s.d_buf + lx * 2 + 1]
              lc = s.pending_buf[s.l_buf + lx]
              lx++

              if (dist === 0) {
                send_code(s, lc, ltree) /* send a literal byte */
                //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
              } else {
                /* Here, lc is the match length - MIN_MATCH */
                code = _length_code[lc]
                send_code(s, code + LITERALS + 1, ltree) /* send the length code */
                extra = extra_lbits[code]
                if (extra !== 0) {
                  lc -= base_length[code]
                  send_bits(s, lc, extra) /* send the extra length bits */
                }
                dist-- /* dist is now the match distance - 1 */
                code = d_code(dist)
                //Assert (code < D_CODES, "bad d_code");

                send_code(s, code, dtree) /* send the distance code */
                extra = extra_dbits[code]
                if (extra !== 0) {
                  dist -= base_dist[code]
                  send_bits(s, dist, extra) /* send the extra distance bits */
                }
              } /* literal or match pair ? */

              /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
              //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
              //       "pendingBuf overflow");
            } while (lx < s.last_lit)
          }

          send_code(s, END_BLOCK, ltree)
        }

        /* ===========================================================================
         * Construct one Huffman tree and assigns the code bit strings and lengths.
         * Update the total bit length for the current block.
         * IN assertion: the field freq is set for all tree elements.
         * OUT assertions: the fields len and code are set to the optimal bit length
         *     and corresponding code. The length opt_len is updated; static_len is
         *     also updated if stree is not null. The field max_code is set.
         */
        function build_tree(s, desc) {
          //    deflate_state *s;
          //    tree_desc *desc; /* the tree descriptor */
          var tree = desc.dyn_tree
          var stree = desc.stat_desc.static_tree
          var has_stree = desc.stat_desc.has_stree
          var elems = desc.stat_desc.elems
          var n, m /* iterate over heap elements */
          var max_code = -1 /* largest code with non zero frequency */
          var node /* new node being created */

          /* Construct the initial heap, with least frequent element in
           * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
           * heap[0] is not used.
           */
          s.heap_len = 0
          s.heap_max = HEAP_SIZE

          for (n = 0; n < elems; n++) {
            if (tree[n * 2] /*.Freq*/ !== 0) {
              s.heap[++s.heap_len] = max_code = n
              s.depth[n] = 0
            } else {
              tree[n * 2 + 1] /*.Len*/ = 0
            }
          }

          /* The pkzip format requires that at least one distance code exists,
           * and that at least one bit should be sent even if there is only one
           * possible code. So to avoid special checks later on we force at least
           * two codes of non zero frequency.
           */
          while (s.heap_len < 2) {
            node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0
            tree[node * 2] /*.Freq*/ = 1
            s.depth[node] = 0
            s.opt_len--

            if (has_stree) {
              s.static_len -= stree[node * 2 + 1] /*.Len*/
            }
            /* node is 0 or 1 so it does not have extra bits */
          }
          desc.max_code = max_code

          /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
           * establish sub-heaps of increasing lengths:
           */
          for (n = s.heap_len >> 1 /*int /2*/; n >= 1; n--) {
            pqdownheap(s, tree, n)
          }

          /* Construct the Huffman tree by repeatedly combining the least two
           * frequent nodes.
           */
          node = elems /* next internal node of the tree */
          do {
            //pqremove(s, tree, n);  /* n = node of least frequency */
            /*** pqremove ***/
            n = s.heap[1 /*SMALLEST*/]
            s.heap[1 /*SMALLEST*/] = s.heap[s.heap_len--]
            pqdownheap(s, tree, 1 /*SMALLEST*/)
            /***/

            m = s.heap[1 /*SMALLEST*/] /* m = node of next least frequency */

            s.heap[--s.heap_max] = n /* keep the nodes sorted by frequency */
            s.heap[--s.heap_max] = m

            /* Create a new node father of n and m */
            tree[node * 2] /*.Freq*/ = tree[n * 2] /*.Freq*/ + tree[m * 2] /*.Freq*/
            s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1
            tree[n * 2 + 1] /*.Dad*/ = tree[m * 2 + 1] /*.Dad*/ = node

            /* and insert the new node in the heap */
            s.heap[1 /*SMALLEST*/] = node++
            pqdownheap(s, tree, 1 /*SMALLEST*/)
          } while (s.heap_len >= 2)

          s.heap[--s.heap_max] = s.heap[1 /*SMALLEST*/]

          /* At this point, the fields freq and dad are set. We can now
           * generate the bit lengths.
           */
          gen_bitlen(s, desc)

          /* The field len is now set, we can generate the bit codes */
          gen_codes(tree, max_code, s.bl_count)
        }

        /* ===========================================================================
         * Scan a literal or distance tree to determine the frequencies of the codes
         * in the bit length tree.
         */
        function scan_tree(s, tree, max_code) {
          //    deflate_state *s;
          //    ct_data *tree;   /* the tree to be scanned */
          //    int max_code;    /* and its largest code of non zero frequency */
          var n /* iterates over all tree elements */
          var prevlen = -1 /* last emitted length */
          var curlen /* length of current code */

          var nextlen = tree[0 * 2 + 1] /*.Len*/ /* length of next code */

          var count = 0 /* repeat count of the current code */
          var max_count = 7 /* max repeat count */
          var min_count = 4 /* min repeat count */

          if (nextlen === 0) {
            max_count = 138
            min_count = 3
          }
          tree[(max_code + 1) * 2 + 1] /*.Len*/ = 0xffff /* guard */

          for (n = 0; n <= max_code; n++) {
            curlen = nextlen
            nextlen = tree[(n + 1) * 2 + 1] /*.Len*/

            if (++count < max_count && curlen === nextlen) {
              continue
            } else if (count < min_count) {
              s.bl_tree[curlen * 2] /*.Freq*/ += count
            } else if (curlen !== 0) {
              if (curlen !== prevlen) {
                s.bl_tree[curlen * 2] /*.Freq*/++
              }
              s.bl_tree[REP_3_6 * 2] /*.Freq*/++
            } else if (count <= 10) {
              s.bl_tree[REPZ_3_10 * 2] /*.Freq*/++
            } else {
              s.bl_tree[REPZ_11_138 * 2] /*.Freq*/++
            }

            count = 0
            prevlen = curlen

            if (nextlen === 0) {
              max_count = 138
              min_count = 3
            } else if (curlen === nextlen) {
              max_count = 6
              min_count = 3
            } else {
              max_count = 7
              min_count = 4
            }
          }
        }

        /* ===========================================================================
         * Send a literal or distance tree in compressed form, using the codes in
         * bl_tree.
         */
        function send_tree(s, tree, max_code) {
          //    deflate_state *s;
          //    ct_data *tree; /* the tree to be scanned */
          //    int max_code;       /* and its largest code of non zero frequency */
          var n /* iterates over all tree elements */
          var prevlen = -1 /* last emitted length */
          var curlen /* length of current code */

          var nextlen = tree[0 * 2 + 1] /*.Len*/ /* length of next code */

          var count = 0 /* repeat count of the current code */
          var max_count = 7 /* max repeat count */
          var min_count = 4 /* min repeat count */

          /* tree[max_code+1].Len = -1; */ /* guard already set */
          if (nextlen === 0) {
            max_count = 138
            min_count = 3
          }

          for (n = 0; n <= max_code; n++) {
            curlen = nextlen
            nextlen = tree[(n + 1) * 2 + 1] /*.Len*/

            if (++count < max_count && curlen === nextlen) {
              continue
            } else if (count < min_count) {
              do {
                send_code(s, curlen, s.bl_tree)
              } while (--count !== 0)
            } else if (curlen !== 0) {
              if (curlen !== prevlen) {
                send_code(s, curlen, s.bl_tree)
                count--
              }
              //Assert(count >= 3 && count <= 6, " 3_6?");
              send_code(s, REP_3_6, s.bl_tree)
              send_bits(s, count - 3, 2)
            } else if (count <= 10) {
              send_code(s, REPZ_3_10, s.bl_tree)
              send_bits(s, count - 3, 3)
            } else {
              send_code(s, REPZ_11_138, s.bl_tree)
              send_bits(s, count - 11, 7)
            }

            count = 0
            prevlen = curlen
            if (nextlen === 0) {
              max_count = 138
              min_count = 3
            } else if (curlen === nextlen) {
              max_count = 6
              min_count = 3
            } else {
              max_count = 7
              min_count = 4
            }
          }
        }

        /* ===========================================================================
         * Construct the Huffman tree for the bit lengths and return the index in
         * bl_order of the last bit length code to send.
         */
        function build_bl_tree(s) {
          var max_blindex /* index of last bit length code of non zero freq */

          /* Determine the bit length frequencies for literal and distance trees */
          scan_tree(s, s.dyn_ltree, s.l_desc.max_code)
          scan_tree(s, s.dyn_dtree, s.d_desc.max_code)

          /* Build the bit length tree: */
          build_tree(s, s.bl_desc)
          /* opt_len now includes the length of the tree representations, except
           * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
           */

          /* Determine the number of bit length codes to send. The pkzip format
           * requires that at least 4 bit length codes be sent. (appnote.txt says
           * 3 but the actual value used is 4.)
           */
          for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
            if (s.bl_tree[bl_order[max_blindex] * 2 + 1] /*.Len*/ !== 0) {
              break
            }
          }
          /* Update opt_len to include the bit length tree and counts */
          s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4
          //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
          //        s->opt_len, s->static_len));

          return max_blindex
        }

        /* ===========================================================================
         * Send the header for a block using dynamic Huffman trees: the counts, the
         * lengths of the bit length codes, the literal tree and the distance tree.
         * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
         */
        function send_all_trees(s, lcodes, dcodes, blcodes) {
          //    deflate_state *s;
          //    int lcodes, dcodes, blcodes; /* number of codes for each tree */
          var rank /* index in bl_order */

          //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
          //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
          //        "too many codes");
          //Tracev((stderr, "\nbl counts: "));
          send_bits(s, lcodes - 257, 5) /* not +255 as stated in appnote.txt */
          send_bits(s, dcodes - 1, 5)
          send_bits(s, blcodes - 4, 4) /* not -3 as stated in appnote.txt */
          for (rank = 0; rank < blcodes; rank++) {
            //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
            send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1] /*.Len*/, 3)
          }
          //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

          send_tree(s, s.dyn_ltree, lcodes - 1) /* literal tree */
          //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

          send_tree(s, s.dyn_dtree, dcodes - 1) /* distance tree */
          //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
        }

        /* ===========================================================================
         * Check if the data type is TEXT or BINARY, using the following algorithm:
         * - TEXT if the two conditions below are satisfied:
         *    a) There are no non-portable control characters belonging to the
         *       "black list" (0..6, 14..25, 28..31).
         *    b) There is at least one printable character belonging to the
         *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
         * - BINARY otherwise.
         * - The following partially-portable control characters form a
         *   "gray list" that is ignored in this detection algorithm:
         *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
         * IN assertion: the fields Freq of dyn_ltree are set.
         */
        function detect_data_type(s) {
          /* black_mask is the bit mask of black-listed bytes
           * set bits 0..6, 14..25, and 28..31
           * 0xf3ffc07f = binary 11110011111111111100000001111111
           */
          var black_mask = 0xf3ffc07f
          var n

          /* Check for non-textual ("black-listed") bytes. */
          for (n = 0; n <= 31; n++, black_mask >>>= 1) {
            if (black_mask & 1 && s.dyn_ltree[n * 2] /*.Freq*/ !== 0) {
              return Z_BINARY
            }
          }

          /* Check for textual ("white-listed") bytes. */
          if (s.dyn_ltree[9 * 2] /*.Freq*/ !== 0 || s.dyn_ltree[10 * 2] /*.Freq*/ !== 0 || s.dyn_ltree[13 * 2] /*.Freq*/ !== 0) {
            return Z_TEXT
          }
          for (n = 32; n < LITERALS; n++) {
            if (s.dyn_ltree[n * 2] /*.Freq*/ !== 0) {
              return Z_TEXT
            }
          }

          /* There are no "black-listed" or "white-listed" bytes:
           * this stream either is empty or has tolerated ("gray-listed") bytes only.
           */
          return Z_BINARY
        }

        var static_init_done = false

        /* ===========================================================================
         * Initialize the tree data structures for a new zlib stream.
         */
        function _tr_init(s) {
          if (!static_init_done) {
            tr_static_init()
            static_init_done = true
          }

          s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc)
          s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc)
          s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc)

          s.bi_buf = 0
          s.bi_valid = 0

          /* Initialize the first block of the first file: */
          init_block(s)
        }

        /* ===========================================================================
         * Send a stored block
         */
        function _tr_stored_block(s, buf, stored_len, last) {
          //DeflateState *s;
          //charf *buf;       /* input block */
          //ulg stored_len;   /* length of input block */
          //int last;         /* one if this is the last block for a file */
          send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3) /* send block type */
          copy_block(s, buf, stored_len, true) /* with header */
        }

        /* ===========================================================================
         * Send one empty static block to give enough lookahead for inflate.
         * This takes 10 bits, of which 7 may remain in the bit buffer.
         */
        function _tr_align(s) {
          send_bits(s, STATIC_TREES << 1, 3)
          send_code(s, END_BLOCK, static_ltree)
          bi_flush(s)
        }

        /* ===========================================================================
         * Determine the best encoding for the current block: dynamic trees, static
         * trees or store, and output the encoded block to the zip file.
         */
        function _tr_flush_block(s, buf, stored_len, last) {
          //DeflateState *s;
          //charf *buf;       /* input block, or NULL if too old */
          //ulg stored_len;   /* length of input block */
          //int last;         /* one if this is the last block for a file */
          var opt_lenb, static_lenb /* opt_len and static_len in bytes */
          var max_blindex = 0 /* index of last bit length code of non zero freq */

          /* Build the Huffman trees unless a stored block is forced */
          if (s.level > 0) {
            /* Check if the file is binary or text */
            if (s.strm.data_type === Z_UNKNOWN) {
              s.strm.data_type = detect_data_type(s)
            }

            /* Construct the literal and distance trees */
            build_tree(s, s.l_desc)
            // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
            //        s->static_len));

            build_tree(s, s.d_desc)
            // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
            //        s->static_len));
            /* At this point, opt_len and static_len are the total bit lengths of
             * the compressed block data, excluding the tree representations.
             */

            /* Build the bit length tree for the above two trees, and get the index
             * in bl_order of the last bit length code to send.
             */
            max_blindex = build_bl_tree(s)

            /* Determine the best encoding. Compute the block lengths in bytes. */
            opt_lenb = (s.opt_len + 3 + 7) >>> 3
            static_lenb = (s.static_len + 3 + 7) >>> 3

            // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
            //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
            //        s->last_lit));

            if (static_lenb <= opt_lenb) {
              opt_lenb = static_lenb
            }
          } else {
            // Assert(buf != (char*)0, "lost buf");
            opt_lenb = static_lenb = stored_len + 5 /* force a stored block */
          }

          if (stored_len + 4 <= opt_lenb && buf !== -1) {
            /* 4: two words for the lengths */

            /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
             * Otherwise we can't have processed more than WSIZE input bytes since
             * the last block flush, because compression would have been
             * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
             * transform a block into a stored block.
             */
            _tr_stored_block(s, buf, stored_len, last)
          } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
            send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3)
            compress_block(s, static_ltree, static_dtree)
          } else {
            send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3)
            send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1)
            compress_block(s, s.dyn_ltree, s.dyn_dtree)
          }
          // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
          /* The above check is made mod 2^32, for files larger than 512 MB
           * and uLong implemented on 32 bits.
           */
          init_block(s)

          if (last) {
            bi_windup(s)
          }
          // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
          //       s->compressed_len-7*last));
        }

        /* ===========================================================================
         * Save the match info and tally the frequency counts. Return true if
         * the current block must be flushed.
         */
        function _tr_tally(s, dist, lc) {
          //    deflate_state *s;
          //    unsigned dist;  /* distance of matched string */
          //    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
          //var out_length, in_length, dcode;

          s.pending_buf[s.d_buf + s.last_lit * 2] = (dist >>> 8) & 0xff
          s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff

          s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff
          s.last_lit++

          if (dist === 0) {
            /* lc is the unmatched char */
            s.dyn_ltree[lc * 2] /*.Freq*/++
          } else {
            s.matches++
            /* Here, lc is the match length - MIN_MATCH */
            dist-- /* dist = match distance - 1 */
            //Assert((ush)dist < (ush)MAX_DIST(s) &&
            //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
            //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

            s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2] /*.Freq*/++
            s.dyn_dtree[d_code(dist) * 2] /*.Freq*/++
          }

          // (!) This block is disabled in zlib defaults,
          // don't enable it for binary compatibility

          //#ifdef TRUNCATE_BLOCK
          //  /* Try to guess if it is profitable to stop the current block here */
          //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
          //    /* Compute an upper bound for the compressed length */
          //    out_length = s.last_lit*8;
          //    in_length = s.strstart - s.block_start;
          //
          //    for (dcode = 0; dcode < D_CODES; dcode++) {
          //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
          //    }
          //    out_length >>>= 3;
          //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
          //    //       s->last_lit, in_length, out_length,
          //    //       100L - out_length*100L/in_length));
          //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
          //      return true;
          //    }
          //  }
          //#endif

          return s.last_lit === s.lit_bufsize - 1
          /* We avoid equality with lit_bufsize because of wraparound at 64K
           * on 16 bit machines and because stored blocks are restricted to
           * 64K-1 bytes.
           */
        }

        exports._tr_init = _tr_init
        exports._tr_stored_block = _tr_stored_block
        exports._tr_flush_block = _tr_flush_block
        exports._tr_tally = _tr_tally
        exports._tr_align = _tr_align

        /***/
      },
      /* 38 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var zlib_inflate = __webpack_require__(39)
        var utils = __webpack_require__(3)
        var strings = __webpack_require__(15)
        var c = __webpack_require__(17)
        var msg = __webpack_require__(11)
        var ZStream = __webpack_require__(16)
        var GZheader = __webpack_require__(42)

        var toString = Object.prototype.toString

        /**
         * class Inflate
         *
         * Generic JS-style wrapper for zlib calls. If you don't need
         * streaming behaviour - use more simple functions: [[inflate]]
         * and [[inflateRaw]].
         **/

        /* internal
         * inflate.chunks -> Array
         *
         * Chunks of output data, if [[Inflate#onData]] not overridden.
         **/

        /**
         * Inflate.result -> Uint8Array|Array|String
         *
         * Uncompressed result, generated by default [[Inflate#onData]]
         * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
         * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
         * push a chunk with explicit flush (call [[Inflate#push]] with
         * `Z_SYNC_FLUSH` param).
         **/

        /**
         * Inflate.err -> Number
         *
         * Error code after inflate finished. 0 (Z_OK) on success.
         * Should be checked if broken data possible.
         **/

        /**
         * Inflate.msg -> String
         *
         * Error message, if [[Inflate.err]] != 0
         **/

        /**
         * new Inflate(options)
         * - options (Object): zlib inflate options.
         *
         * Creates new inflator instance with specified params. Throws exception
         * on bad params. Supported options:
         *
         * - `windowBits`
         * - `dictionary`
         *
         * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
         * for more information on these.
         *
         * Additional options, for internal needs:
         *
         * - `chunkSize` - size of generated data chunks (16K by default)
         * - `raw` (Boolean) - do raw inflate
         * - `to` (String) - if equal to 'string', then result will be converted
         *   from utf8 to utf16 (javascript) string. When string output requested,
         *   chunk length can differ from `chunkSize`, depending on content.
         *
         * By default, when no options set, autodetect deflate/gzip data format via
         * wrapper header.
         *
         * ##### Example:
         *
         * ```javascript
         * var pako = require('pako')
         *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
         *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
         *
         * var inflate = new pako.Inflate({ level: 3});
         *
         * inflate.push(chunk1, false);
         * inflate.push(chunk2, true);  // true -> last chunk
         *
         * if (inflate.err) { throw new Error(inflate.err); }
         *
         * console.log(inflate.result);
         * ```
         **/
        function Inflate(options) {
          if (!(this instanceof Inflate)) return new Inflate(options)

          this.options = utils.assign(
            {
              chunkSize: 16384,
              windowBits: 0,
              to: ""
            },
            options || {}
          )

          var opt = this.options

          // Force window size for `raw` data, if not set directly,
          // because we have no header for autodetect.
          if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
            opt.windowBits = -opt.windowBits
            if (opt.windowBits === 0) {
              opt.windowBits = -15
            }
          }

          // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
          if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
            opt.windowBits += 32
          }

          // Gzip header has no info about windows size, we can do autodetect only
          // for deflate. So, if window size not set, force it to max when gzip possible
          if (opt.windowBits > 15 && opt.windowBits < 48) {
            // bit 3 (16) -> gzipped data
            // bit 4 (32) -> autodetect gzip/deflate
            if ((opt.windowBits & 15) === 0) {
              opt.windowBits |= 15
            }
          }

          this.err = 0 // error code, if happens (0 = Z_OK)
          this.msg = "" // error message
          this.ended = false // used to avoid multiple onEnd() calls
          this.chunks = [] // chunks of compressed data

          this.strm = new ZStream()
          this.strm.avail_out = 0

          var status = zlib_inflate.inflateInit2(this.strm, opt.windowBits)

          if (status !== c.Z_OK) {
            throw new Error(msg[status])
          }

          this.header = new GZheader()

          zlib_inflate.inflateGetHeader(this.strm, this.header)

          // Setup dictionary
          if (opt.dictionary) {
            // Convert data if needed
            if (typeof opt.dictionary === "string") {
              opt.dictionary = strings.string2buf(opt.dictionary)
            } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
              opt.dictionary = new Uint8Array(opt.dictionary)
            }
            if (opt.raw) {
              //In raw mode we need to set the dictionary early
              status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary)
              if (status !== c.Z_OK) {
                throw new Error(msg[status])
              }
            }
          }
        }

        /**
         * Inflate#push(data[, mode]) -> Boolean
         * - data (Uint8Array|Array|ArrayBuffer|String): input data
         * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
         *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` means Z_FINISH.
         *
         * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
         * new output chunks. Returns `true` on success. The last data block must have
         * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
         * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
         * can use mode Z_SYNC_FLUSH, keeping the decompression context.
         *
         * On fail call [[Inflate#onEnd]] with error code and return false.
         *
         * We strongly recommend to use `Uint8Array` on input for best speed (output
         * format is detected automatically). Also, don't skip last param and always
         * use the same type in your code (boolean or number). That will improve JS speed.
         *
         * For regular `Array`-s make sure all elements are [0..255].
         *
         * ##### Example
         *
         * ```javascript
         * push(chunk, false); // push one of data chunks
         * ...
         * push(chunk, true);  // push last chunk
         * ```
         **/
        Inflate.prototype.push = function (data, mode) {
          var strm = this.strm
          var chunkSize = this.options.chunkSize
          var dictionary = this.options.dictionary
          var status, _mode
          var next_out_utf8, tail, utf8str

          // Flag to properly process Z_BUF_ERROR on testing inflate call
          // when we check that all output data was flushed.
          var allowBufError = false

          if (this.ended) {
            return false
          }
          _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH

          // Convert data if needed
          if (typeof data === "string") {
            // Only binary strings can be decompressed on practice
            strm.input = strings.binstring2buf(data)
          } else if (toString.call(data) === "[object ArrayBuffer]") {
            strm.input = new Uint8Array(data)
          } else {
            strm.input = data
          }

          strm.next_in = 0
          strm.avail_in = strm.input.length

          do {
            if (strm.avail_out === 0) {
              strm.output = new utils.Buf8(chunkSize)
              strm.next_out = 0
              strm.avail_out = chunkSize
            }

            status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH) /* no bad return value */

            if (status === c.Z_NEED_DICT && dictionary) {
              status = zlib_inflate.inflateSetDictionary(this.strm, dictionary)
            }

            if (status === c.Z_BUF_ERROR && allowBufError === true) {
              status = c.Z_OK
              allowBufError = false
            }

            if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
              this.onEnd(status)
              this.ended = true
              return false
            }

            if (strm.next_out) {
              if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {
                if (this.options.to === "string") {
                  next_out_utf8 = strings.utf8border(strm.output, strm.next_out)

                  tail = strm.next_out - next_out_utf8
                  utf8str = strings.buf2string(strm.output, next_out_utf8)

                  // move tail
                  strm.next_out = tail
                  strm.avail_out = chunkSize - tail
                  if (tail) {
                    utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0)
                  }

                  this.onData(utf8str)
                } else {
                  this.onData(utils.shrinkBuf(strm.output, strm.next_out))
                }
              }
            }

            // When no more input data, we should check that internal inflate buffers
            // are flushed. The only way to do it when avail_out = 0 - run one more
            // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
            // Here we set flag to process this error properly.
            //
            // NOTE. Deflate does not return error in this case and does not needs such
            // logic.
            if (strm.avail_in === 0 && strm.avail_out === 0) {
              allowBufError = true
            }
          } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END)

          if (status === c.Z_STREAM_END) {
            _mode = c.Z_FINISH
          }

          // Finalize on the last chunk.
          if (_mode === c.Z_FINISH) {
            status = zlib_inflate.inflateEnd(this.strm)
            this.onEnd(status)
            this.ended = true
            return status === c.Z_OK
          }

          // callback interim results if Z_SYNC_FLUSH.
          if (_mode === c.Z_SYNC_FLUSH) {
            this.onEnd(c.Z_OK)
            strm.avail_out = 0
            return true
          }

          return true
        }

        /**
         * Inflate#onData(chunk) -> Void
         * - chunk (Uint8Array|Array|String): output data. Type of array depends
         *   on js engine support. When string output requested, each chunk
         *   will be string.
         *
         * By default, stores data blocks in `chunks[]` property and glue
         * those in `onEnd`. Override this handler, if you need another behaviour.
         **/
        Inflate.prototype.onData = function (chunk) {
          this.chunks.push(chunk)
        }

        /**
         * Inflate#onEnd(status) -> Void
         * - status (Number): inflate status. 0 (Z_OK) on success,
         *   other if not.
         *
         * Called either after you tell inflate that the input stream is
         * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
         * or if an error happened. By default - join collected chunks,
         * free memory and fill `results` / `err` properties.
         **/
        Inflate.prototype.onEnd = function (status) {
          // On success - join
          if (status === c.Z_OK) {
            if (this.options.to === "string") {
              // Glue & convert here, until we teach pako to send
              // utf8 aligned strings to onData
              this.result = this.chunks.join("")
            } else {
              this.result = utils.flattenChunks(this.chunks)
            }
          }
          this.chunks = []
          this.err = status
          this.msg = this.strm.msg
        }

        /**
         * inflate(data[, options]) -> Uint8Array|Array|String
         * - data (Uint8Array|Array|String): input data to decompress.
         * - options (Object): zlib inflate options.
         *
         * Decompress `data` with inflate/ungzip and `options`. Autodetect
         * format via wrapper header by default. That's why we don't provide
         * separate `ungzip` method.
         *
         * Supported options are:
         *
         * - windowBits
         *
         * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
         * for more information.
         *
         * Sugar (options):
         *
         * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
         *   negative windowBits implicitly.
         * - `to` (String) - if equal to 'string', then result will be converted
         *   from utf8 to utf16 (javascript) string. When string output requested,
         *   chunk length can differ from `chunkSize`, depending on content.
         *
         *
         * ##### Example:
         *
         * ```javascript
         * var pako = require('pako')
         *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
         *   , output;
         *
         * try {
         *   output = pako.inflate(input);
         * } catch (err)
         *   console.log(err);
         * }
         * ```
         **/
        function inflate(input, options) {
          var inflator = new Inflate(options)

          inflator.push(input, true)

          // That will never happens, if you don't cheat with options :)
          if (inflator.err) {
            throw inflator.msg || msg[inflator.err]
          }

          return inflator.result
        }

        /**
         * inflateRaw(data[, options]) -> Uint8Array|Array|String
         * - data (Uint8Array|Array|String): input data to decompress.
         * - options (Object): zlib inflate options.
         *
         * The same as [[inflate]], but creates raw data, without wrapper
         * (header and adler32 crc).
         **/
        function inflateRaw(input, options) {
          options = options || {}
          options.raw = true
          return inflate(input, options)
        }

        /**
         * ungzip(data[, options]) -> Uint8Array|Array|String
         * - data (Uint8Array|Array|String): input data to decompress.
         * - options (Object): zlib inflate options.
         *
         * Just shortcut to [[inflate]], because it autodetects format
         * by header.content. Done for convenience.
         **/

        exports.Inflate = Inflate
        exports.inflate = inflate
        exports.inflateRaw = inflateRaw
        exports.ungzip = inflate

        /***/
      },
      /* 39 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        var utils = __webpack_require__(3)
        var adler32 = __webpack_require__(13)
        var crc32 = __webpack_require__(14)
        var inflate_fast = __webpack_require__(40)
        var inflate_table = __webpack_require__(41)

        var CODES = 0
        var LENS = 1
        var DISTS = 2

        /* Public constants ==========================================================*/
        /* ===========================================================================*/

        /* Allowed flush values; see deflate() and inflate() below for details */
        //var Z_NO_FLUSH      = 0;
        //var Z_PARTIAL_FLUSH = 1;
        //var Z_SYNC_FLUSH    = 2;
        //var Z_FULL_FLUSH    = 3;
        var Z_FINISH = 4
        var Z_BLOCK = 5
        var Z_TREES = 6

        /* Return codes for the compression/decompression functions. Negative values
         * are errors, positive values are used for special but normal events.
         */
        var Z_OK = 0
        var Z_STREAM_END = 1
        var Z_NEED_DICT = 2
        //var Z_ERRNO         = -1;
        var Z_STREAM_ERROR = -2
        var Z_DATA_ERROR = -3
        var Z_MEM_ERROR = -4
        var Z_BUF_ERROR = -5
        //var Z_VERSION_ERROR = -6;

        /* The deflate compression method */
        var Z_DEFLATED = 8

        /* STATES ====================================================================*/
        /* ===========================================================================*/

        var HEAD = 1 /* i: waiting for magic header */
        var FLAGS = 2 /* i: waiting for method and flags (gzip) */
        var TIME = 3 /* i: waiting for modification time (gzip) */
        var OS = 4 /* i: waiting for extra flags and operating system (gzip) */
        var EXLEN = 5 /* i: waiting for extra length (gzip) */
        var EXTRA = 6 /* i: waiting for extra bytes (gzip) */
        var NAME = 7 /* i: waiting for end of file name (gzip) */
        var COMMENT = 8 /* i: waiting for end of comment (gzip) */
        var HCRC = 9 /* i: waiting for header crc (gzip) */
        var DICTID = 10 /* i: waiting for dictionary check value */
        var DICT = 11 /* waiting for inflateSetDictionary() call */
        var TYPE = 12 /* i: waiting for type bits, including last-flag bit */
        var TYPEDO = 13 /* i: same, but skip check to exit inflate on new block */
        var STORED = 14 /* i: waiting for stored size (length and complement) */
        var COPY_ = 15 /* i/o: same as COPY below, but only first time in */
        var COPY = 16 /* i/o: waiting for input or output to copy stored block */
        var TABLE = 17 /* i: waiting for dynamic block table lengths */
        var LENLENS = 18 /* i: waiting for code length code lengths */
        var CODELENS = 19 /* i: waiting for length/lit and distance code lengths */
        var LEN_ = 20 /* i: same as LEN below, but only first time in */
        var LEN = 21 /* i: waiting for length/lit/eob code */
        var LENEXT = 22 /* i: waiting for length extra bits */
        var DIST = 23 /* i: waiting for distance code */
        var DISTEXT = 24 /* i: waiting for distance extra bits */
        var MATCH = 25 /* o: waiting for output space to copy string */
        var LIT = 26 /* o: waiting for output space to write literal */
        var CHECK = 27 /* i: waiting for 32-bit check value */
        var LENGTH = 28 /* i: waiting for 32-bit length (gzip) */
        var DONE = 29 /* finished check, done -- remain here until reset */
        var BAD = 30 /* got a data error -- remain here until reset */
        var MEM = 31 /* got an inflate() memory error -- remain here until reset */
        var SYNC = 32 /* looking for synchronization bytes to restart inflate() */

        /* ===========================================================================*/

        var ENOUGH_LENS = 852
        var ENOUGH_DISTS = 592
        //var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

        var MAX_WBITS = 15
        /* 32K LZ77 window */
        var DEF_WBITS = MAX_WBITS

        function zswap32(q) {
          return ((q >>> 24) & 0xff) + ((q >>> 8) & 0xff00) + ((q & 0xff00) << 8) + ((q & 0xff) << 24)
        }

        function InflateState() {
          this.mode = 0 /* current inflate mode */
          this.last = false /* true if processing last block */
          this.wrap = 0 /* bit 0 true for zlib, bit 1 true for gzip */
          this.havedict = false /* true if dictionary provided */
          this.flags = 0 /* gzip header method and flags (0 if zlib) */
          this.dmax = 0 /* zlib header max distance (INFLATE_STRICT) */
          this.check = 0 /* protected copy of check value */
          this.total = 0 /* protected copy of output count */
          // TODO: may be {}
          this.head = null /* where to save gzip header information */

          /* sliding window */
          this.wbits = 0 /* log base 2 of requested window size */
          this.wsize = 0 /* window size or zero if not using window */
          this.whave = 0 /* valid bytes in the window */
          this.wnext = 0 /* window write index */
          this.window = null /* allocated sliding window, if needed */

          /* bit accumulator */
          this.hold = 0 /* input bit accumulator */
          this.bits = 0 /* number of bits in "in" */

          /* for string and stored block copying */
          this.length = 0 /* literal or length of data to copy */
          this.offset = 0 /* distance back to copy string from */

          /* for table and code decoding */
          this.extra = 0 /* extra bits needed */

          /* fixed and dynamic code tables */
          this.lencode = null /* starting table for length/literal codes */
          this.distcode = null /* starting table for distance codes */
          this.lenbits = 0 /* index bits for lencode */
          this.distbits = 0 /* index bits for distcode */

          /* dynamic table building */
          this.ncode = 0 /* number of code length code lengths */
          this.nlen = 0 /* number of length code lengths */
          this.ndist = 0 /* number of distance code lengths */
          this.have = 0 /* number of code lengths in lens[] */
          this.next = null /* next available space in codes[] */

          this.lens = new utils.Buf16(320) /* temporary storage for code lengths */
          this.work = new utils.Buf16(288) /* work area for code table building */

          /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
          //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
          this.lendyn = null /* dynamic table for length/literal codes (JS specific) */
          this.distdyn = null /* dynamic table for distance codes (JS specific) */
          this.sane = 0 /* if false, allow invalid distance too far */
          this.back = 0 /* bits back of last unprocessed length/lit */
          this.was = 0 /* initial length of match */
        }

        function inflateResetKeep(strm) {
          var state

          if (!strm || !strm.state) {
            return Z_STREAM_ERROR
          }
          state = strm.state
          strm.total_in = strm.total_out = state.total = 0
          strm.msg = "" /*Z_NULL*/
          if (state.wrap) {
            /* to support ill-conceived Java test suite */
            strm.adler = state.wrap & 1
          }
          state.mode = HEAD
          state.last = 0
          state.havedict = 0
          state.dmax = 32768
          state.head = null /*Z_NULL*/
          state.hold = 0
          state.bits = 0
          //state.lencode = state.distcode = state.next = state.codes;
          state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS)
          state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS)

          state.sane = 1
          state.back = -1
          //Tracev((stderr, "inflate: reset\n"));
          return Z_OK
        }

        function inflateReset(strm) {
          var state

          if (!strm || !strm.state) {
            return Z_STREAM_ERROR
          }
          state = strm.state
          state.wsize = 0
          state.whave = 0
          state.wnext = 0
          return inflateResetKeep(strm)
        }

        function inflateReset2(strm, windowBits) {
          var wrap
          var state

          /* get the state */
          if (!strm || !strm.state) {
            return Z_STREAM_ERROR
          }
          state = strm.state

          /* extract wrap request from windowBits parameter */
          if (windowBits < 0) {
            wrap = 0
            windowBits = -windowBits
          } else {
            wrap = (windowBits >> 4) + 1
            if (windowBits < 48) {
              windowBits &= 15
            }
          }

          /* set number of window bits, free window if different */
          if (windowBits && (windowBits < 8 || windowBits > 15)) {
            return Z_STREAM_ERROR
          }
          if (state.window !== null && state.wbits !== windowBits) {
            state.window = null
          }

          /* update state and reset the rest of it */
          state.wrap = wrap
          state.wbits = windowBits
          return inflateReset(strm)
        }

        function inflateInit2(strm, windowBits) {
          var ret
          var state

          if (!strm) {
            return Z_STREAM_ERROR
          }
          //strm.msg = Z_NULL;                 /* in case we return an error */

          state = new InflateState()

          //if (state === Z_NULL) return Z_MEM_ERROR;
          //Tracev((stderr, "inflate: allocated\n"));
          strm.state = state
          state.window = null /*Z_NULL*/
          ret = inflateReset2(strm, windowBits)
          if (ret !== Z_OK) {
            strm.state = null /*Z_NULL*/
          }
          return ret
        }

        function inflateInit(strm) {
          return inflateInit2(strm, DEF_WBITS)
        }

        /*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
        var virgin = true

        var lenfix, distfix // We have no pointers in JS, so keep tables separate

        function fixedtables(state) {
          /* build fixed huffman tables if first call (may not be thread safe) */
          if (virgin) {
            var sym

            lenfix = new utils.Buf32(512)
            distfix = new utils.Buf32(32)

            /* literal/length table */
            sym = 0
            while (sym < 144) {
              state.lens[sym++] = 8
            }
            while (sym < 256) {
              state.lens[sym++] = 9
            }
            while (sym < 280) {
              state.lens[sym++] = 7
            }
            while (sym < 288) {
              state.lens[sym++] = 8
            }

            inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 })

            /* distance table */
            sym = 0
            while (sym < 32) {
              state.lens[sym++] = 5
            }

            inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 })

            /* do this just once */
            virgin = false
          }

          state.lencode = lenfix
          state.lenbits = 9
          state.distcode = distfix
          state.distbits = 5
        }

        /*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
        function updatewindow(strm, src, end, copy) {
          var dist
          var state = strm.state

          /* if it hasn't been done already, allocate space for the window */
          if (state.window === null) {
            state.wsize = 1 << state.wbits
            state.wnext = 0
            state.whave = 0

            state.window = new utils.Buf8(state.wsize)
          }

          /* copy state->wsize or less output bytes into the circular window */
          if (copy >= state.wsize) {
            utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0)
            state.wnext = 0
            state.whave = state.wsize
          } else {
            dist = state.wsize - state.wnext
            if (dist > copy) {
              dist = copy
            }
            //zmemcpy(state->window + state->wnext, end - copy, dist);
            utils.arraySet(state.window, src, end - copy, dist, state.wnext)
            copy -= dist
            if (copy) {
              //zmemcpy(state->window, end - copy, copy);
              utils.arraySet(state.window, src, end - copy, copy, 0)
              state.wnext = copy
              state.whave = state.wsize
            } else {
              state.wnext += dist
              if (state.wnext === state.wsize) {
                state.wnext = 0
              }
              if (state.whave < state.wsize) {
                state.whave += dist
              }
            }
          }
          return 0
        }

        function inflate(strm, flush) {
          var state
          var input, output // input/output buffers
          var next /* next input INDEX */
          var put /* next output INDEX */
          var have, left /* available input and output */
          var hold /* bit buffer */
          var bits /* bits in bit buffer */
          var _in, _out /* save starting available input and output */
          var copy /* number of stored or match bytes to copy */
          var from /* where to copy match bytes from */
          var from_source
          var here = 0 /* current decoding table entry */
          var here_bits, here_op, here_val // paked "here" denormalized (JS specific)
          //var last;                   /* parent table entry */
          var last_bits, last_op, last_val // paked "last" denormalized (JS specific)
          var len /* length to copy for repeats, bits to drop */
          var ret /* return code */
          var hbuf = new utils.Buf8(4) /* buffer for gzip header crc calculation */
          var opts

          var n // temporary var for NEED_BITS

          var order = /* permutation of code lengths */ [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]

          if (!strm || !strm.state || !strm.output || (!strm.input && strm.avail_in !== 0)) {
            return Z_STREAM_ERROR
          }

          state = strm.state
          if (state.mode === TYPE) {
            state.mode = TYPEDO
          } /* skip check */

          //--- LOAD() ---
          put = strm.next_out
          output = strm.output
          left = strm.avail_out
          next = strm.next_in
          input = strm.input
          have = strm.avail_in
          hold = state.hold
          bits = state.bits
          //---

          _in = have
          _out = left
          ret = Z_OK

          // goto emulation
          inf_leave: for (;;) {
            switch (state.mode) {
              case HEAD:
                if (state.wrap === 0) {
                  state.mode = TYPEDO
                  break
                }
                //=== NEEDBITS(16);
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave
                  }
                  have--
                  hold += input[next++] << bits
                  bits += 8
                }
                //===//
                if (state.wrap & 2 && hold === 0x8b1f) {
                  /* gzip header */
                  state.check = 0 /*crc32(0L, Z_NULL, 0)*/
                  //=== CRC2(state.check, hold);
                  hbuf[0] = hold & 0xff
                  hbuf[1] = (hold >>> 8) & 0xff
                  state.check = crc32(state.check, hbuf, 2, 0)
                  //===//

                  //=== INITBITS();
                  hold = 0
                  bits = 0
                  //===//
                  state.mode = FLAGS
                  break
                }
                state.flags = 0 /* expect zlib header */
                if (state.head) {
                  state.head.done = false
                }
                if (!(state.wrap & 1) /* check if zlib header allowed */ || (((hold & 0xff) /*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
                  strm.msg = "incorrect header check"
                  state.mode = BAD
                  break
                }
                if ((hold & 0x0f) /*BITS(4)*/ !== Z_DEFLATED) {
                  strm.msg = "unknown compression method"
                  state.mode = BAD
                  break
                }
                //--- DROPBITS(4) ---//
                hold >>>= 4
                bits -= 4
                //---//
                len = (hold & 0x0f) /*BITS(4)*/ + 8
                if (state.wbits === 0) {
                  state.wbits = len
                } else if (len > state.wbits) {
                  strm.msg = "invalid window size"
                  state.mode = BAD
                  break
                }
                state.dmax = 1 << len
                //Tracev((stderr, "inflate:   zlib header ok\n"));
                strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/
                state.mode = hold & 0x200 ? DICTID : TYPE
                //=== INITBITS();
                hold = 0
                bits = 0
                //===//
                break
              case FLAGS:
                //=== NEEDBITS(16); */
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave
                  }
                  have--
                  hold += input[next++] << bits
                  bits += 8
                }
                //===//
                state.flags = hold
                if ((state.flags & 0xff) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method"
                  state.mode = BAD
                  break
                }
                if (state.flags & 0xe000) {
                  strm.msg = "unknown header flags set"
                  state.mode = BAD
                  break
                }
                if (state.head) {
                  state.head.text = (hold >> 8) & 1
                }
                if (state.flags & 0x0200) {
                  //=== CRC2(state.check, hold);
                  hbuf[0] = hold & 0xff
                  hbuf[1] = (hold >>> 8) & 0xff
                  state.check = crc32(state.check, hbuf, 2, 0)
                  //===//
                }
                //=== INITBITS();
                hold = 0
                bits = 0
                //===//
                state.mode = TIME
              /* falls through */
              case TIME:
                //=== NEEDBITS(32); */
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave
                  }
                  have--
                  hold += input[next++] << bits
                  bits += 8
                }
                //===//
                if (state.head) {
                  state.head.time = hold
                }
                if (state.flags & 0x0200) {
                  //=== CRC4(state.check, hold)
                  hbuf[0] = hold & 0xff
                  hbuf[1] = (hold >>> 8) & 0xff
                  hbuf[2] = (hold >>> 16) & 0xff
                  hbuf[3] = (hold >>> 24) & 0xff
                  state.check = crc32(state.check, hbuf, 4, 0)
                  //===
                }
                //=== INITBITS();
                hold = 0
                bits = 0
                //===//
                state.mode = OS
              /* falls through */
              case OS:
                //=== NEEDBITS(16); */
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave
                  }
                  have--
                  hold += input[next++] << bits
                  bits += 8
                }
                //===//
                if (state.head) {
                  state.head.xflags = hold & 0xff
                  state.head.os = hold >> 8
                }
                if (state.flags & 0x0200) {
                  //=== CRC2(state.check, hold);
                  hbuf[0] = hold & 0xff
                  hbuf[1] = (hold >>> 8) & 0xff
                  state.check = crc32(state.check, hbuf, 2, 0)
                  //===//
                }
                //=== INITBITS();
                hold = 0
                bits = 0
                //===//
                state.mode = EXLEN
              /* falls through */
              case EXLEN:
                if (state.flags & 0x0400) {
                  //=== NEEDBITS(16); */
                  while (bits < 16) {
                    if (have === 0) {
                      break inf_leave
                    }
                    have--
                    hold += input[next++] << bits
                    bits += 8
                  }
                  //===//
                  state.length = hold
                  if (state.head) {
                    state.head.extra_len = hold
                  }
                  if (state.flags & 0x0200) {
                    //=== CRC2(state.check, hold);
                    hbuf[0] = hold & 0xff
                    hbuf[1] = (hold >>> 8) & 0xff
                    state.check = crc32(state.check, hbuf, 2, 0)
                    //===//
                  }
                  //=== INITBITS();
                  hold = 0
                  bits = 0
                  //===//
                } else if (state.head) {
                  state.head.extra = null /*Z_NULL*/
                }
                state.mode = EXTRA
              /* falls through */
              case EXTRA:
                if (state.flags & 0x0400) {
                  copy = state.length
                  if (copy > have) {
                    copy = have
                  }
                  if (copy) {
                    if (state.head) {
                      len = state.head.extra_len - state.length
                      if (!state.head.extra) {
                        // Use untyped array for more convenient processing later
                        state.head.extra = new Array(state.head.extra_len)
                      }
                      utils.arraySet(
                        state.head.extra,
                        input,
                        next,
                        // extra field is limited to 65536 bytes
                        // - no need for additional size check
                        copy,
                        /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                        len
                      )
                      //zmemcpy(state.head.extra + len, next,
                      //        len + copy > state.head.extra_max ?
                      //        state.head.extra_max - len : copy);
                    }
                    if (state.flags & 0x0200) {
                      state.check = crc32(state.check, input, copy, next)
                    }
                    have -= copy
                    next += copy
                    state.length -= copy
                  }
                  if (state.length) {
                    break inf_leave
                  }
                }
                state.length = 0
                state.mode = NAME
              /* falls through */
              case NAME:
                if (state.flags & 0x0800) {
                  if (have === 0) {
                    break inf_leave
                  }
                  copy = 0
                  do {
                    // TODO: 2 or 1 bytes?
                    len = input[next + copy++]
                    /* use constant limit because in js we should not preallocate memory */
                    if (state.head && len && state.length < 65536 /*state.head.name_max*/) {
                      state.head.name += String.fromCharCode(len)
                    }
                  } while (len && copy < have)

                  if (state.flags & 0x0200) {
                    state.check = crc32(state.check, input, copy, next)
                  }
                  have -= copy
                  next += copy
                  if (len) {
                    break inf_leave
                  }
                } else if (state.head) {
                  state.head.name = null
                }
                state.length = 0
                state.mode = COMMENT
              /* falls through */
              case COMMENT:
                if (state.flags & 0x1000) {
                  if (have === 0) {
                    break inf_leave
                  }
                  copy = 0
                  do {
                    len = input[next + copy++]
                    /* use constant limit because in js we should not preallocate memory */
                    if (state.head && len && state.length < 65536 /*state.head.comm_max*/) {
                      state.head.comment += String.fromCharCode(len)
                    }
                  } while (len && copy < have)
                  if (state.flags & 0x0200) {
                    state.check = crc32(state.check, input, copy, next)
                  }
                  have -= copy
                  next += copy
                  if (len) {
                    break inf_leave
                  }
                } else if (state.head) {
                  state.head.comment = null
                }
                state.mode = HCRC
              /* falls through */
              case HCRC:
                if (state.flags & 0x0200) {
                  //=== NEEDBITS(16); */
                  while (bits < 16) {
                    if (have === 0) {
                      break inf_leave
                    }
                    have--
                    hold += input[next++] << bits
                    bits += 8
                  }
                  //===//
                  if (hold !== (state.check & 0xffff)) {
                    strm.msg = "header crc mismatch"
                    state.mode = BAD
                    break
                  }
                  //=== INITBITS();
                  hold = 0
                  bits = 0
                  //===//
                }
                if (state.head) {
                  state.head.hcrc = (state.flags >> 9) & 1
                  state.head.done = true
                }
                strm.adler = state.check = 0
                state.mode = TYPE
                break
              case DICTID:
                //=== NEEDBITS(32); */
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave
                  }
                  have--
                  hold += input[next++] << bits
                  bits += 8
                }
                //===//
                strm.adler = state.check = zswap32(hold)
                //=== INITBITS();
                hold = 0
                bits = 0
                //===//
                state.mode = DICT
              /* falls through */
              case DICT:
                if (state.havedict === 0) {
                  //--- RESTORE() ---
                  strm.next_out = put
                  strm.avail_out = left
                  strm.next_in = next
                  strm.avail_in = have
                  state.hold = hold
                  state.bits = bits
                  //---
                  return Z_NEED_DICT
                }
                strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/
                state.mode = TYPE
              /* falls through */
              case TYPE:
                if (flush === Z_BLOCK || flush === Z_TREES) {
                  break inf_leave
                }
              /* falls through */
              case TYPEDO:
                if (state.last) {
                  //--- BYTEBITS() ---//
                  hold >>>= bits & 7
                  bits -= bits & 7
                  //---//
                  state.mode = CHECK
                  break
                }
                //=== NEEDBITS(3); */
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave
                  }
                  have--
                  hold += input[next++] << bits
                  bits += 8
                }
                //===//
                state.last = hold & 0x01 /*BITS(1)*/
                //--- DROPBITS(1) ---//
                hold >>>= 1
                bits -= 1
                //---//

                switch (hold & 0x03 /*BITS(2)*/) {
                  case 0 /* stored block */:
                    //Tracev((stderr, "inflate:     stored block%s\n",
                    //        state.last ? " (last)" : ""));
                    state.mode = STORED
                    break
                  case 1 /* fixed block */:
                    fixedtables(state)
                    //Tracev((stderr, "inflate:     fixed codes block%s\n",
                    //        state.last ? " (last)" : ""));
                    state.mode = LEN_ /* decode codes */
                    if (flush === Z_TREES) {
                      //--- DROPBITS(2) ---//
                      hold >>>= 2
                      bits -= 2
                      //---//
                      break inf_leave
                    }
                    break
                  case 2 /* dynamic block */:
                    //Tracev((stderr, "inflate:     dynamic codes block%s\n",
                    //        state.last ? " (last)" : ""));
                    state.mode = TABLE
                    break
                  case 3:
                    strm.msg = "invalid block type"
                    state.mode = BAD
                }
                //--- DROPBITS(2) ---//
                hold >>>= 2
                bits -= 2
                //---//
                break
              case STORED:
                //--- BYTEBITS() ---// /* go to byte boundary */
                hold >>>= bits & 7
                bits -= bits & 7
                //---//
                //=== NEEDBITS(32); */
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave
                  }
                  have--
                  hold += input[next++] << bits
                  bits += 8
                }
                //===//
                if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
                  strm.msg = "invalid stored block lengths"
                  state.mode = BAD
                  break
                }
                state.length = hold & 0xffff
                //Tracev((stderr, "inflate:       stored length %u\n",
                //        state.length));
                //=== INITBITS();
                hold = 0
                bits = 0
                //===//
                state.mode = COPY_
                if (flush === Z_TREES) {
                  break inf_leave
                }
              /* falls through */
              case COPY_:
                state.mode = COPY
              /* falls through */
              case COPY:
                copy = state.length
                if (copy) {
                  if (copy > have) {
                    copy = have
                  }
                  if (copy > left) {
                    copy = left
                  }
                  if (copy === 0) {
                    break inf_leave
                  }
                  //--- zmemcpy(put, next, copy); ---
                  utils.arraySet(output, input, next, copy, put)
                  //---//
                  have -= copy
                  next += copy
                  left -= copy
                  put += copy
                  state.length -= copy
                  break
                }
                //Tracev((stderr, "inflate:       stored end\n"));
                state.mode = TYPE
                break
              case TABLE:
                //=== NEEDBITS(14); */
                while (bits < 14) {
                  if (have === 0) {
                    break inf_leave
                  }
                  have--
                  hold += input[next++] << bits
                  bits += 8
                }
                //===//
                state.nlen = (hold & 0x1f) /*BITS(5)*/ + 257
                //--- DROPBITS(5) ---//
                hold >>>= 5
                bits -= 5
                //---//
                state.ndist = (hold & 0x1f) /*BITS(5)*/ + 1
                //--- DROPBITS(5) ---//
                hold >>>= 5
                bits -= 5
                //---//
                state.ncode = (hold & 0x0f) /*BITS(4)*/ + 4
                //--- DROPBITS(4) ---//
                hold >>>= 4
                bits -= 4
                //---//
                //#ifndef PKZIP_BUG_WORKAROUND
                if (state.nlen > 286 || state.ndist > 30) {
                  strm.msg = "too many length or distance symbols"
                  state.mode = BAD
                  break
                }
                //#endif
                //Tracev((stderr, "inflate:       table sizes ok\n"));
                state.have = 0
                state.mode = LENLENS
              /* falls through */
              case LENLENS:
                while (state.have < state.ncode) {
                  //=== NEEDBITS(3);
                  while (bits < 3) {
                    if (have === 0) {
                      break inf_leave
                    }
                    have--
                    hold += input[next++] << bits
                    bits += 8
                  }
                  //===//
                  state.lens[order[state.have++]] = hold & 0x07 //BITS(3);
                  //--- DROPBITS(3) ---//
                  hold >>>= 3
                  bits -= 3
                  //---//
                }
                while (state.have < 19) {
                  state.lens[order[state.have++]] = 0
                }
                // We have separate tables & no pointers. 2 commented lines below not needed.
                //state.next = state.codes;
                //state.lencode = state.next;
                // Switch to use dynamic table
                state.lencode = state.lendyn
                state.lenbits = 7

                opts = { bits: state.lenbits }
                ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts)
                state.lenbits = opts.bits

                if (ret) {
                  strm.msg = "invalid code lengths set"
                  state.mode = BAD
                  break
                }
                //Tracev((stderr, "inflate:       code lengths ok\n"));
                state.have = 0
                state.mode = CODELENS
              /* falls through */
              case CODELENS:
                while (state.have < state.nlen + state.ndist) {
                  for (;;) {
                    here = state.lencode[hold & ((1 << state.lenbits) - 1)] /*BITS(state.lenbits)*/
                    here_bits = here >>> 24
                    here_op = (here >>> 16) & 0xff
                    here_val = here & 0xffff

                    if (here_bits <= bits) {
                      break
                    }
                    //--- PULLBYTE() ---//
                    if (have === 0) {
                      break inf_leave
                    }
                    have--
                    hold += input[next++] << bits
                    bits += 8
                    //---//
                  }
                  if (here_val < 16) {
                    //--- DROPBITS(here.bits) ---//
                    hold >>>= here_bits
                    bits -= here_bits
                    //---//
                    state.lens[state.have++] = here_val
                  } else {
                    if (here_val === 16) {
                      //=== NEEDBITS(here.bits + 2);
                      n = here_bits + 2
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave
                        }
                        have--
                        hold += input[next++] << bits
                        bits += 8
                      }
                      //===//
                      //--- DROPBITS(here.bits) ---//
                      hold >>>= here_bits
                      bits -= here_bits
                      //---//
                      if (state.have === 0) {
                        strm.msg = "invalid bit length repeat"
                        state.mode = BAD
                        break
                      }
                      len = state.lens[state.have - 1]
                      copy = 3 + (hold & 0x03) //BITS(2);
                      //--- DROPBITS(2) ---//
                      hold >>>= 2
                      bits -= 2
                      //---//
                    } else if (here_val === 17) {
                      //=== NEEDBITS(here.bits + 3);
                      n = here_bits + 3
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave
                        }
                        have--
                        hold += input[next++] << bits
                        bits += 8
                      }
                      //===//
                      //--- DROPBITS(here.bits) ---//
                      hold >>>= here_bits
                      bits -= here_bits
                      //---//
                      len = 0
                      copy = 3 + (hold & 0x07) //BITS(3);
                      //--- DROPBITS(3) ---//
                      hold >>>= 3
                      bits -= 3
                      //---//
                    } else {
                      //=== NEEDBITS(here.bits + 7);
                      n = here_bits + 7
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave
                        }
                        have--
                        hold += input[next++] << bits
                        bits += 8
                      }
                      //===//
                      //--- DROPBITS(here.bits) ---//
                      hold >>>= here_bits
                      bits -= here_bits
                      //---//
                      len = 0
                      copy = 11 + (hold & 0x7f) //BITS(7);
                      //--- DROPBITS(7) ---//
                      hold >>>= 7
                      bits -= 7
                      //---//
                    }
                    if (state.have + copy > state.nlen + state.ndist) {
                      strm.msg = "invalid bit length repeat"
                      state.mode = BAD
                      break
                    }
                    while (copy--) {
                      state.lens[state.have++] = len
                    }
                  }
                }

                /* handle error breaks in while */
                if (state.mode === BAD) {
                  break
                }

                /* check for end-of-block code (better have one) */
                if (state.lens[256] === 0) {
                  strm.msg = "invalid code -- missing end-of-block"
                  state.mode = BAD
                  break
                }

                /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
                state.lenbits = 9

                opts = { bits: state.lenbits }
                ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts)
                // We have separate tables & no pointers. 2 commented lines below not needed.
                // state.next_index = opts.table_index;
                state.lenbits = opts.bits
                // state.lencode = state.next;

                if (ret) {
                  strm.msg = "invalid literal/lengths set"
                  state.mode = BAD
                  break
                }

                state.distbits = 6
                //state.distcode.copy(state.codes);
                // Switch to use dynamic table
                state.distcode = state.distdyn
                opts = { bits: state.distbits }
                ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts)
                // We have separate tables & no pointers. 2 commented lines below not needed.
                // state.next_index = opts.table_index;
                state.distbits = opts.bits
                // state.distcode = state.next;

                if (ret) {
                  strm.msg = "invalid distances set"
                  state.mode = BAD
                  break
                }
                //Tracev((stderr, 'inflate:       codes ok\n'));
                state.mode = LEN_
                if (flush === Z_TREES) {
                  break inf_leave
                }
              /* falls through */
              case LEN_:
                state.mode = LEN
              /* falls through */
              case LEN:
                if (have >= 6 && left >= 258) {
                  //--- RESTORE() ---
                  strm.next_out = put
                  strm.avail_out = left
                  strm.next_in = next
                  strm.avail_in = have
                  state.hold = hold
                  state.bits = bits
                  //---
                  inflate_fast(strm, _out)
                  //--- LOAD() ---
                  put = strm.next_out
                  output = strm.output
                  left = strm.avail_out
                  next = strm.next_in
                  input = strm.input
                  have = strm.avail_in
                  hold = state.hold
                  bits = state.bits
                  //---

                  if (state.mode === TYPE) {
                    state.back = -1
                  }
                  break
                }
                state.back = 0
                for (;;) {
                  here = state.lencode[hold & ((1 << state.lenbits) - 1)] /*BITS(state.lenbits)*/
                  here_bits = here >>> 24
                  here_op = (here >>> 16) & 0xff
                  here_val = here & 0xffff

                  if (here_bits <= bits) {
                    break
                  }
                  //--- PULLBYTE() ---//
                  if (have === 0) {
                    break inf_leave
                  }
                  have--
                  hold += input[next++] << bits
                  bits += 8
                  //---//
                }
                if (here_op && (here_op & 0xf0) === 0) {
                  last_bits = here_bits
                  last_op = here_op
                  last_val = here_val
                  for (;;) {
                    here = state.lencode[last_val + ((hold & ((1 << (last_bits + last_op)) - 1)) /*BITS(last.bits + last.op)*/ >> last_bits)]
                    here_bits = here >>> 24
                    here_op = (here >>> 16) & 0xff
                    here_val = here & 0xffff

                    if (last_bits + here_bits <= bits) {
                      break
                    }
                    //--- PULLBYTE() ---//
                    if (have === 0) {
                      break inf_leave
                    }
                    have--
                    hold += input[next++] << bits
                    bits += 8
                    //---//
                  }
                  //--- DROPBITS(last.bits) ---//
                  hold >>>= last_bits
                  bits -= last_bits
                  //---//
                  state.back += last_bits
                }
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits
                bits -= here_bits
                //---//
                state.back += here_bits
                state.length = here_val
                if (here_op === 0) {
                  //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
                  //        "inflate:         literal '%c'\n" :
                  //        "inflate:         literal 0x%02x\n", here.val));
                  state.mode = LIT
                  break
                }
                if (here_op & 32) {
                  //Tracevv((stderr, "inflate:         end of block\n"));
                  state.back = -1
                  state.mode = TYPE
                  break
                }
                if (here_op & 64) {
                  strm.msg = "invalid literal/length code"
                  state.mode = BAD
                  break
                }
                state.extra = here_op & 15
                state.mode = LENEXT
              /* falls through */
              case LENEXT:
                if (state.extra) {
                  //=== NEEDBITS(state.extra);
                  n = state.extra
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave
                    }
                    have--
                    hold += input[next++] << bits
                    bits += 8
                  }
                  //===//
                  state.length += hold & ((1 << state.extra) - 1) /*BITS(state.extra)*/
                  //--- DROPBITS(state.extra) ---//
                  hold >>>= state.extra
                  bits -= state.extra
                  //---//
                  state.back += state.extra
                }
                //Tracevv((stderr, "inflate:         length %u\n", state.length));
                state.was = state.length
                state.mode = DIST
              /* falls through */
              case DIST:
                for (;;) {
                  here = state.distcode[hold & ((1 << state.distbits) - 1)] /*BITS(state.distbits)*/
                  here_bits = here >>> 24
                  here_op = (here >>> 16) & 0xff
                  here_val = here & 0xffff

                  if (here_bits <= bits) {
                    break
                  }
                  //--- PULLBYTE() ---//
                  if (have === 0) {
                    break inf_leave
                  }
                  have--
                  hold += input[next++] << bits
                  bits += 8
                  //---//
                }
                if ((here_op & 0xf0) === 0) {
                  last_bits = here_bits
                  last_op = here_op
                  last_val = here_val
                  for (;;) {
                    here = state.distcode[last_val + ((hold & ((1 << (last_bits + last_op)) - 1)) /*BITS(last.bits + last.op)*/ >> last_bits)]
                    here_bits = here >>> 24
                    here_op = (here >>> 16) & 0xff
                    here_val = here & 0xffff

                    if (last_bits + here_bits <= bits) {
                      break
                    }
                    //--- PULLBYTE() ---//
                    if (have === 0) {
                      break inf_leave
                    }
                    have--
                    hold += input[next++] << bits
                    bits += 8
                    //---//
                  }
                  //--- DROPBITS(last.bits) ---//
                  hold >>>= last_bits
                  bits -= last_bits
                  //---//
                  state.back += last_bits
                }
                //--- DROPBITS(here.bits) ---//
                hold >>>= here_bits
                bits -= here_bits
                //---//
                state.back += here_bits
                if (here_op & 64) {
                  strm.msg = "invalid distance code"
                  state.mode = BAD
                  break
                }
                state.offset = here_val
                state.extra = here_op & 15
                state.mode = DISTEXT
              /* falls through */
              case DISTEXT:
                if (state.extra) {
                  //=== NEEDBITS(state.extra);
                  n = state.extra
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave
                    }
                    have--
                    hold += input[next++] << bits
                    bits += 8
                  }
                  //===//
                  state.offset += hold & ((1 << state.extra) - 1) /*BITS(state.extra)*/
                  //--- DROPBITS(state.extra) ---//
                  hold >>>= state.extra
                  bits -= state.extra
                  //---//
                  state.back += state.extra
                }
                //#ifdef INFLATE_STRICT
                if (state.offset > state.dmax) {
                  strm.msg = "invalid distance too far back"
                  state.mode = BAD
                  break
                }
                //#endif
                //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
                state.mode = MATCH
              /* falls through */
              case MATCH:
                if (left === 0) {
                  break inf_leave
                }
                copy = _out - left
                if (state.offset > copy) {
                  /* copy from window */
                  copy = state.offset - copy
                  if (copy > state.whave) {
                    if (state.sane) {
                      strm.msg = "invalid distance too far back"
                      state.mode = BAD
                      break
                    }
                    // (!) This block is disabled in zlib defaults,
                    // don't enable it for binary compatibility
                    //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
                    //          Trace((stderr, "inflate.c too far\n"));
                    //          copy -= state.whave;
                    //          if (copy > state.length) { copy = state.length; }
                    //          if (copy > left) { copy = left; }
                    //          left -= copy;
                    //          state.length -= copy;
                    //          do {
                    //            output[put++] = 0;
                    //          } while (--copy);
                    //          if (state.length === 0) { state.mode = LEN; }
                    //          break;
                    //#endif
                  }
                  if (copy > state.wnext) {
                    copy -= state.wnext
                    from = state.wsize - copy
                  } else {
                    from = state.wnext - copy
                  }
                  if (copy > state.length) {
                    copy = state.length
                  }
                  from_source = state.window
                } else {
                  /* copy from output */
                  from_source = output
                  from = put - state.offset
                  copy = state.length
                }
                if (copy > left) {
                  copy = left
                }
                left -= copy
                state.length -= copy
                do {
                  output[put++] = from_source[from++]
                } while (--copy)
                if (state.length === 0) {
                  state.mode = LEN
                }
                break
              case LIT:
                if (left === 0) {
                  break inf_leave
                }
                output[put++] = state.length
                left--
                state.mode = LEN
                break
              case CHECK:
                if (state.wrap) {
                  //=== NEEDBITS(32);
                  while (bits < 32) {
                    if (have === 0) {
                      break inf_leave
                    }
                    have--
                    // Use '|' instead of '+' to make sure that result is signed
                    hold |= input[next++] << bits
                    bits += 8
                  }
                  //===//
                  _out -= left
                  strm.total_out += _out
                  state.total += _out
                  if (_out) {
                    strm.adler = state.check =
                      /*UPDATE(state.check, put - _out, _out);*/
                      state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out)
                  }
                  _out = left
                  // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
                  if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                    strm.msg = "incorrect data check"
                    state.mode = BAD
                    break
                  }
                  //=== INITBITS();
                  hold = 0
                  bits = 0
                  //===//
                  //Tracev((stderr, "inflate:   check matches trailer\n"));
                }
                state.mode = LENGTH
              /* falls through */
              case LENGTH:
                if (state.wrap && state.flags) {
                  //=== NEEDBITS(32);
                  while (bits < 32) {
                    if (have === 0) {
                      break inf_leave
                    }
                    have--
                    hold += input[next++] << bits
                    bits += 8
                  }
                  //===//
                  if (hold !== (state.total & 0xffffffff)) {
                    strm.msg = "incorrect length check"
                    state.mode = BAD
                    break
                  }
                  //=== INITBITS();
                  hold = 0
                  bits = 0
                  //===//
                  //Tracev((stderr, "inflate:   length matches trailer\n"));
                }
                state.mode = DONE
              /* falls through */
              case DONE:
                ret = Z_STREAM_END
                break inf_leave
              case BAD:
                ret = Z_DATA_ERROR
                break inf_leave
              case MEM:
                return Z_MEM_ERROR
              case SYNC:
              /* falls through */
              default:
                return Z_STREAM_ERROR
            }
          }

          // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

          /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

          //--- RESTORE() ---
          strm.next_out = put
          strm.avail_out = left
          strm.next_in = next
          strm.avail_in = have
          state.hold = hold
          state.bits = bits
          //---

          if (state.wsize || (_out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH))) {
            if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
              state.mode = MEM
              return Z_MEM_ERROR
            }
          }
          _in -= strm.avail_in
          _out -= strm.avail_out
          strm.total_in += _in
          strm.total_out += _out
          state.total += _out
          if (state.wrap && _out) {
            strm.adler = state.check =
              /*UPDATE(state.check, strm.next_out - _out, _out);*/
              state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out)
          }
          strm.data_type =
            state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0)
          if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
            ret = Z_BUF_ERROR
          }
          return ret
        }

        function inflateEnd(strm) {
          if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
            return Z_STREAM_ERROR
          }

          var state = strm.state
          if (state.window) {
            state.window = null
          }
          strm.state = null
          return Z_OK
        }

        function inflateGetHeader(strm, head) {
          var state

          /* check state */
          if (!strm || !strm.state) {
            return Z_STREAM_ERROR
          }
          state = strm.state
          if ((state.wrap & 2) === 0) {
            return Z_STREAM_ERROR
          }

          /* save header structure */
          state.head = head
          head.done = false
          return Z_OK
        }

        function inflateSetDictionary(strm, dictionary) {
          var dictLength = dictionary.length

          var state
          var dictid
          var ret

          /* check state */
          if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) {
            return Z_STREAM_ERROR
          }
          state = strm.state

          if (state.wrap !== 0 && state.mode !== DICT) {
            return Z_STREAM_ERROR
          }

          /* check for correct dictionary identifier */
          if (state.mode === DICT) {
            dictid = 1 /* adler32(0, null, 0)*/
            /* dictid = adler32(dictid, dictionary, dictLength); */
            dictid = adler32(dictid, dictionary, dictLength, 0)
            if (dictid !== state.check) {
              return Z_DATA_ERROR
            }
          }
          /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
          ret = updatewindow(strm, dictionary, dictLength, dictLength)
          if (ret) {
            state.mode = MEM
            return Z_MEM_ERROR
          }
          state.havedict = 1
          // Tracev((stderr, "inflate:   dictionary set\n"));
          return Z_OK
        }

        exports.inflateReset = inflateReset
        exports.inflateReset2 = inflateReset2
        exports.inflateResetKeep = inflateResetKeep
        exports.inflateInit = inflateInit
        exports.inflateInit2 = inflateInit2
        exports.inflate = inflate
        exports.inflateEnd = inflateEnd
        exports.inflateGetHeader = inflateGetHeader
        exports.inflateSetDictionary = inflateSetDictionary
        exports.inflateInfo = "pako inflate (from Nodeca project)"

        /* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

        /***/
      },
      /* 40 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        // See state defs from inflate.js
        var BAD = 30 /* got a data error -- remain here until reset */
        var TYPE = 12 /* i: waiting for type bits, including last-flag bit */

        /*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
        module.exports = function inflate_fast(strm, start) {
          var state
          var _in /* local strm.input */
          var last /* have enough input while in < last */
          var _out /* local strm.output */
          var beg /* inflate()'s initial strm.output */
          var end /* while out < end, enough space available */
          //#ifdef INFLATE_STRICT
          var dmax /* maximum distance from zlib header */
          //#endif
          var wsize /* window size or zero if not using window */
          var whave /* valid bytes in the window */
          var wnext /* window write index */
          // Use `s_window` instead `window`, avoid conflict with instrumentation tools
          var s_window /* allocated sliding window, if wsize != 0 */
          var hold /* local strm.hold */
          var bits /* local strm.bits */
          var lcode /* local strm.lencode */
          var dcode /* local strm.distcode */
          var lmask /* mask for first level of length codes */
          var dmask /* mask for first level of distance codes */
          var here /* retrieved table entry */
          var op /* code bits, operation, extra bits, or */
          /*  window position, window bytes to copy */
          var len /* match length, unused bytes */
          var dist /* match distance */
          var from /* where to copy match from */
          var from_source

          var input, output // JS specific, because we have no pointers

          /* copy state to local variables */
          state = strm.state
          //here = state.here;
          _in = strm.next_in
          input = strm.input
          last = _in + (strm.avail_in - 5)
          _out = strm.next_out
          output = strm.output
          beg = _out - (start - strm.avail_out)
          end = _out + (strm.avail_out - 257)
          //#ifdef INFLATE_STRICT
          dmax = state.dmax
          //#endif
          wsize = state.wsize
          whave = state.whave
          wnext = state.wnext
          s_window = state.window
          hold = state.hold
          bits = state.bits
          lcode = state.lencode
          dcode = state.distcode
          lmask = (1 << state.lenbits) - 1
          dmask = (1 << state.distbits) - 1

          /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

          top: do {
            if (bits < 15) {
              hold += input[_in++] << bits
              bits += 8
              hold += input[_in++] << bits
              bits += 8
            }

            here = lcode[hold & lmask]

            dolen: for (;;) {
              // Goto emulation
              op = here >>> 24 /*here.bits*/
              hold >>>= op
              bits -= op
              op = (here >>> 16) & 0xff /*here.op*/
              if (op === 0) {
                /* literal */
                //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
                //        "inflate:         literal '%c'\n" :
                //        "inflate:         literal 0x%02x\n", here.val));
                output[_out++] = here & 0xffff /*here.val*/
              } else if (op & 16) {
                /* length base */
                len = here & 0xffff /*here.val*/
                op &= 15 /* number of extra bits */
                if (op) {
                  if (bits < op) {
                    hold += input[_in++] << bits
                    bits += 8
                  }
                  len += hold & ((1 << op) - 1)
                  hold >>>= op
                  bits -= op
                }
                //Tracevv((stderr, "inflate:         length %u\n", len));
                if (bits < 15) {
                  hold += input[_in++] << bits
                  bits += 8
                  hold += input[_in++] << bits
                  bits += 8
                }
                here = dcode[hold & dmask]

                dodist: for (;;) {
                  // goto emulation
                  op = here >>> 24 /*here.bits*/
                  hold >>>= op
                  bits -= op
                  op = (here >>> 16) & 0xff /*here.op*/

                  if (op & 16) {
                    /* distance base */
                    dist = here & 0xffff /*here.val*/
                    op &= 15 /* number of extra bits */
                    if (bits < op) {
                      hold += input[_in++] << bits
                      bits += 8
                      if (bits < op) {
                        hold += input[_in++] << bits
                        bits += 8
                      }
                    }
                    dist += hold & ((1 << op) - 1)
                    //#ifdef INFLATE_STRICT
                    if (dist > dmax) {
                      strm.msg = "invalid distance too far back"
                      state.mode = BAD
                      break top
                    }
                    //#endif
                    hold >>>= op
                    bits -= op
                    //Tracevv((stderr, "inflate:         distance %u\n", dist));
                    op = _out - beg /* max distance in output */
                    if (dist > op) {
                      /* see if copy from window */
                      op = dist - op /* distance back in window */
                      if (op > whave) {
                        if (state.sane) {
                          strm.msg = "invalid distance too far back"
                          state.mode = BAD
                          break top
                        }

                        // (!) This block is disabled in zlib defaults,
                        // don't enable it for binary compatibility
                        //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
                        //                if (len <= op - whave) {
                        //                  do {
                        //                    output[_out++] = 0;
                        //                  } while (--len);
                        //                  continue top;
                        //                }
                        //                len -= op - whave;
                        //                do {
                        //                  output[_out++] = 0;
                        //                } while (--op > whave);
                        //                if (op === 0) {
                        //                  from = _out - dist;
                        //                  do {
                        //                    output[_out++] = output[from++];
                        //                  } while (--len);
                        //                  continue top;
                        //                }
                        //#endif
                      }
                      from = 0 // window index
                      from_source = s_window
                      if (wnext === 0) {
                        /* very common case */
                        from += wsize - op
                        if (op < len) {
                          /* some from window */
                          len -= op
                          do {
                            output[_out++] = s_window[from++]
                          } while (--op)
                          from = _out - dist /* rest from output */
                          from_source = output
                        }
                      } else if (wnext < op) {
                        /* wrap around window */
                        from += wsize + wnext - op
                        op -= wnext
                        if (op < len) {
                          /* some from end of window */
                          len -= op
                          do {
                            output[_out++] = s_window[from++]
                          } while (--op)
                          from = 0
                          if (wnext < len) {
                            /* some from start of window */
                            op = wnext
                            len -= op
                            do {
                              output[_out++] = s_window[from++]
                            } while (--op)
                            from = _out - dist /* rest from output */
                            from_source = output
                          }
                        }
                      } else {
                        /* contiguous in window */
                        from += wnext - op
                        if (op < len) {
                          /* some from window */
                          len -= op
                          do {
                            output[_out++] = s_window[from++]
                          } while (--op)
                          from = _out - dist /* rest from output */
                          from_source = output
                        }
                      }
                      while (len > 2) {
                        output[_out++] = from_source[from++]
                        output[_out++] = from_source[from++]
                        output[_out++] = from_source[from++]
                        len -= 3
                      }
                      if (len) {
                        output[_out++] = from_source[from++]
                        if (len > 1) {
                          output[_out++] = from_source[from++]
                        }
                      }
                    } else {
                      from = _out - dist /* copy direct from output */
                      do {
                        /* minimum length is three */
                        output[_out++] = output[from++]
                        output[_out++] = output[from++]
                        output[_out++] = output[from++]
                        len -= 3
                      } while (len > 2)
                      if (len) {
                        output[_out++] = output[from++]
                        if (len > 1) {
                          output[_out++] = output[from++]
                        }
                      }
                    }
                  } else if ((op & 64) === 0) {
                    /* 2nd level distance code */
                    here = dcode[(here & 0xffff) /*here.val*/ + (hold & ((1 << op) - 1))]
                    continue dodist
                  } else {
                    strm.msg = "invalid distance code"
                    state.mode = BAD
                    break top
                  }

                  break // need to emulate goto via "continue"
                }
              } else if ((op & 64) === 0) {
                /* 2nd level length code */
                here = lcode[(here & 0xffff) /*here.val*/ + (hold & ((1 << op) - 1))]
                continue dolen
              } else if (op & 32) {
                /* end-of-block */
                //Tracevv((stderr, "inflate:         end of block\n"));
                state.mode = TYPE
                break top
              } else {
                strm.msg = "invalid literal/length code"
                state.mode = BAD
                break top
              }

              break // need to emulate goto via "continue"
            }
          } while (_in < last && _out < end)

          /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
          len = bits >> 3
          _in -= len
          bits -= len << 3
          hold &= (1 << bits) - 1

          /* update state and return */
          strm.next_in = _in
          strm.next_out = _out
          strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last)
          strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end)
          state.hold = hold
          state.bits = bits
          return
        }

        /***/
      },
      /* 41 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        var utils = __webpack_require__(3)

        var MAXBITS = 15
        var ENOUGH_LENS = 852
        var ENOUGH_DISTS = 592
        //var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

        var CODES = 0
        var LENS = 1
        var DISTS = 2

        var lbase = [
          /* Length codes 257..285 base */ 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195,
          227, 258, 0, 0
        ]

        var lext = [
          /* Length codes 257..285 extra */ 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21,
          21, 21, 16, 72, 78
        ]

        var dbase = [
          /* Distance codes 0..29 base */ 1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097,
          6145, 8193, 12289, 16385, 24577, 0, 0
        ]

        var dext = [
          /* Distance codes 0..29 extra */ 16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28,
          28, 29, 29, 64, 64
        ]

        module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
          var bits = opts.bits
          //here = opts.here; /* table entry for duplication */

          var len = 0 /* a code's length in bits */
          var sym = 0 /* index of code symbols */
          var min = 0,
            max = 0 /* minimum and maximum code lengths */
          var root = 0 /* number of index bits for root table */
          var curr = 0 /* number of index bits for current table */
          var drop = 0 /* code bits to drop for sub-table */
          var left = 0 /* number of prefix codes available */
          var used = 0 /* code entries in table used */
          var huff = 0 /* Huffman code */
          var incr /* for incrementing code, index */
          var fill /* index for replicating entries */
          var low /* low bits for current root entry */
          var mask /* mask for low root bits */
          var next /* next available space in table */
          var base = null /* base value table to use */
          var base_index = 0
          //  var shoextra;    /* extra bits table to use */
          var end /* use base and extra for symbol > end */
          var count = new utils.Buf16(MAXBITS + 1) //[MAXBITS+1];    /* number of codes of each length */
          var offs = new utils.Buf16(MAXBITS + 1) //[MAXBITS+1];     /* offsets in table for each length */
          var extra = null
          var extra_index = 0

          var here_bits, here_op, here_val

          /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

          /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
          for (len = 0; len <= MAXBITS; len++) {
            count[len] = 0
          }
          for (sym = 0; sym < codes; sym++) {
            count[lens[lens_index + sym]]++
          }

          /* bound code lengths, force root to be within code lengths */
          root = bits
          for (max = MAXBITS; max >= 1; max--) {
            if (count[max] !== 0) {
              break
            }
          }
          if (root > max) {
            root = max
          }
          if (max === 0) {
            /* no symbols to code at all */
            //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
            //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
            //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
            table[table_index++] = (1 << 24) | (64 << 16) | 0

            //table.op[opts.table_index] = 64;
            //table.bits[opts.table_index] = 1;
            //table.val[opts.table_index++] = 0;
            table[table_index++] = (1 << 24) | (64 << 16) | 0

            opts.bits = 1
            return 0 /* no symbols, but wait for decoding to report error */
          }
          for (min = 1; min < max; min++) {
            if (count[min] !== 0) {
              break
            }
          }
          if (root < min) {
            root = min
          }

          /* check for an over-subscribed or incomplete set of lengths */
          left = 1
          for (len = 1; len <= MAXBITS; len++) {
            left <<= 1
            left -= count[len]
            if (left < 0) {
              return -1
            } /* over-subscribed */
          }
          if (left > 0 && (type === CODES || max !== 1)) {
            return -1 /* incomplete set */
          }

          /* generate offsets into symbol table for each length for sorting */
          offs[1] = 0
          for (len = 1; len < MAXBITS; len++) {
            offs[len + 1] = offs[len] + count[len]
          }

          /* sort symbols by length, by symbol order within each length */
          for (sym = 0; sym < codes; sym++) {
            if (lens[lens_index + sym] !== 0) {
              work[offs[lens[lens_index + sym]]++] = sym
            }
          }

          /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

          /* set up for code type */
          // poor man optimization - use if-else instead of switch,
          // to avoid deopts in old v8
          if (type === CODES) {
            base = extra = work /* dummy value--not used */
            end = 19
          } else if (type === LENS) {
            base = lbase
            base_index -= 257
            extra = lext
            extra_index -= 257
            end = 256
          } else {
            /* DISTS */
            base = dbase
            extra = dext
            end = -1
          }

          /* initialize opts for loop */
          huff = 0 /* starting code */
          sym = 0 /* starting code symbol */
          len = min /* starting code length */
          next = table_index /* current table to fill in */
          curr = root /* current table index bits */
          drop = 0 /* current bits to drop from code for index */
          low = -1 /* trigger new sub-table when len > root */
          used = 1 << root /* use root table entries */
          mask = used - 1 /* mask for comparing low */

          /* check available table space */
          if ((type === LENS && used > ENOUGH_LENS) || (type === DISTS && used > ENOUGH_DISTS)) {
            return 1
          }

          /* process all codes and make table entries */
          for (;;) {
            /* create table entry */
            here_bits = len - drop
            if (work[sym] < end) {
              here_op = 0
              here_val = work[sym]
            } else if (work[sym] > end) {
              here_op = extra[extra_index + work[sym]]
              here_val = base[base_index + work[sym]]
            } else {
              here_op = 32 + 64 /* end of block */
              here_val = 0
            }

            /* replicate for those indices with low len bits equal to huff */
            incr = 1 << (len - drop)
            fill = 1 << curr
            min = fill /* save offset to next table */
            do {
              fill -= incr
              table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val | 0
            } while (fill !== 0)

            /* backwards increment the len-bit code huff */
            incr = 1 << (len - 1)
            while (huff & incr) {
              incr >>= 1
            }
            if (incr !== 0) {
              huff &= incr - 1
              huff += incr
            } else {
              huff = 0
            }

            /* go to next symbol, update count, len */
            sym++
            if (--count[len] === 0) {
              if (len === max) {
                break
              }
              len = lens[lens_index + work[sym]]
            }

            /* create new sub-table if needed */
            if (len > root && (huff & mask) !== low) {
              /* if first time, transition to sub-tables */
              if (drop === 0) {
                drop = root
              }

              /* increment past last table */
              next += min /* here min is 1 << curr */

              /* determine length of next table */
              curr = len - drop
              left = 1 << curr
              while (curr + drop < max) {
                left -= count[curr + drop]
                if (left <= 0) {
                  break
                }
                curr++
                left <<= 1
              }

              /* check for enough space */
              used += 1 << curr
              if ((type === LENS && used > ENOUGH_LENS) || (type === DISTS && used > ENOUGH_DISTS)) {
                return 1
              }

              /* point entry in root table to sub-table */
              low = huff & mask
              /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
              table[low] = (root << 24) | (curr << 16) | (next - table_index) | 0
            }
          }

          /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
          if (huff !== 0) {
            //table.op[next + huff] = 64;            /* invalid code marker */
            //table.bits[next + huff] = len - drop;
            //table.val[next + huff] = 0;
            table[next + huff] = ((len - drop) << 24) | (64 << 16) | 0
          }

          /* set return parameters */
          //opts.table_index += used;
          opts.bits = root
          return 0
        }

        /***/
      },
      /* 42 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.

        function GZheader() {
          /* true if compressed data believed to be text */
          this.text = 0
          /* modification time */
          this.time = 0
          /* extra flags (not used when writing a gzip file) */
          this.xflags = 0
          /* operating system */
          this.os = 0
          /* pointer to extra field or Z_NULL if none */
          this.extra = null
          /* extra field length (valid if extra != Z_NULL) */
          this.extra_len = 0 // Actually, we don't need it in JS,
          // but leave for few code modifications

          //
          // Setup limits is not necessary because in js we should not preallocate memory
          // for inflate use constant limit in 65536 bytes
          //

          /* space at extra (only when reading header) */
          // this.extra_max  = 0;
          /* pointer to zero-terminated file name or Z_NULL */
          this.name = ""
          /* space at name (only when reading header) */
          // this.name_max   = 0;
          /* pointer to zero-terminated comment or Z_NULL */
          this.comment = ""
          /* space at comment (only when reading header) */
          // this.comm_max   = 0;
          /* true if there was or will be a header crc */
          this.hcrc = 0
          /* true when done reading gzip header (not used when writing a gzip file) */
          this.done = false
        }

        module.exports = GZheader

        /***/
      },
      /* 43 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var utils = __webpack_require__(2)

        var table = [
          0x00000000, 0x77073096, 0xee0e612c, 0x990951ba, 0x076dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 0x0edb8832, 0x79dcb8a4, 0xe0d5e91e,
          0x97d2d988, 0x09b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb,
          0xf4d4b551, 0x83d385c7, 0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5, 0x3b6e20c8,
          0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940,
          0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599,
          0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190, 0x01db7106,
          0x98d220bc, 0xefd5102a, 0x71b18589, 0x06b6b51f, 0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0x0f00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb,
          0x086d3d2d, 0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457,
          0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074,
          0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5,
          0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f, 0x5edef90e,
          0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x03b6e20c, 0x74b1d29a,
          0xead54739, 0x9dd277af, 0x04db2615, 0x73dc1683, 0xe3630b12, 0x94643b84, 0x0d6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0x0a00ae27,
          0x7d079eb1, 0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0,
          0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1,
          0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79,
          0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92,
          0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x026d930a, 0x9c0906a9, 0xeb0e363f,
          0x72076785, 0x05005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0x0cb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0x0bdbdf21, 0x86d3d2d4,
          0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c,
          0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d,
          0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9, 0xbdbdf21c, 0xcabac28a,
          0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37,
          0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d
        ]

        /**
         *
         *  Javascript crc32
         *  http://www.webtoolkit.info/
         *
         */
        module.exports = function crc32(input, crc) {
          if (typeof input === "undefined" || !input.length) {
            return 0
          }

          var isArray = utils.getTypeOf(input) !== "string"

          if (typeof crc == "undefined") {
            crc = 0
          }
          var x = 0
          var y = 0
          var b = 0

          crc = crc ^ -1
          for (var i = 0, iTop = input.length; i < iTop; i++) {
            b = isArray ? input[i] : input.charCodeAt(i)
            y = (crc ^ b) & 0xff
            x = table[y]
            crc = (crc >>> 8) ^ x
          }

          return crc ^ -1
        }
        // vim: set shiftwidth=4 softtabstop=4:

        /***/
      },
      /* 44 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var utils = __webpack_require__(2)

        /**
         * An object to write any content to a string.
         * @constructor
         */
        var StringWriter = function () {
          this.data = []
        }
        StringWriter.prototype = {
          /**
           * Append any content to the current string.
           * @param {Object} input the content to add.
           */
          append: function (input) {
            input = utils.transformTo("string", input)
            this.data.push(input)
          },
          /**
           * Finalize the construction an return the result.
           * @return {string} the generated string.
           */
          finalize: function () {
            return this.data.join("")
          }
        }

        module.exports = StringWriter

        /***/
      },
      /* 45 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var utils = __webpack_require__(2)

        /**
         * An object to write any content to an Uint8Array.
         * @constructor
         * @param {number} length The length of the array.
         */
        var Uint8ArrayWriter = function (length) {
          this.data = new Uint8Array(length)
          this.index = 0
        }
        Uint8ArrayWriter.prototype = {
          /**
           * Append any content to the current array.
           * @param {Object} input the content to add.
           */
          append: function (input) {
            if (input.length !== 0) {
              // with an empty Uint8Array, Opera fails with a "Offset larger than array size"
              input = utils.transformTo("uint8array", input)
              this.data.set(input, this.index)
              this.index += input.length
            }
          },
          /**
           * Finalize the construction an return the result.
           * @return {Uint8Array} the generated array.
           */
          finalize: function () {
            return this.data
          }
        }

        module.exports = Uint8ArrayWriter

        /***/
      },
      /* 46 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var base64 = __webpack_require__(8)
        var utf8 = __webpack_require__(21)
        var utils = __webpack_require__(2)
        var ZipEntries = __webpack_require__(47)
        module.exports = function (data, options) {
          var files, zipEntries, i, input
          options = utils.extend(options || {}, {
            base64: false,
            checkCRC32: false,
            optimizedBinaryString: false,
            createFolders: false,
            decodeFileName: utf8.utf8decode
          })
          if (options.base64) {
            data = base64.decode(data)
          }

          zipEntries = new ZipEntries(data, options)
          files = zipEntries.files
          for (i = 0; i < files.length; i++) {
            input = files[i]
            this.file(input.fileNameStr, input.decompressed, {
              binary: true,
              optimizedBinaryString: true,
              date: input.date,
              dir: input.dir,
              comment: input.fileCommentStr.length ? input.fileCommentStr : null,
              unixPermissions: input.unixPermissions,
              dosPermissions: input.dosPermissions,
              createFolders: options.createFolders
            })
          }
          if (zipEntries.zipComment.length) {
            this.comment = zipEntries.zipComment
          }

          return this
        }

        /***/
      },
      /* 47 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var StringReader = __webpack_require__(22)
        var NodeBufferReader = __webpack_require__(48)
        var Uint8ArrayReader = __webpack_require__(24)
        var ArrayReader = __webpack_require__(25)
        var utils = __webpack_require__(2)
        var sig = __webpack_require__(18)
        var ZipEntry = __webpack_require__(49)
        var support = __webpack_require__(4)
        var jszipProto = __webpack_require__(9)
        //  class ZipEntries {{{
        /**
         * All the entries in the zip file.
         * @constructor
         * @param {String|ArrayBuffer|Uint8Array} data the binary stream to load.
         * @param {Object} loadOptions Options for loading the stream.
         */
        function ZipEntries(data, loadOptions) {
          this.files = []
          this.loadOptions = loadOptions
          if (data) {
            this.load(data)
          }
        }
        ZipEntries.prototype = {
          /**
           * Check that the reader is on the speficied signature.
           * @param {string} expectedSignature the expected signature.
           * @throws {Error} if it is an other signature.
           */
          checkSignature: function (expectedSignature) {
            var signature = this.reader.readString(4)
            if (signature !== expectedSignature) {
              throw new Error(
                "Corrupted zip or bug : unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")"
              )
            }
          },
          /**
           * Check if the given signature is at the given index.
           * @param {number} askedIndex the index to check.
           * @param {string} expectedSignature the signature to expect.
           * @return {boolean} true if the signature is here, false otherwise.
           */
          isSignature: function (askedIndex, expectedSignature) {
            var currentIndex = this.reader.index
            this.reader.setIndex(askedIndex)
            var signature = this.reader.readString(4)
            var result = signature === expectedSignature
            this.reader.setIndex(currentIndex)
            return result
          },
          /**
           * Read the end of the central directory.
           */
          readBlockEndOfCentral: function () {
            this.diskNumber = this.reader.readInt(2)
            this.diskWithCentralDirStart = this.reader.readInt(2)
            this.centralDirRecordsOnThisDisk = this.reader.readInt(2)
            this.centralDirRecords = this.reader.readInt(2)
            this.centralDirSize = this.reader.readInt(4)
            this.centralDirOffset = this.reader.readInt(4)

            this.zipCommentLength = this.reader.readInt(2)
            // warning : the encoding depends of the system locale
            // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
            // On a windows machine, this field is encoded with the localized windows code page.
            var zipComment = this.reader.readData(this.zipCommentLength)
            var decodeParamType = support.uint8array ? "uint8array" : "array"
            // To get consistent behavior with the generation part, we will assume that
            // this is utf8 encoded unless specified otherwise.
            var decodeContent = utils.transformTo(decodeParamType, zipComment)
            this.zipComment = this.loadOptions.decodeFileName(decodeContent)
          },
          /**
           * Read the end of the Zip 64 central directory.
           * Not merged with the method readEndOfCentral :
           * The end of central can coexist with its Zip64 brother,
           * I don't want to read the wrong number of bytes !
           */
          readBlockZip64EndOfCentral: function () {
            this.zip64EndOfCentralSize = this.reader.readInt(8)
            this.versionMadeBy = this.reader.readString(2)
            this.versionNeeded = this.reader.readInt(2)
            this.diskNumber = this.reader.readInt(4)
            this.diskWithCentralDirStart = this.reader.readInt(4)
            this.centralDirRecordsOnThisDisk = this.reader.readInt(8)
            this.centralDirRecords = this.reader.readInt(8)
            this.centralDirSize = this.reader.readInt(8)
            this.centralDirOffset = this.reader.readInt(8)

            this.zip64ExtensibleData = {}
            var extraDataSize = this.zip64EndOfCentralSize - 44,
              index = 0,
              extraFieldId,
              extraFieldLength,
              extraFieldValue
            while (index < extraDataSize) {
              extraFieldId = this.reader.readInt(2)
              extraFieldLength = this.reader.readInt(4)
              extraFieldValue = this.reader.readString(extraFieldLength)
              this.zip64ExtensibleData[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
              }
            }
          },
          /**
           * Read the end of the Zip 64 central directory locator.
           */
          readBlockZip64EndOfCentralLocator: function () {
            this.diskWithZip64CentralDirStart = this.reader.readInt(4)
            this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8)
            this.disksCount = this.reader.readInt(4)
            if (this.disksCount > 1) {
              throw new Error("Multi-volumes zip are not supported")
            }
          },
          /**
           * Read the local files, based on the offset read in the central part.
           */
          readLocalFiles: function () {
            var i, file
            for (i = 0; i < this.files.length; i++) {
              file = this.files[i]
              this.reader.setIndex(file.localHeaderOffset)
              this.checkSignature(sig.LOCAL_FILE_HEADER)
              file.readLocalPart(this.reader)
              file.handleUTF8()
              file.processAttributes()
            }
          },
          /**
           * Read the central directory.
           */
          readCentralDir: function () {
            var file

            this.reader.setIndex(this.centralDirOffset)
            while (this.reader.readString(4) === sig.CENTRAL_FILE_HEADER) {
              file = new ZipEntry(
                {
                  zip64: this.zip64
                },
                this.loadOptions
              )
              file.readCentralPart(this.reader)
              this.files.push(file)
            }

            if (this.centralDirRecords !== this.files.length) {
              if (this.centralDirRecords !== 0 && this.files.length === 0) {
                // We expected some records but couldn't find ANY.
                // This is really suspicious, as if something went wrong.
                throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length)
              } else {
                // We found some records but not all.
                // Something is wrong but we got something for the user: no error here.
                // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);
              }
            }
          },
          /**
           * Read the end of central directory.
           */
          readEndOfCentral: function () {
            var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END)
            if (offset < 0) {
              // Check if the content is a truncated zip or complete garbage.
              // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
              // extractible zip for example) but it can give a good hint.
              // If an ajax request was used without responseType, we will also
              // get unreadable data.
              var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER)

              if (isGarbage) {
                throw new Error(
                  "Can't find end of central directory : is this a zip file ? " +
                    "If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html"
                )
              } else {
                throw new Error("Corrupted zip : can't find end of central directory")
              }
            }
            this.reader.setIndex(offset)
            var endOfCentralDirOffset = offset
            this.checkSignature(sig.CENTRAL_DIRECTORY_END)
            this.readBlockEndOfCentral()

            /* extract from the zip spec :
            4)  If one of the fields in the end of central directory
                record is too small to hold required data, the field
                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                ZIP64 format record should be created.
            5)  The end of central directory record and the
                Zip64 end of central directory locator record must
                reside on the same disk when splitting or spanning
                an archive.
         */
            if (
              this.diskNumber === utils.MAX_VALUE_16BITS ||
              this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS ||
              this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS ||
              this.centralDirRecords === utils.MAX_VALUE_16BITS ||
              this.centralDirSize === utils.MAX_VALUE_32BITS ||
              this.centralDirOffset === utils.MAX_VALUE_32BITS
            ) {
              this.zip64 = true

              /*
            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
            the zip file can fit into a 32bits integer. This cannot be solved : Javascript represents
            all numbers as 64-bit double precision IEEE 754 floating point numbers.
            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
            */

              // should look for a zip64 EOCD locator
              offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR)
              if (offset < 0) {
                throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator")
              }
              this.reader.setIndex(offset)
              this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR)
              this.readBlockZip64EndOfCentralLocator()

              // now the zip64 EOCD record
              if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
                // console.warn("ZIP64 end of central directory not where expected.");
                this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END)
                if (this.relativeOffsetEndOfZip64CentralDir < 0) {
                  throw new Error("Corrupted zip : can't find the ZIP64 end of central directory")
                }
              }
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir)
              this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END)
              this.readBlockZip64EndOfCentral()
            }

            var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize
            if (this.zip64) {
              expectedEndOfCentralDirOffset += 20 // end of central dir 64 locator
              expectedEndOfCentralDirOffset += 12 /* should not include the leading 12 bytes */ + this.zip64EndOfCentralSize
            }

            var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset

            if (extraBytes > 0) {
              // console.warn(extraBytes, "extra bytes at beginning or within zipfile");
              if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
                // The offsets seem wrong, but we have something at the specified offset.
                // So… we keep it.
              } else {
                // the offset is wrong, update the "zero" of the reader
                // this happens if data has been prepended (crx files for example)
                this.reader.zero = extraBytes
              }
            } else if (extraBytes < 0) {
              throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.")
            }
          },
          prepareReader: function (data) {
            var type = utils.getTypeOf(data)
            utils.checkSupport(type)
            if (type === "string" && !support.uint8array) {
              this.reader = new StringReader(data, this.loadOptions.optimizedBinaryString)
            } else if (type === "nodebuffer") {
              this.reader = new NodeBufferReader(data)
            } else if (support.uint8array) {
              this.reader = new Uint8ArrayReader(utils.transformTo("uint8array", data))
            } else if (support.array) {
              this.reader = new ArrayReader(utils.transformTo("array", data))
            } else {
              throw new Error("Unexpected error: unsupported type '" + type + "'")
            }
          },
          /**
           * Read a zip file and create ZipEntries.
           * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
           */
          load: function (data) {
            this.prepareReader(data)
            this.readEndOfCentral()
            this.readCentralDir()
            this.readLocalFiles()
          }
        }
        // }}} end of ZipEntries
        module.exports = ZipEntries

        /***/
      },
      /* 48 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var Uint8ArrayReader = __webpack_require__(24)

        function NodeBufferReader(data) {
          this.data = data
          this.length = this.data.length
          this.index = 0
          this.zero = 0
        }
        NodeBufferReader.prototype = new Uint8ArrayReader()

        /**
         * @see DataReader.readData
         */
        NodeBufferReader.prototype.readData = function (size) {
          this.checkOffset(size)
          var result = this.data.slice(this.zero + this.index, this.zero + this.index + size)
          this.index += size
          return result
        }
        module.exports = NodeBufferReader

        /***/
      },
      /* 49 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var StringReader = __webpack_require__(22)
        var utils = __webpack_require__(2)
        var CompressedObject = __webpack_require__(20)
        var jszipProto = __webpack_require__(9)
        var support = __webpack_require__(4)

        var MADE_BY_DOS = 0x00
        var MADE_BY_UNIX = 0x03

        // class ZipEntry {{{
        /**
         * An entry in the zip file.
         * @constructor
         * @param {Object} options Options of the current file.
         * @param {Object} loadOptions Options for loading the stream.
         */
        function ZipEntry(options, loadOptions) {
          this.options = options
          this.loadOptions = loadOptions
        }
        ZipEntry.prototype = {
          /**
           * say if the file is encrypted.
           * @return {boolean} true if the file is encrypted, false otherwise.
           */
          isEncrypted: function () {
            // bit 1 is set
            return (this.bitFlag & 0x0001) === 0x0001
          },
          /**
           * say if the file has utf-8 filename/comment.
           * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
           */
          useUTF8: function () {
            // bit 11 is set
            return (this.bitFlag & 0x0800) === 0x0800
          },
          /**
           * Prepare the function used to generate the compressed content from this ZipFile.
           * @param {DataReader} reader the reader to use.
           * @param {number} from the offset from where we should read the data.
           * @param {number} length the length of the data to read.
           * @return {Function} the callback to get the compressed content (the type depends of the DataReader class).
           */
          prepareCompressedContent: function (reader, from, length) {
            return function () {
              var previousIndex = reader.index
              reader.setIndex(from)
              var compressedFileData = reader.readData(length)
              reader.setIndex(previousIndex)

              return compressedFileData
            }
          },
          /**
           * Prepare the function used to generate the uncompressed content from this ZipFile.
           * @param {DataReader} reader the reader to use.
           * @param {number} from the offset from where we should read the data.
           * @param {number} length the length of the data to read.
           * @param {JSZip.compression} compression the compression used on this file.
           * @param {number} uncompressedSize the uncompressed size to expect.
           * @return {Function} the callback to get the uncompressed content (the type depends of the DataReader class).
           */
          prepareContent: function (reader, from, length, compression, uncompressedSize) {
            return function () {
              var compressedFileData = utils.transformTo(compression.uncompressInputType, this.getCompressedContent())
              var uncompressedFileData = compression.uncompress(compressedFileData)

              if (uncompressedFileData.length !== uncompressedSize) {
                throw new Error("Bug : uncompressed data size mismatch")
              }

              return uncompressedFileData
            }
          },
          /**
           * Read the local part of a zip file and add the info in this object.
           * @param {DataReader} reader the reader to use.
           */
          readLocalPart: function (reader) {
            var compression, localExtraFieldsLength

            // we already know everything from the central dir !
            // If the central dir data are false, we are doomed.
            // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
            // The less data we get here, the more reliable this should be.
            // Let's skip the whole header and dash to the data !
            reader.skip(22)
            // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
            // Strangely, the filename here is OK.
            // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
            // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
            // Search "unzip mismatching "local" filename continuing with "central" filename version" on
            // the internet.
            //
            // I think I see the logic here : the central directory is used to display
            // content and the local directory is used to extract the files. Mixing / and \
            // may be used to display \ to windows users and use / when extracting the files.
            // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
            this.fileNameLength = reader.readInt(2)
            localExtraFieldsLength = reader.readInt(2) // can't be sure this will be the same as the central dir
            this.fileName = reader.readData(this.fileNameLength)
            reader.skip(localExtraFieldsLength)

            if (this.compressedSize == -1 || this.uncompressedSize == -1) {
              throw new Error(
                "Bug or corrupted zip : didn't get enough informations from the central directory " +
                  "(compressedSize == -1 || uncompressedSize == -1)"
              )
            }

            compression = utils.findCompression(this.compressionMethod)
            if (compression === null) {
              // no compression found
              throw new Error(
                "Corrupted zip : compression " +
                  utils.pretty(this.compressionMethod) +
                  " unknown (inner file : " +
                  utils.transformTo("string", this.fileName) +
                  ")"
              )
            }
            this.decompressed = new CompressedObject()
            this.decompressed.compressedSize = this.compressedSize
            this.decompressed.uncompressedSize = this.uncompressedSize
            this.decompressed.crc32 = this.crc32
            this.decompressed.compressionMethod = this.compressionMethod
            this.decompressed.getCompressedContent = this.prepareCompressedContent(reader, reader.index, this.compressedSize, compression)
            this.decompressed.getContent = this.prepareContent(reader, reader.index, this.compressedSize, compression, this.uncompressedSize)

            // we need to compute the crc32...
            if (this.loadOptions.checkCRC32) {
              this.decompressed = utils.transformTo("string", this.decompressed.getContent())
              if (jszipProto.crc32(this.decompressed) !== this.crc32) {
                throw new Error("Corrupted zip : CRC32 mismatch")
              }
            }
          },

          /**
           * Read the central part of a zip file and add the info in this object.
           * @param {DataReader} reader the reader to use.
           */
          readCentralPart: function (reader) {
            this.versionMadeBy = reader.readInt(2)
            this.versionNeeded = reader.readInt(2)
            this.bitFlag = reader.readInt(2)
            this.compressionMethod = reader.readString(2)
            this.date = reader.readDate()
            this.crc32 = reader.readInt(4)
            this.compressedSize = reader.readInt(4)
            this.uncompressedSize = reader.readInt(4)
            this.fileNameLength = reader.readInt(2)
            this.extraFieldsLength = reader.readInt(2)
            this.fileCommentLength = reader.readInt(2)
            this.diskNumberStart = reader.readInt(2)
            this.internalFileAttributes = reader.readInt(2)
            this.externalFileAttributes = reader.readInt(4)
            this.localHeaderOffset = reader.readInt(4)

            if (this.isEncrypted()) {
              throw new Error("Encrypted zip are not supported")
            }

            this.fileName = reader.readData(this.fileNameLength)
            this.readExtraFields(reader)
            this.parseZIP64ExtraField(reader)
            this.fileComment = reader.readData(this.fileCommentLength)
          },

          /**
           * Parse the external file attributes and get the unix/dos permissions.
           */
          processAttributes: function () {
            this.unixPermissions = null
            this.dosPermissions = null
            var madeBy = this.versionMadeBy >> 8

            // Check if we have the DOS directory flag set.
            // We look for it in the DOS and UNIX permissions
            // but some unknown platform could set it as a compatibility flag.
            this.dir = this.externalFileAttributes & 0x0010 ? true : false

            if (madeBy === MADE_BY_DOS) {
              // first 6 bits (0 to 5)
              this.dosPermissions = this.externalFileAttributes & 0x3f
            }

            if (madeBy === MADE_BY_UNIX) {
              this.unixPermissions = (this.externalFileAttributes >> 16) & 0xffff
              // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
            }

            // fail safe : if the name ends with a / it probably means a folder
            if (!this.dir && this.fileNameStr.slice(-1) === "/") {
              this.dir = true
            }
          },

          /**
           * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
           * @param {DataReader} reader the reader to use.
           */
          parseZIP64ExtraField: function (reader) {
            if (!this.extraFields[0x0001]) {
              return
            }

            // should be something, preparing the extra reader
            var extraReader = new StringReader(this.extraFields[0x0001].value)

            // I really hope that these 64bits integer can fit in 32 bits integer, because js
            // won't let us have more.
            if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
              this.uncompressedSize = extraReader.readInt(8)
            }
            if (this.compressedSize === utils.MAX_VALUE_32BITS) {
              this.compressedSize = extraReader.readInt(8)
            }
            if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
              this.localHeaderOffset = extraReader.readInt(8)
            }
            if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
              this.diskNumberStart = extraReader.readInt(4)
            }
          },
          /**
           * Read the central part of a zip file and add the info in this object.
           * @param {DataReader} reader the reader to use.
           */
          readExtraFields: function (reader) {
            var start = reader.index,
              extraFieldId,
              extraFieldLength,
              extraFieldValue

            this.extraFields = this.extraFields || {}

            while (reader.index < start + this.extraFieldsLength) {
              extraFieldId = reader.readInt(2)
              extraFieldLength = reader.readInt(2)
              extraFieldValue = reader.readString(extraFieldLength)

              this.extraFields[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
              }
            }
          },
          /**
           * Apply an UTF8 transformation if needed.
           */
          handleUTF8: function () {
            var decodeParamType = support.uint8array ? "uint8array" : "array"
            if (this.useUTF8()) {
              this.fileNameStr = jszipProto.utf8decode(this.fileName)
              this.fileCommentStr = jszipProto.utf8decode(this.fileComment)
            } else {
              var upath = this.findExtraFieldUnicodePath()
              if (upath !== null) {
                this.fileNameStr = upath
              } else {
                var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName)
                this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray)
              }

              var ucomment = this.findExtraFieldUnicodeComment()
              if (ucomment !== null) {
                this.fileCommentStr = ucomment
              } else {
                var commentByteArray = utils.transformTo(decodeParamType, this.fileComment)
                this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray)
              }
            }
          },

          /**
           * Find the unicode path declared in the extra field, if any.
           * @return {String} the unicode path, null otherwise.
           */
          findExtraFieldUnicodePath: function () {
            var upathField = this.extraFields[0x7075]
            if (upathField) {
              var extraReader = new StringReader(upathField.value)

              // wrong version
              if (extraReader.readInt(1) !== 1) {
                return null
              }

              // the crc of the filename changed, this field is out of date.
              if (jszipProto.crc32(this.fileName) !== extraReader.readInt(4)) {
                return null
              }

              return jszipProto.utf8decode(extraReader.readString(upathField.length - 5))
            }
            return null
          },

          /**
           * Find the unicode comment declared in the extra field, if any.
           * @return {String} the unicode comment, null otherwise.
           */
          findExtraFieldUnicodeComment: function () {
            var ucommentField = this.extraFields[0x6375]
            if (ucommentField) {
              var extraReader = new StringReader(ucommentField.value)

              // wrong version
              if (extraReader.readInt(1) !== 1) {
                return null
              }

              // the crc of the comment changed, this field is out of date.
              if (jszipProto.crc32(this.fileComment) !== extraReader.readInt(4)) {
                return null
              }

              return jszipProto.utf8decode(extraReader.readString(ucommentField.length - 5))
            }
            return null
          }
        }
        module.exports = ZipEntry

        /***/
      },
      /* 50 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var utils = __webpack_require__(2)

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.string2binary = function (str) {
          return utils.string2binary(str)
        }

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.string2Uint8Array = function (str) {
          return utils.transformTo("uint8array", str)
        }

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.uint8Array2String = function (array) {
          return utils.transformTo("string", array)
        }

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.string2Blob = function (str) {
          var buffer = utils.transformTo("arraybuffer", str)
          return utils.arrayBuffer2Blob(buffer)
        }

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.arrayBuffer2Blob = function (buffer) {
          return utils.arrayBuffer2Blob(buffer)
        }

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.transformTo = function (outputType, input) {
          return utils.transformTo(outputType, input)
        }

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.getTypeOf = function (input) {
          return utils.getTypeOf(input)
        }

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.checkSupport = function (type) {
          return utils.checkSupport(type)
        }

        /**
         * @deprecated
         * This value will be removed in a future version without replacement.
         */
        exports.MAX_VALUE_16BITS = utils.MAX_VALUE_16BITS

        /**
         * @deprecated
         * This value will be removed in a future version without replacement.
         */
        exports.MAX_VALUE_32BITS = utils.MAX_VALUE_32BITS

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.pretty = function (str) {
          return utils.pretty(str)
        }

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.findCompression = function (compressionMethod) {
          return utils.findCompression(compressionMethod)
        }

        /**
         * @deprecated
         * This function will be removed in a future version without replacement.
         */
        exports.isRegExp = function (object) {
          return utils.isRegExp(object)
        }

        /***/
      },
      /* 51 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"
        /* WEBPACK VAR INJECTION */
        ;(function (global) {
          var fallback = __webpack_require__(52)
          var Buffer = __webpack_require__(5).Buffer
          module.exports = async function binaryAjax(url) {
            if (!global.fetch) {
              return fallback(url)
            }
            var type = url.slice(-3).toLowerCase()
            var isOptionalTxt = type === "prj" || type === "cpg"
            try {
              var resp = await fetch(url)
              if (resp.status > 399) {
                throw new Error(resp.statusText)
              }
              if (isOptionalTxt) {
                return resp.text()
              }
              var resp = await resp.arrayBuffer()
              return Buffer.from(resp)
            } catch (e) {
              if (isOptionalTxt) {
                return false
              }
              throw e
            }
          }

          /* WEBPACK VAR INJECTION */
        }).call(this, __webpack_require__(7))

        /***/
      },
      /* 52 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        var Promise = __webpack_require__(26)
        var Buffer = __webpack_require__(5).Buffer
        module.exports = binaryAjax
        function binaryAjax(url) {
          return new Promise(function (resolve, reject) {
            var type = url.slice(-3)
            var ajax = new XMLHttpRequest()
            ajax.open("GET", url, true)
            if (type !== "prj" && type !== "cpg") {
              ajax.responseType = "arraybuffer"
            }
            ajax.addEventListener(
              "load",
              function () {
                if (ajax.status > 399) {
                  if (type === "prj" || type === "cpg") {
                    return resolve(false)
                  } else {
                    return reject(new Error(ajax.status))
                  }
                }
                if (type !== "prj" && type !== "cpg") {
                  return resolve(Buffer.from(ajax.response))
                } else {
                  return resolve(ajax.response)
                }
              },
              false
            )
            ajax.send()
          })
        }

        /***/
      },
      /* 53 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"
        /* WEBPACK VAR INJECTION */
        ;(function (global) {
          var Mutation = global.MutationObserver || global.WebKitMutationObserver

          var scheduleDrain

          {
            if (Mutation) {
              var called = 0
              var observer = new Mutation(nextTick)
              var element = global.document.createTextNode("")
              observer.observe(element, {
                characterData: true
              })
              scheduleDrain = function () {
                element.data = called = ++called % 2
              }
            } else if (!global.setImmediate && typeof global.MessageChannel !== "undefined") {
              var channel = new global.MessageChannel()
              channel.port1.onmessage = nextTick
              scheduleDrain = function () {
                channel.port2.postMessage(0)
              }
            } else if ("document" in global && "onreadystatechange" in global.document.createElement("script")) {
              scheduleDrain = function () {
                // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                var scriptEl = global.document.createElement("script")
                scriptEl.onreadystatechange = function () {
                  nextTick()

                  scriptEl.onreadystatechange = null
                  scriptEl.parentNode.removeChild(scriptEl)
                  scriptEl = null
                }
                global.document.documentElement.appendChild(scriptEl)
              }
            } else {
              scheduleDrain = function () {
                setTimeout(nextTick, 0)
              }
            }
          }

          var draining
          var queue = []
          //named nextTick for less confusing stack traces
          function nextTick() {
            draining = true
            var i, oldQueue
            var len = queue.length
            while (len) {
              oldQueue = queue
              queue = []
              i = -1
              while (++i < len) {
                oldQueue[i]()
              }
              len = queue.length
            }
            draining = false
          }

          module.exports = immediate
          function immediate(task) {
            if (queue.push(task) === 1 && !draining) {
              scheduleDrain()
            }
          }

          /* WEBPACK VAR INJECTION */
        }).call(this, __webpack_require__(7))

        /***/
      },
      /* 54 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"

        function isClockWise(array) {
          var sum = 0
          var i = 1
          var len = array.length
          var prev, cur
          while (i < len) {
            prev = cur || array[0]
            cur = array[i]
            sum += (cur[0] - prev[0]) * (cur[1] + prev[1])
            i++
          }
          return sum > 0
        }

        function polyReduce(a, b) {
          if (isClockWise(b) || !a.length) {
            a.push([b])
          } else {
            a[a.length - 1].push(b)
          }
          return a
        }
        ParseShp.prototype.parsePoint = function (data) {
          return {
            type: "Point",
            coordinates: this.parseCoord(data, 0)
          }
        }
        ParseShp.prototype.parseZPoint = function (data) {
          var pointXY = this.parsePoint(data)
          pointXY.coordinates.push(data.readDoubleLE(16))
          return pointXY
        }
        ParseShp.prototype.parsePointArray = function (data, offset, num) {
          var out = []
          var done = 0
          while (done < num) {
            out.push(this.parseCoord(data, offset))
            offset += 16
            done++
          }
          return out
        }
        ParseShp.prototype.parseZPointArray = function (data, zOffset, num, coordinates) {
          var i = 0
          while (i < num) {
            coordinates[i].push(data.readDoubleLE(zOffset))
            i++
            zOffset += 8
          }
          return coordinates
        }
        ParseShp.prototype.parseArrayGroup = function (data, offset, partOffset, num, tot) {
          var out = []
          var done = 0
          var curNum,
            nextNum = 0,
            pointNumber
          while (done < num) {
            done++
            partOffset += 4
            curNum = nextNum
            if (done === num) {
              nextNum = tot
            } else {
              nextNum = data.readInt32LE(partOffset)
            }
            pointNumber = nextNum - curNum
            if (!pointNumber) {
              continue
            }
            out.push(this.parsePointArray(data, offset, pointNumber))
            offset += pointNumber << 4
          }
          return out
        }
        ParseShp.prototype.parseZArrayGroup = function (data, zOffset, num, coordinates) {
          var i = 0
          while (i < num) {
            coordinates[i] = this.parseZPointArray(data, zOffset, coordinates[i].length, coordinates[i])
            zOffset += coordinates[i].length << 3
            i++
          }
          return coordinates
        }
        ParseShp.prototype.parseMultiPoint = function (data) {
          var out = {}
          var mins = this.parseCoord(data, 0)
          var maxs = this.parseCoord(data, 16)
          out.bbox = [mins[0], mins[1], maxs[0], maxs[1]]
          var num = data.readInt32LE(32, true)
          var offset = 36
          if (num === 1) {
            out.type = "Point"
            out.coordinates = this.parseCoord(data, offset)
          } else {
            out.type = "MultiPoint"
            out.coordinates = this.parsePointArray(data, offset, num)
          }
          return out
        }
        ParseShp.prototype.parseZMultiPoint = function (data) {
          var geoJson = this.parseMultiPoint(data)
          var num
          if (geoJson.type === "Point") {
            geoJson.coordinates.push(data.readDoubleLE(72))
            return geoJson
          } else {
            num = geoJson.coordinates.length
          }
          var zOffset = 52 + (num << 4)
          geoJson.coordinates = this.parseZPointArray(data, zOffset, num, geoJson.coordinates)
          return geoJson
        }
        ParseShp.prototype.parsePolyline = function (data) {
          var out = {}
          var mins = this.parseCoord(data, 0)
          var maxs = this.parseCoord(data, 16)
          out.bbox = [mins[0], mins[1], maxs[0], maxs[1]]
          var numParts = data.readInt32LE(32)
          var num = data.readInt32LE(36)
          var offset, partOffset
          if (numParts === 1) {
            out.type = "LineString"
            offset = 44
            out.coordinates = this.parsePointArray(data, offset, num)
          } else {
            out.type = "MultiLineString"
            offset = 40 + (numParts << 2)
            partOffset = 40
            out.coordinates = this.parseArrayGroup(data, offset, partOffset, numParts, num)
          }
          return out
        }
        ParseShp.prototype.parseZPolyline = function (data) {
          var geoJson = this.parsePolyline(data)
          var num = geoJson.coordinates.length
          var zOffset
          if (geoJson.type === "LineString") {
            zOffset = 60 + (num << 4)
            geoJson.coordinates = this.parseZPointArray(data, zOffset, num, geoJson.coordinates)
            return geoJson
          } else {
            var totalPoints = geoJson.coordinates.reduce(function (a, v) {
              return a + v.length
            }, 0)
            zOffset = 56 + (totalPoints << 4) + (num << 2)
            geoJson.coordinates = this.parseZArrayGroup(data, zOffset, num, geoJson.coordinates)
            return geoJson
          }
        }
        ParseShp.prototype.polyFuncs = function (out) {
          if (out.type === "LineString") {
            out.type = "Polygon"
            out.coordinates = [out.coordinates]
            return out
          } else {
            out.coordinates = out.coordinates.reduce(polyReduce, [])
            if (out.coordinates.length === 1) {
              out.type = "Polygon"
              out.coordinates = out.coordinates[0]
              return out
            } else {
              out.type = "MultiPolygon"
              return out
            }
          }
        }
        ParseShp.prototype.parsePolygon = function (data) {
          return this.polyFuncs(this.parsePolyline(data))
        }
        ParseShp.prototype.parseZPolygon = function (data) {
          return this.polyFuncs(this.parseZPolyline(data))
        }
        var shpFuncObj = {
          1: "parsePoint",
          3: "parsePolyline",
          5: "parsePolygon",
          8: "parseMultiPoint",
          11: "parseZPoint",
          13: "parseZPolyline",
          15: "parseZPolygon",
          18: "parseZMultiPoint"
        }

        function makeParseCoord(trans) {
          if (trans) {
            return function (data, offset) {
              return trans.inverse([data.readDoubleLE(offset), data.readDoubleLE(offset + 8)])
            }
          } else {
            return function (data, offset) {
              return [data.readDoubleLE(offset), data.readDoubleLE(offset + 8)]
            }
          }
        }

        function ParseShp(buffer, trans) {
          if (!(this instanceof ParseShp)) {
            return new ParseShp(buffer, trans)
          }
          this.buffer = buffer
          this.shpFuncs(trans)
          this.rows = this.getRows()
        }
        ParseShp.prototype.shpFuncs = function (tran) {
          var num = this.getShpCode()
          if (num > 20) {
            num -= 20
          }
          if (!(num in shpFuncObj)) {
            throw new Error("I don't know that shp type")
          }
          this.parseFunc = this[shpFuncObj[num]]
          this.parseCoord = makeParseCoord(tran)
        }
        ParseShp.prototype.getShpCode = function () {
          return this.parseHeader().shpCode
        }
        ParseShp.prototype.parseHeader = function () {
          var view = this.buffer.slice(0, 100)
          return {
            length: view.readInt32BE(6 << 2),
            version: view.readInt32LE(7 << 2),
            shpCode: view.readInt32LE(8 << 2),
            bbox: [view.readDoubleLE(9 << 2), view.readDoubleLE(11 << 2), view.readDoubleLE(13 << 2), view.readDoubleLE(13 << 2)]
          }
        }
        ParseShp.prototype.getRows = function () {
          var offset = 100
          var len = this.buffer.byteLength
          var out = []
          var current
          while (offset < len) {
            current = this.getRow(offset)
            offset += 8
            offset += current.len
            if (current.type) {
              out.push(this.parseFunc(current.data))
            } else {
              out.push(null)
            }
          }
          return out
        }
        ParseShp.prototype.getRow = function (offset) {
          var view = this.buffer.slice(offset, offset + 12)
          var len = view.readInt32BE(4) << 1
          var data = this.buffer.slice(offset + 12, offset + len + 8)

          return {
            id: view.readInt32BE(0),
            len: len,
            data: data,
            type: view.readInt32LE(8)
          }
        }
        module.exports = function (buffer, trans) {
          return new ParseShp(buffer, trans).rows
        }

        /***/
      },
      /* 55 */
      /***/ function (module, exports, __webpack_require__) {
        var createDecoder = __webpack_require__(56)
        function dbfHeader(data) {
          var out = {}
          out.lastUpdated = new Date(data.readUInt8(1) + 1900, data.readUInt8(2), data.readUInt8(3))
          out.records = data.readUInt32LE(4)
          out.headerLen = data.readUInt16LE(8)
          out.recLen = data.readUInt16LE(10)
          return out
        }

        function dbfRowHeader(data, headerLen, decoder) {
          var out = []
          var offset = 32
          while (offset < headerLen) {
            out.push({
              name: decoder(data.slice(offset, offset + 11)),
              dataType: String.fromCharCode(data.readUInt8(offset + 11)),
              len: data.readUInt8(offset + 16),
              decimal: data.readUInt8(offset + 17)
            })
            if (data.readUInt8(offset + 32) === 13) {
              break
            } else {
              offset += 32
            }
          }
          return out
        }

        function rowFuncs(buffer, offset, len, type, decoder) {
          var data = buffer.slice(offset, offset + len)
          var textData = decoder(data)
          switch (type) {
            case "N":
            case "F":
            case "O":
              return parseFloat(textData, 10)
            case "D":
              return new Date(textData.slice(0, 4), parseInt(textData.slice(4, 6), 10) - 1, textData.slice(6, 8))
            case "L":
              return textData.toLowerCase() === "y" || textData.toLowerCase() === "t"
            default:
              return textData
          }
        }

        function parseRow(buffer, offset, rowHeaders, decoder) {
          var out = {}
          var i = 0
          var len = rowHeaders.length
          var field
          var header
          while (i < len) {
            header = rowHeaders[i]
            field = rowFuncs(buffer, offset, header.len, header.dataType, decoder)
            offset += header.len
            if (typeof field !== "undefined") {
              out[header.name] = field
            }
            i++
          }
          return out
        }

        module.exports = function (buffer, encoding) {
          var decoder = createDecoder(encoding)
          var header = dbfHeader(buffer)
          var rowHeaders = dbfRowHeader(buffer, header.headerLen - 1, decoder)

          var offset = ((rowHeaders.length + 1) << 5) + 2
          var recLen = header.recLen
          var records = header.records
          var out = []
          while (records) {
            out.push(parseRow(buffer, offset, rowHeaders, decoder))
            offset += recLen
            records--
          }
          return out
        }

        /***/
      },
      /* 56 */
      /***/ function (module, exports, __webpack_require__) {
        __webpack_require__(57)
        var StringDecoder = __webpack_require__(60).StringDecoder
        function defaultDecoder(data) {
          var decoder = new StringDecoder()
          var out = decoder.write(data) + decoder.end()
          return out.replace(/\0/g, "").trim()
        }
        module.exports = createDecoder
        var regex = /^(?:ANSI\s)?(\d+)$/m
        function createDecoder(encoding, second) {
          if (!encoding) {
            return defaultDecoder
          }
          try {
            new TextDecoder(encoding.trim())
          } catch (e) {
            var match = regex.exec(encoding)
            if (match && !second) {
              return createDecoder("windows-" + match[1], true)
            } else {
              return defaultDecoder
            }
          }
          return browserDecoder
          function browserDecoder(buffer) {
            var decoder = new TextDecoder(encoding)
            var out =
              decoder.decode(buffer, {
                stream: true
              }) + decoder.decode()
            return out.replace(/\0/g, "").trim()
          }
        }

        /***/
      },
      /* 57 */
      /***/ function (module, exports, __webpack_require__) {
        // This is free and unencumbered software released into the public domain.
        // See LICENSE.md for more information.

        module.exports = __webpack_require__(58)

        /***/
      },
      /* 58 */
      /***/ function (module, exports, __webpack_require__) {
        // This is free and unencumbered software released into the public domain.
        // See LICENSE.md for more information.

        /**
         * @fileoverview Global |this| required for resolving indexes in node.
         * @suppress {globalThis}
         */
        ;(function (global) {
          "use strict"

          // If we're in node require encoding-indexes and attach it to the global.
          if (true && module.exports && !global["encoding-indexes"]) {
            __webpack_require__(59)
          }

          //
          // Utilities
          //

          /**
           * @param {number} a The number to test.
           * @param {number} min The minimum value in the range, inclusive.
           * @param {number} max The maximum value in the range, inclusive.
           * @return {boolean} True if a >= min and a <= max.
           */
          function inRange(a, min, max) {
            return min <= a && a <= max
          }

          /**
           * @param {!Array.<*>} array The array to check.
           * @param {*} item The item to look for in the array.
           * @return {boolean} True if the item appears in the array.
           */
          function includes(array, item) {
            return array.indexOf(item) !== -1
          }

          var floor = Math.floor

          /**
           * @param {*} o
           * @return {Object}
           */
          function ToDictionary(o) {
            if (o === undefined) return {}
            if (o === Object(o)) return o
            throw TypeError("Could not convert argument to dictionary")
          }

          /**
           * @param {string} string Input string of UTF-16 code units.
           * @return {!Array.<number>} Code points.
           */
          function stringToCodePoints(string) {
            // https://heycam.github.io/webidl/#dfn-obtain-unicode

            // 1. Let S be the DOMString value.
            var s = String(string)

            // 2. Let n be the length of S.
            var n = s.length

            // 3. Initialize i to 0.
            var i = 0

            // 4. Initialize U to be an empty sequence of Unicode characters.
            var u = []

            // 5. While i < n:
            while (i < n) {
              // 1. Let c be the code unit in S at index i.
              var c = s.charCodeAt(i)

              // 2. Depending on the value of c:

              // c < 0xD800 or c > 0xDFFF
              if (c < 0xd800 || c > 0xdfff) {
                // Append to U the Unicode character with code point c.
                u.push(c)
              }

              // 0xDC00 ≤ c ≤ 0xDFFF
              else if (0xdc00 <= c && c <= 0xdfff) {
                // Append to U a U+FFFD REPLACEMENT CHARACTER.
                u.push(0xfffd)
              }

              // 0xD800 ≤ c ≤ 0xDBFF
              else if (0xd800 <= c && c <= 0xdbff) {
                // 1. If i = n−1, then append to U a U+FFFD REPLACEMENT
                // CHARACTER.
                if (i === n - 1) {
                  u.push(0xfffd)
                }
                // 2. Otherwise, i < n−1:
                else {
                  // 1. Let d be the code unit in S at index i+1.
                  var d = s.charCodeAt(i + 1)

                  // 2. If 0xDC00 ≤ d ≤ 0xDFFF, then:
                  if (0xdc00 <= d && d <= 0xdfff) {
                    // 1. Let a be c & 0x3FF.
                    var a = c & 0x3ff

                    // 2. Let b be d & 0x3FF.
                    var b = d & 0x3ff

                    // 3. Append to U the Unicode character with code point
                    // 2^16+2^10*a+b.
                    u.push(0x10000 + (a << 10) + b)

                    // 4. Set i to i+1.
                    i += 1
                  }

                  // 3. Otherwise, d < 0xDC00 or d > 0xDFFF. Append to U a
                  // U+FFFD REPLACEMENT CHARACTER.
                  else {
                    u.push(0xfffd)
                  }
                }
              }

              // 3. Set i to i+1.
              i += 1
            }

            // 6. Return U.
            return u
          }

          /**
           * @param {!Array.<number>} code_points Array of code points.
           * @return {string} string String of UTF-16 code units.
           */
          function codePointsToString(code_points) {
            var s = ""
            for (var i = 0; i < code_points.length; ++i) {
              var cp = code_points[i]
              if (cp <= 0xffff) {
                s += String.fromCharCode(cp)
              } else {
                cp -= 0x10000
                s += String.fromCharCode((cp >> 10) + 0xd800, (cp & 0x3ff) + 0xdc00)
              }
            }
            return s
          }

          //
          // Implementation of Encoding specification
          // https://encoding.spec.whatwg.org/
          //

          //
          // 4. Terminology
          //

          /**
           * An ASCII byte is a byte in the range 0x00 to 0x7F, inclusive.
           * @param {number} a The number to test.
           * @return {boolean} True if a is in the range 0x00 to 0x7F, inclusive.
           */
          function isASCIIByte(a) {
            return 0x00 <= a && a <= 0x7f
          }

          /**
           * An ASCII code point is a code point in the range U+0000 to
           * U+007F, inclusive.
           */
          var isASCIICodePoint = isASCIIByte

          /**
           * End-of-stream is a special token that signifies no more tokens
           * are in the stream.
           * @const
           */ var end_of_stream = -1

          /**
           * A stream represents an ordered sequence of tokens.
           *
           * @constructor
           * @param {!(Array.<number>|Uint8Array)} tokens Array of tokens that provide
           * the stream.
           */
          function Stream(tokens) {
            /** @type {!Array.<number>} */
            this.tokens = [].slice.call(tokens)
            // Reversed as push/pop is more efficient than shift/unshift.
            this.tokens.reverse()
          }

          Stream.prototype = {
            /**
             * @return {boolean} True if end-of-stream has been hit.
             */
            endOfStream: function () {
              return !this.tokens.length
            },

            /**
             * When a token is read from a stream, the first token in the
             * stream must be returned and subsequently removed, and
             * end-of-stream must be returned otherwise.
             *
             * @return {number} Get the next token from the stream, or
             * end_of_stream.
             */
            read: function () {
              if (!this.tokens.length) return end_of_stream
              return this.tokens.pop()
            },

            /**
             * When one or more tokens are prepended to a stream, those tokens
             * must be inserted, in given order, before the first token in the
             * stream.
             *
             * @param {(number|!Array.<number>)} token The token(s) to prepend to the
             * stream.
             */
            prepend: function (token) {
              if (Array.isArray(token)) {
                var tokens = /**@type {!Array.<number>}*/ (token)
                while (tokens.length) this.tokens.push(tokens.pop())
              } else {
                this.tokens.push(token)
              }
            },

            /**
             * When one or more tokens are pushed to a stream, those tokens
             * must be inserted, in given order, after the last token in the
             * stream.
             *
             * @param {(number|!Array.<number>)} token The tokens(s) to push to the
             * stream.
             */
            push: function (token) {
              if (Array.isArray(token)) {
                var tokens = /**@type {!Array.<number>}*/ (token)
                while (tokens.length) this.tokens.unshift(tokens.shift())
              } else {
                this.tokens.unshift(token)
              }
            }
          }

          //
          // 5. Encodings
          //

          // 5.1 Encoders and decoders

          /** @const */
          var finished = -1

          /**
           * @param {boolean} fatal If true, decoding errors raise an exception.
           * @param {number=} opt_code_point Override the standard fallback code point.
           * @return {number} The code point to insert on a decoding error.
           */
          function decoderError(fatal, opt_code_point) {
            if (fatal) throw TypeError("Decoder error")
            return opt_code_point || 0xfffd
          }

          /**
           * @param {number} code_point The code point that could not be encoded.
           * @return {number} Always throws, no value is actually returned.
           */
          function encoderError(code_point) {
            throw TypeError("The code point " + code_point + " could not be encoded.")
          }

          /** @interface */
          function Decoder() {}
          Decoder.prototype = {
            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point, or |finished|.
             */
            handler: function (stream, bite) {}
          }

          /** @interface */
          function Encoder() {}
          Encoder.prototype = {
            /**
             * @param {Stream} stream The stream of code points being encoded.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit, or |finished|.
             */
            handler: function (stream, code_point) {}
          }

          // 5.2 Names and labels

          // TODO: Define @typedef for Encoding: {name:string,labels:Array.<string>}
          // https://github.com/google/closure-compiler/issues/247

          /**
           * @param {string} label The encoding label.
           * @return {?{name:string,labels:Array.<string>}}
           */
          function getEncoding(label) {
            // 1. Remove any leading and trailing ASCII whitespace from label.
            label = String(label).trim().toLowerCase()

            // 2. If label is an ASCII case-insensitive match for any of the
            // labels listed in the table below, return the corresponding
            // encoding, and failure otherwise.
            if (Object.prototype.hasOwnProperty.call(label_to_encoding, label)) {
              return label_to_encoding[label]
            }
            return null
          }

          /**
           * Encodings table: https://encoding.spec.whatwg.org/encodings.json
           * @const
           * @type {!Array.<{
           *          heading: string,
           *          encodings: Array.<{name:string,labels:Array.<string>}>
           *        }>}
           */
          var encodings = [
            {
              encodings: [
                {
                  labels: ["unicode-1-1-utf-8", "utf-8", "utf8"],
                  name: "UTF-8"
                }
              ],
              heading: "The Encoding"
            },
            {
              encodings: [
                {
                  labels: ["866", "cp866", "csibm866", "ibm866"],
                  name: "IBM866"
                },
                {
                  labels: ["csisolatin2", "iso-8859-2", "iso-ir-101", "iso8859-2", "iso88592", "iso_8859-2", "iso_8859-2:1987", "l2", "latin2"],
                  name: "ISO-8859-2"
                },
                {
                  labels: ["csisolatin3", "iso-8859-3", "iso-ir-109", "iso8859-3", "iso88593", "iso_8859-3", "iso_8859-3:1988", "l3", "latin3"],
                  name: "ISO-8859-3"
                },
                {
                  labels: ["csisolatin4", "iso-8859-4", "iso-ir-110", "iso8859-4", "iso88594", "iso_8859-4", "iso_8859-4:1988", "l4", "latin4"],
                  name: "ISO-8859-4"
                },
                {
                  labels: ["csisolatincyrillic", "cyrillic", "iso-8859-5", "iso-ir-144", "iso8859-5", "iso88595", "iso_8859-5", "iso_8859-5:1988"],
                  name: "ISO-8859-5"
                },
                {
                  labels: [
                    "arabic",
                    "asmo-708",
                    "csiso88596e",
                    "csiso88596i",
                    "csisolatinarabic",
                    "ecma-114",
                    "iso-8859-6",
                    "iso-8859-6-e",
                    "iso-8859-6-i",
                    "iso-ir-127",
                    "iso8859-6",
                    "iso88596",
                    "iso_8859-6",
                    "iso_8859-6:1987"
                  ],
                  name: "ISO-8859-6"
                },
                {
                  labels: [
                    "csisolatingreek",
                    "ecma-118",
                    "elot_928",
                    "greek",
                    "greek8",
                    "iso-8859-7",
                    "iso-ir-126",
                    "iso8859-7",
                    "iso88597",
                    "iso_8859-7",
                    "iso_8859-7:1987",
                    "sun_eu_greek"
                  ],
                  name: "ISO-8859-7"
                },
                {
                  labels: [
                    "csiso88598e",
                    "csisolatinhebrew",
                    "hebrew",
                    "iso-8859-8",
                    "iso-8859-8-e",
                    "iso-ir-138",
                    "iso8859-8",
                    "iso88598",
                    "iso_8859-8",
                    "iso_8859-8:1988",
                    "visual"
                  ],
                  name: "ISO-8859-8"
                },
                {
                  labels: ["csiso88598i", "iso-8859-8-i", "logical"],
                  name: "ISO-8859-8-I"
                },
                {
                  labels: ["csisolatin6", "iso-8859-10", "iso-ir-157", "iso8859-10", "iso885910", "l6", "latin6"],
                  name: "ISO-8859-10"
                },
                {
                  labels: ["iso-8859-13", "iso8859-13", "iso885913"],
                  name: "ISO-8859-13"
                },
                {
                  labels: ["iso-8859-14", "iso8859-14", "iso885914"],
                  name: "ISO-8859-14"
                },
                {
                  labels: ["csisolatin9", "iso-8859-15", "iso8859-15", "iso885915", "iso_8859-15", "l9"],
                  name: "ISO-8859-15"
                },
                {
                  labels: ["iso-8859-16"],
                  name: "ISO-8859-16"
                },
                {
                  labels: ["cskoi8r", "koi", "koi8", "koi8-r", "koi8_r"],
                  name: "KOI8-R"
                },
                {
                  labels: ["koi8-ru", "koi8-u"],
                  name: "KOI8-U"
                },
                {
                  labels: ["csmacintosh", "mac", "macintosh", "x-mac-roman"],
                  name: "macintosh"
                },
                {
                  labels: ["dos-874", "iso-8859-11", "iso8859-11", "iso885911", "tis-620", "windows-874"],
                  name: "windows-874"
                },
                {
                  labels: ["cp1250", "windows-1250", "x-cp1250"],
                  name: "windows-1250"
                },
                {
                  labels: ["cp1251", "windows-1251", "x-cp1251"],
                  name: "windows-1251"
                },
                {
                  labels: [
                    "ansi_x3.4-1968",
                    "ascii",
                    "cp1252",
                    "cp819",
                    "csisolatin1",
                    "ibm819",
                    "iso-8859-1",
                    "iso-ir-100",
                    "iso8859-1",
                    "iso88591",
                    "iso_8859-1",
                    "iso_8859-1:1987",
                    "l1",
                    "latin1",
                    "us-ascii",
                    "windows-1252",
                    "x-cp1252"
                  ],
                  name: "windows-1252"
                },
                {
                  labels: ["cp1253", "windows-1253", "x-cp1253"],
                  name: "windows-1253"
                },
                {
                  labels: [
                    "cp1254",
                    "csisolatin5",
                    "iso-8859-9",
                    "iso-ir-148",
                    "iso8859-9",
                    "iso88599",
                    "iso_8859-9",
                    "iso_8859-9:1989",
                    "l5",
                    "latin5",
                    "windows-1254",
                    "x-cp1254"
                  ],
                  name: "windows-1254"
                },
                {
                  labels: ["cp1255", "windows-1255", "x-cp1255"],
                  name: "windows-1255"
                },
                {
                  labels: ["cp1256", "windows-1256", "x-cp1256"],
                  name: "windows-1256"
                },
                {
                  labels: ["cp1257", "windows-1257", "x-cp1257"],
                  name: "windows-1257"
                },
                {
                  labels: ["cp1258", "windows-1258", "x-cp1258"],
                  name: "windows-1258"
                },
                {
                  labels: ["x-mac-cyrillic", "x-mac-ukrainian"],
                  name: "x-mac-cyrillic"
                }
              ],
              heading: "Legacy single-byte encodings"
            },
            {
              encodings: [
                {
                  labels: ["chinese", "csgb2312", "csiso58gb231280", "gb2312", "gb_2312", "gb_2312-80", "gbk", "iso-ir-58", "x-gbk"],
                  name: "GBK"
                },
                {
                  labels: ["gb18030"],
                  name: "gb18030"
                }
              ],
              heading: "Legacy multi-byte Chinese (simplified) encodings"
            },
            {
              encodings: [
                {
                  labels: ["big5", "big5-hkscs", "cn-big5", "csbig5", "x-x-big5"],
                  name: "Big5"
                }
              ],
              heading: "Legacy multi-byte Chinese (traditional) encodings"
            },
            {
              encodings: [
                {
                  labels: ["cseucpkdfmtjapanese", "euc-jp", "x-euc-jp"],
                  name: "EUC-JP"
                },
                {
                  labels: ["csiso2022jp", "iso-2022-jp"],
                  name: "ISO-2022-JP"
                },
                {
                  labels: ["csshiftjis", "ms932", "ms_kanji", "shift-jis", "shift_jis", "sjis", "windows-31j", "x-sjis"],
                  name: "Shift_JIS"
                }
              ],
              heading: "Legacy multi-byte Japanese encodings"
            },
            {
              encodings: [
                {
                  labels: [
                    "cseuckr",
                    "csksc56011987",
                    "euc-kr",
                    "iso-ir-149",
                    "korean",
                    "ks_c_5601-1987",
                    "ks_c_5601-1989",
                    "ksc5601",
                    "ksc_5601",
                    "windows-949"
                  ],
                  name: "EUC-KR"
                }
              ],
              heading: "Legacy multi-byte Korean encodings"
            },
            {
              encodings: [
                {
                  labels: ["csiso2022kr", "hz-gb-2312", "iso-2022-cn", "iso-2022-cn-ext", "iso-2022-kr"],
                  name: "replacement"
                },
                {
                  labels: ["utf-16be"],
                  name: "UTF-16BE"
                },
                {
                  labels: ["utf-16", "utf-16le"],
                  name: "UTF-16LE"
                },
                {
                  labels: ["x-user-defined"],
                  name: "x-user-defined"
                }
              ],
              heading: "Legacy miscellaneous encodings"
            }
          ]

          // Label to encoding registry.
          /** @type {Object.<string,{name:string,labels:Array.<string>}>} */
          var label_to_encoding = {}
          encodings.forEach(function (category) {
            category.encodings.forEach(function (encoding) {
              encoding.labels.forEach(function (label) {
                label_to_encoding[label] = encoding
              })
            })
          })

          // Registry of of encoder/decoder factories, by encoding name.
          /** @type {Object.<string, function({fatal:boolean}): Encoder>} */
          var encoders = {}
          /** @type {Object.<string, function({fatal:boolean}): Decoder>} */
          var decoders = {}

          //
          // 6. Indexes
          //

          /**
           * @param {number} pointer The |pointer| to search for.
           * @param {(!Array.<?number>|undefined)} index The |index| to search within.
           * @return {?number} The code point corresponding to |pointer| in |index|,
           *     or null if |code point| is not in |index|.
           */
          function indexCodePointFor(pointer, index) {
            if (!index) return null
            return index[pointer] || null
          }

          /**
           * @param {number} code_point The |code point| to search for.
           * @param {!Array.<?number>} index The |index| to search within.
           * @return {?number} The first pointer corresponding to |code point| in
           *     |index|, or null if |code point| is not in |index|.
           */
          function indexPointerFor(code_point, index) {
            var pointer = index.indexOf(code_point)
            return pointer === -1 ? null : pointer
          }

          /**
           * @param {string} name Name of the index.
           * @return {(!Array.<number>|!Array.<Array.<number>>)}
           *  */
          function index(name) {
            if (!("encoding-indexes" in global)) {
              throw Error("Indexes missing." + " Did you forget to include encoding-indexes.js first?")
            }
            return global["encoding-indexes"][name]
          }

          /**
           * @param {number} pointer The |pointer| to search for in the gb18030 index.
           * @return {?number} The code point corresponding to |pointer| in |index|,
           *     or null if |code point| is not in the gb18030 index.
           */
          function indexGB18030RangesCodePointFor(pointer) {
            // 1. If pointer is greater than 39419 and less than 189000, or
            // pointer is greater than 1237575, return null.
            if ((pointer > 39419 && pointer < 189000) || pointer > 1237575) return null

            // 2. If pointer is 7457, return code point U+E7C7.
            if (pointer === 7457) return 0xe7c7

            // 3. Let offset be the last pointer in index gb18030 ranges that
            // is equal to or less than pointer and let code point offset be
            // its corresponding code point.
            var offset = 0
            var code_point_offset = 0
            var idx = index("gb18030-ranges")
            var i
            for (i = 0; i < idx.length; ++i) {
              /** @type {!Array.<number>} */
              var entry = idx[i]
              if (entry[0] <= pointer) {
                offset = entry[0]
                code_point_offset = entry[1]
              } else {
                break
              }
            }

            // 4. Return a code point whose value is code point offset +
            // pointer − offset.
            return code_point_offset + pointer - offset
          }

          /**
           * @param {number} code_point The |code point| to locate in the gb18030 index.
           * @return {number} The first pointer corresponding to |code point| in the
           *     gb18030 index.
           */
          function indexGB18030RangesPointerFor(code_point) {
            // 1. If code point is U+E7C7, return pointer 7457.
            if (code_point === 0xe7c7) return 7457

            // 2. Let offset be the last code point in index gb18030 ranges
            // that is equal to or less than code point and let pointer offset
            // be its corresponding pointer.
            var offset = 0
            var pointer_offset = 0
            var idx = index("gb18030-ranges")
            var i
            for (i = 0; i < idx.length; ++i) {
              /** @type {!Array.<number>} */
              var entry = idx[i]
              if (entry[1] <= code_point) {
                offset = entry[1]
                pointer_offset = entry[0]
              } else {
                break
              }
            }

            // 3. Return a pointer whose value is pointer offset + code point
            // − offset.
            return pointer_offset + code_point - offset
          }

          /**
           * @param {number} code_point The |code_point| to search for in the Shift_JIS
           *     index.
           * @return {?number} The code point corresponding to |pointer| in |index|,
           *     or null if |code point| is not in the Shift_JIS index.
           */
          function indexShiftJISPointerFor(code_point) {
            // 1. Let index be index jis0208 excluding all entries whose
            // pointer is in the range 8272 to 8835, inclusive.
            shift_jis_index =
              shift_jis_index ||
              index("jis0208").map(function (code_point, pointer) {
                return inRange(pointer, 8272, 8835) ? null : code_point
              })
            var index_ = shift_jis_index

            // 2. Return the index pointer for code point in index.
            return index_.indexOf(code_point)
          }
          var shift_jis_index

          /**
           * @param {number} code_point The |code_point| to search for in the big5
           *     index.
           * @return {?number} The code point corresponding to |pointer| in |index|,
           *     or null if |code point| is not in the big5 index.
           */
          function indexBig5PointerFor(code_point) {
            // 1. Let index be index Big5 excluding all entries whose pointer
            big5_index_no_hkscs =
              big5_index_no_hkscs ||
              index("big5").map(function (code_point, pointer) {
                return pointer < (0xa1 - 0x81) * 157 ? null : code_point
              })
            var index_ = big5_index_no_hkscs

            // 2. If code point is U+2550, U+255E, U+2561, U+256A, U+5341, or
            // U+5345, return the last pointer corresponding to code point in
            // index.
            if (
              code_point === 0x2550 ||
              code_point === 0x255e ||
              code_point === 0x2561 ||
              code_point === 0x256a ||
              code_point === 0x5341 ||
              code_point === 0x5345
            ) {
              return index_.lastIndexOf(code_point)
            }

            // 3. Return the index pointer for code point in index.
            return indexPointerFor(code_point, index_)
          }
          var big5_index_no_hkscs

          //
          // 8. API
          //

          /** @const */ var DEFAULT_ENCODING = "utf-8"

          // 8.1 Interface TextDecoder

          /**
           * @constructor
           * @param {string=} label The label of the encoding;
           *     defaults to 'utf-8'.
           * @param {Object=} options
           */
          function TextDecoder(label, options) {
            // Web IDL conventions
            if (!(this instanceof TextDecoder)) throw TypeError("Called as a function. Did you forget 'new'?")
            label = label !== undefined ? String(label) : DEFAULT_ENCODING
            options = ToDictionary(options)

            // A TextDecoder object has an associated encoding, decoder,
            // stream, ignore BOM flag (initially unset), BOM seen flag
            // (initially unset), error mode (initially replacement), and do
            // not flush flag (initially unset).

            /** @private */
            this._encoding = null
            /** @private @type {?Decoder} */
            this._decoder = null
            /** @private @type {boolean} */
            this._ignoreBOM = false
            /** @private @type {boolean} */
            this._BOMseen = false
            /** @private @type {string} */
            this._error_mode = "replacement"
            /** @private @type {boolean} */
            this._do_not_flush = false

            // 1. Let encoding be the result of getting an encoding from
            // label.
            var encoding = getEncoding(label)

            // 2. If encoding is failure or replacement, throw a RangeError.
            if (encoding === null || encoding.name === "replacement") throw RangeError("Unknown encoding: " + label)
            if (!decoders[encoding.name]) {
              throw Error("Decoder not present." + " Did you forget to include encoding-indexes.js first?")
            }

            // 3. Let dec be a new TextDecoder object.
            var dec = this

            // 4. Set dec's encoding to encoding.
            dec._encoding = encoding

            // 5. If options's fatal member is true, set dec's error mode to
            // fatal.
            if (Boolean(options["fatal"])) dec._error_mode = "fatal"

            // 6. If options's ignoreBOM member is true, set dec's ignore BOM
            // flag.
            if (Boolean(options["ignoreBOM"])) dec._ignoreBOM = true

            // For pre-ES5 runtimes:
            if (!Object.defineProperty) {
              this.encoding = dec._encoding.name.toLowerCase()
              this.fatal = dec._error_mode === "fatal"
              this.ignoreBOM = dec._ignoreBOM
            }

            // 7. Return dec.
            return dec
          }

          if (Object.defineProperty) {
            // The encoding attribute's getter must return encoding's name.
            Object.defineProperty(TextDecoder.prototype, "encoding", {
              /** @this {TextDecoder} */
              get: function () {
                return this._encoding.name.toLowerCase()
              }
            })

            // The fatal attribute's getter must return true if error mode
            // is fatal, and false otherwise.
            Object.defineProperty(TextDecoder.prototype, "fatal", {
              /** @this {TextDecoder} */
              get: function () {
                return this._error_mode === "fatal"
              }
            })

            // The ignoreBOM attribute's getter must return true if ignore
            // BOM flag is set, and false otherwise.
            Object.defineProperty(TextDecoder.prototype, "ignoreBOM", {
              /** @this {TextDecoder} */
              get: function () {
                return this._ignoreBOM
              }
            })
          }

          /**
           * @param {BufferSource=} input The buffer of bytes to decode.
           * @param {Object=} options
           * @return {string} The decoded string.
           */
          TextDecoder.prototype.decode = function decode(input, options) {
            var bytes
            if (typeof input === "object" && input instanceof ArrayBuffer) {
              bytes = new Uint8Array(input)
            } else if (typeof input === "object" && "buffer" in input && input.buffer instanceof ArrayBuffer) {
              bytes = new Uint8Array(input.buffer, input.byteOffset, input.byteLength)
            } else {
              bytes = new Uint8Array(0)
            }

            options = ToDictionary(options)

            // 1. If the do not flush flag is unset, set decoder to a new
            // encoding's decoder, set stream to a new stream, and unset the
            // BOM seen flag.
            if (!this._do_not_flush) {
              this._decoder = decoders[this._encoding.name]({
                fatal: this._error_mode === "fatal"
              })
              this._BOMseen = false
            }

            // 2. If options's stream is true, set the do not flush flag, and
            // unset the do not flush flag otherwise.
            this._do_not_flush = Boolean(options["stream"])

            // 3. If input is given, push a copy of input to stream.
            // TODO: Align with spec algorithm - maintain stream on instance.
            var input_stream = new Stream(bytes)

            // 4. Let output be a new stream.
            var output = []

            /** @type {?(number|!Array.<number>)} */
            var result

            // 5. While true:
            while (true) {
              // 1. Let token be the result of reading from stream.
              var token = input_stream.read()

              // 2. If token is end-of-stream and the do not flush flag is
              // set, return output, serialized.
              // TODO: Align with spec algorithm.
              if (token === end_of_stream) break

              // 3. Otherwise, run these subsubsteps:

              // 1. Let result be the result of processing token for decoder,
              // stream, output, and error mode.
              result = this._decoder.handler(input_stream, token)

              // 2. If result is finished, return output, serialized.
              if (result === finished) break

              if (result !== null) {
                if (Array.isArray(result)) output.push.apply(output, /**@type {!Array.<number>}*/ (result))
                else output.push(result)
              }

              // 3. Otherwise, if result is error, throw a TypeError.
              // (Thrown in handler)

              // 4. Otherwise, do nothing.
            }
            // TODO: Align with spec algorithm.
            if (!this._do_not_flush) {
              do {
                result = this._decoder.handler(input_stream, input_stream.read())
                if (result === finished) break
                if (result === null) continue
                if (Array.isArray(result)) output.push.apply(output, /**@type {!Array.<number>}*/ (result))
                else output.push(result)
              } while (!input_stream.endOfStream())
              this._decoder = null
            }

            // A TextDecoder object also has an associated serialize stream
            // algorithm...
            /**
             * @param {!Array.<number>} stream
             * @return {string}
             * @this {TextDecoder}
             */
            function serializeStream(stream) {
              // 1. Let token be the result of reading from stream.
              // (Done in-place on array, rather than as a stream)

              // 2. If encoding is UTF-8, UTF-16BE, or UTF-16LE, and ignore
              // BOM flag and BOM seen flag are unset, run these subsubsteps:
              if (includes(["UTF-8", "UTF-16LE", "UTF-16BE"], this._encoding.name) && !this._ignoreBOM && !this._BOMseen) {
                if (stream.length > 0 && stream[0] === 0xfeff) {
                  // 1. If token is U+FEFF, set BOM seen flag.
                  this._BOMseen = true
                  stream.shift()
                } else if (stream.length > 0) {
                  // 2. Otherwise, if token is not end-of-stream, set BOM seen
                  // flag and append token to stream.
                  this._BOMseen = true
                } else {
                  // 3. Otherwise, if token is not end-of-stream, append token
                  // to output.
                  // (no-op)
                }
              }
              // 4. Otherwise, return output.
              return codePointsToString(stream)
            }

            return serializeStream.call(this, output)
          }

          // 8.2 Interface TextEncoder

          /**
           * @constructor
           * @param {string=} label The label of the encoding. NONSTANDARD.
           * @param {Object=} options NONSTANDARD.
           */
          function TextEncoder(label, options) {
            // Web IDL conventions
            if (!(this instanceof TextEncoder)) throw TypeError("Called as a function. Did you forget 'new'?")
            options = ToDictionary(options)

            // A TextEncoder object has an associated encoding and encoder.

            /** @private */
            this._encoding = null
            /** @private @type {?Encoder} */
            this._encoder = null

            // Non-standard
            /** @private @type {boolean} */
            this._do_not_flush = false
            /** @private @type {string} */
            this._fatal = Boolean(options["fatal"]) ? "fatal" : "replacement"

            // 1. Let enc be a new TextEncoder object.
            var enc = this

            // 2. Set enc's encoding to UTF-8's encoder.
            if (Boolean(options["NONSTANDARD_allowLegacyEncoding"])) {
              // NONSTANDARD behavior.
              label = label !== undefined ? String(label) : DEFAULT_ENCODING
              var encoding = getEncoding(label)
              if (encoding === null || encoding.name === "replacement") throw RangeError("Unknown encoding: " + label)
              if (!encoders[encoding.name]) {
                throw Error("Encoder not present." + " Did you forget to include encoding-indexes.js first?")
              }
              enc._encoding = encoding
            } else {
              // Standard behavior.
              enc._encoding = getEncoding("utf-8")

              if (label !== undefined && "console" in global) {
                console.warn("TextEncoder constructor called with encoding label, " + "which is ignored.")
              }
            }

            // For pre-ES5 runtimes:
            if (!Object.defineProperty) this.encoding = enc._encoding.name.toLowerCase()

            // 3. Return enc.
            return enc
          }

          if (Object.defineProperty) {
            // The encoding attribute's getter must return encoding's name.
            Object.defineProperty(TextEncoder.prototype, "encoding", {
              /** @this {TextEncoder} */
              get: function () {
                return this._encoding.name.toLowerCase()
              }
            })
          }

          /**
           * @param {string=} opt_string The string to encode.
           * @param {Object=} options
           * @return {!Uint8Array} Encoded bytes, as a Uint8Array.
           */
          TextEncoder.prototype.encode = function encode(opt_string, options) {
            opt_string = opt_string === undefined ? "" : String(opt_string)
            options = ToDictionary(options)

            // NOTE: This option is nonstandard. None of the encodings
            // permitted for encoding (i.e. UTF-8, UTF-16) are stateful when
            // the input is a USVString so streaming is not necessary.
            if (!this._do_not_flush)
              this._encoder = encoders[this._encoding.name]({
                fatal: this._fatal === "fatal"
              })
            this._do_not_flush = Boolean(options["stream"])

            // 1. Convert input to a stream.
            var input = new Stream(stringToCodePoints(opt_string))

            // 2. Let output be a new stream
            var output = []

            /** @type {?(number|!Array.<number>)} */
            var result
            // 3. While true, run these substeps:
            while (true) {
              // 1. Let token be the result of reading from input.
              var token = input.read()
              if (token === end_of_stream) break
              // 2. Let result be the result of processing token for encoder,
              // input, output.
              result = this._encoder.handler(input, token)
              if (result === finished) break
              if (Array.isArray(result)) output.push.apply(output, /**@type {!Array.<number>}*/ (result))
              else output.push(result)
            }
            // TODO: Align with spec algorithm.
            if (!this._do_not_flush) {
              while (true) {
                result = this._encoder.handler(input, input.read())
                if (result === finished) break
                if (Array.isArray(result)) output.push.apply(output, /**@type {!Array.<number>}*/ (result))
                else output.push(result)
              }
              this._encoder = null
            }
            // 3. If result is finished, convert output into a byte sequence,
            // and then return a Uint8Array object wrapping an ArrayBuffer
            // containing output.
            return new Uint8Array(output)
          }

          //
          // 9. The encoding
          //

          // 9.1 utf-8

          // 9.1.1 utf-8 decoder
          /**
           * @constructor
           * @implements {Decoder}
           * @param {{fatal: boolean}} options
           */
          function UTF8Decoder(options) {
            var fatal = options.fatal

            // utf-8's decoder's has an associated utf-8 code point, utf-8
            // bytes seen, and utf-8 bytes needed (all initially 0), a utf-8
            // lower boundary (initially 0x80), and a utf-8 upper boundary
            // (initially 0xBF).
            var /** @type {number} */ utf8_code_point = 0,
              /** @type {number} */ utf8_bytes_seen = 0,
              /** @type {number} */ utf8_bytes_needed = 0,
              /** @type {number} */ utf8_lower_boundary = 0x80,
              /** @type {number} */ utf8_upper_boundary = 0xbf

            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point.
             */
            this.handler = function (stream, bite) {
              // 1. If byte is end-of-stream and utf-8 bytes needed is not 0,
              // set utf-8 bytes needed to 0 and return error.
              if (bite === end_of_stream && utf8_bytes_needed !== 0) {
                utf8_bytes_needed = 0
                return decoderError(fatal)
              }

              // 2. If byte is end-of-stream, return finished.
              if (bite === end_of_stream) return finished

              // 3. If utf-8 bytes needed is 0, based on byte:
              if (utf8_bytes_needed === 0) {
                // 0x00 to 0x7F
                if (inRange(bite, 0x00, 0x7f)) {
                  // Return a code point whose value is byte.
                  return bite
                }

                // 0xC2 to 0xDF
                else if (inRange(bite, 0xc2, 0xdf)) {
                  // 1. Set utf-8 bytes needed to 1.
                  utf8_bytes_needed = 1

                  // 2. Set UTF-8 code point to byte & 0x1F.
                  utf8_code_point = bite & 0x1f
                }

                // 0xE0 to 0xEF
                else if (inRange(bite, 0xe0, 0xef)) {
                  // 1. If byte is 0xE0, set utf-8 lower boundary to 0xA0.
                  if (bite === 0xe0) utf8_lower_boundary = 0xa0
                  // 2. If byte is 0xED, set utf-8 upper boundary to 0x9F.
                  if (bite === 0xed) utf8_upper_boundary = 0x9f
                  // 3. Set utf-8 bytes needed to 2.
                  utf8_bytes_needed = 2
                  // 4. Set UTF-8 code point to byte & 0xF.
                  utf8_code_point = bite & 0xf
                }

                // 0xF0 to 0xF4
                else if (inRange(bite, 0xf0, 0xf4)) {
                  // 1. If byte is 0xF0, set utf-8 lower boundary to 0x90.
                  if (bite === 0xf0) utf8_lower_boundary = 0x90
                  // 2. If byte is 0xF4, set utf-8 upper boundary to 0x8F.
                  if (bite === 0xf4) utf8_upper_boundary = 0x8f
                  // 3. Set utf-8 bytes needed to 3.
                  utf8_bytes_needed = 3
                  // 4. Set UTF-8 code point to byte & 0x7.
                  utf8_code_point = bite & 0x7
                }

                // Otherwise
                else {
                  // Return error.
                  return decoderError(fatal)
                }

                // Return continue.
                return null
              }

              // 4. If byte is not in the range utf-8 lower boundary to utf-8
              // upper boundary, inclusive, run these substeps:
              if (!inRange(bite, utf8_lower_boundary, utf8_upper_boundary)) {
                // 1. Set utf-8 code point, utf-8 bytes needed, and utf-8
                // bytes seen to 0, set utf-8 lower boundary to 0x80, and set
                // utf-8 upper boundary to 0xBF.
                utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0
                utf8_lower_boundary = 0x80
                utf8_upper_boundary = 0xbf

                // 2. Prepend byte to stream.
                stream.prepend(bite)

                // 3. Return error.
                return decoderError(fatal)
              }

              // 5. Set utf-8 lower boundary to 0x80 and utf-8 upper boundary
              // to 0xBF.
              utf8_lower_boundary = 0x80
              utf8_upper_boundary = 0xbf

              // 6. Set UTF-8 code point to (UTF-8 code point << 6) | (byte &
              // 0x3F)
              utf8_code_point = (utf8_code_point << 6) | (bite & 0x3f)

              // 7. Increase utf-8 bytes seen by one.
              utf8_bytes_seen += 1

              // 8. If utf-8 bytes seen is not equal to utf-8 bytes needed,
              // continue.
              if (utf8_bytes_seen !== utf8_bytes_needed) return null

              // 9. Let code point be utf-8 code point.
              var code_point = utf8_code_point

              // 10. Set utf-8 code point, utf-8 bytes needed, and utf-8 bytes
              // seen to 0.
              utf8_code_point = utf8_bytes_needed = utf8_bytes_seen = 0

              // 11. Return a code point whose value is code point.
              return code_point
            }
          }

          // 9.1.2 utf-8 encoder
          /**
           * @constructor
           * @implements {Encoder}
           * @param {{fatal: boolean}} options
           */
          function UTF8Encoder(options) {
            var fatal = options.fatal
            /**
             * @param {Stream} stream Input stream.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit.
             */
            this.handler = function (stream, code_point) {
              // 1. If code point is end-of-stream, return finished.
              if (code_point === end_of_stream) return finished

              // 2. If code point is an ASCII code point, return a byte whose
              // value is code point.
              if (isASCIICodePoint(code_point)) return code_point

              // 3. Set count and offset based on the range code point is in:
              var count, offset
              // U+0080 to U+07FF, inclusive:
              if (inRange(code_point, 0x0080, 0x07ff)) {
                // 1 and 0xC0
                count = 1
                offset = 0xc0
              }
              // U+0800 to U+FFFF, inclusive:
              else if (inRange(code_point, 0x0800, 0xffff)) {
                // 2 and 0xE0
                count = 2
                offset = 0xe0
              }
              // U+10000 to U+10FFFF, inclusive:
              else if (inRange(code_point, 0x10000, 0x10ffff)) {
                // 3 and 0xF0
                count = 3
                offset = 0xf0
              }

              // 4. Let bytes be a byte sequence whose first byte is (code
              // point >> (6 × count)) + offset.
              var bytes = [(code_point >> (6 * count)) + offset]

              // 5. Run these substeps while count is greater than 0:
              while (count > 0) {
                // 1. Set temp to code point >> (6 × (count − 1)).
                var temp = code_point >> (6 * (count - 1))

                // 2. Append to bytes 0x80 | (temp & 0x3F).
                bytes.push(0x80 | (temp & 0x3f))

                // 3. Decrease count by one.
                count -= 1
              }

              // 6. Return bytes bytes, in order.
              return bytes
            }
          }

          /** @param {{fatal: boolean}} options */
          encoders["UTF-8"] = function (options) {
            return new UTF8Encoder(options)
          }
          /** @param {{fatal: boolean}} options */
          decoders["UTF-8"] = function (options) {
            return new UTF8Decoder(options)
          }

          //
          // 10. Legacy single-byte encodings
          //

          // 10.1 single-byte decoder
          /**
           * @constructor
           * @implements {Decoder}
           * @param {!Array.<number>} index The encoding index.
           * @param {{fatal: boolean}} options
           */
          function SingleByteDecoder(index, options) {
            var fatal = options.fatal
            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point.
             */
            this.handler = function (stream, bite) {
              // 1. If byte is end-of-stream, return finished.
              if (bite === end_of_stream) return finished

              // 2. If byte is an ASCII byte, return a code point whose value
              // is byte.
              if (isASCIIByte(bite)) return bite

              // 3. Let code point be the index code point for byte − 0x80 in
              // index single-byte.
              var code_point = index[bite - 0x80]

              // 4. If code point is null, return error.
              if (code_point === null) return decoderError(fatal)

              // 5. Return a code point whose value is code point.
              return code_point
            }
          }

          // 10.2 single-byte encoder
          /**
           * @constructor
           * @implements {Encoder}
           * @param {!Array.<?number>} index The encoding index.
           * @param {{fatal: boolean}} options
           */
          function SingleByteEncoder(index, options) {
            var fatal = options.fatal
            /**
             * @param {Stream} stream Input stream.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit.
             */
            this.handler = function (stream, code_point) {
              // 1. If code point is end-of-stream, return finished.
              if (code_point === end_of_stream) return finished

              // 2. If code point is an ASCII code point, return a byte whose
              // value is code point.
              if (isASCIICodePoint(code_point)) return code_point

              // 3. Let pointer be the index pointer for code point in index
              // single-byte.
              var pointer = indexPointerFor(code_point, index)

              // 4. If pointer is null, return error with code point.
              if (pointer === null) encoderError(code_point)

              // 5. Return a byte whose value is pointer + 0x80.
              return pointer + 0x80
            }
          }

          ;(function () {
            if (!("encoding-indexes" in global)) return
            encodings.forEach(function (category) {
              if (category.heading !== "Legacy single-byte encodings") return
              category.encodings.forEach(function (encoding) {
                var name = encoding.name
                var idx = index(name.toLowerCase())
                /** @param {{fatal: boolean}} options */
                decoders[name] = function (options) {
                  return new SingleByteDecoder(idx, options)
                }
                /** @param {{fatal: boolean}} options */
                encoders[name] = function (options) {
                  return new SingleByteEncoder(idx, options)
                }
              })
            })
          })()

          //
          // 11. Legacy multi-byte Chinese (simplified) encodings
          //

          // 11.1 gbk

          // 11.1.1 gbk decoder
          // gbk's decoder is gb18030's decoder.
          /** @param {{fatal: boolean}} options */
          decoders["GBK"] = function (options) {
            return new GB18030Decoder(options)
          }

          // 11.1.2 gbk encoder
          // gbk's encoder is gb18030's encoder with its gbk flag set.
          /** @param {{fatal: boolean}} options */
          encoders["GBK"] = function (options) {
            return new GB18030Encoder(options, true)
          }

          // 11.2 gb18030

          // 11.2.1 gb18030 decoder
          /**
           * @constructor
           * @implements {Decoder}
           * @param {{fatal: boolean}} options
           */
          function GB18030Decoder(options) {
            var fatal = options.fatal
            // gb18030's decoder has an associated gb18030 first, gb18030
            // second, and gb18030 third (all initially 0x00).
            var /** @type {number} */ gb18030_first = 0x00,
              /** @type {number} */ gb18030_second = 0x00,
              /** @type {number} */ gb18030_third = 0x00
            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point.
             */
            this.handler = function (stream, bite) {
              // 1. If byte is end-of-stream and gb18030 first, gb18030
              // second, and gb18030 third are 0x00, return finished.
              if (bite === end_of_stream && gb18030_first === 0x00 && gb18030_second === 0x00 && gb18030_third === 0x00) {
                return finished
              }
              // 2. If byte is end-of-stream, and gb18030 first, gb18030
              // second, or gb18030 third is not 0x00, set gb18030 first,
              // gb18030 second, and gb18030 third to 0x00, and return error.
              if (bite === end_of_stream && (gb18030_first !== 0x00 || gb18030_second !== 0x00 || gb18030_third !== 0x00)) {
                gb18030_first = 0x00
                gb18030_second = 0x00
                gb18030_third = 0x00
                decoderError(fatal)
              }
              var code_point
              // 3. If gb18030 third is not 0x00, run these substeps:
              if (gb18030_third !== 0x00) {
                // 1. Let code point be null.
                code_point = null
                // 2. If byte is in the range 0x30 to 0x39, inclusive, set
                // code point to the index gb18030 ranges code point for
                // (((gb18030 first − 0x81) × 10 + gb18030 second − 0x30) ×
                // 126 + gb18030 third − 0x81) × 10 + byte − 0x30.
                if (inRange(bite, 0x30, 0x39)) {
                  code_point = indexGB18030RangesCodePointFor(
                    (((gb18030_first - 0x81) * 10 + gb18030_second - 0x30) * 126 + gb18030_third - 0x81) * 10 + bite - 0x30
                  )
                }

                // 3. Let buffer be a byte sequence consisting of gb18030
                // second, gb18030 third, and byte, in order.
                var buffer = [gb18030_second, gb18030_third, bite]

                // 4. Set gb18030 first, gb18030 second, and gb18030 third to
                // 0x00.
                gb18030_first = 0x00
                gb18030_second = 0x00
                gb18030_third = 0x00

                // 5. If code point is null, prepend buffer to stream and
                // return error.
                if (code_point === null) {
                  stream.prepend(buffer)
                  return decoderError(fatal)
                }

                // 6. Return a code point whose value is code point.
                return code_point
              }

              // 4. If gb18030 second is not 0x00, run these substeps:
              if (gb18030_second !== 0x00) {
                // 1. If byte is in the range 0x81 to 0xFE, inclusive, set
                // gb18030 third to byte and return continue.
                if (inRange(bite, 0x81, 0xfe)) {
                  gb18030_third = bite
                  return null
                }

                // 2. Prepend gb18030 second followed by byte to stream, set
                // gb18030 first and gb18030 second to 0x00, and return error.
                stream.prepend([gb18030_second, bite])
                gb18030_first = 0x00
                gb18030_second = 0x00
                return decoderError(fatal)
              }

              // 5. If gb18030 first is not 0x00, run these substeps:
              if (gb18030_first !== 0x00) {
                // 1. If byte is in the range 0x30 to 0x39, inclusive, set
                // gb18030 second to byte and return continue.
                if (inRange(bite, 0x30, 0x39)) {
                  gb18030_second = bite
                  return null
                }

                // 2. Let lead be gb18030 first, let pointer be null, and set
                // gb18030 first to 0x00.
                var lead = gb18030_first
                var pointer = null
                gb18030_first = 0x00

                // 3. Let offset be 0x40 if byte is less than 0x7F and 0x41
                // otherwise.
                var offset = bite < 0x7f ? 0x40 : 0x41

                // 4. If byte is in the range 0x40 to 0x7E, inclusive, or 0x80
                // to 0xFE, inclusive, set pointer to (lead − 0x81) × 190 +
                // (byte − offset).
                if (inRange(bite, 0x40, 0x7e) || inRange(bite, 0x80, 0xfe)) pointer = (lead - 0x81) * 190 + (bite - offset)

                // 5. Let code point be null if pointer is null and the index
                // code point for pointer in index gb18030 otherwise.
                code_point = pointer === null ? null : indexCodePointFor(pointer, index("gb18030"))

                // 6. If code point is null and byte is an ASCII byte, prepend
                // byte to stream.
                if (code_point === null && isASCIIByte(bite)) stream.prepend(bite)

                // 7. If code point is null, return error.
                if (code_point === null) return decoderError(fatal)

                // 8. Return a code point whose value is code point.
                return code_point
              }

              // 6. If byte is an ASCII byte, return a code point whose value
              // is byte.
              if (isASCIIByte(bite)) return bite

              // 7. If byte is 0x80, return code point U+20AC.
              if (bite === 0x80) return 0x20ac

              // 8. If byte is in the range 0x81 to 0xFE, inclusive, set
              // gb18030 first to byte and return continue.
              if (inRange(bite, 0x81, 0xfe)) {
                gb18030_first = bite
                return null
              }

              // 9. Return error.
              return decoderError(fatal)
            }
          }

          // 11.2.2 gb18030 encoder
          /**
           * @constructor
           * @implements {Encoder}
           * @param {{fatal: boolean}} options
           * @param {boolean=} gbk_flag
           */
          function GB18030Encoder(options, gbk_flag) {
            var fatal = options.fatal
            // gb18030's decoder has an associated gbk flag (initially unset).
            /**
             * @param {Stream} stream Input stream.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit.
             */
            this.handler = function (stream, code_point) {
              // 1. If code point is end-of-stream, return finished.
              if (code_point === end_of_stream) return finished

              // 2. If code point is an ASCII code point, return a byte whose
              // value is code point.
              if (isASCIICodePoint(code_point)) return code_point

              // 3. If code point is U+E5E5, return error with code point.
              if (code_point === 0xe5e5) return encoderError(code_point)

              // 4. If the gbk flag is set and code point is U+20AC, return
              // byte 0x80.
              if (gbk_flag && code_point === 0x20ac) return 0x80

              // 5. Let pointer be the index pointer for code point in index
              // gb18030.
              var pointer = indexPointerFor(code_point, index("gb18030"))

              // 6. If pointer is not null, run these substeps:
              if (pointer !== null) {
                // 1. Let lead be floor(pointer / 190) + 0x81.
                var lead = floor(pointer / 190) + 0x81

                // 2. Let trail be pointer % 190.
                var trail = pointer % 190

                // 3. Let offset be 0x40 if trail is less than 0x3F and 0x41 otherwise.
                var offset = trail < 0x3f ? 0x40 : 0x41

                // 4. Return two bytes whose values are lead and trail + offset.
                return [lead, trail + offset]
              }

              // 7. If gbk flag is set, return error with code point.
              if (gbk_flag) return encoderError(code_point)

              // 8. Set pointer to the index gb18030 ranges pointer for code
              // point.
              pointer = indexGB18030RangesPointerFor(code_point)

              // 9. Let byte1 be floor(pointer / 10 / 126 / 10).
              var byte1 = floor(pointer / 10 / 126 / 10)

              // 10. Set pointer to pointer − byte1 × 10 × 126 × 10.
              pointer = pointer - byte1 * 10 * 126 * 10

              // 11. Let byte2 be floor(pointer / 10 / 126).
              var byte2 = floor(pointer / 10 / 126)

              // 12. Set pointer to pointer − byte2 × 10 × 126.
              pointer = pointer - byte2 * 10 * 126

              // 13. Let byte3 be floor(pointer / 10).
              var byte3 = floor(pointer / 10)

              // 14. Let byte4 be pointer − byte3 × 10.
              var byte4 = pointer - byte3 * 10

              // 15. Return four bytes whose values are byte1 + 0x81, byte2 +
              // 0x30, byte3 + 0x81, byte4 + 0x30.
              return [byte1 + 0x81, byte2 + 0x30, byte3 + 0x81, byte4 + 0x30]
            }
          }

          /** @param {{fatal: boolean}} options */
          encoders["gb18030"] = function (options) {
            return new GB18030Encoder(options)
          }
          /** @param {{fatal: boolean}} options */
          decoders["gb18030"] = function (options) {
            return new GB18030Decoder(options)
          }

          //
          // 12. Legacy multi-byte Chinese (traditional) encodings
          //

          // 12.1 Big5

          // 12.1.1 Big5 decoder
          /**
           * @constructor
           * @implements {Decoder}
           * @param {{fatal: boolean}} options
           */
          function Big5Decoder(options) {
            var fatal = options.fatal
            // Big5's decoder has an associated Big5 lead (initially 0x00).
            var /** @type {number} */ Big5_lead = 0x00

            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point.
             */
            this.handler = function (stream, bite) {
              // 1. If byte is end-of-stream and Big5 lead is not 0x00, set
              // Big5 lead to 0x00 and return error.
              if (bite === end_of_stream && Big5_lead !== 0x00) {
                Big5_lead = 0x00
                return decoderError(fatal)
              }

              // 2. If byte is end-of-stream and Big5 lead is 0x00, return
              // finished.
              if (bite === end_of_stream && Big5_lead === 0x00) return finished

              // 3. If Big5 lead is not 0x00, let lead be Big5 lead, let
              // pointer be null, set Big5 lead to 0x00, and then run these
              // substeps:
              if (Big5_lead !== 0x00) {
                var lead = Big5_lead
                var pointer = null
                Big5_lead = 0x00

                // 1. Let offset be 0x40 if byte is less than 0x7F and 0x62
                // otherwise.
                var offset = bite < 0x7f ? 0x40 : 0x62

                // 2. If byte is in the range 0x40 to 0x7E, inclusive, or 0xA1
                // to 0xFE, inclusive, set pointer to (lead − 0x81) × 157 +
                // (byte − offset).
                if (inRange(bite, 0x40, 0x7e) || inRange(bite, 0xa1, 0xfe)) pointer = (lead - 0x81) * 157 + (bite - offset)

                // 3. If there is a row in the table below whose first column
                // is pointer, return the two code points listed in its second
                // column
                // Pointer | Code points
                // --------+--------------
                // 1133    | U+00CA U+0304
                // 1135    | U+00CA U+030C
                // 1164    | U+00EA U+0304
                // 1166    | U+00EA U+030C
                switch (pointer) {
                  case 1133:
                    return [0x00ca, 0x0304]
                  case 1135:
                    return [0x00ca, 0x030c]
                  case 1164:
                    return [0x00ea, 0x0304]
                  case 1166:
                    return [0x00ea, 0x030c]
                }

                // 4. Let code point be null if pointer is null and the index
                // code point for pointer in index Big5 otherwise.
                var code_point = pointer === null ? null : indexCodePointFor(pointer, index("big5"))

                // 5. If code point is null and byte is an ASCII byte, prepend
                // byte to stream.
                if (code_point === null && isASCIIByte(bite)) stream.prepend(bite)

                // 6. If code point is null, return error.
                if (code_point === null) return decoderError(fatal)

                // 7. Return a code point whose value is code point.
                return code_point
              }

              // 4. If byte is an ASCII byte, return a code point whose value
              // is byte.
              if (isASCIIByte(bite)) return bite

              // 5. If byte is in the range 0x81 to 0xFE, inclusive, set Big5
              // lead to byte and return continue.
              if (inRange(bite, 0x81, 0xfe)) {
                Big5_lead = bite
                return null
              }

              // 6. Return error.
              return decoderError(fatal)
            }
          }

          // 12.1.2 Big5 encoder
          /**
           * @constructor
           * @implements {Encoder}
           * @param {{fatal: boolean}} options
           */
          function Big5Encoder(options) {
            var fatal = options.fatal
            /**
             * @param {Stream} stream Input stream.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit.
             */
            this.handler = function (stream, code_point) {
              // 1. If code point is end-of-stream, return finished.
              if (code_point === end_of_stream) return finished

              // 2. If code point is an ASCII code point, return a byte whose
              // value is code point.
              if (isASCIICodePoint(code_point)) return code_point

              // 3. Let pointer be the index Big5 pointer for code point.
              var pointer = indexBig5PointerFor(code_point)

              // 4. If pointer is null, return error with code point.
              if (pointer === null) return encoderError(code_point)

              // 5. Let lead be floor(pointer / 157) + 0x81.
              var lead = floor(pointer / 157) + 0x81

              // 6. If lead is less than 0xA1, return error with code point.
              if (lead < 0xa1) return encoderError(code_point)

              // 7. Let trail be pointer % 157.
              var trail = pointer % 157

              // 8. Let offset be 0x40 if trail is less than 0x3F and 0x62
              // otherwise.
              var offset = trail < 0x3f ? 0x40 : 0x62

              // Return two bytes whose values are lead and trail + offset.
              return [lead, trail + offset]
            }
          }

          /** @param {{fatal: boolean}} options */
          encoders["Big5"] = function (options) {
            return new Big5Encoder(options)
          }
          /** @param {{fatal: boolean}} options */
          decoders["Big5"] = function (options) {
            return new Big5Decoder(options)
          }

          //
          // 13. Legacy multi-byte Japanese encodings
          //

          // 13.1 euc-jp

          // 13.1.1 euc-jp decoder
          /**
           * @constructor
           * @implements {Decoder}
           * @param {{fatal: boolean}} options
           */
          function EUCJPDecoder(options) {
            var fatal = options.fatal

            // euc-jp's decoder has an associated euc-jp jis0212 flag
            // (initially unset) and euc-jp lead (initially 0x00).
            var /** @type {boolean} */ eucjp_jis0212_flag = false,
              /** @type {number} */ eucjp_lead = 0x00

            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point.
             */
            this.handler = function (stream, bite) {
              // 1. If byte is end-of-stream and euc-jp lead is not 0x00, set
              // euc-jp lead to 0x00, and return error.
              if (bite === end_of_stream && eucjp_lead !== 0x00) {
                eucjp_lead = 0x00
                return decoderError(fatal)
              }

              // 2. If byte is end-of-stream and euc-jp lead is 0x00, return
              // finished.
              if (bite === end_of_stream && eucjp_lead === 0x00) return finished

              // 3. If euc-jp lead is 0x8E and byte is in the range 0xA1 to
              // 0xDF, inclusive, set euc-jp lead to 0x00 and return a code
              // point whose value is 0xFF61 − 0xA1 + byte.
              if (eucjp_lead === 0x8e && inRange(bite, 0xa1, 0xdf)) {
                eucjp_lead = 0x00
                return 0xff61 - 0xa1 + bite
              }

              // 4. If euc-jp lead is 0x8F and byte is in the range 0xA1 to
              // 0xFE, inclusive, set the euc-jp jis0212 flag, set euc-jp lead
              // to byte, and return continue.
              if (eucjp_lead === 0x8f && inRange(bite, 0xa1, 0xfe)) {
                eucjp_jis0212_flag = true
                eucjp_lead = bite
                return null
              }

              // 5. If euc-jp lead is not 0x00, let lead be euc-jp lead, set
              // euc-jp lead to 0x00, and run these substeps:
              if (eucjp_lead !== 0x00) {
                var lead = eucjp_lead
                eucjp_lead = 0x00

                // 1. Let code point be null.
                var code_point = null

                // 2. If lead and byte are both in the range 0xA1 to 0xFE,
                // inclusive, set code point to the index code point for (lead
                // − 0xA1) × 94 + byte − 0xA1 in index jis0208 if the euc-jp
                // jis0212 flag is unset and in index jis0212 otherwise.
                if (inRange(lead, 0xa1, 0xfe) && inRange(bite, 0xa1, 0xfe)) {
                  code_point = indexCodePointFor((lead - 0xa1) * 94 + (bite - 0xa1), index(!eucjp_jis0212_flag ? "jis0208" : "jis0212"))
                }

                // 3. Unset the euc-jp jis0212 flag.
                eucjp_jis0212_flag = false

                // 4. If byte is not in the range 0xA1 to 0xFE, inclusive,
                // prepend byte to stream.
                if (!inRange(bite, 0xa1, 0xfe)) stream.prepend(bite)

                // 5. If code point is null, return error.
                if (code_point === null) return decoderError(fatal)

                // 6. Return a code point whose value is code point.
                return code_point
              }

              // 6. If byte is an ASCII byte, return a code point whose value
              // is byte.
              if (isASCIIByte(bite)) return bite

              // 7. If byte is 0x8E, 0x8F, or in the range 0xA1 to 0xFE,
              // inclusive, set euc-jp lead to byte and return continue.
              if (bite === 0x8e || bite === 0x8f || inRange(bite, 0xa1, 0xfe)) {
                eucjp_lead = bite
                return null
              }

              // 8. Return error.
              return decoderError(fatal)
            }
          }

          // 13.1.2 euc-jp encoder
          /**
           * @constructor
           * @implements {Encoder}
           * @param {{fatal: boolean}} options
           */
          function EUCJPEncoder(options) {
            var fatal = options.fatal
            /**
             * @param {Stream} stream Input stream.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit.
             */
            this.handler = function (stream, code_point) {
              // 1. If code point is end-of-stream, return finished.
              if (code_point === end_of_stream) return finished

              // 2. If code point is an ASCII code point, return a byte whose
              // value is code point.
              if (isASCIICodePoint(code_point)) return code_point

              // 3. If code point is U+00A5, return byte 0x5C.
              if (code_point === 0x00a5) return 0x5c

              // 4. If code point is U+203E, return byte 0x7E.
              if (code_point === 0x203e) return 0x7e

              // 5. If code point is in the range U+FF61 to U+FF9F, inclusive,
              // return two bytes whose values are 0x8E and code point −
              // 0xFF61 + 0xA1.
              if (inRange(code_point, 0xff61, 0xff9f)) return [0x8e, code_point - 0xff61 + 0xa1]

              // 6. If code point is U+2212, set it to U+FF0D.
              if (code_point === 0x2212) code_point = 0xff0d

              // 7. Let pointer be the index pointer for code point in index
              // jis0208.
              var pointer = indexPointerFor(code_point, index("jis0208"))

              // 8. If pointer is null, return error with code point.
              if (pointer === null) return encoderError(code_point)

              // 9. Let lead be floor(pointer / 94) + 0xA1.
              var lead = floor(pointer / 94) + 0xa1

              // 10. Let trail be pointer % 94 + 0xA1.
              var trail = (pointer % 94) + 0xa1

              // 11. Return two bytes whose values are lead and trail.
              return [lead, trail]
            }
          }

          /** @param {{fatal: boolean}} options */
          encoders["EUC-JP"] = function (options) {
            return new EUCJPEncoder(options)
          }
          /** @param {{fatal: boolean}} options */
          decoders["EUC-JP"] = function (options) {
            return new EUCJPDecoder(options)
          }

          // 13.2 iso-2022-jp

          // 13.2.1 iso-2022-jp decoder
          /**
           * @constructor
           * @implements {Decoder}
           * @param {{fatal: boolean}} options
           */
          function ISO2022JPDecoder(options) {
            var fatal = options.fatal
            /** @enum */
            var states = {
              ASCII: 0,
              Roman: 1,
              Katakana: 2,
              LeadByte: 3,
              TrailByte: 4,
              EscapeStart: 5,
              Escape: 6
            }
            // iso-2022-jp's decoder has an associated iso-2022-jp decoder
            // state (initially ASCII), iso-2022-jp decoder output state
            // (initially ASCII), iso-2022-jp lead (initially 0x00), and
            // iso-2022-jp output flag (initially unset).
            var /** @type {number} */ iso2022jp_decoder_state = states.ASCII,
              /** @type {number} */ iso2022jp_decoder_output_state = states.ASCII,
              /** @type {number} */ iso2022jp_lead = 0x00,
              /** @type {boolean} */ iso2022jp_output_flag = false
            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point.
             */
            this.handler = function (stream, bite) {
              // switching on iso-2022-jp decoder state:
              switch (iso2022jp_decoder_state) {
                default:
                case states.ASCII:
                  // ASCII
                  // Based on byte:

                  // 0x1B
                  if (bite === 0x1b) {
                    // Set iso-2022-jp decoder state to escape start and return
                    // continue.
                    iso2022jp_decoder_state = states.EscapeStart
                    return null
                  }

                  // 0x00 to 0x7F, excluding 0x0E, 0x0F, and 0x1B
                  if (inRange(bite, 0x00, 0x7f) && bite !== 0x0e && bite !== 0x0f && bite !== 0x1b) {
                    // Unset the iso-2022-jp output flag and return a code point
                    // whose value is byte.
                    iso2022jp_output_flag = false
                    return bite
                  }

                  // end-of-stream
                  if (bite === end_of_stream) {
                    // Return finished.
                    return finished
                  }

                  // Otherwise
                  // Unset the iso-2022-jp output flag and return error.
                  iso2022jp_output_flag = false
                  return decoderError(fatal)

                case states.Roman:
                  // Roman
                  // Based on byte:

                  // 0x1B
                  if (bite === 0x1b) {
                    // Set iso-2022-jp decoder state to escape start and return
                    // continue.
                    iso2022jp_decoder_state = states.EscapeStart
                    return null
                  }

                  // 0x5C
                  if (bite === 0x5c) {
                    // Unset the iso-2022-jp output flag and return code point
                    // U+00A5.
                    iso2022jp_output_flag = false
                    return 0x00a5
                  }

                  // 0x7E
                  if (bite === 0x7e) {
                    // Unset the iso-2022-jp output flag and return code point
                    // U+203E.
                    iso2022jp_output_flag = false
                    return 0x203e
                  }

                  // 0x00 to 0x7F, excluding 0x0E, 0x0F, 0x1B, 0x5C, and 0x7E
                  if (inRange(bite, 0x00, 0x7f) && bite !== 0x0e && bite !== 0x0f && bite !== 0x1b && bite !== 0x5c && bite !== 0x7e) {
                    // Unset the iso-2022-jp output flag and return a code point
                    // whose value is byte.
                    iso2022jp_output_flag = false
                    return bite
                  }

                  // end-of-stream
                  if (bite === end_of_stream) {
                    // Return finished.
                    return finished
                  }

                  // Otherwise
                  // Unset the iso-2022-jp output flag and return error.
                  iso2022jp_output_flag = false
                  return decoderError(fatal)

                case states.Katakana:
                  // Katakana
                  // Based on byte:

                  // 0x1B
                  if (bite === 0x1b) {
                    // Set iso-2022-jp decoder state to escape start and return
                    // continue.
                    iso2022jp_decoder_state = states.EscapeStart
                    return null
                  }

                  // 0x21 to 0x5F
                  if (inRange(bite, 0x21, 0x5f)) {
                    // Unset the iso-2022-jp output flag and return a code point
                    // whose value is 0xFF61 − 0x21 + byte.
                    iso2022jp_output_flag = false
                    return 0xff61 - 0x21 + bite
                  }

                  // end-of-stream
                  if (bite === end_of_stream) {
                    // Return finished.
                    return finished
                  }

                  // Otherwise
                  // Unset the iso-2022-jp output flag and return error.
                  iso2022jp_output_flag = false
                  return decoderError(fatal)

                case states.LeadByte:
                  // Lead byte
                  // Based on byte:

                  // 0x1B
                  if (bite === 0x1b) {
                    // Set iso-2022-jp decoder state to escape start and return
                    // continue.
                    iso2022jp_decoder_state = states.EscapeStart
                    return null
                  }

                  // 0x21 to 0x7E
                  if (inRange(bite, 0x21, 0x7e)) {
                    // Unset the iso-2022-jp output flag, set iso-2022-jp lead
                    // to byte, iso-2022-jp decoder state to trail byte, and
                    // return continue.
                    iso2022jp_output_flag = false
                    iso2022jp_lead = bite
                    iso2022jp_decoder_state = states.TrailByte
                    return null
                  }

                  // end-of-stream
                  if (bite === end_of_stream) {
                    // Return finished.
                    return finished
                  }

                  // Otherwise
                  // Unset the iso-2022-jp output flag and return error.
                  iso2022jp_output_flag = false
                  return decoderError(fatal)

                case states.TrailByte:
                  // Trail byte
                  // Based on byte:

                  // 0x1B
                  if (bite === 0x1b) {
                    // Set iso-2022-jp decoder state to escape start and return
                    // continue.
                    iso2022jp_decoder_state = states.EscapeStart
                    return decoderError(fatal)
                  }

                  // 0x21 to 0x7E
                  if (inRange(bite, 0x21, 0x7e)) {
                    // 1. Set the iso-2022-jp decoder state to lead byte.
                    iso2022jp_decoder_state = states.LeadByte

                    // 2. Let pointer be (iso-2022-jp lead − 0x21) × 94 + byte − 0x21.
                    var pointer = (iso2022jp_lead - 0x21) * 94 + bite - 0x21

                    // 3. Let code point be the index code point for pointer in
                    // index jis0208.
                    var code_point = indexCodePointFor(pointer, index("jis0208"))

                    // 4. If code point is null, return error.
                    if (code_point === null) return decoderError(fatal)

                    // 5. Return a code point whose value is code point.
                    return code_point
                  }

                  // end-of-stream
                  if (bite === end_of_stream) {
                    // Set the iso-2022-jp decoder state to lead byte, prepend
                    // byte to stream, and return error.
                    iso2022jp_decoder_state = states.LeadByte
                    stream.prepend(bite)
                    return decoderError(fatal)
                  }

                  // Otherwise
                  // Set iso-2022-jp decoder state to lead byte and return
                  // error.
                  iso2022jp_decoder_state = states.LeadByte
                  return decoderError(fatal)

                case states.EscapeStart:
                  // Escape start

                  // 1. If byte is either 0x24 or 0x28, set iso-2022-jp lead to
                  // byte, iso-2022-jp decoder state to escape, and return
                  // continue.
                  if (bite === 0x24 || bite === 0x28) {
                    iso2022jp_lead = bite
                    iso2022jp_decoder_state = states.Escape
                    return null
                  }

                  // 2. Prepend byte to stream.
                  stream.prepend(bite)

                  // 3. Unset the iso-2022-jp output flag, set iso-2022-jp
                  // decoder state to iso-2022-jp decoder output state, and
                  // return error.
                  iso2022jp_output_flag = false
                  iso2022jp_decoder_state = iso2022jp_decoder_output_state
                  return decoderError(fatal)

                case states.Escape:
                  // Escape

                  // 1. Let lead be iso-2022-jp lead and set iso-2022-jp lead to
                  // 0x00.
                  var lead = iso2022jp_lead
                  iso2022jp_lead = 0x00

                  // 2. Let state be null.
                  var state = null

                  // 3. If lead is 0x28 and byte is 0x42, set state to ASCII.
                  if (lead === 0x28 && bite === 0x42) state = states.ASCII

                  // 4. If lead is 0x28 and byte is 0x4A, set state to Roman.
                  if (lead === 0x28 && bite === 0x4a) state = states.Roman

                  // 5. If lead is 0x28 and byte is 0x49, set state to Katakana.
                  if (lead === 0x28 && bite === 0x49) state = states.Katakana

                  // 6. If lead is 0x24 and byte is either 0x40 or 0x42, set
                  // state to lead byte.
                  if (lead === 0x24 && (bite === 0x40 || bite === 0x42)) state = states.LeadByte

                  // 7. If state is non-null, run these substeps:
                  if (state !== null) {
                    // 1. Set iso-2022-jp decoder state and iso-2022-jp decoder
                    // output state to states.
                    iso2022jp_decoder_state = iso2022jp_decoder_state = state

                    // 2. Let output flag be the iso-2022-jp output flag.
                    var output_flag = iso2022jp_output_flag

                    // 3. Set the iso-2022-jp output flag.
                    iso2022jp_output_flag = true

                    // 4. Return continue, if output flag is unset, and error
                    // otherwise.
                    return !output_flag ? null : decoderError(fatal)
                  }

                  // 8. Prepend lead and byte to stream.
                  stream.prepend([lead, bite])

                  // 9. Unset the iso-2022-jp output flag, set iso-2022-jp
                  // decoder state to iso-2022-jp decoder output state and
                  // return error.
                  iso2022jp_output_flag = false
                  iso2022jp_decoder_state = iso2022jp_decoder_output_state
                  return decoderError(fatal)
              }
            }
          }

          // 13.2.2 iso-2022-jp encoder
          /**
           * @constructor
           * @implements {Encoder}
           * @param {{fatal: boolean}} options
           */
          function ISO2022JPEncoder(options) {
            var fatal = options.fatal
            // iso-2022-jp's encoder has an associated iso-2022-jp encoder
            // state which is one of ASCII, Roman, and jis0208 (initially
            // ASCII).
            /** @enum */
            var states = {
              ASCII: 0,
              Roman: 1,
              jis0208: 2
            }
            var /** @type {number} */ iso2022jp_state = states.ASCII
            /**
             * @param {Stream} stream Input stream.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit.
             */
            this.handler = function (stream, code_point) {
              // 1. If code point is end-of-stream and iso-2022-jp encoder
              // state is not ASCII, prepend code point to stream, set
              // iso-2022-jp encoder state to ASCII, and return three bytes
              // 0x1B 0x28 0x42.
              if (code_point === end_of_stream && iso2022jp_state !== states.ASCII) {
                stream.prepend(code_point)
                iso2022jp_state = states.ASCII
                return [0x1b, 0x28, 0x42]
              }

              // 2. If code point is end-of-stream and iso-2022-jp encoder
              // state is ASCII, return finished.
              if (code_point === end_of_stream && iso2022jp_state === states.ASCII) return finished

              // 3. If ISO-2022-JP encoder state is ASCII or Roman, and code
              // point is U+000E, U+000F, or U+001B, return error with U+FFFD.
              if (
                (iso2022jp_state === states.ASCII || iso2022jp_state === states.Roman) &&
                (code_point === 0x000e || code_point === 0x000f || code_point === 0x001b)
              ) {
                return encoderError(0xfffd)
              }

              // 4. If iso-2022-jp encoder state is ASCII and code point is an
              // ASCII code point, return a byte whose value is code point.
              if (iso2022jp_state === states.ASCII && isASCIICodePoint(code_point)) return code_point

              // 5. If iso-2022-jp encoder state is Roman and code point is an
              // ASCII code point, excluding U+005C and U+007E, or is U+00A5
              // or U+203E, run these substeps:
              if (
                iso2022jp_state === states.Roman &&
                ((isASCIICodePoint(code_point) && code_point !== 0x005c && code_point !== 0x007e) || code_point == 0x00a5 || code_point == 0x203e)
              ) {
                // 1. If code point is an ASCII code point, return a byte
                // whose value is code point.
                if (isASCIICodePoint(code_point)) return code_point

                // 2. If code point is U+00A5, return byte 0x5C.
                if (code_point === 0x00a5) return 0x5c

                // 3. If code point is U+203E, return byte 0x7E.
                if (code_point === 0x203e) return 0x7e
              }

              // 6. If code point is an ASCII code point, and iso-2022-jp
              // encoder state is not ASCII, prepend code point to stream, set
              // iso-2022-jp encoder state to ASCII, and return three bytes
              // 0x1B 0x28 0x42.
              if (isASCIICodePoint(code_point) && iso2022jp_state !== states.ASCII) {
                stream.prepend(code_point)
                iso2022jp_state = states.ASCII
                return [0x1b, 0x28, 0x42]
              }

              // 7. If code point is either U+00A5 or U+203E, and iso-2022-jp
              // encoder state is not Roman, prepend code point to stream, set
              // iso-2022-jp encoder state to Roman, and return three bytes
              // 0x1B 0x28 0x4A.
              if ((code_point === 0x00a5 || code_point === 0x203e) && iso2022jp_state !== states.Roman) {
                stream.prepend(code_point)
                iso2022jp_state = states.Roman
                return [0x1b, 0x28, 0x4a]
              }

              // 8. If code point is U+2212, set it to U+FF0D.
              if (code_point === 0x2212) code_point = 0xff0d

              // 9. Let pointer be the index pointer for code point in index
              // jis0208.
              var pointer = indexPointerFor(code_point, index("jis0208"))

              // 10. If pointer is null, return error with code point.
              if (pointer === null) return encoderError(code_point)

              // 11. If iso-2022-jp encoder state is not jis0208, prepend code
              // point to stream, set iso-2022-jp encoder state to jis0208,
              // and return three bytes 0x1B 0x24 0x42.
              if (iso2022jp_state !== states.jis0208) {
                stream.prepend(code_point)
                iso2022jp_state = states.jis0208
                return [0x1b, 0x24, 0x42]
              }

              // 12. Let lead be floor(pointer / 94) + 0x21.
              var lead = floor(pointer / 94) + 0x21

              // 13. Let trail be pointer % 94 + 0x21.
              var trail = (pointer % 94) + 0x21

              // 14. Return two bytes whose values are lead and trail.
              return [lead, trail]
            }
          }

          /** @param {{fatal: boolean}} options */
          encoders["ISO-2022-JP"] = function (options) {
            return new ISO2022JPEncoder(options)
          }
          /** @param {{fatal: boolean}} options */
          decoders["ISO-2022-JP"] = function (options) {
            return new ISO2022JPDecoder(options)
          }

          // 13.3 Shift_JIS

          // 13.3.1 Shift_JIS decoder
          /**
           * @constructor
           * @implements {Decoder}
           * @param {{fatal: boolean}} options
           */
          function ShiftJISDecoder(options) {
            var fatal = options.fatal
            // Shift_JIS's decoder has an associated Shift_JIS lead (initially
            // 0x00).
            var /** @type {number} */ Shift_JIS_lead = 0x00
            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point.
             */
            this.handler = function (stream, bite) {
              // 1. If byte is end-of-stream and Shift_JIS lead is not 0x00,
              // set Shift_JIS lead to 0x00 and return error.
              if (bite === end_of_stream && Shift_JIS_lead !== 0x00) {
                Shift_JIS_lead = 0x00
                return decoderError(fatal)
              }

              // 2. If byte is end-of-stream and Shift_JIS lead is 0x00,
              // return finished.
              if (bite === end_of_stream && Shift_JIS_lead === 0x00) return finished

              // 3. If Shift_JIS lead is not 0x00, let lead be Shift_JIS lead,
              // let pointer be null, set Shift_JIS lead to 0x00, and then run
              // these substeps:
              if (Shift_JIS_lead !== 0x00) {
                var lead = Shift_JIS_lead
                var pointer = null
                Shift_JIS_lead = 0x00

                // 1. Let offset be 0x40, if byte is less than 0x7F, and 0x41
                // otherwise.
                var offset = bite < 0x7f ? 0x40 : 0x41

                // 2. Let lead offset be 0x81, if lead is less than 0xA0, and
                // 0xC1 otherwise.
                var lead_offset = lead < 0xa0 ? 0x81 : 0xc1

                // 3. If byte is in the range 0x40 to 0x7E, inclusive, or 0x80
                // to 0xFC, inclusive, set pointer to (lead − lead offset) ×
                // 188 + byte − offset.
                if (inRange(bite, 0x40, 0x7e) || inRange(bite, 0x80, 0xfc)) pointer = (lead - lead_offset) * 188 + bite - offset

                // 4. If pointer is in the range 8836 to 10715, inclusive,
                // return a code point whose value is 0xE000 − 8836 + pointer.
                if (inRange(pointer, 8836, 10715)) return 0xe000 - 8836 + pointer

                // 5. Let code point be null, if pointer is null, and the
                // index code point for pointer in index jis0208 otherwise.
                var code_point = pointer === null ? null : indexCodePointFor(pointer, index("jis0208"))

                // 6. If code point is null and byte is an ASCII byte, prepend
                // byte to stream.
                if (code_point === null && isASCIIByte(bite)) stream.prepend(bite)

                // 7. If code point is null, return error.
                if (code_point === null) return decoderError(fatal)

                // 8. Return a code point whose value is code point.
                return code_point
              }

              // 4. If byte is an ASCII byte or 0x80, return a code point
              // whose value is byte.
              if (isASCIIByte(bite) || bite === 0x80) return bite

              // 5. If byte is in the range 0xA1 to 0xDF, inclusive, return a
              // code point whose value is 0xFF61 − 0xA1 + byte.
              if (inRange(bite, 0xa1, 0xdf)) return 0xff61 - 0xa1 + bite

              // 6. If byte is in the range 0x81 to 0x9F, inclusive, or 0xE0
              // to 0xFC, inclusive, set Shift_JIS lead to byte and return
              // continue.
              if (inRange(bite, 0x81, 0x9f) || inRange(bite, 0xe0, 0xfc)) {
                Shift_JIS_lead = bite
                return null
              }

              // 7. Return error.
              return decoderError(fatal)
            }
          }

          // 13.3.2 Shift_JIS encoder
          /**
           * @constructor
           * @implements {Encoder}
           * @param {{fatal: boolean}} options
           */
          function ShiftJISEncoder(options) {
            var fatal = options.fatal
            /**
             * @param {Stream} stream Input stream.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit.
             */
            this.handler = function (stream, code_point) {
              // 1. If code point is end-of-stream, return finished.
              if (code_point === end_of_stream) return finished

              // 2. If code point is an ASCII code point or U+0080, return a
              // byte whose value is code point.
              if (isASCIICodePoint(code_point) || code_point === 0x0080) return code_point

              // 3. If code point is U+00A5, return byte 0x5C.
              if (code_point === 0x00a5) return 0x5c

              // 4. If code point is U+203E, return byte 0x7E.
              if (code_point === 0x203e) return 0x7e

              // 5. If code point is in the range U+FF61 to U+FF9F, inclusive,
              // return a byte whose value is code point − 0xFF61 + 0xA1.
              if (inRange(code_point, 0xff61, 0xff9f)) return code_point - 0xff61 + 0xa1

              // 6. If code point is U+2212, set it to U+FF0D.
              if (code_point === 0x2212) code_point = 0xff0d

              // 7. Let pointer be the index Shift_JIS pointer for code point.
              var pointer = indexShiftJISPointerFor(code_point)

              // 8. If pointer is null, return error with code point.
              if (pointer === null) return encoderError(code_point)

              // 9. Let lead be floor(pointer / 188).
              var lead = floor(pointer / 188)

              // 10. Let lead offset be 0x81, if lead is less than 0x1F, and
              // 0xC1 otherwise.
              var lead_offset = lead < 0x1f ? 0x81 : 0xc1

              // 11. Let trail be pointer % 188.
              var trail = pointer % 188

              // 12. Let offset be 0x40, if trail is less than 0x3F, and 0x41
              // otherwise.
              var offset = trail < 0x3f ? 0x40 : 0x41

              // 13. Return two bytes whose values are lead + lead offset and
              // trail + offset.
              return [lead + lead_offset, trail + offset]
            }
          }

          /** @param {{fatal: boolean}} options */
          encoders["Shift_JIS"] = function (options) {
            return new ShiftJISEncoder(options)
          }
          /** @param {{fatal: boolean}} options */
          decoders["Shift_JIS"] = function (options) {
            return new ShiftJISDecoder(options)
          }

          //
          // 14. Legacy multi-byte Korean encodings
          //

          // 14.1 euc-kr

          // 14.1.1 euc-kr decoder
          /**
           * @constructor
           * @implements {Decoder}
           * @param {{fatal: boolean}} options
           */
          function EUCKRDecoder(options) {
            var fatal = options.fatal

            // euc-kr's decoder has an associated euc-kr lead (initially 0x00).
            var /** @type {number} */ euckr_lead = 0x00
            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point.
             */
            this.handler = function (stream, bite) {
              // 1. If byte is end-of-stream and euc-kr lead is not 0x00, set
              // euc-kr lead to 0x00 and return error.
              if (bite === end_of_stream && euckr_lead !== 0) {
                euckr_lead = 0x00
                return decoderError(fatal)
              }

              // 2. If byte is end-of-stream and euc-kr lead is 0x00, return
              // finished.
              if (bite === end_of_stream && euckr_lead === 0) return finished

              // 3. If euc-kr lead is not 0x00, let lead be euc-kr lead, let
              // pointer be null, set euc-kr lead to 0x00, and then run these
              // substeps:
              if (euckr_lead !== 0x00) {
                var lead = euckr_lead
                var pointer = null
                euckr_lead = 0x00

                // 1. If byte is in the range 0x41 to 0xFE, inclusive, set
                // pointer to (lead − 0x81) × 190 + (byte − 0x41).
                if (inRange(bite, 0x41, 0xfe)) pointer = (lead - 0x81) * 190 + (bite - 0x41)

                // 2. Let code point be null, if pointer is null, and the
                // index code point for pointer in index euc-kr otherwise.
                var code_point = pointer === null ? null : indexCodePointFor(pointer, index("euc-kr"))

                // 3. If code point is null and byte is an ASCII byte, prepend
                // byte to stream.
                if (pointer === null && isASCIIByte(bite)) stream.prepend(bite)

                // 4. If code point is null, return error.
                if (code_point === null) return decoderError(fatal)

                // 5. Return a code point whose value is code point.
                return code_point
              }

              // 4. If byte is an ASCII byte, return a code point whose value
              // is byte.
              if (isASCIIByte(bite)) return bite

              // 5. If byte is in the range 0x81 to 0xFE, inclusive, set
              // euc-kr lead to byte and return continue.
              if (inRange(bite, 0x81, 0xfe)) {
                euckr_lead = bite
                return null
              }

              // 6. Return error.
              return decoderError(fatal)
            }
          }

          // 14.1.2 euc-kr encoder
          /**
           * @constructor
           * @implements {Encoder}
           * @param {{fatal: boolean}} options
           */
          function EUCKREncoder(options) {
            var fatal = options.fatal
            /**
             * @param {Stream} stream Input stream.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit.
             */
            this.handler = function (stream, code_point) {
              // 1. If code point is end-of-stream, return finished.
              if (code_point === end_of_stream) return finished

              // 2. If code point is an ASCII code point, return a byte whose
              // value is code point.
              if (isASCIICodePoint(code_point)) return code_point

              // 3. Let pointer be the index pointer for code point in index
              // euc-kr.
              var pointer = indexPointerFor(code_point, index("euc-kr"))

              // 4. If pointer is null, return error with code point.
              if (pointer === null) return encoderError(code_point)

              // 5. Let lead be floor(pointer / 190) + 0x81.
              var lead = floor(pointer / 190) + 0x81

              // 6. Let trail be pointer % 190 + 0x41.
              var trail = (pointer % 190) + 0x41

              // 7. Return two bytes whose values are lead and trail.
              return [lead, trail]
            }
          }

          /** @param {{fatal: boolean}} options */
          encoders["EUC-KR"] = function (options) {
            return new EUCKREncoder(options)
          }
          /** @param {{fatal: boolean}} options */
          decoders["EUC-KR"] = function (options) {
            return new EUCKRDecoder(options)
          }

          //
          // 15. Legacy miscellaneous encodings
          //

          // 15.1 replacement

          // Not needed - API throws RangeError

          // 15.2 Common infrastructure for utf-16be and utf-16le

          /**
           * @param {number} code_unit
           * @param {boolean} utf16be
           * @return {!Array.<number>} bytes
           */
          function convertCodeUnitToBytes(code_unit, utf16be) {
            // 1. Let byte1 be code unit >> 8.
            var byte1 = code_unit >> 8

            // 2. Let byte2 be code unit & 0x00FF.
            var byte2 = code_unit & 0x00ff

            // 3. Then return the bytes in order:
            // utf-16be flag is set: byte1, then byte2.
            if (utf16be) return [byte1, byte2]
            // utf-16be flag is unset: byte2, then byte1.
            return [byte2, byte1]
          }

          // 15.2.1 shared utf-16 decoder
          /**
           * @constructor
           * @implements {Decoder}
           * @param {boolean} utf16_be True if big-endian, false if little-endian.
           * @param {{fatal: boolean}} options
           */
          function UTF16Decoder(utf16_be, options) {
            var fatal = options.fatal
            var /** @type {?number} */ utf16_lead_byte = null,
              /** @type {?number} */ utf16_lead_surrogate = null
            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point.
             */
            this.handler = function (stream, bite) {
              // 1. If byte is end-of-stream and either utf-16 lead byte or
              // utf-16 lead surrogate is not null, set utf-16 lead byte and
              // utf-16 lead surrogate to null, and return error.
              if (bite === end_of_stream && (utf16_lead_byte !== null || utf16_lead_surrogate !== null)) {
                return decoderError(fatal)
              }

              // 2. If byte is end-of-stream and utf-16 lead byte and utf-16
              // lead surrogate are null, return finished.
              if (bite === end_of_stream && utf16_lead_byte === null && utf16_lead_surrogate === null) {
                return finished
              }

              // 3. If utf-16 lead byte is null, set utf-16 lead byte to byte
              // and return continue.
              if (utf16_lead_byte === null) {
                utf16_lead_byte = bite
                return null
              }

              // 4. Let code unit be the result of:
              var code_unit
              if (utf16_be) {
                // utf-16be decoder flag is set
                //   (utf-16 lead byte << 8) + byte.
                code_unit = (utf16_lead_byte << 8) + bite
              } else {
                // utf-16be decoder flag is unset
                //   (byte << 8) + utf-16 lead byte.
                code_unit = (bite << 8) + utf16_lead_byte
              }
              // Then set utf-16 lead byte to null.
              utf16_lead_byte = null

              // 5. If utf-16 lead surrogate is not null, let lead surrogate
              // be utf-16 lead surrogate, set utf-16 lead surrogate to null,
              // and then run these substeps:
              if (utf16_lead_surrogate !== null) {
                var lead_surrogate = utf16_lead_surrogate
                utf16_lead_surrogate = null

                // 1. If code unit is in the range U+DC00 to U+DFFF,
                // inclusive, return a code point whose value is 0x10000 +
                // ((lead surrogate − 0xD800) << 10) + (code unit − 0xDC00).
                if (inRange(code_unit, 0xdc00, 0xdfff)) {
                  return 0x10000 + (lead_surrogate - 0xd800) * 0x400 + (code_unit - 0xdc00)
                }

                // 2. Prepend the sequence resulting of converting code unit
                // to bytes using utf-16be decoder flag to stream and return
                // error.
                stream.prepend(convertCodeUnitToBytes(code_unit, utf16_be))
                return decoderError(fatal)
              }

              // 6. If code unit is in the range U+D800 to U+DBFF, inclusive,
              // set utf-16 lead surrogate to code unit and return continue.
              if (inRange(code_unit, 0xd800, 0xdbff)) {
                utf16_lead_surrogate = code_unit
                return null
              }

              // 7. If code unit is in the range U+DC00 to U+DFFF, inclusive,
              // return error.
              if (inRange(code_unit, 0xdc00, 0xdfff)) return decoderError(fatal)

              // 8. Return code point code unit.
              return code_unit
            }
          }

          // 15.2.2 shared utf-16 encoder
          /**
           * @constructor
           * @implements {Encoder}
           * @param {boolean} utf16_be True if big-endian, false if little-endian.
           * @param {{fatal: boolean}} options
           */
          function UTF16Encoder(utf16_be, options) {
            var fatal = options.fatal
            /**
             * @param {Stream} stream Input stream.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit.
             */
            this.handler = function (stream, code_point) {
              // 1. If code point is end-of-stream, return finished.
              if (code_point === end_of_stream) return finished

              // 2. If code point is in the range U+0000 to U+FFFF, inclusive,
              // return the sequence resulting of converting code point to
              // bytes using utf-16be encoder flag.
              if (inRange(code_point, 0x0000, 0xffff)) return convertCodeUnitToBytes(code_point, utf16_be)

              // 3. Let lead be ((code point − 0x10000) >> 10) + 0xD800,
              // converted to bytes using utf-16be encoder flag.
              var lead = convertCodeUnitToBytes(((code_point - 0x10000) >> 10) + 0xd800, utf16_be)

              // 4. Let trail be ((code point − 0x10000) & 0x3FF) + 0xDC00,
              // converted to bytes using utf-16be encoder flag.
              var trail = convertCodeUnitToBytes(((code_point - 0x10000) & 0x3ff) + 0xdc00, utf16_be)

              // 5. Return a byte sequence of lead followed by trail.
              return lead.concat(trail)
            }
          }

          // 15.3 utf-16be
          // 15.3.1 utf-16be decoder
          /** @param {{fatal: boolean}} options */
          encoders["UTF-16BE"] = function (options) {
            return new UTF16Encoder(true, options)
          }
          // 15.3.2 utf-16be encoder
          /** @param {{fatal: boolean}} options */
          decoders["UTF-16BE"] = function (options) {
            return new UTF16Decoder(true, options)
          }

          // 15.4 utf-16le
          // 15.4.1 utf-16le decoder
          /** @param {{fatal: boolean}} options */
          encoders["UTF-16LE"] = function (options) {
            return new UTF16Encoder(false, options)
          }
          // 15.4.2 utf-16le encoder
          /** @param {{fatal: boolean}} options */
          decoders["UTF-16LE"] = function (options) {
            return new UTF16Decoder(false, options)
          }

          // 15.5 x-user-defined

          // 15.5.1 x-user-defined decoder
          /**
           * @constructor
           * @implements {Decoder}
           * @param {{fatal: boolean}} options
           */
          function XUserDefinedDecoder(options) {
            var fatal = options.fatal
            /**
             * @param {Stream} stream The stream of bytes being decoded.
             * @param {number} bite The next byte read from the stream.
             * @return {?(number|!Array.<number>)} The next code point(s)
             *     decoded, or null if not enough data exists in the input
             *     stream to decode a complete code point.
             */
            this.handler = function (stream, bite) {
              // 1. If byte is end-of-stream, return finished.
              if (bite === end_of_stream) return finished

              // 2. If byte is an ASCII byte, return a code point whose value
              // is byte.
              if (isASCIIByte(bite)) return bite

              // 3. Return a code point whose value is 0xF780 + byte − 0x80.
              return 0xf780 + bite - 0x80
            }
          }

          // 15.5.2 x-user-defined encoder
          /**
           * @constructor
           * @implements {Encoder}
           * @param {{fatal: boolean}} options
           */
          function XUserDefinedEncoder(options) {
            var fatal = options.fatal
            /**
             * @param {Stream} stream Input stream.
             * @param {number} code_point Next code point read from the stream.
             * @return {(number|!Array.<number>)} Byte(s) to emit.
             */
            this.handler = function (stream, code_point) {
              // 1.If code point is end-of-stream, return finished.
              if (code_point === end_of_stream) return finished

              // 2. If code point is an ASCII code point, return a byte whose
              // value is code point.
              if (isASCIICodePoint(code_point)) return code_point

              // 3. If code point is in the range U+F780 to U+F7FF, inclusive,
              // return a byte whose value is code point − 0xF780 + 0x80.
              if (inRange(code_point, 0xf780, 0xf7ff)) return code_point - 0xf780 + 0x80

              // 4. Return error with code point.
              return encoderError(code_point)
            }
          }

          /** @param {{fatal: boolean}} options */
          encoders["x-user-defined"] = function (options) {
            return new XUserDefinedEncoder(options)
          }
          /** @param {{fatal: boolean}} options */
          decoders["x-user-defined"] = function (options) {
            return new XUserDefinedDecoder(options)
          }

          if (!global["TextEncoder"]) global["TextEncoder"] = TextEncoder
          if (!global["TextDecoder"]) global["TextDecoder"] = TextDecoder

          if (true && module.exports) {
            module.exports = {
              TextEncoder: global["TextEncoder"],
              TextDecoder: global["TextDecoder"],
              EncodingIndexes: global["encoding-indexes"]
            }
          }

          // For strict environments where `this` inside the global scope
          // is `undefined`, take a pure object instead
        })(this || {})

        /***/
      },
      /* 59 */
      /***/ function (module, exports) {
        /* (ignored) */
        /***/
      },
      /* 60 */
      /***/ function (module, exports, __webpack_require__) {
        "use strict"
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        /*<replacement>*/

        var Buffer = __webpack_require__(61).Buffer
        /*</replacement>*/

        var isEncoding =
          Buffer.isEncoding ||
          function (encoding) {
            encoding = "" + encoding
            switch (encoding && encoding.toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
              case "raw":
                return true
              default:
                return false
            }
          }

        function _normalizeEncoding(enc) {
          if (!enc) return "utf8"
          var retried
          while (true) {
            switch (enc) {
              case "utf8":
              case "utf-8":
                return "utf8"
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return "utf16le"
              case "latin1":
              case "binary":
                return "latin1"
              case "base64":
              case "ascii":
              case "hex":
                return enc
              default: // undefined
                if (retried) return
                enc = ("" + enc).toLowerCase()
                retried = true
            }
          }
        }

        // Do not cache `Buffer.isEncoding` when checking encoding names as some
        // modules monkey-patch it to support additional encodings
        function normalizeEncoding(enc) {
          var nenc = _normalizeEncoding(enc)
          if (typeof nenc !== "string" && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc)
          return nenc || enc
        }

        // StringDecoder provides an interface for efficiently splitting a series of
        // buffers into a series of JS strings without breaking apart multi-byte
        // characters.
        exports.StringDecoder = StringDecoder
        function StringDecoder(encoding) {
          this.encoding = normalizeEncoding(encoding)
          var nb
          switch (this.encoding) {
            case "utf16le":
              this.text = utf16Text
              this.end = utf16End
              nb = 4
              break
            case "utf8":
              this.fillLast = utf8FillLast
              nb = 4
              break
            case "base64":
              this.text = base64Text
              this.end = base64End
              nb = 3
              break
            default:
              this.write = simpleWrite
              this.end = simpleEnd
              return
          }
          this.lastNeed = 0
          this.lastTotal = 0
          this.lastChar = Buffer.allocUnsafe(nb)
        }

        StringDecoder.prototype.write = function (buf) {
          if (buf.length === 0) return ""
          var r
          var i
          if (this.lastNeed) {
            r = this.fillLast(buf)
            if (r === undefined) return ""
            i = this.lastNeed
            this.lastNeed = 0
          } else {
            i = 0
          }
          if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i)
          return r || ""
        }

        StringDecoder.prototype.end = utf8End

        // Returns only complete characters in a Buffer
        StringDecoder.prototype.text = utf8Text

        // Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
        StringDecoder.prototype.fillLast = function (buf) {
          if (this.lastNeed <= buf.length) {
            buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed)
            return this.lastChar.toString(this.encoding, 0, this.lastTotal)
          }
          buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length)
          this.lastNeed -= buf.length
        }

        // Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
        // continuation byte. If an invalid byte is detected, -2 is returned.
        function utf8CheckByte(byte) {
          if (byte <= 0x7f) return 0
          else if (byte >> 5 === 0x06) return 2
          else if (byte >> 4 === 0x0e) return 3
          else if (byte >> 3 === 0x1e) return 4
          return byte >> 6 === 0x02 ? -1 : -2
        }

        // Checks at most 3 bytes at the end of a Buffer in order to detect an
        // incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
        // needed to complete the UTF-8 character (if applicable) are returned.
        function utf8CheckIncomplete(self, buf, i) {
          var j = buf.length - 1
          if (j < i) return 0
          var nb = utf8CheckByte(buf[j])
          if (nb >= 0) {
            if (nb > 0) self.lastNeed = nb - 1
            return nb
          }
          if (--j < i || nb === -2) return 0
          nb = utf8CheckByte(buf[j])
          if (nb >= 0) {
            if (nb > 0) self.lastNeed = nb - 2
            return nb
          }
          if (--j < i || nb === -2) return 0
          nb = utf8CheckByte(buf[j])
          if (nb >= 0) {
            if (nb > 0) {
              if (nb === 2) nb = 0
              else self.lastNeed = nb - 3
            }
            return nb
          }
          return 0
        }

        // Validates as many continuation bytes for a multi-byte UTF-8 character as
        // needed or are available. If we see a non-continuation byte where we expect
        // one, we "replace" the validated continuation bytes we've seen so far with
        // a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
        // behavior. The continuation byte check is included three times in the case
        // where all of the continuation bytes for a character exist in the same buffer.
        // It is also done this way as a slight performance increase instead of using a
        // loop.
        function utf8CheckExtraBytes(self, buf, p) {
          if ((buf[0] & 0xc0) !== 0x80) {
            self.lastNeed = 0
            return "\ufffd"
          }
          if (self.lastNeed > 1 && buf.length > 1) {
            if ((buf[1] & 0xc0) !== 0x80) {
              self.lastNeed = 1
              return "\ufffd"
            }
            if (self.lastNeed > 2 && buf.length > 2) {
              if ((buf[2] & 0xc0) !== 0x80) {
                self.lastNeed = 2
                return "\ufffd"
              }
            }
          }
        }

        // Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
        function utf8FillLast(buf) {
          var p = this.lastTotal - this.lastNeed
          var r = utf8CheckExtraBytes(this, buf, p)
          if (r !== undefined) return r
          if (this.lastNeed <= buf.length) {
            buf.copy(this.lastChar, p, 0, this.lastNeed)
            return this.lastChar.toString(this.encoding, 0, this.lastTotal)
          }
          buf.copy(this.lastChar, p, 0, buf.length)
          this.lastNeed -= buf.length
        }

        // Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
        // partial character, the character's bytes are buffered until the required
        // number of bytes are available.
        function utf8Text(buf, i) {
          var total = utf8CheckIncomplete(this, buf, i)
          if (!this.lastNeed) return buf.toString("utf8", i)
          this.lastTotal = total
          var end = buf.length - (total - this.lastNeed)
          buf.copy(this.lastChar, 0, end)
          return buf.toString("utf8", i, end)
        }

        // For UTF-8, a replacement character is added when ending on a partial
        // character.
        function utf8End(buf) {
          var r = buf && buf.length ? this.write(buf) : ""
          if (this.lastNeed) return r + "\ufffd"
          return r
        }

        // UTF-16LE typically needs two bytes per character, but even if we have an even
        // number of bytes available, we need to check if we end on a leading/high
        // surrogate. In that case, we need to wait for the next two bytes in order to
        // decode the last character properly.
        function utf16Text(buf, i) {
          if ((buf.length - i) % 2 === 0) {
            var r = buf.toString("utf16le", i)
            if (r) {
              var c = r.charCodeAt(r.length - 1)
              if (c >= 0xd800 && c <= 0xdbff) {
                this.lastNeed = 2
                this.lastTotal = 4
                this.lastChar[0] = buf[buf.length - 2]
                this.lastChar[1] = buf[buf.length - 1]
                return r.slice(0, -1)
              }
            }
            return r
          }
          this.lastNeed = 1
          this.lastTotal = 2
          this.lastChar[0] = buf[buf.length - 1]
          return buf.toString("utf16le", i, buf.length - 1)
        }

        // For UTF-16LE we do not explicitly append special replacement characters if we
        // end on a partial character, we simply let v8 handle that.
        function utf16End(buf) {
          var r = buf && buf.length ? this.write(buf) : ""
          if (this.lastNeed) {
            var end = this.lastTotal - this.lastNeed
            return r + this.lastChar.toString("utf16le", 0, end)
          }
          return r
        }

        function base64Text(buf, i) {
          var n = (buf.length - i) % 3
          if (n === 0) return buf.toString("base64", i)
          this.lastNeed = 3 - n
          this.lastTotal = 3
          if (n === 1) {
            this.lastChar[0] = buf[buf.length - 1]
          } else {
            this.lastChar[0] = buf[buf.length - 2]
            this.lastChar[1] = buf[buf.length - 1]
          }
          return buf.toString("base64", i, buf.length - n)
        }

        function base64End(buf) {
          var r = buf && buf.length ? this.write(buf) : ""
          if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
          return r
        }

        // Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
        function simpleWrite(buf) {
          return buf.toString(this.encoding)
        }

        function simpleEnd(buf) {
          return buf && buf.length ? this.write(buf) : ""
        }

        /***/
      },
      /* 61 */
      /***/ function (module, exports, __webpack_require__) {
        /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
        /* eslint-disable node/no-deprecated-api */
        var buffer = __webpack_require__(5)
        var Buffer = buffer.Buffer

        // alternative to using Object.keys for old browsers
        function copyProps(src, dst) {
          for (var key in src) {
            dst[key] = src[key]
          }
        }
        if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
          module.exports = buffer
        } else {
          // Copy properties from require('buffer')
          copyProps(buffer, exports)
          exports.Buffer = SafeBuffer
        }

        function SafeBuffer(arg, encodingOrOffset, length) {
          return Buffer(arg, encodingOrOffset, length)
        }

        SafeBuffer.prototype = Object.create(Buffer.prototype)

        // Copy static methods from Buffer
        copyProps(Buffer, SafeBuffer)

        SafeBuffer.from = function (arg, encodingOrOffset, length) {
          if (typeof arg === "number") {
            throw new TypeError("Argument must not be a number")
          }
          return Buffer(arg, encodingOrOffset, length)
        }

        SafeBuffer.alloc = function (size, fill, encoding) {
          if (typeof size !== "number") {
            throw new TypeError("Argument must be a number")
          }
          var buf = Buffer(size)
          if (fill !== undefined) {
            if (typeof encoding === "string") {
              buf.fill(fill, encoding)
            } else {
              buf.fill(fill)
            }
          } else {
            buf.fill(0)
          }
          return buf
        }

        SafeBuffer.allocUnsafe = function (size) {
          if (typeof size !== "number") {
            throw new TypeError("Argument must be a number")
          }
          return Buffer(size)
        }

        SafeBuffer.allocUnsafeSlow = function (size) {
          if (typeof size !== "number") {
            throw new TypeError("Argument must be a number")
          }
          return buffer.SlowBuffer(size)
        }

        /***/
      },
      /* 62 */
      /***/ function (module, exports, __webpack_require__) {
        ;(function () {
          // closure for web browsers

          if (true && module.exports) {
            module.exports = LRUCache
          } else {
            // just set the global for non-node platforms.
            this.LRUCache = LRUCache
          }

          function hOP(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key)
          }

          function naiveLength() {
            return 1
          }

          var didTypeWarning = false
          function typeCheckKey(key) {
            if (!didTypeWarning && typeof key !== "string" && typeof key !== "number") {
              didTypeWarning = true
              console.error(new TypeError("LRU: key must be a string or number. Almost certainly a bug! " + typeof key).stack)
            }
          }

          function LRUCache(options) {
            if (!(this instanceof LRUCache)) return new LRUCache(options)

            if (typeof options === "number") options = { max: options }

            if (!options) options = {}

            this._max = options.max
            // Kind of weird to have a default max of Infinity, but oh well.
            if (!this._max || !(typeof this._max === "number") || this._max <= 0) this._max = Infinity

            this._lengthCalculator = options.length || naiveLength
            if (typeof this._lengthCalculator !== "function") this._lengthCalculator = naiveLength

            this._allowStale = options.stale || false
            this._maxAge = options.maxAge || null
            this._dispose = options.dispose
            this.reset()
          }

          // resize the cache when the max changes.
          Object.defineProperty(LRUCache.prototype, "max", {
            set: function (mL) {
              if (!mL || !(typeof mL === "number") || mL <= 0) mL = Infinity
              this._max = mL
              if (this._length > this._max) trim(this)
            },
            get: function () {
              return this._max
            },
            enumerable: true
          })

          // resize the cache when the lengthCalculator changes.
          Object.defineProperty(LRUCache.prototype, "lengthCalculator", {
            set: function (lC) {
              if (typeof lC !== "function") {
                this._lengthCalculator = naiveLength
                this._length = this._itemCount
                for (var key in this._cache) {
                  this._cache[key].length = 1
                }
              } else {
                this._lengthCalculator = lC
                this._length = 0
                for (var key in this._cache) {
                  this._cache[key].length = this._lengthCalculator(this._cache[key].value)
                  this._length += this._cache[key].length
                }
              }

              if (this._length > this._max) trim(this)
            },
            get: function () {
              return this._lengthCalculator
            },
            enumerable: true
          })

          Object.defineProperty(LRUCache.prototype, "length", {
            get: function () {
              return this._length
            },
            enumerable: true
          })

          Object.defineProperty(LRUCache.prototype, "itemCount", {
            get: function () {
              return this._itemCount
            },
            enumerable: true
          })

          LRUCache.prototype.forEach = function (fn, thisp) {
            thisp = thisp || this
            var i = 0
            var itemCount = this._itemCount

            for (var k = this._mru - 1; k >= 0 && i < itemCount; k--)
              if (this._lruList[k]) {
                i++
                var hit = this._lruList[k]
                if (isStale(this, hit)) {
                  del(this, hit)
                  if (!this._allowStale) hit = undefined
                }
                if (hit) {
                  fn.call(thisp, hit.value, hit.key, this)
                }
              }
          }

          LRUCache.prototype.keys = function () {
            var keys = new Array(this._itemCount)
            var i = 0
            for (var k = this._mru - 1; k >= 0 && i < this._itemCount; k--)
              if (this._lruList[k]) {
                var hit = this._lruList[k]
                keys[i++] = hit.key
              }
            return keys
          }

          LRUCache.prototype.values = function () {
            var values = new Array(this._itemCount)
            var i = 0
            for (var k = this._mru - 1; k >= 0 && i < this._itemCount; k--)
              if (this._lruList[k]) {
                var hit = this._lruList[k]
                values[i++] = hit.value
              }
            return values
          }

          LRUCache.prototype.reset = function () {
            if (this._dispose && this._cache) {
              for (var k in this._cache) {
                this._dispose(k, this._cache[k].value)
              }
            }

            this._cache = Object.create(null) // hash of items by key
            this._lruList = Object.create(null) // list of items in order of use recency
            this._mru = 0 // most recently used
            this._lru = 0 // least recently used
            this._length = 0 // number of items in the list
            this._itemCount = 0
          }

          LRUCache.prototype.dump = function () {
            var arr = []
            var i = 0

            for (var k = this._mru - 1; k >= 0 && i < this._itemCount; k--)
              if (this._lruList[k]) {
                var hit = this._lruList[k]
                if (!isStale(this, hit)) {
                  //Do not store staled hits
                  ++i
                  arr.push({
                    k: hit.key,
                    v: hit.value,
                    e: hit.now + (hit.maxAge || 0)
                  })
                }
              }
            //arr has the most read first
            return arr
          }

          LRUCache.prototype.dumpLru = function () {
            return this._lruList
          }

          LRUCache.prototype.set = function (key, value, maxAge) {
            maxAge = maxAge || this._maxAge
            typeCheckKey(key)

            var now = maxAge ? Date.now() : 0
            var len = this._lengthCalculator(value)

            if (hOP(this._cache, key)) {
              if (len > this._max) {
                del(this, this._cache[key])
                return false
              }
              // dispose of the old one before overwriting
              if (this._dispose) this._dispose(key, this._cache[key].value)

              this._cache[key].now = now
              this._cache[key].maxAge = maxAge
              this._cache[key].value = value
              this._length += len - this._cache[key].length
              this._cache[key].length = len
              this.get(key)

              if (this._length > this._max) trim(this)

              return true
            }

            var hit = new Entry(key, value, this._mru++, len, now, maxAge)

            // oversized objects fall out of cache automatically.
            if (hit.length > this._max) {
              if (this._dispose) this._dispose(key, value)
              return false
            }

            this._length += hit.length
            this._lruList[hit.lu] = this._cache[key] = hit
            this._itemCount++

            if (this._length > this._max) trim(this)

            return true
          }

          LRUCache.prototype.has = function (key) {
            typeCheckKey(key)
            if (!hOP(this._cache, key)) return false
            var hit = this._cache[key]
            if (isStale(this, hit)) {
              return false
            }
            return true
          }

          LRUCache.prototype.get = function (key) {
            typeCheckKey(key)
            return get(this, key, true)
          }

          LRUCache.prototype.peek = function (key) {
            typeCheckKey(key)
            return get(this, key, false)
          }

          LRUCache.prototype.pop = function () {
            var hit = this._lruList[this._lru]
            del(this, hit)
            return hit || null
          }

          LRUCache.prototype.del = function (key) {
            typeCheckKey(key)
            del(this, this._cache[key])
          }

          LRUCache.prototype.load = function (arr) {
            //reset the cache
            this.reset()

            var now = Date.now()
            //A previous serialized cache has the most recent items first
            for (var l = arr.length - 1; l >= 0; l--) {
              var hit = arr[l]
              typeCheckKey(hit.k)
              var expiresAt = hit.e || 0
              if (expiresAt === 0) {
                //the item was created without expiration in a non aged cache
                this.set(hit.k, hit.v)
              } else {
                var maxAge = expiresAt - now
                //dont add already expired items
                if (maxAge > 0) this.set(hit.k, hit.v, maxAge)
              }
            }
          }

          function get(self, key, doUse) {
            typeCheckKey(key)
            var hit = self._cache[key]
            if (hit) {
              if (isStale(self, hit)) {
                del(self, hit)
                if (!self._allowStale) hit = undefined
              } else {
                if (doUse) use(self, hit)
              }
              if (hit) hit = hit.value
            }
            return hit
          }

          function isStale(self, hit) {
            if (!hit || (!hit.maxAge && !self._maxAge)) return false
            var stale = false
            var diff = Date.now() - hit.now
            if (hit.maxAge) {
              stale = diff > hit.maxAge
            } else {
              stale = self._maxAge && diff > self._maxAge
            }
            return stale
          }

          function use(self, hit) {
            shiftLU(self, hit)
            hit.lu = self._mru++
            self._lruList[hit.lu] = hit
          }

          function trim(self) {
            while (self._lru < self._mru && self._length > self._max) del(self, self._lruList[self._lru])
          }

          function shiftLU(self, hit) {
            delete self._lruList[hit.lu]
            while (self._lru < self._mru && !self._lruList[self._lru]) self._lru++
          }

          function del(self, hit) {
            if (hit) {
              if (self._dispose) self._dispose(hit.key, hit.value)
              self._length -= hit.length
              self._itemCount--
              delete self._cache[hit.key]
              shiftLU(self, hit)
            }
          }

          // classy, since V8 prefers predictable objects.
          function Entry(key, value, lu, length, now, maxAge) {
            this.key = key
            this.value = value
            this.lu = lu
            this.length = length
            this.now = now
            if (maxAge) this.maxAge = maxAge
          }
        })()

        /***/
      },
      /* 63 */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict"
        // ESM COMPAT FLAG
        __webpack_require__.r(__webpack_exports__)

        // CONCATENATED MODULE: ./node_modules/proj4/lib/global.js
        /* harmony default export */ var global = function (defs) {
          defs("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees")
          defs("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees")
          defs(
            "EPSG:3857",
            "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"
          )

          defs.WGS84 = defs["EPSG:4326"]
          defs["EPSG:3785"] = defs["EPSG:3857"] // maintain backward compat, official code is 3857
          defs.GOOGLE = defs["EPSG:3857"]
          defs["EPSG:900913"] = defs["EPSG:3857"]
          defs["EPSG:102113"] = defs["EPSG:3857"]
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/constants/values.js
        var PJD_3PARAM = 1
        var PJD_7PARAM = 2
        var PJD_GRIDSHIFT = 3
        var PJD_WGS84 = 4 // WGS84 or equivalent
        var PJD_NODATUM = 5 // WGS84 or equivalent
        var SRS_WGS84_SEMIMAJOR = 6378137.0 // only used in grid shift transforms
        var SRS_WGS84_SEMIMINOR = 6356752.314 // only used in grid shift transforms
        var SRS_WGS84_ESQUARED = 0.0066943799901413165 // only used in grid shift transforms
        var SEC_TO_RAD = 4.84813681109535993589914102357e-6
        var HALF_PI = Math.PI / 2
        // ellipoid pj_set_ell.c
        var SIXTH = 0.1666666666666666667
        /* 1/6 */
        var RA4 = 0.04722222222222222222
        /* 17/360 */
        var RA6 = 0.02215608465608465608
        var EPSLN = 1.0e-10
        // you'd think you could use Number.EPSILON above but that makes
        // Mollweide get into an infinate loop.

        var D2R = 0.01745329251994329577
        var R2D = 57.29577951308232088
        var FORTPI = Math.PI / 4
        var TWO_PI = Math.PI * 2
        // SPI is slightly greater than Math.PI, so values that exceed the -180..180
        // degree range by a tiny amount don't get wrapped. This prevents points that
        // have drifted from their original location along the 180th meridian (due to
        // floating point error) from changing their sign.
        var SPI = 3.14159265359

        // CONCATENATED MODULE: ./node_modules/proj4/lib/constants/PrimeMeridian.js
        var PrimeMeridian_exports = {}

        PrimeMeridian_exports.greenwich = 0.0 //"0dE",
        PrimeMeridian_exports.lisbon = -9.131906111111 //"9d07'54.862\"W",
        PrimeMeridian_exports.paris = 2.337229166667 //"2d20'14.025\"E",
        PrimeMeridian_exports.bogota = -74.080916666667 //"74d04'51.3\"W",
        PrimeMeridian_exports.madrid = -3.687938888889 //"3d41'16.58\"W",
        PrimeMeridian_exports.rome = 12.452333333333 //"12d27'8.4\"E",
        PrimeMeridian_exports.bern = 7.439583333333 //"7d26'22.5\"E",
        PrimeMeridian_exports.jakarta = 106.807719444444 //"106d48'27.79\"E",
        PrimeMeridian_exports.ferro = -17.666666666667 //"17d40'W",
        PrimeMeridian_exports.brussels = 4.367975 //"4d22'4.71\"E",
        PrimeMeridian_exports.stockholm = 18.058277777778 //"18d3'29.8\"E",
        PrimeMeridian_exports.athens = 23.7163375 //"23d42'58.815\"E",
        PrimeMeridian_exports.oslo = 10.722916666667 //"10d43'22.5\"E"

        // CONCATENATED MODULE: ./node_modules/proj4/lib/constants/units.js
        /* harmony default export */ var units = {
          ft: { to_meter: 0.3048 },
          "us-ft": { to_meter: 1200 / 3937 }
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/match.js
        var ignoredChar = /[\s_\-\/\(\)]/g
        function match(obj, key) {
          if (obj[key]) {
            return obj[key]
          }
          var keys = Object.keys(obj)
          var lkey = key.toLowerCase().replace(ignoredChar, "")
          var i = -1
          var testkey, processedKey
          while (++i < keys.length) {
            testkey = keys[i]
            processedKey = testkey.toLowerCase().replace(ignoredChar, "")
            if (processedKey === lkey) {
              return obj[testkey]
            }
          }
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projString.js

        /* harmony default export */ var projString = function (defData) {
          var self = {}
          var paramObj = defData
            .split("+")
            .map(function (v) {
              return v.trim()
            })
            .filter(function (a) {
              return a
            })
            .reduce(function (p, a) {
              var split = a.split("=")
              split.push(true)
              p[split[0].toLowerCase()] = split[1]
              return p
            }, {})
          var paramName, paramVal, paramOutname
          var params = {
            proj: "projName",
            datum: "datumCode",
            rf: function (v) {
              self.rf = parseFloat(v)
            },
            lat_0: function (v) {
              self.lat0 = v * D2R
            },
            lat_1: function (v) {
              self.lat1 = v * D2R
            },
            lat_2: function (v) {
              self.lat2 = v * D2R
            },
            lat_ts: function (v) {
              self.lat_ts = v * D2R
            },
            lon_0: function (v) {
              self.long0 = v * D2R
            },
            lon_1: function (v) {
              self.long1 = v * D2R
            },
            lon_2: function (v) {
              self.long2 = v * D2R
            },
            alpha: function (v) {
              self.alpha = parseFloat(v) * D2R
            },
            gamma: function (v) {
              self.rectified_grid_angle = parseFloat(v)
            },
            lonc: function (v) {
              self.longc = v * D2R
            },
            x_0: function (v) {
              self.x0 = parseFloat(v)
            },
            y_0: function (v) {
              self.y0 = parseFloat(v)
            },
            k_0: function (v) {
              self.k0 = parseFloat(v)
            },
            k: function (v) {
              self.k0 = parseFloat(v)
            },
            a: function (v) {
              self.a = parseFloat(v)
            },
            b: function (v) {
              self.b = parseFloat(v)
            },
            r_a: function () {
              self.R_A = true
            },
            zone: function (v) {
              self.zone = parseInt(v, 10)
            },
            south: function () {
              self.utmSouth = true
            },
            towgs84: function (v) {
              self.datum_params = v.split(",").map(function (a) {
                return parseFloat(a)
              })
            },
            to_meter: function (v) {
              self.to_meter = parseFloat(v)
            },
            units: function (v) {
              self.units = v
              var unit = match(units, v)
              if (unit) {
                self.to_meter = unit.to_meter
              }
            },
            from_greenwich: function (v) {
              self.from_greenwich = v * D2R
            },
            pm: function (v) {
              var pm = match(PrimeMeridian_exports, v)
              self.from_greenwich = (pm ? pm : parseFloat(v)) * D2R
            },
            nadgrids: function (v) {
              if (v === "@null") {
                self.datumCode = "none"
              } else {
                self.nadgrids = v
              }
            },
            axis: function (v) {
              var legalAxis = "ewnsud"
              if (
                v.length === 3 &&
                legalAxis.indexOf(v.substr(0, 1)) !== -1 &&
                legalAxis.indexOf(v.substr(1, 1)) !== -1 &&
                legalAxis.indexOf(v.substr(2, 1)) !== -1
              ) {
                self.axis = v
              }
            },
            approx: function () {
              self.approx = true
            }
          }
          for (paramName in paramObj) {
            paramVal = paramObj[paramName]
            if (paramName in params) {
              paramOutname = params[paramName]
              if (typeof paramOutname === "function") {
                paramOutname(paramVal)
              } else {
                self[paramOutname] = paramVal
              }
            } else {
              self[paramName] = paramVal
            }
          }
          if (typeof self.datumCode === "string" && self.datumCode !== "WGS84") {
            self.datumCode = self.datumCode.toLowerCase()
          }
          return self
        }

        // CONCATENATED MODULE: ./node_modules/wkt-parser/parser.js
        /* harmony default export */ var parser = parseString

        var NEUTRAL = 1
        var KEYWORD = 2
        var NUMBER = 3
        var QUOTED = 4
        var AFTERQUOTE = 5
        var ENDED = -1
        var whitespace = /\s/
        var latin = /[A-Za-z]/
        var keyword = /[A-Za-z84_]/
        var endThings = /[,\]]/
        var digets = /[\d\.E\-\+]/
        // const ignoredChar = /[\s_\-\/\(\)]/g;
        function Parser(text) {
          if (typeof text !== "string") {
            throw new Error("not a string")
          }
          this.text = text.trim()
          this.level = 0
          this.place = 0
          this.root = null
          this.stack = []
          this.currentObject = null
          this.state = NEUTRAL
        }
        Parser.prototype.readCharicter = function () {
          var char = this.text[this.place++]
          if (this.state !== QUOTED) {
            while (whitespace.test(char)) {
              if (this.place >= this.text.length) {
                return
              }
              char = this.text[this.place++]
            }
          }
          switch (this.state) {
            case NEUTRAL:
              return this.neutral(char)
            case KEYWORD:
              return this.keyword(char)
            case QUOTED:
              return this.quoted(char)
            case AFTERQUOTE:
              return this.afterquote(char)
            case NUMBER:
              return this.number(char)
            case ENDED:
              return
          }
        }
        Parser.prototype.afterquote = function (char) {
          if (char === '"') {
            this.word += '"'
            this.state = QUOTED
            return
          }
          if (endThings.test(char)) {
            this.word = this.word.trim()
            this.afterItem(char)
            return
          }
          throw new Error("havn't handled \"" + char + '" in afterquote yet, index ' + this.place)
        }
        Parser.prototype.afterItem = function (char) {
          if (char === ",") {
            if (this.word !== null) {
              this.currentObject.push(this.word)
            }
            this.word = null
            this.state = NEUTRAL
            return
          }
          if (char === "]") {
            this.level--
            if (this.word !== null) {
              this.currentObject.push(this.word)
              this.word = null
            }
            this.state = NEUTRAL
            this.currentObject = this.stack.pop()
            if (!this.currentObject) {
              this.state = ENDED
            }

            return
          }
        }
        Parser.prototype.number = function (char) {
          if (digets.test(char)) {
            this.word += char
            return
          }
          if (endThings.test(char)) {
            this.word = parseFloat(this.word)
            this.afterItem(char)
            return
          }
          throw new Error("havn't handled \"" + char + '" in number yet, index ' + this.place)
        }
        Parser.prototype.quoted = function (char) {
          if (char === '"') {
            this.state = AFTERQUOTE
            return
          }
          this.word += char
          return
        }
        Parser.prototype.keyword = function (char) {
          if (keyword.test(char)) {
            this.word += char
            return
          }
          if (char === "[") {
            var newObjects = []
            newObjects.push(this.word)
            this.level++
            if (this.root === null) {
              this.root = newObjects
            } else {
              this.currentObject.push(newObjects)
            }
            this.stack.push(this.currentObject)
            this.currentObject = newObjects
            this.state = NEUTRAL
            return
          }
          if (endThings.test(char)) {
            this.afterItem(char)
            return
          }
          throw new Error("havn't handled \"" + char + '" in keyword yet, index ' + this.place)
        }
        Parser.prototype.neutral = function (char) {
          if (latin.test(char)) {
            this.word = char
            this.state = KEYWORD
            return
          }
          if (char === '"') {
            this.word = ""
            this.state = QUOTED
            return
          }
          if (digets.test(char)) {
            this.word = char
            this.state = NUMBER
            return
          }
          if (endThings.test(char)) {
            this.afterItem(char)
            return
          }
          throw new Error("havn't handled \"" + char + '" in neutral yet, index ' + this.place)
        }
        Parser.prototype.output = function () {
          while (this.place < this.text.length) {
            this.readCharicter()
          }
          if (this.state === ENDED) {
            return this.root
          }
          throw new Error('unable to parse string "' + this.text + '". State is ' + this.state)
        }

        function parseString(txt) {
          var parser = new Parser(txt)
          return parser.output()
        }

        // CONCATENATED MODULE: ./node_modules/wkt-parser/process.js

        function mapit(obj, key, value) {
          if (Array.isArray(key)) {
            value.unshift(key)
            key = null
          }
          var thing = key ? {} : obj

          var out = value.reduce(function (newObj, item) {
            sExpr(item, newObj)
            return newObj
          }, thing)
          if (key) {
            obj[key] = out
          }
        }

        function sExpr(v, obj) {
          if (!Array.isArray(v)) {
            obj[v] = true
            return
          }
          var key = v.shift()
          if (key === "PARAMETER") {
            key = v.shift()
          }
          if (v.length === 1) {
            if (Array.isArray(v[0])) {
              obj[key] = {}
              sExpr(v[0], obj[key])
              return
            }
            obj[key] = v[0]
            return
          }
          if (!v.length) {
            obj[key] = true
            return
          }
          if (key === "TOWGS84") {
            obj[key] = v
            return
          }
          if (key === "AXIS") {
            if (!(key in obj)) {
              obj[key] = []
            }
            obj[key].push(v)
            return
          }
          if (!Array.isArray(key)) {
            obj[key] = {}
          }

          var i
          switch (key) {
            case "UNIT":
            case "PRIMEM":
            case "VERT_DATUM":
              obj[key] = {
                name: v[0].toLowerCase(),
                convert: v[1]
              }
              if (v.length === 3) {
                sExpr(v[2], obj[key])
              }
              return
            case "SPHEROID":
            case "ELLIPSOID":
              obj[key] = {
                name: v[0],
                a: v[1],
                rf: v[2]
              }
              if (v.length === 4) {
                sExpr(v[3], obj[key])
              }
              return
            case "PROJECTEDCRS":
            case "PROJCRS":
            case "GEOGCS":
            case "GEOCCS":
            case "PROJCS":
            case "LOCAL_CS":
            case "GEODCRS":
            case "GEODETICCRS":
            case "GEODETICDATUM":
            case "EDATUM":
            case "ENGINEERINGDATUM":
            case "VERT_CS":
            case "VERTCRS":
            case "VERTICALCRS":
            case "COMPD_CS":
            case "COMPOUNDCRS":
            case "ENGINEERINGCRS":
            case "ENGCRS":
            case "FITTED_CS":
            case "LOCAL_DATUM":
            case "DATUM":
              v[0] = ["name", v[0]]
              mapit(obj, key, v)
              return
            default:
              i = -1
              while (++i < v.length) {
                if (!Array.isArray(v[i])) {
                  return sExpr(v, obj[key])
                }
              }
              return mapit(obj, key, v)
          }
        }

        // CONCATENATED MODULE: ./node_modules/wkt-parser/index.js
        var wkt_parser_D2R = 0.01745329251994329577

        function rename(obj, params) {
          var outName = params[0]
          var inName = params[1]
          if (!(outName in obj) && inName in obj) {
            obj[outName] = obj[inName]
            if (params.length === 3) {
              obj[outName] = params[2](obj[outName])
            }
          }
        }

        function d2r(input) {
          return input * wkt_parser_D2R
        }

        function cleanWKT(wkt) {
          if (wkt.type === "GEOGCS") {
            wkt.projName = "longlat"
          } else if (wkt.type === "LOCAL_CS") {
            wkt.projName = "identity"
            wkt.local = true
          } else {
            if (typeof wkt.PROJECTION === "object") {
              wkt.projName = Object.keys(wkt.PROJECTION)[0]
            } else {
              wkt.projName = wkt.PROJECTION
            }
          }
          if (wkt.AXIS) {
            var axisOrder = ""
            for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {
              var axis = [wkt.AXIS[i][0].toLowerCase(), wkt.AXIS[i][1].toLowerCase()]
              if (axis[0].indexOf("north") !== -1 || ((axis[0] === "y" || axis[0] === "lat") && axis[1] === "north")) {
                axisOrder += "n"
              } else if (axis[0].indexOf("south") !== -1 || ((axis[0] === "y" || axis[0] === "lat") && axis[1] === "south")) {
                axisOrder += "s"
              } else if (axis[0].indexOf("east") !== -1 || ((axis[0] === "x" || axis[0] === "lon") && axis[1] === "east")) {
                axisOrder += "e"
              } else if (axis[0].indexOf("west") !== -1 || ((axis[0] === "x" || axis[0] === "lon") && axis[1] === "west")) {
                axisOrder += "w"
              }
            }
            if (axisOrder.length === 2) {
              axisOrder += "u"
            }
            if (axisOrder.length === 3) {
              wkt.axis = axisOrder
            }
          }
          if (wkt.UNIT) {
            wkt.units = wkt.UNIT.name.toLowerCase()
            if (wkt.units === "metre") {
              wkt.units = "meter"
            }
            if (wkt.UNIT.convert) {
              if (wkt.type === "GEOGCS") {
                if (wkt.DATUM && wkt.DATUM.SPHEROID) {
                  wkt.to_meter = wkt.UNIT.convert * wkt.DATUM.SPHEROID.a
                }
              } else {
                wkt.to_meter = wkt.UNIT.convert
              }
            }
          }
          var geogcs = wkt.GEOGCS
          if (wkt.type === "GEOGCS") {
            geogcs = wkt
          }
          if (geogcs) {
            //if(wkt.GEOGCS.PRIMEM&&wkt.GEOGCS.PRIMEM.convert){
            //  wkt.from_greenwich=wkt.GEOGCS.PRIMEM.convert*D2R;
            //}
            if (geogcs.DATUM) {
              wkt.datumCode = geogcs.DATUM.name.toLowerCase()
            } else {
              wkt.datumCode = geogcs.name.toLowerCase()
            }
            if (wkt.datumCode.slice(0, 2) === "d_") {
              wkt.datumCode = wkt.datumCode.slice(2)
            }
            if (wkt.datumCode === "new_zealand_geodetic_datum_1949" || wkt.datumCode === "new_zealand_1949") {
              wkt.datumCode = "nzgd49"
            }
            if (wkt.datumCode === "wgs_1984" || wkt.datumCode === "world_geodetic_system_1984") {
              if (wkt.PROJECTION === "Mercator_Auxiliary_Sphere") {
                wkt.sphere = true
              }
              wkt.datumCode = "wgs84"
            }
            if (wkt.datumCode.slice(-6) === "_ferro") {
              wkt.datumCode = wkt.datumCode.slice(0, -6)
            }
            if (wkt.datumCode.slice(-8) === "_jakarta") {
              wkt.datumCode = wkt.datumCode.slice(0, -8)
            }
            if (~wkt.datumCode.indexOf("belge")) {
              wkt.datumCode = "rnb72"
            }
            if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
              wkt.ellps = geogcs.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk")
              if (wkt.ellps.toLowerCase().slice(0, 13) === "international") {
                wkt.ellps = "intl"
              }

              wkt.a = geogcs.DATUM.SPHEROID.a
              wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10)
            }

            if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
              wkt.datum_params = geogcs.DATUM.TOWGS84
            }
            if (~wkt.datumCode.indexOf("osgb_1936")) {
              wkt.datumCode = "osgb36"
            }
            if (~wkt.datumCode.indexOf("osni_1952")) {
              wkt.datumCode = "osni52"
            }
            if (~wkt.datumCode.indexOf("tm65") || ~wkt.datumCode.indexOf("geodetic_datum_of_1965")) {
              wkt.datumCode = "ire65"
            }
            if (wkt.datumCode === "ch1903+") {
              wkt.datumCode = "ch1903"
            }
            if (~wkt.datumCode.indexOf("israel")) {
              wkt.datumCode = "isr93"
            }
          }
          if (wkt.b && !isFinite(wkt.b)) {
            wkt.b = wkt.a
          }

          function toMeter(input) {
            var ratio = wkt.to_meter || 1
            return input * ratio
          }
          var renamer = function (a) {
            return rename(wkt, a)
          }
          var list = [
            ["standard_parallel_1", "Standard_Parallel_1"],
            ["standard_parallel_1", "Latitude of 1st standard parallel"],
            ["standard_parallel_2", "Standard_Parallel_2"],
            ["standard_parallel_2", "Latitude of 2nd standard parallel"],
            ["false_easting", "False_Easting"],
            ["false_easting", "False easting"],
            ["false-easting", "Easting at false origin"],
            ["false_northing", "False_Northing"],
            ["false_northing", "False northing"],
            ["false_northing", "Northing at false origin"],
            ["central_meridian", "Central_Meridian"],
            ["central_meridian", "Longitude of natural origin"],
            ["central_meridian", "Longitude of false origin"],
            ["latitude_of_origin", "Latitude_Of_Origin"],
            ["latitude_of_origin", "Central_Parallel"],
            ["latitude_of_origin", "Latitude of natural origin"],
            ["latitude_of_origin", "Latitude of false origin"],
            ["scale_factor", "Scale_Factor"],
            ["k0", "scale_factor"],
            ["latitude_of_center", "Latitude_Of_Center"],
            ["latitude_of_center", "Latitude_of_center"],
            ["lat0", "latitude_of_center", d2r],
            ["longitude_of_center", "Longitude_Of_Center"],
            ["longitude_of_center", "Longitude_of_center"],
            ["longc", "longitude_of_center", d2r],
            ["x0", "false_easting", toMeter],
            ["y0", "false_northing", toMeter],
            ["long0", "central_meridian", d2r],
            ["lat0", "latitude_of_origin", d2r],
            ["lat0", "standard_parallel_1", d2r],
            ["lat1", "standard_parallel_1", d2r],
            ["lat2", "standard_parallel_2", d2r],
            ["azimuth", "Azimuth"],
            ["alpha", "azimuth", d2r],
            ["srsCode", "name"]
          ]
          list.forEach(renamer)
          if (!wkt.long0 && wkt.longc && (wkt.projName === "Albers_Conic_Equal_Area" || wkt.projName === "Lambert_Azimuthal_Equal_Area")) {
            wkt.long0 = wkt.longc
          }
          if (!wkt.lat_ts && wkt.lat1 && (wkt.projName === "Stereographic_South_Pole" || wkt.projName === "Polar Stereographic (variant B)")) {
            wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90)
            wkt.lat_ts = wkt.lat1
          }
        }
        /* harmony default export */ var wkt_parser = function (wkt) {
          var lisp = parser(wkt)
          var type = lisp.shift()
          var name = lisp.shift()
          lisp.unshift(["name", name])
          lisp.unshift(["type", type])
          var obj = {}
          sExpr(lisp, obj)
          cleanWKT(obj)
          return obj
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/defs.js

        function defs(name) {
          /*global console*/
          var that = this
          if (arguments.length === 2) {
            var def = arguments[1]
            if (typeof def === "string") {
              if (def.charAt(0) === "+") {
                defs[name] = projString(arguments[1])
              } else {
                defs[name] = wkt_parser(arguments[1])
              }
            } else {
              defs[name] = def
            }
          } else if (arguments.length === 1) {
            if (Array.isArray(name)) {
              return name.map(function (v) {
                if (Array.isArray(v)) {
                  defs.apply(that, v)
                } else {
                  defs(v)
                }
              })
            } else if (typeof name === "string") {
              if (name in defs) {
                return defs[name]
              }
            } else if ("EPSG" in name) {
              defs["EPSG:" + name.EPSG] = name
            } else if ("ESRI" in name) {
              defs["ESRI:" + name.ESRI] = name
            } else if ("IAU2000" in name) {
              defs["IAU2000:" + name.IAU2000] = name
            } else {
              console.log(name)
            }
            return
          }
        }
        global(defs)
        /* harmony default export */ var lib_defs = defs

        // CONCATENATED MODULE: ./node_modules/proj4/lib/parseCode.js

        function testObj(code) {
          return typeof code === "string"
        }
        function testDef(code) {
          return code in lib_defs
        }
        var codeWords = [
          "PROJECTEDCRS",
          "PROJCRS",
          "GEOGCS",
          "GEOCCS",
          "PROJCS",
          "LOCAL_CS",
          "GEODCRS",
          "GEODETICCRS",
          "GEODETICDATUM",
          "ENGCRS",
          "ENGINEERINGCRS"
        ]
        function testWKT(code) {
          return codeWords.some(function (word) {
            return code.indexOf(word) > -1
          })
        }
        var codes = ["3857", "900913", "3785", "102113"]
        function checkMercator(item) {
          var auth = match(item, "authority")
          if (!auth) {
            return
          }
          var code = match(auth, "epsg")
          return code && codes.indexOf(code) > -1
        }
        function checkProjStr(item) {
          var ext = match(item, "extension")
          if (!ext) {
            return
          }
          return match(ext, "proj4")
        }
        function testProj(code) {
          return code[0] === "+"
        }
        function parse(code) {
          if (testObj(code)) {
            //check to see if this is a WKT string
            if (testDef(code)) {
              return lib_defs[code]
            }
            if (testWKT(code)) {
              var out = wkt_parser(code)
              // test of spetial case, due to this being a very common and often malformed
              if (checkMercator(out)) {
                return lib_defs["EPSG:3857"]
              }
              var maybeProjStr = checkProjStr(out)
              if (maybeProjStr) {
                return projString(maybeProjStr)
              }
              return out
            }
            if (testProj(code)) {
              return projString(code)
            }
          } else {
            return code
          }
        }

        /* harmony default export */ var parseCode = parse

        // CONCATENATED MODULE: ./node_modules/proj4/lib/extend.js
        /* harmony default export */ var extend = function (destination, source) {
          destination = destination || {}
          var value, property
          if (!source) {
            return destination
          }
          for (property in source) {
            value = source[property]
            if (value !== undefined) {
              destination[property] = value
            }
          }
          return destination
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/msfnz.js
        /* harmony default export */ var msfnz = function (eccent, sinphi, cosphi) {
          var con = eccent * sinphi
          return cosphi / Math.sqrt(1 - con * con)
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/sign.js
        /* harmony default export */ var sign = function (x) {
          return x < 0 ? -1 : 1
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/adjust_lon.js

        /* harmony default export */ var adjust_lon = function (x) {
          return Math.abs(x) <= SPI ? x : x - sign(x) * TWO_PI
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/tsfnz.js

        /* harmony default export */ var tsfnz = function (eccent, phi, sinphi) {
          var con = eccent * sinphi
          var com = 0.5 * eccent
          con = Math.pow((1 - con) / (1 + con), com)
          return Math.tan(0.5 * (HALF_PI - phi)) / con
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/phi2z.js

        /* harmony default export */ var phi2z = function (eccent, ts) {
          var eccnth = 0.5 * eccent
          var con, dphi
          var phi = HALF_PI - 2 * Math.atan(ts)
          for (var i = 0; i <= 15; i++) {
            con = eccent * Math.sin(phi)
            dphi = HALF_PI - 2 * Math.atan(ts * Math.pow((1 - con) / (1 + con), eccnth)) - phi
            phi += dphi
            if (Math.abs(dphi) <= 0.0000000001) {
              return phi
            }
          }
          //console.log("phi2z has NoConvergence");
          return -9999
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/merc.js

        function init() {
          var con = this.b / this.a
          this.es = 1 - con * con
          if (!("x0" in this)) {
            this.x0 = 0
          }
          if (!("y0" in this)) {
            this.y0 = 0
          }
          this.e = Math.sqrt(this.es)
          if (this.lat_ts) {
            if (this.sphere) {
              this.k0 = Math.cos(this.lat_ts)
            } else {
              this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts))
            }
          } else {
            if (!this.k0) {
              if (this.k) {
                this.k0 = this.k
              } else {
                this.k0 = 1
              }
            }
          }
        }

        /* Mercator forward equations--mapping lat,long to x,y
  --------------------------------------------------*/

        function forward(p) {
          var lon = p.x
          var lat = p.y
          // convert to radians
          if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
            return null
          }

          var x, y
          if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
            return null
          } else {
            if (this.sphere) {
              x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0)
              y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat))
            } else {
              var sinphi = Math.sin(lat)
              var ts = tsfnz(this.e, lat, sinphi)
              x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0)
              y = this.y0 - this.a * this.k0 * Math.log(ts)
            }
            p.x = x
            p.y = y
            return p
          }
        }

        /* Mercator inverse equations--mapping x,y to lat/long
  --------------------------------------------------*/
        function merc_inverse(p) {
          var x = p.x - this.x0
          var y = p.y - this.y0
          var lon, lat

          if (this.sphere) {
            lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)))
          } else {
            var ts = Math.exp(-y / (this.a * this.k0))
            lat = phi2z(this.e, ts)
            if (lat === -9999) {
              return null
            }
          }
          lon = adjust_lon(this.long0 + x / (this.a * this.k0))

          p.x = lon
          p.y = lat
          return p
        }

        var names = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"]
        /* harmony default export */ var merc = {
          init: init,
          forward: forward,
          inverse: merc_inverse,
          names: names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/longlat.js
        function longlat_init() {
          //no-op for longlat
        }

        function identity(pt) {
          return pt
        }

        var longlat_names = ["longlat", "identity"]
        /* harmony default export */ var longlat = {
          init: longlat_init,
          forward: identity,
          inverse: identity,
          names: longlat_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections.js

        var projs = [merc, longlat]
        var projections_names = {}
        var projStore = []

        function add(proj, i) {
          var len = projStore.length
          if (!proj.names) {
            console.log(i)
            return true
          }
          projStore[len] = proj
          proj.names.forEach(function (n) {
            projections_names[n.toLowerCase()] = len
          })
          return this
        }

        function get(name) {
          if (!name) {
            return false
          }
          var n = name.toLowerCase()
          if (typeof projections_names[n] !== "undefined" && projStore[projections_names[n]]) {
            return projStore[projections_names[n]]
          }
        }

        function start() {
          projs.forEach(add)
        }
        /* harmony default export */ var projections = {
          start: start,
          add: add,
          get: get
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/constants/Ellipsoid.js
        var Ellipsoid_exports = {}

        Ellipsoid_exports.MERIT = {
          a: 6378137.0,
          rf: 298.257,
          ellipseName: "MERIT 1983"
        }

        Ellipsoid_exports.SGS85 = {
          a: 6378136.0,
          rf: 298.257,
          ellipseName: "Soviet Geodetic System 85"
        }

        Ellipsoid_exports.GRS80 = {
          a: 6378137.0,
          rf: 298.257222101,
          ellipseName: "GRS 1980(IUGG, 1980)"
        }

        Ellipsoid_exports.IAU76 = {
          a: 6378140.0,
          rf: 298.257,
          ellipseName: "IAU 1976"
        }

        Ellipsoid_exports.airy = {
          a: 6377563.396,
          b: 6356256.91,
          ellipseName: "Airy 1830"
        }

        Ellipsoid_exports.APL4 = {
          a: 6378137,
          rf: 298.25,
          ellipseName: "Appl. Physics. 1965"
        }

        Ellipsoid_exports.NWL9D = {
          a: 6378145.0,
          rf: 298.25,
          ellipseName: "Naval Weapons Lab., 1965"
        }

        Ellipsoid_exports.mod_airy = {
          a: 6377340.189,
          b: 6356034.446,
          ellipseName: "Modified Airy"
        }

        Ellipsoid_exports.andrae = {
          a: 6377104.43,
          rf: 300.0,
          ellipseName: "Andrae 1876 (Den., Iclnd.)"
        }

        Ellipsoid_exports.aust_SA = {
          a: 6378160.0,
          rf: 298.25,
          ellipseName: "Australian Natl & S. Amer. 1969"
        }

        Ellipsoid_exports.GRS67 = {
          a: 6378160.0,
          rf: 298.247167427,
          ellipseName: "GRS 67(IUGG 1967)"
        }

        Ellipsoid_exports.bessel = {
          a: 6377397.155,
          rf: 299.1528128,
          ellipseName: "Bessel 1841"
        }

        Ellipsoid_exports.bess_nam = {
          a: 6377483.865,
          rf: 299.1528128,
          ellipseName: "Bessel 1841 (Namibia)"
        }

        Ellipsoid_exports.clrk66 = {
          a: 6378206.4,
          b: 6356583.8,
          ellipseName: "Clarke 1866"
        }

        Ellipsoid_exports.clrk80 = {
          a: 6378249.145,
          rf: 293.4663,
          ellipseName: "Clarke 1880 mod."
        }

        Ellipsoid_exports.clrk58 = {
          a: 6378293.645208759,
          rf: 294.2606763692654,
          ellipseName: "Clarke 1858"
        }

        Ellipsoid_exports.CPM = {
          a: 6375738.7,
          rf: 334.29,
          ellipseName: "Comm. des Poids et Mesures 1799"
        }

        Ellipsoid_exports.delmbr = {
          a: 6376428.0,
          rf: 311.5,
          ellipseName: "Delambre 1810 (Belgium)"
        }

        Ellipsoid_exports.engelis = {
          a: 6378136.05,
          rf: 298.2566,
          ellipseName: "Engelis 1985"
        }

        Ellipsoid_exports.evrst30 = {
          a: 6377276.345,
          rf: 300.8017,
          ellipseName: "Everest 1830"
        }

        Ellipsoid_exports.evrst48 = {
          a: 6377304.063,
          rf: 300.8017,
          ellipseName: "Everest 1948"
        }

        Ellipsoid_exports.evrst56 = {
          a: 6377301.243,
          rf: 300.8017,
          ellipseName: "Everest 1956"
        }

        Ellipsoid_exports.evrst69 = {
          a: 6377295.664,
          rf: 300.8017,
          ellipseName: "Everest 1969"
        }

        Ellipsoid_exports.evrstSS = {
          a: 6377298.556,
          rf: 300.8017,
          ellipseName: "Everest (Sabah & Sarawak)"
        }

        Ellipsoid_exports.fschr60 = {
          a: 6378166.0,
          rf: 298.3,
          ellipseName: "Fischer (Mercury Datum) 1960"
        }

        Ellipsoid_exports.fschr60m = {
          a: 6378155.0,
          rf: 298.3,
          ellipseName: "Fischer 1960"
        }

        Ellipsoid_exports.fschr68 = {
          a: 6378150.0,
          rf: 298.3,
          ellipseName: "Fischer 1968"
        }

        Ellipsoid_exports.helmert = {
          a: 6378200.0,
          rf: 298.3,
          ellipseName: "Helmert 1906"
        }

        Ellipsoid_exports.hough = {
          a: 6378270.0,
          rf: 297.0,
          ellipseName: "Hough"
        }

        Ellipsoid_exports.intl = {
          a: 6378388.0,
          rf: 297.0,
          ellipseName: "International 1909 (Hayford)"
        }

        Ellipsoid_exports.kaula = {
          a: 6378163.0,
          rf: 298.24,
          ellipseName: "Kaula 1961"
        }

        Ellipsoid_exports.lerch = {
          a: 6378139.0,
          rf: 298.257,
          ellipseName: "Lerch 1979"
        }

        Ellipsoid_exports.mprts = {
          a: 6397300.0,
          rf: 191.0,
          ellipseName: "Maupertius 1738"
        }

        Ellipsoid_exports.new_intl = {
          a: 6378157.5,
          b: 6356772.2,
          ellipseName: "New International 1967"
        }

        Ellipsoid_exports.plessis = {
          a: 6376523.0,
          rf: 6355863.0,
          ellipseName: "Plessis 1817 (France)"
        }

        Ellipsoid_exports.krass = {
          a: 6378245.0,
          rf: 298.3,
          ellipseName: "Krassovsky, 1942"
        }

        Ellipsoid_exports.SEasia = {
          a: 6378155.0,
          b: 6356773.3205,
          ellipseName: "Southeast Asia"
        }

        Ellipsoid_exports.walbeck = {
          a: 6376896.0,
          b: 6355834.8467,
          ellipseName: "Walbeck"
        }

        Ellipsoid_exports.WGS60 = {
          a: 6378165.0,
          rf: 298.3,
          ellipseName: "WGS 60"
        }

        Ellipsoid_exports.WGS66 = {
          a: 6378145.0,
          rf: 298.25,
          ellipseName: "WGS 66"
        }

        Ellipsoid_exports.WGS7 = {
          a: 6378135.0,
          rf: 298.26,
          ellipseName: "WGS 72"
        }

        var WGS84 = (Ellipsoid_exports.WGS84 = {
          a: 6378137.0,
          rf: 298.257223563,
          ellipseName: "WGS 84"
        })

        Ellipsoid_exports.sphere = {
          a: 6370997.0,
          b: 6370997.0,
          ellipseName: "Normal Sphere (r=6370997)"
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/deriveConstants.js

        function eccentricity(a, b, rf, R_A) {
          var a2 = a * a // used in geocentric
          var b2 = b * b // used in geocentric
          var es = (a2 - b2) / a2 // e ^ 2
          var e = 0
          if (R_A) {
            a *= 1 - es * (SIXTH + es * (RA4 + es * RA6))
            a2 = a * a
            es = 0
          } else {
            e = Math.sqrt(es) // eccentricity
          }
          var ep2 = (a2 - b2) / b2 // used in geocentric
          return {
            es: es,
            e: e,
            ep2: ep2
          }
        }
        function deriveConstants_sphere(a, b, rf, ellps, sphere) {
          if (!a) {
            // do we have an ellipsoid?
            var ellipse = match(Ellipsoid_exports, ellps)
            if (!ellipse) {
              ellipse = WGS84
            }
            a = ellipse.a
            b = ellipse.b
            rf = ellipse.rf
          }

          if (rf && !b) {
            b = (1.0 - 1.0 / rf) * a
          }
          if (rf === 0 || Math.abs(a - b) < EPSLN) {
            sphere = true
            b = a
          }
          return {
            a: a,
            b: b,
            rf: rf,
            sphere: sphere
          }
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/constants/Datum.js
        var Datum_exports = {}

        Datum_exports.wgs84 = {
          towgs84: "0,0,0",
          ellipse: "WGS84",
          datumName: "WGS84"
        }

        Datum_exports.ch1903 = {
          towgs84: "674.374,15.056,405.346",
          ellipse: "bessel",
          datumName: "swiss"
        }

        Datum_exports.ggrs87 = {
          towgs84: "-199.87,74.79,246.62",
          ellipse: "GRS80",
          datumName: "Greek_Geodetic_Reference_System_1987"
        }

        Datum_exports.nad83 = {
          towgs84: "0,0,0",
          ellipse: "GRS80",
          datumName: "North_American_Datum_1983"
        }

        Datum_exports.nad27 = {
          nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
          ellipse: "clrk66",
          datumName: "North_American_Datum_1927"
        }

        Datum_exports.potsdam = {
          towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
          ellipse: "bessel",
          datumName: "Potsdam Rauenberg 1950 DHDN"
        }

        Datum_exports.carthage = {
          towgs84: "-263.0,6.0,431.0",
          ellipse: "clark80",
          datumName: "Carthage 1934 Tunisia"
        }

        Datum_exports.hermannskogel = {
          towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
          ellipse: "bessel",
          datumName: "Hermannskogel"
        }

        Datum_exports.osni52 = {
          towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
          ellipse: "airy",
          datumName: "Irish National"
        }

        Datum_exports.ire65 = {
          towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
          ellipse: "mod_airy",
          datumName: "Ireland 1965"
        }

        Datum_exports.rassadiran = {
          towgs84: "-133.63,-157.5,-158.62",
          ellipse: "intl",
          datumName: "Rassadiran"
        }

        Datum_exports.nzgd49 = {
          towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
          ellipse: "intl",
          datumName: "New Zealand Geodetic Datum 1949"
        }

        Datum_exports.osgb36 = {
          towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
          ellipse: "airy",
          datumName: "Airy 1830"
        }

        Datum_exports.s_jtsk = {
          towgs84: "589,76,480",
          ellipse: "bessel",
          datumName: "S-JTSK (Ferro)"
        }

        Datum_exports.beduaram = {
          towgs84: "-106,-87,188",
          ellipse: "clrk80",
          datumName: "Beduaram"
        }

        Datum_exports.gunung_segara = {
          towgs84: "-403,684,41",
          ellipse: "bessel",
          datumName: "Gunung Segara Jakarta"
        }

        Datum_exports.rnb72 = {
          towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
          ellipse: "intl",
          datumName: "Reseau National Belge 1972"
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/datum.js

        function datum(datumCode, datum_params, a, b, es, ep2, nadgrids) {
          var out = {}

          if (datumCode === undefined || datumCode === "none") {
            out.datum_type = PJD_NODATUM
          } else {
            out.datum_type = PJD_WGS84
          }

          if (datum_params) {
            out.datum_params = datum_params.map(parseFloat)
            if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
              out.datum_type = PJD_3PARAM
            }
            if (out.datum_params.length > 3) {
              if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
                out.datum_type = PJD_7PARAM
                out.datum_params[3] *= SEC_TO_RAD
                out.datum_params[4] *= SEC_TO_RAD
                out.datum_params[5] *= SEC_TO_RAD
                out.datum_params[6] = out.datum_params[6] / 1000000.0 + 1.0
              }
            }
          }

          if (nadgrids) {
            out.datum_type = PJD_GRIDSHIFT
            out.grids = nadgrids
          }
          out.a = a //datum object also uses these values
          out.b = b
          out.es = es
          out.ep2 = ep2
          return out
        }

        /* harmony default export */ var lib_datum = datum

        // CONCATENATED MODULE: ./node_modules/proj4/lib/nadgrid.js
        /**
         * Resources for details of NTv2 file formats:
         * - https://web.archive.org/web/20140127204822if_/http://www.mgs.gov.on.ca:80/stdprodconsume/groups/content/@mgs/@iandit/documents/resourcelist/stel02_047447.pdf
         * - http://mimaka.com/help/gs/html/004_NTV2%20Data%20Format.htm
         */

        var loadedNadgrids = {}

        /**
         * Load a binary NTv2 file (.gsb) to a key that can be used in a proj string like +nadgrids=<key>. Pass the NTv2 file
         * as an ArrayBuffer.
         */
        function nadgrid(key, data) {
          var view = new DataView(data)
          var isLittleEndian = detectLittleEndian(view)
          var header = readHeader(view, isLittleEndian)
          if (header.nSubgrids > 1) {
            console.log("Only single NTv2 subgrids are currently supported, subsequent sub grids are ignored")
          }
          var subgrids = readSubgrids(view, header, isLittleEndian)
          var nadgrid = { header: header, subgrids: subgrids }
          loadedNadgrids[key] = nadgrid
          return nadgrid
        }

        /**
         * Given a proj4 value for nadgrids, return an array of loaded grids
         */
        function getNadgrids(nadgrids) {
          // Format details: http://proj.maptools.org/gen_parms.html
          if (nadgrids === undefined) {
            return null
          }
          var grids = nadgrids.split(",")
          return grids.map(parseNadgridString)
        }

        function parseNadgridString(value) {
          if (value.length === 0) {
            return null
          }
          var optional = value[0] === "@"
          if (optional) {
            value = value.slice(1)
          }
          if (value === "null") {
            return { name: "null", mandatory: !optional, grid: null, isNull: true }
          }
          return {
            name: value,
            mandatory: !optional,
            grid: loadedNadgrids[value] || null,
            isNull: false
          }
        }

        function secondsToRadians(seconds) {
          return ((seconds / 3600) * Math.PI) / 180
        }

        function detectLittleEndian(view) {
          var nFields = view.getInt32(8, false)
          if (nFields === 11) {
            return false
          }
          nFields = view.getInt32(8, true)
          if (nFields !== 11) {
            console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian")
          }
          return true
        }

        function readHeader(view, isLittleEndian) {
          return {
            nFields: view.getInt32(8, isLittleEndian),
            nSubgridFields: view.getInt32(24, isLittleEndian),
            nSubgrids: view.getInt32(40, isLittleEndian),
            shiftType: decodeString(view, 56, 56 + 8).trim(),
            fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
            fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
            toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
            toSemiMinorAxis: view.getFloat64(168, isLittleEndian)
          }
        }

        function decodeString(view, start, end) {
          return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start, end)))
        }

        function readSubgrids(view, header, isLittleEndian) {
          var gridOffset = 176
          var grids = []
          for (var i = 0; i < header.nSubgrids; i++) {
            var subHeader = readGridHeader(view, gridOffset, isLittleEndian)
            var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian)
            var lngColumnCount = Math.round(1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval)
            var latColumnCount = Math.round(1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval)
            // Proj4 operates on radians whereas the coordinates are in seconds in the grid
            grids.push({
              ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
              del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
              lim: [lngColumnCount, latColumnCount],
              count: subHeader.gridNodeCount,
              cvs: mapNodes(nodes)
            })
          }
          return grids
        }

        function mapNodes(nodes) {
          return nodes.map(function (r) {
            return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)]
          })
        }

        function readGridHeader(view, offset, isLittleEndian) {
          return {
            name: decodeString(view, offset + 8, offset + 16).trim(),
            parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
            lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
            upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
            lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
            upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
            latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
            longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
            gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
          }
        }

        function readGridNodes(view, offset, gridHeader, isLittleEndian) {
          var nodesOffset = offset + 176
          var gridRecordLength = 16
          var gridShiftRecords = []
          for (var i = 0; i < gridHeader.gridNodeCount; i++) {
            var record = {
              latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
              longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian),
              latitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian),
              longitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian)
            }
            gridShiftRecords.push(record)
          }
          return gridShiftRecords
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/Proj.js

        function Projection(srsCode, callback) {
          if (!(this instanceof Projection)) {
            return new Projection(srsCode)
          }
          callback =
            callback ||
            function (error) {
              if (error) {
                throw error
              }
            }
          var json = parseCode(srsCode)
          if (typeof json !== "object") {
            callback(srsCode)
            return
          }
          var ourProj = Projection.projections.get(json.projName)
          if (!ourProj) {
            callback(srsCode)
            return
          }
          if (json.datumCode && json.datumCode !== "none") {
            var datumDef = match(Datum_exports, json.datumCode)
            if (datumDef) {
              json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(",") : null)
              json.ellps = datumDef.ellipse
              json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode
            }
          }
          json.k0 = json.k0 || 1.0
          json.axis = json.axis || "enu"
          json.ellps = json.ellps || "wgs84"
          json.lat1 = json.lat1 || json.lat0 // Lambert_Conformal_Conic_1SP, for example, needs this

          var sphere_ = deriveConstants_sphere(json.a, json.b, json.rf, json.ellps, json.sphere)
          var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A)
          var nadgrids = getNadgrids(json.nadgrids)
          var datumObj = json.datum || lib_datum(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2, nadgrids)

          extend(this, json) // transfer everything over from the projection because we don't know what we'll need
          extend(this, ourProj) // transfer all the methods from the projection

          // copy the 4 things over we calculated in deriveConstants.sphere
          this.a = sphere_.a
          this.b = sphere_.b
          this.rf = sphere_.rf
          this.sphere = sphere_.sphere

          // copy the 3 things we calculated in deriveConstants.eccentricity
          this.es = ecc.es
          this.e = ecc.e
          this.ep2 = ecc.ep2

          // add in the datum object
          this.datum = datumObj

          // init the projection
          this.init()

          // legecy callback from back in the day when it went to spatialreference.org
          callback(null, this)
        }
        Projection.projections = projections
        Projection.projections.start()
        /* harmony default export */ var Proj = Projection

        // CONCATENATED MODULE: ./node_modules/proj4/lib/datumUtils.js

        function compareDatums(source, dest) {
          if (source.datum_type !== dest.datum_type) {
            return false // false, datums are not equal
          } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 0.00000000005) {
            // the tolerance for es is to ensure that GRS80 and WGS84
            // are considered identical
            return false
          } else if (source.datum_type === PJD_3PARAM) {
            return (
              source.datum_params[0] === dest.datum_params[0] &&
              source.datum_params[1] === dest.datum_params[1] &&
              source.datum_params[2] === dest.datum_params[2]
            )
          } else if (source.datum_type === PJD_7PARAM) {
            return (
              source.datum_params[0] === dest.datum_params[0] &&
              source.datum_params[1] === dest.datum_params[1] &&
              source.datum_params[2] === dest.datum_params[2] &&
              source.datum_params[3] === dest.datum_params[3] &&
              source.datum_params[4] === dest.datum_params[4] &&
              source.datum_params[5] === dest.datum_params[5] &&
              source.datum_params[6] === dest.datum_params[6]
            )
          } else {
            return true // datums are equal
          }
        } // cs_compare_datums()

        /*
         * The function Convert_Geodetic_To_Geocentric converts geodetic coordinates
         * (latitude, longitude, and height) to geocentric coordinates (X, Y, Z),
         * according to the current ellipsoid parameters.
         *
         *    Latitude  : Geodetic latitude in radians                     (input)
         *    Longitude : Geodetic longitude in radians                    (input)
         *    Height    : Geodetic height, in meters                       (input)
         *    X         : Calculated Geocentric X coordinate, in meters    (output)
         *    Y         : Calculated Geocentric Y coordinate, in meters    (output)
         *    Z         : Calculated Geocentric Z coordinate, in meters    (output)
         *
         */
        function geodeticToGeocentric(p, es, a) {
          var Longitude = p.x
          var Latitude = p.y
          var Height = p.z ? p.z : 0 //Z value not always supplied

          var Rn /*  Earth radius at location  */
          var Sin_Lat /*  Math.sin(Latitude)  */
          var Sin2_Lat /*  Square of Math.sin(Latitude)  */
          var Cos_Lat /*  Math.cos(Latitude)  */

          /*
           ** Don't blow up if Latitude is just a little out of the value
           ** range as it may just be a rounding issue.  Also removed longitude
           ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
           */
          if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
            Latitude = -HALF_PI
          } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
            Latitude = HALF_PI
          } else if (Latitude < -HALF_PI) {
            /* Latitude out of range */
            //..reportError('geocent:lat out of range:' + Latitude);
            return { x: -Infinity, y: -Infinity, z: p.z }
          } else if (Latitude > HALF_PI) {
            /* Latitude out of range */
            return { x: Infinity, y: Infinity, z: p.z }
          }

          if (Longitude > Math.PI) {
            Longitude -= 2 * Math.PI
          }
          Sin_Lat = Math.sin(Latitude)
          Cos_Lat = Math.cos(Latitude)
          Sin2_Lat = Sin_Lat * Sin_Lat
          Rn = a / Math.sqrt(1.0 - es * Sin2_Lat)
          return {
            x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
            y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
            z: (Rn * (1 - es) + Height) * Sin_Lat
          }
        } // cs_geodetic_to_geocentric()

        function geocentricToGeodetic(p, es, a, b) {
          /* local defintions and variables */
          /* end-criterium of loop, accuracy of sin(Latitude) */
          var genau = 1e-12
          var genau2 = genau * genau
          var maxiter = 30

          var P /* distance between semi-minor axis and location */
          var RR /* distance between center and location */
          var CT /* sin of geocentric latitude */
          var ST /* cos of geocentric latitude */
          var RX
          var RK
          var RN /* Earth radius at location */
          var CPHI0 /* cos of start or old geodetic latitude in iterations */
          var SPHI0 /* sin of start or old geodetic latitude in iterations */
          var CPHI /* cos of searched geodetic latitude */
          var SPHI /* sin of searched geodetic latitude */
          var SDPHI /* end-criterium: addition-theorem of sin(Latitude(iter)-Latitude(iter-1)) */
          var iter /* # of continous iteration, max. 30 is always enough (s.a.) */

          var X = p.x
          var Y = p.y
          var Z = p.z ? p.z : 0.0 //Z value not always supplied
          var Longitude
          var Latitude
          var Height

          P = Math.sqrt(X * X + Y * Y)
          RR = Math.sqrt(X * X + Y * Y + Z * Z)

          /*      special cases for latitude and longitude */
          if (P / a < genau) {
            /*  special case, if P=0. (X=0., Y=0.) */
            Longitude = 0.0

            /*  if (X,Y,Z)=(0.,0.,0.) then Height becomes semi-minor axis
             *  of ellipsoid (=center of mass), Latitude becomes PI/2 */
            if (RR / a < genau) {
              Latitude = HALF_PI
              Height = -b
              return {
                x: p.x,
                y: p.y,
                z: p.z
              }
            }
          } else {
            /*  ellipsoidal (geodetic) longitude
             *  interval: -PI < Longitude <= +PI */
            Longitude = Math.atan2(Y, X)
          }

          /* --------------------------------------------------------------
           * Following iterative algorithm was developped by
           * "Institut for Erdmessung", University of Hannover, July 1988.
           * Internet: www.ife.uni-hannover.de
           * Iterative computation of CPHI,SPHI and Height.
           * Iteration of CPHI and SPHI to 10**-12 radian resp.
           * 2*10**-7 arcsec.
           * --------------------------------------------------------------
           */
          CT = Z / RR
          ST = P / RR
          RX = 1.0 / Math.sqrt(1.0 - es * (2.0 - es) * ST * ST)
          CPHI0 = ST * (1.0 - es) * RX
          SPHI0 = CT * RX
          iter = 0

          /* loop to find sin(Latitude) resp. Latitude
           * until |sin(Latitude(iter)-Latitude(iter-1))| < genau */
          do {
            iter++
            RN = a / Math.sqrt(1.0 - es * SPHI0 * SPHI0)

            /*  ellipsoidal (geodetic) height */
            Height = P * CPHI0 + Z * SPHI0 - RN * (1.0 - es * SPHI0 * SPHI0)

            RK = (es * RN) / (RN + Height)
            RX = 1.0 / Math.sqrt(1.0 - RK * (2.0 - RK) * ST * ST)
            CPHI = ST * (1.0 - RK) * RX
            SPHI = CT * RX
            SDPHI = SPHI * CPHI0 - CPHI * SPHI0
            CPHI0 = CPHI
            SPHI0 = SPHI
          } while (SDPHI * SDPHI > genau2 && iter < maxiter)

          /*      ellipsoidal (geodetic) latitude */
          Latitude = Math.atan(SPHI / Math.abs(CPHI))
          return {
            x: Longitude,
            y: Latitude,
            z: Height
          }
        } // cs_geocentric_to_geodetic()

        /****************************************************************/
        // pj_geocentic_to_wgs84( p )
        //  p = point to transform in geocentric coordinates (x,y,z)

        /** point object, nothing fancy, just allows values to be
    passed back and forth by reference rather than by value.
    Other point classes may be used as long as they have
    x and y properties, which will get modified in the transform method.
*/
        function geocentricToWgs84(p, datum_type, datum_params) {
          if (datum_type === PJD_3PARAM) {
            // if( x[io] === HUGE_VAL )
            //    continue;
            return {
              x: p.x + datum_params[0],
              y: p.y + datum_params[1],
              z: p.z + datum_params[2]
            }
          } else if (datum_type === PJD_7PARAM) {
            var Dx_BF = datum_params[0]
            var Dy_BF = datum_params[1]
            var Dz_BF = datum_params[2]
            var Rx_BF = datum_params[3]
            var Ry_BF = datum_params[4]
            var Rz_BF = datum_params[5]
            var M_BF = datum_params[6]
            // if( x[io] === HUGE_VAL )
            //    continue;
            return {
              x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
              y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
              z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
            }
          }
        } // cs_geocentric_to_wgs84

        /****************************************************************/
        // pj_geocentic_from_wgs84()
        //  coordinate system definition,
        //  point to transform in geocentric coordinates (x,y,z)
        function geocentricFromWgs84(p, datum_type, datum_params) {
          if (datum_type === PJD_3PARAM) {
            //if( x[io] === HUGE_VAL )
            //    continue;
            return {
              x: p.x - datum_params[0],
              y: p.y - datum_params[1],
              z: p.z - datum_params[2]
            }
          } else if (datum_type === PJD_7PARAM) {
            var Dx_BF = datum_params[0]
            var Dy_BF = datum_params[1]
            var Dz_BF = datum_params[2]
            var Rx_BF = datum_params[3]
            var Ry_BF = datum_params[4]
            var Rz_BF = datum_params[5]
            var M_BF = datum_params[6]
            var x_tmp = (p.x - Dx_BF) / M_BF
            var y_tmp = (p.y - Dy_BF) / M_BF
            var z_tmp = (p.z - Dz_BF) / M_BF
            //if( x[io] === HUGE_VAL )
            //    continue;

            return {
              x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
              y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
              z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
            }
          } //cs_geocentric_from_wgs84()
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/datum_transform.js

        function checkParams(type) {
          return type === PJD_3PARAM || type === PJD_7PARAM
        }

        /* harmony default export */ var datum_transform = function (source, dest, point) {
          // Short cut if the datums are identical.
          if (compareDatums(source, dest)) {
            return point // in this case, zero is sucess,
            // whereas cs_compare_datums returns 1 to indicate TRUE
            // confusing, should fix this
          }

          // Explicitly skip datum transform by setting 'datum=none' as parameter for either source or dest
          if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
            return point
          }

          // If this datum requires grid shifts, then apply it to geodetic coordinates.
          var source_a = source.a
          var source_es = source.es
          if (source.datum_type === PJD_GRIDSHIFT) {
            var gridShiftCode = applyGridShift(source, false, point)
            if (gridShiftCode !== 0) {
              return undefined
            }
            source_a = SRS_WGS84_SEMIMAJOR
            source_es = SRS_WGS84_ESQUARED
          }

          var dest_a = dest.a
          var dest_b = dest.b
          var dest_es = dest.es
          if (dest.datum_type === PJD_GRIDSHIFT) {
            dest_a = SRS_WGS84_SEMIMAJOR
            dest_b = SRS_WGS84_SEMIMINOR
            dest_es = SRS_WGS84_ESQUARED
          }

          // Do we need to go through geocentric coordinates?
          if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) && !checkParams(dest.datum_type)) {
            return point
          }

          // Convert to geocentric coordinates.
          point = geodeticToGeocentric(point, source_es, source_a)
          // Convert between datums
          if (checkParams(source.datum_type)) {
            point = geocentricToWgs84(point, source.datum_type, source.datum_params)
          }
          if (checkParams(dest.datum_type)) {
            point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params)
          }
          point = geocentricToGeodetic(point, dest_es, dest_a, dest_b)

          if (dest.datum_type === PJD_GRIDSHIFT) {
            var destGridShiftResult = applyGridShift(dest, true, point)
            if (destGridShiftResult !== 0) {
              return undefined
            }
          }

          return point
        }

        function applyGridShift(source, inverse, point) {
          if (source.grids === null || source.grids.length === 0) {
            console.log("Grid shift grids not found")
            return -1
          }
          var input = { x: -point.x, y: point.y }
          var output = { x: Number.NaN, y: Number.NaN }
          var onlyMandatoryGrids = false
          var attemptedGrids = []
          for (var i = 0; i < source.grids.length; i++) {
            var grid = source.grids[i]
            attemptedGrids.push(grid.name)
            if (grid.isNull) {
              output = input
              break
            }
            onlyMandatoryGrids = grid.mandatory
            if (grid.grid === null) {
              if (grid.mandatory) {
                console.log("Unable to find mandatory grid '" + grid.name + "'")
                return -1
              }
              continue
            }
            var subgrid = grid.grid.subgrids[0]
            // skip tables that don't match our point at all
            var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 10000.0
            var minX = subgrid.ll[0] - epsilon
            var minY = subgrid.ll[1] - epsilon
            var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon
            var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon
            if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x) {
              continue
            }
            output = applySubgridShift(input, inverse, subgrid)
            if (!isNaN(output.x)) {
              break
            }
          }
          if (isNaN(output.x)) {
            console.log(
              "Failed to find a grid shift table for location '" + -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'"
            )
            return -1
          }
          point.x = -output.x
          point.y = output.y
          return 0
        }

        function applySubgridShift(pin, inverse, ct) {
          var val = { x: Number.NaN, y: Number.NaN }
          if (isNaN(pin.x)) {
            return val
          }
          var tb = { x: pin.x, y: pin.y }
          tb.x -= ct.ll[0]
          tb.y -= ct.ll[1]
          tb.x = adjust_lon(tb.x - Math.PI) + Math.PI
          var t = nadInterpolate(tb, ct)
          if (inverse) {
            if (isNaN(t.x)) {
              return val
            }
            t.x = tb.x - t.x
            t.y = tb.y - t.y
            var i = 9,
              tol = 1e-12
            var dif, del
            do {
              del = nadInterpolate(t, ct)
              if (isNaN(del.x)) {
                console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.")
                break
              }
              dif = { x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y) }
              t.x += dif.x
              t.y += dif.y
            } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol)
            if (i < 0) {
              console.log("Inverse grid shift iterator failed to converge.")
              return val
            }
            val.x = adjust_lon(t.x + ct.ll[0])
            val.y = t.y + ct.ll[1]
          } else {
            if (!isNaN(t.x)) {
              val.x = pin.x + t.x
              val.y = pin.y + t.y
            }
          }
          return val
        }

        function nadInterpolate(pin, ct) {
          var t = { x: pin.x / ct.del[0], y: pin.y / ct.del[1] }
          var indx = { x: Math.floor(t.x), y: Math.floor(t.y) }
          var frct = { x: t.x - 1.0 * indx.x, y: t.y - 1.0 * indx.y }
          var val = { x: Number.NaN, y: Number.NaN }
          var inx
          if (indx.x < 0 || indx.x >= ct.lim[0]) {
            return val
          }
          if (indx.y < 0 || indx.y >= ct.lim[1]) {
            return val
          }
          inx = indx.y * ct.lim[0] + indx.x
          var f00 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] }
          inx++
          var f10 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] }
          inx += ct.lim[0]
          var f11 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] }
          inx--
          var f01 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] }
          var m11 = frct.x * frct.y,
            m10 = frct.x * (1.0 - frct.y),
            m00 = (1.0 - frct.x) * (1.0 - frct.y),
            m01 = (1.0 - frct.x) * frct.y
          val.x = m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x
          val.y = m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y
          return val
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/adjust_axis.js
        /* harmony default export */ var adjust_axis = function (crs, denorm, point) {
          var xin = point.x,
            yin = point.y,
            zin = point.z || 0.0
          var v, t, i
          var out = {}
          for (i = 0; i < 3; i++) {
            if (denorm && i === 2 && point.z === undefined) {
              continue
            }
            if (i === 0) {
              v = xin
              if ("ew".indexOf(crs.axis[i]) !== -1) {
                t = "x"
              } else {
                t = "y"
              }
            } else if (i === 1) {
              v = yin
              if ("ns".indexOf(crs.axis[i]) !== -1) {
                t = "y"
              } else {
                t = "x"
              }
            } else {
              v = zin
              t = "z"
            }
            switch (crs.axis[i]) {
              case "e":
                out[t] = v
                break
              case "w":
                out[t] = -v
                break
              case "n":
                out[t] = v
                break
              case "s":
                out[t] = -v
                break
              case "u":
                if (point[t] !== undefined) {
                  out.z = v
                }
                break
              case "d":
                if (point[t] !== undefined) {
                  out.z = -v
                }
                break
              default:
                //console.log("ERROR: unknow axis ("+crs.axis[i]+") - check definition of "+crs.projName);
                return null
            }
          }
          return out
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/toPoint.js
        /* harmony default export */ var toPoint = function (array) {
          var out = {
            x: array[0],
            y: array[1]
          }
          if (array.length > 2) {
            out.z = array[2]
          }
          if (array.length > 3) {
            out.m = array[3]
          }
          return out
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/checkSanity.js
        /* harmony default export */ var checkSanity = function (point) {
          checkCoord(point.x)
          checkCoord(point.y)
        }
        function checkCoord(num) {
          if (typeof Number.isFinite === "function") {
            if (Number.isFinite(num)) {
              return
            }
            throw new TypeError("coordinates must be finite numbers")
          }
          if (typeof num !== "number" || num !== num || !isFinite(num)) {
            throw new TypeError("coordinates must be finite numbers")
          }
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/transform.js

        function checkNotWGS(source, dest) {
          return (
            ((source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM) && dest.datumCode !== "WGS84") ||
            ((dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM) && source.datumCode !== "WGS84")
          )
        }

        function transform(source, dest, point, enforceAxis) {
          var wgs84
          if (Array.isArray(point)) {
            point = toPoint(point)
          }
          checkSanity(point)
          // Workaround for datum shifts towgs84, if either source or destination projection is not wgs84
          if (source.datum && dest.datum && checkNotWGS(source, dest)) {
            wgs84 = new Proj("WGS84")
            point = transform(source, wgs84, point, enforceAxis)
            source = wgs84
          }
          // DGR, 2010/11/12
          if (enforceAxis && source.axis !== "enu") {
            point = adjust_axis(source, false, point)
          }
          // Transform source points to long/lat, if they aren't already.
          if (source.projName === "longlat") {
            point = {
              x: point.x * D2R,
              y: point.y * D2R,
              z: point.z || 0
            }
          } else {
            if (source.to_meter) {
              point = {
                x: point.x * source.to_meter,
                y: point.y * source.to_meter,
                z: point.z || 0
              }
            }
            point = source.inverse(point) // Convert Cartesian to longlat
            if (!point) {
              return
            }
          }
          // Adjust for the prime meridian if necessary
          if (source.from_greenwich) {
            point.x += source.from_greenwich
          }

          // Convert datums if needed, and if possible.
          point = datum_transform(source.datum, dest.datum, point)
          if (!point) {
            return
          }

          // Adjust for the prime meridian if necessary
          if (dest.from_greenwich) {
            point = {
              x: point.x - dest.from_greenwich,
              y: point.y,
              z: point.z || 0
            }
          }

          if (dest.projName === "longlat") {
            // convert radians to decimal degrees
            point = {
              x: point.x * R2D,
              y: point.y * R2D,
              z: point.z || 0
            }
          } else {
            // else project
            point = dest.forward(point)
            if (dest.to_meter) {
              point = {
                x: point.x / dest.to_meter,
                y: point.y / dest.to_meter,
                z: point.z || 0
              }
            }
          }

          // DGR, 2010/11/12
          if (enforceAxis && dest.axis !== "enu") {
            return adjust_axis(dest, true, point)
          }

          return point
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/core.js

        var core_wgs84 = Proj("WGS84")

        function transformer(from, to, coords, enforceAxis) {
          var transformedArray, out, keys
          if (Array.isArray(coords)) {
            transformedArray = transform(from, to, coords, enforceAxis) || { x: NaN, y: NaN }
            if (coords.length > 2) {
              if ((typeof from.name !== "undefined" && from.name === "geocent") || (typeof to.name !== "undefined" && to.name === "geocent")) {
                if (typeof transformedArray.z === "number") {
                  return [transformedArray.x, transformedArray.y, transformedArray.z].concat(coords.splice(3))
                } else {
                  return [transformedArray.x, transformedArray.y, coords[2]].concat(coords.splice(3))
                }
              } else {
                return [transformedArray.x, transformedArray.y].concat(coords.splice(2))
              }
            } else {
              return [transformedArray.x, transformedArray.y]
            }
          } else {
            out = transform(from, to, coords, enforceAxis)
            keys = Object.keys(coords)
            if (keys.length === 2) {
              return out
            }
            keys.forEach(function (key) {
              if ((typeof from.name !== "undefined" && from.name === "geocent") || (typeof to.name !== "undefined" && to.name === "geocent")) {
                if (key === "x" || key === "y" || key === "z") {
                  return
                }
              } else {
                if (key === "x" || key === "y") {
                  return
                }
              }
              out[key] = coords[key]
            })
            return out
          }
        }

        function checkProj(item) {
          if (item instanceof Proj) {
            return item
          }
          if (item.oProj) {
            return item.oProj
          }
          return Proj(item)
        }

        function core_proj4(fromProj, toProj, coord) {
          fromProj = checkProj(fromProj)
          var single = false
          var obj
          if (typeof toProj === "undefined") {
            toProj = fromProj
            fromProj = core_wgs84
            single = true
          } else if (typeof toProj.x !== "undefined" || Array.isArray(toProj)) {
            coord = toProj
            toProj = fromProj
            fromProj = core_wgs84
            single = true
          }
          toProj = checkProj(toProj)
          if (coord) {
            return transformer(fromProj, toProj, coord)
          } else {
            obj = {
              forward: function (coords, enforceAxis) {
                return transformer(fromProj, toProj, coords, enforceAxis)
              },
              inverse: function (coords, enforceAxis) {
                return transformer(toProj, fromProj, coords, enforceAxis)
              }
            }
            if (single) {
              obj.oProj = toProj
            }
            return obj
          }
        }
        /* harmony default export */ var core = core_proj4
        // CONCATENATED MODULE: ./node_modules/mgrs/mgrs.js

        /**
         * UTM zones are grouped, and assigned to one of a group of 6
         * sets.
         *
         * {int} @private
         */
        var NUM_100K_SETS = 6

        /**
         * The column letters (for easting) of the lower left value, per
         * set.
         *
         * {string} @private
         */
        var SET_ORIGIN_COLUMN_LETTERS = "AJSAJS"

        /**
         * The row letters (for northing) of the lower left value, per
         * set.
         *
         * {string} @private
         */
        var SET_ORIGIN_ROW_LETTERS = "AFAFAF"

        var mgrs_A = 65 // A
        var I = 73 // I
        var O = 79 // O
        var mgrs_V = 86 // V
        var mgrs_Z = 90 // Z
        /* harmony default export */ var mgrs = {
          forward: mgrs_forward,
          inverse: mgrs_inverse,
          toPoint: mgrs_toPoint
        }
        /**
         * Conversion of lat/lon to MGRS.
         *
         * @param {object} ll Object literal with lat and lon properties on a
         *     WGS84 ellipsoid.
         * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
         *      100 m, 2 for 1000 m or 1 for 10000 m). Optional, default is 5.
         * @return {string} the MGRS string for the given location and accuracy.
         */
        function mgrs_forward(ll, accuracy) {
          accuracy = accuracy || 5 // default accuracy 1m
          return encode(
            LLtoUTM({
              lat: ll[1],
              lon: ll[0]
            }),
            accuracy
          )
        }

        /**
         * Conversion of MGRS to lat/lon.
         *
         * @param {string} mgrs MGRS string.
         * @return {array} An array with left (longitude), bottom (latitude), right
         *     (longitude) and top (latitude) values in WGS84, representing the
         *     bounding box for the provided MGRS reference.
         */
        function mgrs_inverse(mgrs) {
          var bbox = UTMtoLL(decode(mgrs.toUpperCase()))
          if (bbox.lat && bbox.lon) {
            return [bbox.lon, bbox.lat, bbox.lon, bbox.lat]
          }
          return [bbox.left, bbox.bottom, bbox.right, bbox.top]
        }

        function mgrs_toPoint(mgrs) {
          var bbox = UTMtoLL(decode(mgrs.toUpperCase()))
          if (bbox.lat && bbox.lon) {
            return [bbox.lon, bbox.lat]
          }
          return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2]
        }
        /**
         * Conversion from degrees to radians.
         *
         * @private
         * @param {number} deg the angle in degrees.
         * @return {number} the angle in radians.
         */
        function degToRad(deg) {
          return deg * (Math.PI / 180.0)
        }

        /**
         * Conversion from radians to degrees.
         *
         * @private
         * @param {number} rad the angle in radians.
         * @return {number} the angle in degrees.
         */
        function radToDeg(rad) {
          return 180.0 * (rad / Math.PI)
        }

        /**
         * Converts a set of Longitude and Latitude co-ordinates to UTM
         * using the WGS84 ellipsoid.
         *
         * @private
         * @param {object} ll Object literal with lat and lon properties
         *     representing the WGS84 coordinate to be converted.
         * @return {object} Object literal containing the UTM value with easting,
         *     northing, zoneNumber and zoneLetter properties, and an optional
         *     accuracy property in digits. Returns null if the conversion failed.
         */
        function LLtoUTM(ll) {
          var Lat = ll.lat
          var Long = ll.lon
          var a = 6378137.0 //ellip.radius;
          var eccSquared = 0.00669438 //ellip.eccsq;
          var k0 = 0.9996
          var LongOrigin
          var eccPrimeSquared
          var N, T, C, A, M
          var LatRad = degToRad(Lat)
          var LongRad = degToRad(Long)
          var LongOriginRad
          var ZoneNumber
          // (int)
          ZoneNumber = Math.floor((Long + 180) / 6) + 1

          //Make sure the longitude 180.00 is in Zone 60
          if (Long === 180) {
            ZoneNumber = 60
          }

          // Special zone for Norway
          if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
            ZoneNumber = 32
          }

          // Special zones for Svalbard
          if (Lat >= 72.0 && Lat < 84.0) {
            if (Long >= 0.0 && Long < 9.0) {
              ZoneNumber = 31
            } else if (Long >= 9.0 && Long < 21.0) {
              ZoneNumber = 33
            } else if (Long >= 21.0 && Long < 33.0) {
              ZoneNumber = 35
            } else if (Long >= 33.0 && Long < 42.0) {
              ZoneNumber = 37
            }
          }

          LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3 //+3 puts origin
          // in middle of
          // zone
          LongOriginRad = degToRad(LongOrigin)

          eccPrimeSquared = eccSquared / (1 - eccSquared)

          N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad))
          T = Math.tan(LatRad) * Math.tan(LatRad)
          C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad)
          A = Math.cos(LatRad) * (LongRad - LongOriginRad)

          M =
            a *
            ((1 - eccSquared / 4 - (3 * eccSquared * eccSquared) / 64 - (5 * eccSquared * eccSquared * eccSquared) / 256) * LatRad -
              ((3 * eccSquared) / 8 + (3 * eccSquared * eccSquared) / 32 + (45 * eccSquared * eccSquared * eccSquared) / 1024) *
                Math.sin(2 * LatRad) +
              ((15 * eccSquared * eccSquared) / 256 + (45 * eccSquared * eccSquared * eccSquared) / 1024) * Math.sin(4 * LatRad) -
              ((35 * eccSquared * eccSquared * eccSquared) / 3072) * Math.sin(6 * LatRad))

          var UTMEasting =
            k0 * N * (A + ((1 - T + C) * A * A * A) / 6.0 + ((5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A) / 120.0) +
            500000.0

          var UTMNorthing =
            k0 *
            (M +
              N *
                Math.tan(LatRad) *
                ((A * A) / 2 +
                  ((5 - T + 9 * C + 4 * C * C) * A * A * A * A) / 24.0 +
                  ((61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A) / 720.0))
          if (Lat < 0.0) {
            UTMNorthing += 10000000.0 //10000000 meter offset for
            // southern hemisphere
          }

          return {
            northing: Math.round(UTMNorthing),
            easting: Math.round(UTMEasting),
            zoneNumber: ZoneNumber,
            zoneLetter: getLetterDesignator(Lat)
          }
        }

        /**
         * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
         * class where the Zone can be specified as a single string eg."60N" which
         * is then broken down into the ZoneNumber and ZoneLetter.
         *
         * @private
         * @param {object} utm An object literal with northing, easting, zoneNumber
         *     and zoneLetter properties. If an optional accuracy property is
         *     provided (in meters), a bounding box will be returned instead of
         *     latitude and longitude.
         * @return {object} An object literal containing either lat and lon values
         *     (if no accuracy was provided), or top, right, bottom and left values
         *     for the bounding box calculated according to the provided accuracy.
         *     Returns null if the conversion failed.
         */
        function UTMtoLL(utm) {
          var UTMNorthing = utm.northing
          var UTMEasting = utm.easting
          var zoneLetter = utm.zoneLetter
          var zoneNumber = utm.zoneNumber
          // check the ZoneNummber is valid
          if (zoneNumber < 0 || zoneNumber > 60) {
            return null
          }

          var k0 = 0.9996
          var a = 6378137.0 //ellip.radius;
          var eccSquared = 0.00669438 //ellip.eccsq;
          var eccPrimeSquared
          var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared))
          var N1, T1, C1, R1, D, M
          var LongOrigin
          var mu, phi1Rad

          // remove 500,000 meter offset for longitude
          var x = UTMEasting - 500000.0
          var y = UTMNorthing

          // We must know somehow if we are in the Northern or Southern
          // hemisphere, this is the only time we use the letter So even
          // if the Zone letter isn't exactly correct it should indicate
          // the hemisphere correctly
          if (zoneLetter < "N") {
            y -= 10000000.0 // remove 10,000,000 meter offset used
            // for southern hemisphere
          }

          // There are 60 zones with zone 1 being at West -180 to -174
          LongOrigin = (zoneNumber - 1) * 6 - 180 + 3 // +3 puts origin
          // in middle of
          // zone

          eccPrimeSquared = eccSquared / (1 - eccSquared)

          M = y / k0
          mu = M / (a * (1 - eccSquared / 4 - (3 * eccSquared * eccSquared) / 64 - (5 * eccSquared * eccSquared * eccSquared) / 256))

          phi1Rad =
            mu +
            ((3 * e1) / 2 - (27 * e1 * e1 * e1) / 32) * Math.sin(2 * mu) +
            ((21 * e1 * e1) / 16 - (55 * e1 * e1 * e1 * e1) / 32) * Math.sin(4 * mu) +
            ((151 * e1 * e1 * e1) / 96) * Math.sin(6 * mu)
          // double phi1 = ProjMath.radToDeg(phi1Rad);

          N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad))
          T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad)
          C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad)
          R1 = (a * (1 - eccSquared)) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5)
          D = x / (N1 * k0)

          var lat =
            phi1Rad -
            ((N1 * Math.tan(phi1Rad)) / R1) *
              ((D * D) / 2 -
                ((5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D) / 24 +
                ((61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D) / 720)
          lat = radToDeg(lat)

          var lon =
            (D -
              ((1 + 2 * T1 + C1) * D * D * D) / 6 +
              ((5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D) / 120) /
            Math.cos(phi1Rad)
          lon = LongOrigin + radToDeg(lon)

          var result
          if (utm.accuracy) {
            var topRight = UTMtoLL({
              northing: utm.northing + utm.accuracy,
              easting: utm.easting + utm.accuracy,
              zoneLetter: utm.zoneLetter,
              zoneNumber: utm.zoneNumber
            })
            result = {
              top: topRight.lat,
              right: topRight.lon,
              bottom: lat,
              left: lon
            }
          } else {
            result = {
              lat: lat,
              lon: lon
            }
          }
          return result
        }

        /**
         * Calculates the MGRS letter designator for the given latitude.
         *
         * @private
         * @param {number} lat The latitude in WGS84 to get the letter designator
         *     for.
         * @return {char} The letter designator.
         */
        function getLetterDesignator(lat) {
          //This is here as an error flag to show that the Latitude is
          //outside MGRS limits
          var LetterDesignator = "Z"

          if (84 >= lat && lat >= 72) {
            LetterDesignator = "X"
          } else if (72 > lat && lat >= 64) {
            LetterDesignator = "W"
          } else if (64 > lat && lat >= 56) {
            LetterDesignator = "V"
          } else if (56 > lat && lat >= 48) {
            LetterDesignator = "U"
          } else if (48 > lat && lat >= 40) {
            LetterDesignator = "T"
          } else if (40 > lat && lat >= 32) {
            LetterDesignator = "S"
          } else if (32 > lat && lat >= 24) {
            LetterDesignator = "R"
          } else if (24 > lat && lat >= 16) {
            LetterDesignator = "Q"
          } else if (16 > lat && lat >= 8) {
            LetterDesignator = "P"
          } else if (8 > lat && lat >= 0) {
            LetterDesignator = "N"
          } else if (0 > lat && lat >= -8) {
            LetterDesignator = "M"
          } else if (-8 > lat && lat >= -16) {
            LetterDesignator = "L"
          } else if (-16 > lat && lat >= -24) {
            LetterDesignator = "K"
          } else if (-24 > lat && lat >= -32) {
            LetterDesignator = "J"
          } else if (-32 > lat && lat >= -40) {
            LetterDesignator = "H"
          } else if (-40 > lat && lat >= -48) {
            LetterDesignator = "G"
          } else if (-48 > lat && lat >= -56) {
            LetterDesignator = "F"
          } else if (-56 > lat && lat >= -64) {
            LetterDesignator = "E"
          } else if (-64 > lat && lat >= -72) {
            LetterDesignator = "D"
          } else if (-72 > lat && lat >= -80) {
            LetterDesignator = "C"
          }
          return LetterDesignator
        }

        /**
         * Encodes a UTM location as MGRS string.
         *
         * @private
         * @param {object} utm An object literal with easting, northing,
         *     zoneLetter, zoneNumber
         * @param {number} accuracy Accuracy in digits (1-5).
         * @return {string} MGRS string for the given UTM location.
         */
        function encode(utm, accuracy) {
          // prepend with leading zeroes
          var seasting = "00000" + utm.easting,
            snorthing = "00000" + utm.northing

          return (
            utm.zoneNumber +
            utm.zoneLetter +
            get100kID(utm.easting, utm.northing, utm.zoneNumber) +
            seasting.substr(seasting.length - 5, accuracy) +
            snorthing.substr(snorthing.length - 5, accuracy)
          )
        }

        /**
         * Get the two letter 100k designator for a given UTM easting,
         * northing and zone number value.
         *
         * @private
         * @param {number} easting
         * @param {number} northing
         * @param {number} zoneNumber
         * @return the two letter 100k designator for the given UTM location.
         */
        function get100kID(easting, northing, zoneNumber) {
          var setParm = get100kSetForZone(zoneNumber)
          var setColumn = Math.floor(easting / 100000)
          var setRow = Math.floor(northing / 100000) % 20
          return getLetter100kID(setColumn, setRow, setParm)
        }

        /**
         * Given a UTM zone number, figure out the MGRS 100K set it is in.
         *
         * @private
         * @param {number} i An UTM zone number.
         * @return {number} the 100k set the UTM zone is in.
         */
        function get100kSetForZone(i) {
          var setParm = i % NUM_100K_SETS
          if (setParm === 0) {
            setParm = NUM_100K_SETS
          }

          return setParm
        }

        /**
         * Get the two-letter MGRS 100k designator given information
         * translated from the UTM northing, easting and zone number.
         *
         * @private
         * @param {number} column the column index as it relates to the MGRS
         *        100k set spreadsheet, created from the UTM easting.
         *        Values are 1-8.
         * @param {number} row the row index as it relates to the MGRS 100k set
         *        spreadsheet, created from the UTM northing value. Values
         *        are from 0-19.
         * @param {number} parm the set block, as it relates to the MGRS 100k set
         *        spreadsheet, created from the UTM zone. Values are from
         *        1-60.
         * @return two letter MGRS 100k code.
         */
        function getLetter100kID(column, row, parm) {
          // colOrigin and rowOrigin are the letters at the origin of the set
          var index = parm - 1
          var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index)
          var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index)

          // colInt and rowInt are the letters to build to return
          var colInt = colOrigin + column - 1
          var rowInt = rowOrigin + row
          var rollover = false

          if (colInt > mgrs_Z) {
            colInt = colInt - mgrs_Z + mgrs_A - 1
            rollover = true
          }

          if (colInt === I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
            colInt++
          }

          if (colInt === O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
            colInt++

            if (colInt === I) {
              colInt++
            }
          }

          if (colInt > mgrs_Z) {
            colInt = colInt - mgrs_Z + mgrs_A - 1
          }

          if (rowInt > mgrs_V) {
            rowInt = rowInt - mgrs_V + mgrs_A - 1
            rollover = true
          } else {
            rollover = false
          }

          if (rowInt === I || (rowOrigin < I && rowInt > I) || ((rowInt > I || rowOrigin < I) && rollover)) {
            rowInt++
          }

          if (rowInt === O || (rowOrigin < O && rowInt > O) || ((rowInt > O || rowOrigin < O) && rollover)) {
            rowInt++

            if (rowInt === I) {
              rowInt++
            }
          }

          if (rowInt > mgrs_V) {
            rowInt = rowInt - mgrs_V + mgrs_A - 1
          }

          var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt)
          return twoLetter
        }

        /**
         * Decode the UTM parameters from a MGRS string.
         *
         * @private
         * @param {string} mgrsString an UPPERCASE coordinate string is expected.
         * @return {object} An object literal with easting, northing, zoneLetter,
         *     zoneNumber and accuracy (in meters) properties.
         */
        function decode(mgrsString) {
          if (mgrsString && mgrsString.length === 0) {
            throw "MGRSPoint coverting from nothing"
          }

          var length = mgrsString.length

          var hunK = null
          var sb = ""
          var testChar
          var i = 0

          // get Zone number
          while (!/[A-Z]/.test((testChar = mgrsString.charAt(i)))) {
            if (i >= 2) {
              throw "MGRSPoint bad conversion from: " + mgrsString
            }
            sb += testChar
            i++
          }

          var zoneNumber = parseInt(sb, 10)

          if (i === 0 || i + 3 > length) {
            // A good MGRS string has to be 4-5 digits long,
            // ##AAA/#AAA at least.
            throw "MGRSPoint bad conversion from: " + mgrsString
          }

          var zoneLetter = mgrsString.charAt(i++)

          // Should we check the zone letter here? Why not.
          if (zoneLetter <= "A" || zoneLetter === "B" || zoneLetter === "Y" || zoneLetter >= "Z" || zoneLetter === "I" || zoneLetter === "O") {
            throw "MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString
          }

          hunK = mgrsString.substring(i, (i += 2))

          var set = get100kSetForZone(zoneNumber)

          var east100k = getEastingFromChar(hunK.charAt(0), set)
          var north100k = getNorthingFromChar(hunK.charAt(1), set)

          // We have a bug where the northing may be 2000000 too low.
          // How
          // do we know when to roll over?

          while (north100k < getMinNorthing(zoneLetter)) {
            north100k += 2000000
          }

          // calculate the char index for easting/northing separator
          var remainder = length - i

          if (remainder % 2 !== 0) {
            throw (
              "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" +
              mgrsString
            )
          }

          var sep = remainder / 2

          var sepEasting = 0.0
          var sepNorthing = 0.0
          var accuracyBonus, sepEastingString, sepNorthingString, easting, northing
          if (sep > 0) {
            accuracyBonus = 100000.0 / Math.pow(10, sep)
            sepEastingString = mgrsString.substring(i, i + sep)
            sepEasting = parseFloat(sepEastingString) * accuracyBonus
            sepNorthingString = mgrsString.substring(i + sep)
            sepNorthing = parseFloat(sepNorthingString) * accuracyBonus
          }

          easting = sepEasting + east100k
          northing = sepNorthing + north100k

          return {
            easting: easting,
            northing: northing,
            zoneLetter: zoneLetter,
            zoneNumber: zoneNumber,
            accuracy: accuracyBonus
          }
        }

        /**
         * Given the first letter from a two-letter MGRS 100k zone, and given the
         * MGRS table set for the zone number, figure out the easting value that
         * should be added to the other, secondary easting value.
         *
         * @private
         * @param {char} e The first letter from a two-letter MGRS 100´k zone.
         * @param {number} set The MGRS table set for the zone number.
         * @return {number} The easting value for the given letter and set.
         */
        function getEastingFromChar(e, set) {
          // colOrigin is the letter at the origin of the set for the
          // column
          var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1)
          var eastingValue = 100000.0
          var rewindMarker = false

          while (curCol !== e.charCodeAt(0)) {
            curCol++
            if (curCol === I) {
              curCol++
            }
            if (curCol === O) {
              curCol++
            }
            if (curCol > mgrs_Z) {
              if (rewindMarker) {
                throw "Bad character: " + e
              }
              curCol = mgrs_A
              rewindMarker = true
            }
            eastingValue += 100000.0
          }

          return eastingValue
        }

        /**
         * Given the second letter from a two-letter MGRS 100k zone, and given the
         * MGRS table set for the zone number, figure out the northing value that
         * should be added to the other, secondary northing value. You have to
         * remember that Northings are determined from the equator, and the vertical
         * cycle of letters mean a 2000000 additional northing meters. This happens
         * approx. every 18 degrees of latitude. This method does *NOT* count any
         * additional northings. You have to figure out how many 2000000 meters need
         * to be added for the zone letter of the MGRS coordinate.
         *
         * @private
         * @param {char} n Second letter of the MGRS 100k zone
         * @param {number} set The MGRS table set number, which is dependent on the
         *     UTM zone number.
         * @return {number} The northing value for the given letter and set.
         */
        function getNorthingFromChar(n, set) {
          if (n > "V") {
            throw "MGRSPoint given invalid Northing " + n
          }

          // rowOrigin is the letter at the origin of the set for the
          // column
          var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1)
          var northingValue = 0.0
          var rewindMarker = false

          while (curRow !== n.charCodeAt(0)) {
            curRow++
            if (curRow === I) {
              curRow++
            }
            if (curRow === O) {
              curRow++
            }
            // fixing a bug making whole application hang in this loop
            // when 'n' is a wrong character
            if (curRow > mgrs_V) {
              if (rewindMarker) {
                // making sure that this loop ends
                throw "Bad character: " + n
              }
              curRow = mgrs_A
              rewindMarker = true
            }
            northingValue += 100000.0
          }

          return northingValue
        }

        /**
         * The function getMinNorthing returns the minimum northing value of a MGRS
         * zone.
         *
         * Ported from Geotrans' c Lattitude_Band_Value structure table.
         *
         * @private
         * @param {char} zoneLetter The MGRS zone to get the min northing for.
         * @return {number}
         */
        function getMinNorthing(zoneLetter) {
          var northing
          switch (zoneLetter) {
            case "C":
              northing = 1100000.0
              break
            case "D":
              northing = 2000000.0
              break
            case "E":
              northing = 2800000.0
              break
            case "F":
              northing = 3700000.0
              break
            case "G":
              northing = 4600000.0
              break
            case "H":
              northing = 5500000.0
              break
            case "J":
              northing = 6400000.0
              break
            case "K":
              northing = 7300000.0
              break
            case "L":
              northing = 8200000.0
              break
            case "M":
              northing = 9100000.0
              break
            case "N":
              northing = 0.0
              break
            case "P":
              northing = 800000.0
              break
            case "Q":
              northing = 1700000.0
              break
            case "R":
              northing = 2600000.0
              break
            case "S":
              northing = 3500000.0
              break
            case "T":
              northing = 4400000.0
              break
            case "U":
              northing = 5300000.0
              break
            case "V":
              northing = 6200000.0
              break
            case "W":
              northing = 7000000.0
              break
            case "X":
              northing = 7900000.0
              break
            default:
              northing = -1.0
          }
          if (northing >= 0.0) {
            return northing
          } else {
            throw "Invalid zone letter: " + zoneLetter
          }
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/Point.js

        function Point(x, y, z) {
          if (!(this instanceof Point)) {
            return new Point(x, y, z)
          }
          if (Array.isArray(x)) {
            this.x = x[0]
            this.y = x[1]
            this.z = x[2] || 0.0
          } else if (typeof x === "object") {
            this.x = x.x
            this.y = x.y
            this.z = x.z || 0.0
          } else if (typeof x === "string" && typeof y === "undefined") {
            var coords = x.split(",")
            this.x = parseFloat(coords[0], 10)
            this.y = parseFloat(coords[1], 10)
            this.z = parseFloat(coords[2], 10) || 0.0
          } else {
            this.x = x
            this.y = y
            this.z = z || 0.0
          }
          console.warn("proj4.Point will be removed in version 3, use proj4.toPoint")
        }

        Point.fromMGRS = function (mgrsStr) {
          return new Point(mgrs_toPoint(mgrsStr))
        }
        Point.prototype.toMGRS = function (accuracy) {
          return mgrs_forward([this.x, this.y], accuracy)
        }
        /* harmony default export */ var lib_Point = Point

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/pj_enfn.js
        var C00 = 1
        var C02 = 0.25
        var C04 = 0.046875
        var C06 = 0.01953125
        var C08 = 0.01068115234375
        var C22 = 0.75
        var C44 = 0.46875
        var C46 = 0.01302083333333333333
        var C48 = 0.00712076822916666666
        var C66 = 0.36458333333333333333
        var C68 = 0.00569661458333333333
        var C88 = 0.3076171875

        /* harmony default export */ var pj_enfn = function (es) {
          var en = []
          en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)))
          en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)))
          var t = es * es
          en[2] = t * (C44 - es * (C46 + es * C48))
          t *= es
          en[3] = t * (C66 - es * C68)
          en[4] = t * es * C88
          return en
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/pj_mlfn.js
        /* harmony default export */ var pj_mlfn = function (phi, sphi, cphi, en) {
          cphi *= sphi
          sphi *= sphi
          return en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])))
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/pj_inv_mlfn.js

        var MAX_ITER = 20

        /* harmony default export */ var pj_inv_mlfn = function (arg, es, en) {
          var k = 1 / (1 - es)
          var phi = arg
          for (var i = MAX_ITER; i; --i) {
            /* rarely goes over 2 iterations */
            var s = Math.sin(phi)
            var t = 1 - es * s * s
            //t = this.pj_mlfn(phi, s, Math.cos(phi), en) - arg;
            //phi -= t * (t * Math.sqrt(t)) * k;
            t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k
            phi -= t
            if (Math.abs(t) < EPSLN) {
              return phi
            }
          }
          //..reportError("cass:pj_inv_mlfn: Convergence error");
          return phi
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/tmerc.js
        // Heavily based on this tmerc projection implementation
        // https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/tmerc.js

        function tmerc_init() {
          this.x0 = this.x0 !== undefined ? this.x0 : 0
          this.y0 = this.y0 !== undefined ? this.y0 : 0
          this.long0 = this.long0 !== undefined ? this.long0 : 0
          this.lat0 = this.lat0 !== undefined ? this.lat0 : 0

          if (this.es) {
            this.en = pj_enfn(this.es)
            this.ml0 = pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en)
          }
        }

        /**
    Transverse Mercator Forward  - long/lat to x/y
    long/lat in radians
  */
        function tmerc_forward(p) {
          var lon = p.x
          var lat = p.y

          var delta_lon = adjust_lon(lon - this.long0)
          var con
          var x, y
          var sin_phi = Math.sin(lat)
          var cos_phi = Math.cos(lat)

          if (!this.es) {
            var b = cos_phi * Math.sin(delta_lon)

            if (Math.abs(Math.abs(b) - 1) < EPSLN) {
              return 93
            } else {
              x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0
              y = (cos_phi * Math.cos(delta_lon)) / Math.sqrt(1 - Math.pow(b, 2))
              b = Math.abs(y)

              if (b >= 1) {
                if (b - 1 > EPSLN) {
                  return 93
                } else {
                  y = 0
                }
              } else {
                y = Math.acos(y)
              }

              if (lat < 0) {
                y = -y
              }

              y = this.a * this.k0 * (y - this.lat0) + this.y0
            }
          } else {
            var al = cos_phi * delta_lon
            var als = Math.pow(al, 2)
            var c = this.ep2 * Math.pow(cos_phi, 2)
            var cs = Math.pow(c, 2)
            var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0
            var t = Math.pow(tq, 2)
            var ts = Math.pow(t, 2)
            con = 1 - this.es * Math.pow(sin_phi, 2)
            al = al / Math.sqrt(con)
            var ml = pj_mlfn(lat, sin_phi, cos_phi, this.en)

            x =
              this.a *
                (this.k0 *
                  al *
                  (1 +
                    (als / 6) *
                      (1 - t + c + (als / 20) * (5 - 18 * t + ts + 14 * c - 58 * t * c + (als / 42) * (61 + 179 * ts - ts * t - 479 * t))))) +
              this.x0

            y =
              this.a *
                (this.k0 *
                  (ml -
                    this.ml0 +
                    ((sin_phi * delta_lon * al) / 2) *
                      (1 +
                        (als / 12) *
                          (5 -
                            t +
                            9 * c +
                            4 * cs +
                            (als / 30) * (61 + ts - 58 * t + 270 * c - 330 * t * c + (als / 56) * (1385 + 543 * ts - ts * t - 3111 * t)))))) +
              this.y0
          }

          p.x = x
          p.y = y

          return p
        }

        /**
    Transverse Mercator Inverse  -  x/y to long/lat
  */
        function tmerc_inverse(p) {
          var con, phi
          var lat, lon
          var x = (p.x - this.x0) * (1 / this.a)
          var y = (p.y - this.y0) * (1 / this.a)

          if (!this.es) {
            var f = Math.exp(x / this.k0)
            var g = 0.5 * (f - 1 / f)
            var temp = this.lat0 + y / this.k0
            var h = Math.cos(temp)
            con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)))
            lat = Math.asin(con)

            if (y < 0) {
              lat = -lat
            }

            if (g === 0 && h === 0) {
              lon = 0
            } else {
              lon = adjust_lon(Math.atan2(g, h) + this.long0)
            }
          } else {
            // ellipsoidal form
            con = this.ml0 + y / this.k0
            phi = pj_inv_mlfn(con, this.es, this.en)

            if (Math.abs(phi) < HALF_PI) {
              var sin_phi = Math.sin(phi)
              var cos_phi = Math.cos(phi)
              var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0
              var c = this.ep2 * Math.pow(cos_phi, 2)
              var cs = Math.pow(c, 2)
              var t = Math.pow(tan_phi, 2)
              var ts = Math.pow(t, 2)
              con = 1 - this.es * Math.pow(sin_phi, 2)
              var d = (x * Math.sqrt(con)) / this.k0
              var ds = Math.pow(d, 2)
              con = con * tan_phi

              lat =
                phi -
                ((con * ds) / (1 - this.es)) *
                  0.5 *
                  (1 -
                    (ds / 12) *
                      (5 +
                        3 * t -
                        9 * c * t +
                        c -
                        4 * cs -
                        (ds / 30) * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c - (ds / 56) * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))))

              lon = adjust_lon(
                this.long0 +
                  (d *
                    (1 -
                      (ds / 6) *
                        (1 +
                          2 * t +
                          c -
                          (ds / 20) * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c - (ds / 42) * (61 + 662 * t + 1320 * ts + 720 * ts * t))))) /
                    cos_phi
              )
            } else {
              lat = HALF_PI * sign(y)
              lon = 0
            }
          }

          p.x = lon
          p.y = lat

          return p
        }

        var tmerc_names = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"]
        /* harmony default export */ var tmerc = {
          init: tmerc_init,
          forward: tmerc_forward,
          inverse: tmerc_inverse,
          names: tmerc_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/sinh.js
        /* harmony default export */ var sinh = function (x) {
          var r = Math.exp(x)
          r = (r - 1 / r) / 2
          return r
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/hypot.js
        /* harmony default export */ var hypot = function (x, y) {
          x = Math.abs(x)
          y = Math.abs(y)
          var a = Math.max(x, y)
          var b = Math.min(x, y) / (a ? a : 1)

          return a * Math.sqrt(1 + Math.pow(b, 2))
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/log1py.js
        /* harmony default export */ var log1py = function (x) {
          var y = 1 + x
          var z = y - 1

          return z === 0 ? x : (x * Math.log(y)) / z
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/asinhy.js

        /* harmony default export */ var asinhy = function (x) {
          var y = Math.abs(x)
          y = log1py(y * (1 + y / (hypot(1, y) + 1)))

          return x < 0 ? -y : y
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/gatg.js
        /* harmony default export */ var gatg = function (pp, B) {
          var cos_2B = 2 * Math.cos(2 * B)
          var i = pp.length - 1
          var h1 = pp[i]
          var h2 = 0
          var h

          while (--i >= 0) {
            h = -h2 + cos_2B * h1 + pp[i]
            h2 = h1
            h1 = h
          }

          return B + h * Math.sin(2 * B)
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/clens.js
        /* harmony default export */ var clens = function (pp, arg_r) {
          var r = 2 * Math.cos(arg_r)
          var i = pp.length - 1
          var hr1 = pp[i]
          var hr2 = 0
          var hr

          while (--i >= 0) {
            hr = -hr2 + r * hr1 + pp[i]
            hr2 = hr1
            hr1 = hr
          }

          return Math.sin(arg_r) * hr
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/cosh.js
        /* harmony default export */ var cosh = function (x) {
          var r = Math.exp(x)
          r = (r + 1 / r) / 2
          return r
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/clens_cmplx.js

        /* harmony default export */ var clens_cmplx = function (pp, arg_r, arg_i) {
          var sin_arg_r = Math.sin(arg_r)
          var cos_arg_r = Math.cos(arg_r)
          var sinh_arg_i = sinh(arg_i)
          var cosh_arg_i = cosh(arg_i)
          var r = 2 * cos_arg_r * cosh_arg_i
          var i = -2 * sin_arg_r * sinh_arg_i
          var j = pp.length - 1
          var hr = pp[j]
          var hi1 = 0
          var hr1 = 0
          var hi = 0
          var hr2
          var hi2

          while (--j >= 0) {
            hr2 = hr1
            hi2 = hi1
            hr1 = hr
            hi1 = hi
            hr = -hr2 + r * hr1 - i * hi1 + pp[j]
            hi = -hi2 + i * hr1 + r * hi1
          }

          r = sin_arg_r * cosh_arg_i
          i = cos_arg_r * sinh_arg_i

          return [r * hr - i * hi, r * hi + i * hr]
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/etmerc.js
        // Heavily based on this etmerc projection implementation
        // https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/etmerc.js

        function etmerc_init() {
          if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
            throw new Error(
              'Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.'
            )
          }
          if (this.approx) {
            // When '+approx' is set, use tmerc instead
            tmerc.init.apply(this)
            this.forward = tmerc.forward
            this.inverse = tmerc.inverse
          }

          this.x0 = this.x0 !== undefined ? this.x0 : 0
          this.y0 = this.y0 !== undefined ? this.y0 : 0
          this.long0 = this.long0 !== undefined ? this.long0 : 0
          this.lat0 = this.lat0 !== undefined ? this.lat0 : 0

          this.cgb = []
          this.cbg = []
          this.utg = []
          this.gtu = []

          var f = this.es / (1 + Math.sqrt(1 - this.es))
          var n = f / (2 - f)
          var np = n

          this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675))))))
          this.cbg[0] = n * (-2 + n * (2 / 3 + n * (4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))))

          np = np * n
          this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))))
          this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * (-13 / 9 + n * (904 / 315 + n * (-1522 / 945)))))

          np = np * n
          this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))))
          this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))))

          np = np * n
          this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)))
          this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * (-24832 / 14175)))

          np = np * n
          this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237))
          this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185))

          np = np * n
          this.cgb[5] = np * (601676 / 22275)
          this.cbg[5] = np * (444337 / 155925)

          np = Math.pow(n, 2)
          this.Qn = (this.k0 / (1 + n)) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)))

          this.utg[0] = n * (-0.5 + n * (2 / 3 + n * (-37 / 96 + n * (1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))))
          this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))))

          this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))))
          this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))))

          np = np * n
          this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720))))
          this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))))

          np = np * n
          this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)))
          this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)))

          np = np * n
          this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680))
          this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840))

          np = np * n
          this.utg[5] = np * (-20648693 / 638668800)
          this.gtu[5] = np * (212378941 / 319334400)

          var Z = gatg(this.cbg, this.lat0)
          this.Zb = -this.Qn * (Z + clens(this.gtu, 2 * Z))
        }

        function etmerc_forward(p) {
          var Ce = adjust_lon(p.x - this.long0)
          var Cn = p.y

          Cn = gatg(this.cbg, Cn)
          var sin_Cn = Math.sin(Cn)
          var cos_Cn = Math.cos(Cn)
          var sin_Ce = Math.sin(Ce)
          var cos_Ce = Math.cos(Ce)

          Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn)
          Ce = Math.atan2(sin_Ce * cos_Cn, hypot(sin_Cn, cos_Cn * cos_Ce))
          Ce = asinhy(Math.tan(Ce))

          var tmp = clens_cmplx(this.gtu, 2 * Cn, 2 * Ce)

          Cn = Cn + tmp[0]
          Ce = Ce + tmp[1]

          var x
          var y

          if (Math.abs(Ce) <= 2.623395162778) {
            x = this.a * (this.Qn * Ce) + this.x0
            y = this.a * (this.Qn * Cn + this.Zb) + this.y0
          } else {
            x = Infinity
            y = Infinity
          }

          p.x = x
          p.y = y

          return p
        }

        function etmerc_inverse(p) {
          var Ce = (p.x - this.x0) * (1 / this.a)
          var Cn = (p.y - this.y0) * (1 / this.a)

          Cn = (Cn - this.Zb) / this.Qn
          Ce = Ce / this.Qn

          var lon
          var lat

          if (Math.abs(Ce) <= 2.623395162778) {
            var tmp = clens_cmplx(this.utg, 2 * Cn, 2 * Ce)

            Cn = Cn + tmp[0]
            Ce = Ce + tmp[1]
            Ce = Math.atan(sinh(Ce))

            var sin_Cn = Math.sin(Cn)
            var cos_Cn = Math.cos(Cn)
            var sin_Ce = Math.sin(Ce)
            var cos_Ce = Math.cos(Ce)

            Cn = Math.atan2(sin_Cn * cos_Ce, hypot(sin_Ce, cos_Ce * cos_Cn))
            Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn)

            lon = adjust_lon(Ce + this.long0)
            lat = gatg(this.cgb, Cn)
          } else {
            lon = Infinity
            lat = Infinity
          }

          p.x = lon
          p.y = lat

          return p
        }

        var etmerc_names = [
          "Extended_Transverse_Mercator",
          "Extended Transverse Mercator",
          "etmerc",
          "Transverse_Mercator",
          "Transverse Mercator",
          "tmerc"
        ]
        /* harmony default export */ var etmerc = {
          init: etmerc_init,
          forward: etmerc_forward,
          inverse: etmerc_inverse,
          names: etmerc_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/adjust_zone.js

        /* harmony default export */ var adjust_zone = function (zone, lon) {
          if (zone === undefined) {
            zone = Math.floor(((adjust_lon(lon) + Math.PI) * 30) / Math.PI) + 1

            if (zone < 0) {
              return 0
            } else if (zone > 60) {
              return 60
            }
          }
          return zone
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/utm.js

        var dependsOn = "etmerc"

        function utm_init() {
          var zone = adjust_zone(this.zone, this.long0)
          if (zone === undefined) {
            throw new Error("unknown utm zone")
          }
          this.lat0 = 0
          this.long0 = (6 * Math.abs(zone) - 183) * D2R
          this.x0 = 500000
          this.y0 = this.utmSouth ? 10000000 : 0
          this.k0 = 0.9996

          etmerc.init.apply(this)
          this.forward = etmerc.forward
          this.inverse = etmerc.inverse
        }

        var utm_names = ["Universal Transverse Mercator System", "utm"]
        /* harmony default export */ var utm = {
          init: utm_init,
          names: utm_names,
          dependsOn: dependsOn
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/srat.js
        /* harmony default export */ var srat = function (esinp, exp) {
          return Math.pow((1 - esinp) / (1 + esinp), exp)
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/gauss.js

        var gauss_MAX_ITER = 20

        function gauss_init() {
          var sphi = Math.sin(this.lat0)
          var cphi = Math.cos(this.lat0)
          cphi *= cphi
          this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi)
          this.C = Math.sqrt(1 + (this.es * cphi * cphi) / (1 - this.es))
          this.phic0 = Math.asin(sphi / this.C)
          this.ratexp = 0.5 * this.C * this.e
          this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat(this.e * sphi, this.ratexp))
        }

        function gauss_forward(p) {
          var lon = p.x
          var lat = p.y

          p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat(this.e * Math.sin(lat), this.ratexp)) - HALF_PI
          p.x = this.C * lon
          return p
        }

        function gauss_inverse(p) {
          var DEL_TOL = 1e-14
          var lon = p.x / this.C
          var lat = p.y
          var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C)
          for (var i = gauss_MAX_ITER; i > 0; --i) {
            lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), -0.5 * this.e)) - HALF_PI
            if (Math.abs(lat - p.y) < DEL_TOL) {
              break
            }
            p.y = lat
          }
          /* convergence failed */
          if (!i) {
            return null
          }
          p.x = lon
          p.y = lat
          return p
        }

        var gauss_names = ["gauss"]
        /* harmony default export */ var gauss = {
          init: gauss_init,
          forward: gauss_forward,
          inverse: gauss_inverse,
          names: gauss_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/sterea.js

        function sterea_init() {
          gauss.init.apply(this)
          if (!this.rc) {
            return
          }
          this.sinc0 = Math.sin(this.phic0)
          this.cosc0 = Math.cos(this.phic0)
          this.R2 = 2 * this.rc
          if (!this.title) {
            this.title = "Oblique Stereographic Alternative"
          }
        }

        function sterea_forward(p) {
          var sinc, cosc, cosl, k
          p.x = adjust_lon(p.x - this.long0)
          gauss.forward.apply(this, [p])
          sinc = Math.sin(p.y)
          cosc = Math.cos(p.y)
          cosl = Math.cos(p.x)
          k = (this.k0 * this.R2) / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl)
          p.x = k * cosc * Math.sin(p.x)
          p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl)
          p.x = this.a * p.x + this.x0
          p.y = this.a * p.y + this.y0
          return p
        }

        function sterea_inverse(p) {
          var sinc, cosc, lon, lat, rho
          p.x = (p.x - this.x0) / this.a
          p.y = (p.y - this.y0) / this.a

          p.x /= this.k0
          p.y /= this.k0
          if ((rho = Math.sqrt(p.x * p.x + p.y * p.y))) {
            var c = 2 * Math.atan2(rho, this.R2)
            sinc = Math.sin(c)
            cosc = Math.cos(c)
            lat = Math.asin(cosc * this.sinc0 + (p.y * sinc * this.cosc0) / rho)
            lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc)
          } else {
            lat = this.phic0
            lon = 0
          }

          p.x = lon
          p.y = lat
          gauss.inverse.apply(this, [p])
          p.x = adjust_lon(p.x + this.long0)
          return p
        }

        var sterea_names = [
          "Stereographic_North_Pole",
          "Oblique_Stereographic",
          "Polar_Stereographic",
          "sterea",
          "Oblique Stereographic Alternative",
          "Double_Stereographic"
        ]
        /* harmony default export */ var sterea = {
          init: sterea_init,
          forward: sterea_forward,
          inverse: sterea_inverse,
          names: sterea_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/stere.js

        function ssfn_(phit, sinphi, eccen) {
          sinphi *= eccen
          return Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen)
        }

        function stere_init() {
          this.coslat0 = Math.cos(this.lat0)
          this.sinlat0 = Math.sin(this.lat0)
          if (this.sphere) {
            if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
              this.k0 = 0.5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts))
            }
          } else {
            if (Math.abs(this.coslat0) <= EPSLN) {
              if (this.lat0 > 0) {
                //North pole
                //trace('stere:north pole');
                this.con = 1
              } else {
                //South pole
                //trace('stere:south pole');
                this.con = -1
              }
            }
            this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e))
            if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
              this.k0 =
                (0.5 * this.cons * msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts))) /
                tsfnz(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))
            }
            this.ms1 = msfnz(this.e, this.sinlat0, this.coslat0)
            this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI
            this.cosX0 = Math.cos(this.X0)
            this.sinX0 = Math.sin(this.X0)
          }
        }

        // Stereographic forward equations--mapping lat,long to x,y
        function stere_forward(p) {
          var lon = p.x
          var lat = p.y
          var sinlat = Math.sin(lat)
          var coslat = Math.cos(lat)
          var A, X, sinX, cosX, ts, rh
          var dlon = adjust_lon(lon - this.long0)

          if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
            //case of the origine point
            //trace('stere:this is the origin point');
            p.x = NaN
            p.y = NaN
            return p
          }
          if (this.sphere) {
            //trace('stere:sphere case');
            A = (2 * this.k0) / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon))
            p.x = this.a * A * coslat * Math.sin(dlon) + this.x0
            p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0
            return p
          } else {
            X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI
            cosX = Math.cos(X)
            sinX = Math.sin(X)
            if (Math.abs(this.coslat0) <= EPSLN) {
              ts = tsfnz(this.e, lat * this.con, this.con * sinlat)
              rh = (2 * this.a * this.k0 * ts) / this.cons
              p.x = this.x0 + rh * Math.sin(lon - this.long0)
              p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0)
              //trace(p.toString());
              return p
            } else if (Math.abs(this.sinlat0) < EPSLN) {
              //Eq
              //trace('stere:equateur');
              A = (2 * this.a * this.k0) / (1 + cosX * Math.cos(dlon))
              p.y = A * sinX
            } else {
              //other case
              //trace('stere:normal case');
              A = (2 * this.a * this.k0 * this.ms1) / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)))
              p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0
            }
            p.x = A * cosX * Math.sin(dlon) + this.x0
          }
          //trace(p.toString());
          return p
        }

        //* Stereographic inverse equations--mapping x,y to lat/long
        function stere_inverse(p) {
          p.x -= this.x0
          p.y -= this.y0
          var lon, lat, ts, ce, Chi
          var rh = Math.sqrt(p.x * p.x + p.y * p.y)
          if (this.sphere) {
            var c = 2 * Math.atan(rh / (2 * this.a * this.k0))
            lon = this.long0
            lat = this.lat0
            if (rh <= EPSLN) {
              p.x = lon
              p.y = lat
              return p
            }
            lat = Math.asin(Math.cos(c) * this.sinlat0 + (p.y * Math.sin(c) * this.coslat0) / rh)
            if (Math.abs(this.coslat0) < EPSLN) {
              if (this.lat0 > 0) {
                lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y))
              } else {
                lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y))
              }
            } else {
              lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)))
            }
            p.x = lon
            p.y = lat
            return p
          } else {
            if (Math.abs(this.coslat0) <= EPSLN) {
              if (rh <= EPSLN) {
                lat = this.lat0
                lon = this.long0
                p.x = lon
                p.y = lat
                //trace(p.toString());
                return p
              }
              p.x *= this.con
              p.y *= this.con
              ts = (rh * this.cons) / (2 * this.a * this.k0)
              lat = this.con * phi2z(this.e, ts)
              lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, -1 * p.y))
            } else {
              ce = 2 * Math.atan((rh * this.cosX0) / (2 * this.a * this.k0 * this.ms1))
              lon = this.long0
              if (rh <= EPSLN) {
                Chi = this.X0
              } else {
                Chi = Math.asin(Math.cos(ce) * this.sinX0 + (p.y * Math.sin(ce) * this.cosX0) / rh)
                lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)))
              }
              lat = -1 * phi2z(this.e, Math.tan(0.5 * (HALF_PI + Chi)))
            }
          }
          p.x = lon
          p.y = lat

          //trace(p.toString());
          return p
        }

        var stere_names = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"]
        /* harmony default export */ var stere = {
          init: stere_init,
          forward: stere_forward,
          inverse: stere_inverse,
          names: stere_names,
          ssfn_: ssfn_
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/somerc.js
        /*
  references:
    Formules et constantes pour le Calcul pour la
    projection cylindrique conforme à axe oblique et pour la transformation entre
    des systèmes de référence.
    http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf
  */

        function somerc_init() {
          var phy0 = this.lat0
          this.lambda0 = this.long0
          var sinPhy0 = Math.sin(phy0)
          var semiMajorAxis = this.a
          var invF = this.rf
          var flattening = 1 / invF
          var e2 = 2 * flattening - Math.pow(flattening, 2)
          var e = (this.e = Math.sqrt(e2))
          this.R = (this.k0 * semiMajorAxis * Math.sqrt(1 - e2)) / (1 - e2 * Math.pow(sinPhy0, 2))
          this.alpha = Math.sqrt(1 + (e2 / (1 - e2)) * Math.pow(Math.cos(phy0), 4))
          this.b0 = Math.asin(sinPhy0 / this.alpha)
          var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2))
          var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2))
          var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0))
          this.K = k1 - this.alpha * k2 + ((this.alpha * e) / 2) * k3
        }

        function somerc_forward(p) {
          var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2))
          var Sa2 = (this.e / 2) * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)))
          var S = -this.alpha * (Sa1 + Sa2) + this.K

          // spheric latitude
          var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4)

          // spheric longitude
          var I = this.alpha * (p.x - this.lambda0)

          // psoeudo equatorial rotation
          var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)))

          var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I))

          p.y = (this.R / 2) * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0
          p.x = this.R * rotI + this.x0
          return p
        }

        function somerc_inverse(p) {
          var Y = p.x - this.x0
          var X = p.y - this.y0

          var rotI = Y / this.R
          var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4)

          var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI))
          var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)))

          var lambda = this.lambda0 + I / this.alpha

          var S = 0
          var phy = b
          var prevPhy = -1000
          var iteration = 0
          while (Math.abs(phy - prevPhy) > 0.0000001) {
            if (++iteration > 20) {
              //...reportError("omercFwdInfinity");
              return
            }
            //S = Math.log(Math.tan(Math.PI / 4 + phy / 2));
            S =
              (1 / this.alpha) * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) +
              this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2))
            prevPhy = phy
            phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2
          }

          p.x = lambda
          p.y = phy
          return p
        }

        var somerc_names = ["somerc"]
        /* harmony default export */ var somerc = {
          init: somerc_init,
          forward: somerc_forward,
          inverse: somerc_inverse,
          names: somerc_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/omerc.js

        var TOL = 1e-7

        function isTypeA(P) {
          var typeAProjections = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"]
          var projectionName = typeof P.PROJECTION === "object" ? Object.keys(P.PROJECTION)[0] : P.PROJECTION

          return "no_uoff" in P || "no_off" in P || typeAProjections.indexOf(projectionName) !== -1
        }

        /* Initialize the Oblique Mercator  projection
    ------------------------------------------*/
        function omerc_init() {
          var con,
            com,
            cosph0,
            D,
            F,
            H,
            L,
            sinph0,
            p,
            J,
            gamma = 0,
            gamma0,
            lamc = 0,
            lam1 = 0,
            lam2 = 0,
            phi1 = 0,
            phi2 = 0,
            alpha_c = 0,
            AB

          // only Type A uses the no_off or no_uoff property
          // https://github.com/OSGeo/proj.4/issues/104
          this.no_off = isTypeA(this)
          this.no_rot = "no_rot" in this

          var alp = false
          if ("alpha" in this) {
            alp = true
          }

          var gam = false
          if ("rectified_grid_angle" in this) {
            gam = true
          }

          if (alp) {
            alpha_c = this.alpha
          }

          if (gam) {
            gamma = this.rectified_grid_angle * D2R
          }

          if (alp || gam) {
            lamc = this.longc
          } else {
            lam1 = this.long1
            phi1 = this.lat1
            lam2 = this.long2
            phi2 = this.lat2

            if (
              Math.abs(phi1 - phi2) <= TOL ||
              (con = Math.abs(phi1)) <= TOL ||
              Math.abs(con - HALF_PI) <= TOL ||
              Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL ||
              Math.abs(Math.abs(phi2) - HALF_PI) <= TOL
            ) {
              throw new Error()
            }
          }

          var one_es = 1.0 - this.es
          com = Math.sqrt(one_es)

          if (Math.abs(this.lat0) > EPSLN) {
            sinph0 = Math.sin(this.lat0)
            cosph0 = Math.cos(this.lat0)
            con = 1 - this.es * sinph0 * sinph0
            this.B = cosph0 * cosph0
            this.B = Math.sqrt(1 + (this.es * this.B * this.B) / one_es)
            this.A = (this.B * this.k0 * com) / con
            D = (this.B * com) / (cosph0 * Math.sqrt(con))
            F = D * D - 1

            if (F <= 0) {
              F = 0
            } else {
              F = Math.sqrt(F)
              if (this.lat0 < 0) {
                F = -F
              }
            }

            this.E = F += D
            this.E *= Math.pow(tsfnz(this.e, this.lat0, sinph0), this.B)
          } else {
            this.B = 1 / com
            this.A = this.k0
            this.E = D = F = 1
          }

          if (alp || gam) {
            if (alp) {
              gamma0 = Math.asin(Math.sin(alpha_c) / D)
              if (!gam) {
                gamma = alpha_c
              }
            } else {
              gamma0 = gamma
              alpha_c = Math.asin(D * Math.sin(gamma0))
            }
            this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B
          } else {
            H = Math.pow(tsfnz(this.e, phi1, Math.sin(phi1)), this.B)
            L = Math.pow(tsfnz(this.e, phi2, Math.sin(phi2)), this.B)
            F = this.E / H
            p = (L - H) / (L + H)
            J = this.E * this.E
            J = (J - L * H) / (J + L * H)
            con = lam1 - lam2

            if (con < -Math.pi) {
              lam2 -= TWO_PI
            } else if (con > Math.pi) {
              lam2 += TWO_PI
            }

            this.lam0 = adjust_lon(0.5 * (lam1 + lam2) - Math.atan((J * Math.tan(0.5 * this.B * (lam1 - lam2))) / p) / this.B)
            gamma0 = Math.atan((2 * Math.sin(this.B * adjust_lon(lam1 - this.lam0))) / (F - 1 / F))
            gamma = alpha_c = Math.asin(D * Math.sin(gamma0))
          }

          this.singam = Math.sin(gamma0)
          this.cosgam = Math.cos(gamma0)
          this.sinrot = Math.sin(gamma)
          this.cosrot = Math.cos(gamma)

          this.rB = 1 / this.B
          this.ArB = this.A * this.rB
          this.BrA = 1 / this.ArB
          AB = this.A * this.B

          if (this.no_off) {
            this.u_0 = 0
          } else {
            this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)))

            if (this.lat0 < 0) {
              this.u_0 = -this.u_0
            }
          }

          F = 0.5 * gamma0
          this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F))
          this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F))
        }

        /* Oblique Mercator forward equations--mapping lat,long to x,y
    ----------------------------------------------------------*/
        function omerc_forward(p) {
          var coords = {}
          var S, T, U, V, W, temp, u, v
          p.x = p.x - this.lam0

          if (Math.abs(Math.abs(p.y) - HALF_PI) > EPSLN) {
            W = this.E / Math.pow(tsfnz(this.e, p.y, Math.sin(p.y)), this.B)

            temp = 1 / W
            S = 0.5 * (W - temp)
            T = 0.5 * (W + temp)
            V = Math.sin(this.B * p.x)
            U = (S * this.singam - V * this.cosgam) / T

            if (Math.abs(Math.abs(U) - 1.0) < EPSLN) {
              throw new Error()
            }

            v = 0.5 * this.ArB * Math.log((1 - U) / (1 + U))
            temp = Math.cos(this.B * p.x)

            if (Math.abs(temp) < TOL) {
              u = this.A * p.x
            } else {
              u = this.ArB * Math.atan2(S * this.cosgam + V * this.singam, temp)
            }
          } else {
            v = p.y > 0 ? this.v_pole_n : this.v_pole_s
            u = this.ArB * p.y
          }

          if (this.no_rot) {
            coords.x = u
            coords.y = v
          } else {
            u -= this.u_0
            coords.x = v * this.cosrot + u * this.sinrot
            coords.y = u * this.cosrot - v * this.sinrot
          }

          coords.x = this.a * coords.x + this.x0
          coords.y = this.a * coords.y + this.y0

          return coords
        }

        function omerc_inverse(p) {
          var u, v, Qp, Sp, Tp, Vp, Up
          var coords = {}

          p.x = (p.x - this.x0) * (1.0 / this.a)
          p.y = (p.y - this.y0) * (1.0 / this.a)

          if (this.no_rot) {
            v = p.y
            u = p.x
          } else {
            v = p.x * this.cosrot - p.y * this.sinrot
            u = p.y * this.cosrot + p.x * this.sinrot + this.u_0
          }

          Qp = Math.exp(-this.BrA * v)
          Sp = 0.5 * (Qp - 1 / Qp)
          Tp = 0.5 * (Qp + 1 / Qp)
          Vp = Math.sin(this.BrA * u)
          Up = (Vp * this.cosgam + Sp * this.singam) / Tp

          if (Math.abs(Math.abs(Up) - 1) < EPSLN) {
            coords.x = 0
            coords.y = Up < 0 ? -HALF_PI : HALF_PI
          } else {
            coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up))
            coords.y = phi2z(this.e, Math.pow(coords.y, 1 / this.B))

            if (coords.y === Infinity) {
              throw new Error()
            }

            coords.x = -this.rB * Math.atan2(Sp * this.cosgam - Vp * this.singam, Math.cos(this.BrA * u))
          }

          coords.x += this.lam0

          return coords
        }

        var omerc_names = [
          "Hotine_Oblique_Mercator",
          "Hotine Oblique Mercator",
          "Hotine_Oblique_Mercator_Azimuth_Natural_Origin",
          "Hotine_Oblique_Mercator_Two_Point_Natural_Origin",
          "Hotine_Oblique_Mercator_Azimuth_Center",
          "Oblique_Mercator",
          "omerc"
        ]
        /* harmony default export */ var omerc = {
          init: omerc_init,
          forward: omerc_forward,
          inverse: omerc_inverse,
          names: omerc_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/lcc.js

        function lcc_init() {
          //double lat0;                    /* the reference latitude               */
          //double long0;                   /* the reference longitude              */
          //double lat1;                    /* first standard parallel              */
          //double lat2;                    /* second standard parallel             */
          //double r_maj;                   /* major axis                           */
          //double r_min;                   /* minor axis                           */
          //double false_east;              /* x offset in meters                   */
          //double false_north;             /* y offset in meters                   */

          //the above value can be set with proj4.defs
          //example: proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

          if (!this.lat2) {
            this.lat2 = this.lat1
          } //if lat2 is not defined
          if (!this.k0) {
            this.k0 = 1
          }
          this.x0 = this.x0 || 0
          this.y0 = this.y0 || 0
          // Standard Parallels cannot be equal and on opposite sides of the equator
          if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
            return
          }

          var temp = this.b / this.a
          this.e = Math.sqrt(1 - temp * temp)

          var sin1 = Math.sin(this.lat1)
          var cos1 = Math.cos(this.lat1)
          var ms1 = msfnz(this.e, sin1, cos1)
          var ts1 = tsfnz(this.e, this.lat1, sin1)

          var sin2 = Math.sin(this.lat2)
          var cos2 = Math.cos(this.lat2)
          var ms2 = msfnz(this.e, sin2, cos2)
          var ts2 = tsfnz(this.e, this.lat2, sin2)

          var ts0 = tsfnz(this.e, this.lat0, Math.sin(this.lat0))

          if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
            this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2)
          } else {
            this.ns = sin1
          }
          if (isNaN(this.ns)) {
            this.ns = sin1
          }
          this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns))
          this.rh = this.a * this.f0 * Math.pow(ts0, this.ns)
          if (!this.title) {
            this.title = "Lambert Conformal Conic"
          }
        }

        // Lambert Conformal conic forward equations--mapping lat,long to x,y
        // -----------------------------------------------------------------
        function lcc_forward(p) {
          var lon = p.x
          var lat = p.y

          // singular cases :
          if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
            lat = sign(lat) * (HALF_PI - 2 * EPSLN)
          }

          var con = Math.abs(Math.abs(lat) - HALF_PI)
          var ts, rh1
          if (con > EPSLN) {
            ts = tsfnz(this.e, lat, Math.sin(lat))
            rh1 = this.a * this.f0 * Math.pow(ts, this.ns)
          } else {
            con = lat * this.ns
            if (con <= 0) {
              return null
            }
            rh1 = 0
          }
          var theta = this.ns * adjust_lon(lon - this.long0)
          p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0
          p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0

          return p
        }

        // Lambert Conformal Conic inverse equations--mapping x,y to lat/long
        // -----------------------------------------------------------------
        function lcc_inverse(p) {
          var rh1, con, ts
          var lat, lon
          var x = (p.x - this.x0) / this.k0
          var y = this.rh - (p.y - this.y0) / this.k0
          if (this.ns > 0) {
            rh1 = Math.sqrt(x * x + y * y)
            con = 1
          } else {
            rh1 = -Math.sqrt(x * x + y * y)
            con = -1
          }
          var theta = 0
          if (rh1 !== 0) {
            theta = Math.atan2(con * x, con * y)
          }
          if (rh1 !== 0 || this.ns > 0) {
            con = 1 / this.ns
            ts = Math.pow(rh1 / (this.a * this.f0), con)
            lat = phi2z(this.e, ts)
            if (lat === -9999) {
              return null
            }
          } else {
            lat = -HALF_PI
          }
          lon = adjust_lon(theta / this.ns + this.long0)

          p.x = lon
          p.y = lat
          return p
        }

        var lcc_names = [
          "Lambert Tangential Conformal Conic Projection",
          "Lambert_Conformal_Conic",
          "Lambert_Conformal_Conic_1SP",
          "Lambert_Conformal_Conic_2SP",
          "lcc",
          "Lambert Conic Conformal (1SP)",
          "Lambert Conic Conformal (2SP)"
        ]

        /* harmony default export */ var lcc = {
          init: lcc_init,
          forward: lcc_forward,
          inverse: lcc_inverse,
          names: lcc_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/krovak.js

        function krovak_init() {
          this.a = 6377397.155
          this.es = 0.006674372230614
          this.e = Math.sqrt(this.es)
          if (!this.lat0) {
            this.lat0 = 0.863937979737193
          }
          if (!this.long0) {
            this.long0 = 0.7417649320975901 - 0.308341501185665
          }
          /* if scale not set default to 0.9999 */
          if (!this.k0) {
            this.k0 = 0.9999
          }
          this.s45 = 0.785398163397448 /* 45 */
          this.s90 = 2 * this.s45
          this.fi0 = this.lat0
          this.e2 = this.es
          this.e = Math.sqrt(this.e2)
          this.alfa = Math.sqrt(1 + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2))
          this.uq = 1.04216856380474
          this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa)
          this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), (this.alfa * this.e) / 2)
          this.k = (Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa)) * this.g
          this.k1 = this.k0
          this.n0 = (this.a * Math.sqrt(1 - this.e2)) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2))
          this.s0 = 1.37008346281555
          this.n = Math.sin(this.s0)
          this.ro0 = (this.k1 * this.n0) / Math.tan(this.s0)
          this.ad = this.s90 - this.uq
        }

        /* ellipsoid */
        /* calculate xy from lat/lon */
        /* Constants, identical to inverse transform function */
        function krovak_forward(p) {
          var gfi, u, deltav, s, d, eps, ro
          var lon = p.x
          var lat = p.y
          var delta_lon = adjust_lon(lon - this.long0)
          /* Transformation */
          gfi = Math.pow((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat)), (this.alfa * this.e) / 2)
          u = 2 * (Math.atan((this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa)) / gfi) - this.s45)
          deltav = -delta_lon * this.alfa
          s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav))
          d = Math.asin((Math.cos(u) * Math.sin(deltav)) / Math.cos(s))
          eps = this.n * d
          ro = (this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n)) / Math.pow(Math.tan(s / 2 + this.s45), this.n)
          p.y = (ro * Math.cos(eps)) / 1
          p.x = (ro * Math.sin(eps)) / 1

          if (!this.czech) {
            p.y *= -1
            p.x *= -1
          }
          return p
        }

        /* calculate lat/lon from xy */
        function krovak_inverse(p) {
          var u, deltav, s, d, eps, ro, fi1
          var ok

          /* Transformation */
          /* revert y, x*/
          var tmp = p.x
          p.x = p.y
          p.y = tmp
          if (!this.czech) {
            p.y *= -1
            p.x *= -1
          }
          ro = Math.sqrt(p.x * p.x + p.y * p.y)
          eps = Math.atan2(p.y, p.x)
          d = eps / Math.sin(this.s0)
          s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45)
          u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d))
          deltav = Math.asin((Math.cos(s) * Math.sin(d)) / Math.cos(u))
          p.x = this.long0 - deltav / this.alfa
          fi1 = u
          ok = 0
          var iter = 0
          do {
            p.y =
              2 *
              (Math.atan(
                Math.pow(this.k, -1 / this.alfa) *
                  Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) *
                  Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)
              ) -
                this.s45)
            if (Math.abs(fi1 - p.y) < 0.0000000001) {
              ok = 1
            }
            fi1 = p.y
            iter += 1
          } while (ok === 0 && iter < 15)
          if (iter >= 15) {
            return null
          }

          return p
        }

        var krovak_names = ["Krovak", "krovak"]
        /* harmony default export */ var krovak = {
          init: krovak_init,
          forward: krovak_forward,
          inverse: krovak_inverse,
          names: krovak_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/mlfn.js
        /* harmony default export */ var mlfn = function (e0, e1, e2, e3, phi) {
          return e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi)
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/e0fn.js
        /* harmony default export */ var e0fn = function (x) {
          return 1 - 0.25 * x * (1 + (x / 16) * (3 + 1.25 * x))
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/e1fn.js
        /* harmony default export */ var e1fn = function (x) {
          return 0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x))
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/e2fn.js
        /* harmony default export */ var e2fn = function (x) {
          return 0.05859375 * x * x * (1 + 0.75 * x)
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/e3fn.js
        /* harmony default export */ var e3fn = function (x) {
          return x * x * x * (35 / 3072)
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/gN.js
        /* harmony default export */ var gN = function (a, e, sinphi) {
          var temp = e * sinphi
          return a / Math.sqrt(1 - temp * temp)
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/adjust_lat.js

        /* harmony default export */ var adjust_lat = function (x) {
          return Math.abs(x) < HALF_PI ? x : x - sign(x) * Math.PI
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/imlfn.js
        /* harmony default export */ var imlfn = function (ml, e0, e1, e2, e3) {
          var phi
          var dphi

          phi = ml / e0
          for (var i = 0; i < 15; i++) {
            dphi =
              (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) /
              (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi))
            phi += dphi
            if (Math.abs(dphi) <= 0.0000000001) {
              return phi
            }
          }

          //..reportError("IMLFN-CONV:Latitude failed to converge after 15 iterations");
          return NaN
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/cass.js

        function cass_init() {
          if (!this.sphere) {
            this.e0 = e0fn(this.es)
            this.e1 = e1fn(this.es)
            this.e2 = e2fn(this.es)
            this.e3 = e3fn(this.es)
            this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0)
          }
        }

        /* Cassini forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
        function cass_forward(p) {
          /* Forward equations
      -----------------*/
          var x, y
          var lam = p.x
          var phi = p.y
          lam = adjust_lon(lam - this.long0)

          if (this.sphere) {
            x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam))
            y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0)
          } else {
            //ellipsoid
            var sinphi = Math.sin(phi)
            var cosphi = Math.cos(phi)
            var nl = gN(this.a, this.e, sinphi)
            var tl = Math.tan(phi) * Math.tan(phi)
            var al = lam * Math.cos(phi)
            var asq = al * al
            var cl = (this.es * cosphi * cosphi) / (1 - this.es)
            var ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi)

            x = nl * al * (1 - asq * tl * (1 / 6 - ((8 - tl + 8 * cl) * asq) / 120))
            y = ml - this.ml0 + ((nl * sinphi) / cosphi) * asq * (0.5 + ((5 - tl + 6 * cl) * asq) / 24)
          }

          p.x = x + this.x0
          p.y = y + this.y0
          return p
        }

        /* Inverse equations
  -----------------*/
        function cass_inverse(p) {
          p.x -= this.x0
          p.y -= this.y0
          var x = p.x / this.a
          var y = p.y / this.a
          var phi, lam

          if (this.sphere) {
            var dd = y + this.lat0
            phi = Math.asin(Math.sin(dd) * Math.cos(x))
            lam = Math.atan2(Math.tan(x), Math.cos(dd))
          } else {
            /* ellipsoid */
            var ml1 = this.ml0 / this.a + y
            var phi1 = imlfn(ml1, this.e0, this.e1, this.e2, this.e3)
            if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
              p.x = this.long0
              p.y = HALF_PI
              if (y < 0) {
                p.y *= -1
              }
              return p
            }
            var nl1 = gN(this.a, this.e, Math.sin(phi1))

            var rl1 = ((nl1 * nl1 * nl1) / this.a / this.a) * (1 - this.es)
            var tl1 = Math.pow(Math.tan(phi1), 2)
            var dl = (x * this.a) / nl1
            var dsq = dl * dl
            phi = phi1 - ((nl1 * Math.tan(phi1)) / rl1) * dl * dl * (0.5 - ((1 + 3 * tl1) * dl * dl) / 24)
            lam = (dl * (1 - dsq * (tl1 / 3 + ((1 + 3 * tl1) * tl1 * dsq) / 15))) / Math.cos(phi1)
          }

          p.x = adjust_lon(lam + this.long0)
          p.y = adjust_lat(phi)
          return p
        }

        var cass_names = ["Cassini", "Cassini_Soldner", "cass"]
        /* harmony default export */ var cass = {
          init: cass_init,
          forward: cass_forward,
          inverse: cass_inverse,
          names: cass_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/qsfnz.js
        /* harmony default export */ var qsfnz = function (eccent, sinphi) {
          var con
          if (eccent > 1.0e-7) {
            con = eccent * sinphi
            return (1 - eccent * eccent) * (sinphi / (1 - con * con) - (0.5 / eccent) * Math.log((1 - con) / (1 + con)))
          } else {
            return 2 * sinphi
          }
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/laea.js

        /*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */

        var S_POLE = 1

        var N_POLE = 2
        var EQUIT = 3
        var OBLIQ = 4

        /* Initialize the Lambert Azimuthal Equal Area projection
  ------------------------------------------------------*/
        function laea_init() {
          var t = Math.abs(this.lat0)
          if (Math.abs(t - HALF_PI) < EPSLN) {
            this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE
          } else if (Math.abs(t) < EPSLN) {
            this.mode = this.EQUIT
          } else {
            this.mode = this.OBLIQ
          }
          if (this.es > 0) {
            var sinphi

            this.qp = qsfnz(this.e, 1)
            this.mmf = 0.5 / (1 - this.es)
            this.apa = authset(this.es)
            switch (this.mode) {
              case this.N_POLE:
                this.dd = 1
                break
              case this.S_POLE:
                this.dd = 1
                break
              case this.EQUIT:
                this.rq = Math.sqrt(0.5 * this.qp)
                this.dd = 1 / this.rq
                this.xmf = 1
                this.ymf = 0.5 * this.qp
                break
              case this.OBLIQ:
                this.rq = Math.sqrt(0.5 * this.qp)
                sinphi = Math.sin(this.lat0)
                this.sinb1 = qsfnz(this.e, sinphi) / this.qp
                this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1)
                this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1)
                this.ymf = (this.xmf = this.rq) / this.dd
                this.xmf *= this.dd
                break
            }
          } else {
            if (this.mode === this.OBLIQ) {
              this.sinph0 = Math.sin(this.lat0)
              this.cosph0 = Math.cos(this.lat0)
            }
          }
        }

        /* Lambert Azimuthal Equal Area forward equations--mapping lat,long to x,y
  -----------------------------------------------------------------------*/
        function laea_forward(p) {
          /* Forward equations
      -----------------*/
          var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi
          var lam = p.x
          var phi = p.y

          lam = adjust_lon(lam - this.long0)
          if (this.sphere) {
            sinphi = Math.sin(phi)
            cosphi = Math.cos(phi)
            coslam = Math.cos(lam)
            if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
              y = this.mode === this.EQUIT ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam
              if (y <= EPSLN) {
                return null
              }
              y = Math.sqrt(2 / y)
              x = y * cosphi * Math.sin(lam)
              y *= this.mode === this.EQUIT ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam
            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
              if (this.mode === this.N_POLE) {
                coslam = -coslam
              }
              if (Math.abs(phi + this.lat0) < EPSLN) {
                return null
              }
              y = FORTPI - phi * 0.5
              y = 2 * (this.mode === this.S_POLE ? Math.cos(y) : Math.sin(y))
              x = y * Math.sin(lam)
              y *= coslam
            }
          } else {
            sinb = 0
            cosb = 0
            b = 0
            coslam = Math.cos(lam)
            sinlam = Math.sin(lam)
            sinphi = Math.sin(phi)
            q = qsfnz(this.e, sinphi)
            if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
              sinb = q / this.qp
              cosb = Math.sqrt(1 - sinb * sinb)
            }
            switch (this.mode) {
              case this.OBLIQ:
                b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam
                break
              case this.EQUIT:
                b = 1 + cosb * coslam
                break
              case this.N_POLE:
                b = HALF_PI + phi
                q = this.qp - q
                break
              case this.S_POLE:
                b = phi - HALF_PI
                q = this.qp + q
                break
            }
            if (Math.abs(b) < EPSLN) {
              return null
            }
            switch (this.mode) {
              case this.OBLIQ:
              case this.EQUIT:
                b = Math.sqrt(2 / b)
                if (this.mode === this.OBLIQ) {
                  y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam)
                } else {
                  y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf
                }
                x = this.xmf * b * cosb * sinlam
                break
              case this.N_POLE:
              case this.S_POLE:
                if (q >= 0) {
                  x = (b = Math.sqrt(q)) * sinlam
                  y = coslam * (this.mode === this.S_POLE ? b : -b)
                } else {
                  x = y = 0
                }
                break
            }
          }

          p.x = this.a * x + this.x0
          p.y = this.a * y + this.y0
          return p
        }

        /* Inverse equations
  -----------------*/
        function laea_inverse(p) {
          p.x -= this.x0
          p.y -= this.y0
          var x = p.x / this.a
          var y = p.y / this.a
          var lam, phi, cCe, sCe, q, rho, ab
          if (this.sphere) {
            var cosz = 0,
              rh,
              sinz = 0

            rh = Math.sqrt(x * x + y * y)
            phi = rh * 0.5
            if (phi > 1) {
              return null
            }
            phi = 2 * Math.asin(phi)
            if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
              sinz = Math.sin(phi)
              cosz = Math.cos(phi)
            }
            switch (this.mode) {
              case this.EQUIT:
                phi = Math.abs(rh) <= EPSLN ? 0 : Math.asin((y * sinz) / rh)
                x *= sinz
                y = cosz * rh
                break
              case this.OBLIQ:
                phi = Math.abs(rh) <= EPSLN ? this.lat0 : Math.asin(cosz * this.sinph0 + (y * sinz * this.cosph0) / rh)
                x *= sinz * this.cosph0
                y = (cosz - Math.sin(phi) * this.sinph0) * rh
                break
              case this.N_POLE:
                y = -y
                phi = HALF_PI - phi
                break
              case this.S_POLE:
                phi -= HALF_PI
                break
            }
            lam = y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(x, y)
          } else {
            ab = 0
            if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
              x /= this.dd
              y *= this.dd
              rho = Math.sqrt(x * x + y * y)
              if (rho < EPSLN) {
                p.x = this.long0
                p.y = this.lat0
                return p
              }
              sCe = 2 * Math.asin((0.5 * rho) / this.rq)
              cCe = Math.cos(sCe)
              x *= sCe = Math.sin(sCe)
              if (this.mode === this.OBLIQ) {
                ab = cCe * this.sinb1 + (y * sCe * this.cosb1) / rho
                q = this.qp * ab
                y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe
              } else {
                ab = (y * sCe) / rho
                q = this.qp * ab
                y = rho * cCe
              }
            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
              if (this.mode === this.N_POLE) {
                y = -y
              }
              q = x * x + y * y
              if (!q) {
                p.x = this.long0
                p.y = this.lat0
                return p
              }
              ab = 1 - q / this.qp
              if (this.mode === this.S_POLE) {
                ab = -ab
              }
            }
            lam = Math.atan2(x, y)
            phi = authlat(Math.asin(ab), this.apa)
          }

          p.x = adjust_lon(this.long0 + lam)
          p.y = phi
          return p
        }

        /* determine latitude from authalic latitude */
        var P00 = 0.33333333333333333333

        var P01 = 0.17222222222222222222
        var P02 = 0.10257936507936507936
        var P10 = 0.06388888888888888888
        var P11 = 0.06640211640211640211
        var P20 = 0.01641501294219154443

        function authset(es) {
          var t
          var APA = []
          APA[0] = es * P00
          t = es * es
          APA[0] += t * P01
          APA[1] = t * P10
          t *= es
          APA[0] += t * P02
          APA[1] += t * P11
          APA[2] = t * P20
          return APA
        }

        function authlat(beta, APA) {
          var t = beta + beta
          return beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t)
        }

        var laea_names = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"]
        /* harmony default export */ var laea = {
          init: laea_init,
          forward: laea_forward,
          inverse: laea_inverse,
          names: laea_names,
          S_POLE: S_POLE,
          N_POLE: N_POLE,
          EQUIT: EQUIT,
          OBLIQ: OBLIQ
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/asinz.js
        /* harmony default export */ var asinz = function (x) {
          if (Math.abs(x) > 1) {
            x = x > 1 ? 1 : -1
          }
          return Math.asin(x)
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/aea.js

        function aea_init() {
          if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
            return
          }
          this.temp = this.b / this.a
          this.es = 1 - Math.pow(this.temp, 2)
          this.e3 = Math.sqrt(this.es)

          this.sin_po = Math.sin(this.lat1)
          this.cos_po = Math.cos(this.lat1)
          this.t1 = this.sin_po
          this.con = this.sin_po
          this.ms1 = msfnz(this.e3, this.sin_po, this.cos_po)
          this.qs1 = qsfnz(this.e3, this.sin_po, this.cos_po)

          this.sin_po = Math.sin(this.lat2)
          this.cos_po = Math.cos(this.lat2)
          this.t2 = this.sin_po
          this.ms2 = msfnz(this.e3, this.sin_po, this.cos_po)
          this.qs2 = qsfnz(this.e3, this.sin_po, this.cos_po)

          this.sin_po = Math.sin(this.lat0)
          this.cos_po = Math.cos(this.lat0)
          this.t3 = this.sin_po
          this.qs0 = qsfnz(this.e3, this.sin_po, this.cos_po)

          if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
            this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1)
          } else {
            this.ns0 = this.con
          }
          this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1
          this.rh = (this.a * Math.sqrt(this.c - this.ns0 * this.qs0)) / this.ns0
        }

        /* Albers Conical Equal Area forward equations--mapping lat,long to x,y
  -------------------------------------------------------------------*/
        function aea_forward(p) {
          var lon = p.x
          var lat = p.y

          this.sin_phi = Math.sin(lat)
          this.cos_phi = Math.cos(lat)

          var qs = qsfnz(this.e3, this.sin_phi, this.cos_phi)
          var rh1 = (this.a * Math.sqrt(this.c - this.ns0 * qs)) / this.ns0
          var theta = this.ns0 * adjust_lon(lon - this.long0)
          var x = rh1 * Math.sin(theta) + this.x0
          var y = this.rh - rh1 * Math.cos(theta) + this.y0

          p.x = x
          p.y = y
          return p
        }

        function aea_inverse(p) {
          var rh1, qs, con, theta, lon, lat

          p.x -= this.x0
          p.y = this.rh - p.y + this.y0
          if (this.ns0 >= 0) {
            rh1 = Math.sqrt(p.x * p.x + p.y * p.y)
            con = 1
          } else {
            rh1 = -Math.sqrt(p.x * p.x + p.y * p.y)
            con = -1
          }
          theta = 0
          if (rh1 !== 0) {
            theta = Math.atan2(con * p.x, con * p.y)
          }
          con = (rh1 * this.ns0) / this.a
          if (this.sphere) {
            lat = Math.asin((this.c - con * con) / (2 * this.ns0))
          } else {
            qs = (this.c - con * con) / this.ns0
            lat = this.phi1z(this.e3, qs)
          }

          lon = adjust_lon(theta / this.ns0 + this.long0)
          p.x = lon
          p.y = lat
          return p
        }

        /* Function to compute phi1, the latitude for the inverse of the
   Albers Conical Equal-Area projection.
-------------------------------------------*/
        function phi1z(eccent, qs) {
          var sinphi, cosphi, con, com, dphi
          var phi = asinz(0.5 * qs)
          if (eccent < EPSLN) {
            return phi
          }

          var eccnts = eccent * eccent
          for (var i = 1; i <= 25; i++) {
            sinphi = Math.sin(phi)
            cosphi = Math.cos(phi)
            con = eccent * sinphi
            com = 1 - con * con
            dphi = ((0.5 * com * com) / cosphi) * (qs / (1 - eccnts) - sinphi / com + (0.5 / eccent) * Math.log((1 - con) / (1 + con)))
            phi = phi + dphi
            if (Math.abs(dphi) <= 1e-7) {
              return phi
            }
          }
          return null
        }

        var aea_names = ["Albers_Conic_Equal_Area", "Albers", "aea"]
        /* harmony default export */ var aea = {
          init: aea_init,
          forward: aea_forward,
          inverse: aea_inverse,
          names: aea_names,
          phi1z: phi1z
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/gnom.js

        /*
  reference:
    Wolfram Mathworld "Gnomonic Projection"
    http://mathworld.wolfram.com/GnomonicProjection.html
    Accessed: 12th November 2009
  */
        function gnom_init() {
          /* Place parameters in static storage for common use
      -------------------------------------------------*/
          this.sin_p14 = Math.sin(this.lat0)
          this.cos_p14 = Math.cos(this.lat0)
          // Approximation for projecting points to the horizon (infinity)
          this.infinity_dist = 1000 * this.a
          this.rc = 1
        }

        /* Gnomonic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
        function gnom_forward(p) {
          var sinphi, cosphi /* sin and cos value        */
          var dlon /* delta longitude value      */
          var coslon /* cos of longitude        */
          var ksp /* scale factor          */
          var g
          var x, y
          var lon = p.x
          var lat = p.y
          /* Forward equations
      -----------------*/
          dlon = adjust_lon(lon - this.long0)

          sinphi = Math.sin(lat)
          cosphi = Math.cos(lat)

          coslon = Math.cos(dlon)
          g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon
          ksp = 1
          if (g > 0 || Math.abs(g) <= EPSLN) {
            x = this.x0 + (this.a * ksp * cosphi * Math.sin(dlon)) / g
            y = this.y0 + (this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon)) / g
          } else {
            // Point is in the opposing hemisphere and is unprojectable
            // We still need to return a reasonable point, so we project
            // to infinity, on a bearing
            // equivalent to the northern hemisphere equivalent
            // This is a reasonable approximation for short shapes and lines that
            // straddle the horizon.

            x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon)
            y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon)
          }
          p.x = x
          p.y = y
          return p
        }

        function gnom_inverse(p) {
          var rh /* Rho */
          var sinc, cosc
          var c
          var lon, lat

          /* Inverse equations
      -----------------*/
          p.x = (p.x - this.x0) / this.a
          p.y = (p.y - this.y0) / this.a

          p.x /= this.k0
          p.y /= this.k0

          if ((rh = Math.sqrt(p.x * p.x + p.y * p.y))) {
            c = Math.atan2(rh, this.rc)
            sinc = Math.sin(c)
            cosc = Math.cos(c)

            lat = asinz(cosc * this.sin_p14 + (p.y * sinc * this.cos_p14) / rh)
            lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc)
            lon = adjust_lon(this.long0 + lon)
          } else {
            lat = this.phic0
            lon = 0
          }

          p.x = lon
          p.y = lat
          return p
        }

        var gnom_names = ["gnom"]
        /* harmony default export */ var gnom = {
          init: gnom_init,
          forward: gnom_forward,
          inverse: gnom_inverse,
          names: gnom_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/common/iqsfnz.js

        /* harmony default export */ var iqsfnz = function (eccent, q) {
          var temp = 1 - ((1 - eccent * eccent) / (2 * eccent)) * Math.log((1 - eccent) / (1 + eccent))
          if (Math.abs(Math.abs(q) - temp) < 1.0e-6) {
            if (q < 0) {
              return -1 * HALF_PI
            } else {
              return HALF_PI
            }
          }
          //var phi = 0.5* q/(1-eccent*eccent);
          var phi = Math.asin(0.5 * q)
          var dphi
          var sin_phi
          var cos_phi
          var con
          for (var i = 0; i < 30; i++) {
            sin_phi = Math.sin(phi)
            cos_phi = Math.cos(phi)
            con = eccent * sin_phi
            dphi =
              (Math.pow(1 - con * con, 2) / (2 * cos_phi)) *
              (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + (0.5 / eccent) * Math.log((1 - con) / (1 + con)))
            phi += dphi
            if (Math.abs(dphi) <= 0.0000000001) {
              return phi
            }
          }

          //console.log("IQSFN-CONV:Latitude failed to converge after 30 iterations");
          return NaN
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/cea.js

        /*
  reference:
    "Cartographic Projection Procedures for the UNIX Environment-
    A User's Manual" by Gerald I. Evenden,
    USGS Open File Report 90-284and Release 4 Interim Reports (2003)
*/
        function cea_init() {
          //no-op
          if (!this.sphere) {
            this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts))
          }
        }

        /* Cylindrical Equal Area forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
        function cea_forward(p) {
          var lon = p.x
          var lat = p.y
          var x, y
          /* Forward equations
      -----------------*/
          var dlon = adjust_lon(lon - this.long0)
          if (this.sphere) {
            x = this.x0 + this.a * dlon * Math.cos(this.lat_ts)
            y = this.y0 + (this.a * Math.sin(lat)) / Math.cos(this.lat_ts)
          } else {
            var qs = qsfnz(this.e, Math.sin(lat))
            x = this.x0 + this.a * this.k0 * dlon
            y = this.y0 + (this.a * qs * 0.5) / this.k0
          }

          p.x = x
          p.y = y
          return p
        }

        /* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
        function cea_inverse(p) {
          p.x -= this.x0
          p.y -= this.y0
          var lon, lat

          if (this.sphere) {
            lon = adjust_lon(this.long0 + p.x / this.a / Math.cos(this.lat_ts))
            lat = Math.asin((p.y / this.a) * Math.cos(this.lat_ts))
          } else {
            lat = iqsfnz(this.e, (2 * p.y * this.k0) / this.a)
            lon = adjust_lon(this.long0 + p.x / (this.a * this.k0))
          }

          p.x = lon
          p.y = lat
          return p
        }

        var cea_names = ["cea"]
        /* harmony default export */ var cea = {
          init: cea_init,
          forward: cea_forward,
          inverse: cea_inverse,
          names: cea_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/eqc.js

        function eqc_init() {
          this.x0 = this.x0 || 0
          this.y0 = this.y0 || 0
          this.lat0 = this.lat0 || 0
          this.long0 = this.long0 || 0
          this.lat_ts = this.lat_ts || 0
          this.title = this.title || "Equidistant Cylindrical (Plate Carre)"

          this.rc = Math.cos(this.lat_ts)
        }

        // forward equations--mapping lat,long to x,y
        // -----------------------------------------------------------------
        function eqc_forward(p) {
          var lon = p.x
          var lat = p.y

          var dlon = adjust_lon(lon - this.long0)
          var dlat = adjust_lat(lat - this.lat0)
          p.x = this.x0 + this.a * dlon * this.rc
          p.y = this.y0 + this.a * dlat
          return p
        }

        // inverse equations--mapping x,y to lat/long
        // -----------------------------------------------------------------
        function eqc_inverse(p) {
          var x = p.x
          var y = p.y

          p.x = adjust_lon(this.long0 + (x - this.x0) / (this.a * this.rc))
          p.y = adjust_lat(this.lat0 + (y - this.y0) / this.a)
          return p
        }

        var eqc_names = ["Equirectangular", "Equidistant_Cylindrical", "eqc"]
        /* harmony default export */ var eqc = {
          init: eqc_init,
          forward: eqc_forward,
          inverse: eqc_inverse,
          names: eqc_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/poly.js

        var poly_MAX_ITER = 20

        function poly_init() {
          /* Place parameters in static storage for common use
      -------------------------------------------------*/
          this.temp = this.b / this.a
          this.es = 1 - Math.pow(this.temp, 2) // devait etre dans tmerc.js mais n y est pas donc je commente sinon retour de valeurs nulles
          this.e = Math.sqrt(this.es)
          this.e0 = e0fn(this.es)
          this.e1 = e1fn(this.es)
          this.e2 = e2fn(this.es)
          this.e3 = e3fn(this.es)
          this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0) //si que des zeros le calcul ne se fait pas
        }

        /* Polyconic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
        function poly_forward(p) {
          var lon = p.x
          var lat = p.y
          var x, y, el
          var dlon = adjust_lon(lon - this.long0)
          el = dlon * Math.sin(lat)
          if (this.sphere) {
            if (Math.abs(lat) <= EPSLN) {
              x = this.a * dlon
              y = -1 * this.a * this.lat0
            } else {
              x = (this.a * Math.sin(el)) / Math.tan(lat)
              y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat))
            }
          } else {
            if (Math.abs(lat) <= EPSLN) {
              x = this.a * dlon
              y = -1 * this.ml0
            } else {
              var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat)
              x = nl * Math.sin(el)
              y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el))
            }
          }
          p.x = x + this.x0
          p.y = y + this.y0
          return p
        }

        /* Inverse equations
  -----------------*/
        function poly_inverse(p) {
          var lon, lat, x, y, i
          var al, bl
          var phi, dphi
          x = p.x - this.x0
          y = p.y - this.y0

          if (this.sphere) {
            if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
              lon = adjust_lon(x / this.a + this.long0)
              lat = 0
            } else {
              al = this.lat0 + y / this.a
              bl = (x * x) / this.a / this.a + al * al
              phi = al
              var tanphi
              for (i = poly_MAX_ITER; i; --i) {
                tanphi = Math.tan(phi)
                dphi = (-1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi)) / ((phi - al) / tanphi - 1)
                phi += dphi
                if (Math.abs(dphi) <= EPSLN) {
                  lat = phi
                  break
                }
              }
              lon = adjust_lon(this.long0 + Math.asin((x * Math.tan(phi)) / this.a) / Math.sin(lat))
            }
          } else {
            if (Math.abs(y + this.ml0) <= EPSLN) {
              lat = 0
              lon = adjust_lon(this.long0 + x / this.a)
            } else {
              al = (this.ml0 + y) / this.a
              bl = (x * x) / this.a / this.a + al * al
              phi = al
              var cl, mln, mlnp, ma
              var con
              for (i = poly_MAX_ITER; i; --i) {
                con = this.e * Math.sin(phi)
                cl = Math.sqrt(1 - con * con) * Math.tan(phi)
                mln = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi)
                mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi)
                ma = mln / this.a
                dphi =
                  (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) /
                  ((this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma)) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp)
                phi -= dphi
                if (Math.abs(dphi) <= EPSLN) {
                  lat = phi
                  break
                }
              }

              //lat=phi4z(this.e,this.e0,this.e1,this.e2,this.e3,al,bl,0,0);
              cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat)
              lon = adjust_lon(this.long0 + Math.asin((x * cl) / this.a) / Math.sin(lat))
            }
          }

          p.x = lon
          p.y = lat
          return p
        }

        var poly_names = ["Polyconic", "poly"]
        /* harmony default export */ var poly = {
          init: poly_init,
          forward: poly_forward,
          inverse: poly_inverse,
          names: poly_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/nzmg.js

        /*
  reference
    Department of Land and Survey Technical Circular 1973/32
      http://www.linz.govt.nz/docs/miscellaneous/nz-map-definition.pdf
    OSG Technical Report 4.1
      http://www.linz.govt.nz/docs/miscellaneous/nzmg.pdf
  */

        /**
         * iterations: Number of iterations to refine inverse transform.
         *     0 -> km accuracy
         *     1 -> m accuracy -- suitable for most mapping applications
         *     2 -> mm accuracy
         */
        var iterations = 1

        function nzmg_init() {
          this.A = []
          this.A[1] = 0.6399175073
          this.A[2] = -0.1358797613
          this.A[3] = 0.063294409
          this.A[4] = -0.02526853
          this.A[5] = 0.0117879
          this.A[6] = -0.0055161
          this.A[7] = 0.0026906
          this.A[8] = -0.001333
          this.A[9] = 0.00067
          this.A[10] = -0.00034

          this.B_re = []
          this.B_im = []
          this.B_re[1] = 0.7557853228
          this.B_im[1] = 0
          this.B_re[2] = 0.249204646
          this.B_im[2] = 0.003371507
          this.B_re[3] = -0.001541739
          this.B_im[3] = 0.04105856
          this.B_re[4] = -0.10162907
          this.B_im[4] = 0.01727609
          this.B_re[5] = -0.26623489
          this.B_im[5] = -0.36249218
          this.B_re[6] = -0.6870983
          this.B_im[6] = -1.1651967

          this.C_re = []
          this.C_im = []
          this.C_re[1] = 1.3231270439
          this.C_im[1] = 0
          this.C_re[2] = -0.577245789
          this.C_im[2] = -0.007809598
          this.C_re[3] = 0.508307513
          this.C_im[3] = -0.112208952
          this.C_re[4] = -0.15094762
          this.C_im[4] = 0.18200602
          this.C_re[5] = 1.01418179
          this.C_im[5] = 1.64497696
          this.C_re[6] = 1.9660549
          this.C_im[6] = 2.5127645

          this.D = []
          this.D[1] = 1.5627014243
          this.D[2] = 0.5185406398
          this.D[3] = -0.03333098
          this.D[4] = -0.1052906
          this.D[5] = -0.0368594
          this.D[6] = 0.007317
          this.D[7] = 0.0122
          this.D[8] = 0.00394
          this.D[9] = -0.0013
        }

        /**
    New Zealand Map Grid Forward  - long/lat to x/y
    long/lat in radians
  */
        function nzmg_forward(p) {
          var n
          var lon = p.x
          var lat = p.y

          var delta_lat = lat - this.lat0
          var delta_lon = lon - this.long0

          // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
          // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
          var d_phi = (delta_lat / SEC_TO_RAD) * 1e-5
          var d_lambda = delta_lon
          var d_phi_n = 1 // d_phi^0

          var d_psi = 0
          for (n = 1; n <= 10; n++) {
            d_phi_n = d_phi_n * d_phi
            d_psi = d_psi + this.A[n] * d_phi_n
          }

          // 2. Calculate theta
          var th_re = d_psi
          var th_im = d_lambda

          // 3. Calculate z
          var th_n_re = 1
          var th_n_im = 0 // theta^0
          var th_n_re1
          var th_n_im1

          var z_re = 0
          var z_im = 0
          for (n = 1; n <= 6; n++) {
            th_n_re1 = th_n_re * th_re - th_n_im * th_im
            th_n_im1 = th_n_im * th_re + th_n_re * th_im
            th_n_re = th_n_re1
            th_n_im = th_n_im1
            z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im
            z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im
          }

          // 4. Calculate easting and northing
          p.x = z_im * this.a + this.x0
          p.y = z_re * this.a + this.y0

          return p
        }

        /**
    New Zealand Map Grid Inverse  -  x/y to long/lat
  */
        function nzmg_inverse(p) {
          var n
          var x = p.x
          var y = p.y

          var delta_x = x - this.x0
          var delta_y = y - this.y0

          // 1. Calculate z
          var z_re = delta_y / this.a
          var z_im = delta_x / this.a

          // 2a. Calculate theta - first approximation gives km accuracy
          var z_n_re = 1
          var z_n_im = 0 // z^0
          var z_n_re1
          var z_n_im1

          var th_re = 0
          var th_im = 0
          for (n = 1; n <= 6; n++) {
            z_n_re1 = z_n_re * z_re - z_n_im * z_im
            z_n_im1 = z_n_im * z_re + z_n_re * z_im
            z_n_re = z_n_re1
            z_n_im = z_n_im1
            th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im
            th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im
          }

          // 2b. Iterate to refine the accuracy of the calculation
          //        0 iterations gives km accuracy
          //        1 iteration gives m accuracy -- good enough for most mapping applications
          //        2 iterations bives mm accuracy
          for (var i = 0; i < this.iterations; i++) {
            var th_n_re = th_re
            var th_n_im = th_im
            var th_n_re1
            var th_n_im1

            var num_re = z_re
            var num_im = z_im
            for (n = 2; n <= 6; n++) {
              th_n_re1 = th_n_re * th_re - th_n_im * th_im
              th_n_im1 = th_n_im * th_re + th_n_re * th_im
              th_n_re = th_n_re1
              th_n_im = th_n_im1
              num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im)
              num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im)
            }

            th_n_re = 1
            th_n_im = 0
            var den_re = this.B_re[1]
            var den_im = this.B_im[1]
            for (n = 2; n <= 6; n++) {
              th_n_re1 = th_n_re * th_re - th_n_im * th_im
              th_n_im1 = th_n_im * th_re + th_n_re * th_im
              th_n_re = th_n_re1
              th_n_im = th_n_im1
              den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im)
              den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im)
            }

            // Complex division
            var den2 = den_re * den_re + den_im * den_im
            th_re = (num_re * den_re + num_im * den_im) / den2
            th_im = (num_im * den_re - num_re * den_im) / den2
          }

          // 3. Calculate d_phi              ...                                    // and d_lambda
          var d_psi = th_re
          var d_lambda = th_im
          var d_psi_n = 1 // d_psi^0

          var d_phi = 0
          for (n = 1; n <= 9; n++) {
            d_psi_n = d_psi_n * d_psi
            d_phi = d_phi + this.D[n] * d_psi_n
          }

          // 4. Calculate latitude and longitude
          // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
          var lat = this.lat0 + d_phi * SEC_TO_RAD * 1e5
          var lon = this.long0 + d_lambda

          p.x = lon
          p.y = lat

          return p
        }

        var nzmg_names = ["New_Zealand_Map_Grid", "nzmg"]
        /* harmony default export */ var nzmg = {
          init: nzmg_init,
          forward: nzmg_forward,
          inverse: nzmg_inverse,
          names: nzmg_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/mill.js

        /*
  reference
    "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
    The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
  */

        /* Initialize the Miller Cylindrical projection
  -------------------------------------------*/
        function mill_init() {
          //no-op
        }

        /* Miller Cylindrical forward equations--mapping lat,long to x,y
    ------------------------------------------------------------*/
        function mill_forward(p) {
          var lon = p.x
          var lat = p.y
          /* Forward equations
      -----------------*/
          var dlon = adjust_lon(lon - this.long0)
          var x = this.x0 + this.a * dlon
          var y = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + lat / 2.5)) * 1.25

          p.x = x
          p.y = y
          return p
        }

        /* Miller Cylindrical inverse equations--mapping x,y to lat/long
    ------------------------------------------------------------*/
        function mill_inverse(p) {
          p.x -= this.x0
          p.y -= this.y0

          var lon = adjust_lon(this.long0 + p.x / this.a)
          var lat = 2.5 * (Math.atan(Math.exp((0.8 * p.y) / this.a)) - Math.PI / 4)

          p.x = lon
          p.y = lat
          return p
        }

        var mill_names = ["Miller_Cylindrical", "mill"]
        /* harmony default export */ var mill = {
          init: mill_init,
          forward: mill_forward,
          inverse: mill_inverse,
          names: mill_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/sinu.js

        var sinu_MAX_ITER = 20

        function sinu_init() {
          /* Place parameters in static storage for common use
    -------------------------------------------------*/

          if (!this.sphere) {
            this.en = pj_enfn(this.es)
          } else {
            this.n = 1
            this.m = 0
            this.es = 0
            this.C_y = Math.sqrt((this.m + 1) / this.n)
            this.C_x = this.C_y / (this.m + 1)
          }
        }

        /* Sinusoidal forward equations--mapping lat,long to x,y
  -----------------------------------------------------*/
        function sinu_forward(p) {
          var x, y
          var lon = p.x
          var lat = p.y
          /* Forward equations
    -----------------*/
          lon = adjust_lon(lon - this.long0)

          if (this.sphere) {
            if (!this.m) {
              lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat
            } else {
              var k = this.n * Math.sin(lat)
              for (var i = sinu_MAX_ITER; i; --i) {
                var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat))
                lat -= V
                if (Math.abs(V) < EPSLN) {
                  break
                }
              }
            }
            x = this.a * this.C_x * lon * (this.m + Math.cos(lat))
            y = this.a * this.C_y * lat
          } else {
            var s = Math.sin(lat)
            var c = Math.cos(lat)
            y = this.a * pj_mlfn(lat, s, c, this.en)
            x = (this.a * lon * c) / Math.sqrt(1 - this.es * s * s)
          }

          p.x = x
          p.y = y
          return p
        }

        function sinu_inverse(p) {
          var lat, temp, lon, s

          p.x -= this.x0
          lon = p.x / this.a
          p.y -= this.y0
          lat = p.y / this.a

          if (this.sphere) {
            lat /= this.C_y
            lon = lon / (this.C_x * (this.m + Math.cos(lat)))
            if (this.m) {
              lat = asinz((this.m * lat + Math.sin(lat)) / this.n)
            } else if (this.n !== 1) {
              lat = asinz(Math.sin(lat) / this.n)
            }
            lon = adjust_lon(lon + this.long0)
            lat = adjust_lat(lat)
          } else {
            lat = pj_inv_mlfn(p.y / this.a, this.es, this.en)
            s = Math.abs(lat)
            if (s < HALF_PI) {
              s = Math.sin(lat)
              temp = this.long0 + (p.x * Math.sqrt(1 - this.es * s * s)) / (this.a * Math.cos(lat))
              //temp = this.long0 + p.x / (this.a * Math.cos(lat));
              lon = adjust_lon(temp)
            } else if (s - EPSLN < HALF_PI) {
              lon = this.long0
            }
          }
          p.x = lon
          p.y = lat
          return p
        }

        var sinu_names = ["Sinusoidal", "sinu"]
        /* harmony default export */ var sinu = {
          init: sinu_init,
          forward: sinu_forward,
          inverse: sinu_inverse,
          names: sinu_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/moll.js

        function moll_init() {}

        /* Mollweide forward equations--mapping lat,long to x,y
    ----------------------------------------------------*/
        function moll_forward(p) {
          /* Forward equations
      -----------------*/
          var lon = p.x
          var lat = p.y

          var delta_lon = adjust_lon(lon - this.long0)
          var theta = lat
          var con = Math.PI * Math.sin(lat)

          /* Iterate using the Newton-Raphson method to find theta
      -----------------------------------------------------*/
          while (true) {
            var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta))
            theta += delta_theta
            if (Math.abs(delta_theta) < EPSLN) {
              break
            }
          }
          theta /= 2

          /* If the latitude is 90 deg, force the x coordinate to be "0 + false easting"
       this is done here because of precision problems with "cos(theta)"
       --------------------------------------------------------------------------*/
          if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
            delta_lon = 0
          }
          var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0
          var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0

          p.x = x
          p.y = y
          return p
        }

        function moll_inverse(p) {
          var theta
          var arg

          /* Inverse equations
      -----------------*/
          p.x -= this.x0
          p.y -= this.y0
          arg = p.y / (1.4142135623731 * this.a)

          /* Because of division by zero problems, 'arg' can not be 1.  Therefore
       a number very close to one is used instead.
       -------------------------------------------------------------------*/
          if (Math.abs(arg) > 0.999999999999) {
            arg = 0.999999999999
          }
          theta = Math.asin(arg)
          var lon = adjust_lon(this.long0 + p.x / (0.900316316158 * this.a * Math.cos(theta)))
          if (lon < -Math.PI) {
            lon = -Math.PI
          }
          if (lon > Math.PI) {
            lon = Math.PI
          }
          arg = (2 * theta + Math.sin(2 * theta)) / Math.PI
          if (Math.abs(arg) > 1) {
            arg = 1
          }
          var lat = Math.asin(arg)

          p.x = lon
          p.y = lat
          return p
        }

        var moll_names = ["Mollweide", "moll"]
        /* harmony default export */ var moll = {
          init: moll_init,
          forward: moll_forward,
          inverse: moll_inverse,
          names: moll_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/eqdc.js

        function eqdc_init() {
          /* Place parameters in static storage for common use
      -------------------------------------------------*/
          // Standard Parallels cannot be equal and on opposite sides of the equator
          if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
            return
          }
          this.lat2 = this.lat2 || this.lat1
          this.temp = this.b / this.a
          this.es = 1 - Math.pow(this.temp, 2)
          this.e = Math.sqrt(this.es)
          this.e0 = e0fn(this.es)
          this.e1 = e1fn(this.es)
          this.e2 = e2fn(this.es)
          this.e3 = e3fn(this.es)

          this.sinphi = Math.sin(this.lat1)
          this.cosphi = Math.cos(this.lat1)

          this.ms1 = msfnz(this.e, this.sinphi, this.cosphi)
          this.ml1 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1)

          if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
            this.ns = this.sinphi
          } else {
            this.sinphi = Math.sin(this.lat2)
            this.cosphi = Math.cos(this.lat2)
            this.ms2 = msfnz(this.e, this.sinphi, this.cosphi)
            this.ml2 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2)
            this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)
          }
          this.g = this.ml1 + this.ms1 / this.ns
          this.ml0 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0)
          this.rh = this.a * (this.g - this.ml0)
        }

        /* Equidistant Conic forward equations--mapping lat,long to x,y
  -----------------------------------------------------------*/
        function eqdc_forward(p) {
          var lon = p.x
          var lat = p.y
          var rh1

          /* Forward equations
      -----------------*/
          if (this.sphere) {
            rh1 = this.a * (this.g - lat)
          } else {
            var ml = mlfn(this.e0, this.e1, this.e2, this.e3, lat)
            rh1 = this.a * (this.g - ml)
          }
          var theta = this.ns * adjust_lon(lon - this.long0)
          var x = this.x0 + rh1 * Math.sin(theta)
          var y = this.y0 + this.rh - rh1 * Math.cos(theta)
          p.x = x
          p.y = y
          return p
        }

        /* Inverse equations
  -----------------*/
        function eqdc_inverse(p) {
          p.x -= this.x0
          p.y = this.rh - p.y + this.y0
          var con, rh1, lat, lon
          if (this.ns >= 0) {
            rh1 = Math.sqrt(p.x * p.x + p.y * p.y)
            con = 1
          } else {
            rh1 = -Math.sqrt(p.x * p.x + p.y * p.y)
            con = -1
          }
          var theta = 0
          if (rh1 !== 0) {
            theta = Math.atan2(con * p.x, con * p.y)
          }

          if (this.sphere) {
            lon = adjust_lon(this.long0 + theta / this.ns)
            lat = adjust_lat(this.g - rh1 / this.a)
            p.x = lon
            p.y = lat
            return p
          } else {
            var ml = this.g - rh1 / this.a
            lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3)
            lon = adjust_lon(this.long0 + theta / this.ns)
            p.x = lon
            p.y = lat
            return p
          }
        }

        var eqdc_names = ["Equidistant_Conic", "eqdc"]
        /* harmony default export */ var eqdc = {
          init: eqdc_init,
          forward: eqdc_forward,
          inverse: eqdc_inverse,
          names: eqdc_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/vandg.js

        /* Initialize the Van Der Grinten projection
  ----------------------------------------*/
        function vandg_init() {
          //this.R = 6370997; //Radius of earth
          this.R = this.a
        }

        function vandg_forward(p) {
          var lon = p.x
          var lat = p.y

          /* Forward equations
    -----------------*/
          var dlon = adjust_lon(lon - this.long0)
          var x, y

          if (Math.abs(lat) <= EPSLN) {
            x = this.x0 + this.R * dlon
            y = this.y0
          }
          var theta = asinz(2 * Math.abs(lat / Math.PI))
          if (Math.abs(dlon) <= EPSLN || Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
            x = this.x0
            if (lat >= 0) {
              y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta)
            } else {
              y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta)
            }
            //  return(OK);
          }
          var al = 0.5 * Math.abs(Math.PI / dlon - dlon / Math.PI)
          var asq = al * al
          var sinth = Math.sin(theta)
          var costh = Math.cos(theta)

          var g = costh / (sinth + costh - 1)
          var gsq = g * g
          var m = g * (2 / sinth - 1)
          var msq = m * m
          var con = (Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq)))) / (msq + asq)
          if (dlon < 0) {
            con = -con
          }
          x = this.x0 + con
          //con = Math.abs(con / (Math.PI * this.R));
          var q = asq + g
          con = (Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q))) / (msq + asq)
          if (lat >= 0) {
            //y = this.y0 + Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
            y = this.y0 + con
          } else {
            //y = this.y0 - Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
            y = this.y0 - con
          }
          p.x = x
          p.y = y
          return p
        }

        /* Van Der Grinten inverse equations--mapping x,y to lat/long
  ---------------------------------------------------------*/
        function vandg_inverse(p) {
          var lon, lat
          var xx, yy, xys, c1, c2, c3
          var a1
          var m1
          var con
          var th1
          var d

          /* inverse equations
    -----------------*/
          p.x -= this.x0
          p.y -= this.y0
          con = Math.PI * this.R
          xx = p.x / con
          yy = p.y / con
          xys = xx * xx + yy * yy
          c1 = -Math.abs(yy) * (1 + xys)
          c2 = c1 - 2 * yy * yy + xx * xx
          c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys
          d = (yy * yy) / c3 + ((2 * c2 * c2 * c2) / c3 / c3 / c3 - (9 * c1 * c2) / c3 / c3) / 27
          a1 = (c1 - (c2 * c2) / 3 / c3) / c3
          m1 = 2 * Math.sqrt(-a1 / 3)
          con = (3 * d) / a1 / m1
          if (Math.abs(con) > 1) {
            if (con >= 0) {
              con = 1
            } else {
              con = -1
            }
          }
          th1 = Math.acos(con) / 3
          if (p.y >= 0) {
            lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI
          } else {
            lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI
          }

          if (Math.abs(xx) < EPSLN) {
            lon = this.long0
          } else {
            lon = adjust_lon(this.long0 + (Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys))) / 2 / xx)
          }

          p.x = lon
          p.y = lat
          return p
        }

        var vandg_names = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"]
        /* harmony default export */ var vandg = {
          init: vandg_init,
          forward: vandg_forward,
          inverse: vandg_inverse,
          names: vandg_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/aeqd.js

        function aeqd_init() {
          this.sin_p12 = Math.sin(this.lat0)
          this.cos_p12 = Math.cos(this.lat0)
        }

        function aeqd_forward(p) {
          var lon = p.x
          var lat = p.y
          var sinphi = Math.sin(p.y)
          var cosphi = Math.cos(p.y)
          var dlon = adjust_lon(lon - this.long0)
          var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H, GH, Hs, c, kp, cos_c, s, s2, s3, s4, s5
          if (this.sphere) {
            if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
              //North Pole case
              p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon)
              p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon)
              return p
            } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
              //South Pole case
              p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon)
              p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon)
              return p
            } else {
              //default case
              cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon)
              c = Math.acos(cos_c)
              kp = c ? c / Math.sin(c) : 1
              p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon)
              p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon))
              return p
            }
          } else {
            e0 = e0fn(this.es)
            e1 = e1fn(this.es)
            e2 = e2fn(this.es)
            e3 = e3fn(this.es)
            if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
              //North Pole case
              Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI)
              Ml = this.a * mlfn(e0, e1, e2, e3, lat)
              p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon)
              p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon)
              return p
            } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
              //South Pole case
              Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI)
              Ml = this.a * mlfn(e0, e1, e2, e3, lat)
              p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon)
              p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon)
              return p
            } else {
              //Default case
              tanphi = sinphi / cosphi
              Nl1 = gN(this.a, this.e, this.sin_p12)
              Nl = gN(this.a, this.e, sinphi)
              psi = Math.atan((1 - this.es) * tanphi + (this.es * Nl1 * this.sin_p12) / (Nl * cosphi))
              Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon))
              if (Az === 0) {
                s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi))
              } else if (Math.abs(Math.abs(Az) - Math.PI) <= EPSLN) {
                s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi))
              } else {
                s = Math.asin((Math.sin(dlon) * Math.cos(psi)) / Math.sin(Az))
              }
              G = (this.e * this.sin_p12) / Math.sqrt(1 - this.es)
              H = (this.e * this.cos_p12 * Math.cos(Az)) / Math.sqrt(1 - this.es)
              GH = G * H
              Hs = H * H
              s2 = s * s
              s3 = s2 * s
              s4 = s3 * s
              s5 = s4 * s
              c =
                Nl1 *
                s *
                (1 -
                  (s2 * Hs * (1 - Hs)) / 6 +
                  (s3 / 8) * GH * (1 - 2 * Hs) +
                  (s4 / 120) * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) -
                  (s5 / 48) * GH)
              p.x = this.x0 + c * Math.sin(Az)
              p.y = this.y0 + c * Math.cos(Az)
              return p
            }
          }
        }

        function aeqd_inverse(p) {
          p.x -= this.x0
          p.y -= this.y0
          var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F, sinpsi
          if (this.sphere) {
            rh = Math.sqrt(p.x * p.x + p.y * p.y)
            if (rh > 2 * HALF_PI * this.a) {
              return
            }
            z = rh / this.a

            sinz = Math.sin(z)
            cosz = Math.cos(z)

            lon = this.long0
            if (Math.abs(rh) <= EPSLN) {
              lat = this.lat0
            } else {
              lat = asinz(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh)
              con = Math.abs(this.lat0) - HALF_PI
              if (Math.abs(con) <= EPSLN) {
                if (this.lat0 >= 0) {
                  lon = adjust_lon(this.long0 + Math.atan2(p.x, -p.y))
                } else {
                  lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y))
                }
              } else {
                /*con = cosz - this.sin_p12 * Math.sin(lat);
        if ((Math.abs(con) < EPSLN) && (Math.abs(p.x) < EPSLN)) {
          //no-op, just keep the lon value as is
        } else {
          var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
          lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
        }*/
                lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz))
              }
            }

            p.x = lon
            p.y = lat
            return p
          } else {
            e0 = e0fn(this.es)
            e1 = e1fn(this.es)
            e2 = e2fn(this.es)
            e3 = e3fn(this.es)
            if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
              //North pole case
              Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI)
              rh = Math.sqrt(p.x * p.x + p.y * p.y)
              M = Mlp - rh
              lat = imlfn(M / this.a, e0, e1, e2, e3)
              lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y))
              p.x = lon
              p.y = lat
              return p
            } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
              //South pole case
              Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI)
              rh = Math.sqrt(p.x * p.x + p.y * p.y)
              M = rh - Mlp

              lat = imlfn(M / this.a, e0, e1, e2, e3)
              lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y))
              p.x = lon
              p.y = lat
              return p
            } else {
              //default case
              rh = Math.sqrt(p.x * p.x + p.y * p.y)
              Az = Math.atan2(p.x, p.y)
              N1 = gN(this.a, this.e, this.sin_p12)
              cosAz = Math.cos(Az)
              tmp = this.e * this.cos_p12 * cosAz
              A = (-tmp * tmp) / (1 - this.es)
              B = (3 * this.es * (1 - A) * this.sin_p12 * this.cos_p12 * cosAz) / (1 - this.es)
              D = rh / N1
              Ee = D - (A * (1 + A) * Math.pow(D, 3)) / 6 - (B * (1 + 3 * A) * Math.pow(D, 4)) / 24
              F = 1 - (A * Ee * Ee) / 2 - (D * Ee * Ee * Ee) / 6
              psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz)
              lon = adjust_lon(this.long0 + Math.asin((Math.sin(Az) * Math.sin(Ee)) / Math.cos(psi)))
              sinpsi = Math.sin(psi)
              lat = Math.atan2((sinpsi - this.es * F * this.sin_p12) * Math.tan(psi), sinpsi * (1 - this.es))
              p.x = lon
              p.y = lat
              return p
            }
          }
        }

        var aeqd_names = ["Azimuthal_Equidistant", "aeqd"]
        /* harmony default export */ var aeqd = {
          init: aeqd_init,
          forward: aeqd_forward,
          inverse: aeqd_inverse,
          names: aeqd_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/ortho.js

        function ortho_init() {
          //double temp;      /* temporary variable    */

          /* Place parameters in static storage for common use
      -------------------------------------------------*/
          this.sin_p14 = Math.sin(this.lat0)
          this.cos_p14 = Math.cos(this.lat0)
        }

        /* Orthographic forward equations--mapping lat,long to x,y
    ---------------------------------------------------*/
        function ortho_forward(p) {
          var sinphi, cosphi /* sin and cos value        */
          var dlon /* delta longitude value      */
          var coslon /* cos of longitude        */
          var ksp /* scale factor          */
          var g, x, y
          var lon = p.x
          var lat = p.y
          /* Forward equations
      -----------------*/
          dlon = adjust_lon(lon - this.long0)

          sinphi = Math.sin(lat)
          cosphi = Math.cos(lat)

          coslon = Math.cos(dlon)
          g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon
          ksp = 1
          if (g > 0 || Math.abs(g) <= EPSLN) {
            x = this.a * ksp * cosphi * Math.sin(dlon)
            y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon)
          }
          p.x = x
          p.y = y
          return p
        }

        function ortho_inverse(p) {
          var rh /* height above ellipsoid      */
          var z /* angle          */
          var sinz, cosz /* sin of z and cos of z      */
          var con
          var lon, lat
          /* Inverse equations
      -----------------*/
          p.x -= this.x0
          p.y -= this.y0
          rh = Math.sqrt(p.x * p.x + p.y * p.y)
          z = asinz(rh / this.a)

          sinz = Math.sin(z)
          cosz = Math.cos(z)

          lon = this.long0
          if (Math.abs(rh) <= EPSLN) {
            lat = this.lat0
            p.x = lon
            p.y = lat
            return p
          }
          lat = asinz(cosz * this.sin_p14 + (p.y * sinz * this.cos_p14) / rh)
          con = Math.abs(this.lat0) - HALF_PI
          if (Math.abs(con) <= EPSLN) {
            if (this.lat0 >= 0) {
              lon = adjust_lon(this.long0 + Math.atan2(p.x, -p.y))
            } else {
              lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y))
            }
            p.x = lon
            p.y = lat
            return p
          }
          lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz))
          p.x = lon
          p.y = lat
          return p
        }

        var ortho_names = ["ortho"]
        /* harmony default export */ var ortho = {
          init: ortho_init,
          forward: ortho_forward,
          inverse: ortho_inverse,
          names: ortho_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/qsc.js
        // QSC projection rewritten from the original PROJ4
        // https://github.com/OSGeo/proj.4/blob/master/src/PJ_qsc.c

        /* constants */
        var FACE_ENUM = {
          FRONT: 1,
          RIGHT: 2,
          BACK: 3,
          LEFT: 4,
          TOP: 5,
          BOTTOM: 6
        }

        var AREA_ENUM = {
          AREA_0: 1,
          AREA_1: 2,
          AREA_2: 3,
          AREA_3: 4
        }

        function qsc_init() {
          this.x0 = this.x0 || 0
          this.y0 = this.y0 || 0
          this.lat0 = this.lat0 || 0
          this.long0 = this.long0 || 0
          this.lat_ts = this.lat_ts || 0
          this.title = this.title || "Quadrilateralized Spherical Cube"

          /* Determine the cube face from the center of projection. */
          if (this.lat0 >= HALF_PI - FORTPI / 2.0) {
            this.face = FACE_ENUM.TOP
          } else if (this.lat0 <= -(HALF_PI - FORTPI / 2.0)) {
            this.face = FACE_ENUM.BOTTOM
          } else if (Math.abs(this.long0) <= FORTPI) {
            this.face = FACE_ENUM.FRONT
          } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
            this.face = this.long0 > 0.0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT
          } else {
            this.face = FACE_ENUM.BACK
          }

          /* Fill in useful values for the ellipsoid <-> sphere shift
           * described in [LK12]. */
          if (this.es !== 0) {
            this.one_minus_f = 1 - (this.a - this.b) / this.a
            this.one_minus_f_squared = this.one_minus_f * this.one_minus_f
          }
        }

        // QSC forward equations--mapping lat,long to x,y
        // -----------------------------------------------------------------
        function qsc_forward(p) {
          var xy = { x: 0, y: 0 }
          var lat, lon
          var theta, phi
          var t, mu
          /* nu; */
          var area = { value: 0 }

          // move lon according to projection's lon
          p.x -= this.long0

          /* Convert the geodetic latitude to a geocentric latitude.
           * This corresponds to the shift from the ellipsoid to the sphere
           * described in [LK12]. */
          if (this.es !== 0) {
            //if (P->es != 0) {
            lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y))
          } else {
            lat = p.y
          }

          /* Convert the input lat, lon into theta, phi as used by QSC.
           * This depends on the cube face and the area on it.
           * For the top and bottom face, we can compute theta and phi
           * directly from phi, lam. For the other faces, we must use
           * unit sphere cartesian coordinates as an intermediate step. */
          lon = p.x //lon = lp.lam;
          if (this.face === FACE_ENUM.TOP) {
            phi = HALF_PI - lat
            if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
              area.value = AREA_ENUM.AREA_0
              theta = lon - HALF_PI
            } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
              area.value = AREA_ENUM.AREA_1
              theta = lon > 0.0 ? lon - SPI : lon + SPI
            } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
              area.value = AREA_ENUM.AREA_2
              theta = lon + HALF_PI
            } else {
              area.value = AREA_ENUM.AREA_3
              theta = lon
            }
          } else if (this.face === FACE_ENUM.BOTTOM) {
            phi = HALF_PI + lat
            if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
              area.value = AREA_ENUM.AREA_0
              theta = -lon + HALF_PI
            } else if (lon < FORTPI && lon >= -FORTPI) {
              area.value = AREA_ENUM.AREA_1
              theta = -lon
            } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
              area.value = AREA_ENUM.AREA_2
              theta = -lon - HALF_PI
            } else {
              area.value = AREA_ENUM.AREA_3
              theta = lon > 0.0 ? -lon + SPI : -lon - SPI
            }
          } else {
            var q, r, s
            var sinlat, coslat
            var sinlon, coslon

            if (this.face === FACE_ENUM.RIGHT) {
              lon = qsc_shift_lon_origin(lon, +HALF_PI)
            } else if (this.face === FACE_ENUM.BACK) {
              lon = qsc_shift_lon_origin(lon, +SPI)
            } else if (this.face === FACE_ENUM.LEFT) {
              lon = qsc_shift_lon_origin(lon, -HALF_PI)
            }
            sinlat = Math.sin(lat)
            coslat = Math.cos(lat)
            sinlon = Math.sin(lon)
            coslon = Math.cos(lon)
            q = coslat * coslon
            r = coslat * sinlon
            s = sinlat

            if (this.face === FACE_ENUM.FRONT) {
              phi = Math.acos(q)
              theta = qsc_fwd_equat_face_theta(phi, s, r, area)
            } else if (this.face === FACE_ENUM.RIGHT) {
              phi = Math.acos(r)
              theta = qsc_fwd_equat_face_theta(phi, s, -q, area)
            } else if (this.face === FACE_ENUM.BACK) {
              phi = Math.acos(-q)
              theta = qsc_fwd_equat_face_theta(phi, s, -r, area)
            } else if (this.face === FACE_ENUM.LEFT) {
              phi = Math.acos(-r)
              theta = qsc_fwd_equat_face_theta(phi, s, q, area)
            } else {
              /* Impossible */
              phi = theta = 0
              area.value = AREA_ENUM.AREA_0
            }
          }

          /* Compute mu and nu for the area of definition.
           * For mu, see Eq. (3-21) in [OL76], but note the typos:
           * compare with Eq. (3-14). For nu, see Eq. (3-38). */
          mu = Math.atan((12 / SPI) * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI))
          t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))))

          /* Apply the result to the real area. */
          if (area.value === AREA_ENUM.AREA_1) {
            mu += HALF_PI
          } else if (area.value === AREA_ENUM.AREA_2) {
            mu += SPI
          } else if (area.value === AREA_ENUM.AREA_3) {
            mu += 1.5 * SPI
          }

          /* Now compute x, y from mu and nu */
          xy.x = t * Math.cos(mu)
          xy.y = t * Math.sin(mu)
          xy.x = xy.x * this.a + this.x0
          xy.y = xy.y * this.a + this.y0

          p.x = xy.x
          p.y = xy.y
          return p
        }

        // QSC inverse equations--mapping x,y to lat/long
        // -----------------------------------------------------------------
        function qsc_inverse(p) {
          var lp = { lam: 0, phi: 0 }
          var mu, nu, cosmu, tannu
          var tantheta, theta, cosphi, phi
          var t
          var area = { value: 0 }

          /* de-offset */
          p.x = (p.x - this.x0) / this.a
          p.y = (p.y - this.y0) / this.a

          /* Convert the input x, y to the mu and nu angles as used by QSC.
           * This depends on the area of the cube face. */
          nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y))
          mu = Math.atan2(p.y, p.x)
          if (p.x >= 0.0 && p.x >= Math.abs(p.y)) {
            area.value = AREA_ENUM.AREA_0
          } else if (p.y >= 0.0 && p.y >= Math.abs(p.x)) {
            area.value = AREA_ENUM.AREA_1
            mu -= HALF_PI
          } else if (p.x < 0.0 && -p.x >= Math.abs(p.y)) {
            area.value = AREA_ENUM.AREA_2
            mu = mu < 0.0 ? mu + SPI : mu - SPI
          } else {
            area.value = AREA_ENUM.AREA_3
            mu += HALF_PI
          }

          /* Compute phi and theta for the area of definition.
           * The inverse projection is not described in the original paper, but some
           * good hints can be found here (as of 2011-12-14):
           * http://fits.gsfc.nasa.gov/fitsbits/saf.93/saf.9302
           * (search for "Message-Id: <9302181759.AA25477 at fits.cv.nrao.edu>") */
          t = (SPI / 12) * Math.tan(mu)
          tantheta = Math.sin(t) / (Math.cos(t) - 1 / Math.sqrt(2))
          theta = Math.atan(tantheta)
          cosmu = Math.cos(mu)
          tannu = Math.tan(nu)
          cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))))
          if (cosphi < -1) {
            cosphi = -1
          } else if (cosphi > +1) {
            cosphi = +1
          }

          /* Apply the result to the real area on the cube face.
           * For the top and bottom face, we can compute phi and lam directly.
           * For the other faces, we must use unit sphere cartesian coordinates
           * as an intermediate step. */
          if (this.face === FACE_ENUM.TOP) {
            phi = Math.acos(cosphi)
            lp.phi = HALF_PI - phi
            if (area.value === AREA_ENUM.AREA_0) {
              lp.lam = theta + HALF_PI
            } else if (area.value === AREA_ENUM.AREA_1) {
              lp.lam = theta < 0.0 ? theta + SPI : theta - SPI
            } else if (area.value === AREA_ENUM.AREA_2) {
              lp.lam = theta - HALF_PI
            } /* area.value == AREA_ENUM.AREA_3 */ else {
              lp.lam = theta
            }
          } else if (this.face === FACE_ENUM.BOTTOM) {
            phi = Math.acos(cosphi)
            lp.phi = phi - HALF_PI
            if (area.value === AREA_ENUM.AREA_0) {
              lp.lam = -theta + HALF_PI
            } else if (area.value === AREA_ENUM.AREA_1) {
              lp.lam = -theta
            } else if (area.value === AREA_ENUM.AREA_2) {
              lp.lam = -theta - HALF_PI
            } /* area.value == AREA_ENUM.AREA_3 */ else {
              lp.lam = theta < 0.0 ? -theta - SPI : -theta + SPI
            }
          } else {
            /* Compute phi and lam via cartesian unit sphere coordinates. */
            var q, r, s
            q = cosphi
            t = q * q
            if (t >= 1) {
              s = 0
            } else {
              s = Math.sqrt(1 - t) * Math.sin(theta)
            }
            t += s * s
            if (t >= 1) {
              r = 0
            } else {
              r = Math.sqrt(1 - t)
            }
            /* Rotate q,r,s into the correct area. */
            if (area.value === AREA_ENUM.AREA_1) {
              t = r
              r = -s
              s = t
            } else if (area.value === AREA_ENUM.AREA_2) {
              r = -r
              s = -s
            } else if (area.value === AREA_ENUM.AREA_3) {
              t = r
              r = s
              s = -t
            }
            /* Rotate q,r,s into the correct cube face. */
            if (this.face === FACE_ENUM.RIGHT) {
              t = q
              q = -r
              r = t
            } else if (this.face === FACE_ENUM.BACK) {
              q = -q
              r = -r
            } else if (this.face === FACE_ENUM.LEFT) {
              t = q
              q = r
              r = -t
            }
            /* Now compute phi and lam from the unit sphere coordinates. */
            lp.phi = Math.acos(-s) - HALF_PI
            lp.lam = Math.atan2(r, q)
            if (this.face === FACE_ENUM.RIGHT) {
              lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI)
            } else if (this.face === FACE_ENUM.BACK) {
              lp.lam = qsc_shift_lon_origin(lp.lam, -SPI)
            } else if (this.face === FACE_ENUM.LEFT) {
              lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI)
            }
          }

          /* Apply the shift from the sphere to the ellipsoid as described
           * in [LK12]. */
          if (this.es !== 0) {
            var invert_sign
            var tanphi, xa
            invert_sign = lp.phi < 0 ? 1 : 0
            tanphi = Math.tan(lp.phi)
            xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared)
            lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa))
            if (invert_sign) {
              lp.phi = -lp.phi
            }
          }

          lp.lam += this.long0
          p.x = lp.lam
          p.y = lp.phi
          return p
        }

        /* Helper function for forward projection: compute the theta angle
         * and determine the area number. */
        function qsc_fwd_equat_face_theta(phi, y, x, area) {
          var theta
          if (phi < EPSLN) {
            area.value = AREA_ENUM.AREA_0
            theta = 0.0
          } else {
            theta = Math.atan2(y, x)
            if (Math.abs(theta) <= FORTPI) {
              area.value = AREA_ENUM.AREA_0
            } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
              area.value = AREA_ENUM.AREA_1
              theta -= HALF_PI
            } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
              area.value = AREA_ENUM.AREA_2
              theta = theta >= 0.0 ? theta - SPI : theta + SPI
            } else {
              area.value = AREA_ENUM.AREA_3
              theta += HALF_PI
            }
          }
          return theta
        }

        /* Helper function: shift the longitude. */
        function qsc_shift_lon_origin(lon, offset) {
          var slon = lon + offset
          if (slon < -SPI) {
            slon += TWO_PI
          } else if (slon > +SPI) {
            slon -= TWO_PI
          }
          return slon
        }

        var qsc_names = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"]
        /* harmony default export */ var qsc = {
          init: qsc_init,
          forward: qsc_forward,
          inverse: qsc_inverse,
          names: qsc_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/robin.js
        // Robinson projection
        // Based on https://github.com/OSGeo/proj.4/blob/master/src/PJ_robin.c
        // Polynomial coeficients from http://article.gmane.org/gmane.comp.gis.proj-4.devel/6039

        var COEFS_X = [
          [1.0, 2.2199e-17, -7.15515e-5, 3.1103e-6],
          [0.9986, -0.000482243, -2.4897e-5, -1.3309e-6],
          [0.9954, -0.00083103, -4.48605e-5, -9.86701e-7],
          [0.99, -0.00135364, -5.9661e-5, 3.6777e-6],
          [0.9822, -0.00167442, -4.49547e-6, -5.72411e-6],
          [0.973, -0.00214868, -9.03571e-5, 1.8736e-8],
          [0.96, -0.00305085, -9.00761e-5, 1.64917e-6],
          [0.9427, -0.00382792, -6.53386e-5, -2.6154e-6],
          [0.9216, -0.00467746, -0.00010457, 4.81243e-6],
          [0.8962, -0.00536223, -3.23831e-5, -5.43432e-6],
          [0.8679, -0.00609363, -0.000113898, 3.32484e-6],
          [0.835, -0.00698325, -6.40253e-5, 9.34959e-7],
          [0.7986, -0.00755338, -5.00009e-5, 9.35324e-7],
          [0.7597, -0.00798324, -3.5971e-5, -2.27626e-6],
          [0.7186, -0.00851367, -7.01149e-5, -8.6303e-6],
          [0.6732, -0.00986209, -0.000199569, 1.91974e-5],
          [0.6213, -0.010418, 8.83923e-5, 6.24051e-6],
          [0.5722, -0.00906601, 0.000182, 6.24051e-6],
          [0.5322, -0.00677797, 0.000275608, 6.24051e-6]
        ]

        var COEFS_Y = [
          [-5.20417e-18, 0.0124, 1.21431e-18, -8.45284e-11],
          [0.062, 0.0124, -1.26793e-9, 4.22642e-10],
          [0.124, 0.0124, 5.07171e-9, -1.60604e-9],
          [0.186, 0.0123999, -1.90189e-8, 6.00152e-9],
          [0.248, 0.0124002, 7.10039e-8, -2.24e-8],
          [0.31, 0.0123992, -2.64997e-7, 8.35986e-8],
          [0.372, 0.0124029, 9.88983e-7, -3.11994e-7],
          [0.434, 0.0123893, -3.69093e-6, -4.35621e-7],
          [0.4958, 0.0123198, -1.02252e-5, -3.45523e-7],
          [0.5571, 0.0121916, -1.54081e-5, -5.82288e-7],
          [0.6176, 0.0119938, -2.41424e-5, -5.25327e-7],
          [0.6769, 0.011713, -3.20223e-5, -5.16405e-7],
          [0.7346, 0.0113541, -3.97684e-5, -6.09052e-7],
          [0.7903, 0.0109107, -4.89042e-5, -1.04739e-6],
          [0.8435, 0.0103431, -6.4615e-5, -1.40374e-9],
          [0.8936, 0.00969686, -6.4636e-5, -8.547e-6],
          [0.9394, 0.00840947, -0.000192841, -4.2106e-6],
          [0.9761, 0.00616527, -0.000256, -4.2106e-6],
          [1.0, 0.00328947, -0.000319159, -4.2106e-6]
        ]

        var FXC = 0.8487
        var FYC = 1.3523
        var C1 = R2D / 5 // rad to 5-degree interval
        var RC1 = 1 / C1
        var NODES = 18

        var poly3_val = function (coefs, x) {
          return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]))
        }

        var poly3_der = function (coefs, x) {
          return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3])
        }

        function newton_rapshon(f_df, start, max_err, iters) {
          var x = start
          for (; iters; --iters) {
            var upd = f_df(x)
            x -= upd
            if (Math.abs(upd) < max_err) {
              break
            }
          }
          return x
        }

        function robin_init() {
          this.x0 = this.x0 || 0
          this.y0 = this.y0 || 0
          this.long0 = this.long0 || 0
          this.es = 0
          this.title = this.title || "Robinson"
        }

        function robin_forward(ll) {
          var lon = adjust_lon(ll.x - this.long0)

          var dphi = Math.abs(ll.y)
          var i = Math.floor(dphi * C1)
          if (i < 0) {
            i = 0
          } else if (i >= NODES) {
            i = NODES - 1
          }
          dphi = R2D * (dphi - RC1 * i)
          var xy = {
            x: poly3_val(COEFS_X[i], dphi) * lon,
            y: poly3_val(COEFS_Y[i], dphi)
          }
          if (ll.y < 0) {
            xy.y = -xy.y
          }

          xy.x = xy.x * this.a * FXC + this.x0
          xy.y = xy.y * this.a * FYC + this.y0
          return xy
        }

        function robin_inverse(xy) {
          var ll = {
            x: (xy.x - this.x0) / (this.a * FXC),
            y: Math.abs(xy.y - this.y0) / (this.a * FYC)
          }

          if (ll.y >= 1) {
            // pathologic case
            ll.x /= COEFS_X[NODES][0]
            ll.y = xy.y < 0 ? -HALF_PI : HALF_PI
          } else {
            // find table interval
            var i = Math.floor(ll.y * NODES)
            if (i < 0) {
              i = 0
            } else if (i >= NODES) {
              i = NODES - 1
            }
            for (;;) {
              if (COEFS_Y[i][0] > ll.y) {
                --i
              } else if (COEFS_Y[i + 1][0] <= ll.y) {
                ++i
              } else {
                break
              }
            }
            // linear interpolation in 5 degree interval
            var coefs = COEFS_Y[i]
            var t = (5 * (ll.y - coefs[0])) / (COEFS_Y[i + 1][0] - coefs[0])
            // find t so that poly3_val(coefs, t) = ll.y
            t = newton_rapshon(
              function (x) {
                return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x)
              },
              t,
              EPSLN,
              100
            )

            ll.x /= poly3_val(COEFS_X[i], t)
            ll.y = (5 * i + t) * D2R
            if (xy.y < 0) {
              ll.y = -ll.y
            }
          }

          ll.x = adjust_lon(ll.x + this.long0)
          return ll
        }

        var robin_names = ["Robinson", "robin"]
        /* harmony default export */ var robin = {
          init: robin_init,
          forward: robin_forward,
          inverse: robin_inverse,
          names: robin_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/geocent.js

        function geocent_init() {
          this.name = "geocent"
        }

        function geocent_forward(p) {
          var point = geodeticToGeocentric(p, this.es, this.a)
          return point
        }

        function geocent_inverse(p) {
          var point = geocentricToGeodetic(p, this.es, this.a, this.b)
          return point
        }

        var geocent_names = ["Geocentric", "geocentric", "geocent", "Geocent"]
        /* harmony default export */ var geocent = {
          init: geocent_init,
          forward: geocent_forward,
          inverse: geocent_inverse,
          names: geocent_names
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/tpers.js

        var mode = {
          N_POLE: 0,
          S_POLE: 1,
          EQUIT: 2,
          OBLIQ: 3
        }

        var tpers_params = {
          h: { def: 100000, num: true }, // default is Karman line, no default in PROJ.7
          azi: { def: 0, num: true, degrees: true }, // default is North
          tilt: { def: 0, num: true, degrees: true }, // default is Nadir
          long0: { def: 0, num: true }, // default is Greenwich, conversion to rad is automatic
          lat0: { def: 0, num: true } // default is Equator, conversion to rad is automatic
        }

        function tpers_init() {
          Object.keys(tpers_params).forEach(
            function (p) {
              if (typeof this[p] === "undefined") {
                this[p] = tpers_params[p].def
              } else if (tpers_params[p].num && isNaN(this[p])) {
                throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p])
              } else if (tpers_params[p].num) {
                this[p] = parseFloat(this[p])
              }
              if (tpers_params[p].degrees) {
                this[p] = this[p] * D2R
              }
            }.bind(this)
          )

          if (Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN) {
            this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE
          } else if (Math.abs(this.lat0) < EPSLN) {
            this.mode = mode.EQUIT
          } else {
            this.mode = mode.OBLIQ
            this.sinph0 = Math.sin(this.lat0)
            this.cosph0 = Math.cos(this.lat0)
          }

          this.pn1 = this.h / this.a // Normalize relative to the Earth's radius

          if (this.pn1 <= 0 || this.pn1 > 1e10) {
            throw new Error("Invalid height")
          }

          this.p = 1 + this.pn1
          this.rp = 1 / this.p
          this.h1 = 1 / this.pn1
          this.pfact = (this.p + 1) * this.h1
          this.es = 0

          var omega = this.tilt
          var gamma = this.azi
          this.cg = Math.cos(gamma)
          this.sg = Math.sin(gamma)
          this.cw = Math.cos(omega)
          this.sw = Math.sin(omega)
        }

        function tpers_forward(p) {
          p.x -= this.long0
          var sinphi = Math.sin(p.y)
          var cosphi = Math.cos(p.y)
          var coslam = Math.cos(p.x)
          var x, y
          switch (this.mode) {
            case mode.OBLIQ:
              y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam
              break
            case mode.EQUIT:
              y = cosphi * coslam
              break
            case mode.S_POLE:
              y = -sinphi
              break
            case mode.N_POLE:
              y = sinphi
              break
          }
          y = this.pn1 / (this.p - y)
          x = y * cosphi * Math.sin(p.x)

          switch (this.mode) {
            case mode.OBLIQ:
              y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam
              break
            case mode.EQUIT:
              y *= sinphi
              break
            case mode.N_POLE:
              y *= -(cosphi * coslam)
              break
            case mode.S_POLE:
              y *= cosphi * coslam
              break
          }

          // Tilt
          var yt, ba
          yt = y * this.cg + x * this.sg
          ba = 1 / (yt * this.sw * this.h1 + this.cw)
          x = (x * this.cg - y * this.sg) * this.cw * ba
          y = yt * ba

          p.x = x * this.a
          p.y = y * this.a
          return p
        }

        function tpers_inverse(p) {
          p.x /= this.a
          p.y /= this.a
          var r = { x: p.x, y: p.y }

          // Un-Tilt
          var bm, bq, yt
          yt = 1 / (this.pn1 - p.y * this.sw)
          bm = this.pn1 * p.x * yt
          bq = this.pn1 * p.y * this.cw * yt
          p.x = bm * this.cg + bq * this.sg
          p.y = bq * this.cg - bm * this.sg

          var rh = hypot(p.x, p.y)
          if (Math.abs(rh) < EPSLN) {
            r.x = 0
            r.y = p.y
          } else {
            var cosz, sinz
            sinz = 1 - rh * rh * this.pfact
            sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1)
            cosz = Math.sqrt(1 - sinz * sinz)
            switch (this.mode) {
              case mode.OBLIQ:
                r.y = Math.asin(cosz * this.sinph0 + (p.y * sinz * this.cosph0) / rh)
                p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh
                p.x *= sinz * this.cosph0
                break
              case mode.EQUIT:
                r.y = Math.asin((p.y * sinz) / rh)
                p.y = cosz * rh
                p.x *= sinz
                break
              case mode.N_POLE:
                r.y = Math.asin(cosz)
                p.y = -p.y
                break
              case mode.S_POLE:
                r.y = -Math.asin(cosz)
                break
            }
            r.x = Math.atan2(p.x, p.y)
          }

          p.x = r.x + this.long0
          p.y = r.y
          return p
        }

        var tpers_names = ["Tilted_Perspective", "tpers"]
        /* harmony default export */ var tpers = {
          init: tpers_init,
          forward: tpers_forward,
          inverse: tpers_inverse,
          names: tpers_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/lib/projections/geos.js

        function geos_init() {
          this.flip_axis = this.sweep === "x" ? 1 : 0
          this.h = Number(this.h)
          this.radius_g_1 = this.h / this.a

          if (this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) {
            throw new Error()
          }

          this.radius_g = 1.0 + this.radius_g_1
          this.C = this.radius_g * this.radius_g - 1.0

          if (this.es !== 0.0) {
            var one_es = 1.0 - this.es
            var rone_es = 1 / one_es

            this.radius_p = Math.sqrt(one_es)
            this.radius_p2 = one_es
            this.radius_p_inv2 = rone_es

            this.shape = "ellipse" // Use as a condition in the forward and inverse functions.
          } else {
            this.radius_p = 1.0
            this.radius_p2 = 1.0
            this.radius_p_inv2 = 1.0

            this.shape = "sphere" // Use as a condition in the forward and inverse functions.
          }

          if (!this.title) {
            this.title = "Geostationary Satellite View"
          }
        }

        function geos_forward(p) {
          var lon = p.x
          var lat = p.y
          var tmp, v_x, v_y, v_z
          lon = lon - this.long0

          if (this.shape === "ellipse") {
            lat = Math.atan(this.radius_p2 * Math.tan(lat))
            var r = this.radius_p / hypot(this.radius_p * Math.cos(lat), Math.sin(lat))

            v_x = r * Math.cos(lon) * Math.cos(lat)
            v_y = r * Math.sin(lon) * Math.cos(lat)
            v_z = r * Math.sin(lat)

            if ((this.radius_g - v_x) * v_x - v_y * v_y - v_z * v_z * this.radius_p_inv2 < 0.0) {
              p.x = Number.NaN
              p.y = Number.NaN
              return p
            }

            tmp = this.radius_g - v_x
            if (this.flip_axis) {
              p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp))
              p.y = this.radius_g_1 * Math.atan(v_z / tmp)
            } else {
              p.x = this.radius_g_1 * Math.atan(v_y / tmp)
              p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp))
            }
          } else if (this.shape === "sphere") {
            tmp = Math.cos(lat)
            v_x = Math.cos(lon) * tmp
            v_y = Math.sin(lon) * tmp
            v_z = Math.sin(lat)
            tmp = this.radius_g - v_x

            if (this.flip_axis) {
              p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp))
              p.y = this.radius_g_1 * Math.atan(v_z / tmp)
            } else {
              p.x = this.radius_g_1 * Math.atan(v_y / tmp)
              p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp))
            }
          }
          p.x = p.x * this.a
          p.y = p.y * this.a
          return p
        }

        function geos_inverse(p) {
          var v_x = -1.0
          var v_y = 0.0
          var v_z = 0.0
          var a, b, det, k

          p.x = p.x / this.a
          p.y = p.y / this.a

          if (this.shape === "ellipse") {
            if (this.flip_axis) {
              v_z = Math.tan(p.y / this.radius_g_1)
              v_y = Math.tan(p.x / this.radius_g_1) * hypot(1.0, v_z)
            } else {
              v_y = Math.tan(p.x / this.radius_g_1)
              v_z = Math.tan(p.y / this.radius_g_1) * hypot(1.0, v_y)
            }

            var v_zp = v_z / this.radius_p
            a = v_y * v_y + v_zp * v_zp + v_x * v_x
            b = 2 * this.radius_g * v_x
            det = b * b - 4 * a * this.C

            if (det < 0.0) {
              p.x = Number.NaN
              p.y = Number.NaN
              return p
            }

            k = (-b - Math.sqrt(det)) / (2.0 * a)
            v_x = this.radius_g + k * v_x
            v_y *= k
            v_z *= k

            p.x = Math.atan2(v_y, v_x)
            p.y = Math.atan((v_z * Math.cos(p.x)) / v_x)
            p.y = Math.atan(this.radius_p_inv2 * Math.tan(p.y))
          } else if (this.shape === "sphere") {
            if (this.flip_axis) {
              v_z = Math.tan(p.y / this.radius_g_1)
              v_y = Math.tan(p.x / this.radius_g_1) * Math.sqrt(1.0 + v_z * v_z)
            } else {
              v_y = Math.tan(p.x / this.radius_g_1)
              v_z = Math.tan(p.y / this.radius_g_1) * Math.sqrt(1.0 + v_y * v_y)
            }

            a = v_y * v_y + v_z * v_z + v_x * v_x
            b = 2 * this.radius_g * v_x
            det = b * b - 4 * a * this.C
            if (det < 0.0) {
              p.x = Number.NaN
              p.y = Number.NaN
              return p
            }

            k = (-b - Math.sqrt(det)) / (2.0 * a)
            v_x = this.radius_g + k * v_x
            v_y *= k
            v_z *= k

            p.x = Math.atan2(v_y, v_x)
            p.y = Math.atan((v_z * Math.cos(p.x)) / v_x)
          }
          p.x = p.x + this.long0
          return p
        }

        var geos_names = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"]
        /* harmony default export */ var geos = {
          init: geos_init,
          forward: geos_forward,
          inverse: geos_inverse,
          names: geos_names
        }

        // CONCATENATED MODULE: ./node_modules/proj4/projs.js

        /* harmony default export */ var proj4_projs = function (proj4) {
          proj4.Proj.projections.add(tmerc)
          proj4.Proj.projections.add(etmerc)
          proj4.Proj.projections.add(utm)
          proj4.Proj.projections.add(sterea)
          proj4.Proj.projections.add(stere)
          proj4.Proj.projections.add(somerc)
          proj4.Proj.projections.add(omerc)
          proj4.Proj.projections.add(lcc)
          proj4.Proj.projections.add(krovak)
          proj4.Proj.projections.add(cass)
          proj4.Proj.projections.add(laea)
          proj4.Proj.projections.add(aea)
          proj4.Proj.projections.add(gnom)
          proj4.Proj.projections.add(cea)
          proj4.Proj.projections.add(eqc)
          proj4.Proj.projections.add(poly)
          proj4.Proj.projections.add(nzmg)
          proj4.Proj.projections.add(mill)
          proj4.Proj.projections.add(sinu)
          proj4.Proj.projections.add(moll)
          proj4.Proj.projections.add(eqdc)
          proj4.Proj.projections.add(vandg)
          proj4.Proj.projections.add(aeqd)
          proj4.Proj.projections.add(ortho)
          proj4.Proj.projections.add(qsc)
          proj4.Proj.projections.add(robin)
          proj4.Proj.projections.add(geocent)
          proj4.Proj.projections.add(tpers)
          proj4.Proj.projections.add(geos)
        }
        // CONCATENATED MODULE: ./node_modules/proj4/lib/index.js

        core.defaultDatum = "WGS84" //default datum
        core.Proj = Proj
        core.WGS84 = new core.Proj("WGS84")
        core.Point = lib_Point
        core.toPoint = toPoint
        core.defs = lib_defs
        core.nadgrid = nadgrid
        core.transform = transform
        core.mgrs = mgrs
        core.version = "__VERSION__"
        proj4_projs(core)
        /* harmony default export */ var lib = (__webpack_exports__["default"] = core)

        /***/
      },
      /* 64 */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict"
        // ESM COMPAT FLAG
        __webpack_require__.r(__webpack_exports__)

        // EXPORTS
        __webpack_require__.d(__webpack_exports__, "VectorStyle", function () {
          return /* reexport */ VectorStyle
        })
        __webpack_require__.d(__webpack_exports__, "VectorTileImageryProvider", function () {
          return /* reexport */ VectorTileImageryProvider
        })

        // EXTERNAL MODULE: external {"commonjs2":"mars3d-cesium","amd":"mars3d-cesium","commonjs":"mars3d-cesium","root":"Cesium"}
        var Cesium = __webpack_require__(0)

        // CONCATENATED MODULE: ./src/VectorStyle.js

        function getColor(color) {
          if (typeof color == "string") {
            color = Cesium["Color"].fromCssColorString(color)
          } else if (Array.isArray(color)) {
            color = Cesium["Color"].fromBytes(color[0], color[1], color[2], color[3])
          }

          return color
        }
        /**
         *@param {Object} options 样式参数
         *@param {Cesium.Color|String}[options.outlineColor=Cesium.Color.YELLOW] 线或边颜色，仅线、面数据有效。
         *@param {Cesium.Color|String}[options.fillColor=Cesium.Color.fromBytes(0, 255, 255, 30)] 填充颜色，仅面数据有效。
         *@param {Cesium.Color|String}[options.backgroundColor] 背景色
         *@param {Number}[options.lineWidth=1.5] 线宽，仅线数据有效。
         *@param {Boolean}[options.outline=true] 是否显示边，仅面数据有效。
         *@param {Boolean}[options.fill=true] 是否填充，仅面数据有效。
         *@param {Cesium.Color|String}[options.fontColor=Cesium.Color.BLACK] 注记文本颜色
         *@param {Number}[options.fontSize=16] 注记文本字体大小，仅在数据有点时有效。
         *@param {String}[options.fontFamily="宋体"] 注记文本字体名称，仅在数据有点时有效。
         *@param {Boolean}[options.labelStroke] 是否显示注记文本轮廓线，仅在数据有点时有效。
         *@param {String}[options.labelStrokeWidth=1] 注记文本轮廓线宽，仅在数据有点时有效。
         *@param {Cesium.Color|String}[options.labelStrokeColor] 注记文本轮廓线颜色，仅在数据有点时有效。
         *
         *@param {Number}[options.pointSize=4] 注记点大小，仅在数据有点时有效。
         *@param {Cesium.Color|String}[options.pointColor=Cesium.Color.YELLOW] 注记点颜色，仅在数据有点时有效。
         *@param {String}[options.labelPropertyName='NAME'] 注记文本属性名称，仅在数据有点时有效。
         *@param {String}[options.makerImage=undefined] 注记点图标，如果设置点图标，则其他点样式参数无效，仅在数据有点时有效。
         *@param {Number}[options.ringRadius=2] 注记点样式为Ring时，圆心点大小（半径），仅在数据有点时有效。
         *@param {String}[options.pointStyle='Ring'] 注记点样式，仅在数据有点时有效。'Solid'为实心圆,'Ring'为带圆心的圆形,'Circle'为空心圆
         *@param {Number}[options.circleLineWidth=2] 注记点样式为Circle时，圆形线宽
         *@param {Boolean}[options.showMarker=true] 是否显示注记点，仅在数据有点时有效。
         *@param {Boolean}[options.showLabel=true] 是否显示文本，仅在数据有点时有效。
         *@param {Boolean}[options.showCenterLabel=true] 是否显示文本，仅对线和面数据有效。
         *@param {String}[options.centerLabelPropertyName] 几何中心注记文本属性名称，仅对线和面数据有效。
         *@param {Number}[options.labelOffsetX=10] 标注文本x方向偏移量，仅在数据有点时有效。以屏幕为参考，左上角为0，向右为正，单位为像素
         *@param {Number}[options.labelOffsetY=5] 标注文本y方向偏移量，仅在数据有点时有效。以屏幕为参考，左上角为0，向下为正，单位为像素
         *@param {Array.<Number>}[options.lineDash=undefined] 虚线样式，不设置则为实线
         *@param {String}[options.lineCap="butt"] 设置线条末端线帽的样式。 butt——默认。向线条的每个末端添加平直的边缘；round——向线条的每个末端添加圆形线帽；square——向线条的每个末端添加正方形线帽。
         *@param {String}[options.shadowColor=undefined] 设置用于阴影的颜色
         *@param {Number}[options.shadowBlur=undefined] 设置用于阴影的模糊级别
         *@param {Number}[options.shadowOffsetX=undefined] 设置阴影距形状的水平距离
         *@param {Number}[options.shadowOffsetY=undefined] 设置阴影距形状的垂直距离
         *@param {String}[options.lineJoin="miter"] 设置当两条线交汇时所创建边角的类型。bevel——斜角；round——创建圆角；miter——默认。创建尖角。
         *@param {Number}[options.miterLimit=10] 设置最大斜接长度。
         *@memberof Cesium
         *@constructor
         */

        function VectorStyle(options) {
          //*@param {Number}[options.lineOffset=undefined] 双线样式参数，两线间距，单位为米(m)。不设置则为单线
          if (typeof document == "undefined") {
            return options
          }

          options = (options, {})
          this.fillColor = (getColor(options.fillColor), getColor([0, 255, 255, 30]))
          this.fill = (options.fill, true)
          this.labelStroke = options.labelStroke
          this.labelStrokeWidth = (options.labelStrokeWidth, 1)
          this.labelStrokeColor = (getColor(options.labelStrokeColor), getColor([160, 99, 57])) //线样式

          this.outlineColor = (getColor(options.outlineColor), getColor("yellow"))
          this.backgroundColor = getColor(options.backgroundColor)
          this.lineWidth = (options.lineWidth, 1.5)
          this.outline = (options.outline, true) //注记样式

          this.fontColor = getColor((options.fontColor, "black"))
          this.fontSize = (options.fontSize, 16)
          this.fontFamily = (options.fontFamily, "宋体")
          this.pointSize = (options.pointSize, 4)
          this.pointColor = getColor((options.pointColor, "yellow"))
          this.pointStyle = (options.pointStyle, "Ring") //'Solid','Ring','Circle'

          this.labelPropertyName = (options.labelPropertyName, "NAME")
          this.ringRadius = (options.ringRadius, 2)
          this.circleLineWidth = (options.circleLineWidth, 2)

          if (Cesium["defined"](options.showMaker)) {
            this.showMarker = (options.showMaker, true)
          }

          if (Cesium["defined"](options.showMarker)) {
            this.showMarker = (options.showMarker, true)
          }

          this.showLabel = (options.showLabel, true)
          this.showCenterLabel = (options.showCenterLabel, false)
          this.centerLabelPropertyName = options.centerLabelPropertyName
          this.labelOffsetX = (options.labelOffsetX, 0)
          this.labelOffsetY = (options.labelOffsetY, 0)
          this.markerImage = options.markerImage
          this.lineDash = options.lineDash //this.lineOffset = options.lineOffset;

          this.lineCap = (options.lineCap, "butt")
          this.lineJoin = (options.lineJoin, "miter")
          this.shadowColor = getColor(options.shadowColor)
          this.shadowBlur = options.shadowBlur
          this.shadowOffsetX = options.shadowOffsetX
          this.shadowOffsetY = options.shadowOffsetY
          this.miterLimit = (options.miterLimit, 10)
          this.markerImageEl = null
          var makerImagePromise = null
          var deferred = Cesium["defer"]()
          this.readyPromise = deferred.promise
          var that = this

          if (typeof this.markerImage == "string") {
            var image = new Image()

            image.onload = function () {
              that.markerImageEl = this
              deferred.resolve(true)
            }

            image.onerror = function (err) {
              deferred.reject(err)
            }

            image.src = this.markerImage
          } else {
            if (this.markerImage instanceof Image || this.markerImage instanceof HTMLCanvasElement) {
              this.markerImageEl = this.markerImage
            }

            setTimeout(function () {
              deferred.resolve(true)
            }, 10)
          }
        }

        VectorStyle.prototype.clone = function () {
          var style = new VectorStyle()

          for (var i in this) {
            if (this.hasOwnProperty(i)) {
              if (typeof Cesium != "undefined" && this[i] instanceof Cesium["Color"]) {
                style[i] = Cesium["Color"].clone(this[i])
              } else {
                style[i] = this[i]
              }
            }
          }

          return style
        }
        /**
         *
         *@type {Cesium.VectorStyle}
         */

        VectorStyle.Default = new VectorStyle()
        // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
        var helpers_typeof = __webpack_require__(27)
        var typeof_default = /*#__PURE__*/ __webpack_require__.n(helpers_typeof)

        // EXTERNAL MODULE: external {"commonjs2":"@turf/turf","amd":"@turf/turf","commonjs":"@turf/turf","root":"turf"}
        var turf_root_turf_ = __webpack_require__(1)

        // CONCATENATED MODULE: ./src/core/Path.js
        function GetExtension(fname) {
          var start = fname.lastIndexOf(".")

          if (start >= 0) {
            return fname.substring(start, fname.length)
          }

          return ""
        }
        function GetFileName(fname) {
          var start = fname.lastIndexOf("/")

          if (start < 0) {
            return fname
          }

          return fname.substring(start + 1, fname.length)
        }
        function GetDirectoryName(fname) {
          var start = fname.lastIndexOf("/")

          if (start < 0) {
            return ""
          }

          return fname.substring(0, start)
        }
        function Combine(dir, fname) {
          return dir + fname
        }
        function ChangeExtension(fname, newExt) {
          return fname.replace(GetExtension(fname), newExt)
        }
        // CONCATENATED MODULE: ./src/core/LonLatProjection.js
        function LonLatProjection(width, height) {
          var imageSize = {
            width: width,
            height: height
          }

          function getBoundingRect(regions) {
            var LIMIT = Number.MAX_VALUE
            var min, max
            var boundingRect = {
              xMin: LIMIT,
              yMin: LIMIT,
              xMax: -LIMIT,
              yMax: -LIMIT
            }

            for (var i = 0, L = regions.length; i < L; i++) {
              var rect = regions[i].getBoundingRect()
              min = {
                x: rect.xMin,
                y: rect.yMin
              }
              max = {
                x: rect.xMax,
                y: rect.yMax
              }
              boundingRect.xMin = boundingRect.xMin < min.x ? boundingRect.xMin : min.x
              boundingRect.yMin = boundingRect.yMin < min.y ? boundingRect.yMin : min.y
              boundingRect.xMax = boundingRect.xMax > max.x ? boundingRect.xMax : max.x
              boundingRect.yMax = boundingRect.yMax > max.y ? boundingRect.yMax : max.y
            }

            return boundingRect
          }

          function project(coordinate, boundingRect) {
            var width = boundingRect.xMax - boundingRect.xMin
            var height = boundingRect.yMin - boundingRect.yMax
            var distanceX = Math.abs(coordinate[0] - boundingRect.xMin)
            var distanceY = coordinate[1] - boundingRect.yMax
            var percentX = distanceX / width
            var percentY = distanceY / height
            var px = percentX * imageSize.width,
              py = percentY * imageSize.height
            return {
              x: px,
              y: py
            }
          }

          function unproject(pt, boundingRect) {
            var width = boundingRect.xMax - boundingRect.xMin
            var height = boundingRect.yMin - boundingRect.yMax
            var lon = (pt.x / imageSize.width) * width,
              lat = (pt.y / imageSize.height) * height
            return [lon, lat]
          }

          this.project = project
          this.unproject = unproject
          this.getBoundingRect = getBoundingRect
        }
        // CONCATENATED MODULE: ./src/core/drawRoundedRect.js
        var Point = function Point(x, y) {
          return {
            x: x,
            y: y
          }
        }

        function drawRoundedRect(rect, r, ctx) {
          var ptA = Point(rect.x + r, rect.y)
          var ptB = Point(rect.x + rect.width, rect.y)
          var ptC = Point(rect.x + rect.width, rect.y + rect.height)
          var ptD = Point(rect.x, rect.y + rect.height)
          var ptE = Point(rect.x, rect.y)
          ctx.beginPath()
          ctx.moveTo(ptA.x, ptA.y)
          ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r)
          ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r)
          ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r)
          ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r)
          ctx.fill()
          ctx.stroke()
        }
        // CONCATENATED MODULE: ./src/core/drawText.js

        /**
* Writes the given text into a new canvas.  The canvas will be sized to fit the text.
* If text is blank, returns undefined.
* - 依赖Cesium.writeTextToCanvas
* @memberof Cesium.Util
* @method
* @name drawText
* @param {String} text The text to write.
* @param {Object} [options] Object with the following properties:
* @param {String} [options.font='10px sans-serif'] The CSS font to use.
* @param {String} [options.textBaseline='bottom'] The baseline of the text.
* @param {Boolean} [options.fill=true] Whether to fill the text.
* @param {Boolean} [options.stroke=false] Whether to stroke the text.
* @param {Color} [options.fillColor=Cesium.Color.WHITE] The fill color.
* @param {Color} [options.strokeColor=Cesium.Color.BLACK] The stroke color.
* @param {Number} [options.strokeWidth=1] The stroke width.
* @param {Color} [options.backgroundColor=Cesium.Color.TRANSPARENT] The background color of the canvas.
* @param {Number} [options.padding=0] The pixel size of the padding to add around the text.
* @returns {Canvas} A new canvas with the given text drawn into it.  The dimensions object
*                   from measureText will also be added to the returned canvas. If text is
*                   blank, returns undefined.
*@example
    var opts={
        font:'10px sans-serif',
        textBaseline:'bottom',
        fill:true,
        stroke:false,
        strokeWidth:1,
        fillColor:Cesium.Color.WHITE,
        strokeColor:Cesium.Color.BLACK,
        backgroundColor:Cesium.Color.TRANSPARENT,
        padding:0
    };
    var textCanvas=drawText('hello world',opts)
*
*/

        function drawText(text, options) {
          options = options
            ? options
            : {
                font: "20px sans-serif"
              }
          var backcolor = options.backgroundColor
          var padding = options.padding ? options.padding : 0
          delete options.backgroundColor
          delete options.padding
          var lines = text.split(/[\r]?\n+/)
          var lineImgs = []
          var w = 0,
            h = 0

          for (var i = 0; i < lines.length; i++) {
            var tempCv = Object(Cesium["writeTextToCanvas"])(lines[i], options)

            if (tempCv) {
              lineImgs.push(tempCv)
              h += tempCv.height
              w = Math.max(w, tempCv.width)
            }
          }

          options.backgroundColor = backcolor
          options.padding = padding
          var cv = options.canvas

          if (!cv) {
            w += padding * 2
            h += padding * 2.25
            cv = document.createElement("canvas")
            cv.width = w
            cv.height = h
          }

          var ctx = cv.getContext("2d")

          if (backcolor) {
            ctx.fillStyle = backcolor.toCssColorString()
          } else {
            ctx.fillStyle = undefined
          }

          if (options.border) {
            ctx.lineWidth = options.borderWidth
            ctx.strokeStyle = options.borderColor.toCssColorString()
          }

          if (!options.borderRadius) {
            if (backcolor) {
              ctx.fillRect(0, 0, cv.width, cv.height)
            }

            if (options.border) {
              ctx.strokeRect(0, 0, cv.width, cv.height)
            }
          } else {
            drawRoundedRect(
              {
                x: 0,
                y: 0,
                width: cv.width,
                height: cv.height
              },
              options.borderRadius,
              ctx
            )
          }

          delete ctx.strokeStyle
          delete ctx.fillStyle
          var y = 0

          for (var _i = 0; _i < lineImgs.length; _i++) {
            ctx.drawImage(lineImgs[_i], 0 + padding, y + padding)
            y += lineImgs[_i].height
          }

          return cv
        }
        // CONCATENATED MODULE: ./src/core/pointToFeatureDistance.js

        function pointToPolygonDistance(pt, polygon, options) {
          var line = turf_root_turf_["polygonToLine"](polygon)

          if (line.type == "Feature") {
            if (line.geometry.type == "LineString") {
              return turf_root_turf_["pointToLineDistance"](pt, line, options)
            } else {
              return pointToMultiLineDistance(pt, line, options)
            }
          } else if (line.type == "FeatureCollection") {
            var dist = Number.MAX_VALUE
            var fcs = line
            turf_root_turf_["featureEach"](fcs, function (fc) {
              var geometry = fc.geometry

              if (!geometry) {
                return
              }

              if (geometry.type == "LineString") {
                dist = Math.min(turf_root_turf_["pointToLineDistance"](pt, line, options), dist)
              } else {
                dist = Math.min(pointToMultiLineDistance(pt, line, options), dist)
              }
            })

            if (dist == Number.MAX_VALUE) {
              return undefined
            }

            return dist
          }
        }

        function pointToMultiPolygonDistance(pt, multiPolygon, options) {
          var coordinates = turf_root_turf_["getCoords"](multiPolygon)
          var lineString = null
          var dist = Number.MAX_VALUE
          coordinates.forEach(function (polygonCoords) {
            var polygon = turf_root_turf_["polygon"](polygonCoords)
            var timepDist = pointToPolygonDistance(pt, polygon, options)
            dist = Math.min(timepDist, dist)
          })
          coordinates = []

          if (dist == Number.MAX_VALUE) {
            return undefined
          }

          return dist
        }

        function pointToMultiLineDistance(pt, multiLineString, options) {
          var coordinates = turf_root_turf_["getCoords"](multiLineString)
          var lineString = null
          var dist = Number.MAX_VALUE
          coordinates.forEach(function (lineCoords) {
            lineString = turf_root_turf_["lineString"](lineCoords)
            var timepDist = turf_root_turf_["pointToLineDistance"](pt, lineString, options)
            dist = Math.min(timepDist, dist)
          })
          coordinates = []

          if (dist == Number.MAX_VALUE) {
            return undefined
          }

          return dist
        }

        function pointToFeatureDistance(pt, fc, options) {
          var dist = undefined

          switch (fc.geometry.type) {
            case "Point":
              dist = turf_root_turf_["distance"](pt, fc, options)
              break

            case "MultiPoint":
              {
                var coordinates = turf_root_turf_["getCoords"](fc)
                var pts = []
                coordinates.forEach(function (coord) {
                  pts.push(turf_root_turf_["point"](coord))
                })
                pts = turf_root_turf_["featureCollection"](pts)
                var nearest = turf_root_turf_["nearestPoint"](pt, pts)
                pts = []
                dist = nearest.properties.distanceToPoint
              }
              break

            case "LineString":
              dist = turf_root_turf_["pointToLineDistance"](pt, fc, options)
              break

            case "MultiLineString":
              dist = pointToMultiLineDistance(pt, fc, options)
              break

            case "Polygon":
              dist = pointToPolygonDistance(pt, fc, options)
              break

            case "MultiPolygon":
              dist = pointToMultiPolygonDistance(pt, fc, options)
              break

            default:
              break
          }

          return dist
        }
        // EXTERNAL MODULE: ./node_modules/shpjs/lib/index.js
        var lib = __webpack_require__(6)
        var lib_default = /*#__PURE__*/ __webpack_require__.n(lib)

        // CONCATENATED MODULE: ./src/core/readAsArrayBuffer.js
        function readAsArrayBuffer(file) {
          return new Promise(function (resolve, reject) {
            var fr = new FileReader()

            fr.onload = function (e) {
              resolve(e.target.result)
            }

            fr.onerror = function (e) {
              reject(e.error)
            }

            fr.readAsArrayBuffer(file)
          })
        }
        // CONCATENATED MODULE: ./src/core/readAsText.js
        function readAsText(file, encoding) {
          return new Promise(function (resolve, reject) {
            var fr = new FileReader()

            fr.onload = function (e) {
              resolve(e.target.result)
            }

            fr.onerror = function (e) {
              reject(e.error)
            }

            fr.readAsText(file, encoding)
          })
        }
        // CONCATENATED MODULE: ./src/core/shp.js

        function groupFiles(files) {
          var group = {}

          for (var i = 0; i < files.length; i++) {
            var name = ChangeExtension(files[i].name, "")

            if (!group[name]) {
              group[name] = []
            }

            group[name].push(files[i])
          }

          return group
        }
        function loadShp(base, whiteList) {
          return lib_default()(base, whiteList)
        }
        function parseShpFiles(files, encoding) {
          if (!files || files.length > 0) {
            var df = Cesium["defer"]()
            var promise = df.promise
            var shpFile, dbfFile, prjFile

            for (var i = 0; i < files.length; i++) {
              if (files[i].name.toLocaleLowerCase().indexOf(".shp") > 0) {
                shpFile = files[i]
              }

              if (files[i].name.toLocaleLowerCase().indexOf(".prj") > 0) {
                prjFile = files[i]
              }

              if (files[i].name.toLocaleLowerCase().indexOf(".dbf") > 0) {
                dbfFile = files[i]
              }
            }

            if (!shpFile || !prjFile || !dbfFile) {
              df.reject(new Error("打开文件失败,请通过ctrl+同时选择shp、prj、dbf三个文件"))
              return promise
            }

            readAsArrayBuffer(shpFile)
              .then(function (shpBuffer) {
                readAsText(prjFile, encoding)
                  .then(function (prjBuffer) {
                    readAsArrayBuffer(dbfFile)
                      .then(function (dbfBuffer) {
                        var parsed = lib_default.a.combine([
                          lib_default.a.parseShp(shpBuffer, prjBuffer),
                          lib_default.a.parseDbf(dbfBuffer, encoding)
                        ])
                        parsed.fileName = shpFile.name.toLocaleLowerCase()
                        df.resolve(parsed)
                      })
                      ["catch"](function (err) {
                        df.reject(err)
                      })
                  })
                  ["catch"](function (err) {
                    df.reject(err)
                  })
              })
              ["catch"](function (err) {
                df.reject(err)
              })
            return promise
          } else {
            throw new Error("文件列表不能为空")
          }
        }
        function isShpLocalFiles(files) {
          var isFile = files.length >= 3

          if (!isFile) {
            return false
          }

          var shpFile, dbfFile, prjFile

          for (var i = 0; i < files.length; i++) {
            var file = files[i]

            if (!(file instanceof File || (file instanceof Blob && file.name))) {
              return false
            }

            if (files[i].name.toLocaleLowerCase().indexOf(".shp") > 0) {
              shpFile = files[i]
            }

            if (files[i].name.toLocaleLowerCase().indexOf(".prj") > 0) {
              prjFile = files[i]
            }

            if (files[i].name.toLocaleLowerCase().indexOf(".dbf") > 0) {
              dbfFile = files[i]
            }
          }

          if (!shpFile || !prjFile || !dbfFile) {
            return false
          }

          return true
        }
        // CONCATENATED MODULE: ./src/VectorTileImageryProvider.js

        function VectorTileImageryProvider() {
          var _this = this

          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}

          if (!Cesium["defined"](options.source)) {
            return
          }

          this.options = options
          var ext = null
          var isLocalShpFile = false

          if (typeof options.source == "string") {
            var source = options.source.toLowerCase()
            ext = GetExtension(source)

            if (ext !== ".shp" && ext !== ".json" && ext !== ".geojson" && ext !== ".topojson") {
              throw new Error("The data  options.source provider is not supported.")
            }
          } else if (options.source.type && options.source.type == "FeatureCollection") {
            //
          } else if (isShpLocalFiles(options.source)) {
            isLocalShpFile = true
          } else {
            throw new Error("The data  options.source provider is not supported.")
          }

          this._rectangle = options.rectangle
          this._tilingScheme = new Cesium["GeographicTilingScheme"]({
            ellipsoid: options.ellipsoid
          })
          this._tileWidth = (options.tileWidth?? 256)
          this._tileHeight = (options.tileHeight?? 256)
          this._url = options.source
          this._fileExtension = ext
          this._removeDuplicate = (options.removeDuplicate?? true)
          this._allowPick = (options.allowPick?? false)
          this._simplifyTolerance = (options.simplifyTolerance?? 0.01)
          this._simplify = (options.simplify?? false)

          this._maximumLevel = (options.maximumLevel?? 22)
          this._minimumLevel = (options.minimumLevel?? 3)
          this._showMaximumLevel = (options.showMaximumLevel?? true)
          this._makerImage = options.markerImage
          this._tileCacheSize = (options.tileCacheSize?? 200)

          if (typeof_default()(options.defaultStyle) == "object" && !(options.defaultStyle instanceof VectorStyle)) {
            options.defaultStyle = new VectorStyle(options.defaultStyle)
          }

          this._defaultStyle = (options.defaultStyle?? VectorStyle.Default.clone())
          this._styleFilter = typeof options.styleFilter == "function" ? options.styleFilter : undefined
          this.clustering = options.clustering
          this._errorEvent = new Cesium["Event"]()
          this._featuresPicked = new Cesium["Event"]()
          this._readyPromise = Cesium["defer"]()
          this._ready = false
          this._state = VectorTileImageryProvider.State.READY
          this._cache = {}
          this._count = 0
          this.zIndex = options.zIndex
          this._bbox = null
          /**
           * 如果需要支持可以点击拾取要素进行要素查询则存储原始的geojson
           * @private
           */

          this._geoJSON = null
          var that = this
          var promises = []

          if (typeof this._makerImage == "string") {
            promises.push(
              new Promise(function (resolve, reject) {
                var image = new Image()

                image.onload = function () {
                  resolve(this)
                  that._makerImageEl = this
                }

                image.onerror = function (err) {
                  resolve(err)
                }

                image.src = _this._makerImage
              })
            )
          }

          var shpDf = Cesium["defer"]()
          promises.push(shpDf.promise)
          this._state = VectorTileImageryProvider.State.SHPLOADING

          if (ext) {
            switch (ext) {
              case ".shp":
                {
                  var url = this._url

                  var _ext = GetExtension(url)

                  url = url.replace(_ext, "")
                  loadShp(url).then(onSuccess, function (err) {
                    console.log("load shp file error：" + err)
                    that.readyPromise.reject(err)
                  })
                }
                break

              case ".json":
              case ".geojson":
              case ".topojson":
                Cesium["Resource"]
                  .fetchJson(this._url)
                  .then(function (geojson) {
                    onSuccess(geojson)
                  })
                  ["catch"](function (err) {
                    console.log(err)
                  })
                break

              default:
                throw new Error("The file  options.source provider is not supported.")
            }
          } else {
            if (isLocalShpFile) {
              var prms = parseShpFiles(that._url, that.options.encoding || "gbk")

              if (prms) {
                prms.then(onSuccess)["catch"](function (err) {
                  this._readyPromise.reject(err)
                })
              } else {
                this._readyPromise.reject(new Error("The file  options.source provider is not supported."))
              }
            } else {
              setTimeout(function () {
                if (Array.isArray(that._url)) {
                  this._readyPromise.reject(new Error("The data  options.source provide is not supported."))
                } else {
                  onSuccess(that._url)
                }
              }, 10)
            }
          }

          this._lineGeoJSON = null
          this._outlineGeoJSON = null
          this._pointGeoJSON = null
          this._polygonJSON = null
          this._onlyPoint = false
          this._lineOnly = false
          this._polygonOnly = false

          function onSuccess(geoJSON) {
            if (that._allowPick) {
              that._geoJSON = geoJSON
            }

            var tolerance = that._simplifyTolerance
            var lines = [],
              outlines = [],
              points = [],
              polygons = []
            var onlyPoint = true,
              lineOnly = true,
              polygonOnly = true
            var simplified

            function groupByCenterLabelPropertyName(geoJSON, centerLabelPropertyName) {
              var dic = {}
              turf_root_turf_["featureEach"](geoJSON, function (fc) {
                var geometry = fc.geometry

                if (!geometry) {
                  return
                }

                if (
                  (geometry.type == "Polygon" || geometry.type == "MultiPolygon") &&
                  that._defaultStyle.showCenterLabel &&
                  that._defaultStyle.centerLabelPropertyName &&
                  fc.properties.hasOwnProperty(centerLabelPropertyName)
                ) {
                  if (!dic[fc.properties[centerLabelPropertyName]]) {
                    dic[fc.properties[centerLabelPropertyName]] = []
                  }

                  dic[fc.properties[centerLabelPropertyName]].push(fc)
                }
              })
              var keys = Object.keys(dic)

              for (var i = 0; i < keys.length; i++) {
                var fc = dic[keys[i]][0]
                var fcs = turf_root_turf_["featureCollection"](dic[keys[i]])
                var center = turf_root_turf_["center"](fcs)
                points.push(center)
                center.properties = fc.properties
                delete dic[keys[i]]
              }
            }

            if (that._defaultStyle.showCenterLabel && that._defaultStyle.centerLabelPropertyName) {
              that._defaultStyle.showLabel = true
              that._defaultStyle.labelPropertyName = that._defaultStyle.centerLabelPropertyName
              groupByCenterLabelPropertyName(geoJSON, that._defaultStyle.centerLabelPropertyName)
            }

            turf_root_turf_["featureEach"](geoJSON, function (fc) {
              var geometry = fc.geometry

              if (!geometry) {
                return
              }

              if (geometry.type == "MultiPolygon") {
                var polygonCoords = turf_root_turf_["getCoords"](fc)
                polygonCoords.forEach(function (coords) {
                  geoJSON.features.push(turf_root_turf_["polygon"](coords, fc.properties))
                })
                polygonCoords = []
              }
            })

            for (var i = 0; i < geoJSON.features.length; i++) {
              var feature = geoJSON.features[i]

              if (!feature) {
                continue
              }

              var geometry = feature.geometry

              if (!geometry) {
                continue
              }

              if (geometry.type == "MultiPolygon") {
                geoJSON.features.splice(i, 1)
              }
            }

            if (that._removeDuplicate) {
              geoJSON = turf_root_turf_["removeDuplicate"](geoJSON)
            }

            turf_root_turf_["featureEach"](geoJSON, function (feature, index) {
              var geometry = feature.geometry

              if (!geometry) {
                return
              }

              if (geometry.type == "Point" || geometry.type == "MultiPoint") {
                points.push(feature)
                lineOnly = false
                polygonOnly = false
              } else if (
                that._defaultStyle.showCenterLabel &&
                that._defaultStyle.centerLabelPropertyName &&
                geometry.type !== "Polygon" &&
                geometry.type !== "MultiPolygon"
              ) {
                that._defaultStyle.showLabel = true
                that._defaultStyle.labelPropertyName = that._defaultStyle.centerLabelPropertyName
                var center = turf_root_turf_["centerOfMass"](feature)
                points.push(center)
                center.properties = feature.properties
              }

              if (geometry.type == "Polygon" || geometry.type == "MultiPolygon") {
                var lineString = turf_root_turf_["polygonToLineString"](feature)

                if (lineString) {
                  if (lineString.type == "FeatureCollection") {
                    outlines = outlines.concat(lineString.features)
                  } else if (lineString.type == "Feature") {
                    outlines = outlines.concat(lineString)
                  }
                }

                onlyPoint = false
                lineOnly = false

                if (that._simplify) {
                  simplified = turf_root_turf_["simplify"](feature, {
                    tolerance: tolerance,
                    highQuality: false
                  })
                  polygons.push(simplified)
                  simplified = null
                } else {
                  polygons.push(feature)
                }
              }

              if (geometry.type == "MultiLineString" || geometry.type == "LineString") {
                if (that._simplify) {
                  simplified = turf_root_turf_["simplify"](feature, {
                    tolerance: tolerance,
                    highQuality: false
                  })
                  lines.push(simplified)
                  simplified = null
                } else {
                  lines.push(feature)
                }

                onlyPoint = false
                polygonOnly = false
              }
            })

            if (lines.length > 0) {
              that._lineGeoJSON = turf_root_turf_["featureCollection"](lines)
              lines = null
            }

            if (outlines.length > 0) {
              outlines.forEach(function (outline) {
                outline.properties._outline = true
              })
              that._outlineGeoJSON = turf_root_turf_["featureCollection"](outlines)
              outlines = null
            }

            if (points.length > 0) {
              that._pointGeoJSON = turf_root_turf_["featureCollection"](points)
              points = null
            }

            if (polygons.length > 0) {
              that._polygonJSON = turf_root_turf_["featureCollection"](polygons)
              polygons = null
            }

            that._lineOnly = lineOnly
            that._polygonOnly = polygonOnly
            that._onlyPoint = onlyPoint
            that._state = VectorTileImageryProvider.State.LOADED
            var bbox = turf_root_turf_["bbox"](geoJSON)

            if (bbox[0] == bbox[2]) {
              bbox[0] = bbox[0] - 0.1
              bbox[2] = bbox[2] + 0.1
            }

            if (bbox[1] == bbox[3]) {
              bbox[1] = bbox[1] - 0.1
              bbox[3] = bbox[3] + 0.1
            } // that.rectangle = Cesium.Cesium.Rectangle.fromDegrees(that._bbox[0], that._bbox[1], that._bbox[2], that._bbox[3]);

            that._bbox = Cesium["Rectangle"].fromDegrees(bbox[0], bbox[1], bbox[2], bbox[3])

            if (!that._rectangle) {
              that._rectangle = that._bbox
            }

            geoJSON = null
            shpDf.resolve(that)
          }

          Promise.all(promises)
            .then(function () {
              that._ready = that._state == VectorTileImageryProvider.State.LOADED

              that._createCanvas()

              VectorTileImageryProvider.instanceCount++

              that._readyPromise.resolve(true)

              that._state = VectorTileImageryProvider.State.COMPELTED
            })
            ["catch"](function (err) {
              that._readyPromise.reject(err)
            })
        }
        /**
         *样式设置函数
         *@callback  Cesium.VectorTileImageryProvider~StyleFilterCallback
         *@param {Geojson.Feature}feature 当前要素（用Geojson.Feature存储）
         *@param {Cesium.VectorStyle}style 即将应用与当前要素的样式，可以通过修改该参数中的各样式设置选项来针对当前要素进行特殊的样式设置。
         *修改后只对当前要素有效，不会修改MeteoLib.Scene.VectorTileImageryProvider的默认样式
         *@param {Number}x
         *@param {Number}y
         *@param {Number}level
         */

        /**
         *聚类函数
         *@callback  Cesium.VectorTileImageryProvider~clusteringCallback
         *@param {Array<Feature<Point|MultiPoint>>}features
         * @param {CanvasRenderingContext2D}context
         * @param {CanvasRenderingContext2D}tileBBox
         *@param {Number}x
         *@param {Number}y
         *@param {Number}level
         */

        VectorTileImageryProvider.instanceCount = 0
        VectorTileImageryProvider._currentTaskCount = 0
        VectorTileImageryProvider._maxTaskCount = 3
        VectorTileImageryProvider.State = {
          READY: 0,
          SHPLOADING: 1,
          CLIPPING: 3,
          GEOJSONDRAWING: 4,
          COMPELTED: 5
        }
        Object.defineProperties(VectorTileImageryProvider.prototype, {
          /**
           *
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Cesium.VectorTileImageryProvider~StyleFilterCallback}
           */
          styleFilter: {
            get: function get() {
              return this._styleFilter
            },
            set: function set(val) {
              this._styleFilter = val
            }
          },

          /**
           *
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Cesium.VectorStyle}
           * @readonly
           */
          defaultStyle: {
            get: function get() {
              return this._defaultStyle
            }
          },

          /**
           * Gets the proxy used by this provider.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Proxy}
           * @readonly
           */
          proxy: {
            get: function get() {
              return undefined
            }
          },

          /**
           * Gets the width of each tile, in pixels. This function should
           * not be called before {@link Cesium.VectorTileImageryProvider#ready} returns true.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Number}
           * @readonly
           */
          tileWidth: {
            get: function get() {
              return this._tileWidth
            }
          },

          /**
           * Gets the height of each tile, in pixels.  This function should
           * not be called before {@link Cesium.VectorTileImageryProvider#ready} returns true.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Number}
           * @readonly
           */
          tileHeight: {
            get: function get() {
              return this._tileHeight
            }
          },

          /**
           * Gets the maximum level-of-detail that can be requested.  This function should
           * not be called before {@link Cesium.VectorTileImageryProvider#ready} returns true.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Number}
           * @readonly
           */
          maximumLevel: {
            get: function get() {
              return this._showMaximumLevel ? this._maximumLevel : 22
            }
          },

          /**
           * Gets the minimum level-of-detail that can be requested.  This function should
           * not be called before {@link Cesium.VectorTileImageryProvider#ready} returns true.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Number}
           * @readonly
           */
          minimumLevel: {
            get: function get() {
              //if (this._minimumLevel <5) {
              //    return this._minimumLevel;
              //}
              return 0
            }
          },

          /**
           * Gets the tiling scheme used by this provider.  This function should
           * not be called before {@link Cesium.VectorTileImageryProvider#ready} returns true.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {TilingScheme}
           * @readonly
           */
          tilingScheme: {
            get: function get() {
              return this._tilingScheme
            }
          },

          /**
           * Gets the rectangle, in radians, of the imagery provided by this instance.  This function should
           * not be called before {@link Cesium.VectorTileImageryProvider#ready} returns true.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Cesium.Rectangle}
           * @readonly
           */
          rectangle: {
            get: function get() {
              return this._rectangle //_tilingScheme.rectangle;
            }
          },

          /**
           * Gets the tile discard policy.  If not undefined, the discard policy is responsible
           * for filtering out "missing" tiles via its shouldDiscardImage function.  If this function
           * returns undefined, no tiles are filtered.  This function should
           * not be called before {@link Cesium.VectorTileImageryProvider#ready} returns true.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {TileDiscardPolicy}
           * @readonly
           */
          tileDiscardPolicy: {
            get: function get() {
              return undefined
            }
          },

          /**
           * Gets an event that is raised when the imagery provider encounters an asynchronous error.  By subscribing
           * to the event, you will be notified of the error and can potentially recover from it.  Event listeners
           * are passed an instance of {@link TileProviderError}.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Event}
           * @readonly
           */
          errorEvent: {
            get: function get() {
              return this._errorEvent
            }
          },

          /**
           *  要素查询有结果时，即要素被点击时触发该事件
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Event}
           * @readonly
           */
          featuresPicked: {
            get: function get() {
              return this._featuresPicked
            }
          },

          /**
           * Gets a value indicating whether or not the provider is ready for use.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Boolean}
           * @readonly
           */
          ready: {
            get: function get() {
              return this._ready
            }
          },

          /**
           * Gets a promise that resolves to true when the provider is ready for use.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Promise.<Boolean>}
           * @readonly
           */
          readyPromise: {
            get: function get() {
              return this._readyPromise.promise
            }
          },

          /**
           * Gets the credit to display when this imagery provider is active.  Typically this is used to credit
           * the source of the imagery.  This function should not be called before {@link Cesium.VectorTileImageryProvider#ready} returns true.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Credit}
           * @readonly
           */
          credit: {
            get: function get() {
              return undefined
            }
          },

          /**
           * Gets a value indicating whether or not the images provided by this imagery provider
           * include an alpha channel.  If this property is false, an alpha channel, if present, will
           * be ignored.  If this property is true, any images without an alpha channel will be treated
           * as if their alpha is 1.0 everywhere.  When this property is false, memory usage
           * and texture upload time are reduced.
           * @memberof Cesium.VectorTileImageryProvider.prototype
           * @type {Boolean}
           * @readonly
           */
          hasAlphaChannel: {
            get: function get() {
              return true
            }
          }
        })

        VectorTileImageryProvider.prototype._createCanvas = function () {
          this._canvas = document.createElement("canvas")
          this._canvas.width = this._tileWidth
          this._canvas.height = this._tileHeight
          this._context = this._canvas.getContext("2d", { willReadFrequently: true })

          if (this._defaultStyle.backgroundColor) {
            if (this._defaultStyle.backgroundColor instanceof Cesium["Color"]) {
              this._context.fillStyle = this._defaultStyle.backgroundColor.toCssColorString()
            } else {
              this._context.fillStyle = this._defaultStyle.backgroundColor
            }

            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height)
          }

          this._context.lineWidth = this._defaultStyle.lineWidth

          if (this._defaultStyle.outlineColor instanceof Cesium["Color"]) {
            this._context.strokeStyle = this._defaultStyle.outlineColor.toCssColorString() // "rgb(255,255,0)";
          } else {
            this._context.strokeStyle = this._defaultStyle.outlineColor // "rgb(255,255,0)";
          }

          if (this._defaultStyle.fillColor instanceof Cesium["Color"]) {
            this._context.fillStyle = this._defaultStyle.fillColor.toCssColorString() // "rgba(0,255,255,0.0)";
          } else {
            this._context.fillStyle = this._defaultStyle.fillColor // "rgba(0,255,255,0.0)";
          }
        } //用当前瓦片（Tile）矩形裁剪geojson并返回裁剪结果

        VectorTileImageryProvider.prototype._clipGeojson = function (rectangle) {
          // let that = this;
          var bbox = [
            Cesium["Math"].toDegrees(rectangle.west),
            Cesium["Math"].toDegrees(rectangle.south),
            Cesium["Math"].toDegrees(rectangle.east),
            Cesium["Math"].toDegrees(rectangle.north)
          ] // let polygonBBox = turf.bboxPolygon(bbox);
          //    turf.polygon([[
          //    [bbox[0], bbox[1]],//sw
          //    [bbox[2], bbox[1]],//se
          //    [bbox[2], bbox[3]],//ne
          //    [bbox[0], bbox[3]],//nw
          //    [bbox[0], bbox[1]],//sw
          //]]);

          var pointsBBox = [
            [bbox[0], bbox[1]],
            [bbox[2], bbox[1]],
            [bbox[2], bbox[3]],
            [bbox[0], bbox[3]],
            [bbox[0], bbox[1]]
          ]

          for (var i = 0; i < pointsBBox.length; i++) {
            var point = turf_root_turf_["point"](pointsBBox[i])
            pointsBBox[i] = point
          }

          pointsBBox = turf_root_turf_["featureCollection"](pointsBBox)
          var features = []

          if (this._pointGeoJSON) {
            //为了避免出现在边界的文字只画到一半，同时把周边切片包含的点也放在本切片绘制
            var lonW = (bbox[2] - bbox[0]) / 2,
              latH = (bbox[3] - bbox[1]) / 2
            var polygonBBox4Points = turf_root_turf_["bboxPolygon"]([bbox[0] - lonW, bbox[1] - latH, bbox[2] + lonW, bbox[3] + latH])
            var fcBBox = turf_root_turf_["featureCollection"]([polygonBBox4Points])
            var pts = turf_root_turf_["within"](this._pointGeoJSON, fcBBox)
            features = features.concat(pts.features)
          }

          var canClipGeojsons = []

          if (this._polygonJSON) {
            canClipGeojsons.push(this._polygonJSON)
          }

          if (this._lineGeoJSON) {
            canClipGeojsons.push(this._lineGeoJSON)
          }

          if (this._outlineGeoJSON) {
            canClipGeojsons.push(this._outlineGeoJSON)
          }

          var clipped

          function clippedExists() {
            var clippedCoords = turf_root_turf_["getCoords"](clipped)
            var exists = false

            for (var _i = 0; _i < features.length; _i++) {
              var keys1 = Object.keys(clipped.properties)
              var keys2 = Object.keys(features[_i].properties)

              if (keys1.length != keys2.length) {
                break
              }

              var kEquals = true

              for (var k_i = 0; k_i < keys1.length; k_i++) {
                if (keys1[k_i] != keys2[k_i]) {
                  kEquals = false
                  break
                }
              }

              if (!kEquals) {
                break
              }

              kEquals = true

              for (var _k_i = 0; _k_i < keys1.length; _k_i++) {
                if (clipped.properties[keys1[_k_i]] != features[_i].properties[keys1[_k_i]]) {
                  kEquals = false
                  break
                }
              }

              if (!kEquals) {
                break
              }

              var tempCoords = turf_root_turf_["getCoords"](features[_i])

              if (clippedCoords.length && clippedCoords.length == tempCoords.length) {
                var equals = true

                for (var j = 0; j < clippedCoords.length; j++) {
                  var c1 = clippedCoords[j],
                    c2 = tempCoords[j]

                  if (!Array.isArray(c1[0])) {
                    try {
                      equals = c1[0] == c2[0] && c1[1] == c2[1]
                    } catch (e) {
                      console.log(e)
                    }
                  } else if (c1.length == c2.length) {
                    for (var k = 0; k < c1.length; k++) {
                      if (c1[k][0] != c2[k][0] || c1[k][1] != c2[k][1]) {
                        equals = false
                        break
                      }
                    }
                  } else {
                    equals = false
                    break
                  }

                  if (equals) {
                    break
                  }
                }

                if (equals) {
                  exists = true
                  break
                }
              }
            }

            return exists
          }

          canClipGeojsons.forEach(function (geojson) {
            turf_root_turf_["featureEach"](geojson, function (currentFeature, currentIndex) {
              if (!currentFeature.geometry) {
                return
              }

              clipped = null

              try {
                //if (currentFeature.geometry.type == "Polygon"
                //    || currentFeature.geometry.type == "MultiPolygon") {
                //    //let fcs = turf.featureCollection([currentFeature]);
                //    //if (!turf.within(pointsBBox, fcs))
                //    clipped = turf.intersect(currentFeature, polygonBBox);
                //    //else
                //    //    clipped = polygonBBox;
                //    //fcs = null;
                //}
                if (!clipped) {
                  clipped = turf_root_turf_["bboxClip"](currentFeature, bbox)
                }

                if (clipped && clipped.geometry.coordinates.length > 0) {
                  var empty = true

                  for (var _i2 = 0; _i2 < clipped.geometry.coordinates.length; _i2++) {
                    if (clipped.geometry.coordinates[_i2].length > 0) {
                      empty = false
                      break
                    }
                  }

                  if (!empty) {
                    // if (!clippedExists()) {
                    features.push(clipped) //}
                  } else {
                    //clipped = turf.intersect(currentFeature, polygonBBox);
                    //if (clipped) {
                    //    features.push(clipped);
                    //}
                    //let fcs = turf.featureCollection([currentFeature]);
                    //if (turf.within(pointsBBox, fcs)) {
                    //    features.push(polygonBBox);
                    //}
                    //fcs = null;
                  }
                }
              } catch (e) {
                var coordinates = []
                currentFeature.geometry.coordinates.forEach(function (contour) {
                  if (contour.length > 3) {
                    coordinates.push(contour)
                  }
                })
                currentFeature.geometry.coordinates = coordinates

                try {
                  clipped = turf_root_turf_["bboxClip"](currentFeature, bbox)

                  if (clipped && clipped.geometry.coordinates.length > 0) {
                    //if (!clippedExists()) {
                    features.push(clipped) //}
                  }
                } catch (error) {
                  console.error(error)
                }
              }
            })
          })
          clipped = null

          if (features.length > 0) {
            features = turf_root_turf_["featureCollection"](features)
            return features
          }

          return null
        } //挖孔

        function createHoles(context, projection, boundingRect, x, y, holes) {
          var tileCanvas = context.canvas
          var imgData = context.getImageData(0, 0, tileCanvas.width, tileCanvas.height)
          var holeMaskCanvas = document.createElement("canvas")
          holeMaskCanvas.width = tileCanvas.width
          holeMaskCanvas.height = tileCanvas.height
          var holeMaskCtx = holeMaskCanvas.getContext("2d")
          var mask = []
          holes.map(function (hole) {
            holeMaskCtx.clearRect(0, 0, holeMaskCanvas.width, holeMaskCanvas.height)
            holeMaskCtx.beginPath()
            var pointIndex = 0
            hole.map(function (coordinate) {
              var pt = projection.project(coordinate, boundingRect)

              if (pointIndex == 0) {
                holeMaskCtx.moveTo(x + pt.x, y + pt.y)
              } else {
                holeMaskCtx.lineTo(x + pt.x, y + pt.y)
              }

              pointIndex++
            })
            holeMaskCtx.closePath()
            holeMaskCtx.fillStyle = "rgba(255,255,255,1)"
            holeMaskCtx.fill()
            mask = holeMaskCtx.getImageData(0, 0, holeMaskCanvas.width, holeMaskCanvas.height).data

            for (var i = 3; i < mask.length; i += 4) {
              if (mask[i] > 0) {
                imgData.data[i] = 0
              }
            }
          })
          context.putImageData(imgData, 0, 0)
        } //绘制多边形（面或线）

        function drawContours(context, projection, boundingRect, x, y, contours, fill, stroke, style) {
          var count = 0
          var holes = []
          contours.map(function (contour) {
            if (!fill || count <= 0) {
              var pointIndex = 0
              context.beginPath()
              contour.map(function (coordinate) {
                var pt = projection.project(coordinate, boundingRect)

                if (pointIndex == 0) {
                  context.moveTo(x + pt.x, y + pt.y)
                } else {
                  context.lineTo(x + pt.x, y + pt.y)
                }

                pointIndex++
              })

              if (fill) {
                context.closePath()
                context.fill() //context.stroke();
              }

              if (stroke) {
                context.stroke()
              }
            } else {
              holes.push(contour)
            }

            count++
          })

          if (fill) {
            return holes
          } else {
            holes = null
          }
        } //画点

        function drawMarker(context, projection, boundingRect, x, y, pointFeature, fill, stroke, labelPropertyName, makerStyle) {
          if (typeof labelPropertyName == "undefined") {
            labelPropertyName = "NAME"
          }

          var style = Object.assign(
            {
              pointSize: 3,
              fontSize: 9,
              fontFamily: "courier",
              color: "rgb(0,0,0)",
              backgroundColor: "rgb(255,0,0)",
              pointStyle: "Solid",
              //'Solid','Ring','Circle'
              ringRadius: 2,
              circleLineWidth: 1,
              showMarker: true,
              showLabel: true,
              labelOffsetX: 0.0,
              labelOffsetY: 0.0,
              markerSymbol: undefined
            },
            makerStyle
          )
          context.font = style.fontSize + "px " + style.fontFamily + " bold"
          var coordinate = pointFeature.geometry.coordinates
          var percentX = (coordinate[0] - boundingRect.xMin) / (boundingRect.xMax - boundingRect.xMin)
          var percentY = (coordinate[1] - boundingRect.yMax) / (boundingRect.yMin - boundingRect.yMax)
          var pt = {
            x: percentX * context.canvas.width,
            y: percentY * context.canvas.height
          }

          if (style.showMarker || style.showMarker) {
            var px = pt.x + x,
              py = pt.y + y

            if (style.markerSymbol && (style.markerSymbol instanceof Image || style.markerSymbol instanceof HTMLCanvasElement)) {
              var textHeight = style.markerSymbol.height
              var textWidth = style.markerSymbol.width
              px -= textWidth / 2
              py -= textHeight / 2

              if (style.markerSymbol.width && style.markerSymbol.height) {
                context.drawImage(style.markerSymbol, px, py)
              }
            } else {
              px -= style.pointSize
              py -= style.pointSize
              context.fillStyle = style.backgroundColor
              context.beginPath()
              context.arc(px, py, style.pointSize, 0, Math.PI * 2)

              if (style.pointStyle == "Solid") {
                context.fill()
              } else if (style.pointStyle == "Circle") {
                context.lineWidth = style.circleLineWidth
                context.strokeStyle = style.backgroundColor
                context.stroke()
              } else if (style.pointStyle == "Ring") {
                context.strokeStyle = style.backgroundColor
                context.stroke()
                context.beginPath()
                context.arc(px, py, style.ringRadius, 0, Math.PI * 2)
                context.closePath()
                context.fill()
              }
            }
          }

          if (style.showLabel) {
            var text = pointFeature.properties[labelPropertyName]

            if (text) {
              if (typeof text != "string") {
                text = text.toString()
              }

              context.fillStyle = style.color

              var _px = pt.x + x + style.labelOffsetX //+ 4,

              var _py = pt.y + y + style.labelOffsetY // + style.fontSize / 2;

              text = text.trim()
              var textImg = drawText(text, {
                fill: true,
                font: style.fontSize + "px " + style.fontFamily,
                stroke: style.labelStroke,
                strokeWidth: style.labelStrokeWidth,
                strokeColor:
                  typeof style.labelStrokeColor == "string" ? Cesium["Color"].fromCssColorString(style.labelStrokeColor) : style.labelStrokeColor,
                fillColor: Cesium["Color"].fromCssColorString(style.color)
              })
              var _textHeight = textImg.height
              var _textWidth = textImg.width
              _px -= _textWidth / 2 + style.pointSize
              _py -= _textHeight / 2 + style.pointSize

              if (textImg.width && textImg.height) {
                context.drawImage(textImg, _px, _py)
              }
            }
          }

          context.restore()
        }

        VectorTileImageryProvider.prototype._drawGeojson = function (
          context,
          x,
          y,
          geojson,
          boundingRect,
          width,
          height,
          fill,
          stroke,
          row,
          col,
          level
        ) {
          var that = this

          if (typeof fill == "undefined") {
            fill = true
          }

          if (typeof stroke == "undefined") {
            stroke = true
          }

          if (!fill && !stroke) {
            return undefined
          }

          if (typeof width == "undefined") {
            width = context.canvas.width - x
          }

          if (typeof height == "undefined") {
            height = context.canvas.height - y
          }

          var projection = new LonLatProjection(width, height)
          var style = this._defaultStyle
          var makerStyle = {
            labelStroke: style.labelStroke,
            labelStrokeWidth: style.labelStrokeWidth,
            labelStrokeColor: style.labelStrokeColor,
            pointSize: style.pointSize,
            fontSize: style.fontSize,
            fontFamily: style.fontFamily,
            color: style.fontColor instanceof Cesium["Color"] ? style.fontColor.toCssColorString() : style.fontColor,
            backgroundColor: style.pointColor instanceof Cesium["Color"] ? style.pointColor.toCssColorString() : style.pointColor,
            pointStyle: style.pointStyle,
            //'Solid','Ring','Circle'
            ringRadius: style.ringRadius,
            circleLineWidth: style.circleLineWidth,
            showMarker: style.showMarker,
            showLabel: style.showLabel,
            labelOffsetX: style.labelOffsetX,
            labelOffsetY: style.labelOffsetY,
            markerSymbol:
              style.markerImage instanceof Image || style.markerImage instanceof HTMLCanvasElement ? style.markerImage : style.markerImageEl
          }
          var holes = []

          if (that._styleFilter) {
            turf_root_turf_["featureEach"](geojson, function (currentFeature, currentFeatureIndex) {
              if (that._styleFilter) {
                style = that._defaultStyle.clone()

                that._styleFilter(currentFeature, style, row, col, level)

                currentFeature.style = style
              }
            })
            geojson.features.sort(function (a, b) {
              if (a.style && a.style.lineDash) {
                return 1
              }

              if (b.style && b.style.lineDash) {
                return -1
              }

              return 0
            })
          }

          function drawFeature(currentFeature, currentFeatureIndex) {
            if (that._styleFilter) {
              style = currentFeature.style

              if (style.show == false) {
                return
              }

              makerStyle = {
                labelStroke: style.labelStroke,
                labelStrokeWidth: style.labelStrokeWidth,
                labelStrokeColor: style.labelStrokeColor,
                pointSize: style.pointSize,
                fontSize: style.fontSize,
                fontFamily: style.fontFamily,
                color: style.fontColor instanceof Cesium["Color"] ? style.fontColor.toCssColorString() : style.fontColor,
                backgroundColor: style.pointColor instanceof Cesium["Color"] ? style.pointColor.toCssColorString() : style.pointColor,
                pointStyle: style.pointStyle,
                //'Solid','Ring','Circle'
                ringRadius: style.ringRadius,
                circleLineWidth: style.circleLineWidth,
                showMarker: style.showMarker,
                showLabel: style.showLabel,
                labelOffsetX: style.labelOffsetX,
                labelOffsetY: style.labelOffsetY,
                markerSymbol:
                  style.markerImage instanceof Image || style.markerImage instanceof HTMLCanvasElement ? style.markerImage : style.markerImageEl
              }
            } else {
              style = that._defaultStyle
            }

            context.lineWidth = style.lineWidth

            if (style.outlineColor instanceof Cesium["Color"]) {
              context.strokeStyle = style.outlineColor.toCssColorString() // "rgb(255,255,0)";
            } else {
              context.strokeStyle = style.outlineColor // "rgb(255,255,0)";
            }

            if (style.fillColor instanceof Cesium["Color"]) {
              context.fillStyle = style.fillColor.toCssColorString() // "rgba(0,255,255,0.0)";
            } else {
              context.fillStyle = style.fillColor // "rgba(0,255,255,0.0)";
            }

            if (style.lineDash) {
              context.setLineDash(style.lineDash)
            }

            context.lineCap = style.lineCap

            if (style.shadowColor && style.shadowColor instanceof Cesium["Color"]) {
              context.shadowColor = style.shadowColor.toCssColorString()
            } else {
              context.shadowColor = style.shadowColor
            }

            context.shadowBlur = style.shadowBlur
            context.shadowOffsetX = style.shadowOffsetX
            context.shadowOffsetY = style.shadowOffsetY
            context.miterLimit = style.miterLimit
            context.lineJoin = style.lineJoin
            var geometry = currentFeature.geometry

            if (geometry.type == "Point") {
              drawMarker(context, projection, boundingRect, x, y, currentFeature, fill, stroke, style.labelPropertyName, makerStyle)
            } else if (geometry.type == "Polygon" && style.fill) {
              var contours = turf_root_turf_["getCoords"](currentFeature)
              var tempHoles = drawContours(context, projection, boundingRect, x, y, contours, true, false, style)

              if (tempHoles) {
                tempHoles.map(function (hole) {
                  hole.style = style
                  holes.push(hole)
                })
              } //drawContours(context, projection, boundingRect, x, y, contours, true, false, style);
            } else if (geometry.type == "MultiPolygon" && style.fill) {
              var polygons

              try {
                polygons = turf_root_turf_["getCoords"](currentFeature)
                polygons.map(function (contours) {
                  var tempHoles = drawContours(context, projection, boundingRect, x, y, contours, true, false, style)

                  if (tempHoles) {
                    tempHoles.map(function (hole) {
                      hole.style = style
                      holes.push(hole)
                    })
                  }
                })
              } catch (e) {
                //     console.log(e);
              }
            } else if (geometry.type == "MultiLineString") {
              if (currentFeature.properties._outline && !style.outline) {
                //
              } else {
                var _contours = turf_root_turf_["getCoords"](currentFeature)

                drawContours(context, projection, boundingRect, x, y, _contours, false, true, style)
                _contours = null
              }
            } else if (geometry.type == "LineString") {
              if (currentFeature.properties._outline && !style.outline) {
                //
              } else {
                var contour = turf_root_turf_["getCoords"](currentFeature)
                var _contours2 = [contour]
                drawContours(context, projection, boundingRect, x, y, _contours2, false, true, style)
                contour = null
                _contours2 = null
              }
            }
          }

          turf_root_turf_["featureEach"](geojson, function (fc, idx) {
            var geometry = fc.geometry

            if (!geometry) {
              return
            }

            if (geometry.type == "Polygon" || geometry.type == "MultiPolygon") {
              drawFeature(fc, idx)
            }
          })

          if (holes && holes.length) {
            createHoles(context, projection, boundingRect, x, y, holes)
          }

          turf_root_turf_["featureEach"](geojson, function (fc, idx) {
            var geometry = fc.geometry

            if (!geometry) {
              return
            }

            if (geometry.type == "LineString" || geometry.type == "MultiLineString") {
              drawFeature(fc, idx)
            }
          })
          var pointFcs = []
          turf_root_turf_["featureEach"](geojson, function (fc, idx) {
            var geometry = fc.geometry

            if (!geometry) {
              return
            }

            if (geometry.type == "Point" || geometry.type == "MultiPoint") {
              if (typeof that.clustering !== "function") {
                drawFeature(fc, idx)
              } else {
                pointFcs.push(fc)
              }
            }
          })
          var tileBBox = [boundingRect.xMin, boundingRect.yMin, boundingRect.xMax, boundingRect.yMax]

          if (typeof that.clustering == "function") {
            pointFcs = that.clustering(pointFcs, context, tileBBox, row, col, level)
          }

          if (pointFcs && pointFcs.length) {
            pointFcs.forEach(function (fc, idx) {
              drawFeature(fc, idx)
            })
          }
        } //判断点和绘制符号后的矩形区域是否跨瓦片

        VectorTileImageryProvider.pointIsCrossTile = function pointIsCrossTile(context, tileBBox, pointFeature, outDrawBBox) {
          if (outDrawBBox) {
            outDrawBBox.splice(0, outDrawBBox.length)
          }

          if (!pointFeature.properties) {
            return true
          }

          if (!pointFeature.properties.symbol) {
            return true
          }

          var symbol = pointFeature.properties.symbol
          var coordinate = pointFeature.geometry.coordinates
          var percentX = (coordinate[0] - tileBBox[0]) / (tileBBox[2] - tileBBox[0])
          var percentY = (coordinate[1] - tileBBox[3]) / (tileBBox[1] - tileBBox[3])
          var x = percentX * context.canvas.width,
            y = percentY * context.canvas.height
          var minX = x - symbol.width / 2.0,
            maxX = x + symbol.width / 2.0
          var minY = y - symbol.height / 2.0,
            maxY = y + symbol.height / 2.0

          if (minX < 0 || maxX > context.canvas.width) {
            return true
          }

          if (minY < 0 || maxY > context.canvas.height) {
            return true
          }

          outDrawBBox[0] = minX
          outDrawBBox[1] = minY
          outDrawBBox[2] = maxX
          outDrawBBox[3] = maxY
          return false
        } //同步导出瓦片

        VectorTileImageryProvider.prototype.requestImageSync = function (x, y, level) {
          var that = this
          var cacheId = x + "," + y + "," + level

          if (that.cache && that.cache[cacheId]) {
            return that.cache[cacheId]
          }

          var rectangle = this._tilingScheme.tileXYToRectangle(x, y, level)

          var boundingRect = {
            xMin: Cesium["Math"].toDegrees(rectangle.west),
            yMin: Cesium["Math"].toDegrees(rectangle.south),
            xMax: Cesium["Math"].toDegrees(rectangle.east),
            yMax: Cesium["Math"].toDegrees(rectangle.north)
          }

          var clippedGeojson = that._clipGeojson(rectangle)

          if (!clippedGeojson) {
            if (that._onlyPoint || (that._polygonOnly && that._defaultStyle.fill)) {
              return getEmpty(that._defaultStyle.backgroundColor)
            } else {
              return undefined
            }
          } else {
            that._createCanvas()

            if (!that._defaultStyle.backgroundColor) {
              that._context.clearRect(0, 0, that._canvas.width, that._canvas.height)
            }

            that._drawGeojson(
              that._context,
              0,
              0,
              clippedGeojson,
              boundingRect,
              that._tileWidth,
              that._tileHeight,
              that._fill,
              that._outline,
              x,
              y,
              level
            )

            return that._canvas
          }
        }

        VectorTileImageryProvider.prototype._createTileImage = function (x, y, level, rectangle, defer) {
          var that = this
          var cacheId = x + "," + y + "," + level
          var boundingRect = {
            xMin: Cesium["Math"].toDegrees(rectangle.west),
            yMin: Cesium["Math"].toDegrees(rectangle.south),
            xMax: Cesium["Math"].toDegrees(rectangle.east),
            yMax: Cesium["Math"].toDegrees(rectangle.north)
          }
          this._state = VectorTileImageryProvider.State.CLIPPING
          requestAnimationFrame(function () {
            var clippedGeojson = that._clipGeojson(rectangle)

            if (!clippedGeojson) {
              if (that._onlyPoint) {
                defer.resolve(getEmpty(that._defaultStyle.backgroundColor))
              } else {
                defer.resolve(undefined)
              }

              that._state = VectorTileImageryProvider.State.COMPELTED
              VectorTileImageryProvider._currentTaskCount--
            } else {
              requestAnimationFrame(function () {
                that._state = VectorTileImageryProvider.State.GEOJSONDRAWING

                that._createCanvas()

                if (!that._defaultStyle.backgroundColor) {
                  that._context.clearRect(0, 0, that._canvas.width, that._canvas.height)
                } //if (level < 8) {
                //    let v = 1.5 / Math.pow(2, (level + 0));
                //    try {
                //        clippedGeojson = turf.simplify(clippedGeojson, v);
                //    } catch (e) {
                //    }
                //}

                that._drawGeojson(
                  that._context,
                  0,
                  0,
                  clippedGeojson,
                  boundingRect,
                  that._tileWidth,
                  that._tileHeight,
                  that._fill,
                  that._outline,
                  x,
                  y,
                  level
                )

                that.cache[cacheId] = that._canvas
                that.cache[cacheId].srcJson = clippedGeojson
                that.cacheCount++
                VectorTileImageryProvider._currentTaskCount--
                defer.resolve(that._canvas)
                requestAnimationFrame(function () {
                  that._state = VectorTileImageryProvider.State.COMPELTED
                })
              })
            }
          })
        }

        VectorTileImageryProvider.prototype.clearCache = function () {
          var provider = this

          for (var cacheId in provider.cache) {
            if (provider.cache.hasOwnProperty(cacheId)) {
              provider.cache[cacheId].srcJson = null
              delete provider.cache[cacheId]
            }
          }

          provider.cache = {}
          provider.cacheCount = 0
        }

        VectorTileImageryProvider.prototype._getTileImage = function (x, y, level, rectangle) {
          var defer = Cesium["defer"]()
          var that = this //从缓存中查询

          var cacheId = x + "," + y + "," + level

          if (!that.cacheCount) {
            that.cacheCount = 0
          }

          if (!that.cache || that.cacheCount > that._tileCacheSize) {
            for (var _cacheId in that.cache) {
              if (that.cache.hasOwnProperty(_cacheId)) {
                that.cache[_cacheId].srcJson = null
                delete that.cache[_cacheId]
              }
            }

            that.cache = {}
            that.cacheCount = 0
          }

          if (that.cache[cacheId]) {
            return that.cache[cacheId]
          } //处理并发

          if (VectorTileImageryProvider._maxTaskCount < VectorTileImageryProvider._currentTaskCount) {
            return undefined
          }

          VectorTileImageryProvider._currentTaskCount++
          that._state = VectorTileImageryProvider.State.READY
          setTimeout(function () {
            return that._createTileImage(x, y, level, rectangle, defer)
          }, 1)
          return defer.promise
        }

        var emptycv

        function getEmpty(bgColor) {
          if (!emptycv) {
            emptycv = document.createElement("canvas")
            emptycv.width = 256
            emptycv.height = 256
          }

          if (bgColor) {
            var ctx = emptycv.getContext("2d")

            if (bgColor instanceof Cesium["Color"]) {
              ctx.fillStyle = bgColor.toCssColorString()
            } else {
              ctx.fillStyle = bgColor
            }

            ctx.fillRect(0, 0, emptycv.width, emptycv.height)
          } else {
            var _ctx = emptycv.getContext("2d")

            _ctx.clearRect(0, 0, emptycv.width, emptycv.height)
          }

          return emptycv
        }

        VectorTileImageryProvider.prototype.requestImage = function (x, y, level, distance) {
          if (!this._ready || this._state != VectorTileImageryProvider.State.COMPELTED) {
            return undefined
          }

          if (level < this._minimumLevel) {
            this._createCanvas()

            this._context.clearRect(0, 0, this._tileWidth, this._tileHeight)

            return this._canvas
          } else if (level > this._maximumLevel) {
            return getEmpty(this._defaultStyle.backgroundColor)
          }

          var rectangle = this.tilingScheme.tileXYToRectangle(x, y, level)
          return this._getTileImage(x, y, level, rectangle)
        } //合并图层并出图

        VectorTileImageryProvider.compose = function (vectorTileImageryProviders, rectangle, level, tileWidth, tileHeight) {
          tileWidth = tileWidth ? tileWidth : 256
          tileHeight = tileHeight ? tileHeight : 256
          vectorTileImageryProviders.sort(function (a, b) {
            if (!Cesium["defined"](a.zIndex)) {
              return -1
            }

            if (!Cesium["defined"](b.zIndex)) {
              return 1
            }

            return a.zIndex - b.zIndex
          })
          var tilingScheme = new Cesium["GeographicTilingScheme"]()
          var nw = Cesium["Rectangle"].northwest(rectangle)
          var se = Cesium["Rectangle"].southeast(rectangle)
          var lt = tilingScheme.positionToTileXY(nw, level)
          var rb = tilingScheme.positionToTileXY(se, level)
          var w = (rb.x - lt.x + 1) * tileWidth,
            h = (rb.y - lt.y + 1) * tileHeight
          var cv = document.createElement("canvas")
          cv.width = w
          cv.height = h
          var context = cv.getContext("2d")

          for (var li = 0; li < vectorTileImageryProviders.length; li++) {
            for (var x = lt.x, i = 0; x <= rb.x; x++, i++) {
              for (var y = lt.y, j = 0; y <= rb.y; y++, j++) {
                var px = i * tileWidth,
                  py = j * tileHeight
                var provider = vectorTileImageryProviders[li]

                try {
                  var image = provider.requestImageSync(x, y, level)

                  if (image && image.width && image.height) {
                    context.drawImage(image, px, py, tileWidth, tileHeight)
                  }
                } catch (e) {
                  console.error(e)
                }
              }
            }
          }

          return cv
        } //重写此函数，实现：要素被点击时准备好并返回要素查询结果信息。
        // VectorTileImageryProvider.prototype.prepareFeatureInfo = function (feature, x, y, level, longitude, latitude) {
        //   return undefined;
        // };

        var scratchRect = new Cesium["Rectangle"]() //实现Cesium.ImageryProvidery要素查询（拾取）接口，除了返回结果可以在Cesium内置的InfoBox显示之外，还触发featuresPicked事件。

        VectorTileImageryProvider.prototype.pickFeatures = function (x, y, level, longitude, latitude) {
          var that = this
          var pickedFeatures = []

          if (!this._allowPick || !this._geoJSON) {
            that._featuresPicked.raiseEvent(that, undefined)

            return pickedFeatures
          }

          this.tilingScheme.tileXYToRectangle(x, y, level, scratchRect)
          var res = turf_root_turf_["radiansToLength"](scratchRect.width / 256, "kilometers") //分辨率，单位公里，即当前视图下一个像素点边长所表示距离

          var pt = turf_root_turf_["point"]([Cesium["Math"].toDegrees(longitude), Cesium["Math"].toDegrees(latitude)])
          var style = this.defaultStyle
          turf_root_turf_["featureEach"](this._geoJSON, function (fc) {
            var srcFc = fc
            var found = false
            var geometry = fc.geometry

            if (!geometry) {
              return
            }

            if (style.fill && (geometry.type == "Polygon" || geometry.type == "MultiPolygon")) {
              if (turf_root_turf_["booleanPointInPolygon"](pt, fc)) {
                found = true
              }
            } else {
              var dist = pointToFeatureDistance(pt, fc, {
                units: "kilometers"
              })

              if (
                (style.outline && (geometry.type == "Polygon" || geometry.type == "MultiPolygon")) ||
                geometry.type == "LineString" ||
                geometry.type == "MultiLineString"
              ) {
                found = dist <= res * 2.0
              } else if (style.showMarker && (geometry.type == "Point" || geometry.type == "MultiPoint")) {
                switch (style.pointStyle) {
                  case "Solid":
                    found = dist <= style.pointSize * 2.0
                    break

                  case "Ring":
                  case "Circle":
                    found = dist <= (style.circleLineWidth + style.ringRadius) * 2.0
                    break

                  default:
                    break
                }
              }
            }

            if (found) {
              //查找成功
              var fcInfo = new Cesium["ImageryLayerFeatureInfo"]()
              fcInfo.data = srcFc
              fcInfo.description = JSON.stringify(srcFc.properties, null, 2)

              if (style.labelPropertyName) {
                fcInfo.name = srcFc.properties[style.labelPropertyName]
              } else if (style.centerLabelPropertyName) {
                fcInfo.name = srcFc.properties[style.centerLabelPropertyName]
              }

              var srcGeometry = srcFc.geometry

              if (srcGeometry.type == "Point" || srcGeometry.type == "MultiPoint") {
                fcInfo.position = new Cesium["Cartographic"](longitude, latitude)
              } else {
                var centroidPt = turf_root_turf_["centroid"](srcFc)
                var coord = turf_root_turf_["getCoords"](centroidPt)
                fcInfo.position = Cesium["Cartographic"].fromDegrees(coord[0], coord[1])
              }

              pickedFeatures.push(fcInfo)
            }
          })

          if (pickedFeatures.length) {
            var df = Cesium["defer"]()
            var startTime = new Date()
            Promise.all(pickedFeatures)
              .then(function (pickedFeatures) {
                var timespan = new Date() - startTime

                if (timespan < 100) {
                  setTimeout(function () {
                    that._featuresPicked.raiseEvent(that, pickedFeatures)

                    df.resolve(pickedFeatures)
                  }, 100)
                } else {
                  that._featuresPicked.raiseEvent(that, pickedFeatures)

                  df.resolve(pickedFeatures)
                }
              })
              ["catch"](function (err) {
                console.error(err)

                that._featuresPicked.raiseEvent(that, undefined)
              })
            return df.promise
          } else {
            that._featuresPicked.raiseEvent(that, undefined)

            return pickedFeatures
          }
        }

        VectorTileImageryProvider.prototype.destroy = function () {
          for (var key in this) {
            if (this.hasOwnProperty(key)) {
              delete this[key]
            }
          }
        }
        // CONCATENATED MODULE: ./src/index.js

        /***/
      }
      /******/
    ]
  )
})
