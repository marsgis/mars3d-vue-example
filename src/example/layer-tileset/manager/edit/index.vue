<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div class="infoView-content">
      <a-form :label-col="labelCol" labelAlign="right">
        <a-collapse collapsible="header" :defaultActiveKey="['1', '2', '3', '4']" expandIconPosition="end">
          <a-collapse-panel key="1" header="模型URL地址">
            <template #extra>
              <mars-button @click="showCompTree">查看构件</mars-button>
            </template>
            <div class="f-mb">
              <span>模型URL地址: </span> &nbsp;&nbsp;
              <mars-input v-model:value="formState.txtModel" style="width: 100%"></mars-input>
            </div>

            <div class="f-mb">
              <mars-button @click="showModel">加载模型</mars-button> &nbsp;&nbsp;
              <a-checkbox v-model:checked="formState.chkProxy">使用代理</a-checkbox>
            </div>
          </a-collapse-panel>

          <a-collapse-panel key="2" header="模型位置">
            <template #extra>
              <mars-button @click="locateToModel">定位至模型</mars-button>
            </template>
            <a-form-item label="经度" :labelCol="{ span: 4 }" v-show="formState.transform">
              <mars-input-number v-model:value="formState.txtX" :step="0.000001" @change="formStateChange"
                style="width: 100%" />
            </a-form-item>
            <a-form-item label="纬度" :labelCol="{ span: 4 }" v-show="formState.transform">
              <mars-input-number v-model:value="formState.txtY" :step="0.000001" @change="formStateChange"
                style="width: 100%" />
            </a-form-item>

            <a-form-item label="高度" :labelCol="{ span: 4 }">
              <a-row :gutter="10">
                <a-col :span="14">
                  <mars-input-number v-model:value="formState.txtZ" :step="0.1" @change="formStateChange" />
                </a-col>
                <a-col :span="10">
                  <a-checkbox v-model:checked="formState.depthTestAgainstTerrain"
                    @change="updateDepthTest">深度检测</a-checkbox>
                </a-col>
              </a-row>
            </a-form-item>
          </a-collapse-panel>

          <a-collapse-panel key="3" header="模型方向" v-show="formState.transform">
            <a-form-item label="变换垂直轴">
              <mars-select v-model:value="formState.axis" @change="formStateChange"
                :options="axisOptions"></mars-select>
            </a-form-item>
            <a-form-item label="绕X轴旋转模型">
              <mars-slider v-model:value="formState.rotationX" :min="0" :max="360" :step="0.1" @change="formStateChange"
                style="width: 100%" />
            </a-form-item>
            <a-form-item label="绕Y轴旋转模型">
              <mars-slider v-model:value="formState.rotationY" :min="0" :max="360" :step="0.1" @change="formStateChange"
                style="width: 100%" />
            </a-form-item>
            <a-form-item label="绕Z轴旋转模型">
              <mars-slider v-model:value="formState.rotationZ" :min="0" :max="360" :step="0.1" @change="formStateChange"
                style="width: 100%" />
            </a-form-item>
          </a-collapse-panel>

          <a-collapse-panel key="4" header="其他参数">
            <a-form-item label="缩放比例" v-show="formState.transform">
              <mars-input-number v-model:value="formState.scale" :step="0.1" @change="formStateChange" />
            </a-form-item>
            <a-form-item label="显示精度">
              <mars-slider :min="1" :max="30" v-model:value="formState.maximumScreenSpaceError"
                @change="formStateChange" />
            </a-form-item>
            <a-form-item label="透明度">
              <mars-slider :min="0.1" :max="1" :step="0.1" v-model:value="formState.opacity"
                @change="formStateChange" />
            </a-form-item>
            <a-form-item label="模型亮度">
              <mars-slider :min="0.1" :max="2" :step="0.1" v-model:value="formState.brightness"
                @change="formStateChange" />
            </a-form-item>

            <a-form-item label="单击高亮构件">
              <mars-switch v-model:checked="formState.highlightEnable" @change="formStateChange" />
              <span class="popup-notification">
                单击Popup弹窗:
                <mars-switch v-model:checked="formState.popupEnable" @change="formStateChange" />
              </span>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>

        <div class="f-tac">
          <a-space>
            <mars-button @click="saveBookmark">保存参数</mars-button>
          </a-space>
        </div>
      </a-form>
    </div>
  </mars-dialog>

  <mars-dialog left="10" top="10" bottom="40" width="350" title="查看控件" v-model:visible="showCompModel">
    <mars-button v-show="cancelTree" @click="checkedTree">取消选中</mars-button>
    <mars-tree @select="compModelChange" v-model:expandedKeys="expandedKeys" :tree-data="treeData">
      <template #title="{ title }">
        <span>{{ title }}</span>
      </template>
    </mars-tree>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
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
  maximumScreenSpaceError: number
  opacity: number
  highlightEnable: boolean
  popupEnable: boolean
  transform: boolean
  brightness: number
}

const formState = reactive<FormState>({
  txtModel: "https://data.mars3d.cn/3dtiles/max-fsdzm/tileset.json",
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
  maximumScreenSpaceError: 16,
  opacity: 1,
  highlightEnable: false,
  popupEnable: true,
  transform: false,
  brightness: 1
})

const axisOptions = [
  { value: "", label: "默认" },
  { value: "Z_UP_TO_X_UP", label: "Z轴 -> X轴" },
  { value: "Z_UP_TO_Y_UP", label: "Z轴 -->Y轴" },
  { value: "X_UP_TO_Y_UP", label: "X轴 -->Y轴" },
  { value: "X_UP_TO_Z_UP", label: "X轴 -->Z轴" },
  { value: "Y_UP_TO_X_UP", label: "Y轴 -->X轴" },
  { value: "Y_UP_TO_Z_UP", label: "Y轴 -->Z轴" }
]

const labelCol = { span: 9 }

mapWork.eventTarget.on("historyUrl", function (event: any) {
  if (event.url) {
    formState.txtModel = event.url
  }
  mapWork.showModel(formState.txtModel)
})

mapWork.eventTarget.on("tiles3dLayerLoad", function (event: any) {
  const json = event.layer

  const locParams = json.position // 取模型中心点信息
  if (locParams.alt < -1000 || locParams.alt > 10000) {
    locParams.alt = 0 // 高度异常数据，自动赋值高度为0
  }

  formState.transform = json.transform
  formState.txtX = locParams.lng
  formState.txtY = locParams.lat
  formState.txtZ = locParams.alt

  formState.maximumScreenSpaceError = json.maximumScreenSpaceError ?? 16

  if (json.transform) {
    formState.rotationX = json.rotation.x ?? 0
    formState.rotationY = json.rotation.y ?? 0
    formState.rotationZ = json.rotation.z ?? 0
    formState.scale = json.scale ?? 1
    formState.axis = json.axis ?? ""
  } else {
    mapWork.updateHeightForSurfaceTerrain(locParams)
  }
})

// 根据改变的位置触发不同的事件
mapWork.eventTarget.on("changePoition", function (event: any) {
  formState.txtX = event.center.lng
  formState.txtY = event.center.lat
  formState.txtZ = event.center.alt

  formState.rotationX = event.rotation.x
  formState.rotationY = event.rotation.y
  formState.rotationZ = event.rotation.z
})
mapWork.eventTarget.on("changeHeight", function (event: any) {
  formState.txtZ = event.alt
})


const showModel = () => {
  mapWork.showModel(formState.txtModel)

  formState.opacity = 1
  formState.highlightEnable = false
  formState.popupEnable = true
}
const formStateChange = () => {
  const params = {
    maximumScreenSpaceError: formState.maximumScreenSpaceError, // 【重要】数值加大，能让最终成像变模糊
    position: {
      lat: formState.txtY,
      lng: formState.txtX,
      alt: formState.txtZ
    },
    rotation: {
      x: formState.rotationX,
      y: formState.rotationY,
      z: formState.rotationZ
    },
    scale: formState.scale,
    axis: formState.axis ? formState.axis : undefined,
    proxy: formState.chkProxy ? "//server.mars3d.cn/proxy/" : undefined,
    opacity: formState.opacity,
    colorCorrection: {
      brightness: formState.brightness
    },
    highlight: formState.highlightEnable
      ? {
        type: "click",
        outlineEffect: true,
        color: "#00FF00"
      }
      : false,
    popup: formState.popupEnable ? "all" : false,
    show: true
  }
  mapWork.setLayerOptions(params)
}
const updateDepthTest = () => {
  mapWork.updateDepthTest(formState.depthTestAgainstTerrain)
}

const locateToModel = () => {
  mapWork.locate()
}

const saveBookmark = () => {
  mapWork.saveBookmark()
}

// 查看构件
const treeData = ref<any[]>()
const expandedKeys = ref<any[]>([])

const showCompModel = ref(false)
const showCompTree = () => {
  showCompModel.value = true
  mapWork.showCompTree(formState.txtModel)
}
mapWork.eventTarget.on("compTree", function (event: any) {
  const data = event.data

  data.forEach((item: any, index: number) => {
    const childeren = isHaveChildren(item, index + "")

    treeData.value = [
      {
        title: item.name,
        key: index,
        id: item.eleid,
        sphere: item.sphere,
        children: childeren
      }
    ]
    expandedKeys.value.push(index) // 默认展开
  })
})

function isHaveChildren(arr: any, keyPrefix: string) {
  if (!arr.children) {
    return
  }

  const childerens = arr.children
  const childeren: any[] = []
  childerens.forEach((item: any, i: number) => {
    i++
    const newKeyPrefix = keyPrefix + "-" + i
    const childOne = isHaveChildren(item, newKeyPrefix)

    childeren.push({
      title: item.name,
      key: newKeyPrefix,
      id: item.eleid,
      sphere: item.sphere,
      children: childOne
    })
    return childeren
  })
  return childeren
}

// 选中节点
const cancelTree = ref(false)
const compModelChange = (_selectedKeys: any, selected: any) => {
  cancelTree.value = true
  mapWork.compModelChange(selected.node.id, selected.node.sphere)
}

const checkedTree = () => {
  cancelTree.value = false
  mapWork.checkedTree()
}
</script>
<style scoped lang="less">
.popup-notification {
  margin-left: 8px;
}
</style>
