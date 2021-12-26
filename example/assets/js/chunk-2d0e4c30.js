(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0e4c30"],{

/***/ "9234":
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

// EXTERNAL MODULE: ./src/components/graphic-editor/index.vue + 14 modules
var graphic_editor = __webpack_require__("37f1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/graphic/entity/textMaterialProperty/index.vue?vue&type=script&setup=true&lang=ts





var _hoisted_1 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("竖立墙");

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("贴地矩形");

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("贴地矩形2");

var _hoisted_4 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("清除");

var _hoisted_5 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("确定");




/* harmony default export */ var textMaterialPropertyvue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var formState = Object(vue_runtime_esm_bundler["reactive"])({
      slideStep: 0,
      inputText: "Mars3D 火星科技 2021"
    });

    var onChangeSlider = function onChangeSlider() {
      mapWork.onChangeSlider(formState.slideStep);
    };

    var onClickDrawWall = function onClickDrawWall() {
      mapWork.onClickDrawWall();
    };

    var onClickDrawRectangle = function onClickDrawRectangle() {
      mapWork.onClickDrawRectangle();
    };

    var onClickDrawPoint = function onClickDrawPoint() {
      mapWork.onClickDrawPoint();
    };

    var removeAll = function removeAll() {
      mapWork.removeAll();
    };

    var onClickSure = function onClickSure() {
      mapWork.onClickSure(formState.inputText);
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

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_a_form_item = Object(vue_runtime_esm_bundler["resolveComponent"])("a-form-item");

      var _component_a_slider = Object(vue_runtime_esm_bundler["resolveComponent"])("a-slider");

      var _component_mars_input = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-input");

      var _component_a_form = Object(vue_runtime_esm_bundler["resolveComponent"])("a-form");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])(vue_runtime_esm_bundler["Fragment"], null, [Object(vue_runtime_esm_bundler["createVNode"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, null, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: onClickDrawWall
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_1];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: onClickDrawRectangle
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_2];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        title: "根据中心点和长宽来计算矩形",
                        onClick: onClickDrawPoint
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [_hoisted_3];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: removeAll
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
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                label: "方向"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                    value: Object(vue_runtime_esm_bundler["unref"])(formState).slideStep,
                    "onUpdate:value": _cache[0] || (_cache[0] = function ($event) {
                      return Object(vue_runtime_esm_bundler["unref"])(formState).slideStep = $event;
                    }),
                    onChange: onChangeSlider,
                    min: 0,
                    max: 360,
                    step: 1
                  }, null, 8, ["value"])];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                label: "文字"
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input, {
                        value: Object(vue_runtime_esm_bundler["unref"])(formState).inputText,
                        "onUpdate:value": _cache[1] || (_cache[1] = function ($event) {
                          return Object(vue_runtime_esm_bundler["unref"])(formState).inputText = $event;
                        })
                      }, null, 8, ["value"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                        onClick: onClickSure
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
          })];
        }),
        _: 1
      }), Object(vue_runtime_esm_bundler["createVNode"])(graphic_editor["a" /* default */], {
        ref_key: "editor",
        ref: editor
      }, null, 512)], 64);
    };
  }
}));
// CONCATENATED MODULE: ./src/example/graphic/entity/textMaterialProperty/index.vue?vue&type=script&setup=true&lang=ts
 
// CONCATENATED MODULE: ./src/example/graphic/entity/textMaterialProperty/index.vue



const __exports__ = textMaterialPropertyvue_type_script_setup_true_lang_ts;

/* harmony default export */ var textMaterialProperty = __webpack_exports__["default"] = (__exports__);

/***/ })

}]);