<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">视椎体状态:</span>
        <mars-button @click="locate">定位至卫星</mars-button>
      </a-space>

      <div class="show-hide">
        <a-checkbox v-model:checked="formState.enabledShowHide" @change="chkShowModelMatrix">显示/隐藏</a-checkbox>
      </div>

    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">前后侧摆:</span>
        <mars-slider @change="pitchChange" v-model:value="pitchValue" :min="-180" :max="180" :step="1" />
        <span class="mars-text"> 当前值{{ pitchValue
        }}</span>

      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">左右侧摆:</span>
        <mars-slider @change="rollChange" v-model:value="rollValue" :min="-180" :max="180" :step="1" />
        <span class="mars-text">当前值{{ rollValue }}</span>

      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;夹角:</span>
        <mars-slider @change="angle" v-model:value="angleValue" :min="1" :max="60" :step="0.01" />
        <span class="mars-text">当前值{{ angleValue }}</span>
      </a-space>
    </div>
  </mars-dialog>

  <mars-dialog :visible="true" right="10" top="210" width="330">
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
import { reactive, ref } from "vue"
import { $message } from "@mars/components/mars-ui/index"
import * as mapWork from "./map.js"

interface FormState {
  enabledShowHide: boolean // 参考轴系
  name: string
  tle1: string
  tle2: string
  time: string
  td_jd: number
  td_wd: number
  td_gd: number
}

// 角度
const angleValue = ref<number>(10)
const pitchValue = ref<number>(0) // 仰角
const rollValue = ref<number>(0) // 左右

const formState = reactive<FormState>({
  enabledShowHide: false,
  name: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0
})

mapWork.eventTarget.on("satelliteChange", (event: any) => {
  mapWork.centerPoint(angleValue.value)
  formState.name = event.weixinData.name
  formState.tle1 = event.weixinData.tle1
  formState.tle2 = event.weixinData.tle2
  formState.time = event.weixinData.time
  formState.td_jd = event.weixinData.td_jd
  formState.td_wd = event.weixinData.td_wd
  formState.td_gd = event.weixinData.td_gd
})

// 俯仰角
const pitchChange = () => {
  mapWork.pitchChange(pitchValue.value)
}

// 左右角
const rollChange = () => {
  mapWork.rollChange(rollValue.value)
}

// 夹角
const angle = () => {
  if (!formState.enabledShowHide) {
    $message("已自动打开视椎体")
    formState.enabledShowHide = true
    mapWork.chkShowModelMatrix(formState.enabledShowHide)
  }
  mapWork.angle(angleValue.value)
}
// 定位至卫星
const locate = () => {
  mapWork.locate()
}

// 显示/隐藏
const chkShowModelMatrix = () => {
  mapWork.chkShowModelMatrix(formState.enabledShowHide)
}
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}

.mars-pannel-item-label {
  min-width: 73px;
}

.mars-button {
  width: 216px;
}

.show-hide {
  margin-left: 80px;
  margin-top: 10px;
}


.ant-slider {
  width: 123px;
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
