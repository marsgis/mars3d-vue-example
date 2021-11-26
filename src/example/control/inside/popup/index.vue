<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="bindMapDemo">Map上直接弹出</mars-button>
      <mars-button @click="bindLayerDemo">图层上绑定</mars-button>
      <mars-button @click="bindLayerDemo2">图层上预定义配置</mars-button>
      <mars-button @click="bindLayerTemplateDemo">自定义模版</mars-button>

      <mars-button @click="bindGraphicDemo1">Graphic上绑定</mars-button>
      <mars-button @click="bindGraphicDemo2">Graphic上局部刷新</mars-button>
    </a-space>
  </PannelBox>
  <PannelBox class="history-layer" type="model" title="查看历史" v-model:visible="showLayer">
    <iframe src="http://marsgis.cn/" frameborder="0"></iframe>
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

export default defineComponent({
  components: {
    PannelBox
  },
  setup () {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    const showLayer = ref()
    onMounted(() => {
      mapWork.showTarget.on("showTF", function(event:any) {
        console.log("对象", event)
        showLayer.value = event.showHistoryLayer
      })
    })

    const bindMapDemo = () => {
      mapWork.bindMapDemo()
    }

    const bindLayerDemo = () => {
      mapWork.bindLayerDemo()
    }

    const bindLayerDemo2 = () => {
      mapWork.bindLayerDemo2()
    }

    const bindLayerTemplateDemo = () => {
      mapWork.bindLayerTemplateDemo()
    }

    const bindGraphicDemo1 = () => {
      mapWork.bindGraphicDemo1()
    }

    const bindGraphicDemo2 = () => {
      mapWork.bindGraphicDemo2()
    }
    return {
      bindMapDemo,
      bindLayerDemo,
      bindLayerDemo2,
      bindLayerTemplateDemo,
      bindGraphicDemo1,
      bindGraphicDemo2,
      showLayer
    }
  }
})
</script>
<style scoped lang="less">
.history-layer{
  width: 100%;
  height: 90%;
  top: 70px;
  left:0;
  overflow: hidden;
}
.ant-space {
  display: grid;
}
</style>
