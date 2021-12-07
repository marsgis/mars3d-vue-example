<template>
  <PannelBox class="infoView">
    <div class="infoView-content">
      <a-form :label-col="labelCol">
        <a-collapse :activeKey="activeKey">
          <a-collapse-panel key="1" header="模型URL地址">
            <a-row :gutter="10">
              <a-col :span="19">
                <mars-input :allowClear="false" v-model:value="formState.txtModel">
                  <template #addonAfter>
                    <a-space>
                      <a-checkbox class="f-vam" v-model:checked="formState.chkProxy" />
                      <span class="f-vam">代理</span>
                    </a-space>
                  </template>
                </mars-input>
              </a-col>
              <a-col :span="5">
                <mars-button class="small-btn">加载模型</mars-button>
              </a-col>
            </a-row>
          </a-collapse-panel>

          <a-collapse-panel key="2" header="位置方向">
            <a-form-item label="经度">
              <mars-input-number v-model:value="formState.txtX" :step="0.000001" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="纬度">
              <mars-input-number v-model:value="formState.txtY" :step="0.000001" @change="formStateChange" />
            </a-form-item>

            <a-form-item label="高度">
              <a-row :gutter="10">
                <a-col :span="15">
                  <mars-input-number v-model:value="formState.txtZ" :step="0.1" @change="formStateChange" />
                </a-col>
                <a-col :span="9">
                  <a-checkbox v-model:checked="formState.depthTestAgainstTerrain" @change="formStateChange">深度检测</a-checkbox>
                </a-col>
              </a-row>
            </a-form-item>

            <a-form-item label="方向X">
              <mars-input-number v-model:value="formState.rotationX" :step="0.1" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="方向Y">
              <mars-input-number v-model:value="formState.rotationY" :step="0.1" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="方向Z(四周)">
              <mars-input-number v-model:value="formState.rotationZ" :step="0.1" @change="formStateChange" />
            </a-form-item>

            <a-form-item label="变换垂直轴">
              <mars-select v-model:value="formState.axis" @change="formStateChange" :options="axisOptions"></mars-select>
            </a-form-item>
            <a-form-item label="鼠标拖拽编辑">
              <a-switch v-model:checked="formState.tilesEditorEnabled" @change="formStateChange" />
            </a-form-item>
          </a-collapse-panel>

          <a-collapse-panel key="3" header="其他参数">
            <a-form-item label="缩放比例">
              <mars-input-number v-model:value="formState.scale" :step="0.1" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="显示精度">
              <a-slider :min="1" :max="30" v-model:value="formState.maximumScreenSpaceError" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="材质底色">
              <a-slider :min="0.1" :max="3" :step="0.1" v-model:value="formState.luminanceAtZenith" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="透明度">
              <a-slider :min="0.1" :max="1" :step="0.1" v-model:value="formState.opacity" @change="formStateChange" />
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>

        <div class="f-tac">
          <a-space>
            <mars-button @click="locateToModel">视角定位至模型</mars-button>
            <mars-button @click="showCompTree">查看构件</mars-button>
            <mars-button @click="saveBookmark">保存参数</mars-button>
          </a-space>
        </div>
      </a-form>
    </div>
  </PannelBox>
  <PannelBox class="comp-model" type="model" title="查看控件" v-model:visible="showCompModel">
    <mars-tree checkable :tree-data="treeData">
      <template #title="{ title }">
        <span>{{ title }}</span>
      </template>
    </mars-tree>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

interface FormState {
  txtModel: string
  chkProxy: boolean
  txtX: number
  txtY: number
  txtZ: number
  depthTestAgainstTerrain: boolean
  rotationZ: number
  rotationX: number
  rotationY: number
  scale: number
  axis: string
  tilesEditorEnabled: boolean
  maximumScreenSpaceError: number
  luminanceAtZenith: number
  opacity: number
}

const formState = reactive<FormState>({
  txtModel: "//data.mars3d.cn/3dtiles/max-fsdzm/tileset.json",
  chkProxy: false,
  txtX: 0,
  txtY: 0,
  txtZ: 0,
  depthTestAgainstTerrain: false,
  rotationZ: 0.0,
  rotationX: 0.0,
  rotationY: 0.0,
  scale: 1,
  axis: "",
  tilesEditorEnabled: false,
  maximumScreenSpaceError: 8,
  luminanceAtZenith: 0.1,
  opacity: 1
})

const activeKey: any[] = ["1", "2", "3"]

const axisOptions = [
  { value: "", label: "默认" },
  { value: "Z_UP_TO_X_UP", label: "Z轴 -> X轴" },
  { value: "Z_UP_TO_Y_UP", label: "Z轴 -->Y轴" },
  { value: "X_UP_TO_Y_UP", label: "X轴 -->Y轴" },
  { value: "X_UP_TO_Z_UP", label: "X轴 -->Z轴" },
  { value: "Y_UP_TO_X_UP", label: "Y轴 -->X轴" },
  { value: "Y_UP_TO_Z_UP", label: "Y轴 -->Z轴" }
]

const labelCol = { style: { width: "100px" } }

// 初始化界面
mapWork.eventTarget.on("tiles3dLayerLoad", function (event: any) {
  const tileset = event.data
  const tiles3dLayer = event.tiles3dLayer

  // 取模型中心点信息
  var locParams = tiles3dLayer.center
  if (locParams.alt < -1000 || locParams.alt > 10000) {
    locParams.alt = 0 // 高度异常数据，自动赋值高度为0
  }

  formState.txtX = locParams.lng.toFixed(6)
  formState.txtY = locParams.lat.toFixed(6)
  formState.txtZ = locParams.alt.toFixed(6)
  formState.luminanceAtZenith = tileset.luminanceAtZenith
  formState.maximumScreenSpaceError = tileset.maximumScreenSpaceError

  if (tiles3dLayer.transform) {
    formState.rotationX = tiles3dLayer.rotation_x.toFixed(1)
    formState.rotationY = tiles3dLayer.rotation_y.toFixed(1)
    formState.rotationZ = tiles3dLayer.rotation_z.toFixed(1)
    formState.scale = tiles3dLayer.scale || 1
    formState.axis = tiles3dLayer.axis
  } else {
    mapWork.getDefined(formState)
  }

  mapWork.eventTarget.on("tilesEditor", function (event: any) {
    mapWork.editor(event.data, formState.txtZ)
  })

  // 根据改变的位置触发不同的事件
  mapWork.eventTarget.on("changePoition", function (event: any) {
    formState.txtX = event.point.lng
    formState.txtY = event.point.lat
    formState.txtZ = event.point.alt
  })
  mapWork.eventTarget.on("changeHeading", function (event: any) {
    formState.rotationZ = event.tiles3dLayer.rotation_z
  })

  mapWork.getConfig(formState)
})

const formStateChange = () => {
  mapWork.updateModel(formState)
}

const locateToModel = () => {
  mapWork.locate()
}

const saveBookmark = () => {
  mapWork.saveBookmark(formState)
}

// 查看构件
const treeData = ref<any[]>([])

const showCompModel = ref(false)
const showCompTree = () => {
  showCompModel.value = true
  mapWork.showCompTree(formState.txtModel)

  mapWork.eventTarget.on("compTree", function (event: any) {
    const data = event.data
    data.forEach((item: any, index: number) => {
      const childeren = isHaveChildren(item, index)

      treeData.value = [
        {
          title: item.name,
          key: index,
          children: childeren
        }
      ]
    })
  })
}

function isHaveChildren(arr: any, index: number) {
  if (!arr.children) {
    return
  }
  const childerens = arr.children
  const childeren: any[] = []
  childerens.forEach((item: any, i: number) => {
    const childOne = isHaveChildren(item, i)
    childeren.push({
      title: item.name,
      key: index + "-" + i,
      children: childOne
    })
    return childeren
  })
  return childeren
}
</script>
<style scoped lang="less">
.infoView-content {
  width: 360px;
}
.comp-model {
  width: 300px;
  padding-top: 0;
  top: 10px;
  left: 10px;
  height: 600px;
  overflow-y: auto;
}
</style>
