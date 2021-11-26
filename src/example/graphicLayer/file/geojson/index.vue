<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="showDrawDemo">标绘数据</mars-button>
      <mars-button @click="showPointDemo">体育设施点</mars-button>
      <mars-button @click="showChinaLineDemo">省界线</mars-button>
      <mars-button @click="showAnhuiDemo">合肥区域面</mars-button>
      <mars-button @click="showAnhui2Demo">合肥边界墙</mars-button>
      <mars-button @click="showGuihuaDemo">规划面</mars-button>
      <mars-button @click="showWorldDemo">世界各国</mars-button>
      <mars-button @click="showJianzhuwuDemo">立体建筑物</mars-button>
      <mars-button @click="showJianzhuwuFcDemo">分层分户楼栋</mars-button>
      <mars-button @click="showDantihuaDemo">单体化面</mars-button>
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

    const showDrawDemo = () => {
      mapWork.showDrawDemo(true)
    }
    const showPointDemo = () => {
      mapWork.showPointDemo()
    }
    const showChinaLineDemo = () => {
      mapWork.showChinaLineDemo()
    }
    const showAnhuiDemo = () => {
      mapWork.showAnhuiDemo()
    }
    const showAnhui2Demo = () => {
      mapWork.showAnhui2Demo()
    }
    const showGuihuaDemo = () => {
      mapWork.showGuihuaDemo()
    }
    const showWorldDemo = () => {
      mapWork.showWorldDemo()
    }
    const showJianzhuwuDemo = () => {
      mapWork.showJianzhuwuDemo()
    }
    const showJianzhuwuFcDemo = () => {
      mapWork.showJianzhuwuFcDemo()
    }
    const showDantihuaDemo = () => {
      mapWork.showDantihuaDemo()
    }

    return {
      showDrawDemo,
      showPointDemo,
      showChinaLineDemo,
      showAnhuiDemo,
      showAnhui2Demo,
      showGuihuaDemo,
      showWorldDemo,
      showJianzhuwuDemo,
      showJianzhuwuFcDemo,
      showDantihuaDemo
    }
  }
})
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
