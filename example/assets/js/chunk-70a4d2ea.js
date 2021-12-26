(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-70a4d2ea"],{

/***/ "1632b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_113824f7_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("587d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_113824f7_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_113824f7_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "587d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "e6d6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@icon-park/vue-next/es/icons/Disk.js
var Disk = __webpack_require__("9e2f");

// EXTERNAL MODULE: ./node_modules/@icon-park/vue-next/es/icons/FolderUpload.js
var FolderUpload = __webpack_require__("6108");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// EXTERNAL MODULE: ./src/components/graphic-editor/index.vue + 14 modules
var graphic_editor = __webpack_require__("37f1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/layer-graphic/draw/draw-model-list/index.vue?vue&type=script&lang=ts&setup=true











var draw_model_listvue_type_script_lang_ts_setup_true_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-113824f7"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = {
  class: "f-mb"
};

var _hoisted_2 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("深度检测");

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("仅在3dtiles上标绘");

var _hoisted_4 = {
  class: "f-mb infoView-content"
};
var _hoisted_5 = {
  class: "f-mb"
};
var _hoisted_6 = {
  class: "f-mb gltfImg"
};
var _hoisted_7 = ["src", "onClick"];



// 深度检测
/* harmony default export */ var draw_model_listvue_type_script_lang_ts_setup_true = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var isTestTerrain = Object(vue_runtime_esm_bundler["ref"])(false);

    var chkTestTerrain = function chkTestTerrain() {
      mapWork.chkTestTerrain(isTestTerrain.value);
    }; // 仅在模型上绘制


    var isonlyModel = Object(vue_runtime_esm_bundler["ref"])(false);

    var onlyPickModelPosition = function onlyPickModelPosition() {
      mapWork.onlyPickModelPosition(isonlyModel.value);
    }; // 绘制模型


    var showModel = function showModel(style) {
      mapWork.drawGltf(style);
    }; //* **********************下拉框******************* */


    var modelData;
    var selectOptions = Object(vue_runtime_esm_bundler["ref"])([]);
    var value1 = Object(vue_runtime_esm_bundler["ref"])("车辆");
    var dataList = Object(vue_runtime_esm_bundler["ref"])([]);
    mapWork.eventTarget.on("loadOk", function (event) {
      modelData = event.data; // 下拉框数据

      Object.keys(modelData).forEach(function (k) {
        selectOptions.value.push({
          value: k,
          lable: k
        });
      });
      handleChange();
    }); // 下拉框改变

    var handleChange = function handleChange() {
      dataList.value = modelData[value1.value];

      for (var i = 0; i < dataList.value.length; i++) {
        var item = dataList.value[i];
        item.image = mapWork.changeItemImage(item);
        item.style.url = mapWork.changeItemUrl(item);
        dataList.value[i] = item;
      }
    }; // ************************JSON文件************************/
    // 打开


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
    }; // ************************属性面板************************/


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
      var _component_a_checkbox = Object(vue_runtime_esm_bundler["resolveComponent"])("a-checkbox");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_a_upload = Object(vue_runtime_esm_bundler["resolveComponent"])("a-upload");

      var _component_mars_select = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-select");

      var _directive_auto_height = Object(vue_runtime_esm_bundler["resolveDirective"])("auto-height");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])(vue_runtime_esm_bundler["Fragment"], null, [Object(vue_runtime_esm_bundler["withDirectives"])((Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(pannel["a" /* default */], {
        class: "infoView model-View"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                onChange: chkTestTerrain,
                checked: isTestTerrain.value,
                "onUpdate:checked": _cache[0] || (_cache[0] = function ($event) {
                  return isTestTerrain.value = $event;
                })
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_2];
                }),
                _: 1
              }, 8, ["checked"]), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                onChange: onlyPickModelPosition,
                checked: isonlyModel.value,
                "onUpdate:checked": _cache[1] || (_cache[1] = function ($event) {
                  return isonlyModel.value = $event;
                })
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [_hoisted_3];
                }),
                _: 1
              }, 8, ["checked"])];
            }),
            _: 1
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_4, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_upload, {
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
              return [Object(vue_runtime_esm_bundler["createVNode"])(Object(vue_runtime_esm_bundler["unref"])(FolderUpload["a" /* default */]), {
                class: "icon",
                theme: "outline",
                size: "20",
                fill: "#ffffff",
                title: "打开"
              })];
            }),
            _: 1
          }, 8, ["beforeUpload"]), Object(vue_runtime_esm_bundler["createVNode"])(Object(vue_runtime_esm_bundler["unref"])(Disk["a" /* default */]), {
            class: "icon",
            theme: "outline",
            size: "20",
            fill: "#ffffff",
            onClick: saveGeoJSON,
            title: "保存GeoJSON"
          })]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_5, [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_select, {
            ref: "select",
            value: value1.value,
            "onUpdate:value": _cache[2] || (_cache[2] = function ($event) {
              return value1.value = $event;
            }),
            style: {
              "width": "200px",
              "margin-left": "10px"
            },
            options: selectOptions.value,
            onChange: handleChange
          }, null, 8, ["value", "options"]), Object(vue_runtime_esm_bundler["withDirectives"])((Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])("div", _hoisted_6, [Object(vue_runtime_esm_bundler["createElementVNode"])("ul", null, [(Object(vue_runtime_esm_bundler["openBlock"])(true), Object(vue_runtime_esm_bundler["createElementBlock"])(vue_runtime_esm_bundler["Fragment"], null, Object(vue_runtime_esm_bundler["renderList"])(dataList.value, function (imgs) {
            return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])("li", {
              key: imgs.name
            }, [Object(vue_runtime_esm_bundler["createElementVNode"])("img", {
              src: imgs.image,
              alt: "",
              onClick: function onClick($event) {
                return showModel(imgs.style);
              }
            }, null, 8, _hoisted_7)]);
          }), 128))])])), [[_directive_auto_height, 220]])])];
        }),
        _: 1
      })), [[_directive_auto_height, 60]]), Object(vue_runtime_esm_bundler["createVNode"])(graphic_editor["a" /* default */], {
        ref_key: "editor",
        ref: editor
      }, null, 512)], 64);
    };
  }
}));
// CONCATENATED MODULE: ./src/example/layer-graphic/draw/draw-model-list/index.vue?vue&type=script&lang=ts&setup=true
 
// EXTERNAL MODULE: ./src/example/layer-graphic/draw/draw-model-list/index.vue?vue&type=style&index=0&id=113824f7&scoped=true&lang=less
var draw_model_listvue_type_style_index_0_id_113824f7_scoped_true_lang_less = __webpack_require__("1632b");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/example/layer-graphic/draw/draw-model-list/index.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(draw_model_listvue_type_script_lang_ts_setup_true, [['__scopeId',"data-v-113824f7"]])

/* harmony default export */ var draw_model_list = __webpack_exports__["default"] = (__exports__);

/***/ })

}]);