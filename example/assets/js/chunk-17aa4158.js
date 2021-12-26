(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-17aa4158"],{

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

/***/ "6846":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_5ae94b04_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("9dfd");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_5ae94b04_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_5ae94b04_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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

/***/ "9061":
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/thing/terrain/floodByGraphic/index.vue?vue&type=script&setup=true&lang=ts




var floodByGraphicvue_type_script_setup_true_lang_ts_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-5ae94b04"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = {
  class: "f-mb"
};

var _hoisted_2 = /*#__PURE__*/floodByGraphicvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", null, "分析区域", -1);
});

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("绘制矩形");

var _hoisted_4 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("绘制多边形");

var _hoisted_5 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("清除");

var _hoisted_6 = {
  class: "f-mb"
};

var _hoisted_7 = /*#__PURE__*/floodByGraphicvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", null, "最低海拔", -1);
});

var _hoisted_8 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("米 ");

var _hoisted_9 = {
  class: "f-mb"
};

var _hoisted_10 = /*#__PURE__*/floodByGraphicvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", null, "最高海拔", -1);
});

var _hoisted_11 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("米 ");

var _hoisted_12 = {
  class: "f-mb"
};

var _hoisted_13 = /*#__PURE__*/floodByGraphicvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", null, "淹没速度", -1);
});

var _hoisted_14 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("米/秒 ");

var _hoisted_15 = {
  class: "f-tac"
};

var _hoisted_16 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("开始分析");



/* harmony default export */ var floodByGraphicvue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var formState = Object(vue_runtime_esm_bundler["reactive"])({
      minHeight: "",
      maxHeight: "",
      speed: 10
    });
    mapWork.eventTarget.on("loadOk", function (e) {
      e.floodByGraphic.speed = Number(formState.speed);
    }); // 添加矩形

    var btnDrawExtent = function btnDrawExtent() {
      mapWork.btnDrawExtent(function (min, max) {
        formState.minHeight = Math.ceil(min);
        formState.maxHeight = Math.ceil(max);
      });
    }; // 添加多边形


    var btnDraw = function btnDraw() {
      mapWork.btnDraw(function (min, max) {
        formState.minHeight = Math.ceil(min);
        formState.maxHeight = Math.ceil(max);
      });
    };

    var clearDraw = function clearDraw() {
      mapWork.clearDraw();
      formState.minHeight = "";
      formState.maxHeight = "";
    }; // 开始淹没


    var begin = function begin() {
      mapWork.begin(formState);
    };

    return function (_ctx, _cache) {
      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_mars_input_number = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-input-number");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_2, Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: btnDrawExtent
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_3];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: btnDraw
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_4];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: clearDraw
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_5];
                }),
                _: 1
              })];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_6, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_7, Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                value: Object(vue_runtime_esm_bundler["unref"])(formState).minHeight,
                "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).minHeight = $event;
                }),
                step: 1
              }, null, 8, ["value"]), _hoisted_8];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_9, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_10, Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                value: Object(vue_runtime_esm_bundler["unref"])(formState).maxHeight,
                "onUpdate:value": _cache[1] || (_cache[1] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).maxHeight = $event;
                }),
                step: 1
              }, null, 8, ["value"]), _hoisted_11];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_12, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_13, Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                value: Object(vue_runtime_esm_bundler["unref"])(formState).speed,
                "onUpdate:value": _cache[2] || (_cache[2] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).speed = $event;
                }),
                step: 1
              }, null, 8, ["value"]), _hoisted_14];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_15, [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
            onClick: begin
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_16];
            }),
            _: 1
          })])];
        }),
        _: 1
      });
    };
  }
}));
// CONCATENATED MODULE: ./src/example/thing/terrain/floodByGraphic/index.vue?vue&type=script&setup=true&lang=ts
 
// EXTERNAL MODULE: ./src/example/thing/terrain/floodByGraphic/index.vue?vue&type=style&index=0&id=5ae94b04&scoped=true&lang=less
var floodByGraphicvue_type_style_index_0_id_5ae94b04_scoped_true_lang_less = __webpack_require__("6846");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/example/thing/terrain/floodByGraphic/index.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(floodByGraphicvue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-5ae94b04"]])

/* harmony default export */ var floodByGraphic = __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "9dfd":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "e64d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);