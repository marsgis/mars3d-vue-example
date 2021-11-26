<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-radio-group @change="shadingMaterials" v-model:value="value">
          <a-radio :value="1">街景操作习惯 </a-radio>
          <a-radio :value="2">Cesium操作习惯</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item v-show="value === 1">
        <span >
           操作说明：<br />
        1、右键拖拽，以相机视角为中心进行旋转。<br />
        2、中键拖拽，可以升高或降低相机高度。<br />
        3、Ctrl + 中键/右键, 与Cesium原始操作一致。<br />
        4、左键双击，飞行定位到该点。<br />
        5、右键双击，围绕该点旋转。
        </span>
      </a-form-item>
    </a-form>
  </PannelBox>
  <LocationTo />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"

export default defineComponent({
  components: {
    PannelBox,
    LocationTo
  },
  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    const value = ref<number>(1)

    const shadingMaterials = () => {
      mapWork.shadingMaterials(value.value)
    }

    return {
      value,
      shadingMaterials
    }
  }
})
</script>
<style scoped lang="less"></style>
