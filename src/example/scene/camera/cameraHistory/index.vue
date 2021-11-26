<template>
  <PannelBox class="infoView">
    <p class="f-mb">当前共有{{ formState.allLength }}条视角记录，当前正在{{ formState.nowView }}条视角</p>
    <div class="f-mb">
      <mars-button @click="lastOneView">回到当前（最后一条）</mars-button>
    </div>
    <div>
      <a-space>
        <mars-button @click="lastView">上个视图</mars-button>
        <mars-button @click="nextView">下一个视图</mars-button>
      </a-space>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState = reactive({
  allLength: 0,
  nowView: 0
})
onMounted(() => {
  mapWork.cameraHistory.on(mapWork.mars3d.EventType.change, function (event: any) {
    formState.allLength = event.count
    formState.nowView = event.index + 1
  })
})

const lastView = () => {
  mapWork.lastView()
}
const nextView = () => {
  mapWork.nextView()
}
const lastOneView = () => {
  mapWork.lastOneView()
}
</script>
