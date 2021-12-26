(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0dd46f"],{

/***/ "8166":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// EXTERNAL MODULE: ./src/components/graphic-editor/index.vue + 14 modules
var graphic_editor = __webpack_require__("37f1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/layer-graphic/draw/draw-model/index.vue?vue&type=script&lang=ts&setup=true





var _hoisted_1 = {
  class: "f-mb"
};

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", null, "模型URl", -1);

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("代理");

var _hoisted_4 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("标绘");

var _hoisted_5 = {
  class: "f-mb"
};

var _hoisted_6 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("地形");

var _hoisted_7 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("深度检测");

var _hoisted_8 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("仅在3dtiles上标绘");

var _hoisted_9 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])(" 打开... ");

var _hoisted_10 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("保存");

var _hoisted_11 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("清除");




/* harmony default export */ var draw_modelvue_type_script_lang_ts_setup_true = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var modelUrl = Object(vue_runtime_esm_bundler["ref"])("//data.mars3d.cn/gltf/mars/feiji.glb"); // 代理

    var isProxy = Object(vue_runtime_esm_bundler["ref"])(false);

    var drawModel = function drawModel() {
      mapWork.drawModel(modelUrl.value, isProxy.value);
    }; // 地形


    var isHasTerrain = Object(vue_runtime_esm_bundler["ref"])(true);

    var chkHasTerrain = function chkHasTerrain() {
      mapWork.chkHasTerrain(isHasTerrain.value);
    }; // 深度检测


    var isTestTerrain = Object(vue_runtime_esm_bundler["ref"])(false);

    var chkTestTerrain = function chkTestTerrain() {
      mapWork.chkTestTerrain(isTestTerrain.value);
    }; // 仅在3dmodel上绘制


    var isonlyModel = Object(vue_runtime_esm_bundler["ref"])(false);

    var onlyPickModelPosition = function onlyPickModelPosition() {
      mapWork.onlyPickModelPosition(isonlyModel.value);
    };

    var clear = function clear() {
      mapWork.deleteAll();
    }; // *****************************JSON文件***************************//


    var globalProperties = Object(vue_runtime_esm_bundler["getCurrentInstance"])().appContext.config.globalProperties; // 打开JSON

    var openGeoJSON = function openGeoJSON(info) {
      var item = info.file;
      var fileName = item.name;
      var fileType = fileName === null || fileName === void 0 ? void 0 : fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase();

      if (fileType != "json") {
        alert("文件类型不合法,请选择json格式标注文件！");
      }

      mapWork.openGeoJSON(item);
    }; // 点击保存GeoJSON


    var saveGeoJSON = function saveGeoJSON() {
      mapWork.saveGeoJSON();
    }; // *****************************属性面板***************************//


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
      var _component_mars_input = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-input");

      var _component_a_checkbox = Object(vue_runtime_esm_bundler["resolveComponent"])("a-checkbox");

      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_a_upload = Object(vue_runtime_esm_bundler["resolveComponent"])("a-upload");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])(vue_runtime_esm_bundler["Fragment"], null, [Object(vue_runtime_esm_bundler["createVNode"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_2, Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input, {
                value: modelUrl.value,
                "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
                  return modelUrl.value = $event;
                })
              }, null, 8, ["value"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                checked: isProxy.value,
                "onUpdate:checked": _cache[1] || (_cache[1] = function ($event) {
                  return isProxy.value = $event;
                })
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_3];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: drawModel
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_4];
                }),
                _: 1
              })];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_5, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                onChange: chkHasTerrain,
                checked: isHasTerrain.value,
                "onUpdate:checked": _cache[2] || (_cache[2] = function ($event) {
                  return isHasTerrain.value = $event;
                })
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_6];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                onChange: chkTestTerrain,
                checked: isTestTerrain.value,
                "onUpdate:checked": _cache[3] || (_cache[3] = function ($event) {
                  return isTestTerrain.value = $event;
                })
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_7];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                onChange: onlyPickModelPosition,
                checked: isonlyModel.value,
                "onUpdate:checked": _cache[4] || (_cache[4] = function ($event) {
                  return isonlyModel.value = $event;
                })
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_8];
                }),
                _: 1
              }, 8, ["checked"])];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", null, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_upload, {
                multiple: false,
                name: "file",
                accept: "json,geojson",
                showUploadList: false,
                onChange: openGeoJSON,
                beforeUpload: function beforeUpload() {
                  return false;
                }
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_9];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              }, 8, ["beforeUpload"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: saveGeoJSON
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_10];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: clear
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_11];
                }),
                _: 1
              })];
            }),
            _: 1
          })])];
        }),
        _: 1
      }), Object(vue_runtime_esm_bundler["createVNode"])(graphic_editor["a" /* default */], {
        ref_key: "editor",
        ref: editor
      }, null, 512)], 64);
    };
  }
}));
// CONCATENATED MODULE: ./src/example/layer-graphic/draw/draw-model/index.vue?vue&type=script&lang=ts&setup=true
 
// CONCATENATED MODULE: ./src/example/layer-graphic/draw/draw-model/index.vue



const __exports__ = draw_modelvue_type_script_lang_ts_setup_true;

/* harmony default export */ var draw_model = __webpack_exports__["default"] = (__exports__);

/***/ })

}]);