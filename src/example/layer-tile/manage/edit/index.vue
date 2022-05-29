<template>
  <mars-pannel :visible="true" right="10" top="10" width="365">
    <div class="edit-contain">
      <mars-gui :options="options" ref="marsGuiRef"></mars-gui>

      <!-- <div class="edit-contain">
      <a-form ref="formRef" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="图层URL" name="url">
          <mars-input @change="onCheckedoutUrl" v-model:value="formState.url"></mars-input>
        </a-form-item>
        <a-form-item label="类型" name="type">
          <mars-select placeholder="请选择类型" v-model:value="formState.type" :options="selectOptions"> </mars-select>
        </a-form-item>
        <template v-if="['wms', 'wmts'].includes(formState.type)">
          <a-form-item label="图层名">
            <mars-input v-model:value="formState.txtLayer" @change="dataUpdate"></mars-input>
          </a-form-item>
          <a-form-item label="瓦片格式">
            <mars-select v-model:value="formState.txtTileFormat" :options="tileOptions"></mars-select>
          </a-form-item>
        </template>
        <a-form-item label="坐标系">
          <mars-select v-model:value="formState.CRS" @change="dataUpdate" :options="crsOptions"> </mars-select>
        </a-form-item>
        <a-form-item label="国内坐标系">
          <mars-select v-model:value="formState.chinaCRS" @change="dataUpdate" :options="chinaCRSOptions"> </mars-select>
        </a-form-item>
        <a-form-item label="加载层级">
          <a-slider range :default-value="[0, 21]" :min="0" :max="21" :step="1" @change="onChange" @afterChange="afterChange" />
        </a-form-item>
        <a-form-item label="显示层级">
          <a-slider range :default-value="[0, 21]" @change="onChangeShow" @afterChange="afterChangeShow" :min="0" :max="21" :step="1" />
        </a-form-item>
        <a-form-item label="输入框">
          <a-row :gutter="5">
            <a-col :span="18">
              <mars-input v-model:value="formState.rectangle" @change="changeRectangle" :allowClear="true"> </mars-input>
            </a-col>
            <a-col :span="6">
              <a-space size="small">
                <mars-button class="small-btn" @click="btnDrawExtent">绘制</mars-button>
              </a-space>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item label="透明度">
          <a-slider v-model:value="formState.opacity" @change="changeOpacity" :min="0" :max="1" :step="0.01" />
        </a-form-item>
        <a-form-item label="亮度">
          <a-slider v-model:value="formState.brightness" @change="changeBrightness" :min="0" :max="1" :step="0.01" />
        </a-form-item>
        <a-form-item label="使用代理"> <mars-switch v-model:checked="formState.chkProxy" /> 是否使用代理 </a-form-item>
        <div class="f-tac">
          <a-space>
            <mars-button size="middle" @click="loadCoverage">加载图层</mars-button>
            <mars-button size="middle" @click="reset">重置参数</mars-button>
            <mars-button size="middle" @click="btnDrawExtent">绘制</mars-button>
          </a-space>
        </div>
      </a-form>
    </div> -->
      <div class="f-tac">
        <a-space>
          <mars-button size="middle" @click="loadCoverage">加载图层</mars-button>
          <mars-button size="middle" @click="reset">重置参数</mars-button>
          <mars-button size="middle" @click="btnDrawExtent">绘制</mars-button>
        </a-space>
      </div>
    </div>
  </mars-pannel>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted, h } from "vue"
import * as mapWork from "./map.js"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"
import MarsButton from "@mars/components/mars-ui/mars-button/index.vue"
import { stringify } from "querystring"

const marsGuiRef = ref()
const options: GuiItem[] = [
  {
    type: "input",
    field: "url",
    label: "图层URL",
    value: "//data.mars3d.cn/tile/dizhiChina/{z}/{x}/{y}.png",
    change(data) {
      onCheckedoutUrl(data)
      dataUpdate()
    }
  },
  {
    type: "select",
    field: "type",
    label: "类型",
    value: "xyz",
    data: [
      {
        value: "xyz",
        label: "标准金字塔地图"
      },
      {
        value: "wms",
        label: "WMS标准服务"
      },
      {
        value: "wmts",
        label: "WMTS标准服务"
      },
      {
        value: "arcgis",
        label: "ArcGIS标准服务"
      },
      {
        value: "arcgis_cache",
        label: "ArcGIS切片"
      },
      {
        value: "image",
        label: "单张图片"
      }
    ],
    change(data) {
      marsGuiRef.value.updateField("type", data)
      dataUpdate()
    }
  },
  {
    type: "input",
    field: "txtLayer",
    label: "图层名",
    value: "",
    change(data) {
      marsGuiRef.value.updateField("txtLayer", data)
      dataUpdate()
    },
    show(data) {
      return data.type === "wms" || data.type === "wmts"
    }
  },
  {
    type: "select",
    field: "txtTileFormat",
    label: "瓦片格式",
    value: "png",
    change(data) {
      marsGuiRef.value.updateField("txtLayer", data)
      dataUpdate()
    },
    show(data) {
      return data.type === "wms" || data.type === "wmts"
    },
    data: [
      {
        value: "image/png",
        label: "png"
      },
      {
        value: "image/jpeg",
        label: "jpeg"
      }
    ]
  },
  {
    type: "select",
    field: "CRS",
    label: "坐标系",
    value: "",
    change(data) {
      marsGuiRef.value.updateField("CRS", data)
      dataUpdate()
    },
    data: [
      {
        value: "",
        label: "默认"
      },
      {
        value: "EPSG:3857",
        label: "EPSG:3857"
      },
      {
        value: "EPSG:4326",
        label: "EPSG:4326"
      },
      {
        value: "EPSG:4490",
        label: "EPSG:4490"
      }
    ]
  },
  {
    type: "select",
    field: "chinaCRS",
    label: "国内坐标系",
    value: "WGS84",
    change(data) {
      marsGuiRef.value.updateField("chinaCRS", data)
      dataUpdate()
    },
    data: [
      {
        value: "WGS84",
        label: "标准无偏"
      },
      {
        value: "GCJ02",
        label: "国测局偏移"
      },
      {
        value: "BAIDU",
        label: "百度偏移"
      }
    ]
  },
  {
    type: "slider",
    field: "loadLevel",
    label: "加载层级",
    step: 1,
    range: true,
    min: 0,
    max: 21,
    value: [0, 21],
    change(data) {
      marsGuiRef.value.updateField("loadLevel", data)
      dataUpdate()
    }
  },
  {
    type: "slider",
    field: "showLevel",
    label: "显示层级",
    step: 1,
    range: true,
    min: 0,
    max: 21,
    value: [0, 21],
    change(data) {
      marsGuiRef.value.updateField("showLevel", data)
      dataUpdate()
    }
  },
  {
    type: "input",
    field: "rectangle",
    label: "矩形范围",
    value: "",
    change(data) {
      if (data === "") {
        mapWork.btnClearExtent()
      }
      marsGuiRef.value.updateField("rectangle", data)
      dataUpdate()
    }
  },
  {
    type: "slider",
    field: "opacity",
    label: "透明度",
    step: 0.01,
    min: 0,
    max: 1,
    value: 1,
    change(data) {
      marsGuiRef.value.updateField("opacity", data)
      mapWork.changeOpacity(data)
      dataUpdate()
    }
  },
  {
    type: "slider",
    field: "brightness",
    label: "亮度",
    step: 0.01,
    min: 0,
    max: 1,
    value: 1,
    change(data) {
      marsGuiRef.value.updateField("brightness", data)
      mapWork.changeBrightness(data)
      dataUpdate()
    }
  },
  {
    type: "switch",
    field: "agent",
    label: "是否使用代理",
    value: false,
    change(data) {
      marsGuiRef.value.updateField("chkProxy", data)
      dataUpdate()
    }
  }
]

// const formState = reactive({
//   url: "//data.mars3d.cn/tile/dizhiChina/{z}/{x}/{y}.png",
//   type: "xyz",
//   txtLayer: "",
//   txtTileFormat: "png",
//   CRS: "",
//   chinaCRS: "WGS84",
//   minLoadLevel: 0,
//   maxLoadLevel: 21,
//   minShowLevel: 0,
//   maxShowLevel: 21,
//   rectangle: "",
//   opacity: 1,
//   brightness: 1,
//   chkProxy: false
// })

let updateValue

const onCheckedoutUrl = (data) => {
  const url = data.toLowerCase()
  if (url.indexOf("wms") !== -1) {
    marsGuiRef.value.updateField("url", "wms")
    // formState.type = "wms"
  } else if (url.indexOf("wmts") !== -1) {
    marsGuiRef.value.updateField("url", "wmts")
    // formState.type = "wmts"
  } else if (url.indexOf("_alllayers") !== -1) {
    marsGuiRef.value.updateField("url", "arcgis_cache")
    // formState.type = "arcgis_cache"
  } else if (url.indexOf("arcgis") !== -1) {
    marsGuiRef.value.updateField("url", "arcgis")
    // formState.type = "arcgis"
  } else if (url.indexOf("{x}") !== -1 && url.indexOf("{z}") !== -1) {
    marsGuiRef.value.updateField("url", "xyz")
    // formState.type = "xyz"
  }
}

const loadCoverage = async () => {
  // 加载图层
  // try {
  //   await formRef.value.validate()
  // console.log("表单验证通过")
  // mapWork.createTileLayer(formState)
  mapWork.createTileLayer(updateValue)
  // } catch (err) {
  //   console.log("表单验证失败")
  // }
}

const reset = () => {
  // 重置参数
  // marsGuiRef.value.resetFields()
  marsGuiRef.value.updateField("rectangle", "")
  // formState.rectangle = "" // 清空绘制区域输入框的数据

  // 清除绘制区域和移除加载的矢量数据
  mapWork.btnClearExtent()
  mapWork.removeLayer()
}

// // 加载的层级
// const onChange = (val: any) => {
//   formState.minLoadLevel = val[0]
//   mapWork.dataUpdate(formState)
// }
// const afterChange = (val: any) => {
//   formState.maxLoadLevel = val[1]
//   mapWork.dataUpdate(formState)
// }

// // 显示的层级
// const onChangeShow = (val: any) => {
//   formState.minShowLevel = val[0]
//   mapWork.dataUpdate(formState)
// }
// const afterChangeShow = (val: any) => {
//   formState.maxShowLevel = val[1]
//   mapWork.dataUpdate(formState)
// }

onMounted(() => {
  const lastData = JSON.parse(localStorage.getItem("c20_tileLayer_edit"))
  // localStorage.removeItem("c20_tileLayer_edit")
  if (lastData) {
    marsGuiRef.value.updateFields(lastData)
    updateAllData(lastData)
    if (lastData.rectangle) {
      mapWork.creatHRectangleEntity(JSON.parse(lastData.rectangle))
    }
    console.log("lastData", lastData)
  } else {
    dataUpdate()
  }
})

mapWork.eventTarget.on("rectangle", (e: any) => {
  if (e.rectangle) {
    marsGuiRef.value.updateField("rectangle", JSON.stringify(e.rectangle))
    dataUpdate()
  }
})

// 当参数改变时，修改加载图层的部分参数
const dataUpdate = () => {
  const data = marsGuiRef.value.getValues()
  updateAllData(data)
  mapWork.dataUpdate(updateValue)
  // 记录到历史
  localStorage.setItem("c20_tileLayer_edit", JSON.stringify(data))
}

const updateAllData = (data) => {
  updateValue = reactive({
    url: data.url,
    type: data.type,
    txtLayer: data.txtLayer,
    txtTileFormat: data.txtTileFormat,
    CRS: data.CRS,
    chinaCRS: data.chinaCRS,
    minLoadLevel: data.loadLevel[0],
    maxLoadLevel: data.loadLevel[1],
    minShowLevel: data.showLevel[0],
    maxShowLevel: data.showLevel[1],
    rectangle: data.rectangle ? JSON.parse(data.rectangle) : null,
    opacity: data.opacity,
    brightness: data.brightness,
    chkProxy: data.chkProxy
  })
}

// 绘制和清除区域
const btnDrawExtent = () => {
  mapWork.btnDrawExtent(updateValue)
  console.log("updateValue", updateValue)

  // dataUpdate()
}
// const changeRectangle = (val: any) => {
//   if (formState.rectangle === "") {
//     mapWork.btnClearExtent()
//   }
// }

// 改变图层透明度和亮度
// const changeOpacity = (val: number) => {
//   mapWork.changeOpacity(val)
// }
// const changeBrightness = (val: number) => {
//   mapWork.changeBrightness(val)
// }

// const rules = {
//   url: [{ required: true, message: "请输入图层URL", trigger: "submit" }],
//   type: [{ required: true, message: "请选择类型", trigger: "submit" }]
// }

// const labelCol = { span: 6 }
// const wrapperCol = { span: 18 }
// const selectOptions = [
//   {
//     value: "xyz",
//     label: "标准金字塔地图"
//   },
//   {
//     value: "wms",
//     label: "WMS标准服务"
//   },
//   {
//     value: "wmts",
//     label: "WMTS标准服务"
//   },
//   {
//     value: "arcgis",
//     label: "ArcGIS标准服务"
//   },
//   {
//     value: "arcgis_cache",
//     label: "ArcGIS切片"
//   },
//   {
//     value: "image",
//     label: "单张图片"
//   }
// ]
// const tileOptions = [
//   {
//     value: "image/png",
//     label: "png"
//   },
//   {
//     value: "image/jpeg",
//     label: "jpeg"
//   }
// ]
// const crsOptions = [
//   {
//     value: "",
//     label: "默认"
//   },
//   {
//     value: "EPSG:3857",
//     label: "EPSG:3857"
//   },
//   {
//     value: "EPSG:4326",
//     label: "EPSG:4326"
//   },
//   {
//     value: "EPSG:4490",
//     label: "EPSG:4490"
//   }
// ]
// const chinaCRSOptions = [
//   {
//     value: "WGS84",
//     label: "标准无偏"
//   },
//   {
//     value: "GCJ02",
//     label: "国测局偏移"
//   },
//   {
//     value: "BAIDU",
//     label: "百度偏移"
//   }
// ]
</script>

<style scoped lang="less">
.edit-contain {
  width: 340px;
}
</style>
