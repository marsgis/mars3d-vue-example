<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <mars-button @click="locate">定位至卫星</mars-button>
          <span class="pannel-item-label">参考系</span>
          <a-checkbox v-model:checked="formState.enabledShowMatrix" @change="chkShowModelMatrix">显示/隐藏</a-checkbox>
        </a-space>
      </a-form-item>
    </a-form>

    <table class="mars-table tb-border">
      <tr>
        <td class="nametd">名称</td>
        <td id="td_name">{{ formState.name }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE1</td>
        <td id="td_tle1">{{ formState.tle1 }}</td>
      </tr>
      <tr>
        <td class="nametd">TLE2</td>
        <td id="td_tle2">{{ formState.tle2 }}</td>
      </tr>
      <tr>
        <td class="nametd">时间</td>
        <td id="td_time">{{ formState.time }}</td>
      </tr>

      <tr>
        <td class="nametd">经度</td>
        <td id="td_jd">{{ formState.td_jd }}</td>
      </tr>
      <tr>
        <td class="nametd">经度</td>
        <td id="td_wd">{{ formState.td_wd }}</td>
      </tr>
      <tr>
        <td class="nametd">高程</td>
        <td id="td_gd">{{ formState.td_gd }}</td>
      </tr>
    </table>
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

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
export default defineComponent({
  components: {
    PannelBox
  },

  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    const formState: UnwrapRef<FormState> = reactive({
      enabledShowMatrix: true,
      name: "",
      tle1: "",
      tle2: "",
      time: "",
      td_jd: 0,
      td_wd: 0,
      td_gd: 0
    })
    mapWork.eventTarget.on("loadOK", () => {
      formState.name = mapWork.weixinData.name
      formState.tle1 = mapWork.weixinData.tle1
      formState.tle2 = mapWork.weixinData.tle2
      formState.time = mapWork.weixinData.time
      formState.td_jd = mapWork.weixinData.td_jd
      formState.td_wd = mapWork.weixinData.td_wd
      formState.td_gd = mapWork.weixinData.td_gd
    })

    // 定位至卫星
    const locate = () => {
      mapWork.locate()
    }

    // 参考轴系显示与隐藏
    const chkShowModelMatrix = () => {
      mapWork.chkShowModelMatrix(formState.enabledShowMatrix)
    }

    return {
      formState,
      chkShowModelMatrix,
      locate
    }
  }
})
</script>
<style scoped lang="less">
th.column-money,
td.column-money {
  text-align: right !important;
}
.ant-slider {
  width: 110px;
}
.mars-table {
  width: 280px;
  border-collapse: collapse;
  border-spacing: 0;
}

.mars-table tr td {
  padding: 5px 10px;
  text-align: left;
}

.mars-table tr td:first-child {
  border-left: none;
}

.mars-table .nametd {
  padding: 5px 20px 5px 10px;
}
.tb-border {
  border: 1px solid #4db3ff70;
}

.tb-border tr td {
  border: 1px solid #4db3ff70;
}
</style>
