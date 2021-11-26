<template>
  <PannelBox class="infoView">
    <a-space>
      <span>夸张程度:</span>
      <a-slider :min="1" :max="50" v-model:value="formState.terrainExaggeration" @change="formStateChange" />
    </a-space>
  </PannelBox>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  terrainExaggeration: number
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
const formState: UnwrapRef<FormState> = reactive({
  terrainExaggeration: 10
})

const formStateChange = () => {
  mapWork.changeTerrain(formState.terrainExaggeration)
}
</script>
<style scoped lang="less">
.ant-slider{
  width: 100px;
}
</style>
