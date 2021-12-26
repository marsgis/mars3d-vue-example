(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-58cd79cf"],{

/***/ "0de4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// EXTERNAL MODULE: ./src/components/mars-sample/location-to.vue + 4 modules
var location_to = __webpack_require__("bc30");

// EXTERNAL MODULE: ./node_modules/echarts/index.js + 538 modules
var echarts = __webpack_require__("313e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/thing/analysis/measure-section/index.vue?vue&type=script&setup=true&lang=ts




var measure_sectionvue_type_script_setup_true_lang_ts_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-a715551a"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("绘制线");

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("清除");

var _hoisted_3 = /*#__PURE__*/measure_sectionvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "echatsView"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    id: "echartsView1",
    style: {
      "width": "100%",
      "height": "100%"
    }
  })], -1);
});





/* harmony default export */ var measure_sectionvue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var isShow = Object(vue_runtime_esm_bundler["ref"])(false);
    var data = Object(vue_runtime_esm_bundler["ref"])();
    var myChart1; // 图表自适应

    window.addEventListener("resize", function () {
      myChart1.resize();
    });
    Object(vue_runtime_esm_bundler["onMounted"])(function () {
      myChart1 = echarts["b" /* init */](document.getElementById("echartsView1"));
    });
    mapWork.eventTarget.on("end", function (event) {
      data.value = event.e;
      isShow.value = true;
      Object(vue_runtime_esm_bundler["nextTick"])(function () {
        setEchartsData(data.value);
      });
    });
    mapWork.eventTarget.on("click", function (event) {
      var _e$graphic;

      var e = event.e;
      data.value = (_e$graphic = e.graphic) === null || _e$graphic === void 0 ? void 0 : _e$graphic.measured;

      if (data.value) {
        isShow.value = true;
        Object(vue_runtime_esm_bundler["nextTick"])(function () {
          setEchartsData(data.value);
        });
      }
    });

    var measureSection = function measureSection() {
      mapWork.measureSection();
    };

    var clear = function clear() {
      mapWork.removeAll();
      isShow.value = false;
    };

    function setEchartsData(data) {
      if (data == null || data.arrPoint == null) {
        return;
      }

      var arrPoint = data.arrPoint;
      var inhtml = "";
      var option = {
        grid: {
          left: 10,
          right: 10,
          bottom: 10,
          containLabel: true
        },
        dataZoom: [{
          type: "inside",
          throttle: 50
        }],
        tooltip: {
          trigger: "axis",
          // position: function (point, params, dom, rect, size) {
          //    return [10, 20];
          // },
          formatter: function formatter(params) {
            if (params.length === 0) {
              mapWork.hideTipMarker();
              return inhtml;
            }

            var hbgd = params[0].value; // 海拔高度

            var point = arrPoint[params[0].dataIndex]; // 所在经纬度

            var result = mapWork.calculation(params[0]);
            inhtml = "\u5F53\u524D\u4F4D\u7F6E<br />\n                      \u8DDD\u8D77\u70B9\uFF1A".concat(result.len, "<br />\n                      \u6D77\u62D4\uFF1A<span style='color:").concat(params[0].color, ";'>").concat(result.hbgdStr, "</span><br />\n                      \u7ECF\u5EA6\uFF1A").concat(point.lng, "<br />\n                      \u7EAC\u5EA6\uFF1A").concat(point.lat);
            mapWork.showTipMarker(point, hbgd, inhtml);
            return inhtml;
          }
        },
        xAxis: [{
          name: "行程",
          type: "category",
          boundaryGap: false,
          axisLine: {
            show: true
          },
          axisLabel: {
            show: true,
            formatter: "{value} 米"
          },
          data: data.arrLen
        }],
        yAxis: [{
          name: "高程",
          type: "value",
          min: getMinZ(arrPoint),
          axisLabel: {
            formatter: "{value} 米"
          }
        }],
        series: [{
          name: "高程值",
          type: "line",
          smooth: true,
          symbol: "none",
          sampling: "average",
          itemStyle: {
            normal: {
              color: "rgb(255, 70, 131)"
            }
          },
          areaStyle: {
            normal: {
              color: new echarts["a" /* graphic */].LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "rgb(255, 158, 68)"
              }, {
                offset: 1,
                color: "rgb(255, 70, 131)"
              }])
            }
          },
          data: data.arrHB
        }]
      };
      myChart1.setOption(option);
      myChart1.resize();

      function getMinZ(arr) {
        var minz = "dataMin";

        if (arr == null || arr.length === 0) {
          return minz;
        }

        minz = arr[0].alt;

        for (var i = 0; i < arr.length; i++) {
          if (arr[i].alt < minz) {
            minz = arr[i].alt;
          }
        }

        return minz;
      }
    }

    return function (_ctx, _cache) {
      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])(vue_runtime_esm_bundler["Fragment"], null, [Object(vue_runtime_esm_bundler["createVNode"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: measureSection
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_1];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: clear
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_2];
                }),
                _: 1
              })];
            }),
            _: 1
          })];
        }),
        _: 1
      }), Object(vue_runtime_esm_bundler["withDirectives"])(Object(vue_runtime_esm_bundler["createVNode"])(pannel["a" /* default */], {
        class: "echartsBox"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [_hoisted_3];
        }),
        _: 1
      }, 512), [[vue_runtime_esm_bundler["vShow"], isShow.value]]), Object(vue_runtime_esm_bundler["createVNode"])(location_to["a" /* default */])], 64);
    };
  }
}));
// CONCATENATED MODULE: ./src/example/thing/analysis/measure-section/index.vue?vue&type=script&setup=true&lang=ts
 
// EXTERNAL MODULE: ./src/example/thing/analysis/measure-section/index.vue?vue&type=style&index=0&id=a715551a&scoped=true&lang=less
var measure_sectionvue_type_style_index_0_id_a715551a_scoped_true_lang_less = __webpack_require__("6918");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/example/thing/analysis/measure-section/index.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(measure_sectionvue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-a715551a"]])

/* harmony default export */ var measure_section = __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "0fc3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6918":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_a715551a_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0fc3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_a715551a_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_a715551a_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "92f9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_location_to_vue_vue_type_style_index_0_id_a6077f40_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("af22");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_location_to_vue_vue_type_style_index_0_id_a6077f40_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_location_to_vue_vue_type_style_index_0_id_a6077f40_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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

/***/ "af22":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "bc30":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/components/mars-sample/location-to.vue?vue&type=template&id=a6077f40&scoped=true


var location_tovue_type_template_id_a6077f40_scoped_true_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-a6077f40"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("定位至山区");

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("定位至模型");

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

  var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

  var _component_pannel = Object(vue_runtime_esm_bundler["resolveComponent"])("pannel");

  return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(_component_pannel, {
    class: "localBtn"
  }, {
    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
            onClick: _ctx.centerAtTerrain
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_1];
            }),
            _: 1
          }, 8, ["onClick"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
            onClick: _ctx.centerAtModel
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_2];
            }),
            _: 1
          }, 8, ["onClick"])];
        }),
        _: 1
      })];
    }),
    _: 1
  });
}
// CONCATENATED MODULE: ./src/components/mars-sample/location-to.vue?vue&type=template&id=a6077f40&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/components/mars-sample/location-to.vue?vue&type=script&lang=js


/**
 * 公共组件：快捷定位
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */


/* harmony default export */ var location_tovue_type_script_lang_js = (Object(vue_runtime_esm_bundler["defineComponent"])({
  components: {
    Pannel: pannel["a" /* default */]
  },
  setup: function setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    var mapWork = window.mapWork; // let modelTest
    //  定位至山区

    var centerAtTerrain = function centerAtTerrain() {
      mapWork.map.setCameraView({
        lat: 30.859414,
        lng: 116.28709,
        alt: 8617,
        heading: 18,
        pitch: -28
      });
    }; // 定位至模型


    var centerAtModel = function centerAtModel() {
      mapWork.centerAtModel();
      mapWork.map.setCameraView({
        lng: 114.019768,
        lat: 22.627935,
        alt: 80.6,
        heading: 359,
        pitch: -34
      });
    };

    return {
      centerAtTerrain: centerAtTerrain,
      centerAtModel: centerAtModel
    };
  }
}));
// CONCATENATED MODULE: ./src/components/mars-sample/location-to.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/mars-sample/location-to.vue?vue&type=style&index=0&id=a6077f40&lang=less&scoped=true
var location_tovue_type_style_index_0_id_a6077f40_lang_less_scoped_true = __webpack_require__("92f9");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/mars-sample/location-to.vue







const __exports__ = /*#__PURE__*/exportHelper_default()(location_tovue_type_script_lang_js, [['render',render],['__scopeId',"data-v-a6077f40"]])

/* harmony default export */ var location_to = __webpack_exports__["a"] = (__exports__);

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


/***/ })

}]);