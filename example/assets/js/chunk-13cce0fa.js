(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-13cce0fa"],{

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__("2ba4");
var call = __webpack_require__("c65b");
var uncurryThis = __webpack_require__("e330");
var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var toString = __webpack_require__("577e");
var getMethod = __webpack_require__("dc4a");
var arraySlice = __webpack_require__("4dae");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var stickyHelpers = __webpack_require__("9f7f");
var fails = __webpack_require__("d039");

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ "1da1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _asyncToGenerator; });
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var uncurryThis = __webpack_require__("e330");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var toString = __webpack_require__("577e");
var correctIsRegExpLogic = __webpack_require__("ab13");

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ "2856":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_interest_search_vue_vue_type_style_index_0_id_6ce22d68_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6968");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_interest_search_vue_vue_type_style_index_0_id_6ce22d68_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_interest_search_vue_vue_type_style_index_0_id_6ce22d68_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "408a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");
var requireObjectCoercible = __webpack_require__("1d80");
var toString = __webpack_require__("577e");
var whitespaces = __webpack_require__("5899");

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isRegExp = __webpack_require__("44e7");

var TypeError = global.TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "6968":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7368":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@icon-park/vue-next/es/icons/Search.js
var Search = __webpack_require__("bdf8");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__("e9c4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/utils/index.ts
var utils = __webpack_require__("d257");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/components/mars-sample/interest-search.vue?vue&type=script&lang=ts&setup=true


















var interest_searchvue_type_script_lang_ts_setup_true_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-6ce22d68"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = {
  class: "interest-search-pannel"
};
var _hoisted_2 = {
  key: 0,
  class: "query-site"
};
var _hoisted_3 = ["onClick"];


/* harmony default export */ var interest_searchvue_type_script_lang_ts_setup_true = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  props: {
    mapWork: {
      type: Object,
      required: true
    }
  },
  setup: function setup(__props) {
    var props = __props;
    /**
     * 公共组件：PIO查询
     * @copyright 火星科技 mars3d.cn
     * @author 木遥 2021-11-01
     */

    var storageName = "mars3d_queryGaodePOI";
    var siteListShow = Object(vue_runtime_esm_bundler["ref"])(false); // 各类数据

    var searchTxt = Object(vue_runtime_esm_bundler["ref"])("");
    var dataSource = Object(vue_runtime_esm_bundler["ref"])([]);
    var siteSource = Object(vue_runtime_esm_bundler["ref"])([]);
    var complete = Object(vue_runtime_esm_bundler["ref"])(); // 创建矢量图层

    var graphicLayer = new props.mapWork.mars3d.layer.GraphicLayer({
      name: "PIO查询",
      pid: 99 // 图层管理 中使用，父节点id

    }); // 触发自动事件，将矢量图层添加到地图中

    props.mapWork.eventTarget.on("mapLoaded", function () {
      props.mapWork.map.addLayer(graphicLayer);
    }); // 鼠标单击后的信息面板弹窗

    var address = null;
    graphicLayer.bindPopup(function (event) {
      var _event$graphic;

      var item = (_event$graphic = event.graphic) === null || _event$graphic === void 0 ? void 0 : _event$graphic.attr;

      if (!item) {
        return;
      }

      var inHtml = "<div class=\"mars-popup-titile\"><a href=\"https://www.amap.com/detail/".concat(item.id, "\"  target=\"_black\" style=\"color: #ffffff; \">").concat(item.name, "</a></div><div class=\"mars-popup-content\" >");

      if (item.tel != "") {
        inHtml += "<div><label>电话</label>" + item.tel + "</div>";
      }

      if (item.address) {
        inHtml += "<div><label>地址</label>" + item.address + "</div>";
      }

      if (item.type) {
        var fl = item.type;

        if (fl != "") {
          inHtml += "<div><label>类别</label>" + fl + "</div>";
        }
      }

      inHtml += "</div>";
      return inHtml;
    }); // GaodePOI查询

    var queryPoi = new props.mapWork.mars3d.query.GaodePOI({// city: '合肥市',
    }); // 根据经纬度坐标获取地址

    props.mapWork.eventTarget.on("mapCameraChange", function () {
      // const radius = props.mapWork.map.camera.positionCartographic.height // 单位：米
      queryPoi.getAddress({
        location: props.mapWork.map.getCenter(),
        success: function success(result) {
          address = result;
        }
      });
    }); // 搜寻输入框数据之前的提示数据 以及搜寻过的历史数据  通过列表展现

    var handleSearch = function handleSearch(val) {
      var _address;

      if (!val) {
        showHistoryList();
        return;
      }

      siteListShow.value = false;
      queryPoi.autoTip({
        text: val,
        city: (_address = address) === null || _address === void 0 ? void 0 : _address.city,
        location: props.mapWork.map.getCenter(),
        success: function success(result) {
          dataSource.value = result.list.map(function (item) {
            return {
              value: item.name
            };
          });
        }
      });
    }; // 展示搜寻过的历史数据


    var showHistoryList = function showHistoryList() {
      try {
        var historys = JSON.parse(localStorage.getItem(storageName));
        dataSource.value = (historys || []).map(function (item) {
          return {
            value: item
          };
        });
      } catch (err) {
        throw new Error(err);
      }
    }; // 输入关键字，开始查询


    var searchPoint = function searchPoint() {
      var text = searchTxt.value;

      if (!text) {
        alert("请输入搜索关键字！");
        return;
      }

      if (Object(utils["b" /* isLonLat */])(text)) {
        centerAtLonLat(text);
        return;
      }

      addHistory(text);
      selectPoint(searchTxt.value);
      setTimeout(function () {
        complete.value.blur();
      }, 100);
    }; // 开始查询并加载数据


    var selectPoint = /*#__PURE__*/function () {
      var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return querySiteList(value, 1);

              case 2:
                siteListShow.value = true;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function selectPoint(_x) {
        return _ref.apply(this, arguments);
      };
    }(); // 表格数据内部


    var pagination = {
      onChange: function onChange(page) {
        querySiteList(searchTxt.value, page);
      },
      size: "small",
      total: 0,
      pageSize: 6,
      showSizeChanger: false,
      showLessItems: true
    };
    /**
     * 加载查询之后的数据，通过表格展示出来
     * @param {string} text  输入框输入的文字
     * @param {number} page  分页页码，常与count一起搭配使用
     * @returns {void} 无
     */

    function querySiteList(text, page) {
      return new Promise(function (resolve, reject) {
        var _address2;

        queryPoi.queryText({
          text: text,
          count: 6,
          page: page - 1,
          city: (_address2 = address) === null || _address2 === void 0 ? void 0 : _address2.city,
          success: function success(result) {
            resolve(result);
            pagination.total = Number(result.allcount) || 0;
            siteSource.value = result.list || [];
            showPOIArr(result.list || []);
          }
        });
      });
    }
    /**
     * 加载查询之后的数据，通过矢量数据展示出来
     * @param {any} arr 查询之后的数据
     * @returns {void} 无
     */


    function showPOIArr(arr) {
      clearLayers();
      arr.forEach(function (item) {
        var jd = Number(item.lng);
        var wd = Number(item.lat);

        if (isNaN(jd) || isNaN(wd)) {
          return;
        }

        item.lng = jd;
        item.lat = wd; // 添加实体

        var graphic = new props.mapWork.mars3d.graphic.PointEntity({
          position: props.mapWork.Cesium.Cartesian3.fromDegrees(jd, wd),
          style: {
            pixelSize: 10,
            color: "#3388ff",
            outline: true,
            outlineColor: "#ffffff",
            outlineWidth: 2,
            scaleByDistance: new props.mapWork.Cesium.NearFarScalar(1000, 1, 1000000, 0.1),
            clampToGround: true,
            visibleDepth: false,
            label: {
              text: item.name,
              font_size: 20,
              color: "rgb(240,255,255)",
              outline: true,
              outlineWidth: 2,
              outlineColor: props.mapWork.Cesium.Color.BLACK,
              horizontalOrigin: props.mapWork.Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: props.mapWork.Cesium.VerticalOrigin.BOTTOM,
              pixelOffsetY: -10,
              distanceDisplayCondition: new props.mapWork.Cesium.DistanceDisplayCondition(0.0, 200000),
              clampToGround: true,
              visibleDepth: false // 是否被遮挡

            }
          },
          attr: item
        });
        graphicLayer.addGraphic(graphic);
        item._graphic = graphic;
      });

      if (arr.length > 1) {
        graphicLayer.flyTo();
      }
    } // 定位至矢量图层


    function flyTo(item) {
      var graphic = item._graphic;

      if (graphic === null) {
        return alert(item.name + " 无经纬度坐标信息！");
      }

      props.mapWork.map.flyToGraphic(graphic, {
        radius: 2000
      });
      setTimeout(function () {
        graphicLayer.openPopup(graphic);
      }, 3000);
    }
    /**
     * 判断是否为经纬度值，
     * 若是，加载为矢量数据且定位至该矢量数据
     * 若否，返回
     * @param {any} text 输入框输入的关键字
     * @returns {void} 无
     */


    function centerAtLonLat(text) {
      var arr = text.split(",");

      if (arr.length != 2) {
        return;
      }

      var jd = Number(arr[0]);
      var wd = Number(arr[1]);

      if (isNaN(jd) || isNaN(wd)) {
        return;
      } // 添加实体


      var graphic = new props.mapWork.mars3d.graphic.PointEntity({
        position: props.mapWork.Cesium.Cartesian3.fromDegrees(jd, wd),
        style: {
          color: "#3388ff",
          pixelSize: 10,
          outline: true,
          outlineColor: "#ffffff",
          outlineWidth: 2,
          scaleByDistance: new props.mapWork.Cesium.NearFarScalar(1000, 1, 1000000, 0.1),
          clampToGround: true,
          visibleDepth: false // 是否被遮挡

        }
      });
      graphicLayer.addGraphic(graphic);
      graphic.bindPopup("<div class=\"mars-popup-titile\">\u5750\u6807\u5B9A\u4F4D</div>\n              <div class=\"mars-popup-content\" >\n                <div><label>\u7ECF\u5EA6</label> ".concat(jd, "</div>\n                <div><label>\u7EAC\u5EA6</label>").concat(wd, "</div>\n              </div>"));
      graphic.openHighlight();
      graphic.flyTo({
        radius: 1000,
        scale: 1.5,
        complete: function complete() {
          graphic.openPopup();
        }
      });
    }
    /**
     * 将需要搜查的关键字记录进历史数据中
     * @param {any} data 输入框输入的关键字
     * @returns {void} 无
     */


    function addHistory(data) {
      try {
        var arrHistory = JSON.parse(localStorage.getItem(storageName)) || [];

        if (!arrHistory.includes(data)) {
          arrHistory.unshift(data);
        }

        localStorage.setItem(storageName, JSON.stringify(arrHistory.slice(0, 10)));
      } catch (err) {
        throw new Error(err);
      }
    }

    function clearLayers() {
      graphicLayer.closePopup();
      graphicLayer.clear();
    }

    return function (_ctx, _cache) {
      var _component_a_button = Object(vue_runtime_esm_bundler["resolveComponent"])("a-button");

      var _component_a_input_search = Object(vue_runtime_esm_bundler["resolveComponent"])("a-input-search");

      var _component_a_auto_complete = Object(vue_runtime_esm_bundler["resolveComponent"])("a-auto-complete");

      var _component_a_list_item_meta = Object(vue_runtime_esm_bundler["resolveComponent"])("a-list-item-meta");

      var _component_a_list_item = Object(vue_runtime_esm_bundler["resolveComponent"])("a-list-item");

      var _component_a_list = Object(vue_runtime_esm_bundler["resolveComponent"])("a-list");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_auto_complete, {
        class: "search-input",
        ref_key: "complete",
        ref: complete,
        value: searchTxt.value,
        "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
          return searchTxt.value = $event;
        }),
        size: "large",
        options: dataSource.value,
        onSearch: handleSearch,
        onSelect: selectPoint,
        onFocus: _cache[1] || (_cache[1] = function ($event) {
          return handleSearch(searchTxt.value);
        })
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_input_search, {
            size: "large",
            placeholder: "搜索 地点",
            onSearch: searchPoint
          }, {
            enterButton: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_button, null, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(Object(vue_runtime_esm_bundler["unref"])(Search["a" /* default */]), {
                    size: "20",
                    fill: "#FFF"
                  })];
                }),
                _: 1
              })];
            }),
            _: 1
          })];
        }),
        _: 1
      }, 8, ["value", "options"]), siteListShow.value ? (Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])("div", _hoisted_2, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_list, {
        "item-layout": "vertical",
        size: "large",
        pagination: pagination,
        "data-source": siteSource.value
      }, {
        renderItem: Object(vue_runtime_esm_bundler["withCtx"])(function (_ref2) {
          var item = _ref2.item;
          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_list_item, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_list_item_meta, {
                description: item.type
              }, {
                title: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createElementVNode"])("a", {
                    onClick: Object(vue_runtime_esm_bundler["withModifiers"])(function ($event) {
                      return flyTo(item);
                    }, ["stop"])
                  }, Object(vue_runtime_esm_bundler["toDisplayString"])(item.name), 9, _hoisted_3)];
                }),
                _: 2
              }, 1032, ["description"])];
            }),
            _: 2
          }, 1024)];
        }),
        _: 1
      }, 8, ["data-source"])])) : Object(vue_runtime_esm_bundler["createCommentVNode"])("", true)]);
    };
  }
}));
// CONCATENATED MODULE: ./src/components/mars-sample/interest-search.vue?vue&type=script&lang=ts&setup=true
 
// EXTERNAL MODULE: ./src/components/mars-sample/interest-search.vue?vue&type=style&index=0&id=6ce22d68&lang=less&scoped=true
var interest_searchvue_type_style_index_0_id_6ce22d68_lang_less_scoped_true = __webpack_require__("2856");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/mars-sample/interest-search.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(interest_searchvue_type_script_lang_ts_setup_true, [['__scopeId',"data-v-6ce22d68"]])

/* harmony default export */ var interest_search = __webpack_exports__["a"] = (__exports__);

/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError = global.TypeError;

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var hasOwn = __webpack_require__("1a2d");
var inheritIfRequired = __webpack_require__("7156");
var isPrototypeOf = __webpack_require__("3a9b");
var isSymbol = __webpack_require__("d9b5");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var thisNumberValue = __webpack_require__("408a");
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "ab13":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "caad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $includes = __webpack_require__("4d64").includes;
var addToUnscopables = __webpack_require__("44d2");

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "e9c4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var apply = __webpack_require__("2ba4");
var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");

var Array = global.Array;
var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

var FORCED = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  // https://github.com/tc39/proposal-well-formed-stringify
  $({ target: 'JSON', stat: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      for (var i = 0, l = arguments.length, args = Array(l); i < l; i++) args[i] = arguments[i];
      var result = apply($stringify, null, args);
      return typeof result == 'string' ? replace(result, tester, fix) : result;
    }
  });
}


/***/ })

}]);