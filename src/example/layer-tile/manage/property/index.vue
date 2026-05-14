<template>
  <mars-dialog custom-class="property-pannel" :nopadding="true" :visible="true" right="10" top="10" width="280">
    <div class="property-content">
      <div class="content-title">
        <h2 class="f-mb title">瓦片底图通用参数</h2>
      </div>
      <mars-gui :options="options"></mars-gui>
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import * as mapWork from "./map.js"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"

const options: GuiItem[] = [
  {
    type: "slider",
    field: "opacity",
    label: "透明度",
    step: 0.01,
    min: 0,
    max: 1,
    value: 1.0,
    extra: "{opacity}",
    extraWidth: 40,
    change(data) {
      setLayerOptions("opacity", data)
    }
  },
  {
    type: "slider",
    field: "brightness",
    label: "亮度",
    step: 0.01,
    min: 0,
    max: 3,
    value: 1.0,
    extra: "{brightness}",
    extraWidth: 40,
    change(data) {
      setLayerOptions("brightness", data)
    }
  },
  {
    type: "slider",
    field: "contrast",
    label: "对比度",
    step: 0.01,
    min: 0,
    max: 3,
    value: 1.16,
    extra: "{contrast}",
    extraWidth: 40,
    change(data) {
      setLayerOptions("contrast", data)
    }
  },
  {
    type: "slider",
    field: "hue",
    label: "色彩",
    step: 0.01,
    min: 0,
    max: 3,
    value: 0.1,
    extra: "{hue}",
    extraWidth: 40,
    change(data) {
      setLayerOptions("hue", data)
    }
  },
  {
    type: "slider",
    field: "saturation",
    label: "饱和度",
    step: 0.01,
    min: 0,
    max: 3,
    value: 1.0,
    extra: "{saturation}",
    extraWidth: 40,
    change(data) {
      setLayerOptions("saturation", data)
    }
  },
  {
    type: "slider",
    field: "gamma",
    label: "伽马值",
    step: 0.01,
    min: 0,
    max: 3,
    value: 0.53,
    extra: "{gamma}",
    extraWidth: 40,
    change(data) {
      setLayerOptions("gamma", data)
    }
  }
]

const setLayerOptions = (attribute: string, val: number) => {
  mapWork.setLayerOptions(attribute, val)
}
</script>

<style lang="less">
.property-pannel {
  .mars-dialog__content {
    .mars-gui-form {
      padding-right: 15px !important;
      padding-bottom: 10px !important;
    }
  }
}
</style>

<style lang="less" scoped>
.property-content {
  width: 100%;
  overflow-x: hidden;

  .content-title {
    .title {
      color: #EAF2FF;
      display: inline-block;
      font-size: 14px;
      width: 100%;
      height: 44px;
      background: #464C5A;
      line-height: 44px;
      padding-left: 10px;

      &::before {
        content: "|";
        background: #3385FF;
        color: #3385FF;
        border-radius: 4px;
        margin-right: 10px;
      }
    }
  }
}
</style>
