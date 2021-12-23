<template>
  <a-space>
    <span class="pannel-item-label">图层状态:</span>
    <a-checkbox v-model:checked="formState.enabledShowHide" @change="bindShowHide">显示隐藏</a-checkbox>
    <a-checkbox v-model:checked="formState.enabledPopup" @change="bindPopup">Popup绑定</a-checkbox>
    <a-checkbox v-model:checked="formState.enabledTooltip" @change="bindTooltip">Tooltip</a-checkbox>
    <a-checkbox v-model:checked="formState.enabledRightMenu" @change="bindRightMenu">右键绑定</a-checkbox>
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

interface FormState {
  enabledShowHide: boolean
  enabledPopup: boolean
  enabledTooltip: boolean
  enabledRightMenu: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledPopup: true,
  enabledTooltip: false,
  enabledRightMenu: true
})
const bindShowHide = () => {
  mapWork.bindShowHide(formState.enabledShowHide)
}
const bindPopup = () => {
  mapWork.bindPopup(formState.enabledPopup)
}
const bindTooltip = () => {
  mapWork.bindTooltip(formState.enabledTooltip)
}
const bindRightMenu = () => {
  mapWork.bindRightMenu(formState.enabledRightMenu)
}
</script>

