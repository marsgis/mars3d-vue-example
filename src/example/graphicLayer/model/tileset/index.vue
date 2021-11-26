<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">3D Tiles示例:</span>
          <mars-button @click="showQxShequDemo">倾斜摄像(某县城)</mars-button>
          <mars-button @click="showQxSimiaoDemo">倾斜摄像（某景区）</mars-button>
          <mars-button @click="showJzwHefeiDemo">城市白膜（合肥）</mars-button>
          <mars-button @click="showMaxShihuaDemo">人工建模（石化工厂）</mars-button>
          <mars-button @click="showBimQiaoliangDemo">BIM（桥梁）</mars-button>
          <mars-button @click="showBimDitiezhanDemo">BIM（地铁站）</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">相关控制:</span>
          <a-checkbox
            v-model:checked="formState.enabledShowTerrain"
            @change="bindTestTerrain"
            >深度检测</a-checkbox
          >
          <a-checkbox
            v-model:checked="formState.enabledWireframe"
            @change="bindWireframe"
            >模型三角网</a-checkbox
          >
          <a-checkbox
            v-model:checked="formState.enabledBoundbox"
            @change="bindBoundbox"
            >模型包围盒</a-checkbox
          >
          <a-checkbox
            v-model:checked="formState.enabledGfirstperson"
            @change="bindGfirstperson"
            >键盘漫游</a-checkbox
          >
          <mars-button href="editor.html?id=tileset/manager/edit" target="_blank">模型参数调试</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts" >
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledShowTerrain:boolean
  enabledWireframe: boolean
  enabledBoundbox:boolean
  enabledGfirstperson: boolean
}
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  enabledShowTerrain: false,
  enabledWireframe: false,
  enabledBoundbox: false,
  enabledGfirstperson: false
})

const bindTestTerrain = () => {
  mapWork.bindTestTerrain(formState.enabledShowTerrain)
}
const bindWireframe = () => {
  mapWork.bindWireframe(formState.enabledWireframe)
}
const bindBoundbox = () => {
  mapWork.bindBoundbox(formState.enabledBoundbox)
}
const bindGfirstperson = () => {
  mapWork.bindGfirstperson(formState.enabledGfirstperson)
}

const showQxShequDemo = () => {
  mapWork.showQxShequDemo()
}
const showQxSimiaoDemo = () => {
  mapWork.showQxSimiaoDemo()
}
const showJzwHefeiDemo = () => {
  mapWork.showJzwHefeiDemo()
}
const showMaxShihuaDemo = () => {
  mapWork.showMaxShihuaDemo()
}
const showBimQiaoliangDemo = () => {
  mapWork.showBimQiaoliangDemo()
}
const showBimDitiezhanDemo = () => {
  mapWork.showBimDitiezhanDemo()
}
</script>
<style scoped lang="less">
</style>
