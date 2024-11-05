<template>
  <div class="map_btn">
    <a-space :size="10">
      <mars-button class="btn" @click="startRotate">
        <mars-icon icon="play" color="#f2f2f2" :size="16"></mars-icon>
        开始</mars-button>
      <mars-button class="btn" danger @click="stopRotate">
        <mars-icon icon="power" color="#f2f2f2" :size="16" />
        停止</mars-button>
    </a-space>
  </div>

  <div class="infoview-js">
    <div class="infoview_panel">
      <div class="infoview_panel_scroll">
        <div class="title">合肥火星科技有限公司</div>
        <div>
          <label>公司简介:</label>
          <span>合肥火星科技有限公司（简称：火星科技），于2017年在安徽合肥成立，自成立以来，公司致力于三维可视化技术和GIS地理信息技术的研究与探索，公司耕耘在军工、航天、仿真、智慧城市等行业领域，主营业务模式围绕Mars2D、Mars3D系列平台级产品展开，持续为客户提供着自主可控、专业高效、具备可视化行业前沿科技的产品解决方案与服务。</span>
        </div>
        <div>
          <label>公司资质:</label>
          <span>
            公司围绕三维可视化领域已取得软件著作权和专利30多项，属于国家高新技术企业、“双软”认定企业、合肥市大数据企业、中国软件协会认定的AAA
            信用企业、已通过ISO9001质量管理体系认证。
          </span>
        </div>
        <div>
          <label>主要产品:</label>
          <span>
            Mars3D是火星科技研发的一款基于 WebGL
            技术实现的三维客户端开发平台，基于Cesium优化提升与B/S架构设计，支持多行业扩展的轻量级高效能GIS开发平台，能够免安装、无插件地在浏览器中高效运行，并可快速接入与使用多种GIS数据和三维模型，呈现三维空间的可视化，完成平台在不同行业的灵活应用。
          </span>
        </div>
        <div>
          <label>低代码平台:</label>
          <span>
            零代码 构件数字孪生 可视化新世界；无需懂代码，轻松搭建三维场景。让您以更低的成本和更高的效率在平台上搭建发布自己的三维场景。无论是城市规划、业务展示或教育培训，都可以满足您的需求。
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="btnBar">
    <mars-button class="btnbar_item" href="http://marsgis.cn/about.html?index=0" target="_blank">公司简介</mars-button>
    <mars-button class="btnbar_item" href="http://mars3d.cn/template.html" target="_blank">公司项目</mars-button>
    <mars-button class="btnbar_item" href="http://mars3d.cn/example.html" target="_blank">主要产品</mars-button>
    <mars-button class="btnbar_item" href="http://mars3d.cn/studio.html" target="_blank">低代码平台</mars-button>
  </div>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

// 开始
const startRotate = () => {
  mapWork.startRotate()
}
// 停止
const stopRotate = () => {
  mapWork.stopRotate()
}
</script>
<style scoped lang="less">
.map_btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;

  .mars-button {
    width: 120px;
    height: 46px;
  }
}

.infoview-js {
  position: absolute;
  right: 10px;
  top: 80px;
  width: 30%;
  height: 80%;
  border: none;
  overflow-x: hidden;
  overflow-y: auto;
}

.infoview_panel {
  height: 100%;
  width: 100%;
  color: #ffffff;
  padding: 10px;
  background: url("./img/infoBox.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 5px;

  span {
    font-size: 20px !important;
  }

  label {
    color: #03dae7;
    display: inline-block;
    margin-bottom: 5px;
    font-weight: bold;
    line-height: 35px;
    font-size: 20px !important;
  }

  .title {
    color: #ffec48;
    font-size: 28px;
    text-align: center;
    font-weight: bold;
    line-height: 50px;
  }
}

.btnBar {
  bottom: 40px;
  left: 10%;
  position: absolute;

  .mars-button:not([disabled]) {
    &:hover {
      color: var(--mars-control-text);
      background: url("./img/button_select.png") no-repeat !important;
    }

    &:focus {
      color: var(--mars-control-text);
      background: url("./img/button_select.png") no-repeat !important;
    }
  }
}

.btnbar_item {
  font: 16px "Microsoft YaHei";
  color: rgba(255, 255, 255, 1);
  pointer-events: auto;
  display: inline-block;
  width: 170px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: none;
  background: url("./img/button.png") no-repeat;
  background-size: 100% 100%;
  margin-right: 40px;
}

.infoview_panel_scroll {
  height: 98%;
  width: 99%;
  overflow-y: auto;
}
</style>
