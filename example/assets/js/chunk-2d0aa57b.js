(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d0aa57b"],{

/***/ "1138":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm-bundler.js + 3 modules
var vue_runtime_esm_bundler = __webpack_require__("7a23");

// EXTERNAL MODULE: ./src/components/marsgis/pannel.vue + 2 modules
var pannel = __webpack_require__("7544");

// EXTERNAL MODULE: ./node_modules/echarts/index.js + 538 modules
var echarts = __webpack_require__("313e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/graphic/apply/railway/index.vue?vue&type=script&lang=ts&setup=true



var _hoisted_1 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
  id: "chart-container",
  style: {
    "width": "400px",
    "height": "250px"
  }
}, null, -1);




/* harmony default export */ var railwayvue_type_script_lang_ts_setup_true = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    var myChart = null;
    var option = null;
    Object(vue_runtime_esm_bundler["onMounted"])(function () {
      mapWork.eventTarget.on("dataLoaded", renderEcharts);
      mapWork.eventTarget.on("dataUpdated", updateEcharts);
    });

    function renderEcharts(event) {
      myChart = echarts["b" /* init */](document.getElementById("chart-container"));
      var heightArray = event.heightArray,
          heightTDArray = event.heightTDArray,
          distanceArray = event.distanceArray;
      option = {
        title: {
          text: "断面图",
          textStyle: {
            color: "#ffffff"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ["地形高程", "设计高程"],
          textStyle: {
            color: "#ffffff"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: distanceArray,
          axisLabel: {
            color: "#ffffff"
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 米",
            color: "#ffffff"
          },
          axisPointer: {
            snap: true
          }
        },
        dataZoom: [{
          type: "inside"
        }, {
          start: 0,
          end: 10,
          handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
          handleSize: "80%",
          handleStyle: {
            color: "#fff",
            shadowBlur: 3,
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        //  visualMap: {
        //      show: false,
        //      dimension: 0,
        //      pieces: [{ "gt": 0, "lte": 635 }]
        //  },
        series: [{
          name: "地形高程",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              color: "rgb(255, 255, 0)"
            }
          },
          data: heightTDArray
        }, {
          name: "设计高程",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              color: "rgb(255, 70, 131)"
            }
          },
          data: heightArray,
          markPoint: undefined
        }]
      };
      myChart.setOption(option, true);
    }

    function updateEcharts(event) {
      if (!myChart) {
        return;
      }

      var loc = event.loc,
          height = event.height;
      var markPoint = {
        data: [{
          name: "车",
          value: "车",
          xAxis: loc + 5,
          yAxis: height
        }]
      };
      myChart.setOption({
        series: [{
          name: "设计高程",
          markPoint: markPoint
        }]
      });
    }

    return function (_ctx, _cache) {
      return Object(vue_runtime_esm_bundler["openBlock"])(), Object(vue_runtime_esm_bundler["createBlock"])(pannel["a" /* default */], {
        class: "infoView"
      }, {
        default: Object(vue_runtime_esm_bundler["withCtx"])(function () {
          return [_hoisted_1];
        }),
        _: 1
      });
    };
  }
}));
// CONCATENATED MODULE: ./src/example/graphic/apply/railway/index.vue?vue&type=script&lang=ts&setup=true
 
// CONCATENATED MODULE: ./src/example/graphic/apply/railway/index.vue



const __exports__ = railwayvue_type_script_lang_ts_setup_true;

/* harmony default export */ var railway = __webpack_exports__["default"] = (__exports__);

/***/ })

}]);