<template>
  <PannelBox class="localBtn">
    <a-space>
      <mars-button @click="centerAtTerrain">定位至山区</mars-button>
      <mars-button @click="centerAtModel">定位至模型</mars-button>
    </a-space>
  </PannelBox>
</template>

<script>
/**
 * 公共组件：快捷定位
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { defineComponent, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

export default defineComponent({
  components: {
    PannelBox
  },
  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork

    // let modelTest
    //  定位至山区
    const centerAtTerrain = () => {
      mapWork.map.setCameraView({ lat: 30.859414, lng: 116.28709, alt: 8617, heading: 18, pitch: -28 })
    }

    // 定位至模型
    const centerAtModel = () => {
      mapWork.centerAtModel()
      mapWork.map.setCameraView({ lat: 33.590452, lng: 119.032184, alt: 185, heading: 359, pitch: -34 })
    }

    return {
      centerAtTerrain,
      centerAtModel
    }
  }
})
</script>
<style lang="less" scoped>
.localBtn {
  bottom: 40px;
  right: 10px;
}
</style>
