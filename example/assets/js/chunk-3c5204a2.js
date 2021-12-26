(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-3c5204a2"],{

/***/ "37df":
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/layer-tileset/type/basis/index.vue?vue&type=script&setup=true&lang=ts




var basisvue_type_script_setup_true_lang_ts_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-c59dcb5c"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = {
  class: "f-mb"
};

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("倾斜摄像(某县城)");

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("倾斜摄像（某景区）");

var _hoisted_4 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("城市白膜（合肥）");

var _hoisted_5 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("人工建模（石化工厂）");

var _hoisted_6 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("BIM（桥梁）");

var _hoisted_7 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("BIM（地铁站）");

var _hoisted_8 = {
  class: "f-mb"
};

var _hoisted_9 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("深度检测");

var _hoisted_10 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("模型三角网");

var _hoisted_11 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("模型包围盒");

var _hoisted_12 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("键盘漫游");

var _hoisted_13 = {
  class: "f-mb"
};

var _hoisted_14 = /*#__PURE__*/basisvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", null, "调试页面:", -1);
});

var _hoisted_15 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("模型参数调试");



/* harmony default export */ var basisvue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var activeKey = Object(vue_runtime_esm_bundler["ref"])(["1", "2", "3"]);
    var formState = Object(vue_runtime_esm_bundler["reactive"])({
      enabledShowTerrain: false,
      enabledWireframe: false,
      enabledBoundbox: false,
      enabledGfirstperson: false
    });

    var bindTestTerrain = function bindTestTerrain() {
      mapWork.bindTestTerrain(formState.enabledShowTerrain);
    };

    var bindWireframe = function bindWireframe() {
      mapWork.bindWireframe(formState.enabledWireframe);
    };

    var bindBoundbox = function bindBoundbox() {
      mapWork.bindBoundbox(formState.enabledBoundbox);
    };

    var bindGfirstperson = function bindGfirstperson() {
      mapWork.bindGfirstperson(formState.enabledGfirstperson);
    };

    var showQxShequDemo = function showQxShequDemo() {
      mapWork.showQxShequDemo();
    };

    var showQxSimiaoDemo = function showQxSimiaoDemo() {
      mapWork.showQxSimiaoDemo();
    };

    var showJzwHefeiDemo = function showJzwHefeiDemo() {
      mapWork.showJzwHefeiDemo();
    };

    var showMaxShihuaDemo = function showMaxShihuaDemo() {
      mapWork.showMaxShihuaDemo();
    };

    var showBimQiaoliangDemo = function showBimQiaoliangDemo() {
      mapWork.showBimQiaoliangDemo();
    };

    var showBimDitiezhanDemo = function showBimDitiezhanDemo() {
      mapWork.showBimDitiezhanDemo();
    };

    return function (_ctx, _cache) {
      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_a_collapse_panel = Object(vue_runtime_esm_bundler["resolveComponent"])("a-collapse-panel");

      var _component_a_checkbox = Object(vue_runtime_esm_bundler["resolveComponent"])("a-checkbox");

      var _component_a_collapse = Object(vue_runtime_esm_bundler["resolveComponent"])("a-collapse");

      var _component_a_form = Object(vue_runtime_esm_bundler["resolveComponent"])("a-form");

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
                header: "3D Tiles示例"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: showQxShequDemo
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_2];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: showQxSimiaoDemo
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_3];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: showJzwHefeiDemo
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_4];
                        }),
                        _: 1
                      })];
                    }),
                    _: 1
                  })]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: showMaxShihuaDemo
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_5];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: showBimQiaoliangDemo
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_6];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: showBimDitiezhanDemo
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_7];
                        }),
                        _: 1
                      })];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_collapse_panel, {
                key: "2",
                header: "相关控制"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_8, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                        checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledShowTerrain,
                        "onUpdate:checked": _cache[0] || (_cache[0] = function ($event) {
                          return Object(vue_runtime_esm_bundler["unref"])(formState).enabledShowTerrain = $event;
                        }),
                        onChange: bindTestTerrain
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_9];
                        }),
                        _: 1
                      }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                        checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledWireframe,
                        "onUpdate:checked": _cache[1] || (_cache[1] = function ($event) {
                          return Object(vue_runtime_esm_bundler["unref"])(formState).enabledWireframe = $event;
                        }),
                        onChange: bindWireframe
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_10];
                        }),
                        _: 1
                      }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                        checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledBoundbox,
                        "onUpdate:checked": _cache[2] || (_cache[2] = function ($event) {
                          return Object(vue_runtime_esm_bundler["unref"])(formState).enabledBoundbox = $event;
                        }),
                        onChange: bindBoundbox
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_11];
                        }),
                        _: 1
                      }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                        checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledGfirstperson,
                        "onUpdate:checked": _cache[3] || (_cache[3] = function ($event) {
                          return Object(vue_runtime_esm_bundler["unref"])(formState).enabledGfirstperson = $event;
                        }),
                        onChange: bindGfirstperson
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_12];
                        }),
                        _: 1
                      }, 8, ["checked"])];
                    }),
                    _: 1
                  })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_13, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_14, Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        href: "editor.html?id=layer-tileset/manager/edit",
                        target: "_blank"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_15];
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
          }, 8, ["activeKey"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form)];
        }),
        _: 1
      });
    };
  }
}));
// CONCATENATED MODULE: ./src/example/layer-tileset/type/basis/index.vue?vue&type=script&setup=true&lang=ts
 
// EXTERNAL MODULE: ./src/example/layer-tileset/type/basis/index.vue?vue&type=style&index=0&id=c59dcb5c&scoped=true&lang=less
var basisvue_type_style_index_0_id_c59dcb5c_scoped_true_lang_less = __webpack_require__("8dfc");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/example/layer-tileset/type/basis/index.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(basisvue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-c59dcb5c"]])

/* harmony default export */ var basis = __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "4e4b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e64d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_pannel_vue_vue_type_style_index_0_id_b885d716_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "5607":
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

/***/ "8dfc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_c59dcb5c_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5607");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_c59dcb5c_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_c59dcb5c_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e64d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);