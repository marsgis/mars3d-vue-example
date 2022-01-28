<template>
  <pannel class="infoView">
    <div class="f-mb">
      <span>3dtile模型移动(只适合小范围内的偏移 笛卡尔坐标方向，非贴球面)</span>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">模型URL:</span>
        <mars-input v-model:value="url"></mars-input>
        <mars-button @click="showModel">加载模型</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">设置移动步长:</span>
        <mars-button @click="getValue(0.1)" value="">0.1</mars-button>
        <mars-button @click="getValue(1)" value="1">1</mars-button>
        <mars-button @click="getValue(10)" value="10">10</mars-button>
        <mars-button @click="getValue(100)" value="100">100</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">按步长移动:</span>
        <mars-button @click="change(0)">x+</mars-button>
        <mars-button @click="change(1)">x-</mars-button>

        <mars-button @click="change(2)">y+</mars-button>
        <mars-button @click="change(3)">y-</mars-button>

        <mars-button @click="change(4)">z+</mars-button>
        <mars-button @click="change(5)">z-</mars-button>
      </a-space>
    </div>

    <div>
      <a-space> <span class="pannel-item-label">当前偏移量: </span>{{ result }} </a-space>
    </div>

    <div>
      <a-space>
        <span class="pannel-item-label"></span>
        <a-checkbox @change="chkHasTerrain" v-model:checked="enableHasTerrain">是否有地形</a-checkbox>
        <a-checkbox @change="chkTestTerrain" v-model:checked="enableTestTerrain">是否深度检测</a-checkbox>
      </a-space>
    </div>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const url = ref<any>()

const result = ref<string>()

const enableHasTerrain = ref<boolean>(false)

const enableTestTerrain = ref<boolean>(false)

mapWork.eventTarget.on("loadOk", () => {
  // url传入模型地址
  const modelUrl = localStorage.getItem("3dtiles_move")
  if (modelUrl) {
    // 历史记录模型地址
    url.value = modelUrl
  } else {
    url.value = "//data.mars3d.cn/3dtiles/qx-dyt/tileset.json"
  }

  setTimeout(() => {
    mapWork.showModel(url.value)
  }, 1000)
})

// 加载模型
const showModel = () => {
  localStorage.setItem("3dtiles_move", url.value)
  mapWork.showModel(url.value)
}

const change = (val: number) => {
  mapWork.change(val)
  mapWork.eventTarget.on("changeStep", function (event: any) {
    result.value = event.result
  })
}

// 是否有地形
const chkHasTerrain = () => {
  mapWork.chkHasTerrain(enableHasTerrain.value)
}

// 深度检测
const chkTestTerrain = () => {
  mapWork.chkTestTerrain(enableTestTerrain.value)
}

//  设置步长
const getValue = (val: number) => {
  mapWork.changeStep(val)
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 83px;
}
</style>
