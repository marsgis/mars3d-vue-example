(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-b5fef71c"],{

/***/ "112f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "408a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ "4e4b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e64d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5343":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_086da164_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("112f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_086da164_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_086da164_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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

/***/ "7544":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@icon-park/vue-next/es/icons/Close.js
var Close = __webpack_require__("246f");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/components/marsgis/pannel.vue?vue&type=script&lang=ts&setup=true




var pannelvue_type_script_lang_ts_setup_true_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-b885d716"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = {
  class: "title"
};

/* harmony default export */ var pannelvue_type_script_lang_ts_setup_true = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  props: {
    type: {
      type: String,
      default: "pannel"
    },
    warpper: {
      type: String,
      default: "sanbox-warpper"
    },
    title: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:visible"],
  setup: function setup(__props, _ref) {
    var emits = _ref.emit;
    var props = __props;
    /**
     * 操作公共容器
     * @copyright 火星科技 mars3d.cn
     * @author 木遥 2021-11-01
     */

    var pannelBox = Object(vue_runtime_esm_bundler["ref"])();

    var closeModel = function closeModel() {
      emits("update:visible", false);
    };

    function mousedown(event) {
      var x = event.clientX;
      var y = event.clientY;

      window.onmousemove = function (ev) {
        ev.preventDefault();
        toPointerPosition(ev);
      };

      window.onmouseup = function (ev) {
        toPointerPosition(ev);
        window.onmousemove = null;
        window.onmouseup = null;
      };

      function toPointerPosition(ev) {
        var pb = pannelBox.value;
        var distanceX = ev.clientX - x;
        var distanceY = ev.clientY - y;
        toPosition(pb, pb.offsetLeft + distanceX, pb.offsetTop + distanceY, ev);
      }

      function toPosition(dom, left, top, e) {
        var warpper = document.getElementById(props.warpper);

        if (left > 0 && left + dom.offsetWidth < warpper.offsetWidth) {
          dom.style.left = left + "px";
          x = e.clientX;
        }

        if (top > 0 && top + dom.offsetHeight < warpper.offsetHeight) {
          dom.style.top = top + "px";
          y = e.clientY;
        }
      }
    }

    return function (_ctx, _cache) {
      return Object(vue_runtime_esm_bundler["withDirectives"])((Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])("div", {
        class: Object(vue_runtime_esm_bundler["normalizeClass"])(["pannel fadeInRight", {
          'pannel-model': props.type === 'model'
        }]),
        ref_key: "pannelBox",
        ref: pannelBox
      }, [props.type === 'model' ? (Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])("div", {
        key: 0,
        ref: "modelHeader",
        class: "pannel-model__header",
        onMousedown: mousedown
      }, [Object(vue_runtime_esm_bundler["createElementVNode"])("span", _hoisted_1, Object(vue_runtime_esm_bundler["toDisplayString"])(__props.title), 1), Object(vue_runtime_esm_bundler["createVNode"])(Object(vue_runtime_esm_bundler["unref"])(Close["a" /* default */]), {
        onClick: closeModel,
        class: "close-btn"
      })], 544)) : Object(vue_runtime_esm_bundler["createCommentVNode"])("", true), Object(vue_runtime_esm_bundler["renderSlot"])(_ctx.$slots, "default")], 2)), [[vue_runtime_esm_bundler["vShow"], props.type === 'pannel' || __props.visible]]);
    };
  }
}));
// CONCATENATED MODULE: ./src/components/marsgis/pannel.vue?vue&type=script&lang=ts&setup=true
 
// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue?vue&type=style&index=0&id=b885d716&lang=less&scoped=true
var pannelvue_type_style_index_0_id_b885d716_lang_less_scoped_true = __webpack_require__("4e4b");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/marsgis/pannel.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(pannelvue_type_script_lang_ts_setup_true, [['__scopeId',"data-v-b885d716"]])

/* harmony default export */ var pannel = __webpack_exports__["a"] = (__exports__);

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

/***/ "e4e2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// EXTERNAL MODULE: ./src/utils/index.ts
var utils = __webpack_require__("d257");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/map/options/scene/index.vue?vue&type=script&setup=true&lang=ts




var scenevue_type_script_setup_true_lang_ts_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-086da164"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = {
  key: 0,
  href: "https://mars3d.cn/api/Map.html#.sceneOptions",
  target: "_black"
};

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("是");

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("否");




/* harmony default export */ var scenevue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var data = Object(vue_runtime_esm_bundler["ref"])([{
      key: "1",
      name: "场景Scene",
      describe: "场景模式",
      operation: "select",
      value: 3
    }, {
      key: "2",
      name: "场景Scene",
      describe: "高动态渲染",
      operation: "checked",
      value: "2",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneOptions("highDynamicRange", true);
        } else {
          mapWork.setSceneOptions("highDynamicRange", false);
        }
      }
    }, {
      key: "3",
      name: "场景Scene",
      describe: "快速抗锯齿",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneOptions("fxaa", true);
        } else {
          mapWork.setSceneOptions("fxaa", false);
        }
      }
    }, {
      key: "4",
      name: "场景Scene",
      describe: "显示太阳",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneOptions("showSun", true);
        } else {
          mapWork.setSceneOptions("showSun", false);
        }
      }
    }, {
      key: "5",
      name: "场景Scene",
      describe: "显示月亮",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneOptions("showMoon", true);
        } else {
          mapWork.setSceneOptions("showMoon", false);
        }
      }
    }, {
      key: "6",
      name: "场景Scene",
      describe: "显示天空盒子",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneOptions("showSkyBox", true);
        } else {
          mapWork.setSceneOptions("showSkyBox", false);
        }
      }
    }, {
      key: "7",
      name: "场景Scene",
      describe: "空间背景色",
      operation: "color",
      value: "#000000",
      change: function change(index) {
        mapWork.setSceneOptions("backgroundColor", data.value[index].value);
      }
    }, {
      key: "8",
      name: "场景Scene",
      describe: "大气外光圈",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneOptions("showSkyAtmosphere", true);
        } else {
          mapWork.setSceneOptions("showSkyAtmosphere", false);
        }
      }
    }, {
      key: "9",
      name: "场景Scene",
      describe: "雾化效果",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneOptions("fog", true);
        } else {
          mapWork.setSceneOptions("fog", false);
        }
      }
    }, {
      key: "10",
      name: "地球Globe",
      describe: "地形夸张倍数",
      operation: "range",
      value: 1,
      min: 1,
      max: 80,
      step: 1,
      change: function change(index) {
        mapWork.setSceneGlobeOptions("terrainExaggeration", data.value[index].value);
      }
    }, {
      key: "11",
      name: "地球Globe",
      describe: "昼夜区域",
      operation: "checked",
      value: "2",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneGlobeOptions("enableLighting", true);
        } else {
          mapWork.setSceneGlobeOptions("enableLighting", false);
        }
      }
    }, {
      key: "12",
      name: "地球Globe",
      describe: "绘制地面大气",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneGlobeOptions("showGroundAtmosphere", true);
        } else {
          mapWork.setSceneGlobeOptions("showGroundAtmosphere", false);
        }
      }
    }, {
      key: "13",
      name: "地球Globe",
      describe: "深度监测",
      operation: "checked",
      value: "2",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneGlobeOptions("depthTestAgainstTerrain", true);
        } else {
          mapWork.setSceneGlobeOptions("depthTestAgainstTerrain", false);
        }
      }
    }, {
      key: "14",
      name: "地球Globe",
      describe: "显示底图",
      operation: "checked",
      value: "1",
      change: function change(index) {
        mapWork.showBaseMap(data.value[index].value);
      }
    }, {
      key: "15",
      name: "地球Globe",
      describe: "地球背景色",
      operation: "color",
      value: "#000000",
      change: function change(index) {
        mapWork.setSceneGlobeOptions("baseColor", data.value[index].value);
      }
    }, {
      key: "16",
      name: "鼠标交互",
      describe: "缩放地图",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneCameraControllerOptions("enableZoom", true);
        } else {
          mapWork.setSceneCameraControllerOptions("enableZoom", false);
        }
      }
    }, {
      key: "17",
      name: "鼠标交互",
      describe: "倾斜相机",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneCameraControllerOptions("enableTilt", true);
        } else {
          mapWork.setSceneCameraControllerOptions("enableTilt", false);
        }
      }
    }, {
      key: "18",
      name: "鼠标交互",
      describe: "旋转转换位置",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneCameraControllerOptions("enableRotate", true);
        } else {
          mapWork.setSceneCameraControllerOptions("enableRotate", false);
        }
      }
    }, {
      key: "19",
      name: "鼠标交互",
      describe: "平移地图",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneCameraControllerOptions("enableTranslate", true);
        } else {
          mapWork.setSceneCameraControllerOptions("enableTranslate", false);
        }
      }
    }, {
      key: "20",
      name: "鼠标交互",
      describe: "可操作南北极",
      operation: "checked",
      value: "2",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneCameraControllerOptions("constrainedAxis", false);
        } else {
          mapWork.setSceneCameraControllerOptions("constrainedAxis", true);
        }
      }
    }, {
      key: "21",
      name: "鼠标交互",
      describe: "是否进入地下",
      operation: "checked",
      value: "1",
      change: function change(index) {
        if (Number(data.value[index].value) == 1) {
          mapWork.setSceneCameraControllerOptions("enableCollisionDetection", true);
        } else {
          mapWork.setSceneCameraControllerOptions("enableCollisionDetection", false);
        }
      }
    }, {
      key: "22",
      name: "鼠标交互",
      describe: "最小碰撞高度",
      operation: "range",
      value: 15000,
      min: 100,
      max: 500000,
      step: 100,
      change: function change(index) {
        mapWork.setSceneCameraControllerOptions("minimumCollisionTerrainHeight", data.value[index].value);
      }
    }, {
      key: "23",
      name: "鼠标交互",
      describe: "相机最近视距",
      operation: "range",
      value: 1,
      min: 1,
      max: 10000,
      step: 1,
      change: function change(index) {
        mapWork.setSceneCameraControllerOptions("minimumZoomDistance", data.value[index].value);
      }
    }, {
      key: "24",
      name: "鼠标交互",
      describe: "相机最远视距",
      operation: "range",
      value: 50000000,
      min: 10000,
      max: 90000000,
      step: 1000,
      change: function change(index) {
        mapWork.setSceneCameraControllerOptions("minimumZoomDistance", data.value[index].value);
      }
    }, {
      key: "25",
      name: "鼠标交互",
      describe: "滚轮放大倍数",
      operation: "range",
      value: 3,
      min: 1,
      max: 10,
      step: 1,
      change: function change(index) {
        mapWork.setSceneCameraControllerOptions("zoomFactor", data.value[index].value);
      }
    }]);
    var columns = [{
      title: "类型",
      dataIndex: "name",
      width: 80,
      customRender: function customRender(_ref) {
        var index = _ref.index;
        var obj = {
          props: {}
        };

        if (index === 0) {
          obj.props.rowSpan = 9;
        } else {
          obj.props.rowSpan = 0;
        }

        if (index === 9) {
          obj.props.rowSpan = 6;
        }

        if (index === 15) {
          obj.props.rowSpan = 11;
        }

        return obj;
      }
    }, {
      title: "场景描述",
      dataIndex: "describe"
    }, {
      title: "操作",
      dataIndex: "operation"
    }];
    var selectOptions = Object(vue_runtime_esm_bundler["ref"])([{
      value: 3,
      label: "三维视图"
    }, {
      value: 2,
      label: "二维视图"
    }, {
      value: 1,
      label: "哥伦布视图"
    }]);
    var scene = Object(vue_runtime_esm_bundler["ref"])("三维视图");

    var handleChange = function handleChange(value) {
      mapWork.sceneMode(value);
    };

    var tableScrollHeight = Object(vue_runtime_esm_bundler["ref"])(0);
    Object(vue_runtime_esm_bundler["onMounted"])(function () {
      tableScrollHeight.value = Object(utils["c" /* setAutoHeight */])(function (height) {
        tableScrollHeight.value = height;
      }, 200);
    });
    return function (_ctx, _cache) {
      var _component_mars_select = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-select");

      var _component_a_radio = Object(vue_runtime_esm_bundler["resolveComponent"])("a-radio");

      var _component_a_radio_group = Object(vue_runtime_esm_bundler["resolveComponent"])("a-radio-group");

      var _component_mars_color_picker = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-color-picker");

      var _component_a_slider = Object(vue_runtime_esm_bundler["resolveComponent"])("a-slider");

      var _component_a_table = Object(vue_runtime_esm_bundler["resolveComponent"])("a-table");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_table, {
            columns: columns,
            "data-source": data.value,
            bordered: "",
            pagination: false,
            scroll: {
              y: tableScrollHeight.value
            }
          }, {
            bodyCell: Object(vue_runtime_esm_bundler["withCtx"])(function (_ref2) {
              var column = _ref2.column,
                  text = _ref2.text,
                  index = _ref2.index;
              return [column.dataIndex === 'name' ? (Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])("a", _hoisted_1, Object(vue_runtime_esm_bundler["toDisplayString"])(text), 1)) : Object(vue_runtime_esm_bundler["createCommentVNode"])("", true), column.dataIndex === 'operation' ? (Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])(vue_runtime_esm_bundler["Fragment"], {
                key: 1
              }, [data.value[index].operation === 'select' ? (Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(_component_mars_select, {
                key: 0,
                value: scene.value,
                "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
                  return scene.value = $event;
                }),
                ref: "select",
                style: {
                  "width": "120px"
                },
                onChange: handleChange,
                options: selectOptions.value
              }, null, 8, ["value", "options"])) : Object(vue_runtime_esm_bundler["createCommentVNode"])("", true), data.value[index].operation === 'checked' ? (Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(_component_a_radio_group, {
                key: 1,
                onChange: function onChange($event) {
                  return data.value[index].change(index);
                },
                value: data.value[index].value,
                "onUpdate:value": function onUpdateValue($event) {
                  return data.value[index].value = $event;
                },
                name: 'radioGroup' + index
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_radio, {
                    value: "1"
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_2];
                    }),
                    _: 1
                  }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_radio, {
                    value: "2"
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_3];
                    }),
                    _: 1
                  })];
                }),
                _: 2
              }, 1032, ["onChange", "value", "onUpdate:value", "name"])) : Object(vue_runtime_esm_bundler["createCommentVNode"])("", true), data.value[index].operation === 'color' ? (Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(_component_mars_color_picker, {
                key: 2,
                onChange: function onChange($event) {
                  return data.value[index].change(index);
                },
                value: data.value[index].value,
                "onUpdate:value": function onUpdateValue($event) {
                  return data.value[index].value = $event;
                }
              }, null, 8, ["onChange", "value", "onUpdate:value"])) : Object(vue_runtime_esm_bundler["createCommentVNode"])("", true), data.value[index].operation === 'range' ? (Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(_component_a_slider, {
                key: 3,
                onChange: function onChange($event) {
                  return data.value[index].change(index);
                },
                value: data.value[index].value,
                "onUpdate:value": function onUpdateValue($event) {
                  return data.value[index].value = $event;
                },
                min: data.value[index].min,
                max: data.value[index].max,
                step: data.value[index].step
              }, null, 8, ["onChange", "value", "onUpdate:value", "min", "max", "step"])) : Object(vue_runtime_esm_bundler["createCommentVNode"])("", true)], 64)) : Object(vue_runtime_esm_bundler["createCommentVNode"])("", true)];
            }),
            _: 1
          }, 8, ["data-source", "scroll"])];
        }),
        _: 1
      });
    };
  }
}));
// CONCATENATED MODULE: ./src/example/map/options/scene/index.vue?vue&type=script&setup=true&lang=ts
 
// EXTERNAL MODULE: ./src/example/map/options/scene/index.vue?vue&type=style&index=0&id=086da164&scoped=true&lang=less
var scenevue_type_style_index_0_id_086da164_scoped_true_lang_less = __webpack_require__("5343");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/example/map/options/scene/index.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(scenevue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-086da164"]])

/* harmony default export */ var options_scene = __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "e64d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);