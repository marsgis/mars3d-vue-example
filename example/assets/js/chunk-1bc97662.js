(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-1bc97662"],{

/***/ "3f15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// EXTERNAL MODULE: ./node_modules/echarts/index.js + 538 modules
var echarts = __webpack_require__("313e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/layer-graphic/geojson/buildings/index.vue?vue&type=script&setup=true&lang=ts








var buildingsvue_type_script_setup_true_lang_ts_withScopeId = function _withScopeId(n) {
  return Object(vue_runtime_esm_bundler["pushScopeId"])("data-v-1c112229"), n = n(), Object(vue_runtime_esm_bundler["popScopeId"])(), n;
};

var _hoisted_1 = {
  class: "bg"
};

var _hoisted_2 = /*#__PURE__*/buildingsvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "_item_top"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "_item_title"
  }, "接入建筑栋数")], -1);
});

var _hoisted_3 = /*#__PURE__*/buildingsvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "_item_row _item_full_box_width justify-between"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "row1 flex-1"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("img", {
    src: "/img/icon/监测建筑.png",
    alt: "",
    class: "icon"
  }), /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "row1_right"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "right_title"
  }, "87"), /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "right_sub_title"
  }, "监测建筑")])]), /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "row1 flex-1 ml"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("img", {
    src: "/img/icon/监测面积.png",
    alt: "",
    class: "icon"
  }), /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "row1_right"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "right_title"
  }, "2021"), /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "right_sub_title"
  }, "监测面积(万m²)")])])], -1);
});

var _hoisted_4 = {
  class: "_item_row",
  style: {
    "align-items": "flex-start"
  }
};
var _hoisted_5 = {
  class: "row3"
};
var _hoisted_6 = {
  class: "_item_row_box3"
};
var _hoisted_7 = {
  class: "ring1"
};

var _hoisted_8 = /*#__PURE__*/buildingsvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "row2 flex items-center"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "_item_row_box2"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "box2_item",
    count: "64"
  }, "办公建筑"), /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "box2_item1",
    count: "1"
  }, "综合建筑"), /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "box2_item2",
    count: "4"
  }, "商场建筑"), /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "box2_item3",
    count: "10"
  }, "宾馆饭店"), /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "box2_item4",
    count: "1"
  }, "医疗卫生"), /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "box2_item5",
    count: "1"
  }, "文化教育")])], -1);
});

var _hoisted_9 = {
  class: "bg"
};
var _hoisted_10 = {
  class: "right_item"
};

var _hoisted_11 = /*#__PURE__*/buildingsvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "_item_top item_bottom"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "_item_title"
  }, "各类建筑接入情况")], -1);
});

var _hoisted_12 = {
  class: "_item_full_box"
};
var _hoisted_13 = {
  class: "bar"
};
var _hoisted_14 = {
  class: "bg container-last-chart"
};
var _hoisted_15 = {
  class: "right_item"
};

var _hoisted_16 = /*#__PURE__*/buildingsvue_type_script_setup_true_lang_ts_withScopeId(function () {
  return /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "_item_top item_bottom"
  }, [/*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
    class: "_item_title"
  }, "能耗趋势")], -1);
});

var _hoisted_17 = {
  class: "_item_full_box"
};
var _hoisted_18 = {
  class: "bar"
};



/* harmony default export */ var buildingsvue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var ring = Object(vue_runtime_esm_bundler["ref"])();
    var line = Object(vue_runtime_esm_bundler["ref"])();
    var bar = Object(vue_runtime_esm_bundler["ref"])();
    Object(vue_runtime_esm_bundler["onMounted"])(function () {
      Object(vue_runtime_esm_bundler["nextTick"])(function () {
        initEcharts();
      });
    });

    function initEcharts() {
      // 饼形图
      var myChart = echarts["b" /* init */](ring.value);
      var option = {
        backgroundColor: "transparent",
        legend: {
          show: false,
          top: "0%",
          left: "center",
          icon: "roundRect",
          itemWidth: 8,
          textStyle: {
            fontSize: fontSize(0.68)
          }
        },
        series: [{
          type: "pie",
          radius: "80%",
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderType: "solid",
            borderColor: "#ffffff"
          },
          emphasis: {
            scale: false,
            scaleSize: 2
          },
          label: {
            show: true,
            position: "center",
            lineHeight: 28,
            formatter: function formatter() {
              return "";
            },
            emphasis: {
              formatter: function formatter(params) {
                return "{p|" + params.data.name + "}" + "\n{nm|" + params.data.value + "}";
              }
            },
            rich: {
              p: {
                width: 130,
                itemWidth: 100,
                color: "#fff",
                fontSize: fontSize(1),
                lineHeight: fontSize(1),
                fontWeight: "bold" //   backgroundColor: "rgba(15, 21, 70, 1)", // 覆盖index=0时的数据

              },
              nm: {
                width: 130,
                itemWidth: 100,
                color: "#fff",
                fontSize: fontSize(1.5),
                lineHeight: fontSize(1.625),
                fontWeight: "bold" //   backgroundColor: "rgba(15, 21, 70, 1)", // 覆盖index=0时的数据

              }
            }
          },
          labelLine: {
            show: false
          },
          data: [{
            value: 64,
            name: "办公建筑",
            itemStyle: {
              color: "rgba(14,227,247, 0.58)"
            }
          }, {
            value: 1,
            name: "综合建筑",
            itemStyle: {
              color: "rgba(255,113,94, 0.58)"
            }
          }, {
            value: 4,
            name: "商场建筑",
            itemStyle: {
              color: "rgba(254,  217,  118, 0.64)"
            }
          }, {
            value: 10,
            name: "宾馆饭店",
            itemStyle: {
              color: "rgba(234,94,230, 0.64)"
            }
          }, {
            value: 1,
            name: "医疗卫生",
            itemStyle: {
              color: "rgba(94, 225, 186, 0.58)"
            }
          }, {
            value: 1,
            name: "文化教育",
            itemStyle: {
              color: "rgba(113, 204, 78, 0.58)"
            }
          }]
        }]
      };
      myChart.setOption(option); // 柱状图

      var myChart2 = echarts["b" /* init */](bar.value, "dark");
      var option2 = {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          show: true,
          confine: true,
          textStyle: {
            align: "left"
          },
          formatter: function formatter(item) {
            var html = "".concat(item[0].name, ":").concat(item[0].data);
            item.slice(1).forEach(function (s) {
              if (s.seriesName.indexOf("series") === -1) {
                html += "<br/> ".concat(s.seriesName, ":").concat(s.data);
              }
            });
            return html;
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // cross 默认为直线，可选为：'line' | 'shadow'

          }
        },
        legend: {
          show: false,
          top: "5%",
          left: "center",
          icon: "roundRect",
          itemWidth: 8,
          textStyle: {
            fontSize: fontSize(0.6875)
          }
        },
        grid: {
          left: "0%",
          right: "0%",
          top: "20%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["办公建筑", "综合建筑", "商场建筑", "宾馆饭店", "医疗卫生", "文化教育"],
          axisTick: {
            alignWithLabel: false,
            show: true,
            lineStyle: {
              color: "#ccc"
            }
          },
          axisLabel: {
            fontSize: fontSize(0.6875),
            interval: 0,
            padding: [10, 0, 0, 0]
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          splitLine: {
            show: false
          },
          show: true
        },
        yAxis: {
          max: 70,
          name: "栋",
          nameTextStyle: {
            // color: "rgba(217, 35, 35, 1)",
            align: "right",
            verticalAlign: "middle",
            borderDashOffset: 0,
            padding: [6, 6, 6, 6]
          },
          axisLabel: {
            // color: '#ff0000',
            fontSize: fontSize(0.6875),
            interval: 0,
            padding: [0, 0, 0, 0]
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          axisTick: {
            alignWithLabel: false,
            show: true,
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        series: [{
          name: "dotted",
          type: "pictorialBar",
          symbol: "rect",
          barGap: "-100%",
          showBackground: true,
          itemStyle: {
            color: "rgba(14,227,247, 1)"
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          data: [64, 1, 4, 10, 1, 1],
          z: -8
        }, {
          type: "bar",
          itemStyle: {
            color: "rgba(0,0,0,0.2)"
          },
          barGap: "-100%",
          barWidth: 12,
          z: -9,
          showBackground: true,
          data: [70, 70, 70, 70, 70, 70]
        }]
      };
      myChart2.setOption(option2); // 折线图

      var myChart3 = echarts["b" /* init */](line.value, "dark");
      var option3 = {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          show: true,
          confine: true,
          textStyle: {
            align: "left"
          },
          formatter: function formatter(item) {
            var html = item[0].axisValue * 1 + "月";
            item.slice(0).forEach(function (s) {
              if (s.seriesName.indexOf("series") === -1) {
                html += "<br/> ".concat(s.seriesName, ":").concat(s.data, "%");
              }
            });
            return html; // return  '{b0}<br/>{a1}: {c1}<br/>{a2}: {c2}'
          },
          // formatter: '{b0}<br/>{a1}: {c1}<br/>{a2}: {c2}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'

          }
        },
        legend: {
          show: true,
          // data:[""]
          top: "0%",
          left: "center",
          icon: "circle",
          type: "scroll",
          itemHeight: fontSize(0.5),
          itemWidth: fontSize(0.5),
          textStyle: {
            fontSize: fontSize(0.6)
          }
        },
        grid: {
          left: "0%",
          right: "0%",
          top: "18%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
          axisTick: {
            alignWithLabel: false,
            show: true,
            lineStyle: {
              color: "#ccc"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          axisLabel: {
            // X轴文字样式
            fontSize: fontSize(0.6875),
            interval: 0,
            padding: [10, 0, 0, 0]
          },
          splitLine: {
            show: false
          },
          show: true
        },
        yAxis: {
          // max:100,
          type: "value",
          name: "kwh",
          axisLabel: {
            fontSize: fontSize(0.6875),
            interval: 0,
            padding: [0, 0, 0, 0]
          },
          nameLocation: "end",
          nameTextStyle: {
            align: "right",
            verticalAlign: "middle",
            borderDashOffset: 0,
            padding: [6, 6, 6, 6]
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          axisTick: {
            alignWithLabel: false,
            show: true,
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        series: [{
          name: "办公建筑",
          type: "line",
          symbol: "circle",
          symbolSize: 5,
          itemStyle: {
            color: "rgba(14,227,247,1)"
          },
          barGap: "-100%",
          barWidth: 12,
          z: -8,
          data: [4, 3, 5, 4, 0]
        }, {
          name: "综合建筑",
          type: "line",
          symbol: "circle",
          symbolSize: 5,
          itemStyle: {
            color: "rgba(255,113,94, 1)"
          },
          barGap: "-100%",
          barWidth: 12,
          z: -8,
          data: [0.8, 0.6, 1, 0.6, 0]
        }, {
          name: "商场建筑",
          type: "line",
          symbol: "circle",
          symbolSize: 5,
          itemStyle: {
            color: "rgba(254,  217,  118, 1)"
          },
          barGap: "-100%",
          barWidth: 12,
          z: -8,
          data: [0.6, 0.5, 0.8, 0.4, 0]
        }, {
          name: "宾馆饭店",
          type: "line",
          symbol: "circle",
          symbolSize: 5,
          itemStyle: {
            color: "rgba(234,94,230, 1)"
          },
          barGap: "-100%",
          barWidth: 12,
          z: -8,
          data: []
        }, {
          name: "医疗卫生",
          type: "line",
          symbol: "circle",
          symbolSize: 5,
          itemStyle: {
            color: "rgba(94, 225, 186, 1)"
          },
          barGap: "-100%",
          barWidth: 12,
          z: -8,
          data: [1, 1, 1]
        }, {
          name: "文化教育",
          type: "line",
          symbol: "circle",
          symbolSize: 5,
          itemStyle: {
            color: "rgba(113, 204, 78, 1)"
          },
          barGap: "-100%",
          barWidth: 12,
          z: -8,
          data: [1, 2, 1, 1, 2]
        }, {
          type: "bar",
          itemStyle: {
            color: "rgba(0,0,0,0.2)"
          },
          barGap: "-100%",
          barWidth: 12,
          z: -9,
          showBackground: true,
          data: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7]
        }]
      };
      myChart3.setOption(option3);
    }

    function fontSize(res) {
      return res * 16;
    }

    return function (_ctx, _cache) {
      var _directive_auto_height = Object(vue_runtime_esm_bundler["resolveDirective"])("auto-height");

      return Object(vue_runtime_esm_bundler["withDirectives"])((Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(pannel["a" /* default */], {
        class: "infoView achart_container"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_1, [_hoisted_2, _hoisted_3, Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_4, [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_5, [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_6, [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_7, [Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
            ref_key: "ring",
            ref: ring,
            id: "ring"
          }, null, 512)])])]), _hoisted_8])]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_9, [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_10, [_hoisted_11, Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_12, [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_13, [Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
            id: "bar",
            ref_key: "bar",
            ref: bar
          }, null, 512)])])])]), Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_14, [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_15, [_hoisted_16, Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_17, [Object(vue_runtime_esm_bundler["createElementVNode"])("div", _hoisted_18, [Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
            id: "line",
            ref_key: "line",
            ref: line,
            class: "bar_chart"
          }, null, 512)])])])])];
        }),
        _: 1
      })), [[_directive_auto_height, 28]]);
    };
  }
}));
// CONCATENATED MODULE: ./src/example/layer-graphic/geojson/buildings/index.vue?vue&type=script&setup=true&lang=ts
 
// EXTERNAL MODULE: ./src/example/layer-graphic/geojson/buildings/index.vue?vue&type=style&index=0&id=1c112229&scoped=true&lang=less
var buildingsvue_type_style_index_0_id_1c112229_scoped_true_lang_less = __webpack_require__("781d");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/example/layer-graphic/geojson/buildings/index.vue






const __exports__ = /*#__PURE__*/exportHelper_default()(buildingsvue_type_script_setup_true_lang_ts, [['__scopeId',"data-v-1c112229"]])

/* harmony default export */ var buildings = __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "6c3a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "781d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_1c112229_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6c3a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_1c112229_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_11_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_11_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_11_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_11_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_build_example_vue_loader_js_index_vue_vue_type_style_index_0_id_1c112229_scoped_true_lang_less__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError = global.TypeError;

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ })

}]);