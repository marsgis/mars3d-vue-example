<template>
  <PannelBox class="infoView">
    <a-space>
      <span class="pannel-item-label">框选数据:</span>
      <mars-button @click="drawRectangle">矩形</mars-button>
      <mars-button @click="drawPolygon">面</mars-button>
      <mars-button @click="drawCircle">圆</mars-button>
      <mars-button @click="removeAll">清除</mars-button>
    </a-space>
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

export default defineComponent({
  components: {
    PannelBox
  },
  setup () {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    const drawRectangle = () => {
      mapWork.drawRectangle()
    }

    const drawPolygon = () => {
      mapWork.drawPolygon()
    }

    const drawCircle = () => {
      mapWork.drawCircle()
    }

    const removeAll = () => {
      mapWork.removeAll()
    }
    return {
      drawRectangle,
      drawPolygon,
      drawCircle,
      removeAll
    }
  }
})
</script>
<style scoped lang="less">
.pannel-item-label{
  width: 60px;
}
</style>
