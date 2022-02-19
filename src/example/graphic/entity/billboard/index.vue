<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <layer-state />
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">数据维护:</span>
        <mars-button @click="onClickStartDraw">图上标绘</mars-button>
        <a-checkbox v-model:checked="enabledEdit" @change="onChangeHasEdit">是否编辑</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">方法演示:</span>
        <mars-button @click="btnStartBounce">开始弹跳</mars-button>
        <mars-button @click="btnStartBounce2">开始弹跳（自动停止）</mars-button>
        <mars-button @click="btnStopBounce">停止弹跳</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <data-manage />
    </div>
  </mars-pannel>
  <location-to />
</template>

<script setup lang="ts">
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import { ref, markRaw } from "vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import * as mapWork from "./map.js"

const { activate, disable, isActivate, updateWidget } = useWidget()

const onClickStartDraw = () => {
  mapWork.startDrawGraphic()
}
const btnStartBounce = () => {
  mapWork.btnStartBounce()
}
const btnStartBounce2 = () => {
  mapWork.btnStartBounce2()
}
const btnStopBounce = () => {
  mapWork.btnStopBounce()
}

// 是否编辑
const enabledEdit = ref<boolean>(false)
const onChangeHasEdit = () => {
  mapWork.updateLayerHasEdit(enabledEdit.value)
}

// 属性面板
const showEditor = (e: any) => {
  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: {
        graphic: markRaw(e.graphic)
      }
    })
  } else {
     updateWidget("graphic-editor", {
      data: {
        graphic: markRaw(e.graphic)
      }
    })
  }
}
mapWork.eventTarget.on("graphicEditor-start", async (e: any) => {
  if (enabledEdit.value) {
    showEditor(e)
  }
})
// 编辑修改了模型
mapWork.eventTarget.on("graphicEditor-update", async (e: any) => {
  showEditor(e)
})

// 停止编辑修改模型
mapWork.eventTarget.on("graphicEditor-stop", async (e: any) => {
  disable("graphic-editor")
})
</script>
