<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="viewAircraft">跟踪视角</mars-button>
      <mars-button @click="viewTopDown">上方视角</mars-button>
      <mars-button @click="viewSide">侧方视角</mars-button>
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

    const viewAircraft = () => {
      mapWork.viewAircraft()
    }

    const viewTopDown = () => {
      mapWork.viewTopDown()
    }

    const viewSide = () => {
      mapWork.viewSide()
    }

    return {
      viewAircraft,
      viewTopDown,
      viewSide
    }
  }
})
</script>
