<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <mars-button @click="addVideo">投射视频</mars-button>
          <mars-button @click="addImg">投射图片</mars-button>
          <mars-button @click="clear">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">视角水平张角:</span>
          <a-slider @change="updateParams" v-model:value="angleValue" :min="1" :max="179" :step="1" />当前值：{{ angleValue }}
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">视角宽高比例:</span>
          <a-slider @change="updateParams" v-model:value="scaleValue" :min="1" :max="3.0" :step="0.2" />当前值：{{ scaleValue }}
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">视角距离:</span>
          <a-slider @change="updateParams" v-model:value="distanceValue" :min="1" :max="200" :step="1" />当前值：{{ distanceValue }}
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">视频位置:</span>
          <mars-button @click="selCamera">图上选点:</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">键盘微调:</span>
          <mars-input-number :min="0.001" :max="2" :step="0.001" v-model:value="adjustVal"></mars-input-number>
          <a-checkbox @change="cameraFollow" v-model:checked="checked">相机跟随</a-checkbox>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">视频角度:</span>
          <a-slider @change="rotateDeg" v-model:value="videoRotate" :min="0" :max="360" :step="1" />当前值：{{ videoRotate }}
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">视椎框线:</span>
          <a-checkbox @change="showFrustum" v-model:checked="ckdFrustum">是否显示</a-checkbox>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <mars-button @click="playOrpause">播放暂停</mars-button>
          <mars-button @click="locate">定位至视频位置</mars-button>
          <mars-button @click="printParameters">打印参数</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const checked = ref<boolean>(false)

const ckdFrustum = ref<boolean>(true)

const adjustVal = ref<number>(0.5)

const angleValue = ref<number>(50)

const scaleValue = ref<number>(2)

const distanceValue = ref<number>(70)

const videoRotate = ref<number>(0)

mapWork.adjustVal = adjustVal.value
// 参数更新
const updateParams = () => {
  mapWork.updateParams(angleValue.value, scaleValue.value, distanceValue.value)
}

const cameraFollow = () => {
  mapWork.cameraFollowVal = checked.value
}

// 投射视频
const addVideo = () => {
  mapWork.addVideo()
}
// 投射图片
const addImg = () => {
  mapWork.addImg()
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

// 视频位置
const selCamera = () => {
  mapWork.selCamera()
}
// 线框是否显示
const showFrustum = () => {
  mapWork.showFrustum(ckdFrustum.value)
}

// 视频角度
const rotateDeg = () => {
  mapWork.rotateDeg(videoRotate.value)
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
