<template>
  <PannelBox class="infoView">
    <a-form-item>
      <a-space>
        <span class="pannel-item-label">整体控制:</span>
        <mars-button @click="openFloorModel">展开</mars-button>
        <mars-button @click="mergeFloorModel">合并</mars-button>
        <mars-button @click="resetModel">还原</mars-button>
      </a-space>
    </a-form-item>

    <a-form-item>
      <a-space>
        <span class="pannel-item-label">显示指定:</span>
        <div class="floorModel" :key="item" v-for="(item,index) in floorModel">
          <mars-button @click="showFloorModel(index)">{{item}}</mars-button>
        </div>
      </a-space>
    </a-form-item>
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

    const openFloorModel = () => {
      mapWork.openFloorModel()
    }
    const mergeFloorModel = () => {
      mapWork.mergeFloorModel()
    }
    const resetModel = () => {
      mapWork.resetModel()
    }
    const showFloorModel = (floorNum:number) => {
      mapWork.showFloorModel(floorNum + 1)
    }
    return {
      floorModel: ["一楼", "二楼", "三楼", "四楼", "五楼", "六楼", "七楼", "八楼", "九楼", "顶楼"],
      openFloorModel,
      mergeFloorModel,
      resetModel,
      showFloorModel
    }
  }
})
</script>
<style scoped lang="less">
.floorModel{
  display: inline-block;
}
.pannel-item-label{
  display: inline-block;
}
</style>
