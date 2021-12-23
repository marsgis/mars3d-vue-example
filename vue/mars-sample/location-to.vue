<template>
  <pannel class="localBtn">
    <a-space>
      <mars-button @click="centerAtTerrain">定位至山区</mars-button>
      <mars-button @click="centerAtModel">定位至模型</mars-button>
    </a-space>
  </pannel>
</template>

<script>
/**
 * 公共组件：快捷定位
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { defineComponent, ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"

export default defineComponent({
  components: {
    Pannel
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
      mapWork.map.setCameraView({ lng: 114.019768, lat: 22.627935, alt: 80.6, heading: 359, pitch: -34 })
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
