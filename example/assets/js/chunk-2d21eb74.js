(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d21eb74"],{

/***/ "d76a":
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/layer-tileset/monomer/building-edit/index.vue?vue&type=script&lang=ts&setup=true





var _hoisted_1 = {
  class: "f-mb"
};

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("编辑模式");

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("预览模式");

var _hoisted_4 = {
  key: 0
};

var _hoisted_5 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("单体化面");

var _hoisted_6 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])(" 打开... ");

var _hoisted_7 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("保存");

var _hoisted_8 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("清除");



 // 单体化面

/* harmony default export */ var building_editvue_type_script_lang_ts_setup_true = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;

    var drawPolygon = function drawPolygon() {
      mapWork.drawPolygon();
    };

    var clear = function clear() {
      mapWork.deleteAll();
    }; // 模式发生改变


    var value = Object(vue_runtime_esm_bundler["ref"])("1");

    var modeChange = function modeChange() {
      if (value.value === "1") {
        mapWork.toBJMS();
      } else {
        mapWork.toYLMS();
      }
    }; // 打开


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
    }; //* ************************属性面板*****************************/


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
      var _component_a_radio = Object(vue_runtime_esm_bundler["resolveComponent"])("a-radio");

      var _component_a_radio_group = Object(vue_runtime_esm_bundler["resolveComponent"])("a-radio-group");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_upload = Object(vue_runtime_esm_bundler["resolveComponent"])("a-upload");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])(vue_runtime_esm_bundler["Fragment"], null, [Object(vue_runtime_esm_bundler["createVNode"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_radio_group, {
                onChange: modeChange,
                value: value.value,
                "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
                  return value.value = $event;
                }),
                name: "radioGroup"
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
                _: 1
              }, 8, ["value"])];
            }),
            _: 1
          })]), value.value === '1' ? (Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])("div", _hoisted_4, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: drawPolygon
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_5];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_upload, {
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
                      return [_hoisted_6];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              }, 8, ["beforeUpload"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: saveGeoJSON
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_7];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                onClick: clear
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_8];
                }),
                _: 1
              })];
            }),
            _: 1
          })])) : Object(vue_runtime_esm_bundler["createCommentVNode"])("", true)];
        }),
        _: 1
      }), Object(vue_runtime_esm_bundler["createVNode"])(graphic_editor["a" /* default */], {
        ref_key: "editor",
        ref: editor
      }, null, 512)], 64);
    };
  }
}));
// CONCATENATED MODULE: ./src/example/layer-tileset/monomer/building-edit/index.vue?vue&type=script&lang=ts&setup=true
 
// CONCATENATED MODULE: ./src/example/layer-tileset/monomer/building-edit/index.vue



const __exports__ = building_editvue_type_script_lang_ts_setup_true;

/* harmony default export */ var building_edit = __webpack_exports__["default"] = (__exports__);

/***/ })

}]);