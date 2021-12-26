(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-5882f170"],{

/***/ "1469":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

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

/***/ "96bf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_7ea518dc_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1469");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_7ea518dc_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_7ea518dc_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e64d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ea82":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@icon-park/vue-next/es/icons/DownC.js
var DownC = __webpack_require__("f271");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/layer-tileset/type/piping/index.vue?vue&type=script&setup=true&lang=ts




var pipingvue_type_script_setup_true_lang_ts_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-7ea518dc"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = {
  class: "f-mb"
};

var _hoisted_2 = /*#__PURE__*/pipingvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
    class: "pannel-item-label"
  }, "地表透明度:", -1);
});

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("是否开启");

var _hoisted_4 = {
  class: "f-mb"
};

var _hoisted_5 = /*#__PURE__*/pipingvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
    class: "pannel-item-label"
  }, "开挖深度:", -1);
});

var _hoisted_6 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("是否挖地");

var _hoisted_7 = {
  class: "f-mb"
};

var _hoisted_8 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("矩形");

var _hoisted_9 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("多边形");

var _hoisted_10 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("清除");

var _hoisted_11 = {
  class: "f-tac"
};

var _hoisted_12 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("俯视视角");

var _hoisted_13 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("地下视角");



/* harmony default export */ var pipingvue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var activeKey = Object(vue_runtime_esm_bundler["ref"])(["1", "2", "3"]);
    var formState = Object(vue_runtime_esm_bundler["reactive"])({
      enabledGround: false,
      enabledClipping: true
    }); // 深度

    var heightVal = Object(vue_runtime_esm_bundler["ref"])(30);
    mapWork.eventTarget.on("loadOk", function () {
      // 创建Echarts图层
      mapWork.terrainClips(heightVal.value);
    }); // 深度改变

    var heightChange = function heightChange() {
      mapWork.heightChange(heightVal.value);
    }; // 透明度


    var alphaVal = Object(vue_runtime_esm_bundler["ref"])(0.5); // 透明度改变

    var alphaChange = function alphaChange() {
      mapWork.alphaChange(alphaVal.value);
    };

    var chkUnderground = function chkUnderground() {
      mapWork.chkUnderground(formState.enabledGround, alphaVal.value);
    };

    var chkClippingPlanes = function chkClippingPlanes() {
      mapWork.chkClippingPlanes(formState.enabledClipping);
    }; // 绘制矩形


    var drawExtent = function drawExtent() {
      mapWork.drawExtent();
    }; // 绘制多边形


    var drawPolygon = function drawPolygon() {
      mapWork.drawPolygon();
    }; // 清除


    var clearWJ = function clearWJ() {
      mapWork.clearWJ();
    }; // 演示视角


    var centerAtDX1 = function centerAtDX1() {
      mapWork.centerAtDX1();
    };

    var centerAtDX2 = function centerAtDX2() {
      mapWork.centerAtDX2();
    };

    return function (_ctx, _cache) {
      var _component_a_slider = Object(vue_runtime_esm_bundler["resolveComponent"])("a-slider");

      var _component_a_checkbox = Object(vue_runtime_esm_bundler["resolveComponent"])("a-checkbox");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_a_collapse_panel = Object(vue_runtime_esm_bundler["resolveComponent"])("a-collapse-panel");

      var _component_mars_input_number = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-input-number");

      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_collapse = Object(vue_runtime_esm_bundler["resolveComponent"])("a-collapse");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_collapse, {
            activeKey: activeKey.value,
            "onUpdate:activeKey": _cache[4] || (_cache[4] = function ($event) {
              return activeKey.value = $event;
            })
          }, {
            expandIcon: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(Object(vue_runtime_esm_bundler["unref"])(DownC["a" /* default */]))];
            }),
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_collapse_panel, {
                key: "1",
                header: "地下模式"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_2, Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                        onChange: alphaChange,
                        min: 0,
                        max: 1,
                        step: 0.1,
                        value: alphaVal.value,
                        "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
                          return alphaVal.value = $event;
                        })
                      }, null, 8, ["step", "value"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                        onChange: chkUnderground,
                        checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledGround,
                        "onUpdate:checked": _cache[1] || (_cache[1] = function ($event) {
                          return Object(vue_runtime_esm_bundler["unref"])(formState).enabledGround = $event;
                        })
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_3];
                        }),
                        _: 1
                      }, 8, ["checked"])];
                    }),
                    _: 1
                  })])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_collapse_panel, {
                key: "2",
                header: "地下开挖"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_4, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_5, Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                        onChange: heightChange,
                        min: -500,
                        max: 999,
                        step: 1,
                        value: heightVal.value,
                        "onUpdate:value": _cache[2] || (_cache[2] = function ($event) {
                          return heightVal.value = $event;
                        })
                      }, null, 8, ["value"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                        onChange: chkClippingPlanes,
                        checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledClipping,
                        "onUpdate:checked": _cache[3] || (_cache[3] = function ($event) {
                          return Object(vue_runtime_esm_bundler["unref"])(formState).enabledClipping = $event;
                        })
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_6];
                        }),
                        _: 1
                      }, 8, ["checked"])];
                    }),
                    _: 1
                  })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_7, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: drawExtent
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_8];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: drawPolygon
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_9];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: clearWJ
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_10];
                        }),
                        _: 1
                      })];
                    }),
                    _: 1
                  })])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_collapse_panel, {
                key: "3",
                header: "演示视角"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_11, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: centerAtDX1
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_12];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: centerAtDX2
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_13];
                        }),
                        _: 1
                      })];
                    }),
                    _: 1
                  })])];
                }),
                _: 1
              })];
            }),
            _: 1
          }, 8, ["activeKey"])];
        }),
        _: 1
      });
    };
  }
}));
// CONCATENATED MODULE: ./src/example/layer-tileset/type/piping/index.vue?vue&type=script&setup=true&lang=ts
 
// EXTERNAL MODULE: ./src/example/layer-tileset/type/piping/index.vue?vue&type=style&index=0&id=7ea518dc&scoped=true&lang=less
var pipingvue_type_style_index_0_id_7ea518dc_scoped_true_lang_less = __webpack_require__("96bf");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/example/layer-tileset/type/piping/index.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(pipingvue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-7ea518dc"]])

/* harmony default export */ var piping = __webpack_exports__["default"] = (__exports__);

/***/ })

}]);