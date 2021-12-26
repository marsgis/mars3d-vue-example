(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-17938a22"],{

/***/ "4e4b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e64d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


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

/***/ "9283":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/control/other/display/index.vue?vue&type=script&setup=true&lang=ts


var _hoisted_1 = {
  class: "f-mb"
};

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", null, "按钮:", -1);

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("POI搜索");

var _hoisted_4 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("视角复位");

var _hoisted_5 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("二三维切换");

var _hoisted_6 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("地图切换");

var _hoisted_7 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("全屏切换");

var _hoisted_8 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("VR模式");

var _hoisted_9 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("帮助");

var _hoisted_10 = {
  class: "f-mb"
};

var _hoisted_11 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", null, "面板:", -1);

var _hoisted_12 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("位置信息状态栏");

var _hoisted_13 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("时钟面板（左下角）");

var _hoisted_14 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("时间刻度线");

var _hoisted_15 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("导航球");

var _hoisted_16 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("比例尺");



/* harmony default export */ var displayvue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var formState = Object(vue_runtime_esm_bundler["reactive"])({
      enabledPOI: true,
      enabledView: true,
      enabledSceneModePicker: true,
      enabledBaseLayerPicker: true,
      enabledFullScreen: true,
      enabledVR: true,
      enabledHelpButton: true,
      enabledLocation: true,
      enabledClock: true,
      enabledTimeLine: true,
      enabledNav: true,
      enabledLegend: true
    }); // 按钮

    var onBindPOI = function onBindPOI() {
      mapWork.bindPOI(formState.enabledPOI);
    };

    var onBindView = function onBindView() {
      mapWork.bindView(formState.enabledView);
    };

    var onBindSceneModePicker = function onBindSceneModePicker() {
      mapWork.bindSceneModePicker(formState.enabledSceneModePicker);
    };

    var onBindBaseLayerPicker = function onBindBaseLayerPicker() {
      mapWork.bindBaseLayerPicker(formState.enabledBaseLayerPicker);
    };

    var onBindFullScreen = function onBindFullScreen() {
      mapWork.bindFullScreen(formState.enabledFullScreen);
    };

    var onBindVR = function onBindVR() {
      mapWork.bindVR(formState.enabledVR);
    };

    var onBindHelpButton = function onBindHelpButton() {
      mapWork.bindHelpButton(formState.enabledHelpButton);
    }; // 面板


    var onBindLocation = function onBindLocation() {
      mapWork.bindLocation(formState.enabledLocation);
    };

    var onBindClock = function onBindClock() {
      mapWork.bindClock(formState.enabledClock);
    };

    var onBindTimeLine = function onBindTimeLine() {
      mapWork.bindTimeLine(formState.enabledTimeLine);
    };

    var onBindNav = function onBindNav() {
      mapWork.bindNav(formState.enabledNav);
    };

    var onBindLegend = function onBindLegend() {
      mapWork.bindLegend(formState.enabledLegend);
    };

    return function (_ctx, _cache) {
      var _component_a_checkbox = Object(vue_runtime_esm_bundler["resolveComponent"])("a-checkbox");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_2, Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledPOI,
                "onUpdate:checked": _cache[0] || (_cache[0] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledPOI = $event;
                }),
                onChange: onBindPOI
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_3];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledView,
                "onUpdate:checked": _cache[1] || (_cache[1] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledView = $event;
                }),
                onChange: onBindView
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_4];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledSceneModePicker,
                "onUpdate:checked": _cache[2] || (_cache[2] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledSceneModePicker = $event;
                }),
                onChange: onBindSceneModePicker
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_5];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledBaseLayerPicker,
                "onUpdate:checked": _cache[3] || (_cache[3] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledBaseLayerPicker = $event;
                }),
                onChange: onBindBaseLayerPicker
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_6];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledFullScreen,
                "onUpdate:checked": _cache[4] || (_cache[4] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledFullScreen = $event;
                }),
                onChange: onBindFullScreen
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_7];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledVR,
                "onUpdate:checked": _cache[5] || (_cache[5] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledVR = $event;
                }),
                onChange: onBindVR
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_8];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledHelpButton,
                "onUpdate:checked": _cache[6] || (_cache[6] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledHelpButton = $event;
                }),
                onChange: onBindHelpButton
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_9];
                }),
                _: 1
              }, 8, ["checked"])];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_10, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_11, Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledLocation,
                "onUpdate:checked": _cache[7] || (_cache[7] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledLocation = $event;
                }),
                onChange: onBindLocation
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_12];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledClock,
                "onUpdate:checked": _cache[8] || (_cache[8] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledClock = $event;
                }),
                onChange: onBindClock
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_13];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledTimeLine,
                "onUpdate:checked": _cache[9] || (_cache[9] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledTimeLine = $event;
                }),
                onChange: onBindTimeLine
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_14];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledNav,
                "onUpdate:checked": _cache[10] || (_cache[10] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledNav = $event;
                }),
                onChange: onBindNav
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_15];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledLegend,
                "onUpdate:checked": _cache[11] || (_cache[11] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).enabledLegend = $event;
                }),
                onChange: onBindLegend
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_16];
                }),
                _: 1
              }, 8, ["checked"])];
            }),
            _: 1
          })])];
        }),
        _: 1
      });
    };
  }
}));
// CONCATENATED MODULE: ./src/example/control/other/display/index.vue?vue&type=script&setup=true&lang=ts
 
// CONCATENATED MODULE: ./src/example/control/other/display/index.vue



const __exports__ = displayvue_type_script_setup_true_lang_ts;

/* harmony default export */ var display = __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "e64d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);