<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb info">
      <span>3dtile模型移动(只适合小范围内的偏移 笛卡尔坐标方向，非贴球面)</span>
    </div>

    <div class="f-mb container">
      <div class="label">模型URL:</div>
      <div class="content">
        <mars-input class="model-input" v-model:value="url"></mars-input>
        <mars-button class="model-button" @click="showModel">加载模型</mars-button>
      </div>
    </div>

    <div class="f-mb container">
      <div class="label">设置移动步长:</div>
      <div class="content">
        <mars-button class="step-button" @click="getValue(0.1)" value="">0.1</mars-button>
        <mars-button class="step-button" @click="getValue(1)" value="1">1</mars-button>
        <mars-button class="step-button" @click="getValue(10)" value="10">10</mars-button>
        <mars-button class="step-button" @click="getValue(100)" value="100">100</mars-button>
      </div>
    </div>

    <div class="f-mb container">
      <div class="label">按步长移动:</div>
      <div class="content">
        <mars-button class="move-btn" @click="moveModel(0)">x+</mars-button>
        <mars-button class="move-btn" @click="moveModel(1)">x-</mars-button>
        <mars-button class="move-btn" @click="moveModel(2)">y+</mars-button>
        <mars-button class="move-btn" @click="moveModel(3)">y-</mars-button>
        <mars-button class="move-btn" @click="moveModel(4)">z+</mars-button>
        <mars-button class="move-btn" @click="moveModel(5)">z-</mars-button>
      </div>
    </div>

    <div class="f-mb container">
      <div class="label">当前偏移量:</div>
      <div class="content">
        <mars-input addon-before="x" class="offset-input" v-model:value="result.x"></mars-input>
        <mars-input addon-before="y" class="offset-input" v-model:value="result.y"></mars-input>
        <mars-input addon-before="z" class="offset-input" v-model:value="result.z"></mars-input>
      </div>
    </div>

    <div class="checkbox_container">
      <a-checkbox @change="chkHasTerrain" v-model:checked="enableHasTerrain" >是否有地形</a-checkbox>
      <a-checkbox @change="chkTestTerrain" v-model:checked="enableTestTerrain" >是否深度检测</a-checkbox>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import * as mapWork from "./map.js"

const url = ref<any>()

const result = ref({
  x: "0.0",
  y: "0.0",
  z: "0.0"
})

const enableHasTerrain = ref<boolean>(false)

const enableTestTerrain = ref<boolean>(false)

onMounted(() => {
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

let x = 0
let y = 0
let z = 0
let step = 1

const moveModel = (type: number) => {
  switch (type) {
    case 0:
      x += step
      break
    case 1:
      x -= step
      break
    case 2:
      y += step
      break
    case 3:
      y -= step
      break
    case 4:
      z += step
      break
    case 5:
      z -= step
      break
    default:
  }

  result.value = {
    x: x.toFixed(1),
    y: y.toFixed(1),
    z: z.toFixed(1)
  }
  mapWork.setTranslation(x, y, z)
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
  step = val
}
</script>
<style scoped lang="less">


.info {
  font-size: 14px;
  color:rgba(234, 242, 255, 0.7)
}
.container {
  display: flex;
  .label {
    margin-top: 6px;
    width: 90px;
    text-align: right;
    margin-right: 10px;
    font-size: 14px;
    color: rgba(234, 242, 255, 0.8);
  }
  .content {
    width: 199px;
    .model-input {
      width: 100%;
    }
    .model-button {
      width: 199px;
      margin-top: 10px;
    }
    .step-button {
      width:42px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0px;
      }
    }

    .move-btn {
      width: 59.5px;
      margin-right: 10px;
      margin-bottom: 10px;
      &:nth-child(3n) {
        margin-right: 0px;
      }
      &:nth-child(n+3) {
        margin-bottom: 0px;
      }
    }

    .offset-input {
      width: 59.5px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
}

.checkbox_container {
  text-align: right;
  :deep(.ant-checkbox-wrapper) {
    margin-left: 16px;
  }
  :deep(.ant-checkbox-wrapper span) {
    font-size: 12px;
    padding-inline-end: 0px;
  }
}
</style>
