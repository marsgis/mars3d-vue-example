<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-row :gutter="10">
          <a-col>
            <span>室内演示视角:</span>
          </a-col>
          <a-col>
            <a-space>
              <mars-button @click="centerAtDX1">教室</mars-button>
              <mars-button @click="centerAtDX2">走廊</mars-button>
              <mars-button @click="centerAtDX3">楼梯间</mars-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-space>
          <mars-button @click="showD1">-1F</mars-button>
          <mars-button @click="show(0.4)">1F</mars-button>
          <mars-button @click="show(3.5)">2F</mars-button>
          <mars-button @click="show(8.4)">3F</mars-button>
          <mars-button @click="show(12.4)">4F</mars-button>
          <mars-button @click="show(16.4)">5F</mars-button>
          <mars-button @click="show(100)">整体</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
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

    const showD1 = () => {
      mapWork.showD1()
    }
    const show = (item: any) => {
      mapWork.showModel(item)
    }

    const centerAtDX1 = () => {
      mapWork.centerAtDX1()
    }
    const centerAtDX2 = () => {
      mapWork.centerAtDX2()
    }
    const centerAtDX3 = () => {
      mapWork.centerAtDX3()
    }

    return {
      show,
      showD1,
      centerAtDX1,
      centerAtDX2,
      centerAtDX3
    }
  }
})
</script>
<style scoped lang="less"></style>
