<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="startRotate">开始</mars-button>
      <mars-button @click="stopRotate">停止</mars-button>
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
  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    // 随机点
    const startRotate = () => {
      mapWork.startRotate()
    }
    // 清除
    const stopRotate = () => {
      mapWork.stopRotate()
    }
    return {
      startRotate,
      stopRotate
    }
  }
})
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
