<template>
  <div class="scene-pannel">
    <a-collapse v-model:activeKey="activeKey" expandIconPosition="end">
      <a-collapse-panel key="1" header="场景scene">
        <div v-for="(scene, index) in sceneData" :key="scene.key">
          <div class="f-mb">
            <a-space>
              <span class="mars-pannel-item-label">{{ scene.describe }}</span>
              <span>:</span>
              <mars-select v-if="scene.operation === 'select'" v-model:value="sceneView" ref="select"
                style="width: 110px"
                @change="handleChange" :options="selectOptions">
              </mars-select>
              <a-radio-group v-if="scene.operation === 'checked'" v-model:value="sceneData[index].value"
                :name="'radioGroup' + scene.key" @change="(sceneData[index] as any).change(index)">
                <a-radio value="1">是</a-radio>
                <a-radio value="2">否</a-radio>
              </a-radio-group>

              <!-- 颜色选择器 -->
              <mars-color-picker v-if="sceneData[index].operation === 'color'" hiddenAlpha="true"
                @change="(sceneData[index] as any).change(index)" v-model:value="sceneData[index].value" />
            </a-space>
          </div>
        </div>
      </a-collapse-panel>

      <a-collapse-panel key="2" header="地球Globe">
        <div v-for="(globe, index) in globeData" :key="globe.key">
          <div class="f-mb">
            <a-space>
              <span class="mars-pannel-item-label">{{ globe.describe }}</span>
              <span>:</span>
              <a-radio-group @change="(globeData[index] as any).change(index)"
                v-if="globeData[index].operation === 'checked'" v-model:value="globeData[index].value"
                :name="'radioGroup' + index">
                <a-radio value="1">是</a-radio>
                <a-radio value="2">否</a-radio>
              </a-radio-group>
              <!-- 颜色选择器 -->
              <mars-color-picker v-if="globeData[index].operation === 'color'" hiddenAlpha="true"
                @change="(globeData[index] as any).change(index)" v-model:value="globeData[index].value" />

              <!-- range滑动 -->
              <mars-slider @change="(globeData[index] as any).change(index)"
                v-if="globeData[index].operation === 'range'"
                v-model:value="globeData[index].value" :min="globeData[index].min" :max="globeData[index].max"
                :step="globeData[index].step" />
            </a-space>
          </div>
        </div>
      </a-collapse-panel>

      <a-collapse-panel key="3" header="鼠标交互">
        <div v-for="( mouse, index) in mouseData" :key="mouse.key">
          <div class="f-mb">
            <a-space>
              <span class="mars-pannel-item-label">{{ mouse.describe }}</span>
              <span>:</span>
              <a-radio-group @change="(mouseData[index] as any).change(index)"
                v-if="mouseData[index].operation === 'checked'" v-model:value="mouseData[index].value"
                :name="'radioGroup' + index">
                <a-radio value="1">是</a-radio>
                <a-radio value="2">否</a-radio>
              </a-radio-group>

              <!-- range滑动 -->
              <mars-slider @change="(mouseData[index] as any).change(index)"
                v-if="mouseData[index].operation === 'range'"
                v-model:value="mouseData[index].value" :min="mouseData[index].min" :max="mouseData[index].max"
                :step="mouseData[index].step" />
            </a-space>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const activeKey = ref(["1", "2", "3"])
const sceneView = ref<string>("三维视图")

const sceneData = ref([
  {
    key: "1",
    describe: "场景模式",
    operation: "select",
    value: 3
  },
  {
    key: "2",
    describe: "高动态渲染",
    operation: "checked",
    value: "2",
    change(index: number) {
      if (Number(sceneData.value[index].value) === 1) {
        mapWork.setSceneOptions("highDynamicRange", true)
      } else {
        mapWork.setSceneOptions("highDynamicRange", false)
      }
    }
  },
  {
    key: "3",
    describe: "快速抗锯齿",
    operation: "checked",
    value: "1",
    change(index: number) {

      if (Number(sceneData.value[index].value) === 1) {
        mapWork.setSceneOptions("fxaa", true)
      } else {
        mapWork.setSceneOptions("fxaa", false)
      }
    }
  },
  {
    key: "4",
    describe: "显示太阳",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(sceneData.value[index].value) === 1) {
        mapWork.setSceneOptions("showSun", true)
      } else {
        mapWork.setSceneOptions("showSun", false)
      }
    }
  },
  {
    key: "5",
    describe: "显示月亮",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(sceneData.value[index].value) === 1) {
        mapWork.setSceneOptions("showMoon", true)
      } else {
        mapWork.setSceneOptions("showMoon", false)
      }
    }
  },
  {
    key: "6",
    describe: "显示天空盒子",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(sceneData.value[index].value) === 1) {
        mapWork.setSceneOptions("showSkyBox", true)
      } else {
        mapWork.setSceneOptions("showSkyBox", false)
      }
    }
  },
  {
    key: "7",
    describe: "空间背景色",
    operation: "color",
    value: "#000000",
    change(index: number) {
      mapWork.setSceneOptions("backgroundColor", sceneData.value[index].value)
    }
  },
  {
    key: "8",
    describe: "大气外光圈",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(sceneData.value[index].value) === 1) {
        mapWork.setSceneOptions("showSkyAtmosphere", true)
      } else {
        mapWork.setSceneOptions("showSkyAtmosphere", false)
      }
    }
  },
  {
    key: "9",
    describe: "雾化效果",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(sceneData.value[index].value) === 1) {
        mapWork.setSceneOptions("fog", true)
      } else {
        mapWork.setSceneOptions("fog", false)
      }
    }
  }
]
)


const globeData = ref([
  {
    key: "10",
    describe: "地形夸张倍数",
    operation: "range",
    value: 1,
    min: 1,
    max: 80,
    step: 1,
    change(index: number) {
      mapWork.setSceneOptions("verticalExaggeration", globeData.value[index].value)
    }
  },
  {
    key: "11",
    describe: "昼夜区域",
    operation: "checked",
    value: "2",
    change(index: number) {
      if (Number(globeData.value[index].value) === 1) {
        mapWork.setSceneGlobeOptions("enableLighting", true)
      } else {
        mapWork.setSceneGlobeOptions("enableLighting", false)
      }
    }
  },
  {
    key: "12",
    describe: "绘制地面大气",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(globeData.value[index].value) === 1) {
        mapWork.setSceneGlobeOptions("showGroundAtmosphere", true)
      } else {
        mapWork.setSceneGlobeOptions("showGroundAtmosphere", false)
      }
    }
  },
  {
    key: "13",
    describe: "深度监测",
    operation: "checked",
    value: "2",
    change(index: number) {
      if (Number(globeData.value[index].value) === 1) {
        mapWork.setSceneGlobeOptions("depthTestAgainstTerrain", true)
      } else {
        mapWork.setSceneGlobeOptions("depthTestAgainstTerrain", false)
      }
    }
  },
  {
    key: "14",
    describe: "显示底图",
    operation: "checked",
    value: "1",
    change(index: number) {
      mapWork.showBaseMap(globeData.value[index].value)
    }
  },
  {
    key: "15",
    describe: "地球背景色",
    operation: "color",
    value: "#546a53",
    change(index: number) {
      mapWork.setSceneGlobeOptions("baseColor", globeData.value[index].value)
    }
  }
])


const mouseData = ref([
  {
    key: "16",
    describe: "缩放地图",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(mouseData.value[index].value) === 1) {
        mapWork.setSceneCameraControllerOptions("enableZoom", true)
      } else {
        mapWork.setSceneCameraControllerOptions("enableZoom", false)
      }
    }
  },
  {
    key: "17",
    describe: "倾斜相机",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(mouseData.value[index].value) === 1) {
        mapWork.setSceneCameraControllerOptions("enableTilt", true)
      } else {
        mapWork.setSceneCameraControllerOptions("enableTilt", false)
      }
    }
  },
  {
    key: "18",
    describe: "旋转转换位置",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(mouseData.value[index].value) === 1) {
        mapWork.setSceneCameraControllerOptions("enableRotate", true)
      } else {
        mapWork.setSceneCameraControllerOptions("enableRotate", false)
      }
    }
  },
  {
    key: "19",
    describe: "平移地图",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(mouseData.value[index].value) === 1) {
        mapWork.setSceneCameraControllerOptions("enableTranslate", true)
      } else {
        mapWork.setSceneCameraControllerOptions("enableTranslate", false)
      }
    }
  },
  {
    key: "20",
    describe: "南北极绕轴心旋转",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(mouseData.value[index].value) === 1) {
        mapWork.setSceneCameraControllerOptions("constrainedAxis", true)
      } else {
        mapWork.setSceneCameraControllerOptions("constrainedAxis", false)
      }
    }
  },
  {
    key: "21",
    describe: "是否进入地下",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(mouseData.value[index].value) === 1) {
        mapWork.setSceneCameraControllerOptions("enableCollisionDetection", true)
      } else {
        mapWork.setSceneCameraControllerOptions("enableCollisionDetection", false)
      }
    }
  },
  {
    key: "22",
    describe: "最小碰撞高度",
    operation: "range",
    value: 15000,
    min: 100,
    max: 500000,
    step: 100,
    change(index: number) {
      mapWork.setSceneCameraControllerOptions("minimumCollisionTerrainHeight", mouseData.value[index].value)
    }
  },
  {
    key: "23",
    describe: "相机最近视距",
    operation: "range",
    value: 1,
    min: 1,
    max: 10000,
    step: 1,
    change(index: number) {
      mapWork.setSceneCameraControllerOptions("minimumZoomDistance", mouseData.value[index].value)
    }
  },
  {
    key: "24",
    describe: "相机最远视距",
    operation: "range",
    value: 50000000,
    min: 10000,
    max: 90000000,
    step: 1000,
    change(index: number) {
      mapWork.setSceneCameraControllerOptions("maximumZoomDistance", mouseData.value[index].value)
    }
  },
  {
    key: "25",
    describe: "滚轮放大倍数",
    operation: "range",
    value: 3,
    min: 1,
    max: 10,
    step: 1,
    change(index: number) {
      mapWork.setSceneCameraControllerOptions("zoomFactor", mouseData.value[index].value)
    }
  }
])

const selectOptions = ref([
  {
    value: 3, // Cesium.SceneMode.SCENE3D
    label: "三维视图"
  },
  {
    value: 2, // Cesium.SceneMode.SCENE2D
    label: "二维视图"
  },
  {
    value: 1, // Cesium.SceneMode.COLUMBUS_VIEW
    label: "哥伦布视图"
  }
])



const handleChange = (value: string) => {
  mapWork.sceneMode(value)
}
</script>

<style scoped lang="less">
.scene-pannel {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 330px;
  max-height: calc(100% - 40px);
  overflow-x: hidden;


  :deep(.ant-collapse-item) {
    margin-bottom: 10px;

    .ant-collapse-header-text {
      margin-left: 10px;

      &::after {
        content: "";
        position: absolute;
        top: 12px;
        left: 12px;
        width: 4px;
        height: 19px;
        border-radius: 2px;
        background-color: var(--mars-primary-color);
      }
    }

    .ant-collapse-content {
      background: var(--mars-dropdown-bg) !important;
    }
  }

  .mars-select,
  .mars-slider {
    width: 176px !important;
  }

  .mars-color-view {
    width: 176px;
  }

  :deep(.ant-radio-group) {
    .ant-radio-wrapper {
      &:last-child {
        margin-left: 20px;
      }
    }
  }

  .mars-pannel-item-label {
    min-width: 112px;
  }
}

::-webkit-scrollbar {
  width: 0px
}
</style>
