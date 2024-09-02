
<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-collapse v-model:activeKey="activeKey" expandIconPosition="end">
      <a-collapse-panel key="1" header="分析参数">
        <a-form-item label="种子数量:">
          <mars-select class="w-full" @change="changeLineCount" v-model:value="formState.lineCount" :options="lineCountOptions">
          </mars-select>
        </a-form-item>
        <a-form-item label="是否透明:">
          <a-checkbox @change="changeTransparent"></a-checkbox>
        </a-form-item>
        <a-form-item label="分析区域:">
            <mars-select class="w-full" @change="changeRange" v-model:value="formState.range" :options="rangeOptions">
            </mars-select>
        </a-form-item>
        <a-form-item label="垂直速度:">
          <a-checkbox @change="changeUseW"></a-checkbox>
        </a-form-item>
      </a-collapse-panel>

      <a-collapse-panel key="2" header="光照参数">
        <a-form-item label="光泽度:">
          <mars-slider  @change="changeShininess" v-model:value="formState.shininess" :min="0"
            :max="50" :step="1" />
        </a-form-item>
        <a-form-item label="高光:">
          <mars-slider  @change="changeSpecular" v-model:value="formState.specular" :min="0"
            :max="1" :step="0.1" />
        </a-form-item>
        <a-form-item label="颜色选择">
          <mars-color-picker v-model:value="formState.emission"  @change="changeColor" />
        </a-form-item>
      </a-collapse-panel>

    </a-collapse>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import * as mapWork from "./map.js"
const activeKey = ref(["1", "2"])

const lineCountOptions = [
  {
    value: 1,
    label: "1"
  },
  {
    value: 10,
    label: "10"
  },
  {
    value: 50,
    label: "50"
  },
  {
    value: 100,
    label: "100"
  },
  {
    value: 200,
    label: "200"
  },
  {
    value: 300,
    label: "300"
  },
  {
    value: 400,
    label: "400"
  },
  {
    value: 500,
    label: "500"
  },
  {
    value: 1000,
    label: "1000"
  }
]

const rangeOptions = [
  {
    value: 2,
    label: "2"
  },
  {
    value: 3,
    label: "3"
  },
  {
    value: 4,
    label: "4"
  },
  {
    value: 5,
    label: "5"
  },
  {
    value: 8,
    label: "8"
  },
  {
    value: 10,
    label: "10"
  }
]

interface FormState {
  shininess: number; // 光泽度
  specular: number; // 高光
  transparent: boolean; // 是否透明
  lineCount: number; // 种子数量
  density: boolean; // 疏密控制
  range: number; // 分析区域
  useW: boolean; // 垂直速度
  emission: string
}

const formState = reactive<FormState>({
  shininess: 0,
  specular: 0,
  transparent: false,
  lineCount: 50,
  density: false,
  range: 5,
  useW: false,
  emission: "#000"
})

const changeLineCount = () => {
  mapWork.changeLineCount(formState.lineCount)
}

const changeTransparent = (e) => {
  mapWork.changeTransparent(e.target.checked)
}

const changeRange = () => {
  mapWork.changeRange(formState.range)
}

const changeUseW = (e) => {
  mapWork.changeUseW(e.target.range)
}


const changeShininess = () => {
  mapWork.changeShininess(formState.shininess)
}

const changeSpecular = () => {
  mapWork.changeSpecular(formState.specular)
}

const changeColor = (e) => {
  mapWork.changeColor({ r: e.rgba.r, g: e.rgba.g, b: e.rgba.b })
}
</script>

<style scoped lang="less">
:deep(.ant-slider) {
  width: 140px;
}
</style>
