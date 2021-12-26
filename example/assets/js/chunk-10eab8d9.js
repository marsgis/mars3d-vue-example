(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-10eab8d9"],{

/***/ "3747":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@icon-park/vue-next/es/icons/UploadOne.js
var UploadOne = __webpack_require__("975b");

// EXTERNAL MODULE: ./node_modules/@icon-park/vue-next/es/icons/Save.js
var Save = __webpack_require__("4ef5");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/message/style/index.js
var style = __webpack_require__("3b18");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/message/index.js + 2 modules
var message = __webpack_require__("f64c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/components/mars-sample/data-manage.vue?vue&type=script&setup=true&lang=ts








var _hoisted_1 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
  class: "pannel-item-label"
}, "数据管理:", -1);

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("清除");

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])(" 保存 ");

var _hoisted_4 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])(" 打开 ");


// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
/* harmony default export */ var data_managevue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    /**
     * 公共组件：用来运行或保存GEOJSON
     * @copyright 火星科技 mars3d.cn
     * @author 木遥 2021-11-01
     */
    var mapWork = window.mapWork; //  清除数据

    var btnClear = function btnClear() {
      mapWork.btnClear();
    }; // 保存geojson


    var btnExpFile = function btnExpFile() {
      mapWork.btnExpFile();
    }; // 打开geojson


    var beforeUploade = function beforeUploade(file) {
      // fileList.value = [file]
      return false;
    };

    var btnImpFile = function btnImpFile(info) {
      var item = info.file;
      var fileName = item.name;
      var fileType = fileName === null || fileName === void 0 ? void 0 : fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase();

      if (fileType != "json") {
        message["a" /* default */].error("文件类型不合法,请选择json格式标注文件！");
      }

      mapWork.btnImpFile(item);
    };

    var fileList = Object(vue_runtime_esm_bundler["ref"])([]);
    return function (_ctx, _cache) {
      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_button = Object(vue_runtime_esm_bundler["resolveComponent"])("a-button");

      var _component_a_upload = Object(vue_runtime_esm_bundler["resolveComponent"])("a-upload");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(_component_a_space, null, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [_hoisted_1, Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
            onClick: btnClear
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_2];
            }),
            _: 1
          }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
            onClick: btnExpFile,
            title: "保存GeoJSON"
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(Object(vue_runtime_esm_bundler["unref"])(Save["a" /* default */])), _hoisted_3];
            }),
            _: 1
          }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_upload, {
            multiple: false,
            name: "file",
            accept: "json,geojson",
            "file-list": fileList.value,
            showUploadList: false,
            supportServerRender: true,
            beforeUpload: beforeUploade,
            onChange: btnImpFile
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_button, {
                title: "打开GeoJSON"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(Object(vue_runtime_esm_bundler["unref"])(UploadOne["a" /* default */])), _hoisted_4];
                }),
                _: 1
              })];
            }),
            _: 1
          }, 8, ["file-list"])];
        }),
        _: 1
      });
    };
  }
}));
// CONCATENATED MODULE: ./src/components/mars-sample/data-manage.vue?vue&type=script&setup=true&lang=ts
 
// CONCATENATED MODULE: ./src/components/mars-sample/data-manage.vue



const __exports__ = data_managevue_type_script_setup_true_lang_ts;

/* harmony default export */ var data_manage = __webpack_exports__["a"] = (__exports__);

/***/ }),

/***/ "92f9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_location_to_vue_vue_type_style_index_0_id_a6077f40_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("af22");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_location_to_vue_vue_type_style_index_0_id_a6077f40_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_location_to_vue_vue_type_style_index_0_id_a6077f40_lang_less_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "a9ad":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/components/mars-sample/layer-state.vue?vue&type=script&lang=ts&setup=true



var _hoisted_1 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
  class: "pannel-item-label"
}, "图层状态:", -1);

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("显示隐藏");

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("Popup绑定");

var _hoisted_4 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("Tooltip");

var _hoisted_5 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("右键绑定");

 // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'

/* harmony default export */ var layer_statevue_type_script_lang_ts_setup_true = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    /**
     * 公共组件：封装图层状态操作
     * @copyright 火星科技 mars3d.cn
     * @author 木遥 2021-11-01
     */
    var mapWork = window.mapWork;
    var formState = Object(vue_runtime_esm_bundler["reactive"])({
      enabledShowHide: true,
      enabledPopup: true,
      enabledTooltip: false,
      enabledRightMenu: true
    });

    var bindShowHide = function bindShowHide() {
      mapWork.bindShowHide(formState.enabledShowHide);
    };

    var bindPopup = function bindPopup() {
      mapWork.bindPopup(formState.enabledPopup);
    };

    var bindTooltip = function bindTooltip() {
      mapWork.bindTooltip(formState.enabledTooltip);
    };

    var bindRightMenu = function bindRightMenu() {
      mapWork.bindRightMenu(formState.enabledRightMenu);
    };

    return function (_ctx, _cache) {
      var _component_a_checkbox = Object(vue_runtime_esm_bundler["resolveComponent"])("a-checkbox");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(_component_a_space, null, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [_hoisted_1, Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
            checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledShowHide,
            "onUpdate:checked": _cache[0] || (_cache[0] = function ($event) {
              return Object(vue_runtime_esm_bundler["unref"])(formState).enabledShowHide = $event;
            }),
            onChange: bindShowHide
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_2];
            }),
            _: 1
          }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
            checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledPopup,
            "onUpdate:checked": _cache[1] || (_cache[1] = function ($event) {
              return Object(vue_runtime_esm_bundler["unref"])(formState).enabledPopup = $event;
            }),
            onChange: bindPopup
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_3];
            }),
            _: 1
          }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
            checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledTooltip,
            "onUpdate:checked": _cache[2] || (_cache[2] = function ($event) {
              return Object(vue_runtime_esm_bundler["unref"])(formState).enabledTooltip = $event;
            }),
            onChange: bindTooltip
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_4];
            }),
            _: 1
          }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
            checked: Object(vue_runtime_esm_bundler["unref"])(formState).enabledRightMenu,
            "onUpdate:checked": _cache[3] || (_cache[3] = function ($event) {
              return Object(vue_runtime_esm_bundler["unref"])(formState).enabledRightMenu = $event;
            }),
            onChange: bindRightMenu
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_5];
            }),
            _: 1
          }, 8, ["checked"])];
        }),
        _: 1
      });
    };
  }
}));
// CONCATENATED MODULE: ./src/components/mars-sample/layer-state.vue?vue&type=script&lang=ts&setup=true
 
// CONCATENATED MODULE: ./src/components/mars-sample/layer-state.vue



const __exports__ = layer_statevue_type_script_lang_ts_setup_true;

/* harmony default export */ var layer_state = __webpack_exports__["a"] = (__exports__);

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

/***/ "deba":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// EXTERNAL MODULE: ./src/components/mars-sample/data-manage.vue + 2 modules
var data_manage = __webpack_require__("3747");

// EXTERNAL MODULE: ./src/components/mars-sample/location-to.vue + 4 modules
var location_to = __webpack_require__("bc30");

// EXTERNAL MODULE: ./src/components/mars-sample/layer-state.vue + 2 modules
var layer_state = __webpack_require__("a9ad");

// EXTERNAL MODULE: ./src/components/graphic-editor/index.vue + 14 modules
var graphic_editor = __webpack_require__("37f1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/graphic/entity/polyline-curve/index.vue?vue&type=script&setup=true&lang=ts




var _hoisted_1 = {
  class: "f-mb"
};
var _hoisted_2 = {
  class: "f-mb"
};

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
  class: "pannel-item-label"
}, "数据维护:", -1);

var _hoisted_4 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("图上标绘");

var _hoisted_5 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("是否编辑");







/* harmony default export */ var polyline_curvevue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;

    var onClickDrawModel = function onClickDrawModel() {
      mapWork.onClickDrawModel();
    }; // 是否编辑


    var enabledEdit = Object(vue_runtime_esm_bundler["ref"])(false);

    var bindEdit = function bindEdit() {
      mapWork.bindEdit(enabledEdit.value);
    }; // 属性面板


    var editor = Object(vue_runtime_esm_bundler["ref"])();
    mapWork.eventTarget.on("editorUI-draw", /*#__PURE__*/function () {
      var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return editor.value.setValue(e.graphic);

              case 2:
                result = _context.sent;

                if (result) {
                  editor.value.showEditor();
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()); // 编辑修改了模型

    mapWork.eventTarget.on("editorUI-SMR", /*#__PURE__*/function () {
      var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return editor.value.setValue(e.graphic);

              case 2:
                result = _context2.sent;

                if (result) {
                  editor.value.showEditor();
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }()); // 停止编辑修改模型

    mapWork.eventTarget.on("editorUI-stop", /*#__PURE__*/function () {
      var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                editor.value.hideEditor();

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());
    return function (_ctx, _cache) {
      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_checkbox = Object(vue_runtime_esm_bundler["resolveComponent"])("a-checkbox");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])(vue_runtime_esm_bundler["Fragment"], null, [Object(vue_runtime_esm_bundler["createVNode"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(layer_state["a" /* default */])]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_2, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_3, Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: onClickDrawModel
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_4];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: enabledEdit.value,
                "onUpdate:checked": _cache[0] || (_cache[0] = function ($event) {
                  return enabledEdit.value = $event;
                }),
                onChange: bindEdit
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_5];
                }),
                _: 1
              }, 8, ["checked"])];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", null, [Object(vue_runtime_esm_bundler["createVNode"])(data_manage["a" /* default */])])];
        }),
        _: 1
      }), Object(vue_runtime_esm_bundler["createVNode"])(location_to["a" /* default */]), Object(vue_runtime_esm_bundler["createVNode"])(graphic_editor["a" /* default */], {
        ref_key: "editor",
        ref: editor
      }, null, 512)], 64);
    };
  }
}));
// CONCATENATED MODULE: ./src/example/graphic/entity/polyline-curve/index.vue?vue&type=script&setup=true&lang=ts
 
// CONCATENATED MODULE: ./src/example/graphic/entity/polyline-curve/index.vue



const __exports__ = polyline_curvevue_type_script_setup_true_lang_ts;

/* harmony default export */ var polyline_curve = __webpack_exports__["default"] = (__exports__);

/***/ })

}]);