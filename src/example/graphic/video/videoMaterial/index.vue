<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">标绘:</span>
          <mars-button @click="drawRectangle">贴地矩形</mars-button>
          <mars-button @click="drawPolygon">贴地面</mars-button>
          <mars-button @click="clampDrawPolygon">立体面</mars-button>
          <mars-button @click="clear">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">方向:</span>
          <a-slider @change="angleChange" v-model:value="angleValue" :min="0" :max="360" :step="1" />当前值：{{ angleValue }}
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">状态:</span>
          <mars-button @click="videoPlay">播放</mars-button>
          <mars-button @click="videoStop">暂停</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

export default defineComponent({
  components: {
    PannelBox
  },

  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    const angleValue = ref<number>(0) // y轴方向

    const angleChange = () => {
      mapWork.angleChange(angleValue.value)
    }

    // 绘制矩形
    const drawRectangle = () => {
      mapWork.drawRectangle()
    }
    // 绘贴地制面
    const drawPolygon = () => {
      mapWork.drawPolygon(true)
    }

    // 绘制立体面
    const clampDrawPolygon = () => {
      mapWork.drawPolygon(false)
    }

    // 清除
    const clear = () => {
      mapWork.removeAll()
    }

    const videoPlay = () => {
      mapWork.videoPlay()
    }
    const videoStop = () => {
      mapWork.videoStop()
    }

    return {
      angleChange,
      drawRectangle,
      clampDrawPolygon,
      drawPolygon,
      clear,
      videoPlay,
      videoStop,
      angleValue
    }
  }
})
</script>
<style scoped lang="less">
.ant-slider {
  width: 160px;
}
</style>
