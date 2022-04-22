<template>
  <mars-pannel :visible="true" right="10" top="10" width="380">
    <div class="mars-particle">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">所在位置：</span>
        <mars-button @click="btnSelectPosition">图上选点</mars-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">发射目标方向:</span>
        <mars-button @click="btnSelectTarget">图上选点</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <mars-gui :options="options" ref="marsGuiRef"></mars-gui>
    </div>
    </div>
  </mars-pannel>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue"
import * as mapWork from "./map.js"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"

const marsGuiRef = ref()
const options: GuiItem[] = [
  {
    type: "input",
    field: "pointHeight",
    label: "点高度:",
    value: "10.0",
    change(data) {
      marsGuiRef.value.updateField("pointHeight", data)
      mapWork.txtTargetHeight(data)
    }
  },
  {
    type: "slider",
    field: "sliderParticleSize",
    label: "粒子图片大小:",
    step: 1,
    min: 2,
    max: 60,
    value: 20,
    extra: "{sliderParticleSize}(px)",
    change(data) {
      marsGuiRef.value.updateField("sliderParticleSize", data)
      initParamView()
    }
  },
  {
    type: "slider",
    field: "slideStart",
    label: "粒子开始比例:",
    step: 1,
    min: 0.0,
    max: 10.0,
    value: 1,
    extra: "{slideStart}",
    change(data) {
      marsGuiRef.value.updateField("slideStart", data)
      initParamView()
    }
  },
  {
    type: "slider",
    field: "slideStop",
    label: "粒子结束比例:",
    step: 1,
    min: 0.0,
    max: 10.0,
    value: 3,
    extra: "{slideStop}",
    change(data) {
      marsGuiRef.value.updateField("slideStop", data)
      initParamView()
    }
  },
  {
    type: "slider",
    field: "emissionRate",
    label: "粒子发射数量:",
    step: 1,
    min: 0.0,
    max: 500.0,
    value: 200,
    extra: "{emissionRate}(次/秒)",
    change(data) {
      marsGuiRef.value.updateField("emissionRate", data)
      initParamView()
    }
  },
  {
    type: "slider",
    field: "slideMinLife",
    label: "最小寿命时长:",
    step: 0.1,
    min: 0.1,
    max: 30.0,
    value: 1.2,
    extra: "{slideMinLife}(秒)",
    change(data) {
      marsGuiRef.value.updateField("slideMinLife", data)
      initParamView()
    }
  },
  {
    type: "slider",
    field: "slideMaxLife",
    label: "最大寿命时长:",
    step: 0.1,
    min: 0.1,
    max: 30.0,
    value: 3.2,
    extra: "{slideMaxLife}(秒)",
    change(data) {
      marsGuiRef.value.updateField("slideMaxLife", data)
      initParamView()
    }
  },
  {
    type: "slider",
    field: "slideGravity",
    label: "重力因子:",
    step: 1,
    min: -20.0,
    max: 20.0,
    value: -11,
    extra: "{slideGravity}",
    change(data) {
      marsGuiRef.value.updateField("slideGravity", data)
      initParamView()
    }
  }
]

const initParamView = () => {
  const data = marsGuiRef.value.getValues()
  const updateValue = reactive({
    pointHeight: data.pointHeight || "10.0",
    sliderParticleSize: data.sliderParticleSize || 20,
    slideStart: data.slideStart || 1,
    slideStop: data.slideStop || 3,
    emissionRate: data.emissionRate || 200,
    slideMinLife: data.slideMinLife || 1.2,
    slideMaxLife: data.slideMaxLife || 3.2,
    slideGravity: data.slideGravity || -11.0
  })
  mapWork.initParamView(updateValue)
}

// 发射的目标
const btnSelectTarget = () => {
  mapWork.btnSelectTarget(marsGuiRef.value.getValues().pointHeight)
}

// 所在位置
const btnSelectPosition = () => {
  mapWork.btnSelectPosition()
}
</script>
<style>
.mars-pannel-item-label {
  width: 100px;
}

.ant-slider {
  display: inline-block;
  margin: -2px 7px;
  width: 200px;
}
/* .ant-input-affix-wrapper {
  width: 70px;
} */
.ant-input-suffix {
  margin-right: 4px;
}
.ant-input {
  width: 70px !important;
}
.mars-particle{
  width:  350px;
}
</style>
