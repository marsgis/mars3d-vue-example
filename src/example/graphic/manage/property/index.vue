<template>
  <PannelBox class="infoView">
    <a-form-item>
      <span class="item-label">属性机制演示：</span>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoSampleProperty">SampleProperty</mars-button>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoTimeIntervalCollectionProperty">TimeIntervalCollectionProperty</mars-button>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoConstantProperty">ConstantProperty</mars-button>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoCompositeProperty">CompositeProperty</mars-button>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoSampledPositionProperty">SampledPositionProperty</mars-button>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoColorMaterialProperty">ColorMaterialProperty</mars-button>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoColorMaterialProperty2">ColorMaterialProperty2</mars-button>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoCallbackProperty">CallbackProperty</mars-button>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoReferenceProperty">ReferenceProperty</mars-button>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoPropertyBag">PropertyBag</mars-button>
    </a-form-item>
    <a-form-item>
      <mars-button @click="demoVelocityVectorProperty">PropertyBag</mars-button>
    </a-form-item>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const demoSampleProperty = () => {
  mapWork.demoSampleProperty()
}
const demoTimeIntervalCollectionProperty = () => {
  mapWork.demoTimeIntervalCollectionProperty()
}
const demoConstantProperty = () => {
  mapWork.demoConstantProperty()
}
const demoCompositeProperty = () => {
  mapWork.demoCompositeProperty()
}
const demoSampledPositionProperty = () => {
  mapWork.demoSampledPositionProperty()
}
const demoColorMaterialProperty = () => {
  mapWork.demoColorMaterialProperty()
}
const demoColorMaterialProperty2 = () => {
  mapWork.demoColorMaterialProperty2()
}
const demoCallbackProperty = () => {
  mapWork.demoCallbackProperty()
}
const demoReferenceProperty = () => {
  mapWork.demoReferenceProperty()
}
const demoPropertyBag = () => {
  mapWork.demoPropertyBag()
}
const demoVelocityVectorProperty = () => {
  mapWork.demoVelocityVectorProperty()
}
</script>
 <style  scoped lang="less">
  .infoView {
    width: 250px;
  }
  .item-label{
    font-size: 17px;
  }
</style>
