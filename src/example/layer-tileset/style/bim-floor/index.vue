<template>
  <div class="bim_dialog">
    <div class="bim_dialog_content">
      <div class="btn" :class="{'active': activeIndex === 5}" @click="show(5)">5F</div>
      <div class="btn" :class="{'active': activeIndex === 4}" @click="show(4)">4F</div>
      <div class="btn" :class="{'active': activeIndex === 3}" @click="show(3)">3F</div>
      <div class="btn" :class="{'active': activeIndex === 2}" @click="show(2)">2F</div>
      <div class="btn" :class="{'active': activeIndex === 1}" @click="show(1)">1F</div>
      <div class="btn" :class="{'active': activeIndex === -1}" @click="minusOne()">-1F</div>
      <div class="btn" :class="{'active': activeIndex === 100}" @click="showAll">整体</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const activeIndex = ref(1)

// 负一层
const minusOne = () => {
  activeIndex.value = -1
  mapWork.minusOne()
}
const showAll = () => {
  activeIndex.value = 100
  mapWork.showAll()
}
const show = (item: any) => {
  activeIndex.value = item
  mapWork.show(item)
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
.bim_dialog {
  position: absolute;
  right:10px;
  top:10px;
  width:46px;
  box-sizing: border-box;
  z-index: 999 !important;
  box-shadow: var(--mars-base-shadow) !important;

  .mars-drop-bg();
  padding: 1px !important;
  background: var(--mars-base-border);
  border-radius: 4px !important;
  backdrop-filter: blur(10px);

  .bim_dialog_content {
    height: 100%;
    padding: 0px;
    overflow: auto;
    border-radius: 4px;
    background-color: var(--mars-dropdown-bg);

    .btn {
      cursor: pointer;
      width:44px;
      height:45px;
      text-align: center;
      line-height: 45px;
      border-bottom: 1px solid;
      border-image:linear-gradient(90deg,transparent, rgba(255, 255, 255, 0.4), transparent) 1;
      &:last-child {
        border-bottom: 0px;
      }
      &:hover {
        background-color: rgba(51, 133, 255, 1);
      }
    }

    .active {
      background-color: rgba(51, 133, 255, 1);
    }
  }

}
</style>
