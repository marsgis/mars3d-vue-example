<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="viewSeeTop">顶视图</mars-button>
      <mars-button @click="viewSeeCe">侧视图</mars-button>
      <mars-button @click="viewSeeHome">主视图</mars-button>
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

    const viewSeeTop = () => {
      mapWork.viewSeeTop()
    }

    const viewSeeCe = () => {
      mapWork.viewSeeCe()
    }

    const viewSeeHome = () => {
      mapWork.viewSeeHome()
    }

    return {
      viewSeeTop,
      viewSeeCe,
      viewSeeHome
    }
  }
})
</script>
