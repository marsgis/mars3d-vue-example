<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <mars-button @click="setStyle1">原始</mars-button>
          <mars-button @click="setStyle2">按高度着色</mars-button>
          <span>按颜色着色:</span>
          <mars-color-picker @change="selectColor" v-model:value="formState.color" />
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  color: string
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  color: "#4B61E1"
})

const setStyle1 = () => {
  mapWork.setStyle1()
}
const setStyle2 = () => {
  mapWork.setStyle2()
}
const selectColor = () => {
  mapWork.selectColor(formState.color)
}
</script>
