<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">视椎体状态:</span>
        <mars-button @click="locate">定位至卫星</mars-button>
        <mars-button @click="selPoint(formState.enabledSee)">{{ formState.enabledSee ? "取消凝视" : "凝视" }}</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">类型:</span>
        <a-radio-group v-model:value="value" name="radioGroup" @change="chkSensorType">
          <a-radio value="1">圆锥体</a-radio>
          <a-radio value="2">四棱锥体</a-radio>
        </a-radio-group>
      </a-space>
    </div>

    <!-- <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">前后侧摆:</span>
        <mars-slider @change="pitchChange" v-model:value="pitchValue" :min="-180" :max="180" :step="1" />值{{ pitchValue }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">左右侧摆:</span>
        <mars-slider @change="rollChange" v-model:value="rollValue" :min="-180" :max="180" :step="1" />值{{ rollValue }}
      </a-space>
    </div> -->

    <div class="f-push-15-b">
      <a-space align="center">
        <span class="mars-pannel-item-label">heading值:</span>
        <mars-switch v-model:checked="formState.customHeading" @change="changeAutoHeading" />
        <mars-slider v-if="formState.customHeading" class="sliderlen" @change="updateHeading"
          v-model:value="formState.slideHeadingStep" :min="0" :max="360" :step="0.01" />
        <span class="mars-text" v-if="!formState.customHeading"> 根据路线自动 </span>
      </a-space>
    </div>

    <div class="f-push-15-b">
      <a-space>
        <span class="mars-pannel-item-label">pitch值:</span>
        <mars-switch v-model:checked="formState.customPitch" @change="changeAutoPitch" />
        <mars-slider v-if="formState.customPitch" class="sliderlen" @change="updatePitch"
          v-model:value="formState.slidePitchStep" :min="0" :max="360" :step="0.01" />
        <span class="mars-text" v-if="!formState.customPitch"> 根据路线自动 </span>
      </a-space>
    </div>

    <div class="f-push-15-b">
      <a-space>
        <span class="mars-pannel-item-label">roll值:</span>
        <mars-switch v-model:checked="formState.customRoll" @change="changeAutoRoll" />
        <mars-slider v-if="formState.customRoll" class="sliderlen" @change="updateRoll"
          v-model:value="formState.slideRollStep" :min="0" :max="360" :step="0.01" />
        <span class="mars-text" v-if="!formState.customRoll"> 根据路线自动 </span>
      </a-space>
    </div>

    <div class="f-push-15-b">
      <a-space>
        <span class="mars-pannel-item-label">夹角1:</span>
        <mars-slider @change="angle1" v-model:value="angleValue1" :min="1" :max="89" :step="0.01" /><span
          class="mars-text">值{{ angleValue1 }}</span>
      </a-space>
    </div>

    <div class="f-push-15-b" v-if="value === '2'">
      <a-space>
        <span class="mars-pannel-item-label">夹角2:</span>
        <mars-slider @change="angle2" v-model:value="angleValue2" :min="1" :max="89" :step="0.01" /> <span
          class="mars-text">值{{ angleValue2 }}</span>
      </a-space>
    </div>

    <div class="f-push-15-b">
      <a-space>
        <span class="mars-pannel-item-label">参考系轴:</span>
        <a-checkbox v-model:checked="formState.enabledShowMatrix" @change="chkShowModelMatrix">显示/隐藏</a-checkbox>
      </a-space>
    </div>
  </mars-dialog>

  <mars-dialog :visible="true" right="10" top="348" width="330">
    <div class="time">
      <span class="time-title">时间</span>
      <span class="time-num"> {{ formState.time }}</span>
    </div>

    <div class="postions">
      <a-space>
        <div class="postions-lng">
          <p class="mars-td-text">{{ formState.td_jd }}</p>
          <p class="mars-td-name">经度</p>
        </div>

        <div class="postions-lat">
          <p class="mars-td-text">{{ formState.td_wd }}</p>
          <p class="mars-td-name">纬度</p>
        </div>

        <div class="postions-alt">
          <p class="mars-td-text">{{ formState.td_gd }}</p>
          <p class="mars-td-name">高程</p>
        </div>
      </a-space>

    </div>

    <div class="tle">
      <div class="tle-1">
        <p class="mars-text">{{ formState.tle1 }}</p>
        <p class="mars-td-name">TLE1</p>
      </div>
      <div class="tle-2">
        <p class="mars-text">{{ formState.tle2 }}</p>
        <p class="mars-td-name">TLE2</p>
      </div>

    </div>
    <div class="name f-push-10-t">
      <span class="time-title">名称</span>
      <span class="time-num"> {{ formState.name }}</span>
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  enabledShowMatrix: boolean // 参考轴系
  enabledSee: boolean
  name: string
  tle1: string
  tle2: string
  time: string
  td_jd: number
  td_wd: number
  td_gd: string

  customHeading: boolean
  slideHeadingStep: number
  customPitch: boolean
  slidePitchStep: number
  customRoll: boolean
  slideRollStep: number
}

const value = ref<string>("2")
const angleValue1 = ref<number>(30)
const angleValue2 = ref<number>(20)

const formState: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  enabledSee: false,
  name: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: "0米",

  customHeading: false,
  slideHeadingStep: 0,
  customPitch: false,
  slidePitchStep: 0,
  customRoll: false,
  slideRollStep: 0
})

mapWork.eventTarget.on("satelliteChange", function (event: any) {
  const nowData = event.weixinData
  formState.name = nowData.name
  formState.tle1 = nowData.tle1
  formState.tle2 = nowData.tle2
  formState.time = nowData.time
  formState.td_jd = nowData.td_jd
  formState.td_wd = nowData.td_wd
  formState.td_gd = nowData.td_gd
})


const changeAutoHeading = () => {
  if (formState.customHeading) {
    updateHeading()
  } else {
    if (mapWork.weixin.model) {
      mapWork.weixin.model.heading = undefined
    } else {
      mapWork.weixin.heading = undefined
    }
  }
}
const updateHeading = () => {
  if (mapWork.weixin.model) {
    mapWork.weixin.model.heading = formState.slideHeadingStep
  } else {
    mapWork.weixin.heading = formState.slideHeadingStep
  }
}

const changeAutoPitch = () => {
  if (formState.customPitch) {
    updatePitch()
  } else {
    if (mapWork.weixin.model) {
      mapWork.weixin.model.pitch = undefined
    } else {
      mapWork.weixin.pitch = undefined
    }
  }
}
const updatePitch = () => {
  if (mapWork.weixin.model) {
    mapWork.weixin.model.pitch = formState.slidePitchStep
  } else {
    mapWork.weixin.pitch = formState.slidePitchStep
  }
}

const changeAutoRoll = () => {
  if (formState.customPitch) {
    updateRoll()
  } else {
    if (mapWork.weixin.model) {
      mapWork.weixin.model.roll = undefined
    } else {
      mapWork.weixin.roll = undefined
    }
  }
}
const updateRoll = () => {
  if (mapWork.weixin.model) {
    mapWork.weixin.model.roll = formState.slideRollStep
  } else {
    mapWork.weixin.roll = formState.slideRollStep
  }
}
// 夹角
const angle1 = () => {
  mapWork.angle1(angleValue1.value)
}

const angle2 = () => {
  mapWork.angle2(angleValue2.value)
}

// 定位至卫星
const locate = () => {
  mapWork.locate()
}

// 凝视目标
const selPoint = (texShow: boolean) => {
  formState.enabledSee = !texShow
  if (!texShow) {
    mapWork.selPoint()
  }
  mapWork.selPoint()
}

// 参考轴系显示与隐藏
const chkShowModelMatrix = () => {
  mapWork.chkShowModelMatrix(formState.enabledShowMatrix)
}

// 类型选择
const chkSensorType = () => {
  mapWork.chkSensorType(value.value)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 142px;
}

.mars-button {
  width: 100px;
}

.mars-pannel-item-label {
  min-width: 75px;
}


.sliderlen {
  margin-top: 4px;
  width: 160px;

}

.mars-text {
  color: rgba(234, 242, 255, 0.5);
}

.mars-td-text {
  display: inline-block;
  margin-top: 10px;
  color: #EAF2FF;
}

.mars-td-name {
  color: rgba(234, 242, 255, 0.7);

}

.time,
.name {
  width: 300px;
  height: 30px;
  line-height: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  font-size: 14px;

  .time-title {
    color: rgba(234, 242, 255, 0.7);
    margin-left: 10px;
  }

  .time-num {
    color: #EAF2FF;
    margin-left: 10px;

  }
}

.postions {
  margin-top: 10px;
  width: 300px;

  .postions-lng,
  .postions-lat,
  .postions-alt {
    width: 95px;
    height: 60px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.2);
    text-align: center;
  }
}

.tle {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-top: 10px;

  .tle-1,
  .tle-2 {
    width: 146px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    height: 122px;
    text-align: center;

    .mars-text {
      margin-top: 10px;
      padding-bottom: 5px;
      color: #EAF2FF;
    }
  }
}
</style>
