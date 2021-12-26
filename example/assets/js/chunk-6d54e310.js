(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-6d54e310"],{

/***/ "4e4b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e64d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "69a1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "9094":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/thing/tileset/tilesetFlood/index.vue?vue&type=script&setup=true&lang=ts



var tilesetFloodvue_type_script_setup_true_lang_ts_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-1be52fdc"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("整体淹没");

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("局部淹没");

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("绘制矩形");

var _hoisted_4 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("绘制多边形");

var _hoisted_5 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("开始分析");



/* harmony default export */ var tilesetFloodvue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var labelCol = Object(vue_runtime_esm_bundler["ref"])({
      span: 8
    });
    var labelAlign = Object(vue_runtime_esm_bundler["ref"])("left");
    var formState = Object(vue_runtime_esm_bundler["reactive"])({
      radio: "2",
      minHeight: "1894",
      maxHeight: "2000",
      speed: 10
    });
    Object(vue_runtime_esm_bundler["onMounted"])(function () {
      window.$notify("已知问题提示", "\uFF081\uFF09\u5BF93dtiles\u6570\u636E\u6709\u8981\u6C42\uFF0C\u4EC5\u9002\u7528\u4E8E\u65E0\u81EA\u5E26\u7740\u8272\u5668\u7684\u7EB9\u7406\u683C\u5F0F\u6A21\u578B\u3002\n  \uFF082\uFF09\u76EE\u524D\u4E0D\u652F\u6301\u6240\u67093dtile\u6570\u636E\uFF0C\u8BF7\u66FF\u6362url\u8FDB\u884C\u81EA\u6D4B", {
        duration: null
      });
    }); // 修改分析方式

    var changeFloodType = function changeFloodType() {
      mapWork.changeFloodType(formState.radio);
    }; // 添加矩形


    var btnDrawExtent = function btnDrawExtent() {
      mapWork.btnDrawExtent();
    }; // 添加多边形


    var btnDraw = function btnDraw() {
      mapWork.btnDraw();
    }; // 开始淹没


    var begin = function begin() {
      mapWork.begin(formState);
    };

    return function (_ctx, _cache) {
      var _component_a_radio = Object(vue_runtime_esm_bundler["resolveComponent"])("a-radio");

      var _component_a_radio_group = Object(vue_runtime_esm_bundler["resolveComponent"])("a-radio-group");

      var _component_a_form_item = Object(vue_runtime_esm_bundler["resolveComponent"])("a-form-item");

      var _component_a_col = Object(vue_runtime_esm_bundler["resolveComponent"])("a-col");

      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_mars_input_number = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-input-number");

      var _component_a_row = Object(vue_runtime_esm_bundler["resolveComponent"])("a-row");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_row, {
            gutter: [2, 10]
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                span: 24
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                    label: "分析方式:",
                    labelCol: labelCol.value,
                    labelAlign: labelAlign.value
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_radio_group, {
                        value: Object(vue_runtime_esm_bundler["unref"])(formState).radio,
                        "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
                          return Object(vue_runtime_esm_bundler["unref"])(formState).radio = $event;
                        }),
                        onChange: changeFloodType
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_radio, {
                            value: "1"
                          }, {
                            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                              return [_hoisted_1];
                            }),
                            _: 1
                          }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_radio, {
                            value: "2"
                          }, {
                            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                              return [_hoisted_2];
                            }),
                            _: 1
                          })];
                        }),
                        _: 1
                      }, 8, ["value"])];
                    }),
                    _: 1
                  }, 8, ["labelCol", "labelAlign"])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["withDirectives"])(Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                span: 8
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                    label: "分析区域:"
                  })];
                }),
                _: 1
              }, 512), [[vue_runtime_esm_bundler["vShow"], Object(vue_runtime_esm_bundler["unref"])(formState).radio == '2']]), Object(vue_runtime_esm_bundler["withDirectives"])(Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                span: 16
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
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
                      })];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              }, 512), [[vue_runtime_esm_bundler["vShow"], Object(vue_runtime_esm_bundler["unref"])(formState).radio == '2']]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                span: 8
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                    label: "最低海拔（米）"
                  })];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                span: 16
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                    value: Object(vue_runtime_esm_bundler["unref"])(formState).minHeight,
                    "onUpdate:value": _cache[1] || (_cache[1] = function ($event) {
                      return Object(vue_runtime_esm_bundler["unref"])(formState).minHeight = $event;
                    }),
                    step: 1
                  }, null, 8, ["value"])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                span: 8
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                    label: "最高海拔（米）"
                  })];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                span: 16
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                    value: Object(vue_runtime_esm_bundler["unref"])(formState).maxHeight,
                    "onUpdate:value": _cache[2] || (_cache[2] = function ($event) {
                      return Object(vue_runtime_esm_bundler["unref"])(formState).maxHeight = $event;
                    }),
                    step: 1
                  }, null, 8, ["value"])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                span: 8
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                    label: "淹没速度（米/秒）"
                  })];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                span: 16
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                    value: Object(vue_runtime_esm_bundler["unref"])(formState).speed,
                    "onUpdate:value": _cache[3] || (_cache[3] = function ($event) {
                      return Object(vue_runtime_esm_bundler["unref"])(formState).speed = $event;
                    }),
                    step: 1
                  }, null, 8, ["value"])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                span: 21
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                    onClick: begin
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_5];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              })];
            }),
            _: 1
          })];
        }),
        _: 1
      });
    };
  }
}));
// CONCATENATED MODULE: ./src/example/thing/tileset/tilesetFlood/index.vue?vue&type=script&setup=true&lang=ts
 
// EXTERNAL MODULE: ./src/example/thing/tileset/tilesetFlood/index.vue?vue&type=style&index=0&id=1be52fdc&scoped=true&lang=less
var tilesetFloodvue_type_style_index_0_id_1be52fdc_scoped_true_lang_less = __webpack_require__("9e0d");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/example/thing/tileset/tilesetFlood/index.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(tilesetFloodvue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-1be52fdc"]])

/* harmony default export */ var tilesetFlood = __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "9e0d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_1be52fdc_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("69a1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_1be52fdc_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_1be52fdc_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e64d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);