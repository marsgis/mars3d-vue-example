(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-2d22d979"],{

/***/ "f7c5":
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

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./build/example-vue-loader.js!./src/example/graphic/primitive/polyline-tower/index.vue?vue&type=script&setup=true&lang=ts



var _hoisted_1 = /*#__PURE__*/Object(vue_runtime_esm_bundler["createElementVNode"])("div", {
  id: "section",
  style: {
    "width": "500px",
    "height": "200px"
  }
}, null, -1);



/* harmony default export */ var polyline_towervue_type_script_setup_true_lang_ts = (/*#__PURE__*/Object(vue_runtime_esm_bundler["defineComponent"])({
  setup: function setup(__props) {
    var mapWork = window.mapWork;
    mapWork.echartTarget.on("addEchart", function (event) {
      drawHeightToDistanceEcharts(event.heightArry, event.heightTDArray, event.distanceArray);
    }); // 获取的dom元素

    function drawHeightToDistanceEcharts(heightArry, heightTDArray, distanceArray) {
      var myChart = echarts["b" /* init */](document.getElementById("section"), "dark");
      var option = {
        title: {
          text: "断面图",
          left: 25
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
          data: ["地形高程", "电线高程"]
        },
        grid: {
          left: 50,
          width: 425,
          top: 50,
          bottom: 30
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: distanceArray
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} 米"
          },
          axisPointer: {
            snap: true
          }
        },
        dataZoom: {
          start: 80,
          type: "inside"
        },
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
          name: "电线高程",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              color: "rgb(255, 70, 131)"
            }
          },
          data: heightArry,
          markPoint: undefined
        }]
      };
      myChart.setOption(option, true);
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
// CONCATENATED MODULE: ./src/example/graphic/primitive/polyline-tower/index.vue?vue&type=script&setup=true&lang=ts
 
// CONCATENATED MODULE: ./src/example/graphic/primitive/polyline-tower/index.vue



const __exports__ = polyline_towervue_type_script_setup_true_lang_ts;

/* harmony default export */ var polyline_tower = __webpack_exports__["default"] = (__exports__);

/***/ })

}]);