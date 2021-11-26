<template>
  <PannelBox class="infoView achart_container" v-auto-height="28">
    <!-- 右侧图表面板-->
    <div class="bg">
      <div class="_item_top">
        <div class="_item_title">接入建筑栋数</div>
      </div>
      <div class="_item_row _item_full_box_width justify-between">
        <div class="row1 flex-1">
          <img src="/img/icon/监测建筑.png" alt="" class="icon" />
          <div class="row1_right">
            <div class="right_title">87</div>
            <div class="right_sub_title">监测建筑</div>
          </div>
        </div>
        <div class="row1 flex-1 ml">
          <img src="/img/icon/监测面积.png" alt="" class="icon" />
          <div class="row1_right">
            <div class="right_title">2021</div>
            <div class="right_sub_title">监测面积(万m²)</div>
          </div>
        </div>
      </div>
      <div class="_item_row" style="align-items: flex-start">
        <div class="row3">
          <div class="_item_row_box3">
            <div class="ring1">
              <div id="ring"></div>
            </div>
          </div>
        </div>
        <div class="row2 flex items-center">
          <div class="_item_row_box2">
            <div class="box2_item" count="64">办公建筑</div>
            <div class="box2_item1" count="1">综合建筑</div>
            <div class="box2_item2" count="4">商场建筑</div>
            <div class="box2_item3" count="10">宾馆饭店</div>
            <div class="box2_item4" count="1">医疗卫生</div>
            <div class="box2_item5" count="1">文化教育</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg">
      <div class="right_item">
        <div class="_item_top item_bottom">
          <div class="_item_title">各类建筑接入情况</div>
        </div>
        <div class="_item_full_box">
          <div class="bar">
            <div id="bar"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg container-last-chart">
      <div class="right_item">
        <div class="_item_top item_bottom">
          <div class="_item_title">能耗趋势</div>
        </div>
        <div class="_item_full_box">
          <div class="bar">
            <div id="line" class="bar_chart"></div>
          </div>
        </div>
      </div>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

onMounted(() => {
  const dom = ref<any>({})
  dom.value.ring = document.getElementById("ring")
  dom.value.bar = document.getElementById("bar")
  dom.value.line = document.getElementById("line")
  mapWork.initEcharts(dom)
})
</script>
<style scoped lang="less">
.infoView {
  width: 410px;
  overflow-y: auto;
}
.achart_container {
  position: absolute;
  padding: 10px;
  top: 0;
  right: 0;
  width: 29rem;
  height: 100%;
  background: linear-gradient(to right, rgba(84, 97, 117, 0.5), rgba(42, 52, 69, 1));
}

._item_top {
  position: relative;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.22rem;
}

.item_bottom {
  margin-bottom: -2rem;
}

._item_title {
  position: relative;
  height: 1.56rem;
  padding-left: 1.25rem;
  line-height: 1.56rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 1px;
  margin-bottom: 0.7rem;
}

._item_title::before {
  content: "";
  width: 0.5rem;
  height: 1rem;
  background: rgba(229, 237, 255, 1);
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

._item_title::after {
  content: "";
  width: 26.5rem;
  height: 0.63rem;
  background: url("/img/icon/分割.png");
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  top: calc(100% + 0.13rem);
}

._item_row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  text-align: left;
}

._item_row_title {
  font-size: 0.88rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1.25rem;
  letter-spacing: 2px;
  text-shadow: 0px 0px 0px #02e1ff;
}

.row1 {
  width: 10rem;
  align-items: center;
  display: flex;
  margin-bottom: 1.19rem;
}

.icon {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}

.row1_right {
  margin-left: 0.75rem;
  text-align: left;
}

.ml {
  margin-left: 50px;
}

.right_title {
  font-size: 2rem;
  font-weight: bold;
  color: #febc04;
  line-height: 2rem;
  background: linear-gradient(180deg, #e5be38 0%, #ff882e 100%);
  -webkit-background-clip: text;
  white-space: nowrap;
  -webkit-text-fill-color: transparent;
  font-family: "UnidreamLED", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.right_sub_title {
  font-size: 0.88rem;
  color: #d8d8d8;
  line-height: 1;
  white-space: nowrap;
  background: linear-gradient(180deg, #e5be38 0%, #ff882e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

._item_full_box {
  width: 100%;
  height: 14rem;
  margin-top: 35px;
}

._item_full_box_width {
  width: 100%;
}

.row3 {
  flex: 1;
  position: relative;
}

._item_row_box3 {
  width: 12rem;
  height: 12rem;
}

._item_row_box2 {
  width: 10rem;
  margin-right: 40px;
  margin-top: 20px;
  transform: translateX(-1rem);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.box2_item,
.box2_item1,
.box2_item2,
.box2_item3,
.box2_item4,
.box2_item5 {
  position: relative;
  width: 100%;
  height: 1.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.box2_item::before,
.box2_item1::before,
.box2_item2::before,
.box2_item3::before,
.box2_item4::before,
.box2_item5::before {
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  border: 0.06rem solid #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
}

.box2_item::before {
  background: rgba(14, 227, 247, 0.58);
}

.box2_item1::before {
  background: rgba(255, 113, 94, 0.58);
}

.box2_item2::before {
  background: rgba(254, 217, 118, 0.64);
}

.box2_item3::before {
  background: rgba(234, 94, 230, 0.64);
}

.box2_item4::before {
  background: rgba(94, 225, 186, 0.58);
}

.box2_item5::before {
  background: rgba(113, 204, 78, 0.58);
}

.box2_item::after,
.box2_item1::after,
.box2_item2::after,
.box2_item3::after,
.box2_item4::after,
.box2_item5::after {
  content: attr(count);
  font-size: 1rem;
  font-weight: 600;
  color: #87c1fa;
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
}

.box2_item:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0);
}

.ring1 {
  width: 100%;
  height: 100%;
  padding-top: 1rem;
  overflow: hidden;
}

#ring {
  width: 100%;
  height: 100%;
}
.bar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.bar_chart {
  width: 100%;
  height: 100%;
}
#bar {
  width: 100%;
  height: 100%;
}
.container-last-chart{
margin-top: 8px;
}
</style>
