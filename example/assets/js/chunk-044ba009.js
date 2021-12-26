(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-044ba009"],{

/***/ "1148":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var toIntegerOrInfinity = __webpack_require__("5926");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");

var RangeError = global.RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "2ee0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_16fcced7_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("597a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_16fcced7_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_16fcced7_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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

/***/ "597a":
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

/***/ "873b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__("b680");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/graphic/space/satellite/index.vue?vue&type=script&lang=ts&setup=true






var satellitevue_type_script_lang_ts_setup_true_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-16fcced7"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = {
  class: "f-mb"
};

var _hoisted_2 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
    class: "pannel-item-label"
  }, "视椎体状态:", -1);
});

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("定位至卫星");

var _hoisted_4 = {
  class: "f-mb"
};

var _hoisted_5 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
    class: "pannel-item-label"
  }, "类型:", -1);
});

var _hoisted_6 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("圆锥体");

var _hoisted_7 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("四棱锥体");

var _hoisted_8 = {
  class: "f-mb"
};

var _hoisted_9 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
    class: "pannel-item-label"
  }, "前后侧摆:", -1);
});

var _hoisted_10 = {
  class: "f-mb"
};

var _hoisted_11 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
    class: "pannel-item-label"
  }, "左右侧摆:", -1);
});

var _hoisted_12 = {
  class: "f-mb"
};

var _hoisted_13 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
    class: "pannel-item-label"
  }, "夹角1:", -1);
});

var _hoisted_14 = {
  key: 0,
  class: "f-mb"
};

var _hoisted_15 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
    class: "pannel-item-label"
  }, "夹角2:", -1);
});

var _hoisted_16 = {
  class: "f-mb"
};

var _hoisted_17 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
    class: "pannel-item-label"
  }, "参考系轴:", -1);
});

var _hoisted_18 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("显示/隐藏");

var _hoisted_19 = {
  class: "mars-table tb-border"
};

var _hoisted_20 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("td", {
    class: "nametd"
  }, "名称", -1);
});

var _hoisted_21 = {
  id: "td_name"
};

var _hoisted_22 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("td", {
    class: "nametd"
  }, "TLE1", -1);
});

var _hoisted_23 = {
  id: "td_tle1"
};

var _hoisted_24 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("td", {
    class: "nametd"
  }, "TLE2", -1);
});

var _hoisted_25 = {
  id: "td_tle2"
};

var _hoisted_26 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("td", {
    class: "nametd"
  }, "时间", -1);
});

var _hoisted_27 = {
  id: "td_time"
};

var _hoisted_28 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("td", {
    class: "nametd"
  }, "经度", -1);
});

var _hoisted_29 = {
  id: "td_jd"
};

var _hoisted_30 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("td", {
    class: "nametd"
  }, "经度", -1);
});

var _hoisted_31 = {
  id: "td_wd"
};

var _hoisted_32 = /*#__PURE__*/satellitevue_type_script_lang_ts_setup_true_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("td", {
    class: "nametd"
  }, "高程", -1);
});

var _hoisted_33 = {
  id: "td_gd"
};


/* harmony default export */ var satellitevue_type_script_lang_ts_setup_true = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var value = Object(vue_runtime_esm_bundler["ref"])("2");
    var angleValue1 = Object(vue_runtime_esm_bundler["ref"])(30);
    var angleValue2 = Object(vue_runtime_esm_bundler["ref"])(20);
    var pitchValue = Object(vue_runtime_esm_bundler["ref"])(0); // 仰角

    var rollValue = Object(vue_runtime_esm_bundler["ref"])(0); // 左右

    var formState = Object(vue_runtime_esm_bundler["reactive"])({
      enabledShowMatrix: false,
      enabledSee: false,
      name: "",
      tle1: "",
      tle2: "",
      time: "",
      td_jd: 0,
      td_wd: 0,
      td_gd: "0米"
    });
    Object(vue_runtime_esm_bundler["onMounted"])(function () {
      mapWork.eventTarget.on("loadOk", function (event) {
        var nowData = event.weixinData;
        var height = formatLength(nowData.td_gd);
        formState.name = nowData.name;
        formState.tle1 = nowData.tle1;
        formState.tle2 = nowData.tle2;
        formState.time = nowData.time;
        formState.td_jd = nowData.td_jd;
        formState.td_wd = nowData.td_wd;
        formState.td_gd = height;
      });
    }); // 数据处理

    function formatLength(val) {
      if (val == null) {
        return "";
      }

      val = Number(val);
      var valstr = (val * 0.001).toFixed(2) + "公里";
      return valstr;
    } // 俯仰角


    var pitchChange = function pitchChange() {
      mapWork.pitchChange(pitchValue.value);
    }; // 左右角


    var rollChange = function rollChange() {
      mapWork.rollChange(rollValue.value);
    }; // 夹角


    var angle1 = function angle1() {
      mapWork.angle1(angleValue1.value);
    };

    var angle2 = function angle2() {
      mapWork.angle2(angleValue2.value);
    }; // 定位至卫星


    var locate = function locate() {
      mapWork.locate();
    }; // 凝视目标


    var selPoint = function selPoint(texShow) {
      formState.enabledSee = !texShow;

      if (!texShow) {
        mapWork.selPoint();
      }

      mapWork.selPoint();
    }; // 参考轴系显示与隐藏


    var chkShowModelMatrix = function chkShowModelMatrix() {
      mapWork.chkShowModelMatrix(formState.enabledShowMatrix);
    }; // 类型选择


    var chkSensorType = function chkSensorType() {
      mapWork.chkSensorType(value.value);
    };

    return function (_ctx, _cache) {
      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_a_radio = Object(vue_runtime_esm_bundler["resolveComponent"])("a-radio");

      var _component_a_radio_group = Object(vue_runtime_esm_bundler["resolveComponent"])("a-radio-group");

      var _component_a_slider = Object(vue_runtime_esm_bundler["resolveComponent"])("a-slider");

      var _component_a_checkbox = Object(vue_runtime_esm_bundler["resolveComponent"])("a-checkbox");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])(vue_runtime_esm_bundler["Fragment"], null, [Object(vue_runtime_esm_bundler["createVNode"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_2, Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: locate
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_3];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: _cache[0] || (_cache[0] = function ($event) {
                  return selPoint(Object(vue_runtime_esm_bundler["unref"])(formState).enabledSee);
                })
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createTextVNode"])(Object(vue_runtime_esm_bundler["toDisplayString"])(Object(vue_runtime_esm_bundler["unref"])(formState).enabledSee ? "取消凝视" : "凝视"), 1)];
                }),
                _: 1
              })];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_4, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_5, Object(vue_runtime_esm_bundler["createVNode"])(_component_a_radio_group, {
                value: value.value,
                "onUpdate:value": _cache[1] || (_cache[1] = function ($event) {
                  return value.value = $event;
                }),
                name: "radioGroup",
                onChange: chkSensorType
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_radio, {
                    value: "1"
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_6];
                    }),
                    _: 1
                  }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_radio, {
                    value: "2"
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_7];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              }, 8, ["value"])];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_8, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_9, Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                onChange: pitchChange,
                value: pitchValue.value,
                "onUpdate:value": _cache[2] || (_cache[2] = function ($event) {
                  return pitchValue.value = $event;
                }),
                min: -180,
                max: 180,
                step: 1
              }, null, 8, ["value"]), Object(vue_runtime_esm_bundler["createTextVNode"])("值" + Object(vue_runtime_esm_bundler["toDisplayString"])(pitchValue.value), 1)];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_10, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_11, Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                onChange: rollChange,
                value: rollValue.value,
                "onUpdate:value": _cache[3] || (_cache[3] = function ($event) {
                  return rollValue.value = $event;
                }),
                min: -180,
                max: 180,
                step: 1
              }, null, 8, ["value"]), Object(vue_runtime_esm_bundler["createTextVNode"])("值" + Object(vue_runtime_esm_bundler["toDisplayString"])(rollValue.value), 1)];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_12, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_13, Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                onChange: angle1,
                value: angleValue1.value,
                "onUpdate:value": _cache[4] || (_cache[4] = function ($event) {
                  return angleValue1.value = $event;
                }),
                min: 1,
                max: 89,
                step: 0.01
              }, null, 8, ["value", "step"]), Object(vue_runtime_esm_bundler["createTextVNode"])("值" + Object(vue_runtime_esm_bundler["toDisplayString"])(angleValue1.value), 1)];
            }),
            _: 1
          })]), value.value === '2' ? (Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])("div", _hoisted_14, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_15, Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                onChange: angle2,
                value: angleValue2.value,
                "onUpdate:value": _cache[5] || (_cache[5] = function ($event) {
                  return angleValue2.value = $event;
                }),
                min: 1,
                max: 89,
                step: 0.01
              }, null, 8, ["value", "step"]), Object(vue_runtime_esm_bundler["createTextVNode"])("值" + Object(vue_runtime_esm_bundler["toDisplayString"])(angleValue2.value), 1)];
            }),
            _: 1
          })])) : Object(vue_runtime_esm_bundler["createCommentVNode"])("", true), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_16, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_17, Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledShowMatrix,
                "onUpdate:checked": _cache[6] || (_cache[6] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledShowMatrix = $event;
                }),
                onChange: chkShowModelMatrix
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_18];
                }),
                _: 1
              }, 8, ["checked"])];
            }),
            _: 1
          })])];
        }),
        _: 1
      }), Object(vue_runtime_esm_bundler["createVNode"])(pannel["a" /* default */], {
        class: "messageShow"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createElementVNode"])("table", _hoisted_19, [Object(vue_runtime_esm_bundler["createElementVNode"])("tr", null, [_hoisted_20, Object(vue_runtime_esm_bundler["createElementVNode"])("td", _hoisted_21, Object(vue_runtime_esm_bundler["toDisplayString"])(Object(vue_runtime_esm_bundler["unref"])(formState).name), 1)]), Object(vue_runtime_esm_bundler["createElementVNode"])("tr", null, [_hoisted_22, Object(vue_runtime_esm_bundler["createElementVNode"])("td", _hoisted_23, Object(vue_runtime_esm_bundler["toDisplayString"])(Object(vue_runtime_esm_bundler["unref"])(formState).tle1), 1)]), Object(vue_runtime_esm_bundler["createElementVNode"])("tr", null, [_hoisted_24, Object(vue_runtime_esm_bundler["createElementVNode"])("td", _hoisted_25, Object(vue_runtime_esm_bundler["toDisplayString"])(Object(vue_runtime_esm_bundler["unref"])(formState).tle2), 1)]), Object(vue_runtime_esm_bundler["createElementVNode"])("tr", null, [_hoisted_26, Object(vue_runtime_esm_bundler["createElementVNode"])("td", _hoisted_27, Object(vue_runtime_esm_bundler["toDisplayString"])(Object(vue_runtime_esm_bundler["unref"])(formState).time), 1)]), Object(vue_runtime_esm_bundler["createElementVNode"])("tr", null, [_hoisted_28, Object(vue_runtime_esm_bundler["createElementVNode"])("td", _hoisted_29, Object(vue_runtime_esm_bundler["toDisplayString"])(Object(vue_runtime_esm_bundler["unref"])(formState).td_jd), 1)]), Object(vue_runtime_esm_bundler["createElementVNode"])("tr", null, [_hoisted_30, Object(vue_runtime_esm_bundler["createElementVNode"])("td", _hoisted_31, Object(vue_runtime_esm_bundler["toDisplayString"])(Object(vue_runtime_esm_bundler["unref"])(formState).td_wd), 1)]), Object(vue_runtime_esm_bundler["createElementVNode"])("tr", null, [_hoisted_32, Object(vue_runtime_esm_bundler["createElementVNode"])("td", _hoisted_33, Object(vue_runtime_esm_bundler["toDisplayString"])(Object(vue_runtime_esm_bundler["unref"])(formState).td_gd), 1)])])];
        }),
        _: 1
      })], 64);
    };
  }
}));
// CONCATENATED MODULE: ./src/example/graphic/space/satellite/index.vue?vue&type=script&lang=ts&setup=true
 
// EXTERNAL MODULE: ./src/example/graphic/space/satellite/index.vue?vue&type=style&index=0&id=16fcced7&scoped=true&lang=less
var satellitevue_type_style_index_0_id_16fcced7_scoped_true_lang_less = __webpack_require__("2ee0");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/example/graphic/space/satellite/index.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(satellitevue_type_script_lang_ts_setup_true, [['__scopeId',"data-v-16fcced7"]])

/* harmony default export */ var satellite = __webpack_exports__["default"] = (__exports__);

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

/***/ "b680":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var toIntegerOrInfinity = __webpack_require__("5926");
var thisNumberValue = __webpack_require__("408a");
var $repeat = __webpack_require__("1148");
var fails = __webpack_require__("d039");

var RangeError = global.RangeError;
var String = global.String;
var floor = Math.floor;
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var un$ToFixed = uncurryThis(1.0.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED = fails(function () {
  return un$ToFixed(0.00008, 3) !== '0.000' ||
    un$ToFixed(0.9, 0) !== '1' ||
    un$ToFixed(1.255, 2) !== '1.25' ||
    un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  un$ToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat('0', fractDigits - k) + result
        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ "e64d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);