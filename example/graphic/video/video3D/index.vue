<template>
  <pannel class="infoView">
    <div class="f-tac">
      <a-space>
        <mars-button @click="createViewForVideo">视频投放</mars-button>
        <mars-button @click="createViewForPicture">图片投放</mars-button>
        <mars-button @click="createText">文本投放</mars-button>
        <mars-button @click="createViewForColor">颜色投放</mars-button>
        <mars-button @click="clear">清除</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">混合系数:</span>
        <a-slider @change="opacity" v-model:value="opacityValue" :min="0" :max="1" :step="0.1" />调整透明度
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">水平拉伸:</span>
        <a-slider @change="cameraFov" v-model:value="fovValue" :min="30" :max="120" :step="0.1" />调整水平拉伸
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">宽高比例:</span>
        <a-slider @change="cameraWidHei" v-model:value="scaleValue" :min="0.5" :max="3" :step="0.05" />调整垂直拉伸
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">视椎框线:</span>
        <a-checkbox @change="showFrustum" v-model:checked="ckdFrustum">是否显示</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">调整位置:</span>
        <mars-button @click="selCamera">相机</mars-button>
        <mars-button @click="selView">视点</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">键盘微调:</span>
        <mars-input-number :min="0.001" :max="2" :step="0.001" v-model:value="adjustVal"></mars-input-number>
        <a-checkbox @change="cameraFollow" v-model:checked="checked">相机跟随</a-checkbox>
      </a-space>
    </div>

    <div class="f-tac">
      <a-space>
        <mars-button @click="playOrpause">播放暂停</mars-button>
        <mars-button @click="locate">返回相机视点</mars-button>
        <mars-button @click="printParameters">打印参数</mars-button>
      </a-space>
    </div>
  </pannel>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const checked = ref<boolean>(false)

const ckdFrustum = ref<boolean>(true)

const adjustVal = ref<number>(0.5)

const opacityValue = ref<number>(0.7) // 透明度

const fovValue = ref<number>(45) // 水平拉伸

const scaleValue = ref<number>(1.6) // 宽高比例

onMounted(() => {
  mapWork.bindEvnet(adjustVal.value)
})

// 混合系数
const opacity = () => {
  mapWork.opacity(opacityValue.value)
}
// 水平拉伸
const cameraFov = () => {
  mapWork.cameraFov(fovValue.value)
}
// 宽高比例
const cameraWidHei = () => {
  mapWork.cameraWidHei(scaleValue.value)
}

// 相机是否跟随
const cameraFollow = () => {
  mapWork.cameraFollow(checked.value)
}

// 投射视频
const createViewForVideo = () => {
  mapWork.createViewForVideo(ckdFrustum.value, opacityValue.value)
}

// 图片投放
const createViewForPicture = () => {
  mapWork.createViewForPicture(ckdFrustum.value, opacityValue.value)
}

// 文本投放
const createText = () => {
  mapWork.createText(ckdFrustum.value, opacityValue.value)
}
// 颜色投放
const createViewForColor = () => {
  mapWork.createViewForColor(ckdFrustum.value, opacityValue.value)
}

// 清除
const clear = () => {
  mapWork.clearVideo()
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

// 视频位置
const selCamera = () => {
  mapWork.selCamera()
}

// 视点

const selView = () => {
  mapWork.selView()
}

// 线框是否显示
const showFrustum = () => {
  mapWork.showFrustum(ckdFrustum.value)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 160px;
}
.pannel-item-label {
  width: 100px;
}
</style>
