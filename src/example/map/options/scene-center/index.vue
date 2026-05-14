<template>
  <mars-dialog :nopadding="true" :visible="true" width="330" right="10" top="10">
    <a-collapse v-model:activeKey="activeKey" expandIconPosition="end">
      <a-collapse-panel key="1" header="景点视角">
        <div class="position-list">
          <mars-button class="position-btn" @click="changeView1">故宫</mars-button>
          <mars-button class="position-btn" @click="changeView2">珠峰</mars-button>
          <mars-button class="position-btn" @click="changeView3">华山</mars-button>
          <mars-button class="position-btn" @click="changeView4">大别山</mars-button>
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="相机和视角控制演示" class="cameraView">
        <div class="view-list">
          <div v-for="(item, index) in cameraData" :key="index">
            <mars-button class="view-btn" :title="item.title" @click="item.callback">{{ item.name }}</mars-button>
          </div>
        </div>
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" labelAlign="left">
          <a-form-item label="经度值">
            <mars-input v-model:value="inputObj.lng" />
          </a-form-item>
          <a-form-item label="纬度值">
            <mars-input v-model:value="inputObj.lat" />
          </a-form-item>
          <a-form-item label="高度值">
            <mars-input v-model:value="inputObj.alt" />
          </a-form-item>
          <a-form-item label="方向角">
            <mars-input v-model:value="inputObj.heading" />
          </a-form-item>
          <a-form-item label="俯仰角">
            <mars-input v-model:value="inputObj.pitch" />
          </a-form-item>
          <a-form-item label="翻滚角">
            <mars-input v-model:value="inputObj.roll" />
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import * as mapWork from "./map.js"

const activeKey = ref(["1", "2", "3"])

const inputObj = ref({
  lng: 0,
  lat: 0,
  alt: 0,
  heading: 0,
  pitch: 0,
  roll: 0
})

onMounted(() => {
  inputObj.value = mapWork.map.getCameraView()
  inputObj.value.roll = 0

  mapWork.map.on("cameraChanged", function (event) {
    inputObj.value = mapWork.map.getCameraView({ simplify: false })
  })
})

// **************************** 景点视角演示********************** //
const changeView1 = () => {
  mapWork.changeView1()
}
const changeView2 = () => {
  mapWork.changeView2()
}
const changeView3 = () => {
  mapWork.changeView3()
}
const changeView4 = () => {
  mapWork.changeView4()
}

// **************************** 相机和视角控制********************** //
const cameraData = [
  {
    name: "飞行至默认视角",
    title: "默认视角一般为config.json中的center参数配置的视角",
    callback: () => mapWork.mapFlyHome()
  },

  {
    name: "获取当前地图视角",
    title: "",
    callback: () => mapWork.mapGetCameraView()
  },
  {
    name: "定位至指定视角",
    title: "",
    callback: () => mapWork.mapSetCameraView()
  },
  {
    name: "停止视角定位",
    title: "",
    callback: () => mapWork.mapCancelFlyTo()
  },
  {
    name: "定位至目标点",
    title: "",
    callback: () => mapWork.mapFlyToPoint()
  },
  {
    name: "定位至坐标数组处",
    title: "",
    callback: () => mapWork.mapFlyToPositions()
  },
  {
    name: "定位至矩形区域处",
    title: "",
    callback: () => mapWork.mapFlyToExtent()
  },
  {
    name: "定位至矢量数据",
    title: "",
    callback: () => mapWork.mapFlyToGraphic()
  },

  {
    name: "按序播放多个相机位置",
    title: "",
    callback: () => mapWork.mapSetCameraViewList()
  }
]
</script>
<style lang="less" scoped>
.view-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .view-btn {
    height: 32px;
    min-width: 146px;
    margin-bottom: 10px;
  }
}

.position-list {
  display: flex;
  justify-content: space-around;

  .position-btn {
    width: 68px;
    height: 32px;
  }
}
</style>
