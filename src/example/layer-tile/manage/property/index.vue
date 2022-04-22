<template>
  <mars-pannel :visible="true" right="10" top="10" width="300">
    <div class="property-content">
      <h2 class="f-mb title">栅格底图参数</h2>
      <mars-gui :options="options"></mars-gui>
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
import * as mapWork from "./map.js"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"

const options: GuiItem[] = [
  {
    type: "slider",
    field: "brightness",
    label: "亮度",
    step: 0.01,
    min: 0,
    max: 3,
    value: 1.0,
    extra: "{brightness}",
    change(data) {
      changeOpacity("brightness", data)
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
    change(data) {
      changeOpacity("contrast", data)
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
    change(data) {
      changeOpacity("hue", data)
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
    change(data) {
      changeOpacity("saturation", data)
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
    change(data) {
      changeOpacity("gamma", data)
    }
  },
  {
    type: "slider",
    field: "opacity",
    label: "透明度",
    step: 0.01,
    min: 0,
    max: 3,
    value: 1.0,
    extra: "{opacity}",
    change(data) {
      changeOpacity("opacity", data)
    }
  }
]

const changeOpacity = (attribute: string, val: number) => {
  mapWork.changeOpacity(attribute, val)
}
</script>
<style lang="less" scoped>
.title {
  color: @mars-basecolor;
  font-size: 16px;
}

.property-content {
  width: 100%;
  overflow-x: hidden;
}
</style>
