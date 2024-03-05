<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">视椎体状态：</span>
        <mars-button @click="locate">定位至卫星</mars-button>
      </a-space>

    </div>
    <a-space>
      <span class="mars-pannel-item-label">参考系：</span>
      <a-checkbox v-model:checked="formState.enabledShowMatrix" @change="chkShowModelMatrix">显示/隐藏</a-checkbox>
    </a-space>
  </mars-dialog>


  <mars-dialog :visible="true" right="10" top="120" width="330">
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
import { reactive } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  enabledShowMatrix: boolean // 参考轴系
  name: string
  tle1: string
  tle2: string
  time: string
  td_jd: number
  td_wd: number
  td_gd: number
}

const formState: UnwrapRef<FormState> = reactive({
  enabledShowMatrix: false,
  name: "",
  tle1: "",
  tle2: "",
  time: "",
  td_jd: 0,
  td_wd: 0,
  td_gd: 0
})

mapWork.eventTarget.on("satelliteChange", (e: any) => {
  const nowData = e.weixinData
  formState.name = nowData.name
  formState.tle1 = nowData.tle1
  formState.tle2 = nowData.tle2
  formState.time = nowData.time
  formState.td_jd = nowData.td_jd
  formState.td_wd = nowData.td_wd
  formState.td_gd = nowData.td_gd
})

// 定位至卫星
const locate = () => {
  mapWork.locate()
}

// 参考轴系显示与隐藏
const chkShowModelMatrix = () => {
  mapWork.chkShowModelMatrix(formState.enabledShowMatrix)
}
</script>
<style scoped lang="less">
.mars-button {
  width: 206px;
}

.mars-pannel-item-label {
  min-width: 84px;
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
