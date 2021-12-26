(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-7484778e"],{

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

/***/ "e64d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fbcd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__("5a0c");
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/graphic/space/tle-getPoint/index.vue?vue&type=script&setup=true&lang=ts


var _hoisted_1 = {
  class: "f-mb f-tac"
};

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("计算成像区域");

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("清除所有");

var _hoisted_4 = {
  class: "f-tac"
};

var _hoisted_5 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("升轨");

var _hoisted_6 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("降轨");




/* harmony default export */ var tle_getPointvue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var formState = Object(vue_runtime_esm_bundler["reactive"])({
      slideAngle: 10,
      slideOpacity: 0.4,
      startTime: null,
      endTime: null,
      areaColor: "red",
      guidaoS: true,
      guidaoJ: true
    });
    var startTime = Object(vue_runtime_esm_bundler["ref"])();
    var endTime = Object(vue_runtime_esm_bundler["ref"])();
    mapWork.eventTarget.on("loadOK", function (event) {
      startTime.value = dayjs_min_default()(event.startTime, "YYYY-MM-DD HH:mm:ss");
      endTime.value = dayjs_min_default()(event.endTime, "YYYY-MM-DD HH:mm:ss");
    });

    var changeAngle = function changeAngle() {
      mapWork.changeAngle(formState.slideAngle);
    }; // 升轨


    var changeGuidaoS = function changeGuidaoS() {
      mapWork.changeGuidaoS(formState.guidaoS);
    }; // 降轨


    var changeGuidaoJ = function changeGuidaoJ() {
      mapWork.changeGuidaoJ(formState.guidaoJ);
    };

    var changeColorOpacity = function changeColorOpacity() {
      mapWork.changeColorOpacity(formState);
    };

    var btnAdd = function btnAdd() {
      mapWork.btnAdd(formState, startTime.value, endTime.value);
    };

    var btnRemoveAll = function btnRemoveAll() {
      mapWork.btnRemoveAll();
    };

    return function (_ctx, _cache) {
      var _component_a_slider = Object(vue_runtime_esm_bundler["resolveComponent"])("a-slider");

      var _component_a_form_item = Object(vue_runtime_esm_bundler["resolveComponent"])("a-form-item");

      var _component_mars_date_picker = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-date-picker");

      var _component_mars_color_picker = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-color-picker");

      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_a_checkbox = Object(vue_runtime_esm_bundler["resolveComponent"])("a-checkbox");

      var _component_a_form = Object(vue_runtime_esm_bundler["resolveComponent"])("a-form");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                label: "卫星张角:"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                    onChange: changeAngle,
                    value: Object(vue_runtime_esm_bundler["unref"])(formState).slideAngle,
                    "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
                      return Object(vue_runtime_esm_bundler["unref"])(formState).slideAngle = $event;
                    }),
                    min: 1,
                    max: 70,
                    step: 1
                  }, null, 8, ["value"])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                label: "开始时间:"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_date_picker, {
                    value: startTime.value,
                    "onUpdate:value": _cache[1] || (_cache[1] = function ($event) {
                      return startTime.value = $event;
                    }),
                    format: "YYYY-MM-DD HH:mm:ss",
                    "show-time": {
                      defaultValue: Object(vue_runtime_esm_bundler["unref"])(dayjs_min_default.a)('00:00:00', 'HH:mm:ss')
                    }
                  }, null, 8, ["value", "show-time"])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                label: "结束时间:"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_date_picker, {
                    value: endTime.value,
                    "onUpdate:value": _cache[2] || (_cache[2] = function ($event) {
                      return endTime.value = $event;
                    }),
                    format: "YYYY-MM-DD HH:mm:ss",
                    "show-time": {
                      defaultValue: Object(vue_runtime_esm_bundler["unref"])(dayjs_min_default.a)('00:00:00', 'HH:mm:ss')
                    }
                  }, null, 8, ["value", "show-time"])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                label: "区域颜色:"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_color_picker, {
                    onChange: changeColorOpacity,
                    value: Object(vue_runtime_esm_bundler["unref"])(formState).areaColor,
                    "onUpdate:value": _cache[3] || (_cache[3] = function ($event) {
                      return Object(vue_runtime_esm_bundler["unref"])(formState).areaColor = $event;
                    })
                  }, null, 8, ["value"])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                label: "区域透明度:"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                    onChange: changeColorOpacity,
                    value: Object(vue_runtime_esm_bundler["unref"])(formState).slideOpacity,
                    "onUpdate:value": _cache[4] || (_cache[4] = function ($event) {
                      return Object(vue_runtime_esm_bundler["unref"])(formState).slideOpacity = $event;
                    }),
                    min: 0.01,
                    max: 1.0,
                    step: 0.01
                  }, null, 8, ["value", "min", "max", "step"])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                    onClick: btnAdd
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_2];
                    }),
                    _: 1
                  }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                    onClick: btnRemoveAll
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_3];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_4, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).guidaoS,
                "onUpdate:checked": _cache[5] || (_cache[5] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).guidaoS = $event;
                }),
                onChange: changeGuidaoS
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_5];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: Object(vue_runtime_esm_bundler["unref"])(formState).guidaoJ,
                "onUpdate:checked": _cache[6] || (_cache[6] = function ($event) {
                  return Object(vue_runtime_esm_bundler["unref"])(formState).guidaoJ = $event;
                }),
                onChange: changeGuidaoJ
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_6];
                }),
                _: 1
              }, 8, ["checked"])])];
            }),
            _: 1
          })];
        }),
        _: 1
      });
    };
  }
}));
// CONCATENATED MODULE: ./src/example/graphic/space/tle-getPoint/index.vue?vue&type=script&setup=true&lang=ts
 
// CONCATENATED MODULE: ./src/example/graphic/space/tle-getPoint/index.vue



const __exports__ = tle_getPointvue_type_script_setup_true_lang_ts;

/* harmony default export */ var tle_getPoint = __webpack_exports__["default"] = (__exports__);

/***/ })

}]);