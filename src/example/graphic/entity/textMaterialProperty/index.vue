<template>
  <mars-pannel class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <mars-button @click="onClickDrawWall">竖立墙</mars-button>
          <mars-button @click="onClickDrawRectangle">贴地矩形</mars-button>
          <mars-button title="根据中心点和长宽来计算矩形" @click="onClickDrawPoint">贴地矩形2</mars-button>
          <mars-button @click="removeAll">清除</mars-button>
        </a-space>
      </a-form-item>
      <a-form-item label="方向">
        <a-slider v-model:value="formState.slideStep" @change="onChangeSlider" :min="0" :max="360" :step="1" />
      </a-form-item>
      <a-form-item label="文字">
        <a-space>
          <mars-input v-model:value="formState.inputText" />
          <mars-button @click="onClickSure">确定</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </mars-pannel>
  <GraphicEditor ref="editor" />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import GraphicEditor from "@/components/mars-sample/graphic-editor/index.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  slideStep: number
  inputText: string
}

const formState: UnwrapRef<FormState> = reactive({
  slideStep: 0,
  inputText: "Mars3D 火星科技 2017"
})

const onChangeSlider = () => {
  mapWork.onChangeSlider(formState.slideStep)
}

const onClickDrawWall = () => {
  mapWork.onClickDrawWall()
}
const onClickDrawRectangle = () => {
  mapWork.onClickDrawRectangle()
}
const onClickDrawPoint = () => {
  mapWork.onClickDrawPoint()
}
const removeAll = () => {
  mapWork.removeAll()
}
const onClickSure = () => {
  mapWork.onClickSure(formState.inputText)
}

// 属性面板
const editor = ref()
mapWork.eventTarget.on("graphicEditor-start", async (e: any) => {
  const result = await editor.value.setValue(e.graphic)
  if (result) {
    editor.value.showEditor()
  }
})
// 编辑修改了模型
mapWork.eventTarget.on("graphicEditor-update", async (e: any) => {
  const result = await editor.value.setValue(e.graphic)
  if (result) {
    editor.value.showEditor()
  }
})
// 停止编辑修改模型
mapWork.eventTarget.on("graphicEditor-stop", async (e: any) => {
  editor.value.hideEditor()
})
</script>
