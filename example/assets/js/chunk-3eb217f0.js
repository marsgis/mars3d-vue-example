(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-3eb217f0"],{

/***/ "1148":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var toIntegerOrInfinity = __webpack_require__("5926");
var toString = __webpack_require__("577e");
var requireObjectCoercible = __webpack_require__("1d80");

var RangeError = global.RangeError;

// `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat
module.exports = function repeat(count) {
  var str = toString(requireObjectCoercible(this));
  var result = '';
  var n = toIntegerOrInfinity(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "408a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("e330");

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


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

/***/ "7ba1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b680":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var uncurryThis = __webpack_require__("e330");
var toIntegerOrInfinity = __webpack_require__("5926");
var thisNumberValue = __webpack_require__("408a");
var $repeat = __webpack_require__("1148");
var fails = __webpack_require__("d039");

var RangeError = global.RangeError;
var String = global.String;
var floor = Math.floor;
var repeat = uncurryThis($repeat);
var stringSlice = uncurryThis(''.slice);
var un$ToFixed = uncurryThis(1.0.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data[index];
    data[index] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';
  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  } return s;
};

var FORCED = fails(function () {
  return un$ToFixed(0.00008, 3) !== '0.000' ||
    un$ToFixed(0.9, 0) !== '1' ||
    un$ToFixed(1.255, 2) !== '1.25' ||
    un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  un$ToFixed({});
});

// `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed
$({ target: 'Number', proto: true, forced: FORCED }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue(this);
    var fractDigits = toIntegerOrInfinity(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k;

    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String(number);
    if (number < 0) {
      sign = '-';
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }
        multiply(data, pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }
        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits
        ? '0.' + repeat('0', fractDigits - k) + result
        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
    } else {
      result = sign + result;
    } return result;
  }
});


/***/ }),

/***/ "e64d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f1b9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.to-fixed.js
var es_number_to_fixed = __webpack_require__("b680");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/layer-tileset/manager/edit/index.vue?vue&type=script&setup=true&lang=ts







var editvue_type_script_setup_true_lang_ts_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-483d6fe7"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = {
  class: "infoView-content"
};

var _hoisted_2 = /*#__PURE__*/editvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("span", {
    class: "f-vam"
  }, "代理", -1);
});

var _hoisted_3 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("加载模型");

var _hoisted_4 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("深度检测");

var _hoisted_5 = {
  class: "f-tac"
};

var _hoisted_6 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("视角定位至模型");

var _hoisted_7 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("查看构件");

var _hoisted_8 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("保存参数");

var _hoisted_9 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createTextVNode"])("取消选中");



/* harmony default export */ var editvue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var formState = Object(vue_runtime_esm_bundler["reactive"])({
      txtModel: "//data.mars3d.cn/3dtiles/max-fsdzm/tileset.json",
      chkProxy: false,
      txtX: 0,
      txtY: 0,
      txtZ: 0,
      depthTestAgainstTerrain: false,
      rotationZ: 0.0,
      rotationX: 0.0,
      rotationY: 0.0,
      scale: 1,
      axis: "",
      tilesEditorEnabled: false,
      maximumScreenSpaceError: 8,
      luminanceAtZenith: 0.1,
      opacity: 1
    });
    var activeKey = ["1", "2", "3"];
    var axisOptions = [{
      value: "",
      label: "默认"
    }, {
      value: "Z_UP_TO_X_UP",
      label: "Z轴 -> X轴"
    }, {
      value: "Z_UP_TO_Y_UP",
      label: "Z轴 -->Y轴"
    }, {
      value: "X_UP_TO_Y_UP",
      label: "X轴 -->Y轴"
    }, {
      value: "X_UP_TO_Z_UP",
      label: "X轴 -->Z轴"
    }, {
      value: "Y_UP_TO_X_UP",
      label: "Y轴 -->X轴"
    }, {
      value: "Y_UP_TO_Z_UP",
      label: "Y轴 -->Z轴"
    }];
    var labelCol = {
      style: {
        width: "100px"
      }
    }; // 初始化界面

    Object(vue_runtime_esm_bundler["onMounted"])(function () {
      setTimeout(function () {
        mapWork.showModel(formState.txtModel);
      }, 1000);
    });
    mapWork.eventTarget.on("tiles3dLayerLoad", function (event) {
      var tileset = event.data;
      var tiles3dLayer = event.tiles3dLayer; // 取模型中心点信息

      var locParams = tiles3dLayer.center;

      if (locParams.alt < -1000 || locParams.alt > 10000) {
        locParams.alt = 0; // 高度异常数据，自动赋值高度为0
      }

      formState.txtX = locParams.lng.toFixed(6);
      formState.txtY = locParams.lat.toFixed(6);
      formState.txtZ = locParams.alt.toFixed(6);
      formState.luminanceAtZenith = tileset.luminanceAtZenith;
      formState.maximumScreenSpaceError = tileset.maximumScreenSpaceError;

      if (tiles3dLayer.transform) {
        formState.rotationX = tiles3dLayer.rotation_x.toFixed(1);
        formState.rotationY = tiles3dLayer.rotation_y.toFixed(1);
        formState.rotationZ = tiles3dLayer.rotation_z.toFixed(1);
        formState.scale = tiles3dLayer.scale || 1;
        formState.axis = tiles3dLayer.axis;
      } else {
        mapWork.getDefined(formState);
      }

      mapWork.getConfig(formState);
    });
    mapWork.eventTarget.on("tilesEditor", function (event) {
      mapWork.editor(event.data, formState.txtZ);
    }); // 根据改变的位置触发不同的事件

    mapWork.eventTarget.on("changePoition", function (event) {
      formState.txtX = event.point.lng;
      formState.txtY = event.point.lat;
      formState.txtZ = event.point.alt;
    });
    mapWork.eventTarget.on("changeHeading", function (event) {
      formState.rotationZ = event.tiles3dLayer.rotation_z;
    });

    var showModel = function showModel() {
      mapWork.showModel(formState.txtModel);
    };

    var formStateChange = function formStateChange() {
      mapWork.updateModel(formState);
    };

    var locateToModel = function locateToModel() {
      mapWork.locate();
    };

    var saveBookmark = function saveBookmark() {
      mapWork.saveBookmark(formState);
    }; // 查看构件


    var treeData = Object(vue_runtime_esm_bundler["ref"])();
    var showCompModel = Object(vue_runtime_esm_bundler["ref"])(false);

    var showCompTree = function showCompTree() {
      showCompModel.value = true;
      mapWork.showCompTree(formState.txtModel);
      mapWork.eventTarget.on("compTree", function (event) {
        var data = event.data;
        data.forEach(function (item, index) {
          var childeren = isHaveChildren(item, index);
          treeData.value = [{
            title: item.name,
            key: index,
            id: item.eleid,
            sphere: item.sphere,
            children: childeren
          }];
        });
      });
    };

    function isHaveChildren(arr, index) {
      if (!arr.children) {
        return;
      }

      var childerens = arr.children;
      var childeren = [];
      childerens.forEach(function (item, i) {
        i++;
        var childOne = isHaveChildren(item, i);
        childeren.push({
          title: item.name,
          key: index + "-" + i,
          id: item.eleid,
          sphere: item.sphere,
          children: childOne
        });
        return childeren;
      });
      return childeren;
    } // 选中节点


    var cancelTree = Object(vue_runtime_esm_bundler["ref"])(false);

    var compModelChange = function compModelChange(selectedKeys, selected) {
      cancelTree.value = true;
      mapWork.compModelChange(selected.node.id, selected.node.sphere);
    };

    var checkedTree = function checkedTree() {
      cancelTree.value = false;
      mapWork.checkedTree();
    };

    return function (_ctx, _cache) {
      var _component_a_checkbox = Object(vue_runtime_esm_bundler["resolveComponent"])("a-checkbox");

      var _component_a_space = Object(vue_runtime_esm_bundler["resolveComponent"])("a-space");

      var _component_mars_input = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-input");

      var _component_a_col = Object(vue_runtime_esm_bundler["resolveComponent"])("a-col");

      var _component_mars_button = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-button");

      var _component_a_row = Object(vue_runtime_esm_bundler["resolveComponent"])("a-row");

      var _component_a_collapse_panel = Object(vue_runtime_esm_bundler["resolveComponent"])("a-collapse-panel");

      var _component_mars_input_number = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-input-number");

      var _component_a_form_item = Object(vue_runtime_esm_bundler["resolveComponent"])("a-form-item");

      var _component_mars_select = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-select");

      var _component_a_switch = Object(vue_runtime_esm_bundler["resolveComponent"])("a-switch");

      var _component_a_slider = Object(vue_runtime_esm_bundler["resolveComponent"])("a-slider");

      var _component_a_collapse = Object(vue_runtime_esm_bundler["resolveComponent"])("a-collapse");

      var _component_a_form = Object(vue_runtime_esm_bundler["resolveComponent"])("a-form");

      var _component_mars_tree = Object(vue_runtime_esm_bundler["resolveComponent"])("mars-tree");

      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createElementBlock"])(vue_runtime_esm_bundler["Fragment"], null, [Object(vue_runtime_esm_bundler["createVNode"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form, {
            "label-col": labelCol
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_collapse, {
                activeKey: activeKey
              }, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_collapse_panel, {
                    key: "1",
                    header: "模型URL地址"
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_row, {
                        gutter: 10
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                            span: 19
                          }, {
                            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input, {
                                allowClear: false,
                                value: Object(vue_runtime_esm_bundler["unref"])(formState).txtModel,
                                "onUpdate:value": _cache[1] || (_cache[1] = function ($event) {
                                  return Object(vue_runtime_esm_bundler["unref"])(formState).txtModel = $event;
                                })
                              }, {
                                addonAfter: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                                        class: "f-vam",
                                        checked: Object(vue_runtime_esm_bundler["unref"])(formState).chkProxy,
                                        "onUpdate:checked": _cache[0] || (_cache[0] = function ($event) {
                                          return Object(vue_runtime_esm_bundler["unref"])(formState).chkProxy = $event;
                                        })
                                      }, null, 8, ["checked"]), _hoisted_2];
                                    }),
                                    _: 1
                                  })];
                                }),
                                _: 1
                              }, 8, ["value"])];
                            }),
                            _: 1
                          }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                            span: 5
                          }, {
                            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                                class: "small-btn",
                                onClick: showModel
                              }, {
                                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                                  return [_hoisted_3];
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
                  }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_collapse_panel, {
                    key: "2",
                    header: "位置方向"
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "经度"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                            value: Object(vue_runtime_esm_bundler["unref"])(formState).txtX,
                            "onUpdate:value": _cache[2] || (_cache[2] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).txtX = $event;
                            }),
                            step: 0.000001,
                            onChange: formStateChange
                          }, null, 8, ["value", "step"])];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "纬度"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                            value: Object(vue_runtime_esm_bundler["unref"])(formState).txtY,
                            "onUpdate:value": _cache[3] || (_cache[3] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).txtY = $event;
                            }),
                            step: 0.000001,
                            onChange: formStateChange
                          }, null, 8, ["value", "step"])];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "高度"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_row, {
                            gutter: 10
                          }, {
                            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                              return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                                span: 15
                              }, {
                                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                                    value: Object(vue_runtime_esm_bundler["unref"])(formState).txtZ,
                                    "onUpdate:value": _cache[4] || (_cache[4] = function ($event) {
                                      return Object(vue_runtime_esm_bundler["unref"])(formState).txtZ = $event;
                                    }),
                                    step: 0.1,
                                    onChange: formStateChange
                                  }, null, 8, ["value", "step"])];
                                }),
                                _: 1
                              }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_col, {
                                span: 9
                              }, {
                                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_checkbox, {
                                    checked: Object(vue_runtime_esm_bundler["unref"])(formState).depthTestAgainstTerrain,
                                    "onUpdate:checked": _cache[5] || (_cache[5] = function ($event) {
                                      return Object(vue_runtime_esm_bundler["unref"])(formState).depthTestAgainstTerrain = $event;
                                    }),
                                    onChange: formStateChange
                                  }, {
                                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                                      return [_hoisted_4];
                                    }),
                                    _: 1
                                  }, 8, ["checked"])];
                                }),
                                _: 1
                              })];
                            }),
                            _: 1
                          })];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "方向X"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                            value: Object(vue_runtime_esm_bundler["unref"])(formState).rotationX,
                            "onUpdate:value": _cache[6] || (_cache[6] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).rotationX = $event;
                            }),
                            step: 0.1,
                            onChange: formStateChange
                          }, null, 8, ["value", "step"])];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "方向Y"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                            value: Object(vue_runtime_esm_bundler["unref"])(formState).rotationY,
                            "onUpdate:value": _cache[7] || (_cache[7] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).rotationY = $event;
                            }),
                            step: 0.1,
                            onChange: formStateChange
                          }, null, 8, ["value", "step"])];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "方向Z(四周)"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                            value: Object(vue_runtime_esm_bundler["unref"])(formState).rotationZ,
                            "onUpdate:value": _cache[8] || (_cache[8] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).rotationZ = $event;
                            }),
                            step: 0.1,
                            onChange: formStateChange
                          }, null, 8, ["value", "step"])];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "变换垂直轴"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_select, {
                            value: Object(vue_runtime_esm_bundler["unref"])(formState).axis,
                            "onUpdate:value": _cache[9] || (_cache[9] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).axis = $event;
                            }),
                            onChange: formStateChange,
                            options: axisOptions
                          }, null, 8, ["value"])];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "鼠标拖拽编辑"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_switch, {
                            checked: Object(vue_runtime_esm_bundler["unref"])(formState).tilesEditorEnabled,
                            "onUpdate:checked": _cache[10] || (_cache[10] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).tilesEditorEnabled = $event;
                            }),
                            onChange: formStateChange
                          }, null, 8, ["checked"])];
                        }),
                        _: 1
                      })];
                    }),
                    _: 1
                  }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_collapse_panel, {
                    key: "3",
                    header: "其他参数"
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "缩放比例"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_input_number, {
                            value: Object(vue_runtime_esm_bundler["unref"])(formState).scale,
                            "onUpdate:value": _cache[11] || (_cache[11] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).scale = $event;
                            }),
                            step: 0.1,
                            onChange: formStateChange
                          }, null, 8, ["value", "step"])];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "显示精度"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                            min: 1,
                            max: 30,
                            value: Object(vue_runtime_esm_bundler["unref"])(formState).maximumScreenSpaceError,
                            "onUpdate:value": _cache[12] || (_cache[12] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).maximumScreenSpaceError = $event;
                            }),
                            onChange: formStateChange
                          }, null, 8, ["value"])];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "材质底色"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                            min: 0.1,
                            max: 3,
                            step: 0.1,
                            value: Object(vue_runtime_esm_bundler["unref"])(formState).luminanceAtZenith,
                            "onUpdate:value": _cache[13] || (_cache[13] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).luminanceAtZenith = $event;
                            }),
                            onChange: formStateChange
                          }, null, 8, ["min", "step", "value"])];
                        }),
                        _: 1
                      }), Object(vue_runtime_esm_bundler["createVNode"])(_component_a_form_item, {
                        label: "透明度"
                      }, {
                        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                          return [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_slider, {
                            min: 0.1,
                            max: 1,
                            step: 0.1,
                            value: Object(vue_runtime_esm_bundler["unref"])(formState).opacity,
                            "onUpdate:value": _cache[14] || (_cache[14] = function ($event) {
                              return Object(vue_runtime_esm_bundler["unref"])(formState).opacity = $event;
                            }),
                            onChange: formStateChange
                          }, null, 8, ["min", "step", "value"])];
                        }),
                        _: 1
                      })];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              }), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_5, [Object(vue_runtime_esm_bundler["createVNode"])(_component_a_space, null, {
                default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                  return [Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                    onClick: locateToModel
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_6];
                    }),
                    _: 1
                  }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                    onClick: showCompTree
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_7];
                    }),
                    _: 1
                  }), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
                    onClick: saveBookmark
                  }, {
                    default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
                      return [_hoisted_8];
                    }),
                    _: 1
                  })];
                }),
                _: 1
              })])];
            }),
            _: 1
          })])];
        }),
        _: 1
      }), Object(vue_runtime_esm_bundler["createVNode"])(pannel["a" /* default */], {
        class: "comp-model",
        type: "model",
        title: "查看控件",
        visible: showCompModel.value,
        "onUpdate:visible": _cache[15] || (_cache[15] = function ($event) {
          return showCompModel.value = $event;
        })
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["withDirectives"])(Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_button, {
            onClick: checkedTree
          }, {
            default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
              return [_hoisted_9];
            }),
            _: 1
          }, 512), [[vue_runtime_esm_bundler["vShow"], cancelTree.value]]), Object(vue_runtime_esm_bundler["createVNode"])(_component_mars_tree, {
            onSelect: compModelChange,
            "tree-data": treeData.value
          }, {
            title: Object(vue_runtime_esm_bundler["withCtx"])(function (_ref) {
              var title = _ref.title;
              return [Object(vue_runtime_esm_bundler["createElementVNode"])("span", null, Object(vue_runtime_esm_bundler["toDisplayString"])(title), 1)];
            }),
            _: 1
          }, 8, ["tree-data"])];
        }),
        _: 1
      }, 8, ["visible"])], 64);
    };
  }
}));
// CONCATENATED MODULE: ./src/example/layer-tileset/manager/edit/index.vue?vue&type=script&setup=true&lang=ts
 
// EXTERNAL MODULE: ./src/example/layer-tileset/manager/edit/index.vue?vue&type=style&index=0&id=483d6fe7&scoped=true&lang=less
var editvue_type_style_index_0_id_483d6fe7_scoped_true_lang_less = __webpack_require__("f7ba");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/example/layer-tileset/manager/edit/index.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(editvue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-483d6fe7"]])

/* harmony default export */ var edit = __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "f7ba":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_483d6fe7_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7ba1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_483d6fe7_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_483d6fe7_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);