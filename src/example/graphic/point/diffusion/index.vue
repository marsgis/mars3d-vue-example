<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-checkbox
          v-model:checked="formState.enabledRedSphere"
          @change="formRedSphereChange"
          >危险圈</a-checkbox
        >
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-model:checked="formState.enabledYellowSphere"
          @change="formYellowSphereChange"
          >警告圈</a-checkbox
        >
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledRedSphere: boolean,
  enabledYellowSphere: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  enabledRedSphere: true,
  enabledYellowSphere: false
})

const formRedSphereChange = () => {
  mapWork.createEllipsoid(formState.enabledRedSphere, formState.enabledYellowSphere)
}

const formYellowSphereChange = () => {
  mapWork.createEllipsoid(formState.enabledRedSphere, formState.enabledYellowSphere)
}

window.$message("加载几十万条数据，请耐心等待~")
</script>
