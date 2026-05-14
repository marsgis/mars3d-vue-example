<template>
  <div class="right-pannel">
    <a-collapse v-model:activeKey="rightActiveKey" expandIconPosition="end">
      <a-collapse-panel key="1" header="场景scene">
        <div v-for="(scene, index) in sceneData" :key="scene.key">
          <div class="f-mb">
            <a-space>
              <span class="mars-pannel-item-label">{{ scene.describe }}</span>
              <span>:</span>
              <mars-select v-if="scene.operation === 'select'" v-model:value="sceneView" ref="select"
                style="width: 110px" @change="handleChange" :options="selectOptions">
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
                v-if="globeData[index].operation === 'range'" v-model:value="globeData[index].value"
                :min="globeData[index].min" :max="globeData[index].max" :step="globeData[index].step" />
            </a-space>
          </div>
        </div>
      </a-collapse-panel>

      <a-collapse-panel key="3" header="鼠标交互">
        <div v-for="(mouse, index) in mouseData" :key="mouse.key">
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
                v-if="mouseData[index].operation === 'range'" v-model:value="mouseData[index].value"
                :min="mouseData[index].min" :max="mouseData[index].max" :step="mouseData[index].step" />
            </a-space>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
  <div class="left-pannel">
    <a-collapse v-model:activeKey="leftActiveKey" expandIconPosition="end">
      <a-collapse-panel key="1" header="大气设置">
        <div v-for="(atmosphere, index) in atmosphereData" :key="atmosphere.key">
          <div class="f-mb">
            <a-space v-if="atmosphere.show || atmosphere.show === undefined">
              <span class="mars-pannel-item-label">{{ atmosphere.describe }}</span>
              <span>:</span>
              <a-radio-group @change="(atmosphereData[index] as any).change(index)"
                v-if="atmosphereData[index].operation === 'checked'" v-model:value="atmosphereData[index].value"
                :name="'radioGroup' + index">
                <a-radio value="1">是</a-radio>
                <a-radio value="2">否</a-radio>
              </a-radio-group>

              <!-- range滑动 -->
              <mars-slider @change="(atmosphereData[index] as any).change(index)"
                v-if="atmosphereData[index].operation === 'range'" v-model:value="atmosphereData[index].value"
                :min="atmosphereData[index].min" :max="atmosphereData[index].max" :step="atmosphereData[index].step" />
            </a-space>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as mapWork from "./map.js"
import * as mars3d from "mars3d"

const rightActiveKey = ref(["1", "2", "3"])
const leftActiveKey = ref(["1"])
const sceneView = ref<string>("三维视图")

let globe
const Cesium = mars3d.Cesium
onMounted(() => {
  globe = mapWork.map.viewer.scene.globe
})

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
    key: "13",
    describe: "显示底图",
    operation: "checked",
    value: "1",
    change(index: number) {
      mapWork.showBaseMap(globeData.value[index].value)
    }
  },
  {
    key: "14",
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
    describe: "倾斜相机(3D和2.5D)",
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
    describe: "旋转转换位置(3D和2D)",
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
    describe: "平移地图(2D和2.5D)",
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
        mapWork.setSceneCameraControllerOptions("enableCollisionDetection", false) // 不允许 地形相机的碰撞检测 = 可进入地下
      } else {
        mapWork.setSceneCameraControllerOptions("enableCollisionDetection", true) // 允许 地形相机的碰撞检测 = 不可进入地下
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

const atmosphereData = ref([
  {
    key: "1",
    describe: "大气外光圈",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(atmosphereData.value[index].value) === 1) {
        mapWork.setSceneOptions("showSkyAtmosphere", true)
      } else {
        mapWork.setSceneOptions("showSkyAtmosphere", false)
      }
    }
  },
  {
    key: "2",
    describe: "绘制地面大气",
    operation: "checked",
    value: "1",
    change(index: number) {
      if (Number(atmosphereData.value[index].value) === 1) {
        mapWork.setSceneGlobeOptions("showGroundAtmosphere", true)
      } else {
        mapWork.setSceneGlobeOptions("showGroundAtmosphere", false)
      }
      atmosphereData.value.forEach(item => {
        if (item.show === true) {
          item.show = false
        } else if (item.show === false) {
          item.show = true
        }
      })
    }
  },
  {
    key: "3",
    describe: "光照强度",
    operation: "range",
    value: 33,
    min: 2,
    max: 100,
    step: 1,
    show: true,
    change(index: number) {
      globe.atmosphereLightIntensity = atmosphereData.value[index].value
    }
  },
  {
    key: "4",
    describe: "色相",
    operation: "range",
    value: 0,
    min: -1,
    max: 1,
    step: 0.01,
    show: true,
    change(index: number) {
      globe.atmosphereHueShift = atmosphereData.value[index].value
    }
  },
  {
    key: "5",
    describe: "饱和度",
    operation: "range",
    value: 0,
    min: -1,
    max: 1,
    step: 0.01,
    show: true,
    change(index: number) {
      globe.atmosphereSaturationShift = atmosphereData.value[index].value
    }
  },
  {
    key: "6",
    describe: "亮度",
    operation: "range",
    value: 0,
    min: -1,
    max: 1,
    step: 0.01,
    show: true,
    change(index: number) {
      globe.atmosphereBrightnessShift = atmosphereData.value[index].value
    }
  },
  {
    key: "7",
    describe: "瑞利散射系数（红）",
    operation: "range",
    value: 0.5,
    min: 0,
    max: 100,
    step: 1,
    show: true,
    change(index: number) {
      globe.atmosphereRayleighCoefficient.x = (atmosphereData.value[index].value as number) * 1e-6
    }
  },
  {
    key: "8",
    describe: "瑞利散射系数（绿）",
    operation: "range",
    value: 0.5,
    min: 0,
    max: 100,
    step: 1,
    show: true,
    change(index: number) {
      globe.atmosphereRayleighCoefficient.y = (atmosphereData.value[index].value as number) * 1e-6
    }
  },
  {
    key: "9",
    describe: "瑞利散射系数（蓝）",
    operation: "range",
    value: 2.8,
    min: 0,
    max: 100,
    step: 1,
    show: true,
    change(index: number) {
      globe.atmosphereRayleighCoefficient.z = (atmosphereData.value[index].value as number) * 1e-6
    }
  },
  {
    key: "10",
    describe: "瑞利散射高度",
    operation: "range",
    value: 10000,
    min: 100,
    max: 20000,
    step: 100,
    show: true,
    change(index: number) {
      globe.atmosphereRayleighScaleHeight = atmosphereData.value[index].value
    }
  },
  {
    key: "11",
    describe: "米氏散射系数",
    operation: "range",
    value: 0,
    min: 0,
    max: 100,
    step: 1,
    show: true,
    change(index: number) {
      const v = (atmosphereData.value[index].value as number) * 1e-6
      globe.atmosphereMieCoefficient = new Cesium.Cartesian3(v, v, v)
    }
  },
  {
    key: "12",
    describe: "米氏散射高度",
    operation: "range",
    value: 3200,
    min: 100,
    max: 10000,
    step: 100,
    show: true,
    change(index: number) {
      globe.atmosphereMieScaleHeight = atmosphereData.value[index].value
    }
  },
  {
    key: "13",
    describe: "米氏散射各向异性",
    operation: "range",
    value: 0.9,
    min: -1,
    max: 1,
    step: 0.1,
    show: true,
    change(index: number) {
      globe.atmosphereMieAnisotropy = atmosphereData.value[index].value
    }
  }
])

const handleChange = (value: string) => {
  mapWork.sceneMode(value)
}
</script>

<style scoped lang="less">
.left-pannel {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 330px;
  max-height: calc(100% - 40px);
  overflow-x: hidden;
}

.right-pannel {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 330px;
  max-height: calc(100% - 40px);
  overflow-x: hidden;
}

.left-pannel,
.right-pannel {
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
    width: 112px;
  }
}

::-webkit-scrollbar {
  width: 0px
}
</style>
