/* eslint-disable vue/require-v-for-key */
<template>
  <PannelBox class="infoView">
    <a-form>
      <a-from-itm> Tip: The default language is Chinese中文简体, you can switch to English, etc. </a-from-itm>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">Plot:</span>
          <mars-button :key="item" v-for="item in typeArrPlot" @click="startDraw(item)">
            {{ item }}
          </mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">Measurement:</span>
          <mars-button size="middle" @click="distance">distance</mars-button>
          <mars-button size="middle" @click="area">area</mars-button>
          <mars-button size="middle" @click="height">height</mars-button>
          <mars-button size="middle" @click="coordinate">coordinate</mars-button>
          <mars-button size="middle" @click="angle">ditance</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts" setup>
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
const typeArrPlot = ["point", "polyline", "polygon", "circle", "rectangle", "wall", "cylinder"]

const startDraw = (e: any) => {
  mapWork.startDraw(e)
}
const distance = () => {
  mapWork.measure.distance()
}
const area = () => {
  mapWork.measure.area()
}
const height = () => {
  mapWork.measure.heightTriangle()
}
const coordinate = () => {
  mapWork.measure.point()
}
const angle = () => {
  mapWork.measure.angle()
}
</script>
<style scoped lang="less"></style>
