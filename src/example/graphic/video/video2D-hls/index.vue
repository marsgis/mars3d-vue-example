<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <layer-state />
    </div>

    <div class="f-tac f-mb">
      <a-space>
        <mars-button @click="addVideo">绘制投射视频</mars-button>
        <mars-button @click="addThisCamera">按当前相机投射视频</mars-button>
        <mars-button @click="clear">清除</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">相机位置:</span>
        <mars-button @click="selCamera">鼠标图上点选(相机位置)</mars-button>
      </a-space>
    </div>

    <mars-gui :options="options" ref="marsGuiRef"></mars-gui>

    <div class="f-tac">
      <a-space>
        <mars-button @click="onClickSelView">图上选点</mars-button>
        <mars-button @click="playOrpause">播放暂停</mars-button>
        <mars-button @click="locate">返回相机视点</mars-button>
        <mars-button @click="printParameters">打印参数</mars-button>
      </a-space>
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
import { nextTick, ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"

const marsGuiRef = ref()
const options: GuiItem[] = [
  {
    type: "slider",
    field: "cameraAngle",
    label: "水平张角",
    step: 0.1,
    min: 1,
    max: 60,
    value: 46.3,
    change(data) {
      mapWork.onChangeAngle(data)
      marsGuiRef.value.updateField("cameraAngle", data)
    }
  },
  {
    type: "slider",
    field: "cameraAngle2",
    label: "垂直张角",
    step: 0.1,
    min: 10,
    max: 30,
    value: 15.5,
    change(data) {
      mapWork.onChangeAngle2(data)
      marsGuiRef.value.updateField("cameraAngle2", data)
    }
  },
  {
    type: "slider",
    field: "distanceValue",
    label: "投射距离",
    step: 0.1,
    min: 1,
    max: 1000,
    value: 78,
    change(data) {
      mapWork.onChangeDistance(data)
      marsGuiRef.value.updateField("distanceValue", data)
    }
  },
  {
    type: "slider",
    field: "heading",
    label: "四周方向",
    step: 0.1,
    min: 0,
    max: 360,
    value: 178.5,
    change(data) {
      mapWork.onChangeHeading(data)
      marsGuiRef.value.updateField("heading", data)
    }
  },
  {
    type: "slider",
    field: "pitchValue",
    label: "俯仰角度",
    step: 0.1,
    min: -180,
    max: 180,
    value: 8.2,
    change(data) {
      mapWork.onChangePitch(data)
      marsGuiRef.value.updateField("pitchValue", data)
    }
  },
  {
    type: "switch",
    field: "ckdFrustum",
    label: "显示视椎框线",
    value: true,
    change(data) {
      mapWork.showFrustum(data)
      marsGuiRef.value.updateField("ckdFrustum", data)
    }
  },
  {
    type: "slider",
    field: "opcity",
    label: "视频透明度",
    step: 0.1,
    min: 0,
    max: 1,
    value: 1,
    change(data) {
      mapWork.onChangeOpacity(data)
      marsGuiRef.value.updateField("opcity", data)
    }
  },
  {
    type: "slider",
    field: "videoRotate",
    label: "视频角度",
    step: 1,
    min: 0,
    max: 360,
    value: 0,
    change(data) {
      mapWork.rotateDeg(data)
      marsGuiRef.value.updateField("videoRotate", data)
    }
  }
]

mapWork.eventTarget.on("loadVideo", (e) => {
  const data = e.value
  nextTick(() => {
    marsGuiRef.value.updateFields({
      ckdFrustum: data.ckdFrustum, // 是否显示视椎线
      cameraAngle: data.cameraAngle, // 水平角度
      cameraAngle2: data.cameraAngle2, // 垂直角度
      distanceValue: data.distanceValue, // 投射距离
      pitchValue: data.pitchValue, // 俯仰角度
      opcity: data.opcity, // 透明度
      heading: data.heading // 四周距离
    })
  })
})

// 视频位置
const selCamera = () => {
  mapWork.selCamera()
}

const onClickSelView = () => {
  mapWork.onClickSelView()
}

// 投射视频
const addVideo = () => {
  mapWork.addVideo(marsGuiRef.value.getValues())
}
// 按当前相机投射视频
const addThisCamera = () => {
  mapWork.addThisCamera(marsGuiRef.value.getValues())
}

// 清除
const clear = () => {
  mapWork.clear()
}

// 定位至视频位置
const locate = () => {
  mapWork.locate()
}
// 打印参数
const printParameters = () => {
  mapWork.printParameters()
}

// 播放暂停
const playOrpause = () => {
  mapWork.playOrpause()
}
</script>
<style scoped lang="less">
:deep(.mars-slider) {
  width: 90% !important;
}
:deep(.mars-pannel-item-label) {
  width: 99px;
  margin-right: 3px;
}
</style>
