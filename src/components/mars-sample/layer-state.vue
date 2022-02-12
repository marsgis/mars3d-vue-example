<template>
  <a-space>
    <span class="mars-pannel-item-label" v-if="props.label !== ''">{{ props.label }}</span>
    <a-checkbox v-model:checked="formState.enabledShowHide" @change="onChangeShow" title="显示隐藏状态">显示</a-checkbox>
    <a-checkbox v-model:checked="formState.enabledPopup" @change="onChangePopup" title="是否绑定Popup鼠标单击弹窗">Popup</a-checkbox>
    <a-checkbox v-model:checked="formState.enabledTooltip" @change="onChangeTooltip" title="是否绑定Tooltip鼠标移入弹窗">Tooltip</a-checkbox>
    <a-checkbox v-model:checked="formState.enabledRightMenu" @change="onChangeRightMenu" title="是否绑定右键菜单">右键菜单</a-checkbox>
  </a-space>
</template>

<script lang="ts" setup>
/**
 * 公共组件：封装图层状态操作
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { reactive } from "vue"
import type { UnwrapRef } from "vue"
import { $alert } from "@/components/mars-ui/index"

const props = withDefaults(
  defineProps<{
    label?: string
  }>(),
  {
    label: "图层状态:"
  }
)

interface FormState {
  enabledShowHide: boolean
  enabledPopup: boolean
  enabledTooltip: boolean
  enabledRightMenu: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork
const mars3d = mapWork.mars3d
const Cesium = mapWork.Cesium

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledPopup: true,
  enabledTooltip: false,
  enabledRightMenu: false
})

// 恢复默认状态
if (mapWork.eventTarget) {
  mapWork.eventTarget.on("defuatData", (item: any) => {
    formState.enabledShowHide = item.enabledShowHide
    formState.enabledPopup = item.enabledPopup
    formState.enabledTooltip = item.enabledTooltip
    formState.enabledRightMenu = item.enabledRightMenu
  })
}

setTimeout(() => {
  const layer = getManagerLayer()
  if (layer) {
    formState.enabledShowHide = layer.show
    formState.enabledPopup = layer.hasPopup()
    formState.enabledTooltip = layer.hasTooltip()
    formState.enabledRightMenu = layer.hasContextMenu()
  }
}, 1000)

// 获取map.js中定义的需要管理的图层
function getManagerLayer() {
  if (mapWork.getManagerLayer) {
    return mapWork.getManagerLayer()
  }
  return mapWork.graphicLayer
}

const onChangeShow = () => {
  const layer = getManagerLayer()
  layer.show = formState.enabledShowHide
}
const onChangePopup = () => {
  const layer = getManagerLayer()
  if (formState.enabledPopup) {
    if (mapWork.bindLayerPopup) {
      mapWork.bindLayerPopup()
    } else {
      bindLayerPopup()
    }
  } else {
    layer.unbindPopup()
  }
}

const onChangeTooltip = () => {
  const layer = getManagerLayer()
  if (formState.enabledTooltip) {
    // layer.bindTooltip("我是layer上绑定的Tooltip")
    layer.bindTooltip(function (event) {
      const attr = getAttrForEvent(event)
      attr["类型"] = event.graphic?.type
      attr["来源"] = "我是layer上绑定的Toolip"
      attr["备注"] = "我支持鼠标移入交互"

      return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr: attr })
    })
  } else {
    layer.unbindTooltip()
  }
}

const onChangeRightMenu = () => {
  const layer = getManagerLayer()
  if (formState.enabledRightMenu) {
    if (mapWork.bindLayerContextMenu) {
      mapWork.bindLayerContextMenu()
    } else {
      bindLayerContextMenu()
    }
  } else {
    layer.unbindContextMenu(true)
  }
}

// 在图层绑定Popup弹窗
function bindLayerPopup() {
  const graphicLayer = getManagerLayer()
  graphicLayer.bindPopup(function (event) {
    const attr = getAttrForEvent(event)
    attr["类型"] = event.graphic?.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr: attr })

    // return new Promise((resolve) => {
    //   //这里可以进行后端接口请求数据，setTimeout测试异步
    //   setTimeout(() => {
    //     resolve('Promise异步回调显示的弹窗内容信息')
    //   }, 2000)
    // })
  })
}

function getAttrForEvent(event) {
  if (event?.graphic?.attr) {
    return event.graphic.attr
  }
  if (!event.czmObject) {
    return {}
  }

  let attr = event.czmObject._attr || event.czmObject.properties || event.czmObject.attribute
  if (attr && attr.type && attr.attr) {
    attr = attr.attr // 兼容历史数据,V2内部标绘生产的geojson
  }
  return attr ?? {}
}

// 绑定右键菜单
function bindLayerContextMenu() {
  const graphicLayer = getManagerLayer()

  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.startEditing) {
          return false
        }
        return !graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.startEditing(graphic)
        }
      }
    },
    {
      text: "停止编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.stopEditing(graphic)
        }
      }
    },
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayer.removeGraphic(graphic)
      }
    },
    {
      text: "计算长度",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "polyline" ||
          graphic.type === "polylineP" ||
          graphic.type === "curve" ||
          graphic.type === "curveP" ||
          graphic.type === "polylineVolume" ||
          graphic.type === "polylineVolumeP" ||
          graphic.type === "corridor" ||
          graphic.type === "corridorP" ||
          graphic.type === "wall" ||
          graphic.type === "wallP"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        $alert("该对象的长度为:" + strDis)
      }
    },
    {
      text: "计算周长",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        $alert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      iconCls: "fa fa-reorder",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP" ||
          graphic.type === "scrollWall" ||
          graphic.type === "water"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        $alert("该对象的面积为:" + strArea)
      }
    }
  ])
}
</script>
