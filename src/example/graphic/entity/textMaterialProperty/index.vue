<template>
  <mars-pannel :visible="true" right="10" top="10">
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
        <mars-slider v-model:value="formState.slideStep" @change="onChangeSlider" :min="0" :max="360" :step="1" />
      </a-form-item>
      <a-form-item label="文字">
        <a-space>
          <mars-input v-model:value="formState.inputText" />
          <mars-button @click="onClickSure">确定</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </mars-pannel>
</template>

<script setup lang="ts">
import { reactive, markRaw } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"
import { useWidget } from "@mars/widgets/common/store/widget"

const { activate, disable, isActivate, updateWidget } = useWidget()

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
const showEditor = (e: any) => {
  const graphic = e.graphic
  if (!graphic._conventStyleJson) {
    graphic.options.style = graphic.toJSON().style // 因为示例中的样式可能有复杂对象，需要转为单个json简单对象
    graphic._conventStyleJson = true // 只处理一次
  }

  if (!isActivate("graphic-editor")) {
    activate({
      name: "graphic-editor",
      data: { graphic: graphic }
    })
  } else {
    updateWidget("graphic-editor", {
      data: { graphic: graphic }
    })
  }
}

mapWork.eventTarget.on("graphicEditor-start", async (e: any) => {
  showEditor(e)
})
// 编辑修改了模型
mapWork.eventTarget.on("graphicEditor-update", async (e: any) => {
  showEditor(e)
})

// 停止编辑修改模型
mapWork.eventTarget.on("graphicEditor-stop", async (e: any) => {
  setTimeout(() => {
    if (!mapWork.graphicLayer.isEditing) {
      disable("graphic-editor")
    }
  }, 100)
})
</script>
