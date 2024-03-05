<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span>原始数据:</span>
        <mars-button class="btn" @click="randomPoints">随机点</mars-button>
        <mars-button danger class="btn" @click="clearAll">清除</mars-button>
      </a-space>
    </div>

    <!-- <a-space>
    </a-space> -->
    <div class="compute">
      <span class="label">相关计算:</span>
      <div class="btn_container">
        <mars-button class="btn"  @click="convexPolygon">计算包围面</mars-button>
        <mars-button class="btn btn_voronoiPolygon"  @click="voronoiPolygon">计算泰森多边形</mars-button>
        <mars-button class="btn btn_tinPolygon"  @click="tinPolygon">计算TIN多边形</mars-button>
      </div>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

// 随机点
const randomPoints = () => {
  mapWork.randomPoints()
}

// 清除
const clearAll = () => {
  mapWork.clearlayer()
}

// 计算包围面
const convexPolygon = () => {
  mapWork.convexPolygon()
}

// 计算泰森多边形
const voronoiPolygon = () => {
  mapWork.voronoiPolygon()
}

// 计算TIN多边形
const tinPolygon = () => {
  mapWork.tinPolygon()
}
</script>
<style scoped lang="less">
  .btn {
    width: 112px;
  }
  .compute {
    display: flex;
    justify-content: space-between;
    .label {
      margin-top:6px;
    }
    .btn_container {
      width:232px;
      .btn_voronoiPolygon {
        margin-left: 8px
      }
      .btn_tinPolygon {
        margin-top: 8px
      }
    }
  }

  :deep(.ant-btn) {
    padding: 0px;
  }
</style>
